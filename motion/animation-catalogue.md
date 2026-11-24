# Animation catalogue (learned from the Zelios SaaS videos, 2026-11-23)

Recipes for moves seen in the LangEase (L) and Teamble (T) videos. Read with `saas-explainer-style.md`. Guidance, not law: change any recipe with a reason.

Reliability: timings come from strips of 5-12.5 fps, so read them as "about" values to confirm on the Gate 2 sample. Only the sparkle morph (1) was measured frame by frame. Curves are read by eye: "ease-out" means fast start and soft landing, "ease-in" the reverse, and none of them is linear. Rendered film may use blur and filters. Live UI keeps to transform and opacity (CLAUDE.md, 120 Hz).

Each entry: what it is, how to build it, timing seen, where it works.

## Guide objects and morphs
1. **Sparkle guide object (L).** A small brand shape travels along a curved arc, grows from a point to full size in about 0.5 s (ease-out), holds about 0.1 s, collapses in about 0.45 s (ease-in), and at its landing spot the next element blurs in. Measured. Use as the eye's leader between scenes.
2. **Shape becomes logo (L).** The shape shrinks to the brand mark, the wordmark reveals beside it (letters unmask left to right in about 0.2 s), the button fades up last. End cards.
3. **Placeholder fills in (L).** A solid blue rounded square appears in an empty slot, then cross-blurs into the real thumbnail (Japan, Italy, UK, Germany flags), with the sparkle hopping to the next slot. About 0.15-0.25 s per item. Grids and libraries.
4. **Footage becomes a card becomes a thumbnail (L).** Full-frame footage scales down inside a white rounded border, drops to a card with a caption, and the camera pulls back so the same card is the first thumbnail in the product UI. About 0.6 s from border to UI. Hook-to-product handoff with continuity.

## Type
5. **Word-by-word with lift (L).** "You can use" over footage: each word fades in with a small upward drift, about 0.12 s apart, and the whole block lifts a few pixels when the logo line arrives below it.
6. **Typewriter with caret (L, T).** A tall caret bar blinks, characters stamp in at about 12-25 characters per second (L about 25, T about 12), and chosen words switch colour or weight as they land ("How In Under" blue, "teamble" bold). A rounded pill outline can grow from an underline to hold the line (T "Introduces teamble ai"). Then the line blurs left and out.
7. **Masked left-to-right reveal (T).** A wordmark unmasks left to right over about 0.8 s with a blurred leading edge, holds about 0.4 s, then blurs out ("..ble" is the last part to go) as the next line blurs in from the left.
8. **Giant word settles (T).** "Give" enters at about 1.6x size and eases down to body size in about 0.4 s as the next words append; the line stays centred by sliding left as it grows. Each new word about 0.4 s after the last.
9. **Running statement over a colour blob (T).** "Help them unlock their" in huge white type slides left on a continuous ease while words append, over a saturated pink-purple-blue blob. Then a hard colour flip to flat white with black type ("potential with").
10. **Echo behind the number (L).** "30 Seconds" in blue with a large blurred ghost copy behind it, tiny sparkles flickering around it, entering with a blur-in.
11. **Number cycle in a pill (T).** A pill swaps its number "3x, 6x, 9x, 10x better", about 0.2 s per step, then settles on a spring with a tiny ease. Concentric rounded rings expand outward around the pill (3-4 layers, staggered, about 0.4 s).

## UI and cursor
12. **Click handoff (T).** The hand cursor arcs in, slows, presses a button ("Prepare"), and on the press the scene cuts to the page it opens, arriving as a big 3D-tilted panel that settles in about 0.7 s (spring-like), then keeps scrolling slowly. The background flips light to dark on the cut. Measured by strip at 12.5 fps.
13. **Cursor changes the thing it touches (T).** The hand arrives on an arc beneath a word ("superpowers"), clicks, and the word recolours from pink to purple-gradient. Cursor reuse for emphasis, not only for buttons.
14. **Defocus then replace (T).** A white card blurs and dims over about 0.5 s while a gradient "Share it" pill pops in sharp in front. The old card never leaves, it just stops being the focus.
15. **Button morphs through states (T).** "Share it" pill, click, it shrinks to a capsule with a "..." chip, avatars slide out of it (about 0.5 s), the cursor picks one, a name tag ("Sales VP") pops under it, the capsule collapses to a circle with a check mark, the circle shrinks away, then a hard cut to a light world. A whole micro-story in 3-4 s.
16. **Floating glass window (L).** The product window sits slightly tilted and translucent over a pale blue field, drifting a few pixels, then shrinks and falls away to empty space before the next line of type.
17. **UI over blurred real footage (L).** The window floats on blurred b-roll (a person working), with round blue icon buttons orbiting in at different depths. The footage is part of the world, not a cutaway.
18. **Dock of round icons (L).** Round blue icons enter one at a time from the edge at different depths, each parked beside the window.

## Backgrounds and light
19. **Accent blob sweep (T).** A bright pink-magenta blob sweeps in from a corner behind the logo, brightens as the logo settles. Reuse as an energy hit on handoffs.
20. **Underline glow (T).** A thin bright arc line with an orange-to-purple glow beneath a typed line; the arc becomes the pill outline.
21. **Dark world with faint grid and floor glow (T).** Near-black purple, grid at about 6% contrast, one soft glow near the bottom.
22. **Pastel mesh drift (T).** 3-4 big blurred colour fields drifting slowly behind content, one accent blob brighter than the rest.
23. **Deep blue scene with wave bars (L).** Saturated blue field with a vignette, soft vertical bars behind type, and a video window sliding up from the bottom with a blue outer glow.

## Camera and perspective
24. **Slow drift while holding (both).** Every held scene keeps a slow push, drift or scroll. Frames are nearly never still (6-7%).
25. **3D tilt entrance (T).** UI enters as a large rotated plane with strong perspective, then relaxes to a slight tilt and keeps moving.
26. **Scroll list with a focus row (L).** Items shrink and fade toward both edges, one row highlighted, the answer large beside it.

## Added from four more references (2026-11-23)
References: SaaSWAVE course launch (S, 26.4 s, full 3D render, Arsacre), VibeDocX (V, 59 s, Hlib Trazanov), Motion Swell AI Builder demo (M, 21 s), Doks.ai (D, 20 s, Zelios). Same reliability note as above: strips at 6-9 fps, curves by eye.

### Prompt bar and AI flows (seen in V, M, D, and T)
27. **Glass prompt pill with typewriter (V, D).** A dark glass pill with a bright green edge light, text typed with a caret, a round icon button at the right that pulses when the line is complete, then the next scene is the result. Typing at about 12-15 characters per second.
28. **Zoom into the field to type (M).** The camera pushes into the text field so the typing is huge and readable, then pulls back to show the whole card. Typed text reads on a phone because the framing, not the font size, does the work.
29. **Big gradient Generate button (M).** The button scales up to fill the frame, a large black cursor clicks it with a press dip, and the following scene (code) arrives immediately. Click leads straight into the result.
30. **Ripple on press (D).** Concentric thin rings expand from the pill about 2-3 rings staggered, the pill fills with its accent colour on the press.
31. **Pill morphs into an input field (D).** The pill stretches into a glowing rectangle (cyan-green gradient fill), the fill clears to dark, and the question types in. Then "..." dots, then the answer streams below in a second bubble.
32. **Code that types and fades (M).** Lines of code appear top to bottom, coloured in two or three tones, fading to a pink bloom at the bottom edge. Reads as "work happening" without being legible.
33. **Progress checklist card (M).** A card lists steps ("Building backend", "Designing frontend", "Deploying app"), each with a spinner that turns into a green check one after another, about 0.5 s per step, then the card collapses into a "Your app is ready!" pill.
34. **Rotating word reel (V).** A single slot cycles through words ("messy content", "unstructured content", "generic content", "manual work"), each blurring in and out, ending on the word the product removes.

### 3D and perspective (S, D, M)
35. **Camera dive into the scene (S).** The shot starts top-down on a desk, notification cards pop out of a phone at different depths, and the camera swoops down and forward (about 1 s, motion blur and depth of field) to desk level, ending on the product name on a laptop. Needs a real 3D camera (Blender) or layered planes with parallax.
36. **Object match cuts (S).** One object leads into the next: a pen draws a line, the line becomes a red ribbon, the ribbon runs through sticky notes, the notes become the next scene. The object carries the viewer across the cut.
37. **Inflated 3D type (S).** Words ("many") as glossy balloon letters that inflate and wobble, pastel on a light world. Use only as the one playful moment.
38. **Umbrella wipe (S).** A big object sweeps up across the lens and hides the scene change. Any large, soft, near-camera object works as a wipe.
39. **Inverted colour burst with speed lines (S).** One frame set of hot magenta with radial speed lines, about 0.2 s, between a calm scene and the next. Budget one per film (matches the one-or-two flash rule).
40. **Type behind an object (S).** "Answers" sits behind the umbrella, so the object occludes letters. It proves depth with no camera move.
41. **Deck of tilted layers (D).** Coloured label bars ("Doks AI Bot", "AI Support Assistant") stacked and fanned in 3D like a card deck, camera pushing in. Chat UIs shown as tilted cards with a small label above ("Inline Style", "Message Style").
42. **Icon grid in perspective (D).** "Connect any source": a grid of rounded-square icons in a tilted panel, then the camera zooms into the icons (about 1 s) and back out. Zoom shows detail without a new scene.
43. **3D carousel of UI screens (M).** 3 UI cards in a Y-rotated fan on a blue-red-purple gradient, rotating slowly so the next screen comes to the front. About 3 s.

### Shapes and type (V, D, M, S)
44. **Glass sparkle rotating to a point (D).** A chrome-green 4-point sparkle spins about its vertical axis (it passes through edge-on as a thin bar), shrinks to a small icon, and then becomes the inline icon inside the line of text "The future of your business [icon] is here". The text types around the icon, which keeps spinning gently. The end card follows with the logo and a glow arc.
45. **Layered ghost wallpaper (M).** A huge repeated word ("Intelligence Intelligence...") at 10% opacity behind the headline "Meet AI Builder", sliding sideways in rows at different speeds. Adds depth to a type-only scene.
46. **Chunky 2D type on white (S).** Giant pink type that runs off the frame ("Rea..." into "projects"), with motion blur at the edges, between 3D scenes. A flat breather after dense 3D.
47. **Line icons drawn in (V).** "Think it. Say it. See it.": each verb has a line icon (brain, speech bubble, eye) that draws in beside it, the verb in bold green. Three beats in a row, same layout.
48. **Orbit with real app icons (V).** A glowing ring with the app icons (Word, Excel) orbiting around "Right where you work", then the ring tightens to the next line.
49. **Signature logo drawn on (S).** The logo is a single stroke drawn on, then the wordmark and links fade in beneath. Fits a creator or course brand.

## How to learn more from a reference
Capture strips around each interesting moment at 8-12 fps, then write the recipe in this format. Measure the size or position per frame for anything you will copy numerically. Mark measured and eyeballed values apart.
