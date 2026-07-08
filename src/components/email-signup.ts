// Email Signup — reusable inline component

import { supabaseInsert } from '../utils/supabase.js';

export function renderEmailSignup(parent: HTMLElement, source: string = 'landing'): void {
  const wrapper = document.createElement('div');
  wrapper.className = 'email-signup';
  wrapper.id = `email-signup-${source}`;

  const input = document.createElement('input');
  input.type = 'email';
  input.className = 'email-signup-input';
  input.placeholder = 'you@email.com';
  input.setAttribute('aria-label', 'Email address');

  const btn = document.createElement('button');
  btn.className = 'cta-primary';
  btn.textContent = 'Get Notified';
  btn.style.whiteSpace = 'nowrap';

  wrapper.appendChild(input);
  wrapper.appendChild(btn);
  parent.appendChild(wrapper);

  btn.addEventListener('click', async () => {
    const email = input.value.trim();

    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError(wrapper, 'Please enter a valid email address.');
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Submitting...';

    const result = await supabaseInsert('landing_emails', { email, source });

    if (result.error) {
      btn.disabled = false;
      btn.textContent = 'Get Notified';
      if (result.status === 409 || (result.error && result.error.includes('duplicate'))) {
        showSuccess(wrapper);
      } else {
        showError(wrapper, 'Something went wrong. Please try again.');
      }
    } else {
      showSuccess(wrapper);
    }
  });

  // Submit on Enter
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') btn.click();
  });
}

function showSuccess(wrapper: HTMLElement): void {
  wrapper.innerHTML = '<div class="email-signup-success">You\'re on the list! \u2713</div>';
}

function showError(wrapper: HTMLElement, message: string): void {
  // Remove existing error
  const existing = wrapper.querySelector('.email-signup-error');
  if (existing) existing.remove();

  const err = document.createElement('div');
  err.className = 'email-signup-error';
  err.textContent = message;
  wrapper.appendChild(err);
}
