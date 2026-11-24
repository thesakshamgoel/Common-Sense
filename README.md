# Common Sense

A portable workflow: standing rules, a team of four agents, and project templates.

## What is in here
- `CLAUDE.md`  standing rules for every project (your original rules plus reference intake, premium motion research, colour, team workflow, handoffs, hierarchy, working order, folder structures, original-name protection and film pipeline)
- `agents/`  designer (Opus), builder (Sonnet), checker (Opus), delivery (Sonnet)
- `templates/`  `STATUS.md`, `CHANGES.txt`, `CREDITS.md`, `reference-log.md`, `motion-brief.md`
- `motion-playbook.md`  full motion rules (working order, balance and pacing, flow, smoothness, colour range, backgrounds, variety, depth, elasticity, morphing, transitions, camera, eye guidance, build process, product films, Blender). Copy it to the project root next to `CLAUDE.md`.
- `skills-map.md`  how installed skills and the Blender MCP (motion-reel, animation-studio, brainstorming, design-elevation, ui-consistency and others) fit under these rules. Copy to the project root next to `CLAUDE.md`.
- `motion/`  the rest of the motion rules, split by topic (craft, camera, build and render, live UI, product films, Blender). The index is in `motion-playbook.md`.
- `agents-workflow.md`, `reference-research.md`  parts of the standing rules moved out of `CLAUDE.md` and read on demand
- `tools/`  `preflight.py` and test examples
- `film-pipeline.md`  video-only rules, loaded on demand (spec lock, ingest, colour, audio, review rounds, print). Copy to the project root for video projects.
- `reference-notes/`  what was actually seen in each reference, with honest status
- `skills/motion-design/`  LottieFiles motion-design skill, vetted and pinned (see its `SOURCE.md`)
- `*.bak-*`  backups of files before edits (21 and 22 Nov)

## How to use it on a project
1. Copy `CLAUDE.md`, `motion-playbook.md`, the `motion/` folder, `agents-workflow.md`, `reference-research.md`, `film-pipeline.md`, `skills-map.md` and the `tools/` folder into the project root, and copy the four files from `agents/` into the project's `.claude/agents/` folder (create it if needed). Claude only reads them from those places, so pasting the whole "Common Sense" folder as a subfolder will not load anything by itself. The agents are not stored in a `.claude` folder here because the tool used to create this folder is not allowed to write there.
2. Copy the files from `templates/` into the project root when the project starts.
3. For all projects at once, copy the four agent files to `~/.claude/agents/` instead.
4. Optional skill: copy `skills/motion-design` into `~/.claude/skills/` (this folder can't write there). In Terminal: `cp -R "<path to Common Sense>/skills/motion-design" ~/.claude/skills/`
5. Start the project. Claude asks the intake questions and decides with you whether agents are needed.

## Things to know
- Model switching between Opus and Sonnet is automatic only when the roles run as subagents. Otherwise, switch the model yourself when the handoff report says so.
- Seeing links and references: it needs a browser tool (and for video files, a shell with ffmpeg). The designer agent has no `tools:` line, so it inherits every tool the session has, including a browser and a shell. If you want it restricted, add a `tools:` line. Without a browser it marks a reference NOT SEEN and the main session opens it.
- Not tested yet: these agents have not been run in Claude Code. Run a small project first.
- `CLAUDE.md` still points to `~/.claude/skills/tsg-tweaks/` (fonts and the style profile). Those exist only on your machine.
- Only `CLAUDE.md` (about 38 KB) loads every session. Everything else is read on demand: `motion-playbook.md` (about 15 KB, with an index) and the `motion/` files only for motion work, `agents-workflow.md` only when agents are used, `reference-research.md` for motion and animated sites, `film-pipeline.md` for video. A live-UI animation task reads about 9 KB of motion rules, a full product film about 41 KB.
- `tools/preflight.py` checks a filled-in motion brief, a tokens file and a frames file against the Section 0a rules. Python 3, no installs. See `tools/README.md`.
- Your original `CLAUDE.md` and the `agents-v1` folder were not changed.
