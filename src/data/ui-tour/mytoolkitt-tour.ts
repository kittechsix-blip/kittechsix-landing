import type { UITourConfig } from '../../components/ui-tour.js';
import {
  renderTKUpload,
  renderTKAnalysis,
  renderTKDifferential,
} from '../../components/ui-tour-clones/mytoolkitt-clone.js';

export const myToolKittTour: UITourConfig = {
  appId: 'mytoolkitt',
  appName: 'MyToolKitt',
  eyebrow: 'Concept Preview',
  subtitle:
    'MyToolKitt is in design — these wireframes show the planned flow for AI clinical image analysis. Tap any dot to see what each piece will do once shipped.',
  accentColor: '#6E56CF',
  initialScreen: 'upload',
  screens: [
    {
      id: 'upload',
      title: 'Capture',
      renderClone: renderTKUpload,
      hotspots: [
        {
          id: 'banner',
          anchorSelector: '[data-tk="banner"]',
          title: 'Concept badge',
          description: 'These screens are wireframes, not the shipped app. The real UI will inherit the kittechsix design system once development starts.',
          guidedOrder: 1,
        },
        {
          id: 'upload-zone',
          anchorSelector: '[data-tk="upload-zone"]',
          title: 'Capture zone',
          description: 'Coming Soon — tap to open the in-app camera, or drag a photo from gallery. Supports rashes, X-rays, ECGs, wounds, and ultrasound stills.',
          guidedOrder: 2,
        },
        {
          id: 'btn-camera',
          anchorSelector: '[data-tk="btn-camera"]',
          title: 'Use camera',
          description: 'Coming Soon — opens the system camera with auto-flash, focus lock on the lesion, and an optional clinical scale overlay.',
          guidedOrder: 3,
        },
        {
          id: 'btn-gallery',
          anchorSelector: '[data-tk="btn-gallery"]',
          title: 'From gallery',
          description: 'Coming Soon — pick an existing photo. EXIF stripped before upload; no PHI leaves the device until you confirm.',
        },
        {
          id: 'btn-history',
          anchorSelector: '[data-tk="btn-history"]',
          title: 'Recent captures',
          description: 'Coming Soon — your last analyses, locally cached. Helps you re-pull a description for a follow-up patient without re-shooting.',
        },
        {
          id: 'btn-feedback',
          anchorSelector: '[data-tk="btn-feedback"]',
          title: 'Feedback',
          description: 'Coming Soon — flag an analysis as wrong or send a feature request. Feedback is what shapes which tools land in the next release.',
        },
      ],
    },

    {
      id: 'analysis',
      title: 'AI Analysis',
      renderClone: renderTKAnalysis,
      hotspots: [
        {
          id: 'image',
          anchorSelector: '[data-tk="image"]',
          title: 'Image preview',
          description: 'Coming Soon — your captured photo with optional annotation overlay (highlighted regions the model attended to).',
          guidedOrder: 4,
        },
        {
          id: 'reasoning',
          anchorSelector: '[data-tk="reasoning"]',
          title: 'Reasoning trace',
          description: 'Coming Soon — plain-language summary of the visual features that drove the differential. Not a black box: you see why before you decide.',
          guidedOrder: 5,
        },
        {
          id: 'btn-reanalyze',
          anchorSelector: '[data-tk="btn-reanalyze"]',
          title: 'Re-analyze',
          description: 'Coming Soon — runs the model again with a different prompt strategy. Useful when the first pass overweights a single feature.',
        },
        {
          id: 'btn-view-dx',
          anchorSelector: '[data-tk="btn-view-dx"]',
          title: 'View differential',
          description: 'Coming Soon — opens the ranked differential. The reasoning trace stays accessible from there so you can cross-check.',
          navigateTo: 'differential',
          guidedOrder: 6,
        },
      ],
    },

    {
      id: 'differential',
      title: 'Differential',
      renderClone: renderTKDifferential,
      hotspots: [
        {
          id: 'dx-top',
          anchorSelector: '[data-tk="dx-top"]',
          title: 'Top diagnosis',
          description: 'Coming Soon — confidence score from the embedded LLM. Tap to see the visual features that drove the rank. Above 80% is "high confidence"; below means review.',
          guidedOrder: 7,
        },
        {
          id: 'description',
          anchorSelector: '[data-tk="description"]',
          title: 'Consult-ready description',
          description: 'Coming Soon — formal medical language ready to paste into a derm consult, ED note, or admission H&P. No marketing fluff, no "as an AI" disclaimers.',
          guidedOrder: 8,
        },
        {
          id: 'btn-copy',
          anchorSelector: '[data-tk="btn-copy"]',
          title: 'Copy description',
          description: 'Coming Soon — clipboard-ready text. Will paste cleanly into Epic, Cerner, or whatever EMR text field you point it at.',
          guidedOrder: 9,
        },
        {
          id: 'btn-share-dx',
          anchorSelector: '[data-tk="btn-share-dx"]',
          title: 'Send to EMR',
          description: 'Coming Soon — handoff via the device share sheet. We won\'t store PHI; this just routes the text to your EMR\'s app.',
        },
      ],
    },
  ],
};
