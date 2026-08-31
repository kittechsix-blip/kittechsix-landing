// brand-audit-exempt: pixel-faithful clone of the real app's UI shown inside
// the tour phone frame. Colors/typography here are the app's own, not landing chrome.
// Antibiotic Rx — pixel-faithful clone (Next.js 16 PWA, mocked in static HTML).
// Faithful to ~/Desktop/Antibiotic-Rx/src/app/globals.css tokens + real clinical content.
// Clinical Indigo #4338CA (empiric/primary), Emerald #047857 (culture-directed),
// Copper #B45309 (antibiogram/resistance/renal). All icons are inline lucide SVG.

/* ---------- inline lucide icons (24x24 viewBox, currentColor stroke) ---------- */

const icoPill = `<svg class="rx-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>`;

const icoBook = `<svg class="rx-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`;

const icoShield = `<svg class="rx-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>`;

const icoSearch = `<svg class="rx-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`;

const icoChevRight = `<svg class="rx-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`;

const icoChevLeft = `<svg class="rx-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>`;

const icoSliders = `<svg class="rx-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg>`;

const icoAlert = `<svg class="rx-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`;

const icoFlask = `<svg class="rx-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.31"/><path d="M14 9.3V1.99"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><path d="M5.58 16.5h12.85"/></svg>`;

const icoSyringe = `<svg class="rx-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 2 4 4"/><path d="m17 7 3-3"/><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"/><path d="m9 11 4 4"/><path d="m5 19-3 3"/><path d="m14 4 6 6"/></svg>`;

const icoMapPin = `<svg class="rx-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>`;

const icoCalc = `<svg class="rx-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>`;

const icoX = `<svg class="rx-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;

/* ---------- shared chrome ---------- */

const HEADER = `
  <header class="rx-header">
    <div class="rx-header__brand">
      <div class="rx-header__badge">${icoPill}</div>
      <div>
        <p class="rx-header__title">Antibiotic Rx</p>
        <p class="rx-header__tagline">Empiric &amp; culture-directed therapy</p>
      </div>
    </div>
    <button class="rx-header__ref" aria-label="Reference">${icoBook}</button>
  </header>
`;

const FAB = `
  <button class="rx-fab" data-rx="fab">${icoCalc}<span>Dose calc</span></button>
`;

/* ---------- SCREEN A — Disclaimer gate ---------- */

export function renderRxDisclaimer(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'rx-screen rx-screen--gate';
  el.innerHTML = `
    <div class="rx-gate-wrap">
      <div class="rx-glass-card rx-gate" data-rx="gate">
        <div class="rx-gate__head">
          <div class="rx-gate__badge">${icoShield}</div>
          <div>
            <p class="rx-gate__title">Antibiotic Rx</p>
            <p class="rx-gate__sub">Clinician decision-support tool</p>
          </div>
        </div>
        <div class="rx-gate__body">
          <p>This tool is a <strong>cognitive aid for licensed clinicians</strong>. It suggests
          evidence-based empiric and culture-directed antibiotic regimens based on the infection and
          the patient parameters you toggle (allergy, pregnancy, renal function, resistance risk,
          local antibiogram).</p>
          <p>Doses and regimens are educational and must be <strong>confirmed against the patient,
          current guidelines, local antibiogram, and your clinical judgment</strong>. No patient
          data is transmitted — everything runs on this device.</p>
        </div>
        <button class="rx-btn rx-btn--primary rx-gate__cta" data-rx="gate-cta">I am a clinician — I understand</button>
      </div>
    </div>
  `;
  return el;
}

/* ---------- SCREEN B — Infection picker ---------- */

function pickerRow(name: string, sub: string, attr = ''): string {
  return `
    <button class="rx-glass-card rx-inf-row"${attr}>
      <div class="rx-inf-row__main">
        <div class="rx-inf-row__name">${name}</div>
        <div class="rx-inf-row__sub">${sub}</div>
      </div>
      ${icoChevRight}
    </button>
  `;
}

export function renderRxPicker(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'rx-screen';
  el.innerHTML = `
    ${HEADER}
    <div class="rx-body">
      <p class="rx-intro">
        Pick an infection, then toggle patient parameters — allergy, pregnancy, renal function,
        resistance risk, and local antibiogram — to get evidence-based empiric and culture-directed regimens.
      </p>

      <div class="rx-search" data-rx="search">
        ${icoSearch}
        <input class="rx-lab-input rx-search__input" placeholder="Search infection, syndrome, or organism…" readonly />
      </div>

      <div class="rx-cat">
        <div class="rx-cat__label">Lower Respiratory · 9</div>
        <div class="rx-cat__rows">
          ${pickerRow('Community-Acquired Pneumonia (CAP)', 'Streptococcus pneumoniae, Haemophilus influenzae, Mycoplasma pneumoniae', ' data-rx="inf-cap"')}
          ${pickerRow('Hospital-Acquired &amp; Ventilator-Associated Pneumonia', 'Pseudomonas aeruginosa, MRSA, Enterobacterales')}
          ${pickerRow('Aspiration Pneumonia', 'Oral anaerobes, Streptococcus, gram-negatives')}
        </div>
      </div>

      <div class="rx-cat">
        <div class="rx-cat__label">Urinary Tract · 7</div>
        <div class="rx-cat__rows">
          ${pickerRow('Uncomplicated Cystitis (Acute Simple UTI)', 'Escherichia coli, Klebsiella, Proteus, S. saprophyticus')}
          ${pickerRow('Pyelonephritis (Complicated)', 'E. coli, Klebsiella, Enterococcus, Pseudomonas')}
        </div>
      </div>

      <div class="rx-cat">
        <div class="rx-cat__label">Skin &amp; Soft Tissue · 11</div>
        <div class="rx-cat__rows">
          ${pickerRow('Necrotizing Fasciitis / Necrotizing Soft Tissue Infection', 'Group A Strep, Clostridium, polymicrobial, S. aureus')}
          ${pickerRow('Non-Purulent Cellulitis', 'Beta-hemolytic streptococci, S. aureus')}
        </div>
      </div>

      <div class="rx-cat">
        <div class="rx-cat__label">Sepsis &amp; Bloodstream · 5</div>
        <div class="rx-cat__rows">
          ${pickerRow('Staphylococcus aureus Bacteremia (SAB)', 'MSSA, MRSA')}
        </div>
      </div>

      <div class="rx-cat">
        <div class="rx-cat__label">CNS Infections · 6</div>
        <div class="rx-cat__rows">
          ${pickerRow('Community-Acquired Bacterial Meningitis (Adult)', 'S. pneumoniae, N. meningitidis, L. monocytogenes')}
        </div>
      </div>
    </div>
    ${FAB}
  `;
  return el;
}

/* ---------- SCREEN C — Result view (empiric path) ---------- */

export function renderRxResult(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'rx-screen';
  el.innerHTML = `
    ${HEADER}
    <div class="rx-body">
      <div class="rx-result-head">
        <button class="rx-back">${icoChevLeft}<span>All infections</span></button>
        <h2 class="rx-result-head__title">Community-Acquired Pneumonia (CAP)</h2>
        <p class="rx-result-head__desc">
          Acute lower-airway infection acquired outside healthcare settings, presenting with cough,
          fever, dyspnea, and an infiltrate on imaging; severity and disposition are stratified by
          CURB-65/PSI and the IDSA/ATS 2019 severe-CAP criteria.
        </p>
      </div>

      <div class="rx-pathseg" data-rx="pathseg">
        <button class="rx-pathseg__tab rx-pathseg__tab--empiric-on">Empiric</button>
        <button class="rx-pathseg__tab">Culture-directed</button>
      </div>

      <button class="rx-glass-card rx-params-bar" data-rx="params-bar">
        <div class="rx-params-bar__left">
          <span class="rx-params-bar__icon">${icoSliders}</span>
          <div>
            <div class="rx-params-bar__title">Patient parameters</div>
            <div class="rx-params-bar__sub">Outpatient — tap to edit</div>
          </div>
        </div>
        <span class="rx-pill rx-pill--empiric">3</span>
      </button>

      <div class="rx-result-list">
        <div class="rx-glass-card rx-regimen rx-regimen--empiric" data-rx="regimen">
          <div class="rx-regimen__tagrow">
            <span class="rx-pill rx-pill--empiric">Empiric</span>
            <span class="rx-regimen__ctx">Outpatient, previously healthy adult, no comorbidities and no recent antibiotics</span>
          </div>
          <div class="rx-microlabel">First line</div>
          <div class="rx-regimen__drug">Amoxicillin 1 g PO TID</div>
          <div class="rx-microlabel">Alternatives</div>
          <div class="rx-regimen__alt">
            Doxycycline 100 mg PO BID; OR a macrolide (Azithromycin 500 mg PO x1 then 250 mg daily x4 days)
            ONLY where local pneumococcal macrolide resistance &lt;25%
          </div>
          <div class="rx-regimen__dur">
            <strong>Duration:</strong> 5 days (minimum; must be afebrile 48–72h and clinically stable before stopping)
          </div>
          <div class="rx-regimen__note">
            IDSA/ATS 2019 dropped macrolide monotherapy to a conditional recommendation because of &gt;30%
            US pneumococcal macrolide resistance. Amoxicillin and doxycycline are the preferred
            healthy-outpatient options.
          </div>
        </div>

        <details class="rx-glass-card rx-details">
          <summary class="rx-details__summary">Other settings (3) ▾</summary>
          <div class="rx-details__body">
            <div class="rx-subcard">
              <div class="rx-subcard__ctx">Inpatient, non-ICU (ward admission)</div>
              <div class="rx-microlabel">First line</div>
              <div class="rx-regimen__drug">Ceftriaxone 1–2 g IV q24h PLUS Azithromycin 500 mg IV/PO daily</div>
            </div>
            <div class="rx-subcard">
              <div class="rx-subcard__ctx">ICU / severe CAP</div>
              <div class="rx-microlabel">First line</div>
              <div class="rx-regimen__drug">Ceftriaxone 2 g IV q24h PLUS Azithromycin — add vancomycin/linezolid if MRSA risk</div>
            </div>
          </div>
        </details>

        <div class="rx-glass-card rx-cantmiss" data-rx="cantmiss">
          <div class="rx-cantmiss__head">${icoAlert}<h3>Can't miss</h3></div>
          <ul class="rx-cantmiss__list">
            <li><span class="rx-bullet">•</span><span>Post-influenza necrotizing pneumonia — consider MRSA coverage.</span></li>
            <li><span class="rx-bullet">•</span><span>Empyema or parapneumonic effusion — image and drain; antibiotics alone will fail.</span></li>
          </ul>
        </div>

        <p class="rx-sources">Sources: IDSA/ATS 2019 CAP Guideline · CDC/ABCs pneumococcal surveillance</p>
      </div>
    </div>
    ${FAB}
  `;
  return el;
}

/* ---------- SCREEN C2 — Result view (culture-directed path) ---------- */

export function renderRxCulture(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'rx-screen';
  el.innerHTML = `
    ${HEADER}
    <div class="rx-body">
      <div class="rx-result-head">
        <button class="rx-back">${icoChevLeft}<span>All infections</span></button>
        <h2 class="rx-result-head__title">Community-Acquired Pneumonia (CAP)</h2>
        <p class="rx-result-head__desc">Culture-directed — narrow to the organism the moment the Gram stain and culture land.</p>
      </div>

      <div class="rx-pathseg" data-rx="pathseg-culture">
        <button class="rx-pathseg__tab">Empiric</button>
        <button class="rx-pathseg__tab rx-pathseg__tab--culture-on">Culture-directed</button>
      </div>

      <div class="rx-result-list">
        <div class="rx-glass-card rx-regimen rx-regimen--culture" data-rx="org-card">
          <div class="rx-regimen__orghead">${icoFlask}<span>Streptococcus pneumoniae (penicillin-susceptible)</span></div>
          <div class="rx-microlabel">Preferred</div>
          <div class="rx-regimen__drug">Amoxicillin 1 g PO TID (or Penicillin G / Ampicillin IV)</div>
          <div class="rx-microlabel">Alternatives</div>
          <div class="rx-regimen__alt">Ceftriaxone; respiratory fluoroquinolone; doxycycline</div>
        </div>

        <div class="rx-glass-card rx-regimen rx-regimen--culture">
          <div class="rx-regimen__orghead">${icoFlask}<span>Legionella pneumophila</span></div>
          <div class="rx-microlabel">Preferred</div>
          <div class="rx-regimen__drug">Levofloxacin 750 mg IV/PO daily (or Azithromycin 500 mg daily)</div>
        </div>

        <div class="rx-glass-card rx-regimen rx-regimen--culture">
          <div class="rx-regimen__orghead">${icoFlask}<span>MRSA (necrotizing / post-influenza)</span></div>
          <div class="rx-microlabel">Preferred</div>
          <div class="rx-regimen__drug">Vancomycin 15–20 mg/kg IV q8–12h OR Linezolid 600 mg IV/PO q12h</div>
        </div>
      </div>
    </div>
    ${FAB}
  `;
  return el;
}

/* ---------- SCREEN D — Patient parameters sheet ---------- */

function segmented(label: string, opts: { text: string; on?: boolean }[], attr = ''): string {
  const tabs = opts
    .map(
      (o) =>
        `<button class="rx-seg__tab${o.on ? ' rx-seg__tab--on' : ''}">${o.text}</button>`,
    )
    .join('');
  return `
    <div class="rx-field"${attr}>
      <div class="rx-field__label">${label}</div>
      <div class="rx-seg">${tabs}</div>
    </div>
  `;
}

function chip(text: string, on = false, tone = ''): string {
  const t = tone ? ` data-tone="${tone}"` : '';
  return `<button class="rx-toggle-chip" data-on="${on}"${t}>${text}</button>`;
}

export function renderRxParams(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'rx-screen rx-screen--sheet';
  el.innerHTML = `
    <div class="rx-sheet">
      <div class="rx-sheet__handle"></div>
      <div class="rx-sheet__head">
        <h2>Patient parameters</h2>
        <button class="rx-sheet__close" aria-label="Close">${icoX}</button>
      </div>
      <div class="rx-sheet__body">
        ${segmented('Care setting', [{ text: 'Outpatient', on: true }, { text: 'Inpatient' }, { text: 'ICU / Severe' }], ' data-rx="care-setting"')}
        ${segmented('Age band', [{ text: 'Adult', on: true }, { text: 'Elderly' }, { text: 'Peds' }, { text: 'Neonate' }])}
        ${segmented('Penicillin allergy', [{ text: 'None' }, { text: 'Mild / rash' }, { text: 'Anaphylaxis', on: true }], ' data-rx="pcn-allergy"')}

        <div class="rx-field">
          <div class="rx-field__label">Other allergies</div>
          <div class="rx-chips">
            ${chip('Cephalosporin', false, 'danger')}
            ${chip('Sulfa', false, 'danger')}
            ${chip('Macrolide')}
            ${chip('Fluoroquinolone')}
          </div>
        </div>

        <div class="rx-field" data-rx="physio">
          <div class="rx-field__label">Physiologic state</div>
          <div class="rx-chips">
            ${chip('Pregnant', true, 'danger')}
            ${chip('Breastfeeding')}
            ${chip('Hepatic impairment')}
            ${chip('Obesity')}
          </div>
          <div class="rx-crcl">
            <span class="rx-crcl__label">CrCl</span>
            <input class="rx-lab-input rx-crcl__input" type="text" value="22" readonly />
            <span class="rx-crcl__hint">(normal ≈ &gt;90)</span>
          </div>
        </div>

        <div class="rx-field" data-rx="resistance">
          <div class="rx-field__label">Resistance / MDR risk</div>
          <div class="rx-chips">
            ${chip('MRSA risk', true, 'resistance')}
            ${chip('Pseudomonas risk', false, 'resistance')}
            ${chip('ESBL risk', false, 'resistance')}
            ${chip('Recent antibiotics')}
          </div>
        </div>

        <div class="rx-field" data-rx="antibiogram-toggle">
          <div class="rx-field__label">Local antibiogram</div>
          <div class="rx-chips">
            ${chip('Off')}
            ${chip('Your unit', true)}
          </div>
        </div>

        <div class="rx-signal rx-signal--danger" data-rx="safety-flag">
          <span class="rx-signal__icon">${icoShield}</span>
          <div>
            <div class="rx-signal__title">Severe penicillin allergy</div>
            <div class="rx-signal__text">Avoid all beta-lactams after anaphylaxis; use respiratory fluoroquinolone or doxycycline.</div>
          </div>
        </div>

        <div class="rx-glass-card rx-modifiers" data-rx="modifiers">
          <div class="rx-modifiers__head">${icoSyringe}<h3>Adjustments for your patient</h3></div>
          <div class="rx-modifiers__item">
            <span class="rx-pill rx-pill--resistance">MRSA risk</span>
            <div class="rx-modifiers__text">Add vancomycin 15–20 mg/kg IV q8–12h or linezolid 600 mg IV/PO q12h to empiric regimen.</div>
          </div>
        </div>
      </div>
    </div>
  `;
  return el;
}

/* ---------- SCREEN E — Local antibiogram ----------
   Illustrative susceptibilities only. No real institutional antibiogram data
   appears on this marketing site; the point of the screen is the mechanism. */

function sRow(org: string, drug: string, pct: string, tone: 'safe' | 'caution' | 'danger'): string {
  return `
    <div class="rx-srow">
      <span class="rx-srow__label"><strong>${org}</strong> · ${drug}</span>
      <span class="rx-srow__pct rx-srow__pct--${tone}">${pct}</span>
    </div>
  `;
}

export function renderRxAntibiogram(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'rx-screen';
  el.innerHTML = `
    ${HEADER}
    <div class="rx-body">
      <div class="rx-result-head">
        <button class="rx-back">${icoChevLeft}<span>All infections</span></button>
        <h2 class="rx-result-head__title">Uncomplicated Cystitis</h2>
        <p class="rx-result-head__desc">Empiric therapy overlaid with your unit's real susceptibilities.</p>
      </div>

      <div class="rx-glass-card rx-abg" data-rx="abg">
        <div class="rx-abg__head">${icoMapPin}<h3>Local antibiogram — your unit</h3></div>

        <div class="rx-signal rx-signal--resistance rx-abg__guidance" data-rx="abg-guidance">
          The guideline regimen re-ranks itself against whatever your unit's susceptibilities actually are.
          Where local resistance undercuts a first-line drug, it drops down the list and the alternative
          moves up — before you write the prescription, not after the culture returns.
        </div>

        <div class="rx-abg__table" data-rx="abg-table">
          <div class="rx-microlabel">Local susceptibility (%S) — illustrative</div>
          ${sRow('E. coli (urine)', 'Ceftriaxone', '95%', 'safe')}
          ${sRow('E. coli (urine)', 'Nitrofurantoin', '90%', 'safe')}
          ${sRow('E. coli (urine)', 'Cefazolin', '90%', 'safe')}
          ${sRow('E. coli (urine)', 'Ciprofloxacin', '75%', 'caution')}
          ${sRow('E. coli (urine)', 'TMP-SMX', '70%', 'caution')}
          ${sRow('E. coli (urine)', 'Ampicillin', '50%', 'danger')}
          ${sRow('ESBL E. coli (urine)', 'Nitrofurantoin', '90%', 'safe')}
          ${sRow('ESBL E. coli (urine)', 'Ciprofloxacin', '20%', 'danger')}
          ${sRow('MRSA', 'Minocycline', '85%', 'safe')}
          ${sRow('MRSA', 'TMP-SMX', '70%', 'caution')}
        </div>
        <p class="rx-abg__source">Illustrative figures. In the app this table is your own institution's antibiogram, loaded locally.</p>
      </div>
    </div>
    ${FAB}
  `;
  return el;
}

/* ---------- SCREEN F — Dose calculator sheet ---------- */

export function renderRxCalc(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'rx-screen rx-screen--sheet';
  el.innerHTML = `
    <div class="rx-sheet">
      <div class="rx-sheet__handle"></div>
      <div class="rx-sheet__head">
        <h2>Dose calculator</h2>
        <button class="rx-sheet__close" aria-label="Close">${icoX}</button>
      </div>
      <div class="rx-sheet__body">
        <div class="rx-search" data-rx="calc-search">
          ${icoSearch}
          <input class="rx-lab-input rx-search__input" value="Vancomycin" readonly />
        </div>

        <button class="rx-glass-card rx-druglist" data-rx="drug-vanc">
          <div class="rx-druglist__name">Vancomycin</div>
          <div class="rx-druglist__sub">Glycopeptide · 15–20 mg/kg IV q8–12h (AUC/MIC 400–600)</div>
        </button>

        <div class="rx-glass-card rx-dosecard" data-rx="peds-calc">
          <div class="rx-microlabel rx-microlabel--primary">Pediatric weight-based dose</div>
          <div class="rx-dosecard__formula">60 mg/kg/day ÷ 4 · max 2 g/day · target AUC/MIC 400–600</div>
          <div class="rx-seg rx-seg--sm">
            <button class="rx-seg__tab rx-seg__tab--on">Weight</button>
            <button class="rx-seg__tab">Broselow</button>
            <button class="rx-seg__tab">By age</button>
          </div>
          <input class="rx-lab-input" type="text" value="18" readonly />
          <div class="rx-dosecard__result" data-rx="calc-result">
            <div class="rx-dosecard__weight">18 kg</div>
            <div class="rx-dosecard__give">Give 270 mg per dose</div>
            <div class="rx-dosecard__math">60 mg/kg/day ÷ 4 × 18 kg = 270 mg · daily total 1080 mg</div>
          </div>
        </div>

        <div class="rx-glass-card rx-renal" data-rx="renal">
          <div class="rx-microlabel rx-microlabel--resistance">Renal dosing (CrCl)</div>
          <div class="rx-renal__inputrow">
            <input class="rx-lab-input rx-renal__input" type="text" value="38" readonly />
            <span class="rx-renal__hint">Cockcroft-Gault</span>
          </div>
          <div class="rx-renal__tiers">
            <div class="rx-renal__tier rx-renal__tier--active">
              <span class="rx-renal__range">26–50</span>
              <span class="rx-renal__dose">IV: full dose q12h</span>
            </div>
            <div class="rx-renal__tier">
              <span class="rx-renal__range">51–∞</span>
              <span class="rx-renal__dose">No adjustment (q8h)</span>
            </div>
            <div class="rx-renal__tier">
              <span class="rx-renal__range">10–25</span>
              <span class="rx-renal__dose">IV: full dose q24h, level-guided</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  return el;
}

