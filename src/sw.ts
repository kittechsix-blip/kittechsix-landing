// Service Worker — kittechsix Landing Page

const CACHE_NAME = 'kittechsix-v9';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/styles/tokens.css',
  '/styles/global.css',
  '/styles/nav.css',
  '/styles/hero.css',
  '/styles/featured.css',
  '/styles/ecosystem.css',
  '/styles/showcase.css',
  '/styles/demo.css',
  '/styles/about.css',
  '/styles/feedback.css',
  '/styles/footer.css',
  '/styles/ui-tour.css',
  '/main.js',
  '/components/about.js',
  '/components/demo-afib.js',
  '/components/demo-trip.js',
  '/components/disclaimer.js',
  '/components/email-signup.js',
  '/components/feedback-board.js',
  '/components/footer.js',
  '/components/hero.js',
  '/components/ticker.js',
  '/components/featured-row.js',
  '/components/ecosystem-map.js',
  '/components/nav.js',
  '/components/product-showcase.js',
  '/components/ui-tour.js',
  '/components/ui-tour-clones/mymedkitt-clone.js',
  '/components/ui-tour-clones/myvertigo-clone.js',
  '/components/ui-tour-clones/mytravelmedkitt-clone.js',
  '/components/ui-tour-clones/mytoolkitt-clone.js',
  '/data/afib-rvr-tree.js',
  '/data/trip-builder-data.js',
  '/data/ui-tour/mymedkitt-tour.js',
  '/data/ui-tour/myvertigoapp-tour.js',
  '/data/ui-tour/mytravelmedkitt-tour.js',
  '/data/ui-tour/mytoolkitt-tour.js',
  '/utils/intersection.js',
  '/utils/router.js',
  '/utils/storage.js',
  '/utils/supabase.js',
  '/assets/icons/kittech-brain.png',
  '/assets/icons/mymedkitt.png',
  '/assets/icons/mytoolkitt.png',
  '/assets/icons/mytravelmedkitt.png',
  '/assets/icons/myvertigoapp.png',
  '/assets/icons/fck-cancer.png',
  '/assets/kittechsix-logo.png',
  '/assets/hero-symbols.jpg',
];

// Use 'any' to work around ServiceWorkerGlobalScope typing
const sw = self as any;

sw.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache: Cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  sw.skipWaiting();
});

sw.addEventListener('activate', (event: any) => {
  event.waitUntil(
    caches.keys().then((names: string[]) =>
      Promise.all(
        names
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    )
  );
  sw.clients.claim();
});

sw.addEventListener('fetch', (event: any) => {
  const url = new URL(event.request.url);

  // Images: cache-first
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(event.request).then((cached: Response | undefined) =>
        cached || fetch(event.request).then((response: Response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache: Cache) => cache.put(event.request, clone));
          return response;
        })
      )
    );
    return;
  }

  // Everything else: network-first
  event.respondWith(
    fetch(event.request)
      .then((response: Response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache: Cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request) as Promise<Response>)
  );
});
