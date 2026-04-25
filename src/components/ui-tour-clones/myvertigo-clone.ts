// my-vertigo-app UI clone — burnt-orange brand + glassmorphism cards.
// Faithful to ~/Desktop/my-vertigo-app/apps/web/src/app/globals.css.

function modulePills(currentIdx: number): string {
  const modules = ['Safety', 'Timing', 'BPPV', 'HINTS+', 'Mimics', 'Stroke', 'Dispo'];
  return modules
    .map((m, i) => {
      const cls =
        i === currentIdx
          ? 'vt-pill vt-pill--current'
          : i < currentIdx
            ? 'vt-pill vt-pill--completed'
            : 'vt-pill';
      const tag = i === currentIdx ? `data-vt="pill-current"` : '';
      return `<div class="${cls}" ${tag}>${m}</div>`;
    })
    .join('');
}

export function renderVTQuestion(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'vt-screen';
  el.innerHTML = `
    <div class="vt-pills" data-vt="pills">${modulePills(0)}</div>

    <article class="vt-card" data-vt="q-card">
      <h2 class="vt-card__title" data-vt="q-title">Safety Screen</h2>
      <p class="vt-card__body" data-vt="q-body">
        Before we work through positional vertigo, rule out time-critical mimics.
        Does the patient have any RED FLAG symptoms?
      </p>
      <div class="vt-refs-toggle" data-vt="q-refs">▸ References (3)</div>
      <div class="vt-options" style="margin-top:12px;">
        <button class="vt-btn3d vt-btn3d--danger" data-vt="q-opt-yes">
          Yes — Sudden severe headache, neuro deficit, or AMS
          <span class="vt-btn3d__sub">→ Stroke pathway</span>
        </button>
        <button class="vt-btn3d vt-btn3d--safe" data-vt="q-opt-no">
          No concerning red flags
          <span class="vt-btn3d__sub">Continue with workup</span>
        </button>
        <button class="vt-btn3d vt-btn3d--neutral" data-vt="q-back">← Back</button>
      </div>
    </article>
  `;
  return el;
}

export function renderVTChecklist(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'vt-screen';
  el.innerHTML = `
    <div class="vt-pills">${modulePills(2)}</div>

    <article class="vt-card" data-vt="ck-card">
      <h2 class="vt-card__title">BPPV Provocation Test — Findings</h2>
      <p class="vt-card__body">Tap each finding observed during the Dix-Hallpike maneuver.</p>

      <div class="vt-checklist">
        <div class="vt-check-item checked" data-vt="ck-item-1">
          <div class="vt-check-box">✓</div>
          <div>
            <div class="vt-check-item__label">Upbeating + torsional nystagmus</div>
            <div class="vt-check-item__sub">Toward dependent ear — classic posterior canal BPPV</div>
          </div>
        </div>
        <div class="vt-check-item checked" data-vt="ck-item-2">
          <div class="vt-check-box">✓</div>
          <div>
            <div class="vt-check-item__label">Latency 5–10 sec before nystagmus</div>
          </div>
        </div>
        <div class="vt-check-item" data-vt="ck-item-3">
          <div class="vt-check-box"></div>
          <div>
            <div class="vt-check-item__label">Persistent nystagmus &gt; 60 sec</div>
            <div class="vt-check-item__sub">Atypical — consider central cause</div>
          </div>
        </div>
        <div class="vt-check-item" data-vt="ck-item-4">
          <div class="vt-check-box"></div>
          <div>
            <div class="vt-check-item__label">Pure vertical or pure torsional</div>
          </div>
        </div>
      </div>

      <div class="vt-options" style="margin-top:14px;">
        <button class="vt-btn3d vt-btn3d--primary" data-vt="ck-continue">Continue</button>
        <button class="vt-btn3d vt-btn3d--neutral" data-vt="ck-back">← Back</button>
      </div>
    </article>
  `;
  return el;
}

export function renderVTManeuver(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'vt-screen';
  el.innerHTML = `
    <div class="vt-pills">${modulePills(2)}</div>

    <article class="vt-card" data-vt="mv-card">
      <h2 class="vt-card__title">Epley Maneuver — Right Posterior Canal</h2>
      <p class="vt-card__body">5-position canalith repositioning. Hold each position 30–60 seconds or until nystagmus resolves.</p>

      <a class="vt-video-link" data-vt="mv-video">▶ Watch reference video</a>

      <div style="margin-top:8px;">
        <div class="vt-maneuver-step">
          <div class="vt-maneuver-step__num">1</div>
          <div class="vt-maneuver-step__text">Sit upright. Turn head 45° to the right.</div>
        </div>
        <div class="vt-maneuver-step">
          <div class="vt-maneuver-step__num">2</div>
          <div class="vt-maneuver-step__text">Quickly lay supine, head extended 20° beyond the bed edge.</div>
        </div>
        <div class="vt-maneuver-step" data-vt="mv-step-3">
          <div class="vt-maneuver-step__num">3</div>
          <div class="vt-maneuver-step__text">Turn head 90° to the left (still extended).</div>
        </div>
        <div class="vt-maneuver-step">
          <div class="vt-maneuver-step__num">4</div>
          <div class="vt-maneuver-step__text">Roll body onto left side; head turns to face floor.</div>
        </div>
        <div class="vt-maneuver-step">
          <div class="vt-maneuver-step__num">5</div>
          <div class="vt-maneuver-step__text">Sit up slowly with chin tucked.</div>
        </div>
      </div>

      <div class="vt-options" style="margin-top:14px;">
        <button class="vt-btn3d vt-btn3d--primary" data-vt="mv-done">Maneuver complete</button>
      </div>
    </article>
  `;
  return el;
}

export function renderVTResult(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'vt-screen';
  el.innerHTML = `
    <div class="vt-pills">${modulePills(6)}</div>

    <div class="vt-result-card" data-vt="rs-card">
      <div class="vt-result-card__icon">✅</div>
      <h2 class="vt-result-card__title" data-vt="rs-title">BPPV — Posterior Canal (Right)</h2>
      <p class="vt-result-card__body">
        Diagnostic Dix-Hallpike + successful Epley with resolution of nystagmus is highly suggestive of
        right posterior canal BPPV. Safe for outpatient management.
      </p>
      <div class="vt-options">
        <button class="vt-btn3d vt-btn3d--primary" data-vt="rs-build">📋 Build Discharge Summary</button>
        <button class="vt-btn3d vt-btn3d--neutral" data-vt="rs-back">← Back</button>
      </div>
    </div>
  `;
  return el;
}

export function renderVTDisposition(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'vt-screen';
  el.innerHTML = `
    <header class="vt-header-disposition" data-vt="d-header">
      <div class="vt-header-disposition__back" data-vt="d-back">←</div>
      <div class="vt-header-disposition__title">📋 Disposition Builder</div>
    </header>

    <h3 class="vt-section-h" data-vt="d-h-diagnosis">Diagnosis</h3>
    <div style="margin: 0 14px;">
      <div class="vt-checklist">
        <div class="vt-check-item selected" data-vt="d-dx-1">
          <div class="vt-radio-box">●</div>
          <div>
            <div class="vt-check-item__label">BPPV — Posterior Canal</div>
            <div class="vt-check-item__sub">Crystals in inner ear</div>
          </div>
        </div>
        <div class="vt-expand" data-vt="d-dx-explain">
          <div class="vt-expand__label">Patient Explanation</div>
          <div class="vt-expand__text">Tiny crystals inside your inner ear got knocked loose. Specific head movements can move them back into place.</div>
        </div>
        <div class="vt-check-item" data-vt="d-dx-2">
          <div class="vt-radio-box"></div>
          <div>
            <div class="vt-check-item__label">Vestibular Neuritis</div>
            <div class="vt-check-item__sub">Inner ear nerve irritation</div>
          </div>
        </div>
      </div>
    </div>

    <div class="vt-warn-banner" data-vt="d-warn">
      <strong>Verify dose:</strong> Representative adult dosing shown. Adjust for patient factors.
    </div>

    <h3 class="vt-section-h" data-vt="d-h-meds">Medications</h3>
    <div style="margin: 0 14px;">
      <div class="vt-checklist">
        <div class="vt-check-item selected" data-vt="d-med-1">
          <div class="vt-check-box" style="border-radius:6px;background:var(--vt-primary);border-color:var(--vt-primary);">✓</div>
          <div>
            <div class="vt-check-item__label">Meclizine 25mg PO q8h PRN</div>
            <div class="vt-check-item__sub">Vestibular suppressant — MAX 72hr</div>
          </div>
        </div>
        <div class="vt-check-item" data-vt="d-med-2">
          <div class="vt-check-box"></div>
          <div>
            <div class="vt-check-item__label">Ondansetron 4mg ODT q6h PRN</div>
            <div class="vt-check-item__sub">Antiemetic for nausea</div>
          </div>
        </div>
      </div>
    </div>

    <h3 class="vt-section-h" data-vt="d-h-therapy">Therapy Plan</h3>
    <div style="margin: 0 14px;">
      <div class="vt-checklist">
        <div class="vt-check-item selected" data-vt="d-th-1">
          <div class="vt-check-box" style="border-radius:6px;background:var(--vt-primary);border-color:var(--vt-primary);">✓</div>
          <div>
            <div class="vt-check-item__label">Home Epley exercises 2x/day</div>
            <div class="vt-check-item__sub">5-step canalith repositioning</div>
          </div>
        </div>
        <div class="vt-expand" data-vt="d-th-expand">
          <div class="vt-expand__label">How To Do This Exercise</div>
          <div class="vt-expand__text">Sit on the edge of your bed. Turn your head 45° to the right…</div>
          <a class="vt-video-link" data-vt="d-th-video" style="margin-top:8px;">▶ Watch instructional video</a>
        </div>
      </div>
    </div>

    <h3 class="vt-section-h" data-vt="d-h-precautions">Return Precautions</h3>
    <div style="margin: 0 14px;">
      <div class="vt-checklist">
        <div class="vt-check-item selected" data-vt="d-pc-1">
          <div class="vt-check-box" style="border-radius:6px;background:var(--vt-primary);border-color:var(--vt-primary);">✓</div>
          <div>
            <div class="vt-check-item__label">Sudden severe headache</div>
          </div>
        </div>
        <div class="vt-check-item selected">
          <div class="vt-check-box" style="border-radius:6px;background:var(--vt-primary);border-color:var(--vt-primary);">✓</div>
          <div>
            <div class="vt-check-item__label">New weakness, slurred speech, or vision change</div>
          </div>
        </div>
      </div>
    </div>

    <h3 class="vt-section-h">Additional Notes</h3>
    <div class="vt-textarea" data-vt="d-notes">Add any custom notes for the patient…</div>

    <div class="vt-actions">
      <button class="vt-btn3d vt-btn3d--primary" data-vt="d-qr">📱 Show QR for Patient</button>
      <button class="vt-btn3d vt-btn3d--neutral" data-vt="d-share">📤 Share / Copy</button>
      <button class="vt-btn3d vt-btn3d--neutral" data-vt="d-print">🖨 Print Preview</button>
      <button class="vt-btn3d vt-btn3d--neutral" data-vt="d-back-workup">← Back to Workup</button>
    </div>
  `;
  return el;
}
