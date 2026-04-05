// About / Mission Section

export function renderAbout(parent: HTMLElement): void {
  const section = document.createElement('section');
  section.id = 'about';
  section.className = 'section section-light';

  section.innerHTML = `
    <div class="section-content">
      <h2 class="text-heading" style="text-align: center; margin-bottom: var(--space-4)">Made by a Clinician, for Clinicians</h2>
      <div style="max-width: 680px; margin: 0 auto;">
        <p class="text-body" style="margin-bottom: var(--space-3)">
          Founded by a practicing Emergency Medicine physician who got tired of clunky clinical tools designed by people who've never stood at a bedside. Every feature in our apps comes from real shifts, real patients, and real frustration with what's available.
        </p>
        <p class="text-body" style="margin-bottom: var(--space-3)">
          We're building software that solves real problems encountered on shift \u2014 fast, offline-first tools for the phone in your scrub pocket. No login walls. No subscription paywalls for basic clinical references. Just the information you need, when you need it.
        </p>
        <p class="text-body">
          We're also building consumer health tools for travelers, families, and anyone who wants better access to medical knowledge. Because good health information shouldn't require a medical degree to find.
        </p>
      </div>
    </div>
  `;

  parent.appendChild(section);
}
