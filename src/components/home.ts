// Home — the KittechSix front door.
//
// Andy's own copper logo powers up at the centre of a dark, framed stage
// (the milled frame lives in index.html), then: the two flagship tools, every
// other live tool and lecture, the Build Room (live idea board + Educator
// Circle), and the physician. Styles: styles/home.css (all classes kx-).

import { PROJECTS, type Project } from '../data/studio-catalog.js';
import { WORK_APPS } from '../data/app-registry.js';
import { SOCIAL_ICONS } from './footer.js';
import { supabaseFetch, supabaseInsert, supabaseRpc } from '../utils/supabase.js';
import { storageGet, storageSet } from '../utils/storage.js';

const MYMEDKITT_URL = WORK_APPS.mymedkitt.liveUrl;
const VERTIGO_URL = WORK_APPS.myvertigoapp.liveUrl;

// Everything else that is live and worth a click. Spin to Win is deliberately
// absent until Andy says the course is ready.
const MORE_TOOLS = ['antibiotic-rx', 'acidbase', 'mystroke-kitt', 'acute-vision-loss', 'chest-tube'];
const LECTURES = ['usgiv-academy', 'vision-loss-lecture', 'cardiac-toxicology', 'ai-eng-learn'];

// Must match the landing_suggestions category CHECK constraint.
const IDEA_CATEGORIES = ['General', 'myMedKitt', 'my-vertigo-app', 'AcidBase', 'Antibiotic Rx', 'myStroke-Kitt', 'PowerKitt'];

const VOTED_KEY = 'kittechsix-voted-suggestions'; // shared with the collection's feedback board

interface Idea {
  id: string;
  title: string;
  category: string;
  votes: number;
  status?: 'open' | 'building' | 'built';
  built_url?: string | null;
}

const STATUS_LABEL = { open: 'Open', building: 'Building', built: 'Built' } as const;

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}

function socials(): string {
  const links: Array<[keyof typeof SOCIAL_ICONS, string, string]> = [
    ['tiktok', 'TikTok', 'https://www.tiktok.com/@kittechsix'],
    ['instagram', 'Instagram', 'https://www.instagram.com/kittechsix/'],
    ['linkedin', 'LinkedIn', 'https://www.linkedin.com/in/andrew-kitlowski-059266197/'],
    ['facebook', 'Facebook', 'https://www.facebook.com/profile.php?id=61591723356651'],
  ];
  return links.map(([key, label, url]) =>
    `<a class="kx-soc" href="${url}" target="_blank" rel="noopener" aria-label="Andy on ${label}">${SOCIAL_ICONS[key]}</a>`).join('');
}

function shelf(ids: string[]): string {
  return ids
    .map((id) => PROJECTS.find((p) => p.id === id))
    .filter((p): p is Project => Boolean(p && p.url))
    .map((p) => `<li><a href="${esc(p.url)}" target="_blank" rel="noopener">
        <img src="${esc(p.icon ?? 'assets/icons/kittech-brain.png')}" alt="" width="44" height="44" loading="lazy">
        <span><b>${esc(p.name)}</b><small>${esc(p.summary)}</small></span>
        <span class="kx-arrow" aria-hidden="true">↗</span></a></li>`)
    .join('');
}

const logoLayers = `
  <img class="kx-dim" src="assets/kittech-logo.webp" alt="" width="1120" height="948">
  <img class="kx-lit" src="assets/kittech-logo.webp" alt="" width="1120" height="948" fetchpriority="high">
  <img class="kx-front" src="assets/kittech-logo.webp" alt="" width="1120" height="948">
  <div class="kx-ignite"></div>
  <div class="kx-sweep"></div>
  <div class="kx-shimmer"></div>`;

const plus = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M4.5 0h3v4.5H12v3H7.5V12h-3V7.5H0v-3h4.5z" fill="currentColor"/></svg>';

export function renderHome(parent: HTMLElement): void {
  document.body.classList.add('kx-body');
  const root = document.createElement('div');
  root.className = 'kx';
  root.innerHTML = `
  <header class="kx-top">
    <a class="kx-brand" href="#/"><img src="assets/kittech-logo-sm.webp" alt="" width="200" height="169"><span>KITTECHSIX</span></a>
    <nav class="kx-nav" aria-label="Primary">
      <button type="button" data-kx-scroll="kx-tools">Tools</button>
      <button type="button" data-kx-scroll="kx-lab">Lectures</button>
      <button type="button" data-kx-scroll="kx-build">Build with me</button>
      <a href="#/projects">All projects</a>
    </nav>
    <a class="kx-btn kx-btn-cu" href="${MYMEDKITT_URL}" target="_blank" rel="noopener">Open myMedKitt</a>
  </header>

  <section class="kx-hero" aria-labelledby="kx-claim">
    <div class="kx-logo" role="img" aria-label="KittechSix: a copper brain made of circuit traces around a chip with a medical cross">${logoLayers}</div>
    <div class="kx-rule kx-rise" style="animation-delay:2.2s" aria-hidden="true"><i></i>${plus}<i></i></div>
    <p class="kx-byline kx-rise" style="animation-delay:2.3s">ANDY KITLOWSKI, MD · EMERGENCY MEDICINE</p>
    <h1 class="kx-claim kx-rise" id="kx-claim" style="animation-delay:2.45s">Clinical judgment, amplified.</h1>
    <p class="kx-sub kx-rise" style="animation-delay:2.55s">Emergency physician. Fifteen years teaching. I build the tools I wish I’d had on shift.</p>
    <div class="kx-actions kx-rise" style="animation-delay:2.65s">
      <a class="kx-btn kx-btn-cu" href="${MYMEDKITT_URL}" target="_blank" rel="noopener">Open myMedKitt</a>
      <a class="kx-btn kx-btn-ghost" href="${VERTIGO_URL}" target="_blank" rel="noopener">Open my-vertigo-app</a>
    </div>
    <div class="kx-socials kx-rise" style="animation-delay:2.75s">${socials()}</div>
  </section>

  <section class="kx-band" id="kx-tools" aria-labelledby="kx-tools-h">
    <div class="kx-head">
      <span class="kx-kick">BUILT ON SHIFT</span>
      <h2 id="kx-tools-h">Two tools, built for the bedside.</h2>
      <p>Designed by a practicing emergency physician, for the moments when the answer has to be fast and right.</p>
    </div>
    <div class="kx-apps">
      <article class="kx-app">
        <div class="kx-phone"><img src="assets/screens/mymedkitt.png" alt="myMedKitt home screen: a consult search box and entries for Chief Complaint Hubs, Tricks of the Trade and MedKitt Learn." width="390" height="844" loading="lazy"></div>
        <div class="kx-meta"><h3><img src="assets/icons/mymedkitt.png" alt="" width="30" height="30">myMedKitt</h3><p>350+ emergency consults as step-by-step decision trees.</p><a class="kx-go" href="${MYMEDKITT_URL}" target="_blank" rel="noopener">Open myMedKitt →</a></div>
      </article>
      <article class="kx-app">
        <div class="kx-phone"><img src="assets/screens/my-vertigo-app.png" alt="my-vertigo-app workup screen: Screen for Central Features, with tabs for Safety, Timing, BPPV, HINTS+ and Mimics." width="390" height="844" loading="lazy"></div>
        <div class="kx-meta"><h3><img src="assets/icons/myvertigoapp.png" alt="" width="30" height="30">my-vertigo-app</h3><p>The dizzy patient, from bedside exam to disposition.</p><a class="kx-go" href="${VERTIGO_URL}" target="_blank" rel="noopener">Open my-vertigo-app →</a></div>
      </article>
    </div>
    <p class="kx-note">Educational decision support for licensed clinicians. Not FDA cleared. Not a substitute for clinical judgment.</p>
  </section>

  <section class="kx-band kx-lab" id="kx-lab" aria-labelledby="kx-lab-h">
    <div class="kx-head">
      <span class="kx-kick">MORE FROM THE LAB</span>
      <h2 id="kx-lab-h">Every tool and lecture, one tap away.</h2>
      <p>More clinical tools, and the lectures I teach from. Each opens straight into the real thing.</p>
    </div>
    <div class="kx-shelves">
      <div class="kx-shelf"><h3>CLINICAL TOOLS</h3><ul>${shelf(MORE_TOOLS)}</ul></div>
      <div class="kx-shelf"><h3>LECTURES &amp; COURSES</h3><ul>${shelf(LECTURES)}</ul></div>
    </div>
    <div class="kx-all"><a class="kx-go" href="#/projects">Browse every project →</a><a class="kx-go" href="#/learn">All lectures &amp; learning →</a><a class="kx-go" href="#/workflows">AI workflow guides →</a></div>
  </section>

  <section class="kx-band kx-room" id="kx-build" aria-labelledby="kx-build-h">
    <div class="kx-head">
      <span class="kx-kick">THE BUILD ROOM</span>
      <h2 id="kx-build-h">Build it with me.</h2>
      <p>Almost every tool here started as a question from a colleague on shift. Post the tool you wish existed, vote for the ones you need, and watch them get built.</p>
    </div>
    <div class="kx-room-grid">
      <div class="kx-board" aria-labelledby="kx-board-h">
        <div class="kx-board-top"><h3 id="kx-board-h">Top ideas from the community</h3><span class="kx-legend" aria-hidden="true"><i class="kx-st open">Open</i><i class="kx-st building">Building</i><i class="kx-st built">Built</i></span></div>
        <ol class="kx-ideas" id="kx-ideas" aria-live="polite"><li class="kx-empty">Loading the board…</li></ol>
      </div>
      <div class="kx-door">
        <h3>Send me a build idea</h3>
        <p>The tool you wish existed. The workflow that wastes your shift. The topic you can’t find a good way to teach.</p>
        <form id="kx-idea" novalidate>
          <label>Your idea, in a line<input type="text" name="title" required maxlength="100" placeholder="A tool that…"></label>
          <label>What problem would it solve? <span class="kx-fine">(optional)</span><textarea name="description" maxlength="500"></textarea></label>
          <label>Which tool is it for?<select name="category">${IDEA_CATEGORIES.map((c) => `<option>${c}</option>`).join('')}</select></label>
          <input class="kx-hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
          <p class="kx-fine">No patient information, please: no names, dates of birth, record numbers or case details. Ideas appear once reviewed.</p>
          <button class="kx-btn kx-btn-cu" type="submit">Post the idea</button>
          <p class="kx-status" role="status"></p>
        </form>
      </div>
    </div>
    <div class="kx-circle">
      <div><h3>Join the Educator Circle</h3><p>For residents, attendings and educators who teach with technology. One email when something ships, early access, and first say on what gets built next. Nothing else.</p></div>
      <form id="kx-circle" novalidate>
        <input type="email" name="email" required autocomplete="email" placeholder="you@hospital.org" aria-label="Email">
        <input class="kx-hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
        <button class="kx-btn kx-btn-cu" type="submit">Join the circle</button>
        <p class="kx-status" role="status"></p>
      </form>
    </div>
  </section>

  <section class="kx-band" id="kx-about" aria-labelledby="kx-about-h">
    <div class="kx-about">
      <div class="kx-pic"><img src="assets/andy-kitlowski-trauma-portrait.jpg" alt="Andy Kitlowski in a white coat and copper tie, in the emergency department." width="1024" height="1536" loading="lazy"></div>
      <div>
        <span class="kx-kick">THE PHYSICIAN</span>
        <h2 id="kx-about-h">Andy Kitlowski, MD</h2>
        <p>Emergency physician at Dell Seton Medical Center in Austin. More than fifteen years teaching emergency medicine and simulation. I build clinical tools, lectures and AI workflows around the questions that come up on real shifts.</p>
        <div class="kx-all" style="justify-content:flex-start;margin-top:22px"><a class="kx-go" href="#/about">More about me →</a><a class="kx-go" href="#/how-i-build">How I build →</a></div>
      </div>
    </div>
  </section>

  <footer class="kx-foot">
    <a class="kx-brand" href="#/"><img src="assets/kittech-logo-sm.webp" alt="" width="200" height="169"><span>KITTECHSIX</span></a>
    <span>Andy Kitlowski, MD · Austin, Texas · © 2026 Kittech-Six LLC</span>
    <nav aria-label="Footer"><a href="#/projects">Projects</a><a href="#/learn">Learn</a><a href="#/workflows">AI guides</a><a href="#/legal">Legal &amp; privacy</a></nav>
    <div class="kx-socials">${socials()}</div>
  </footer>`;
  parent.appendChild(root);

  // In-page jumps are buttons: a bare "#section" href would be read by the hash router as a route.
  root.querySelectorAll<HTMLButtonElement>('[data-kx-scroll]').forEach((btn) => {
    btn.addEventListener('click', () => document.getElementById(btn.dataset.kxScroll ?? '')?.scrollIntoView({ behavior: 'smooth' }));
  });

  mountBoard(root);
  mountIdeaForm(root);
  mountCircleForm(root);
}

/** Called when leaving the home route so the dark ground never bleeds into other pages. */
export function leaveHome(): void {
  document.body.classList.remove('kx-body');
}

// ---- The Build Room -------------------------------------------------------

async function loadIdeas(): Promise<Idea[] | null> {
  const order = '&order=votes.desc,created_at.desc&limit=8';
  // status / built_url arrive with scripts/sql/2026-09-28-idea-status.sql; until
  // that migration runs, fall back to the original columns and show every idea as Open.
  const full = await supabaseFetch<Idea[]>('landing_suggestions', `select=id,title,category,votes,status,built_url${order}`);
  if (full.data) return full.data;
  const basic = await supabaseFetch<Idea[]>('landing_suggestions', `select=id,title,category,votes${order}`);
  return basic.data;
}

function mountBoard(root: HTMLElement): void {
  const list = root.querySelector<HTMLOListElement>('#kx-ideas');
  if (!list) return;
  const voted = new Set<string>(storageGet<string[]>(VOTED_KEY, []));

  loadIdeas().then((ideas) => {
    if (!ideas) { list.innerHTML = '<li class="kx-empty">The board couldn’t load just now. Please try again later.</li>'; return; }
    if (!ideas.length) { list.innerHTML = '<li class="kx-empty">No ideas yet. Be the first.</li>'; return; }
    list.innerHTML = ideas.map((idea) => {
      const st = idea.status ?? 'open';
      const link = st === 'built' && idea.built_url && /^https:\/\//.test(idea.built_url)
        ? ` · <a href="${esc(idea.built_url)}" target="_blank" rel="noopener">Open it →</a>` : '';
      const done = voted.has(idea.id);
      return `<li><button class="kx-vote" type="button" data-id="${esc(idea.id)}" aria-label="Upvote: ${esc(idea.title)}"${done ? ' disabled' : ''}>
          <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M6 2l5 7H1z"/></svg><span>${idea.votes ?? 0}</span></button>
        <div><div class="kx-idea-t">${esc(idea.title)}</div>
        <div class="kx-idea-m"><i class="kx-st ${st}">${STATUS_LABEL[st] ?? 'Open'}</i><span>${esc(idea.category)}</span>${link}</div></div></li>`;
    }).join('');
  });

  list.addEventListener('click', async (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.kx-vote');
    if (!btn || btn.disabled) return;
    const id = btn.dataset.id ?? '';
    const count = btn.querySelector('span');
    btn.disabled = true;
    const result = await supabaseRpc<void>('increment_suggestion_vote', { suggestion_id: id });
    if (!result.error) {
      if (count) count.textContent = String(Number(count.textContent) + 1);
      voted.add(id);
      storageSet(VOTED_KEY, [...voted]);
    } else {
      btn.disabled = false;
    }
  });
}

function setStatus(form: HTMLFormElement, text: string, ok: boolean): void {
  const el = form.querySelector<HTMLElement>('.kx-status');
  if (!el) return;
  el.textContent = text;
  el.classList.toggle('ok', ok);
}

function mountIdeaForm(root: HTMLElement): void {
  const form = root.querySelector<HTMLFormElement>('#kx-idea');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    if (String(data.get('website') ?? '')) return; // honeypot: bots fill it, people never see it
    const btn = form.querySelector<HTMLButtonElement>('button[type=submit]');
    if (btn) btn.disabled = true;
    const description = String(data.get('description') ?? '').trim();
    const result = await supabaseInsert('landing_suggestions', {
      title: String(data.get('title') ?? '').trim(),
      description: description || null,
      category: String(data.get('category') ?? 'General'),
    });
    if (btn) btn.disabled = false;
    if (!result.error) {
      form.reset();
      setStatus(form, 'Thank you. Your idea will appear on the board once it has been reviewed.', true);
    } else if (result.status === 429) {
      setStatus(form, 'Too many submissions in a row. Please wait a moment and try again.', false);
    } else {
      setStatus(form, 'That didn’t go through. Please try again.', false);
    }
  });
}

function mountCircleForm(root: HTMLElement): void {
  const form = root.querySelector<HTMLFormElement>('#kx-circle');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    if (String(data.get('website') ?? '')) return;
    const email = String(data.get('email') ?? '').trim();
    const btn = form.querySelector<HTMLButtonElement>('button[type=submit]');
    if (btn) btn.disabled = true;
    const result = await supabaseInsert('landing_emails', { email, source: 'educator-circle' });
    if (btn) btn.disabled = false;
    // A duplicate address means they're already in, which is success from their side.
    if (!result.error || result.status === 409) {
      form.reset();
      setStatus(form, 'You’re in the circle. I’ll write when something ships.', true);
    } else {
      setStatus(form, 'That didn’t go through. Please check the address and try again.', false);
    }
  });
}
