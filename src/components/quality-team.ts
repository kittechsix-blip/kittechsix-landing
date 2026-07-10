// Quality Team — the AI audit officers that check every app, every day.
// Proof-driven, not a generic "AI-powered" trust badge: real cadence, real domain, real catches.

interface AuditOfficer {
  glyph: string;
  name: string;
  role: string;
  cadence: string;
  domain: string;
  proof: string;
}

const OFFICERS: AuditOfficer[] = [
  {
    glyph: '🩺',
    name: 'Dr. Kitlowski',
    role: 'Clinical Evidence Officer',
    cadence: 'Daily · 6:00 AM',
    domain: 'Checks doses, thresholds, and decision criteria against a tiered evidence hierarchy — top guideline bodies first, then EM literature.',
    proof: 'Reviews 3–5 consults every morning and sources every correction straight to the guideline. Every audit feeds a growing internal EM evidence base, so the review gets faster and better cited over time.',
  },
  {
    glyph: '🧭',
    name: 'Flow Rider',
    role: 'UX Integrity Officer',
    cadence: 'Daily · 7:00 AM',
    domain: 'Walks every consult’s click-path, tests calculator wiring, checks mobile breakpoints, and watches for console errors.',
    proof: 'Caught and fixed dead calculator buttons in a live consult before a single user reported one. Now runs a weekly benchmark against MDCalc, UpToDate, and Epocrates to keep the bar high.',
  },
  {
    glyph: '⚖️',
    name: 'Louis Litt',
    role: 'Legal & Compliance Officer',
    cadence: 'Daily · 4:00 PM',
    domain: 'Verifies every clinical recommendation traces to a citation a clinician could independently check — the FDA’s bar for clinical decision support software.',
    proof: 'Caught a mis-attributed citation behind a real platelet-transfusion warning and corrected it same-day. Reports only when something’s fixed — silence means clean.',
  },
  {
    glyph: '🌍',
    name: 'Steve Irwin',
    role: 'Travel & Outbreak Surveillance Officer',
    cadence: 'Daily (Mon–Sat) · 7:00 AM',
    domain: 'Scans WHO, CDC, ECDC, and ProMED for outbreak alerts and vaccine-requirement changes to keep MyTravelMedKitt’s destination data current.',
    proof: 'Added Hepatitis A guidance to Canada’s travel data within a day of a CDC Level-1 notice — before most travelers had heard about it.',
  },
];

export function renderQualityTeam(parent: HTMLElement): void {
  const section = document.createElement('section');
  section.id = 'quality-team';
  section.className = 'section qteam-section';

  const cards = OFFICERS.map((officer) => `
    <article class="qteam-card">
      <div class="qteam-card-top">
        <span class="qteam-glyph" aria-hidden="true">${officer.glyph}</span>
        <div class="qteam-card-heading">
          <h3 class="qteam-name">${officer.name}</h3>
          <p class="qteam-role">${officer.role}</p>
        </div>
      </div>
      <span class="qteam-cadence">${officer.cadence}</span>
      <p class="qteam-domain">${officer.domain}</p>
      <p class="qteam-proof">${officer.proof}</p>
    </article>
  `).join('');

  section.innerHTML = `
    <div class="section-content qteam-content">
      <div class="qteam-header">
        <p class="eyebrow eyebrow--green">How we stay current</p>
        <h2 class="text-heading">Meet the attendings who never clock out.</h2>
        <p class="text-subhead qteam-subtitle">Every app in this ecosystem gets checked daily by a team of specialized AI agents — reviewing clinical evidence, hunting UX bugs, verifying legal citations, and tracking global health alerts. Think of it as chart-checking the chart-checker, on a schedule.</p>
      </div>
      <div class="qteam-grid">
        ${cards}
      </div>
      <div class="qteam-guardrail">
        <p class="qteam-guardrail-label">The one thing they can’t do</p>
        <p class="qteam-guardrail-text">They fix a citation, a broken button, a stale data point — automatically, and fast. But none of them can quietly change the actual dose, threshold, or clinical instruction a clinician acts on. That decision always comes back to me first.</p>
        <p class="qteam-guardrail-sign">— Dr. Andy Kitlowski</p>
      </div>
      <p class="qteam-next"><span class="qteam-next-label">Next in the lab:</span> interactive infographics that turn a consult into a one-glance visual, and Wingman, a conversational study companion piloting inside my-vertigo-app.</p>
    </div>
  `;

  parent.appendChild(section);
}
