# Security Audit Report

**Project:** kittechsix-landing
**Date:** 2026-04-05
**Stack:** Vanilla TypeScript, Supabase (REST API), Vercel static hosting, Service Worker
**Auditor:** Claude Security Audit Skill

---

## Summary

| # | Check | Grade | Details |
|---|-------|-------|---------|
| 1 | Row Level Security / DB Access Control | WARN | Anon key is fine, but RLS policies cannot be verified from client code alone |
| 2 | Auth Flow Testing | N/A | No authentication system — intentional for a public landing page |
| 3 | Rate Limiting | WARN | Client-side rate limiter only (10 req / 30s) — easily bypassed |
| 4 | Server-Side Validation | WARN | Client-side email regex and maxlength; no server-side validation layer |
| 5 | Environment Variables | PASS | No secrets in code or git history; anon key is intentionally public |
| 6 | CAPTCHA on Public Forms | FAIL | No CAPTCHA on suggestion form or email signup — open to bot spam |
| 7 | CORS / CSP Restrictions | WARN | No CSP headers configured; Vercel defaults only |
| 8 | Error Handling (No Leakage) | PASS | Error messages are generic; Supabase errors not exposed to users |
| 9 | Dependency & Code Scan | PASS | Zero runtime dependencies; XSS mitigated with escapeHtml |

**Overall: 3 PASS / 1 FAIL / 3 WARN / 1 N/A (out of 8 applicable)**

---

## Detailed Findings

### 1. Row Level Security / DB Access Control — WARN

**What was checked:**
Reviewed the Supabase client setup in `src/utils/supabase.ts`. Checked which tables are accessed, what operations are performed, and whether the anon key is the only credential in use.

**Findings:**
- The anon key is hardcoded in `src/utils/supabase.ts:4` — this is correct and intentional for a client-side app. Supabase anon keys are designed to be public.
- Two tables are accessed: `landing_suggestions` and `landing_emails`. An `ALLOWED_TABLES` set (line 6) prevents the client wrapper from touching other tables.
- One RPC function is called: `increment_suggestion_vote` (line 174 in feedback-board.ts).
- **Cannot verify RLS from client code alone.** The actual policies on `landing_suggestions` and `landing_emails` must be checked in the Supabase dashboard.

**Evidence:**
```ts
// src/utils/supabase.ts:6
const ALLOWED_TABLES = new Set(['landing_suggestions', 'landing_emails']);
```

**Recommendation:**
Verify in the Supabase dashboard that these RLS policies exist:
- `landing_suggestions`: SELECT for anon, INSERT for anon (with field restrictions), no UPDATE/DELETE for anon
- `landing_emails`: INSERT only for anon, no SELECT/UPDATE/DELETE for anon (emails should never be readable from client)
- `increment_suggestion_vote` RPC: should have its own rate limiting or abuse prevention (e.g., limit to +1 per IP or session)

---

### 2. Auth Flow Testing — N/A

**What was checked:**
Scanned all source files for auth-related code, login forms, tokens, or session management.

**Findings:**
No authentication system exists. This is a public landing page with anonymous form submissions. This is intentional and appropriate for the use case.

**Recommendation:**
None — looking good.

---

### 3. Rate Limiting — WARN

**What was checked:**
Reviewed the rate limiting implementation in `src/utils/supabase.ts:15-22`.

**Findings:**
- Client-side rate limiter exists: max 10 requests per 30-second sliding window. This is a nice UX guard but provides zero security.
- Any attacker can bypass this by calling the Supabase REST API directly with the public anon key, skipping the client code entirely.
- No server-side rate limiting is configured. Vercel does not provide built-in request rate limiting for static sites. Supabase has some built-in protections but they are generous.

**Evidence:**
```ts
// src/utils/supabase.ts:15-22
let requestTimestamps: number[] = [];
function isRateLimited(): boolean {
  const now = Date.now();
  requestTimestamps = requestTimestamps.filter(t => now - t < 30000);
  if (requestTimestamps.length >= 10) return true;
  requestTimestamps.push(now);
  return false;
}
```

**Recommendation:**
For a landing page with low traffic, this is acceptable risk. If spam becomes a problem:
1. Add a Supabase Edge Function as a proxy with server-side rate limiting (IP-based)
2. Or use Supabase's built-in rate limiting on the RPC function
3. Or add CAPTCHA (see point 6) which solves both bot spam and rate abuse

---

### 4. Server-Side Validation / Input Sanitization — WARN

**What was checked:**
Reviewed all form inputs and their validation in `email-signup.ts` and `feedback-board.ts`.

**Findings:**
- **Email signup** (`email-signup.ts:29`): Client-side regex validation `^[^\s@]+@[^\s@]+\.[^\s@]+$` — basic but functional. No server-side validation.
- **Feedback form** (`feedback-board.ts:37-38`): HTML `maxlength="100"` on title, `maxlength="500"` on description, `required` on title. All client-side only.
- **XSS protection**: `escapeHtml()` function (feedback-board.ts:195-198) properly sanitizes user content before rendering. Uses the safe `div.textContent = str; return div.innerHTML` pattern. This is correct.
- **Category selection**: Uses a `<select>` dropdown, but the value is not validated server-side — an attacker could POST any category string to Supabase directly.

**Evidence:**
```ts
// feedback-board.ts:195-198 — XSS protection is solid
function escapeHtml(str: string): string {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
```

**Recommendation:**
- Add a Supabase CHECK constraint on `landing_suggestions.category` to restrict values to the allowed enum: `CHECK (category IN ('myMedKitt', 'MyTravelMedKitt', 'MyToolKitt', 'General'))`
- Add a CHECK constraint on `landing_suggestions.title` for max length: `CHECK (char_length(title) <= 100)`
- Add a CHECK constraint on `landing_emails.email` for basic format validation
- These database-level constraints are the real security boundary since all client-side checks can be bypassed

---

### 5. Environment Variables — PASS

**What was checked:**
- Scanned all source files for secrets (service_role keys, API secrets, private keys, passwords)
- Checked `.gitignore` for proper exclusions
- Reviewed full git history for previously committed secrets
- Checked for `.env` files on disk

**Findings:**
- `.gitignore` correctly excludes `node_modules/`, `dist/`, `.env`, `.vercel/` (lines 1-5)
- No `.env` files exist on disk
- Git history (2 commits) contains no secrets — only the Supabase anon key, which is intentionally public
- The Supabase anon key in `src/utils/supabase.ts:4` is a JWT with role `anon` — this is the correct key to expose in client code
- No service_role key found anywhere in the codebase or history

**Evidence:**
```
# .gitignore
node_modules/
dist/
.env
.vercel/
.vercel
```

**Recommendation:**
None — looking good.

---

### 6. CAPTCHA on Public Forms — FAIL

**What was checked:**
Reviewed both public forms for bot protection: the suggestion submission form and the email signup form.

**Findings:**
- **Suggestion form** (`feedback-board.ts`): No CAPTCHA, no honeypot field, no bot protection of any kind. Anyone (or any script) can submit unlimited suggestions.
- **Email signup** (`email-signup.ts`): Same — no CAPTCHA or bot protection. An attacker could flood the `landing_emails` table with junk addresses.
- **Vote function** (`increment_suggestion_vote` RPC): No protection against automated vote manipulation. The client-side `votedIds` localStorage check is trivially bypassed.

**Evidence:**
Both forms submit directly to Supabase with no intermediate verification:
```ts
// feedback-board.ts:72 — direct insert, no CAPTCHA
const result = await supabaseInsert<Suggestion[]>('landing_suggestions', {
  title,
  description: descInput.value.trim() || null,
  category: catSelect.value,
});

// email-signup.ts:37 — direct insert, no CAPTCHA
const result = await supabaseInsert('landing_emails', { email, source });
```

**Recommendation:**
Add Cloudflare Turnstile (free) or hCaptcha to both forms. Turnstile is invisible and lightweight:
1. Add the Turnstile script to `index.html`
2. Embed the widget in each form
3. Validate the token server-side via a Supabase Edge Function before inserting
4. As a quick interim fix, add a honeypot hidden field — bots fill it, humans don't

---

### 7. CORS / CSP Restrictions — WARN

**What was checked:**
Reviewed `vercel.json`, `index.html`, and service worker for security headers configuration.

**Findings:**
- **No CSP (Content Security Policy)** headers are configured anywhere. No `<meta>` tag in HTML, no headers in `vercel.json`.
- **No security headers** in `vercel.json` — the config only has `outputDirectory` and a rewrite rule.
- **Vercel provides some defaults** (X-Frame-Options, etc.) but does not add CSP automatically.
- **CORS**: Not directly applicable since the site makes requests to Supabase (a different origin), and Supabase handles CORS on its end. No API endpoints are served from this site.
- **Service worker** caches aggressively but this is a performance concern, not a security one.

**Evidence:**
```json
// vercel.json — no security headers
{
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Recommendation:**
Add security headers to `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Content-Security-Policy", "value": "default-src 'self'; connect-src 'self' https://kzzqloklnxlqbccxbxgr.supabase.co; style-src 'self' 'unsafe-inline'; img-src 'self' data:; frame-ancestors 'none'" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

---

### 8. Error Handling (No Leakage) — PASS

**What was checked:**
Reviewed all error handling paths in `supabase.ts`, `feedback-board.ts`, `email-signup.ts`, `storage.ts`, and `main.ts`.

**Findings:**
- **Supabase errors**: Generic messages returned to the UI (`'Network error.'`, `'Request failed: {status}'`). The raw Supabase error is captured in `supabaseInsert` (line 77: `errText`) but only stored in the response object — never displayed to users.
- **Email signup** (line 45): Shows `'Something went wrong. Please try again.'` — no internal details leaked.
- **Feedback board**: On vote failure, the button simply re-enables. No error message shown.
- **localStorage errors**: Caught and swallowed silently (`storage.ts`).
- **Service worker registration**: Failure caught with empty callback (`main.ts:60`).
- **No `console.error` calls** that might leak sensitive information in production.

**Evidence:**
```ts
// email-signup.ts:45 — generic error message
showError(wrapper, 'Something went wrong. Please try again.');

// supabase.ts:53 — generic network error
return { data: null, error: 'Network error.', status: 0 };
```

**Recommendation:**
None — looking good.

---

### 9. Dependency & Code Scan — PASS

**What was checked:**
- Reviewed `package.json` for dependencies
- Checked for lock files
- Scanned for XSS vulnerabilities in innerHTML usage
- Reviewed the codebase for common vulnerability patterns

**Findings:**
- **Zero runtime dependencies.** `package.json` has no `dependencies` or `devDependencies`. The only tool used is `bunx tsc` for compilation. This is an excellent security posture.
- **No lock files** exist (no `bun.lock`, `package-lock.json`, or `yarn.lock`), which is fine given zero dependencies.
- **XSS**: All user-generated content in the feedback board goes through `escapeHtml()` before rendering. The 17 other `innerHTML` assignments use hardcoded template literals with no user input — safe.
- **No `eval()`, `Function()`, or `document.write()`** found in the codebase.
- **`supabaseRpc`** does not validate the function name against an allowlist (unlike `supabaseFetch`/`supabaseInsert` which check `ALLOWED_TABLES`). Currently only `increment_suggestion_vote` is called, but the function could be used to call any Supabase RPC. Low risk since the call site is controlled, but worth noting.

**Evidence:**
```json
// package.json — zero dependencies
{
  "name": "kittechsix-landing",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "bunx tsc && cp index.html dist/ && ...",
    "dev": "bunx tsc --watch"
  }
}
```

**Recommendation:**
Consider adding an `ALLOWED_RPCS` set in `supabase.ts` to match the `ALLOWED_TABLES` pattern:
```ts
const ALLOWED_RPCS = new Set(['increment_suggestion_vote']);
```

---

## Action Items

### Critical (Fix Before Launch)
- [ ] **Verify Supabase RLS policies** in the dashboard for `landing_suggestions` and `landing_emails` — especially confirm `landing_emails` has no SELECT policy for anon (emails must not be readable from the client)
- [ ] **Add CAPTCHA** (Cloudflare Turnstile recommended — free, invisible) to the suggestion form and email signup to prevent bot spam

### Recommended (Fix Soon)
- [ ] **Add security headers** to `vercel.json` (CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- [ ] **Add database CHECK constraints** on `landing_suggestions.category` and field lengths to enforce validation server-side
- [ ] **Add `ALLOWED_RPCS`** allowlist in `supabase.ts` for the RPC wrapper function

### Nice to Have
- [ ] Add a honeypot field to forms as a quick interim bot filter before full CAPTCHA integration
- [ ] Consider a Supabase Edge Function proxy for inserts to enable server-side rate limiting and validation
- [ ] Add `Strict-Transport-Security` header (Vercel serves HTTPS by default, but the header signals intent)

---

## How to Re-Run This Audit

```bash
# In Claude Code:
claude -p "Run /security-audit on this project"

# Or as a pre-push hook (see setup instructions in the audit skill)
```

*Generated by the Security Audit skill*
