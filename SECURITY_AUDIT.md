# Security Audit Report

**Project:** kittechsix-landing (https://kittech-six.org)
**Date:** 2026-09-08 (supersedes the 2026-04-05 audit)
**Stack:** Vanilla TypeScript (zero runtime deps), Vercel static hosting + one Node serverless function (`api/validate-license.mjs`), Supabase REST (anon key), service worker, Vercel Web Analytics
**Auditor:** Claude Security Audit Skill

This pass inspected source **and** probed the live deployment: response headers on kittech-six.org, and the Supabase REST API using the same public anon key the browser ships. Probes were read-only except one deliberate no-op (`PATCH votes=<current value>` on one suggestion) used to test whether anon can UPDATE. No rows were created, changed, or deleted.

---

## Summary

| # | Check | Grade | Details |
|---|-------|-------|---------|
| 1 | Row Level Security / DB Access Control | WARN | anon UPDATE is blocked (verified live); anon SELECT on `landing_emails` returned 0 rows but that is ambiguous (empty vs. hidden); vote RPC is anon-callable with no server-side throttle |
| 2 | Auth Flow Testing | N/A | No auth by design — public site |
| 3 | Rate Limiting | WARN | Browser-side limiter only for Supabase (bypassable); in-memory per-IP limiter on `/api/validate-license` resets on every cold start |
| 4 | Server-Side Validation | WARN | Title/description length and category are enforced only by HTML attributes; a direct REST caller can post anything. Output is HTML-escaped, so no XSS |
| 5 | Environment Variables | PASS | `.env` ignored, nothing secret ever committed, Polar org ID lives only in Vercel env, anon key is public by design |
| 6 | CAPTCHA on Public Forms | **FAIL** | Suggestion form and email signup have no bot protection, and suggestions render publicly and unmoderated |
| 7 | CORS / CSP Restrictions | PASS | Strict CSP + HSTS + nosniff + DENY framing, all verified on the live domain |
| 8 | Error Handling (No Leakage) | PASS | Users only ever see generic messages; raw Supabase text stays in the return value |
| 9 | Dependency & Code Scan | PASS | Zero dependencies, no `eval`/`Function`, strict TS, pre-push build gate |

**Overall: 4 PASS / 1 FAIL / 3 WARN / 1 N/A**

Since April: CSP went from missing to strong (WARN → PASS), and RLS is now partially verified live. The CAPTCHA gap is unchanged and is the one item that matters before promoting the site to a wider audience.

---

## Detailed Findings

### 1. Row Level Security / DB Access Control — WARN

**What was checked:**
`src/utils/supabase.ts` (client wrapper), `src/components/feedback-board.ts`, `src/components/email-signup.ts`, and live REST probes against `https://kzzqloklnxlqbccxbxgr.supabase.co/rest/v1` using the shipped anon key. No `supabase/migrations/` exist in this repo (the project is shared with myMedKitt), so policies could not be read from source.

**Findings:**
- Client wrapper restricts itself to `landing_suggestions` and `landing_emails` (`ALLOWED_TABLES`, line 6). Good hygiene, but it is a client-side allowlist — it does not bind an attacker who calls REST directly.
- **`landing_suggestions` anon SELECT → 206, 5 rows.** Exposed columns: `id, title, description, category, votes, created_at`. No PII. Public by design.
- **`landing_suggestions` anon UPDATE → blocked.** A no-op PATCH on a real row returned `[]` with `Prefer: return=representation`, which is PostgREST's RLS-filtered response. Anon cannot edit or zero-out suggestions.
- **`landing_emails` anon SELECT → 200, `content-range: */0`.** Zero rows is *either* "RLS hides them" *or* "nobody has signed up yet." PostgREST returns 200 in both cases. This is the single most important thing to confirm in the dashboard (see below) because if it is wrong, every colleague who signs up has their email readable by anyone with the anon key.
- **DELETE** was not tested on real rows (destructive). Impossible-filter DELETEs returned 200/`[]`, which is likewise ambiguous.
- **`increment_suggestion_vote` RPC → 204** for any UUID, including nonexistent ones. Anon can call it in a loop. The only dedupe is `localStorage` in the caller's own browser.
- OpenAPI root (`GET /rest/v1/`) returns no paths for anon — schema introspection is not leaking table names.
- Anon JWT: `role=anon`, expires 2036-03-02.

**Evidence:**
```
GET  /landing_suggestions?select=id&limit=0   → 206  content-range: */5
GET  /landing_emails?select=id&limit=0        → 200  content-range: */0   (ambiguous)
PATCH /landing_suggestions?id=eq.<real id> {"votes":<same>} → 200  []    (RLS blocked)
POST /rpc/increment_suggestion_vote {"suggestion_id":"0000…"} → 204   (anon-callable)
```

**Recommendation:**
Run this in the Supabase SQL editor and paste the result back if anything looks off:
```sql
select tablename, rowsecurity from pg_tables
 where schemaname='public' and tablename in ('landing_suggestions','landing_emails');
select tablename, policyname, cmd, roles, qual, with_check from pg_policies
 where tablename in ('landing_suggestions','landing_emails');
```
Expected: `rowsecurity = true` on both; `landing_emails` has **INSERT only** for `anon` (no SELECT policy at all); `landing_suggestions` has SELECT + INSERT for anon, no UPDATE/DELETE. For the RPC, either add a per-IP throttle table inside the function or accept that vote counts are advisory.

---

### 2. Auth Flow Testing — N/A

No login, signup, or session logic anywhere in `src/` or `api/`. The license endpoint validates keys against Polar but does not authenticate the caller — appropriate, since a license key is itself the credential and the response reveals nothing beyond valid/invalid.

---

### 3. Rate Limiting — WARN

**What was checked:** `src/utils/supabase.ts:14-22`, `api/validate-license.mjs:26-40`.

**Findings:**
- Supabase calls: 10 requests / 30 s, tracked in an in-page array. Disappears on reload and does not exist for anyone calling REST directly with the anon key (which is in the public repo and in every browser's network tab).
- `/api/validate-license`: 20 / min per IP from `x-forwarded-for`, stored in a `Map` inside the lambda. Vercel spins up fresh instances constantly, so the counter resets and multiple instances don't share state. It stops a naive script; it does not stop a determined one. Polar's own rate limits are the real backstop.
- No Vercel Firewall rules configured.

**Recommendation:** The cheap, effective fix is the same as Check 6 — put Cloudflare Turnstile in front of the two Supabase inserts via a small Vercel function. That gives you real server-side gating. For the license endpoint, Vercel Firewall rate-limit rules (dashboard → Firewall) are a two-minute setting if abuse ever appears.

---

### 4. Server-Side Validation — WARN

**What was checked:** Form handlers in `feedback-board.ts:65-93` and `email-signup.ts:25-50`; every `innerHTML` sink that touches user-controlled or route-controlled data (`hub.ts`, `feedback-board.ts`, `work-detail.ts`, router params).

**Findings:**
- Title `maxlength="100"`, description `maxlength="500"`, category from a `<select>` — all enforced by the browser only. Direct REST callers can post a 1 MB description or `category: "<anything>"`. Unless the table has CHECK constraints (not visible from here), the board will render it.
- Email: client regex only. Duplicates handled by a DB unique constraint (the 409 path in `email-signup.ts:42`), which is good.
- **XSS: mitigated.** `feedback-board.ts:205-209 escapeHtml()` wraps title, description, category. `hub.ts:5 esc()` wraps every catalog string and the search-box echo. Route params go through `decodeURIComponent` then either a registry lookup or `esc()`; unknown IDs fall to a not-found branch. `data-id="${s.id}"` in `feedback-board.ts:173` is unescaped but is a DB-generated UUID.
- No `eval`, `new Function`, `document.write`, or `javascript:` URLs anywhere in `src/` or `src/data/`.

**Recommendation:** Add CHECK constraints so the database enforces what the form promises:
```sql
alter table landing_suggestions
  add constraint title_len  check (char_length(title) between 1 and 100),
  add constraint desc_len   check (description is null or char_length(description) <= 500),
  add constraint cat_enum   check (category in ('myMedKitt','myStroke-Kitt','my-vertigo-app','AcidBase','Antibiotic Rx','MyTravelMedKitt','PowerKitt','Consulting','General'));
alter table landing_emails
  add constraint email_shape check (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$' and char_length(email) <= 254);
```

---

### 5. Environment Variables — PASS

**What was checked:** `.gitignore`, `git log --all --diff-filter=A -- '*.env' '*.key' '*.pem' '*.secret'`, grep of `src/`, `api/`, `index.html` for key-like strings, `git ls-files` for accidental inclusions.

**Findings:**
- `.env`, `.vercel/`, `recon/`, `.shots/`, `.playwright-cli/`, `.claude/` all ignored. Nothing matching a secret pattern was ever added to history.
- The only credential in source is the Supabase **anon** key (`supabase.ts:4`) — public by design, `role=anon`, safe *provided* RLS holds (Check 1).
- `POLAR_ORGANIZATION_ID` / `POLAR_SERVER` are read from `process.env` only; the function returns 503 rather than falling back to a hardcoded value.
- The GitHub repo is **public**. Tracked non-code files are `tasks/*.md`, `DESIGN.md`, `CLAUDE.md`, this file. They contain process notes (portrait iterations, audit logs), not secrets — but be aware that anything committed to `tasks/` is world-readable.
- No `.env.example` — acceptable here since the only env vars are the two documented at the top of `api/validate-license.mjs`.

**Recommendation:** None required. Optional: keep `tasks/` out of the public repo if you'd rather your working notes not be indexed.

---

### 6. CAPTCHA on Public Forms — FAIL

**What was checked:** Both public write paths — the suggestion form (`feedback-board.ts:37-52`, mounted on `#/studio`) and the email signup (`email-signup.ts`, present in the bundle).

**Findings:**
- No reCAPTCHA / Turnstile / hCaptcha, no honeypot field, no server-side token check on either form.
- Suggestions are **rendered to every visitor immediately** after insert, with no approval step. Anything a bot or a bored visitor posts — spam, links, offensive text — is live on your site until you delete it in the Supabase dashboard. This is the concrete risk of pointing residents at the site today.
- The email list is a spam sink: bots will fill it with junk addresses, and if Check 1's ambiguity resolves the wrong way, real addresses are readable.

**Recommendation (pick one; both are small):**
1. **Moderation gate (no third party, ~20 lines):** add `approved boolean default false` to `landing_suggestions`; change the anon SELECT policy to `using (approved = true)`; approve rows in the dashboard. The board stays open; nothing shows until you nod. Client change: show the submitter a "Thanks — it'll appear once reviewed" message instead of prepending the row.
2. **Cloudflare Turnstile:** free, no puzzle for humans. Move both inserts behind `api/submit.mjs` that verifies the Turnstile token server-side then inserts with the **service-role key** (kept in Vercel env, never shipped). Then revoke anon INSERT entirely.

Either way, add a one-line notice under the form: *"Please don't include patient information."* A physician audience will otherwise paste case details into a free-text box that lands in a third-party database.

---

### 7. CORS / CSP Restrictions — PASS

**What was checked:** `vercel.json` headers and the actual response from `https://kittech-six.org/`.

**Evidence (live):**
```
content-security-policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';
  img-src 'self' data:; connect-src 'self' https://kzzqloklnxlqbccxbxgr.supabase.co;
  frame-ancestors 'none'; form-action 'self'; object-src 'none'; base-uri 'self'
strict-transport-security: max-age=63072000; includeSubDomains; preload
x-content-type-options: nosniff
x-frame-options: DENY
referrer-policy: strict-origin-when-cross-origin
permissions-policy: geolocation=(), camera=(), microphone=(), payment=(), usb=()
```

**Findings:**
- `script-src 'self'` with no `unsafe-inline`/`unsafe-eval` — inline-script XSS is dead on arrival. Fonts and the analytics script are same-origin, so nothing third-party executes.
- `style-src 'unsafe-inline'` is present. Acceptable for a static site with no user-controlled styles; it is the only relaxation.
- `connect-src` is pinned to one Supabase host — no wildcard.
- `/api/validate-license` uses an explicit origin allowlist and echoes only matching origins with `Vary: Origin`. Note the list contains `kittechsix-landing.vercel.app` but **not `kittech-six.org`**; harmless today (the landing page doesn't call it) but will bite the first time it does.

**Recommendation:** None for security. Add `https://kittech-six.org` to `ALLOWED_ORIGINS` when convenient.

---

### 8. Error Handling (No Leakage) — PASS

**What was checked:** Every `catch` and every `result.error` consumer.

**Findings:**
- `supabaseInsert` returns Supabase's raw error text in `result.error` (`supabase.ts:76-77`), but the only consumer that reads it (`email-signup.ts:42-46`) uses it for a `duplicate` check and shows a fixed string. The feedback form shows nothing at all on failure — a UX gap, not a leak.
- The license endpoint maps every failure to a fixed code (`not_configured`, `rate_limited`, `upstream_error`, `upstream_unreachable`) and never forwards Polar's body.
- Network errors degrade to `'Network error.'`; the service worker serves cached pages offline.

**Recommendation:** Give the suggestion form a visible failure message ("Couldn't submit — try again"). Not a security item.

---

### 9. Dependency & Code Scan — PASS

**Findings:**
- `package.json` has **no dependencies or devDependencies**; `bunx tsc` is fetched at build time. `npm audit` is N/A — there is no supply chain to audit.
- No `eval`, `Function`, `child_process`, or dynamic `import()` of user input.
- TypeScript strict mode; `.githooks/pre-push` refuses to push on type errors.
- Minor: `src/sw.ts` "network-first" branch caches **every** GET including cross-origin Supabase responses. Only public suggestion data flows through it today. Scope it to `url.origin === location.origin` so a future authenticated fetch never lands in Cache Storage.

---

## Action Items — status as of 2026-09-08 (same day)

Everything code-side is applied and deployed. Everything database-side is written as one
idempotent migration, `scripts/sql/2026-09-08-landing-hardening.sql`, waiting to be run
(the audit tooling cannot execute SQL against the project; see `scripts/sql/README.md`).

### Critical (before promoting to residents/colleagues)
- [x] **Migration applied 2026-09-08.** Resulting policies: `emails_public_insert`,
      `suggestions_public_insert`, `suggestions_public_read` — nothing else. Re-probed live with
      the anon key afterwards:
      `SELECT landing_emails` → 401 · `SELECT landing_vote_log` → 401 · `UPDATE landing_suggestions`
      → 42501 permission denied · `INSERT approved=true` → 401 · `INSERT bad category` → 400 ·
      `INSERT malformed email` → 400 · public board still serves its 5 approved rows.
      **Check 1 is now effectively PASS; Check 4 and Check 6 are resolved.**
- [x] **Gate the public suggestion board** — client shipped (no optimistic insert; "held for
      review" message; honeypot). Server side lands with the migration (`approved` column +
      read policy `approved = true`; existing rows grandfathered).
- [x] **"No patient information" notice** under the feedback form.

### Recommended
- [x] CHECK constraints — in the migration (`NOT VALID`, so history can't block it).
- [x] Vote RPC — rebuilt in the migration: one vote per suggestion per client (IP-hash log),
      approved rows only, log table unreachable except through the function.
- [x] `https://kittech-six.org` added to the API CORS allowlist.
- [x] Inserts now use `Prefer: return=minimal`, so the public role never needs SELECT to submit.

### Nice to have
- [x] Service worker no longer intercepts cross-origin or non-GET requests.
- [x] Suggestion form shows success / rate-limited / failure states.
- [ ] `tasks/` remains in the public repo — your call; contents are process notes, not secrets.
- [ ] Vercel Firewall rate-limit rule on `/api/validate-license` if abuse ever appears (dashboard only).

---

## How to Re-Run This Audit

```bash
# In Claude Code:
claude -p "Run /security-audit on this project"
```

*Generated by the Security Audit skill*
