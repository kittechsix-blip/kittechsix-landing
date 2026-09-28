-- 2026-09-28 — The Build Room: give every idea a visible status.
--
-- Adds `status` (open → building → built) and `built_url` (where the finished
-- tool lives) to landing_suggestions. Andy sets both by hand in the Supabase
-- Table Editor; the public can still only read approved rows and insert new
-- unreviewed ones — an idea can never arrive already marked "built".
--
-- Safe to re-run. Nothing is dropped; existing rows default to 'open'.
-- Run from the repo root:  supabase db query --linked -f scripts/sql/2026-09-28-idea-status.sql

alter table public.landing_suggestions
  add column if not exists status    text not null default 'open',
  add column if not exists built_url text;

do $$
begin
  begin
    alter table public.landing_suggestions
      add constraint landing_suggestions_status
      check (status in ('open', 'building', 'built'));
  exception when duplicate_object then null; end;

  begin
    alter table public.landing_suggestions
      add constraint landing_suggestions_built_url
      check (built_url is null or (built_url ~* '^https://' and char_length(built_url) <= 300));
  exception when duplicate_object then null; end;
end $$;

-- Public inserts must start as a plain, unreviewed, unbuilt idea.
drop policy if exists suggestions_public_insert on public.landing_suggestions;
create policy suggestions_public_insert
  on public.landing_suggestions for insert
  to anon, authenticated
  with check (approved = false and coalesce(votes, 0) = 0 and status = 'open' and built_url is null);
