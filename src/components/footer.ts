// Footer

import { openContactModal } from './contact-modal.js';

const SOCIAL_ICONS = {
  linkedin: '<svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 1.092.063 1.376.126v3.205c-.244-.024-.668-.036-.953-.036-1.353 0-1.876.516-1.876 1.857v2.406h4.052l-.526 3.667H13.506v8.126C19.235 22.768 24 17.466 24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.628 3.875 10.35 9.101 11.691Z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z"/></svg>'
};

export function renderFooter(parent: HTMLElement): void {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.setAttribute('role', 'contentinfo');

  footer.innerHTML = `
    <div class="footer-content">
      <div class="footer-cols">
        <div class="footer-col footer-brand">
          <a class="footer-brand-mark" href="#/" aria-label="Kittech-Six — home">
            <img class="footer-logo" src="assets/icons/favicon.png" alt="Kittech-Six brain logo" width="28" height="28" />
            <span class="footer-wordmark">Kittech-Six</span>
          </a>
          <p class="footer-mission">Clinical and consumer health apps, built in public by an ER physician.</p>
          <button class="footer-pro-link" id="footer-pro" type="button">Pro tier in the works &mdash; join the waitlist</button>
          <div class="footer-social">
            <a href="https://www.linkedin.com/in/andrew-kitlowski-059266197/" target="_blank" rel="noopener" aria-label="LinkedIn">${SOCIAL_ICONS.linkedin}</a>
            <a href="https://www.facebook.com/profile.php?id=61591723356651" target="_blank" rel="noopener" aria-label="Facebook">${SOCIAL_ICONS.facebook}</a>
            <a href="https://instagram.com/kittechsix" target="_blank" rel="noopener" aria-label="Instagram">${SOCIAL_ICONS.instagram}</a>
            <a href="https://tiktok.com/@kittechsix" target="_blank" rel="noopener" aria-label="TikTok">${SOCIAL_ICONS.tiktok}</a>
          </div>
        </div>
        <div class="footer-col">
          <h2 class="footer-col-head">Apps</h2>
          <div class="footer-links">
            <a href="#/work/mymedkitt">myMedKitt</a>
            <a href="#/work/mystroke-kitt">myStroke-Kitt</a>
            <a href="#/work/myvertigoapp">my-vertigo-app</a>
            <a href="#/work/acidbase">AcidBase</a>
            <a href="#/work/electrokitt">ElectroKitt</a>
            <a href="#/work/antibiotic-rx">Antibiotic Rx</a>
            <a href="#/work/myventkitt">myVentKitt</a>
            <a href="#/work/endocrinekitt">EndocrineKitt</a>
            <a href="#/work/acute-vision-loss">Acute Vision Loss</a>
            <a href="#/projects/mytravelmedkitt">MyTravelMedKitt <span class="footer-link-tag">In build</span></a>
            <a href="#/projects/powerkitt">PowerKitt <span class="footer-link-tag">In build</span></a>
          </div>
        </div>
        <div class="footer-col">
          <h2 class="footer-col-head">The Lab</h2>
          <div class="footer-links">
            <a href="#/projects">All projects</a>
            <a href="#/consulting">Consulting</a>
            <a href="#/studio">Standards</a>
            <a href="#/studio">Roadmap</a>
            <a href="#/about">About Andy</a>
            <a href="#/learn">Lectures & learning</a>
            <a href="#/workflows">Skills & workflows</a>
            <a href="#/how-i-build">How I build</a>
          </div>
        </div>
        <div class="footer-col">
          <h2 class="footer-col-head">Legal</h2>
          <div class="footer-links">
            <a href="#/legal">Medical Disclaimer</a>
            <a href="#/legal">Privacy</a>
            <a href="#/legal">Terms of Service</a>
            <a href="#/legal">Refund Policy</a>
            <a href="mailto:kittechsix@gmail.com" id="footer-contact">Contact</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copyright">&copy; 2026 Kittech-Six by Dr. Andy Kitlowski. All rights reserved.</p>
        <p class="footer-fineprint">For education only &mdash; not a substitute for professional medical advice. In an emergency, call 911.</p>
      </div>
    </div>
  `;

  parent.appendChild(footer);

  // Contact opens the mailto composer modal (href is a no-JS fallback).
  footer.querySelector('#footer-contact')?.addEventListener('click', (e) => {
    e.preventDefault();
    openContactModal();
  });

  // Pro waitlist hook — seeds the composer with a subject.
  footer.querySelector('#footer-pro')?.addEventListener('click', () => {
    openContactModal({
      subject: 'Pro tier waitlist',
      message: "I'd like to be notified when the Kittech-Six Pro tier launches.",
    });
  });
}
