
# Test and Repair Report

## Current Status

- Last execution: 2026-10-21
- Source revision: application rolled back to 0efe1ae; process/docs/skills retained
- Overall status: ROLLBACK SOURCE/TYPECHECK/BUILD VERIFIED; prior English results are historical

### 2026-10-21 — User-requested feature rollback

- Removed seven post-0efe1ae commits from active main history, retaining their process/docs/skills files for a new docs-only commit.
- Local recovery branch: backup/before-english-removal-5da9a7b.
- Restored 35 application/package paths; preserved .env, ignored local files and database state.
- No test script exists in restored package.json; English tests were removed as part of reverting their feature, not to make a failing suite pass.
- `git diff --name-only 0efe1ae -- src server api package.json package-lock.json vite.config.ts vitest.config.ts`: PASS, empty output.
- `npm run lint`: PASS (`tsc --noEmit`). `npm run build`: PASS (Vite 4.57s; existing chunk-size advisory).
- Unit/E2E/browser tests: NOT RUN; baseline has no npm test script. No new feature test pass claim applies after rollback.
- Remote main was checked before rewrite: 5da9a7bb4edbd6bdd8e46d5fe2ad87ad5bdc1f7f. Push uses an explicit lease against this revision to avoid overwriting intervening work.
- Scope: compared tracked path inventory/history; read workflow/memory/reports/package scripts. No deep rescan of baseline components, dependency internals, .env or DB contents.

## Execution Log

For each execution, append a new entry.

### YYYY-MM-DD — Task identifier

#### Scope
- Features:
- Source files:
- Test files:
- Environment:

#### Commands executed

| Command | Result | Evidence |
|---|---|---|
| Actual command | NOT RUN | No execution |

Use only these result labels:
PASS, FAIL, BLOCKED, NOT RUN.

#### Defects found

For each defect:
- ID:
- Reproduction steps:
- Expected result:
- Actual result:
- Root cause:
- Files changed:
- Regression test:
- Verification after fix:

#### Final verification

- Unit tests:
- Integration tests:
- End-to-end tests:
- Lint:
- Typecheck:
- Build:
- Browser/UI checks:
- Outstanding failures:
- Checks blocked or not run:

#### Limitations

Describe anything that could not be tested and why.

#### Next steps

List the exact next actions.

---

### 2026-10-21 — English learning feature

#### Scope
- Features: English hub, child five-step lesson, teacher data UI, MongoDB record endpoints.
- Source files: `src/features/english/**`, `src/App.tsx`, `server/**`, `api/english-records.js`.
- Environment: Node 24.21.0 invoked directly from installed NVM path; NVM shim could not activate due registry permission restrictions.

#### Commands executed

| Command | Result | Evidence |
|---|---|---|
| `npm test -- englishValidation.test.ts` before implementation | FAIL | Missing test script, then missing feature imports; expected RED evidence |
| `npm test -- englishValidation.test.ts` | PASS | 2 tests passed |
| `npm test` | PASS | 3 test files, 7 tests passed |
| `npm run lint` | PASS | `tsc --noEmit` completed with exit 0 |
| `npm run build` | PASS | Vite build completed; chunk-size warning only |
| `npm run dev` + HTTP GET `http://localhost:3000` | PASS | Vite served HTTP 200 and root element was present |
| `API_PORT=3002 node server/index.js` + HTTP GET | PASS | `/` and `/api/health` both returned HTTP 200 |

#### Defects found
- ID: ENV-001
- Reproduction: invoke `node` or `npm` through normal NVM shim.
- Actual result: NVM reports no active Node version because registry writes are denied.
- Handling: commands used the installed Node 24.21.0 path directly; no global configuration changed.

- ID: EN-VAL-001
- Reproduction: submit an English observation with `level: 1.5`, or a lesson session where completed participants exceed attendance.
- Actual result before repair: schema range checks allowed a decimal level and did not compare the two session counts.
- Root cause: cross-field and integer validation was absent before model persistence.
- Repair: added `validateEnglishRecord` before `Model.create`, plus RED→GREEN unit tests.

- ID: API-ROOT-001
- Reproduction: browse `http://localhost:3001/`.
- Root cause: no root Express route existed; port 3001 could also be served by a stale process.
- Repair: extracted `createApp`, added a JSON root route, and start HTTP before attempting MongoDB connection.
- Verification: the corrected server returned HTTP 200 for `/` and `/api/health` on isolated port 3002.

#### Final verification
- Unit tests: PASS (7 tests: catalog/class code/session count/API record validation/API root/health).
- Integration/API tests: NOT RUN — no MongoDB service/configuration exercised.
- End-to-end tests: NOT RUN — browser automation unavailable.
- Lint/typecheck: PASS.
- Build: PASS (one bundle exceeds Vite's 500 kB advisory threshold).
- Browser/UI checks: NOT RUN — dev server HTTP availability was checked, but no interactive browser automation was available.

#### Limitations
- English screen uses the unmodified original `mock.html` inside an isolated iframe, including its own client-side persistence/tools.
- API field validation was implemented in Mongoose but not runtime-tested against MongoDB in this session.

#### Next steps
1. Configure `MONGODB_URI`, run `npm run dev:api`, and manually test POST/GET data isolation.
2. Run desktop and mobile browser checks of all child and teacher paths.
3. Add component/API integration tests before production use.

---

## Historical Entries

### 2026-10-21 — English API foundation follow-up

- Baseline: 7 tests passed.
- RED: missing resource routes returned 404; missing client/replay modules failed import. Added regression tests reproduced settings class override and Mongo operator path conflict.
- GREEN: `npm test` passed 19 tests across 5 files; `npm run lint` passed (`tsc --noEmit`). Node 24.21.0 invoked through installed NVM path, without global changes.
- API contract checks use Supertest with injected in-memory repositories; they are not MongoDB integration tests. No live DB/network or browser verification performed.
- `npm run build`: PASS, Vite completed in 4.65s; existing bundle-size advisory remains. UI conversion and full plan remain in progress.
- Follow-up RED → GREEN: practice retry previously created two results and impossible dates were accepted. Fixed practice upsert with a partial unique mutation index and calendar-date validation. `npm test`: 21 tests pass.
- Catalog/state/hash mapping RED → GREEN: new imports initially failed because modules were absent; implementation added. Latest `npm test`: 33 tests pass across 8 files; `npm run lint`: PASS. Browser/native UI not checked: these modules have not yet replaced the iframe.
- Controller/review follow-up: `npm test` PASS, 40 tests across 9 files; `npm run lint` PASS; `npm run build` PASS (4.73s, existing bundle advisory).
- Independent review identified four issues. Regression tests reproduced incomplete session upsert acceptance (201 instead of 400), null game result TypeError, concurrent save left pending and duplicate-key response 400. Added schema prevalidation/null guard/draining/recovery; rerun full suite passed. Natural-key unique indexes declared; live index/concurrent write tests remain NOT RUN.
- MongoDB read-only check: sandbox connection attempt stalled and was terminated. Escalated ping PASS. First duplicate audit command failed with PowerShell quoting SyntaxError; rerun using scratch .mjs script PASS: confidence and observation each have 0 duplicate groups. No live data written/deleted. These read checks do not establish API write persistence.

Append subsequent runs below this line.
Never rewrite an earlier failure as a historical PASS.
Record later successful verification as a separate result.
