# Backgrounds (library, criteria, rotation)

Why this exists: builds kept reusing one background look and one set of moves, and the backgrounds were weak next to the reference videos. This file is the fix: a library of real recipes, what makes one good, and a rule against repeating.

Code: `tools/backgrounds/backgrounds.js` (12 backgrounds, each a pure function of time: `BG.draw(name, ctx, w, h, t)`). Contact sheet: `python3 tools/backgrounds/render_sheet.py out.png --t 3` (needs Playwright and Chrome). Sample sheet already rendered: `tools/backgrounds/sample-sheet.png`. The library is a starting point; colours are overridden per brand, and a recipe is rebuilt per project, not pasted unchanged.

## Backgrounds are guidance, not a menu (user rule 2026-11-24)
Every library here (Motion Studies first, then the others) is a starting point. Add, mix, layer, recolour, blur, re-time, re-animate, crop, rotate or invent new looks; never get stuck choosing only what exists. The bar is the same for anything made: pro and smooth.
Pro and smooth means: soft Gaussian falloff on every edge (no hard strokes), one clear light direction, most of the frame calm and dark (or calm and light on a light ground), colours from one ramp per background tuned to the brand, motion slow and continuous with no pops or jumps, perfect loops, grain against banding, no blown-out white areas, and text-safe space where the scene needs it. Check at full size and as a moving clip before showing.
Remix controls built into `motion-studies-render.html` (with `?bg=<slug>`): `colors=hex,hex,hex` (brand recolour, dark/mid/light), `mix=<slug2>` + `mixAmt=0..1` (+ `mixColors`) to layer a second background with screen blending, `blur=px`, `hue=deg`, `sat`, `bright`, plus the page's own `glow` (0-1.7) and `speed`. Examples tested 2026-11-24 in `sample-remixes.png`: edge arc + low waves, Royal Braid recoloured to a brand ramp, Glacier Silk + colour field blurred, Pearl Helix hue-shifted, Solar Eclipse + ember glass stars. Two bright layers can clip to white (the silk + field test did): lower `mixAmt` or `bright`, or mix a bright layer with a quiet one. For a look beyond these controls, add a new kind to the shader (it inherits the bloom and tone pipeline) or build it in Remotion / three.js with the same techniques below.

## Motion Studies library (first source, added 2026-11-24): the user's own background gallery
Supplied by the user 2026-11-24 as `tools/backgrounds/motion-studies/Motion_Studies.html` (original, unchanged). It is the source of the Shakeslip "Studio Lighting" looks. 113 backgrounds in 8 categories: Studio Lighting (21: edge arc, low/diagonal/crossing waves, glass stars, spotlight, colour field, side light, soft wash; Steel, Petrol, Verdant, Ember, Violet), Light & Optics, Twists & Twirls, Fluid & Silk, Waves & Patterns, Hero Layouts (leave room for a headline), Gradients (coloured ground, light), Dark Gradients. Every name and category: `sample-sheet-all.png` (t = 3 s).
Use it:
- Record any background frame-exact: `python3 tools/threejs-film/record.py tools/backgrounds/motion-studies/motion-studies-render.html out.mp4 --duration 10 --query "bg=steel-edge-arc&glow=1&speed=0.75"` (the render copy adds `window.renderFrame(t)`; the slug is the title in kebab case). Tested 2026-11-24: 90 frames, seamless loop (frame at 24 s equals frame at 0 s at speed 0.75), repeat renders identical.
- Contact sheet: `python3 tools/backgrounds/motion-studies/render_sheet.py out.png --t 3`.
- Loop length is 18 s / speed. Glow 0-1.7. As a Remotion layer: record the loop to video and place it under the scene, or port the shader (`u_t` = phase, kind, three colours).
How it gets its quality (apply these to any new background):
1. Everything is a signed distance plus a Gaussian band, `exp(-(d/w)^2)`: lines, rims and edges are soft by construction, never stroked. Two or three bands per edge (wide glow, mid, hair-thin core).
2. Colour is a three-stop ramp per palette (dark, mid, light) through one `pigment(f)` function; no free colours.
3. Satin ribbons: a body, an edge highlight on one side and a soft sheen across, so ribbons read as folded fabric with a lit side.
4. Perfect loops: time is a phase 0 to 2 pi over the period and every motion is sin or cos of it; each background gets a phase offset so a grid never pulses in sync.
5. Bloom done properly: the scene goes to a buffer, a quarter-resolution two-pass blur extracts only the bright parts, the halo is added back with a glow amount, then an exponential tone map (1 - e^(-1.48x))^0.87 and grain that scales with brightness. Intermediates are stored square-root encoded so 8-bit buffers do not band.
6. A gentle vignette and a faint ambient tint of the darkest colour; light-ground "Gradients" get a coloured ground instead.
7. Composition first: hero layouts keep the top half quiet for text; light comes from one side or one edge; most of the frame stays dark.
For the approved Shakeslip dark-glow recipe (layers, shape budgets, star and line order, process), read `motion/dark-glow-backgrounds.md` alongside this.
Start each scene from the library, then change it as the scene needs (see the guidance section above).

## FX worlds (added 2026-11-24): glowy, blurred, distorted shapes, not lines
User direction: not everything is a line; use blurred glowing shapes, distortion, waves, repeated patterns and more contrast; no radial-orb look, but multiple blobs and shapes merged and blurred. Source guide kept at `reference-notes/backgrounds/viral-saas-backgrounds-guide.md` (two After Effects recipes).
Code: `tools/backgrounds/backgrounds_fx.js`, one WebGL2 shader, 10 modes x 8 palettes, 28 curated on `tools/backgrounds/sample-sheet-fx.png`. `BG.fx(mode, palette, ctx, w, h, t, {hue})`.

The pipeline (the point of the guide: order is the look, reordering breaks it):
1. Source: flat shapes or stacked gradient circles on pure black (never a single radial orb as the idea).
2. Small box blur, then a long directional blur (stretches shapes into light streaks).
3. Twirl (the S-curve), then lens or barrel warp (optical depth), then scale about 1.1-1.5 to crop warped edges.
4. Dither noise (removes banding), then exponential glow (soft highlight roll-off, screen bloom), then a contrast curve on black.
5. Colour themes by one master hue rotation, not by editing every colour stop.
In AE use that exact adjustment-layer order; in web, Remotion or three.js use this shader (each step is a coordinate warp or a sampling pass in the same order).

Modes: ribbon (guide BG-1: stacked inverted gradient circles, 45 deg directional blur, twirl, lens, 1.5x), horizon (guide BG-2: wiggled shape, turbulent edge, 4-point moving gradient, huge blur, breathing glow pooled at the bottom), goo (metaballs merging), marble (repeated bands, domain-warped, kept to a diagonal zone), ripples (repeated rings, warped), pillars (repeated capsules, vertical streak), petals (repeated rotated ellipses, twirled), shapes (big flat circle, slab, wedge overlapping), silk (repeated ribbons with phase offset), echo (a trail of repeated capsules).
Palettes: solar, aqua, violet, lime, crimson, ice, sunset, steel; any palette can be hue-rotated to the brand.
Learned while tuning (2026-11-24): keep at least half the frame near black, or it reads loud rather than premium; per-mode intensity 0.55-0.85 and glow exposure about 1.6; blur samples on an even disc pattern, not random per pixel (random reads scratchy); soften shape edges before streaking or the streak shows steps.
My scores (still t=3; all ten move between t=3 and t=7): ribbon, goo, silk, petals 8; marble, shapes, horizon, echo 7; pillars, ripples 6. Horizon is the most literal match to the guide but still fills the lower third harder than its description; dial intensity per scene.
Sheet: `python3 tools/backgrounds/render_sheet.py out.png --t 3 --set fx` (uses software WebGL; about 6 s for 28 tiles).

## Lit worlds (added 2026-11-24, canvas approximation of the Studio Lighting set; prefer the Motion Studies originals)
Source: the Shakeslip film storyboard and background frames the user supplied (`reference-notes/backgrounds/shakeslip-*.png`). Code: `tools/backgrounds/backgrounds_lit.js`, 12 structures x 8 palettes, 28 curated on `tools/backgrounds/sample-sheet-lit.png`. `BG.lit(structure, palette, ctx, w, h, t, {markPath})`.

What makes them work (learned from the frames, apply to any new background):
1. One light source per frame, and it is a real light: a planet limb, a shaft, a field, a window. Everything else in the frame is dark.
2. Light is tapered: brightest at the centre of the arc or beam, fading to nothing at its ends. Never a uniform tube.
3. Layered bloom: wide soft spill + mid glow + thin pale core, screen-blended. The core is pale tint or near-white, not saturated neon.
4. Lines are allowed only like this: thin, pale, low opacity, soft halo, and faded out toward the frame edges (a radial mask). Hard, uniform, saturated lines are banned.
5. Brand elements in the background come from the brand's own mark (the logo star as frosted glass planes at three depths, the logo's waves). Pass `markPath` from the real logo SVG; the default sparkle is a labelled placeholder only.
6. Per-scene vocabulary: palette (steel, petrol, ember, verdant, plum, rose, graphite, indigo) x structure (edgeArc, lowArc, smallArc, side, beam, field, softLight, flat, waves, wavesDiag, marks, markGlow). Write both in the storyboard per scene, as Shakeslip did ("Steel, edge arc"; "Petrol, flat").
7. Busy UI scenes get flat or softLight; type-only scenes get the strong ones (edgeArc, beam, field). Palette changes with the emotion of the beat (ember for pain and reminders, verdant for paid, steel as home).
8. Light breathes (8-12 % brightness over a few seconds) and drifts slowly; it never jumps.

My scores against the reference frames (still, t=3): edgeArc, lowArc, smallArc, beam, field 8; side, waves, markGlow 7; wavesDiag, marks 6 (placeholder mark, loops less graceful than the reference); flat, softLight 7 for their job. Not yet seen in motion.
Sheet: `python3 tools/backgrounds/render_sheet.py out.png --t 3 --set lit`.

## Orb worlds (added 2026-11-24): the user's taste is elegant and premium
User verdict 2026-11-24: saturation and dark glow are right; hard or neon lines are not elegant. Default to soft gradient orbs.
`tools/backgrounds/backgrounds_orbs.js`: 8 compositions x 12 palettes, 32 curated on `tools/backgrounds/sample-sheet-orbs.png`. `BG.orbs(comp, palette, ctx, w, h, t)`; palette can be a brand-tinted `{base, a, b, c, light}`.
Compositions: canopy (light washes down from the top), rise (fields rise from below), duet (two large fields on a diagonal), eclipse (one soft sun off centre), drift (three huge overlapping fields, a mesh), dawn (a soft floor of light), side (window light from one edge), veil (a tall column of light behind the subject).
Palettes: midnight, emerald, aubergine, ember, rosewood, lagoon, dusk, aurora, champagne, graphite, sapphire, pearl (light).
How they stay elegant: exponential falloff over 10 stops (no visible edge), a frame-wide blur that melts the orbs together, screen blending, a gentle vignette, 3.5% grain against banding, drift cycles of 8-20 s. No lines, rings, strokes or crisp highlights.
My scores on the still sheet: eclipse, dawn, veil, rise 8; duet, drift, side 7-8; canopy 7; pearl light 6. Not yet seen in motion or behind real UI.
Sheet: `python3 tools/backgrounds/render_sheet.py out.png --t 3 --set orbs`.

## Glow worlds (secondary: the user found these lines not elegant, use only if asked)
`tools/backgrounds/backgrounds_glow.js`: 12 light structures x 12 palettes, 42 curated on `tools/backgrounds/sample-sheet-glow.png`. `BG.glow(structure, palette, ctx, w, h, t)` draws any combination; palette can be a brand-tinted `{base, mid, glow, core}`.
Structures: arcTop, arcBottom, arcBoth, horizon, spot, halo, cornerBloom, sideRim, crossArcs, floorPool, aurora, split. Palettes: steel, verdant, petrol, violet, magenta, crimson, amber, teal, cobalt, indigo, rose, lime.
Use only on request. Rules: pick the palette per section from a colour range (not all one hue), vary the structure between neighbours, tint to the brand. Weakest in the sheet: halo (reads as a neon ring, use at low bloom) and split (flat). Contact sheet: `python3 tools/backgrounds/render_sheet.py out.png --t 3 --set glow`.

## What a good background has (check before showing)
1. Depth in layers: base colour, 2-4 large soft colour fields, one light source, then grain (3-8%). Flat single fills only for "white soft" or "paper" on purpose.
2. One light. Glows, rim lights and floor shadows all come from the same side.
3. Slow movement: fields drift over 8-20 s, never faster than the foreground. Still frames must still look finished.
4. Contrast with the foreground (the seesaw, Playbook 0a): dense UI gets a quiet field; one big word or object gets a saturated field.
5. Colour comes from the brand hue plus one outside hue, not the repo palette alone.
6. Elegant, not loud: soft orbs and washes of light. Lines only thin, pale, tapered and faded to the edges (Lit worlds rule 4); never hard, uniform or neon (user rule 2026-11-24).
7. Not a template gradient: no two-stop linear sweep, no centred radial vignette as the whole idea.

## Library (what it came from, where it fits)
| # | Name | Source look | Use for |
|---|------|-------------|---------|
| 1 | frostedBlue | LangEase | dense UI cards, calm sections |
| 2 | pastelMesh | Teamble | card plus pills, friendly products |
| 3 | darkPurpleGrid | Teamble dark | dark scenes, faint grid, floor glow |
| 4 | greenGlowArc | VibeDocX, Doks.ai | dark tech, edge-light arc |
| 5 | blueWaveBars | LangEase voice | saturated scene, audio or speech |
| 6 | boldGradient | Motion Swell | one big word, kinetic type |
| 7 | whiteSoft | general | single product or word, quiet beat |
| 8 | navyDots | Doks.ai | data, structure, diamond dot grid |
| 9 | skyClouds | SaaSWAVE | airy or cloud products |
| 10 | warmPaper | general | non-tech, editorial, human products |
| 11 | rimSweep | general | glossy product hero on black |
| 12 | lilacStudio | SaaSWAVE desk | 3D-desk feel without 3D |

Honest scores from the 2026-11-24 contact sheet, against the reference videos: 2 pastelMesh 8, 6 boldGradient 8, 4 greenGlowArc 7, 3 darkPurpleGrid 7, 8 navyDots 7, 5 blueWaveBars 7, 12 lilacStudio 6, 1 frostedBlue 6, 9 skyClouds 6, 10 warmPaper 6, 11 rimSweep 4, 7 whiteSoft 4 (nearly blank, correct only as a deliberate quiet beat). The references are still richer: real blurred footage, 3D desks and photographic depth are not reproduced here. Where a reference is clearly better, say so and use blurred product footage or a Blender render (Section 0a-F) instead of forcing a canvas recipe.

## Rotation (anti-repetition)
- Keep `reference-notes/recent-looks.md` (create on first use): one line per finished film with its backgrounds, camera moves, transitions and palette.
- Before the storyboard, read it. The brief states how the new film differs from the last one on backgrounds and on the main animation set. Same background family as the last film needs a one-line reason the user accepts.
- Inside one film: no background used for more than two non-adjacent sections, at least three different families in a film of 6+ sections, and no two neighbouring sections on the same family.
- If a recipe is reused from the library, change at least its hue family, light direction and movement.
- After the final render, append the film's line to `recent-looks.md`.
