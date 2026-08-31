// brand-audit-exempt: pixel-faithful clone of the real app's UI shown inside
// the tour phone frame. Colors/typography here are the app's own, not landing chrome.
// AcidBase — pixel-faithful clone for the UI tour.
// Faithful to ~/Desktop/AcidBase-App (Next.js 16, Tailwind v4, Geist, lucide-react).
// Design system: Clinical Teal #0E7490 + glassmorphism over a teal/violet aurora,
// subtle 3D buttons, clinical signal colors. Icons are inline lucide-style SVG
// (24x24 viewBox, currentColor, stroke). Static markup only — the engine owns
// all interaction. Every hotspot anchor carries a data-ab="key" attribute.

/* ── Inline lucide-style icons (stroke, currentColor) ───────────────────── */
const icon = {
  beaker: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 3h15"/><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"/><path d="M6 14h12"/></svg>`,
  bookOpen: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>`,
  arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  rotateCcw: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`,
  activity: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
  flask: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.31"/><path d="M14 9.3V1.99"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><path d="M5.52 16h12.96"/></svg>`,
  stethoscope: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 2v2"/><path d="M5 2v2"/><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/></svg>`,
  chevronDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  pill: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>`,
  alert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`,
  sigma: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M18 7V4H6l6 8-6 8h12v-3"/></svg>`,
  divide: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="6" r="1"/><line x1="5" x2="19" y1="12" y2="12"/><circle cx="12" cy="18" r="1"/></svg>`,
  gauge: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>`,
  droplets: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 4.8 7 3c-.29 1.8-1.14 3.13-2.29 4.06S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05Z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>`,
  testTube: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5V2"/><path d="M8.5 2h7"/><path d="M14.5 16h-5"/></svg>`,
  syringe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 2 4 4"/><path d="m17 7 3-3"/><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"/><path d="m9 11 4 4"/><path d="m5 19-3 3"/><path d="m14 4 6 6"/></svg>`,
  skull: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M8 20v2h8v-2"/><path d="m12.5 17-.5-1-.5 1h1z"/><path d="M16 20a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20"/></svg>`,
  brain: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
};

/* ── Shared chrome ──────────────────────────────────────────────────────── */

const HEADER = (formulasAttr = '') => `
  <header class="ab-header">
    <div class="ab-header__brand" data-ab="logo">
      <span class="ab-logo">${icon.beaker}</span>
      <div class="ab-header__titles">
        <p class="ab-header__name">AcidBase</p>
        <p class="ab-header__sub">ABG &amp; metabolic analyzer</p>
      </div>
    </div>
    <button class="ab-formulas-btn"${formulasAttr}>${icon.bookOpen}<span>Formulas</span></button>
  </header>
`;

const DOCK_TOOLS: Array<[string, string, keyof typeof icon]> = [
  ['formulas', 'Formulas', 'bookOpen'],
  ['anion-gap', 'Anion Gap', 'sigma'],
  ['delta-ratio', 'Δ-Ratio', 'divide'],
  ['compensation', 'Compensate', 'gauge'],
  ['osmolar-gap', 'Osm Gap', 'droplets'],
  ['na-correction', 'Na⁺ Corr', 'testTube'],
  ['bicarb-deficit', 'HCO₃⁻ Def', 'syringe'],
  ['toxic-alcohols', 'Tox Alc', 'skull'],
  ['salicylate', 'Salicylate', 'pill'],
  ['mnemonics', 'Mnemonics', 'brain'],
];

const DOCK = (activeId = '') => `
  <nav class="ab-dock" aria-label="Bedside tools" data-ab="dock">
    <div class="ab-dock__row">
      ${DOCK_TOOLS.map(
        ([id, label, ic]) => `
        <button class="ab-dock__item${id === activeId ? ' ab-dock__item--active' : ''}"${
          id === 'anion-gap' ? ' data-ab="dock-anion-gap"' : ''
        }>
          <span class="ab-dock__icon">${icon[ic]}</span>
          <span class="ab-dock__label">${label}</span>
        </button>`,
      ).join('')}
    </div>
  </nav>
`;

/* Field-group section header (teal uppercase label + rule) */
const groupHead = (label: string) => `
  <div class="ab-group__head">
    <span class="ab-group__label">${label}</span>
    <span class="ab-group__rule"></span>
  </div>
`;

/* Single lab field */
const labField = (
  name: string,
  unit: string,
  value: string,
  placeholder: string,
  abnormal = false,
  hint = '',
) => `
  <div class="ab-field">
    <label class="ab-field__label">
      <span class="ab-field__name">${name}</span>
      ${unit ? `<span class="ab-field__unit">${unit}</span>` : ''}
    </label>
    <input class="ab-input${abnormal ? ' ab-input--abnormal' : ''}" type="text" inputmode="decimal"
           value="${value}" placeholder="${placeholder}" readonly />
    ${hint ? `<p class="ab-field__hint">${hint}</p>` : ''}
  </div>
`;

/* Dimmed backdrop rendered behind bottom-sheet modals (the home form, scrim-covered) */
const SHEET_BACKDROP = `
  <div class="ab-chips">
    <button class="ab-chip ab-chip--active"><span class="ab-chip__label">DKA</span><span class="ab-chip__sub">High-gap acidosis</span></button>
    <button class="ab-chip"><span class="ab-chip__label">Diarrhea</span><span class="ab-chip__sub">Normal-gap acidosis</span></button>
    <button class="ab-chip"><span class="ab-chip__label">Vomiting</span><span class="ab-chip__sub">Metabolic alkalosis</span></button>
  </div>
  <div class="ab-card ab-form">
    <div class="ab-group">
      <div class="ab-group__head"><span class="ab-group__label">Blood gas</span><span class="ab-group__rule"></span></div>
      <div class="ab-grid3">
        ${labField('pH', '', '7.18', '7.40', true)}
        ${labField('PaCO₂', 'mmHg', '24', '40', true)}
        ${labField('HCO₃⁻', 'mEq/L', '10', '24', true)}
      </div>
    </div>
  </div>
`;

/* ── SCREEN A — Home: header + example chips + input form ────────────────── */
export function renderABHome(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'ab-screen';
  const examples: Array<[string, string]> = [
    ['DKA', 'High-gap acidosis'],
    ['Diarrhea', 'Normal-gap acidosis'],
    ['Vomiting', 'Metabolic alkalosis'],
    ['COPD', 'Chronic resp. acidosis'],
    ['Salicylate', 'Mixed disorder'],
    ['Toxic alcohol', 'Gap + osmolar gap'],
  ];
  el.innerHTML = `
    ${HEADER()}
    <main class="ab-main">
      <div class="ab-chips" data-ab="examples">
        ${examples
          .map(
            ([label, sub], i) => `
          <button class="ab-chip${i === 0 ? ' ab-chip--active' : ''}">
            <span class="ab-chip__label">${label}</span>
            <span class="ab-chip__sub">${sub}</span>
          </button>`,
          )
          .join('')}
      </div>

      <div class="ab-card ab-form" data-ab="input-form">
        <div class="ab-group">
          ${groupHead('Blood gas')}
          <div class="ab-grid3">
            ${labField('pH', '', '7.18', '7.40', true)}
            ${labField('PaCO₂', 'mmHg', '24', '40', true)}
            ${labField('HCO₃⁻', 'mEq/L', '10', '24', true)}
          </div>
        </div>

        <div class="ab-group">
          ${groupHead('Chemistry (for anion gap)')}
          <div class="ab-grid3">
            ${labField('Na⁺', 'mEq/L', '135', '140')}
            ${labField('Cl⁻', 'mEq/L', '95', '104')}
            ${labField('K⁺', 'mEq/L', '5.2', '4.0', true)}
            ${labField('Albumin', 'g/dL', '', '4.0', false, 'Corrects the anion gap')}
            ${labField('Lactate', 'mmol/L', '2.1', '1.0', true)}
          </div>
        </div>

        <div class="ab-group">
          ${groupHead('Optional (osmolar gap &amp; context)')}
          <div class="ab-grid3">
            ${labField('Glucose', 'mg/dL', '520', '90', true)}
            ${labField('BUN', 'mg/dL', '28', '14')}
            ${labField('Meas. osm', 'mOsm/kg', '', '290')}
            ${labField('Ethanol', 'mg/dL', '', '0', false, 'Included in osmolar-gap calc')}
          </div>
        </div>

        <div class="ab-toggle-block">
          <div class="ab-toggle-block__label">If respiratory — timeframe</div>
          <div class="ab-toggle">
            <button class="ab-toggle__btn ab-toggle__btn--active">unknown</button>
            <button class="ab-toggle__btn">acute</button>
            <button class="ab-toggle__btn">chronic</button>
          </div>
        </div>

        <button class="ab-btn ab-btn--neutral ab-form__clear">${icon.rotateCcw}<span>Clear all</span></button>
      </div>
    </main>
    ${DOCK()}
  `;
  return el;
}

/* ── SCREEN B — Diagnosis headline card ──────────────────────────────────── */
export function renderABDiagnosis(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'ab-screen';
  el.innerHTML = `
    ${HEADER()}
    <main class="ab-main">
      <div class="ab-card ab-dx" data-ab="diagnosis">
        <div class="ab-dx__bar"></div>
        <div class="ab-dx__body">
          <div class="ab-dx__pills" data-ab="pills">
            <span class="ab-pill ab-pill--caution">Acidemia</span>
            <span class="ab-pill ab-pill--muted">Primary metabolic</span>
          </div>
          <h2 class="ab-dx__headline">High anion-gap metabolic acidosis</h2>
          <ul class="ab-dx__list">
            <li><span class="ab-dx__dot">•</span>High anion-gap metabolic acidosis</li>
            <li><span class="ab-dx__dot">•</span>Appropriate respiratory compensation</li>
          </ul>
        </div>
      </div>
    </main>
    ${DOCK()}
  `;
  return el;
}

/* ── SCREEN C — Why this conclusion + Calculated values ──────────────────── */
export function renderABWhy(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'ab-screen';
  const tile = (
    name: string,
    value: string,
    unit: string,
    note: string,
    tone: 'normal' | 'abnormal' | 'danger' = 'normal',
  ) => `
    <div class="ab-tile ab-tile--${tone}">
      <div class="ab-tile__row">
        <span class="ab-tile__name">${name}</span>
        <span class="ab-tile__value">${value}${unit ? `<span class="ab-tile__unit"> ${unit}</span>` : ''}</span>
      </div>
      <p class="ab-tile__note">${note}</p>
    </div>
  `;
  el.innerHTML = `
    ${HEADER()}
    <main class="ab-main">
      <div class="ab-card ab-section" data-ab="why">
        <div class="ab-section__head">
          <span class="ab-section__icon">${icon.activity}</span>
          <h3 class="ab-section__title">Why this conclusion</h3>
        </div>
        <ol class="ab-why">
          <li>pH 7.18 indicates <b>acidemia</b>; the primary process is <b>high anion-gap metabolic acidosis</b>.</li>
          <li>Albumin-corrected anion gap is <b>30 mEq/L</b> (normal 8–12) → an unmeasured acid is present.</li>
          <li>PaCO₂ (24) falls within Winter's prediction (<b>21–25</b>) → appropriate respiratory compensation, not a second disorder.</li>
          <li>Delta ratio ~<b>1.3</b> → a pure high-gap acidosis without a hidden NAGMA or alkalosis.</li>
        </ol>
      </div>

      <div class="ab-card ab-section" data-ab="calc-grid">
        <div class="ab-section__head">
          <span class="ab-section__icon">${icon.flask}</span>
          <h3 class="ab-section__title">Calculated values</h3>
        </div>
        <div class="ab-tiles">
          ${tile('Anion gap', '30', 'mEq/L', 'Na⁺ − (Cl⁻ + HCO₃⁻); normal 8–12', 'abnormal')}
          ${tile("Winter's expected PaCO₂", '21–25', 'mmHg', '1.5 × HCO₃⁻ + 8 ± 2 — measured 24 fits', 'normal')}
          ${tile('Delta ratio (Δ/Δ)', '1.3', '', '(AG − 12) / (24 − HCO₃⁻) — pure HAGMA', 'normal')}
          ${tile('Potassium', '5.2', 'mEq/L', 'Total-body K⁺ depleted despite the number', 'abnormal')}
        </div>
      </div>
    </main>
    ${DOCK()}
  `;
  return el;
}

/* ── SCREEN D — Differential bucket (expanded, treatment-rich) ───────────── */
export function renderABDifferential(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'ab-screen';
  el.innerHTML = `
    ${HEADER()}
    <main class="ab-main">
      <div class="ab-card ab-bucket" data-ab="bucket">
        <button class="ab-bucket__head" aria-expanded="true">
          <span class="ab-bucket__head-left">
            <span class="ab-section__icon">${icon.stethoscope}</span>
            <span class="ab-bucket__title">Differential — High anion-gap metabolic acidosis</span>
          </span>
          <span class="ab-bucket__chev ab-bucket__chev--open">${icon.chevronDown}</span>
        </button>

        <div class="ab-bucket__body">
          <div class="ab-mnemonic">
            <p class="ab-mnemonic__mech">An unmeasured acid is added to the blood: its H⁺ consumes HCO₃⁻ while its conjugate base accumulates, widening the gap.</p>
            <p class="ab-mnemonic__key"><b>GOLD MARK</b> (Mehta/Emmett, Lancet 2008): Glycols, Oxoproline, L-lactate, D-lactate, Methanol, Aspirin, Renal failure, Ketoacidosis.</p>
          </div>

          <div class="ab-narrow">
            <div class="ab-narrow__head">${icon.search}<span>How to narrow it down</span></div>
            <ul class="ab-narrow__list">
              <li><span class="ab-arrow">→</span>β-hydroxybutyrate + glucose (catches euglycemic DKA on SGLT2i)</li>
              <li><span class="ab-arrow">→</span>Serum lactate (venous acceptable; &gt;2 elevated, &gt;4 severe)</li>
              <li><span class="ab-arrow">→</span>Osmolar gap &gt;10 → toxic alcohol (methanol, ethylene glycol)</li>
            </ul>
          </div>

          <div class="ab-causes">
            <div class="ab-cause" data-ab="treat">
              <div class="ab-cause__head">
                <span class="ab-cause__name">Ketoacidosis — DKA / AKA / starvation</span>
                <span class="ab-pill ab-pill--danger">Can't miss</span>
              </div>
              <p class="ab-cause__line"><span class="ab-cause__lbl">Clues: </span>Glucose usually &gt;250 (euglycemic on SGLT2i), Kussmaul breathing, fruity breath, abdominal pain.</p>
              <p class="ab-cause__line"><span class="ab-cause__lbl">Confirm: </span>Serum β-hydroxybutyrate (preferred), venous pH, BMP; compute AG and delta-delta.</p>
              <div class="ab-treat">
                <span class="ab-treat__icon">${icon.pill}</span>
                <p class="ab-treat__text"><span class="ab-treat__lbl">Treat: </span>Isotonic fluids 15–20 mL/kg/hr, regular insulin 0.1 U/kg/hr — do NOT start insulin until K⁺ ≥3.3; add K⁺ once &lt;5.2 and urinating; add D5 when glucose ~200. Bicarbonate only if pH &lt;6.9.</p>
              </div>
            </div>

            <div class="ab-cause">
              <div class="ab-cause__head">
                <span class="ab-cause__name">L-Lactic acidosis (Type A / Type B)</span>
                <span class="ab-pill ab-pill--danger">Can't miss</span>
              </div>
              <p class="ab-cause__line"><span class="ab-cause__lbl">Clues: </span>Shock, sepsis, mesenteric ischemia; lactate &gt;4 predicts mortality. Type B: metformin, linezolid, propofol.</p>
              <div class="ab-treat">
                <span class="ab-treat__icon">${icon.pill}</span>
                <p class="ab-treat__text"><span class="ab-treat__lbl">Treat: </span>Restore perfusion — IV crystalloid, source control, norepinephrine to MAP ≥65 per Surviving Sepsis; antibiotics within 1 hr. Thiamine 100–500 mg IV if malnourished. Bicarbonate NOT routine — reserve for pH &lt;7.1.</p>
              </div>
            </div>

            <div class="ab-cause">
              <div class="ab-cause__head">
                <span class="ab-cause__name">Methanol (toxic alcohol)</span>
                <span class="ab-pill ab-pill--danger">Can't miss</span>
              </div>
              <div class="ab-treat">
                <span class="ab-treat__icon">${icon.pill}</span>
                <p class="ab-treat__text"><span class="ab-treat__lbl">Treat: </span>FOMEPIZOLE 15 mg/kg IV load, then 10 mg/kg q12h ×4 doses. HEMODIALYSIS for methanol &gt;50 mg/dL. Adjunct folinic acid 50 mg IV q4–6h.</p>
              </div>
            </div>
          </div>

          <p class="ab-bucket__cite">Mehta, Emmett — GOLD MARK, Lancet 2008 · UpToDate · ADA consensus</p>
        </div>
      </div>
    </main>
    ${DOCK()}
  `;
  return el;
}

/* ── SCREEN E — Bottom dock + Anion Gap calculator sheet ─────────────────── */
export function renderABCalculator(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'ab-screen ab-screen--sheet';
  const calcField = (name: string, unit: string, value: string, placeholder: string) => `
    <div class="ab-field">
      <label class="ab-field__label">
        <span class="ab-field__name">${name}</span>
        <span class="ab-field__unit">${unit}</span>
      </label>
      <input class="ab-input ab-input--sm" type="text" inputmode="decimal" value="${value}" placeholder="${placeholder}" readonly />
    </div>
  `;
  el.innerHTML = `
    ${HEADER()}
    <main class="ab-main ab-main--dim">${SHEET_BACKDROP}</main>
    ${DOCK('anion-gap')}

    <div class="ab-scrim"></div>
    <div class="ab-sheet" role="dialog" aria-modal="true">
      <div class="ab-sheet__grabber"><span></span></div>
      <div class="ab-sheet__head">
        <div class="ab-sheet__head-left">
          <span class="ab-logo ab-logo--sheet">${icon.sigma}</span>
          <div>
            <h2 class="ab-sheet__title">Anion Gap</h2>
            <p class="ab-sheet__sub">AG + albumin correction</p>
          </div>
        </div>
        <button class="ab-sheet__close">${icon.x}</button>
      </div>
      <div class="ab-sheet__body">
        <div class="ab-grid3">
          ${calcField('Na⁺', 'mEq/L', '135', '140')}
          ${calcField('Cl⁻', 'mEq/L', '95', '104')}
          ${calcField('HCO₃⁻', 'mEq/L', '10', '24')}
        </div>
        <div class="ab-grid3">
          ${calcField('Albumin', 'g/dL', '4.0', '4.0')}
        </div>
        <div class="ab-result ab-result--caution" data-ab="calc-result">
          <div class="ab-result__row">
            <span class="ab-result__name">Anion gap</span>
            <span class="ab-result__value">30<span class="ab-result__unit"> mEq/L</span></span>
          </div>
          <p class="ab-result__note">Na⁺ − (Cl⁻ + HCO₃⁻); normal 8–12</p>
        </div>
        <div class="ab-result ab-result--neutral">
          <div class="ab-result__row">
            <span class="ab-result__name">Albumin-corrected AG</span>
            <span class="ab-result__value">30<span class="ab-result__unit"> mEq/L</span></span>
          </div>
          <p class="ab-result__note">AG + 2.5 × (4.0 − albumin) — no correction at 4.0</p>
        </div>
      </div>
    </div>
  `;
  return el;
}

/* ── SCREEN F — Formulas & reference sheet (power feature) ───────────────── */
export function renderABReference(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'ab-screen ab-screen--sheet';
  const formulas: Array<[string, string]> = [
    ['Anion gap', 'Na⁺ − (Cl⁻ + HCO₃⁻); normal 8–12 mEq/L'],
    ['Albumin-corrected AG', 'AG + 2.5 × (4.0 − albumin g/dL)'],
    ["Winter's formula", 'Expected PaCO₂ = 1.5 × HCO₃⁻ + 8 ± 2'],
    ['Metabolic alkalosis', 'Expected PaCO₂ = 0.7 × HCO₃⁻ + 21 ± 5'],
    ['Delta ratio', '(AG − 12) / (24 − HCO₃⁻)'],
    ['Osmolar gap', 'Measured − calculated; normal < 10 mOsm/kg'],
    ['Henderson check', '[H⁺] = 24 × PaCO₂ / HCO₃⁻'],
  ];
  const steps = [
    'Verify the sample — arterial, and [H⁺] = 24 × PaCO₂ / HCO₃⁻ matches the pH.',
    'Acidemia or alkalemia — read the pH (a normal pH does not exclude a disorder).',
    'Identify the primary process driving the pH.',
    'Assess compensation — is it appropriate, or a second disorder?',
    'Calculate the albumin-corrected anion gap.',
    'Delta ratio / delta-delta if a HAGMA exists.',
    'Osmolar gap in any HAGMA or toxic presentation, then synthesize.',
  ];
  el.innerHTML = `
    ${HEADER()}
    <main class="ab-main ab-main--dim">${SHEET_BACKDROP}</main>
    ${DOCK('formulas')}

    <div class="ab-scrim"></div>
    <div class="ab-sheet ab-sheet--ref" role="dialog" aria-modal="true">
      <div class="ab-sheet__grabber"><span></span></div>
      <div class="ab-sheet__head">
        <h2 class="ab-sheet__title ab-sheet__title--lg">Formulas &amp; reference</h2>
        <button class="ab-sheet__close">${icon.x}</button>
      </div>
      <div class="ab-sheet__body">
        <div class="ab-refblock" data-ab="formulas">
          <h3 class="ab-refblock__head">Formulas</h3>
          ${formulas
            .map(
              ([name, value]) => `
            <div class="ab-formula">
              <span class="ab-formula__name">${name}</span>
              <span class="ab-formula__value">${value}</span>
            </div>`,
            )
            .join('')}
        </div>

        <div class="ab-refblock" data-ab="stepwise">
          <h3 class="ab-refblock__head">Stepwise approach</h3>
          <ol class="ab-steps">
            ${steps.map((s) => `<li>${s}</li>`).join('')}
          </ol>
        </div>

        <div class="ab-refblock">
          <h3 class="ab-refblock__head">Sources</h3>
          <p class="ab-sources">Marino ICU Book 4e · Rose &amp; Post 5e · UpToDate · Tintinalli 9e · LITFL · Deranged Physiology</p>
        </div>
      </div>
    </div>
  `;
  return el;
}

