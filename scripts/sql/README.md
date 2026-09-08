# Database scripts

The landing site shares the Supabase project `kzzqloklnxlqbccxbxgr` with myMedKitt.
This repo has no `supabase/` directory; scripts here are applied by hand.

| File | Purpose | Status |
|---|---|---|
| `2026-09-08-landing-hardening.sql` | Moderation gate, RLS rebuild, CHECK constraints, one-vote-per-client RPC | **Applied 2026-09-08** and verified externally with the anon key. Safe to re-run any time (idempotent). |

Apply (from repo root):

```bash
supabase link --project-ref kzzqloklnxlqbccxbxgr --skip-pull
supabase db query --linked -f scripts/sql/2026-09-08-landing-hardening.sql
```

The client (`src/components/feedback-board.ts`, `src/utils/supabase.ts`) already assumes
this migration: inserts use `return=minimal`, new suggestions are described as "held for
review," and the board reads only what the public SELECT policy returns.

After it runs, approve suggestions in **Dashboard → Table Editor → landing_suggestions →
approved**. Pre-existing rows are grandfathered as approved.
