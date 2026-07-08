// Hero Section — product-forward: copy column + a live device running the real myMedKitt UI.

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
    <div class="hero-content">
      <div class="hero-copy">
        <p class="eyebrow hero-eyebrow">Kittech-Six &middot; Medical Software Lab&nbsp;&middot;&nbsp;Austin,&nbsp;TX</p>
        <h1 class="hero-title" aria-label="Bedside tools for your next shift.">
          <span aria-hidden="true">
            <span class="line"><span class="line-inner">Bedside tools</span></span>
            <span class="line"><span class="line-inner hero-accent">for your next shift.</span></span>
          </span>
        </h1>
        <p class="hero-sub">Built by the ER doctor who actually uses them &mdash; 400+ ER consults, 300+ drugs, and clinical calculators, plus health apps for everyone. No account required.</p>
        <div class="hero-cta">
          <a class="cta-primary" href="https://kittechsix-blip.github.io/mymedkitt/app.html" target="_blank" rel="noopener" id="hero-explore-btn">Open myMedKitt &mdash; no sign-up</a>
          <a class="cta-ghost" href="#apptabs-mymedkitt" id="hero-tour-btn">Tour the apps</a>
        </div>
        <ul class="hero-trust" role="list">
          <li>Andy Kitlowski, MD &middot; <strong>25</strong> yrs in emergency medicine</li>
          <li class="is-live"><span class="live-dot" aria-hidden="true"></span><strong>6</strong> live apps</li>
          <li><strong>400+</strong> consults &middot; <strong>300+</strong> drugs</li>
        </ul>
      </div>
      <div class="hero-device" aria-label="myMedKitt running on a phone">
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
            <span class="hero-device-caption" aria-hidden="true">myMedKitt &mdash; live app UI</span>
          </div>
        </div>
      </div>
    </div>
  `;

  parent.appendChild(section);

  // Progressive enhancement: open the myMedKitt tour tab (href still anchors without JS)
  document.getElementById('hero-tour-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    activateAppTab('mymedkitt', 'tour');
  });

  mountPhone(section, options.phoneScreens ?? []);
}

/* Mount the real app screens inside the phone and cross-fade through them. */
function mountPhone(section: HTMLElement, screens: Array<() => HTMLElement>): void {
  const inner = section.querySelector<HTMLElement>('#hero-phone-inner');
  if (!inner) return;

  if (screens.length === 0) {
    // No clone screens available — show a quiet branded placeholder, never a broken image.
    inner.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#54504A;font-size:14px;">myMedKitt</div>`;
    return;
  }

  const mounted: HTMLElement[] = screens.map((render, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'hero-phone-screen' + (i === 0 ? ' active' : '');
    wrap.appendChild(render());
    inner.appendChild(wrap);
    return wrap;
  });

  if (mounted.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let idx = 0;
    window.setInterval(() => {
      mounted[idx]!.classList.remove('active');
      idx = (idx + 1) % mounted.length;
      mounted[idx]!.classList.add('active');
    }, CYCLE_MS);
  }

  // Scale the fixed-size device to whatever width the column offers.
  const scaler = section.querySelector<HTMLElement>('.hero-phone-scaler');
  const device = section.querySelector<HTMLElement>('.hero-device');
  if (!scaler || !device) return;
  const rescale = () => {
    const available = Math.min(device.clientWidth, 420);
    // Cap device height to the viewport-ish hero: scale to fit both width and ~72vh
    const maxH = Math.min(window.innerHeight * 0.74, PHONE_H);
    const scale = Math.min(1, available / PHONE_W, maxH / PHONE_H);
    scaler.style.transform = scale < 1 ? `scale(${scale})` : '';
    scaler.style.transformOrigin = 'top left';
    // shrink the layout box with the transform so nothing overflows narrow viewports
    scaler.style.width = `${Math.round(PHONE_W * scale)}px`;
    scaler.style.height = `${Math.round(PHONE_H * scale)}px`;
  };
  rescale();
  window.addEventListener('resize', rescale, { passive: true });
}
