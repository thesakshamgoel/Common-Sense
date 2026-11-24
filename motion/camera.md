# Motion: camera
Part of the Motion Playbook (`motion-playbook.md` in the project root has the index, the working order, the ban list and the rubric). Sections 6, 6a, 6b: camera moves, eye guidance, the perspective camera. Section numbers match the index.

## 6. Camera
- Think film camera, not orbit controls. Each shot has one named move: push-in, pull-back, dolly, crane, arc or orbit, tracking follow, whip, parallax drift, rack focus. Every move is eased or sprung.
- Follow the elements: the camera has a target (the hero). It starts moving slightly after the subject, leads in the direction of travel (leave look-ahead space), follows with damped smoothing, and settles with a small overshoot when the subject stops.
- Zoom with intent: push in to emphasise, pull back to reveal.
- Camera, subject and background move at different rates, so there is parallax and depth.
- 2D work: a virtual perspective camera with layers at different depths (Section 6b), never a flat scale-and-pan over one plane.
- 3D work: never pass through geometry, keep near and far planes tight, use depth of field only on shots that need it.
- During a text hold, add a slow push so the frame is never dead.
- A camera move needs a reason: reveal, emphasise or connect. No camera move as filler.

## 6a. Eye guidance (one focus at a time)
- At any moment exactly one thing asks to be looked at. Design the read order of every section: headline, then the hero, then the proof.
- Focus: the focused element is sharp, lit and slightly lifted. Everything else dims to about 40% and softens 2-4 px (never text the viewer is reading). Focus changes take about 0.35 s.
- New things appear where the eye already is, or something moving leads the eye there: the cursor, a callout, the light.
- A callout or label attached to the active element follows it (offset about 24 px, lag about 0.08 s), computed from the element's position, never timed separately.
- Size animation: push into the detail being talked about (1.5-2.5x in about 0.6 s), keep something changing there, then pull back or whip out. Every product section has one.
- The headline stays up while its proof plays underneath. It does not swap on every beat.
- The background light follows the focus, starting about 0.6 s after the focus moves.
- Check it: on every review still, name the one thing in focus. If two things compete, fix it.

## 6b. The camera is never flat: perspective, follow, focus
Why: a flat camera is a scale-and-pan over one plane. Nothing shifts against anything else, so the film reads as a slideshow. The fix is a real perspective camera with layers at different depths. Numbers are starting values: set them once in the tokens file.

Build it
- Scene: put every layer at its own depth (z). Use at least three depths with clearly different parallax rates: a far plane, the product plane and a near plane. Planes moving at the same rate means the camera is flat again.
- Camera: position (x, y, z), a target, a rotation (yaw, pitch, a little roll) and a lens. For UI films use a vertical field of view of about 25-40 degrees. Narrow keeps the UI undistorted. Wide (about 50-60 degrees) is for a fly-through only, and never on a screen of readable text.
- Dolly, do not zoom. To go in, move the camera along z (distance in log space). Scaling the layer changes size and nothing else. A dolly also changes parallax, which is what gives depth. Use a plain scale only for a pure punch-in on a hit.
- Route: CSS 3D (perspective plus translateZ and rotate) or three.js for web films, motion-reel's 3-D sets when that skill runs the build, Blender for true 3D (Section 15). CSS 3D has no real depth of field, so fake it with a blur per plane that grows with its distance from the focus plane.

Moves (name one per section, Section 0a-G)
- Dolly in or out. Truck (sideways). Pedestal or crane (vertical). Arc (an orbit of at most about 30 degrees of yaw on a UI plane, so text stays legible). Follow. Whip with directional blur. Rack focus between planes. Push-through (fly through a near layer into the next plane). A slight roll of about 1-3 degrees on a hit only.
- Tilt a UI plane back about 4-12 degrees for depth during a move, and bring it back to near-frontal before it is read. A plane carrying text settles to within about 8 degrees of frontal before the read starts, and never rotates while being read.
- A dolly zoom (zoom against dolly) at most once per film, as a hit.
- Handheld micro-drift: seeded noise, under about 0.3% of the frame, never as filler. It only keeps a held frame alive.

Follow
- The camera has a target: the hero, or a focus point that leads it. The camera is a spring with more mass than the subject. It starts moving about 0.1 s after the subject, leaves look-ahead space in the direction of travel (about 10-15% of the frame), follows with damped smoothing and eases in with at most about 3% overshoot.
- It follows along a continuous path, one spline for the film. Each section's camera starts at the previous section's end pose and velocity (Section 0a-C). The camera speed never crosses zero between sections.
- One operator for the whole film: the same lens family, the same mass and the same follow lag. The moves change from section to section. The operator does not.

Bring out the focus
- The camera does the focusing, before any dimming. In order: dolly toward the focus, rack the depth of field onto its plane, tilt the plane a few degrees toward the lens, then let light and dimming support it (Section 6a). After the beat, pull back or whip out to give the context again.
- Depth of field: blur radius = aperture x the distance of each plane from the focus plane, with one aperture value for the film. Never blur text being read.
- The product plane is the only plane in sharp focus during a product section.

Check it
- A camera path plot (position, rotation, lens against time). It is smooth, with no velocity jump at a section boundary.
- Parallax test: take two frames from one section and confirm the planes shifted by different amounts. Same shift means flat.
- Every section has a camera row in the brief (Section 0a-G table plus the camera plan): move, start pose, end pose, target, lens, focus plane.
- A text plane at rest is within about 8 degrees of frontal. A frame mid-move is checked for text that has turned too far.
