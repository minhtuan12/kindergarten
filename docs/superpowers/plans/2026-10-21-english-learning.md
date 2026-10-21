# English Learning Implementation Plan

> CANCELLED 2026-10-21: user requested removing this implementation and
> restoring application source to 0efe1ae. Historical documentation only; do not execute.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a persistent English-learning area with child lessons and teacher tools, reachable from the existing home screen.

**Architecture:** Keep the existing React/Vite single-page navigation and introduce a self-contained `src/features/english` feature tree. Persist teacher/class records through Express and Vercel-compatible MongoDB endpoints, scoped by a locally remembered class code; child lesson state remains in the browser until an explicit teacher save.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, Motion, Express, Vercel Functions, Mongoose, MongoDB; add Vitest, React Testing Library, jsdom and Supertest only for the required test coverage.

**Spec:** `docs/superpowers/specs/2026-10-21-english-learning-design.md`

## Global Constraints

- Preserve the existing React/Vite, Express, Vercel Functions and Mongoose stack.
- No camera, image, video, audio recording, transcript, real child name or AI-generated pronunciation score is persisted.
- Require a `classCode` of 3–40 characters for every teacher-data request; disclose that it is not authentication.
- Use only the catalog supplied by `src/features/english/englishCatalog.ts`; do not treat mock/demo values as real records.
- Move `mock.html` to `src/features/english/reference/mock.html`; it must not be loaded by application runtime.
- Do not overwrite the user’s existing `package-lock.json` changes outside dependencies required by this plan.

## Review Focus

- Missing/whitespace-only class codes must receive a 400 response and never create a document (Task 2 API test).
- A class must never receive another class’s records, even when request query values are manipulated (Task 2 API test).
- Observation levels outside 1–3 and confidence outside 1–5 must fail server validation (Task 2 API test).
- A browser without `SpeechRecognition` must show the unsupported state and retain a usable self-assessment path (Task 4 component test).
- Saving a teacher form must not show success or clear input after an API failure (Task 5 component test).

---

### Task 1: Feature contracts, catalog, and test runner

**Files:**
- Create: `src/features/english/englishTypes.ts`
- Create: `src/features/english/englishCatalog.ts`
- Create: `src/features/english/englishValidation.ts`
- Create: `src/features/english/englishValidation.test.ts`
- Create: `vitest.config.ts`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Produces `AgeGroup`, `Lesson`, `LessonStep`, `TeacherSessionInput`, `ObservationInput`, `PracticeInput`, `ConfidenceInput` and `ReportSummary` types.
- Produces `LESSONS`, `findLesson(ageGroup, lessonId)` and `validateClassCode(value): string | null`.
- Produces a `npm test` command that runs Vitest without watch mode.

- [ ] **Step 1: Write failing unit tests for catalog lookup and class code validation**

```ts
expect(validateClassCode(' AB ')).toBeNull();
expect(validateClassCode('   ')).toBe('Mã lớp phải có từ 3 đến 40 ký tự.');
expect(findLesson('3-4', 'animals-1')?.steps).toHaveLength(5);
```

- [ ] **Step 2: Run the unit test to verify it fails**

Run: `npm test -- englishValidation.test.ts`

Expected: FAIL because the test runner/module does not exist.

- [ ] **Step 3: Add the test configuration, contracts, fixed starter catalog, and validation helper**

Use the five step IDs `look`, `speak`, `move`, `play`, `review`; constrain age values to `3-4`, `4-5`, and `5-6`.

- [ ] **Step 4: Run the unit test to verify it passes**

Run: `npm test -- englishValidation.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit the testable contracts**

```bash
git add package.json package-lock.json vitest.config.ts src/features/english
git commit -m "test: add English learning feature contracts"
```

### Task 2: Persistent English learning API

**Files:**
- Create: `server/models/EnglishLessonSession.js`
- Create: `server/models/EnglishChildObservation.js`
- Create: `server/models/EnglishTeacherPractice.js`
- Create: `server/models/EnglishTeacherConfidence.js`
- Create: `server/englishRoutes.js`
- Create: `api/english-records.js`
- Modify: `server/index.js`
- Create: `server/englishRoutes.test.js`

**Interfaces:**
- Consumes the validated `classCode` and Task 1 payload types.
- Produces `registerEnglishRoutes(app)` for local Express plus a Vercel handler at `/api/english-records`.
- `GET /api/english-records?classCode=...` returns `{ sessions, observations, practices, confidence }` scoped to one class.
- `POST /api/english-records` accepts `{ type, classCode, data }`, where type is `session`, `observation`, `practice`, or `confidence`; returns 201 with its created record.

- [ ] **Step 1: Write failing API tests for valid persistence, class isolation, and invalid payloads**

```js
await request(app).post('/api/english-records').send({ type: 'confidence', classCode: 'SUNFLOWER', data: { date: '2026-10-21', level: 4 } }).expect(201);
expect((await request(app).get('/api/english-records?classCode=OTHER')).body.confidence).toEqual([]);
await request(app).post('/api/english-records').send({ type: 'observation', classCode: 'SUNFLOWER', data: { childCode: 'HS01', level: 4 } }).expect(400);
```

- [ ] **Step 2: Run API tests to verify they fail**

Run: `npm test -- server/englishRoutes.test.js`

Expected: FAIL because routes/models are absent.

- [ ] **Step 3: Implement Mongoose schemas and shared route registration**

Use strict schemas with timestamps; cap string/list lengths and numbers. Build both local and Vercel entry points from the same route implementation, returning safe public fields only.

- [ ] **Step 4: Run API tests to verify they pass**

Run: `npm test -- server/englishRoutes.test.js`

Expected: PASS.

- [ ] **Step 5: Commit the persistent API**

```bash
git add server api src/features/english package.json package-lock.json
git commit -m "feat: persist English learning records"
```

### Task 3: English hub and child five-step lesson flow

**Files:**
- Create: `src/features/english/EnglishHub.tsx`
- Create: `src/features/english/EnglishChildArea.tsx`
- Create: `src/features/english/EnglishLessonFlow.tsx`
- Create: `src/features/english/EnglishChildArea.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Consumes `LESSONS`, `AgeGroup`, `Lesson` and `LessonStep` from Task 1.
- Produces `<EnglishHub onBack={...} />`; `EnglishHub` switches between child and teacher areas.
- Produces `<EnglishChildArea onBack={...} />` with a completed lesson callback local to the feature.

- [ ] **Step 1: Write a failing component test for the age → lesson → five-step completion flow**

```tsx
render(<EnglishChildArea onBack={vi.fn()} />);
await user.click(screen.getByRole('button', { name: /3–4 tuổi/i }));
await user.click(screen.getByRole('button', { name: /động vật/i }));
for (const step of ['Nhìn', 'Nói', 'Vận động', 'Chơi', 'Ôn & khen']) await user.click(screen.getByRole('button', { name: new RegExp(step) }));
expect(screen.getByText(/hoàn thành bài học/i)).toBeInTheDocument();
```

- [ ] **Step 2: Run the component test to verify it fails**

Run: `npm test -- EnglishChildArea.test.tsx`

Expected: FAIL because the components are absent.

- [ ] **Step 3: Implement responsive, accessible hub and child lesson components**

Use button labels, progress text and a non-color-only completed indication. Add one `Học tiếng Anh` card/button to the existing `renderHome` and restore the prior home view when the feature back button is pressed.

- [ ] **Step 4: Run the component test to verify it passes**

Run: `npm test -- EnglishChildArea.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit the child flow**

```bash
git add src/App.tsx src/index.css src/features/english
git commit -m "feat: add English child lesson flow"
```

### Task 4: Teacher practice and class-code context

**Files:**
- Create: `src/features/english/EnglishTeacherArea.tsx`
- Create: `src/features/english/TeacherPracticePanel.tsx`
- Create: `src/features/english/englishApi.ts`
- Create: `src/features/english/TeacherPracticePanel.test.tsx`

**Interfaces:**
- Consumes `classCode`, catalog words, Task 1 types and Task 2 POST contract.
- Produces `getStoredClassCode(): string`, `setStoredClassCode(value: string): void` and `createEnglishRecord(payload)`.
- Produces `<EnglishTeacherArea />`, which requires/selects a valid local class code before data mutations.

- [ ] **Step 1: Write failing tests for unsupported speech recognition and failed persistence**

```tsx
delete window.SpeechRecognition;
render(<TeacherPracticePanel classCode="SUNFLOWER" />);
expect(screen.getByText(/trình duyệt chưa hỗ trợ/i)).toBeInTheDocument();
await user.click(screen.getByRole('button', { name: /lưu lần luyện/i }));
expect(await screen.findByText(/không thể lưu/i)).toBeInTheDocument();
```

- [ ] **Step 2: Run the component test to verify it fails**

Run: `npm test -- TeacherPracticePanel.test.tsx`

Expected: FAIL because the panel and API wrapper are absent.

- [ ] **Step 3: Implement class-code setup, practice, confidence and error states**

Only invoke browser speech recognition after the record button is pressed. Persist only an actual recognition-derived result if available; otherwise permit a self-assessment and omit `score`.

- [ ] **Step 4: Run the component test to verify it passes**

Run: `npm test -- TeacherPracticePanel.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit the teacher practice panel**

```bash
git add src/features/english
git commit -m "feat: add English teacher practice"
```

### Task 5: Teacher session, observation, and reporting UI

**Files:**
- Create: `src/features/english/SessionForm.tsx`
- Create: `src/features/english/ObservationForm.tsx`
- Create: `src/features/english/EnglishReport.tsx`
- Create: `src/features/english/englishReport.ts`
- Create: `src/features/english/SessionForm.test.tsx`
- Modify: `src/features/english/EnglishTeacherArea.tsx`

**Interfaces:**
- Consumes Task 1 input/report types and Task 4 API wrapper/class context.
- Produces `summarizeEnglishRecords(records): ReportSummary` and teacher UI for creating a session and observation then reading the class-scoped report.

- [ ] **Step 1: Write failing tests for form validation, a successful save, failed save retention, and report calculation**

```tsx
await user.click(screen.getByRole('button', { name: /lưu buổi học/i }));
expect(screen.getByText(/số trẻ có mặt/i)).toBeInTheDocument();
expect(summarizeEnglishRecords({ sessions: [{ attendance: 10, completedParticipants: 8 }], observations: [], practices: [], confidence: [] }).participationRate).toBe(80);
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- SessionForm.test.tsx`

Expected: FAIL because form/report modules are absent.

- [ ] **Step 3: Implement validated forms and report/empty/loading/error views**

The session form must collect all required design fields, post only valid data, and clear only on HTTP success. Observation uses an anonymous child code and level 1–3. Report derives counts/rates from fetched records, not mock records.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test -- SessionForm.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit the teacher record and report flow**

```bash
git add src/features/english
git commit -m "feat: add English class reporting"
```

### Task 6: Reference relocation, audit records, and full verification

**Files:**
- Create: `src/features/english/reference/`
- Move: `mock.html` → `src/features/english/reference/mock.html`
- Modify: `docs/PROJECT_MEMORY.md`
- Modify: `docs/FEATURE_MATRIX.md`
- Modify: `docs/TEST_REPORT.md`

**Interfaces:**
- Consumes all feature/API behavior from Tasks 1–5.
- Produces accurate feature inventory, scan boundaries, executed-command evidence and remaining limitations.

- [ ] **Step 1: Move the mock reference without altering its contents or importing it**

Run: `git diff --no-index -- mock.html src/features/english/reference/mock.html`

Expected: no content differences after path-only relocation.

- [ ] **Step 2: Run focused test suite and typecheck/build**

Run: `npm test -- --run`, `npm run lint`, `npm run build`

Expected: PASS; investigate each unexpected failure with `superpowers:systematic-debugging` before modifying source.

- [ ] **Step 3: Perform browser checks at desktop and mobile viewport sizes**

Check: home entry, child five-step path, teacher validation/save error, and report empty/populated states.

- [ ] **Step 4: Update project memory, feature matrix, and test report with only observed evidence**

Record the actual scan boundary, source revision/status, modified files, test outputs, browser observations and any unavailable checks.

- [ ] **Step 5: Review the final diff and commit documentation/reference relocation**

```bash
git add docs src/features/english/reference/mock.html
git commit -m "docs: record English learning verification"
```

## Self-review

- **Spec coverage:** Tasks 1–5 cover the two areas, catalog, persistence, validation, states, privacy restrictions and navigation. Task 6 covers mock relocation, documentation and end-to-end verification.
- **Gaps:** Authentication remains explicitly out of scope and is disclosed by the class-code UI; camera functionality is deliberately excluded.
- **Type consistency:** Task 1 owns all shared TypeScript names. Task 2 owns only the `{ type, classCode, data }` REST protocol consumed in Tasks 4–5.
- **Review focus:** Each of the five high-risk inputs/states has a named test in its owning task.
- **Proportion:** This plan specifies contracts and expected test evidence rather than component or route implementations.
