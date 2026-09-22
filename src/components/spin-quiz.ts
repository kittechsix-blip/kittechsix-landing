// Spin to Win — per-season checkpoint quiz. Commit-before-reveal, one question
// at a time, score card + downloadable badge at the end. No accounts, no network.

import { APP_BASE, type Season } from '../data/spin-to-win.js';
import { storageGet, storageSet } from '../utils/storage.js';

const esc = (s: string): string => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));

export const bestKey = (seasonId: string): string => `spin-to-win:best:${seasonId}`;
export function readBest(seasonId: string): number | null {
  const v = storageGet<number | null>(bestKey(seasonId), null);
  return typeof v === 'number' ? v : null;
}

function track(name: string, data?: Record<string, string | number>): void {
  try { (window as any).va?.('event', { name, data }); } catch { /* analytics is optional */ }
}

/** Mono-caps date like SEP 22, 2026. */
function stampDate(d = new Date()): string {
  const m = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  return `${m} ${d.getDate()}, ${d.getFullYear()}`;
}

/** Read a design token from :root so the canvas matches the page. */
function token(name: string, fallback: string): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

/** Word-wrap a line of canvas text to a max pixel width. */
function wrap(ctx: CanvasRenderingContext2D, text: string, max: number): string[] {
  const words = text.split(/\s+/); const lines: string[] = []; let line = '';
  for (const w of words) {
    const test = line ? line + ' ' + w : w;
    if (ctx.measureText(test).width > max && line) { lines.push(line); line = w; } else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

function drawBadge(canvas: HTMLCanvasElement, season: Season, score: number, total: number): void {
  const S = 1080; canvas.width = S; canvas.height = S;
  const ctx = canvas.getContext('2d'); if (!ctx) return;
  const paper = token('--paper', 'white'), ink = token('--ink', 'black'), meta = token('--meta', 'gray');
  const accent = token('--accent-press', token('--accent', 'peru')), hair = token('--hairline', 'lightgray');
  const display = token('--font-display', 'Georgia, serif'), text = token('--font-text', 'system-ui, sans-serif'), mono = token('--font-mono', 'monospace');

  ctx.fillStyle = paper; ctx.fillRect(0, 0, S, S);
  // Copper hairline frame, doubled.
  ctx.strokeStyle = accent; ctx.lineWidth = 3; ctx.strokeRect(48, 48, S - 96, S - 96);
  ctx.lineWidth = 1; ctx.strokeRect(64, 64, S - 128, S - 128);

  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = accent; ctx.font = `400 34px ${mono}`;
  ctx.fillText('S P I N   T O   W I N', S / 2, 190);
  ctx.fillStyle = meta; ctx.font = `400 26px ${mono}`;
  ctx.fillText(`CHECKPOINT ${season.id.replace(/^s/i, '')}  ·  ${stampDate()}`, S / 2, 240);

  // Season title, wrapped.
  ctx.fillStyle = ink; ctx.font = `500 64px ${display}`;
  const lines = wrap(ctx, season.title, S - 240);
  let y = 360; for (const l of lines.slice(0, 3)) { ctx.fillText(l, S / 2, y); y += 76; }

  // Hairline rule.
  ctx.strokeStyle = hair; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(240, y + 10); ctx.lineTo(S - 240, y + 10); ctx.stroke();

  // Score.
  ctx.fillStyle = accent; ctx.font = `500 220px ${display}`;
  ctx.fillText(`${score}/${total}`, S / 2, y + 260);
  ctx.fillStyle = ink; ctx.font = `600 34px ${text}`;
  ctx.fillText(score === total ? 'Clean sweep' : `${score} of ${total} correct`, S / 2, y + 330);
  ctx.fillStyle = meta; ctx.font = `400 26px ${text}`;
  ctx.fillText('Clinician education · not medical advice', S / 2, y + 376);

  // Footer.
  ctx.fillStyle = accent; ctx.font = `400 28px ${mono}`;
  ctx.fillText('kittech-six.org/#/spin-to-win', S / 2, S - 110);
}

export function mountQuiz(host: HTMLElement, season: Season): void {
  const qs = season.quiz; const total = qs.length;
  if (!total) return;
  let i = 0, score = 0, picked = -1, committed = false;
  host.innerHTML = '';
  const root = document.createElement('div'); root.className = 'spin-quiz'; root.setAttribute('aria-live', 'polite');
  host.appendChild(root);

  const renderQuestion = (): void => {
    const q = qs[i]!;
    root.innerHTML = `
      <div class="spin-quiz-top"><span class="hub-kicker">Checkpoint ${esc(season.id.replace(/^s/, ''))} · Question ${i + 1} of ${total}</span><span class="spin-quiz-score">Score ${score}</span></div>
      <h3 class="spin-quiz-prompt">${esc(q.prompt)}</h3>
      <div class="spin-quiz-choices" role="radiogroup" aria-label="Answer choices">
        ${q.choices.map((c, k) => `<button type="button" class="spin-choice" role="radio" aria-checked="false" data-k="${k}"><span class="spin-choice-key">${String.fromCharCode(65 + k)}</span><span>${esc(c)}</span></button>`).join('')}
      </div>
      <div class="spin-quiz-verdict" role="status" aria-live="polite"></div>
      <div class="spin-quiz-actions">
        <button type="button" class="hub-primary" data-commit disabled>Commit</button>
        <button type="button" class="spin-secondary" data-next hidden>${i + 1 === total ? 'See score' : 'Next'}</button>
      </div>`;
    picked = -1; committed = false;
    const choices = [...root.querySelectorAll<HTMLButtonElement>('.spin-choice')];
    const commit = root.querySelector<HTMLButtonElement>('[data-commit]')!;
    const next = root.querySelector<HTMLButtonElement>('[data-next]')!;
    const verdict = root.querySelector<HTMLElement>('.spin-quiz-verdict')!;
    choices.forEach(b => b.addEventListener('click', () => {
      if (committed) return;
      picked = Number(b.dataset.k);
      choices.forEach(x => { x.setAttribute('aria-checked', String(x === b)); x.classList.toggle('is-picked', x === b); });
      commit.disabled = false;
    }));
    commit.addEventListener('click', () => {
      if (picked < 0 || committed) return;
      committed = true;
      const right = picked === q.answer; if (right) score++;
      choices.forEach((x, k) => { x.disabled = true; x.classList.toggle('is-right', k === q.answer); x.classList.toggle('is-wrong', k === picked && !right); });
      verdict.innerHTML = `<p class="spin-verdict-line ${right ? 'is-right' : 'is-wrong'}"><strong>${right ? 'Correct.' : 'Not quite.'}</strong> ${esc(q.why)}</p><a class="hub-link" href="${esc(APP_BASE + q.appNode)}" target="_blank" rel="noopener noreferrer" data-app="${esc(q.appNode)}">Open this step in the app <span aria-hidden="true">↗</span></a>`;
      verdict.querySelector('[data-app]')?.addEventListener('click', () => track('app_click', { node: q.appNode, from: 'quiz' }));
      commit.hidden = true; next.hidden = false; next.focus();
    });
    next.addEventListener('click', () => { i++; if (i < total) renderQuestion(); else renderScore(); });
  };

  const renderScore = (): void => {
    const prev = readBest(season.id);
    if (prev === null || score > prev) storageSet(bestKey(season.id), score);
    track('quiz_complete', { season: season.id, score, total });
    root.innerHTML = `
      <div class="spin-score">
        <span class="hub-kicker">Checkpoint ${esc(season.id.replace(/^s/, ''))} complete</span>
        <p class="spin-score-big">${score}<span>/${total}</span></p>
        <p class="spin-score-title">${esc(season.title)}</p>
        <p class="spin-score-date">${esc(stampDate())}${prev !== null ? ` · BEST ${Math.max(prev, score)}/${total}` : ''}</p>
        <canvas class="spin-badge" width="1080" height="1080" aria-label="Spin to Win badge: ${esc(season.title)}, ${score} of ${total}"></canvas>
        <div class="spin-quiz-actions">
          <button type="button" class="hub-primary" data-save>Save badge</button>
          <button type="button" class="spin-secondary" data-retake>Retake</button>
          <span class="hub-copy-status" role="status" aria-live="polite"></span>
        </div>
      </div>`;
    const canvas = root.querySelector<HTMLCanvasElement>('canvas')!;
    const status = root.querySelector<HTMLElement>('.hub-copy-status')!;
    // Fonts may still be loading on a cold cache; draw once now and once when ready.
    drawBadge(canvas, season, score, total);
    document.fonts?.ready.then(() => drawBadge(canvas, season, score, total)).catch(() => { /* drawn once already */ });
    root.querySelector<HTMLButtonElement>('[data-save]')!.addEventListener('click', () => {
      canvas.toBlob(blob => {
        if (!blob) { status.textContent = 'Could not render the badge on this device.'; return; }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = `spin-to-win-${season.id}-badge.png`; a.rel = 'noopener';
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 2000);
        status.textContent = 'Badge saved.';
      }, 'image/png');
    });
    root.querySelector<HTMLButtonElement>('[data-retake]')!.addEventListener('click', () => { i = 0; score = 0; renderQuestion(); });
    host.dispatchEvent(new CustomEvent('spin-quiz:complete', { bubbles: true, detail: { seasonId: season.id, score, total } }));
  };

  renderQuestion();
  root.scrollIntoView({ block: 'start', behavior: 'smooth' });
}
