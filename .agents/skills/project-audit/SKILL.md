
---
name: project-audit
description: Audit an existing repository, discover architecture, inventory source files, trace feature dependencies, identify implementation gaps, and maintain a verifiable project map. Use at project onboarding, before large changes, or when source and project memory may have diverged.
---

# Project Audit

## Startup

Read AGENTS.md, docs/WORKFLOW.md and docs/PROJECT_MEMORY.md.
Check Git state and use the available Superpowers workflow when applicable.

## Audit scope

Inspect:
1. Repository structure and application entry points.
2. Framework, package manager and dependency manifests.
3. Routes, pages, components and shared UI.
4. Styles, themes, assets and responsive rules.
5. Business logic, state and data flow.
6. API clients, server routes, database and authentication.
7. Tests, fixtures, mocks and test configuration.
8. Lint, typecheck, build, CI and environment configuration.
9. HTML references and other supplied specifications.
10. Existing project documentation and previous reports.

## Safe discovery

Use file listing, search and symbol navigation before opening files.

Exclude generated and vendor directories from deep inspection unless
they are directly relevant to the task.

Never expose secrets in logs or documentation.
Do not install packages, run migrations or execute destructive scripts
as a default part of an audit.

## Scan evidence

For each scan, record:
- Timestamp and repository revision when available.
- Directories examined.
- Files whose content was inspected.
- Files listed but not read.
- Excluded paths and reasons.
- Commands actually executed.
- Findings and unresolved questions.

Never equate a filename listing with a content audit.
Never label a repository fully audited when some relevant areas remain
unread or inaccessible.

## Architecture map

Document:
- Application entry points.
- Major modules and their responsibilities.
- Route-to-component relationships.
- Component-to-service relationships.
- State ownership and data persistence.
- External services and dependencies.
- Test locations and how tests are executed.

Prefer references to real paths and symbols over speculative descriptions.

## Gap analysis

Compare requirements, reference HTML, current source and test coverage.

Classify findings:
- Missing functionality.
- Incorrect functionality.
- Visual mismatch.
- Missing error handling.
- Missing tests.
- Security concern.
- Performance or accessibility concern.
- Unverified assumption.

Prioritize issues by user impact, correctness and risk.

## Incremental rescanning

Use project memory as a starting index, not as proof of current state.

Inspect:
- Git changes since the last audit.
- Relevant new and deleted files.
- Changes to manifests and configuration.
- Modified implementation and test files.
- Dependencies affected by those changes.

Expand the audit when dependencies are unclear or the scope has changed.
Do not rescan the entire repository without a reason.

## Outputs

Create or update:
- docs/PROJECT_MEMORY.md
- docs/FEATURE_MATRIX.md
- docs/TEST_REPORT.md when tests were executed

Record exact scan boundaries and the next recommended action.
