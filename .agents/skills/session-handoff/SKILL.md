
---
name: session-handoff
description: Maintain a concise, evidence-based project memory and session handoff so future coding sessions can resume efficiently without repeating a full repository audit. Use at the end of meaningful tasks and at the beginning of continuation work.
---

# Session Handoff

## Starting a continuation

Read in this order:
1. AGENTS.md
2. docs/WORKFLOW.md
3. docs/PROJECT_MEMORY.md
4. Relevant sections of docs/FEATURE_MATRIX.md
5. Relevant entries in docs/TEST_REPORT.md

Then check the actual repository state.

Verify the remembered paths, scripts and feature statuses before relying
on them. Inspect Git changes and files relevant to the current task.

Do not ask the user to repeat information already available and valid.

## What to remember

Store stable, reusable information:
- Stack and project entry points.
- Important modules and dependencies.
- Verified development and test commands.
- Feature implementation status.
- Known architecture constraints.
- Decisions and their rationale.
- Known bugs and unresolved blockers.
- Last verified test/build state.
- Scan coverage and scan exclusions.
- Exact next steps.

## What not to remember

Do not store:
- Secrets, tokens or credentials.
- Large copied source files.
- Entire terminal logs.
- Unsupported assumptions presented as facts.
- Temporary details with no future value.
- Claims that tests passed without recorded evidence.

## End-of-session update

After meaningful changes:
1. Update PROJECT_MEMORY.md.
2. Update FEATURE_MATRIX.md when feature status changes.
3. Append a concise entry to TEST_REPORT.md for actual test runs.
4. Record changed paths and reasons.
5. Record verified results and remaining limitations.
6. Record the next concrete action.

Keep historical results distinguishable from current status.

## Resume efficiency

Use the memory to identify relevant paths and commands.
Do not reopen every source file if it is unchanged and unrelated.
Do inspect changed files, relevant dependencies and tests.
Expand the scan if remembered facts conflict with source.

## Handoff format

Finish with:
- Current objective.
- Work completed.
- Files changed.
- Tests executed and results.
- Unresolved issues.
- Relevant memory/report locations.
- Exact next action.

Never mark an unfinished task complete merely to produce a clean handoff.
