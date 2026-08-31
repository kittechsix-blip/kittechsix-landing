// brand-audit-exempt: tour metadata mirroring the toured app's own accents and
// screen chrome (app-identity data, not landing chrome).
import type { UITourConfig } from '../../components/ui-tour.js';
import {
  renderSKHome,
  renderSKTriage,
  renderSKNIHSS,
  renderSKCTFork,
  renderSKIVTCheck,
  renderSKIVTTreat,
  renderSKICH,
} from '../../components/ui-tour-clones/mystroke-kitt-clone.js';

export const skTour: UITourConfig = {
  appId: 'mystroke-kitt',
  appName: 'myStroke-Kitt',
  eyebrow: 'Tour the UI',
  subtitle:
    'Code-stroke decision support, walked end to end: glucose and LKW at the door, live NIHSS scoring, the CT fork, thrombolysis hard stops, real TNK dosing, and ICH reversal — every screen straight from the real app.',
  accentColor: '#BF5700',
  liveUrl: 'https://mystroke-kitt.vercel.app',
  initialScreen: 'home',
  screens: [
    {
      id: 'home',
      title: 'Home — Stroke Decision Tree',
      renderClone: renderSKHome,
      hotspots: [
        {
          id: 'flow-card',
          anchorSelector: '[data-sk="flow-card"]',
          title: 'The whole resuscitation, previewed',
          description:
            'Five steps: activate + glucose + LKW + NIHSS, CT head, fork on blood, IVT/EVT windows, EVT escalation. You always know where the tree is taking you.',
          guidedOrder: 1,
        },
        {
          id: 'start-cta',
          anchorSelector: '[data-sk="start-cta"]',
          title: 'One tap from door to decision',
          description:
            'No menus, no search. The code-stroke spine starts immediately — glucose, LKW, NIHSS, CT fork, reperfusion decisions in one continuous flow.',
          navigateTo: 'triage',
          guidedOrder: 2,
        },
        {
          id: 'direct-jumps',
          anchorSelector: '[data-sk="direct-jumps"]',
          title: 'Direct pathway jumps',
          description:
            'Already have the CT? Jump straight into the ischemic (orange), hemorrhagic (red), or mimic (green) pathway — each tinted with its own color the whole way through.',
        },
      ],
    },

    {
      id: 'triage',
      title: 'Code Stroke — Initial Actions',
      renderClone: renderSKTriage,
      hotspots: [
        {
          id: 'node-body',
          anchorSelector: '[data-sk="node-body"]',
          title: 'One glass card per step',
          description:
            'LKW is the clock. Fingerstick glucose is the only required pre-thrombolysis lab. Labs never delay imaging. Nothing to hunt for at 3 a.m.',
          guidedOrder: 3,
        },
        {
          id: 'nihss-chip',
          anchorSelector: '[data-sk="nihss-chip"]',
          title: 'Calculators live in the step',
          description:
            'NIHSS and the Stroke Syndrome localizer open right where the pathway needs them — score the deficit without ever leaving the tree.',
          navigateTo: 'nihss',
          guidedOrder: 4,
        },
        {
          id: 'stage-rail',
          anchorSelector: '[data-sk="stage-rail"]',
          title: 'Sticky progress rail',
          description:
            'The rail tracks the resuscitation: the current stage glows in pathway color, completed stages turn green with a check, and any stage is one tap away.',
        },
        {
          id: 'disclaimer',
          anchorSelector: '[data-sk="disclaimer"]',
          title: 'Trust story, always on screen',
          description:
            'Educational reference only — not FDA cleared, verify against local protocol. The legal posture rides at the top of every consult page.',
        },
      ],
    },

    {
      id: 'nihss',
      title: 'NIHSS Fast Sheet',
      renderClone: renderSKNIHSS,
      hotspots: [
        {
          id: 'score-live',
          anchorSelector: '[data-sk="score-live"]',
          title: 'Live tier interpretation',
          description:
            'The readout updates as you score: NIHSS 7 → "Score 5–15 — Moderate Stroke" — an IVT candidate if within window. No mental math mid-code.',
          guidedOrder: 5,
        },
        {
          id: 'score-btns',
          anchorSelector: '[data-sk="score-btns"]',
          title: 'Thumb-sized scoring',
          description:
            '52px score buttons, one row per item, all 15 NIHSS items with their anchors printed underneath. Scoreable in under a minute — gloves on.',
          navigateTo: 'ct-fork',
          guidedOrder: 6,
        },
        {
          id: 'tier-note',
          anchorSelector: '[data-sk="tier-note"]',
          title: 'Decision thresholds baked in',
          description:
            'NIHSS ≥6 is the EVT eligibility threshold for anterior LVO. NIHSS 0–5 with a disabling deficit still gets IVT consideration.',
        },
      ],
    },

    {
      id: 'ct-fork',
      title: 'CT Head — Fork on Result',
      renderClone: renderSKCTFork,
      hotspots: [
        {
          id: 'opt-ischemic',
          anchorSelector: '[data-sk="opt-ischemic"]',
          title: 'The CT forks the entire app',
          description:
            'Orange for ischemic reperfusion, red for hemorrhage, green for mimics. Every stage, tool, and dose downstream re-themes to the pathway you pick.',
          navigateTo: 'ivt-check',
          guidedOrder: 7,
        },
        {
          id: 'opt-hemorrhagic',
          anchorSelector: '[data-sk="opt-hemorrhagic"]',
          title: 'Blood on CT',
          description:
            'Blood is hyperdense — bright. One tap and the whole app reconfigures for ICH: reversal, BP control, and neurosurgery escalation.',
          navigateTo: 'ich',
        },
        {
          id: 'opt-mimic',
          anchorSelector: '[data-sk="opt-mimic"]',
          title: 'Mimic exits built into the fork',
          description:
            "Hypoglycemia, Todd's paralysis, dissection, complex migraine — green routes out of the reperfusion pathway before any needle gets drawn.",
        },
      ],
    },

    {
      id: 'ivt-check',
      title: 'IVT Contraindication Check',
      renderClone: renderSKIVTCheck,
      hotspots: [
        {
          id: 'verdict',
          anchorSelector: '[data-sk="verdict"]',
          title: 'A hard stop you cannot miss',
          description:
            'Green means no absolute contraindication is checked. Tap any hard stop and this banner flips red: do not give IV thrombolysis — while CTA/EVT evaluation keeps moving.',
          navigateTo: 'ivt-treat',
          guidedOrder: 8,
        },
        {
          id: 'hardstops',
          anchorSelector: '[data-sk="hardstops"]',
          title: 'Real hard stops, auto-documented',
          description:
            'Hemorrhage on CT, recent stroke or head trauma, platelets <100k, INR >1.7, DOAC within 48h — and the app writes your documentation line as you screen.',
        },
      ],
    },

    {
      id: 'ivt-treat',
      title: 'Administer Thrombolysis',
      renderClone: renderSKIVTTreat,
      hotspots: [
        {
          id: 'tnk-dose',
          anchorSelector: '[data-sk="tnk-dose"]',
          title: 'Real doses at the bedside',
          description:
            'TNK 0.25 mg/kg IV bolus (max 25 mg) over 5 seconds — or alteplase 0.9 mg/kg (max 90 mg), 10% bolus then the rest over an hour. Drug names link to full monographs.',
          navigateTo: 'ich',
          guidedOrder: 9,
        },
        {
          id: 'safety-flag',
          anchorSelector: '[data-sk="safety-flag"]',
          title: 'Safety flags under the title',
          description:
            'BP <180/105 × 24h, neuro checks q15min, no antithrombotics × 24h — with the emergent-NCCT-and-reversal plan for any decline pre-loaded.',
        },
        {
          id: 'toolbar',
          anchorSelector: '[data-sk="toolbar"]',
          title: 'Twenty tools under your thumb',
          description:
            'NIHSS, LKW clock, LVO screen, EVT criteria, bleed reversal, and the full decision map — docked at the bottom of every consult page.',
        },
      ],
    },

    {
      id: 'ich',
      title: 'Intracerebral Hemorrhage',
      renderClone: renderSKICH,
      hotspots: [
        {
          id: 'reversal',
          anchorSelector: '[data-sk="reversal"]',
          title: 'ICH mode: reversal in seconds',
          description:
            'Praxbind 5 g IV for dabigatran, 4-Factor PCC 50 IU/kg for Xa inhibitors — plus BP targets, surgical triggers, and the ICH score. Launch myStroke-Kitt and run your next code stroke with it.',
          guidedOrder: 10,
        },
      ],
    },
  ],
};

