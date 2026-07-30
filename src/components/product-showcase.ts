// Product Showcase — reusable component for each app section

import { activateAppTab } from './app-tabs.js';
import { APP_REGISTRY } from '../data/app-registry.js';

interface ProductShowcaseConfig {
  id: string;
  name: string;
  description: string;
  iconSrc: string;
  /** Category / audience label shown in the eyebrow above the headline */
  eyebrow: string;
  /** clinical apps -> green eyebrow; consumer apps -> copper eyebrow */
  domain: 'clinical' | 'consumer';
  features: { icon: string; text: string }[];
  status: 'In Development' | 'Coming Soon' | 'Live';
  /** Oversized proof point shown in the product portrait. */
  metric: string;
  metricLabel: string;
  /** flips the editorial 2-col layout for visual rhythm */
  reverse?: boolean;
  ctaPrimary: { label: string; action: () => void };
  ctaSecondary?: { label: string; action: () => void };
  /** Suppress the headline when a page-level <h1> already names this app. */
  suppressHeadline?: boolean;
}

export function renderProductShowcase(parent: HTMLElement, config: ProductShowcaseConfig): void {
  const section = document.createElement('section');
  section.id = config.id;
  section.className = `section section-light showcase${config.reverse ? ' showcase--reverse' : ''}`;

  // Per-app identity color — inside an app-tabs wrapper the container sets the same
  // vars, so this is a harmless override.
  const accent = APP_REGISTRY[config.id]?.accent;
  if (accent) {
    section.style.setProperty('--app-accent', accent.base);
    section.style.setProperty('--app-accent-soft', accent.soft);
    section.style.setProperty('--app-accent-deep', accent.deep);
  }

  // Forest-green check glyph leads every feature (clinical-trust accent)
  const featuresHtml = config.features.map(f => `
    <div class="showcase-feature">
      <span class="showcase-feature-icon" aria-hidden="true">
        <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10.5l4 4 8-9"/></svg>
      </span>
      <span class="showcase-feature-text">${f.text}</span>
    </div>
  `).join('');

  // Status -> tag variant: Live = copper, Coming Soon = soon, everything else = clinical green
  const tagVariant = config.status === 'Live'
    ? 'tag--live'
    : config.status === 'Coming Soon'
      ? 'tag--soon'
      : 'tag--clinical';
  const eyebrowVariant = config.domain === 'clinical' ? ' eyebrow--green' : '';

  section.innerHTML = `
    <div class="section-content">
      <div class="showcase-text">
        <div class="showcase-meta">
          <span class="eyebrow${eyebrowVariant} showcase-eyebrow">${config.eyebrow}</span>
          <p class="showcase-status tag ${tagVariant}">${config.status}</p>
        </div>
        ${config.suppressHeadline ? '' : `<h2 class="text-heading showcase-headline">${config.name}</h2>`}
        <p class="text-body showcase-description">${config.description}</p>
        <div class="showcase-features">${featuresHtml}</div>
        <div class="showcase-ctas" id="ctas-${config.id}"></div>
      </div>
      <div class="showcase-media">
        <div class="showcase-icon-wrapper">
          <span class="showcase-visual-name" aria-hidden="true">${config.name}</span>
          <span class="showcase-visual-grid" aria-hidden="true"></span>
          <div class="showcase-icon-orbit">
            <img class="showcase-icon" src="${config.iconSrc}" alt="${config.name} app icon" loading="lazy">
          </div>
          <div class="showcase-metric">
            <strong>${config.metric}</strong>
            <span>${config.metricLabel}</span>
          </div>
          <span class="showcase-visual-state"><i></i>${config.status === 'Live' ? 'System live' : config.status}</span>
        </div>
      </div>
    </div>
  `;

  parent.appendChild(section);

  // Wire up CTAs after DOM insertion
  const ctaContainer = document.getElementById(`ctas-${config.id}`)!;

  const primaryBtn = document.createElement('button');
  primaryBtn.className = 'cta-primary';
  primaryBtn.textContent = config.ctaPrimary.label;
  primaryBtn.addEventListener('click', config.ctaPrimary.action);
  ctaContainer.appendChild(primaryBtn);

  if (config.ctaSecondary) {
    const secondaryBtn = document.createElement('button');
    secondaryBtn.className = 'cta-secondary';
    secondaryBtn.textContent = config.ctaSecondary.label;
    secondaryBtn.addEventListener('click', config.ctaSecondary.action);
    ctaContainer.appendChild(secondaryBtn);
  }
}

// Primary CTA resolves through the app registry: once a listing is marked
// forSale with a checkout link, the free CTA becomes a Buy button.
function primaryCta(appId: string, fallback: { label: string; action: () => void }): { label: string; action: () => void } {
  const listing = APP_REGISTRY[appId];
  if (listing?.forSale && listing.checkoutUrl) {
    const checkoutUrl = listing.checkoutUrl;
    return {
      label: listing.price ? `Buy — ${listing.price}` : 'Buy the App',
      action: () => window.open(checkoutUrl, '_blank', 'noopener'),
    };
  }
  return fallback;
}

export function renderMyMedKitt(parent: HTMLElement): void {
  renderProductShowcase(parent, {
    id: 'mymedkitt',
    name: 'myMedKitt',
    eyebrow: 'For emergency clinicians',
    domain: 'clinical',
    description: 'Evidence-based clinical decision trees for the emergency department. Built for the phone in your pocket, designed for the patient in front of you.',
    iconSrc: 'assets/icons/mymedkitt.png',
    features: [
      { icon: '🩺', text: '353 evidence-based ED consults' },
      { icon: '💊', text: '306 drugs across 945 dosing indications, with weight-based calculators' },
      { icon: '🧮', text: '25+ bedside calculators (PESI, NIHSS, TIMI, Sgarbossa)' },
      { icon: '📴', text: 'Fully offline PWA' },
    ],
    status: 'Live',
    metric: '353',
    metricLabel: 'evidence-based ER consults',
    ctaPrimary: primaryCta('mymedkitt', { label: 'Open the App', action: () => window.open('https://kittechsix-blip.github.io/mymedkitt/app.html', '_blank', 'noopener') }),
    ctaSecondary: { label: 'Try the Demo', action: () => activateAppTab('mymedkitt', 'demo') },
  });
}

export function renderMyStrokeKitt(parent: HTMLElement): void {
  renderProductShowcase(parent, {
    id: 'mystroke-kitt',
    name: 'myStroke-Kitt',
    eyebrow: 'For code stroke',
    domain: 'clinical',
    reverse: true,
    description: 'The complete code-stroke companion. Triage to CT, NIHSS at the bedside, thrombolysis contraindications with hard stops, TNK dosing, and dedicated ischemic, hemorrhagic, and mimic pathways — the whole resuscitation on one screen at a time.',
    iconSrc: 'assets/icons/mystroke-kitt.png',
    features: [
      { icon: '🧠', text: 'Guided triage → CT → pathway decision tree' },
      { icon: '📝', text: 'NIHSS fast-sheet with live score interpretation' },
      { icon: '💉', text: 'TNK 0.25 mg/kg dosing with contraindication hard stops' },
      { icon: '🩸', text: 'ICH pathway: reversal agents, BP targets, ICH score' },
    ],
    status: 'Live',
    metric: '20',
    metricLabel: 'code-stroke tools in one workflow',
    ctaPrimary: primaryCta('mystroke-kitt', { label: 'Open the App', action: () => window.open('https://mystroke-kitt.vercel.app', '_blank', 'noopener') }),
    ctaSecondary: { label: 'Tour the UI', action: () => activateAppTab('mystroke-kitt', 'tour') },
  });
}

export function renderAntibioticRx(parent: HTMLElement): void {
  renderProductShowcase(parent, {
    id: 'antibiotic-rx',
    name: 'Antibiotic Rx',
    eyebrow: 'For empiric & culture-directed therapy',
    domain: 'clinical',
    description: 'Guideline-backed antibiotic guidance for ~130 infection syndromes. Toggle the patient in front of you — allergies, pregnancy, renal function, MDR risk — and the regimen rewrites itself, with local antibiogram data and weight-based dose calculators built in.',
    iconSrc: 'assets/icons/antibiotic-rx.png',
    features: [
      { icon: '🦠', text: '~130 infections across 20 categories, empiric + culture-directed' },
      { icon: '⚙️', text: 'Patient parameters recompute the regimen live' },
      { icon: '📊', text: 'Local antibiogram susceptibilities overlaid on recommendations' },
      { icon: '🧮', text: 'Pediatric weight-based + renal dose calculators' },
    ],
    status: 'Live',
    metric: '~130',
    metricLabel: 'infection syndromes with adaptive regimens',
    ctaPrimary: primaryCta('antibiotic-rx', { label: 'Open the App', action: () => window.open('https://antibiotic-rx.vercel.app', '_blank', 'noopener') }),
    ctaSecondary: { label: 'Tour the UI', action: () => activateAppTab('antibiotic-rx', 'tour') },
  });
}

export function renderMyVertigoApp(parent: HTMLElement): void {
  renderProductShowcase(parent, {
    id: 'myvertigoapp',
    name: 'my-vertigo-app',
    eyebrow: 'For the dizzy-patient workup',
    domain: 'clinical',
    reverse: true,
    description: 'Bedside decision support for the dizzy patient. Walk the HINTS exam, run Dix-Hallpike, and guide Epley or Semont maneuvers — then build a shareable discharge plan in seconds.',
    iconSrc: 'assets/icons/myvertigoapp.png',
    features: [
      { icon: '🌀', text: 'HINTS exam guide with stroke triage' },
      { icon: '🎯', text: 'Epley & Semont maneuver walkthroughs' },
      { icon: '📋', text: 'Disposition builder with QR sharing' },
      { icon: '📱', text: 'Web PWA + native iOS/Android' },
    ],
    status: 'Live',
    metric: 'HINTS+',
    metricLabel: 'exam to maneuver to disposition',
    ctaPrimary: primaryCta('myvertigoapp', { label: 'Open the App', action: () => window.open('https://my-vertigo-app.vercel.app', '_blank', 'noopener') }),
    ctaSecondary: { label: 'Tour the UI', action: () => activateAppTab('myvertigoapp', 'tour') },
  });
}

export function renderAcidBase(parent: HTMLElement): void {
  renderProductShowcase(parent, {
    id: 'acidbase',
    name: 'AcidBase',
    eyebrow: 'For ABG interpretation',
    domain: 'clinical',
    reverse: true,
    description: 'The complete acid-base analyzer. Enter an ABG and chemistry — AcidBase names the disorder, explains why, detects mixed disorders, then gives you the differential, the workup to narrow it, and evidence-based treatment with doses.',
    iconSrc: 'assets/icons/acidbase.png',
    features: [
      { icon: '🧮', text: 'Anion gap (albumin-corrected), delta ratio & osmolar gap' },
      { icon: '🔀', text: 'Mixed-disorder detection via compensation formulas' },
      { icon: '💊', text: 'Differential, workup & EBM treatment with doses' },
      { icon: '📴', text: 'Runs entirely on-device — no patient data leaves your phone' },
    ],
    status: 'Live',
    metric: '1 ABG',
    metricLabel: 'disorder, reasoning, workup, treatment',
    ctaPrimary: primaryCta('acidbase', { label: 'Open the App', action: () => window.open('https://acidbase.vercel.app', '_blank', 'noopener') }),
    ctaSecondary: { label: 'Tour the UI', action: () => activateAppTab('acidbase', 'tour') },
  });
}
