// Featured app-logo row — the ecosystem at a glance.
// Pause-Life "featured in" strip, repurposed as a row of the five app icons.

import { APP_REGISTRY } from '../data/app-registry.js';

interface FeaturedApp {
  id: string;       // target showcase (or section) id to scroll to
  icon?: string;    // icon filename under assets/icons/
  glyph?: string;   // fallback text glyph when no icon art exists yet
  label: string;
  badge?: string;   // small status pill (e.g. 'In dev')
}

const FEATURED_APPS: FeaturedApp[] = [
  { id: 'mymedkitt', icon: 'mymedkitt.png', label: 'myMedKitt' },
  { id: 'mystroke-kitt', icon: 'mystroke-kitt.png', label: 'myStroke-Kitt' },
  { id: 'myvertigoapp', icon: 'myvertigoapp.png', label: 'my-vertigo-app' },
  { id: 'acidbase', icon: 'acidbase.png', label: 'AcidBase' },
  { id: 'antibiotic-rx', icon: 'antibiotic-rx.png', label: 'Antibiotic Rx' },
  { id: 'mytravelmedkitt', icon: 'mytravelmedkitt.png', label: 'MyTravelMedKitt', badge: 'In dev' },
  { id: 'ecosystem', glyph: '⚡', label: 'PowerKitt', badge: 'In dev' },
  { id: 'fckcancer', icon: 'fck-cancer.png', label: 'FCK Cancer', badge: 'In dev' },
];

export function renderFeaturedRow(parent: HTMLElement): void {
  const section = document.createElement('section');
  section.className = 'section featured-row';
  section.id = 'featured';

  const logos = FEATURED_APPS.map((app) => {
    const media = app.icon
      ? `<img class="featured-app-icon" src="assets/icons/${app.icon}" alt="${app.label}" loading="lazy" decoding="async" />`
      : `<span class="featured-app-glyph" aria-hidden="true">${app.glyph ?? ''}</span>`;
    const badge = app.badge
      ? `<span class="featured-app-badge">${app.badge}</span>`
      : '';
    const accent = APP_REGISTRY[app.id]?.accent;
    const accentStyle = accent ? ` style="--app-accent:${accent.base};--app-accent-deep:${accent.deep}"` : '';
    return `
    <a class="featured-app" href="#${app.id}" data-target="${app.id}"${accentStyle}>
      <span class="featured-app-tile">
        ${media}
        ${badge}
      </span>
      <span class="featured-app-label text-caption">${app.label}</span>
    </a>
  `;
  }).join('');

  section.innerHTML = `
    <div class="section-content featured-content">
      <p class="eyebrow eyebrow--green">The apps, at a glance</p>
      <p class="text-subhead featured-lede">Eight focused apps from one bedside-tested lab — for clinicians, students, travelers, and families. Tap any icon to jump to its story.</p>
      <div class="featured-apps">
        ${logos}
      </div>
    </div>
  `;

  parent.appendChild(section);

  // Smooth-scroll each logo to its showcase section.
  section.querySelectorAll<HTMLAnchorElement>('.featured-app').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('data-target');
      if (!id) return;
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
