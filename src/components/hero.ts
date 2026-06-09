// Hero Section

export function renderHero(parent: HTMLElement): void {
  const section = document.createElement('section');
  section.className = 'hero section-dark';
  section.id = 'hero';

  section.innerHTML = `
    <div class="hero-content">
      <p class="eyebrow hero-eyebrow">Community-shaped medical software lab</p>
      <h1 class="hero-title">KITTECH-SIX</h1>
      <p class="hero-by">by Dr. Andy Kitlowski</p>
      <div class="hero-art">
        <img src="assets/hero-symbols.jpg" alt="Kittech-Six — three glass emblems for builder, physician, and AI apps & teaching" class="hero-art-img" />
      </div>
      <div class="hero-roles">
        <span class="hero-role">Builder Innovator</span>
        <span class="hero-role">Physician Builder</span>
        <span class="hero-role">AI Apps &amp; Teaching</span>
      </div>
      <p class="text-subhead hero-description">Clinical tools and consumer health apps, built in public.</p>
      <div class="hero-cta">
        <button class="cta-primary" id="hero-explore-btn">Explore the Apps</button>
        <button class="cta-ghost" id="hero-feedback-btn">Shape the Roadmap</button>
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

  document.getElementById('hero-feedback-btn')!.addEventListener('click', () => {
    const target = document.getElementById('feedback');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
}
