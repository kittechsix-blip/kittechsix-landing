// MyTravelMedKitt — iOS-native aesthetic clone (SwiftUI app, mocked in HTML).
// Faithful to ~/Desktop/MyTravelMedKitt/MyTravelMedKitt/Views/.

const STATUSBAR = `
  <div class="tm-statusbar">
    <span>9:41</span>
    <div class="tm-statusbar__icons"><span>●●●</span><span>📶</span><span>🔋</span></div>
  </div>
`;

const TABBAR = `
  <nav class="tm-tabbar">
    <div class="tm-tabbar__item active">
      <span class="tm-tabbar__icon" style="color:#007AFF;">🏠</span>
      <span class="tm-tabbar__label">Home</span>
    </div>
    <div class="tm-tabbar__item">
      <span class="tm-tabbar__icon">🧳</span>
      <span class="tm-tabbar__label">Trips</span>
    </div>
    <div class="tm-tabbar__item">
      <span class="tm-tabbar__icon">💊</span>
      <span class="tm-tabbar__label">Kit</span>
    </div>
    <div class="tm-tabbar__item">
      <span class="tm-tabbar__icon">👤</span>
      <span class="tm-tabbar__label">Profile</span>
    </div>
  </nav>
`;

export function renderTMHome(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'tm-screen';
  el.innerHTML = `
    ${STATUSBAR}
    <div class="tm-nav-large">
      <div class="tm-nav-large__title">My Trips</div>
    </div>

    <div class="tm-content">
      <div class="tm-trip-card" data-tm="trip-card">
        <div class="tm-trip-card__row1">✈️ ACTIVE TRIP</div>
        <div class="tm-trip-card__dest">Mexico City</div>
        <div class="tm-trip-card__dates">May 12 – May 19, 2026 · 3 destinations</div>
      </div>

      <div class="tm-action-row">
        <div class="tm-action-btn" data-tm="btn-trip-prep">
          <div class="tm-action-btn__icon">📋</div>
          <div class="tm-action-btn__label">Trip Prep</div>
        </div>
        <div class="tm-action-btn" data-tm="btn-symptoms">
          <div class="tm-action-btn__icon">🤒</div>
          <div class="tm-action-btn__label">Check Symptoms</div>
        </div>
      </div>

      <div class="tm-section-title">Recent Treatments</div>
      <div class="tm-list-item" data-tm="recent-1">
        <div class="tm-list-item__icon">💊</div>
        <div class="tm-list-item__text">
          <div class="tm-list-item__label">Loperamide 4mg</div>
          <div class="tm-list-item__sub">Yesterday · Travelers' diarrhea</div>
        </div>
        <div class="tm-list-item__chevron">›</div>
      </div>
      <div class="tm-list-item">
        <div class="tm-list-item__icon">💊</div>
        <div class="tm-list-item__text">
          <div class="tm-list-item__label">Bismuth subsalicylate</div>
          <div class="tm-list-item__sub">May 10 · Upset stomach</div>
        </div>
        <div class="tm-list-item__chevron">›</div>
      </div>

      <div class="tm-disclaimer" data-tm="disclaimer">
        For educational use. Not a substitute for medical advice.
      </div>
    </div>
    ${TABBAR}
  `;
  return el;
}

export function renderTMTripPrep(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'tm-screen';
  el.innerHTML = `
    ${STATUSBAR}
    <div class="tm-nav-large">
      <div class="tm-nav-large__title">Trip Prep</div>
    </div>

    <div class="tm-content">
      <div class="tm-section-title" data-tm="dest-h">Destinations (3)</div>
      <div class="tm-card" data-tm="dest-card">
        <div class="tm-checkrow checked"><div class="tm-checkrow__box">✓</div>
          <div><div class="tm-checkrow__label">🇲🇽 Mexico City — Urban</div><div class="tm-checkrow__sub">May 12–14</div></div></div>
        <div class="tm-checkrow checked"><div class="tm-checkrow__box">✓</div>
          <div><div class="tm-checkrow__label">🇲🇽 Tulum — Beach</div><div class="tm-checkrow__sub">May 14–17</div></div></div>
        <div class="tm-checkrow checked"><div class="tm-checkrow__box">✓</div>
          <div><div class="tm-checkrow__label">🇵🇪 Cusco — Hiking</div><div class="tm-checkrow__sub">May 17–19</div></div></div>
      </div>

      <div class="tm-alert" data-tm="alert">
        <strong>Altitude warning</strong>
        Cusco elevation 11,150 ft — start acetazolamide 24h before arrival, hydrate, avoid alcohol on day 1.
      </div>

      <div class="tm-section-title" data-tm="vacc-h">Recommended Vaccines</div>
      <div class="tm-card" data-tm="vacc-card">
        <div class="tm-checkrow checked"><div class="tm-checkrow__box">✓</div>
          <div><div class="tm-checkrow__label">Hepatitis A</div></div></div>
        <div class="tm-checkrow checked"><div class="tm-checkrow__box">✓</div>
          <div><div class="tm-checkrow__label">Typhoid</div></div></div>
        <div class="tm-checkrow"><div class="tm-checkrow__box"></div>
          <div><div class="tm-checkrow__label">Yellow fever</div><div class="tm-checkrow__sub">Required for Cusco re-entry to some countries</div></div></div>
      </div>

      <div class="tm-section-title" data-tm="meds-h">Med Plan</div>
      <div class="tm-card" data-tm="meds-card">
        <div class="tm-checkrow checked"><div class="tm-checkrow__box">✓</div>
          <div><div class="tm-checkrow__label">Loperamide 2mg PO PRN</div><div class="tm-checkrow__sub">Travelers' diarrhea</div></div></div>
        <div class="tm-checkrow checked"><div class="tm-checkrow__box">✓</div>
          <div><div class="tm-checkrow__label">Acetazolamide 125mg BID</div><div class="tm-checkrow__sub">Altitude — start 24h before Cusco</div></div></div>
        <div class="tm-checkrow"><div class="tm-checkrow__box"></div>
          <div><div class="tm-checkrow__label">DEET-30 insect repellent</div><div class="tm-checkrow__sub">Beach segment</div></div></div>
      </div>
    </div>
    ${TABBAR}
  `;
  return el;
}

export function renderTMKit(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'tm-screen';
  el.innerHTML = `
    ${STATUSBAR}
    <div class="tm-nav-large">
      <div class="tm-nav-large__title">Kit Builder</div>
    </div>

    <div class="tm-search" data-tm="search">
      <span>🔍</span>
      <span class="tm-search__input">Search OTC drugs…</span>
    </div>

    <div class="tm-content">
      <div class="tm-section-title">Drugs in Your Kit (5)</div>
      <div class="tm-list-item" data-tm="drug-1">
        <div class="tm-list-item__icon">💊</div>
        <div class="tm-list-item__text">
          <div class="tm-list-item__label">Loperamide 2mg</div>
          <div class="tm-list-item__sub">Diarrhea · 12 tablets packed</div>
        </div>
        <div class="tm-list-item__chevron">›</div>
      </div>
      <div class="tm-list-item">
        <div class="tm-list-item__icon">💊</div>
        <div class="tm-list-item__text">
          <div class="tm-list-item__label">Acetazolamide 125mg</div>
          <div class="tm-list-item__sub">Altitude · 8 tablets</div>
        </div>
        <div class="tm-list-item__chevron">›</div>
      </div>

      <div class="tm-dosing-card" data-tm="dosing-card">
        <div class="tm-dosing-card__name">Loperamide 2mg</div>
        <div class="tm-dosing-card__regimen">Adult: 4mg loading, 2mg after each loose stool. Max 16mg/24hr.</div>
        <div class="tm-checkrow" data-tm="dosing-weight">
          <div class="tm-checkrow__label">Weight (optional): __ kg</div>
        </div>
        <div class="tm-add-btn" data-tm="add-to-kit">+ Add 12 to kit</div>
      </div>

      <div class="tm-section-title">Suggested for Mexico</div>
      <div class="tm-list-item">
        <div class="tm-list-item__icon">💊</div>
        <div class="tm-list-item__text">
          <div class="tm-list-item__label">Bismuth subsalicylate</div>
          <div class="tm-list-item__sub">Upset stomach · Recommended</div>
        </div>
        <div class="tm-list-item__chevron">›</div>
      </div>
    </div>
    ${TABBAR}
  `;
  return el;
}

export function renderTMSymptom(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'tm-screen';
  el.innerHTML = `
    ${STATUSBAR}
    <div class="tm-nav-large">
      <div class="tm-nav-large__title">Symptom Checker</div>
    </div>

    <div class="tm-q-title" data-tm="q-title">What's bothering you?</div>
    <div class="tm-q-body">Tap the closest match. We'll narrow it down with follow-up questions.</div>

    <div class="tm-q-options" style="padding:0 16px;">
      <div class="tm-q-option tm-q-option--primary" data-tm="q-option-1">🤢 Stomach / GI</div>
      <div class="tm-q-option" data-tm="q-option-2">🤧 Cold / Flu / Fever</div>
      <div class="tm-q-option">🌞 Sun / Skin</div>
      <div class="tm-q-option">🩹 Cuts / Wounds</div>
      <div class="tm-q-option">😴 Sleep / Jet Lag</div>
      <div class="tm-q-option">⛰️ Altitude</div>
    </div>

    <div class="tm-disclaimer" data-tm="q-disclaimer">
      Educational only · Seek care if symptoms are severe or persistent.
    </div>
    ${TABBAR}
  `;
  return el;
}

export function renderTMProfile(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'tm-screen';
  el.innerHTML = `
    ${STATUSBAR}
    <div class="tm-nav-large">
      <div class="tm-nav-large__title">Profile</div>
    </div>

    <div class="tm-content">
      <div class="tm-section-title" data-tm="trips-h">Trips</div>
      <div class="tm-list-item" data-tm="trip-history">
        <div class="tm-list-item__icon">✈️</div>
        <div class="tm-list-item__text">
          <div class="tm-list-item__label">Mexico City — Active</div>
          <div class="tm-list-item__sub">May 12 – 19</div>
        </div>
        <div class="tm-list-item__chevron">›</div>
      </div>
      <div class="tm-list-item">
        <div class="tm-list-item__icon">✈️</div>
        <div class="tm-list-item__text">
          <div class="tm-list-item__label">Costa Rica</div>
          <div class="tm-list-item__sub">Jan 4 – 12, 2026</div>
        </div>
        <div class="tm-list-item__chevron">›</div>
      </div>

      <div class="tm-section-title" data-tm="allergies-h">Allergies</div>
      <div class="tm-list-item" data-tm="allergies">
        <div class="tm-list-item__icon" style="background:rgba(255,59,48,0.12);color:#FF3B30;">⚠</div>
        <div class="tm-list-item__text">
          <div class="tm-list-item__label">Penicillin</div>
          <div class="tm-list-item__sub">Hives — moderate</div>
        </div>
        <div class="tm-list-item__chevron">›</div>
      </div>

      <div class="tm-section-title">Treatment Log</div>
      <div class="tm-list-item" data-tm="log">
        <div class="tm-list-item__icon">📋</div>
        <div class="tm-list-item__text">
          <div class="tm-list-item__label">View 14 entries</div>
          <div class="tm-list-item__sub">Last 90 days</div>
        </div>
        <div class="tm-list-item__chevron">›</div>
      </div>

      <div class="tm-section-title">Settings</div>
      <div class="tm-list-item" data-tm="settings">
        <div class="tm-list-item__icon">⚙️</div>
        <div class="tm-list-item__text">
          <div class="tm-list-item__label">Privacy &amp; Sync</div>
        </div>
        <div class="tm-list-item__chevron">›</div>
      </div>
    </div>
    ${TABBAR}
  `;
  return el;
}
