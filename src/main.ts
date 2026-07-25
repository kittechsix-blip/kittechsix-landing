// kittechsix Landing Page — Main Entry

import { router } from './utils/router.js';
import { renderNav } from './components/nav.js';
import { renderHero } from './components/hero.js';
import { renderTicker } from './components/ticker.js';
import { renderFeaturedRow } from './components/featured-row.js';
import { renderAcidBase, renderAntibioticRx, renderMyMedKitt, renderMyStrokeKitt, renderMyVertigoApp } from './components/product-showcase.js';
import { renderAppTabs } from './components/app-tabs.js';
import { renderPrivacy } from './components/privacy.js';
import { renderAfibDemo } from './components/demo-afib.js';
import { renderUITour } from './components/ui-tour.js';
import { mkTour } from './data/ui-tour/mymedkitt-tour.js';
import { skTour } from './data/ui-tour/mystroke-kitt-tour.js';
import { vtTour } from './data/ui-tour/my-vertigo-app-tour.js';
import { abTour } from './data/ui-tour/acidbase-tour.js';
import { rxTour } from './data/ui-tour/antibiotic-rx-tour.js';
import { renderFeedbackBoard } from './components/feedback-board.js';
import { renderQualityTeam } from './components/quality-team.js';
import { renderConsulting } from './components/consulting.js';
import { renderRoadmap } from './components/roadmap.js';
import { renderAbout } from './components/about.js';
import { renderDisclaimer } from './components/disclaimer.js';
import { renderLegal } from './components/legal.js';
import { renderFooter } from './components/footer.js';
import { renderFinalCta } from './components/final-cta.js';
import { setupScrollAnimations } from './utils/intersection.js';

function renderLandingPage(): void {
  const app = document.getElementById('app');
  if (!app) return;
  app.innerHTML = '';

  renderNav(app);
  renderHero(app, {
    phoneScreens: mkTour.screens
      .slice(0, 3)
      .map((screen) => screen.renderClone)
      .filter((render): render is () => HTMLElement => typeof render === 'function'),
  });
  renderTicker(app);
  renderFeaturedRow(app);
  renderAppTabs(app, {
    id: 'mymedkitt',
    chapter: '01',
    discipline: 'Emergency medicine system',
    tabs: [
      { key: 'overview', label: 'Overview', render: renderMyMedKitt },
      { key: 'tour', label: 'Tour the UI', render: (p) => renderUITour(p, mkTour) },
      { key: 'demo', label: 'Try a consult', render: renderAfibDemo },
    ],
  });
  renderAppTabs(app, {
    id: 'antibiotic-rx',
    chapter: '02',
    discipline: 'Adaptive prescribing',
    tabs: [
      { key: 'overview', label: 'Overview', render: renderAntibioticRx },
      { key: 'tour', label: 'Tour the UI', render: (p) => renderUITour(p, rxTour) },
    ],
  });
  renderAppTabs(app, {
    id: 'myvertigoapp',
    chapter: '03',
    discipline: 'Focused clinical workflow',
    tabs: [
      { key: 'overview', label: 'Overview', render: renderMyVertigoApp },
      { key: 'tour', label: 'Tour the UI', render: (p) => renderUITour(p, vtTour) },
    ],
  });
  renderAppTabs(app, {
    id: 'acidbase',
    chapter: '04',
    discipline: 'Reasoning engine',
    tabs: [
      { key: 'overview', label: 'Overview', render: renderAcidBase },
      { key: 'tour', label: 'Tour the UI', render: (p) => renderUITour(p, abTour) },
    ],
  });
  renderAppTabs(app, {
    id: 'mystroke-kitt',
    chapter: '05',
    discipline: 'Time-critical decision support',
    tabs: [
      { key: 'overview', label: 'Overview', render: renderMyStrokeKitt },
      { key: 'tour', label: 'Tour the UI', render: (p) => renderUITour(p, skTour) },
    ],
  });
  renderConsulting(app);
  renderQualityTeam(app);
  renderRoadmap(app);
  renderAbout(app);
  renderPrivacy(app);
  renderFeedbackBoard(app);
  renderFinalCta(app);
  renderDisclaimer(app);
  renderLegal(app);
  renderFooter(app);

  // Scroll animations after DOM is populated
  requestAnimationFrame(() => {
    setupScrollAnimations();
    setupNavHighlighting();
    setupNavSolidOnScroll();
  });
}

// Nav starts transparent-dark over the hero, then flips to solid white
// once the user scrolls past it.
function setupNavSolidOnScroll(): void {
  const nav = document.getElementById('main-nav');
  const hero = document.getElementById('hero');
  if (!nav || !hero) return;
  const onScroll = () => {
    const overHero = window.scrollY < hero.offsetTop + hero.offsetHeight - 64;
    nav.classList.toggle('glass-nav--dark', overHero);
    nav.classList.toggle('glass-nav--solid', !overHero);
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
