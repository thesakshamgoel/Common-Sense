# Skills Map (how installed skills fit under Common Sense)

Loaded on demand from CLAUDE.md. Read when a task could use an installed skill.
Rule: Common Sense ranks above every skill (Hierarchy item 5). A skill supplies methods and tools. It never overrides the gates, the ask rules, the ban lists or the project's design files. Where a skill and this folder disagree, follow this folder and say so in one line.

Status: Read in full on 2026-11-22: motion-reel, animation-studio, brainstorming, design-elevation. Read in full on 2026-11-23: video-making, the Remotion router and markup guide, interaction-design. Tool descriptions only (no calls made except one Blender read): DaVinci Resolve, Figma motion and export, HyperFrames. The ui-consistency rules were read from the session notice, not from the skill files. Everything marked "not read" is mapped from its one-line description only.

## Use as the engine for rendered video
Skill defaults for colour, background and pacing lose to Playbook Section 0a.
**motion-reel** (product and showreel films, music and lyric videos). Use for product, launch and showreel films, social cuts, lyric videos. Needs node 18+, ffmpeg, uv, Playwright and Chromium in the project folder. Check them first and say plainly what is missing.
- Keeps: its pipeline (gather real assets from the URL, style guide from a reference, beat grid, shot list, build, critique loop, render, mix). It matches Playbook Sections 12 and 13 and Gate 1.
- Perspective camera: motion-reel can scaffold 3-D sets (`--3d`, its `lib/gl.js` and `references/3d.md`, which I have not read in full). Use them for a true perspective camera. For flat 2D films, Playbook Section 6b's layered perspective applies.
- The shot list is the Gate 1 storyboard. Stop and wait for the user's yes before building, exactly as the skill says.
- Override: its default of "ask in one AskUserQuestion round with defaults" becomes the recommend-and-confirm spec in Playbook Section 0 step 3. Loudness is part of that spec and needs the user's yes.
- Override: its "3 rounds minimum, stop at 8+" stays, and the checker scores it (Playbook Section 9).
- Override: any font, colour or italic default loses to the project's design system and the no-italics rule.

**animation-studio** (hand-drawn 2D films with the score synthesized in code, one timeline for sound and picture). Use for cartoon, character, story, birthday, lyric and explainer films where the hand-drawn look is wanted. Do not use it for product UI films (use motion-reel).
- Keeps: story shapes (Playbook Section 14), the single-source-of-truth timeline, measured audio, sync verification.
- Override: its "silence and a drop" is a tool for real suspense only. Its default paper style is a choice for the motion profile, not a default.
- Never kill processes it did not start. Ports are OS-assigned.

**remotion:\*** (router and markup guide read; the other reference files not). Common Sense already prefers Remotion for programmatic video. Use `remotion-best-practices` as the router. If a project is already Remotion, motion-reel is not used on top of it. Rules are in Playbook Section 16. Its Google Fonts loader loses to self-hosted fonts, except for a rendered video with a checked licence.

**anthropic-skills:video-making** (read). Render habits (one full render, scene files joined without re-encoding, temporary names, re-render only what changed) are in Playbook Section 13. Its 30 fps default loses to the confirmed spec.

**DaVinci Resolve MCP** (tools). Rules are in `film-pipeline.md`. Use the sandboxed script tool, back up the project first, never touch the user's grades.

**Figma tools.** `get_motion_context` reads real keyframes and easing, `export_video` renders a frame's animation to MP4 (Playbook Section 17). The Figma skills (not read) apply when writing into a Figma file.

**HyperFrames (HeyGen)** (tools). Allowed as an engine alongside Remotion (user said so on 2026-11-24); choose per project with a one-line reason (build.md Section 16). Local route: `npx skills add heygen-com/hyperframes`, files stay on the machine. Hosted MCP route: assets and prompts go to a third party, so tell the user first; its compose and render tools are disabled from CLI and IDE agents according to its own notes. Its house styles still fight the colour-range and background rules, so do not accept them unchanged.

**Canva skills** (not read). For static designs and social resizing, not for motion. Skip for films.

**Blender MCP** (tools, not a skill; connection confirmed 2026-11-22 with one read-only call that returned a default scene). Rules are in `motion-playbook.md` Section 15. Use it only for 3D work the user asks for, or when the designer's brief calls for 3D and the user agreed. Its tool schemas load on demand through tool search.

## Process skills
**superpowers:brainstorming.** Its hard gate (no building before the design doc is approved) matches Gates 1 and 2. Use it only for an open or undefined creative brief where the "what and why" is unclear.
- Keeps: look at the project first; one open question about the why; play the design back in chunks; lay out 2-3 approaches in a message of their own with a recommendation (merged into Working Order step 2); a fresh reader checks the design doc once before the user sees it (the checker agent does this).
- Override: do not invoke `superpowers:writing-plans` afterwards. The designer writes the build order, the Working Order replaces its chain. The design doc goes where the project's folder structure says, not `docs/superpowers/specs`.
- Override: its "offer to just dive in" is allowed only if the user already said so. Otherwise the gates stand.
- Skip it for clear requests and small edits.

**superpowers (other skills)** (not read): `verification-before-completion` and `systematic-debugging` fit the checker and builder. They do not change the Working Order. Skip `using-superpowers` as a boot step.

## UI skills
**ui-consistency:\*** Use when changing or adding pages in an existing project: finding-patterns, then planning, implementing, verifying. Small change on one page: adjusting, implementing, verifying. It makes new pages come out the way the project's other pages already do.
- It does not apply to a new project with no pages yet, or to a new design system. There Design System First wins.
- Keep its check: a separate agent verifies pages against the checklist. This is the checker's job.
- If the user says a page came out wrong, offer once to draft the issue report it describes. The user posts it, never Claude.

**design-skills:design-elevation.** Use ideas only. Keep: no pure black or pure white (use a near-neutral), `tabular-nums` on numbers, tight tracking on large display text, a data chart's title states the finding, direct labels instead of legends, gray out non-essential series, one accent, 60-30-10 (already a rule).
- Override: the Tailwind-only token rule. The project's own design system is the source. Use Tailwind scales only when the project already uses Tailwind.
- Override: Inter as the sans (avoid unless the brand uses it); `transition-all` (animate only the named properties, transform and opacity for live UI); "silent execution" (the design system is signed off, not hidden); the IBM, Shopify, Adobe and Salesforce overrides apply only if the user names that system.

**design-skills:interaction-design** (read). Its state inventory, microinteraction spec, feedback and responsiveness rules are in Playbook Section 11a, its peak-end idea in Section 0a-B. Its 300 ms guidance is a guideline.

**design-skills (others), frontend-design, 21st-ui, playground, image-generation, dataviz, accessibility** (not read). Two look promising and are worth reading before use: `playground` (tune spring and duration values live, then copy them) and the Three.js viewer tools (preview a 3D camera path inline). Use by description when the task fits, under the same precedence. `design-skills:accessibility-audit` and `design:accessibility-review` can back the checker's accessibility pass. Component libraries from 21st must pass the licence check and the no-decorative-gradient rule before use.

## Order for a rendered video project
1. Playbook Section 0, steps 1-9: input, questions, spec confirmed, references, music approved, colour worlds and backgrounds, effects picked, script, storyboard with the variety table. The designer records them in `templates/motion-brief.md`. Gate 1 (the skill's shot list is the storyboard). 2. Sample with sound: motion-reel or animation-studio builds it and runs its critique loop. Gate 2. 3. Build the rest. 4. Checker: Playbook Section 9, Section 13 and the Section 0a checks. 5. Gate 3.
