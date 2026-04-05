// Medical Disclaimer Section

export function renderDisclaimer(parent: HTMLElement): void {
  const section = document.createElement('section');
  section.id = 'disclaimer';
  section.className = 'section section-dark';

  section.innerHTML = `
    <div class="section-content" style="max-width: 700px;">
      <h2 class="text-subhead" style="text-align: center; margin-bottom: var(--space-4); font-weight: 600; color: var(--color-white)">Important Medical Disclaimer</h2>
      <div style="display: flex; flex-direction: column; gap: var(--space-3);">
        <p class="text-body" style="color: var(--color-text-light)">
          The information provided by kittechsix inc and its applications is for <strong style="color: var(--color-white)">educational and informational purposes only</strong>.
        </p>
        <p class="text-body" style="color: var(--color-text-light)">
          It is <strong style="color: var(--color-white)">not a substitute</strong> for professional medical advice, diagnosis, or treatment.
        </p>
        <p class="text-body" style="color: var(--color-text-light)">
          Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
        </p>
        <p class="text-body" style="color: var(--color-text-light)">
          Never disregard professional medical advice or delay in seeking it because of something you have read or accessed through our applications.
        </p>
        <p class="text-body" style="color: var(--color-text-light)">
          <strong style="color: var(--color-white)">In case of a medical emergency, call 911</strong> or your local emergency number immediately.
        </p>
        <p class="text-body" style="color: var(--color-text-light)">
          kittechsix inc assumes no liability for any injury, loss, or damage incurred as a result of any use or reliance upon the information and material contained within our applications.
        </p>
      </div>
    </div>
  `;

  parent.appendChild(section);
}
