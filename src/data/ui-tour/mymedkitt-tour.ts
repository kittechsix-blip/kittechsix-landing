// brand-audit-exempt: tour metadata mirroring the toured app's own accents and
// screen chrome (app-identity data, not landing chrome).
// myMedKitt UI tour — walks one real DKA resuscitation end-to-end:
// Dashboard → decision tree → weight-based insulin dosing → evidence-graded
// result → Steps Summary (Ischemic Stroke) → 📊 Visual infographic overlay.
// All clinical content is the app's real content (recon/mymedkitt.md).

import type { UITourConfig } from '../../components/ui-tour.js';
import {
  renderMKDashboard,
  renderMKConsult,
  renderMKDrugModal,
  renderMKResult,
  renderMKSummary,
  renderMKVisual,
} from '../../components/ui-tour-clones/mymedkitt-clone.js';

export const mkTour: UITourConfig = {
  appId: 'mymedkitt',
  appName: 'myMedKitt',
  eyebrow: 'Tour the UI',
  subtitle:
    'The flagship: 353 evidence-based consults across 23 categories, 306 drugs, 20+ calculators — offline, free, no sign-up. Walk one real DKA resuscitation from dashboard to dosed insulin drip.',
  accentColor: '#3CB371',
  initialScreen: 'dashboard',
  liveUrl: 'https://kittechsix-blip.github.io/mymedkitt/app.html',
  screens: [
    {
      id: 'dashboard',
      title: 'Dashboard — Command Center',
      renderClone: renderMKDashboard,
      hotspots: [
        {
          id: 'search',
          anchorSelector: '[data-mk="search"]',
          title: 'One search box for everything',
          description:
            'Type "dka", "diltiazem", or "PESI" — the first keystroke returns ranked results across 353 consults, 306 drugs, and 20+ calculators, each badged by type so you grab the right one at a glance.',
          guidedOrder: 1,
        },
        {
          id: 'recent-dka',
          anchorSelector: '[data-mk="recent-dka"]',
          title: 'Recents — last shift, one tap',
          description:
            'The consults you opened last ride up front in a carousel, each ringed in its specialty color. Let’s reopen DKA and pick it up mid-resuscitation.',
          navigateTo: 'consult',
          guidedOrder: 2,
        },
        {
          id: 'cat-cardiology',
          anchorSelector: '[data-mk="cat-cardiology"]',
          title: 'Specialty glass cards',
          description:
            'Twenty specialties as color-coded metallic glass — Cardiology red, EM blue, Neurology teal. Every card shows its live consult count; you’re two taps from any answer.',
        },
        {
          id: 'hubs',
          anchorSelector: '[data-mk="hubs"]',
          title: 'Chief Complaint Hubs',
          description:
            'Start from the symptom instead of the diagnosis: sick check, can’t-miss exclusions, rescue therapy, imaging, and disposition — triage the way you actually think at the door.',
        },
        {
          id: 'legal',
          anchorSelector: '[data-mk="legal"]',
          title: 'Honest about what it is',
          description:
            'The NOT-FDA-CLEARED banner never hides. myMedKitt is educational decision support that sits under your clinical judgment — and says so on every screen.',
        },
      ],
    },

    {
      id: 'consult',
      title: 'DKA — Decision Tree',
      renderClone: renderMKConsult,
      hotspots: [
        {
          id: 'active-card',
          anchorSelector: '[data-mk="active-card"]',
          title: 'One decision at a time',
          description:
            'No wall-of-text protocol. Each card asks exactly one question — here, severity by pH, HCO3, and mentation — with a safety banner flagging the life threat before you choose.',
          guidedOrder: 3,
        },
        {
          id: 'option-severe',
          anchorSelector: '[data-mk="option-severe"]',
          title: 'Critical branches glow red',
          description:
            'Options carry urgency: the severe branch (pH <7.00, HCO3 <10, or altered mental status) renders in the red metallic gradient. You cannot miss the sick patient.',
        },
        {
          id: 'trail',
          anchorSelector: '[data-mk="trail"]',
          title: 'Your audit trail',
          description:
            'Every answer collapses into a pill — question → choice, edge-flagged by risk level. Scroll up to audit the whole path, or tap any pill to change your answer and re-branch.',
          guidedOrder: 4,
        },
        {
          id: 'tool-insulin',
          anchorSelector: '[data-mk="tool-insulin"]',
          title: 'The consult’s own toolkit',
          description:
            'Every consult carries a contextual toolbar: Visual, anion-gap calc, IV and SC insulin, K repletion, fluids, and a Do-NOT list. Tap IV Insulin to pull the drug card without leaving the tree.',
          navigateTo: 'drug',
          guidedOrder: 5,
        },
        {
          id: 'tool-stop',
          anchorSelector: '[data-mk="tool-stop"]',
          title: 'The Do-NOT list',
          description:
            'One tap opens the pitfalls for this exact diagnosis — like never starting insulin while K is below 3.3 mEq/L. Check it before you order, not after.',
        },
      ],
    },

    {
      id: 'drug',
      title: 'Pharmacy — Insulin Regular',
      renderClone: renderMKDrugModal,
      hotspots: [
        {
          id: 'route',
          anchorSelector: '[data-mk="route"]',
          title: 'Indication-aware drug cards',
          description:
            'Route badge up top, then a dosing card per indication — the same insulin card carries the DKA regimen and the hyperkalemia regimen (10 units IV with 25 g D50W), each independently cited.',
        },
        {
          id: 'dose-result',
          anchorSelector: '[data-mk="dose-result"]',
          title: 'Weight-based math, done',
          description:
            'Enter 80 kg and every dose computes instantly: 8 units optional bolus, 8 units/hr drip — the 2024 ADA consensus regimen, with the arithmetic shown so you can verify it.',
          navigateTo: 'result',
          guidedOrder: 6,
        },
        {
          id: 'broselow',
          anchorSelector: '[data-mk="broselow"]',
          title: 'Broselow + age-estimate modes',
          description:
            'No weight on a crashing kid? Switch to Broselow — tape color to estimated weight to doses — without ever leaving the drug card.',
        },
      ],
    },

    {
      id: 'result',
      title: 'Result — Evidence-Graded',
      renderClone: renderMKResult,
      hotspots: [
        {
          id: 'badge',
          anchorSelector: '[data-mk="badge"]',
          title: 'Graded endpoints, not essays',
          description:
            'Pathways end in a recommendation graded Definitive, Recommended, or Consider — announced with a drawn checkmark and a green confidence pulse. Exactly what you need at 2 AM, nothing you don’t.',
          guidedOrder: 7,
        },
        {
          id: 'dose-chip',
          anchorSelector: '[data-mk="dose-chip"]',
          title: 'Traffic-light dosing',
          description:
            '0.1 units/kg/hr IV sits in a mono green chip: green = standard confidence, orange = caution, red = critical. Hold criteria (K <3.3 mEq/L) and targets (glucose drop 50–75 mg/dL/hr) ride along. Next: rehearse an entire stroke code in 20 seconds.',
          navigateTo: 'summary',
          guidedOrder: 8,
        },
      ],
    },

    {
      id: 'summary',
      title: 'Steps Summary — Ischemic Stroke',
      renderClone: renderMKSummary,
      hotspots: [
        {
          id: 'ivt',
          anchorSelector: '[data-mk="ivt"]',
          title: 'The whole resus on one card',
          description:
            'Every consult ships a Steps Summary — here the full reperfusion pathway: BP <185/110 gate, Tenecteplase 0.25 mg/kg IV bolus (preferred), post-tPA neuro checks q15min. Rehearse it while the CT spins.',
          navigateTo: 'visual',
          guidedOrder: 9,
        },
        {
          id: 'steps-link',
          anchorSelector: '[data-mk="steps-link"]',
          title: 'Every bullet deep-links',
          description:
            'Each line is a live link into the decision tree — tap "Fingerstick glucose" and you land on that exact node, with the pathway answered up to that point.',
        },
      ],
    },

    {
      id: 'visual',
      title: 'Visual — Interactive Infographic',
      renderClone: renderMKVisual,
      hotspots: [
        {
          id: 'ig-title',
          anchorSelector: '[data-mk="ig-title"]',
          title: 'One tap to teach',
          description:
            'The Visual button opens an interactive infographic — the diagnostic triad, the three treatment pillars, live weight-based doses — wired across 73 consults and counting. That’s the tour: open the real app and run a consult on your next shift.',
          guidedOrder: 10,
        },
      ],
    },
  ],
};

// Back-compat alias — src/main.ts imports { myMedKittTour }.
export const myMedKittTour = mkTour;

