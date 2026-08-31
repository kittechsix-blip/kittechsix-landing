// Contact Modal — a mailto composer. No backend: the form assembles a
// pre-addressed message and hands off to the visitor's own mail client.

const CONTACT_EMAIL = 'kittechsix@gmail.com';

interface ContactPrefill {
  subject?: string;
  message?: string;
}

let backdrop: HTMLElement | null = null;
let lastFocused: HTMLElement | null = null;

function buildModal(): HTMLElement {
  const el = document.createElement('div');
  el.className = 'contact-modal-backdrop';
  el.id = 'contact-modal-backdrop';
  el.setAttribute('hidden', '');
  el.innerHTML = `
    <div class="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
      <button class="contact-modal-close" type="button" aria-label="Close contact form">&times;</button>
      <p class="eyebrow contact-modal-eyebrow">Get in touch</p>
      <h2 class="contact-modal-title" id="contact-modal-title">Contact Dr. Kitlowski</h2>
      <p class="contact-modal-lede">Questions, feedback, or partnership ideas? Send a note and it opens in your email app, pre-addressed to <strong>${CONTACT_EMAIL}</strong>.</p>
      <form class="contact-modal-form" id="contact-modal-form" novalidate>
        <label class="contact-field">
          <span class="contact-field-label">Your name</span>
          <input class="contact-field-input" type="text" name="name" autocomplete="name" />
        </label>
        <label class="contact-field">
          <span class="contact-field-label">Your email</span>
          <input class="contact-field-input" type="email" name="email" autocomplete="email" placeholder="you@email.com" />
        </label>
        <label class="contact-field">
          <span class="contact-field-label">Subject</span>
          <input class="contact-field-input" type="text" name="subject" />
        </label>
        <label class="contact-field">
          <span class="contact-field-label">Message</span>
          <textarea class="contact-field-input contact-field-textarea" name="message" rows="4" required></textarea>
        </label>
        <p class="contact-modal-error" id="contact-modal-error" role="alert" hidden></p>
        <div class="contact-modal-actions">
          <button class="cta-ghost" type="button" id="contact-modal-cancel">Cancel</button>
          <button class="cta-primary" type="submit">Send email</button>
        </div>
      </form>
    </div>
  `;
  return el;
}

function close(): void {
  if (!backdrop) return;
  backdrop.setAttribute('hidden', '');
  document.body.style.overflow = '';
  lastFocused?.focus();
}

function onKeydown(e: KeyboardEvent): void {
  if (e.key === 'Escape' && backdrop && !backdrop.hasAttribute('hidden')) {
    close();
  }
}

/** Open the contact composer, optionally seeding the subject/message. */
export function openContactModal(prefill: ContactPrefill = {}): void {
  if (!backdrop) {
    backdrop = buildModal();
    document.body.appendChild(backdrop);

    backdrop.querySelector('.contact-modal-close')?.addEventListener('click', close);
    backdrop.querySelector('#contact-modal-cancel')?.addEventListener('click', close);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) close();
    });
    document.addEventListener('keydown', onKeydown);

    const form = backdrop.querySelector<HTMLFormElement>('#contact-modal-form')!;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') ?? '').trim();
      const email = String(data.get('email') ?? '').trim();
      const subject = String(data.get('subject') ?? '').trim();
      const message = String(data.get('message') ?? '').trim();
      const errorEl = backdrop!.querySelector<HTMLElement>('#contact-modal-error')!;

      if (!message) {
        errorEl.textContent = 'Please add a short message before sending.';
        errorEl.hidden = false;
        form.querySelector<HTMLElement>('[name="message"]')?.focus();
        return;
      }
      errorEl.hidden = true;

      const bodyLines = [
        message,
        '',
        '—',
        name ? `From: ${name}` : '',
        email ? `Reply to: ${email}` : '',
      ].filter(Boolean);

      const mailto =
        `mailto:${CONTACT_EMAIL}` +
        `?subject=${encodeURIComponent(subject || 'Kittech-Six — contact')}` +
        `&body=${encodeURIComponent(bodyLines.join('\n'))}`;

      window.location.href = mailto;
      close();
    });
  }

  // Seed prefill values each open
  const subjectInput = backdrop.querySelector<HTMLInputElement>('[name="subject"]')!;
  const messageInput = backdrop.querySelector<HTMLTextAreaElement>('[name="message"]')!;
  subjectInput.value = prefill.subject ?? '';
  messageInput.value = prefill.message ?? '';
  backdrop.querySelector<HTMLElement>('#contact-modal-error')!.hidden = true;

  lastFocused = document.activeElement as HTMLElement;
  backdrop.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  backdrop.querySelector<HTMLInputElement>('[name="name"]')?.focus();
}
