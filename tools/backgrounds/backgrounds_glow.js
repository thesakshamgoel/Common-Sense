/* Glow worlds: saturated, brand-tinted near-black (or deep colour) fields with a real light source and a bloomed rim line.
   Extends BG (load backgrounds.js first). BG.glow(structure, palette, ctx, w, h, t) draws any combination.
   palette may be a name or {base, mid, glow, core} hex strings: pass a brand hue to tint to a project.
   Pure function of t. Light is always the source: glow, rim and floor pool agree. */
(function (root) {
  const BG = root.BG, TAU = Math.PI * 2;
  const hex = h => { const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
  const rgba = (h, a) => { const c = hex(h); return `rgba(${c[0]},${c[1]},${c[2]},${a})`; };
  const sn = (t, f, p = 0) => Math.sin(t * f + p);
  const PAL = {
    steel:   { base: '#03050f', mid: '#16306e', glow: '#4f86ff', core: '#d6e6ff' },
    verdant: { base: '#020a06', mid: '#0b4a2a', glow: '#33d27a', core: '#d4ffe6' },
    petrol:  { base: '#030b10', mid: '#0d4a5c', glow: '#2ec4d6', core: '#d6fbff' },
    violet:  { base: '#08040f', mid: '#3a1a7a', glow: '#9a5cff', core: '#eadcff' },
    magenta: { base: '#0d030a', mid: '#6a0f4a', glow: '#ff3fa8', core: '#ffd9ee' },
    crimson: { base: '#0c0303', mid: '#650d14', glow: '#ff3b3b', core: '#ffdcd6' },
    amber:   { base: '#0c0702', mid: '#6a3a05', glow: '#ffa21a', core: '#fff0cf' },
    teal:    { base: '#02090a', mid: '#075a55', glow: '#19e0c4', core: '#d4fff7' },
    cobalt:  { base: '#02041a', mid: '#0a2bb0', glow: '#2f6bff', core: '#dbe6ff' },
    indigo:  { base: '#05031a', mid: '#2a1a9a', glow: '#6b4dff', core: '#e2dcff' },
    rose:    { base: '#0d0408', mid: '#7a1a3c', glow: '#ff6b9a', core: '#ffe1ec' },
    lime:    { base: '#060a02', mid: '#3a6a0a', glow: '#a6ee2a', core: '#f0ffcf' }
  };
  function pool(ctx, w, h, x, y, rx, ry, col, a) {
    ctx.save(); ctx.translate(x * w, y * h); ctx.scale(1, ry / rx);
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx * w);
    g.addColorStop(0, rgba(col, a)); g.addColorStop(0.5, rgba(col, a * 0.35)); g.addColorStop(1, rgba(col, 0));
    ctx.fillStyle = g; ctx.fillRect(-w * 2, -h * 4, w * 4, h * 8); ctx.restore();
  }
  function rim(ctx, w, P, pathFn, scale) {
    // bloomed line: wide soft pass, mid pass, thin white-hot core
    const k = (scale || 1) * w / 1920;
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.lineCap = 'round';
    [[90, 0.10, 140], [46, 0.20, 80], [18, 0.38, 34], [6, 0.75, 12]].forEach(([lw, a, blur]) => {
      ctx.shadowColor = rgba(P.glow, 0.9); ctx.shadowBlur = blur * k; ctx.strokeStyle = rgba(P.glow, a); ctx.lineWidth = lw * k;
      ctx.beginPath(); pathFn(); ctx.stroke();
    });
    ctx.shadowBlur = 6 * k; ctx.strokeStyle = rgba(P.core, 0.95); ctx.lineWidth = 1.8 * k; ctx.beginPath(); pathFn(); ctx.stroke();
    ctx.restore();
  }
  function vig(ctx, w, h, a) {
    const g = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.78);
    g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${a})`); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  }
  function ell(ctx, cx, cy, rx, ry, a0, a1) { ctx.ellipse(cx, cy, rx, ry, 0, a0, a1); }
  const S = {
    arcTop(c, w, h, t, P) {
      pool(c, w, h, 0.5 + 0.03 * sn(t, .3), 0.05, 0.7, 0.55, P.mid, 0.95);
      rim(c, w, P, () => ell(c, w * 0.5 + 12 * sn(t, .4), -h * 0.62, w * 0.78, h * (1.0 + 0.02 * sn(t, .5)), 0.02, Math.PI - 0.02));
      pool(c, w, h, 0.5, 0.16, 0.5, 0.2, P.glow, 0.28);
    },
    arcBottom(c, w, h, t, P) {
      pool(c, w, h, 0.5 + 0.03 * sn(t, .3), 0.98, 0.7, 0.55, P.mid, 0.95);
      rim(c, w, P, () => ell(c, w * 0.5 + 12 * sn(t, .4), h * 1.62, w * 0.78, h * (1.0 + 0.02 * sn(t, .5)), Math.PI + 0.02, TAU - 0.02));
      pool(c, w, h, 0.5, 0.86, 0.5, 0.2, P.glow, 0.28);
    },
    arcBoth(c, w, h, t, P) {
      pool(c, w, h, 0.5, 0.0, 0.7, 0.4, P.mid, 0.8); pool(c, w, h, 0.5, 1.0, 0.7, 0.4, P.mid, 0.8);
      rim(c, w, P, () => ell(c, w * 0.5, -h * 0.72 + 8 * sn(t, .4), w * 0.8, h * 1.0, 0.03, Math.PI - 0.03));
      rim(c, w, P, () => ell(c, w * 0.5, h * 1.72 - 8 * sn(t, .4, 1), w * 0.8, h * 1.0, Math.PI + 0.03, TAU - 0.03), 0.8);
    },
    horizon(c, w, h, t, P) {
      const y = h * (0.62 + 0.012 * sn(t, .3));
      pool(c, w, h, 0.5, 0.62, 0.9, 0.45, P.mid, 0.9);
      const g = c.createLinearGradient(0, y, 0, h); g.addColorStop(0, rgba(P.mid, 0.55)); g.addColorStop(1, rgba(P.base, 0.9)); c.fillStyle = g; c.fillRect(0, y, w, h - y);
      rim(c, w, P, () => { c.moveTo(w * 0.04, y); c.lineTo(w * 0.96, y); }, 0.9);
      pool(c, w, h, 0.5, 0.62, 0.35, 0.08, P.core, 0.22);
    },
    spot(c, w, h, t, P) {
      const x = w * (0.5 + 0.06 * sn(t, .25)); c.save(); c.globalCompositeOperation = 'lighter';
      const g = c.createLinearGradient(0, 0, 0, h * 0.95); g.addColorStop(0, rgba(P.glow, 0.5)); g.addColorStop(1, rgba(P.glow, 0));
      c.fillStyle = g; c.filter = `blur(${Math.round(w / 90)}px)`; c.beginPath(); c.moveTo(x - w * 0.03, 0); c.lineTo(x + w * 0.03, 0); c.lineTo(x + w * 0.3, h); c.lineTo(x - w * 0.3, h); c.fill(); c.filter = 'none'; c.restore();
      pool(c, w, h, x / w, 1.0, 0.4, 0.25, P.glow, 0.55); pool(c, w, h, x / w, 0.0, 0.2, 0.1, P.core, 0.4);
    },
    halo(c, w, h, t, P) {
      pool(c, w, h, 0.5, 0.5, 0.55, 0.55, P.mid, 0.9);
      rim(c, w, P, () => c.arc(w / 2, h / 2, h * (0.42 + 0.012 * sn(t, .6)), 0, TAU), 0.6);
      pool(c, w, h, 0.5, 0.5, 0.2, 0.2, P.glow, 0.18);
    },
    cornerBloom(c, w, h, t, P) {
      pool(c, w, h, 0.0 + 0.03 * sn(t, .3), 0.0, 0.95, 0.9, P.mid, 1); pool(c, w, h, 0.02, 0.02, 0.45, 0.4, P.glow, 0.5);
      rim(c, w, P, () => ell(c, -w * 0.2, -h * 0.3, w * 1.0, h * 1.35, 0.1, 1.1), 0.9);
    },
    sideRim(c, w, h, t, P) {
      pool(c, w, h, 1.0, 0.5 + 0.04 * sn(t, .3), 0.8, 0.9, P.mid, 0.95);
      rim(c, w, P, () => ell(c, w * 1.55, h * 0.5, w * 0.75 + 8 * sn(t, .4), h * 1.1, Math.PI * 0.62, Math.PI * 1.38));
      pool(c, w, h, 0.9, 0.5, 0.2, 0.35, P.glow, 0.25);
    },
    crossArcs(c, w, h, t, P) {
      pool(c, w, h, 0.5, 0.5, 0.8, 0.6, P.mid, 0.75);
      c.save(); c.translate(w / 2, h / 2); c.rotate(-0.28 + 0.01 * sn(t, .3));
      rim(c, w, P, () => ell(c, 0, -h * 0.95, w * 0.75, h * 1.0, 0.1, Math.PI - 0.1), 0.8); c.restore();
      c.save(); c.translate(w / 2, h / 2); c.rotate(0.28 - 0.01 * sn(t, .3, 1));
      rim(c, w, P, () => ell(c, 0, h * 0.95, w * 0.75, h * 1.0, Math.PI + 0.1, TAU - 0.1), 0.8); c.restore();
    },
    floorPool(c, w, h, t, P) {
      pool(c, w, h, 0.5 + 0.04 * sn(t, .3), 1.02, 0.65, 0.5, P.glow, 0.7); pool(c, w, h, 0.5, 1.0, 0.35, 0.18, P.core, 0.35);
      pool(c, w, h, 0.5, 0.2, 0.7, 0.5, P.mid, 0.4);
    },
    aurora(c, w, h, t, P) {
      c.save(); c.globalCompositeOperation = 'lighter'; c.filter = `blur(${Math.round(w / 22)}px)`;
      for (let i = 0; i < 4; i++) {
        const x = w * (0.15 + 0.23 * i + 0.04 * sn(t, .3 + i * .07, i)), g = c.createLinearGradient(0, 0, 0, h);
        g.addColorStop(0, rgba(i % 2 ? P.glow : P.mid, 0)); g.addColorStop(0.55, rgba(i % 2 ? P.glow : P.mid, 0.75)); g.addColorStop(1, rgba(P.mid, 0));
        c.fillStyle = g; c.beginPath(); c.ellipse(x, h * 0.55, w * 0.07, h * (0.55 + 0.05 * sn(t, .4, i)), 0, 0, TAU); c.fill();
      }
      c.filter = 'none'; c.restore();
    },
    split(c, w, h, t, P) {
      const alt = { ...P, glow: P.core };
      pool(c, w, h, 0.05, 0.55, 0.8, 0.9, P.glow, 0.85); pool(c, w, h, 0.95 + 0.02 * sn(t, .3), 0.45, 0.8, 0.9, P.mid, 1);
      pool(c, w, h, 0.5, 0.5, 0.3, 0.9, P.core, 0.08);
    }
  };
  function glow(structure, palette, ctx, w, h, t) {
    const P = typeof palette === 'string' ? PAL[palette] : palette; if (!P || !S[structure]) throw new Error('unknown glow ' + structure + ' ' + palette);
    ctx.fillStyle = P.base; ctx.fillRect(0, 0, w, h);
    S[structure](ctx, w, h, t, P);
    vig(ctx, w, h, 0.5);
    ctx.save(); ctx.globalAlpha = 0.045; ctx.globalCompositeOperation = 'overlay'; ctx.fillStyle = ctx.createPattern(root.BG._grainTile(), 'repeat'); ctx.fillRect(0, 0, w, h); ctx.restore();
  }
  const curated = [
    ['arcBoth','steel'],['arcTop','verdant'],['arcTop','petrol'],['arcBottom','violet'],['arcBoth','magenta'],['arcTop','crimson'],
    ['arcTop','amber'],['arcBoth','teal'],['halo','cobalt'],['halo','violet'],['halo','amber'],['halo','teal'],
    ['horizon','steel'],['horizon','magenta'],['horizon','amber'],['horizon','verdant'],['spot','indigo'],['spot','crimson'],
    ['spot','teal'],['spot','lime'],['cornerBloom','cobalt'],['cornerBloom','rose'],['cornerBloom','verdant'],['cornerBloom','amber'],
    ['sideRim','violet'],['sideRim','petrol'],['sideRim','crimson'],['sideRim','lime'],['crossArcs','steel'],['crossArcs','magenta'],
    ['crossArcs','teal'],['floorPool','indigo'],['floorPool','rose'],['floorPool','lime'],['aurora','verdant'],['aurora','violet'],
    ['aurora','cobalt'],['aurora','rose'],['split','cobalt'],['split','magenta'],['split','amber'],['split','teal']
  ];
  BG.glow = glow; BG.palettes = Object.keys(PAL); BG.structures = Object.keys(S);
  BG.glowNames = curated.map(([s, p]) => s + '-' + p);
  curated.forEach(([s, p]) => { BG.names.push(s + '-' + p); });
  const base = BG.draw; BG.draw = function (n, ctx, w, h, t) { const m = n.match(/^(\w+)-(\w+)$/); if (m && S[m[1]] && PAL[m[2]]) return glow(m[1], m[2], ctx, w, h, t); return base(n, ctx, w, h, t); };
})(typeof window !== 'undefined' ? window : globalThis);
