// Product Showcase — reusable component for each app section

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
  /** flips the editorial 2-col layout for visual rhythm */
  reverse?: boolean;
  ctaPrimary: { label: string; action: () => void };
  ctaSecondary?: { label: string; action: () => void };
}

export function renderProductShowcase(parent: HTMLElement, config: ProductShowcaseConfig): void {
  const section = document.createElement('section');
  section.id = config.id;
  section.className = `section section-light showcase${config.reverse ? ' showcase--reverse' : ''}`;

  // Forest-green check glyph leads every feature (clinical-trust accent)
  const featuresHtml = config.features.map(f => `
    <div class="showcase-feature">
      <span class="showcase-feature-icon" aria-hidden="true">
        <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10.5l4 4 8-9"/></svg>
      </span>
      <span class="showcase-feature-text">${f.text}</span>
    </div>
  `).join('');

  // Status -> tag variant: Live = copper, everything else = clinical green
  const tagVariant = config.status === 'Live' ? 'tag--live' : 'tag--clinical';
  const eyebrowVariant = config.domain === 'clinical' ? ' eyebrow--green' : '';

  section.innerHTML = `
    <div class="section-content">
      <div class="showcase-text">
        <span class="eyebrow${eyebrowVariant} showcase-eyebrow">${config.eyebrow}</span>
        <h2 class="text-heading showcase-headline">${config.name}</h2>
        <p class="text-body showcase-description">${config.description}</p>
        <div class="showcase-features">${featuresHtml}</div>
        <div class="showcase-ctas" id="ctas-${config.id}"></div>
        <p class="showcase-status tag ${tagVariant}">${config.status}</p>
      </div>
      <div class="showcase-media">
        <div class="showcase-icon-wrapper">
          <img class="showcase-icon" src="${config.iconSrc}" alt="${config.name} app icon" loading="lazy">
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

// Scroll helper
function scrollTo(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
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
      { icon: '🧪', text: 'Syphilis serology interpreter' },
      { icon: '❤️', text: 'A-Fib RVR management' },
      { icon: '🧠', text: 'Neurosyphilis workup' },
      { icon: '📴', text: 'Fully offline PWA' },
    ],
    status: 'In Development',
    ctaPrimary: { label: 'Try the Demo', action: () => scrollTo('demo-mymedkitt') },
    ctaSecondary: { label: 'Learn More', action: () => {} },
  });
}

export function renderMyVertigoApp(parent: HTMLElement): void {
  renderProductShowcase(parent, {
    id: 'myvertigoapp',
    name: 'my-vertigo-app',
    eyebrow: 'Bedside clinical support',
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
    ctaPrimary: { label: 'Open the App', action: () => window.open('https://my-vertigo-app.vercel.app', '_blank', 'noopener') },
    ctaSecondary: { label: 'Learn More', action: () => {} },
  });
}

export function renderMyTravelMedKitt(parent: HTMLElement): void {
  renderProductShowcase(parent, {
    id: 'mytravelmedkitt',
    name: 'MyTravelMedKitt',
    eyebrow: 'For travelers',
    domain: 'consumer',
    description: 'Your personal travel medicine kit builder. Tell us where you\'re going \u2014 we\'ll tell you what to pack and what to take when symptoms strike.',
    iconSrc: 'assets/icons/mytravelmedkitt.png',
    features: [
      { icon: '🎒', text: 'Personalized OTC kit builder by destination' },
      { icon: '🩺', text: 'Symptom-to-treatment matching' },
      { icon: '💊', text: 'Drug interaction checker' },
      { icon: '📴', text: 'Full offline functionality' },
    ],
    status: 'In Development',
    ctaPrimary: { label: 'Try the Demo', action: () => scrollTo('demo-mytravelmedkitt') },
    ctaSecondary: { label: 'Learn More', action: () => {} },
  });
}

export function renderFckCancer(parent: HTMLElement): void {
  renderProductShowcase(parent, {
    id: 'fckcancer',
    name: 'FCK Cancer',
    eyebrow: 'For everyday prevention',
    domain: 'consumer',
    reverse: true,
    description: 'A daily prevention and longevity companion for turning evidence-backed choices into habits, shopping lists, body-system protocols, fitness logs, and health screening reminders.',
    iconSrc: 'assets/icons/fck-cancer.png',
    features: [
      { icon: '✅', text: 'Daily anti-cancer habit scoring' },
      { icon: '💪', text: 'Fitness logging with habit integration' },
      { icon: '🧴', text: 'My Body protocols for skin, heart, brain, gut, and more' },
      { icon: '🩺', text: 'Cancer screening checklist and reminders' },
    ],
    status: 'Live',
    ctaPrimary: { label: 'Open the App', action: () => window.open('https://fck-cancer.vercel.app', '_blank', 'noopener') },
    ctaSecondary: { label: 'Suggest Improvements', action: () => scrollTo('feedback') },
  });
}

export function renderAcidBase(parent: HTMLElement): void {
  renderProductShowcase(parent, {
    id: 'acidbase',
    name: 'AcidBase',
    eyebrow: 'Bedside clinical support',
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
    ctaPrimary: { label: 'Open the App', action: () => window.open('https://acidbase.vercel.app', '_blank', 'noopener') },
    ctaSecondary: { label: 'Learn More', action: () => {} },
  });
}

export function renderMyToolKitt(parent: HTMLElement): void {
  renderProductShowcase(parent, {
    id: 'mytoolkitt',
    name: 'MyToolKitt',
    eyebrow: 'For clinical imaging',
    domain: 'clinical',
    description: 'AI-powered clinical image analysis. Snap a photo of a rash or fracture \u2014 get a differential diagnosis and a consult-ready description.',
    iconSrc: 'assets/icons/mytoolkitt.png',
    features: [
      { icon: '📸', text: 'Rash differential diagnosis from photos' },
      { icon: '🦴', text: 'Fracture description generator' },
      { icon: '🤖', text: 'Embedded LLM for clinical reasoning' },
      { icon: '💡', text: 'More tools coming based on your feedback' },
    ],
    status: 'Coming Soon',
    ctaPrimary: { label: 'Get Notified', action: () => scrollTo('feedback') },
    ctaSecondary: { label: 'Learn More', action: () => {} },
  });
}
