// Featured app-logo row — the ecosystem at a glance.
// Pause-Life "featured in" strip, repurposed as a row of the five app icons.

interface FeaturedApp {
  id: string;       // target showcase section id
  icon: string;     // icon filename under assets/icons/
  label: string;
}

const FEATURED_APPS: FeaturedApp[] = [
  { id: 'mymedkitt', icon: 'mymedkitt.png', label: 'myMedKitt' },
  { id: 'myvertigoapp', icon: 'myvertigoapp.png', label: 'my-vertigo-app' },
  { id: 'mytravelmedkitt', icon: 'mytravelmedkitt.png', label: 'MyTravelMedKitt' },
  { id: 'fckcancer', icon: 'fck-cancer.png', label: 'FCK Cancer' },
  { id: 'mytoolkitt', icon: 'mytoolkitt.png', label: 'MyToolKitt' },
];

export function renderFeaturedRow(parent: HTMLElement): void {
  const section = document.createElement('section');
  section.className = 'section featured-row';
  section.id = 'featured';

  const logos = FEATURED_APPS.map((app) => `
    <a class="featured-app" href="#${app.id}" data-target="${app.id}">
      <span class="featured-app-tile">
        <img class="featured-app-icon" src="assets/icons/${app.icon}" alt="${app.label}" loading="lazy" decoding="async" />
      </span>
      <span class="featured-app-label text-caption">${app.label}</span>
    </a>
  `).join('');

  section.innerHTML = `
    <div class="section-content featured-content">
      <p class="eyebrow eyebrow--green">The Kittech-Six ecosystem</p>
      <p class="text-subhead featured-lede">Five focused apps from one bedside-tested lab — for clinicians, students, travelers, and families.</p>
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
