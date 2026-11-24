// v07 backgrounds r3 (2026-11-24). From r2 (approved glow) + the user's notes: rim lines glowier and softer toward their ends;
// the star always in front of the line; at Gate 1: no circles (arcs, round pools), more shapes from the logo: the ring's
// interlaced waves as glowing lines, and the logo star glowing in the background at several depths. Adobe Color sources: Analogous on #5B8FE8, Complementary #E8BA5A; Verdant #4EC06B.
export const W = 1920, H = 1080
export const WORLDS = {
  steel:   { top: '#0a1430', base: '#03050c', glow: '#5B8FE8', core: '#B2D2FF', alt: '#5ABBE8' },
  petrol:  { top: '#062030', base: '#02070b', glow: '#5ABBE8', core: '#B2EBFF', alt: '#5B8FE8' },
  verdant: { top: '#06261a', base: '#020805', glow: '#4EC06B', core: '#B6F2C8', alt: '#5AE8E8' },
  ember:   { top: '#2a1a08', base: '#070402', glow: '#E8BA5A', core: '#FFE3A8', alt: '#5B8FE8' },
}
export const hex = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`
export function createBG(X, starD, ringD, R = 1) {
  const STAR = new Path2D(starD), RING = new Path2D(ringD)
  const sr = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); sr.innerHTML = `<path d="${ringD}"/>`; document.body.appendChild(sr); const RB = sr.firstChild.getBBox(); sr.remove()
  const O = document.createElement('canvas'); O.width = W * R; O.height = H * R; const OX = O.getContext('2d')
  const sv = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); sv.innerHTML = `<path d="${starD}"/>`; document.body.appendChild(sv); const SB = sv.firstChild.getBBox(); sv.remove()
  const add = (fn) => { X.save(); X.globalCompositeOperation = 'lighter'; fn(); X.restore() }
  const base = (w) => { X.setTransform(R, 0, 0, R, 0, 0); X.filter = 'none'; X.globalCompositeOperation = 'source-over'; const g = X.createLinearGradient(0, 0, 0, H); g.addColorStop(0, w.top); g.addColorStop(0.7, w.base); g.addColorStop(1, w.base); X.fillStyle = g; X.fillRect(0, 0, W, H) }
  const blob = (c, x, y, rx, ry, a, blur, rot = 0) => add(() => { X.filter = `blur(${blur * R}px)`; X.fillStyle = rgba(c, a); X.beginPath(); X.ellipse(x, y, rx, ry, rot, 0, Math.PI * 2); X.fill() })
  // The edge-light arc: brightest and sharpest at its apex; toward its ends only the soft layers remain (conic falloff).
  function arc(w, cx, cy, rad, apex, spread = 0.95, k = 1) {
    const G = hex(w.glow), C = hex(w.core)
    const cone = (c, a, sp) => { const g = X.createConicGradient(apex - Math.PI, cx, cy), f = sp / (2 * Math.PI); g.addColorStop(0, rgba(c, 0)); g.addColorStop(0.5 - f, rgba(c, 0)); g.addColorStop(0.5 - f * 0.45, rgba(c, a * 0.55)); g.addColorStop(0.5, rgba(c, a)); g.addColorStop(0.5 + f * 0.45, rgba(c, a * 0.55)); g.addColorStop(0.5 + f, rgba(c, 0)); g.addColorStop(1, rgba(c, 0)); return g }
    add(() => { for (const [blur, lw, c, a, dr, sp] of [[160, 460, G, 0.55, 90, spread * 1.1], [55, 120, G, 0.85, 10, spread], [16, 26, C, 0.9, -24, spread * 0.8], [5, 7, C, 0.95, -32, spread * 0.55], [1.2, 2, [255, 255, 255], 0.85, -34, spread * 0.28]]) { X.filter = `blur(${blur * R}px)`; X.strokeStyle = cone(c, a * k, sp); X.lineWidth = lw; X.beginPath(); X.arc(cx, cy, rad + dr, 0, Math.PI * 2); X.stroke() } })
  }
  // The logo's star as a glass object, opaque enough to sit IN FRONT of the line, lit from the top left.
  function glass(w, x, y, size, rot = 0, a = 1) {
    X.save(); X.translate(x, y); X.rotate(rot); const k = size / SB.width; X.scale(k, k); X.translate(-(SB.x + SB.width / 2), -(SB.y + SB.height / 2))
    const x0 = SB.x, y0 = SB.y, x1 = SB.x + SB.width, y1 = SB.y + SB.height, B = hex(w.base), T = hex(w.top), G = hex(w.glow), C = hex(w.core)
    X.globalAlpha = a; const body = X.createLinearGradient(x0, y0, x1, y1); body.addColorStop(0, rgba(T, 0.96)); body.addColorStop(1, rgba(B, 0.98)); X.fillStyle = body; X.fill(STAR)
    X.globalCompositeOperation = 'lighter'; const sh = X.createLinearGradient(x0, y0, x1, y1); sh.addColorStop(0, rgba(C, 0.42)); sh.addColorStop(0.45, rgba(G, 0.16)); sh.addColorStop(1, rgba(G, 0.04)); X.fillStyle = sh; X.fill(STAR)
    X.globalCompositeOperation = 'source-over'; X.lineWidth = 2.2 / k; const rim = X.createLinearGradient(x0, y0, x1, y1); rim.addColorStop(0, 'rgba(255,255,255,0.85)'); rim.addColorStop(0.55, rgba(C, 0.12)); rim.addColorStop(1, rgba(G, 0.35)); X.strokeStyle = rim; X.stroke(STAR); X.restore()
  }
  // The logo's own star as a lit object in the logo's colour (#aac1e2): the guide star (S3, S17-S18, S22).
  function star(w, x, y, size, rot = 0, glow = 1) {
    X.save(); X.translate(x, y); X.rotate(rot); const k = size / SB.width; X.scale(k, k); X.translate(-(SB.x + SB.width / 2), -(SB.y + SB.height / 2))
    const x0 = SB.x, y0 = SB.y, x1 = SB.x + SB.width, y1 = SB.y + SB.height
    X.shadowColor = rgba(hex(w.glow), 0.7 * glow); X.shadowBlur = size * 0.35 * R; X.fillStyle = '#aac1e2'; X.fill(STAR); X.shadowBlur = 0
    const sh = X.createLinearGradient(x0, y0, x1, y1); sh.addColorStop(0, 'rgba(255,255,255,0.7)'); sh.addColorStop(0.35, 'rgba(255,255,255,0.04)'); sh.addColorStop(1, 'rgba(20,28,42,0.5)'); X.fillStyle = sh; X.fill(STAR)
    X.lineWidth = 2.2 / k; const rim = X.createLinearGradient(x0, y0, x1, y1); rim.addColorStop(0, 'rgba(255,255,255,0.95)'); rim.addColorStop(0.5, 'rgba(255,255,255,0)'); X.strokeStyle = rim; X.stroke(STAR); X.restore()
  }
  // A logo shape drawn as glowing line work: halo, band, hot core, crisp rim; then faded out away from a focus point,
  // so it is sharp and bright where it matters and soft toward its ends. Drawn additively.
  function glowShape(path, box, x, y, size, rot, w, focus, k = 1) {
    const G = hex(w.glow), Cc = hex(w.core), s = size / box.width
    OX.setTransform(R, 0, 0, R, 0, 0); OX.globalCompositeOperation = 'source-over'; OX.filter = 'none'; OX.clearRect(0, 0, W, H)
    for (const [blur, lw, c, a] of [[90, 90, G, 0.5], [28, 26, G, 0.85], [7, 6, Cc, 0.9], [1.2, 1.8, [255, 255, 255], 0.85]]) {
      OX.save(); OX.filter = `blur(${blur * R}px)`; OX.translate(x, y); OX.rotate(rot); OX.scale(s, s); OX.translate(-(box.x + box.width / 2), -(box.y + box.height / 2)); OX.lineWidth = lw / s; OX.strokeStyle = rgba(c, a * k); OX.lineJoin = 'round'; OX.stroke(path); OX.restore()
    }
    OX.filter = 'none'; OX.globalCompositeOperation = 'destination-in'; const g = OX.createRadialGradient(focus[0], focus[1], 0, focus[0], focus[1], focus[2]); g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(0.45, 'rgba(0,0,0,0.75)'); g.addColorStop(1, 'rgba(0,0,0,0)'); OX.fillStyle = g; OX.fillRect(0, 0, W, H)
    add(() => { X.setTransform(R, 0, 0, R, 0, 0); X.filter = 'none'; X.drawImage(O, 0, 0) })
  }
  const wave = (w, x, y, size, rot, focus, k) => glowShape(RING, RB, x, y, size, rot, w, focus, k)
  const starLine = (w, x, y, size, rot, focus, k) => glowShape(STAR, SB, x, y, size, rot, w, focus, k)
  function finish(grain = true) {
    X.filter = 'none'; X.globalCompositeOperation = 'source-over'
    const v = X.createRadialGradient(W / 2, H * 0.45, 400, W / 2, H / 2, 1250); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.6)'); X.fillStyle = v; X.fillRect(0, 0, W, H)
    if (grain) { const id = X.getImageData(0, 0, W * R, H * R), d = id.data; let s = 12345; for (let i = 0; i < d.length; i += 4) { s = (s * 1103515245 + 12345) & 0x7fffffff; const n = ((s >> 16) & 255) / 255 - 0.5; d[i] += n * 9; d[i + 1] += n * 9; d[i + 2] += n * 9 } X.putImageData(id, 0, 0) }
  }
  // One call per frame: world, light shape and options. kind: flat | soft | wave | waveLow | waveDiag | beam | field | side | starGlow | stars
  function draw(wk, kind, o = {}) {
    const w = WORLDS[wk], G = hex(w.glow), C = hex(w.core), A = hex(w.alt), t = o.t ?? 0; base(w)
    // the lines move: the arc's bright peak travels along it; waves drift and turn while a band of light runs along them;
    // background stars turn very slowly while light passes over their edges. All slow sines: a pure function of t.
    const sw = Math.sin(t * 0.9), sw2 = Math.sin(t * 0.6 + 1.3)
    if (kind === 'arc') { arc(w, W / 2, -1350, 1700, Math.PI / 2 + 0.22 * sw, 0.95, o.k ?? 1); blob(G, 960, 120, 900, 260, 0.16, 140) }
    if (kind === 'arcLow') { arc(w, W / 2, H + 1380, 1700, -Math.PI / 2 + 0.22 * sw); blob(G, 960, 1000, 900, 240, 0.16, 140) }
    if (kind === 'soft') blob(G, o.fx ?? 960, o.fy ?? 470, 820, 360, 0.3, 160, -0.25)
    if (kind === 'wave') { wave(w, 960, -1720, 5200, 0.1 + 0.03 * sw2, [(o.fx ?? 1150) + 650 * sw, 180, 1500], o.k ?? 0.5); blob(G, 960, 120, 900, 220, 0.14, 140) }
    if (kind === 'waveLow') { wave(w, 960, H + 1720, 5200, 0.25 + 0.03 * sw2, [(o.fx ?? 820) + 650 * sw, 920, 1500], o.k ?? 0.5); blob(G, 960, 1000, 900, 220, 0.14, 140) }
    if (kind === 'waveDiag') { wave(w, -1250, 1750, 5200, 0.6 + 0.03 * sw2, [520 + 300 * sw, 640 - 200 * sw, 1300], o.k ?? 0.5); blob(G, 300, 800, 700, 300, 0.18, 150, -0.6) }
    if (kind === 'side') { blob(G, -60, 420, 520, 900, 0.7, 150, 0.2); blob(C, -40, 400, 160, 620, 0.5, 40, 0.2) }
    if (kind === 'field') { const g = X.createRadialGradient(1350, 260, 80, 1150, 480, 1500); g.addColorStop(0, rgba(C, 1)); g.addColorStop(0.25, rgba(G, 1)); g.addColorStop(0.65, w.top); g.addColorStop(1, w.base); X.fillStyle = g; X.fillRect(0, 0, W, H); blob(A, 300, 900, 600, 300, 0.25, 160) }
    if (kind === 'beam') add(() => { X.translate(1100, -120); X.rotate(0.22); for (const [bl, w0, w1, c, a] of [[90, 260, 760, G, 0.6], [30, 90, 300, C, 0.55]]) { X.filter = `blur(${bl * R}px)`; const g = X.createLinearGradient(0, 0, 0, 1350); g.addColorStop(0, rgba(c, a)); g.addColorStop(1, rgba(c, 0)); X.fillStyle = g; X.beginPath(); X.moveTo(-w0 / 2, 0); X.lineTo(w0 / 2, 0); X.lineTo(w1 / 2, 1350); X.lineTo(-w1 / 2, 1350); X.closePath(); X.fill() } })
    // the logo star in the background: a glass body with glowing line work, in front of everything behind it
    if (kind === 'starGlow') { const [sx, sy, ss] = [o.sx ?? 1380, o.sy ?? 560, o.ss ?? 1250]; blob(G, sx, sy, 600, 480, 0.2, 160); const r = 0.22 + 0.04 * sw2; glass(w, sx, sy, ss, r); starLine(w, sx, sy, ss, r, [sx + ss * 0.35 * Math.cos(t * 0.5), sy + ss * 0.35 * Math.sin(t * 0.5), ss * 0.75], o.k ?? 0.55) }
    // several stars at depths: far (big, soft), mid, near (small, crisp)
    if (kind === 'stars') { for (const [sx, sy, ss, r0, k, bl] of [[1500, 330, 1500, 0.3, 0.45, 1], [380, 760, 520, -0.2, 0.8, 0], [1560, 860, 200, 0.15, 1, 0]]) { const r = r0 + 0.05 * Math.sin(t * 0.3 + ss); glass(w, sx, sy, ss, r, (bl ? 0.55 : 1) * (o.k ?? 0.55) * 1.3); starLine(w, sx, sy, ss, r, [sx - ss * 0.2, sy - ss * 0.25, ss * 0.8], k * (o.k ?? 0.55)) } }
    if (o.glassOver) glass(w, ...o.glassOver)
    finish(o.grain !== false)
  }
  return { draw, star, glass, wave, starLine, SB, RB }
}
