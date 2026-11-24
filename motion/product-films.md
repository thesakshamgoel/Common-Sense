# Motion: product, UI, showreel and story films
Part of the Motion Playbook (`motion-playbook.md` in the project root has the index, the working order, the ban list and the rubric). Sections 12 and 14. Section numbers match the index.

## 12. Product, UI and showreel films
Look and truth
- Research the product first. Use what is real: its screens, features, numbers, logo, colours and typeface. Never invent any of it. If the user gave a repo, link or upload, take the logo, UI and brand from there and use them directly. That is permission. Ask only when the user has no connection to the brand.
- Rebuild the real UI as vector layers so each part can move on its own. Never slide a flat screenshot in. A real cursor drives every interaction with real clicks and drags. The camera zooms screen-studio style so each moment fills the frame.
- Check every flow you show (dialogs, options, channels, statuses) against the product's code or screens, not only its strings. Showing an option the product does not have is a false claim.
- Payment details on screen: never put a payable QR or link for a demo UPI ID, IBAN or wallet in a film. A demo handle can be real (`name@upi` is a live BHIM handle), so a scannable code could send a viewer's money to a stranger. Use a QR whose payload is a plain note ("demo, not a payment request") at the same size and density as the real one.
- Check the product's real behaviour behind every detail, not only its strings: the app's QR has no logo plate, a paid invoice hides its QR, the dashboard tiles have a fixed order. A storyboard detail that the product does not have is changed at build time and listed for the user.
- Background: chosen per section by the seesaw (Section 0a-F). A section with the complex real UI gets B0 or B1: a near-black or brand-base field with soft light lifts that follow the focus. A basic section (one headline, one number) gets B2 or B3: layered colour fields, soft forms, grain, parallax. It changes between sections and morphs between levels. No filler lines, rails, rings, streaks, ribbons, grids or shards. Depth comes from light, focus and scale.
- One typeface (Geist or a bold display face, and avoid Inter unless the brand uses it). Per section, 60-30-10 inside that section's colour world (Section 0a-E), with black and white. The accent appears only on the through-line object and the key word. Lots of empty space. No italics: use an upright serif for a tail line.

Through-line object
- Pick one object from the product itself (a cursor, a key button, the logo mark, a data point). Name it before the storyboard. Every scene is a transformation of it: it starts in the UI, changes shape or role each scene, and becomes the logo on the end card.
- Nothing appears from nothing: it grows, unfolds or is revealed by a mask. The object never teleports: show the path of every handoff.

Camera as one world
- Lay all UI out in one world, at different depths, and drive one perspective camera (position, rotation and log-space dolly distance; Section 6b). Push from 1.0 to 1.04 across each scene, and start every scene at the zoom the last one ended on. The camera never sits still.
- Fly-through of a page: constant forward speed with easing only at the start and end, no sideways rotation, no zoom reversal, no text before the final card. Floating elements lift about 20-40 px off the page.
- Web page films: capture the page at a fixed width with Playwright, lock the layout before animating so section heights cannot shift, and extract floating elements as transparent layers with their positions saved to JSON.

Beat structure (when there is music or a beat)
- First bar is the hook (the problem in 3-5 words, interrupted by the through-line object). Then one idea per one or two bars, each flowing out of the last, with time shared by importance (Section 0a-A), not equally. Something changes on every beat.
- The strongest moment is the last full bar. The final half bar is the end title. The last frame matches the first, cursor position and speed included, so it loops.

Spring maths
- A value that changes target many times is the sum of one spring per change, so it stays a pure function of time.
- Leading and trailing edges (tab indicator, toggle knob, stretching pill) ride different springs so the leading edge stretches ahead.
- Drags: while held, the value comes from the cursor position. On release it springs from wherever it was. A brief squash on impact.

Gotchas
- Measure element positions at runtime for match cuts. Never hard-code them.
- When a shape fills the frame, scale it past all four corners.
- Outgoing and incoming text get separate timing so letters never overlap. Text that swaps inside a morphing container needs its own enter and exit.
- Never `will-change` on anything the camera scales, or text renders blurry.
- Anything attached to something moving (a value bubble on a knob, typed text matching the pressed keys) is computed from that thing's state, never timed separately.
- Icon strokes match across the piece.

## 14. Story shapes (rendered story films)
Pick one before storyboarding and think in bars, not seconds (at 120 BPM one bar is 2 s). Scene changes (morphs, carry-overs, match cuts) go on bar lines.
- Big payoff (sports, launches, surprises): quiet intro, tension, build, a beat of silence, a loud drop, a soft outro. Use the silence only when there is a real moment of suspense.
- Comic escalation: the same gag three times, each bigger, then a stop before the punchline.
- Tender memory: slow tempo, no drums, slow push-ins, ends on a held chord.
- Montage: steady groove, one shot per bar, energy rising every four bars.
- Musical explainer: one idea per bar, each with its own sound.
- Performance: the music leads, the players' hands land on the notes.
Pick three to five sync gimmicks where the picture visibly makes the music (an object that plays the melody, a letter that stamps on a beat). A hit needs a sharp change on both sides. Pickups, rolls and swells into a hit blur it, so end them a beat early.
- Draw order: bursts behind characters, captions before full-screen wipes.
- Captions: inside the safe area, at least 16 px on a 1080 frame, about 2.5 spoken words per second, and no big hit on top of a spoken word.
- Safe area on 9:16: keep text and faces clear of roughly the top 11%, the bottom 22% and the right edge.
- Faces and hands: view full-size stills of them before the user sees the piece.
