// Hero Section — "The Attending": asymmetric editorial split, utility-first copy

export function renderHero(parent: HTMLElement): void {
  const section = document.createElement('section');
  section.className = 'hero section-dark';
  section.id = 'hero';

  section.innerHTML = `
    <div class="hero-content">
      <div class="hero-copy">
        <p class="eyebrow hero-eyebrow">Kittech-Six &middot; Medical Software Lab&nbsp;&middot;&nbsp;Austin,&nbsp;TX</p>
        <h1 class="hero-title" aria-label="Bedside tools for your next shift. Free.">
          <span aria-hidden="true">
            <span class="line"><span class="line-inner">Bedside tools</span></span>
            <span class="line"><span class="line-inner">for your next shift.</span></span>
            <span class="line"><span class="line-inner hero-accent">Free.</span></span>
          </span>
        </h1>
        <p class="hero-sub">Built by the ER doctor who actually uses them &mdash; 44+ ER consults, 157+ drugs, and clinical calculators, plus health apps for everyone. No account required.</p>
        <div class="hero-cta">
          <a class="cta-primary" href="#mymedkitt" id="hero-explore-btn">Open myMedKitt &mdash; free, no sign-up</a>
          <a class="cta-ghost" href="#about" id="hero-feedback-btn">See how it&rsquo;s built</a>
        </div>
        <ul class="hero-trust" role="list">
          <li>Andy Kitlowski, MD &middot; <strong>25</strong> yrs in emergency medicine</li>
          <li class="is-live"><span class="live-dot" aria-hidden="true"></span><strong>4</strong> live apps</li>
          <li><strong>44+</strong> consults &middot; <strong>157+</strong> drugs</li>
        </ul>
      </div>
      <div class="hero-art">
        <img src="assets/hero-symbols.jpg" alt="Glass caduceus emblem — Kittech-Six" class="hero-art-img" />
        <span class="hero-art-tint" aria-hidden="true"></span>
        <span class="hero-chip">Dr. Andy Kitlowski &middot; Austin, TX</span>
      </div>
    </div>
  `;

  parent.appendChild(section);

  // Progressive enhancement: smooth-scroll the anchor CTAs (href still works without JS)
  const scrollTo = (id: string) => (e: Event) => {
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };
  document.getElementById('hero-explore-btn')!.addEventListener('click', scrollTo('mymedkitt'));
  document.getElementById('hero-feedback-btn')!.addEventListener('click', scrollTo('about'));
}
