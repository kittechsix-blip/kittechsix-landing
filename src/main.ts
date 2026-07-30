// kittechsix Landing Page — Router shell
//
// The site is compartmentalized: '/' is the hero landing and nothing else, and every
// other destination is its own route rendered into #app. Shared chrome (nav + footer)
// mounts on every route EXCEPT the hero, which is deliberately bare.

import { router } from './utils/router.js';
import { renderNav } from './components/nav.js';
import { renderFooter } from './components/footer.js';
import { renderHero } from './components/hero.js';
import { renderWorkIndex } from './components/work-index.js';
import { renderWorkDetail } from './components/work-detail.js';
import { renderConsulting } from './components/consulting.js';
import { renderStudio } from './components/studio.js';
import { renderLegalPage } from './components/legal-page.js';
import { setupScrollAnimations } from './utils/intersection.js';
import { mountFrameSheen } from './components/frame.js';

function mount(): HTMLElement | null {
  const app = document.getElementById('app');
  if (!app) return null;
  app.innerHTML = '';
  return app;
}

/** Every route except the hero gets nav + footer around its content. */
function page(render: (app: HTMLElement) => void): void {
  const app = mount();
  if (!app) return;
  renderNav(app);
  render(app);
  renderFooter(app);
  window.scrollTo(0, 0);
  requestAnimationFrame(() => setupScrollAnimations());
}

router.on('/', () => {
  const app = mount();
  if (!app) return;
  renderHero(app);
});

router.on('/work', () => page(renderWorkIndex));
router.on('/work/:id', (params) => page((app) => renderWorkDetail(app, params['id'] ?? '')));
router.on('/consulting', () => page(renderConsulting));
router.on('/studio', () => page(renderStudio));
router.on('/legal', () => page(renderLegalPage));

// Unknown hash → the work index, with the address corrected so the URL never lies
// about what is on screen. Guarded against a redirect loop.
router.onNotFound(() => {
  if (router.currentPath() === '/work') {
    page(renderWorkIndex);
    return;
  }
  router.navigate('/work');
});

// Skip control lives in index.html as a <button>, not an anchor: a bare "#app" href would be
// parsed by this hash router as the route '/app' and fall through to onNotFound.
document.querySelector<HTMLButtonElement>('[data-skip-main]')?.addEventListener('click', () => {
  const app = document.getElementById('app');
  if (!app) return;
  app.setAttribute('tabindex', '-1');
  app.focus();
});

mountFrameSheen();

router.start();

// Register service worker; auto-reload when a new SW takes over so deploys land instantly.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {
    // SW registration failed — page works fine without it
  });
  let reloading = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (reloading) return;
    reloading = true;
    window.location.reload();
  });
}
