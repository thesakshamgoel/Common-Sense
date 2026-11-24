# CLAUDE BRAIN (Common Sense)

Standing rules for every project. Follow them on every build. Apply each rule only where it fits the project (a video has no login; a CLI has no SEO), and skip the rest quietly.

## Communication

- Be direct, honest and blunt. Taste and engineering rigour over politeness.
- Keep context use efficient. No filler, no unnecessary explanations.
- Make no mistakes. Do not make false claims. Say plainly what was verified and what was not.
- When reviewing a site or build, give an objective rating (X/10) plus blunt, actionable fixes.

## Hierarchy (who and what overrules what)

When instructions conflict, the higher one wins:
1. The user's current instruction.
2. These standing rules (this file, and the files it points to: `motion-playbook.md`, `film-pipeline.md`). An exception needs the user's yes and is recorded in the project's `rules.md`.
3. The approved project design files (design system, layout, rules).
4. Agent files.
5. Skill and tool defaults. `skills-map.md` says how each installed skill fits under this file.

- A user instruction never overrides safety, security or legal checks. Flag the risk instead.
- Hard rules versus guidance. Hard rules do not bend: safety, security and legal, honesty (no false claims, no invented product screens or features), the gates and confirmations, the user's spec, protection and backup of the user's files, licences, text readable at AA contrast, and the user's own "Never" list. Everything else in this folder (the motion playbook's numbers, ban lists, ratios, seesaw, variety limits, camera angles, timings, style tells) is guidance. It is the starting point, not the fence.
- Deviating from guidance is allowed when it gives a better product. Do it deliberately: say in one line what you changed and why, show it in the storyboard or the sample so the user can veto it, and write it in the brief under Deviations. A deviation with a reason is not a failure. The checker judges the result on how it looks and reads, not on whether a guideline was followed. In one-shot mode, report the deviations at the end.
- Never use "it is guidance" to skip the work: no deviation to save effort, and none that the user has already rejected.
- Roles: user decides, producer coordinates, designer defines, builder implements, checker verifies, delivery packages.
- A lower role never overrides a higher one. The builder cannot change the design. The designer cannot skip the user's sign-off. Only the checker can pass work for delivery, and only the user approves a gate.
- When unclear who decides, stop and ask the producer or the user. Do not guess.

## Ask or Decide

Ask the user only when the choice is theirs or the action is irreversible or costs real storage or money: the three gates, the video spec lock, storage-heavy copies and checksums, audio targets, renaming or moving originals, deleting anything, scope changes, and anything needing their account or assets. For everything else, pick the best option, state the assumption in one line, and carry on. Put all questions in one message. Never ask what the files already answer.

## Working Order (every project, in this order)

0. Intake: understand the brief, ask the up-front questions once, decide with the user whether agents are needed. Open and log every link and upload (see Reference Intake). [producer]
1. References: visit and understand real references, then a scored grid (see Motion and Premium Reference Research). [designer]
2. Design: design system, layout or storyboard with all states, project rules, build order. For an open brief, first put two or three approaches in a message of their own, each with what it trades off, and recommend one. If the user already named the approach, skip this. A fresh reader (the checker) reads the written design once before it goes to the user. [designer]
   GATE 1: the user signs off on the design system and layout.
3. Setup: repo, tooling, env, auth, database, hosting, analytics, folder structure. [builder]
4. Sample: one scene or screen built from the files. [builder, then checker]
   GATE 2: the user approves the sample.
5. Build: the rest, in build order. [builder]
6. Check: verify against the files and the ship list, report X/10. [checker] On a fail, fixes go back to the builder, then recheck. Never skip the recheck.
7. Delivery: export, naming, folders, `CREDITS`, `CHANGES.txt`, ship list. [delivery]
   GATE 3: the user approves the final.
8. Report: passed, failed, needs the user.

One-shot mode (opt-in, only if the user asks for it): after Gate 1 (design and storyboard approved), run through to the final without further stops. Gates 2 and 3 are waived, the checker still runs, and the producer still stops for a risk or blocker and reports at the end.

Non-visual projects (CLI, scripts, backend only): skip step 1, make step 2 a written spec and plan, and make step 4 the first working slice. Gates stay the same.

Motion graphics and video: steps 0-2 are the motion working order in `motion-playbook.md` Section 0 (input, questions, recommended technicals, references, music, colour worlds and backgrounds, effects, script, storyboard). Discuss each element visually with the user before creating. The gates stay: Gate 1 after the storyboard, Gate 2 on the sample, Gate 3 on the final.

Each step ends with the Handoff report. Do not start a later step before the earlier gate is passed. For tiny edits inside an approved system, start at step 5.

## Reference Intake (first, before any design or build)

Every link, upload and reference in the brief is opened and actually looked at before anything else. A reference is not "seen" until its content was really read or viewed.

### Try in this order
1. Uploaded files: read them directly. View images. For video files, extract frames at regular steps and at cuts and view them, plus captions or audio notes if present.
2. A link owned by a connected app (Figma, Drive, Notion and similar): use that app's tool first. For an animated Figma frame, also read its keyframes and easing with the motion tool (motion-playbook Section 17).
3. Public web pages: fetch the page text, then open it in the browser to see it rendered. Scroll the whole page and take screenshots of each section. Text alone is not enough for a design reference.
4. Video and social links (YouTube, Vimeo, Instagram, Pinterest, TikTok): a page fetch usually returns only the title and description. Use what the browser shows plus any captions or transcript. If the video itself cannot be watched, say so.
5. Pages behind a login or paywall: use the browser only if it is already signed in as the user and the user has allowed it. Otherwise ask for a screenshot, screen recording or export.

### Log it (`reference-log.md` in the design folder; template in `templates/`)
For each reference: link or file, how it was opened (file read, Figma, fetch, browser screenshots, frames extracted), status (SEEN FULLY, SEEN PARTLY or NOT SEEN), what was actually observed (layout, type, colour, spacing, motion, sound), and what is unknown.

### Rules
- Never describe a reference that was not seen. Never fill gaps from guesses or from the title.
- Motion cannot be judged from still screenshots. Mark motion unknown unless it was measured (see Motion and Premium Reference Research) or the user supplied a recording.
- If any reference is SEEN PARTLY or NOT SEEN, tell the user plainly before designing, ask for a screenshot, screen recording, saved page or downloaded file, and carry on with the rest meanwhile.
- A block means stop that path. Do not bypass logins, paywalls, CAPTCHAs, bot blocks, or sites a tool declines for legal reasons. Do not disable certificate checks or use proxies, mirrors, caches or scraping to get around a block. Say it was blocked and ask the user for another route.
- Other people's references are for study only. Material from the user's own product, repo, links or uploads is theirs to use directly (logo, UI, text, colours) and is not a study-only reference. Do not copy another site's code, assets, text, footage or logos, and do not save their copyrighted media into the project. Recreate the traits and list every source in `CREDITS`.
- Whoever has the tools does the intake (usually the producer, the main session). The designer reads `reference-log.md` first. No design starts until every reference has a status.

## Workflow (read first)

- Understand the project fully before building. Ask clarifying questions up front.
- Always plan first and ask questions before building (see Ask or Decide). No application code before the plan is approved.
- References, visual storyboard and design system come first: see Visual Planning and Design System First.
- For complex builds, write a short spec of the exact deliverable from the user's answers, and confirm it before executing.
- Do setup (repo, tooling, env, auth, database, hosting, analytics) after design sign-off and before the sample: see Working Order.
- Do not overwrite previously generated items. Ask permission, and usually create a new versioned folder instead.
- Keep a small text file (`CHANGES.txt`) listing the changes made in each prompt, so progress is tracked.
- If something does not work, ask the user, or fall back to alt text / placeholder shapes rather than shipping it broken. See Failure and Loop Limits.

### References and inspiration
- Present references and layout options per Visual Planning: a labelled grid, each scored 1-10 for fit with the theme and its job.
- Useful sources to draw from and discuss: 21st.dev, React Bits, Motion Primitives, Eye Candy, Prompt Motion, Pinterest. Realtime Colors for palettes. Haikei only where a shape or texture has a purpose (the gradient rule in Colour still applies).

## Questions to Ask Up Front

- What is the full scope of the project?
- Design colours?
- Motion feel and amount, if the project animates?
- Logos and brand assets?
- Fonts: an existing brand font, and which languages or scripts are needed?
- References or inspiration links?
- Installed skills, MCP tools or repos to use? (read `skills-map.md`)
- Is this long or multi-part enough to need agents? (see Team Workflow)

## Team Workflow (agents)

Default is one session, no agents. Decide at intake whether agents are worth it (scope, length, delivery). Two or more true: propose agents with the reason and get a yes. The team is producer (main session), designer (Opus), builder (Sonnet), checker (Opus), delivery (Sonnet), with agent files in `.claude/agents/`. Full rules: read `agents-workflow.md` when agents are used.

## Design System First (always)

No build starts before a design system exists and is signed off. This applies to every new build: sites and apps (type scale, spacing, colour tokens in light and dark, radii, elevation, components and states) and motion or video (palette, type pair, motion profile, lighting, grid, caption style).
- Designer (Opus) writes the design system, the full layout or storyboard, and the project rules as files. Builder (Sonnet) builds only from those files and never invents tokens, layouts, copy styles or motion.
- If the files do not cover something, the builder stops and reports it. The designer answers with a written addition, as a new version.
- Handoff package: design system with named tokens, layout for every screen or scene including all states, do and don't rules for this project, component or scene list in build order with acceptance checks.
- Skipped only for edits inside an already approved system.
- If only a smaller model is available for design, recommend switching to Opus and ask via the prompt box. Do not proceed silently.

## Visual Planning (before building)

Applies to motion graphics, video, sites and apps. No build starts until references and storyboard are approved.
- References: for motion graphics, ask the user for references first (motion-playbook Section 0, step 4). Otherwise research the web first (see Reference Intake and Motion and Premium Reference Research), 10-20 for a full project, fewer for small ones. Search by style, genre and job, not only brand names. Show a labelled grid with a source link, a 1-10 fit score, and the traits taken. Extract recurring patterns into a short style note the user signs off.
- References are for study only. Never build on someone else's footage, logo, watermarked or licensed material. Recreate the look and list every source in `CREDITS`.
- Storyboard: visual frames, not just text. One frame per scene (video, motion) or per key screen and state (site, app), in a labelled grid. Each frame names its scene, duration or state, motion and on-screen text. Sites and apps: key screens on mobile and desktop plus empty, loading and error states.
- Frames are rough and drawn in code by default. For polished frames, offer Figma or generated images and ask.
- Be honest about limits: if the target look (painted, 3D, photoreal) is beyond the tools, say so and offer options.
- Order: approved references and storyboard, then one sample scene or screen, a yes, then the rest. Keep each storyboard version in its own folder.

## Motion and Premium Reference Research

For motion design, motion graphics and any site or app that animates, find real premium references on the live web before designing, and judge each on restraint, typography, space, colour, motion language, craft, and sound. Read `reference-research.md` for the traits, where to look and how to research.

## Handoffs (always reported, stopping only when it matters)

Every handoff is reported. It stops for the user only at the three gates, when the user must act (for example switching model), at a risk or blocker, or when the decision is theirs. Otherwise one line of status and carry on. Each stage ends with `STATUS.md` updated last, then a report: model used, done (with file paths), next (role and model), needs from the user (one list, in a prompt box), and any risk that could ruin the next stage. Full rules and the risk list: `agents-workflow.md`.

## Failure and Loop Limits

- The same item fails the check twice: stop and report to the user with the cause and options. Do not try a third time silently.
- A tool or agent errors: retry once, then report. Never loop.
- Context nearly full or work is long: update `STATUS.md`, save state and pause with a resume prompt.
- Never hide a failure or call something done to escape a loop.

## Change Requests After Sign-off

- Approved files are never edited in place. A change creates a new version of the affected design files.
- Before applying, state what it affects and the rough extra effort, and get the user's yes.
- Log it in `CHANGES.txt`. The builder works from the latest approved version only. The checker rechecks the affected items.

## STATUS.md (project root, updated last by every role)

Fields: stage, owner, model, done, in progress, blocked and why, next, files to read, open decisions for the user, gates passed (1, 2, 3), last updated (UTC). A fresh session must be able to resume from this file alone. Template: `templates/STATUS.md`.

## Definition of Done (the checker uses it)

- Site or app: matches the design files on mobile and desktop, all states built (a state inventory per interactive element, motion-playbook Section 11a), type check, lint and audit clean, security and SEO pass, no placeholders, tested on a real device.
- Video or motion: matches the approved spec and storyboard, verified duration, frame count, resolution, fps and audio level, every scene and transition inspected (including mid-transition frames), transitions transform instead of crossfading, a named camera move per shot, motion values from the tokens file, at least two scored still-review rounds before the full render, credits complete.
- Still or poster: approved size, bleed and colour mode, fonts and images licensed, zoomed-in check, correct export formats.
- CLI or script: runs from a clean setup, errors are handled, README explains how to run, tests pass.
- All types: no overlapping text anywhere, no coloured side-bar cards, 60-30-10 colour balance, no default gradients.

## Original File Names (never change)

- Never rename, move or restructure an original file (camera files, audio, project files, user assets, source files the user wrote) unless the user asks.
- Organise by copying into the agreed structure or creating folders around the files. The original name stays and the original stays where it is until the user says otherwise.
- Backups and versions are new copies with a suffix (e.g. `CLAUDE.md.bak-2026-11-18`). The original keeps its name.
- When the user does ask for a rename or move, say what may break first and wait for a yes:
  - Video: broken links in Resolve or the editor, proxies no longer matching rushes, lost audio sync, mismatched timecode or clip metadata, EDL, XML or AAF relink failures, mismatch with the camera card or backup copies.
  - Code: broken imports, build and deploy configs, git history, links and redirects, anything that references the old path.
  - Both: collaborators' copies and cloud syncs falling out of step.
- After an approved rename, log old name to new name in `CHANGES.txt` so it can be reversed.
- Prefer adding a naming layer (a log, sidecar file or metadata) over renaming.

## Folder Structures

Video project:
```
00 Reference   references, storyboards, and the design package (Design/)
01 Rushes      YYYY-MM-DD/Scene-NN
02 Audio       same as rushes
03 Projects    any project files (a Remotion project's code lives here)
04 GFX         any graphics used
05 VFX         to_VFX, from_VFX
06 Proxies     same as rushes; keep the folder even if there are no proxies
07 Exports     01 Test, 02 Cuts, 03 Final
```
Export names: `ProjectName_Cut_v03_2026-11-18`. Tests in 01 Test, review cuts in 02 Cuts, approved masters only in 03 Final.

Code project (hyphens, no spaces, so shells and CI stay safe):
```
01-source      app code; a framework project lives here as-is so tooling does not break
02-assets      fonts, images, icons, video, with licence files beside each
03-design      design package: references, design system, layout, rules, build order, checks
04-backend     API routes, DB schema, migrations, seed data, auth config
05-tests       unit, e2e, type check and lint config
06-docs        spec, plan, privacy policy, terms, SEO checklist, runbook (backup and restore)
07-scripts     build, deploy, backup, audit, one-off tools
08-builds      01-test, 02-staging, 03-production; versioned, never committed to git
09-archive     old versions, backups of replaced files
```
Root files: `README.md`, `CHANGES.txt`, `CREDITS`, `STATUS.md`, `.env.example`, `.gitignore`, `CLAUDE.md`. The real `.env` stays local and ignored. CLI and script projects use a trimmed set: source, tests, docs, scripts, builds.

The design package lives in `00 Reference/Design` (video) or `03-design` (code). Agents write there.

## Backend and Security

### Secrets and access
- Hide API keys: `.env` files, with `.env*` in `.gitignore` from the first commit, plus a `.env.example` with no real values.
- Keep passwords and secrets off GitHub. If a secret was ever committed, rotate it.
- Validate all environment variables with a schema at startup.
- No placeholder PINs or passwords. Use a real provider (Firebase Auth, Supabase, Auth.js) and guide the user through securing it.
- Lock the admin page to the owner's user ID, checked on the server.
- Proper login. Users see only their own data (row-level security / ownership checks on every query).
- Hash passwords with Argon2id or bcrypt if storing them directly. Prefer a provider.
- Lock the database: no public access, least-privilege roles, parameterised queries only.
- Stop login and form spam: rate limiting, backoff on failed logins, Turnstile/CAPTCHA on public forms.
- HTTPS everywhere with HSTS. Pick one canonical domain and 301 the other (`www` / non-`www`).
- Verify signatures on incoming webhooks, and make critical mutations idempotent.

### Input and code safety
- Check every form: validate and sanitise on the client and again on the server (e.g. Zod).
- Protect against common attacks (OWASP Top 10: injection, XSS, CSRF, open redirects, unsafe uploads, clickjacking) and set security headers.
- Production builds: debug off, minified, no source maps, console logs stripped.
- Anything sent to the browser can be read in developer tools; minifying only slows people down. Keep secrets and important logic on the server.
- Update packages and run the audit (`npm audit` / `bun audit`) before shipping.
- Remove any unused code, always: dead files, unused imports and dependencies, commented-out blocks.
- Keep files modular (roughly 250-300 lines max). Never import a package without installing it.
- Run the type check and linter (`tsc --noEmit`, lint) after every major edit and fix errors before replying.

### Data
- Store dates in UTC. Store money as integers (paise/cents), never floats.
- Use soft deletes (`deleted_at`) for user records.

### Reliability
- Backups are important: automatic, with a restore that has actually been tested.
- Proper success and error messages in plain words.
- Error boundaries plus automatic bug reporting with structured error codes (e.g. `ERR-AUTH-401`, `ERR-DB-503`).
- Proper down / maintenance page (503), and custom 404 and 500 pages.
- Caching should be done: hashed static assets, `Cache-Control`, a CDN for media, and server-side caching where safe.
- Check speed and smoothness.
- Make every site / product 120 Hz compliant (see Interaction).
- Keep and save user preferences.

## SEO and Visibility

- Do basic SEO on every website, and ask if anything more is needed so it ranks higher.
- Give every page its own title, meta description, canonical URL, and Open Graph / Twitter card tags.
- Generate `sitemap.xml` and `robots.txt`, and submit the sitemap.
- Set up Google Search Console, Google Analytics and Bing Webmaster Tools.
- Make it business-profile ready if required (Organization / LocalBusiness JSON-LD, consistent name, address and phone).
- Keep Core Web Vitals healthy: set explicit aspect ratios on all media so nothing shifts the layout.

## Legal and Privacy

- No false claims anywhere: no invented testimonials, user counts, security badges or features.
- Add a privacy policy stating exactly what data is collected, and terms of service.
- Record acceptance of the terms: timestamp (`accepted_terms_at`) and policy version.
- Ask for cookie and form policy consent; show permission banners and consent checkboxes.
- Set data retention limits and enforce them automatically.
- Stop collecting unnecessary data.
- No training on user data, and say so where relevant.
- Logos and brand assets: use them when the user supplied them (a repo, link or upload) or asked for them. That is permission, so do not ask again. Ask only when the user has no connection to the brand.
- Verify licences for every asset, font, icon set, code snippet and image.
- Make it law compliant, and flag anything that needs a lawyer.

## Accessibility

- Keyboard-friendly: everything reachable with Tab, Enter and Escape work, visible `:focus-visible` states.
- Mobile-friendly elements and forms.
- Proper colour contrast (WCAG AA) in both light and dark mode.
- Add alt text to images, ask for it where the content is unclear, and show a graceful fallback if an image fails.

## Frontend

### Visual style
- No default or AI-looking gradients and no unnecessary glows. Gradients are allowed in motion design when custom and purposeful (see Colour).
- No overlapping text, ever: readable text never collides with other readable text, shapes, images or UI. One exception: text that is deliberately transforming (a glyph morphing into a shape, or a word dissolving) is not an overlap while it transforms. It must be clean on its mid-transition frame, and any text that stays must be fully clear. Check every breakpoint, long strings, translations, and every frame or scene, and fix before reporting.
- No coloured side bars (or top stripes) on cards or callouts. It reads as AI-generated. Separate with whitespace or a subtle divider.
- No italics and no default / common AI fonts (no raw Inter/Roboto without a deliberate pairing).
- No emojis. Use crisp vector icons (Lucide, Phosphor), and only where they carry meaning.
- No meaningless decorative icons or filler elements.
- No excessive padding. Keep spacing tight and consistent.
- Flatten nested cards; group with whitespace or subtle dividers instead.
- Concentric corner radii: outer radius = inner radius + padding.
- No default cursor replacements or round-circle-with-dot cursors.
- Do not mess with the logo unless asked: no stretching, recolouring or edits. Use the supplied logo, product shots and UI as given; never redraw, approximate or invent a substitute. If an asset is missing or unusable, ask or use a clearly labelled placeholder.
- Check text for scaling and clipping, especially descenders: p, q, g, j, y.
- Handle text overflow on flex/grid children (`min-w-0`, truncate).
- Use `tabular-nums` on changing numbers and prices.
- Dark and light mode must be seamless.

### Interaction
- Tap animations should be present: a subtle press scale on interactive elements.
- No linear animations (continuous rotations and marquees excepted). Use custom curves or springs.
- No animation cuts, jumps, skips, or random / abrupt motion. Animate only what matters.
- 120 Hz: animate transform and opacity only, stay inside the frame budget, no layout thrashing. One exception: a contained height animation (accordions and similar) when there is no transform alternative. Clip the overflow and test on a real device (see motion-playbook, live UI).
- Do not use spinners everywhere; use layout-stable skeletons or optimistic updates.
- Buttons must not be too small (44x44 px minimum), and the same buttons must not be shrunk.
- Tapping twice must not submit twice: disable or debounce on submit.
- The keyboard must not cover input fields (`scrollIntoView`, `dvh`, `visualViewport`).

### Experience
- Optimise for mobile always.
- A new user must never see a blank screen: design helpful empty and onboarding states.
- Raw text errors must never be shown to the user.
- Sync filters, tabs and pagination to the URL.
- Warn before closing a tab with unsaved form changes.
- Modals trap focus and lock background scroll.

## Colour (60-30-10)

- Every design uses the 60-30-10 rule: about 60% dominant (background or base), 30% secondary (surfaces, large shapes, supporting type), 10% accent (calls to action, key words, highlights). Record the three roles as named tokens in the design system and check the balance on every screen or scene.
- Build palettes on Adobe Color (color.adobe.com), opened in the browser. Start from the brand or a reference, use its harmony rules (analogous, complementary, triad and so on) or extract from an image, and record the source and hex values in the design system. Check WCAG AA contrast in light and dark.
- The brand or repo palette is the anchor, not a fence. The logo and brand marks stay exact. In motion work, sections may use their own colour worlds built from the brand hue plus outside hues, with the brand colour kept in the accent (motion-playbook Section 0a-E).
- Gradients: allowed in motion design when purposeful and custom. Colours come from the project palette, two or three stops, a direction tied to the light source, and a reason (depth, mood, transition, or light that follows the focus). No default or preset gradients, no purple-to-blue or rainbow AI blends, no glow. On sites and apps the no-unnecessary-gradient rule stays.
- If Adobe Color cannot be opened, say so and ask the user. Do not invent a palette from memory and call it sourced.

## Typography and Fonts

- Ask first: an existing brand font? Which languages and scripts must the text support (Latin, Devanagari, others)?
- Offer six to eight options grouped by design language from the font library (`~/.claude/skills/tsg-tweaks/fonts.md`), brand font first if there is one.
- Show fonts visually, not just by name: render a specimen sheet from the project's own copy (`~/.claude/skills/tsg-tweaks/scripts/font_specimen.py`) in light and dark, with a descender test line (p, q, g, j, y), numerals and other scripts. Score each 1-10 for fit with a reason.
- Recommend one heading and body pair (two families at most), record it in the design system, check every script renders without fallback, and verify licences.
- Self-host fonts (subset, `font-display: swap`, licence file kept); don't hotlink third-party font CDNs in shipped sites. Upright styles only; avoid Inter, Roboto, Open Sans, Montserrat, Lato and Arial unless the brand uses them.

## Animation and Motion

Motion is subjective and changes from project to project. No house style, no fixed numbers: decide it per project.

- Fixed rules, every project: no cuts, jumps or abrupt resets; no linear easing (endless rotations, tickers and constant-speed scrolls excepted); tap feedback on everything tappable; UI animates transform and opacity only for 120 Hz; honour reduced motion; start from where things are and stay interruptible.
- Ask what feel the user wants (calm, snappy, playful, cinematic, minimal), how much motion, and for any reference. Write a short motion profile (feel, speed range, curves, amount) and keep it consistent across the project. Don't assume durations, springs or staggers.
- Motion graphics, video and animated UI: read `motion-playbook.md` first, run its Section 0 working order, meet its Section 0a checks (balance, pacing, flow, smoothness, colour range, background, variety) and its Section 6b camera rules (perspective, follow, focus), and follow it (depth, elasticity, morphing, transitions that transform, camera that follows the elements, and a build process that avoids rushing and wasted re-checks). The playbook wins over the motion-design skill. If that skill is installed, use its timing and easing tables, and ignore its default archetype (overshoot comes from the project's motion profile, not a preset) and its Creator MCP suggestion unless the user asks for file exports. The transform-and-opacity-only rule is for live UI. Rendered motion computes every frame, so morphs, blur and 3D are fine.
- Prove it on one sample animation or scene first, get a yes, then apply it everywhere. Compare the sample side by side with the reference before scoring it.
- Eye guidance: one focus at a time, the rest dimmed, the camera pushing into the detail that changed (motion-playbook Section 6a).
- Every animation needs a reason (feedback, continuity, attention, delight) judged against that profile; if it has none, cut it.
- Video options to propose when they fit, not defaults: frames computed from time for identical renders, camera moves or parallax, living characters, word-timed captions, scene lengths fitted to narration, music ducked under the voice at the target platform's loudness. Prefer Remotion with its installed skills for programmatic video. For product and showreel films use the motion-reel skill, and for hand-drawn story films use animation-studio, both under the rules in `skills-map.md`. For 3D, follow Playbook Section 15 (Blender MCP). After rendering, look at frames from every scene and transition.

## Design, Illustration and Lighting

- Study the reference first and say which traits you are copying. To match a style, collect 10-20 references, extract the recurring patterns (type, colour, motion, sound) into a small library, build from it, and iterate with specific, timestamped notes. If it carries a watermark or someone else's logo, recreate the look; never build on top of that footage.
- Be honest about limits: if the requested look (painted, 3D, photoreal) is beyond the tool, say so up front and offer options instead of iterating blindly.
- Show a labelled grid of key frames for every scene and get a yes before rendering the full piece. Keep every version in its own folder.
- Characters and brand elements come from a model sheet; colours are named tokens. Never alter the user's characters or logo unless asked.
- One visible light per scene. Every shadow, highlight and rim light comes from it and points away from it; shading on characters matches. No shadows without a source, no random patches.
- Effects are subtle by default: start low, let the user raise them. In motion graphics, effects are off until the user picks them (motion-playbook Section 0, step 7). Crisp, hard-edged shading, not blur: no haze, glow, bloom, light-ray washes or bokeh as filler. Shadows are tinted, faint and short.
- Depth in three layers: far (tinted toward the air colour), middle (the subject), near (larger, darker, framing the edges, never covering faces). In product and UI films the near layer is out-of-focus UI or the camera's push, never decorative shapes or lines.
- Text sits above all effects. Keep captions and key content clear of platform UI (roughly the bottom fifth and right edge on Reels and Shorts) and off faces.
- Palettes start from the brand or reference and may widen into per-scene colour worlds (motion-playbook Section 0a-E): warm light against cool shadow, contrast checked on every scene, mood carried by palette not effects.
- Render, view at full size, zoom in on faces and hands, and fix problems before the user sees it.

## Style Profile: Minimal Editorial Short-Form

An optional style to propose when a talking-head Reel or Short fits, never a default. Read `reference-research.md` for its rules and the conflicts to resolve.

## Film Pipeline (video projects only)

Read `film-pipeline.md` before any video project (spec lock, ingest, colour pipeline, audio, review rounds, print). Two asks always apply, even without reading it:
- Before generating or exporting anything, recommend the full spec for the delivery place (resolution, fps, aspect ratio, codec, bit depth, chroma subsampling such as 4:2:2, colour space, loudness, and tempo (BPM) if there is music) with a reason for each, and get the user's yes. Confirm again for each new generation or export.
- Before copying, checksum verification or extra backup copies, say how much storage it needs and ask.
Camera originals are never edited, renamed or moved.

## Working Practices

### Third-party code and tools
- Before installing or running anything from a repo or URL: read its README, install scripts, hooks and network calls; check the licence and whether you qualify (some are free only for individuals or small teams); put it in a scratch or sibling folder, not inside the project; pin the commit or version; audit its dependencies. Never pipe a downloaded script straight into a shell.
- Never switch off certificate checks or other safeguards to make something work. Fix the cause, or use a tool that verifies properly.
- If a safety check or permission blocks an action, say so and stop that path. Don't work around it.

### Safe changes
- Back up before editing config, rules or any file the user keeps. Edit, don't overwrite; keep versioned copies. Never rename or move originals: see Original File Names.
- Before deleting, look at the target, delete the exact path, and guard variables (`"${DIR:?}"/...`). Ask before removing anything the user made.
- When a request is ambiguous and the action is reversible, state your assumption and proceed. Ask only when the choice is the user's.
- Keep personal data (emails, names, keys) out of URLs, headers, commits and third-party requests unless the user asks.

### Git
- Commit only when asked. Never force-push or rewrite shared history. Use a branch for features and small commits with clear messages.
- Before every commit or push, scan staged changes for secrets (keys, tokens, `.env`, private keys) and for large generated files.
- Keep renders, generated media, `node_modules` and caches out of git; commit source, scripts, lockfiles and a README that explains how to rebuild.
- New repos are private by default. Ask before making anything public.

### Delivery and credits
- Keep a `CREDITS` note listing every font, image, music track, tool and library with its source and licence.
- Render a short test clip and time it before a long render. Run long renders in the background with an ETA.
- Don't say a render, install or test passed until you've checked its output: for video, duration, frame count, resolution and audio level, plus frames from every scene.
- No more than three flashes in any second, and keep flashes small and low contrast.
- Check each platform's rules on labelling AI-generated or synthetic content before posting.

## Before Shipping (always remind the user)

1. Placeholder purge: ask to remove all dummy data, lorem ipsum, test accounts and placeholder text.
2. Full security check: `.env` exclusions, no exposed keys, auth and row-level rules, admin ID lock, rate limits, security headers, no production source maps, dependency audit.
3. UX pass: no overlapping text, no side-bar cards, 60-30-10 balance, mobile keyboard clearance, descender clipping, concentric radii, double-submit locks, contrast in light and dark, smoothness on a real device.
   Motion and design pass: motion matches the agreed profile with no linear easing or jumps, frames checked across every scene and transition, every shadow follows a visible light, effects subtle, captions clear of platform UI, no watermarks or unlicensed footage, fonts self-hosted with licences checked.
4. SEO and legal pass: per-page meta, canonical redirect, sitemap, error pages and codes, terms/privacy consent logging.
5. Git and credits: no secrets or large generated files committed, the README explains how to rebuild, and a CREDITS note lists every font, asset, track and tool with its licence.
6. Report what passed, what failed, and what needs the user.
