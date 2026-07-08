// Terms of Service + Refund Policy — required (with Privacy + Contact) by
// payment platforms before account activation. Quiet band, narrow column,
// same register as the medical disclaimer.
// TODO: swap "Kittech-Six" for the LLC's registered legal name once formation completes.

export function renderLegal(parent: HTMLElement): void {
  const section = document.createElement('section');
  section.id = 'terms';
  section.className = 'section section-dark legal-section';

  section.innerHTML = `
    <div class="section-content legal-content">
      <div class="legal-tag-row">
        <span class="tag tag--clinical">Terms &amp; Refunds</span>
      </div>
      <h2 class="text-subhead legal-headline">Terms of Service</h2>
      <div class="legal-blocks">
        <div class="legal-block">
          <h3>Who we are</h3>
          <p>Kittech-Six ("Kittech", "we") builds clinical and consumer health web applications. These terms govern your use of this site and our applications. By using them, you accept these terms.</p>
        </div>
        <div class="legal-block">
          <h3>What you get</h3>
          <p>Free-tier apps are provided as-is, at no charge. Paid purchases grant you a personal, non-transferable license to access the purchased app or Pro features on your own devices. Licenses are for individual use and may not be resold or shared institutionally without a separate agreement.</p>
        </div>
        <div class="legal-block">
          <h3>Clinical use</h3>
          <p>Our applications are educational reference tools for licensed clinicians and health-conscious consumers. They are not a substitute for professional judgment, and every recommendation is presented with its underlying evidence so you can independently review the basis for it. The full <a href="#disclaimer">Medical Disclaimer</a> is part of these terms. Clinical decisions, and responsibility for them, remain yours.</p>
        </div>
        <div class="legal-block">
          <h3>Your data</h3>
          <p>The apps run on-device and do not transmit patient data &mdash; see <a href="#privacy">Privacy</a>. Do not enter patient-identifying information; the apps neither need nor want it.</p>
        </div>
        <div class="legal-block" id="refunds">
          <h3>Payments &amp; refunds</h3>
          <p>Paid purchases are processed securely by our merchant of record, which handles payment, receipts, and applicable sales tax. Prices are listed in USD. If a purchase isn't right for you, email us within <strong>14 days</strong> for a full refund &mdash; no questions asked. After a refund, the associated license is deactivated.</p>
        </div>
        <div class="legal-block">
          <h3>Changes &amp; contact</h3>
          <p>We may update these terms as the products evolve; continued use after a change constitutes acceptance. These terms are governed by the laws of the State of Texas. Questions or refund requests: <a href="mailto:kittechsix@gmail.com">kittechsix@gmail.com</a>.</p>
        </div>
      </div>
    </div>
  `;

  parent.appendChild(section);
}
