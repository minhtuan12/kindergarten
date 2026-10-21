
# Project Engineering Rules

## 1. Mục tiêu

Duy trì, hoàn thiện và kiểm thử dự án dựa trên HTML tham chiếu,
source code, tài nguyên và hành vi hiện có.

Mỗi thay đổi phải:
- Có mục tiêu và tiêu chí nghiệm thu rõ ràng.
- Phù hợp kiến trúc, quy ước và dependency của dự án.
- Có kiểm thử tương xứng với mức độ rủi ro.
- Được xác minh bằng kết quả thực tế trước khi báo hoàn thành.
- Được ghi lại để phiên làm việc sau có thể tiếp tục.

Không tuyên bố đã chạy, đã test, đã scan hoặc đã sửa thành công
nếu chưa có bằng chứng thực tế.

## 2. Quy tắc bắt buộc khi bắt đầu phiên

Trước khi chỉnh sửa bất kỳ file nào:

1. Đọc file AGENTS.md này.
2. Đọc docs/WORKFLOW.md.
3. Đọc docs/PROJECT_MEMORY.md.
4. Đọc docs/FEATURE_MATRIX.md và docs/TEST_REPORT.md nếu tồn tại.
5. Kiểm tra git status, nhánh hiện tại và các thay đổi chưa commit.
6. Xác định mục tiêu người dùng trong phiên hiện tại.
7. Kiểm tra các file, thư mục và cấu hình thực tế liên quan.
8. Xác định skill Superpowers phù hợp và kích hoạt workflow tương ứng.

Không mặc định rằng báo cáo cũ vẫn chính xác với source hiện tại.
Không ghi đè các thay đổi chưa commit của người dùng.
Không xóa file hoặc thay đổi cấu hình lớn chỉ để làm cho test chạy.

## 3. Bắt buộc sử dụng Superpowers

Nếu Superpowers đã được cài đặt và khả dụng:

- Đọc và tuân thủ skill using-superpowers.
- Dùng brainstorming khi cần làm rõ yêu cầu hoặc quyết định thiết kế.
- Dùng writing-plans cho công việc nhiều bước hoặc có phạm vi lớn.
- Dùng test-driven-development để triển khai chức năng có thể kiểm thử.
- Dùng systematic-debugging khi điều tra lỗi.
- Dùng verification-before-completion trước khi báo hoàn thành.
- Dùng requesting-code-review khi phù hợp và có khả năng review.

Nếu có nhiều task độc lập, cân nhắc subagent-driven-development
hoặc dispatching-parallel-agents theo hướng dẫn Superpowers.

Không tự tạo nội dung giả rồi khẳng định đó là skill chính thức
của Superpowers.

Nếu Superpowers không khả dụng:
- Nêu rõ tình trạng.
- Tiếp tục theo quy trình kiểm soát chất lượng trong file này.
- Không tuyên bố đã sử dụng Superpowers.
- Không tự ý cài đặt hoặc thay đổi công cụ toàn cục khi chưa được phép.

## 4. Kiểm tra source trước khi triển khai

Tìm và xác định:

- HTML tham chiếu và các trang liên quan.
- CSS, JavaScript/TypeScript và component.
- Routing, state management và data flow.
- API, backend, database và authentication nếu có.
- Assets, fonts, icons và thư viện giao diện.
- Package manager, scripts, build tool và framework.
- Cấu hình lint, typecheck, test, build và CI.
- Test hiện có, mock, fixture và dữ liệu mẫu.
- Các file generated, secrets và file không được sửa.

Ưu tiên lệnh đọc, tìm kiếm và kiểm tra không phá hủy.
Không in secrets hoặc dữ liệu nhạy cảm vào log, báo cáo hay tài liệu.

## 5. Quy tắc triển khai

- Giữ nguyên stack hiện tại nếu không có lý do rõ ràng để thay đổi.
- Ưu tiên tái sử dụng component, utility và dependency hiện có.
- Đối chiếu HTML về bố cục, typography, màu sắc, khoảng cách,
  responsive behavior, tương tác và trạng thái giao diện.
- Không chỉ tạo giao diện tĩnh nếu HTML thể hiện chức năng thực.
- Xác định trạng thái loading, empty, success và error khi phù hợp.
- Không giả lập backend như thể đó là backend thật.
- Không hardcode dữ liệu nghiệp vụ chỉ để làm cho demo trông đúng.
- Không thêm dependency nếu chức năng hiện có đáp ứng được.
- Không sửa ngoài phạm vi nếu không cần thiết.
- Không xóa test hoặc giảm assertion để làm cho test pass.

Nếu HTML tham chiếu và hành vi source mâu thuẫn nhau,
ghi nhận sự khác biệt, tìm hiểu ý định và chọn phương án
phù hợp nhất với yêu cầu người dùng.

## 6. Kiểm thử bắt buộc

Sau thay đổi, chọn và chạy những kiểm tra phù hợp:

1. Unit test.
2. Integration test.
3. Component/UI test.
4. End-to-end test nếu môi trường hỗ trợ.
5. Lint và typecheck.
6. Build hoặc compile.
7. Kiểm tra giao diện và responsive khi có thể.
8. Regression test cho chức năng bị ảnh hưởng.

Không tạo test chỉ để kiểm tra implementation nội bộ một cách
mong manh nếu có thể kiểm tra hành vi người dùng.

Nếu test thất bại:
- Thu thập thông báo lỗi đầy đủ.
- Điều tra nguyên nhân gốc.
- Sửa nguyên nhân, không che giấu triệu chứng.
- Chạy lại test thất bại.
- Chạy lại các test liên quan.
- Chạy kiểm tra tổng thể phù hợp trước khi kết thúc.

Nếu không thể chạy test vì thiếu môi trường hoặc dịch vụ,
ghi rõ test nào chưa chạy và lý do.

## 7. Tiêu chuẩn hoàn thành

Chỉ đánh dấu hoàn thành khi:

- Chức năng đã được triển khai hoặc giới hạn còn lại được nêu rõ.
- Test tương ứng đã chạy và có kết quả ghi nhận.
- Không có lỗi mới chưa được giải thích.
- Build, lint và typecheck đã được xác minh khi áp dụng.
- Tài liệu bộ nhớ và báo cáo test đã được cập nhật.
- Các giới hạn và việc chưa làm được ghi rõ.

Không được đánh đồng:
- Đã viết test với đã chạy test.
- Đã chạy test với test đã pass.
- Đã kiểm tra một phần với đã scan toàn bộ.
- Build thành công với toàn bộ chức năng đã đúng.

## 8. Cập nhật bộ nhớ

Kết thúc mỗi task có thay đổi thực chất:

- Cập nhật docs/PROJECT_MEMORY.md.
- Cập nhật docs/FEATURE_MATRIX.md nếu chức năng hoặc trạng thái thay đổi.
- Ghi kết quả vào docs/TEST_REPORT.md.
- Ghi file đã thay đổi, lý do, test đã chạy và kết quả.
- Ghi việc còn tồn đọng, blocker và bước tiếp theo.
- Ghi ngày kiểm tra và phạm vi đã thực sự scan.

Không lưu toàn bộ log dài vào bộ nhớ dự án.
Chỉ lưu thông tin ổn định, đã xác minh và hữu ích cho phiên sau.

## 9. Bảo vệ dữ liệu và thay đổi người dùng

- Không reset, checkout hoặc revert thay đổi người dùng tùy tiện.
- Không xóa dữ liệu, database, migration hoặc assets hàng loạt.
- Không commit, push, deploy hoặc thay đổi production nếu chưa được phép.
- Không đưa secrets vào file Markdown.
- Trước thao tác phá hủy, đánh giá ảnh hưởng và yêu cầu xác nhận khi cần.

## 10. Báo cáo cuối phiên

Báo cáo bằng tiếng Việt, ngắn gọn nhưng đủ bằng chứng:

1. Đã hoàn thành những gì.
2. File tạo mới và file đã sửa.
3. Chức năng đã triển khai.
4. Test và lệnh đã chạy.
5. Kết quả pass/fail hoặc blocked.
6. Các lỗi phát hiện và cách xử lý.
7. Phạm vi đã scan và phạm vi chưa scan.
8. Việc còn tồn đọng.
9. File bộ nhớ đã cập nhật.