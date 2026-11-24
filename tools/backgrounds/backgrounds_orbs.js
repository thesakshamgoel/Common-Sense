/* Orb worlds: elegant, premium gradient fields. No lines, no hard edges, no neon.
   Each world = deep tinted base + 3-5 large soft orbs (smooth exponential falloff, many stops so no banding)
   + one soft light bloom + fine dither grain. Orbs drift slowly (8-20 s cycles). Pure function of t.
   BG.orbs(comp, palette, ctx, w, h, t). Palette = name or {base, a, b, c, light} hex. Load backgrounds.js first. */
(function (root) {
  const BG = root.BG, TAU = Math.PI * 2;
  const hex = h => { const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
  const sn = (t, f, p = 0) => Math.sin(t * f + p);
  const PAL = {
    midnight: { base: '#04060f', a: '#1d3a8a', b: '#3b6fd8', c: '#0e1f55', light: '#b9d0ff' },
    emerald:  { base: '#020a07', a: '#0d5a3a', b: '#2fae74', c: '#0a3a4a', light: '#c9ffe4' },
    aubergine:{ base: '#08040d', a: '#4a1a6e', b: '#8b45c9', c: '#2a0f45', light: '#e6d3ff' },
    ember:    { base: '#0b0503', a: '#7a2a0c', b: '#e0672a', c: '#4a0f1e', light: '#ffe0c4' },
    rosewood: { base: '#0c0407', a: '#6e1838', b: '#d4567f', c: '#3a0f3a', light: '#ffd9e6' },
    lagoon:   { base: '#020a0c', a: '#0b4f5e', b: '#22b3c4', c: '#123a6e', light: '#d3faff' },
    dusk:     { base: '#07050f', a: '#2b2a7a', b: '#c95a8c', c: '#e08a4a', light: '#ffe6d6' },
    aurora:   { base: '#030810', a: '#0e5a5a', b: '#3fc79a', c: '#5a3aa8', light: '#d8fff0' },
    champagne:{ base: '#0b0906', a: '#5a4320', b: '#c9a35e', c: '#3a2a1a', light: '#fff2d6' },
    graphite: { base: '#060607', a: '#2a2d36', b: '#5e6678', c: '#1a1c24', light: '#e8ecf5' },
    sapphire: { base: '#02040e', a: '#0a2a9a', b: '#3a5cff', c: '#5a2aa8', light: '#d6dcff' },
    pearl:    { base: '#e9e6f2', a: '#c7d4ff', b: '#f3c9de', c: '#d9f0ea', light: '#ffffff' }
  };
  // smooth radial orb: exponential falloff over 10 stops -> no visible edge or banding
  function orb(ctx, w, h, x, y, r, col, a, sx = 1, sy = 1) {
    const c = hex(col), R = r * Math.max(w, h);
    ctx.save(); ctx.translate(x * w, y * h); ctx.scale(sx, sy);
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, R);
    for (let i = 0; i <= 10; i++) { const k = i / 10, v = a * Math.exp(-4.2 * k * k); g.addColorStop(k, `rgba(${c[0]},${c[1]},${c[2]},${i === 10 ? 0 : v.toFixed(4)})`); }
    ctx.fillStyle = g; ctx.fillRect(-R, -R, R * 2, R * 2); ctx.restore();
  }
  const C = {
    // big orb rising from the bottom, companion orbs, top bloom
    rise(x, w, h, t, P) {
      orb(x, w, h, 0.5 + 0.04 * sn(t, .21), 1.05 + 0.03 * sn(t, .17), 0.62, P.a, 0.95, 1.3, 0.8);
      orb(x, w, h, 0.28 + 0.05 * sn(t, .19, 1), 0.85, 0.35, P.b, 0.55);
      orb(x, w, h, 0.76 + 0.05 * sn(t, .15, 2), 0.9, 0.3, P.c, 0.7);
      orb(x, w, h, 0.5, 0.98, 0.22, P.light, 0.22, 1.6, 0.6);
    },
    // light falls from above like the Shakeslip frames, but as a soft arc of light
    canopy(x, w, h, t, P) {
      orb(x, w, h, 0.5 + 0.03 * sn(t, .2), -0.1, 0.65, P.a, 0.95, 1.4, 0.75);
      orb(x, w, h, 0.22, 0.1 + 0.03 * sn(t, .23), 0.3, P.c, 0.6);
      orb(x, w, h, 0.8, 0.08, 0.28, P.b, 0.45);
      orb(x, w, h, 0.5 + 0.05 * sn(t, .13), 0.02, 0.4, P.b, 0.55, 2.2, 0.32);
      orb(x, w, h, 0.5, 0.0, 0.25, P.light, 0.25, 2.6, 0.22);
    },
    // two orbs in conversation, one warm one cool, diagonal
    duet(x, w, h, t, P) {
      orb(x, w, h, 0.18 + 0.04 * sn(t, .18), 0.2 + 0.04 * sn(t, .14), 0.78, P.a, 0.85, 1.2, 0.9);
      orb(x, w, h, 0.85 + 0.04 * sn(t, .16, 2), 0.85 + 0.04 * sn(t, .2, 1), 0.72, P.b, 0.7, 1.2, 0.9);
      orb(x, w, h, 0.55, 0.45, 0.45, P.c, 0.4);
    },
    // a single soft sun behind the subject, off centre (rule of thirds)
    eclipse(x, w, h, t, P) {
      const cx = 0.64 + 0.02 * sn(t, .15), cy = 0.46 + 0.02 * sn(t, .19);
      orb(x, w, h, cx, cy, 0.55, P.a, 0.85);
      orb(x, w, h, cx, cy, 0.28, P.b, 0.6);
      orb(x, w, h, cx + 0.02, cy - 0.03, 0.12, P.light, 0.35);
      orb(x, w, h, 0.12, 0.85, 0.3, P.c, 0.5);
    },
    // a cluster of drifting orbs, mesh-like, for quiet sections
    drift(x, w, h, t, P) {
      orb(x, w, h, 0.1 + 0.05 * sn(t, .11), 0.15 + 0.04 * sn(t, .13), 0.75, P.a, 0.85);
      orb(x, w, h, 0.9 + 0.05 * sn(t, .12, 1), 0.2 + 0.05 * sn(t, .1, 2), 0.7, P.c, 0.8);
      orb(x, w, h, 0.55 + 0.06 * sn(t, .09, 3), 0.95 + 0.04 * sn(t, .14, 1), 0.75, P.b, 0.75);
      orb(x, w, h, 0.45, 0.45, 0.3, P.light, 0.12);
    },
    // horizon of light: a soft glowing band low in frame (a floor), no line
    dawn(x, w, h, t, P) {
      orb(x, w, h, 0.5, 0.72 + 0.01 * sn(t, .2), 0.7, P.a, 0.9, 1.6, 0.35);
      orb(x, w, h, 0.5, 0.72, 0.4, P.b, 0.6, 1.8, 0.22);
      orb(x, w, h, 0.5 + 0.08 * sn(t, .12), 0.71, 0.2, P.light, 0.35, 2.2, 0.18);
      orb(x, w, h, 0.85, 0.1, 0.35, P.c, 0.45);
    },
    // light enters from one side, like a window
    side(x, w, h, t, P) {
      orb(x, w, h, -0.05, 0.5 + 0.04 * sn(t, .17), 0.7, P.a, 0.95, 0.8, 1.3);
      orb(x, w, h, 0.05, 0.35, 0.35, P.b, 0.55);
      orb(x, w, h, 0.0, 0.5, 0.18, P.light, 0.28, 0.8, 1.6);
      orb(x, w, h, 0.9, 0.85, 0.3, P.c, 0.5);
    },
    // a tall column of soft light behind the subject
    veil(x, w, h, t, P) {
      orb(x, w, h, 0.5 + 0.03 * sn(t, .15), 0.45, 0.55, P.a, 0.8, 0.55, 1.4);
      orb(x, w, h, 0.5, 0.4, 0.3, P.b, 0.5, 0.45, 1.6);
      orb(x, w, h, 0.5, 0.35, 0.14, P.light, 0.2, 0.5, 2.0);
      orb(x, w, h, 0.05, 0.9, 0.4, P.c, 0.55); orb(x, w, h, 0.95, 0.9, 0.4, P.c, 0.55);
    }
  };
  function dither(ctx, w, h, a) {
    ctx.save(); ctx.globalAlpha = a; ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = ctx.createPattern(BG._grainTile(), 'repeat'); ctx.fillRect(0, 0, w, h); ctx.restore();
  }
  function orbs(comp, palette, ctx, w, h, t) {
    const P = typeof palette === 'string' ? PAL[palette] : palette; if (!P || !C[comp]) throw new Error('unknown orbs ' + comp + ' ' + palette);
    ctx.fillStyle = P.base; ctx.fillRect(0, 0, w, h);
    ctx.save(); ctx.globalCompositeOperation = palette === 'pearl' ? 'source-over' : 'screen';
    ctx.filter = `blur(${Math.round(w / 40)}px)`;        // melts orbs together: the elegant part
    C[comp](ctx, w, h, t, P);
    ctx.filter = 'none'; ctx.restore();
    // gentle vignette keeps edges calm and centre readable
    const g = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.35, w / 2, h / 2, Math.max(w, h) * 0.8);
    g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, palette === 'pearl' ? 'rgba(80,70,110,0.12)' : 'rgba(0,0,0,0.45)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    dither(ctx, w, h, 0.035);                              // fine grain = no banding, filmic
  }
  const curated = [
    ['canopy','midnight'],['canopy','emerald'],['canopy','aubergine'],['canopy','champagne'],
    ['rise','sapphire'],['rise','ember'],['rise','lagoon'],['rise','rosewood'],
    ['duet','dusk'],['duet','aurora'],['duet','midnight'],['duet','rosewood'],
    ['eclipse','ember'],['eclipse','aubergine'],['eclipse','emerald'],['eclipse','graphite'],
    ['drift','aurora'],['drift','dusk'],['drift','pearl'],['drift','sapphire'],
    ['dawn','champagne'],['dawn','lagoon'],['dawn','rosewood'],['dawn','midnight'],
    ['side','graphite'],['side','emerald'],['side','dusk'],['side','ember'],
    ['veil','sapphire'],['veil','aurora'],['veil','champagne'],['veil','rosewood']
  ];
  BG.orbs = orbs; BG.orbPalettes = Object.keys(PAL); BG.orbComps = Object.keys(C);
  BG.orbNames = curated.map(([c, p]) => 'orb:' + c + '-' + p);
  const base = BG.draw;
  BG.draw = function (n, ctx, w, h, t) { const m = n.match(/^orb:(\w+)-(\w+)$/); if (m) return orbs(m[1], m[2], ctx, w, h, t); return base(n, ctx, w, h, t); };
})(typeof window !== 'undefined' ? window : globalThis);
