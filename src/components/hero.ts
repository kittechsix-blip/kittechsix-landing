// Hero Section

export function renderHero(parent: HTMLElement): void {
  const section = document.createElement('section');
  section.className = 'hero section-dark';
  section.id = 'hero';

  section.innerHTML = `
    <div class="hero-content">
      <img src="assets/kittechsix-logo.png" alt="Kittechsix" class="hero-logo" />
      <p class="hero-eyebrow">Community-shaped medical software lab</p>
      <p class="text-subhead hero-subtitle">Clinical tools. Consumer health apps. Built in public with the people who use them.</p>
      <p class="text-body hero-description">Explore the Kittechsix project ecosystem, try live demos, and vote on what should be improved next.</p>
      <div class="hero-cta">
        <button class="cta-primary" id="hero-explore-btn">Explore Projects</button>
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
