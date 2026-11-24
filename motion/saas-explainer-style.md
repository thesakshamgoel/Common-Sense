# SaaS explainer style (from the user's references, 2026-11-23)

Read this for product explainers, SaaS ads and demo films, in addition to the core playbook. These are guidance, not law: break any rule with a one-line reason shown at the storyboard or sample, logged under Deviations.

## Evidence and limits (read first)
- Built from six videos watched as files (LangEase, Teamble, SaaSWAVE, VibeDocX, Motion Swell, Doks.ai): the whole of each at 1-3 fps contact-sheet level, plus strips at 5-12.5 fps on key moments and frame-accurate measures on one morph. See `reference-notes/motion-2026-11-23-zelios.md`.
- MEASURED: scene lengths, cut counts, energy per second, stillness, loudness, and the timing of one shape morph. Everything else (easing curves, spring values, cursor speed) is read by eye from frames and is a starting point. Confirm on the one sample scene (Gate 2), then lock it in the motion profile.
- Audio was measured, not heard. Voiceover and music style are unknown.
- Study the traits. Never copy their footage, brand, watermark or wording.
- Re-measure any new reference with `tools/ref_measure.py`.
- The individual moves are written as recipes in `animation-catalogue.md`.

## 1. The taste in one paragraph
Calm, light, confident. Big short type. Real product UI floating on a soft or dark world that changes every scene. Something is always gently moving, but only one thing is the focus. Scenes are short and varied. Every scene hands one thing to the next. It looks expensive because of restraint plus polish: few elements, soft depth, perfect alignment, no jitter.

## 2. Measured rhythm (use as targets, vary around them)
| Measure | LangEase 31.8 s | Teamble 98 s | Rule of thumb |
|---|---|---|---|
| Scenes | 12 | 30 | about one scene per 2.6-3.3 s |
| Median scene | 2.5 s | 2.8 s | aim 2.5-3 s |
| Shortest / longest | 0.7 / 4.5 s | 1.5 / 9 s | a few 1-1.5 s punches, a few 4-6 s showpieces, one long hold at most |
| Nearly still frames | 7% | 6% | see the six-video table: 2-27%. Fast montage films stay near 2-9%, UI-reading films hold up to about 25% |
| Longest still hold | 0.3 s | 1.9 s (the end card) | still holds are for the end card or the hero moment only |
| Hard cuts | 3 | about 16 | mix of hard cuts on a click or beat and soft morph handoffs |
| Loudness | -13.5 LUFS, peak -0.6 dBFS | -12.4 LUFS, peak +1.2 dBFS | target -14 LUFS, true peak -1 dBTP (the references are slightly hot, do not copy the peaks) |
Six-video comparison (all measured by `tools/ref_measure.py`):

| Video | Length | Scenes | Median scene | Nearly still | Loudness (LUFS) |
|---|---|---|---|---|---|
| LangEase | 31.8 s | 12 | 2.5 s | 7% | -13.5 |
| Teamble | 98 s | 30 | 2.8 s | 6% | -12.4 |
| SaaSWAVE (3D) | 26.4 s | 8 | 3.1 s | 9% | -19.6 (quiet) |
| VibeDocX | 59.3 s | 17 | 2.4 s | 2% | -16.6 |
| Motion Swell | 21.1 s | 7 | 2.0 s | 27% | -14.6 |
| Doks.ai | 20.2 s | 7 | 2.8 s | 25% | -16.0 |

Median scene is 2.0-3.1 s in all six. Loudness varies from -12 to -20, so pick -14 and do not copy. Never-dead is a tendency of fast montages, not a law: UI-reading scenes hold longer.
Energy per second swings between about 1 (calm) and 10-14 (a cut or a big move), never flat. That is the "breath" of Section 0a-B.

## 2b. Style families seen (pick one per film, do not mix freely)
1. Light and pastel, frosted cards (LangEase, Teamble light scenes).
2. Dark glow world: near-black navy or green, edge light arc, glass pills (VibeDocX, Doks.ai, Teamble dark scenes). The approved build recipe is in `dark-glow-backgrounds.md`.
3. Bold gradient, big type, big cursor (Motion Swell).
4. Full 3D render: camera through a pastel desk world, object match cuts (SaaSWAVE). Needs Blender (Section 15).
Prompt-bar-to-result is the common AI-product device (4 of 6 films).

## 3. Film shape
Hook line in big type (also introduces the brand), problem in one beat, product shown as floating cards with real states, proof beat (score, metric, quote), payoff, end card (logo, one line, one button, URL). One idea per scene. The end card is the only long still hold.

## 4. Background pairing (Section 0a-F made concrete)
Pair the background with how busy the foreground is. Never the same background two scenes in a row.

| Foreground | Background | Look |
|---|---|---|
| One word or short line of type | B0 flat white or near-black, or B2 saturated brand field | Flat white for calm statements. Deep brand blue or purple for energy. |
| Dense UI card | B1 soft frosted pale gradient, dark tinted near-black, or blurred real footage | The card is the hero. The background stays quiet. |
| Card plus floating pills | B2 pastel mesh (3-4 blurred colour fields, one hue family plus one contrast hue, slow drift, light grain) | Gives depth without competing. |
| Diagram (orbit, list, bars) | B2 pastel mesh or B1 dark with a faint grid | Centre circle uses the brand gradient. |
| Chat or quote stack | B0/B1 dark, brand-tinted near-black | Light cards pop. |

- Dark world recipe: near-black tinted toward the brand hue (not pure black), grid lines at 6% contrast or less, one soft floor glow in the brand colour.
- The mesh light moves with the content: a large soft colour blob drifts slowly behind the focus, and a bright accent blob can sweep across on a handoff.
- Allowed deviation from the no-gradient and no-glow defaults because the background IS the world. One soft light source, no neon, no light-ray washes, no bokeh.
- A brand-tinted footage background also works: real b-roll, blurred and lightened, with the UI card floating over it (LangEase). Use only footage the user owns or has licensed.

## 5. Recurring devices (the signature moves)
- Guide object: one small brand shape (a four-point sparkle) travels along a curved arc as the eye's leader, then shrinks and becomes the next thing (the card content blurs in where it lands). Measured on one morph: grows from a point to full size in about 0.5 s with a decelerating ease-out, holds about 0.1 s, then collapses into the small logo mark in about 0.45 s accelerating, and slides to its position. No overshoot seen.
- Shape becomes logo: the sparkle shrinks into the brand mark, then the wordmark slides in beside it, and the end-card button fades up last.
- Click handoff: the cursor presses a button, and on the click the next scene is the page that button opens. The background flips (pastel to dark or the reverse) on the cut. The new page arrives as a large tilted 3D panel and settles in roughly 0.7 s (spring-like deceleration), then keeps drifting slowly (scrolling or a gentle camera move) instead of stopping.
- Type becomes UI: a typed or word-by-word line (cursor bar blinking, letters stamping in) is what the UI scene then shows; the line's last word becomes the first label of the next scene.
- Scroll list with a focus row: items fade and shrink toward both edges, one row highlighted and scaled, the answer large on the right. The camera or list motion does the focusing, not dimming.
- Orbit: avatars on a thin ring around a gradient centre circle. They enter in sequence, then orbit slowly. Then the avatars fly out into floating answer cards.
- Wave bars: soft vertical bars behind big type, heights following the voice. Low contrast.

## 6. Kinetic type
- One to three words at hero size, centred or deliberately off-centre. Short phrases word by word, each word carried in with the previous word's velocity. Letters can blur-in.
- One accent-coloured word per statement (gradient fill allowed on the accent word only). Supporting words smaller, same family.
- Burned-in captions bottom-centre in a safe margin if the film has speech, never over the card's key text.
- Upright type only. Fonts from the project's pairing (Typography section), not the reference's.

## 7. Floating UI cards
- Real product UI only (CLAUDE.md: no invented screens). Rounded cards, white or frosted, soft short shadow from one light.
- Hero size: the card fills about 60% or more of the frame. Crop or overscale it, place it off-centre, tilt it in 3D at entrance, and let the camera or a slow drift reveal the rest (Section 6b parallax).
- 2-4 secondary pieces at different depths: pills ("score 92/100"), tags, avatars, a toast. They enter after the card and drift at a different rate.
- Show a state change in every UI scene (typing, a row highlighting, a score counting up with `tabular-nums`, a toggle). A static card is a screenshot, not an animation.
- Cursor hand: enters on an arc, slows near the target, presses with a small scale dip (about 0.95), then a ripple or the state change as the answer. Cursor sits on its own layer, above the card.
- Radii are concentric. No nested cards. Group with space.

## 8. Smoothness (reuse, do not reinvent)
Everything follows Section 0a-C and D: 60-80% overlap handoffs, springs for motion, no linear easing, no speed jumps over 35% of peak. Floating pieces drift on slow springs, not loops that restart.

## 9. Matching a reference: measure, then match
1. Run `python3 tools/ref_measure.py <video>` for scene lengths, cuts, energy per second, stillness and loudness. Set the film's targets from it.
2. For the 3-5 moments that matter, capture frames 1/30 s apart and read the size or position per frame (this is how the sparkle morph was measured). Fit duration and curve, write them into the motion profile with the frame numbers.
3. Render a 5 s sample, put it side by side with the reference at the same moments, fix, then apply everywhere. In the log say which values were measured and which assumed.

## 10. Checklist before Gate 3 (score 1-10, aim 8+)
Background varies and fits the foreground. One focus per moment. Every UI scene has a state change. Hero card 60%+. Median scene 2.5-3 s with a few shorter and longer. Never dead (no still frame outside the end card). Type big, short, legible on a phone. Accent colour once per statement. Every handoff carries an object, a word or a velocity. Palette ranges but the brand colour anchors. Loudness -14 LUFS, peak -1 dBTP. Side by side with the reference at matching moments.
