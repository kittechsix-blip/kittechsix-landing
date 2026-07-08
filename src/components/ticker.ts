// Keyword Ticker — the single piece of signature motion on the page.
// A calm marquee of clinical + product themes on a thin cream band.

const TICKER_KEYWORDS = [
  'Emergency Medicine',
  '25 Years at the Bedside',
  'Built in Public',
  'No Sign-Up',
  'Pro Tier Coming Soon',
  'Bedside Tools',
  'Clinical Decision Support',
  'Offline-First',
  'Travel Health',
  'Vertigo & Dizziness',
  'Cancer Prevention',
  'Stroke Triage',
  'EM Simulation',
  'Patient-Ready Handouts',
  'A-Fib RVR',
  'HINTS Exam',
  'Epley Maneuver',
  'NIHSS at the Bedside',
  'Acid-Base Analysis',
  'Empiric Antibiotics',
  'Open Roadmap',
  'Austin, Texas',
];

export function renderTicker(parent: HTMLElement): void {
  const band = document.createElement('div');
  band.className = 'ticker';
  band.setAttribute('aria-hidden', 'true');

  // Render the item list twice for a seamless -50% loop.
  // The duplicate set carries its own class so CSS can hide it (reduced motion).
  const items = TICKER_KEYWORDS.map((k) => `<span class="ticker-item">${k}</span>`).join('');
  const dupItems = TICKER_KEYWORDS.map((k) => `<span class="ticker-item ticker-item--dup">${k}</span>`).join('');

  band.innerHTML = `<div class="ticker-track">${items}${dupItems}</div>`;
  parent.appendChild(band);
}
