// Selected Work — an editorial project index that establishes hierarchy before
// the visitor reaches the deeper interactive product chapters.

import { APP_REGISTRY } from '../data/app-registry.js';

interface FeaturedProject {
  id: string;
  index: string;
  name: string;
  category: string;
  statement: string;
  proof: string;
  icon: string;
}

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 'mymedkitt',
    index: '01',
    name: 'myMedKitt',
    category: 'Emergency medicine system',
    statement: 'The emergency department, compressed into the phone in your pocket.',
    proof: '353 consults · 306 drugs · offline-first',
    icon: 'mymedkitt.png',
  },
  {
    id: 'antibiotic-rx',
    index: '02',
    name: 'Antibiotic Rx',
    category: 'Adaptive prescribing',
    statement: 'Guideline-backed regimens that rewrite themselves around the patient.',
    proof: '~130 syndromes · local antibiogram · renal dosing',
    icon: 'antibiotic-rx.png',
  },
  {
    id: 'myvertigoapp',
    index: '03',
    name: 'my-vertigo-app',
    category: 'Focused clinical workflow',
    statement: 'A clearer path through the dizzy patient, from exam to disposition.',
    proof: 'HINTS+ · all three canals · 29 citations',
    icon: 'myvertigoapp.png',
  },
  {
    id: 'acidbase',
    index: '04',
    name: 'AcidBase',
    category: 'Reasoning engine',
    statement: 'From one blood gas to the disorder, the why, and what comes next.',
    proof: 'Mixed disorders · differential · treatment',
    icon: 'acidbase.png',
  },
  {
    id: 'mystroke-kitt',
    index: '05',
    name: 'myStroke-Kitt',
    category: 'Time-critical decision support',
    statement: 'Code-stroke decisions organized for the minutes that change outcomes.',
    proof: 'NIHSS · TNK dosing · hard-stop logic',
    icon: 'mystroke-kitt.png',
  },
  {
    id: 'acute-vision-loss',
    index: '06',
    name: 'Acute Vision Loss',
    category: 'Acute eye workup',
    statement: 'Four questions, the eye vital signs, and the pathway that cannot wait.',
    proof: '8 modules · bedside tools · cited pathways',
    icon: 'acute-vision-loss.png',
  },
];

export function renderFeaturedRow(parent: HTMLElement): void {
  const section = document.createElement('section');
  section.className = 'section featured-row';
  section.id = 'featured';

  const projects = FEATURED_PROJECTS.map((project) => {
    const accent = APP_REGISTRY[project.id]?.accent;
    const accentStyle = accent
      ? ` style="--app-accent:${accent.base};--app-accent-soft:${accent.soft};--app-accent-deep:${accent.deep}"`
      : '';

    return `
      <a class="featured-project" href="#apptabs-${project.id}" data-target="apptabs-${project.id}"${accentStyle}>
        <span class="featured-project-index">${project.index}</span>
        <span class="featured-project-title">
          <span class="featured-project-category">${project.category}</span>
          <strong>${project.name}</strong>
        </span>
        <span class="featured-project-statement">${project.statement}</span>
        <span class="featured-project-proof">${project.proof}</span>
        <span class="featured-project-media" aria-hidden="true">
          <img src="assets/icons/${project.icon}" alt="" loading="lazy" decoding="async" />
        </span>
        <span class="featured-project-arrow" aria-hidden="true">↘</span>
      </a>
    `;
  }).join('');

  section.innerHTML = `
    <div class="section-content featured-content">
      <header class="featured-header">
        <div>
          <p class="eyebrow">Selected work</p>
          <h2 class="text-heading">Built for decisions that happen in real time.</h2>
        </div>
        <p class="featured-lede">Each product starts with a recurring bedside problem, then removes everything that slows the answer down.</p>
      </header>
      <div class="featured-projects">
        ${projects}
      </div>
      <div class="featured-index-footer">
        <span>Six clinical systems</span>
        <a class="link-arrow" href="#roadmap">See what is still in the lab <span aria-hidden="true">↓</span></a>
      </div>
    </div>
  `;

  parent.appendChild(section);

  section.querySelectorAll<HTMLAnchorElement>('.featured-project').forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.dataset['target'];
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}
