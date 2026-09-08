-- kittech-six.org — landing-site hardening (SECURITY_AUDIT.md, 2026-09-08)
--
-- Safe to re-run. Every step is idempotent or guarded. Runs in one transaction:
-- if anything fails, nothing changes.
--
-- Apply from the repo root (Management API, no DB password needed):
--   supabase link --project-ref kzzqloklnxlqbccxbxgr --skip-pull
--   supabase db query --linked -f scripts/sql/2026-09-08-landing-hardening.sql
-- …or paste this file into Supabase Dashboard → SQL Editor → Run.
--
-- What it does:
--   1. Moderation gate: landing_suggestions.approved (default false). The public
--      read policy only returns approved rows. Existing rows are grandfathered
--      as approved the first time this runs (they were already public).
--   2. RLS rebuilt from scratch on both tables — public can INSERT only;
--      suggestions readable only when approved; emails never readable.
--   3. Table-level REVOKEs so a future stray policy still can't expose emails.
--   4. CHECK constraints enforcing what the form promises (NOT VALID = new rows only).
--   5. Vote RPC rebuilt: one vote per suggestion per client (IP-hash log), only on
--      approved suggestions. The log table is reachable only through the function.

begin;

-- ── 1. Moderation column (+ grandfather rows that predate it) ─────────────────
do $$
begin
  if not exists (
    select 1 from information_schema.columns
     where table_schema = 'public' and table_name = 'landing_suggestions' and column_name = 'approved'
  ) then
    alter table public.landing_suggestions add column approved boolean not null default false;
    update public.landing_suggestions set approved = true;   -- already public before today
  end if;
end $$;

create index if not exists landing_suggestions_approved_votes_idx
  on public.landing_suggestions (approved, votes desc);

-- ── 2. RLS: enable, drop every existing policy, recreate exactly ──────────────
alter table public.landing_suggestions enable row level security;
alter table public.landing_emails      enable row level security;

do $$
declare p record;
begin
  for p in
    select schemaname, tablename, policyname from pg_policies
     where schemaname = 'public' and tablename in ('landing_suggestions', 'landing_emails')
  loop
    execute format('drop policy %I on %I.%I', p.policyname, p.schemaname, p.tablename);
  end loop;
end $$;

-- Public may read approved suggestions and submit new ones that start unreviewed
-- with zero votes. No UPDATE / DELETE policy exists for the public roles.
create policy suggestions_public_read
  on public.landing_suggestions for select
  to anon, authenticated
  using (approved = true);

create policy suggestions_public_insert
  on public.landing_suggestions for insert
  to anon, authenticated
  with check (approved = false and coalesce(votes, 0) = 0);

-- Emails: write-only for the public. No SELECT policy at all.
create policy emails_public_insert
  on public.landing_emails for insert
  to anon, authenticated
  with check (true);

-- ── 3. Belt-and-braces grants ─────────────────────────────────────────────────
revoke update, delete         on public.landing_suggestions from anon, authenticated;
revoke select, update, delete on public.landing_emails      from anon, authenticated;
grant  select, insert         on public.landing_suggestions to   anon, authenticated;
grant  insert                 on public.landing_emails      to   anon, authenticated;

-- ── 4. CHECK constraints (NOT VALID: enforce going forward, don't fail on history)
do $$
begin
  begin
    alter table public.landing_suggestions
      add constraint landing_suggestions_title_len
      check (char_length(btrim(title)) between 1 and 100) not valid;
  exception when duplicate_object then null; end;

  begin
    alter table public.landing_suggestions
      add constraint landing_suggestions_desc_len
      check (description is null or char_length(description) <= 500) not valid;
  exception when duplicate_object then null; end;

  begin
    alter table public.landing_suggestions
      add constraint landing_suggestions_category
      check (category in ('myMedKitt','myStroke-Kitt','my-vertigo-app','AcidBase','Antibiotic Rx',
                          'MyTravelMedKitt','PowerKitt','Consulting','General')) not valid;
  exception when duplicate_object then null; end;

  begin
    alter table public.landing_emails
      add constraint landing_emails_shape
      check (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$' and char_length(email) <= 254) not valid;
  exception when duplicate_object then null; end;
end $$;

-- ── 5. Vote throttle ──────────────────────────────────────────────────────────
create table if not exists public.landing_vote_log (
  suggestion_id uuid        not null references public.landing_suggestions (id) on delete cascade,
  voter_hash    text        not null,
  created_at    timestamptz not null default now(),
  primary key (suggestion_id, voter_hash)
);
alter table public.landing_vote_log enable row level security;   -- no policies: only the function below touches it
revoke all on public.landing_vote_log from anon, authenticated;

drop function if exists public.increment_suggestion_vote(uuid);
drop function if exists public.increment_suggestion_vote(text);
drop function if exists public.increment_suggestion_vote(bigint);

create function public.increment_suggestion_vote(suggestion_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  ip text;
  h  text;
begin
  -- Client IP from PostgREST's forwarded headers; hashed so no raw IP is stored.
  ip := coalesce(
          nullif(split_part(coalesce(current_setting('request.headers', true)::json ->> 'x-forwarded-for', ''), ',', 1), ''),
          'unknown');
  h := md5(ip || ':' || suggestion_id::text);

  -- Unknown or unreviewed suggestion: quiet no-op (avoids surfacing an FK error).
  if not exists (
    select 1 from public.landing_suggestions s where s.id = suggestion_id and s.approved
  ) then
    return;
  end if;

  insert into public.landing_vote_log (suggestion_id, voter_hash)
  values (suggestion_id, h)
  on conflict do nothing;

  if found then
    update public.landing_suggestions s
       set votes = coalesce(s.votes, 0) + 1
     where s.id = suggestion_id and s.approved;
  end if;
end $$;

revoke all on function public.increment_suggestion_vote(uuid) from public;
grant execute on function public.increment_suggestion_vote(uuid) to anon, authenticated;

commit;

-- ── Verify (read-only) ────────────────────────────────────────────────────────
select tablename, policyname, cmd, roles::text
  from pg_policies
 where schemaname = 'public' and tablename in ('landing_suggestions', 'landing_emails', 'landing_vote_log')
 order by 1, 2;
