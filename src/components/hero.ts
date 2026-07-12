// Hero Section — physician-led credibility paired with a clear product promise.

import { activateAppTab } from './app-tabs.js';

export function renderHero(parent: HTMLElement): void {
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

      <div class="hero-visual" aria-label="Kittech-Six, founded by Dr. Andy Kitlowski">
        <figure class="hero-brand-visual">
          <img
            class="hero-brand-img"
            src="assets/kittechsix-logo-hero.jpg"
            alt="Kittech-Six brain and circuit logo"
            width="1200"
            height="1071"
            fetchpriority="high"
          />
        </figure>

        <figure class="hero-headshot-card">
          <img
            src="assets/andy-kitlowski-headshot.jpg"
            alt="Dr. Andy Kitlowski, emergency physician and founder of Kittech-Six"
            width="1200"
            height="1152"
          />
        </figure>

      </div>
    </div>
  `;

  parent.appendChild(section);

  // Progressive enhancement: open the myMedKitt tour tab (href still anchors without JS).
  document.getElementById('hero-tour-btn')?.addEventListener('click', (event) => {
    event.preventDefault();
    activateAppTab('mymedkitt', 'tour');
  });
}
