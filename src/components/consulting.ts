// Consulting — the studio's service offer, and the gravitational center of the page.
// The problem is argued visually: scattered fragments of institutional knowledge
// resolving into a single app. Case study is anonymized by design — shape of the
// problem and the solution only, never the department, never its content.

import { openContactModal } from './contact-modal.js';

/** A place departmental knowledge currently hides. Offsets scatter the card. */
interface Fragment {
  label: string;
  /** horizontal nudge */ sx: string;
  /** vertical nudge */ sy: string;
  /** tilt */ rot: string;
}

interface Capability {
  title: string;
  detail: string;
}

interface Proof {
  figure: string;
  label: string;
}

interface Step {
  index: string;
  title: string;
  detail: string;
}

const FRAGMENTS: Fragment[] = [
  { label: 'A binder at the nurses’ station', sx: '-6px', sy: '0px', rot: '-1.6deg' },
  { label: 'A laminated badge card', sx: '10px', sy: '18px', rot: '2.2deg' },
  { label: 'A PDF on a shared drive', sx: '-14px', sy: '30px', rot: '1.1deg' },
  { label: 'A policy email nobody opened', sx: '8px', sy: '6px', rot: '-2.4deg' },
  { label: 'A group text thread', sx: '18px', sy: '34px', rot: '1.8deg' },
  { label: 'A whiteboard photo on someone’s phone', sx: '-10px', sy: '12px', rot: '-1.1deg' },
  { label: 'An intranet page behind a login', sx: '4px', sy: '40px', rot: '2.6deg' },
  { label: 'The one person who always knows', sx: '-16px', sy: '20px', rot: '-2.8deg' },
];

const CAPABILITIES: Capability[] = [
  {
    title: 'One installable app',
    detail: 'Installs to the home screen from a link, or from a QR code a colleague shares mid-shift. No app store, no login wall.',
  },
  {
    title: 'Search from every screen',
    detail: 'Every protocol, workflow, contact pathway, schedule and department update in one index, with the matched phrase highlighted so you see why a result matched before you tap it.',
  },
  {
    title: 'Works with no signal',
    detail: 'The entire library is precached on the device. It opens in a resus bay, a basement, or a scanner suite exactly the same way it opens on wifi.',
  },
  {
    title: 'An intake that runs itself',
    detail: 'A standing agent watches the department inbox twice a day, reads each new submission, works out which entry it changes, and drafts the update. It never files, replies to, or deletes anything, and it stops for a human before a word reaches the app.',
  },
  {
    title: 'Nobody misses a change',
    detail: 'Anything added in the last 30 days meets the clinician at launch as a single digest. The app holds until it has been read, and tapping an item counts as reading it.',
  },
  {
    title: 'Currency is enforced, not hoped for',
    detail: 'Every entry carries an update date and a freshness badge, an edit cannot ship without bumping that date, and the directories re-sync against the source system on a schedule.',
  },
  {
    title: 'Standing review built in',
    detail: 'The same scheduled review offices that audit my clinical products re-read the content on a fixed cadence and flag drift before a user finds it.',
  },
];

const PROOFS: Proof[] = [
  { figure: '120+', label: 'Operational guides in one searchable place, across 11 sections' },
  { figure: '231', label: 'Consultants in the on-call directory, searchable with no signal' },
  { figure: '30–60s', label: 'For a change to reach every installed phone. No app store, no re-download' },
  { figure: '20', label: 'Production releases in five months, built by one practicing physician' },
];

const STEPS: Step[] = [
  {
    index: '01',
    title: 'Scoping call',
    detail: 'Forty-five minutes. What your people go looking for, where it currently lives, and what it costs when they cannot find it. No charge, no deck.',
  },
  {
    index: '02',
    title: 'Discovery',
    detail: 'I map every place the knowledge hides today and write a one-page spec in plain language. You veto anything that does not match reality before a line of code exists.',
  },
  {
    index: '03',
    title: 'Build',
    detail: 'A working app in weeks, not quarters. You see it early and often, and it ships when the people who have to use it say it is right.',
  },
  {
    index: '04',
    title: 'Handoff and upkeep',
    detail: 'You own the content, always. I keep the system current on a retainer, or hand you the keys and the documentation. Your call, either way.',
  },
];

export function renderConsulting(parent: HTMLElement): void {
  const section = document.createElement('section');
  section.id = 'consulting';
  section.className = 'section consulting-section';
  section.setAttribute('aria-labelledby', 'consulting-title');

  const fragments = FRAGMENTS.map((fragment) => `
    <li class="cons-frag" style="--sx:${fragment.sx};--sy:${fragment.sy};--rot:${fragment.rot};">
      <span class="cons-frag-dot" aria-hidden="true"></span>
      <span class="cons-frag-label">${fragment.label}</span>
    </li>
  `).join('');

  const capabilities = CAPABILITIES.map((capability) => `
    <li class="cons-cap">
      <span class="cons-cap-tick" aria-hidden="true">▸</span>
      <span class="cons-cap-body">
        <span class="cons-cap-title">${capability.title}</span>
        <span class="cons-cap-detail">${capability.detail}</span>
      </span>
    </li>
  `).join('');

  const proofs = PROOFS.map((proof) => `
    <div class="cons-proof">
      <dt class="cons-proof-figure">${proof.figure}</dt>
      <dd class="cons-proof-label">${proof.label}</dd>
    </div>
  `).join('');

  const steps = STEPS.map((step) => `
    <li class="cons-step">
      <span class="cons-step-index" aria-hidden="true">${step.index}</span>
      <h3 class="cons-step-title">${step.title}</h3>
      <p class="cons-step-detail">${step.detail}</p>
    </li>
  `).join('');

  section.innerHTML = `
    <div class="section-content cons-content">
      <header class="cons-header">
        <div class="cons-header-lead">
          <p class="eyebrow">Consulting</p>
          <h1 class="text-heading cons-title" id="consulting-title">Your department already knows the answer. Nobody can find it at 3&nbsp;a.m.</h1>
        </div>
        <div class="cons-header-aside">
          <p class="text-subhead cons-subhead">I build the internal tools clinical teams actually open on shift — the reference, the workflow, the checklist, the who-do-I-call — collapsed into one app that lives on the phone already in the pocket.</p>
          <p class="cons-stamp">Kittech-Six LLC · built by a practicing emergency physician</p>
        </div>
      </header>

      <div class="cons-problem">
        <div class="cons-problem-head">
          <h2 class="cons-h3">Right now it lives everywhere.</h2>
          <p class="text-body cons-problem-note">Nothing is wrong, exactly. Every piece of it is correct somewhere. It is just spread across eight places, half of them offline, and none of them the place a clinician thinks to look while the room is filling up.</p>
        </div>

        <div class="cons-argument">
          <ul class="cons-scatter">
            ${fragments}
          </ul>
          <span class="cons-arrow" aria-hidden="true">→</span>
          <div class="cons-resolve">
            <p class="cons-resolve-label">Then it lives here</p>
            <p class="cons-resolve-title">One app.<br>One search.<br>Current.</p>
            <p class="cons-resolve-text">The same knowledge, in one place, on the device they are already holding. It works offline, it updates everywhere at once, and it never asks anyone to log in before it helps.</p>
          </div>
        </div>
      </div>

      <article class="cons-case" aria-labelledby="cons-case-title">
        <div class="cons-case-head">
          <p class="cons-kicker">Case study · anonymized</p>
          <h2 class="cons-case-title" id="cons-case-title">An operations app for a large academic emergency department.</h2>
          <p class="cons-case-body">A department running on reference material that had accumulated rather than been designed: one thing in a binder, another on a shared drive, a third in whoever happened to remember it. I mapped every place the knowledge was hiding, then rebuilt it as one installable app — protocols, department operations, onboarding, disposition and follow-up routing, quality metrics, scheduling, contacts and consultants, all searchable from any screen and all readable with no signal. It went from first commit to department-wide release in under five months, and it is in daily use on shift today.</p>
        </div>

        <div class="cons-case-detail">
          <h3 class="cons-sublabel">What was built</h3>
          <ul class="cons-caps">
            ${capabilities}
          </ul>
        </div>

        <div class="cons-case-outcome">
          <h3 class="cons-sublabel">What changed</h3>
          <dl class="cons-proofs">
            ${proofs}
          </dl>
        </div>
      </article>

      <div class="cons-engage">
        <div class="cons-engage-head">
          <h2 class="cons-h3">How an engagement runs.</h2>
          <p class="text-body cons-engage-note">Small, senior, and fast. You are working with the physician who builds it, not an account team.</p>
        </div>
        <ol class="cons-steps">
          ${steps}
        </ol>
      </div>

      <div class="cons-cta">
        <p class="cons-cta-line">Have a department running on tribal knowledge?</p>
        <button class="cta-primary cons-cta-button" id="consulting-cta" type="button">Start a scoping conversation</button>
        <p class="cons-cta-note">Remote or on-site · the first call is a conversation, not a pitch.</p>
      </div>
    </div>
  `;

  parent.appendChild(section);

  section.querySelector('#consulting-cta')?.addEventListener('click', () => {
    openContactModal({ subject: 'Consulting — scoping conversation' });
  });
}
