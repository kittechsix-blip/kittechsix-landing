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
}

export const APP_REGISTRY: Record<string, AppListing> = {
  mymedkitt: {
    id: 'mymedkitt',
    name: 'myMedKitt',
    liveUrl: 'https://kittechsix-blip.github.io/mymedkitt/app.html',
    checkoutUrl: null,
    price: null,
    forSale: false,
  },
  'mystroke-kitt': {
    id: 'mystroke-kitt',
    name: 'myStroke-Kitt',
    liveUrl: 'https://mystroke-kitt.vercel.app',
    checkoutUrl: null,
    price: null,
    forSale: false,
  },
  'antibiotic-rx': {
    id: 'antibiotic-rx',
    name: 'Antibiotic Rx',
    liveUrl: 'https://antibiotic-rx.vercel.app',
    checkoutUrl: null,
    price: null,
    forSale: false,
  },
  myvertigoapp: {
    id: 'myvertigoapp',
    name: 'my-vertigo-app',
    liveUrl: 'https://my-vertigo-app.vercel.app',
    checkoutUrl: null,
    price: null,
    forSale: false,
  },
  acidbase: {
    id: 'acidbase',
    name: 'AcidBase',
    liveUrl: 'https://acidbase.vercel.app',
    checkoutUrl: null,
    price: null,
    forSale: false,
  },
  mytravelmedkitt: {
    id: 'mytravelmedkitt',
    name: 'MyTravelMedKitt',
    liveUrl: null,
    checkoutUrl: null,
    price: null,
    forSale: false,
  },
  fckcancer: {
    id: 'fckcancer',
    name: 'FCK Cancer',
    liveUrl: 'https://fck-cancer.vercel.app',
    checkoutUrl: null,
    price: null,
    forSale: false,
  },
};
