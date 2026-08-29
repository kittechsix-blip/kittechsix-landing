// Service Worker — kittechsix Landing Page

// Bump this whenever the shell or navigation changes so returning visitors
// receive the current site instead of a stale service-worker cache.
const CACHE_NAME = 'kittechsix-v29';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/styles/fonts.css',
  '/styles/tokens.css',
  '/styles/global.css',
  '/styles/nav.css',
  '/styles/hero.css',
  '/styles/work.css',
  '/styles/page.css',
  '/styles/frame.css',
  '/styles/featured.css',
  '/styles/showcase.css',
  '/styles/demo.css',
  '/styles/quality-team.css',
  '/styles/consulting.css',
  '/styles/roadmap.css',
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
  '/components/frame.js',
  '/components/consulting.js',
  '/components/work-index.js',
  '/components/work-detail.js',
  '/components/studio.js',
  '/components/legal-page.js',
  '/components/roadmap.js',
  '/components/about.js',
  '/components/app-tabs.js',
  '/components/privacy.js',
  '/components/demo-afib.js',
  '/components/disclaimer.js',
  '/components/legal.js',
  '/components/email-signup.js',
  '/components/feedback-board.js',
  '/components/footer.js',
  '/components/contact-modal.js',
  '/components/hero.js',
  '/components/featured-row.js',
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
  '/assets/fonts/instrument-sans.woff2',
  '/assets/fonts/instrument-serif.woff2',
  '/assets/fonts/instrument-serif-italic.woff2',
  '/assets/fonts/EBGaramond-400.woff2',
  '/assets/fonts/EBGaramond-400i.woff2',
  '/assets/icons/kittech-brain.png',
  '/assets/icons/mymedkitt.png',
  '/assets/icons/mystroke-kitt.png',
  '/assets/icons/antibiotic-rx.png',
  '/assets/icons/acidbase.png',
  '/assets/icons/electrokitt.png',
  '/assets/icons/myventkitt.png',
  '/assets/icons/endocrinekitt.png',
  '/assets/icons/acute-vision-loss.png',
  '/assets/icons/mytravelmedkitt.png',
  '/assets/icons/myvertigoapp.png',
  '/assets/og-card-studio.png',
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
