// Product Showcase — reusable component for each app section

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
