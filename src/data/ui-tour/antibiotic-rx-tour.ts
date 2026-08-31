// brand-audit-exempt: tour metadata mirroring the toured app's own accents and
// screen chrome (app-identity data, not landing chrome).
import type { UITourConfig } from '../../components/ui-tour.js';
import {
  renderRxDisclaimer,
  renderRxPicker,
  renderRxResult,
  renderRxCulture,
  renderRxParams,
  renderRxAntibiogram,
  renderRxCalc,
} from '../../components/ui-tour-clones/antibiotic-rx-clone.js';

export const rxTour: UITourConfig = {
  appId: 'antibiotic-rx',
  appName: 'Antibiotic Rx',
  eyebrow: 'Tour the UI',
  subtitle:
    'Empiric and culture-directed antibiotic therapy for ~130 infection syndromes across 20 categories — toggle the patient in front of you, overlay your local antibiogram, and let the peds and renal math run itself.',
  accentColor: '#4338CA',
  initialScreen: 'disclaimer',
  liveUrl: 'https://antibiotic-rx.vercel.app',
  screens: [
    {
      id: 'disclaimer',
      title: 'Clinician gate',
      renderClone: renderRxDisclaimer,
      hotspots: [
        {
          id: 'gate',
          anchorSelector: '[data-rx="gate"]',
          title: 'Built for the people who write the order',
          description:
            'A clinician-gated cognitive aid — evidence-based empiric and culture-directed regimens, everything on-device, nothing transmitted. This is the cold open every physician sees first.',
          guidedOrder: 1,
        },
        {
          id: 'gate-cta',
          anchorSelector: '[data-rx="gate-cta"]',
          title: 'One tap in',
          description:
            'No account, no login, no PHI. "I am a clinician — I understand" drops you straight into the infection library.',
          navigateTo: 'picker',
        },
      ],
    },
    {
      id: 'picker',
      title: 'Infection library',
      renderClone: renderRxPicker,
      hotspots: [
        {
          id: 'search',
          anchorSelector: '[data-rx="search"]',
          title: 'Type the bug or the syndrome',
          description:
            'Search "MRSA", "pyelo", or "meningitis" and land on the right regimen in a second — organisms, syndromes, and infection names all match.',
          guidedOrder: 2,
        },
        {
          id: 'inf-cap',
          anchorSelector: '[data-rx="inf-cap"]',
          title: '~130 syndromes, 20 categories',
          description:
            'From CAP to necrotizing fasciitis to Staph aureus bacteremia — every row carries its likely pathogens. Tap Community-Acquired Pneumonia to open the recommendation.',
          navigateTo: 'result',
          guidedOrder: 3,
        },
      ],
    },
    {
      id: 'result',
      title: 'The recommendation',
      renderClone: renderRxResult,
      hotspots: [
        {
          id: 'regimen',
          anchorSelector: '[data-rx="regimen"]',
          title: 'First-line, alternatives, duration, evidence',
          description:
            'CAP outpatient in one glance: Amoxicillin 1 g PO TID first-line, doxycycline or a macrolide as alternatives, a 5-day minimum, and the IDSA/ATS 2019 reasoning baked in — >30% US pneumococcal macrolide resistance and all.',
          guidedOrder: 4,
        },
        {
          id: 'pathseg',
          anchorSelector: '[data-rx="pathseg"]',
          title: 'Two paths, one card',
          description:
            'Flip to culture-directed the moment the Gram stain lands — organism-specific therapy in the same card, emerald-tabbed.',
          navigateTo: 'culture',
          guidedOrder: 5,
        },
      ],
    },
    {
      id: 'culture',
      title: 'Culture-directed',
      renderClone: renderRxCulture,
      hotspots: [
        {
          id: 'org-card',
          anchorSelector: '[data-rx="org-card"]',
          title: 'Narrow to the organism',
          description:
            'Penicillin-susceptible S. pneumoniae drops you to Amoxicillin 1 g PO TID; Legionella swings to levofloxacin; MRSA to vancomycin or linezolid. De-escalation is one tap, not a fresh lookup.',
          guidedOrder: 6,
        },
      ],
    },
    {
      id: 'params',
      title: 'Patient parameters',
      renderClone: renderRxParams,
      hotspots: [
        {
          id: 'physio',
          anchorSelector: '[data-rx="physio"]',
          title: 'Toggle the patient in front of you',
          description:
            'Anaphylaxis, pregnancy, CrCl 22, MRSA risk — flip the chips and the regimen rewrites itself. This is the interactive core: the recommendation is never generic.',
          guidedOrder: 7,
        },
        {
          id: 'modifiers',
          anchorSelector: '[data-rx="modifiers"]',
          title: 'Adjustments for your patient',
          description:
            'Every active toggle prepends a safety flag and a modifiers card — here MRSA risk adds vancomycin 15–20 mg/kg IV q8–12h or linezolid 600 mg IV/PO q12h to the empiric regimen.',
          navigateTo: 'antibiogram',
          guidedOrder: 8,
        },
      ],
    },
    {
      id: 'antibiogram',
      title: 'Local antibiogram',
      renderClone: renderRxAntibiogram,
      hotspots: [
        {
          id: 'abg',
          anchorSelector: '[data-rx="abg-table"]',
          title: 'Know your unit',
          description:
            'Your institution’s own susceptibilities overlay the recommendation, so a drug the guideline ranks first can drop below one your unit still has coverage for. National guidance tells you what usually works. This tells you what works here.',
          navigateTo: 'calc',
          guidedOrder: 9,
        },
      ],
    },
    {
      id: 'calc',
      title: 'Dose calculator',
      renderClone: renderRxCalc,
      hotspots: [
        {
          id: 'peds-calc',
          anchorSelector: '[data-rx="calc-result"]',
          title: 'Do the math',
          description:
            'Weight-based peds dosing with Broselow zones — 18 kg gives 270 mg per dose — plus live CrCl renal tiering. The arithmetic is done before you reach for a calculator. Open the live app and try it on your own patient.',
          guidedOrder: 10,
        },
      ],
    },
  ],
};

