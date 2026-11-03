-- 2026-11-03 — Lock down the retired idea board (Pumpkin Patch focus decision).
--
-- The Build Room idea board is gone from kittech-six.org, but the table, its public
-- policies and the vote RPC still answer to the anon key shipped in the site bundle.
-- This closes them. NOTHING IS DROPPED: rows stay, the public just can't touch them.
-- landing_emails (Educator Circle signup) is deliberately NOT touched.
--
-- Run in the Supabase SQL editor (or: supabase db query --linked -f <this file>).
-- Safe to re-run. Rollback block at the bottom.

begin;

-- 1. Remove every policy on the suggestions + vote-log tables (public read/insert).
do $$
declare p record;
begin
  for p in
    select schemaname, tablename, policyname from pg_policies
     where schemaname = 'public' and tablename in ('landing_suggestions', 'landing_vote_log')
  loop
    execute format('drop policy %I on %I.%I', p.policyname, p.schemaname, p.tablename);
  end loop;
end $$;

-- 2. RLS on, and no policies = no access for anon/authenticated (service role still works).
alter table public.landing_suggestions enable row level security;
alter table public.landing_vote_log    enable row level security;

-- 3. Belt and braces: take away the table privileges too.
revoke all on public.landing_suggestions from anon, authenticated;
revoke all on public.landing_vote_log    from anon, authenticated;

-- 4. The vote function: nobody public can run it any more.
revoke all on function public.increment_suggestion_vote(uuid) from public, anon, authenticated;

commit;

-- ── Verify (should show zero policies and no anon/authenticated privileges) ─────
select tablename, policyname from pg_policies
 where schemaname = 'public' and tablename in ('landing_suggestions', 'landing_vote_log');   -- expect 0 rows

select grantee, table_name, privilege_type
  from information_schema.role_table_grants
 where table_schema = 'public' and table_name in ('landing_suggestions', 'landing_vote_log')
   and grantee in ('anon', 'authenticated');                                                   -- expect 0 rows

select has_function_privilege('anon', 'public.increment_suggestion_vote(uuid)', 'execute');   -- expect false

-- External check (from a terminal; $ANON is the public key already in the site bundle):
--   curl -s -o /dev/null -w "%{http_code}\n" \
--     -H "apikey: $ANON" "https://kzzqloklnxlqbccxbxgr.supabase.co/rest/v1/landing_suggestions?select=id&limit=1"
--   expect 401 or 403 (a 200 with [] would mean RLS is on but a grant is still open).

-- ── Rollback (only if you ever bring the idea board back) ───────────────────────
-- Re-run scripts/sql/2026-09-08-landing-hardening.sql then 2026-09-28-idea-status.sql.
