// Hero — "The Contents Page".
//
// One viewport, no scroll. The left column is identity (wordmark, position,
// contact, socials); the right column is the site's table of contents, an
// exclusive-open disclosure index. Exclusive-open is what mathematically
// guarantees the no-scroll requirement: the page can only ever be as tall as
// the base rows plus the single tallest panel, and that height is reserved up
// front so the identity column never shifts when a branch opens.
//
// ACCESSIBILITY MODEL — this is an honest multi-disclosure, NOT an ARIA tree.
// Branch rows are <button aria-expanded aria-controls> over a panel; children
// are ordinary links in the natural tab order. There is no role="tree", no
// roving tabindex, and no arrow-key handler, because a contents page whose
// links you can Tab through is worth more than a widget that emulates a file
// explorer. Escape collapses the open branch and returns focus to its button.
//
// IDEMPOTENCE — renderHero() may run on every navigation back to '/'. It
// rebuilds its own DOM, resolves everything through the rendered root (never
// document-level id lookups), and tears down the previous instance's window
// listeners through the module-level `teardown` handle before building a new
// one.

import { openContactModal } from './contact-modal.js';

const CONTACT_EMAIL = 'kittechsix@gmail.com';

// Platform marks as inline SVG in their own brand colours, drawn as the rounded
// app tiles they appear as on a phone home screen. Inline because the CSP allows
// no external images, and because vector stays crisp at any size for zero bytes.
// Gradient ids are namespaced per-platform so two tiles can never collide.
const ICON_FACEBOOK = `
<svg viewBox="0 0 48 48" role="img" aria-hidden="true" focusable="false">
  <rect width="48" height="48" rx="11" fill="#1877F2"/>
  <path fill="#fff" d="M32.5 30.9l1-6.6h-6.3v-4.3c0-1.8.9-3.6 3.7-3.6h2.9v-5.6s-2.6-.45-5.1-.45c-5.2 0-8.6 3.15-8.6 8.85v5.01h-5.8v6.6h5.8v15.9a23 23 0 007.1 0V30.9h5.3z"/>
</svg>`;

const ICON_INSTAGRAM = `
<svg viewBox="0 0 48 48" role="img" aria-hidden="true" focusable="false">
  <defs>
    <radialGradient id="kt6-ig" cx="19%" cy="99%" r="120%">
      <stop offset="0%" stop-color="#FFDD55"/>
      <stop offset="22%" stop-color="#FF9F3E"/>
      <stop offset="45%" stop-color="#FF543E"/>
      <stop offset="62%" stop-color="#D6249F"/>
      <stop offset="82%" stop-color="#962FBF"/>
      <stop offset="100%" stop-color="#4F5BD5"/>
    </radialGradient>
  </defs>
  <rect width="48" height="48" rx="11" fill="url(#kt6-ig)"/>
  <rect x="12" y="12" width="24" height="24" rx="7.4" fill="none" stroke="#fff" stroke-width="2.9"/>
  <circle cx="24" cy="24" r="6" fill="none" stroke="#fff" stroke-width="2.9"/>
  <circle cx="31.6" cy="16.4" r="1.9" fill="#fff"/>
</svg>`;

const ICON_TIKTOK = `
<svg viewBox="0 0 48 48" role="img" aria-hidden="true" focusable="false">
  <rect width="48" height="48" rx="11" fill="#010101"/>
  <path fill="#25F4EE" d="M20.6 21.3v-2a8.4 8.4 0 00-1.5-.13 8.7 8.7 0 00-4.9 15.9 8.68 8.68 0 016.4-13.77z"/>
  <path fill="#FE2C55" d="M31.1 12.6a8.4 8.4 0 01-2.1-4.6h-1.6a8.44 8.44 0 003.7 4.6zM36.6 18.3v-3.05a8.3 8.3 0 01-3.4-.75 8.36 8.36 0 003.4 3.8z"/>
  <path fill="#fff" d="M33.2 14.5a8.36 8.36 0 01-4.2-6.5h-4.8v19.6a3.6 3.6 0 01-6.5 2.1 3.6 3.6 0 013.4-5.4v-3.3a8.68 8.68 0 00-4.5 15.6A8.7 8.7 0 0029.2 29V18.6a11.6 11.6 0 007.4 2.4v-3.3a8.3 8.3 0 01-3.4-3.2z"/>
</svg>`;

const SOCIALS: ReadonlyArray<{ label: string; href: string; icon: string }> = [
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61591723356651', icon: ICON_FACEBOOK },
  { label: 'Instagram', href: 'https://instagram.com/kittechsix', icon: ICON_INSTAGRAM },
  { label: 'TikTok', href: 'https://tiktok.com/@kittechsix', icon: ICON_TIKTOK },
];

type StatusKind = 'live' | 'index' | 'plain' | 'open';

interface Kid {
  idx?: string;
  /** Canonical app icon. Replaces the chapter number for Work links. */
  iconSrc?: string;
  name: string;
  /** Factual gloss. Numbers come from the app registry / product showcase copy. */
  desc: string;
  status: string;
  kind: StatusKind;
  href: string;
  /** App links leave the portfolio and open the production app. */
  external?: boolean;
  /** Band anchor within the destination page, for the integrator to pick up later. */
  band?: string;
}

interface Node {
  num: string;
  key: string;
  title: string;
  note: string;
  /** Right-hand mono count on a branch row. */
  count?: string;
  /** Present on leaf rows (Consulting) — the row IS the destination. */
  href?: string;
  /** Present on the Contact row — opens the composer. */
  action?: 'contact';
  /** Path echoed by the bottom readout. */
  path: string;
  kids?: Kid[];
}

// Index-style branches lead with their overview route. Work links to each
// portfolio detail page; the live app remains one deliberate click deeper.
const NODES: ReadonlyArray<Node> = [
  {
    num: '01',
    key: 'work',
    title: 'Work',
    note: 'eight clinical apps',
    count: '8 apps',
    path: '#/work',
    kids: [
      { iconSrc: 'assets/icons/mymedkitt.png', name: 'myMedKitt', desc: '353 evidence-based ED consults', status: 'View →', kind: 'open', href: '#/work/mymedkitt' },
      { iconSrc: 'assets/icons/myvertigoapp.png', name: 'my-vertigo-app', desc: 'HINTS+, all three canals', status: 'View →', kind: 'open', href: '#/work/myvertigoapp' },
      { iconSrc: 'assets/icons/mystroke-kitt.png', name: 'myStroke-Kitt', desc: 'NIHSS, TNK dosing, hard stops', status: 'View →', kind: 'open', href: '#/work/mystroke-kitt' },
      { iconSrc: 'assets/icons/acidbase.png', name: 'AcidBase', desc: 'one blood gas to the disorder', status: 'View →', kind: 'open', href: '#/work/acidbase' },
      { iconSrc: 'assets/icons/electrokitt.png', name: 'ElectroKitt', desc: 'five electrolytes, one coupled panel', status: 'View →', kind: 'open', href: '#/work/electrokitt' },
      { iconSrc: 'assets/icons/antibiotic-rx.png', name: 'Antibiotic-Rx', desc: '~130 infection syndromes', status: 'View →', kind: 'open', href: '#/work/antibiotic-rx' },
      { iconSrc: 'assets/icons/myventkitt.png', name: 'myVentKitt', desc: 'PB980 simulator, two strategies', status: 'View →', kind: 'open', href: '#/work/myventkitt' },
      { iconSrc: 'assets/icons/endocrinekitt.png', name: 'EndocrineKitt', desc: 'five axes, care in the right order', status: 'View →', kind: 'open', href: '#/work/endocrinekitt' },
    ],
  },
  {
    num: '02',
    key: 'consulting',
    title: 'Consulting',
    note: 'clinical software, scoped',
    href: '#/consulting',
    path: '#/consulting',
  },
  {
    num: '03',
    key: 'studio',
    title: 'Studio',
    note: 'how the work is held',
    count: '4 bands',
    path: '#/studio',
    kids: [
      { idx: '03.0', name: 'Open the studio', desc: 'all four bands, one page', status: 'Index', kind: 'index', href: '#/studio' },
      { idx: '03.1', name: 'About', desc: 'Andy Kitlowski, MD — 25 years at the bedside', status: 'Band', kind: 'plain', href: '#/studio', band: 'about' },
      { idx: '03.2', name: 'Standards', desc: 'the scheduled review offices', status: 'Band', kind: 'plain', href: '#/studio', band: 'standards' },
      { idx: '03.3', name: 'Roadmap', desc: 'what is on the bench right now', status: 'Band', kind: 'plain', href: '#/studio', band: 'roadmap' },
      { idx: '03.4', name: 'Feedback', desc: 'you decide what ships next', status: 'Band', kind: 'plain', href: '#/studio', band: 'feedback' },
    ],
  },
  {
    num: '04',
    key: 'legal',
    title: 'Legal',
    note: 'education only',
    count: '3 docs',
    path: '#/legal',
    kids: [
      { idx: '04.0', name: 'All three documents', desc: 'privacy, disclaimer, terms', status: 'Index', kind: 'index', href: '#/legal' },
      { idx: '04.1', name: 'Medical Disclaimer', desc: 'in an emergency, call 911', status: 'Doc', kind: 'plain', href: '#/legal', band: 'disclaimer' },
      { idx: '04.2', name: 'Privacy', desc: 'on-device, no account required', status: 'Doc', kind: 'plain', href: '#/legal', band: 'privacy' },
      { idx: '04.3', name: 'Terms & Refunds', desc: 'plain-language terms of use', status: 'Doc', kind: 'plain', href: '#/legal', band: 'terms' },
    ],
  },
  {
    num: '05',
    key: 'contact',
    title: 'Contact',
    note: 'one physician reads it',
    action: 'contact',
    path: `mailto:${CONTACT_EMAIL}`,
  },
];

const IDLE_PATH = '#/';

/** Removes the previously rendered hero's window-level listeners. */
let teardown: (() => void) | null = null;

export function renderHero(parent: HTMLElement): void {
  teardown?.();
  teardown = null;

  const section = document.createElement('section');
  section.className = 'hero';
  section.id = 'hero';
  section.innerHTML = markup();
  parent.appendChild(section);

  teardown = wire(section);
}

/* ──────────────────────────────────────────────────────────────────────
   MARKUP
   ────────────────────────────────────────────────────────────────────── */

// Inline SVG: zero bytes over the wire, zero requests, sharp at any size —
// and it replaces a 453KB PNG plus a muddy 19px favicon thumbnail.
const HEX_MARK = `
  <svg class="hx-hex" viewBox="0 0 40 44" width="20" height="22" aria-hidden="true" focusable="false">
    <path d="M20 1.6 37.2 11.5v19.8L20 41.2 2.8 31.3V11.5Z" fill="none" stroke="currentColor" stroke-width="1.8"/>
    <path d="M20 21.4V6.8M20 21.4 7.6 28.6M20 21.4l12.4 7.2" fill="none" stroke="currentColor" stroke-width="1.2" opacity="0.55"/>
    <circle cx="20" cy="21.4" r="2.9" fill="currentColor"/>
    <circle cx="20" cy="6.8" r="1.5" fill="currentColor"/>
    <circle cx="7.6" cy="28.6" r="1.5" fill="currentColor"/>
    <circle cx="32.4" cy="28.6" r="1.5" fill="currentColor"/>
  </svg>`;

function kidMarkup(kid: Kid): string {
  const dot =
    kid.kind === 'live' ? '<span class="hx-dot" aria-hidden="true"></span>'
    : kid.kind === 'index' ? '<span class="hx-dot hx-dot--index" aria-hidden="true"></span>'
    : '';
  const statusClass =
    kid.kind === 'live' ? ' hx-status--live'
    : kid.kind === 'index' ? ' hx-status--index'
    : kid.kind === 'open' ? ' hx-status--open'
    : '';
  const band = kid.band ? ` data-band="${kid.band}"` : '';
  const leading = kid.iconSrc
    ? `<span class="hx-leaf-icon" aria-hidden="true"><img src="${kid.iconSrc}" alt="" width="30" height="30" /></span>`
    : `<span class="hx-leaf-idx" aria-hidden="true">${kid.idx ?? ''}</span>`;
  const external = kid.external ? ' target="_blank" rel="noopener"' : '';
  const appClass = kid.iconSrc ? ' hx-leaf--app' : '';
  return `
    <li class="hx-kid">
      <a class="hx-leaf${appClass}" href="${kid.href}" data-path="${kid.href}"${band}${external}>
        ${leading}
        <span class="hx-leaf-name">${kid.name}<span class="hx-desc">${kid.desc}</span></span>
        <span class="hx-leader" aria-hidden="true"></span>
        <span class="hx-status${statusClass}">${dot}${kid.status}</span>
      </a>
    </li>`;
}

function nodeMarkup(node: Node): string {
  const head = `
    <span class="hx-num" aria-hidden="true">${node.num}</span>
    <span class="hx-title">${node.title}<span class="hx-note">${node.note}</span></span>
    <span class="hx-leader" aria-hidden="true"></span>`;

  if (node.kids) {
    const panelId = `hx-panel-${node.key}`;
    return `
      <li class="hx-branch" data-open="false" data-key="${node.key}">
        <button class="hx-row" type="button" aria-expanded="false" aria-controls="${panelId}" data-path="${node.path}">
          ${head}
          <span class="hx-meta">
            <span class="hx-count">${node.count ?? ''}</span>
            <span class="hx-glyph" aria-hidden="true"></span>
          </span>
        </button>
        <div class="hx-panel" id="${panelId}">
          <div class="hx-panel-inner">
            <ul class="hx-kids">${node.kids.map(kidMarkup).join('')}</ul>
          </div>
        </div>
      </li>`;
  }

  const meta = `<span class="hx-meta"><span class="hx-arrow" aria-hidden="true">&rarr;</span></span>`;

  if (node.action === 'contact') {
    return `
      <li class="hx-branch" data-key="${node.key}">
        <button class="hx-row" type="button" data-action="contact" data-path="${node.path}"
                aria-label="Contact the studio — ${CONTACT_EMAIL}">
          ${head}${meta}
        </button>
      </li>`;
  }

  return `
    <li class="hx-branch" data-key="${node.key}">
      <a class="hx-row" href="${node.href}" data-path="${node.path}">${head}${meta}</a>
    </li>`;
}

function markup(): string {
  // The tile carries the meaning now, so the visible wordmark is gone and the
  // accessible name moves to aria-label.
  const socials = SOCIALS
    .map((s) => `<a class="hx-social-tile" href="${s.href}" target="_blank" rel="noopener" aria-label="${s.label}">${s.icon}</a>`)
    .join('');

  return `
    <button class="hx-skip" type="button" data-skip>Skip to site index</button>

    <div class="hx-page">

      <header class="hx-rail">
        <span class="hx-rail-mark">${HEX_MARK}<span>Kittech-Six LLC</span></span>
        <span class="hx-rail-right">
          <span class="hx-live"><span class="hx-live-dot" aria-hidden="true"></span>Six apps online</span>
        </span>
      </header>

      <main class="hx-main">

        <section class="hx-monument" aria-labelledby="hx-wordmark">
          <p class="hx-eyebrow">Austin, Texas &middot; Est. 2026</p>

          <h1 class="hx-wordmark" id="hx-wordmark">
            <span class="hx-line"><span>Kittech<span class="hx-hy">-</span><em>Six</em></span></span>
          </h1>

          <p class="hx-positioning">
            A physician-run software studio. We build <em>clinical decision tools</em>
            at the bedside &mdash; and use them there the same night.
          </p>
        </section>

        <div class="hx-spine" aria-hidden="true"></div>

        <nav class="hx-index" aria-label="Site index">
          <div class="hx-index-head">
            <span>Contents</span>
            <span aria-hidden="true">Five sections &middot; nine pages</span>
          </div>

          <div class="hx-tree-wrap">
            <span class="hx-marker" aria-hidden="true"></span>
            <ul class="hx-tree">${NODES.map(nodeMarkup).join('')}</ul>
          </div>

          <div class="hx-index-foot">
            <span class="hx-readout" data-state="idle">
              <span class="hx-led" aria-hidden="true"></span>
              <span class="hx-ro-text">${IDLE_PATH}</span>
            </span>
            <span class="hx-kb" aria-hidden="true">
              <kbd>Tab</kbd> move <kbd>&crarr;</kbd> open <kbd>Esc</kbd> close
            </span>
          </div>
        </nav>

        <div class="hx-monfoot">
          <div class="hx-rule" aria-hidden="true"></div>
          <p class="hx-contact">
            <span class="hx-microlabel">Contact</span>
            <a class="hx-mailto" href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>
          </p>
          <div class="hx-social">${socials}</div>
        </div>
      </main>

      <footer class="hx-foot">
        <span>&copy; 2026 Kittech-Six &middot; A. Kitlowski, MD</span>
      </footer>
    </div>
  `;
}

/* ──────────────────────────────────────────────────────────────────────
   BEHAVIOUR — everything resolved through `root`, never document ids
   ────────────────────────────────────────────────────────────────────── */

function wire(root: HTMLElement): () => void {
  const noop = (): void => {};

  const index = root.querySelector<HTMLElement>('.hx-index');
  const wrap = root.querySelector<HTMLElement>('.hx-tree-wrap');
  const tree = root.querySelector<HTMLElement>('.hx-tree');
  const marker = root.querySelector<HTMLElement>('.hx-marker');
  const readout = root.querySelector<HTMLElement>('.hx-readout');
  const roText = root.querySelector<HTMLElement>('.hx-ro-text');
  const kb = root.querySelector<HTMLElement>('.hx-kb');
  const skip = root.querySelector<HTMLButtonElement>('[data-skip]');
  if (!index || !wrap || !tree || !marker || !readout || !roText || !kb) return noop;

  let hovered: HTMLElement | null = null;
  let focused: HTMLElement | null = null;
  let markerY = 0;

  /* ---------- exclusive-open disclosure ---------- */

  const branchOf = (el: Element): HTMLElement | null => el.closest<HTMLElement>('.hx-branch');
  const buttonOf = (branch: HTMLElement): HTMLElement | null =>
    branch.querySelector<HTMLElement>(':scope > button.hx-row');

  function setOpen(branch: HTMLElement, open: boolean): void {
    branch.setAttribute('data-open', open ? 'true' : 'false');
    buttonOf(branch)?.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  // Focus is stranded if the panel holding document.activeElement collapses
  // under it — move focus up to the branch button first, always.
  function rescueFocus(branch: HTMLElement): void {
    const active = document.activeElement;
    if (active instanceof HTMLElement && branch.contains(active)) buttonOf(branch)?.focus();
  }

  function collapse(branch: HTMLElement): void {
    rescueFocus(branch);
    setOpen(branch, false);
  }

  function expand(branch: HTMLElement): void {
    tree!.querySelectorAll<HTMLElement>('.hx-branch[data-open="true"]').forEach((other) => {
      if (other !== branch) collapse(other);
    });
    setOpen(branch, true);
  }

  function toggle(branch: HTMLElement): void {
    if (branch.getAttribute('data-open') === 'true') collapse(branch);
    else expand(branch);
  }

  /* ---------- the copper marker ----------
     offsetTop is useless here: .hx-kid is position:relative, so it becomes
     the offsetParent and every leaf reports an offset relative to its own
     row. Measure rects against the positioned wrapper instead. */

  function rowIsVisible(el: HTMLElement): boolean {
    const panel = el.closest('.hx-panel');
    if (!panel) return true;
    const branch = panel.closest('.hx-branch');
    return branch?.getAttribute('data-open') === 'true';
  }

  function refreshMarker(): void {
    const el = hovered ?? focused;
    if (!el || !el.isConnected || !rowIsVisible(el)) {
      marker!.style.transform = `translateY(${markerY}px) scaleX(0)`;
      return;
    }
    const base = wrap!.getBoundingClientRect();
    markerY = el.getBoundingClientRect().bottom - base.top;
    marker!.style.transform = `translateY(${markerY}px) scaleX(1)`;
  }

  /* ---------- the live route readout ---------- */

  function refreshReadout(): void {
    const el = hovered ?? focused;
    const path = el?.dataset['path'];
    roText!.textContent = path ?? IDLE_PATH;
    readout!.dataset['state'] = path ? 'active' : 'idle';
  }

  function refresh(): void {
    refreshMarker();
    refreshReadout();
  }

  /* ---------- height reservation ----------
     Collapse everything for one synchronous layout read, then restore. No
     paint happens in between. The reserved height is base + the tallest
     single panel, which is exactly the ceiling exclusive-open allows. */

  function measure(): void {
    if (!root.isConnected) return;
    if (window.matchMedia('(max-width: 1024px)').matches) {
      wrap!.style.removeProperty('--hx-reserve');
      return;
    }
    tree!.classList.add('is-measuring');
    const base = tree!.offsetHeight;
    let tallest = 0;
    tree!.querySelectorAll<HTMLElement>('.hx-panel-inner').forEach((p) => {
      if (p.scrollHeight > tallest) tallest = p.scrollHeight;
    });
    tree!.classList.remove('is-measuring');
    wrap!.style.setProperty('--hx-reserve', `${base + tallest}px`);
  }

  /* ---------- events (all element-scoped — nothing leaks on re-render) ---------- */

  tree.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;

    const contact = target.closest<HTMLElement>('[data-action="contact"]');
    if (contact) {
      e.preventDefault();
      openContactModal();
      return;
    }

    const btn = target.closest<HTMLElement>('button.hx-row');
    if (!btn) return;
    const branch = branchOf(btn);
    if (branch) {
      toggle(branch);
      window.setTimeout(refresh, 30);
    }
  });

  tree.addEventListener('pointermove', (e) => {
    const target = e.target;
    const row = target instanceof Element ? target.closest<HTMLElement>('.hx-row, .hx-leaf') : null;
    if (row === hovered) return;
    hovered = row;
    refresh();
  });

  tree.addEventListener('pointerleave', () => {
    hovered = null;
    refresh();
  });

  index.addEventListener('focusin', (e) => {
    const target = e.target;
    focused = target instanceof Element ? target.closest<HTMLElement>('.hx-row, .hx-leaf') : null;
    kb!.classList.add('is-on');
    refresh();
  });

  index.addEventListener('focusout', (e) => {
    const next = (e as FocusEvent).relatedTarget;
    if (next instanceof Node && index.contains(next)) return;
    focused = null;
    kb!.classList.remove('is-on');
    refresh();
  });

  // Escape collapses the open branch and hands focus back to its button.
  index.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const active = document.activeElement;
    let branch: HTMLElement | null =
      active instanceof Element ? active.closest<HTMLElement>('.hx-branch[data-open="true"]') : null;
    if (!branch) branch = tree.querySelector<HTMLElement>('.hx-branch[data-open="true"]');
    if (!branch) return;
    e.preventDefault();
    buttonOf(branch)?.focus();
    setOpen(branch, false);
    window.setTimeout(refresh, 30);
  });

  // The panel animation changes row positions; re-resolve to whatever the
  // pointer is actually on rather than blanking the marker.
  tree.addEventListener('transitionend', (e) => {
    if ((e as TransitionEvent).propertyName === 'grid-template-rows') refreshMarker();
  });

  skip?.addEventListener('click', () => {
    tree.querySelector<HTMLElement>('.hx-row')?.focus();
  });

  /* ---------- window-level work, all reclaimed by teardown ---------- */

  let frame = 0;
  const onResize = (): void => {
    if (frame) return;
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      measure();
      refreshMarker();
    });
  };
  window.addEventListener('resize', onResize, { passive: true });

  /* ---------- boot ---------- */

  measure();
  // Only the two-column desktop layout reserves the tallest panel up front, so
  // only it can afford to boot expanded. Stacked layouts (phone AND tablet)
  // boot collapsed, which is what keeps identity, index, contact and socials
  // all on one screen there.
  if (window.matchMedia('(min-width: 1025px)').matches) {
    const first = tree.querySelector<HTMLElement>('.hx-branch[data-key="work"]');
    if (first) setOpen(first, true);
  }

  // Web fonts land after first layout and change every row height.
  const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
  fonts?.ready.then(() => {
    if (root.isConnected) { measure(); refreshMarker(); }
  }).catch(() => {});

  return () => {
    window.removeEventListener('resize', onResize);
    if (frame) window.cancelAnimationFrame(frame);
  };
}
