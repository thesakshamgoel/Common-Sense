# Film Pipeline (video projects only)

Loaded on demand from CLAUDE.md. Read before any video project.


### Intake spec lock
- Before generating or exporting anything, recommend the spec for the delivery place (resolution, fps, aspect ratio, codec, bit depth, chroma subsampling such as 4:2:2, colour space, loudness, and tempo (BPM) if there is music) with a reason for each, and get the user's yes in the prompt box. Confirm again for each new generation or export. Never lock a spec without that yes.
- Once answered, the spec is fixed for that item. Changes follow the Change Requests rule.

### Ingest and backup
- Camera originals are never edited, renamed or moved.
- Before copying, checksum verification or extra backup copies, tell the user how much storage it needs and ask. Never do it silently.
- If approved: copy into `01 Rushes/YYYY-MM-DD/Scene-NN`, verify checksums, keep a shot log.

### Colour pipeline
- Record per project: source colour space and gamma, LUTs, timeline colour space, output space for each delivery. Grade non-destructively. Originals stay untouched.

### DaVinci Resolve (when the Resolve MCP is connected)
Tools (descriptions read 2026-11-23, none run yet): status check, run a script in a sandbox with the Resolve scripting API (`run_script`), the same with full system access (`run_script_unsafe`), scripting API docs and search, generate a .cube LUT, list and delete LUTs and DCTLs, launch Resolve.
Good uses: create bins that match `01 Rushes` to `07 Exports`, set up render queue jobs from the confirmed delivery spec, read and write shot metadata and logs, generate a LUT from a stated transform.
- Check status first. If Resolve is not reachable, say so and stop that path.
- Use `run_script` (sandboxed). Use `run_script_unsafe` only when the step needs the file system, network or ffmpeg, and tell the user why before running it.
- Before any scripted change to a project, export a backup copy of the project (.drp) beside it, and note its name in `CHANGES.txt`. Never touch grades, nodes, timelines or media pool items the user made without asking. Add new work in new timelines, bins or versions.
- Camera originals are never relinked, renamed or moved by a script.
- LUTs are written into Resolve's `MCP` LUT subfolder (a system folder, outside the connected folders). Name them with a version (`name_v2.cube`), and record the transform in the project notes. Deleting a LUT or DCTL only when the user asks.
- Read the scripting API docs through the tool for the installed Resolve version. Do not write calls from memory.
- Renders, exports and deliveries follow the confirmed spec. Verify the output file afterwards (duration, fps, resolution, codec, audio).

### Audio
- Loudness is part of the recommended spec: propose a target for the platform and get a yes. Never assume it silently.
- Music is approved by the user before the build (motion-playbook Section 0, step 5): propose two or three options from the connected library (for example Epidemic Sound), composed in code (Web Audio API, rendered to WAV: a kick on every beat, a riser into the last full bar, a hit on each change), or a mix of both.
- Sound effects are Claude's choice: mix library sounds with sounds made in code, one per on-screen action.
- Track given: analyse its beat grid (for example with numpy) and start on a downbeat. Place each UI sound (click, key tap, whoosh) on its measured peak, one frame after its visual.
- Royalty-free tracks only. Check the licence on the item page, not just the search listing, and list it in `CREDITS` with the track ID. For the connected Epidemic Sound library, check that the user's plan terms cover the delivery place (a channel, a client, an ad) before the build, and say so if you cannot tell.
- Loudness options to recommend from: -14 LUFS integrated with a -1 dBTP ceiling for YouTube and normalised platforms, about -12 to -11 for feeds.
- Claude cannot hear the result, so measure it: loudness and peak per section and per stem, and a spectrogram to confirm the structure. Fix balance from the numbers: voices on top, hits clear, silences truly silent.
- Sync is measured, not judged: at every listed hit the sound is within about 20 ms and the picture within one frame. A hit that cannot be told apart from its neighbour fails. Fix it with a sharper sound, a cut or a flash, or a beat of silence before it. Do not nudge one side by hand.
- A music track supplied by the user: only if they have the rights.
- Deliver with the honest line that audio was verified by measurement, not by listening, and invite feedback on the sound. Ask the user to listen to the sample's sound at Gate 2, before the full build.
- Lossy codecs add true-peak overshoot (AAC added about +2.8 dB in one test): master the PCM mix to the target ceiling, leave about -2 dBTP before a lossy encode, and measure the encoded file, not the WAV.
- Check sync against picture before delivery.

### Preview and final checks
- A live preview with music: run it in the background on an OS-assigned port and give the user the link. Stop only the process you started. Never touch other ports or other sessions' renders.
- A draft render at half resolution is allowed for review. The full render happens once.
- After the final: probe each file (duration, fps, pixel format, audio present) and pull one frame from the encoded file.

### Review rounds
- Number rounds (R1, R2). Notes are timestamped, and each is answered in the next version and logged in `CHANGES.txt`.

### Print and poster
- Ask for size, bleed, resolution, colour mode (RGB or CMYK) and safe margins before designing. Fonts included or outlined. Zoomed-in check before export.

