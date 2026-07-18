// Hero Section — one cinematic dark moment: brand, live flagship product, founder.
// The old two-piece banner+hero is unified into a single full-bleed statement.

import { activateAppTab } from './app-tabs.js';

export interface HeroOptions {
  /** Screens to cycle inside the hero phone (usually the first myMedKitt tour screens). */
  phoneScreens?: Array<() => HTMLElement>;
}

const CYCLE_MS = 4200;
const PHONE_W = 375;
const PHONE_H = 812;

// Animated vitals trace — the clinical signature of the lab.
// One PQRST complex per 220px unit, tiled across the hero on a hairline.
const ECG_UNIT =
  'h52 q5,-7 10,0 h26 l5,8 l7,-30 l7,25 l5,-3 h34 q7,-9 14,0 h40';

export function renderHero(parent: HTMLElement, options: HeroOptions = {}): void {
  const section = document.createElement('section');
  section.className = 'hero';
  section.id = 'hero';

  section.innerHTML = `
    <div class="hero-bg" aria-hidden="true">
      <div class="hero-glow hero-glow--copper"></div>
      <div class="hero-glow hero-glow--green"></div>
      <div class="hero-grid"></div>
      <svg class="hero-ecg" viewBox="0 0 1440 60" preserveAspectRatio="none" focusable="false">
        <path class="hero-ecg-base" d="M0,30 ${ECG_UNIT} ${ECG_UNIT} ${ECG_UNIT} ${ECG_UNIT} ${ECG_UNIT} ${ECG_UNIT} ${ECG_UNIT}" />
        <path class="hero-ecg-sweep" d="M0,30 ${ECG_UNIT} ${ECG_UNIT} ${ECG_UNIT} ${ECG_UNIT} ${ECG_UNIT} ${ECG_UNIT} ${ECG_UNIT}" />
      </svg>
    </div>

    <div class="hero-shell">
      <div class="hero-content">
        <div class="hero-copy">
          <p class="eyebrow hero-eyebrow">
            <span class="hero-eyebrow-pulse" aria-hidden="true"></span>Medical software lab &middot; Austin, Texas
          </p>
          <h1 class="hero-title" aria-label="Bedside tools for your next shift.">
            <span aria-hidden="true">
              <span class="line"><span class="line-inner">Bedside tools</span></span>
              <span class="line"><span class="line-inner hero-accent">for your next shift.</span></span>
            </span>
          </h1>
          <p class="hero-sub">Clinical instinct, engineered &mdash; 400+ ER consults, 300+ drugs, and bedside calculators built by the emergency physician who uses them. Fast, offline-first, and ready without an account.</p>
          <div class="hero-cta">
            <a class="cta-primary" href="https://kittechsix-blip.github.io/mymedkitt/app.html" target="_blank" rel="noopener" id="hero-explore-btn">Open myMedKitt &mdash; no sign-up</a>
            <a class="cta-ghost" href="#apptabs-mymedkitt" id="hero-tour-btn">Tour the live UI</a>
          </div>
          <dl class="hero-stats" aria-label="Kittech-Six in numbers">
            <div class="hero-stat"><dt>ER consults</dt><dd><span class="count" data-count-to="400">0</span>+</dd></div>
            <div class="hero-stat"><dt>Drugs &amp; dosing</dt><dd><span class="count" data-count-to="300">0</span>+</dd></div>
            <div class="hero-stat"><dt>Bedside calculators</dt><dd><span class="count" data-count-to="25">0</span>+</dd></div>
            <div class="hero-stat is-live"><dt>Live apps</dt><dd><span class="count" data-count-to="6">0</span><span class="live-dot" aria-hidden="true"></span></dd></div>
          </dl>
        </div>

        <div class="hero-device" aria-label="myMedKitt running live on a phone">
          <div class="hero-phone-scaler">
            <div class="hero-phone-stage">
              <div class="hero-phone">
                <div class="hero-phone-inner" id="hero-phone-inner"></div>
              </div>
              <div class="hero-chipset" aria-hidden="true">
                <span class="hero-float-chip hero-float-chip--consults"><strong>400+</strong>&nbsp;ER consults</span>
                <span class="hero-float-chip hero-float-chip--dose"><span class="chip-mono">TNK 0.25 mg/kg &middot; max 25 mg</span></span>
                <span class="hero-float-chip hero-float-chip--live"><span class="chip-dot"></span>Offline-first &middot; no sign-up</span>
              </div>
              <span class="hero-device-caption" aria-hidden="true">Real myMedKitt interface &middot; running live</span>
            </div>
          </div>
        </div>
      </div>

      <footer class="hero-founder">
        <img
          class="hero-founder-photo"
          src="assets/andy-kitlowski-headshot.jpg"
          alt="Dr. Andy Kitlowski, emergency physician and creator of Kittech-Six"
          width="1200"
          height="1152"
        />
        <p class="hero-founder-line">
          <strong>Built &amp; maintained by Andy Kitlowski, MD</strong>
          <span>Emergency physician &middot; 25 years at the bedside &middot; every dose and pathway reviewed by the doctor who stands at one</span>
        </p>
        <a class="hero-founder-link link-arrow" href="#about">Why I build this
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </footer>
    </div>

    <a class="hero-scroll-cue" href="#featured" aria-label="Scroll to explore the apps">
      <span class="hero-scroll-cue-track" aria-hidden="true"><span class="hero-scroll-cue-dot"></span></span>
      Explore
    </a>
  `;

  parent.appendChild(section);

  document.getElementById('hero-tour-btn')?.addEventListener('click', (event) => {
    event.preventDefault();
    activateAppTab('mymedkitt', 'tour');
  });

  mountPhone(section, options.phoneScreens ?? []);
  runCounters(section);
}

function mountPhone(section: HTMLElement, screens: Array<() => HTMLElement>): void {
  const inner = section.querySelector<HTMLElement>('#hero-phone-inner');
  if (!inner) return;

  if (screens.length === 0) {
    inner.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#54504A;font-size:14px;">myMedKitt</div>`;
    return;
  }

  const mounted: HTMLElement[] = screens.map((render, index) => {
    const wrap = document.createElement('div');
    wrap.className = 'hero-phone-screen' + (index === 0 ? ' active' : '');
    wrap.appendChild(render());
    inner.appendChild(wrap);
    return wrap;
  });

  if (mounted.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let index = 0;
    window.setInterval(() => {
      mounted[index]!.classList.remove('active');
      index = (index + 1) % mounted.length;
      mounted[index]!.classList.add('active');
    }, CYCLE_MS);
  }

  const scaler = section.querySelector<HTMLElement>('.hero-phone-scaler');
  const device = section.querySelector<HTMLElement>('.hero-device');
  if (!scaler || !device) return;

  const rescale = () => {
    const available = Math.min(device.clientWidth, 420);
    const maxHeight = window.innerWidth > 900 ? 620 : Math.min(window.innerHeight * 0.82, PHONE_H);
    const scale = Math.min(1, available / PHONE_W, maxHeight / PHONE_H);
    scaler.style.transform = scale < 1 ? `scale(${scale})` : '';
    scaler.style.transformOrigin = 'top left';
    scaler.style.width = `${Math.round(PHONE_W * scale)}px`;
    scaler.style.height = `${Math.round(PHONE_H * scale)}px`;
  };

  rescale();
  window.addEventListener('resize', rescale, { passive: true });
}

// Count-up on the stat row — one pass, ease-out, skipped for reduced motion.
function runCounters(section: HTMLElement): void {
  const counters = section.querySelectorAll<HTMLElement>('.count[data-count-to]');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    counters.forEach((el) => { el.textContent = el.dataset['countTo'] ?? '0'; });
    return;
  }

  const DURATION = 1500;
  const DELAY = 550;
  counters.forEach((el, i) => {
    const target = Number(el.dataset['countTo'] ?? 0);
    const start = performance.now() + DELAY + i * 120;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / DURATION));
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}
