// Actual production captures, 2026-10-20. Keep the homepage and guided tour in sync.
export const VERTIGO_SCREENS = [
  { id: 'lateralize', label: 'Lateralize', image: 'assets/screens/vertigo-v4-lateralize.png', alt: 'Current myVertigo lateralization screen with raised umber stage navigation, framed ear selection and a left-ear teaching example.', caption: 'Choose the test and side. Explore the eye-movement teaching tool.', url: 'https://my-vertigo-app.vercel.app/workup?node=lat-start' },
  { id: 'body-map', label: 'Body map', image: 'assets/screens/vertigo-v4-body-map.png', alt: 'Current myVertigo safety body map with selectable anatomical regions inside an umber frame.', caption: 'Explore safety findings by body region.', url: 'https://my-vertigo-app.vercel.app/workup?node=deadly-ds' },
  { id: 'exam-walk', label: 'Exam walk', image: 'assets/screens/vertigo-v4-exam-walk.png', alt: 'Current myVertigo exam-walk layout with four layout choices, paper cards, framed sections and the clinical toolbar.', caption: 'Choose your layout. Work through the examination one region at a time.', url: 'https://my-vertigo-app.vercel.app/workup?node=deadly-ds' },
];

export function renderVertigoDemo(): HTMLVideoElement {
  const video = document.createElement('video');
  video.src = 'assets/screens/vertigo-hints-demo-v4.mp4';
  video.poster = 'assets/screens/vertigo-hints-demo-v4.png';
  video.width = 390; video.height = 844;
  video.muted = true; video.loop = true; video.playsInline = true; video.controls = true;
  video.autoplay = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  video.preload = 'metadata';
  video.style.cssText = 'display:block;width:100%;height:100%;object-fit:contain';
  video.setAttribute('aria-label', 'Recorded HINTS walkthrough: open Lateralize, choose left-beating nystagmus, then watch the face demonstrate slow drift and fast reset with the right ear marked affected.');
  return video;
}

export function mountVertigoShowcase(host: HTMLElement): void {
  const first = VERTIGO_SCREENS[0]!;
  const demoCaption = 'HINTS → Lateralize → choose the fast beat → watch the eyes and affected ear.';
  host.innerHTML = `<div class="kx-phone" id="vt-current-screen"><img data-vt-preview hidden src="${first.image}" alt="${first.alt}" width="390" height="844" loading="lazy"></div>
    <div class="kx-vt-controls" role="group" aria-label="Explore the current myVertigo interface"><button type="button" data-vt-demo aria-pressed="true" aria-controls="vt-current-screen">Watch demo</button>${VERTIGO_SCREENS.map((s,i)=>`<button type="button" data-vt-screen="${i}" aria-pressed="false" aria-controls="vt-current-screen">${s.label}</button>`).join('')}</div>
    <p class="kx-vt-caption" aria-live="polite">${demoCaption}</p>
    <a class="kx-go" data-vt-open href="https://my-vertigo-app.vercel.app/workup?node=hints-start" target="_blank" rel="noopener">Try this in myVertigo ↗</a>
    <small class="kx-vt-note">Recorded in the current app · Pause or replay anytime</small>`;
  const img = host.querySelector<HTMLImageElement>('[data-vt-preview]')!;
  const video = renderVertigoDemo();
  host.querySelector('.kx-phone')!.append(video);
  const caption = host.querySelector<HTMLElement>('.kx-vt-caption')!;
  const link = host.querySelector<HTMLAnchorElement>('[data-vt-open]')!;
  const buttons = host.querySelectorAll<HTMLButtonElement>('[data-vt-screen]');
  const demo = host.querySelector<HTMLButtonElement>('[data-vt-demo]')!;
  buttons.forEach((button, i) => button.addEventListener('click', () => {
    const screen = VERTIGO_SCREENS[i]!;
    video.pause(); video.hidden = true; img.hidden = false;
    img.src = screen.image; img.alt = screen.alt;
    caption.textContent = screen.caption; link.href = screen.url;
    demo.setAttribute('aria-pressed','false');
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  }));
  demo.addEventListener('click', () => {
    img.hidden = true; video.hidden = false; video.currentTime = 0;
    void video.play().catch(() => { /* Native controls remain available if autoplay is blocked. */ });
    caption.textContent = demoCaption;
    link.href = 'https://my-vertigo-app.vercel.app/workup?node=hints-start';
    buttons.forEach(b => b.setAttribute('aria-pressed','false'));
    demo.setAttribute('aria-pressed','true');
  });
}
