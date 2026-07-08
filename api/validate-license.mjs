// License validation proxy — shared by every Kittech app's unlock screen.
// Fronts Polar's customer-portal license-key endpoints so the apps never embed
// the organization ID and so the payment provider stays swappable.
//
// Plain .mjs on purpose: the repo's tsconfig targets browser ESM, which breaks
// Vercel's TS function compile (emits ESM into a CJS lambda). No compile, no problem.
//
// POST { key: string, appId?: string, activate?: boolean, label?: string }
//  -> { valid: boolean, status?: string, expiresAt?: string | null, activationId?: string }
//
// Env (Vercel project settings):
//   POLAR_ORGANIZATION_ID  — required; endpoint returns 503 until set
//   POLAR_SERVER           — 'sandbox' | 'production' (default 'production')

// Origins allowed to call this endpoint from the browser (the apps' homes).
const ALLOWED_ORIGINS = new Set([
  'https://kittechsix-blip.github.io',
  'https://mystroke-kitt.vercel.app',
  'https://antibiotic-rx.vercel.app',
  'https://my-vertigo-app.vercel.app',
  'https://acidbase.vercel.app',
  'https://fck-cancer.vercel.app',
  'https://kittechsix-landing.vercel.app',
]);

// Best-effort per-IP rate limit (in-memory, resets on cold start).
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 20;
const hits = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    hits.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export default async function handler(req, res) {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  const orgId = process.env.POLAR_ORGANIZATION_ID;
  if (!orgId) {
    res.status(503).json({ error: 'not_configured' });
    return;
  }

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    res.status(429).json({ error: 'rate_limited' });
    return;
  }

  const { key, activate, label } = req.body ?? {};
  if (typeof key !== 'string' || key.length < 8 || key.length > 200) {
    res.status(400).json({ error: 'missing_or_invalid_key' });
    return;
  }

  const base = process.env.POLAR_SERVER === 'sandbox'
    ? 'https://sandbox-api.polar.sh'
    : 'https://api.polar.sh';
  const endpoint = activate ? 'activate' : 'validate';
  const payload = { key, organization_id: orgId };
  if (activate) payload.label = typeof label === 'string' && label ? label.slice(0, 100) : 'device';

  try {
    const upstream = await fetch(`${base}/v1/customer-portal/license-keys/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      // 404 from Polar = key doesn't exist; anything else is an upstream fault.
      if (upstream.status === 404) {
        res.status(200).json({ valid: false, status: 'not_found' });
      } else {
        res.status(502).json({ error: 'upstream_error' });
      }
      return;
    }
    res.status(200).json({
      valid: (data.status ?? 'granted') === 'granted',
      status: data.status ?? null,
      expiresAt: data.expires_at ?? data.license_key?.expires_at ?? null,
      activationId: data.id && activate ? data.id : undefined,
    });
  } catch {
    res.status(502).json({ error: 'upstream_unreachable' });
  }
}
