// /studio — the studio page. Composition only: a page header, then the four
// existing bands in narrative order (who builds this, how it is checked, what is
// unfinished, how to change what gets built next). No markup is duplicated here.

import { renderAbout } from './about.js';
import { renderQualityTeam } from './quality-team.js';
import { renderRoadmap } from './roadmap.js';
import { renderFeedbackBoard } from './feedback-board.js';
import { setupScrollAnimations } from '../utils/intersection.js';

export function renderStudio(parent: HTMLElement): void {
  const head = document.createElement('header');
  head.className = 'page-head';
  head.innerHTML = `
    <div class="page-head-inner">
      <p class="eyebrow">Kittech-Six</p>
      <h1 class="text-heading page-title">The studio, and everything checking it.</h1>
      <p class="text-subhead page-lede">Who builds these tools, the review system that runs against them every day, what has not shipped yet, and how to put something on the list.</p>
    </div>
  `;
  parent.appendChild(head);

  const page = document.createElement('div');
  page.className = 'studio-page';
  parent.appendChild(page);

  renderAbout(page);
  renderQualityTeam(page);
  renderRoadmap(page);
  renderFeedbackBoard(page);

  // Composed bands ship with .section-content hidden until revealed. This page owns
  // its own reveal so it does not depend on the caller remembering to run it.
  // Safe to call on every re-render: it only re-observes and re-adds a class.
  requestAnimationFrame(() => setupScrollAnimations());
}
