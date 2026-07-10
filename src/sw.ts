// Service Worker — kittechsix Landing Page

const CACHE_NAME = 'kittechsix-v15';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/styles/fonts.css',
  '/styles/tokens.css',
  '/styles/global.css',
  '/styles/nav.css',
  '/styles/hero.css',
  '/styles/featured.css',
  '/styles/ecosystem.css',
  '/styles/showcase.css',
  '/styles/demo.css',
  '/styles/quality-team.css',
  '/styles/about.css',
  '/styles/feedback.css',
  '/styles/footer.css',
  '/styles/contact-modal.css',
  '/styles/app-tabs.css',
  '/styles/privacy.css',
  '/styles/legal.css',
  '/styles/ui-tour.css',
  '/styles/tour/mymedkitt.css',
  '/styles/tour/mystroke-kitt.css',
  '/styles/tour/my-vertigo-app.css',
  '/styles/tour/acidbase.css',
  '/styles/tour/antibiotic-rx.css',
  '/main.js',
  '/components/quality-team.js',
  '/components/about.js',
  '/components/app-tabs.js',
  '/components/privacy.js',
  '/components/demo-afib.js',
  '/components/demo-trip.js',
  '/components/disclaimer.js',
  '/components/legal.js',
  '/components/email-signup.js',
  '/components/feedback-board.js',
  '/components/footer.js',
  '/components/contact-modal.js',
  '/components/hero.js',
  '/components/ticker.js',
  '/components/featured-row.js',
  '/components/ecosystem-map.js',
  '/components/nav.js',
  '/components/product-showcase.js',
  '/components/ui-tour.js',
  '/components/ui-tour-clones/mymedkitt-clone.js',
  '/components/ui-tour-clones/mystroke-kitt-clone.js',
  '/components/ui-tour-clones/my-vertigo-app-clone.js',
  '/components/ui-tour-clones/acidbase-clone.js',
  '/components/ui-tour-clones/antibiotic-rx-clone.js',
  '/data/afib-rvr-tree.js',
  '/data/app-registry.js',
  '/data/trip-builder-data.js',
  '/data/ui-tour/mymedkitt-tour.js',
  '/data/ui-tour/mystroke-kitt-tour.js',
  '/data/ui-tour/my-vertigo-app-tour.js',
  '/data/ui-tour/acidbase-tour.js',
  '/data/ui-tour/antibiotic-rx-tour.js',
  '/utils/intersection.js',
  '/utils/router.js',
  '/utils/storage.js',
  '/utils/supabase.js',
  '/assets/fonts/hanken.woff2',
  '/assets/fonts/inter.woff2',
  '/assets/fonts/fraunces-italic.woff2',
  '/assets/fonts/geist.woff2',
  '/assets/fonts/geist-mono.woff2',
  '/assets/icons/kittech-brain.png',
  '/assets/icons/mymedkitt.png',
  '/assets/icons/mystroke-kitt.png',
  '/assets/icons/antibiotic-rx.png',
  '/assets/icons/acidbase.png',
  '/assets/icons/mytravelmedkitt.png',
  '/assets/icons/myvertigoapp.png',
  '/assets/icons/fck-cancer.png',
  '/assets/kittechsix-logo.webp',
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
