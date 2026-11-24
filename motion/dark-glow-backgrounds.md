# Dark glow backgrounds (learned on Shakeslip v07, 2026-11-24)

The background recipe the user approved after four rounds ("Amazing, I really like them now, the glow is amazing"). Use it with the "dark glow world" style family (saas-explainer-style.md 2b). It is guidance: change it with a reason. Reference code: `tools/examples/dark-glow-bg.js` (a pure function of t, resolution-aware). Pictures: `tools/examples/dark-glow-worlds.png`, `tools/examples/dark-glow-shapes.png`.

## What failed first (so it is not repeated)
- Grey, low-saturation light (the logo's own greyish steel used as the glow) read flat and cheap. The user asked for more contrast twice.
- Soft round blobs and dot grids read as filler; the user called dots "way too loud and frequent".
- Removing a shape the user criticised entirely was also wrong: "Do not remove the circles completely, do not add too much of what I ask for, keep it different and subtle." Reduce and vary; do not swing to the opposite.

## The recipe
1. Base: a near-black tinted toward the world's hue, lighter at the top where the light comes from (vertical gradient, top colour to base by 70% height). Never pure black, never grey.
2. Colour: take the brand hue and saturate it before going to Adobe Color (for a greyish brand steel #94AED2 the base was #5B8FE8). Analogous gives the sister worlds (blue, sky, cyan); Complementary gives the warm world (amber). Drop indigo and violet swatches (they read as the purple-to-blue AI blend). Keep the brand colour exact in the logo and the through-line object.
3. Light is additive (canvas `lighter`), never painted on top.
4. Every light shape peaks at one point and fades along its length: sharp and hot at the peak, only soft glow toward the ends. Build it in layers: wide halo (blur about 150-160 px, 50%), band (about 55 px, 85%), hot core in the pale core colour (about 16 px), sharp core (about 5 px), and a crisp white rim (1-2 px) that covers only the middle of the shape. For an arc use a conic gradient around its centre; for line work use a radial mask around a focus point.
5. Shapes, each a different job, each used at most twice and never in neighbouring scenes:
   - Edge-light arc (a huge circle's rim crossing the top or bottom): the strongest; keep it for the one or two biggest moments.
   - Line work from the logo itself (its ring's waves, its star's outline): subtle, about half strength.
   - The logo star as a glass body in the background, one large or a few at depths: subtle.
   - Beam (a soft light cone), side light, a full brand-colour field for type-only beats, B1 soft light behind the focus.
   - No round pools of light, no dots, no ribbons unless they are the logo's own shape.
6. Anything solid (a star, a card) is drawn after the lines with an opaque body, so it sits in front of the line, never behind it (the user asked twice).
7. Lines move, slowly: the arc's peak travels along it, logo line work drifts and turns with a band of light running along it, background stars turn with light passing their edges, and lines draw on when a scene enters. All sines of t, no loops that restart.
8. Grain is added after motion blur at encode, so the blur does not erase it.
9. A background changes by a soft directional or radial reveal (the new world sweeps in behind a soft edge, or spreads from the point the story came from), never by a crossfade. Reveal a much brighter world slowly (about 1 s, ease in-out), or the frame-difference scan reads it as a flash.

## Process that worked
- Show the worlds x levels grid as PNGs, then a light-shape board, then a short loop at film speed before the storyboard. Each round changed one thing the user named.
- Keep a device budget table in the script (each shape and each trick at most twice) and check the storyboard against it.

## Gotcha
- When a drawing module is made resolution-aware (a scale factor `R` multiplied into blurs and transforms), do not reuse that name for anything else (a radius parameter named `R` silently made every arc invisible). After any refactor, render one frame of every background kind and look at it.
