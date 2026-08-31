// Feedback Board — Supabase-connected suggestion board with voting

import { supabaseFetch, supabaseInsert, supabaseRpc } from '../utils/supabase.js';
import { storageGet, storageSet } from '../utils/storage.js';

interface Suggestion {
  id: string;
  title: string;
  description: string | null;
  category: string;
  votes: number;
  created_at: string;
}

type SortMode = 'votes' | 'newest';
type CategoryFilter = 'All' | 'myMedKitt' | 'myStroke-Kitt' | 'my-vertigo-app' | 'AcidBase' | 'Antibiotic Rx' | 'MyTravelMedKitt' | 'PowerKitt' | 'Consulting' | 'General';

const CATEGORIES: CategoryFilter[] = ['All', 'myMedKitt', 'myStroke-Kitt', 'my-vertigo-app', 'AcidBase', 'Antibiotic Rx', 'MyTravelMedKitt', 'PowerKitt', 'Consulting', 'General'];

export function renderFeedbackBoard(parent: HTMLElement): void {
  const section = document.createElement('section');
  section.id = 'feedback';
  section.className = 'section section-cream';

  let suggestions: Suggestion[] = [];
  let sortMode: SortMode = 'votes';
  let categoryFilter: CategoryFilter = 'All';
  const votedIds = new Set<string>(storageGet<string[]>('kittechsix-voted-suggestions', []));

  section.innerHTML = `
    <div class="section-content">
      <div class="feedback-intro">
        <span class="eyebrow">Shape the roadmap</span>
        <h2 class="text-heading">You decide what we build next.</h2>
        <p>Vote on features, suggest new consults, request app ideas, and help decide what Kittech-Six improves next.</p>
      </div>
      <form class="feedback-form" id="feedback-form">
        <input class="feedback-input" type="text" placeholder="What should we build or improve?" required maxlength="100" aria-label="Feature title">
        <textarea class="feedback-textarea" placeholder="What problem would this solve? Who would use it?" maxlength="500" aria-label="Description"></textarea>
        <select class="feedback-select" aria-label="Category">
          <option value="myMedKitt">myMedKitt</option>
          <option value="myStroke-Kitt">myStroke-Kitt</option>
          <option value="my-vertigo-app">my-vertigo-app</option>
          <option value="AcidBase">AcidBase</option>
          <option value="Antibiotic Rx">Antibiotic Rx</option>
          <option value="MyTravelMedKitt">MyTravelMedKitt</option>
          <option value="PowerKitt">PowerKitt</option>
          <option value="Consulting">Consulting</option>
          <option value="General">General</option>
        </select>
        <button type="submit" class="cta-primary feedback-submit">Submit Suggestion</button>
      </form>
      <div class="feedback-controls" id="feedback-controls"></div>
      <div class="feedback-grid" id="feedback-grid"></div>
    </div>
  `;

  parent.appendChild(section);

  const form = document.getElementById('feedback-form') as HTMLFormElement;
  const controlsContainer = document.getElementById('feedback-controls')!;
  const gridContainer = document.getElementById('feedback-grid')!;

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const titleInput = form.querySelector('input') as HTMLInputElement;
    const descInput = form.querySelector('textarea') as HTMLTextAreaElement;
    const catSelect = form.querySelector('select') as HTMLSelectElement;
    const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;

    const title = titleInput.value.trim();
    if (!title) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    const result = await supabaseInsert<Suggestion[]>('landing_suggestions', {
      title,
      description: descInput.value.trim() || null,
      category: catSelect.value,
    });

    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit Suggestion';

    if (result.data && Array.isArray(result.data) && result.data.length > 0) {
      suggestions.unshift(result.data[0]);
      titleInput.value = '';
      descInput.value = '';
      renderGrid();
    }
  });

  // Load suggestions
  async function loadSuggestions(): Promise<void> {
    const result = await supabaseFetch<Suggestion[]>('landing_suggestions', 'order=votes.desc');
    if (result.data) {
      suggestions = result.data;
    }
    renderControls();
    renderGrid();
  }

  function renderControls(): void {
    controlsContainer.innerHTML = '';

    // Sort buttons
    const sortBtns: { mode: SortMode; label: string }[] = [
      { mode: 'votes', label: 'Most Voted' },
      { mode: 'newest', label: 'Newest' },
    ];

    for (const sb of sortBtns) {
      const btn = document.createElement('button');
      btn.className = `feedback-filter-btn${sortMode === sb.mode ? ' active' : ''}`;
      btn.textContent = sb.label;
      btn.addEventListener('click', () => {
        sortMode = sb.mode;
        renderControls();
        renderGrid();
      });
      controlsContainer.appendChild(btn);
    }

    const divider = document.createElement('span');
    divider.className = 'feedback-controls-divider';
    controlsContainer.appendChild(divider);

    // Category filters
    for (const cat of CATEGORIES) {
      const btn = document.createElement('button');
      btn.className = `feedback-filter-btn feedback-filter-btn--cat${categoryFilter === cat ? ' active' : ''}`;
      btn.textContent = cat;
      btn.addEventListener('click', () => {
        categoryFilter = cat;
        renderControls();
        renderGrid();
      });
      controlsContainer.appendChild(btn);
    }
  }

  function renderGrid(): void {
    gridContainer.innerHTML = '';

    let filtered = categoryFilter === 'All'
      ? [...suggestions]
      : suggestions.filter(s => s.category === categoryFilter);

    if (sortMode === 'votes') {
      filtered.sort((a, b) => b.votes - a.votes);
    } else {
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    if (filtered.length === 0) {
      gridContainer.innerHTML = '<p style="text-align: center; color: var(--meta, #737373); grid-column: 1 / -1;">No suggestions yet. Be the first!</p>';
      return;
    }

    for (const s of filtered) {
      const card = document.createElement('article');
      card.className = 'suggestion-card';

      const hasVoted = votedIds.has(s.id);

      card.innerHTML = `
        <div class="suggestion-title">${escapeHtml(s.title)}</div>
        ${s.description ? `<div class="suggestion-description">${escapeHtml(s.description)}</div>` : ''}
        <div class="suggestion-footer">
          <span class="suggestion-badge">${escapeHtml(s.category)}</span>
          <button class="suggestion-vote-btn${hasVoted ? ' voted' : ''}" data-id="${s.id}" aria-label="Upvote"${hasVoted ? ' disabled' : ''}>
            \u25b2 <span>${s.votes}</span>
          </button>
        </div>
      `;

      // Vote handler
      const voteBtn = card.querySelector('.suggestion-vote-btn') as HTMLButtonElement;
      if (!hasVoted) {
        voteBtn.addEventListener('click', async () => {
          voteBtn.disabled = true;
          const result = await supabaseRpc<void>('increment_suggestion_vote', { suggestion_id: s.id });
          if (!result.error) {
            s.votes++;
            votedIds.add(s.id);
            storageSet('kittechsix-voted-suggestions', Array.from(votedIds));
            voteBtn.classList.add('voted');
            const countSpan = voteBtn.querySelector('span');
            if (countSpan) countSpan.textContent = String(s.votes);
          } else {
            voteBtn.disabled = false;
          }
        });
      }

      gridContainer.appendChild(card);
    }
  }

  loadSuggestions();
}

function escapeHtml(str: string): string {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
