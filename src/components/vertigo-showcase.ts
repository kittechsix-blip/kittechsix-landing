// Actual production captures, 2026-10-20. Keep the homepage and guided tour in sync.
export const VERTIGO_SCREENS = [
  { id: 'lateralize', label: 'Lateralize', image: 'assets/screens/vertigo-v4-lateralize.png', alt: 'Current myVertigo lateralization screen with raised umber stage navigation, framed ear selection and a left-ear teaching example.', caption: 'Choose the test and side. Explore the eye-movement teaching tool.', url: 'https://my-vertigo-app.vercel.app/workup?node=lat-start' },
  { id: 'body-map', label: 'Body map', image: 'assets/screens/vertigo-v4-body-map.png', alt: 'Current myVertigo safety body map with selectable anatomical regions inside an umber frame.', caption: 'Explore safety findings by body region.', url: 'https://my-vertigo-app.vercel.app/workup?node=deadly-ds' },
  { id: 'exam-walk', label: 'Exam walk', image: 'assets/screens/vertigo-v4-exam-walk.png', alt: 'Current myVertigo exam-walk layout with four layout choices, paper cards, framed sections and the clinical toolbar.', caption: 'Choose your layout. Work through the examination one region at a time.', url: 'https://my-vertigo-app.vercel.app/workup?node=deadly-ds' },
];

export function mountVertigoShowcase(host: HTMLElement): void {
  const first = VERTIGO_SCREENS[0]!;
  host.innerHTML = `<div class="kx-phone"><img data-vt-preview src="${first.image}" alt="${first.alt}" width="390" height="844" loading="lazy"></div>
    <div class="kx-vt-controls" role="group" aria-label="Explore the current myVertigo interface">${VERTIGO_SCREENS.map((s,i)=>`<button type="button" data-vt-screen="${i}" aria-pressed="${i===0}" aria-controls="vt-current-screen">${s.label}</button>`).join('')}</div>
    <p class="kx-vt-caption" aria-live="polite">${first.caption}</p>
    <a class="kx-go" data-vt-open href="${first.url}" target="_blank" rel="noopener">Try this in myVertigo ↗</a>
    <small class="kx-vt-note">Screens from the current app · Select a view above</small>`;
  const img = host.querySelector<HTMLImageElement>('[data-vt-preview]')!;
  img.id = 'vt-current-screen';
  const caption = host.querySelector<HTMLElement>('.kx-vt-caption')!;
  const link = host.querySelector<HTMLAnchorElement>('[data-vt-open]')!;
  const buttons = host.querySelectorAll<HTMLButtonElement>('[data-vt-screen]');
  buttons.forEach((button, i) => button.addEventListener('click', () => {
    const screen = VERTIGO_SCREENS[i]!;
    img.src = screen.image; img.alt = screen.alt;
    caption.textContent = screen.caption; link.href = screen.url;
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  }));
}
