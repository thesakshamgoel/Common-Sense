/* Background library. Every background is a pure function of time: BG.draw(name, ctx, w, h, t).
   Works in a browser canvas, so it can feed Remotion (canvas), HyperFrames (HTML), three.js (CanvasTexture) or plain video renders.
   No Math.random, no clocks: grain uses a seeded tile. Colours are starting points: pass opts.colors to override. */
(function (root) {
  const TAU = Math.PI * 2;
  function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
  let tile = null;
  function grainTile() {
    if (tile) return tile;
    const c = document.createElement('canvas'); c.width = c.height = 256;
    const x = c.getContext('2d'), d = x.createImageData(256, 256), r = mulberry32(7);
    for (let i = 0; i < d.data.length; i += 4) { const v = 128 + (r() - 0.5) * 255; d.data[i] = d.data[i+1] = d.data[i+2] = v; d.data[i+3] = 255; }
    x.putImageData(d, 0, 0); tile = c; return c;
  }
  function grain(ctx, w, h, a) {
    ctx.save(); ctx.globalAlpha = a; ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = ctx.createPattern(grainTile(), 'repeat'); ctx.fillRect(0, 0, w, h); ctx.restore();
  }
  function blob(ctx, w, h, cx, cy, r, rgb, a) {
    const x = cx * w, y = cy * h, R = r * Math.max(w, h);
    const g = ctx.createRadialGradient(x, y, 0, x, y, R);
    g.addColorStop(0, `rgba(${rgb},${a})`); g.addColorStop(1, `rgba(${rgb},0)`);
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  }
  function vignette(ctx, w, h, a) {
    const g = ctx.createRadialGradient(w/2, h/2, Math.min(w,h)*0.35, w/2, h/2, Math.max(w,h)*0.75);
    g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${a})`);
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  }
  const s = (t, f, p = 0) => Math.sin(t * f + p);        // slow drift helper
  const B = {
    // 1 frosted pale blue: calm field for dense UI cards (LangEase)
    frostedBlue(ctx, w, h, t) {
      ctx.fillStyle = '#e9f2fd'; ctx.fillRect(0, 0, w, h);
      blob(ctx, w, h, 0.25 + 0.05*s(t,.4), 0.3 + 0.04*s(t,.3,1), 0.6, '150,196,255', 0.55);
      blob(ctx, w, h, 0.8 + 0.05*s(t,.35,2), 0.75 + 0.05*s(t,.45), 0.55, '190,170,255', 0.35);
      blob(ctx, w, h, 0.55, 0.1, 0.5, '255,255,255', 0.8);
      grain(ctx, w, h, 0.05);
    },
    // 2 pastel mesh: soft multi-colour field behind a card plus pills (Teamble)
    pastelMesh(ctx, w, h, t) {
      ctx.fillStyle = '#f7eaf6'; ctx.fillRect(0, 0, w, h);
      ctx.filter = `blur(${Math.round(w/14)}px)`;
      blob(ctx, w, h, 0.2 + 0.1*s(t,.35), 0.25 + 0.08*s(t,.3,1), 0.45, '255,150,200', 0.9);
      blob(ctx, w, h, 0.75 + 0.08*s(t,.3,2), 0.3 + 0.1*s(t,.4,3), 0.45, '170,150,255', 0.9);
      blob(ctx, w, h, 0.55 + 0.1*s(t,.25,4), 0.85 + 0.05*s(t,.35), 0.5, '150,205,255', 0.85);
      blob(ctx, w, h, 0.1 + 0.05*s(t,.3), 0.9, 0.35, '255,205,170', 0.8);
      ctx.filter = 'none'; grain(ctx, w, h, 0.07);
    },
    // 3 dark purple, faint grid, floor glow (Teamble dark scenes)
    darkPurpleGrid(ctx, w, h, t) {
      ctx.fillStyle = '#0c0816'; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(190,150,255,0.06)'; ctx.lineWidth = 1; const step = Math.round(w/30);
      const off = (t * 6) % step;
      for (let x = -off; x < w; x += step) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += step) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      blob(ctx, w, h, 0.5, 1.15, 0.7, '135,60,255', 0.55 + 0.05*s(t,.6));
      vignette(ctx, w, h, 0.55);
    },
    // 4 green glow with an edge-light arc (VibeDocX, Doks.ai)
    greenGlowArc(ctx, w, h, t) {
      ctx.fillStyle = '#050d0c'; ctx.fillRect(0, 0, w, h);
      blob(ctx, w, h, 0.5 + 0.04*s(t,.4), 0.0, 0.75, '20,190,110', 0.5);
      ctx.save(); ctx.shadowColor = 'rgba(60,255,160,0.9)'; ctx.shadowBlur = w*0.03;
      ctx.strokeStyle = 'rgba(120,255,190,0.85)'; ctx.lineWidth = Math.max(2, w/640);
      ctx.beginPath(); ctx.ellipse(w*0.5, -h*0.55, w*0.72, h*0.95 + 6*s(t,.5), 0, 0, Math.PI); ctx.stroke(); ctx.restore();
      vignette(ctx, w, h, 0.5); grain(ctx, w, h, 0.05);
    },
    // 5 saturated blue with soft wave bars (LangEase voice scene)
    blueWaveBars(ctx, w, h, t) {
      const g = ctx.createLinearGradient(0, 0, w, h); g.addColorStop(0, '#2347ff'); g.addColorStop(1, '#0a1c9a');
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      ctx.filter = `blur(${Math.round(w/200)}px)`; ctx.fillStyle = 'rgba(255,255,255,0.13)';
      const n = 17;
      for (let i = 0; i < n; i++) {
        const bh = h * (0.18 + 0.32 * (0.5 + 0.5 * s(t, 1.2, i * 0.9)) * (0.4 + 0.6 * Math.sin(Math.PI * (i + 0.5) / n)));
        const bw = w / (n * 2.2), x = w * (0.08 + 0.84 * i / (n - 1)) - bw / 2, y = h / 2 - bh / 2, r = bw / 2;
        ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + bw, y, x + bw, y + bh, r); ctx.arcTo(x + bw, y + bh, x, y + bh, r);
        ctx.arcTo(x, y + bh, x, y, r); ctx.arcTo(x, y, x + bw, y, r); ctx.fill();
      }
      ctx.filter = 'none'; vignette(ctx, w, h, 0.35); grain(ctx, w, h, 0.05);
    },
    // 6 bold gradient: orange, magenta, violet blobs (Motion Swell)
    boldGradient(ctx, w, h, t) {
      ctx.fillStyle = '#ffb07a'; ctx.fillRect(0, 0, w, h);
      ctx.filter = `blur(${Math.round(w/10)}px)`;
      blob(ctx, w, h, 0.15 + 0.1*s(t,.4), 0.2 + 0.1*s(t,.3), 0.55, '255,110,40', 1);
      blob(ctx, w, h, 0.6 + 0.12*s(t,.3,2), 0.55 + 0.1*s(t,.4,1), 0.55, '255,45,140', 1);
      blob(ctx, w, h, 0.95 + 0.05*s(t,.35), 0.15 + 0.1*s(t,.3,3), 0.5, '110,50,255', 1);
      blob(ctx, w, h, 0.4, 1.0, 0.45, '60,90,255', 0.9);
      ctx.filter = 'none'; grain(ctx, w, h, 0.08);
    },
    // 7 flat white with a soft floor shadow: for one word or one product
    whiteSoft(ctx, w, h, t) {
      ctx.fillStyle = '#fbfbfc'; ctx.fillRect(0, 0, w, h);
      blob(ctx, w, h, 0.5, 1.1, 0.8, '60,60,90', 0.10);
      blob(ctx, w, h, 0.15 + 0.03*s(t,.3), 0.1, 0.5, '190,170,255', 0.12);
      grain(ctx, w, h, 0.03);
    },
    // 8 navy with a diamond dot grid and cyan-green light (Doks.ai middle scenes)
    navyDots(ctx, w, h, t) {
      ctx.fillStyle = '#0a1020'; ctx.fillRect(0, 0, w, h);
      blob(ctx, w, h, 0.2 + 0.05*s(t,.3), 0.1, 0.6, '30,200,170', 0.28);
      blob(ctx, w, h, 0.9, 0.9 + 0.04*s(t,.4), 0.5, '40,110,255', 0.2);
      ctx.fillStyle = 'rgba(160,230,255,0.16)'; const step = Math.round(w/16);
      for (let y = step/2; y < h; y += step) for (let x = step/2 + ((Math.round(y/step) % 2) * step/2); x < w; x += step) {
        const d = Math.max(2, w/480); ctx.save(); ctx.translate(x, y); ctx.rotate(Math.PI/4); ctx.fillRect(-d, -d, d*2, d*2); ctx.restore();
      }
      vignette(ctx, w, h, 0.45); grain(ctx, w, h, 0.04);
    },
    // 9 sky with drifting clouds (SaaSWAVE sky scene)
    skyClouds(ctx, w, h, t) {
      const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#86cdf0'); g.addColorStop(1, '#eaf7ff');
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      blob(ctx, w, h, 0.82, 0.05, 0.5, '255,255,255', 0.75);
      ctx.filter = `blur(${Math.round(w/45)}px)`;
      const r = mulberry32(21);
      for (let i = 0; i < 9; i++) {
        const cx = ((r() * 1.4 + t * 0.012 * (0.5 + r())) % 1.4) - 0.2, cy = 0.15 + r() * 0.7, sc = 0.05 + r() * 0.06;
        for (let k = 0; k < 5; k++) blob(ctx, w, h, cx + (k - 2) * sc * 0.7, cy + 0.02 * Math.sin(k * 2), sc, '255,255,255', 0.55);
      }
      ctx.filter = 'none'; grain(ctx, w, h, 0.03);
    },
    // 10 warm paper: for non-tech products
    warmPaper(ctx, w, h, t) {
      ctx.fillStyle = '#f2e8d4'; ctx.fillRect(0, 0, w, h);
      blob(ctx, w, h, 0.3 + 0.04*s(t,.3), 0.2, 0.6, '255,248,230', 0.9);
      vignette(ctx, w, h, 0.22); grain(ctx, w, h, 0.16);
    },
    // 11 black with a sweeping rim light: for a glossy product hero
    rimSweep(ctx, w, h, t) {
      ctx.fillStyle = '#07070a'; ctx.fillRect(0, 0, w, h);
      const x = ((t * 0.12) % 1.6 - 0.3) * w;
      const g = ctx.createLinearGradient(x - w*0.25, 0, x + w*0.25, h*0.4); g.addColorStop(0, 'rgba(255,255,255,0)');
      g.addColorStop(0.5, 'rgba(255,245,230,0.20)'); g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      blob(ctx, w, h, 0.5, 1.05, 0.55, '255,190,120', 0.14); vignette(ctx, w, h, 0.6); grain(ctx, w, h, 0.05);
    },
    // 12 lilac studio with a soft horizon: a 3D-desk feel without 3D (SaaSWAVE)
    lilacStudio(ctx, w, h, t) {
      const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#e3d4ff'); g.addColorStop(0.58, '#f6ecff'); g.addColorStop(0.62, '#d9c4f7'); g.addColorStop(1, '#bda0ee');
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      ctx.filter = `blur(${Math.round(w/60)}px)`; ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(0, h*0.6, w, h*0.03); ctx.filter = 'none';
      blob(ctx, w, h, 0.2 + 0.05*s(t,.3), 0.15, 0.5, '255,255,255', 0.7);
      blob(ctx, w, h, 0.85, 0.9 + 0.03*s(t,.4), 0.4, '255,150,210', 0.3);
      vignette(ctx, w, h, 0.12); grain(ctx, w, h, 0.05);
    }
  };
  root.BG = { _grainTile: grainTile, names: Object.keys(B), draw(name, ctx, w, h, t) { if (!B[name]) throw new Error('unknown background ' + name); B[name](ctx, w, h, t); } };
})(typeof window !== 'undefined' ? window : globalThis);
