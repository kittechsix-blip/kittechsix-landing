// Scroll Animation — reveals .section-content elements on scroll

export function setupScrollAnimations(): void {
  // No IO support or reduced motion: everything is simply visible.
  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.section-content').forEach(el => {
      el.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px 8% 0px' });

  document.querySelectorAll('.section-content').forEach(el => observer.observe(el));

  // Safety net: if anything is still hidden shortly after load (observer
  // throttled in a background tab, edge-case race), reveal it anyway.
  window.setTimeout(() => {
    document.querySelectorAll('.section-content:not(.visible)').forEach(el => {
      el.classList.add('visible');
    });
  }, 2600);
}
