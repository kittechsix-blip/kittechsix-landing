// Studio navigation — intentionally small. The work, the standards behind it,
// and the physician building it are the primary wayfinding landmarks.

export function renderNav(parent: HTMLElement): void {
  const nav = document.createElement('nav');
  nav.className = 'glass-nav';
  nav.id = 'main-nav';
  nav.setAttribute('aria-label', 'Main navigation');

  nav.innerHTML = `
    <div class="nav-content">
      <a class="nav-logo" href="#/" aria-label="Kittech-Six — home">
        <img class="nav-logo-glyph" src="assets/icons/kittech-brain.png" alt="" aria-hidden="true" />
        <span class="nav-logo-mark">Kittech-Six</span>
        <span class="nav-logo-by">Medical software lab</span>
      </a>

      <div class="nav-links" id="nav-links">
        <a href="#featured" data-section="featured">Work</a>
        <a href="#consulting" data-section="consulting">Consulting</a>
        <a href="#quality-team" data-section="quality-team">Standards</a>
        <a href="#roadmap" data-section="roadmap">Roadmap</a>
        <a href="#about" data-section="about">Studio</a>
      </div>

      <a
        class="nav-product-cta"
        href="https://kittechsix-blip.github.io/mymedkitt/app.html"
        target="_blank"
        rel="noopener"
      >Open myMedKitt <span aria-hidden="true">↗</span></a>

      <button class="nav-hamburger" id="nav-hamburger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav-overlay">
        <span></span><span></span>
      </button>
    </div>
  `;

  parent.appendChild(nav);

  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  overlay.id = 'nav-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = `
    <div class="nav-overlay-meta">Explore Kittech-Six</div>
    <a href="#featured" data-section="featured"><span>01</span>Selected work</a>
    <a href="#consulting" data-section="consulting"><span>02</span>Consulting</a>
    <a href="#quality-team" data-section="quality-team"><span>03</span>Standards</a>
    <a href="#roadmap" data-section="roadmap"><span>04</span>Roadmap</a>
    <a href="#about" data-section="about"><span>05</span>The studio</a>
    <a class="nav-overlay-primary" href="https://kittechsix-blip.github.io/mymedkitt/app.html" target="_blank" rel="noopener">Open myMedKitt ↗</a>
  `;
  parent.appendChild(overlay);

  const hamburger = nav.querySelector<HTMLButtonElement>('#nav-hamburger');
  const closeMenu = () => {
    overlay.classList.remove('open');
    hamburger?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    hamburger?.setAttribute('aria-label', 'Open menu');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  hamburger?.addEventListener('click', () => {
    const isOpen = overlay.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    overlay.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (isOpen) overlay.querySelector<HTMLAnchorElement>('a')?.focus();
  });

  overlay.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay.classList.contains('open')) {
      closeMenu();
      hamburger?.focus();
    }
  });
}
