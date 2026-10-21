
# Feature Matrix

## Current state — 2026-10-21 rollback

All EN-001 through EN-006 implementation was REMOVED at the user's request.
Application source and package manifests match commit `0efe1ae`; only process,
documentation and skills additions remain. The table and records below describe
historical work before rollback, not active features or current verification.
Do not resume the cancelled English plans without a new user request.

Legend:
- NOT INSPECTED: Not analyzed yet.
- MISSING: Required implementation does not exist.
- IN PROGRESS: Implementation is incomplete.
- IMPLEMENTED: Code exists; behavior is not yet fully verified.
- VERIFIED: Acceptance criteria passed with recorded evidence.
- BLOCKED: Verification or implementation cannot proceed.
- REGRESSION: A previously verified behavior has failed.
- REMOVED: Implementation removed intentionally at the user's request.

| ID | Page/Feature | Reference | Source files | Tests | Status | Evidence |
|---|---|---|---|---|---|---|
| F-001 | Initial inventory | Repository source | `package.json`, `src`, `server`, `api` | `npm run lint`, `npm run build` | IMPLEMENTED | Targeted scan; checks pass |
| EN-001 | Home entry to English area | `mock.html` | `src/App.tsx`, `EnglishHub.tsx` | Build/typecheck | IMPLEMENTED | Existing home button opens original document |
| EN-002 | Full Hello Bông application | `mock.html`: all HTML/CSS/JS | `src/features/english/reference/mock.html`, `EnglishHub.tsx` | Build/typecheck | IMPLEMENTED | Original document is passed verbatim to iframe `srcDoc`; browser check pending |
| EN-003 | API root and health endpoint | Server runtime | `server/app.js`, `server/index.js` | `server/app.test.js` | VERIFIED | 2 unit tests and HTTP 200 smoke test on port 3002 |

## Feature Record Template

### EN-005 — Native catalog/state/route foundation

- Status: IN PROGRESS. Modules exist and unit tests pass; no native UI mounted yet.
- Catalog: original DL JSON extracted from reference, eleven topics, age restrictions and day-based lesson suggestions.
- Cache: existing hello-bong.v1 migration, malformed storage recovery, pending writes retained, class-scoped remote snapshot and storage quota failure result.
- Route mapping: legacy hash to path, topic/lesson validation, safe query encoding and step fallback. React Router mounting remains outstanding.
- Tests: helloBongCatalog.test.ts, helloBongStore.test.ts and router.test.ts; 12 new tests passed.
- Controller: snapshot hydration, persistent pending records, retry with mutation ids, ordered draining and class isolation covered in englishController.test.ts. UI integration remains outstanding.

### EN-006 — Persistence review repairs

- Status: IMPLEMENTED; regression-tested with injected repositories and real Mongoose schema validation. Live concurrent persistence NOT VERIFIED.
- Fixed incomplete session/observation insert validation, null game input, lost concurrent queue arrivals, duplicate-key recovery; unique natural-key indexes declared for confidence/observations.
- Read-only Mongo ping passed; duplicate-group audit returned zero groups for both indexed natural keys. No user data changed during checks.

### EN-004 — React migration API foundation

- Status: IN PROGRESS. Resource endpoints and client exist; React screens still use the mock iframe.
- Server: `server/englishRoutes.js`, `server/models/EnglishClassSettings.js`, session game aggregate schema; Vercel adapter `api/english/[...path].js`.
- Tests: `server/englishRoutes.test.js`, `hello-bong/services/englishApi.test.ts`, `englishSync.test.ts`.
- Verified with injected repositories: snapshot class filtering, daily confidence upsert, session retry, rejection of invalid game scores/unknown settings, settings class scope, error response, non-conflicting upsert operators, failed replay retained.
- NOT VERIFIED: live Mongo persistence, concurrent duplicate prevention, deployed Vercel routing, authentication/authorization, persistent offline queue and UI wiring.
- Additional regression coverage: practice retry does not duplicate an existing result; impossible confidence dates return HTTP 400.

### F-XXX — Feature name

- Reference:
- Expected behavior:
- User actions:
- Inputs and validation:
- State transitions:
- API/persistence:
- Success and failure behavior:
- Responsive/accessibility requirements:
- Source files:
- Test files:
- Implementation status:
- Verification status:
- Last verified:
- Evidence:
- Outstanding issues:

## Completion Rules

A feature is VERIFIED only when:
1. Expected behavior is defined.
2. Relevant implementation exists.
3. Applicable tests have actually passed.
4. Important integration or UI behavior has been checked.
5. Evidence and remaining limitations are recorded.

IMPLEMENTED does not mean VERIFIED.
NOT RUN does not mean PASS.
BLOCKED does not mean VERIFIED.
