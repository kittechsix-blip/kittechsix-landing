// Trip Builder Demo — 3-step destination → trip type → kit

import { DESTINATIONS, TRIP_TYPES, getKitRecommendation } from '../data/trip-builder-data.js';
import type { KitItem } from '../data/trip-builder-data.js';

type Step = 1 | 2 | 3;

interface TripState {
  step: Step;
  destinationId: string | null;
  tripTypeId: string | null;
}

export function renderTripDemo(parent: HTMLElement): void {
  const section = document.createElement('section');
  section.id = 'demo-mytravelmedkitt';
  section.className = 'section section-dark demo-section';

  const state: TripState = {
    step: 1,
    destinationId: null,
    tripTypeId: null,
  };

  section.innerHTML = `
    <div class="section-content">
      <div class="demo-eyebrow"><span class="eyebrow">Live demo &middot; MyTravelMedKitt</span></div>
      <h2 class="text-heading demo-header">Build a travel med kit in three taps</h2>
      <p class="text-subhead" style="text-align: center; margin-bottom: var(--space-5)">Answer two questions, get a starter kit.</p>
      <div class="trip-step-indicator" id="trip-dots"></div>
      <div id="trip-content"></div>
      <p class="demo-disclaimer">For educational purposes only. Consult a travel medicine specialist before your trip.</p>
    </div>
  `;

  parent.appendChild(section);

  const dotsContainer = document.getElementById('trip-dots')!;
  const contentContainer = document.getElementById('trip-content')!;

  function render(): void {
    renderDots();
    switch (state.step) {
      case 1: renderStep1(); break;
      case 2: renderStep2(); break;
      case 3: renderStep3(); break;
    }
  }

  function renderDots(): void {
    dotsContainer.innerHTML = '';
    for (let i = 1; i <= 3; i++) {
      const dot = document.createElement('div');
      dot.className = `trip-dot${i <= state.step ? ' active' : ''}`;
      dotsContainer.appendChild(dot);
    }
  }

  function renderStep1(): void {
    contentContainer.innerHTML = `
      <h3 class="text-subhead" style="text-align: center; color: var(--ink-900); margin-bottom: var(--space-4)">Where are you going?</h3>
      <div class="trip-grid" id="trip-dest-grid"></div>
    `;

    const grid = document.getElementById('trip-dest-grid')!;
    for (const dest of DESTINATIONS) {
      const card = document.createElement('div');
      card.className = `trip-card${state.destinationId === dest.id ? ' selected' : ''}`;
      card.innerHTML = `
        <div class="trip-card-icon">${dest.icon}</div>
        <div class="trip-card-name">${dest.name}</div>
        <div class="trip-card-region">${dest.region}</div>
      `;
      card.addEventListener('click', () => {
        state.destinationId = dest.id;
        state.step = 2;
        render();
      });
      grid.appendChild(card);
    }
  }

  function renderStep2(): void {
    const dest = DESTINATIONS.find(d => d.id === state.destinationId);

    contentContainer.innerHTML = `
      <button class="trip-back-btn" id="trip-back-2">\u2190 Back</button>
      <h3 class="text-subhead" style="text-align: center; color: var(--ink-900); margin-bottom: var(--space-1)">What kind of trip?</h3>
      <p style="text-align: center; color: var(--ink-500); font-size: 14px; margin-bottom: var(--space-4);">${dest ? `${dest.icon} ${dest.name}` : ''}</p>
      <div class="trip-grid" id="trip-type-grid"></div>
    `;

    document.getElementById('trip-back-2')!.addEventListener('click', () => {
      state.step = 1;
      render();
    });

    const grid = document.getElementById('trip-type-grid')!;
    for (const tt of TRIP_TYPES) {
      const card = document.createElement('div');
      card.className = 'trip-card';
      card.innerHTML = `
        <div class="trip-card-icon">${tt.icon}</div>
        <div class="trip-card-name">${tt.name}</div>
      `;
      card.addEventListener('click', () => {
        state.tripTypeId = tt.id;
        state.step = 3;
        render();
      });
      grid.appendChild(card);
    }
  }

  function renderStep3(): void {
    const dest = DESTINATIONS.find(d => d.id === state.destinationId);
    const tt = TRIP_TYPES.find(t => t.id === state.tripTypeId);
    const items = getKitRecommendation(state.destinationId!, state.tripTypeId!);

    contentContainer.innerHTML = `
      <button class="trip-back-btn" id="trip-back-3">\u2190 Back</button>
      <h3 class="text-subhead" style="text-align: center; color: var(--ink-900); margin-bottom: var(--space-1)">Your Travel Kit</h3>
      <p style="text-align: center; color: var(--ink-500); font-size: 14px; margin-bottom: var(--space-4);">${dest ? `${dest.icon} ${dest.name}` : ''} \u2022 ${tt ? tt.name : ''}</p>
      <div class="kit-results" id="kit-results"></div>
      <div style="text-align: center; margin-top: var(--space-5);">
        <p style="color: var(--ink-500); font-size: 15px; margin-bottom: var(--space-2);">This is the 60-second version.</p>
        <p style="color: var(--copper-600); font-size: 17px; font-weight: 500;">The full app adds vaccines, prescriptions, and destination-specific alerts &mdash; coming soon.</p>
      </div>
    `;

    document.getElementById('trip-back-3')!.addEventListener('click', () => {
      state.step = 2;
      render();
    });

    const kitContainer = document.getElementById('kit-results')!;
    items.forEach((item: KitItem, i: number) => {
      const el = document.createElement('div');
      el.className = 'kit-item';
      el.style.animationDelay = `${i * 0.05}s`;
      el.innerHTML = `
        <div>
          <div class="kit-item-name">${item.name}</div>
          <div class="kit-item-purpose">${item.purpose}</div>
          ${item.notes ? `<div class="kit-item-notes">${item.notes}</div>` : ''}
        </div>
      `;
      kitContainer.appendChild(el);
    });
  }

  render();
}
