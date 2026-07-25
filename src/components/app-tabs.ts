// App Tabs — wraps an app's showcase / UI tour / live demo into one tabbed
// section so the page doesn't stack every panel into one enormous scroll.

import { APP_REGISTRY } from '../data/app-registry.js';

export interface AppTabDef {
  key: string;
  label: string;
  render: (parent: HTMLElement) => void;
}

export interface AppTabsConfig {
  /** Stable id — section becomes #apptabs-<id>; used by activateAppTab(). */
  id: string;
  /** Editorial chapter number shown in the persistent product rail. */
  chapter: string;
  /** Short discipline label, e.g. "Reasoning engine". */
  discipline: string;
  tabs: AppTabDef[];
}

// Registry so CTAs elsewhere (showcase buttons, hero) can switch tabs.
const registry = new Map<string, (key: string, scroll?: boolean) => void>();

export function activateAppTab(id: string, key: string): void {
  registry.get(id)?.(key, true);
}

export function renderAppTabs(parent: HTMLElement, config: AppTabsConfig): void {
  const section = document.createElement('section');
  section.className = 'app-tabs';
  section.id = `apptabs-${config.id}`;
  section.dataset['appId'] = config.id;
  section.dataset['chapter'] = config.chapter;

  // Theme the whole tabbed section with the app's identity color.
  const accent = APP_REGISTRY[config.id]?.accent;
  if (accent) {
    section.style.setProperty('--app-accent', accent.base);
    section.style.setProperty('--app-accent-soft', accent.soft);
    section.style.setProperty('--app-accent-deep', accent.deep);
  }

  const bar = document.createElement('div');
  bar.className = 'app-tabs-bar';

  const identity = document.createElement('div');
  identity.className = 'app-tabs-identity';
  identity.innerHTML = `
    <span class="app-tabs-chapter">${config.chapter}</span>
    <span class="app-tabs-name">${APP_REGISTRY[config.id]?.name ?? config.id}</span>
    <span class="app-tabs-discipline">${config.discipline}</span>
  `;

  const tablist = document.createElement('div');
  tablist.className = 'app-tabs-list';
  tablist.setAttribute('role', 'tablist');
  tablist.setAttribute('aria-label', `${APP_REGISTRY[config.id]?.name ?? config.id} views`);

  bar.appendChild(identity);
  bar.appendChild(tablist);

  const panels = document.createElement('div');
  panels.className = 'app-tabs-panels';

  const buttons: HTMLButtonElement[] = [];
  const panelEls: HTMLElement[] = [];

  config.tabs.forEach((tab, i) => {
    const tabId = `tab-${config.id}-${tab.key}`;
    const panelId = `panel-${config.id}-${tab.key}`;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.id = tabId;
    btn.className = 'app-tabs-btn' + (i === 0 ? ' active' : '');
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', String(i === 0));
    btn.setAttribute('aria-controls', panelId);
    btn.tabIndex = i === 0 ? 0 : -1;
    btn.setAttribute('data-tab-key', tab.key);
    btn.textContent = tab.label;
    tablist.appendChild(btn);
    buttons.push(btn);

    const panel = document.createElement('div');
    panel.id = panelId;
    panel.className = 'app-tabs-panel';
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tabId);
    panel.setAttribute('data-tab-key', tab.key);
    if (i !== 0) panel.hidden = true;
    panels.appendChild(panel);
    panelEls.push(panel);
  });

  section.appendChild(bar);
  section.appendChild(panels);
  parent.appendChild(section);

  // Render AFTER the section is in the document — components use
  // document.getElementById internally and need live DOM.
  config.tabs.forEach((tab, i) => tab.render(panelEls[i]!));

  const activate = (key: string, scroll = false) => {
    const idx = config.tabs.findIndex((t) => t.key === key);
    if (idx < 0) return;
    buttons.forEach((b, i) => {
      b.classList.toggle('active', i === idx);
      b.setAttribute('aria-selected', String(i === idx));
      b.tabIndex = i === idx ? 0 : -1;
    });
    panelEls.forEach((p, i) => {
      p.hidden = i !== idx;
    });
    // Tour frames/hotspots measure the DOM — recompute now that the panel is visible.
    window.dispatchEvent(new Event('resize'));
    if (scroll) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => activate(btn.getAttribute('data-tab-key') ?? ''));
    btn.addEventListener('keydown', (event) => {
      const current = buttons.indexOf(btn);
      let next = current;
      if (event.key === 'ArrowRight') next = (current + 1) % buttons.length;
      else if (event.key === 'ArrowLeft') next = (current - 1 + buttons.length) % buttons.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = buttons.length - 1;
      else return;
      event.preventDefault();
      const nextButton = buttons[next];
      if (!nextButton) return;
      activate(nextButton.getAttribute('data-tab-key') ?? '');
      nextButton.focus();
    });
  });

  registry.set(config.id, activate);
}
