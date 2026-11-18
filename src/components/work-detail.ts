// /work/:id — one template for every portfolio app.
//
// Every app-specific value comes from APP_REGISTRY. The Overview body reuses
// renderProductShowcase; this file only assembles the page around it.

import { getWorkApp, type WorkApp } from '../data/app-registry.js';
import { renderAppTabs, type AppTabDef } from './app-tabs.js';
import { renderProductShowcase } from './product-showcase.js';
import { releaseUrl, previewHref } from '../data/release.js';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Commerce-aware primary action: a Buy link once the listing is for sale. */
function primaryAction(app: WorkApp): { label: string; href: string } {
  if (app.forSale && app.checkoutUrl) {
    return {
      label: app.price ? `Buy — ${app.price}` : 'Buy the app',
      href: app.checkoutUrl,
    };
  }
  const released = releaseUrl(app.id);
  return released ? { label: 'Open the app', href: released } : { label: 'See the preview', href: previewHref(app.id) };
}

function renderNotFound(parent: HTMLElement, appId: string): void {
  const section = document.createElement('section');
  section.className = 'work-detail work-detail--missing';
  section.innerHTML = `
    <div class="work-missing-inner">
      <p class="eyebrow">Nothing here</p>
      <h1 class="text-heading">That project doesn’t exist.</h1>
      <p class="text-body work-missing-body">
        <code>${escapeHtml(appId)}</code> isn’t one of the shipped systems — it may have been
        renamed, or the link may be mistyped.
      </p>
      <a class="cta-primary work-missing-cta" href="#/work">See all work</a>
    </div>
  `;
  parent.appendChild(section);
}

export function renderWorkDetail(parent: HTMLElement, appId: string): void {
  const app = getWorkApp(appId);
  if (!app) {
    renderNotFound(parent, appId);
    return;
  }

  const section = document.createElement('section');
  section.className = 'work-detail';
  section.id = `work-${app.id}`;
  section.style.setProperty('--app-accent', app.accent.base);
  section.style.setProperty('--app-accent-soft', app.accent.soft);
  section.style.setProperty('--app-accent-deep', app.accent.deep);

  const status = releaseUrl(app.id) ? app.status : 'Coming Soon';
  const tagVariant =
    status === 'Live' ? 'tag--live' : status === 'Coming Soon' ? 'tag--soon' : 'tag--clinical';
  const action = primaryAction(app);
  const external = action.href.startsWith('http');

  // The identity block lives here once. work.css suppresses the duplicate
  // name/status inside the Overview panel and in the sticky tab rail.
  const head = document.createElement('header');
  head.className = 'work-detail-head';
  head.innerHTML = `
    <a class="work-back" href="#/work"><span aria-hidden="true">←</span> All work</a>
    <div class="work-detail-identity">
      <span class="work-detail-icon" aria-hidden="true">
        <img src="${escapeHtml(app.iconSrc)}" alt="" loading="lazy" decoding="async" />
      </span>
      <div class="work-detail-naming">
        <span class="work-detail-chapter">${escapeHtml(app.chapter)}</span>
        <h1 class="work-detail-name">${escapeHtml(app.name)}</h1>
        <span class="work-detail-discipline">${escapeHtml(app.discipline)}</span>
      </div>
      <p class="work-detail-status tag ${tagVariant}">${escapeHtml(status)}</p>
    </div>
    <p class="work-detail-statement">${escapeHtml(app.statement)}</p>
    <div class="work-detail-actions">
      <a class="cta-primary work-detail-cta"
         href="${escapeHtml(action.href)}"
         ${external ? 'target="_blank" rel="noopener"' : ''}>${escapeHtml(action.label)}${external ? '<span aria-hidden="true"> ↗</span>' : ''}</a>
      <span class="work-detail-proof">${escapeHtml(app.proof)}</span>
    </div>
  `;
  section.appendChild(head);

  const body = document.createElement('div');
  body.className = 'work-detail-body';
  section.appendChild(body);

  // In the document before the tab panels render — renderProductShowcase and
  // the tour clones both reach for live DOM by id.
  parent.appendChild(section);

  const tabs: AppTabDef[] = [
    {
      key: 'overview',
      label: 'Overview',
      render: (panel) =>
        renderProductShowcase(panel, {
          id: app.id,
          name: app.name,
          eyebrow: app.eyebrow,
          domain: app.domain,
          description: app.description,
          iconSrc: app.iconSrc,
          features: app.features,
          status,
          metric: app.metric,
          metricLabel: app.metricLabel,
          ctaPrimary: {
            label: action.label,
            action: () => { if (external) window.open(action.href, '_blank', 'noopener'); else location.hash = action.href.slice(1); },
          },
          suppressHeadline: true,
        }),
    },
  ];

  renderAppTabs(body, {
    id: app.id,
    chapter: app.chapter,
    discipline: app.discipline,
    tabs,
  });
}
