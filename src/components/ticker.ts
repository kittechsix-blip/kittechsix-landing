// Keyword Ticker — the single piece of signature motion on the page.
// A calm marquee of clinical + product themes on a thin cream band.

const TICKER_KEYWORDS = [
  'Emergency Medicine',
  'Clinical Decision Support',
  'A-Fib RVR',
  'HINTS Exam',
  'Travel Health',
  'Vertigo & Dizziness',
  'Cancer Prevention',
  'Epley Maneuver',
  'Offline-First',
  'Bedside Tools',
  'Built in Public',
  'Stroke Triage',
  'EM Simulation',
  'Patient-Ready Handouts',
  '20+ Years at the Bedside',
  'Open Roadmap',
  'Austin, Texas',
];

export function renderTicker(parent: HTMLElement): void {
  const band = document.createElement('div');
  band.className = 'ticker';
  band.setAttribute('aria-hidden', 'true');

  // Render the item list twice for a seamless -50% loop.
  const items = TICKER_KEYWORDS.map((k) => `<span class="ticker-item">${k}</span>`).join('');

  band.innerHTML = `<div class="ticker-track">${items}${items}</div>`;
  parent.appendChild(band);
}
