// myMedKitt UI clone — DOM-faithful to ~/Desktop/myMedKitt/src/views/style.css tokens.
// Each function returns the screen's root element. Anchored selectors live in the tour config.

export function renderMKDashboard(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'mk-screen';
  el.innerHTML = `
    <div class="mk-dashboard">
      <header class="mk-header" data-mk="header">
        <div class="mk-header__logo" data-mk="logo">MK</div>
        <div class="mk-header__title">myMedKitt</div>
      </header>

      <div class="mk-search" data-mk="search">
        <span class="mk-search__icon">🔍</span>
        <span class="mk-search__input">Search consults, drugs, calculators…</span>
      </div>

      <section class="mk-recents" data-mk="recents">
        <div class="mk-recents__title">Recent</div>
        <div class="mk-recents__row">
          <div class="mk-recent-item" data-mk="recent-1">
            <div class="mk-recent-item__icon" style="background:linear-gradient(135deg,#B91C1C,#7F1D1D);">+</div>
            <span class="mk-recent-item__label">A-Fib RVR</span>
          </div>
          <div class="mk-recent-item">
            <div class="mk-recent-item__icon" style="background:linear-gradient(135deg,#6D28D9,#4C1D95);">+</div>
            <span class="mk-recent-item__label">Stroke</span>
          </div>
          <div class="mk-recent-item">
            <div class="mk-recent-item__icon" style="background:linear-gradient(135deg,#047857,#064E3B);">+</div>
            <span class="mk-recent-item__label">Meningitis</span>
          </div>
          <div class="mk-recent-item">
            <div class="mk-recent-item__icon" style="background:linear-gradient(135deg,#DC2626,#991B1B);">+</div>
            <span class="mk-recent-item__label">Burns</span>
          </div>
        </div>
      </section>

      <div class="mk-categories">
        <button class="mk-cat-card mk-cat-card--cardiology" data-mk="cat-cardiology">
          <span class="mk-cat-card__name">Cardiology</span>
          <span class="mk-cat-card__count">5 consults</span>
        </button>
        <button class="mk-cat-card mk-cat-card--em" data-mk="cat-em">
          <span class="mk-cat-card__name">Emergency Medicine</span>
          <span class="mk-cat-card__count">8 consults</span>
        </button>
        <button class="mk-cat-card mk-cat-card--neurology">
          <span class="mk-cat-card__name">Neurology</span>
          <span class="mk-cat-card__count">3 consults</span>
        </button>
        <button class="mk-cat-card mk-cat-card--id">
          <span class="mk-cat-card__name">Infectious Disease</span>
          <span class="mk-cat-card__count">4 consults</span>
        </button>
        <button class="mk-cat-card mk-cat-card--peds">
          <span class="mk-cat-card__name">Pediatrics</span>
          <span class="mk-cat-card__count">3 consults</span>
        </button>
        <button class="mk-cat-card mk-cat-card--medcalc">
          <span class="mk-cat-card__name">Med-Calc</span>
          <span class="mk-cat-card__count">28 calculators</span>
        </button>
      </div>
    </div>

    <nav class="mk-tabbar" data-mk="tabbar">
      <div class="mk-tabbar__item" data-mk="tab-home">
        <span class="mk-tabbar__icon">🏠</span>
        <span class="mk-tabbar__label">Home</span>
      </div>
      <div class="mk-tabbar__item" data-mk="tab-pharmacy">
        <span class="mk-tabbar__icon">💊</span>
        <span class="mk-tabbar__label">Pharmacy</span>
      </div>
      <div class="mk-tabbar__item" data-mk="tab-medcalc">
        <span class="mk-tabbar__icon">🧮</span>
        <span class="mk-tabbar__label">Med-Calc</span>
      </div>
    </nav>
  `;
  return el;
}

export function renderMKSpecialty(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'mk-screen';
  el.innerHTML = `
    <header class="mk-specialty-header">
      <div class="mk-icon-btn" data-mk="back">←</div>
      <div class="mk-specialty-title">Cardiology</div>
      <div class="mk-icon-btn" data-mk="search">🔍</div>
      <div class="mk-icon-btn" data-mk="home">🏠</div>
    </header>
    <div class="mk-specialty-list">
      <button class="mk-consult-btn" data-mk="consult-afib">A-Fib RVR Management</button>
      <button class="mk-consult-btn">NSTEMI</button>
      <button class="mk-consult-btn">Syncope Evaluation</button>
      <button class="mk-consult-btn">PE Treatment</button>
      <button class="mk-consult-btn">Cardiogenic Shock</button>
    </div>
    <nav class="mk-tabbar">
      <div class="mk-tabbar__item"><span class="mk-tabbar__icon">🏠</span><span class="mk-tabbar__label">Home</span></div>
      <div class="mk-tabbar__item"><span class="mk-tabbar__icon">💊</span><span class="mk-tabbar__label">Pharmacy</span></div>
      <div class="mk-tabbar__item"><span class="mk-tabbar__icon">🧮</span><span class="mk-tabbar__label">Med-Calc</span></div>
    </nav>
  `;
  return el;
}

export function renderMKConsult(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'mk-screen';
  el.innerHTML = `
    <header class="mk-consult-header">
      <div class="mk-icon-btn" data-mk="c-back">↑</div>
      <div class="mk-icon-btn" data-mk="c-reset">↺</div>
      <div class="mk-consult-header__title">A-Fib RVR Management</div>
      <span class="mk-consult-progress" data-mk="c-progress">2/12</span>
      <div class="mk-icon-btn" data-mk="c-search">🔍</div>
      <div class="mk-icon-btn" data-mk="c-home">🏠</div>
    </header>

    <div class="mk-consult-body">
      <div class="mk-answered-pill" data-mk="c-answered">
        <span class="mk-answered-pill__q">Initial Assessment</span>
        <span>→</span>
        <span class="mk-answered-pill__a">Reviewed</span>
      </div>

      <article class="mk-decision-card" data-mk="c-card">
        <h2 class="mk-decision-card__title">Hemodynamic Stability</h2>
        <p class="mk-decision-card__body">
          Assess for signs of decompensation: hypotension (SBP &lt; 90), altered mental status,
          ischemic chest pain, or acute heart failure.<span class="mk-decision-card__cite" data-mk="c-cite">[1]</span>
        </p>
        <div class="mk-decision-card__expandable" data-mk="c-expand">▸ View vitals threshold table</div>
        <div class="mk-options">
          <button class="mk-btn-3d mk-btn-3d--charcoal" data-mk="c-option-stable">Hemodynamically stable</button>
          <button class="mk-btn-3d mk-btn-3d--critical" data-mk="c-option-unstable">Hemodynamically unstable</button>
        </div>
      </article>
    </div>

    <nav class="mk-context-toolbar" data-mk="c-toolbar">
      <div class="mk-context-toolbar__item" data-mk="c-tool-diltiazem">
        <span class="mk-context-toolbar__icon">💊</span>
        <span class="mk-context-toolbar__label">Diltiazem</span>
      </div>
      <div class="mk-context-toolbar__item">
        <span class="mk-context-toolbar__icon">🧮</span>
        <span class="mk-context-toolbar__label">CHA₂DS₂</span>
      </div>
      <div class="mk-context-toolbar__item" data-mk="c-tool-home">
        <span class="mk-context-toolbar__icon">🏠</span>
        <span class="mk-context-toolbar__label">Home</span>
      </div>
      <div class="mk-context-toolbar__item" data-mk="c-tool-more">
        <span class="mk-context-toolbar__icon">•••</span>
        <span class="mk-context-toolbar__label">More</span>
      </div>
    </nav>
  `;
  return el;
}

export function renderMKPharmacy(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'mk-screen';
  el.innerHTML = `
    <div class="mk-modal">
      <header class="mk-modal-header">
        <div>
          <div class="mk-modal-header__title">Diltiazem</div>
          <div class="mk-modal-header__sub">Calcium channel blocker · IV / PO</div>
        </div>
        <div class="mk-modal-close" data-mk="p-close">✕</div>
      </header>
      <div class="mk-modal-body">
        <span class="mk-route-badge" data-mk="p-route">Route: IV</span>

        <div class="mk-drug-card" data-mk="p-card">
          <div class="mk-drug-card__indication">A-Fib rate control</div>
          <div class="mk-drug-card__regimen">0.25 mg/kg IV bolus over 2 min<br>(max 20 mg) → 5–15 mg/hr drip</div>

          <div class="mk-weight-calc" data-mk="p-calc">
            <div class="mk-weight-calc__tabs">
              <div class="mk-weight-calc__tab active" data-mk="p-tab-weight">Enter Weight</div>
              <div class="mk-weight-calc__tab" data-mk="p-tab-broselow">Broselow Tape</div>
              <div class="mk-weight-calc__tab" data-mk="p-tab-age">Estimate by Age</div>
            </div>
            <div class="mk-weight-calc__input" data-mk="p-input">Weight: 80 kg</div>
            <div class="mk-weight-calc__output" data-mk="p-output">20 mg IV bolus (capped at max)</div>
          </div>
        </div>

        <div class="mk-drug-card">
          <div class="mk-drug-card__indication">SVT termination</div>
          <div class="mk-drug-card__regimen">0.25 mg/kg IV; may repeat 0.35 mg/kg in 15 min</div>
        </div>
      </div>
    </div>
  `;
  return el;
}
