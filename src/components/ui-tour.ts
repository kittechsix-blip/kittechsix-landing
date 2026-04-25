// UI Tour Engine — interactive phone-frame snapshot with click-to-explain hotspots.
// One engine, four configs. See src/data/ui-tour/*.

export interface HotspotDef {
  id: string;
  // Anchor either to a CSS selector inside the rendered screen (HTML clones)
  // OR to a percentage rect on a screenshot image.
  anchorSelector?: string;
  rect?: { x: number; y: number; w: number; h: number };
  title: string;
  description: string;
  navigateTo?: string;
  guidedOrder?: number;
}

export interface ScreenDef {
  id: string;
  title: string;
  imageSrc?: string;
  renderClone?: () => HTMLElement;
  placeholder?: string;
  hotspots: HotspotDef[];
}

export interface UITourConfig {
  appId: string;
  appName: string;
  eyebrow: string;
  subtitle: string;
  accentColor: string;
  initialScreen: string;
  screens: ScreenDef[];
}

type Mode = 'explore' | 'guided';

interface TourState {
  config: UITourConfig;
  mode: Mode;
  currentScreenId: string;
  guidedIndex: number;
  guidedSteps: { screenId: string; hotspotId: string }[];
  activePopover?: { screenId: string; hotspotId: string };
  frameInner?: HTMLElement;
  breadcrumb?: HTMLElement;
}

export function renderUITour(parent: HTMLElement, config: UITourConfig): void {
  const section = document.createElement('section');
  section.id = `tour-${config.appId}`;
  section.className = 'ui-tour-section';
  section.style.setProperty('--ui-tour-accent', config.accentColor);

  section.innerHTML = `
    <div class="ui-tour-content">
      <header class="ui-tour-header">
        <div class="ui-tour-eyebrow">${config.eyebrow}</div>
        <h2 class="ui-tour-title">Tour the ${config.appName} UI</h2>
        <p class="ui-tour-subtitle">${config.subtitle}</p>
      </header>

      <div class="ui-tour-controls">
        <div class="ui-tour-mode-toggle" role="tablist" aria-label="Tour mode">
          <button data-mode="explore" class="active" role="tab" aria-selected="true">Explore</button>
          <button data-mode="guided" role="tab" aria-selected="false">Guided Tour</button>
        </div>
        <button class="ui-tour-restart" type="button">↺ Restart</button>
      </div>

      <div class="ui-tour-breadcrumb" aria-live="polite"></div>

      <div class="ui-tour-frame-wrap">
        <div class="ui-tour-frame" role="region" aria-label="${config.appName} UI tour">
          <div class="ui-tour-frame-inner"></div>
        </div>
        <aside class="ui-tour-summary" aria-label="Screens in this tour">
          <h4>Screens</h4>
          <ul></ul>
        </aside>
      </div>
    </div>
  `;

  parent.appendChild(section);

  const state: TourState = {
    config,
    mode: 'explore',
    currentScreenId: config.initialScreen,
    guidedIndex: 0,
    guidedSteps: buildGuidedSteps(config),
    frameInner: section.querySelector<HTMLElement>('.ui-tour-frame-inner') ?? undefined,
    breadcrumb: section.querySelector<HTMLElement>('.ui-tour-breadcrumb') ?? undefined,
  };

  populateSummary(section, config);
  mountScreen(state);
  wireControls(section, state);

  // Recompute hotspot positions on resize (anchors depend on layout)
  const onResize = () => {
    const screen = state.frameInner?.querySelector<HTMLElement>('.ui-tour-screen');
    if (screen) repositionHotspots(screen, getCurrentScreenDef(state));
  };
  window.addEventListener('resize', onResize, { passive: true });
}

function buildGuidedSteps(config: UITourConfig) {
  const steps: { screenId: string; hotspotId: string }[] = [];
  for (const screen of config.screens) {
    const ordered = screen.hotspots
      .filter((h) => h.guidedOrder !== undefined)
      .sort((a, b) => (a.guidedOrder ?? 0) - (b.guidedOrder ?? 0));
    for (const h of ordered) steps.push({ screenId: screen.id, hotspotId: h.id });
  }
  return steps;
}

function populateSummary(section: HTMLElement, config: UITourConfig) {
  const ul = section.querySelector<HTMLElement>('.ui-tour-summary ul');
  if (!ul) return;
  ul.innerHTML = config.screens
    .map(
      (s, i) => `
      <li>
        <strong>Screen ${i + 1}</strong>
        ${s.title}
      </li>
    `,
    )
    .join('');
}

function getCurrentScreenDef(state: TourState): ScreenDef {
  return state.config.screens.find((s) => s.id === state.currentScreenId) ?? state.config.screens[0]!;
}

function mountScreen(state: TourState) {
  if (!state.frameInner) return;
  const screenDef = getCurrentScreenDef(state);

  closePopover(state);
  state.frameInner.innerHTML = '';

  const screen = document.createElement('div');
  screen.className = 'ui-tour-screen';
  screen.setAttribute('data-screen-id', screenDef.id);

  if (screenDef.renderClone) {
    screen.appendChild(screenDef.renderClone());
  } else if (screenDef.imageSrc) {
    const img = document.createElement('img');
    img.className = 'ui-tour-screen-img';
    img.src = screenDef.imageSrc;
    img.alt = `${state.config.appName} — ${screenDef.title}`;
    img.loading = 'lazy';
    img.onerror = () => {
      screen.innerHTML = `
        <div class="ui-tour-screen-placeholder">
          <strong>Screenshot coming soon</strong>
          <p>${screenDef.placeholder ?? `Capture of "${screenDef.title}" hasn't landed yet.`}</p>
        </div>
      `;
    };
    screen.appendChild(img);
  } else if (screenDef.placeholder) {
    screen.innerHTML = `
      <div class="ui-tour-screen-placeholder">
        <strong>${screenDef.title}</strong>
        <p>${screenDef.placeholder}</p>
      </div>
    `;
  }

  state.frameInner.appendChild(screen);

  // Compute hotspot positions after the DOM has laid out
  requestAnimationFrame(() => {
    repositionHotspots(screen, screenDef);
    addHotspotEventHandlers(screen, state);
  });

  updateBreadcrumb(state);
}

function repositionHotspots(screenEl: HTMLElement, screenDef: ScreenDef) {
  // Remove any existing hotspot dots and rebuild
  screenEl.querySelectorAll('.ui-tour-hotspot').forEach((el) => el.remove());

  for (const h of screenDef.hotspots) {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'ui-tour-hotspot';
    dot.setAttribute('data-hotspot-id', h.id);
    dot.setAttribute('aria-label', h.title);

    let leftPct: number | null = null;
    let topPct: number | null = null;

    if (h.anchorSelector) {
      const target = screenEl.querySelector<HTMLElement>(h.anchorSelector);
      if (target) {
        const screenRect = screenEl.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const cx = targetRect.left - screenRect.left + targetRect.width / 2;
        const cy = targetRect.top - screenRect.top + targetRect.height / 2 + screenEl.scrollTop;
        leftPct = (cx / screenRect.width) * 100;
        topPct = (cy / screenEl.scrollHeight) * 100;
      }
    } else if (h.rect) {
      leftPct = h.rect.x + h.rect.w / 2;
      topPct = h.rect.y + h.rect.h / 2;
    }

    if (leftPct === null || topPct === null) continue;

    dot.style.left = `${leftPct}%`;
    dot.style.top = `${topPct}%`;

    if (h.guidedOrder !== undefined) {
      dot.textContent = String(h.guidedOrder);
    }

    screenEl.appendChild(dot);
  }
}

function addHotspotEventHandlers(screenEl: HTMLElement, state: TourState) {
  screenEl.querySelectorAll<HTMLElement>('.ui-tour-hotspot').forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const hotspotId = dot.getAttribute('data-hotspot-id');
      if (!hotspotId) return;
      activateHotspot(state, hotspotId);
    });

    dot.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const hotspotId = dot.getAttribute('data-hotspot-id');
        if (hotspotId) activateHotspot(state, hotspotId);
      }
    });
  });
}

function activateHotspot(state: TourState, hotspotId: string) {
  const screenDef = getCurrentScreenDef(state);
  const hotspot = screenDef.hotspots.find((h) => h.id === hotspotId);
  if (!hotspot) return;
  showPopover(state, hotspot);
}

function showPopover(state: TourState, hotspot: HotspotDef) {
  closePopover(state);
  if (!state.frameInner) return;
  const screen = state.frameInner.querySelector<HTMLElement>('.ui-tour-screen');
  if (!screen) return;
  const dot = screen.querySelector<HTMLElement>(`[data-hotspot-id="${hotspot.id}"]`);
  if (!dot) return;

  dot.classList.add('active');

  const popover = document.createElement('div');
  popover.className = 'ui-tour-popover';
  popover.setAttribute('role', 'dialog');
  popover.setAttribute('aria-labelledby', `popover-title-${hotspot.id}`);

  const stepLabel =
    state.mode === 'guided'
      ? `Step ${state.guidedIndex + 1} of ${state.guidedSteps.length}`
      : '';

  const isLastGuided =
    state.mode === 'guided' && state.guidedIndex >= state.guidedSteps.length - 1;
  const nextLabel = hotspot.navigateTo
    ? `Open →`
    : state.mode === 'guided'
      ? isLastGuided
        ? 'Done'
        : 'Next →'
      : '';

  popover.innerHTML = `
    <div style="display:flex; justify-content: space-between; gap:8px; align-items:flex-start;">
      <h3 class="ui-tour-popover-title" id="popover-title-${hotspot.id}">${hotspot.title}</h3>
      <button class="ui-tour-popover-close" type="button" aria-label="Close">×</button>
    </div>
    <p class="ui-tour-popover-body">${hotspot.description}</p>
    <div class="ui-tour-popover-actions">
      <span class="ui-tour-popover-step">${stepLabel}</span>
      ${nextLabel ? `<button class="ui-tour-popover-next" type="button">${nextLabel}</button>` : ''}
    </div>
  `;

  screen.appendChild(popover);
  positionPopover(popover, dot, screen);

  popover.querySelector<HTMLElement>('.ui-tour-popover-close')?.addEventListener('click', (e) => {
    e.stopPropagation();
    closePopover(state);
  });

  popover.querySelector<HTMLElement>('.ui-tour-popover-next')?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (hotspot.navigateTo) {
      navigate(state, hotspot.navigateTo);
    } else if (state.mode === 'guided') {
      advanceGuided(state);
    }
  });

  state.activePopover = { screenId: state.currentScreenId, hotspotId: hotspot.id };

  // Focus management
  popover.querySelector<HTMLElement>('.ui-tour-popover-next')?.focus({ preventScroll: true });
}

function positionPopover(popover: HTMLElement, dot: HTMLElement, screen: HTMLElement) {
  const dotRect = dot.getBoundingClientRect();
  const screenRect = screen.getBoundingClientRect();
  const popW = 280;
  const popH = popover.offsetHeight || 120;

  const dotLeft = dotRect.left - screenRect.left + dotRect.width / 2;
  const dotTop = dotRect.top - screenRect.top + dotRect.height / 2 + screen.scrollTop;

  // Try below first
  let top = dotTop + 24;
  let left = Math.max(8, Math.min(screenRect.width - popW - 8, dotLeft - popW / 2));

  // If would overflow bottom, position above
  if (top + popH > screen.scrollHeight) {
    top = Math.max(8, dotTop - popH - 24);
  }

  popover.style.left = `${left}px`;
  popover.style.top = `${top}px`;
}

function closePopover(state: TourState) {
  if (!state.frameInner) return;
  state.frameInner.querySelectorAll('.ui-tour-popover').forEach((el) => el.remove());
  state.frameInner.querySelectorAll('.ui-tour-hotspot.active').forEach((el) => el.classList.remove('active'));
  state.activePopover = undefined;
}

function navigate(state: TourState, screenId: string) {
  state.currentScreenId = screenId;
  mountScreen(state);
  if (state.mode === 'guided') {
    // After navigation in guided mode, auto-show next guided hotspot on the new screen
    requestAnimationFrame(() => {
      const next = state.guidedSteps[state.guidedIndex + 1];
      if (next && next.screenId === screenId) {
        state.guidedIndex += 1;
        const screenDef = getCurrentScreenDef(state);
        const hs = screenDef.hotspots.find((h) => h.id === next.hotspotId);
        if (hs) showPopover(state, hs);
      }
    });
  }
}

function advanceGuided(state: TourState) {
  if (state.guidedIndex >= state.guidedSteps.length - 1) {
    closePopover(state);
    state.guidedIndex = 0;
    return;
  }
  state.guidedIndex += 1;
  const next = state.guidedSteps[state.guidedIndex];
  if (!next) return;
  if (next.screenId !== state.currentScreenId) {
    state.currentScreenId = next.screenId;
    mountScreen(state);
    requestAnimationFrame(() => {
      const screenDef = getCurrentScreenDef(state);
      const hs = screenDef.hotspots.find((h) => h.id === next.hotspotId);
      if (hs) showPopover(state, hs);
    });
  } else {
    const screenDef = getCurrentScreenDef(state);
    const hs = screenDef.hotspots.find((h) => h.id === next.hotspotId);
    if (hs) showPopover(state, hs);
  }
}

function updateBreadcrumb(state: TourState) {
  if (!state.breadcrumb) return;
  const screenDef = getCurrentScreenDef(state);
  const idx = state.config.screens.findIndex((s) => s.id === state.currentScreenId) + 1;
  state.breadcrumb.innerHTML = `Screen ${idx} of ${state.config.screens.length} — <strong>${screenDef.title}</strong>`;
}

function wireControls(section: HTMLElement, state: TourState) {
  const modeButtons = section.querySelectorAll<HTMLElement>('.ui-tour-mode-toggle button');
  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode') as Mode | null;
      if (!mode) return;
      modeButtons.forEach((b) => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-selected', String(b === btn));
      });
      state.mode = mode;
      state.guidedIndex = 0;
      state.currentScreenId = state.config.initialScreen;
      mountScreen(state);
      if (mode === 'guided' && state.guidedSteps.length > 0) {
        const first = state.guidedSteps[0]!;
        state.currentScreenId = first.screenId;
        mountScreen(state);
        requestAnimationFrame(() => {
          const screenDef = getCurrentScreenDef(state);
          const hs = screenDef.hotspots.find((h) => h.id === first.hotspotId);
          if (hs) showPopover(state, hs);
        });
      }
    });
  });

  section.querySelector<HTMLElement>('.ui-tour-restart')?.addEventListener('click', () => {
    state.guidedIndex = 0;
    state.currentScreenId = state.config.initialScreen;
    mountScreen(state);
    if (state.mode === 'guided' && state.guidedSteps.length > 0) {
      const first = state.guidedSteps[0]!;
      state.currentScreenId = first.screenId;
      mountScreen(state);
      requestAnimationFrame(() => {
        const screenDef = getCurrentScreenDef(state);
        const hs = screenDef.hotspots.find((h) => h.id === first.hotspotId);
        if (hs) showPopover(state, hs);
      });
    }
  });

  // Esc closes popover
  section.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePopover(state);
  });
}
