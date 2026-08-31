// /legal — privacy, medical disclaimer, and terms as one document in three parts.
// Composition only: the three existing sections are rendered into a shared frame
// that neutralizes their competing band chrome. No markup is duplicated here.

import { renderPrivacy } from './privacy.js';
import { renderDisclaimer } from './disclaimer.js';
import { renderLegal } from './legal.js';

interface Part {
  num: string;
  id: string;
  label: string;
  render: (parent: HTMLElement) => void;
}

const PARTS: Part[] = [
  { num: '01', id: 'privacy', label: 'Privacy', render: renderPrivacy },
  { num: '02', id: 'disclaimer', label: 'Medical disclaimer', render: renderDisclaimer },
  { num: '03', id: 'terms', label: 'Terms & refunds', render: renderLegal },
];

export function renderLegalPage(parent: HTMLElement): void {
  const head = document.createElement('header');
  head.className = 'page-head';
  head.innerHTML = `
    <div class="page-head-inner">
      <p class="eyebrow">Legal</p>
      <h1 class="text-heading page-title">Privacy, disclaimer, and terms.</h1>
      <p class="page-lede legal-dek">One document in three parts: what happens to what you enter, what these tools are and are not, and the terms you accept by using them.</p>
    </div>
  `;
  parent.appendChild(head);

  const doc = document.createElement('div');
  doc.className = 'legaldoc';
  parent.appendChild(doc);

  doc.appendChild(buildContents(doc));

  for (const part of PARTS) {
    const marker = document.createElement('div');
    marker.className = 'legaldoc-marker';
    marker.innerHTML = `
      <span class="legaldoc-marker-num">${part.num}</span>
      <span class="legaldoc-marker-rule" aria-hidden="true"></span>
    `;
    doc.appendChild(marker);
    part.render(doc);
  }

  normalize(doc);
}

/** Contents row. Buttons, not <a href="#id"> — a bare fragment is parsed as a
 *  route by this site's hash router and would navigate off the page. */
function buildContents(doc: HTMLElement): HTMLElement {
  const contents = document.createElement('nav');
  contents.className = 'legaldoc-contents';
  contents.setAttribute('aria-label', 'Contents');

  const label = document.createElement('p');
  label.className = 'legaldoc-contents-label';
  label.textContent = 'Contents';
  contents.appendChild(label);

  for (const part of PARTS) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'legaldoc-jump';
    btn.innerHTML = `<span>${part.num}</span>`;
    btn.appendChild(document.createTextNode(part.label));
    btn.addEventListener('click', () => scrollToId(doc, part.id));
    contents.appendChild(btn);
  }

  return contents;
}

/** Strips the disclaimer's inline presentation (page.css restates it in the shared
 *  register) and converts any bare fragment anchor into an in-page scroll button. */
function normalize(doc: HTMLElement): void {
  doc.querySelectorAll<HTMLElement>('[style]').forEach((el) => el.removeAttribute('style'));

  doc.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    const href = anchor.getAttribute('href') ?? '';
    if (href.startsWith('#/')) return; // a real route — leave it alone
    const targetId = href.slice(1);
    if (!targetId) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'legaldoc-xref';
    btn.textContent = anchor.textContent ?? '';
    btn.addEventListener('click', () => scrollToId(doc, targetId));
    anchor.replaceWith(btn);
  });
}

function scrollToId(doc: HTMLElement, id: string): void {
  const target = doc.querySelector(`#${CSS.escape(id)}`);
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
