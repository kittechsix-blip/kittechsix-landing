// Spin to Win — the course map. One section per season, one row per episode,
// each row linked to the same node in myVertigoApp. Checkpoint quiz mounts inline.

import { SEASONS, APP_BASE, type Season, type Episode } from '../data/spin-to-win.js';
import { mountQuiz, readBest } from './spin-quiz.js';

const esc = (s: string): string => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const arrow = '<span aria-hidden="true">↗</span>';

function track(name: string, data?: Record<string, string | number>): void {
  try { (window as any).va?.('event', { name, data }); } catch { /* analytics is optional */ }
}

const PLATFORMS: Array<[keyof Episode['links'], string]> = [['youtube', 'YouTube'], ['instagram', 'Instagram'], ['tiktok', 'TikTok'], ['facebook', 'Facebook']];

function episodeRow(e: Episode, focused: boolean): string {
  const links = PLATFORMS.filter(([k]) => e.links[k]).map(([k, label]) => `<a class="spin-platform" href="${esc(e.links[k]!)}" target="_blank" rel="noopener noreferrer">${label} ${arrow}</a>`).join('');
  return `<li class="spin-ep${focused ? ' is-focus' : ''}" id="ep-${esc(e.id)}" data-ep="${esc(e.id)}">
    <div class="spin-ep-head"><span class="spin-ep-id">${esc(e.id)}</span>${e.long ? '<span class="spin-tag">long cut</span>' : ''}<span class="spin-pill spin-pill-${e.status}">${e.status}</span></div>
    <h3 class="spin-ep-title">${esc(e.title)}</h3>
    <p class="spin-ep-who">${esc(e.who)}${e.note ? ` · ${esc(e.note)}` : ''}</p>
    <div class="spin-ep-links">${links}<a class="spin-app" href="${esc(APP_BASE + e.appNode)}" target="_blank" rel="noopener noreferrer" data-app="${esc(e.id)}">Open in app ${arrow}</a></div>
  </li>`;
}

function seasonSection(s: Season, n: number, focusEp?: string): string {
  const best = readBest(s.id);
  const total = s.quiz.length;
  return `<section class="spin-season" id="season-${esc(s.id)}" aria-labelledby="season-${esc(s.id)}-title">
    <header class="spin-season-head">
      <span class="hub-kicker">Season ${n}</span>
      <h2 id="season-${esc(s.id)}-title">${esc(s.title)}</h2>
      <p class="spin-pathway">${esc(s.pathway)}</p>
      <p class="spin-blurb">${esc(s.blurb)}</p>
      <a class="hub-link" href="${esc(APP_BASE + s.entryNode)}" target="_blank" rel="noopener noreferrer" data-app="${esc(s.id)}-entry">Open this pathway in the app ${arrow}</a>
    </header>
    <ol class="spin-eps">${s.episodes.map(e => episodeRow(e, e.id === focusEp)).join('')}</ol>
    <footer class="spin-season-foot" data-season="${esc(s.id)}">
      ${total ? `<button type="button" class="hub-primary" data-quiz="${esc(s.id)}">Take checkpoint ${n}</button><span class="spin-best" role="status">${best !== null ? `Best: ${best}/${total}` : ''}</span>` : '<p class="spin-muted">Checkpoint arrives with the season.</p>'}
    </footer>
    <div class="spin-quiz-host" id="quiz-${esc(s.id)}"></div>
  </section>`;
}

export function renderSpinToWin(parent: HTMLElement, focusEp?: string): void {
  document.title = 'Spin to Win — Kittech-Six';
  const focus = focusEp ? focusEp.toUpperCase() : undefined;
  const el = document.createElement('section'); el.className = 'hub spin';
  el.innerHTML = `
    <header class="hub-page-head spin-head">
      <p class="hub-kicker">Spin to Win</p>
      <h1>The dizzy patient,<br>one step at a time.</h1>
      <p class="hub-intro">A video course that follows the same map as myVertigoApp. Start at the entrance, take one pathway at a time, and check yourself at the end of each.</p>
      <p class="spin-disclaimer">For clinician education. Not medical advice.</p>
    </header>
    <ol class="spin-how" aria-label="How to use this map">
      <li><span class="spin-how-n">01</span><strong>Watch the season</strong><span>In order. Each episode is one step of the map.</span></li>
      <li><span class="spin-how-n">02</span><strong>Open the app at that step</strong><span>Every row links to the same node in myVertigoApp.</span></li>
      <li><span class="spin-how-n">03</span><strong>Take the checkpoint</strong><span>Commit to an answer, then see why. Save the badge.</span></li>
    </ol>
    ${SEASONS.map((s, k) => seasonSection(s, k, focus)).join('')}
    <div class="spin-end">
      <button type="button" class="spin-secondary" data-print>Print this map</button>
      <div class="spin-follow"><span class="hub-kicker">Where to follow</span><ul><li>YouTube (coming)</li><li>Instagram @kittechsix</li><li>TikTok @kittechsix</li><li>Facebook Kittech-Six</li></ul></div>
    </div>`;
  parent.appendChild(el);

  el.querySelectorAll<HTMLAnchorElement>('[data-app]').forEach(a => a.addEventListener('click', () => track('app_click', { ep: a.dataset.app! })));
  el.querySelectorAll<HTMLButtonElement>('[data-quiz]').forEach(b => b.addEventListener('click', () => {
    const season = SEASONS.find(s => s.id === b.dataset.quiz); if (!season) return;
    const host = el.querySelector<HTMLElement>('#quiz-' + CSS.escape(season.id))!;
    b.setAttribute('aria-expanded', 'true');
    mountQuiz(host, season);
  }));
  el.addEventListener('spin-quiz:complete', ev => {
    const { seasonId, score, total } = (ev as CustomEvent<{ seasonId: string; score: number; total: number }>).detail;
    const best = readBest(seasonId) ?? score;
    const out = el.querySelector<HTMLElement>(`.spin-season-foot[data-season="${CSS.escape(seasonId)}"] .spin-best`);
    if (out) out.textContent = `Best: ${best}/${total}`;
  });
  el.querySelector<HTMLButtonElement>('[data-print]')?.addEventListener('click', () => window.print());

  if (focus) requestAnimationFrame(() => {
    const row = el.querySelector<HTMLElement>('#ep-' + CSS.escape(focus));
    if (!row) return;
    row.setAttribute('tabindex', '-1');
    row.scrollIntoView({ block: 'center' });
    row.focus({ preventScroll: true });
  });
}
