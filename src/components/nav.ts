// Studio navigation — a solid bar shared by every route except the hero.
// Four destinations, one CTA. No scroll machinery: there is no long scroll and
// no hero underneath the bar any more, so the transparent-over-hero variant and
// the scroll-spy are gone. Active state comes from the router, at render time.

import { router } from '../utils/router.js';
import { APP_REGISTRY } from '../data/app-registry.js';

interface NavItem {
  label: string;
  /** Overlay ordinal + long-form label for the mobile sheet. */
  ordinal: string;
  overlayLabel: string;
  route: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Work', ordinal: '01', overlayLabel: 'Selected work', route: '/work' },
  { label: 'Consulting', ordinal: '02', overlayLabel: 'Consulting', route: '/consulting' },
  { label: 'Studio', ordinal: '03', overlayLabel: 'The studio', route: '/studio' },
  { label: 'Legal', ordinal: '04', overlayLabel: 'Legal', route: '/legal' },
];

/** '/work' stays lit while you are on '/work/mymedkitt'. */
function isActive(route: string, path: string): boolean {
  return path === route || path.startsWith(route + '/');
}

/** myMedKitt CTA target — verified against the registry, never hardcoded here. */
function mymedkittHref(): { href: string; external: boolean } {
  const live = APP_REGISTRY['mymedkitt']?.liveUrl;
  return live ? { href: live, external: true } : { href: '#/work/mymedkitt', external: false };
}

function ctaAttrs(): string {
  const { href, external } = mymedkittHref();
  return external
    ? `href="${href}" target="_blank" rel="noopener"`
    : `href="${href}"`;
}

// ---------------------------------------------------------------------------
// Menu open/close — written against the live DOM, never against captured nodes,
// so the window/document listeners below survive any number of re-renders.
// ---------------------------------------------------------------------------

function closeMenu(): void {
  const overlay = document.getElementById('nav-overlay');
  const hamburger = document.getElementById('nav-hamburger');
  overlay?.classList.remove('open');
  overlay?.setAttribute('aria-hidden', 'true');
  hamburger?.classList.remove('open');
  hamburger?.setAttribute('aria-expanded', 'false');
  hamburger?.setAttribute('aria-label', 'Open menu');
  document.body.style.overflow = '';
}

let globalListenersAttached = false;

function attachGlobalListenersOnce(): void {
  if (globalListenersAttached) return;
  globalListenersAttached = true;

  // Navigating away always dismisses the sheet — clicking a link is only one of
  // the ways a route can change (back button, deep link, programmatic navigate).
  window.addEventListener('hashchange', closeMenu);

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const overlay = document.getElementById('nav-overlay');
    if (!overlay?.classList.contains('open')) return;
    closeMenu();
    document.getElementById('nav-hamburger')?.focus();
  });
}

export function renderNav(parent: HTMLElement): void {
  // Defensive: a previous route may have been left mid-menu.
  document.body.style.overflow = '';

  const path = router.currentPath();

  const nav = document.createElement('nav');
  nav.className = 'glass-nav';
  nav.id = 'main-nav';
  nav.setAttribute('aria-label', 'Main navigation');

  const links = NAV_ITEMS.map((item) => {
    const active = isActive(item.route, path);
    return `<a href="#${item.route}"${active ? ' class="active" aria-current="page"' : ''}>${item.label}</a>`;
  }).join('\n        ');

  nav.innerHTML = `
    <div class="nav-content">
      <a class="nav-logo" href="#/" aria-label="Kittech-Six — home">
        <img class="nav-logo-glyph" src="assets/icons/kittech-brain.png" alt="" aria-hidden="true" />
        <span class="nav-logo-mark">Kittech-Six</span>
        <span class="nav-logo-by">Medical software lab</span>
      </a>

      <div class="nav-links" id="nav-links">
        ${links}
      </div>

      <a class="nav-product-cta" ${ctaAttrs()}>Open myMedKitt <span aria-hidden="true">↗</span></a>

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

  const overlayLinks = NAV_ITEMS.map((item) => {
    const active = isActive(item.route, path);
    return `<a href="#${item.route}"${active ? ' class="active" aria-current="page"' : ''}><span>${item.ordinal}</span>${item.overlayLabel}</a>`;
  }).join('\n    ');

  overlay.innerHTML = `
    <div class="nav-overlay-meta">Explore Kittech-Six</div>
    ${overlayLinks}
    <a class="nav-overlay-primary" ${ctaAttrs()}>Open myMedKitt ↗</a>
  `;
  parent.appendChild(overlay);

  const hamburger = nav.querySelector<HTMLButtonElement>('#nav-hamburger');

  hamburger?.addEventListener('click', () => {
    const isOpen = overlay.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    overlay.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (isOpen) overlay.querySelector<HTMLAnchorElement>('a')?.focus();
  });

  // Tapping the link you are already on produces no hashchange, so close here too.
  overlay.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) closeMenu();
  });

  attachGlobalListenersOnce();
}
