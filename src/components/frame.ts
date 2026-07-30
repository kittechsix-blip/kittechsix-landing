// Metallic frame — the specular highlight that tracks the pointer.
//
// The frame's geometry is pure CSS (see styles/frame.css). This module does one
// job: move the hotspot so the metal catches light as the cursor travels, which
// is what separates "a gradient" from "a lit surface".
//
// Writes are coalesced into a single rAF per frame and set two custom properties
// on one element. No layout is read, so this never triggers a reflow.

let started = false;

export function mountFrameSheen(): void {
  if (started) return;
  started = true;

  const sheen = document.querySelector<HTMLElement>('.metal-frame');
  if (!sheen) return;

  // Honour the reduced-motion preference by leaving the CSS default hotspot in
  // place — the frame stays dimensional, it just stops following the cursor.
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches) return;

  let x = 0;
  let y = 0;
  let queued = false;

  const paint = () => {
    queued = false;
    sheen.style.setProperty('--mf-x', `${x}%`);
    sheen.style.setProperty('--mf-y', `${y}%`);
  };

  window.addEventListener(
    'pointermove',
    (event) => {
      // Coarse pointers (touch) fire only mid-gesture, which makes the highlight
      // jump to wherever a finger happened to land. Leave those alone.
      if (event.pointerType === 'touch') return;
      x = (event.clientX / window.innerWidth) * 100;
      y = (event.clientY / window.innerHeight) * 100;
      if (queued) return;
      queued = true;
      requestAnimationFrame(paint);
    },
    { passive: true }
  );
}
