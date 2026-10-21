# Kế hoạch triển khai Hello Bông React + API

> CANCELLED 2026-10-21: user requested removing this feature and restoring
> application code to 0efe1ae. Retained as historical documentation only; do not execute.

> Khi triển khai: dùng `superpowers:executing-plans`, TDD cho từng task, và
> commit + push sau mỗi task theo yêu cầu của người dùng.

**Mục tiêu:** thay HTML nhúng bằng Hello Bông React, giữ 15 màn/luồng mock và
lưu dữ liệu học thực tế qua English API/MongoDB hiện có.

**Kiến trúc:** trích catalog/state mock thành TypeScript typed modules; React
Router chạy trong `/hoc-tieng-anh`. App hydrate snapshot theo `classCode`,
ghi resource API qua optimistic UI; `hello-bong.v1` chỉ migrate/cache/offline
queue. Browser APIs nằm sau capability wrapper để từ chối quyền không kẹt luồng.

**Stack:** React 19, TypeScript, React Router (thêm nếu cần), Tailwind CSS 4,
Motion, Express, Mongoose, Vitest, React Testing Library, Supertest.

**Spec:** `docs/superpowers/specs/2026-10-21-hello-bong-react-design.md`

## Ràng buộc

- Không iframe, `srcDoc`, raw HTML import ở runtime.
- Giữ 15 màn, catalog, game, legacy hash và fallback mock.
- API là source of truth; `hello-bong.v1` chỉ cache/migrate/mutation queue.
- Không lưu media camera/mic; chỉ aggregate được người dùng xác nhận.
- Không đổi luồng app chủ; giữ entry Học tiếng Anh.
- Visual cartoon pastel lấy cảm hứng từ ảnh tham chiếu, không copy asset.
- Mỗi task: test phù hợp, cập nhật docs, commit và push.

## Task 0 — API contract, model và sync foundation

**Files:** modify `server/models/EnglishLessonSession.js`,
`server/englishRoutes.js`, `server/englishRoutes.test.js`,
`api/english-records.js`; create `server/models/EnglishClassSettings.js`,
`src/features/english/hello-bong/services/englishApi.ts` và test.

- [ ] Viết test RED cho validation, class isolation, upsert/idempotency, lỗi;
  test client payload và queued retry.
- [ ] Thêm snapshot read; settings upsert; session create/update; observation
  upsert; practice create; confidence upsert. Giữ records API làm compatibility.
- [ ] Thêm `gameResults` aggregate và `clientMutationId`/unique semantics để
  retry không duplicate; không lưu media.
- [ ] Chạy focused/full test, lint/build; docs, commit/push.

## Task 1 — Catalog, compatibility state và offline queue

**Files:** catalog, store, store tests, cập nhật types nếu cần.

- [ ] Test RED migrate state cũ/malformed, pending recovery, `tieu-hoc` 5–6,
  fallback hôm nay.
- [ ] Port catalog `DL`, selectors, cache schema; hydrate snapshot, merge cache
  không ghi đè remote và hiện pending/error.
- [ ] Test full; docs, commit/push.

## Task 2 — Router và hash adapter

**Files:** router/test, `EnglishHub.tsx`, `App.tsx`.

- [ ] Test RED legacy lộ trình/game, route lạ, bài sai/mất params.
- [ ] Add nested routes/search params/hash adapter; bỏ iframe/runtime raw import.
- [ ] Test full; docs, commit/push.

## Task 3 — Shell, cartoon system và curriculum templates

**Files:** shell/mascot/map components, Home/Roadmap/Lesson routes, CSS, tests.

- [ ] Test RED `cd` thay data đúng, `b=1/2` thay bài.
- [ ] Implement home, roadmap, lesson, age selector, visual accessible.
- [ ] Visual compare desktop/mobile; test, docs, commit/push.

## Task 4 — Năm bước và tám game

**Files:** Look/Speak/Move/Game/Review routes, shared components và games.

- [ ] Test RED completion, picker fallback, scoring action cho từng game.
- [ ] Implement stage transitions, aggregate game vào session draft; chỉ Review
  save session API.
- [ ] Browser pass tất cả game; test, docs, commit/push.

## Task 5 — Khu Cô, tiếng Anh trong ngày, báo cáo, device

**Files:** route còn lại, capability service, report/export UI.

- [ ] Test RED filters, practice/confidence/settings saves, CSV, permission denied.
- [ ] Implement practice, reports, observations, persisted settings và fallback.
- [ ] Test/lint/build/browser; docs, commit/push.

## Task 6 — Migrate completion và regression

- [ ] Xóa prototype không còn import; xác nhận không iframe/raw mock runtime.
- [ ] Unit/integration, lint, build, E2E/browser desktop/mobile.
- [ ] So sánh route đại diện với mock, ghi lệch đã xác minh.
- [ ] Update PROJECT_MEMORY/FEATURE_MATRIX/TEST_REPORT, review diff, commit/push.

## Review focus

- URL legacy/query tiếng Việt map đúng hoặc fallback an toàn.
- `tieu-hoc` bị ẩn/từ chối cho 3–4, 4–5; bad params không stale data.
- Permission denied cleanup stream, vẫn tiếp tục được.
- Offline retry không duplicate; API lỗi không hiện là saved.
