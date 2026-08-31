// Viewport frame — v3 "Atlantic × burnt umber".
//
// The v2 metallic frame carried a pointer-tracked specular highlight that this
// module animated. v3 retires gradients/glow fleet-wide, so the frame is now a
// flat umber band painted entirely in CSS (styles/frame.css) and needs no JS.
//
// The export stays so main.ts keeps its call site; it is intentionally a no-op.

export function mountFrameSheen(): void {
  // v3 flat frame: nothing to animate.
}
