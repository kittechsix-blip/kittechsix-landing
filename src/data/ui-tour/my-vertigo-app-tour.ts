// brand-audit-exempt: tour metadata mirroring the toured app's own accents and
// screen chrome (app-identity data, not landing chrome).
// myVertigoApp UI tour — pixel-faithful clone screens + guided GRACE-3 narrative.
// Content sourced from recon/my-vertigo-app.md (real app: https://my-vertigo-app.vercel.app).

import type { UITourConfig } from '../../components/ui-tour.js';
import {
  renderVTSafety,
  renderVTTiming,
  renderVTHints,
  renderVTEpley,
  renderVTStroke,
  renderVTDispo,
} from '../../components/ui-tour-clones/my-vertigo-app-clone.js';

export const vtTour: UITourConfig = {
  appId: 'my-vertigo-app',
  appName: 'myVertigoApp',
  eyebrow: 'Tour the UI',
  subtitle:
    'The Dizzy Patient Workup — a complete GRACE-3 pathway on your phone: Deadly D’s screening, HINTS+ with auto-dictation, bedside maneuvers with hold timers, and a QR-shareable discharge plan. Built by a practicing ER doc.',
  accentColor: '#BF5700',
  liveUrl: 'https://my-vertigo-app.vercel.app',
  initialScreen: 'safety',
  screens: [
    {
      id: 'safety',
      title: 'Safety — The Deadly D’s',
      renderClone: renderVTSafety,
      hotspots: [
        {
          id: 'pills',
          anchorSelector: '[data-vt="pills"]',
          title: 'Seven modules, one algorithm',
          description:
            'Safety → Timing → BPPV → HINTS+ → Mimics → Stroke → Dispo. The glass pill rail shows exactly where you are in the GRACE-3 pathway — completed modules get a ✓, red flags flip to a red ⚠, and you can jump anywhere with a tap.',
          guidedOrder: 1,
        },
        {
          id: 'danger-item',
          anchorSelector: '[data-vt="danger-item"]',
          title: 'Red flags first',
          description:
            'The Deadly D’s: diplopia, dysarthria, dysphonia, dysmetria, dysphagia — plus the hard stops. Severe truncal ataxia (can’t sit on the bed edge with arms crossed) is a cerebellar stroke until proven otherwise. One tap and the whole card flips red.',
          guidedOrder: 2,
        },
        {
          id: 'danger-cta',
          anchorSelector: '[data-vt="danger-cta"]',
          title: 'One finding changes everything',
          description:
            'Any single positive Deadly D reroutes the workup: the button turns brick-red, pulses, and routes straight to the stroke pathway — you’ll see that endpoint at the end of this tour. Cleared everything? The green All Clear path advances to Timing & Triggers.',
          navigateTo: 'timing',
          guidedOrder: 3,
        },
        {
          id: 'disclaimer',
          anchorSelector: '[data-vt="disclaimer"]',
          title: 'Honest labeling, every screen',
          description:
            'NOT FDA CLEARED — for licensed clinicians, not a substitute for judgment. It rides on every workup page of the real product. Transparency is part of the trust story.',
        },
      ],
    },

    {
      id: 'timing',
      title: 'Timing & Triggers (GRACE-3)',
      renderClone: renderVTTiming,
      hotspots: [
        {
          id: 'avs-option',
          anchorSelector: '[data-vt="avs-option"]',
          title: 'Classify by timing & triggers',
          description:
            'GRACE-3 says stop asking “what kind of dizzy.” Continuous > 24 h and present at rest = AVS — top differential is posterior-circulation stroke vs. acute unilateral vestibulopathy. Tap it and the app takes you straight to HINTS.',
          navigateTo: 'hints',
          guidedOrder: 4,
        },
        {
          id: 'sources',
          anchorSelector: '[data-vt="sources"]',
          title: '📚 Sources built in',
          description:
            'Every decision node carries its citations — GRACE-3 here — collapsed one tap away so the evidence never clutters the card.',
        },
      ],
    },

    {
      id: 'hints',
      title: 'HINTS+ Calculator',
      renderClone: renderVTHints,
      hotspots: [
        {
          id: 'hints-result',
          anchorSelector: '[data-vt="hints-result"]',
          title: 'HINTS+, interpreted for you',
          description:
            'Three peripheral findings + normal bilateral hearing = vestibular neuritis. No MRI needed. In skilled hands HINTS outperforms early MRI in the first 24–48 hours — the calculator walks you through it finding by finding, and any single central finding surfaces the stroke workup immediately.',
          guidedOrder: 5,
        },
        {
          id: 'hearing',
          anchorSelector: '[data-vt="hearing"]',
          title: 'The “+” that catches AICA',
          description:
            'A peripheral HINTS with unilateral hearing loss still buys an MRI with DWI — the labyrinthine artery comes off AICA. A 10-second finger-rub exam catches the stroke HINTS alone would miss.',
        },
        {
          id: 'dictation',
          anchorSelector: '[data-vt="dictation"]',
          title: 'Your chart note, written',
          description:
            'A defensible, exam-specific HINTS note generated as you tap — nystagmus, skew, head impulse, hearing, interpretation — ready to dictate straight into the chart. Documentation that matches what you actually did.',
          navigateTo: 'epley',
          guidedOrder: 6,
        },
      ],
    },

    {
      id: 'epley',
      title: 'Epley Maneuver',
      renderClone: renderVTEpley,
      hotspots: [
        {
          id: 'epley-steps',
          anchorSelector: '[data-vt="epley-steps"]',
          title: 'Bedside maneuvers, step-by-step',
          description:
            'The Epley as a numbered timeline with hold timers — 1 minute per position, 10+ minutes seated at the end, then repeat the Dix-Hallpike to confirm the cure. Run it right off the phone at the bedside.',
          guidedOrder: 7,
        },
        {
          id: 'video',
          anchorSelector: '[data-vt="video"]',
          title: 'Curated video clips',
          description:
            'Each maneuver links to a vetted demonstration, pre-scrubbed to the exact seconds that matter — 9:26–10:25 for the Epley. No hunting through a 20-minute lecture mid-shift.',
        },
        {
          id: 'toolbar',
          anchorSelector: '[data-vt="toolbar"]',
          title: 'The expert toolbar adapts',
          description:
            'In the BPPV module: Lateralize, Dix-Hallpike, Supine Roll, Epley — plus PRO branches for Gufoni, BBQ Roll, and Semont. Switch modules and the toolbar re-arms with that module’s tools. Now — remember that red flag from step one? Here’s where it lands.',
          navigateTo: 'stroke',
          guidedOrder: 8,
        },
      ],
    },

    {
      id: 'stroke',
      title: 'Stroke Workup — Hard Stop',
      renderClone: renderVTStroke,
      hotspots: [
        {
          id: 'stroke-card',
          anchorSelector: '[data-vt="stroke-card"]',
          title: 'Concern for CVA — the hard stop',
          description:
            'Any central finding — a Deadly D, a central HINTS result — and the app goes full brick-red: MRI with DWI, neurology consult, admit. It also reminds you posterior fossa strokes hide from early imaging — repeat MRI at 72 h if the first scan is negative and suspicion remains.',
          navigateTo: 'dispo',
          guidedOrder: 9,
        },
      ],
    },

    {
      id: 'dispo',
      title: 'Disposition Builder',
      renderClone: renderVTDispo,
      hotspots: [
        {
          id: 'dispo-meds',
          anchorSelector: '[data-vt="dispo-meds"]',
          title: 'Meds with guardrails',
          description:
            'Meclizine 25 mg PO q8h PRN — flagged to cap at ~72 hours so you don’t delay vestibular compensation. Ondansetron 4 mg ODT q6h PRN with a QT and hepatic screen reminder. The safety notes ride along with every order.',
        },
        {
          id: 'dispo-qr',
          anchorSelector: '[data-vt="dispo-qr"]',
          title: 'Discharge in 30 seconds',
          description:
            'Diagnosis, meds, vestibular rehab, and return precautions assemble into a printable plan with a QR code the patient scans right off your screen. That’s the whole dizzy workup, door to discharge — open myVertigoApp and run it on your next shift. Free, no sign-up.',
          guidedOrder: 10,
        },
      ],
    },
  ],
};

