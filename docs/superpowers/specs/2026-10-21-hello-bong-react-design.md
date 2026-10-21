# Thiết kế chuyển Hello Bông từ HTML sang React

> CANCELLED 2026-10-21: implementation removed at the user's request.
> Historical reference only; application source restored to 0efe1ae.

## Mục tiêu

Thay iframe bằng cụm React thật cho Hello Bông. Cụm này giữ nội dung, luồng học,
catalog và ý nghĩa giao diện của `src/features/english/reference/mock.html`.
Nút Học tiếng Anh ở trang chủ hiện có vẫn là điểm vào của cụm mới.

## Hành vi và router

- Giữ 15 màn: `trang-chu`, `lo-trinh`, `bai`, `mot-ngay`, `cai-dat`,
  `gioi-thieu`, `nhin`, `noi`, `van-dong`, `choi`, `on`, `co`,
  `co-luyen`, `tien-bo`, `day-bong`.
- Giữ catalog mock: tuổi 34/45/56, 11 chủ đề, hai bài/chủ đề, từ vựng, câu,
  lệnh, gợi ý, điều kiện tuổi và tám trò chơi.
- Dùng React Router dưới `/hoc-tieng-anh`: lộ trình, bài, ngày, khu Cô, các
  màn riêng và năm bước học. Search params giữ `tuoi`, `i`, `ds`, `tu`,
  `k`, `chup`, `mau`.
- Adapter chuyển legacy hash `#man&key=value` sang URL React. Hash lạ về trang
  chủ; bài thiếu/sai chủ đề về lộ trình; bước/game thiếu chủ đề dùng gợi ý hôm nay.
- Web Speech, microphone, camera, fullscreen, CSV có fallback rõ ràng khi trình
  duyệt không hỗ trợ hoặc người dùng từ chối quyền.

## Lưu dữ liệu và API

API English/MongoDB là nguồn dữ liệu chính cho dữ liệu bền vững.
`hello-bong.v1` chỉ dùng để migrate state mock cũ, cache và hàng đợi offline
có thể khôi phục. Chỉ hiển thị “đã lưu” sau API thành công; offline/lỗi phải
hiện pending/error để thử lại. Không gửi tên thật, ảnh/video/frame camera hay
âm thanh thô lên backend.

| Thao tác | Bản ghi API | Dữ liệu được lưu |
| --- | --- | --- |
| Lưu ôn cuối bài | `EnglishLessonSession` | tuổi/chủ đề/bài, bước hoàn tất, số liệu aggregate, từ đã nói, thời lượng, ghi chú |
| Lưu quan sát trẻ | `EnglishChildObservation` | mã trẻ trong lớp và mức quan sát |
| Cô luyện phát âm | `EnglishTeacherPractice` | từ/câu, điểm, tự đánh giá; không audio |
| Tự tin hằng ngày | `EnglishTeacherConfidence` | một mức theo lớp/ngày |
| Thiết lập lớp | `EnglishClassSettings` mới | tuổi chọn, UI preference, weekly phrase id |

Session có `gameResults` aggregate (`type`, `attempts`, `correct`) cho tám
trò chơi; không event stream hay media. Observation upsert idempotent theo
lớp/ngày/chủ đề/bài/mã trẻ. Giữ `/api/english-records` làm adapter tương thích;
thêm endpoint resource cho snapshot, settings và từng loại ghi dữ liệu.

## Cấu trúc

- `data/helloBongCatalog.ts`: catalog `DL` typed.
- `state/helloBongStore.ts`: migrate/cache, selectors, pending mutation, CSV.
- `services/englishApi.ts`: snapshot, writes, error mapping, replay offline.
- `routes/`: 15 màn và template dùng chung.
- `components/`: shell, mascot, map, stage năm bước, flashcard, game, report.
- `services/browserCapabilities.ts`: speech/camera/fullscreen/audio + cleanup.

## Hình ảnh

Giữ hierarchy và màu khu Cô/Bé của mock; áp dụng pastel hoạt hình theo ảnh tham
chiếu: trời/mây/đồi cỏ, card bo tròn dày, mascot và decal. Không dùng ảnh tham
chiếu làm asset trực tiếp nếu không có quyền/tệp asset riêng.

## Nghiệm thu

- Unit test hash/fallback/selectors/API payload/offline queue/error.
- Server test validation, cô lập lớp, upsert/idempotency và lỗi.
- Component test lộ trình → bài → năm bước; Cô/Bé; validation/device state.
- Browser E2E template đại diện, tám game, desktop/mobile.
- So sánh mock tại lộ trình, bài, nhìn, chơi, cô-luyện, tiến-bộ.
- Không còn iframe, `srcDoc` hay raw import mock ở runtime.
