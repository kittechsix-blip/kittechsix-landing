// Medical Disclaimer Section — quiet, legal, unobtrusive (white band, narrow column).

export function renderDisclaimer(parent: HTMLElement): void {
  const section = document.createElement('section');
  section.id = 'disclaimer';
  section.className = 'section section-dark disclaimer-section';

  section.innerHTML = `
    <div class="section-content" style="max-width: var(--content-narrow); border-top: 1px solid var(--hairline, #E5E5E5); padding-top: var(--space-6);">
      <div style="text-align: center; margin-bottom: var(--space-4);">
        <span class="tag tag--clinical">Not medical advice</span>
      </div>
      <h2 class="text-subhead" style="text-align: center; margin-bottom: var(--space-4); font-weight: 600; color: var(--ink, #141414);">Important Medical Disclaimer</h2>
      <div style="display: flex; flex-direction: column; gap: var(--space-3);">
        <p class="text-body-sm">
          The information provided by Kittech-Six and its applications is for <strong style="color: var(--ink, #141414);">educational and informational purposes only</strong>.
        </p>
        <p class="text-body-sm">
          It is <strong style="color: var(--ink, #141414);">not a substitute</strong> for professional medical advice, diagnosis, or treatment.
        </p>
        <p class="text-body-sm">
          Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
        </p>
        <p class="text-body-sm">
          Never disregard professional medical advice or delay in seeking it because of something you have read or accessed through our applications.
        </p>
        <p class="text-body-sm">
          <strong style="color: var(--ink, #141414);">In case of a medical emergency, call 911</strong> or your local emergency number immediately.
        </p>
        <p class="text-body-sm">
          Kittech-Six assumes no liability for any injury, loss, or damage incurred as a result of any use or reliance upon the information and material contained within our applications.
        </p>
      </div>
    </div>
  `;

  parent.appendChild(section);
}
