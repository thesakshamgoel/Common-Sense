# MOTION BRIEF
Filled in step by step with the user, following motion-playbook Section 0 (each part agreed visually before the next). The user approves the whole at Gate 1. Ask for missing inputs once. If the user skips one, use its default.

## Inputs
- Product screens: default is to capture them from the real product or repo
- Logo: default is to take it from the user's site or repo
- Brand colours and typeface: default is the product's own
- Delivery place and recommended spec (step 3, confirmed by the user): resolution, fps, aspect, codec, bit depth, chroma, colour space, loudness, duration, loop yes or no
- References (step 4): the user's, or Claude's scored grid, with measured values
- Music (step 5, approved by the user): chosen option (library, made in code, or a mix), tempo (BPM), beat map. Sound effects: Claude's choice, library and code
- Colour worlds (step 6, approved swatches): two to four, each with its 60-30-10, the anchor they share, Adobe Color source
- Backgrounds (step 6, approved PNGs): B0 to B3 as used in this film, gradient stops, light direction, what moves and how, how one morphs into the next
- Effects (step 7, the user's picks only; default none):
- Rejected by the user so far (checked against every new design):

## Direction
- Concept in one line:
- Through-line object (named):
- Look: typeface, accent used only on (the palette lives in the colour worlds above):
- Camera language (one operator for the whole film: lens, mass, follow lag; Playbook Section 6b):
- Motion profile: spring damping per element type, overshoot cap (premium default 5% or less), durations, stagger
- Transition vocabulary (five to eight, same motion language):
- Project bans (added to the default ban list):

## Script (step 8, approved before drawing)
| Section | On screen | Words | Read time (words / 2.5) | Planned hold (1.0-1.5x) | Energy 1-3 | What changes (every 0.3-0.6 s) | Carried to the next (direction, velocity, shape, colour) |
|---|---|---|---|---|---|---|---|

## Variety table (storyboard, Gate 1)
Each section differs from its neighbour on at least three axes. Foreground plus background level is 3 or 4.
| Section | Foreground F1-F3 | Background B0-B3 | Colour world | Scale | Camera move | Layout | Transition in | Length (s) |
|---|---|---|---|---|---|---|---|---|

## Structure (beat map)
| Bar and beat | Frames | Focus (the one thing to look at) | What transforms into what | Camera move | Sound |
|---|---|---|---|---|---|

## Camera plan (Section 6b, one row per section)
Each section starts at the previous section's end pose and velocity.
| Section | Move | Start pose | End pose | Target / look-ahead | Lens (vertical FOV) | Focus plane and blur | Text plane angle at read |
|---|---|---|---|---|---|---|---|

## Build
- Frames computed from time (seek(t)), tokens file, subframe count, render command
- Checks: camera path plot, parallax test (two frames, different shifts), one frame per beat, loop boundary, optical flow for fly-throughs, the Section 0a pre-flight (read-time ratio, velocity jumps, F plus B sum, adjacent repeats, flow map)

## Deviations (guidance broken on purpose)
One line each: what, why, where it shows (storyboard frame or sample), and whether the user approved it.

## Gotchas for this project

## Render capability here
Yes, no, or needs the user's machine:

## What the user sees first
Concept, through-line object, beat map, and stills at named times.
