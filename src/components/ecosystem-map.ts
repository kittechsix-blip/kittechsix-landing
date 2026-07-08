// Ecosystem Map — interactive project directory and community roadmap entry point

type Audience = 'All' | 'Clinicians' | 'Students' | 'Patients' | 'Travelers' | 'Builders' | 'Educators' | 'Community';

interface EcosystemProject {
  id: string;
  name: string;
  audience: Exclude<Audience, 'All'>;
  stage: string;
  statusTone: 'live' | 'build' | 'concept' | 'internal';
  summary: string;
  proof: string;
  communityAsk: string;
  url?: string;
  sectionId?: string;
  feedbackCategory: string;
}

const AUDIENCES: Audience[] = ['All', 'Clinicians', 'Students', 'Patients', 'Travelers', 'Builders', 'Educators', 'Community'];

const PROJECTS: EcosystemProject[] = [
  {
    id: 'mymedkitt',
    name: 'myMedKitt',
    audience: 'Clinicians',
    stage: 'Live clinical build',
    statusTone: 'live',
    summary: 'Mobile-first emergency medicine consults, drugs, calculators, and rapid decision support.',
    proof: '400+ consults, 300+ drugs, offline PWA architecture, Supabase-backed clinical content.',
    communityAsk: 'Suggest missing consults, unsafe workflow gaps, and bedside usability fixes.',
    url: 'https://kittechsix-blip.github.io/mymedkitt/app.html',
    sectionId: 'mymedkitt',
    feedbackCategory: 'myMedKitt',
  },
  {
    id: 'medkitt-learn',
    name: 'MedKitt Learn',
    audience: 'Students',
    stage: 'Psych pilot planned',
    statusTone: 'concept',
    summary: 'A student doorway into myMedKitt: what to ask, what to present, and when to escalate.',
    proof: 'Psychiatry rotation is the strongest first pilot because the consult base already exists.',
    communityAsk: 'Vote for rotation pathways and the student cards that would help most on rounds.',
    sectionId: 'feedback',
    feedbackCategory: 'MedKitt Learn',
  },
  {
    id: 'mystroke-kitt',
    name: 'myStroke-Kitt',
    audience: 'Clinicians',
    stage: 'Live',
    statusTone: 'live',
    summary: 'Code-stroke decision support: triage, NIHSS fast-sheet, thrombolysis hard stops, TNK dosing, and dedicated ischemic, hemorrhagic, and mimic pathways.',
    proof: 'Live PWA with pathway-colored decision tree, 20-tool bedside toolbar, and auto-generated documentation.',
    communityAsk: 'Stress-test the contraindication logic and suggest missing bedside tools.',
    url: 'https://mystroke-kitt.vercel.app',
    sectionId: 'mystroke-kitt',
    feedbackCategory: 'myStroke-Kitt',
  },
  {
    id: 'antibiotic-rx',
    name: 'Antibiotic Rx',
    audience: 'Clinicians',
    stage: 'Live',
    statusTone: 'live',
    summary: 'Empiric and culture-directed antibiotic guidance for ~130 infections, with patient parameters, local antibiogram overlays, and dose calculators.',
    proof: 'Guideline-cited regimens, Dell Seton antibiogram integration, pediatric and renal dosing built in.',
    communityAsk: 'Flag regimen gaps, local-practice mismatches, and missing syndromes.',
    url: 'https://antibiotic-rx.vercel.app',
    sectionId: 'antibiotic-rx',
    feedbackCategory: 'Antibiotic Rx',
  },
  {
    id: 'myvertigoapp',
    name: 'my-vertigo-app',
    audience: 'Clinicians',
    stage: 'Live',
    statusTone: 'live',
    summary: 'Bedside vertigo support for HINTS, BPPV maneuvers, lateralization, and discharge planning.',
    proof: 'Live PWA with mobile/native direction and focused vestibular workflows.',
    communityAsk: 'Improve exam teaching, discharge clarity, and visual decision support.',
    url: 'https://my-vertigo-app.vercel.app',
    sectionId: 'myvertigoapp',
    feedbackCategory: 'my-vertigo-app',
  },
  {
    id: 'acidbase',
    name: 'AcidBase',
    audience: 'Clinicians',
    stage: 'Live',
    statusTone: 'live',
    summary: 'Bedside acid-base analyzer: enter an ABG and chemistry to get the disorder, the reasoning, mixed-disorder detection, differential, workup, and evidence-based treatment.',
    proof: 'On-device engine with anion gap, delta ratio, osmolar gap, and compensation checks; content from an adversarially-verified EBM knowledge base.',
    communityAsk: 'Flag edge cases, missing differentials, and treatment nuances to sharpen the analyzer.',
    url: 'https://acidbase.vercel.app',
    sectionId: 'acidbase',
    feedbackCategory: 'AcidBase',
  },
  {
    id: 'mytravelmedkitt',
    name: 'MyTravelMedKitt',
    audience: 'Travelers',
    stage: 'In development',
    statusTone: 'build',
    summary: 'Destination-aware travel medicine kit builder and outbreak-informed health preparation.',
    proof: 'Trip demo and travel medicine data pipeline are in place.',
    communityAsk: 'Request destination packs, common symptom flows, and kit-building improvements.',
    sectionId: 'mytravelmedkitt',
    feedbackCategory: 'MyTravelMedKitt',
  },
  {
    id: 'powerkitt',
    name: 'PowerKitt',
    audience: 'Clinicians',
    stage: 'In development',
    statusTone: 'build',
    summary: 'Neuromuscular weakness workup: localize the lesion, run disease-specific tools, and reach a bedside diagnosis.',
    proof: 'Live build with a disease-tools subsystem; still hardening before a wide release.',
    communityAsk: 'Stress-test the localization logic and suggest missing weakness syndromes.',
    url: 'https://powerkitt.vercel.app',
    feedbackCategory: 'PowerKitt',
  },
  {
    id: 'fckcancer',
    name: 'FCK Cancer',
    audience: 'Patients',
    stage: 'In development',
    statusTone: 'build',
    summary: 'Daily prevention, longevity, body-system protocols, fitness logging, shopping, and screening reminders.',
    proof: 'Habit scoring, My Body, Fitness, and Health modules are already active.',
    communityAsk: 'Submit evidence-backed habits, protocols, recipes, and body-system ideas.',
    url: 'https://fck-cancer.vercel.app',
    sectionId: 'fckcancer',
    feedbackCategory: 'FCK Cancer',
  },
  {
    id: 'community-roadmap',
    name: 'Community Roadmap',
    audience: 'Community',
    stage: 'Open for votes',
    statusTone: 'live',
    summary: 'A public place to vote on features, request new tools, and help prioritize the Kittechsix build queue.',
    proof: 'The landing page already supports suggestions, project categories, voting, and per-project feedback.',
    communityAsk: 'Tell us what should be built, what is confusing, and which projects deserve the next sprint.',
    sectionId: 'feedback',
    feedbackCategory: 'Community Roadmap',
  },
];

export function renderEcosystemMap(parent: HTMLElement): void {
  const section = document.createElement('section');
  section.id = 'ecosystem';
  section.className = 'section section-cream ecosystem-section';

  let activeAudience: Audience = 'All';
  let selectedId = PROJECTS[0].id;

  section.innerHTML = `
    <div class="section-content ecosystem-content">
      <div class="ecosystem-header">
        <p class="eyebrow ecosystem-eyebrow">Project ecosystem</p>
        <h2 class="text-heading">Pick a project. Shape what it becomes.</h2>
        <p class="ecosystem-subtitle">A living map of Kittechsix apps, experiments, and the public roadmap. Every project has a clear audience, status, and community ask.</p>
      </div>
      <div class="ecosystem-filters" id="ecosystem-filters"></div>
      <div class="ecosystem-layout">
        <div class="ecosystem-grid" id="ecosystem-grid"></div>
        <aside class="ecosystem-detail" id="ecosystem-detail" aria-live="polite"></aside>
      </div>
    </div>
  `;

  parent.appendChild(section);

  const filtersEl = section.querySelector('#ecosystem-filters') as HTMLElement;
  const gridEl = section.querySelector('#ecosystem-grid') as HTMLElement;
  const detailEl = section.querySelector('#ecosystem-detail') as HTMLElement;

  function filteredProjects(): EcosystemProject[] {
    return activeAudience === 'All'
      ? PROJECTS
      : PROJECTS.filter(project => project.audience === activeAudience);
  }

  function renderFilters(): void {
    filtersEl.innerHTML = '';
    for (const audience of AUDIENCES) {
      const button = document.createElement('button');
      button.className = `ecosystem-filter${audience === activeAudience ? ' active' : ''}`;
      button.type = 'button';
      button.textContent = audience;
      button.setAttribute('aria-pressed', String(audience === activeAudience));
      button.addEventListener('click', () => {
        activeAudience = audience;
        const visible = filteredProjects();
        if (!visible.some(project => project.id === selectedId)) {
          selectedId = visible[0]?.id ?? PROJECTS[0].id;
        }
        render();
      });
      filtersEl.appendChild(button);
    }
  }

  function renderGrid(): void {
    gridEl.innerHTML = '';
    for (const project of filteredProjects()) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `ecosystem-card${project.id === selectedId ? ' selected' : ''}`;
      button.setAttribute('aria-pressed', String(project.id === selectedId));
      button.innerHTML = `
        <span class="ecosystem-card-topline">
          <span class="ecosystem-project-name">${project.name}</span>
          <span class="ecosystem-status ${project.statusTone}">${project.stage}</span>
        </span>
        <span class="ecosystem-project-summary">${project.summary}</span>
        <span class="ecosystem-project-audience">${project.audience}</span>
      `;
      button.addEventListener('click', () => {
        selectedId = project.id;
        renderGrid();
        renderDetail();
      });
      gridEl.appendChild(button);
    }
  }

  function renderDetail(): void {
    const project = PROJECTS.find(item => item.id === selectedId) ?? PROJECTS[0];
    detailEl.innerHTML = `
      <div class="ecosystem-detail-kicker">${project.audience} / ${project.stage}</div>
      <h3>${project.name}</h3>
      <p>${project.summary}</p>
      <dl class="ecosystem-detail-list">
        <div>
          <dt>Why it matters</dt>
          <dd>${project.proof}</dd>
        </div>
        <div>
          <dt>Community ask</dt>
          <dd>${project.communityAsk}</dd>
        </div>
      </dl>
      <div class="ecosystem-actions">
        ${project.url ? `<button class="cta-primary" id="ecosystem-open">Open Project</button>` : ''}
        <button class="cta-secondary ecosystem-feedback-btn" id="ecosystem-feedback">Suggest Improvement</button>
        ${project.sectionId ? `<button class="ecosystem-jump" id="ecosystem-jump">View Section</button>` : ''}
      </div>
    `;

    const openButton = detailEl.querySelector('#ecosystem-open') as HTMLButtonElement | null;
    openButton?.addEventListener('click', () => {
      if (project.url) window.open(project.url, '_blank', 'noopener');
    });

    const feedbackButton = detailEl.querySelector('#ecosystem-feedback') as HTMLButtonElement;
    feedbackButton.addEventListener('click', () => {
      scrollToFeedback(project.feedbackCategory);
    });

    const jumpButton = detailEl.querySelector('#ecosystem-jump') as HTMLButtonElement | null;
    jumpButton?.addEventListener('click', () => {
      if (project.sectionId) {
        document.getElementById(project.sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  function render(): void {
    renderFilters();
    renderGrid();
    renderDetail();
  }

  render();
}

function scrollToFeedback(category: string): void {
  document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' });
  requestAnimationFrame(() => {
    const select = document.querySelector<HTMLSelectElement>('.feedback-select');
    if (select && Array.from(select.options).some(option => option.value === category)) {
      select.value = category;
    }
  });
}
