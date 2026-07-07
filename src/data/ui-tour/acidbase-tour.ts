import type { UITourConfig } from '../../components/ui-tour.js';
import {
  renderABHome,
  renderABDiagnosis,
  renderABWhy,
  renderABDifferential,
  renderABCalculator,
  renderABReference,
} from '../../components/ui-tour-clones/acidbase-clone.js';

export const abTour: UITourConfig = {
  appId: 'acidbase',
  appName: 'AcidBase',
  eyebrow: 'Tour the UI',
  subtitle:
    'A full acid-base disorder analyzer in your pocket — diagnosis, differential, workup, and dosed treatment from one ABG plus a BMP. Paste the values, get the answer, and check the math. Every screen explained.',
  accentColor: '#0E7490',
  liveUrl: 'https://acidbase.vercel.app',
  initialScreen: 'home',
  screens: [
    {
      id: 'home',
      title: 'Home — Enter the gas',
      renderClone: renderABHome,
      hotspots: [
        {
          id: 'logo',
          anchorSelector: '[data-ab="logo"]',
          title: 'ABG & metabolic analyzer',
          description:
            'One tool for the whole acid-base workup: diagnosis, differential, dosed treatment, and ten bedside calculators. Everything runs on-device — no login, no patient data leaves the phone.',
          guidedOrder: 1,
        },
        {
          id: 'examples',
          anchorSelector: '[data-ab="examples"]',
          title: 'One-tap real cases',
          description:
            'Skip the typing. Tap DKA, Salicylate, or Toxic alcohol and a real case populates and interprets in one touch — six presets that cover the can\'t-miss patterns.',
          guidedOrder: 2,
        },
        {
          id: 'input-form',
          anchorSelector: '[data-ab="input-form"]',
          title: 'Blood gas + chemistry',
          description:
            'pH 7.18, PaCO₂ 24, HCO₃⁻ 10, glucose 520 — out-of-range fields glow amber the instant you enter them. No lookup tables, no mental Winter\'s formula.',
          navigateTo: 'diagnosis',
          guidedOrder: 3,
        },
      ],
    },

    {
      id: 'diagnosis',
      title: 'Diagnosis',
      renderClone: renderABDiagnosis,
      hotspots: [
        {
          id: 'diagnosis',
          anchorSelector: '[data-ab="diagnosis"]',
          title: 'The answer, not a hint',
          description:
            'A bold primary diagnosis — High anion-gap metabolic acidosis — under a color-coded acid/base bar (warm orange = acidemia, violet = alkalemia, amber = mixed). Every process is spelled out as its own line.',
          guidedOrder: 4,
        },
        {
          id: 'pills',
          anchorSelector: '[data-ab="pills"]',
          title: 'Status at a glance',
          description:
            'Acidemia / alkalemia / mixed-disorder pills keyed to the app\'s clinical color language — warm orange for acid, cool violet for base, amber for mixed.',
        },
        {
          id: 'dock',
          anchorSelector: '[data-ab="dock"]',
          title: 'A chemistry utility belt',
          description:
            'Ten bedside calculators pinned to every screen — anion gap, delta ratio, compensation, osmolar gap, Na⁺ correction, bicarb deficit, toxic alcohols, salicylate, mnemonics. One tap, no app-switching.',
          guidedOrder: 5,
        },
      ],
    },

    {
      id: 'why',
      title: 'Show your work',
      renderClone: renderABWhy,
      hotspots: [
        {
          id: 'why',
          anchorSelector: '[data-ab="why"]',
          title: 'Why this conclusion',
          description:
            'Transparent reasoning, step by step: Winter\'s prediction 21–25 mmHg vs a measured PaCO₂ of 24 → appropriate compensation, not a second disorder. Trust the output because you can check it.',
          guidedOrder: 6,
        },
        {
          id: 'calc-grid',
          anchorSelector: '[data-ab="calc-grid"]',
          title: 'Every number, shown',
          description:
            'Anion gap 30 mEq/L, Winter\'s expected PaCO₂, delta ratio 1.3, potassium 5.2 — auto-flagged amber when it matters. The derived values that drive the diagnosis, laid bare.',
          navigateTo: 'differential',
          guidedOrder: 7,
        },
      ],
    },

    {
      id: 'differential',
      title: 'Differential + treatment',
      renderClone: renderABDifferential,
      hotspots: [
        {
          id: 'bucket',
          anchorSelector: '[data-ab="bucket"]',
          title: 'GOLD MARK, unpacked',
          description:
            'Open any process: mechanism, the GOLD MARK mnemonic (Mehta/Emmett, Lancet 2008), and exactly how to narrow it — β-hydroxybutyrate, lactate, osmolar gap.',
        },
        {
          id: 'treat',
          anchorSelector: '[data-ab="treat"]',
          title: 'Dosed treatment + Can\'t-miss flags',
          description:
            'Each cause carries Clues / Confirm / Treat with real doses on a green treat strip — insulin 0.1 U/kg/hr, Fomepizole 15 mg/kg, norepinephrine to MAP ≥65 — and red "Can\'t miss" pills on the killers.',
          navigateTo: 'calculator',
          guidedOrder: 8,
        },
      ],
    },

    {
      id: 'calculator',
      title: 'Bedside calculators',
      renderClone: renderABCalculator,
      hotspots: [
        {
          id: 'calc-result',
          anchorSelector: '[data-ab="calc-result"]',
          title: 'Live, standalone math',
          description:
            'Tap a dock tool and a sheet slides up with live-computing fields: Na⁺ − (Cl⁻ + HCO₃⁻) = 30 mEq/L, flagged amber against a normal of 8–12, then albumin-corrected — a mini-app inside the app.',
          navigateTo: 'reference',
          guidedOrder: 9,
        },
      ],
    },

    {
      id: 'reference',
      title: 'Formulas & reference',
      renderClone: renderABReference,
      hotspots: [
        {
          id: 'formulas',
          anchorSelector: '[data-ab="formulas"]',
          title: 'The whole reference card',
          description:
            'Every formula in one sheet — Winter\'s, albumin-corrected AG, delta ratio, osmolar gap, the Henderson check — plus the 7-step approach and sourcing from Marino, Rose & Post, and UpToDate. This is AcidBase — open the real thing and interpret your next gas.',
          guidedOrder: 10,
        },
      ],
    },
  ],
};
