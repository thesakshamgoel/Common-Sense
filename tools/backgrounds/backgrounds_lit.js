/* Lit worlds: the look the user rated best (Shakeslip film, 2026-11-24).
   One light source per frame. Light is TAPERED (brightest at the centre, fading to nothing at the ends),
   pale (tint, not neon), low opacity, with a wide soft spill. Lines are thin and fade toward the frame edges.
   Brand shapes appear as frosted glass planes with a rim light, and must come from the brand's own mark
   (pass opts.markPath, an SVG path in a -1..1 box). The default sparkle is a placeholder only.
   BG.lit(structure, palette, ctx, w, h, t, opts). Pure function of t. Load backgrounds.js first. */
(function (root) {
  const BG = root.BG, TAU = Math.PI * 2;
  const hx = h => { const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
  const ca = (h, a) => { const c = hx(h); return `rgba(${c[0]},${c[1]},${c[2]},${Math.max(0, a).toFixed(4)})`; };
  const sn = (t, f, p = 0) => Math.sin(t * f + p);
  const PAL = {
    steel:    { base: '#03050c', deep: '#14244f', tint: '#6489dc', hot: '#e2ebff' },
    petrol:   { base: '#030a0e', deep: '#0f3341', tint: '#58a6bb', hot: '#dcf6ff' },
    ember:    { base: '#0a0603', deep: '#3a2410', tint: '#d9a14e', hot: '#fff1d2' },
    verdant:  { base: '#030a06', deep: '#0e3a22', tint: '#62c98c', hot: '#dcffe9' },
    plum:     { base: '#08040c', deep: '#2e1640', tint: '#a97ad9', hot: '#f1e4ff' },
    rose:     { base: '#0b0408', deep: '#3a1426', tint: '#d97a9e', hot: '#ffe6ef' },
    graphite: { base: '#050506', deep: '#1c1e24', tint: '#8f98ab', hot: '#f2f4f8' },
    indigo:   { base: '#04040e', deep: '#1c1a52', tint: '#7d7be6', hot: '#e6e4ff' }
  };
  const SPARKLE = 'M0,-1 C0.1,-0.42 0.42,-0.1 1,0 C0.42,0.1 0.1,0.42 0,1 C-0.1,0.42 -0.42,0.1 -1,0 C-0.42,-0.1 -0.1,-0.42 0,-1 Z';
  function orb(c, x, y, r, col, a, sx = 1, sy = 1) {
    c.save(); c.translate(x, y); c.scale(sx, sy);
    const g = c.createRadialGradient(0, 0, 0, 0, 0, r), k = hx(col);
    for (let i = 0; i <= 10; i++) { const u = i / 10; g.addColorStop(u, `rgba(${k[0]},${k[1]},${k[2]},${i === 10 ? 0 : (a * Math.exp(-4.2 * u * u)).toFixed(4)})`); }
    c.fillStyle = g; c.fillRect(-r, -r, 2 * r, 2 * r); c.restore();
  }
  // tapered stroke: gradient along an axis so the light peaks in the middle and dies at both ends
  function taper(c, x0, y0, x1, y1, P, a) {
    const g = c.createLinearGradient(x0, y0, x1, y1);
    g.addColorStop(0, ca(P.tint, 0)); g.addColorStop(0.18, ca(P.tint, a * 0.35)); g.addColorStop(0.5, ca(P.hot, a));
    g.addColorStop(0.82, ca(P.tint, a * 0.35)); g.addColorStop(1, ca(P.tint, 0)); return g;
  }
  function lightPasses(c, w, pathFn, styleFn, strength = 1) {
    // wide spill, mid bloom, thin core. Screen blend, never a uniform neon tube.
    const k = w / 1920;
    [[180 * k, 130 * k, 0.5], [50 * k, 34 * k, 0.75], [10 * k, 8 * k, 0.8], [0, 2.6 * k, 1]].forEach(([blur, lw, a]) => {
      c.save(); c.globalCompositeOperation = 'screen'; if (blur) c.filter = `blur(${Math.round(blur / 4)}px)`;
      c.strokeStyle = styleFn(a * strength); c.lineWidth = lw; c.lineCap = 'round'; c.beginPath(); pathFn(); c.stroke(); c.restore();
    });
  }
  function fadeLayer(w, h, draw, cx, cy, r) {
    const L = document.createElement('canvas'); L.width = w; L.height = h; const x = L.getContext('2d'); draw(x);
    x.globalCompositeOperation = 'destination-in';
    const g = x.createRadialGradient(cx * w, cy * h, 0, cx * w, cy * h, r * Math.max(w, h));
    g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(0.55, 'rgba(0,0,0,0.75)'); g.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = g; x.fillRect(0, 0, w, h); return L;
  }
  function limb(c, w, h, t, P, cx, cy, rx, ry, a0, a1, axis, spill) {
    const br = 0.92 + 0.08 * sn(t, .5);
    orb(c, spill[0] * w, spill[1] * h, spill[2] * w, P.tint, 0.7 * br, spill[3], spill[4]);
    orb(c, spill[0] * w, spill[1] * h, spill[2] * w * 0.45, P.hot, 0.3 * br, spill[3], spill[4]);
    const g = axis === 'x' ? [0, 0, w, 0] : [0, 0, 0, h];
    lightPasses(c, w, () => c.ellipse(cx * w, cy * h, rx * w, ry * h, 0, a0, a1), a => taper(c, ...g, P, a), br);
  }
  function sineFamily(x, w, h, t, P, curves) {
    curves.forEach(([y0, A, k, ph, sp]) => {
      const path = () => { for (let i = 0; i <= 160; i++) { const u = i / 160, X = -0.05 * w + u * 1.1 * w, Y = (y0 + A * Math.sin(k * TAU * u + ph + t * sp)) * h; i ? x.lineTo(X, Y) : x.moveTo(X, Y); } };
      softLine(x, w, path, P, 0.55);
    });
  }
  function softLine(x, w, path, P, a) {
    const k = w / 1920;
    x.save(); x.globalCompositeOperation = 'screen';
    x.filter = `blur(${Math.round(9 * k)}px)`; x.strokeStyle = ca(P.tint, a * 0.9); x.lineWidth = 9 * k; x.beginPath(); path(); x.stroke();
    x.filter = 'none'; x.strokeStyle = ca(P.hot, a * 0.8); x.lineWidth = 2.2 * k; x.beginPath(); path(); x.stroke(); x.restore();
  }
  function markPath(opts) { return new Path2D((opts && opts.markPath) || SPARKLE); }
  function glassMark(c, w, P, mp, x, y, s, rot, a, lightAng) {
    const k = w / 1920;
    c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s);
    // body: faint frosted fill, lit from the light side
    const g = c.createLinearGradient(-Math.cos(lightAng), -Math.sin(lightAng), Math.cos(lightAng), Math.sin(lightAng));
    g.addColorStop(0, ca(P.tint, 0.5 * a)); g.addColorStop(1, ca(P.deep, 0.3 * a));
    c.fillStyle = g; c.fill(mp);
    // rim: soft glow then thin edge, brighter facing the light
    c.globalCompositeOperation = 'screen'; c.lineJoin = 'round'; c.lineCap = 'round';
    c.filter = `blur(${Math.round(8 * k)}px)`; c.strokeStyle = ca(P.tint, 0.5 * a); c.lineWidth = 10 * k / s; c.stroke(mp);
    c.filter = 'none';
    const rg = c.createLinearGradient(-Math.cos(lightAng), -Math.sin(lightAng), Math.cos(lightAng), Math.sin(lightAng));
    rg.addColorStop(0, ca(P.hot, 0.85 * a)); rg.addColorStop(0.6, ca(P.tint, 0.35 * a)); rg.addColorStop(1, ca(P.tint, 0.1 * a));
    c.strokeStyle = rg; c.lineWidth = 1.6 * k / s; c.stroke(mp);
    c.restore();
  }
  const S = {
    // planet limb above, light spilling down (S1 hook, S18 Paid)
    edgeArc(c, w, h, t, P) {
      orb(c, 0.5 * w, 0, 0.9 * w, P.deep, 0.9, 1.2, 0.5);
      limb(c, w, h, t, P, 0.5, 0.3 - 1.0, 0.95, 1.0, 0.0, Math.PI, 'x', [0.5, 0.26, 0.6, 1.6, 0.42]);
    },
    // limb below, for end cards and lower thirds (S21, end-steel)
    lowArc(c, w, h, t, P) {
      orb(c, 0.5 * w, h, 0.9 * w, P.deep, 0.8, 1.2, 0.5);
      limb(c, w, h, t, P, 0.5, 0.74 + 1.0, 0.95, 1.0, Math.PI, TAU, 'x', [0.5, 0.78, 0.55, 1.6, 0.4]);
    },
    // a small, shallow arc behind content (S6 "small arc")
    smallArc(c, w, h, t, P) {
      orb(c, 0.5 * w, 0.9 * h, 0.6 * w, P.deep, 0.7, 1.3, 0.5);
      limb(c, w, h, t, P, 0.5, 0.82 + 0.5, 0.42, 0.5, Math.PI + 0.25, TAU - 0.25, 'x', [0.5, 0.82, 0.3, 1.6, 0.3]);
    },
    // planet limb on one side (petrol-side)
    side(c, w, h, t, P) {
      orb(c, 0, 0.5 * h, 0.7 * w, P.deep, 0.8, 0.6, 1.2);
      limb(c, w, h, t, P, 0.16 - 0.75, 0.5, 0.75, 0.9, -Math.PI / 2, Math.PI / 2, 'y', [0.14, 0.5, 0.5, 0.45, 1.5]);
    },
    // one tapered shaft of light (ember-beam, S2, S11)
    beam(c, w, h, t, P) {
      const x = (0.6 + 0.015 * sn(t, .3)) * w, k = w / 1920;
      orb(c, x, 0, 0.5 * w, P.deep, 0.8, 1.2, 0.8);
      c.save(); c.globalCompositeOperation = 'screen'; c.translate(x, -0.05 * h); c.rotate(0.12);
      [[60, 0.35, 1], [18, 0.75, 0.55]].forEach(([blur, a, wd]) => {
        const g = c.createLinearGradient(0, 0, 0, h * 1.05);
        g.addColorStop(0, ca(P.hot, a)); g.addColorStop(0.35, ca(P.tint, a * 0.6)); g.addColorStop(1, ca(P.tint, 0));
        c.filter = `blur(${Math.round(blur * k)}px)`; c.fillStyle = g; c.beginPath();
        c.moveTo(-18 * k * wd, 0); c.lineTo(18 * k * wd, 0); c.lineTo(95 * k * wd, h * 1.05); c.lineTo(-95 * k * wd, h * 1.05); c.fill();
      });
      c.restore(); orb(c, x, 0, 0.12 * w, P.hot, 0.35, 1.4, 0.6);
    },
    // a big soft field of light (steel-field, S3, S20 brand field)
    field(c, w, h, t, P) {
      const x = (0.6 + 0.03 * sn(t, .13)) * w, y = (0.35 + 0.03 * sn(t, .17)) * h;
      orb(c, x, y, 0.75 * w, P.deep, 0.9); orb(c, x, y, 0.45 * w, P.tint, 0.65); orb(c, x + 0.05 * w, y - 0.05 * h, 0.18 * w, P.hot, 0.35);
    },
    // quiet light for dense UI (soft light)
    softLight(c, w, h, t, P) {
      orb(c, 0.15 * w, 1.0 * h, 0.6 * w, P.deep, 0.9, 1.3, 0.8); orb(c, (0.2 + 0.03 * sn(t, .15)) * w, 0.95 * h, 0.3 * w, P.tint, 0.25, 1.4, 0.6);
      orb(c, 0.85 * w, 0.05 * h, 0.4 * w, P.deep, 0.6);
    },
    // flat: almost nothing, for the busiest scenes
    flat(c, w, h, t, P) { orb(c, 0.5 * w, 0.2 * h, 0.8 * w, P.deep, 0.55, 1.3, 0.7); },
    // brand waves: two families of soft sines, low in frame, fading to the edges (logo waves low)
    waves(c, w, h, t, P) {
      orb(c, 0.5 * w, 0.75 * h, 0.7 * w, P.deep, 0.6, 1.4, 0.7);
      c.drawImage(fadeLayer(w, h, x => sineFamily(x, w, h, t, P, [[0.66, 0.2, 1.0, 0, .25], [0.66, 0.2, 1.0, Math.PI, .25], [0.55, 0.34, 0.55, 0.4, .18], [0.55, 0.34, 0.55, 0.4 + Math.PI, .18]]), 0.5, 0.65, 0.8), 0, 0);
    },
    // looping waves on a diagonal, from one corner (logo waves diagonal)
    wavesDiag(c, w, h, t, P) {
      orb(c, 0.2 * w, 0.6 * h, 0.6 * w, P.deep, 0.7);
      c.drawImage(fadeLayer(w, h, x => {
        x.save(); x.translate(0.18 * w, 0.62 * h); x.rotate(-1.15);
        [[0.2, 0.36, 0], [0.3, 0.52, 0.6]].forEach(([r, d, ph]) => {
          const R = r * h, D = d * h;
          softLine(x, w, () => { for (let i = 0; i <= 220; i++) { const th = -2 * Math.PI + i / 220 * 4.2 * Math.PI + ph + t * 0.15, X = R * th - D * Math.sin(th), Y = -D * Math.cos(th); i ? x.lineTo(X, Y) : x.moveTo(X, Y); } }, P, 0.6);
        });
        x.restore();
      }, 0.15, 0.6, 0.8), 0, 0);
    },
    // brand marks as frosted glass planes at three depths (logo stars)
    marks(c, w, h, t, P, o) {
      const mp = markPath(o); orb(c, 0.75 * w, 0.2 * h, 0.6 * w, P.deep, 0.8);
      glassMark(c, w, P, mp, (0.78 + 0.01 * sn(t, .2)) * w, 0.32 * h, 0.42 * h, 0.25 + 0.02 * sn(t, .15), 0.8, -2.3);
      glassMark(c, w, P, mp, (0.2 + 0.008 * sn(t, .25, 1)) * w, 0.72 * h, 0.17 * h, 0.08, 0.9, -2.3);
      glassMark(c, w, P, mp, 0.66 * w, 0.85 * h, 0.06 * h, 0.4, 1, -2.3);
    },
    // one big mark catching the light on its leading edge (steel-starGlow)
    markGlow(c, w, h, t, P, o) {
      const mp = markPath(o); orb(c, 0.7 * w, 0.45 * h, 0.55 * w, P.deep, 0.9);
      orb(c, 0.62 * w, 0.3 * h, 0.25 * w, P.tint, 0.25);
      glassMark(c, w, P, mp, 0.74 * w, 0.48 * h, 0.5 * h, 0.35 + 0.015 * sn(t, .2), 1.2, -2.5);
    }
  };
  function lit(structure, palette, ctx, w, h, t, opts) {
    const P = typeof palette === 'string' ? PAL[palette] : palette; if (!P || !S[structure]) throw new Error('unknown lit ' + structure + ' ' + palette);
    ctx.fillStyle = P.base; ctx.fillRect(0, 0, w, h);
    S[structure](ctx, w, h, t, P, opts || {});
    const g = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.35, w / 2, h / 2, Math.max(w, h) * 0.8);
    g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.5)'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.save(); ctx.globalAlpha = 0.03; ctx.globalCompositeOperation = 'overlay'; ctx.fillStyle = ctx.createPattern(BG._grainTile(), 'repeat'); ctx.fillRect(0, 0, w, h); ctx.restore();
  }
  const curated = [
    ['edgeArc','steel'],['edgeArc','verdant'],['edgeArc','plum'],['edgeArc','ember'],
    ['lowArc','steel'],['lowArc','petrol'],['smallArc','steel'],['smallArc','rose'],
    ['side','petrol'],['side','indigo'],['beam','ember'],['beam','steel'],
    ['field','steel'],['field','petrol'],['field','plum'],['softLight','petrol'],
    ['waves','steel'],['waves','petrol'],['waves','verdant'],['wavesDiag','ember'],
    ['wavesDiag','steel'],['marks','petrol'],['marks','verdant'],['markGlow','steel'],
    ['markGlow','rose'],['flat','steel'],['flat','graphite'],['softLight','indigo']
  ];
  BG.lit = lit; BG.litPalettes = Object.keys(PAL); BG.litStructures = Object.keys(S);
  BG.litNames = curated.map(([s, p]) => 'lit:' + s + '-' + p);
  const base = BG.draw; BG.draw = function (n, c, w, h, t, o) { const m = n.match(/^lit:(\w+)-(\w+)$/); if (m) return lit(m[1], m[2], c, w, h, t, o); return base(n, c, w, h, t, o); };
})(typeof window !== 'undefined' ? window : globalThis);
