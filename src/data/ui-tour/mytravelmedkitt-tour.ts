import type { UITourConfig } from '../../components/ui-tour.js';
import {
  renderTMHome,
  renderTMTripPrep,
  renderTMKit,
  renderTMSymptom,
  renderTMProfile,
} from '../../components/ui-tour-clones/mytravelmedkitt-clone.js';

export const myTravelMedKittTour: UITourConfig = {
  appId: 'mytravelmedkitt',
  appName: 'MyTravelMedKitt',
  eyebrow: 'Tour the UI',
  subtitle:
    'A native iOS travel-medicine companion. Add destinations, build a personalized OTC kit, and check symptoms on the go — every screen explained, every action labeled.',
  accentColor: '#007AFF',
  initialScreen: 'home',
  screens: [
    {
      id: 'home',
      title: 'Home — Active Trip',
      renderClone: renderTMHome,
      hotspots: [
        {
          id: 'trip-card',
          anchorSelector: '[data-tm="trip-card"]',
          title: 'Active trip card',
          description: 'Shows your current trip with destination, dates, and segment count. Tap to expand into the full per-destination plan with vaccines, meds, and health alerts.',
          guidedOrder: 1,
        },
        {
          id: 'btn-trip-prep',
          anchorSelector: '[data-tm="btn-trip-prep"]',
          title: 'Trip Prep',
          description: 'Pre-departure checklist tailored to your destinations: vaccines, meds, vector precautions, water/food rules.',
          navigateTo: 'trip-prep',
          guidedOrder: 2,
        },
        {
          id: 'btn-symptoms',
          anchorSelector: '[data-tm="btn-symptoms"]',
          title: 'Check Symptoms',
          description: 'Branching symptom-to-treatment guide. Tells you when self-treatment is safe and when to seek care abroad.',
          navigateTo: 'symptom',
        },
        {
          id: 'recent-1',
          anchorSelector: '[data-tm="recent-1"]',
          title: 'Recent treatments',
          description: 'Auto-logged whenever you mark a kit drug as taken. Tap to revisit dose, time, and which symptom drove it.',
        },
        {
          id: 'disclaimer',
          anchorSelector: '[data-tm="disclaimer"]',
          title: 'Educational disclaimer',
          description: 'Always visible — MyTravelMedKitt is decision support, not a prescription. Reflects the same legal posture as the rest of the kittechsix tools.',
        },
      ],
    },

    {
      id: 'trip-prep',
      title: 'Trip Prep',
      renderClone: renderTMTripPrep,
      hotspots: [
        {
          id: 'dest-h',
          anchorSelector: '[data-tm="dest-h"]',
          title: 'Multi-destination',
          description: 'A trip can be a single city or a multi-stop itinerary. Each leg gets its own activity tag (urban / beach / hiking) — vaccines and meds adjust accordingly.',
          guidedOrder: 3,
        },
        {
          id: 'dest-card',
          anchorSelector: '[data-tm="dest-card"]',
          title: 'Per-destination activity',
          description: 'Beach + Urban + Hiking generates a different kit than Beach alone — DEET concentration changes, altitude meds appear, sun-protection class shifts.',
        },
        {
          id: 'alert',
          anchorSelector: '[data-tm="alert"]',
          title: 'Health brief',
          description: 'Destination-specific alerts (altitude, malaria zone, dengue season, water risk). Surfaces above the kit so you don\'t miss the time-sensitive ones.',
          guidedOrder: 4,
        },
        {
          id: 'vacc-h',
          anchorSelector: '[data-tm="vacc-h"]',
          title: 'Vaccine recs',
          description: 'CDC-aligned recommendations per destination + activity. Greyed when not relevant for your specific itinerary; checkable when you\'ve received them.',
        },
        {
          id: 'meds-h',
          anchorSelector: '[data-tm="meds-h"]',
          title: 'Med plan',
          description: 'OTC + Rx by destination. Dosing tied to weight + age. Items get auto-added to the Kit Builder so you can pack them.',
          navigateTo: 'kit',
          guidedOrder: 5,
        },
      ],
    },

    {
      id: 'kit',
      title: 'Kit Builder',
      renderClone: renderTMKit,
      hotspots: [
        {
          id: 'search',
          anchorSelector: '[data-tm="search"]',
          title: 'Drug search',
          description: 'Search the full OTC index — generic name, brand, indication. Filtered by your destination by default; clear the destination tag to browse globally.',
          guidedOrder: 6,
        },
        {
          id: 'drug-1',
          anchorSelector: '[data-tm="drug-1"]',
          title: 'Drug list item',
          description: 'Each row shows the drug, primary indication, and how many you have packed. Tap to open dosing, contraindications, and pack/unpack actions.',
        },
        {
          id: 'dosing-card',
          anchorSelector: '[data-tm="dosing-card"]',
          title: 'Dosing card',
          description: 'Indication-specific regimen. Inline weight calculator (optional — adult defaults work for most travelers). Pediatric weight pulls Broselow logic.',
          guidedOrder: 7,
        },
        {
          id: 'dosing-weight',
          anchorSelector: '[data-tm="dosing-weight"]',
          title: 'Weight calculator',
          description: 'Tap to open inline. Outputs total mg + max-per-day cap so you know when to stop.',
        },
        {
          id: 'add-to-kit',
          anchorSelector: '[data-tm="add-to-kit"]',
          title: 'Add to kit',
          description: 'Adds the recommended quantity to your packing list based on trip duration. The number reflects "enough for the trip + 50% buffer."',
          navigateTo: 'symptom',
        },
      ],
    },

    {
      id: 'symptom',
      title: 'Symptom Checker',
      renderClone: renderTMSymptom,
      hotspots: [
        {
          id: 'q-title',
          anchorSelector: '[data-tm="q-title"]',
          title: 'Symptom triage',
          description: 'Top-level body-system buckets. The decision tree narrows from there with 2–3 follow-ups — designed to finish in under 60 seconds.',
          guidedOrder: 8,
        },
        {
          id: 'q-option-1',
          anchorSelector: '[data-tm="q-option-1"]',
          title: 'GI track',
          description: 'Travelers\' diarrhea, food poisoning, gastritis. Each branch ends with a self-treatment recommendation OR a "seek care now" flag for red-flag presentations.',
          navigateTo: 'profile',
          guidedOrder: 9,
        },
        {
          id: 'q-option-2',
          anchorSelector: '[data-tm="q-option-2"]',
          title: 'Respiratory track',
          description: 'Cold, flu, COVID-like, sinusitis. Includes risk thresholds (e.g., fever + new cough at altitude → high-altitude pulmonary edema check).',
        },
        {
          id: 'q-disclaimer',
          anchorSelector: '[data-tm="q-disclaimer"]',
          title: 'Always-visible disclaimer',
          description: 'Anchored to the symptom-checker view because that\'s where the highest-risk decisions get made. Designed to be unmissable, not a footer.',
        },
      ],
    },

    {
      id: 'profile',
      title: 'Profile',
      renderClone: renderTMProfile,
      hotspots: [
        {
          id: 'trips-h',
          anchorSelector: '[data-tm="trips-h"]',
          title: 'Trip history',
          description: 'Active + past trips, sorted by date. Past trips are searchable — useful when you need to remember "what did I take in Costa Rica last year?"',
          guidedOrder: 10,
        },
        {
          id: 'trip-history',
          anchorSelector: '[data-tm="trip-history"]',
          title: 'Trip detail',
          description: 'Tap to view destinations, kit packed, treatments logged, and any health alerts that fired during that trip.',
        },
        {
          id: 'allergies-h',
          anchorSelector: '[data-tm="allergies-h"]',
          title: 'Allergies',
          description: 'Set once — every recommended drug auto-screens against your list. Penicillin allergy hides amoxicillin; sulfa allergy hides TMP-SMX.',
        },
        {
          id: 'allergies',
          anchorSelector: '[data-tm="allergies"]',
          title: 'Allergy entry',
          description: 'Severity tags (mild / moderate / severe) drive how aggressively the app warns. Tap to edit reaction details.',
        },
        {
          id: 'log',
          anchorSelector: '[data-tm="log"]',
          title: 'Treatment log',
          description: 'Chronological list of every drug you marked taken. Used for follow-up visits ("here\'s what I took, when, and why") and personal pattern recognition.',
          guidedOrder: 11,
        },
        {
          id: 'settings',
          anchorSelector: '[data-tm="settings"]',
          title: 'Privacy & Sync',
          description: 'Local-first by default. Optional iCloud sync. No PHI ever sent to a kittechsix server — the app is offline-capable end-to-end.',
        },
      ],
    },
  ],
};
