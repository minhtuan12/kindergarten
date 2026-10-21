
---
name: html-to-implementation
description: Analyze HTML reference pages and an existing codebase, map visible UI and interactions to existing components, implement missing functionality, and verify visual and behavioral parity. Use when recreating, completing, or aligning a project with supplied HTML.
---

# HTML to Implementation

## Mandatory preparation

1. Read AGENTS.md and docs/WORKFLOW.md.
2. Read docs/PROJECT_MEMORY.md and docs/FEATURE_MATRIX.md if present.
3. Check git status before editing.
4. Check whether Superpowers is available and use its relevant skills.
5. Inspect the existing stack and conventions before selecting an implementation.

## Analyze the reference

Find all supplied HTML files and related CSS, JS, images, fonts and assets.

For each relevant page, inspect:
- DOM structure and semantic elements.
- Layout, spacing, typography, colors and responsive behavior.
- Links, buttons, forms, menus, dialogs and navigation.
- Event handlers and client-side state.
- Validation and disabled states.
- Loading, empty, success and error states.
- Data sources and API calls.
- Accessibility attributes and keyboard interactions.

Distinguish reference-only code from the application's actual runtime.
Do not assume every HTML attribute or inline script must be copied.

## Inspect the application

Determine:
- Framework, package manager and entry points.
- Existing page and component structure.
- Routing and state management.
- API clients, server endpoints and persistence.
- Existing design system and shared styles.
- Available test framework and browser tooling.

Reuse working components and utilities wherever appropriate.

## Build a feature map

Create or update docs/FEATURE_MATRIX.md.

Assign each feature a stable ID. Record:
- Reference file and page.
- Visible UI and expected behavior.
- Relevant application files.
- Input, output and state transitions.
- Validation and error cases.
- Required tests.
- Implementation and verification status.

Identify mismatches before implementation.

## Implementation requirements

For each feature:

1. Define observable acceptance criteria.
2. Identify existing tests and add missing tests.
3. Use Superpowers test-driven-development when applicable.
4. Implement the smallest coherent change.
5. Match the reference's structure and visual design.
6. Implement actual behavior, not merely clickable decoration.
7. Handle invalid input and failure paths.
8. Preserve existing routes, data contracts and conventions.
9. Add responsive and accessibility behavior where relevant.
10. Run targeted tests immediately after implementation.

Do not invent API endpoints, credentials, database schemas or business rules.
If backend integration is missing, implement only what is supported by
the repository and clearly document any remaining integration work.

## Visual verification

When a runnable browser environment is available:
- Start the application using the documented command.
- Open each relevant route.
- Compare the implementation with the reference.
- Check common desktop and mobile viewport sizes.
- Test interactions, focus, navigation and validation.
- Capture or record actual failures where tooling permits.

Do not claim pixel-perfect parity without visual evidence.
If browser or screenshot tooling is unavailable, state that limitation.

## Completion

Run the relevant test suite, lint, typecheck and build when available.

Update:
- docs/FEATURE_MATRIX.md
- docs/PROJECT_MEMORY.md
- docs/TEST_REPORT.md

Report implemented features, files changed, tests executed,
visual checks performed, known differences and outstanding blockers.
