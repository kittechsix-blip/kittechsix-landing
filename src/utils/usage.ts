// Anonymous usage counts (Data Dog). Records which screen is open and which app card
// is clicked. Never records typed text, search text, query strings or link text.
// Telemetry client: ./telemetry.ts. Decision: claude-brain/decisions/2026-10-16-data-dog-telemetry.md

import { createTelemetry } from './telemetry.js';
import { router } from './router.js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabase.js';
import { WORK_APPS } from '../data/app-registry.js';

const telemetry = createTelemetry({
  app: 'kittech-six',
  appVersion: '2026.10.30',
  platform: 'web',
  url: SUPABASE_URL,
  anonKey: SUPABASE_ANON_KEY,
});

const FIXED_SCREENS = new Set(['collection', 'learn', 'how-i-build', 'about', 'consulting', 'studio', 'legal']);

/** Maps a hash path to a fixed screen id. Raw path text is never returned, only whitelisted ids. */
export function screenFor(path: string): string {
  const p = path.split('?')[0];
  if (p === '' || p === '/') return 'home';
  if (p === '/work') return 'work';
  if (p.startsWith('/work/')) {
    const id = p.slice('/work/'.length);
    return Object.prototype.hasOwnProperty.call(WORK_APPS, id) ? `work/${id}` : 'work';
  }
  if (p.startsWith('/projects')) return 'projects';
  if (p.startsWith('/workflows')) return 'workflows';
  if (p.startsWith('/spin-to-win')) return 'spin-to-win';
  if (p.startsWith('/') && FIXED_SCREENS.has(p.slice(1))) return p.slice(1);
  return 'other';
}

/** origin + pathname only, trailing slashes dropped, so query and hash never affect the match. */
function normalizeUrl(href: string): string | null {
  try {
    const u = new URL(href, window.location.href);
    return u.origin + u.pathname.replace(/\/+$/, '');
  } catch {
    return null;
  }
}

export function startUsageCounting(): void {
  const screen = () => telemetry.track('screen_view', { screen_id: screenFor(router.currentPath()) });
  screen();
  window.addEventListener('hashchange', screen);

  const appUrls = new Map<string, string>();
  for (const [id, app] of Object.entries(WORK_APPS)) {
    const key = app.liveUrl ? normalizeUrl(app.liveUrl) : null;
    if (key) appUrls.set(key, id);
  }

  document.addEventListener('click', (e) => {
    if (!(e.target instanceof Element)) return;
    const a = e.target.closest('a[href]');
    if (!a) return;
    const key = normalizeUrl(a.getAttribute('href') ?? '');
    const id = key ? appUrls.get(key) : undefined;
    if (id) telemetry.track('feature_open', { feature_id: 'app:' + id, props: { kind: 'app' } });
  }, true);
}
