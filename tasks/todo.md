# Security Audit — Remaining Items

## Completed
- [x] CSP headers added to `vercel.json` (X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Content-Security-Policy)
- [x] RLS verified — `landing_emails` is write-only for anon, `landing_suggestions` is read+write correctly scoped
- [x] No secrets in git history or client code (anon key is intentionally public)
- [x] Input sanitization — `escapeHtml()` on user-submitted content, length limits on form fields
- [x] Error handling — generic messages, no stack traces or table names exposed

## To Do
- [ ] **CAPTCHA on public forms (FAIL)** — Add Cloudflare Turnstile (free, invisible) to suggestion form + email signup. Requires: Cloudflare account → Turnstile → Add Site → get Site Key + Secret Key. Validate server-side via Supabase Edge Function or Vercel serverless function.
- [ ] **Server-side rate limiting (WARN)** — Client-side limiter in `supabase.ts` is bypassable. Options: (a) Supabase Edge Function as proxy with rate limiting, (b) Vercel serverless function middleware, (c) Cloudflare WAF rules. Not urgent for v1 but should be in place before public launch.
- [ ] **Deploy CSP headers** — `vercel.json` updated but not yet deployed. Run `vercel --prod` after committing.
