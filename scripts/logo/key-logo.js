
// Key-only pass for a canvas that already has the repaired "x" (scripts/logo/fix-x.html).
window.keyLogo = function keyLogo(c) {
  const W = c.width, H = c.height, x = c.getContext('2d');
  const d = x.getImageData(0, 0, W, H), a = d.data;
  // ---- 2. key out the backdrop
  const S = W / 1200, shelfY = Math.round(988 * S);
  const ss = (e0, e1, v) => { const t = Math.min(1, Math.max(0, (v - e0) / (e1 - e0))); return t * t * (3 - 2 * t); };
  let minx = W, miny = H, maxx = 0, maxy = 0;
  for (let i = 0; i < a.length; i += 4) {
    const px = (i / 4) % W, py = (i / 4 / W) | 0; let r = a[i], g = a[i + 1], b = a[i + 2];
    const w = r - 0.7 * Math.max(g, b) - 6;
    let al = Math.min(1, Math.max(0, (w - 2) / 30)); al = al * al * (3 - 2 * al);
    if (py >= shelfY) al = 0;
    if (al > 0) {
      const gam = 1 - 0.38 * ss(740 * S, 860 * S, py);
      if (gam < 1) { const lift = v => 255 * Math.pow(v / 255, gam); r = lift(r); g = lift(g); b = lift(b); }
      a[i] = Math.min(255, r); a[i + 1] = Math.min(255, g); a[i + 2] = Math.min(255, b);
      if (al > 0.05) { if (px < minx) minx = px; if (px > maxx) maxx = px; if (py < miny) miny = py; if (py > maxy) maxy = py; }
    }
    a[i + 3] = Math.round(al * 255);
  }
  x.putImageData(d, 0, 0);
  const pad = 20; minx = Math.max(0, minx - pad); miny = Math.max(0, miny - pad); maxx = Math.min(W - 1, maxx + pad); maxy = Math.min(H - 1, maxy + pad);
  const out = document.createElement('canvas'); out.width = maxx - minx + 1; out.height = maxy - miny + 1;
  out.getContext('2d').drawImage(c, minx, miny, out.width, out.height, 0, 0, out.width, out.height);
  out.chip = { x: (615 * S - minx) / out.width * 100, y: (355 * S - miny) / out.height * 100 };
  return out;
};
