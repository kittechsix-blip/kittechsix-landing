// App Registry — single source of truth for app listings and commerce state.
// Flip `forSale: true` + set `checkoutUrl` (Polar hosted checkout link) and the
// app's primary CTA becomes a Buy button. Until then the free CTA renders unchanged.

export interface AppListing {
  id: string;
  name: string;
  liveUrl: string | null;
  /** Hosted checkout link from the payment provider (Polar). null until the product exists. */
  checkoutUrl: string | null;
  /** Display price shown on the Buy CTA, e.g. '$19'. */
  price: string | null;
  forSale: boolean;
  /** Per-app identity color (drawn from the app icon) used to theme its page section. */
  accent: {
    /** mid-tone — check glyphs, active tab fill */
    base: string;
    /** pale wash — chip/tag backgrounds */
    soft: string;
    /** dark shade — text on light backgrounds */
    deep: string;
  };
}

export const APP_REGISTRY: Record<string, AppListing> = {
  mymedkitt: {
    id: 'mymedkitt',
    name: 'myMedKitt',
    liveUrl: 'https://kittechsix-blip.github.io/mymedkitt/app.html',
    checkoutUrl: null,
    price: null,
    forSale: false,
    accent: { base: '#2E9E5B', soft: '#E4F3EA', deep: '#1F6B3D' },
  },
  'mystroke-kitt': {
    id: 'mystroke-kitt',
    name: 'myStroke-Kitt',
    liveUrl: 'https://mystroke-kitt.vercel.app',
    checkoutUrl: null,
    price: null,
    forSale: false,
    accent: { base: '#C8452C', soft: '#F9E8E3', deep: '#99321F' },
  },
  'antibiotic-rx': {
    id: 'antibiotic-rx',
    name: 'Antibiotic Rx',
    liveUrl: 'https://antibiotic-rx.vercel.app',
    checkoutUrl: null,
    price: null,
    forSale: false,
    accent: { base: '#7C5CBF', soft: '#EEE9F8', deep: '#5A3E96' },
  },
  myvertigoapp: {
    id: 'myvertigoapp',
    name: 'my-vertigo-app',
    liveUrl: 'https://my-vertigo-app.vercel.app',
    checkoutUrl: null,
    price: null,
    forSale: false,
    accent: { base: '#2A9D8F', soft: '#E2F2EF', deep: '#1C6E64' },
  },
  acidbase: {
    id: 'acidbase',
    name: 'AcidBase',
    liveUrl: 'https://acidbase.vercel.app',
    checkoutUrl: null,
    price: null,
    forSale: false,
    accent: { base: '#3D7EA6', soft: '#E5EFF6', deep: '#2A5A79' },
  },
  mytravelmedkitt: {
    id: 'mytravelmedkitt',
    name: 'MyTravelMedKitt',
    liveUrl: null,
    checkoutUrl: null,
    price: null,
    forSale: false,
    accent: { base: '#C4822E', soft: '#F8EEDC', deep: '#8F5C19' },
  },
  fckcancer: {
    id: 'fckcancer',
    name: 'FCK Cancer',
    liveUrl: 'https://fck-cancer.vercel.app',
    checkoutUrl: null,
    price: null,
    forSale: false,
    accent: { base: '#B87333', soft: '#FBF1E8', deep: '#8A5524' },
  },
};
