import { mountVertigoShowcase } from './vertigo-showcase.js';
// Home — the KittechSix front door.
//
// Andy's own copper logo powers up at the centre of a dark, framed stage
// (the milled frame lives in index.html), then: the two flagship tools, every
// other live tool and lecture, the Educator Circle signup, and the physician. Styles: styles/home.css (all classes kx-).

import { PROJECTS, FEATURED_CLINICAL_TOOL_IDS, FEATURED_LEARNING_IDS, type Project } from '../data/studio-catalog.js';
import { WORK_APPS } from '../data/app-registry.js';
import { SOCIAL_ICONS } from './footer.js';
import { supabaseInsert } from '../utils/supabase.js';

const MYMEDKITT_URL = WORK_APPS.mymedkitt.liveUrl;
const VERTIGO_URL = WORK_APPS.myvertigoapp.liveUrl;

// Featured clinical tools and lectures, in display order.
const MORE_TOOLS = FEATURED_CLINICAL_TOOL_IDS;
const LECTURES = FEATURED_LEARNING_IDS;

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

function shelf(ids: readonly string[]): string {
  return ids
    .map((id) => PROJECTS.find((p) => p.id === id))
    .filter((p): p is Project => Boolean(p && p.url))
    .map((p) => `<li><a href="${esc(p.url)}" target="_blank" rel="noopener">
        <img src="${esc(p.icon ?? 'assets/icons/kittech-brain.png')}" alt="" width="44" height="44" loading="lazy">
        <span><b>${esc(p.name)}</b><small>${esc(p.summary)}</small></span>
        <span class="kx-arrow" aria-hidden="true">↗</span></a></li>`)
    .join('');
}

const heartbeatApps = [...FEATURED_CLINICAL_TOOL_IDS, ...FEATURED_LEARNING_IDS]
  .map((id) => PROJECTS.find((project) => project.id === id))
  .filter((project): project is Project => Boolean(project?.icon));

const fireworkColors: Record<string, string> = {
  mymedkitt: '#39d786', myvertigoapp: '#55dae0', 'mystroke-kitt': '#ff725c',
  'obgyn-kitt': '#ff62bb', electrokitt: '#64d8ff', acidbase: '#62c7ff',
  'burn-kitt': '#ffad69', powerkitt: '#b8ddff', echokitt: '#ffb987',
};

const logoLayers = `
  <img class="kx-wordmark" src="assets/kittech-logo.webp" alt="" width="1120" height="948">
  <div class="kx-brain">
  <img class="kx-dim" src="assets/kittech-logo.webp" alt="" width="1120" height="948">
  <img class="kx-lit" src="assets/kittech-logo.webp" alt="" width="1120" height="948" fetchpriority="high">
  <img class="kx-front" src="assets/kittech-logo.webp" alt="" width="1120" height="948">
  <div class="kx-ignite"></div>
  <div class="kx-sweep"></div>
  <div class="kx-shimmer"></div>
  ${heartbeatApps.map((app, index) => `<span class="kx-heart-icon" style="--icon-index:${index}; --icon-count:${heartbeatApps.length}; --spark-color:${fireworkColors[app.id]}"><img src="${esc(app.icon!)}" alt="" width="121" height="121"></span>`).join('')}
  </div>
  ${heartbeatApps.map((app, index) => `<div class="kx-firework ${['kx-firework-up', 'kx-firework-right', 'kx-firework-left'][index % 3]}" aria-hidden="true" style="--icon-index:${index}; --icon-count:${heartbeatApps.length}; --spark-color:${fireworkColors[app.id]}">
    <span class="kx-rocket"></span><span class="kx-burst">${Array.from({ length: 32 }, (_, ray) => `<i style="--ray:${ray}; --distance:${48 + (ray % 5) * 13}px; --spark-delay:${(ray % 4) * .035}s"></i>`).join('')}</span><span class="kx-firework-name">${esc(app.name)}</span>
  </div>`).join('')}`;

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
      <button type="button" data-kx-scroll="kx-build">Join the circle</button>
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
        <div class="kx-phone"><video src="assets/screens/mymedkitt-burn-tbsa.mp4" poster="assets/screens/mymedkitt-burn-tbsa.jpg" width="390" height="844" autoplay muted loop playsinline preload="metadata" aria-label="myMedKitt burn calculator demo: the anterior neck and chest and both surfaces of the right arm fill to 19% TBSA, followed by Parkland and Dell Seton results for an 80 kg example."></video></div>
        <div class="kx-meta"><h3><img src="assets/icons/mymedkitt-current.png" alt="" width="30" height="30">myMedKitt</h3><p>350+ emergency consults as step-by-step decision trees. Paint the burn, get the TBSA, then the resuscitation fluid.</p><a class="kx-go" href="${MYMEDKITT_URL}" target="_blank" rel="noopener">Open myMedKitt →</a></div>
      </article>
      <article class="kx-app">
        <div class="kx-vt-showcase" data-vertigo-showcase></div>
        <div class="kx-meta"><h3><img src="assets/icons/myvertigoapp.png" alt="" width="30" height="30">my-vertigo-app</h3><p>The dizzy patient, from bedside exam to disposition. Explore the redesigned safety layouts and visual nystagmus teaching tools.</p><a class="kx-go" href="${VERTIGO_URL}" target="_blank" rel="noopener">Open my-vertigo-app →</a></div>
      </article>
    </div>
    <p class="kx-note">Educational decision support for licensed clinicians. Not FDA cleared. Not a substitute for clinical judgment.</p>
  </section>

  <section class="kx-band kx-lab" id="kx-lab" aria-labelledby="kx-lab-h">
    <div class="kx-head">
      <span class="kx-kick">MORE FROM THE LAB</span>
      <h2 id="kx-lab-h">Every tool and lecture, one tap away.</h2>
      <p>The featured clinical tools and lectures I teach from, in the order I want them seen. Everything else is explained in Browse every project.</p>
    </div>
    <div class="kx-shelves">
      <div class="kx-shelf"><h3>CLINICAL TOOLS</h3><ul>${shelf(MORE_TOOLS)}</ul></div>
      <div class="kx-shelf"><h3>LECTURES &amp; COURSES</h3><ul>${shelf(LECTURES)}</ul></div>
    </div>
    <div class="kx-all"><a class="kx-go" href="#/projects">Browse every project →</a><a class="kx-go" href="#/learn">All lectures &amp; learning →</a></div>
  </section>

  <section class="kx-band kx-room" id="kx-build" aria-labelledby="kx-build-h">
    <div class="kx-head">
      <span class="kx-kick">EDUCATOR CIRCLE</span>
      <h2 id="kx-build-h">Stay in the loop.</h2>
      <p>Almost every tool here started as a question from a colleague on shift. Join the circle to hear when something ships.</p>
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
      <div class="kx-pic"><img src="assets/andy-kitlowski-profile-20261103.png" alt="Dr. Andy Kitlowski, emergency physician in black scrubs." width="304" height="380" loading="lazy"></div>
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
    <nav aria-label="Footer"><a href="#/projects">Projects</a><a href="#/learn">Learn</a><a href="#/legal">Legal &amp; privacy</a></nav>
    <div class="kx-socials">${socials()}</div>
  </footer>`;
  parent.appendChild(root);
  const vertigoShowcase = root.querySelector<HTMLElement>('[data-vertigo-showcase]');
  if (vertigoShowcase) mountVertigoShowcase(vertigoShowcase);

  // The Lateralize demo loops silently; honour reduced-motion by leaving it on the poster frame.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.querySelectorAll<HTMLVideoElement>('.kx-phone video').forEach((v) => { v.removeAttribute('autoplay'); v.pause(); });
  }

  // In-page jumps are buttons: a bare "#section" href would be read by the hash router as a route.
  root.querySelectorAll<HTMLButtonElement>('[data-kx-scroll]').forEach((btn) => {
    btn.addEventListener('click', () => document.getElementById(btn.dataset.kxScroll ?? '')?.scrollIntoView({ behavior: 'smooth' }));
  });

  mountCircleForm(root);
}

/** Called when leaving the home route so the dark ground never bleeds into other pages. */
export function leaveHome(): void {
  document.body.classList.remove('kx-body');
}

// ---- Educator Circle ------------------------------------------------------

function setStatus(form: HTMLFormElement, text: string, ok: boolean): void {
  const el = form.querySelector<HTMLElement>('.kx-status');
  if (!el) return;
  el.textContent = text;
  el.classList.toggle('ok', ok);
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
