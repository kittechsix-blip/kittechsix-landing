// /work — the index of shipped clinical systems.
//
// Reads APP_REGISTRY and nothing else. Rows are plain hash links, so this
// render attaches no listeners and is safe to run on every hashchange.

import { listWorkApps } from '../data/app-registry.js';

function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

export function renderWorkIndex(parent: HTMLElement): void {
  const section = document.createElement('section');
  section.className = 'work-index';
  section.id = 'work';

  const apps = listWorkApps();

  const rows = apps
    .map(
      (app) => `
      <a class="work-row"
         href="#/work/${encodeURIComponent(app.id)}"
         style="--app-accent:${app.accent.base};--app-accent-soft:${app.accent.soft};--app-accent-deep:${app.accent.deep}">
        <span class="work-row-index">${app.chapter}</span>
        <span class="work-row-title">
          <span class="work-row-category">${app.discipline}</span>
          <strong>${app.name}</strong>
        </span>
        <span class="work-row-statement">${app.statement}</span>
        <span class="work-row-proof">${app.proof}</span>
        <span class="work-row-media" aria-hidden="true">
          <img src="${escapeAttr(app.iconSrc)}" alt="" loading="lazy" decoding="async" />
        </span>
        <span class="work-row-arrow" aria-hidden="true">↘</span>
      </a>
    `,
    )
    .join('');

  section.innerHTML = `
    <div class="work-index-inner">
      <header class="work-index-header">
        <div>
          <p class="eyebrow">Selected work</p>
          <h1 class="text-heading work-index-heading">Built for decisions that happen in real time.</h1>
        </div>
        <p class="work-index-lede">
          Each product starts with a recurring bedside problem, then removes everything
          that slows the answer down. Open one to read the overview and walk its real UI.
        </p>
      </header>

      <div class="work-rows">${rows}</div>

      <div class="work-index-footer">
        <span>${apps.length} clinical systems, live today</span>
        <a class="link-arrow" href="#/studio">What is still in the lab <span aria-hidden="true">→</span></a>
      </div>
    </div>
  `;

  parent.appendChild(section);
}
