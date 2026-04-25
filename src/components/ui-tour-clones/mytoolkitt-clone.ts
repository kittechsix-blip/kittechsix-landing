// MyToolKitt — concept wireframes (no real code yet — Coming Soon).
// Wireframe aesthetic: dashed borders, mono labels, muted purple accent.

export function renderTKUpload(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'tk-screen';
  el.innerHTML = `
    <div class="tk-banner" data-tk="banner">Concept · Coming Soon</div>
    <h2 class="tk-title">Snap or Upload</h2>
    <p class="tk-sub">Capture a rash, X-ray, ECG, or wound. AI returns a differential and a consult-ready description.</p>

    <div class="tk-frame" data-tk="upload-zone">
      <div class="tk-icon-box">📷</div>
      <div class="tk-zone-label">Tap to capture or drag a photo</div>
    </div>

    <div class="tk-row">
      <div class="tk-btn tk-btn--primary" data-tk="btn-camera">
        <span class="tk-btn__icon">📸</span>
        Use Camera
      </div>
      <div class="tk-btn" data-tk="btn-gallery">
        <span class="tk-btn__icon">🖼️</span>
        From Gallery
      </div>
    </div>

    <div class="tk-row">
      <div class="tk-btn" data-tk="btn-history">
        <span class="tk-btn__icon">🕓</span>
        Recent Captures
      </div>
      <div class="tk-btn" data-tk="btn-feedback">
        <span class="tk-btn__icon">✉️</span>
        Send Feedback
      </div>
    </div>
  `;
  return el;
}

export function renderTKAnalysis(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'tk-screen';
  el.innerHTML = `
    <div class="tk-banner">Concept · Coming Soon</div>
    <h2 class="tk-title">AI Analysis</h2>
    <p class="tk-sub">Embedded LLM reasons through visual features and clinical priors.</p>

    <div class="tk-preview" data-tk="image">
      [ patient photo placeholder ]
    </div>

    <div class="tk-reasoning" data-tk="reasoning">
      <div class="tk-reasoning__title">Reasoning trace</div>
      <div class="tk-reasoning__lines">
        <div></div><div></div><div></div>
      </div>
    </div>

    <div class="tk-row">
      <div class="tk-btn" data-tk="btn-reanalyze">
        <span class="tk-btn__icon">↻</span>
        Re-analyze
      </div>
      <div class="tk-btn tk-btn--primary" data-tk="btn-view-dx">
        <span class="tk-btn__icon">📋</span>
        View Differential
      </div>
    </div>
  `;
  return el;
}

export function renderTKDifferential(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'tk-screen';
  el.innerHTML = `
    <div class="tk-banner">Concept · Coming Soon</div>
    <h2 class="tk-title">Differential Diagnosis</h2>
    <p class="tk-sub">Ranked by confidence. Tap any item for visual features that drove the rank.</p>

    <div class="tk-dx-list">
      <div class="tk-dx-item tk-dx-item--top" data-tk="dx-top">
        <div class="tk-dx-name">Allergic contact dermatitis <span class="tk-conf-pct">82%</span></div>
        <div class="tk-conf-bar"><div style="width:82%;"></div></div>
      </div>
      <div class="tk-dx-item">
        <div class="tk-dx-name">Atopic dermatitis <span class="tk-conf-pct">11%</span></div>
        <div class="tk-conf-bar"><div style="width:11%;"></div></div>
      </div>
      <div class="tk-dx-item">
        <div class="tk-dx-name">Tinea corporis <span class="tk-conf-pct">5%</span></div>
        <div class="tk-conf-bar"><div style="width:5%;"></div></div>
      </div>
    </div>

    <div class="tk-description" data-tk="description">
      Well-demarcated erythematous plaque on the volar forearm with linear streaking suggestive of external contact. No central clearing; mild scale at the periphery. No secondary excoriation noted. No surrounding edema.
    </div>

    <div class="tk-row">
      <div class="tk-btn tk-btn--primary" data-tk="btn-copy">
        <span class="tk-btn__icon">📋</span>
        Copy Description
      </div>
      <div class="tk-btn" data-tk="btn-share-dx">
        <span class="tk-btn__icon">📤</span>
        Send to EMR
      </div>
    </div>
  `;
  return el;
}
