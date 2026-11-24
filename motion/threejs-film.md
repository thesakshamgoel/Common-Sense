# Three.js film rules (learned from the YUZU SPARK product-ad brief, 2026-11-23)

Read this when the film is built in Three.js (or any WebGL scene) and recorded frame by frame to MP4. Use with `build.md` (render habits) and `camera.md` (Section 6b). Guidance, not law: change any rule with a one-line reason shown at the storyboard or sample, logged under Deviations.

Status: the harness in `tools/threejs-film/` was tested on a small cube scene (record, mux, determinism check). The YUZU SPARK ad itself has NOT been built: the project assets were not available in this session.

## 1. Working inside a supplied project folder
- Make one subfolder named after the tool (Claude, Gemini, GPT) and put every file you create there. Never modify, move or delete anything else in the folder.
- If the brief says "ignore X, use Y" (for example `label.png` and `Sunny Strums.mp3` ignored, `label_seamless.png` and `music.mp3` used), use only Y, say so in the report, and never open X for the build.
- Read the brief into a spec lock before building: size, fps, duration, output format, audio, file name, where the output goes. Repeat it back in one line. Build to the lock.
- Deliverables checklist from the brief: the single HTML file, the MP4 with music, a short run note (how to run a local server if needed). Name each in the final report.

## 2. Determinism (the core rule)
- The whole film is a pure function of one time value `t` in seconds. `window.renderFrame(t)` draws exactly the frame for `t`, synchronously, and calling it in any order gives the same pixels (tested: same hash after rendering other times).
- No `Math.random`, `Date.now`, `performance.now`, `requestAnimationFrame` accumulation, clocks or state carried between frames. Seed one `mulberry32` and build all random layouts up front.
- Particles, bubbles and fizz are closed-form: position = f(seed, t), for example `y = y0 + speed*(t - t0) mod height`. No stepping a simulation frame to frame.
- Springs and overshoot are closed-form in `t` (damped cosine), not integrated.
- Wait for assets (`window.filmReady` promise) before the first frame. Textures, fonts and the levels file are loaded once.

## 3. Audio-reactive without live audio
- Decode the music once offline (`tools/threejs-film/analyse_audio.py music.mp3 levels.json --fps 30 --duration 15`) and look up levels by `t`: `level('bass', t)`. Never use an `AnalyserNode` in the render path, because frame-by-frame recording has no live audio.
- The levels file holds per-frame `rms`, `bass`, `mid`, `high`, `flux` (0-1) and approximate onset times. The onsets are not a tempo grid: look at them, then fix the real beat times by hand in the film's timeline when the track has a clear tempo.
- Drive: bass to scale pulses and bubble bursts, flux or onsets to cuts and snaps, high to sparkle. Keep reactions small (10-20% scale, not 100%) and smooth them with a short attack and a longer release looked up from the same table.
- Put cuts and big moves on onsets. Check by rendering stills at each onset and at the frame before.

## 4. Preview and files
- A Play button starts the music and draws frames from the audio clock (`audio.currentTime`), so preview is in sync. Hide it when recording (`?w=&h=` in the URL puts the page in record mode).
- One HTML file: inline the Three.js module and assets as data URIs when the file stays under a sensible size, otherwise keep `three.module.js` and textures beside it and write the run note (for example `python3 -m http.server 0`, open the printed port). Say which you chose.
- `tools/threejs-film/skeleton.html` is the starting point: seeded RNG, easing, levels lookup, camera as a function of t, play button.

## 5. Motion-design look in Three.js ("Cinema 4D" feel)
- Studio light, not live-action: `RoomEnvironment` through PMREM for clean reflections, one key light, one soft rim, a bright gradient backdrop (a large gradient plane or a background texture). Soft shadows from one light.
- Materials: `MeshPhysicalMaterial` with clearcoat for glossy plastic and metal, `transmission` and `ior` for ice and glass (needs the transmission render pass, so budget the render time), sRGB colour space on every colour texture, anisotropy 8-16 on labels.
- Product label: wrap a seamless texture on a cylinder or lathe profile with `RepeatWrapping` in U, set the seam away from the camera, and keep metal rims and pull-tab as separate meshes.
- Extruded type: `ExtrudeGeometry` from font shapes (bevel on, small bevel segments), bevel size 2-4% of the cap height, front face in the brand colour and sides darker. Animate letters with staggered springs (scale, rotate, z) from one parent group.
- Arrays and cloners: `InstancedMesh` with per-instance offset by index (stagger = index * delay), formations as closed-form functions (grid, ring, wave). Effector-style motion: one function of (index, t).
- Camera: a perspective camera moved on eased paths (`inOutCubic` or a critically damped spring) with look-ahead; one operator per film (Section 6b). Slight FOV change (26-40 degrees), dolly instead of scale-zoom, depth of field only if the cost fits.
- Snappy transitions: overshoot springs (5% premium default), whip pans with real blur or a clean wipe shape, matched hand-offs where an object carries the cut (see the animation catalogue).

## 6. Recording and checks
- `python3 tools/threejs-film/record.py index.html out.mp4 --audio music.mp3 --duration 15 --fps 30 --size 1920x1080`. It serves the folder on an OS-assigned port, renders every frame through `renderFrame`, pipes frames into ffmpeg (no PNG folder) and muxes the audio with a short fade-out.
- Software WebGL in headless Chrome is slow at 1080p (transmission, shadows and many instances add up): time a 2 s draft (`--draft` halves the size) before the full run, run the full render in the background with an ETA.
- Verify the file, do not assume: duration, frame count (15 s x 30 = 450), resolution, audio present, audio level; then view frames at every beat, scene change and the end frame at full size. Report what was checked.
- Check the lockup: end-frame text is sharp, inside safe margins, and the tagline is spelled as the brief gives it.
- Never claim sync was verified by listening. Say that sync comes from the precomputed levels and onset times and was checked by stills at those times.
