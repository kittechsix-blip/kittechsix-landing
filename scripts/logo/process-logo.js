// Builds assets/kittech-logo.webp (+ -sm) from _assets/icon's/kittechsix-logo-clean.png (2186x1952).
// Load in a page that already shows logo-clean.png, then call processLogo() -> transparent canvas.
//
// 1. Repairs a defect baked into the source render: the thick stroke of the "x" in "Six"
//    is cut flat at row ~1645, ~57px above the baseline (~1702). The stroke is rebuilt from
//    an average of its own clean rows (1505-1535), following its measured lean, with a
//    rounded foot and slight darkening toward the baseline like the other letters.
// 2. Keys out the backdrop on chroma (copper is red-dominant at any brightness; the grey
//    backdrop is not), drops the glossy shelf under the script, lifts the script's shadows.
window.processLogo = async function processLogo(img) {
  await img.decode();
  const W = img.naturalWidth, H = img.naturalHeight;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const x = c.getContext('2d'); x.drawImage(img, 0, 0);
  const d = x.getImageData(0, 0, W, H), a = d.data;
  const src = new Uint8ClampedArray(a);

  // ---- 1. repair the x
  const X0 = 1885, X1 = 1974, cx0 = 1929, slope = 0.065, TPL = 1520;
  const tpl = new Float32Array((X1 - X0 + 1) * 3);
  for (let y = 1505; y <= 1535; y++) for (let xx = X0; xx <= X1; xx++) for (let ch = 0; ch < 3; ch++) tpl[(xx - X0) * 3 + ch] += src[(y * W + xx) * 4 + ch] / 31;
  const yA = 1606, yEnd = 1702, capH = 26, half = 34;
  for (let y = yA; y <= yEnd; y++) {
    const shift = slope * (y - TPL);
    let capScale = 1; if (y > yEnd - capH) { const t = (y - (yEnd - capH)) / capH; capScale = Math.sqrt(Math.max(0, 1 - t * t)); }
    const blendIn = Math.min(1, (y - yA) / 16);
    const shade = 1 - 0.18 * Math.max(0, (y - 1660) / (yEnd - 1660));
    for (let tx = X0 - 6; tx <= X1 + 10; tx++) {
      const sx = tx - shift, i0 = Math.floor(sx) - X0, f = sx - Math.floor(sx);
      if (i0 < 0 || i0 + 1 > X1 - X0) continue;
      const off = Math.abs(tx - (cx0 + shift)) / half; if (off > capScale) continue;
      const k = blendIn * Math.min(1, (capScale - off) * 6), di = (y * W + tx) * 4;
      for (let ch = 0; ch < 3; ch++) {
        const s = (tpl[i0 * 3 + ch] * (1 - f) + tpl[(i0 + 1) * 3 + ch] * f) * shade, t0 = a[di + ch];
        a[di + ch] = Math.max(t0, t0 + (s - t0) * k); // lighten-only: never darkens the crossing stroke
      }
    }
  }

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
