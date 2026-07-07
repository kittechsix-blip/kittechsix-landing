// App Tabs — wraps an app's showcase / UI tour / live demo into one tabbed
// section so the page doesn't stack every panel into one enormous scroll.

export interface AppTabDef {
  key: string;
  label: string;
  render: (parent: HTMLElement) => void;
}

export interface AppTabsConfig {
  /** Stable id — section becomes #apptabs-<id>; used by activateAppTab(). */
  id: string;
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

  const bar = document.createElement('div');
  bar.className = 'app-tabs-bar';
  bar.setAttribute('role', 'tablist');
  bar.setAttribute('aria-label', 'App section tabs');

  const panels = document.createElement('div');
  panels.className = 'app-tabs-panels';

  const buttons: HTMLButtonElement[] = [];
  const panelEls: HTMLElement[] = [];

  config.tabs.forEach((tab, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'app-tabs-btn' + (i === 0 ? ' active' : '');
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', String(i === 0));
    btn.setAttribute('data-tab-key', tab.key);
    btn.textContent = tab.label;
    bar.appendChild(btn);
    buttons.push(btn);

    const panel = document.createElement('div');
    panel.className = 'app-tabs-panel';
    panel.setAttribute('role', 'tabpanel');
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
  });

  registry.set(config.id, activate);
}
