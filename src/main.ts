// kittechsix Landing Page — Main Entry

import { router } from './utils/router.js';
import { renderNav } from './components/nav.js';
import { renderHero } from './components/hero.js';
import { renderFooter } from './components/footer.js';
import { setupScrollAnimations } from './utils/intersection.js';

function renderLandingPage(): void {
  const app = document.getElementById('app');
  if (!app) return;
  app.innerHTML = '';

  renderNav(app);
  renderHero(app);
  // Phase 2: product showcases
  // Phase 3: demos
  // Phase 4: feedback board
  renderFooter(app);

  // Scroll animations after DOM is populated
  requestAnimationFrame(() => {
    setupScrollAnimations();
    setupNavHighlighting();
  });
}

function setupNavHighlighting(): void {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[data-section]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(
          `.nav-links a[data-section="${entry.target.id}"]`
        );
        activeLink?.classList.add('active');
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => observer.observe(section));
}

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {
    // SW registration failed — page works fine without it
  });
}

// Route: everything renders on the main page (scroll-based)
router.on('/', () => renderLandingPage());
router.onNotFound(() => renderLandingPage());
router.start();
