// myVertigoApp — pixel-faithful clone of ~/Desktop/my-vertigo-app/apps/web (Next.js 16 PWA).
// Tokens + DOM extracted in recon/my-vertigo-app.md. Burnt Orange #BF5700 on warm-white #FFF8F2,
// iOS glassmorphism + 3D gradient buttons ("btn-3d"), glass progress-pill header, emoji expert toolbar.
// NOTE: emoji toolbar icons / ✓⚠ pill glyphs / 🎬📚⏱ chips are load-bearing UI in the REAL app — kept.
// Drawn icons (disclaimer triangle, status bar) are inline SVG.

// ---------------------------------------------------------------------------
// Shared chrome
// ---------------------------------------------------------------------------

const STATUSBAR = `
  <div class="vt-statusbar" aria-hidden="true">
    <span class="vt-statusbar__time">9:41</span>
    <span class="vt-statusbar__icons">
      <svg class="vt-statusbar__svg" viewBox="0 0 19 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0.5" width="3.5" height="11.5" rx="1"/></svg>
      <svg class="vt-statusbar__svg" viewBox="0 0 16 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M1.5 4.2a10 10 0 0 1 13 0"/><path d="M3.9 7a6.4 6.4 0 0 1 8.2 0"/><path d="M6.4 9.7a3 3 0 0 1 3.2 0"/><circle cx="8" cy="11" r="0.9" fill="currentColor" stroke="none"/></svg>
      <svg class="vt-statusbar__svg vt-statusbar__svg--battery" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" opacity="0.4"/><rect x="2.2" y="2.2" width="17.6" height="7.6" rx="2" fill="currentColor"/><path d="M23 4v4a2.2 2.2 0 0 0 0-4Z" fill="currentColor" opacity="0.4"/></svg>
    </span>
  </div>
`;

// Amber "NOT FDA CLEARED" banner — real product chrome, shown on every workup page.
const DISCLAIMER = `
  <div class="vt-banner" role="status" data-vt="disclaimer">
    <svg class="vt-banner__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21.73 18 13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
    <p class="vt-banner__text"><span class="vt-banner__strong">NOT FDA CLEARED — For licensed clinician use only. Not a substitute for clinical judgment.</span> <button type="button" class="vt-banner__learn">Learn more</button></p>
  </div>
`;

type PillState = 'completed' | 'current' | 'future' | 'danger';

const MODULES = ['Safety', 'Timing', 'BPPV', 'HINTS+', 'Mimics', 'Stroke', 'Dispo'];

function pillsHeader(states: PillState[]): string {
  const glyph: Record<PillState, string> = {
    completed: '<span class="vt-pill__glyph">✓</span>',
    danger: '<span class="vt-pill__glyph">⚠</span>',
    current: '',
    future: '',
  };
  const pills = MODULES.map(
    (m, i) => `<button type="button" class="vt-pill vt-pill--${states[i]}">${glyph[states[i]]}${m}</button>`,
  ).join('');
  return `<div class="vt-pills" data-vt="pills"><div class="vt-pills__row">${pills}</div></div>`;
}

interface ToolItem {
  icon: string;
  label: string;
  pro?: boolean;
}

// Expert toolbar: global items, divider, module context items, divider, …more.
function toolbar(context: ToolItem[], anchor = ''): string {
  const item = (t: ToolItem) =>
    `<button type="button" class="vt-toolbar__item${t.pro ? ' vt-toolbar__item--pro' : ''}">` +
    `<span class="vt-toolbar__icon">${t.icon}</span>` +
    `<span class="vt-toolbar__label">${t.label}${t.pro ? '<span class="vt-toolbar__badge">PRO</span>' : ''}</span>` +
    `</button>`;
  const globals: ToolItem[] = [
    { icon: '🏠', label: 'Home' },
    { icon: '↺', label: 'Reset' },
    { icon: '📋', label: 'Disposition' },
    { icon: '🧭', label: 'Still Off' },
  ];
  const ctx = context.length
    ? `<div class="vt-toolbar__divider"></div>${context.map(item).join('')}`
    : '';
  return (
    `<div class="vt-toolbar"${anchor ? ` data-vt="${anchor}"` : ''}>` +
    `<div class="vt-toolbar__row">${globals.map(item).join('')}${ctx}` +
    `<div class="vt-toolbar__divider"></div>${item({ icon: '•••', label: '…more' })}</div></div>`
  );
}

const BPPV_TOOLS: ToolItem[] = [
  { icon: '👂', label: 'Lateralize' },
  { icon: '🔍', label: 'Dix-Hallpike' },
  { icon: '🔍', label: 'Supine Roll' },
  { icon: '🔄', label: 'Epley' },
  { icon: '🔄', label: 'Gufoni', pro: true },
  { icon: '🔄', label: 'BBQ Roll', pro: true },
  { icon: '🔄', label: 'Semont', pro: true },
];

const HINTS_TOOLS: ToolItem[] = [
  { icon: '🧮', label: 'HINTS Calc' },
  { icon: '👂', label: 'Lateralize' },
  { icon: '👁', label: 'Nystagmus' },
  { icon: '👁', label: 'Skew' },
  { icon: '🤲', label: 'HIT' },
  { icon: '👂', label: 'Hearing' },
  { icon: '📄', label: 'Paper Trick', pro: true },
];

// Checklist row (Deadly D's + disposition toggles share this exact row style).
function check(label: string, desc: string): string {
  return (
    `<button type="button" class="vt-check"><span class="vt-check__box"></span>` +
    `<span class="vt-check__text"><span class="vt-check__label">${label}</span>` +
    `<span class="vt-check__desc">${desc}</span></span></button>`
  );
}

function checkDanger(label: string, desc: string, anchor: string): string {
  return (
    `<button type="button" class="vt-check vt-check--danger" data-vt="${anchor}">` +
    `<span class="vt-check__box vt-check__box--danger">✓</span>` +
    `<span class="vt-check__text"><span class="vt-check__label vt-check__label--danger">${label}</span>` +
    `<span class="vt-check__desc">${desc}</span></span></button>`
  );
}

function checkDone(label: string, desc: string, radio = false, anchor = ''): string {
  return (
    `<button type="button" class="vt-check vt-check--done"${anchor ? ` data-vt="${anchor}"` : ''}>` +
    `<span class="vt-check__box vt-check__box--done${radio ? ' vt-check__box--radio' : ''}">✓</span>` +
    `<span class="vt-check__text"><span class="vt-check__label">${label}</span>` +
    `<span class="vt-check__desc">${desc}</span></span></button>`
  );
}

// ---------------------------------------------------------------------------
// Screen 1 — Safety: The Deadly D's & Red Flags (danger state: truncal ataxia checked)
// ---------------------------------------------------------------------------

export function renderVTSafety(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'vt-screen';
  el.innerHTML = `
    ${STATUSBAR}
    ${DISCLAIMER}
    ${pillsHeader(['current', 'future', 'future', 'future', 'future', 'future', 'future'])}
    <main class="vt-main"><div class="vt-col">
      <div class="vt-card vt-card--danger">
        <h2 class="vt-card__title">The Deadly D's &amp; Red Flags</h2>
        <div class="vt-card__body"><p>Check ALL that apply. <strong>Any single positive finding = central until proven otherwise.</strong></p></div>
        <div class="vt-checklist">
          ${check('Diplopia', 'Double vision — cranial nerve or brainstem involvement')}
          ${check('Dysphonia', 'Hoarse voice or new hiccups — vagal nerve/brainstem')}
          ${checkDanger('Severe Truncal Ataxia', 'Cannot sit on bed edge with arms crossed — cerebellar stroke until proven otherwise', 'danger-item')}
          ${check('Unable to Walk Unaided', 'Not just unsteady — actually cannot stand/walk. "If the patient can&rsquo;t stand, they can&rsquo;t leave."')}
          ${check('New Significant Neck Pain', 'Concern for vertebral artery dissection — up to 25% are painless')}
          ${check('Spontaneous Vertical Nystagmus at Rest', 'Central sign — not produced by a peripheral vestibulopathy')}
        </div>
        <div class="vt-card__actions">
          <button type="button" class="vt-btn vt-btn--danger vt-btn--pulse vt-btn--full" data-vt="danger-cta">⚠️ Central Features Present — Proceed to Stroke Workup</button>
        </div>
      </div>
    </div></main>
    ${toolbar([])}
  `;
  return el;
}

// ---------------------------------------------------------------------------
// Screen 2 — Timing & Triggers: GRACE-3 classification
// ---------------------------------------------------------------------------

export function renderVTTiming(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'vt-screen';
  el.innerHTML = `
    ${STATUSBAR}
    ${DISCLAIMER}
    ${pillsHeader(['completed', 'current', 'future', 'future', 'future', 'future', 'future'])}
    <main class="vt-main"><div class="vt-col">
      <div class="vt-card">
        <h2 class="vt-card__title">Classify by Timing &amp; Triggers (GRACE-3)</h2>
        <div class="vt-card__body">
          <p>Per GRACE-3, classify by <strong>timing</strong> (continuous vs. episodic) and <strong>triggers</strong> (spontaneous vs. positional) — not by the quality of the dizziness. Pick the pattern that fits:</p>
          <div class="vt-bullet"><span class="vt-bullet__dot">•</span><span><strong>AVS = Acute Vestibular Syndrome</strong> — continuous, &gt; 24 h, present at rest</span></div>
          <div class="vt-bullet"><span class="vt-bullet__dot">•</span><span><strong>s-EVS = Spontaneous Episodic Vestibular Syndrome</strong> — episodes, no trigger, fine between attacks</span></div>
          <div class="vt-bullet"><span class="vt-bullet__dot">•</span><span><strong>t-EVS = Triggered Episodic Vestibular Syndrome</strong> — brief episodes, provoked by position change</span></div>
        </div>
        <details class="vt-sources" data-vt="sources">
          <summary class="vt-sources__summary"><span class="vt-sources__label">📚 Sources</span><span class="vt-sources__count">(1)</span><span class="vt-sources__caret">▸</span></summary>
        </details>
        <div class="vt-card__actions">
          <button type="button" class="vt-btn vt-btn--neutral vt-btn--full vt-btn--stack" data-vt="avs-option">
            <span class="vt-btn__t">AVS — Acute Vestibular Syndrome</span>
            <span class="vt-btn__d">Continuous dizziness lasting &gt; 24 hours, present even at rest. Top differential: posterior-circulation stroke vs. acute unilateral vestibulopathy. Go to HINTS.</span>
          </button>
          <button type="button" class="vt-btn vt-btn--neutral vt-btn--full vt-btn--stack">
            <span class="vt-btn__t">s-EVS — Spontaneous Episodic Vestibular Syndrome</span>
            <span class="vt-btn__d">Discrete episodes (minutes to hours) with no clear trigger. Top differential: posterior-circulation TIA, cardiac dysrhythmia, PE; less serious: vestibular migraine, Ménière&rsquo;s.</span>
          </button>
          <button type="button" class="vt-btn vt-btn--neutral vt-btn--full vt-btn--stack">
            <span class="vt-btn__t">t-EVS — Triggered (Positional) Episodic Vestibular Syndrome</span>
            <span class="vt-btn__d">Very brief episodes (seconds to minutes) triggered by position change. Top differential: BPPV (most common) vs. orthostatic hypotension vs. central positional vertigo.</span>
          </button>
          <button type="button" class="vt-btn vt-btn--neutral vt-btn--full vt-btn--back">← Back</button>
        </div>
      </div>
    </div></main>
    ${toolbar([])}
  `;
  return el;
}

// ---------------------------------------------------------------------------
// Screen 3 — HINTS+ Calculator (peripheral result + auto-dictation)
// ---------------------------------------------------------------------------

function seclabel(text: string): string {
  return `<p class="vt-seclabel">${text}</p>`;
}

function pick(text: string, selected = false, anchor = ''): string {
  return (
    `<button type="button" aria-pressed="${selected}" class="vt-btn vt-btn--pick ${selected ? 'vt-btn--primary' : 'vt-btn--neutral'}"` +
    `${anchor ? ` data-vt="${anchor}"` : ''}>${text}</button>`
  );
}

export function renderVTHints(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'vt-screen';
  el.innerHTML = `
    ${STATUSBAR}
    ${DISCLAIMER}
    ${pillsHeader(['completed', 'completed', 'future', 'current', 'future', 'future', 'future'])}
    <main class="vt-main"><div class="vt-col">
      <div class="vt-card">
        <h2 class="vt-card__title">HINTS+ Calculator</h2>
        <p class="vt-card__sub">Four-finding HINTS-plus interpretation for patients with <strong>constant vertigo and spontaneous nystagmus</strong>. <strong>Any one</strong> central finding → stroke workup immediately. If HINTS is peripheral, the bedside hearing exam (the &ldquo;+&rdquo;) rules out AICA territory infarct.</p>

        ${seclabel('Nystagmus')}
        <div class="vt-pickgrid">
          ${pick('Horizontal, unilateral (direction-fixed) — peripheral', true)}
          ${pick('Vertical or torsional — central')}
          ${pick('Direction-changing (bidirectional) — central')}
        </div>

        ${seclabel('Test of Skew (alternate cover)')}
        <div class="vt-pickgrid">
          ${pick('Negative — no vertical / diagonal correction', true)}
          ${pick('Positive — vertical or diagonal correction — central')}
        </div>

        ${seclabel('Head Impulse Test')}
        <div class="vt-pickgrid">
          ${pick('Catch-up saccade when head turned toward affected ear (opposite the fast phase) — peripheral', true)}
          ${pick('No catch-up saccade — eyes stay fixed — central')}
        </div>

        ${seclabel('Bedside Hearing Exam (the &ldquo;+&rdquo; in HINTS-plus)')}
        <p class="vt-hint" data-vt="hearing">Use finger rub or whispered voice. Use Weber/Rinne with a tuning fork if available.</p>
        <div class="vt-pickgrid">
          ${pick('Not assessed')}
          ${pick('Normal bilateral hearing', true)}
          ${pick('Unilateral hearing loss')}
        </div>

        <div class="vt-result vt-result--safe" data-vt="hints-result">
          <strong>Vestibular Neuritis (peripheral).</strong> All three HINTS findings are peripheral and bedside hearing is normal bilaterally. <strong>No MRI needed.</strong> Treat symptoms, consider vestibular rehab, and arrange follow-up.
        </div>

        <div class="vt-dictation" data-vt="dictation">
          ${seclabel('Dictate in patient&rsquo;s chart')}
          <pre class="vt-dictation__pre">HINTS exam: horizontal unidirectional nystagmus, negative test of skew, abnormal head impulse test (catch-up saccade toward affected ear). Bedside hearing: normal bilateral. Peripheral — consistent with vestibular neuritis. No MRI indicated.</pre>
        </div>

        <div class="vt-card__actions vt-card__actions--row">
          <button type="button" class="vt-btn vt-btn--neutral vt-btn--flex">Reset</button>
          <button type="button" class="vt-btn vt-btn--neutral vt-btn--flex">← Back</button>
        </div>
      </div>
    </div></main>
    ${toolbar(HINTS_TOOLS)}
  `;
  return el;
}

// ---------------------------------------------------------------------------
// Screen 4 — Epley Maneuver (numbered gradient timeline + video row)
// ---------------------------------------------------------------------------

function step(n: number, text: string, chip = '', last = false): string {
  return (
    `<div class="vt-step"><div class="vt-step__rail"><div class="vt-step__num">${n}</div>${last ? '' : '<div class="vt-step__line"></div>'}</div>` +
    `<div class="vt-step__body"><p class="vt-step__text">${text}</p>${chip ? `<span class="vt-step__chip">⏱ ${chip}</span>` : ''}</div></div>`
  );
}

export function renderVTEpley(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'vt-screen';
  el.innerHTML = `
    ${STATUSBAR}
    ${DISCLAIMER}
    ${pillsHeader(['completed', 'completed', 'current', 'future', 'future', 'future', 'future'])}
    <main class="vt-main"><div class="vt-col">
      <div class="vt-card">
        <h2 class="vt-card__title">Epley Maneuver</h2>
        <div class="vt-card__body"><p>Canalith repositioning procedure for posterior canal BPPV. Hold each position for 1 minute (or until nystagmus resolves + 30 seconds).</p></div>

        <a class="vt-video" href="#" data-vt="video" onclick="return false">
          <span class="vt-video__row"><span>🎬</span><span class="vt-video__title">Watch: Epley Maneuver</span><span class="vt-video__ext">↗</span></span>
          <span class="vt-video__sub">Recommended clip: 9:26–10:25 · opens YouTube</span>
        </a>

        <div class="vt-steps" data-vt="epley-steps">
          ${step(1, 'Start with the positive Dix-Hallpike position (head turned 45° to affected side, lying back with head hanging).', 'Hold 1 minute')}
          ${step(2, 'Rotate the head 90° to the opposite side (maintaining neck extension). The head is now turned 45° toward the unaffected ear.', 'Hold 1 minute')}
          ${step(3, 'Have the patient roll onto their side (toward the unaffected ear), rotating the head another 90°. The nose should end up pointed ~45° toward the floor — NOT straight down.', 'Hold 1 minute')}
          ${step(4, 'Slowly bring the patient to a seated position. Keep the head tilted looking down the whole way up. Have them sit for at least 10 minutes.', 'Sit 10+ minutes')}
          ${step(5, 'Repeat the Dix-Hallpike test for the affected side. If negative — patient is cured.', '', true)}
        </div>

        <div class="vt-card__actions vt-card__actions--row">
          <button type="button" class="vt-btn vt-btn--neutral vt-btn--flex">← Back</button>
          <button type="button" class="vt-btn vt-btn--primary vt-btn--flex">Continue →</button>
        </div>
      </div>
    </div></main>
    ${toolbar(BPPV_TOOLS, 'toolbar')}
  `;
  return el;
}

// ---------------------------------------------------------------------------
// Screen 5 — Result card, danger state: stroke workup
// ---------------------------------------------------------------------------

export function renderVTStroke(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'vt-screen';
  el.innerHTML = `
    ${STATUSBAR}
    ${DISCLAIMER}
    ${pillsHeader(['danger', 'completed', 'future', 'future', 'future', 'current', 'future'])}
    <main class="vt-main"><div class="vt-col">
      <div class="vt-card vt-card--stroke" data-vt="stroke-card">
        <div class="vt-card__bigicon">⚠️</div>
        <h2 class="vt-card__title vt-card__title--onred">Concern for CVA — Proceed to Stroke Workup</h2>
        <div class="vt-card__body vt-card__body--onred">
          <p>At least one central finding. Order <strong>MRI with DWI</strong>, obtain a neurology consult, and admit.</p>
          <p>Posterior fossa stroke can be missed early — repeat MRI at 72h if initial scan is negative and clinical suspicion remains.</p>
        </div>
        <div class="vt-card__actions">
          <button type="button" class="vt-btn vt-btn--ghost vt-btn--full">→ Proceed to Disposition</button>
          <button type="button" class="vt-btn vt-btn--ghost-dim vt-btn--full">← Back</button>
        </div>
      </div>
    </div></main>
    ${toolbar([])}
  `;
  return el;
}

// ---------------------------------------------------------------------------
// Screen 6 — Disposition Builder (discharge plan + QR share)
// ---------------------------------------------------------------------------

export function renderVTDispo(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'vt-screen';
  el.innerHTML = `
    ${STATUSBAR}
    ${DISCLAIMER}
    ${pillsHeader(['completed', 'completed', 'future', 'completed', 'completed', 'future', 'current'])}
    <main class="vt-main"><div class="vt-col">
      <div class="vt-card">
        <h2 class="vt-card__title">Disposition Builder</h2>
        <p class="vt-card__sub">Toggle what applies — the discharge summary assembles itself.</p>

        <h3 class="vt-dispo-h">Diagnosis</h3>
        <div class="vt-checklist">
          ${checkDone('Vestibular Neuritis', 'Peripheral — HINTS+ peripheral with normal bilateral hearing', true)}
          ${check('BPPV — Posterior Canal', 'Positive Dix-Hallpike with upbeat-torsional nystagmus')}
        </div>

        <h3 class="vt-dispo-h">Medications</h3>
        <div class="vt-checklist" data-vt="dispo-meds">
          ${checkDone('Meclizine 25mg PO q8h PRN', 'Adult vestibular suppressant')}
          <div class="vt-info-panel">
            <p class="vt-microhead">Clinician Safety</p>
            <p class="vt-info-panel__text">Use shortest practical course, usually ≤72 hours, to avoid delaying vestibular compensation.</p>
          </div>
          ${checkDone('Ondansetron 4mg ODT q6h PRN', 'Adult antiemetic for nausea/vomiting')}
          <div class="vt-info-panel">
            <p class="vt-microhead">Clinician Safety</p>
            <p class="vt-info-panel__text">Screen for QT risk and severe hepatic impairment.</p>
          </div>
        </div>

        <h3 class="vt-dispo-h">Therapy Plan</h3>
        <div class="vt-checklist">
          ${checkDone('Vestibular rehab', 'Consider vestibular rehab and arrange follow-up')}
        </div>

        <h3 class="vt-dispo-h">Return Precautions</h3>
        <div class="vt-return-panel">
          <p class="vt-microhead vt-microhead--danger">Patient Education</p>
          <p class="vt-return-panel__text">Return immediately for: new weakness or numbness, double vision, trouble speaking or swallowing, new severe headache or neck pain, or inability to stand or walk.</p>
        </div>

        <div class="vt-card__actions">
          <button type="button" class="vt-btn vt-btn--primary vt-btn--full" data-vt="dispo-qr">📋 Build Discharge Summary</button>
          <p class="vt-qr-note">Printable plan + QR code — scans to a shareable link on the patient&rsquo;s phone.</p>
        </div>
      </div>
    </div></main>
    ${toolbar([])}
  `;
  return el;
}
