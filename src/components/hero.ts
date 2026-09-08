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
import { PROJECTS } from '../data/studio-catalog.js';
import { SKILLS } from '../data/skill-library.js';

const CONTACT_EMAIL = 'kittechsix@gmail.com';

// Platform marks as inline SVG, the exact official logo paths in each
// platform's own current brand colour (not the site's own umber palette —
// social marks are trademarks, not UI chrome, so they keep their real
// colour regardless of brand skin; the v3 flat-paper decree governs
// Kittech-Six's own tokens, not third-party logos). Inline because the CSP
// allows no external images, and because vector stays crisp at any size for
// zero bytes. `fill="#.."` attributes (not CSS) so the brand-audit hex scan
// correctly treats these as illustration, not stray UI colour.
const ICON_FACEBOOK = `
<svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
  <path fill="#0866FF" d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/>
</svg>`;

const ICON_INSTAGRAM = `
<svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
  <path fill="#FF0069" d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/>
</svg>`;

// TikTok's real single-tone brand colour is flat black, which vanishes on a
// dark surface — so, as TikTok's own alternate lockup does, the mark is
// layered three times (cyan + red offset behind the main note) for the
// instantly-recognisable colour treatment that reads on any background.
const ICON_TIKTOK = `
<svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
  <path fill="#25F4EE" transform="translate(-0.9 -0.9)" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z"/>
  <path fill="#FE2C55" transform="translate(0.9 0.9)" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z"/>
  <path fill="#010101" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z"/>
</svg>`;

const ICON_LINKEDIN = `
<svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false">
  <path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
</svg>`;

const SOCIALS: ReadonlyArray<{ label: string; href: string; icon: string }> = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/andrew-kitlowski-059266197/', icon: ICON_LINKEDIN },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61591723356651', icon: ICON_FACEBOOK },
  { label: 'Instagram', href: 'https://instagram.com/kittechsix', icon: ICON_INSTAGRAM },
  { label: 'TikTok', href: 'https://tiktok.com/@kittechsix', icon: ICON_TIKTOK },
];

type StatusKind = 'live' | 'index' | 'plain' | 'open' | 'more';

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
  kids?: Kid[];
  count?: string;
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

// Keep the original quiet contents page; the collection lives one click deeper.
const NODES: ReadonlyArray<Node> = [
  { num: '01', key: 'work', title: 'Projects', note: `${PROJECTS.length} projects, one collection`, href: '#/projects', path: '#/projects' },
  { num: '02', key: 'learn', title: 'Learn', note: 'lectures, courses & practice', href: '#/learn', path: '#/learn' },
  { num: '03', key: 'workflows', title: 'Workflows', note: 'skills & prompts to borrow', href: '#/workflows', path: '#/workflows' },
  { num: '04', key: 'studio', title: 'Studio', note: 'the person & the process', count: '5 paths', path: '#/about', kids: [
    { name: 'About Andy', desc: 'physician, educator, builder', status: 'View →', kind: 'open', href: '#/about' },
    { name: 'How I build', desc: 'the reusable system behind the work', status: 'View →', kind: 'open', href: '#/how-i-build' },
    { name: 'Consulting', desc: 'work with me', status: 'View →', kind: 'open', href: '#/consulting' },
    { name: 'Inside the studio', desc: 'standards, roadmap & feedback', status: 'View →', kind: 'open', href: '#/studio' },
    { name: 'Legal', desc: 'privacy, terms & medical disclaimer', status: 'View →', kind: 'open', href: '#/legal' },
  ] },
  { num: '05', key: 'contact', title: 'Contact', note: 'one physician reads it', action: 'contact', path: `mailto:${CONTACT_EMAIL}` },
];

const IDLE_PATH = '#/';

/** Removes the previously rendered hero's window-level listeners. */
let teardown: (() => void) | null = null;

export function renderHero(parent: HTMLElement): void {
  document.title = 'Kittech-Six — Medicine, teaching & AI';
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
  if (kid.kids) return nestedKidMarkup(kid);
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

function nestedKidMarkup(kid: Kid): string {
  const panelId = `hx-panel-${kid.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  return `
    <li class="hx-branch hx-kid-branch" data-open="false" data-key="more">
      <button class="hx-row hx-leaf hx-leaf--app" type="button" aria-expanded="false" aria-controls="${panelId}" data-path="${kid.href}">
        <span class="hx-leaf-name">${kid.name}<span class="hx-desc">${kid.desc}</span></span>
        <span class="hx-leader" aria-hidden="true"></span>
        <span class="hx-status hx-status--open">${kid.status}</span>
        <span class="hx-meta"><span class="hx-count">${kid.count ?? ''}</span><span class="hx-glyph" aria-hidden="true"></span></span>
      </button>
      <div class="hx-panel" id="${panelId}"><div class="hx-panel-inner"><ul class="hx-kids">${(kid.kids ?? []).map(kidMarkup).join('')}</ul></div></div>
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
          <span class="hx-live"><span class="hx-live-dot" aria-hidden="true"></span>${PROJECTS.length} projects &middot; ${SKILLS.length} AI guides</span>
        </span>
      </header>

      <main class="hx-main">

        <section class="hx-monument" aria-labelledby="hx-wordmark">
          <p class="hx-eyebrow">Austin, Texas &middot; Est. 2026</p>

          <h1 class="hx-wordmark" id="hx-wordmark">
            <span class="hx-line"><span>Kittech<span class="hx-hy">-</span><em>Six</em></span></span>
          </h1>

          <p class="hx-positioning">
            A physician’s growing collection of <em>useful things.</em>
            Software, teaching, and AI workflows &mdash; built to be used, shared, and borrowed.
          </p>
        </section>

        <div class="hx-spine" aria-hidden="true"></div>

        <nav class="hx-index" aria-label="Site index">
          <div class="hx-index-head">
            <span>Contents</span>
          <span aria-hidden="true">Five sections &middot; ${PROJECTS.length} projects</span>
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
      // Keep an ancestor open while a nested disclosure (Work → More) opens.
      if (other !== branch && !other.contains(branch) && !branch.contains(other)) collapse(other);
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
