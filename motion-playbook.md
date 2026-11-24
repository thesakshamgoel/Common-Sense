# Motion Playbook

Read this before any motion graphics, video or animated UI. It sits below CLAUDE.md in the hierarchy and above the installed motion-design skill. Numbers are starting values: set them once per project in the tokens file and tune there. Everything here except the hard rules in CLAUDE.md (Hierarchy) is guidance, not law. Break a guideline when it makes the piece better: say what and why in one line, show it in the storyboard or sample, and log it under Deviations in the brief. The pre-flight reports a broken guideline as a warning with its reason, not as a failure. The user's own rejected list and explicit instructions still bind.

Built from: the 12 principles of animation (Wikipedia), a published Claude motion-video workflow (dev.to, arqamwd), the Prompt Motion library (templates and entries), the user's reel on UI animation hacks (Section 11), six of the user's own motion prompts (Sections 12-13), and the user's own Shakeslip reference film with the v05 review (2026-11-23: Sections 6a, 8, 9, 13). See `reference-notes/motion-2026-11-22.md` for what was and was not seen.

## Where things are (read only what the project needs)
Section numbers are stable. This file holds Sections 0, 0a, 8 and 9. The rest live in `motion/`.
| Project | Read |
|---|---|
| Rendered film or motion graphics | this file, then `motion/craft.md`, `motion/camera.md`, `motion/build.md`, and `film-pipeline.md` for video delivery |
| Product, UI, showreel or story film | also `motion/product-films.md` |
| 3D or Blender | also `motion/blender.md` |
| Three.js or WebGL film recorded frame by frame | also `motion/threejs-film.md` and `tools/threejs-film/` (determinism, audio levels lookup, recorder) |
| SaaS explainer, product ad or demo film | also `motion/saas-explainer-style.md` and `motion/animation-catalogue.md` (background pairing, kinetic type, floating UI cards, 26 move recipes, measure-then-match) |
| Any film with backgrounds | also `motion/backgrounds.md` (library, quality checklist, rotation rule) and `tools/backgrounds/` |
| Dark glow world backgrounds (light that peaks and fades, logo-derived line work, worlds from a saturated brand hue) | also `motion/dark-glow-backgrounds.md` and `tools/examples/dark-glow-bg.js` |
| Live UI animation (apps, sites) | `motion/live-ui.md` and `motion/craft.md` only. Sections 0 and 0a are for films. |
Section map: 1-5 craft. 6, 6a, 6b camera. 7, 13, 16, 17 build. 10, 11, 11a live UI. 12, 14 product films. 15 Blender.

## 0. Working order for motion graphics (set by the user, 2026-11-23)
Discuss before creating. Nothing is built until steps 1-9 are agreed. Show each step visually where it can be (a PNG, a short loop or a grid), one element at a time.
1. Input: the user gives the brief, product, assets and where the piece will be shown.
2. Questions: ask what the input does not answer (Questions to Ask Up Front in CLAUDE.md), all in one message.
3. Technicals: recommend the full spec for the delivery place (resolution, fps, aspect, codec, bit depth, chroma, colour space, loudness, length, tempo) with a reason for each. The user confirms or changes it, then it locks.
4. References: ask the user for references first. If there are none, bring your own (21st.dev, Prompt Motion, React Bits, Motion Primitives, the galleries in CLAUDE.md) as a scored grid, with measured values where they can be measured.
5. Music: propose two or three options (from the connected library such as Epidemic Sound, made in code, or a mix) with their beat map. The user approves one. Sound effects are Claude's choice, mixing library sounds and sounds made in code.
6. Colour worlds and backgrounds first: two to four colour worlds as swatches (anchored on the brand, widened with Adobe Color harmonies, Section 0a-E) and the four background levels B0-B3 (Section 0a-F), shown as PNG frames, plus a short loop of one background morphing into another, until the user finalises the set.
7. Effects: ask which effects to add (glow, grain, shake, light leaks, or anything else that suits), each suggestion with a visual example. The default is none.
8. Script: a simple written script, section by section: what is on screen, the words, the read time and the planned hold, the energy level, what changes, and what carries over to the next section (Section 0a). Approved before any drawing.
9. Storyboard: visual frames from the script, plus the elements discussed one by one (the shapes, how each becomes the next), plus the variety table (foreground level, background level, colour world, scale, camera move, transition for every section, Section 0a-G). GATE 1.
10. Build: one sample section with sound first (GATE 2), then the rest, then the final (GATE 3).

Principles the user set (2026-11-23)
- Be creative, but never add an element for the sake of adding one. Every element earns its place.
- Balance: every hold and every move gets its time from a budget, not from a feeling (Section 0a-A). Not too much, not too little.
- The audience always knows where to look (Section 6a).
- Pacing follows the music: one idea per one or two bars, quicker into a drop, a breath after it.
- Elements morph into one another. Everything flows: a line becomes a transition becomes the next animation.
- No crossfades or dissolves anywhere. No abrupt cuts: a cut is allowed only as an invisible match cut on the beat, where shape and motion continue across it.
- Premium: restraint, one focus, a background that never competes with it (and that is allowed to change), the real product, one consistent motion language.
- Every element the user rejects goes into the project's rules.md "Never" list at once, and every new design is checked against that list before it is shown.

## 0a. Balance, pacing, flow, smoothness, colour range, background, variety
These seven were the repeated failures: times were guessed (too long or too short), motion was not smooth, colours never left the repo palette, the background never changed, the same tricks repeated, and sections stopped instead of flowing. Each has a plan, a number and a check. Numbers are starting values: set them in the tokens file and tune per project.

A. Time budget (balance)
- Read time = words / 2.5 per second. A number or a logo counts as one word. A line stays up for read time x 1.0 to 1.5, counted from when it lands. Under 1.0 is unreadable. Over 1.5 is dead.
- A line is allowed on screen longer than about 0.9 s only while something in the focus keeps changing (a word emphasised, a number ticking, an underline drawing, the light shifting), at least every 0.6 s. A still hold is a hold with no change in the focus, and it never runs over about 0.9 s.
- A move is travel plus settle. Settle is at least 30% of the travel time. Small changes 0.3-0.6 s, section moves 0.6-1.2 s, camera pushes 0.8-2 s, transitions 0.5-1.0 s and overlapping the previous settle.
- Importance sets length. The hero moment gets about 1.5-2x the average section. Supporting sections are the shortest. No three sections in a row within 15% of each other's length (that is a metronome). Section lengths land on bar lines.
- Check: the script has a read-time column and a planned-hold column. The pre-flight computes the ratio and fails anything outside 1.0-1.5 unless flagged.

B. Pacing (energy)
- Every section gets an energy level in the script: 1 breath, 2 steady, 3 push. Plan the curve against the music: rising into a drop, a breath after it. Pace is the change in energy, not a constant speed.
- A breath is slow motion, never a stop.
- Design one peak and one ending on purpose. People remember the peak and the end of a film more than the average. The peak is the strongest moment (the hero in its biggest, clearest form), the ending is the last card and its hold. Spend the most design effort there. Some friction before the peak (a build, a held breath) makes the peak land. Do not over-polish the middle at their expense.
- Check: plot motion energy (frame-difference) over time and compare it with the plan. A flat line fails.

C. Flow (never broken)
- Handoff by overlap: the next section starts when the previous one is 60-80% through its settle. The script names what carries over: direction, velocity, shape, colour or the through-line object. No handoff with nothing carried.
- Velocity carries: the second animation starts at the outgoing velocity (a spring with initial velocity), so there is no kink where one hands to the next.
- No reset to neutral. Between sections the frame is never empty and never fully still. Motion energy stays above about 15% of the median except in a planned breath (at most one per 15 s, and slow, not zero).
- The camera never stops between sections. It eases out of one move into the next, on the same axis or arcing out of it.
- One motion language (spring family, easing family, text entrance) for the whole film. Flow breaks when the language changes, not when the composition changes.
- Check: a flow map, one row per handoff, naming what is carried. Hero speed and camera speed never cross zero between sections. A mid-handoff still for every handoff.

D. Smoothness
- Moving things sit at sub-pixel positions. Never round a moving position, text included. Render at the spec fps with 3-4 motion-blur subframes (Section 13).
- Every curve has continuous velocity: springs, exponential easing, cubic-bezier. No linear segments, no steps, no keyframes that stop mid-move. One owner per property per frame: stacked changes are a sum of springs, never two animations fighting.
- Check (numbers decide, not stills): position-per-frame plots for the hero, the camera and each text block. Fail any frame where speed changes by more than about 35% of that element's peak speed, unless the frame is a listed hit. Fail any run of identical frames during a move. A short clip of every transition is for the user to watch at Gate 2.

E. Colour range (the repo is the anchor, not a fence)
- Logo and brand marks stay exactly as supplied. Brand colours are the starting point and the identity: they appear in the through-line object or the accent in every colour world.
- Each section may sit in its own colour world: the brand hue plus one or two outside hues from Adobe Color harmonies (analogous, complementary, triad, split), with tints, shades and tones. A world follows 60-30-10 on its own. A film uses two to four worlds, and they share one thing (the anchor colour, the neutral base or the light direction) so it reads as one film.
- Colour changes by morphing the gradient across a handoff, never by cutting.
- Always: WCAG AA contrast for text, colour never contradicts meaning (red for an error stays red), no recoloured logo.
- The user approves the worlds as swatches at Section 0 step 6.

F. Background and foreground complexity (the seesaw)
- Background levels: B0 flat (a solid or one soft field). B1 soft (a gradient plus one light that follows the focus). B2 layered (gradients, large soft colour fields or the project's own shapes, grain, slow drift). B3 rich (several layers with parallax, moving colour fields, texture, depth of field).
- Foreground levels: F1 basic (one object or one line of text). F2 medium (a few elements). F3 complex (the real UI, many parts, data).
- The seesaw: F plus B comes to 3 or 4. F3 goes with B0 or B1. F2 with B1 or B2. F1 with B2 or B3. Never a busy foreground on a busy background, and never a bare foreground on a bare background.
- The background changes between sections and morphs between levels, never cuts. It can move with the camera at a different rate (parallax).
- It is built from light, colour fields, large soft forms, grain and depth. Lines, rails, rings, streaks, ribbons, grids or shards used as filler stay banned. A large form that is the project's own shape (the through-line object magnified, the product's own geometry) is allowed in B2 and B3.
- The background never competes with the focus: its detail is lower in contrast than the hero, softened or dimmed near the focus, and text areas keep AA.
- Check: the storyboard table lists F level, B level and colour world per section. The pre-flight checks that F plus B is 3 or 4.

G. Variety (diversity inside one motion language)
- Every section picks from six axes: scale (wide, medium, close, macro), camera move (dolly in or out, truck, crane, arc, follow, whip, rack focus, push-through; Section 6b), layout (centre, left, right, stacked, split, full-bleed), colour world, background level, and transition (from a vocabulary of five to eight: morph-through, scale-through, mask reveal, match cut, push handoff, rack handoff, role change).
- Each section differs from its neighbour on at least three of the six axes. No camera move or transition type twice in a row. No transition more than twice in a film under 30 s.
- Variety lives in composition, not in the motion language. Springs, easing and text entrance stay the same.
- Check: the variety table in the storyboard, and the pre-flight scans for adjacent repeats.

## 8. Default ban list (extend after every render)
Crossfades. Fade-and-slide-up on every element. Everything entering together. Default or preset gradients. Glow, bloom, neon, lens flares. Particle bursts as filler. Camera shake as filler. RGB split. Preset bouncy easing. A static camera on a held shot. A flat camera: scale-and-pan over one plane, or every layer at the same depth. A camera that only pushes in. A linear pan. A reframe with no move. A text plane turned far from frontal while being read. Wide-angle distortion on UI. A dolly zoom more than once. Text moving while it is being read. Overlapping readable text (text deliberately morphing into a shape is allowed while it transforms, and it must be clean on its mid-transition frame). Coloured side-bar cards. A slowly spinning object as the whole idea. Anything that looks like a template. Effects the user did not pick in step 7 (glow, grain, shake, light leaks). Dead time. Dissolves. Cuts that are not invisible match cuts. Centred title on a gradient. Corner labels and frame borders. Glow on UI chrome. A full-frame flash on every cut. A cut whose first frame is blank. Two half-moves with empty frames between them for a whip. Stock footage. Disconnected transitions. Excessive bouncing. Mismatched icon strokes. Blurry text during camera moves. Text overlays before the final card in a fly-through. Bounce on UI elements. Floating UI fragments instead of the real screen. Everything at one scale for a whole shot. Decorative background lines, rails, rings, streaks, ribbons, grids or shards used as filler (Section 0a-F says what a complex background may use). Orbits, tunnels or spinning objects as the idea. Still holds over about 0.9 s (a moving push alone does not count). Two things asking for attention at once. Showing a product option or channel the product does not have. The same background level in every section. A busy foreground on a busy background, or a bare one on a bare one. Colours that never leave the repo palette. Sections of equal length. The same camera move or transition twice in a row. A full stop or an empty frame between sections. Rounded pixel positions while moving. A velocity jump at a handoff. A line held far past its read time. Redrawn, approximated or invented substitutes for the supplied logo, product shots or UI. Stand-in shapes or lazy shortcuts where a scene needs a proper element. The same background family or the same animation set as the previous film (motion/backgrounds.md, Rotation). Weak flat backgrounds next to references with rich ones. Hard, uniform or neon light lines in backgrounds; light is tapered, pale and faded to the edges, or a soft gradient orb (motion/backgrounds.md, Lit worlds first).

## 9. Still-review rubric (1-10, aim for 8+ on all, cite frame numbers)
Hook. Depth and layering. Elasticity and weight. Morph cleanliness. Transition continuity. Camera purpose and follow. Variety across shots. Legibility on a phone. Text overlap. Colour balance (60-30-10). Beat sync if there is music. Eye guidance (one focus per moment). Rhythm (longest still hold, small changes per second). Hero size (the real UI fills about 60% or more of the frame in product sections). Side by side with the reference at matching moments. Camera depth (parallax between planes, perspective, focus pulled by the camera). Balance (read-time ratio 1.0-1.5). Pacing (the energy plan is met). Flow (every handoff carries something). Smoothness (no velocity jump). Variety (neighbouring sections differ on three axes). Colour range. Background and foreground seesaw.
