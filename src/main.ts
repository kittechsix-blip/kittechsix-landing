// kittechsix Landing Page — Main Entry

import { router } from './utils/router.js';
import { renderNav } from './components/nav.js';
import { renderHero } from './components/hero.js';
import { renderTicker } from './components/ticker.js';
import { renderFeaturedRow } from './components/featured-row.js';
import { renderEcosystemMap } from './components/ecosystem-map.js';
import { renderAcidBase, renderAntibioticRx, renderFckCancer, renderMyMedKitt, renderMyStrokeKitt, renderMyTravelMedKitt, renderMyVertigoApp } from './components/product-showcase.js';
import { renderAppTabs } from './components/app-tabs.js';
import { renderPrivacy } from './components/privacy.js';
import { renderAfibDemo } from './components/demo-afib.js';
import { renderTripDemo } from './components/demo-trip.js';
import { renderUITour } from './components/ui-tour.js';
import { mkTour } from './data/ui-tour/mymedkitt-tour.js';
import { skTour } from './data/ui-tour/mystroke-kitt-tour.js';
import { vtTour } from './data/ui-tour/my-vertigo-app-tour.js';
import { abTour } from './data/ui-tour/acidbase-tour.js';
import { rxTour } from './data/ui-tour/antibiotic-rx-tour.js';
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
  // Hero phone cycles the first three real myMedKitt tour screens
  renderHero(app, {
    phoneScreens: mkTour.screens
      .slice(0, 3)
      .map((s) => s.renderClone)
      .filter((r): r is () => HTMLElement => typeof r === 'function'),
  });
  renderTicker(app);
  renderFeaturedRow(app);
  renderEcosystemMap(app);
  renderAppTabs(app, {
    id: 'mymedkitt',
    tabs: [
      { key: 'overview', label: 'myMedKitt', render: renderMyMedKitt },
      { key: 'tour', label: 'Tour the UI', render: (p) => renderUITour(p, mkTour) },
      { key: 'demo', label: 'Try a consult', render: renderAfibDemo },
    ],
  });
  renderAppTabs(app, {
    id: 'mystroke-kitt',
    tabs: [
      { key: 'overview', label: 'myStroke-Kitt', render: renderMyStrokeKitt },
      { key: 'tour', label: 'Tour the UI', render: (p) => renderUITour(p, skTour) },
    ],
  });
  renderAppTabs(app, {
    id: 'myvertigoapp',
    tabs: [
      { key: 'overview', label: 'myVertigoApp', render: renderMyVertigoApp },
      { key: 'tour', label: 'Tour the UI', render: (p) => renderUITour(p, vtTour) },
    ],
  });
  renderAppTabs(app, {
    id: 'acidbase',
    tabs: [
      { key: 'overview', label: 'AcidBase', render: renderAcidBase },
      { key: 'tour', label: 'Tour the UI', render: (p) => renderUITour(p, abTour) },
    ],
  });
  renderAppTabs(app, {
    id: 'antibiotic-rx',
    tabs: [
      { key: 'overview', label: 'Antibiotic Rx', render: renderAntibioticRx },
      { key: 'tour', label: 'Tour the UI', render: (p) => renderUITour(p, rxTour) },
    ],
  });
  renderAppTabs(app, {
    id: 'mytravelmedkitt',
    tabs: [
      { key: 'overview', label: 'MyTravelMedKitt', render: renderMyTravelMedKitt },
      { key: 'demo', label: 'Try the demo', render: renderTripDemo },
    ],
  });
  renderFckCancer(app);
  renderAbout(app);
  renderPrivacy(app);
  renderFeedbackBoard(app);
  renderDisclaimer(app);
  renderFooter(app);

  // Scroll animations after DOM is populated
  requestAnimationFrame(() => {
    setupScrollAnimations();
    setupNavHighlighting();
    setupNavSolidOnScroll();
  });
}

// Nav goes from translucent to solid white once the user scrolls past the hero.
function setupNavSolidOnScroll(): void {
  const nav = document.getElementById('main-nav');
  if (!nav) return;
  const onScroll = () => {
    nav.classList.toggle('glass-nav--solid', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
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

// Route: everything renders on the main page (scroll-based)
router.on('/', () => renderLandingPage());
router.onNotFound(() => renderLandingPage());
router.start();
