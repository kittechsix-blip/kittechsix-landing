// kittechsix Landing Page — Main Entry

import { router } from './utils/router.js';
import { renderNav } from './components/nav.js';
import { renderHero } from './components/hero.js';
import { renderMyMedKitt, renderMyVertigoApp, renderMyTravelMedKitt, renderMyToolKitt } from './components/product-showcase.js';
import { renderAfibDemo } from './components/demo-afib.js';
import { renderTripDemo } from './components/demo-trip.js';
import { renderFeedbackBoard } from './components/feedback-board.js';
import { renderAbout } from './components/about.js';
import { renderDisclaimer } from './components/disclaimer.js';
import { renderFooter } from './components/footer.js';
import { setupScrollAnimations } from './utils/intersection.js';

function renderLandingPage(): void {
  const app = document.getElementById('app');
  if (!app) return;
  app.innerHTML = '';

  renderNav(app);
  renderHero(app);
  renderMyMedKitt(app);
  renderAfibDemo(app);
  renderMyVertigoApp(app);
  renderMyTravelMedKitt(app);
  renderTripDemo(app);
  renderMyToolKitt(app);
  renderAbout(app);
  renderFeedbackBoard(app);
  renderDisclaimer(app);
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
