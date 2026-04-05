// Hero Section

export function renderHero(parent: HTMLElement): void {
  const section = document.createElement('section');
  section.className = 'hero section-dark';
  section.id = 'hero';

  section.innerHTML = `
    <div class="hero-content">
      <h1 class="text-hero hero-title" style="color: var(--color-white)">kittechsix</h1>
      <p class="text-subhead hero-subtitle">Clinical tools. Built by clinicians.</p>
      <p class="text-body hero-description">Emergency medicine software for healthcare providers and the people they serve.</p>
      <div class="hero-cta">
        <button class="cta-ghost" id="hero-explore-btn">Explore Our Apps</button>
      </div>
    </div>
  `;

  parent.appendChild(section);

  // Smooth scroll to first product section
  document.getElementById('hero-explore-btn')!.addEventListener('click', () => {
    const target = document.getElementById('mymedkitt');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
}
