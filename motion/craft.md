# Motion: craft
Part of the Motion Playbook (`motion-playbook.md` in the project root has the index, the working order, the ban list and the rubric). Sections 1-5: the 12 principles, depth and complexity, elasticity, morphing, transitions. Section numbers match the index.

## 1. The 12 principles, as working rules
- Squash and stretch: elastic things change shape but keep volume. Use on pops, landings and impacts.
- Anticipation: a small counter-move before large physical moves and big transitions. UI elements (cards, fields, pills, dialogs) enter without one: on UI it reads as a wobble.
- Staging: one hero per shot. Everything else supports it.
- Pose to pose: lock key poses first (the storyboard frames), then let springs fill the in-betweens.
- Follow through and overlap: parts of one thing settle at different times. Children lag parents, loose parts overshoot and settle.
- Slow in, slow out: no spatial move is linear.
- Arcs: organic motion travels on curves. Straight lines read as mechanical, use them only on purpose.
- Secondary action: supports the hero, lands at the start or end of the main move, never during its peak.
- Timing: frame counts carry weight and mood. Heavy is slower, light is quicker.
- Exaggeration: push key poses 10-30% beyond realistic, more for phone viewing, but with restraint. In product and UI films, exaggerate with scale and camera (push into the detail), never with bounce.
- Solid drawing: forms have volume. Use layers, light, shading and perspective. Flat mirrored twins look dead.
- Appeal: the hero must be interesting to look at, not just correct.
- Moving hold: a held pose is never fully still. Add a slight drift, breath or push.

## 2. Depth and complexity (the anti-bland rule)
- Every shot has three layers of motion: primary (hero), secondary (supporting), ambient (life in the background).
- Hierarchy: one hero move per shot. Secondary moves travel about 50-70% as far and start about 100-200 ms later. Ambient motion stays under about 5% of the hero's travel.
- Stagger instead of simultaneous: letters about 1 frame apart, words about 60-120 ms, list items about 40-80 ms. Total stagger stays under about 500 ms.
- Depth cues: parallax (layers moving at different rates), scale change, overlap, blur that scales with speed, shadow that follows, fog or air tint on far layers.
- Complexity comes from layering and orchestration, not from adding more elements or random effects. Depth and restraint do not clash: few elements, three layers of motion, one idea per shot, ambient motion kept small.
- Variety comes from composition (scale, camera, layout, colour world, background level, transition, Section 0a-G), not from changing the motion language. One film has one spring family, one easing family and one text entrance pattern, with a vocabulary of five to eight transitions. Swapping the language shot to shot (a tunnel here, an orbit there) reads as mixed motion styles, a tell of cheap work.

## 3. Elasticity (springs)
- Write motion as springs or exponential easing, as functions of time. Name the damping ratio per element.
- Damping ratio guide: 1.0 never bounces. 0.7-0.85 premium. 0.4-0.6 playful. Under 0.3 cartoonish.
- Position, scale and rotation may overshoot. Opacity and colour never overshoot.
- Heavier things get slower, more damped springs. Lighter things get quicker, bouncier ones.
- Elasticity is chosen per project in the motion profile. It is not a default preset.
- Get elasticity from stretch, squash, leading-and-trailing lag and a settle, not from bounce.
- Default (product and UI films, and any project with no stated profile): premium. Damping 0.8-0.9, overshoot 5% or less, no bounce on UI.
- Other projects, where the motion profile says so: overshoot up to about 10%. Damping under 0.6 only when the profile says playful.
- The pre-flight computes every spring token's overshoot and fails any that exceed the project's profile.

## 4. Morphing
- Prefer transformation over replacement: one shape, glyph or object becomes the next.
- Match structure: same point counts or paths, same direction of travel, keep identity (colour or shape) across the change so the eye follows.
- Types to plan: shape to shape, type to shape, 2D to 3D, UI element to chart, icon to scene.
- Every morph must be clean at its midpoint frame. Check mid-morph stills, because that is where it breaks.

## 5. Transitions (never just a fade)
- Every shot grows out of the previous one. The exit state of shot A is the entry state of shot B.
- Each transition declares what carries over: shape, colour, direction, scale or position. Write it in the shot list.
- Use: morph-through, match cut on shape or direction, scale-through (fly into an element that becomes the next scene), mask reveals driven by a moving object, an element that persists and changes role, rack-focus or push handoffs, directional blur whips matched to the move.
- Default is not a crossfade, not a plain wipe, and not fade-and-slide-up on everything. No dissolves anywhere. A cut is allowed only as an invisible match cut on the beat: shape, position and motion continue across it, so it does not read as a cut. Every other change is a morph, a carry-over or a camera move.
- Cut or hit on the beat when there is music. Frames per beat = fps x 60 / BPM. Round each beat on its own so timing does not drift.
