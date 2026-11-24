# Motion: live UI
Part of the Motion Playbook (`motion-playbook.md` in the project root has the index, the working order, the ban list and the rubric). Sections 10, 11, 11a: live UI rules, micro-interactions, interaction behaviour. Section numbers match the index.

## 10. Rules that are different for live UI
The transform-and-opacity-only rule and the 120 Hz budget apply to live, interactive UI. In rendered motion graphics every frame is computed, so shape morphs, blur and 3D are fine. Reduced-motion still applies to live UI.

## 11. Live UI micro-interactions (from the reel "10 Niche Animation Hacks")
For buttons, dialogs, steppers, accordions, toasts, tooltips and carousels. Starting values read from the reel's code panels. Tune per project. The reel covers live UI craft only. It says nothing about camera, morphing or cinematic transitions.
1. Enter from scale 0.97 plus opacity 0, never from scale 0. About 250 ms, curve (0.32, 0.72, 0, 1).
2. Press feedback: scale to 0.97 on press, about 150 ms ease-out.
3. Error: change colour and also shake the field. x keyframes about 0, -10, 10, -6, 6, -3, 0 px over about 0.36 s.
4. Steps and tabs: slide in the direction of travel (next enters from one side, back from the other), about 350 ms, curve (0.77, 0, 0.175, 1). Do not cross-fade between steps.
5. Height to auto: set `interpolate-size: allow-keywords` so height 0 to auto animates. About 250 ms, curve (0.77, 0, 0.175, 1), overflow clipped. Check browser support before relying on it.
6. Move things with transform (translateX), not left or top, which force layout each frame. About 300 ms, curve (0.32, 0.72, 0, 1).
7. Theme switch: turn transitions off during the switch so many properties do not animate at once. (Read at thumbnail size, confirm the exact code.)
8. Tooltips: the first waits (about 600 ms). Neighbours open with no wait inside a short window (about 300 ms).
9. Releasing a gesture: use a spring that keeps the gesture's velocity (about 0.5 s, no bounce, starting velocity equal to the current velocity), not a fixed ease-in-out time.
10. Dragging past the end: rubber-band. over = max(0, pull - 12), offset = 64 x over / (over + 150), spring back to 0 on release.

## 11a. Live UI behaviour (apps and sites, from the interaction-design skill)
- Per interactive element, design a state inventory: default, hover, focus (visible ring), pressed, disabled, loading, empty, error, success, selected, expanded, dragging. Any that do not apply are crossed out on purpose.
- Per custom interaction write trigger, rules, feedback and loops. Bring the key data forward onto the trigger. Prevent errors where possible (constrained inputs). Smart defaults. Feedback matches the importance of the event and gets quieter when repeated.
- Never leave the user without feedback for more than 1 s. Past 1 s show progress, and past about 10 s let the work run in the background.
- Offer Undo instead of an "are you sure?" for reversible actions. Do not block input during an animation. Direct interactions stay under about 300 ms, so the 350 ms step slide in Section 11 is the upper end, not a target.
- Gestures always have a visible alternative.
- Tell the story of a flow: one peak moment and a deliberate ending (Section 0a-B).

For film-style floating UI cards, cursor-hand and state-change patterns see `saas-explainer-style.md` (Section 4).
