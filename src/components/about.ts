// Founder philosophy — the studio's clinical point of view.

export function renderAbout(parent: HTMLElement): void {
  const section = document.createElement('section');
  section.className = 'section section-ink about-section';
  section.id = 'about';

  section.innerHTML = `
    <div class="section-content about-grid">
      <div class="about-portrait">
        <img src="assets/andy-kitlowski-headshot.jpg" alt="Dr. Andy Kitlowski, emergency physician and founder of Kittech-Six" class="about-portrait-img" />
        <span class="about-portrait-caption">Andy Kitlowski, MD<br>Emergency physician / founder</span>
      </div>
      <div class="about-body">
        <svg class="about-quote-mark" viewBox="0 0 48 48" aria-hidden="true">
          <path d="M20 8C12 12 7 20 7 30c0 6 4 10 9 10s9-4 9-9-4-9-9-9c-1 0-2 0-3 .4C14 17 17 13 22 11l-2-3Zm21 0c-8 4-13 12-13 22 0 6 4 10 9 10s9-4 9-9-4-9-9-9c-1 0-2 0-3 .4 1-4.4 4-8.4 9-10.4l-2-3Z"/>
        </svg>
        <p class="eyebrow about-eyebrow">The studio</p>
        <h2 class="text-accent about-headline">Twenty-five years at the bedside, translated into software.</h2>
        <p class="text-body about-text reading-body">Founded by a physician who got tired of clunky clinical tools designed by people who’ve never stood at a bedside. Every feature in our apps comes from real shifts, real patients, and real frustration with what’s available.</p>
        <p class="text-body about-text reading-body">We’re building software that solves real problems encountered on shift — fast, offline-first tools for the phone in your scrub pocket. No login walls, and the core clinical references stay open to everyone. A Pro tier (coming soon) funds the deeper tooling — but the information you need at the bedside is always there when you need it.</p>
        <p class="text-accent about-pullquote">“The interface should disappear before the decision does.”</p>
        <p class="text-body about-text reading-body">We’re also building consumer health tools for travelers, families, and anyone who wants better access to medical knowledge.</p>
        <div class="about-tags">
          <span class="tag tag--clinical">Emergency Medicine</span>
          <span class="tag tag--clinical">15+ yrs teaching &amp; simulation</span>
          <span class="tag tag--clinical">Clinician-built</span>
        </div>
      </div>
    </div>
  `;

  parent.appendChild(section);
}
