# tools

`preflight.py` runs the checkable parts of motion-playbook Section 0a. Python 3 standard library only.

```
python3 tools/preflight.py --brief motion-brief.md --tokens tokens.json --frames frames.json
```
Any one input is enough. Add `--strict` to exit 1 when a warning remains.

| Input | Checks |
|---|---|
| `--brief` (the filled-in `templates/motion-brief.md`) | read-time ratio 1.0-1.5, flat energy curve, nothing carried to the next section, foreground plus background level 3 or 4, neighbouring sections differing on 3 of 6 axes, same camera move or transition twice in a row, three equal-length sections, one transition used more than twice in a short film |
| `--tokens` | spring overshoot against the cap (default 5%), opacity or colour overshooting |
| `--frames` | speed jumps over 35% of peak (except listed hits), positions rounded to whole pixels, motion energy dropping below 15% of median, camera stopped at a section boundary |

Every finding is a warning with a reason. The playbook is guidance, so a warning can be waived by writing the reason under Deviations in the brief.

File formats are in the header of `preflight.py`. The frames file comes from the film code: log each tracked element's position per frame.

`examples/` holds a clean sample (0 warnings) and a deliberately flawed one (23 warnings) to confirm the tool works:
```
python3 tools/preflight.py --brief tools/examples/brief-clean.md --frames tools/examples/frames-clean.json
python3 tools/preflight.py --brief tools/examples/brief-flawed.md --tokens tools/examples/tokens.json --frames tools/examples/frames-flawed.json
```
Limits: it checks numbers in tables and logs, not how the piece looks. Stills and the rubric (Section 9) still decide that.

## ref_measure.py
Measures a reference video: scene lengths, cuts, energy per second, stillness, loudness. `python3 tools/ref_measure.py video.mp4 [--thresh 22]`. Needs python3, numpy, ffmpeg. Read-only. Used for `motion/saas-explainer-style.md` Section 9.

## backgrounds/
`backgrounds.js` (12 time-driven canvas backgrounds), `sheet.html`, `render_sheet.py out.png [--t 3]` (contact sheet, needs Playwright and Chrome), `sample-sheet.png`. See `motion/backgrounds.md`.

## backgrounds/motion-studies/
`Motion_Studies.html` (the user's 113-background WebGL gallery, unchanged), `motion-studies-render.html` (copy with `renderFrame(t)` and `?sheet=1`), `render_sheet.py out.png [--t 3]`, `sample-sheet-all.png`. Record one with `threejs-film/record.py ... --query "bg=<slug>"`. See `motion/backgrounds.md`.
