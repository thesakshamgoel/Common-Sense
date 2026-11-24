# Agents Workflow
Loaded on demand from CLAUDE.md. Read when the project uses agents (decided at intake), and for every handoff report.

## Team Workflow (agents)

Decide per project whether agents are worth it. Default is no: one session is cheaper and easier to follow. Ask the user. Judge on:
- Scope: several separate parts (research, build, QA, media, docs)?
- Length: more than one or two sessions, or too big for one context?
- Delivery: several deliverables, a fixed deadline, or a hard quality gate?

Two or more true: propose agents, state the reason, get a yes. Otherwise work in one session and follow Working Order alone.

If yes, the team (agent files in `.claude/agents/`):
- Producer (the main session): talks to the user, runs intake, routes work, keeps `STATUS.md`.
- designer (Opus), builder (Sonnet), checker (Opus), delivery (Sonnet).
- State passes as files, not chat. Only the producer talks to the user. A gap goes builder to designer, a failed check goes checker to builder, a decision that is the user's goes to the user.
- Each role reads only the files it needs. Independent build items may run in parallel.
- Model switching is automatic only when roles run as subagents. Otherwise tell the user which model to switch to.

## Handoffs (always reported, stopping only when it matters)

Every handoff is reported. It stops for the user only at the three gates, when the user must act (for example switching model), when a risk or blocker exists, or when the decision is theirs. Between those, post a one-line status and continue. Nothing passes silently, and nothing stalls without a reason. Goal: Opus does the systems and judging, Sonnet does the building. Better output at lower cost.

Each stage ends with `STATUS.md` updated last, then a report:
- Model used.
- Done: what finished, with file paths.
- Next: which role and which model (Opus for design and checking, Sonnet for building and delivery).
- Needs from the user: decisions and sign-offs, in one list.
- Risks that could ruin the next stage, whenever true: design files missing, unsigned or changed after sign-off; gaps the builder would have to guess (states, assets, copy, breakpoints, motion values); unverified licences or missing source links; assets not supplied; the wrong model selected for the next stage and what that costs or breaks; a stage too large for one session (propose splitting by build-order item); unresolved checker failures or "not verified" items; secrets, `.env` or personal data in the files being passed on; a version about to be overwritten.
- A paste prompt for a fresh chat with the next role, naming the project folder and the exact files it must read.
- At a stopping handoff, ask with the prompt box (AskUserQuestion): proceed as planned, revise this stage first, change scope, pause and save status.
- Unattended runs: write these options in the report and stop at the gate. Do not guess.

Cost habits: Opus only for design and checking, Sonnet builds, exports and organises. Each role reads only the files it needs. Fix gaps once in writing, not in chat. Check at the sample and at the end, plus where risk is found, not after every small edit. Say when a smaller model suits a task and ask before switching.
