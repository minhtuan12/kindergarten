# Thiết kế: cụm Học tiếng Anh (Khu Bé và Khu Cô)

> CANCELLED 2026-10-21: feature removed at the user's request; application
> restored to 0efe1ae. Retained as historical reference only.

## Mục tiêu

Thêm một nút **Học tiếng Anh** trên trang chủ hiện tại. Nút mở một cụm
chức năng độc lập, lấy luồng và nội dung từ `mock.html`, gồm:

- **Khu Bé:** chọn độ tuổi, lộ trình/chủ đề, bài học năm bước và phần thưởng.
- **Khu Cô:** luyện phát âm, ghi buổi học, quan sát trẻ bằng mã ẩn danh và báo
  cáo tiến độ.

Mục tiêu là lưu được tiến độ thật của lớp và giáo viên; không biến dữ liệu mẫu
trong mock thành dữ liệu nghiệp vụ được coi là thật.

## Phạm vi phiên bản đầu

### Điều hướng và màn hình

1. Trang chủ hiện tại có ô/nút `Học tiếng Anh` dẫn vào `EnglishHub`.
2. `EnglishHub` hiển thị hai lối vào rõ ràng: `Khu Bé` và `Khu Cô`, cùng nút về
   trang chủ.
3. Khu Bé gồm:
   - chọn nhóm tuổi 3–4, 4–5 hoặc 5–6;
   - chọn chủ đề/bài học từ catalog nội bộ;
   - màn bài học năm bước: Nhìn, Nói, Vận động, Chơi, Ôn & khen;
   - hoàn thành bước/bài, nhận sao trong phiên.
4. Khu Cô gồm:
   - thực hành phát âm một từ, dùng Web Speech API khi trình duyệt hỗ trợ;
   - tự chấm tự tin 1–5;
   - biểu mẫu lưu buổi học;
   - quan sát trẻ bằng mã, mức 1–3;
   - báo cáo tổng hợp và trạng thái rỗng/lỗi/tải.

### Nội dung học

Phiên bản đầu có catalog nội bộ nhỏ, theo cùng kiểu dữ liệu mock: chủ đề, bài,
từ tiếng Anh, nghĩa tiếng Việt, emoji và câu mẫu. Không gọi AI để chấm phát âm;
trình duyệt không hỗ trợ nhận dạng giọng nói sẽ hiển thị trạng thái rõ ràng và
cho phép cô ghi nhận tự đánh giá thay vì tạo điểm giả.

### Không thuộc phạm vi

- Nhận diện tư thế/camera hoặc lưu media.
- Chấm phát âm AI có độ chính xác cao hay gửi audio ra dịch vụ ngoài.
- Đăng nhập, phân quyền nhiều giáo viên hoặc hồ sơ định danh trẻ.
- Sao chép toàn bộ hơn 3.000 dòng mã của `mock.html` vào ứng dụng.

## Kiến trúc và vị trí file

Tạo `src/features/english/` để cô lập feature, dự kiến gồm:

- `EnglishHub.tsx`, `EnglishChildArea.tsx`, `EnglishTeacherArea.tsx`;
- `englishCatalog.ts` cho nội dung học có kiểm soát;
- `englishApi.ts` cho các request;
- `englishTypes.ts` cho contract dùng chung ở frontend;
- các component nhỏ cho chọn bài, năm bước, biểu mẫu buổi học, quan sát và báo
  cáo.

`App.tsx` chỉ nhận thêm một nhánh điều hướng và giữ nguyên những luồng đang có.
Các endpoint Express và Vercel Function dùng cùng model Mongoose và contract.

Tạo `src/features/english/reference/` và **di chuyển** `mock.html` vào đó dưới
tên `mock.html`, để reference ở cùng cụm màn hình nhưng không được import hoặc
chạy như source sản phẩm.

## Thiết kế dữ liệu

Vì app chưa có xác thực, dữ liệu lớp cần một phạm vi tối thiểu. MVP yêu cầu cô
nhập `mã lớp` (3–40 ký tự) lần đầu mở Khu Cô; mã đó được lưu localStorage để
gửi kèm request. Đây không phải cơ chế bảo mật và sẽ được ghi rõ trên UI.

Các collection MongoDB:

| Collection | Trường chính | Mục đích |
|---|---|---|
| `EnglishLessonSession` | `classCode`, `date`, `ageGroup`, `topicId`, `lessonId`, `attendance`, `completedParticipants`, `movement {passed,total}`, `game {attempts,correct}`, `spokenWordIds`, `completedSteps`, `durationMinutes`, `note` | Một buổi học của lớp |
| `EnglishChildObservation` | `classCode`, `sessionId`, `childCode`, `level` (1–3) | Quan sát theo mã ẩn danh, không lưu tên hoặc dữ liệu nhạy cảm |
| `EnglishTeacherPractice` | `classCode`, `wordId`, `word`, `score?`, `selfAssessment?`, `createdAt` | Lịch sử luyện phát âm; `score` chỉ tồn tại nếu nguồn chấm có kết quả thật |
| `EnglishTeacherConfidence` | `classCode`, `date`, `level` (1–5) | Tự đánh giá hằng ngày |

Validation ở API giới hạn độ dài chuỗi, enum tuổi/mức, số không âm và giới hạn
danh sách. API chỉ trả dữ liệu thuộc `classCode` đã gửi. Không lưu video, hình
camera, transcript/audio hay tên thật của trẻ.

## Trạng thái và xử lý lỗi

- Form bị chặn khi trường bắt buộc thiếu hoặc số liệu không hợp lệ, có thông
  báo cạnh trường.
- Request có loading/disabled state; lỗi mạng/API có nút thử lại.
- Danh sách và báo cáo có empty state rõ ràng.
- Hoàn thành bài ở Khu Bé vẫn hoạt động khi API không khả dụng; không tuyên bố
  đã lưu tiến độ lớp nếu request lưu thất bại.
- Tính năng microphone chỉ xin quyền sau thao tác trực tiếp của người dùng.

## Tiêu chí nghiệm thu

1. Từ trang chủ đi được tới EnglishHub và quay lại không làm hỏng điều hướng
   hiện có.
2. Trẻ có thể chọn tuổi, bài, hoàn thành đủ năm bước và nhận xác nhận hoàn
   thành.
3. Cô có thể lưu/đọc một buổi học hợp lệ; API từ chối payload thiếu hoặc sai.
4. Cô có thể lưu/đọc quan sát 1–3 theo mã trẻ, luyện phát âm và tự tin 1–5.
5. Báo cáo tính từ dữ liệu API đã lưu, không từ dữ liệu mẫu giả.
6. Màn hình hiển thị dùng được ở mobile và desktop; điều khiển có nhãn/aria
   phù hợp.
7. `mock.html` nằm trong folder reference của feature; app không phụ thuộc vào
   runtime của file mock.

## Kế hoạch kiểm thử

- Thêm test unit cho validation/model helpers và phép tính báo cáo.
- Thêm test API cho create/list và payload không hợp lệ.
- Thêm component test cho luồng năm bước, validation form và các trạng thái
  empty/error khi hạ tầng test hiện có được xác định/cài đặt theo dependency
  hiện hữu.
- Chạy lint/typecheck (`npm run lint`) và build (`npm run build`); chạy test
  mới và kiểm tra UI bằng trình duyệt nếu môi trường hỗ trợ.

## Quyết định cần duyệt

Thiết kế trên dùng **mã lớp tự nhập, lưu localStorage** để phân vùng dữ liệu do
repository chưa có đăng nhập. Nó phù hợp cho MVP nội bộ nhưng không thay thế
đăng nhập/phân quyền. Nếu dữ liệu sẽ dùng ngoài lớp thử nghiệm, cần bổ sung xác
thực trước khi đưa vào sử dụng thực tế.
