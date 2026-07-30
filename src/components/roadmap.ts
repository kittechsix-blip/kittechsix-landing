// Roadmap — an honest build log for the two apps still in development.
// Replaces the old interactive ecosystem map, which listed everything including
// projects that have since been cut. The five live clinical systems have their own
// chapters higher up the page; this section only covers unfinished work, and shows
// the gap between what exists today and what is still missing.

import { APP_REGISTRY } from '../data/app-registry.js';

interface Accent {
  base: string;
  soft: string;
  deep: string;
}

/** Used when APP_REGISTRY has no entry for an id (PowerKitt today). Points at existing
 *  copper tokens rather than inventing a new hex, so a future rebrand carries it along. */
const FALLBACK_ACCENT: Accent = {
  base: 'var(--copper-500)',
  soft: 'var(--copper-50)',
  deep: 'var(--copper-700)',
};

interface RoadmapItem {
  /** Registry key. May be absent from APP_REGISTRY — FALLBACK_ACCENT covers that. */
  id: string;
  index: string;
  name: string;
  stage: string;
  discipline: string;
  statement: string;
  built: string[];
  remains: string[];
}

const ITEMS: RoadmapItem[] = [
  {
    id: 'mytravelmedkitt',
    index: '06',
    name: 'MyTravelMedKitt',
    stage: 'In development · Pre-TestFlight',
    discipline: 'Travel health companion',
    statement: 'A travel kit that knows where you are going, and packs for the medicine you might need once you are there.',
    built: [
      '198 destinations, each with emergency and embassy numbers bundled for offline use.',
      '85 ailments, 51 over-the-counter medicines, and 148 prescription-versus-OTC interaction pairs, plus duplicate-active-ingredient detection across the whole kit rather than drug by drug.',
      '21 vaccines with per-country requirement logic rebuilt against current CDC and WHO guidance, kept current by the surveillance office above.',
      'Every traveler in a party gets their own kit, filtered against their own age, conditions, medications and allergies. The kit builder, symptom checker and interaction checker all run with no connection.',
    ],
    remains: [
      'It has never been to TestFlight. No outside traveler has used it.',
      'A 15-language medical phrase pack was machine-drafted and needs native-speaker review before anyone relies on it in a pharmacy abroad.',
      'Unit tests and a full end-to-end pass on real hardware are still outstanding.',
      'Clinical sign-off has not happened, so there is no release date.',
    ],
  },
  {
    id: 'powerkitt',
    index: '07',
    name: 'PowerKitt',
    stage: 'In development · Awaiting sign-off',
    discipline: 'Neuromuscular localization',
    statement: 'Work objective weakness backward — from the exam findings to where the lesion actually sits.',
    built: [
      'A four-step gated workup: entry contract, red-flag screen, electrolyte and EKG interlock, then localization. You cannot skip ahead to a diagnosis, and deferring a required lab is a fixed choice that gets stamped into the record rather than free text.',
      '20 disease reference cards, 15 bedside safety items, and 5 incongruence rules that flag a story which does not hang together.',
      'A 51-case synthetic validation corpus with no patient data: 29 of 29 can’t-miss cases captured, zero false-safe results.',
      '155 core tests and 16 interface tests, plus typecheck, lint, production build and a rehearsed recall drill on every release.',
    ],
    remains: [
      'Pre-launch legal and clinical sign-off is not complete, and the release is gated behind it.',
      'An approved validation manifest has to be bound to the exact release bundle before that bundle can guide anyone.',
      'De-identified retrospective validation and independent review are still to be done.',
      'Until all of that is green the app fails closed to reference-only. It stops guiding rather than guessing, which is why it is on this list and not the one above.',
    ],
  },
];

export function renderRoadmap(parent: HTMLElement): void {
  const section = document.createElement('section');
  section.id = 'roadmap';
  section.className = 'section section-cream roadmap-section';
  section.setAttribute('aria-labelledby', 'roadmap-title');

  const items = ITEMS.map((item) => {
    const accent: Accent = APP_REGISTRY[item.id]?.accent ?? FALLBACK_ACCENT;
    const accentStyle = `--app-accent:${accent.base};--app-accent-soft:${accent.soft};--app-accent-deep:${accent.deep}`;

    const built = item.built.map((line) => `<li class="roadmap-line">${line}</li>`).join('');
    const remains = item.remains.map((line) => `<li class="roadmap-line">${line}</li>`).join('');

    return `
      <li class="roadmap-item" style="${accentStyle}">
        <div class="roadmap-item-head">
          <span class="roadmap-index" aria-hidden="true">${item.index}</span>
          <div class="roadmap-identity">
            <h3 class="roadmap-name">${item.name}</h3>
            <p class="roadmap-discipline">${item.discipline}</p>
          </div>
          <span class="roadmap-stage">${item.stage}</span>
        </div>
        <p class="roadmap-statement">${item.statement}</p>
        <div class="roadmap-ledger">
          <div class="roadmap-col roadmap-col--built">
            <p class="roadmap-col-label">Built today</p>
            <ul class="roadmap-lines">${built}</ul>
          </div>
          <div class="roadmap-col roadmap-col--remains">
            <p class="roadmap-col-label">What remains</p>
            <ul class="roadmap-lines">${remains}</ul>
          </div>
        </div>
      </li>
    `;
  }).join('');

  section.innerHTML = `
    <div class="section-content roadmap-content">
      <header class="roadmap-header">
        <div>
          <p class="eyebrow">Roadmap</p>
          <h2 class="text-heading" id="roadmap-title">What is still unfinished.</h2>
        </div>
        <p class="text-subhead roadmap-lede"><a class="page-inline-link" href="#/work">The five clinical systems</a> are live and in daily use. These two are not, and I would rather show you the gap than describe them as though they were finished. Here is what exists today and what is still missing.</p>
      </header>
      <ol class="roadmap-list">
        ${items}
      </ol>
      <p class="roadmap-labnote"><span class="roadmap-labnote-label">Also in the lab:</span> 336 of the flagship system’s 353 consults now carry an interactive visual map generated straight from the consult’s own decision logic, and a conversational study companion built from each app’s own clinical source is in internal testing. There are no ship dates on this page on purpose. Things release when the review offices clear them and I sign off clinically, not when a date on a slide says they should.</p>
    </div>
  `;

  parent.appendChild(section);
}
