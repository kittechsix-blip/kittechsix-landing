import { openContactModal } from './contact-modal.js';

export function renderFinalCta(parent: HTMLElement): void {
  const section = document.createElement('section');
  section.className = 'section final-cta-section';
  section.id = 'start';

  section.innerHTML = `
    <div class="section-content final-cta-content">
      <p class="final-cta-index">KT6 / START HERE</p>
      <h2>One less thing<br><em>between you and the answer.</em></h2>
      <p>Open the flagship emergency-medicine system now, or get in touch about the studio and what it is building next.</p>
      <div class="final-cta-actions">
        <a class="cta-primary" href="https://kittechsix-blip.github.io/mymedkitt/app.html" target="_blank" rel="noopener">Open myMedKitt <span aria-hidden="true">↗</span></a>
        <button class="cta-ghost" id="final-contact" type="button">Contact the studio</button>
      </div>
      <div class="final-cta-foot">
        <span>Free core tools</span>
        <span>No account</span>
        <span>Patient data stays on-device</span>
      </div>
    </div>
  `;

  parent.appendChild(section);
  section.querySelector('#final-contact')?.addEventListener('click', () => openContactModal());
}
