// myMedKitt — pixel-faithful clone for the UI tour.
// Source of truth: recon/mymedkitt.md + ~/Desktop/myMedKitt/docs/ (production).
// Pearl White + 3D Metallic design system. All clinical content is REAL app content
// (DKA tree, Insulin Regular drug card, Ischemic Stroke steps summary).
// Every specialty gradient is computed with the app's own buildSpecialtyGradient() algorithm.

function el(html: string): HTMLElement {
  const root = document.createElement('div');
  root.className = 'mk-screen';
  root.innerHTML = html;
  return root;
}

/* ---------------------------------------------------------------- */
/* Exact 4-stop metallic gradients (adjustBrightness +22/+5/-10/-25) */
/* ---------------------------------------------------------------- */
const GRAD = {
  anesthesia: 'linear-gradient(to bottom, #758797 0%, #4A5C6C 40%, #243646 60%, #000F1F 100%)',
  cardiology: 'linear-gradient(to bottom, #FE6060 0%, #D33535 40%, #AD0F0F 60%, #860000 100%)',
  criticalCare: 'linear-gradient(to bottom, #6F7F87 0%, #44545C 40%, #1E2E36 60%, #00070F 100%)',
  em: 'linear-gradient(to bottom, #4D9DF8 0%, #2272CD 40%, #004CA7 60%, #002580 100%)',
  gi: 'linear-gradient(to bottom, #A58479 0%, #7A594E 40%, #543328 60%, #2D0C01 100%)',
  hemeOnc: 'linear-gradient(to bottom, #E54C8F 0%, #BA2164 40%, #94003E 60%, #6D0017 100%)',
  id: 'linear-gradient(to bottom, #66B56A 0%, #3B8A3F 40%, #156419 60%, #003D00 100%)',
  nephro: 'linear-gradient(to bottom, #866C66 0%, #5B413B 40%, #351B15 60%, #0E0000 100%)',
  neuro: 'linear-gradient(to bottom, #38A194 0%, #0D7669 40%, #005043 60%, #00291C 100%)',
  obgyn: 'linear-gradient(to bottom, #C04687 0%, #951B5C 40%, #6F0036 60%, #48000F 100%)',
  ophtho: 'linear-gradient(to bottom, #38BBC7 0%, #0D909C 40%, #006A76 60%, #00434F 100%)',
  ortho: 'linear-gradient(to bottom, #525252 0%, #272727 40%, #010101 60%, #000000 100%)',
  peds: 'linear-gradient(to bottom, #539658 0%, #286B2D 40%, #024507 60%, #001E00 100%)',
  pharmacist: 'linear-gradient(to bottom, #5AC35A 0%, #2F982F 40%, #097209 60%, #004B00 100%)',
  psych: 'linear-gradient(to bottom, #A253D2 0%, #7728A7 40%, #510281 60%, #2A005A 100%)',
  procedures: 'linear-gradient(to bottom, #606DCB 0%, #3542A0 40%, #0F1C7A 60%, #000053 100%)',
  tox: 'linear-gradient(to bottom, #D6D55C 0%, #ABAA31 40%, #85840B 60%, #5E5D00 100%)',
  trauma: 'linear-gradient(to bottom, #FF8938 0%, #F35E0D 40%, #CD3800 60%, #A61100 100%)',
  usRads: 'linear-gradient(to bottom, #525BB6 0%, #27308B 40%, #010A65 60%, #00003E 100%)',
  urology: 'linear-gradient(to bottom, #FFB74F 0%, #FF8C24 40%, #DC6600 60%, #B53F00 100%)',
};

/* ------------------------------------------------------------ */
/* Shared chrome                                                  */
/* ------------------------------------------------------------ */

/** Red NOT-FDA-CLEARED banner — verbatim from docs/app.html */
const LEGAL_BANNER = `
  <div class="mk-legal-banner" data-mk="legal">
    <svg class="mk-legal-banner__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
    </svg>
    <span class="mk-legal-banner__text"><strong>NOT FDA CLEARED:</strong> For educational use only. Not a substitute for clinical judgment. <span class="mk-legal-banner__link">Learn more</span></span>
    <span class="mk-legal-banner__close">×</span>
  </div>
`;

/** Bottom tab bar — the real 3D skeuomorphic SVGs from docs/app.html (gradient ids re-prefixed) */
const TAB_BAR = `
  <nav class="mk-tab-bar" aria-label="Main navigation">
    <div class="mk-tab-item mk-tab-item--active" data-mk="tab-home">
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="mkt-hosp-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#E8E8EA"/><stop offset="100%" stop-color="#B0B0B4"/>
          </linearGradient>
          <linearGradient id="mkt-hosp-roof" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#9A9A9E"/><stop offset="100%" stop-color="#707074"/>
          </linearGradient>
        </defs>
        <rect x="8" y="18" width="32" height="24" rx="2" fill="url(#mkt-hosp-body)" stroke="#8A8A8E" stroke-width="1"/>
        <rect x="6" y="16" width="36" height="4" rx="1" fill="url(#mkt-hosp-roof)"/>
        <rect x="21" y="8" width="6" height="10" rx="1" fill="#C62828"/>
        <rect x="19" y="10" width="10" height="6" rx="1" fill="#C62828"/>
        <rect x="21.5" y="8.5" width="5" height="2" rx="0.5" fill="rgba(255,255,255,0.35)"/>
        <rect x="12" y="22" width="5" height="5" rx="0.5" fill="#5C8AAD" stroke="#6A6A6E" stroke-width="0.5"/>
        <rect x="21" y="22" width="5" height="5" rx="0.5" fill="#5C8AAD" stroke="#6A6A6E" stroke-width="0.5"/>
        <rect x="30" y="22" width="5" height="5" rx="0.5" fill="#5C8AAD" stroke="#6A6A6E" stroke-width="0.5"/>
        <rect x="12.5" y="22.5" width="2" height="1" rx="0.3" fill="rgba(255,255,255,0.4)"/>
        <rect x="21.5" y="22.5" width="2" height="1" rx="0.3" fill="rgba(255,255,255,0.4)"/>
        <rect x="30.5" y="22.5" width="2" height="1" rx="0.3" fill="rgba(255,255,255,0.4)"/>
        <rect x="12" y="31" width="5" height="5" rx="0.5" fill="#5C8AAD" stroke="#6A6A6E" stroke-width="0.5"/>
        <rect x="30" y="31" width="5" height="5" rx="0.5" fill="#5C8AAD" stroke="#6A6A6E" stroke-width="0.5"/>
        <rect x="20" y="32" width="8" height="10" rx="1" fill="#4A6A7A" stroke="#3A5A6A" stroke-width="0.5"/>
        <circle cx="26" cy="38" r="0.8" fill="#B8B8BC"/>
        <rect x="8" y="18" width="32" height="2" rx="1" fill="rgba(255,255,255,0.2)"/>
      </svg>
      <span class="mk-tab-item__label">Home</span>
    </div>
    <div class="mk-tab-item" data-mk="tab-pharmacy">
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="mkt-mortar-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#8A8A8E"/><stop offset="40%" stop-color="#5A5A5E"/><stop offset="100%" stop-color="#3A3A3E"/>
          </linearGradient>
          <linearGradient id="mkt-pestle-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#9A9A9E"/><stop offset="100%" stop-color="#5A5A5E"/>
          </linearGradient>
        </defs>
        <path d="M10 26 C10 26 8 42 24 42 C40 42 38 26 38 26 Z" fill="url(#mkt-mortar-grad)" stroke="#4A4A4E" stroke-width="0.8"/>
        <ellipse cx="24" cy="26" rx="15" ry="4" fill="#7A7A7E" stroke="#5A5A5E" stroke-width="0.8"/>
        <ellipse cx="24" cy="25.5" rx="13" ry="2.5" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
        <ellipse cx="24" cy="43" rx="8" ry="2" fill="#4A4A4E"/>
        <ellipse cx="24" cy="28" rx="10" ry="3" fill="rgba(0,0,0,0.15)"/>
        <line x1="30" y1="10" x2="22" y2="24" stroke="url(#mkt-pestle-grad)" stroke-width="5" stroke-linecap="round"/>
        <line x1="29.5" y1="11" x2="23" y2="22" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" stroke-linecap="round"/>
        <ellipse cx="21" cy="25" rx="3.5" ry="2" fill="#6A6A6E" transform="rotate(-15 21 25)"/>
        <path d="M13 30 Q24 28 35 30" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" fill="none"/>
      </svg>
      <span class="mk-tab-item__label">Pharmacy</span>
    </div>
    <div class="mk-tab-item" data-mk="tab-medcalc">
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="mkt-calc-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#5A5A5E"/><stop offset="100%" stop-color="#2A2A2E"/>
          </linearGradient>
          <linearGradient id="mkt-calc-screen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#8BBF8A"/><stop offset="100%" stop-color="#6A9E6A"/>
          </linearGradient>
        </defs>
        <rect x="10" y="4" width="28" height="40" rx="3" fill="url(#mkt-calc-body)" stroke="#1A1A1E" stroke-width="0.8"/>
        <rect x="10" y="4" width="28" height="4" rx="3" fill="rgba(255,255,255,0.15)"/>
        <rect x="14" y="8" width="20" height="10" rx="1.5" fill="url(#mkt-calc-screen)" stroke="#4A7A4A" stroke-width="0.5"/>
        <text x="24" y="16" text-anchor="middle" font-size="9" font-weight="700" fill="#2A4A2A" font-family="serif">&#x3A3;</text>
        <rect x="14.5" y="8.5" width="12" height="2" rx="0.5" fill="rgba(255,255,255,0.25)"/>
        <rect x="14" y="22" width="5" height="4" rx="1" fill="#6A6A6E" stroke="#4A4A4E" stroke-width="0.3"/>
        <rect x="21" y="22" width="5" height="4" rx="1" fill="#6A6A6E" stroke="#4A4A4E" stroke-width="0.3"/>
        <rect x="28" y="22" width="5" height="4" rx="1" fill="#E8A040" stroke="#B87333" stroke-width="0.3"/>
        <rect x="14" y="28" width="5" height="4" rx="1" fill="#6A6A6E" stroke="#4A4A4E" stroke-width="0.3"/>
        <rect x="21" y="28" width="5" height="4" rx="1" fill="#6A6A6E" stroke="#4A4A4E" stroke-width="0.3"/>
        <rect x="28" y="28" width="5" height="4" rx="1" fill="#6A6A6E" stroke="#4A4A4E" stroke-width="0.3"/>
        <rect x="14" y="34" width="5" height="4" rx="1" fill="#6A6A6E" stroke="#4A4A4E" stroke-width="0.3"/>
        <rect x="21" y="34" width="5" height="4" rx="1" fill="#6A6A6E" stroke="#4A4A4E" stroke-width="0.3"/>
        <rect x="28" y="34" width="5" height="4" rx="1" fill="#4A8A4A" stroke="#3A6A3A" stroke-width="0.3"/>
        <rect x="14.5" y="22.5" width="4" height="1" rx="0.3" fill="rgba(255,255,255,0.2)"/>
        <rect x="21.5" y="22.5" width="4" height="1" rx="0.3" fill="rgba(255,255,255,0.2)"/>
        <rect x="28.5" y="22.5" width="4" height="1" rx="0.3" fill="rgba(255,255,255,0.2)"/>
      </svg>
      <span class="mk-tab-item__label">Med-Calc</span>
    </div>
  </nav>
`;

/** The dark gladstone doctor's bag logo — cursive green "my", copper base band */
const BAG_LOGO = `
  <svg class="mk-dashboard-header__logo" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="mkt-bag-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#55555C"/><stop offset="35%" stop-color="#33333A"/><stop offset="100%" stop-color="#141418"/>
      </linearGradient>
      <linearGradient id="mkt-bag-base" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#D08A45"/><stop offset="55%" stop-color="#B87333"/><stop offset="100%" stop-color="#8A5320"/>
      </linearGradient>
      <linearGradient id="mkt-bag-frame" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#4A4A50"/><stop offset="100%" stop-color="#202024"/>
      </linearGradient>
    </defs>
    <path d="M33 26 C33 14 63 14 63 26" stroke="#26262B" stroke-width="7" stroke-linecap="round" fill="none"/>
    <path d="M33 26 C33 17 63 17 63 26" stroke="rgba(255,255,255,0.18)" stroke-width="2" stroke-linecap="round" fill="none"/>
    <rect x="14" y="26" width="68" height="10" rx="5" fill="url(#mkt-bag-frame)"/>
    <path d="M15 34 C10 58 12 74 16 80 L80 80 C84 74 86 58 81 34 Z" fill="url(#mkt-bag-body)" stroke="#0C0C0F" stroke-width="1"/>
    <path d="M20 36 Q48 30 76 36 L74 44 Q48 39 22 44 Z" fill="rgba(255,255,255,0.10)"/>
    <rect x="42" y="30" width="12" height="16" rx="3" fill="#2C2C32" stroke="#111114" stroke-width="1"/>
    <path d="M45 46 L48 50 L51 46 Z" fill="#2C2C32"/>
    <rect x="13" y="76" width="70" height="12" rx="5" fill="url(#mkt-bag-base)" stroke="#6E3F14" stroke-width="0.8"/>
    <rect x="15" y="77" width="66" height="3" rx="1.5" fill="rgba(255,255,255,0.3)"/>
    <text x="48" y="68" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-weight="700" font-size="30" fill="#2E7D32" stroke="#174A1B" stroke-width="0.6">my</text>
  </svg>
`;

/** White plus-cross used inside recent-consult glass circles (real dashboard SVG path) */
const RECENT_CROSS = `<svg viewBox="0 0 24 24" class="mk-recent-item__cross" aria-hidden="true"><path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z" fill="currentColor"/></svg>`;

/** QR glyph for the Share & Install card */
const QR_ICON = `
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
    <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm10-2h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm4 0h2v2h-2v-2z"/>
  </svg>
`;

/** Consult flow header. Glyphs match consult-flow.ts exactly: ← ↺ title §x/y 🔗 🏠 */
function consultHeader(title: string, progress: string, gradient: string, extraAttrs = ''): string {
  return `
    <div class="mk-consult-header" style="background: ${gradient}">
      <span class="mk-consult-header__btn">←</span>
      <span class="mk-consult-header__btn">↺</span>
      <div class="mk-consult-header__title">${title}</div>
      <div class="mk-consult-header__progress" ${extraAttrs}>${progress}</div>
      <span class="mk-consult-header__btn">🔗</span>
      <span class="mk-consult-header__btn">🏠</span>
    </div>
  `;
}

/** DKA contextual toolbar — the real config (📊 Visual auto-prepended, 🛑 Stop auto-appended) */
const DKA_TOOLBAR = `
  <div class="mk-toolbar">
    <div class="mk-toolbar__item"><span class="mk-toolbar__icon">📊</span>Visual</div>
    <div class="mk-toolbar__item"><span class="mk-toolbar__icon">🧪</span>Anion Gap</div>
    <div class="mk-toolbar__item" data-mk="tool-insulin"><span class="mk-toolbar__icon">💉</span>IV Insulin</div>
    <div class="mk-toolbar__item"><span class="mk-toolbar__icon">💉</span>SC Insulin</div>
    <div class="mk-toolbar__item"><span class="mk-toolbar__icon">⚡</span>K Repletion</div>
    <div class="mk-toolbar__item"><span class="mk-toolbar__icon">💧</span>Fluids</div>
    <div class="mk-toolbar__item" data-mk="tool-stop"><span class="mk-toolbar__icon">🛑</span>Stop</div>
    <div class="mk-toolbar__item"><span class="mk-toolbar__icon">•••</span>More</div>
  </div>
`;

/* ------------------------------------------------------------ */
/* SCREEN 1 — Dashboard (Command Center)                          */
/* ------------------------------------------------------------ */

// Real category names + real decisionTrees.length counts from src/data/categories.ts,
// alphabetical (localeCompare) exactly as dashboard.ts sorts them.
const CATEGORIES: Array<{ name: string; count: number; grad: string; anchor?: string }> = [
  { name: 'Anesthesia / Airway', count: 9, grad: GRAD.anesthesia },
  { name: 'Cardiology', count: 24, grad: GRAD.cardiology, anchor: 'cat-cardiology' },
  { name: 'EM', count: 71, grad: GRAD.em },
  { name: 'GI (Gastroenterology)', count: 18, grad: GRAD.gi },
  { name: 'Heme/Onc', count: 11, grad: GRAD.hemeOnc },
  { name: 'Infectious Disease', count: 25, grad: GRAD.id },
  { name: 'Nephrology / Rheumatology / Endocrinology', count: 16, grad: GRAD.nephro },
  { name: 'Neurology/Neurosurgery', count: 35, grad: GRAD.neuro },
  { name: 'OB/GYN', count: 19, grad: GRAD.obgyn },
  { name: 'Ophthalmology', count: 14, grad: GRAD.ophtho },
  { name: 'Ortho', count: 11, grad: GRAD.ortho },
  { name: 'Pediatrics', count: 31, grad: GRAD.peds },
  { name: 'Pharmacist', count: 14, grad: GRAD.pharmacist },
  { name: 'Procedures', count: 28, grad: GRAD.procedures },
  { name: 'Psychiatry', count: 23, grad: GRAD.psych },
  { name: 'Pulm/Critical Care', count: 16, grad: GRAD.criticalCare },
  { name: 'Toxicology', count: 22, grad: GRAD.tox },
  { name: 'Trauma/Surg', count: 16, grad: GRAD.trauma },
  { name: 'U/S-Rads', count: 4, grad: GRAD.usRads },
  { name: 'Urology', count: 5, grad: GRAD.urology },
];

const RECENTS: Array<{ label: string; grad: string; anchor?: string }> = [
  { label: 'DKA', grad: GRAD.em, anchor: 'recent-dka' },
  { label: 'Sepsis', grad: GRAD.criticalCare },
  { label: 'Ischemic Stroke', grad: GRAD.neuro },
  { label: 'A-Fib RVR', grad: GRAD.cardiology },
];

export function renderMKDashboard(): HTMLElement {
  const categoryCards = CATEGORIES.map(
    (c) => `
      <div class="mk-category-card" style="background: ${c.grad}" ${c.anchor ? `data-mk="${c.anchor}"` : ''}>
        <div class="mk-category-card__content">
          <div class="mk-category-card__name">${c.name}</div>
          <div class="mk-category-card__count">${c.count} consults</div>
        </div>
      </div>`
  ).join('');

  const recentItems = RECENTS.map(
    (r) => `
      <div class="mk-recent-item" ${r.anchor ? `data-mk="${r.anchor}"` : ''}>
        <div class="mk-recent-item__icon" style="background: ${r.grad}">${RECENT_CROSS}</div>
        <span class="mk-recent-item__label">${r.label}</span>
      </div>`
  ).join('');

  return el(`
    ${LEGAL_BANNER}
    <div class="mk-dashboard">
      <div class="mk-dashboard-header">
        ${BAG_LOGO}
        <span class="mk-dashboard-header__title"><em class="mk-dashboard-header__title-my">my</em>MedKitt</span>
      </div>

      <div class="mk-hero-search" data-mk="search">
        <div class="mk-hero-search__field">
          <span class="mk-hero-search__icon">🔍</span>
          <span class="mk-hero-search__placeholder">Search consults, drugs, calculators…</span>
        </div>
      </div>

      <div class="mk-recents">
        <div class="mk-recents__title">Recent</div>
        <div class="mk-recents__scroll">${recentItems}</div>
      </div>

      <div class="mk-hubs-card" data-mk="hubs">
        <div class="mk-hubs-card__badge">NEW</div>
        <div class="mk-hubs-card__title">Chief Complaint Hubs</div>
        <div class="mk-hubs-card__sub">Triage by chief complaint: sick check, exclusions, rescue, imaging, disposition.</div>
        <div class="mk-hubs-card__arrow">→</div>
      </div>
      <div class="mk-tricks-card">
        <div class="mk-tricks-card__badge">NEW</div>
        <div class="mk-tricks-card__title">Tricks of the Trade</div>
        <div class="mk-tricks-card__sub">Clever bedside techniques by specialty: what it does, how to do it, what you need.</div>
        <div class="mk-tricks-card__arrow">→</div>
      </div>
      <div class="mk-learn-card">
        <div class="mk-learn-card__badge">NEW</div>
        <div class="mk-learn-card__title">MedKitt Learn</div>
        <div class="mk-learn-card__sub">Clinical rotation mode for medical students — Psychiatry available now.</div>
        <div class="mk-learn-card__arrow">→</div>
      </div>

      <div class="mk-categories">${categoryCards}</div>

      <div class="mk-share-card">
        <div class="mk-share-card__icon">${QR_ICON}</div>
        <div class="mk-share-card__body">
          <div class="mk-share-card__title">Share &amp; Install</div>
          <div class="mk-share-card__sub">Show the QR code so anyone can scan to install myMedKitt on their phone.</div>
        </div>
        <div class="mk-share-card__arrow">→</div>
      </div>

      <p class="mk-dashboard-disclaimer">This tool is for educational and clinical decision support purposes only. It does not replace clinical judgment.</p>
    </div>
    ${TAB_BAR}
  `);
}

/* ------------------------------------------------------------ */
/* SCREEN 2 — DKA consult, decision tree in progress              */
/* ------------------------------------------------------------ */

export function renderMKConsult(): HTMLElement {
  return el(`
    ${LEGAL_BANNER}
    ${consultHeader('DKA', '§2/4', GRAD.em, 'data-mk="progress"')}
    <div class="mk-card-stack">

      <div class="mk-decision-card mk-decision-card--answered">
        <div class="mk-answered-pill mk-answered-pill--critical-border" data-mk="trail">
          <span class="mk-answered-pill__q">Suspected Diabetic Ketoacidosis — Diagnosis</span>
          <span class="mk-answered-pill__arrow">→</span>
          <span class="mk-answered-pill__a mk-answered-pill__a--critical">Confirmed DKA</span>
        </div>
      </div>

      <div class="mk-decision-card mk-decision-card--answered">
        <div class="mk-answered-pill">
          <span class="mk-answered-pill__q">β-Hydroxybutyrate Interpretation</span>
          <span class="mk-answered-pill__arrow">→</span>
          <span class="mk-answered-pill__a">BOHB &gt;3 mmol/L</span>
        </div>
      </div>

      <div class="mk-decision-card mk-decision-card--active" data-mk="active-card">
        <div class="mk-safety-banner mk-safety-banner--critical">
          <span class="mk-safety-banner__icon">⚠️</span>
          <span class="mk-safety-banner__text">Life-threatening metabolic emergency</span>
        </div>
        <div class="mk-decision-card__title">DKA Severity Classification</div>
        <div class="mk-card-summary">Classify by pH/HCO3/BOHB: mild (7.25-7.30), moderate (7.00-7.24), severe (&lt;7.00). Severe = ICU.</div>

        <div class="mk-accordion">
          <div class="mk-accordion__trigger">▸ More detail</div>
        </div>

        <div class="mk-decision-card__options">
          <div class="mk-btn-3d">
            <span class="mk-btn-3d__label">Mild DKA</span>
            <span class="mk-btn-3d__desc">pH 7.25-7.30, HCO3 15-18, alert and oriented</span>
          </div>
          <div class="mk-btn-3d mk-btn-3d--urgent">
            <span class="mk-btn-3d__label">Moderate DKA</span>
            <span class="mk-btn-3d__desc">pH 7.00-7.24, HCO3 10-14</span>
          </div>
          <div class="mk-btn-3d mk-btn-3d--critical" data-mk="option-severe">
            <span class="mk-btn-3d__label">Severe DKA</span>
            <span class="mk-btn-3d__desc">pH &lt;7.00, HCO3 &lt;10, or altered mental status</span>
          </div>
        </div>
      </div>
    </div>
    ${DKA_TOOLBAR}
  `);
}

/* ------------------------------------------------------------ */
/* SCREEN 3 — Pharmacy bottom-sheet: Insulin Regular (DKA)        */
/* ------------------------------------------------------------ */

export function renderMKDrugModal(): HTMLElement {
  return el(`
    <div class="mk-modal-backdrop">
      ${consultHeader('DKA', '§2/4', GRAD.em)}
      <div class="mk-card-stack">
        <div class="mk-decision-card mk-decision-card--answered">
          <div class="mk-answered-pill mk-answered-pill--critical-border">
            <span class="mk-answered-pill__q">DKA Severity Classification</span>
            <span class="mk-answered-pill__arrow">→</span>
            <span class="mk-answered-pill__a mk-answered-pill__a--critical">Severe DKA</span>
          </div>
        </div>
      </div>
    </div>
    <div class="mk-modal-overlay">
      <div class="mk-modal-content">
        <div class="mk-modal-header">
          <div>
            <div class="mk-modal-header__title">Insulin Regular (Short-Acting)</div>
            <div class="mk-modal-header__subtitle">Short-acting human insulin</div>
          </div>
          <span class="mk-modal-header__close" data-mk="close">✕</span>
        </div>
        <div class="mk-modal-body">
          <span class="mk-route-badge" data-mk="route">IV/SC</span>

          <div class="mk-info-section">
            <div class="mk-info-section__heading">Dosing</div>

            <div class="mk-drug-card mk-drug-card--linked">
              <div class="mk-drug-card__name">DKA (adult)</div>
              <div class="mk-drug-card__regimen">
                <span class="mk-dose-calc-link">0.1 units/kg</span> IV bolus, then 0.1 units/kg/hr continuous
                infusion. Bolus is OPTIONAL — many protocols (and 2024 ADA consensus) skip the bolus and start
                the infusion at 0.14 units/kg/hr.
              </div>
              <span class="mk-dose-pin-btn">📌 Pin dose</span>

              <div class="mk-dose-calc-panel">
                <div class="mk-dose-calc-mode-row">
                  <span class="mk-dose-calc-mode-btn mk-dose-calc-mode-btn--active">Known weight</span>
                  <span class="mk-dose-calc-mode-btn" data-mk="broselow">Broselow</span>
                  <span class="mk-dose-calc-mode-btn">Age est.</span>
                </div>
                <div class="mk-dose-calc-input-row">
                  <span class="mk-dose-calc-input">80</span>
                  <span class="mk-dose-calc-unit">kg</span>
                  <span class="mk-dose-calc-go-btn">Calculate</span>
                </div>
                <div class="mk-dose-calc-results">
                  <div class="mk-dose-calc-weight-summary">80 kg patient</div>
                  <div class="mk-dose-calc-result-row">
                    <div class="mk-dose-calc-result-label">IV bolus (optional)</div>
                    <div class="mk-dose-calc-result-value">8 units</div>
                    <div class="mk-dose-calc-result-detail">0.1 units/kg × 80 kg</div>
                  </div>
                  <div class="mk-dose-calc-result-row" data-mk="dose-result">
                    <div class="mk-dose-calc-result-label">Per hour infusion</div>
                    <div class="mk-dose-calc-result-value">8 units/hr</div>
                    <div class="mk-dose-calc-result-detail">0.1 units/kg/hr × 80 kg</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mk-drug-card">
              <div class="mk-drug-card__name">Severe hyperkalemia (acute)</div>
              <div class="mk-drug-card__regimen">10 units IV regular insulin WITH 25 g dextrose (50 mL of D50W)
                IV — give dextrose first or simultaneously to prevent hypoglycemia. Onset 15–30 min.</div>
            </div>
          </div>

          <div class="mk-citations">
            <div class="mk-citations__summary">▸ References</div>
          </div>
        </div>
      </div>
    </div>
  `);
}

/* ------------------------------------------------------------ */
/* SCREEN 4 — Result node with confidence badge (DKA endpoint)    */
/* ------------------------------------------------------------ */

export function renderMKResult(): HTMLElement {
  return el(`
    ${LEGAL_BANNER}
    ${consultHeader('DKA', '§4/4', GRAD.em)}
    <div class="mk-card-stack">

      <div class="mk-decision-card mk-decision-card--answered">
        <div class="mk-answered-pill mk-answered-pill--critical-border">
          <span class="mk-answered-pill__q">Suspected Diabetic Ketoacidosis — Diagnosis</span>
          <span class="mk-answered-pill__arrow">→</span>
          <span class="mk-answered-pill__a mk-answered-pill__a--critical">Confirmed DKA</span>
        </div>
      </div>
      <div class="mk-decision-card mk-decision-card--answered">
        <div class="mk-answered-pill mk-answered-pill--critical-border">
          <span class="mk-answered-pill__q">DKA Severity Classification</span>
          <span class="mk-answered-pill__arrow">→</span>
          <span class="mk-answered-pill__a mk-answered-pill__a--critical">Severe DKA</span>
        </div>
      </div>
      <div class="mk-decision-card mk-decision-card--answered">
        <div class="mk-answered-pill mk-answered-pill--warning-border">
          <span class="mk-answered-pill__q">Special Populations &amp; Risk Factors</span>
          <span class="mk-answered-pill__arrow">→</span>
          <span class="mk-answered-pill__a">Standard Risk</span>
        </div>
      </div>

      <div class="mk-decision-card mk-decision-card--active mk-decision-card--result">
        <div class="mk-result-badge-row">
          <span class="mk-result-check" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>
          </span>
          <span class="mk-result-badge mk-result-badge--definitive" data-mk="badge">Definitive</span>
        </div>
        <div class="mk-decision-card__title">Begin IV Insulin Infusion</div>
        <div class="mk-decision-card__body">
          <p>Start <span class="mk-body-inline-link">Insulin Regular</span>
          <span class="mk-dose-highlight mk-dose-highlight--standard" data-mk="dose-chip">0.1 units/kg/hr IV</span> —
          hold if K &lt;3.3 mEq/L until potassium replaced. Target glucose drop 50–75 mg/dL/hr.</p>
        </div>
        <div class="mk-result-actions">
          <span class="mk-btn-text">📚 References</span>
          <span class="mk-btn-text">🏠 Home</span>
        </div>
      </div>
    </div>
    ${DKA_TOOLBAR}
  `);
}

/* ------------------------------------------------------------ */
/* SCREEN 5 — Steps Summary overlay (Ischemic Stroke)             */
/* ------------------------------------------------------------ */

export function renderMKSummary(): HTMLElement {
  return el(`
    <div class="mk-modal-backdrop">
      ${consultHeader('Ischemic Stroke', '§1/5', GRAD.neuro)}
      <div class="mk-card-stack"></div>
    </div>
    <div class="mk-modal-overlay">
      <div class="mk-modal-content mk-modal-content--tall">
        <div class="mk-modal-header">
          <div>
            <div class="mk-modal-header__title">Ischemic Stroke Steps Summary</div>
            <div class="mk-modal-header__subtitle">Time-critical reperfusion pathway — every minute counts</div>
          </div>
          <span class="mk-modal-header__close">✕</span>
        </div>
        <div class="mk-modal-body">
          <div class="mk-info-section">
            <div class="mk-info-section__heading">1. Immediate Actions</div>
            <p class="mk-info-section__text">
              • <span class="mk-body-inline-link" data-mk="steps-link">Fingerstick glucose (only required pre-tPA lab)</span><br>
              • <span class="mk-body-inline-link">NIHSS score — disabling if ≥6</span><br>
              • <span class="mk-body-inline-link">Establish last known well time</span><br>
              • <span class="mk-body-inline-link">CT head non-contrast to rule out hemorrhage</span>
            </p>
          </div>
          <div class="mk-info-section" data-mk="ivt">
            <div class="mk-info-section__heading">2. Standard IVT Window (0–4.5h)</div>
            <p class="mk-info-section__text">
              • <span class="mk-body-inline-link">Review thrombolysis contraindications — BP must be &lt;185/110</span><br>
              • <span class="mk-body-inline-link">Tenecteplase 0.25 mg/kg IV bolus (preferred) or Alteplase 0.9 mg/kg</span><br>
              • <span class="mk-body-inline-link">Post-tPA: BP &lt;180/105 × 24h, neuro checks q15min, no antithrombotics × 24h</span>
            </p>
          </div>
          <div class="mk-info-section">
            <div class="mk-info-section__heading">3. Extended Window + EVT</div>
            <p class="mk-info-section__text">
              • <span class="mk-body-inline-link">4.5–9h → perfusion imaging for IVT eligibility (EXTEND criteria)</span><br>
              • <span class="mk-body-inline-link">LVO on CTA → activate neurointerventional team for EVT</span><br>
              • <span class="mk-body-inline-link">EVT window up to 24h with LVO + favorable perfusion (DAWN/DEFUSE-3)</span>
            </p>
          </div>
          <div class="mk-info-section">
            <div class="mk-info-section__heading">4. Minor Stroke (NIHSS 0–5)</div>
            <p class="mk-info-section__text">
              • <span class="mk-body-inline-link">DAPT: Aspirin 325 mg + Clopidogrel 300 mg load</span>
            </p>
          </div>
          <div class="mk-info-section">
            <div class="mk-info-section__heading">5. Secondary Prevention</div>
            <p class="mk-info-section__text">
              • <span class="mk-body-inline-link">DOAC for AF, CEA within 2 weeks, high-intensity statin, BP &lt;130/80</span>
            </p>
          </div>
          <div class="mk-citations">
            <div class="mk-citations__summary">▸ References</div>
            <div class="mk-citations__body">1. Powers WJ, et al. 2019 Guidelines for Early Management of Acute Ischemic Stroke. Stroke. 2019.</div>
          </div>
        </div>
      </div>
    </div>
  `);
}

/* ------------------------------------------------------------ */
/* SCREEN 6 — 📊 Visual interactive infographic overlay (DKA)     */
/* ------------------------------------------------------------ */

export function renderMKVisual(): HTMLElement {
  return el(`
    <div class="mk-infographic-overlay">
      <div class="mk-infographic-panel">
        <div class="mk-infographic-panel__header">
          <div class="mk-infographic-panel__title" data-mk="ig-title">DKA — Interactive Infographic</div>
          <span class="mk-infographic-panel__close">✕</span>
        </div>
        <div class="mk-infographic-frame">
          <div class="mk-ig-hero">
            <div class="mk-ig-hero__eyebrow">EMERGENCY MEDICINE</div>
            <div class="mk-ig-hero__title">Diabetic Ketoacidosis</div>
            <div class="mk-ig-hero__sub">Diagnosis → Severity → Fluids · Insulin · Potassium</div>
          </div>
          <div class="mk-ig-triad">
            <div class="mk-ig-triad__item">
              <div class="mk-ig-triad__value">&gt;200</div>
              <div class="mk-ig-triad__label">Glucose mg/dL<br>(euglycemic on SGLT2i)</div>
            </div>
            <div class="mk-ig-triad__plus">+</div>
            <div class="mk-ig-triad__item">
              <div class="mk-ig-triad__value">&gt;3</div>
              <div class="mk-ig-triad__label">BOHB mmol/L<br>ketonemia</div>
            </div>
            <div class="mk-ig-triad__plus">+</div>
            <div class="mk-ig-triad__item">
              <div class="mk-ig-triad__value">&lt;7.3</div>
              <div class="mk-ig-triad__label">pH or HCO3 &lt;18<br>acidosis</div>
            </div>
          </div>
          <div class="mk-ig-pillars">
            <div class="mk-ig-pillar mk-ig-pillar--fluids">
              <div class="mk-ig-pillar__head">💧 FLUIDS</div>
              <div class="mk-ig-pillar__body">0.9% NS 15–20 mL/kg first hour</div>
            </div>
            <div class="mk-ig-pillar mk-ig-pillar--insulin">
              <div class="mk-ig-pillar__head">💉 INSULIN</div>
              <div class="mk-ig-pillar__body">0.1 units/kg/hr IV — hold if K &lt;3.3</div>
            </div>
            <div class="mk-ig-pillar mk-ig-pillar--k">
              <div class="mk-ig-pillar__head">⚡ POTASSIUM</div>
              <div class="mk-ig-pillar__body">K 3.3–5.3 → add 20–30 mEq/L to fluids</div>
            </div>
          </div>
          <div class="mk-ig-footnote">Tap any node in the live infographic to expand doses, evidence, and pitfalls.</div>
        </div>
      </div>
    </div>
  `);
}
