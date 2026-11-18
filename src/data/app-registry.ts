// App Registry — the single per-app record for the whole site.
//
// Everything a surface needs to describe an app lives here exactly once:
// editorial copy (index rows), showcase copy (Overview tab), the UI tour
// config, commerce state, and the identity accent. /work and /work/:id read
// nothing else. Flip `forSale: true` + set `checkoutUrl` (Polar hosted
// checkout link) and the primary CTA becomes a Buy button.

/** Per-app identity color (drawn from the app icon) used to theme its page. */
export interface AppAccent {
  /** mid-tone — check glyphs, active tab fill */
  base: string;
  /** pale wash — chip/tag backgrounds */
  soft: string;
  /** dark shade — text on light backgrounds */
  deep: string;
}

/** Every app the site knows about, live or not. */
export interface AppListing {
  id: string;
  name: string;
  liveUrl: string | null;
  /** Hosted checkout link from the payment provider (Polar). null until the product exists. */
  checkoutUrl: string | null;
  /** Display price shown on the Buy CTA, e.g. '$19'. */
  price: string | null;
  forSale: boolean;
  accent: AppAccent;
}

/**
 * A portfolio app with a /work/:id page. Superset of AppListing — every field the
 * index row and Overview showcase need, plus an optional UI tour when one has
 * been built.
 */
export interface WorkApp extends AppListing {
  /** Editorial chapter number, '01'–'07'. */
  chapter: string;
  /** Short discipline label, e.g. 'Reasoning engine'. Doubles as the index category. */
  discipline: string;
  /** One-line editorial claim shown on the /work index. */
  statement: string;
  /** Terse proof points shown on the /work index. */
  proof: string;
  /** Audience label above the Overview headline. */
  eyebrow: string;
  /** clinical -> green eyebrow; consumer -> copper eyebrow. */
  domain: 'clinical' | 'consumer';
  /** Overview paragraph. */
  description: string;
  features: { icon: string; text: string }[];
  /** Oversized proof point in the Overview portrait. */
  metric: string;
  metricLabel: string;
  status: 'In Development' | 'Coming Soon' | 'Live';
  iconSrc: string;
}

/** Display order of the /work index and the chapter numbering. */
export const WORK_ORDER = [
  'mymedkitt',
  'myvertigoapp',
  'acidbase',
  'mystroke-kitt',
  'electrokitt',
  'endocrinekitt',
  'echokitt',
] as const;

export type WorkAppId = (typeof WORK_ORDER)[number];

export const WORK_APPS: Record<WorkAppId, WorkApp> = {
  mymedkitt: {
    id: 'mymedkitt',
    name: 'myMedKitt',
    chapter: '01',
    discipline: 'Emergency medicine system',
    statement: 'The emergency department, compressed into the phone in your pocket.',
    proof: '353 consults · 306 drugs · offline-first',
    eyebrow: 'For emergency clinicians',
    domain: 'clinical',
    description:
      'Evidence-based clinical decision trees for the emergency department. Built for the phone in your pocket, designed for the patient in front of you.',
    features: [
      { icon: '🩺', text: '353 evidence-based ED consults' },
      { icon: '💊', text: '306 drugs across 945 dosing indications, with weight-based calculators' },
      { icon: '🧮', text: '500+ bedside calculators (PESI, NIHSS, TIMI, Sgarbossa)' },
      { icon: '📴', text: 'Fully offline PWA' },
    ],
    metric: '353',
    metricLabel: 'evidence-based ER consults',
    status: 'Live',
    iconSrc: 'assets/icons/mymedkitt-current.png',
    liveUrl: null,
    checkoutUrl: null,
    price: null,
    forSale: false,
    accent: { base: '#2E9E5B', soft: '#E4F3EA', deep: '#1F6B3D' },
  },

  myvertigoapp: {
    id: 'myvertigoapp',
    name: 'my-vertigo-app',
    chapter: '02',
    discipline: 'Focused clinical workflow',
    statement: 'A clearer path through the dizzy patient, from exam to disposition.',
    proof: 'HINTS+ · all three canals · 29 citations',
    eyebrow: 'For the dizzy-patient workup',
    domain: 'clinical',
    description:
      'Bedside decision support for the dizzy patient. Walk the HINTS exam, run Dix-Hallpike, and guide Epley or Semont maneuvers — then build a shareable discharge plan in seconds.',
    features: [
      { icon: '🌀', text: 'HINTS exam guide with stroke triage' },
      { icon: '🎯', text: 'Epley & Semont maneuver walkthroughs' },
      { icon: '📋', text: 'Disposition builder with QR sharing' },
      { icon: '📱', text: 'Web PWA + native iOS/Android' },
    ],
    metric: 'HINTS+',
    metricLabel: 'exam to maneuver to disposition',
    status: 'Live',
    iconSrc: 'assets/icons/myvertigoapp.png',
    liveUrl: null,
    checkoutUrl: null,
    price: null,
    forSale: false,
    accent: { base: '#8A3324', soft: '#FAF4EB', deep: '#5E2418' },
  },

  acidbase: {
    id: 'acidbase',
    name: 'AcidBase',
    chapter: '03',
    discipline: 'Reasoning engine',
    statement: 'From one blood gas to the disorder, the why, and what comes next.',
    proof: 'Mixed disorders · differential · treatment',
    eyebrow: 'For ABG interpretation',
    domain: 'clinical',
    description:
      'The complete acid-base analyzer. Enter an ABG and chemistry — AcidBase names the disorder, explains why, detects mixed disorders, then gives you the differential, the workup to narrow it, and evidence-based treatment with doses.',
    features: [
      { icon: '🧮', text: 'Anion gap (albumin-corrected), delta ratio & osmolar gap' },
      { icon: '🔀', text: 'Mixed-disorder detection via compensation formulas' },
      { icon: '💊', text: 'Differential, workup & EBM treatment with doses' },
      { icon: '📴', text: 'Runs entirely on-device — no patient data leaves your phone' },
    ],
    metric: '1 ABG',
    metricLabel: 'disorder, reasoning, workup, treatment',
    status: 'Live',
    iconSrc: 'assets/icons/acidbase.png',
    liveUrl: null,
    checkoutUrl: null,
    price: null,
    forSale: false,
    accent: { base: '#3D7EA6', soft: '#E5EFF6', deep: '#2A5A79' },
  },

  'mystroke-kitt': {
    id: 'mystroke-kitt',
    name: 'myStroke-Kitt',
    chapter: '04',
    discipline: 'Time-critical decision support',
    statement: 'Code-stroke decisions organized for the minutes that change outcomes.',
    proof: 'NIHSS · TNK dosing · hard-stop logic',
    eyebrow: 'For code stroke',
    domain: 'clinical',
    description:
      'The complete code-stroke companion. Triage to CT, NIHSS at the bedside, thrombolysis contraindications with hard stops, TNK dosing, and dedicated ischemic, hemorrhagic, and mimic pathways — the whole resuscitation on one screen at a time.',
    features: [
      { icon: '🧠', text: 'Guided triage → CT → pathway decision tree' },
      { icon: '📝', text: 'NIHSS fast-sheet with live score interpretation' },
      { icon: '💉', text: 'TNK 0.25 mg/kg dosing with contraindication hard stops' },
      { icon: '🩸', text: 'ICH pathway: reversal agents, BP targets, ICH score' },
    ],
    metric: '20',
    metricLabel: 'code-stroke tools in one workflow',
    status: 'Live',
    iconSrc: 'assets/icons/mystroke-kitt.png',
    liveUrl: null,
    checkoutUrl: null,
    price: null,
    forSale: false,
    accent: { base: '#C8452C', soft: '#F9E8E3', deep: '#99321F' },
  },

  electrokitt: {
    id: 'electrokitt',
    name: 'ElectroKitt',
    chapter: '05',
    discipline: 'Electrolyte reasoning engine',
    statement: 'Five electrolytes, one coupled bedside engine.',
    proof: 'Na · K · Ca · Mg · PO₄',
    eyebrow: 'For electrolyte disorders',
    domain: 'clinical',
    description:
      'A bedside electrolyte disorder engine for sodium, potassium, calcium, magnesium, and phosphate — with classification, ranked differential reasoning, evidence-cited management pathways, and dose calculators in one coupled panel.',
    features: [
      { icon: '🧪', text: 'Sodium, potassium, calcium, magnesium & phosphate in one workflow' },
      { icon: '🧠', text: 'Ranked differential with the reasoning shown' },
      { icon: '📋', text: 'Evidence-cited management pathways' },
      { icon: '🧮', text: 'Bedside correction and dose calculators' },
    ],
    metric: '5',
    metricLabel: 'electrolyte systems in one coupled panel',
    status: 'In Development',
    iconSrc: 'assets/icons/electrokitt.png',
    liveUrl: null,
    checkoutUrl: null,
    price: null,
    forSale: false,
    accent: { base: '#8A3324', soft: '#F4EBE6', deep: '#5E2418' },
  },

  endocrinekitt: {
    id: 'endocrinekitt',
    name: 'EndocrineKitt',
    chapter: '06',
    discipline: 'Ordered endocrine emergency care',
    statement: 'Endocrine emergencies organized around the steps that must never be swapped.',
    proof: '5 axes · prerequisite locks · private review',
    eyebrow: 'For endocrine emergencies',
    domain: 'clinical',
    description:
      'A bedside endocrine-emergency engine: pick an axis, work the panel, understand why the patient looks this way, then follow management in the order it must happen. Prerequisite locks keep time-critical steps from being performed in the wrong sequence.',
    features: [
      { icon: '🧬', text: 'Thyroid, adrenal, pancreas, parathyroid, and pituitary axes' },
      { icon: '🔒', text: 'Prerequisite locks enforce the order of time-critical care' },
      { icon: '🧠', text: 'Plain-language pathophysiology and ranked differential reasoning' },
      { icon: '📚', text: 'Source sheet joined to the adjudicated evidence corpus' },
    ],
    metric: '5',
    metricLabel: 'endocrine axes with ordered management',
    status: 'In Development',
    iconSrc: 'assets/icons/endocrinekitt.png',
    liveUrl: null,
    checkoutUrl: null,
    price: null,
    forSale: false,
    accent: { base: '#8A3324', soft: '#F4EBE6', deep: '#5E2418' },
  },

  echokitt: {
    id: 'echokitt',
    name: 'EchoKitt',
    chapter: '07',
    discipline: 'Bedside ultrasound learning',
    statement: 'Learn to scan by seeing it: every view, every finding, in motion.',
    proof: '24 cardiac & lung topics · looping clips · private study',
    eyebrow: 'For learning bedside ultrasound',
    domain: 'clinical',
    description:
      'A visual-first point-of-care ultrasound guide. Each cardiac and lung topic shows where the probe goes, what a normal image looks like, what the abnormal finding looks like, and how to measure it, mostly as short looping clips. A Scan Now mode then walks you through the scan one large step at a time at the bedside.',
    features: [
      { icon: '🫀', text: '13 cardiac topics, from windows to tamponade, RV strain and VTI' },
      { icon: '🫁', text: '11 lung topics, from pneumothorax and B-lines to thoracentesis' },
      { icon: '🎞️', text: 'Looping clips and probe-placement diagrams on every card' },
      { icon: '🧤', text: 'Scan Now mode: one step per screen with large type, usable with gloves on' },
    ],
    metric: '24',
    metricLabel: 'cardiac and lung ultrasound topics',
    status: 'In Development',
    iconSrc: 'assets/icons/echokitt.png',
    liveUrl: null,
    checkoutUrl: null,
    price: null,
    forSale: false,
    accent: { base: '#8A3324', soft: '#F4EBE6', deep: '#5E2418' },
  },
};

/** Apps that are not (yet) shipped — listed for commerce/accent lookups only. */
const UNSHIPPED: Record<string, AppListing> = {
  powerkitt: {
    id: 'powerkitt',
    name: 'PowerKitt',
    liveUrl: null,
    checkoutUrl: null,
    price: null,
    forSale: false,
    accent: { base: '#8A5524', soft: '#F5EDE4', deep: '#5E3715' },
  },
};

export const APP_REGISTRY: Record<string, AppListing> = { ...WORK_APPS, ...UNSHIPPED };

/** Ordered list for the /work index. */
export function listWorkApps(): WorkApp[] {
  return WORK_ORDER.map((id) => WORK_APPS[id]);
}

/** Safe lookup — returns null for an unknown or unshipped id. Never throws. */
export function getWorkApp(id: string): WorkApp | null {
  return Object.prototype.hasOwnProperty.call(WORK_APPS, id)
    ? WORK_APPS[id as WorkAppId]
    : null;
}
