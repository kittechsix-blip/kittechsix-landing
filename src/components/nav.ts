// Glass Navigation Bar

const SOCIAL_ICONS = {
  facebook: '<svg viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 1.092.063 1.376.126v3.205c-.244-.024-.668-.036-.953-.036-1.353 0-1.876.516-1.876 1.857v2.406h4.052l-.526 3.667H13.506v8.126C19.235 22.768 24 17.466 24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.628 3.875 10.35 9.101 11.691Z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z"/></svg>'
};

export function renderNav(parent: HTMLElement): void {
  const nav = document.createElement('nav');
  nav.className = 'glass-nav';
  nav.id = 'main-nav';
  nav.setAttribute('aria-label', 'Main navigation');

  nav.innerHTML = `
    <div class="nav-content">
      <a class="nav-logo" href="#/">kittechsix</a>
      <div class="nav-links" id="nav-links">
        <a href="#mymedkitt" data-section="mymedkitt">myMedKitt</a>
        <a href="#myvertigoapp" data-section="myvertigoapp">my-vertigo-app</a>
        <a href="#mytravelmedkitt" data-section="mytravelmedkitt">MyTravelMedKitt</a>
        <a href="#fckcancer" data-section="fckcancer">FCK Cancer</a>
        <a href="#mytoolkitt" data-section="mytoolkitt">MyToolKitt</a>
        <a href="#feedback" data-section="feedback">Feedback</a>
      </div>
      <div class="nav-social">
        <a href="https://facebook.com/kittechsix" target="_blank" rel="noopener" aria-label="Facebook">${SOCIAL_ICONS.facebook}</a>
        <a href="https://instagram.com/kittechsix" target="_blank" rel="noopener" aria-label="Instagram">${SOCIAL_ICONS.instagram}</a>
        <a href="https://tiktok.com/@kittechsix" target="_blank" rel="noopener" aria-label="TikTok">${SOCIAL_ICONS.tiktok}</a>
      </div>
      <button class="nav-hamburger" id="nav-hamburger" aria-label="Menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  `;

  parent.appendChild(nav);

  // Mobile overlay
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  overlay.id = 'nav-overlay';
  overlay.innerHTML = `
    <a href="#mymedkitt" data-section="mymedkitt">myMedKitt</a>
    <a href="#myvertigoapp" data-section="myvertigoapp">my-vertigo-app</a>
    <a href="#mytravelmedkitt" data-section="mytravelmedkitt">MyTravelMedKitt</a>
    <a href="#fckcancer" data-section="fckcancer">FCK Cancer</a>
    <a href="#mytoolkitt" data-section="mytoolkitt">MyToolKitt</a>
    <a href="#feedback" data-section="feedback">Feedback</a>
  `;
  parent.appendChild(overlay);

  // Hamburger toggle
  const hamburger = document.getElementById('nav-hamburger')!;
  hamburger.addEventListener('click', () => {
    const isOpen = overlay.classList.toggle('open');
    hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile menu on link click
  overlay.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).tagName === 'A') {
      overlay.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}
