// A-Fib RVR Demo — Guided Tour + Free Play

import { AFIB_DEMO_NODES, GUIDED_TOUR } from '../data/afib-rvr-tree.js';
import type { DemoNode } from '../data/afib-rvr-tree.js';

type Mode = 'guided' | 'freeplay';

interface DemoState {
  mode: Mode;
  currentNodeId: string;
  history: string[];
  answers: Map<string, string>;
  guidedStep: number;
}

function getNode(id: string): DemoNode | undefined {
  return AFIB_DEMO_NODES.find(n => n.id === id);
}

export function renderAfibDemo(parent: HTMLElement): void {
  const section = document.createElement('section');
  section.id = 'demo-mymedkitt';
  section.className = 'section section-dark demo-section';

  const state: DemoState = {
    mode: 'guided',
    currentNodeId: 'afib-start',
    history: [],
    answers: new Map(),
    guidedStep: 0,
  };

  section.innerHTML = `
    <div class="section-content">
      <h2 class="text-heading demo-header" style="color: var(--color-white)">myMedKitt Demo</h2>
      <p class="demo-disclaimer">For educational purposes only. Not a substitute for clinical judgment.</p>
      <div class="demo-toggle">
        <div class="demo-toggle-container">
          <button class="demo-toggle-btn active" data-mode="guided">Guided Tour</button>
          <button class="demo-toggle-btn" data-mode="freeplay">Try It Yourself</button>
        </div>
      </div>
      <div class="demo-cards" id="afib-demo-cards"></div>
      <div class="demo-nav" id="afib-demo-nav"></div>
    </div>
  `;

  parent.appendChild(section);

  const cardsContainer = document.getElementById('afib-demo-cards')!;
  const navContainer = document.getElementById('afib-demo-nav')!;

  // Mode toggle
  section.querySelector('.demo-toggle-container')!.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('.demo-toggle-btn') as HTMLElement | null;
    if (!btn) return;
    const mode = btn.dataset.mode as Mode;
    if (mode === state.mode) return;

    state.mode = mode;
    state.currentNodeId = 'afib-start';
    state.history = [];
    state.answers = new Map();
    state.guidedStep = 0;

    section.querySelectorAll('.demo-toggle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render();
  });

  function render(): void {
    if (state.mode === 'guided') {
      renderGuided();
    } else {
      renderFreeplay();
    }
  }

  function renderGuided(): void {
    cardsContainer.innerHTML = '';
    navContainer.innerHTML = '';

    // Show all steps up to current
    for (let i = 0; i <= state.guidedStep && i < GUIDED_TOUR.length; i++) {
      const step = GUIDED_TOUR[i];
      const node = getNode(step.nodeId);
      if (!node) continue;

      const card = createCard(node, {
        preselectedOption: i < state.guidedStep ? step.selectedOption : undefined,
        annotation: step.explanation,
        patientContext: step.patientContext,
        isResult: node.type === 'result',
        interactive: false,
      });
      cardsContainer.appendChild(card);
    }

    // Navigation
    if (state.guidedStep < GUIDED_TOUR.length - 1) {
      const nextBtn = document.createElement('button');
      nextBtn.className = 'demo-next-btn';
      nextBtn.textContent = 'Next Step';
      nextBtn.addEventListener('click', () => {
        state.guidedStep++;
        render();
        // Scroll to new card
        requestAnimationFrame(() => {
          const cards = cardsContainer.children;
          if (cards.length > 0) {
            cards[cards.length - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
      });
      navContainer.appendChild(nextBtn);
    } else {
      // Tour complete
      const restartBtn = document.createElement('button');
      restartBtn.className = 'demo-restart-btn';
      restartBtn.textContent = 'Restart Tour';
      restartBtn.addEventListener('click', () => {
        state.guidedStep = 0;
        render();
      });
      navContainer.appendChild(restartBtn);
    }
  }

  function renderFreeplay(): void {
    cardsContainer.innerHTML = '';
    navContainer.innerHTML = '';

    // Render history cards
    for (const nodeId of state.history) {
      const node = getNode(nodeId);
      if (!node) continue;
      const selectedAnswer = state.answers.get(nodeId);
      const card = createCard(node, {
        preselectedOption: selectedAnswer,
        isResult: node.type === 'result',
        interactive: false,
      });
      card.style.opacity = '0.7';
      cardsContainer.appendChild(card);
    }

    // Current card
    const currentNode = getNode(state.currentNodeId);
    if (currentNode) {
      const card = createCard(currentNode, {
        isResult: currentNode.type === 'result',
        interactive: currentNode.type === 'question',
        onSelect: (optionLabel: string, nextId: string) => {
          state.answers.set(state.currentNodeId, optionLabel);
          state.history.push(state.currentNodeId);
          state.currentNodeId = nextId;
          render();
          requestAnimationFrame(() => {
            const cards = cardsContainer.children;
            if (cards.length > 0) {
              cards[cards.length - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          });
        },
      });
      cardsContainer.appendChild(card);
    }

    // Restart button for results or deep in tree
    if (currentNode?.type === 'result' || state.history.length > 0) {
      const restartBtn = document.createElement('button');
      restartBtn.className = 'demo-restart-btn';
      restartBtn.textContent = 'Start Over';
      restartBtn.addEventListener('click', () => {
        state.currentNodeId = 'afib-start';
        state.history = [];
        state.answers = new Map();
        render();
      });
      navContainer.appendChild(restartBtn);
    }
  }

  // Initial render
  render();
}

interface CardOptions {
  preselectedOption?: string;
  annotation?: string;
  patientContext?: string;
  isResult: boolean;
  interactive: boolean;
  onSelect?: (label: string, nextId: string) => void;
}

function createCard(node: DemoNode, opts: CardOptions): HTMLElement {
  const card = document.createElement('div');
  card.className = `demo-card${opts.isResult ? ' result' : ''}`;

  let html = `<div class="demo-card-title">${node.title}</div>`;
  if (node.body) {
    html += `<div class="demo-card-body">${node.body}</div>`;
  }

  card.innerHTML = html;

  // Options
  if (node.options && node.options.length > 0) {
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'demo-card-options';

    for (const opt of node.options) {
      const btn = document.createElement('button');
      btn.className = 'demo-option-btn';
      btn.textContent = opt.label;

      if (opts.preselectedOption === opt.label) {
        btn.classList.add('preselected');
      }

      if (opts.interactive && opts.onSelect) {
        const handler = opts.onSelect;
        btn.addEventListener('click', () => handler(opt.label, opt.nextId));
      } else {
        btn.disabled = true;
        btn.style.cursor = 'default';
      }

      optionsDiv.appendChild(btn);
    }
    card.appendChild(optionsDiv);
  }

  // Annotation (guided mode)
  if (opts.annotation) {
    const annotationDiv = document.createElement('div');
    annotationDiv.className = 'demo-annotation';
    annotationDiv.innerHTML = `
      <div class="demo-annotation-text">${opts.annotation}</div>
      ${opts.patientContext ? `<div class="demo-patient-context">${opts.patientContext}</div>` : ''}
    `;
    card.appendChild(annotationDiv);
  }

  return card;
}
