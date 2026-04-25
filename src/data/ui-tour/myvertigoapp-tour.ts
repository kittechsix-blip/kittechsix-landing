import type { UITourConfig } from '../../components/ui-tour.js';
import {
  renderVTQuestion,
  renderVTChecklist,
  renderVTManeuver,
  renderVTResult,
  renderVTDisposition,
} from '../../components/ui-tour-clones/myvertigo-clone.js';

export const myVertigoAppTour: UITourConfig = {
  appId: 'myvertigoapp',
  appName: 'my-vertigo-app',
  eyebrow: 'Tour the UI',
  subtitle:
    'Walk a vertigo workup at the bedside — every pill, button, video link, and disposition action explained in place. Burnt-orange brand, glassmorphism cards, mobile-first.',
  accentColor: '#BF5700',
  initialScreen: 'question',
  screens: [
    {
      id: 'question',
      title: 'Workup — Question Card',
      renderClone: renderVTQuestion,
      hotspots: [
        {
          id: 'pills',
          anchorSelector: '[data-vt="pills"]',
          title: 'Module pills',
          description: 'Sticky module navigator. Orange = current module, green = completed, grey = upcoming. Tap any pill to jump back to that module if you need to revise.',
          guidedOrder: 1,
        },
        {
          id: 'q-title',
          anchorSelector: '[data-vt="q-title"]',
          title: 'Question title',
          description: 'Clinical task in plain language. Each module starts with a screen for time-critical mimics so dangerous causes get caught before benign workup.',
          guidedOrder: 2,
        },
        {
          id: 'q-refs',
          anchorSelector: '[data-vt="q-refs"]',
          title: 'References',
          description: 'Tap to expand the citation list. Every clinical claim links to a primary source — open original guidelines and trial data without leaving the consult.',
        },
        {
          id: 'q-opt-yes',
          anchorSelector: '[data-vt="q-opt-yes"]',
          title: 'Danger-tinted option',
          description: 'Red gradient = high-stakes branch. The button color tells you which path is the time-critical one before you finish reading.',
          guidedOrder: 3,
        },
        {
          id: 'q-opt-no',
          anchorSelector: '[data-vt="q-opt-no"]',
          title: 'Safe option',
          description: 'Green = the routine continuation. Each option includes a sub-line explaining what selecting it actually does — no guessing what the next screen will be.',
          navigateTo: 'checklist',
          guidedOrder: 4,
        },
        {
          id: 'q-back',
          anchorSelector: '[data-vt="q-back"]',
          title: 'Back',
          description: 'Steps back one node. Your prior selections are preserved so you can revise without losing context.',
        },
      ],
    },

    {
      id: 'checklist',
      title: 'Workup — Checklist',
      renderClone: renderVTChecklist,
      hotspots: [
        {
          id: 'ck-item-1',
          anchorSelector: '[data-vt="ck-item-1"]',
          title: 'Checked finding',
          description: 'Tap to toggle. The checklist tells the algorithm what you observed — multiple findings can change the next branch.',
          guidedOrder: 5,
        },
        {
          id: 'ck-item-3',
          anchorSelector: '[data-vt="ck-item-3"]',
          title: 'Atypical finding',
          description: 'Findings outside the classic pattern (e.g., persistent nystagmus > 60 sec) push you toward a central cause workup — the algorithm reweights based on what you check.',
        },
        {
          id: 'ck-continue',
          anchorSelector: '[data-vt="ck-continue"]',
          title: 'Continue',
          description: 'Advances to the next decision node based on the findings you checked.',
          navigateTo: 'maneuver',
          guidedOrder: 6,
        },
      ],
    },

    {
      id: 'maneuver',
      title: 'Workup — Maneuver Guide',
      renderClone: renderVTManeuver,
      hotspots: [
        {
          id: 'mv-video',
          anchorSelector: '[data-vt="mv-video"]',
          title: 'Reference video',
          description: 'Opens the video in YouTube — never embedded inline (that\'s a deliberate constraint to avoid recommendations and ads next to clinical content).',
          guidedOrder: 7,
        },
        {
          id: 'mv-step-3',
          anchorSelector: '[data-vt="mv-step-3"]',
          title: 'Numbered steps',
          description: 'Each maneuver is a stepped timeline with body-position cues. Hold each position 30–60 seconds — the timing logic is built into the consult.',
          guidedOrder: 8,
        },
        {
          id: 'mv-done',
          anchorSelector: '[data-vt="mv-done"]',
          title: 'Maneuver complete',
          description: 'Records the maneuver as performed and routes to the post-maneuver assessment. Repositioning success or failure changes the disposition path.',
          navigateTo: 'result',
        },
      ],
    },

    {
      id: 'result',
      title: 'Workup — Result',
      renderClone: renderVTResult,
      hotspots: [
        {
          id: 'rs-title',
          anchorSelector: '[data-vt="rs-title"]',
          title: 'Diagnosis with side',
          description: 'Result cards include the affected side and canal — important for picking the right Epley/Semont variant.',
          guidedOrder: 9,
        },
        {
          id: 'rs-build',
          anchorSelector: '[data-vt="rs-build"]',
          title: 'Build discharge summary',
          description: 'Pre-fills the Disposition Builder with diagnosis-appropriate medications, exercises, and return precautions — you only adjust, you don\'t start from zero.',
          navigateTo: 'disposition',
          guidedOrder: 10,
        },
        {
          id: 'rs-back',
          anchorSelector: '[data-vt="rs-back"]',
          title: 'Back',
          description: 'Returns to the previous decision node so you can revise an answer without losing the rest of the workup.',
        },
      ],
    },

    {
      id: 'disposition',
      title: 'Disposition Builder',
      renderClone: renderVTDisposition,
      hotspots: [
        {
          id: 'd-back',
          anchorSelector: '[data-vt="d-back"]',
          title: 'Back to workup',
          description: 'Returns to the workup result so you can revisit the decision tree without losing the disposition selections you already made.',
          guidedOrder: 11,
        },
        {
          id: 'd-h-diagnosis',
          anchorSelector: '[data-vt="d-h-diagnosis"]',
          title: 'Diagnosis (radio)',
          description: 'Single-select. Choosing a diagnosis pre-fills the patient explanation, the recommended meds, and matching therapy plans below.',
        },
        {
          id: 'd-dx-1',
          anchorSelector: '[data-vt="d-dx-1"]',
          title: 'Selected diagnosis',
          description: 'Active radio glows orange. Tap a different diagnosis to switch — the patient explanation card auto-updates.',
          guidedOrder: 12,
        },
        {
          id: 'd-dx-explain',
          anchorSelector: '[data-vt="d-dx-explain"]',
          title: 'Patient explanation',
          description: 'Plain-language description tailored for patient handouts. Goes into the discharge text and the QR-coded shared plan.',
        },
        {
          id: 'd-warn',
          anchorSelector: '[data-vt="d-warn"]',
          title: 'Dosing safety banner',
          description: 'Red-tinted reminder that all dosing shown is representative adult — adjust for renal/hepatic/age. Always visible above medications.',
        },
        {
          id: 'd-h-meds',
          anchorSelector: '[data-vt="d-h-meds"]',
          title: 'Medications (multi-select)',
          description: 'Multi-select checkboxes pre-checked based on the diagnosis. Each med shows brand-agnostic dosing + a one-line why.',
        },
        {
          id: 'd-h-therapy',
          anchorSelector: '[data-vt="d-h-therapy"]',
          title: 'Therapy plan',
          description: 'Selecting a therapy expands instructions in plain language + a video link. Multiple therapies can be selected and stack in the discharge plan.',
          guidedOrder: 13,
        },
        {
          id: 'd-th-video',
          anchorSelector: '[data-vt="d-th-video"]',
          title: 'Patient instructional video',
          description: 'YouTube link the patient can scan via QR. Same "no embeds" rule — opens externally so the discharge handout stays focused.',
        },
        {
          id: 'd-h-precautions',
          anchorSelector: '[data-vt="d-h-precautions"]',
          title: 'Return precautions',
          description: 'Some precautions are pre-checked because they\'re universal red flags (e.g., sudden severe headache). Untick if not applicable; add others as needed.',
        },
        {
          id: 'd-notes',
          anchorSelector: '[data-vt="d-notes"]',
          title: 'Custom notes',
          description: 'Free-text addendum that lands at the bottom of the patient handout. Use for follow-up specifics ("see Dr. Lee in 2 weeks").',
        },
        {
          id: 'd-qr',
          anchorSelector: '[data-vt="d-qr"]',
          title: 'Show QR for patient',
          description: 'Generates a QR code the patient scans to open the full discharge plan on their phone. Plan is encoded in the URL — no server, no PHI stored.',
          guidedOrder: 14,
        },
        {
          id: 'd-share',
          anchorSelector: '[data-vt="d-share"]',
          title: 'Share / Copy',
          description: 'Triggers the native share sheet (iOS/Android) or copies plan text to clipboard. Useful for messaging the plan to the EMR or to a colleague.',
        },
        {
          id: 'd-print',
          anchorSelector: '[data-vt="d-print"]',
          title: 'Print preview',
          description: 'Opens a printable view sized for letter paper — for patients who want a hard copy of the handout.',
        },
        {
          id: 'd-back-workup',
          anchorSelector: '[data-vt="d-back-workup"]',
          title: 'Return to workup',
          description: 'Same as the header back, but at thumb height — your selections persist so revisiting the workup never costs you the disposition.',
        },
      ],
    },
  ],
};
