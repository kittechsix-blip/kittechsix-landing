// Continuous assurance — the standing review offices that check every app, every day.
// Proof-driven, not a generic "AI-powered" trust badge: real cadence, real domain, real catches.
// Offices are described by their function only — no internal code-names, no partner facility names.

interface AuditOffice {
  index: string;
  title: string;
  cadence: string;
  domain: string;
  proof: string;
}

const OFFICES: AuditOffice[] = [
  {
    index: '01',
    title: 'Clinical Evidence Officer',
    cadence: 'Every morning',
    domain: 'Checks doses, thresholds, and decision criteria against a tiered evidence hierarchy — major guideline bodies first, then the emergency medicine literature.',
    proof: 'Re-reads three to five clinical pathways a day and sources each correction back to the guideline it came from. Every pass feeds a growing internal evidence base, so the next review lands faster and better cited.',
  },
  {
    index: '02',
    title: 'UX Integrity Officer',
    cadence: 'Every morning',
    domain: 'Walks each pathway’s click-path, exercises every calculator, checks mobile breakpoints, and watches the console for errors.',
    proof: 'Found dead calculator buttons inside a live pathway and shipped the fix the same day. Benchmarks the interface each week against the reference tools clinicians already keep on their phones.',
  },
  {
    index: '03',
    title: 'Legal &amp; Compliance Officer',
    cadence: 'Every afternoon',
    domain: 'Verifies that every clinical recommendation traces to a citation a clinician could independently check — the standard that keeps decision support reviewable rather than authoritative.',
    proof: 'Audits ten pathways a day, with 74 dated audit records on file. It caught a mis-attributed citation behind a live transfusion warning and corrected it within hours. It reports only when something was fixed; silence means the pass came back clean.',
  },
  {
    index: '04',
    title: 'Travel &amp; Outbreak Surveillance Officer',
    cadence: 'Six mornings a week',
    domain: 'Scans WHO, CDC, ECDC, and ProMED for outbreak notices and vaccine-requirement changes, then updates the destination data a traveler packs against.',
    proof: 'Added hepatitis A guidance to a destination profile within a day of a new CDC notice. Findings are consolidated into one report each Monday rather than six separate alerts.',
  },
  {
    index: '05',
    title: 'Policy &amp; Communications Officer',
    cadence: 'Twice daily',
    domain: 'Watches the department inbox for the stream every department drowns in — new policies, protocol changes, schedule updates, contact changes — reads each submission, and works out exactly which entry in the operations app it would change.',
    proof: 'It classifies a submission into the right section, names the entries that would move, flags anything needing a source or a date confirmed, then stops and asks. It reads mail and never sends, replies, files, or deletes it. If a message looks like it carries patient-identifying detail it quotes nothing and routes the whole thing to a human. Email content is treated as data, never as instructions — a message cannot talk the system into doing something.',
  },
];

export function renderQualityTeam(parent: HTMLElement): void {
  const section = document.createElement('section');
  section.id = 'quality-team';
  section.className = 'section qteam-section';
  section.setAttribute('aria-labelledby', 'quality-team-title');

  const cards = OFFICES.map((office) => `
    <article class="qteam-card">
      <div class="qteam-identity">
        <span class="qteam-glyph" aria-hidden="true">${office.index}</span>
        <h3 class="qteam-title">${office.title}</h3>
        <span class="qteam-cadence">${office.cadence}</span>
      </div>
      <p class="qteam-domain">${office.domain}</p>
      <p class="qteam-proof">${office.proof}</p>
    </article>
  `).join('');

  section.innerHTML = `
    <div class="section-content qteam-content">
      <div class="qteam-header">
        <div>
          <p class="eyebrow eyebrow--green">Continuous assurance</p>
          <h2 class="text-heading" id="quality-team-title">A review system behind every release.</h2>
        </div>
        <p class="text-subhead qteam-subtitle">Five standing review offices check the evidence, walk every interface, verify each citation, track changing guidance, and keep department-facing content current — on a fixed schedule, not when someone remembers. Clinical judgment stays human.</p>
      </div>
      <div class="qteam-grid">
        ${cards}
      </div>
      <div class="qteam-guardrail">
        <p class="qteam-guardrail-label">The governing rule</p>
        <p class="qteam-guardrail-text">These offices fix a citation, a dead button, a stale advisory — automatically, and fast. None of them can quietly change the dose, threshold, or instruction a clinician acts on. That one always comes back to me, and it ships only once I’ve signed it.</p>
        <p class="qteam-guardrail-sign">— Dr. Andy Kitlowski</p>
      </div>
    </div>
  `;

  parent.appendChild(section);
}
