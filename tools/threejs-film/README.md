# threejs-film tools
Tested on a small Three.js scene (2 s draft, determinism hash check). Not yet used on a real ad.

- `skeleton.html`: single-page starting point with `window.renderFrame(t)`, seeded RNG, easing, audio-levels lookup, play button. Copy it as `index.html` next to `three.module.js` and `three.core.js` (from `npm i three`, `node_modules/three/build/`), `levels.json` and `music.mp3`.
- `analyse_audio.py music.mp3 levels.json [--fps 30] [--duration 15]`: per-frame levels and approximate onsets. Needs numpy and ffmpeg.
- `record.py index.html out.mp4 [--audio music.mp3] [--duration 15] [--fps 30] [--size 1920x1080] [--draft]`: frame-by-frame recording with mux. Needs playwright (python), Chrome or Chromium, ffmpeg.

Run notes: pages that fetch files need a server (`record.py` starts one on a free port; for preview use `python3 -m http.server 0` inside the folder and open the printed port). Rules: `motion/threejs-film.md`.
