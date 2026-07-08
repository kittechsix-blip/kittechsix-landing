// Privacy — the honest version, stated plainly. For a portfolio of clinical
// tools, "your data never leaves your device" is a differentiator worth a section.

export function renderPrivacy(parent: HTMLElement): void {
  const section = document.createElement('section');
  section.className = 'section section-light privacy-section';
  section.id = 'privacy';

  section.innerHTML = `
    <div class="section-content privacy-content">
      <p class="eyebrow eyebrow--green">Privacy</p>
      <h2 class="text-heading privacy-headline">Your data stays on your device. Full stop.</h2>
      <div class="privacy-grid">
        <div class="privacy-card">
          <h3>No accounts</h3>
          <p>None of the apps ask you to sign up, log in, or hand over an email address. Open them and use them.</p>
        </div>
        <div class="privacy-card">
          <h3>On-device only</h3>
          <p>Anything you enter at the bedside &mdash; weights, labs, vitals, decisions &mdash; is processed on your phone and stored only in your browser's local storage. No patient data is ever transmitted, and there is nothing to breach.</p>
        </div>
        <div class="privacy-card">
          <h3>No ad tech</h3>
          <p>No advertising trackers, no cross-site cookies, no data brokers, no selling anything to anyone. However the lab is funded, it will never be by selling your data &mdash; the core tools stay open, and optional Pro features are what keep the lights on.</p>
        </div>
        <div class="privacy-card">
          <h3>What we do count</h3>
          <p>This landing page uses Vercel's cookieless, aggregate page analytics (page views only &mdash; no personal profiles, no cross-site tracking). The community feedback board stores votes and suggestions anonymously.</p>
        </div>
      </div>
      <p class="privacy-fineprint">Questions? <a href="mailto:kittechsix@gmail.com">kittechsix@gmail.com</a></p>
    </div>
  `;

  parent.appendChild(section);
}
