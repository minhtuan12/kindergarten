
# Project Memory

> Last verified: 2026-10-21
> Repository revision: application restored to 0efe1ae; only process/docs/skills changes retained
> Audit status: PARTIAL — English feature scope inspected
> Current task: English implementation CANCELLED and removed at user's request (2026-10-21)

## Current state after rollback — authoritative

- Application code and package manifests are restored exactly to commit `0efe1ae`.
- English UI, home entry, iframe, API/models, catalog, synchronization code and associated tests added after that commit have been removed from the active branch.
- AGENTS.md, docs/, .agents/skills/ and .superpowers/ were retained. Plans/specs below are historical references, not instructions to resume the cancelled implementation.
- Local recovery branch: `backup/before-english-removal-5da9a7b` points to the previous HEAD. No database or .env changes were made during rollback.
- Sections below describe historical inspections and results before rollback unless stated otherwise. Do not assume referenced English source files or test commands still exist.
- Do not restart English implementation without a new user request.

## 1. Project Overview

- Project purpose: Kindergarten learning web app
- Framework: React 19 + Vite 6
- Language: TypeScript frontend; JavaScript Express/Mongoose backend
- Package manager: npm (`package-lock.json`)
- Application entry point: `src/main.tsx` → `src/App.tsx`
- Former HTML reference: `src/features/english/reference/mock.html` (removed with the English feature; recoverable from the local backup branch).

Replace UNKNOWN only after verifying the repository.

## 2. Verified Architecture

| Area | Path | Responsibility | Verification |
|---|---|---|---|
| Entry point | `src/main.tsx` | mounts `App` | Source read |
| Pages/routes | `src/App.tsx` | state-based app navigation | Source read; lint/build pass |
| English feature | removed | cancelled by user | source restored to 0efe1ae |
| API/backend | `server/index.js` | restored baseline backend | compare with 0efe1ae |
| English tests | removed | test script/framework additions rolled back | prior results are historical |

## 3. Development Commands

| Purpose | Command | Last result |
|---|---|---|
| Install dependencies | `npm install` | PASS (2026-10-21; audit reported 18 vulnerabilities) |
| Start application | `npm run dev`, `npm run dev:api` | API verified on port 3002 (2026-10-21) |
| Unit tests | no test script in restored package.json | NOT RUN after rollback; historical results below |
| Integration/E2E tests | UNKNOWN | NOT RUN |
| Lint/typecheck | `npm run lint` | PASS (2026-10-21) |
| Build | `npm run build` | PASS (2026-10-21; bundle-size warning) |

Commands must be copied from verified project configuration.
Never guess a command and record it as established project practice.

## 4. Feature Status

See docs/FEATURE_MATRIX.md for the complete feature inventory.

## 5. Confirmed Decisions

Record:
- Decision.
- Reason.
- Evidence or relevant source path.
- Whether the decision is still valid.

## 6. Known Issues

| Issue | Impact | Status | Evidence |
|---|---|---|---|
| MongoDB-backed English endpoints unverified at runtime | API save/load not exercised | OPEN | No local MongoDB process run |
| Browser flow unverified | No browser automation available | OPEN | Full original mock embedded; no interactive browser automation |
| Port 3001 can be occupied by stale external process | Browser may reach old API | OPEN | Correct server source returned 200 on port 3002 |

## 7. Scan Coverage

- Directories inspected: `src`, `server`, `api`, `docs` (targeted); root configuration.
- Files read: `package.json`, `vite.config.ts`, `tsconfig.json`, `src/main.tsx`, relevant `src/App.tsx`, `HomeScreen.tsx`, `ParentDashboard.tsx`, server models/routes, `mock.html`, all workflow docs.
- Files listed but not read: remaining pre-existing screen/component sources, lockfile internals.
- Exclusions: `node_modules`, `dist`, binary/generated content; no secrets read from `.env`.
- Unavailable areas: no live MongoDB/browser verification.
- Scan date: 2026-10-21.
- Scan limitations: audit is targeted to the requested English feature, not a full app review.

Do not claim full coverage without evidence.

## 8. Last Verified Results

- Tests:
- Lint:
- Typecheck:
- Build:
- Browser verification: Interactive check not run; source embeds original mock in an isolated iframe.
- Known failures:
- Checks not run:

Record actual results and execution dates.

## 9. Historical Next Actions (cancelled)

1. Inspect repository structure and identify the actual stack.
2. Locate HTML references and map their interactions.
3. Build the initial feature matrix.
4. Identify missing functionality and tests.
5. Implement and verify the highest-priority items.

## 10. Session History

### 2026-10-21 — React migration API foundation (in progress)

- Added English resource snapshot/settings/session/confidence/observation/practice endpoints and the React API client; the current EnglishHub still renders the iframe and has not been migrated.
- Added settings model and session game aggregates. Fixed upsert operator conflicts and settings class override through regression tests.
- Added queue replay primitive; persistent queue/store integration remains Task 1. Session mutation id retry is covered with an injected repository; real Mongo persistence/concurrent retry is NOT verified.
- Targeted reads: English routes/models/tests, API adapters, Vite/Vercel routing configuration and EnglishHub. Excluded .env contents, generated files, node_modules and unrelated screens.
- Next: strengthen persistence contract (session update, practice idempotency, date/field validation), then catalog/store and native router/screens.
- Follow-up: practice retry is now idempotent by clientMutationId; daily confidence rejects impossible dates. Latest suite: 21 tests pass. Session update and full queue/store wiring still outstanding.
- Catalog/state/route preparation: extracted the complete DL JSON directly from the reference; age/topic/lesson selectors and calendar suggestions match the mock. Legacy storage is preserved under hello-bong.v1; remote cache is class-scoped; malformed JSON and blocked writes are handled. Hash mapping functions are tested but not yet mounted as React Router.
- Latest verified suite: 33 tests across 8 files; typecheck passes. EnglishHub still uses iframe; none of these foundation modules are wired into the existing UI yet. Next work is actual API/store synchronization and native React route templates.
- Subsequent verification: 40 tests/9 files, typecheck and production build PASS. EnglishController now loads snapshots and persists/retries pending writes, including concurrent save arrivals; not yet mounted in UI.
- Independent review found incomplete-schema upserts, null game results, concurrent queue arrivals and missing natural-key indexes. Fixed schema prevalidation for sessions/observations, null guards, queue draining, compound unique indexes and duplicate-key recovery. Added RED→GREEN regressions for reproducible API/controller failures.
- Live Mongo read-only checks: ping PASS; confidence/observation duplicate group counts both zero. No live records were inserted/updated/deleted; index creation/concurrent persistence still not exercised against live DB.

Append concise entries containing:
- Date.
- Task.
- Changed files.
- Tests and outcomes.
- Remaining work.
- Next step.
