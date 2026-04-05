// Product Showcase — reusable component for each app section

interface ProductShowcaseConfig {
  id: string;
  name: string;
  description: string;
  iconSrc: string;
  features: { icon: string; text: string }[];
  status: 'In Development' | 'Coming Soon';
  ctaPrimary: { label: string; action: () => void };
  ctaSecondary?: { label: string; action: () => void };
}

export function renderProductShowcase(parent: HTMLElement, config: ProductShowcaseConfig): void {
  const section = document.createElement('section');
  section.id = config.id;
  section.className = 'section section-light';

  const featuresHtml = config.features.map(f => `
    <div class="showcase-feature">
      <span class="showcase-feature-icon">${f.icon}</span>
      <span class="showcase-feature-text">${f.text}</span>
    </div>
  `).join('');

  section.innerHTML = `
    <div class="section-content">
      <div class="showcase-icon-wrapper">
        <img class="showcase-icon" src="${config.iconSrc}" alt="${config.name} app icon" loading="lazy">
      </div>
      <h2 class="text-heading showcase-headline">${config.name}</h2>
      <p class="text-body showcase-description">${config.description}</p>
      <div class="showcase-features">${featuresHtml}</div>
      <div class="showcase-ctas" id="ctas-${config.id}"></div>
      <p class="showcase-status">${config.status}</p>
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

export function renderMyTravelMedKitt(parent: HTMLElement): void {
  renderProductShowcase(parent, {
    id: 'mytravelmedkitt',
    name: 'MyTravelMedKitt',
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

export function renderMyToolKitt(parent: HTMLElement): void {
  renderProductShowcase(parent, {
    id: 'mytoolkitt',
    name: 'MyToolKitt',
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
