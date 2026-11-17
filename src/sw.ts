// Service Worker — kittechsix Landing Page

// Bump this whenever the shell or navigation changes so returning visitors
// receive the current site instead of a stale service-worker cache.
const CACHE_NAME = 'kittechsix-v68-shimmer-loop';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/andy-kitlowski-profile-20260909.jpg',
  '/assets/andy-kitlowski-physician-crop.jpg',
  '/styles/fonts.css',
  '/styles/tokens.css',
  '/styles/global.css',
  '/styles/nav.css',
  '/styles/hero.css',
  '/styles/home.css',
  '/components/home.js',
  '/components/vertigo-showcase.js',
  '/assets/screens/vertigo-v4-lateralize.png',
  '/assets/screens/vertigo-v4-body-map.png',
  '/assets/screens/vertigo-v4-exam-walk.png',
  '/assets/kittech-logo.webp',
  '/assets/kittech-logo-sm.webp',
  '/styles/work.css',
  '/styles/page.css',
  '/styles/frame.css',
  '/styles/hub.css',
  '/components/hub.js',
  '/styles/featured.css',
  '/styles/showcase.css',
  '/styles/demo.css',
  '/styles/quality-team.css',
  '/styles/about.css',
  '/styles/footer.css',
  '/styles/contact-modal.css',
  '/styles/app-tabs.css',
  '/styles/privacy.css',
  '/styles/legal.css',
  '/main.js',
  '/components/quality-team.js',
  '/components/frame.js',
  '/components/work-detail.js',
  '/components/legal-page.js',
  '/components/about.js',
  '/components/app-tabs.js',
  '/components/privacy.js',
  '/components/disclaimer.js',
  '/components/legal.js',
  '/components/email-signup.js',
  '/components/footer.js',
  '/components/contact-modal.js',
  '/components/nav.js',
  '/components/product-showcase.js',
  '/data/app-registry.js',
  '/utils/intersection.js',
  '/utils/router.js',
  '/utils/storage.js',
  '/utils/supabase.js',
  '/assets/fonts/hanken.woff2',
  '/assets/fonts/inter.woff2',
  '/assets/fonts/fraunces-italic.woff2',
  '/assets/fonts/geist.woff2',
  '/assets/fonts/geist-mono.woff2',
  '/assets/fonts/instrument-sans.woff2',
  '/assets/fonts/instrument-serif.woff2',
  '/assets/fonts/instrument-serif-italic.woff2',
  '/assets/fonts/EBGaramond-400.woff2',
  '/assets/fonts/EBGaramond-400i.woff2',
  '/assets/fonts/PlayfairDisplay.woff2',
  '/assets/fonts/IBMPlexMono-400.woff2',
  '/assets/fonts/IBMPlexMono-500.woff2',
  '/assets/icons/kittech-brain.png',
  '/assets/icons/mymedkitt-current.png',
  '/assets/icons/mystroke-kitt.png',
  '/assets/icons/acidbase.png',
  '/assets/icons/electrokitt.png',
  '/assets/icons/endocrinekitt.png',
  '/assets/icons/echokitt.png',
  '/assets/icons/myvertigoapp.png',
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

  // Never intercept or cache cross-origin (Supabase API, analytics) or non-GET
  // requests. Cache Storage is for this site's own shell and assets only.
  if (url.origin !== sw.location.origin || event.request.method !== 'GET') return;

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
