// Keyword Ticker — the single piece of signature motion on the page.
// A calm marquee of clinical + product themes on a thin cream band.

const TICKER_KEYWORDS = [
  'Built by an emergency physician',
  '353 evidence-based consults',
  'Patient data stays on-device',
  'No account required',
  'Offline-first',
  'Daily evidence review',
  'Designed in Austin, Texas',
  'Clinical instinct, engineered',
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
