// myStroke-Kitt — pixel-faithful HTML clone of the real Next.js PWA.
// Source of truth: recon/mystroke-kitt.md (apps/web, Tailwind v4 + globals.css).
// iOS glassmorphism + 3D buttons, Geist, font-black everywhere, deep-teal text,
// pathway color coding: ischemic #BF5700 / hemorrhagic #B22222 / mimics #228B22 / triage #1fb8a8.

// ---------------------------------------------------------------------------
// Inline SVG icons (lucide-style, 24x24, stroke=currentColor)
// ---------------------------------------------------------------------------

const ICON_PATHS: Record<string, string> = {
  'alert-triangle':
    '<path d="M21.73 18 13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  'check-circle': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  'rotate-ccw': '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
  scan:
    '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="12" r="4"/>',
  activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  calculator:
    '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8"/><path d="M16 14v4"/><path d="M8 10h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  syringe:
    '<path d="m18 2 4 4"/><path d="m17 7 3-3"/><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5"/><path d="m9 11 4 4"/><path d="m5 19-3 3"/><path d="m14 4 6 6"/>',
  droplet:
    '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
  zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  'test-tube': '<path d="M14.5 2v17.5a2.5 2.5 0 0 1-5 0V2"/><path d="M8.5 2h7"/><path d="M14.5 16h-5"/>',
  layers:
    '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
  'undo-2': '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5 5.5 5.5 0 0 1-5.5 5.5H11"/>',
  pill:
    '<path d="M10.5 20.5 3.5 13.5a4.95 4.95 0 1 1 7-7l7 7a4.95 4.95 0 1 1-7 7Z"/><path d="m8.5 8.5 7 7"/>',
  gauge: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
  scissors:
    '<circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/>',
  ellipsis: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  hand:
    '<path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>',
  image:
    '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
  magnet:
    '<path d="m6 15-4-4 6.75-6.77a7.79 7.79 0 0 1 11 11L13 22l-4-4 6.39-6.36a2.14 2.14 0 0 0-3-3L6 15"/><path d="m5 8 4 4"/><path d="m12 15 4 4"/>',
  'file-text':
    '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  'git-branch':
    '<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',
  waves:
    '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
  'clipboard-check':
    '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
  map:
    '<path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/>',
  flask:
    '<path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/>',
  'arrow-up-to-line': '<path d="M5 3h14"/><path d="m18 13-6-6-6 6"/><path d="M12 7v14"/>',
  'trending-up': '<path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/>',
  shield:
    '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1 1 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/>',
  'chart-line': '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="m19 9-5 5-4-4-3 3"/>',
  percent:
    '<line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
  ban: '<circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/>',
};

function icon(name: string, cls = ''): string {
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON_PATHS[name] ?? ''}</svg>`;
}

// ---------------------------------------------------------------------------
// Shared chrome
// ---------------------------------------------------------------------------

// Amber disclaimer strip — consult pages only (not home). Part of the trust story.
const DISCLAIMER = `
  <div class="sk-disclaimer" role="status" data-sk="disclaimer">
    ${icon('alert-triangle')}
    <p><strong>Educational reference only — not FDA cleared.</strong> Verify against local protocol. <span class="sk-disclaimer__link">Details</span></p>
  </div>
`;

interface Stage {
  label: string;
  state: 'current' | 'done' | 'future';
  danger?: boolean;
}

// Sticky glass stage rail. Current pill = pathway gradient, done = green outline + check.
function stageRail(stages: Stage[], tone: 'orange' | 'red' = 'orange', dataSk?: string): string {
  const pills = stages
    .map((s) => {
      if (s.state === 'current') {
        const mod = tone === 'red' ? 'sk-rail__pill--current-red' : 'sk-rail__pill--current';
        return `<span class="sk-rail__pill ${mod}">${s.danger ? icon('alert-triangle') : ''}${s.label}</span>`;
      }
      if (s.state === 'done') {
        return `<span class="sk-rail__pill sk-rail__pill--done">${icon('check')}${s.label}</span>`;
      }
      return `<span class="sk-rail__pill sk-rail__pill--future">${s.label}</span>`;
    })
    .join('');
  return `
  <div class="sk-rail"${dataSk ? ` data-sk="${dataSk}"` : ''}>
    <div class="sk-rail__scroll">${pills}</div>
  </div>
`;
}

// Learn | Patient mode toggle + Home pill (consult pages).
const MODE_ROW = `
  <div class="sk-mode-row">
    <div class="sk-mode-toggle" role="tablist">
      <span class="sk-mode-btn sk-mode-btn--active">Learn</span>
      <span class="sk-mode-btn">Patient</span>
    </div>
    <span class="sk-home-pill">Home</span>
  </div>
`;

interface Tool {
  label: string;
  icon: string;
  active?: boolean;
}

// Fixed bottom task toolbar — icon+label buttons, hairline group dividers, …more at right.
function toolbar(groups: Tool[][], tone: 'orange' | 'red' = 'orange', dataSk?: string): string {
  const groupHtml = groups
    .map((g) =>
      g
        .map(
          (t) => `
      <button class="sk-tool${t.active ? ' sk-tool--active' : ''}" type="button">
        <span class="sk-tool__icon">${icon(t.icon)}</span>
        <span class="sk-tool__label">${t.label}</span>
      </button>`
        )
        .join('')
    )
    .join('<div class="sk-tooldiv"></div>');
  return `
  <nav class="sk-toolbar${tone === 'red' ? ' sk-toolbar--red' : ''}"${dataSk ? ` data-sk="${dataSk}"` : ''}>
    <div class="sk-toolbar__scroll">
      ${groupHtml}
      <div class="sk-tooldiv"></div>
      <button class="sk-tool" type="button">
        <span class="sk-tool__icon">${icon('ellipsis')}</span>
        <span class="sk-tool__label">…more</span>
      </button>
    </div>
  </nav>
`;
}

// Solid pathway-colored option button (options are SOLID color; 3D gradients are Back/Continue only).
function optionBtn(
  color: string,
  label: string,
  sub: string,
  timeCritical: boolean,
  dataSk?: string
): string {
  return `
  <button class="sk-opt" type="button" style="background-color:${color}"${dataSk ? ` data-sk="${dataSk}"` : ''}>
    <span class="sk-opt__label">${label}</span>
    <span class="sk-opt__sub">${sub}</span>
    ${timeCritical ? '<span class="sk-opt__tag">⏱ Time-critical</span>' : ''}
  </button>
`;
}

// Real ischemic-pathway toolbar: 20 tools, horizontally scrolling (blueprint §2D).
const ISCHEMIC_TOOLS: Tool[][] = [
  [
    { label: 'Home', icon: 'home' },
    { label: 'Reset', icon: 'rotate-ccw' },
  ],
  [
    { label: 'CT', icon: 'scan' },
    { label: 'NIHSS', icon: 'activity' },
    { label: 'SynCalc', icon: 'calculator' },
    { label: 'Deficit', icon: 'hand' },
    { label: 'LKW', icon: 'clock' },
    { label: 'Imaging', icon: 'image' },
    { label: 'MRI', icon: 'magnet' },
    { label: 'IVT', icon: 'test-tube' },
    { label: 'Consent', icon: 'file-text' },
    { label: 'Give', icon: 'syringe' },
    { label: 'Angio', icon: 'git-branch' },
    { label: 'LVO', icon: 'target' },
    { label: 'EVT', icon: 'zap' },
    { label: 'Perfusion', icon: 'waves' },
    { label: 'Post', icon: 'clipboard-check' },
    { label: 'Bleed', icon: 'droplet' },
    { label: 'Territory', icon: 'map' },
    { label: 'Mimics', icon: 'layers' },
  ],
];

function withActive(groups: Tool[][], activeLabel: string): Tool[][] {
  return groups.map((g) => g.map((t) => (t.label === activeLabel ? { ...t, active: true } : t)));
}

// ---------------------------------------------------------------------------
// Screen A — Home launcher (/)
// ---------------------------------------------------------------------------

export function renderSKHome(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'sk-screen sk-screen--warm';
  el.innerHTML = `
    <main class="sk-main">
      <header>
        <p class="sk-brand-eyebrow">myStroke-Kitt</p>
        <p class="sk-h1">Stroke Decision Tree</p>
        <p class="sk-home-sub">Start with the code-stroke spine. The app will fork after CT into ischemic, hemorrhagic, or mimic pathways.</p>
      </header>

      ${optionBtn(
        '#1fb8a8',
        'Start Stroke Decision Tree',
        'Glucose, LKW, NIHSS, CT fork, reperfusion decisions',
        true,
        'start-cta'
      )}

      <div class="sk-glass sk-flow-card" data-sk="flow-card">
        <h2 class="sk-flow-card__title">What happens next</h2>
        <ol class="sk-flow">
          <li><span class="sk-flow-num">1</span><span>Activate stroke team, glucose, LKW, NIHSS</span></li>
          <li><span class="sk-flow-num">2</span><span>Non-contrast CT head</span></li>
          <li><span class="sk-flow-num">3</span><span>Blood on CT? Go hemorrhagic</span></li>
          <li><span class="sk-flow-num">4</span><span>No blood? Check IVT and EVT windows</span></li>
          <li><span class="sk-flow-num">5</span><span>LVO or posterior circulation? Escalate for EVT</span></li>
        </ol>
      </div>

      <section class="sk-jumps" data-sk="direct-jumps">
        <h2 class="sk-section-label">Direct jumps</h2>
        <p class="sk-jumps__note">Use these only when CT or clinical context already decides the fork.</p>
        ${optionBtn('#BF5700', 'Ischemic', 'No blood on CT, reperfusion pathway', true)}
        ${optionBtn('#B22222', 'Hemorrhagic', 'Blood on CT, reversal and BP control', true)}
        ${optionBtn('#228B22', 'Stroke Mimics', 'Hypoglycemia, seizure, migraine, Bell palsy', false)}
      </section>

      <section class="sk-qr-card">
        <div class="sk-qr-card__chip">
          <svg viewBox="0 0 33 33" aria-hidden="true">
            <rect x="0" y="0" width="33" height="33" fill="#fff"/>
            <g fill="#073c3a">
              <path d="M0 0h9v9H0zM2 2v5h5V2z"/><rect x="3" y="3" width="3" height="3"/>
              <path d="M24 0h9v9h-9zM26 2v5h5V2z"/><rect x="27" y="3" width="3" height="3"/>
              <path d="M0 24h9v9H0zM2 26v5h5v-5z"/><rect x="3" y="27" width="3" height="3"/>
              <rect x="12" y="1" width="2" height="2"/><rect x="16" y="0" width="2" height="3"/><rect x="20" y="2" width="2" height="2"/>
              <rect x="11" y="5" width="3" height="2"/><rect x="17" y="4" width="2" height="2"/><rect x="20" y="6" width="2" height="2"/>
              <rect x="1" y="12" width="2" height="2"/><rect x="5" y="11" width="2" height="3"/><rect x="8" y="13" width="3" height="2"/>
              <rect x="12" y="12" width="3" height="3"/><rect x="17" y="11" width="2" height="2"/><rect x="20" y="13" width="3" height="2"/>
              <rect x="25" y="12" width="2" height="2"/><rect x="29" y="11" width="3" height="2"/><rect x="27" y="15" width="2" height="2"/>
              <rect x="2" y="17" width="3" height="2"/><rect x="7" y="16" width="2" height="3"/><rect x="12" y="17" width="2" height="3"/>
              <rect x="16" y="16" width="3" height="2"/><rect x="21" y="17" width="2" height="2"/><rect x="25" y="18" width="3" height="2"/>
              <rect x="30" y="17" width="2" height="3"/><rect x="1" y="21" width="2" height="2"/><rect x="6" y="20" width="2" height="2"/>
              <rect x="13" y="21" width="2" height="2"/><rect x="18" y="20" width="2" height="3"/><rect x="23" y="21" width="3" height="2"/>
              <rect x="28" y="22" width="2" height="2"/><rect x="12" y="25" width="2" height="2"/><rect x="16" y="24" width="2" height="3"/>
              <rect x="20" y="26" width="3" height="2"/><rect x="25" y="25" width="2" height="2"/><rect x="29" y="26" width="3" height="3"/>
              <rect x="13" y="29" width="3" height="2"/><rect x="18" y="30" width="2" height="2"/><rect x="23" y="29" width="2" height="2"/>
              <rect x="27" y="30" width="2" height="2"/>
            </g>
          </svg>
        </div>
        <div class="sk-qr-card__text">
          <p class="sk-qr-card__title">Share or install myStroke-Kitt</p>
          <p class="sk-qr-card__link">mystroke-kitt.vercel.app</p>
        </div>
      </section>
    </main>
  `;
  return el;
}

// ---------------------------------------------------------------------------
// Screen B — Consult node card (triage entry, /triage — node triage-start)
// ---------------------------------------------------------------------------

const TRIAGE_RAIL: Stage[] = [
  { label: 'Code', state: 'current' },
  { label: 'CT', state: 'future' },
  { label: 'Ischemic', state: 'future' },
  { label: 'ICH', state: 'future' },
  { label: 'Mimics', state: 'future' },
];

export function renderSKTriage(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'sk-screen';
  el.innerHTML = `
    ${DISCLAIMER}
    ${stageRail(TRIAGE_RAIL, 'orange', 'stage-rail')}
    <main class="sk-main">
      ${MODE_ROW}
      <div class="sk-node">
        <p class="sk-eyebrow">Code Stroke</p>
        <h2 class="sk-node__title">Code Stroke — Initial Actions</h2>
        <div class="sk-node-body" data-sk="node-body">
          <p><strong>Last known well (LKW)</strong> is the clock — establish it now.</p>
          <p><strong>Immediate actions (in parallel):</strong></p>
          <p>• Fingerstick glucose — the only required pre-thrombolysis lab; rules out the hypoglycemia mimic</p>
          <p>• IV access × 2 (large bore)</p>
          <p>• Activate stroke team / notify neurology</p>
          <p>• Score the deficit — <span class="sk-link">NIHSS</span>; localize with the <span class="sk-link">Syndrome Calculator</span></p>
          <p>• Draw labs (CBC, BMP, coags, troponin) but do NOT delay imaging</p>
          <p>• Emergent <strong>non-contrast CT head</strong> ± <span class="sk-link">CTA</span></p>
        </div>
        <div class="sk-chips">
          <button class="sk-chip" type="button" data-sk="nihss-chip">Open NIHSS</button>
          <button class="sk-chip" type="button">Open Stroke Syndrome</button>
        </div>
        <div class="sk-options">
          ${optionBtn('#1fb8a8', 'Non-contrast CT obtained', 'Interpret for hemorrhage', true)}
        </div>
      </div>
    </main>
    ${toolbar(ISCHEMIC_TOOLS)}
  `;
  return el;
}

// ---------------------------------------------------------------------------
// Screen C — NIHSS fast-sheet calculator (bottom-sheet modal)
// ---------------------------------------------------------------------------

interface NihssItem {
  title: string;
  max: number;
  active?: number;
  legend: string[];
}

const NIHSS_ITEMS: NihssItem[] = [
  {
    title: '1A / CONSCIOUSNESS',
    max: 3,
    active: 1,
    legend: [
      '0 — Alert',
      '1 — Not alert, arousable by minor stimulation',
      '2 — Not alert, requires repeated stimulation',
      '3 — Unresponsive or reflexive responses only',
    ],
  },
  {
    title: '1B / ORIENTATION',
    max: 2,
    active: 2,
    legend: ['Ask month and age', '0 — Both correct', '1 — One correct', '2 — Neither correct'],
  },
  {
    title: '1C / COMMANDS',
    max: 2,
    legend: ['Ask close eyes and make fist', '0 — Both correct', '1 — One correct', '2 — Neither correct'],
  },
  {
    title: '5A / LEFT ARM',
    max: 4,
    active: 4,
    legend: [
      'Hold arm up for 10 seconds',
      '0 — No drift',
      '1 — Drift before 10 seconds',
      '2 — Falls before 10 seconds',
      '3 — No effort against gravity',
      '4 — No movement',
    ],
  },
];

function nihssItemCard(item: NihssItem): string {
  const btns = Array.from({ length: item.max + 1 }, (_, i) => {
    const active = item.active === i;
    return `<button class="sk-score-btn" type="button" data-active="${active ? 'true' : 'false'}">${i}</button>`;
  }).join('');
  return `
  <li class="sk-item">
    <h3 class="sk-item__title">${item.title}</h3>
    <div class="sk-score-grid" role="group">${btns}</div>
    <div class="sk-item__legend">${item.legend.map((l) => `<div>${l}</div>`).join('')}</div>
  </li>
`;
}

export function renderSKNIHSS(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'sk-screen sk-screen--modal';
  el.innerHTML = `
    <div class="sk-scrim"></div>
    <div class="sk-sheet">
      <div class="sk-sheet__head">
        <span class="sk-sheet__title">NIHSS</span>
        <button class="sk-sheet__close" type="button">${icon('x')}</button>
      </div>
      <div class="sk-sheet__body">
        <div class="sk-calc-head">
          <button class="sk-reset-btn" type="button">Reset</button>
          <span class="sk-scored-count">3/15 scored</span>
        </div>

        <div class="sk-score-live" data-sk="score-live">
          <span class="sk-score-live__num">7</span>
          <span class="sk-score-live__label">Score 5–15 — Moderate Stroke</span>
        </div>

        <ul class="sk-item-list" data-sk="score-btns">
          ${NIHSS_ITEMS.map(nihssItemCard).join('')}
        </ul>

        <div class="sk-flag sk-flag--warning" data-sk="tier-note">
          NIHSS ≥6: EVT eligibility threshold (anterior LVO). NIHSS 0–5 with disabling deficit: still consider IVT.
        </div>

        <p class="sk-total">Total: 7</p>
        <button class="sk-apply-btn" type="button">Apply NIHSS = 7 to patient</button>
      </div>
      <div class="sk-sheet__foot">
        <button class="sk-close-pill" type="button">Close</button>
      </div>
    </div>
  `;
  return el;
}

// ---------------------------------------------------------------------------
// Screen D — CT fork node (triage-ct): pathway color-coded options
// ---------------------------------------------------------------------------

const CT_RAIL: Stage[] = [
  { label: 'Code', state: 'done' },
  { label: 'CT', state: 'current', danger: true },
  { label: 'Ischemic', state: 'future' },
  { label: 'ICH', state: 'future' },
  { label: 'Mimics', state: 'future' },
];

export function renderSKCTFork(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'sk-screen';
  el.innerHTML = `
    ${DISCLAIMER}
    ${stageRail(CT_RAIL)}
    <main class="sk-main">
      ${MODE_ROW}
      <div class="sk-node">
        <p class="sk-eyebrow">Code Stroke</p>
        <h2 class="sk-node__title">CT Head — Fork on Result</h2>
        <div class="sk-node-body">
          <p>Interpret the non-contrast CT (blood is hyperdense/bright). The result forks the pathway:</p>
        </div>
        <div class="sk-options">
          ${optionBtn('#BF5700', 'No blood — ischemic pathway', 'No hemorrhage; proceed with reperfusion workup', true, 'opt-ischemic')}
          ${optionBtn('#B22222', 'Blood — hemorrhagic pathway', 'Intracerebral hemorrhage present', true, 'opt-hemorrhagic')}
          ${optionBtn('#228B22', 'Suspect a stroke mimic', "Hypoglycemia, Todd's, dissection, complex migraine", false, 'opt-mimic')}
        </div>
        <button class="sk-btn3d sk-btn3d--neutral sk-btn3d--full" type="button">← Back</button>
      </div>
    </main>
    ${toolbar(withActive(ISCHEMIC_TOOLS, 'CT'))}
  `;
  return el;
}

// ---------------------------------------------------------------------------
// Screen E — IVT Contraindication Check (green/red hard-stop modal)
// ---------------------------------------------------------------------------

function checkRow(label: string, checked = false): string {
  return `
  <label class="sk-check-row">
    <span class="sk-check-box${checked ? ' sk-check-box--on' : ''}">${checked ? icon('check') : ''}</span>
    <span>${label}</span>
  </label>
`;
}

export function renderSKIVTCheck(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'sk-screen sk-screen--modal';
  el.innerHTML = `
    <div class="sk-scrim"></div>
    <div class="sk-sheet">
      <div class="sk-sheet__head">
        <span class="sk-sheet__title">IVT Contraindication Check</span>
        <button class="sk-sheet__close" type="button">${icon('x')}</button>
      </div>
      <div class="sk-sheet__body">
        <div class="sk-verdict sk-verdict--green" data-sk="verdict">
          ${icon('check-circle')}
          <div>
            <p class="sk-verdict__head">Green: no absolute contraindication checked</p>
            <p class="sk-verdict__body">This screen has no selected hard stop. Continue time-window, imaging, BP, dosing, and local protocol checks before treatment.</p>
          </div>
        </div>

        <div class="sk-check-actions">
          <button class="sk-check-pill" type="button">Mark screened</button>
          <button class="sk-check-pill" type="button">Reset</button>
        </div>

        <div data-sk="hardstops">
          <h3 class="sk-check-group">Absolute hard stops</h3>
          ${checkRow('Hemorrhage on CT')}
          ${checkRow('Severe head trauma or ischemic stroke &lt;3 months')}
          ${checkRow('GI bleed or GI malignancy &lt;21 days')}
          ${checkRow('Platelets &lt;100,000 · INR &gt;1.7 · aPTT &gt;40 s')}
          ${checkRow('DOAC within 48 h (unless reversed)')}
        </div>

        <h3 class="sk-check-group">Relative / stroke-team judgment</h3>
        ${checkRow('BP &gt;185/110 — treat first, then reassess')}
        ${checkRow('Glucose &lt;50 mg/dL — treat and reassess deficit')}
        ${checkRow('Minor non-disabling deficit')}

        <div class="sk-doc-card">
          <p class="sk-doc-card__label">Documentation</p>
          <p>Document: IV thrombolysis hard-stop screen reviewed. Absolute contraindications selected: none. Relative considerations reviewed with stroke team.</p>
        </div>
      </div>
      <div class="sk-sheet__foot">
        <button class="sk-close-pill" type="button">Close</button>
      </div>
    </div>
  `;
  return el;
}

// ---------------------------------------------------------------------------
// Screen F — Administer Thrombolysis node (ischemic, stroke-ivt-treat)
// ---------------------------------------------------------------------------

const IVT_RAIL: Stage[] = [
  { label: 'Code', state: 'done' },
  { label: 'CT', state: 'done' },
  { label: 'Deficit', state: 'done' },
  { label: 'Timing', state: 'done' },
  { label: 'IVT', state: 'current' },
  { label: 'LVO/EVT', state: 'future' },
  { label: 'Post', state: 'future' },
];

export function renderSKIVTTreat(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'sk-screen';
  el.innerHTML = `
    ${DISCLAIMER}
    ${stageRail(IVT_RAIL)}
    <main class="sk-main">
      ${MODE_ROW}
      <div class="sk-node">
        <p class="sk-eyebrow">Module 2</p>
        <h2 class="sk-node__title">Administer Thrombolysis</h2>

        <div class="sk-flag sk-flag--critical">
          Confirm BP &lt;185/110 and a clear hard-stop screen immediately before the bolus.
        </div>
        <div class="sk-flag sk-flag--critical" data-sk="safety-flag">
          Post-thrombolysis: BP &lt;180/105 × 24h, neuro checks q15min, no antithrombotics × 24h. Any neuro decline or major bleeding → emergent NCCT and TNK/tPA bleed reversal.
        </div>

        <div class="sk-node-body" data-sk="tnk-dose">
          <p><strong>Preferred:</strong> <span class="sk-link">Tenecteplase</span> 0.25 mg/kg IV bolus (max 25 mg) — single dose over 5 seconds.</p>
          <p><strong>Alternative:</strong> <span class="sk-link">Alteplase</span> 0.9 mg/kg IV (max 90 mg) — 10% bolus over 1 min, remainder over 60 min.</p>
          <p><strong>Post-thrombolysis orders:</strong></p>
          <p>• BP &lt;180/105 × 24h (<span class="sk-link">Labetalol</span> / <span class="sk-link">Nicardipine</span>)</p>
          <p>• Neuro checks q15min × 2h</p>
          <p>• No antithrombotics × 24h</p>
        </div>

        <div class="sk-footer-grid">
          <button class="sk-btn3d sk-btn3d--neutral" type="button">← Back</button>
          <button class="sk-btn3d sk-btn3d--primary" type="button">Continue →</button>
        </div>
      </div>
    </main>
    ${toolbar(withActive(ISCHEMIC_TOOLS, 'Give'), 'orange', 'toolbar')}
  `;
  return el;
}

// ---------------------------------------------------------------------------
// Screen G — Hemorrhagic pathway (ich-start) with reversal quick doses
// ---------------------------------------------------------------------------

const ICH_RAIL: Stage[] = [
  { label: 'Code', state: 'done' },
  { label: 'CT', state: 'done' },
  { label: 'ICH', state: 'current', danger: true },
  { label: 'Reverse', state: 'future' },
  { label: 'BP', state: 'future' },
  { label: 'Surgery', state: 'future' },
  { label: 'ICU', state: 'future' },
];

// Real hemorrhagic-pathway toolbar: 18 tools in 5 groups (blueprint §2F).
const ICH_TOOLS: Tool[][] = [
  [
    { label: 'Home', icon: 'home' },
    { label: 'Reset', icon: 'rotate-ccw' },
  ],
  [
    { label: 'ICH', icon: 'alert-triangle', active: true },
    { label: 'CT/ABC', icon: 'scan' },
    { label: 'Markers', icon: 'flask' },
  ],
  [
    { label: 'Reverse', icon: 'undo-2' },
    { label: 'TNK/tPA', icon: 'syringe' },
    { label: 'Warfarin', icon: 'pill' },
    { label: 'Xa', icon: 'test-tube' },
  ],
  [
    { label: 'BP', icon: 'gauge' },
    { label: 'Surgery', icon: 'scissors' },
    { label: 'EVD', icon: 'arrow-up-to-line' },
    { label: 'Seizure', icon: 'zap' },
    { label: 'ICP', icon: 'trending-up' },
    { label: 'DVT', icon: 'shield' },
  ],
  [
    { label: 'Prog', icon: 'chart-line' },
    { label: 'ICHScore', icon: 'calculator' },
    { label: 'FUNC', icon: 'percent' },
    { label: 'Limits', icon: 'ban' },
  ],
];

export function renderSKICH(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'sk-screen';
  el.innerHTML = `
    ${DISCLAIMER}
    ${stageRail(ICH_RAIL, 'red')}
    <main class="sk-main">
      ${MODE_ROW}
      <div class="sk-node">
        <p class="sk-eyebrow">Hemorrhagic</p>
        <h2 class="sk-node__title">Intracerebral Hemorrhage (ICH)</h2>

        <div class="sk-flag sk-flag--contra">
          Do NOT delay anticoagulant reversal while awaiting labs.
        </div>

        <div class="sk-node-body">
          <p><strong>~40% 30-day mortality</strong> — treat as a resuscitation emergency.</p>
          <p>Stabilize ABCs, reverse anticoagulation, control BP, and get neurosurgery moving in parallel.</p>
        </div>

        <div class="sk-node-body sk-reversal" data-sk="reversal">
          <p><strong>Reversal quick doses:</strong></p>
          <p>• <strong>Dabigatran:</strong> <span class="sk-link">Idarucizumab (Praxbind)</span> 5 g IV as two consecutive 2.5 g bolus doses. If unavailable: 4-Factor PCC 50 IU/kg IV.</p>
          <p>• <strong>Xa inhibitors:</strong> <span class="sk-link">4-Factor PCC</span> 50 IU/kg IV — onset 15–30 minutes.</p>
        </div>

        <div class="sk-options">
          ${optionBtn('#B22222', 'Anticoagulated — start reversal', 'Agent-specific reversal doses', true)}
          ${optionBtn('#B22222', 'Not anticoagulated — BP control', 'Targets and titratable drips', true)}
        </div>
      </div>
    </main>
    ${toolbar(ICH_TOOLS, 'red')}
  `;
  return el;
}
