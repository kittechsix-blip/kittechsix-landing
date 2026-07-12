// Hero Section — brand authority first, followed by the live flagship product.

import { activateAppTab } from './app-tabs.js';

export interface HeroOptions {
  /** Screens to cycle inside the hero phone (usually the first myMedKitt tour screens). */
  phoneScreens?: Array<() => HTMLElement>;
}

const CYCLE_MS = 4200;
const PHONE_W = 375;
const PHONE_H = 812;

export function renderHero(parent: HTMLElement, options: HeroOptions = {}): void {
  const section = document.createElement('section');
  section.className = 'hero section-dark';
  section.id = 'hero';

  section.innerHTML = `
    <div class="hero-shell">
      <header class="hero-banner" aria-label="Kittech-Six medical software lab">
        <div class="hero-banner-brand">
          <img
            class="hero-banner-logo"
            src="assets/kittechsix-logo-hero.jpg"
            alt="Kittech-Six brain and circuit logo"
            width="1200"
            height="1071"
            fetchpriority="high"
          />
          <div class="hero-banner-message">
            <span class="hero-banner-kicker">Medical software lab &middot; Austin, Texas</span>
            <strong>Clinical instinct, engineered.</strong>
            <span>Serious tools for the moments that matter.</span>
          </div>
        </div>

        <figure class="hero-creator">
          <img
            src="assets/andy-kitlowski-headshot.jpg"
            alt="Dr. Andy Kitlowski, emergency physician and creator of Kittech-Six"
            width="1200"
            height="1152"
          />
          <figcaption>
            <span>Created by</span>
            <strong>Andy Kitlowski, MD</strong>
            <small>Emergency physician &middot; 25 years</small>
          </figcaption>
        </figure>
      </header>

      <div class="hero-content">
        <div class="hero-copy">
          <p class="eyebrow hero-eyebrow">The flagship &middot; myMedKitt</p>
          <h1 class="hero-title" aria-label="Bedside tools for your next shift.">
            <span aria-hidden="true">
              <span class="line"><span class="line-inner">Bedside tools</span></span>
              <span class="line"><span class="line-inner hero-accent">for your next shift.</span></span>
            </span>
          </h1>
          <p class="hero-sub">The emergency department in your pocket: 400+ consults, 300+ drugs, and bedside calculators built by the ER doctor who uses them. Fast, offline-first, and ready without an account.</p>
          <div class="hero-cta">
            <a class="cta-primary" href="https://kittechsix-blip.github.io/mymedkitt/app.html" target="_blank" rel="noopener" id="hero-explore-btn">Open myMedKitt &mdash; no sign-up</a>
            <a class="cta-ghost" href="#apptabs-mymedkitt" id="hero-tour-btn">Tour the live UI</a>
          </div>
          <ul class="hero-trust" role="list">
            <li><strong>400+</strong> clinical consults</li>
            <li><strong>300+</strong> drugs</li>
            <li class="is-live"><span class="live-dot" aria-hidden="true"></span><strong>6</strong> live apps</li>
          </ul>
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
    </div>
  `;

  parent.appendChild(section);

  document.getElementById('hero-tour-btn')?.addEventListener('click', (event) => {
    event.preventDefault();
    activateAppTab('mymedkitt', 'tour');
  });

  mountPhone(section, options.phoneScreens ?? []);
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
