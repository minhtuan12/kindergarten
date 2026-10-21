
# WORKFLOW — Source Analysis, Implementation, Testing and Handoff

## 1. Mục đích

Đây là quy trình chuẩn cho mọi phiên làm việc với repository.

Nguồn thông tin được ưu tiên theo thứ tự:

1. Yêu cầu cụ thể mới nhất của người dùng.
2. Source code và cấu hình thực tế.
3. HTML tham chiếu và tài liệu yêu cầu.
4. Test hiện có và kết quả thực thi.
5. PROJECT_MEMORY.md và các báo cáo lịch sử.
6. Nhận định của agent, phải được xác minh trước khi dùng làm sự thật.

Bộ nhớ là chỉ mục và bản ghi trạng thái, không phải nguồn thay thế source.

## 2. Giai đoạn A — Khởi động phiên

1. Đọc AGENTS.md.
2. Đọc docs/WORKFLOW.md.
3. Đọc docs/PROJECT_MEMORY.md.
4. Đọc docs/FEATURE_MATRIX.md và docs/TEST_REPORT.md.
5. Kiểm tra git status, branch, diff và các file chưa được theo dõi.
6. Xác định yêu cầu hiện tại và tiêu chí nghiệm thu.
7. Xác định phạm vi file, module và chức năng có thể bị ảnh hưởng.
8. Kiểm tra Superpowers có sẵn hay không.
9. Chọn skill thích hợp trước khi bắt đầu triển khai.

Nếu yêu cầu mới tiếp nối công việc cũ, sử dụng bộ nhớ để tìm đúng
module và test liên quan, sau đó xác minh chúng trong source hiện tại.

Không quét lại vô điều kiện toàn bộ repository ở mọi phiên.

## 3. Giai đoạn B — Xác định phạm vi scan

Phân loại file:

- Entry points và routing.
- HTML/reference pages.
- UI components.
- Styles, themes và responsive rules.
- Business logic và state.
- API clients, backend và persistence.
- Authentication và authorization.
- Assets, fonts và icons.
- Tests, fixtures và mocks.
- Package/configuration/CI.
- Generated files, vendor và build output.

Dùng công cụ tìm kiếm file và symbol để xác định phạm vi.
Loại trừ node_modules, dist, build, coverage, vendor và thư mục
generated khỏi scan nội dung sâu, trừ khi chúng là đối tượng điều tra.

Không đọc hàng loạt file nhị phân hoặc file sinh tự động.
Không đưa secrets hoặc dữ liệu người dùng vào báo cáo.

Phải ghi nhận:
- Thư mục đã duyệt.
- File đã đọc.
- File chỉ thống kê tên.
- File bị loại trừ và lý do.
- Các khu vực chưa thể truy cập.
- Mốc thời gian và trạng thái source khi scan.

## 4. Giai đoạn C — Đối chiếu HTML và source

Với mỗi trang hoặc chức năng, xác định:

1. Route hoặc entry point.
2. Thành phần giao diện.
3. Nội dung và dữ liệu đầu vào.
4. Hành động người dùng.
5. State trước và sau hành động.
6. Quy tắc validation.
7. API hoặc persistence liên quan.
8. Trạng thái loading, empty, success, error.
9. Responsive và accessibility.
10. Test hiện có và test còn thiếu.

Tạo hoặc cập nhật FEATURE_MATRIX.md.

Mỗi chức năng cần có:
- ID duy nhất.
- Tên chức năng.
- Nguồn tham chiếu.
- File/component liên quan.
- Hành vi mong đợi.
- Test case.
- Trạng thái triển khai.
- Trạng thái xác minh.
- Bằng chứng hoặc blocker.

Không đánh dấu chức năng hoàn thành chỉ vì đã tồn tại component.

## 5. Giai đoạn D — Thiết kế và lập kế hoạch

Kích hoạt Superpowers brainstorming khi cần khám phá yêu cầu,
giải quyết mâu thuẫn hoặc chọn thiết kế.

Với task phức tạp:
- Chia thành các phần nhỏ.
- Xác định dependency và thứ tự triển khai.
- Định nghĩa tiêu chí nghiệm thu.
- Liệt kê rủi ro và phương án kiểm tra.
- Tạo implementation plan khi phù hợp.

Với bug đã rõ nguyên nhân và phạm vi nhỏ, không cần kéo dài
brainstorming không cần thiết. Vẫn phải điều tra và xác minh.

Không hỏi lại người dùng về thông tin đã có thể xác định từ source.
Chỉ hỏi khi thiếu thông tin thiết yếu và không thể suy ra an toàn.

## 6. Giai đoạn E — Triển khai theo test

Dùng Superpowers test-driven-development khi phù hợp.

Quy trình:

1. Xác định hành vi cần có.
2. Tạo hoặc cập nhật test thất bại cho hành vi đó.
3. Chạy test để xác minh test thực sự bắt được lỗi.
4. Viết thay đổi nhỏ nhất đáp ứng yêu cầu.
5. Chạy lại test và xác nhận pass.
6. Refactor nếu cần, giữ test pass.
7. Chạy test hồi quy cho vùng bị ảnh hưởng.

Không tạo test giả chỉ để đạt trạng thái pass.
Không bỏ assertion quan trọng để né lỗi.
Không thay đổi expected result nếu chưa chứng minh expected cũ sai.

Với giao diện, kiểm tra cả hình thức và hành vi.
Với API, kiểm tra response, validation, error handling và quyền truy cập.
Với dữ liệu, kiểm tra persistence, tính nhất quán và trường hợp biên.

## 7. Giai đoạn F — Điều tra và sửa lỗi

Khi có lỗi:

1. Tái hiện lỗi.
2. Lưu thông báo và điều kiện tái hiện.
3. Thu hẹp phạm vi.
4. Xây dựng giả thuyết nguyên nhân.
5. Kiểm tra giả thuyết bằng bằng chứng.
6. Xác định root cause.
7. Viết regression test.
8. Sửa nguyên nhân gốc.
9. Chạy test tái hiện lỗi.
10. Chạy test hồi quy liên quan.
11. Ghi nguyên nhân và cách sửa vào TEST_REPORT.md.

Sử dụng systematic-debugging của Superpowers.
Không sửa nhiều giả thuyết cùng lúc khi chưa có lý do.
Không kết luận đã sửa nếu không tái xác minh.

## 8. Giai đoạn G — Kiểm tra tổng thể

Chạy các lệnh dựa trên package scripts và công cụ thực tế:

- Unit tests.
- Integration tests.
- End-to-end tests.
- Lint.
- Typecheck.
- Build.
- Kiểm tra dependency/configuration.
- UI và responsive verification nếu khả dụng.

Không tự giả định lệnh npm, pnpm, yarn, pytest hoặc composer.
Đọc package.json, lockfile, pyproject.toml hoặc cấu hình tương ứng trước.

Nếu một lệnh thất bại:
- Xác định lỗi do thay đổi hiện tại hay môi trường.
- Sửa lỗi thuộc phạm vi task.
- Không sửa unrelated code chỉ để làm sạch báo cáo.
- Ghi rõ các kiểm tra bị chặn.

Nếu có browser automation, kiểm tra các luồng quan trọng
trên giao diện chạy thực tế, không chỉ đọc source.

## 9. Giai đoạn H — Review

Review thay đổi để tìm:

- Sai lệch so với yêu cầu.
- Regression.
- Logic sai hoặc thiếu validation.
- Lỗi bảo mật và quyền truy cập.
- Accessibility và responsive issues.
- Code trùng lặp hoặc complexity không cần thiết.
- Test yếu, thiếu case hoặc không ổn định.
- Thay đổi ngoài phạm vi.
- Tài liệu không còn khớp source.

Dùng Superpowers requesting-code-review khi phù hợp.
Nếu sử dụng subagent, cung cấp phạm vi rõ ràng và yêu cầu báo cáo
có file/line và bằng chứng. Không mặc định subagent đã chạy test.

## 10. Giai đoạn I — Cập nhật bộ nhớ

Sau mỗi task có thay đổi thực chất:

PROJECT_MEMORY.md:
- Kiến trúc và entry points đã xác minh.
- Các module quan trọng.
- Lệnh chạy và kiểm thử.
- Những quyết định còn hiệu lực.
- Trạng thái hiện tại và bước tiếp theo.

FEATURE_MATRIX.md:
- Trạng thái từng chức năng.
- Liên kết đến test.
- Bằng chứng xác minh.
- Những chức năng còn thiếu.

TEST_REPORT.md:
- Ngày chạy.
- Commit hoặc source revision nếu xác định được.
- Lệnh thực tế đã chạy.
- Kết quả và số lượng test nếu công cụ cung cấp.
- Lỗi, nguyên nhân, cách sửa.
- Kiểm tra chưa chạy và lý do.

Không ghi trạng thái PASS nếu chỉ đọc code.
Không ghi SCANNED nếu chỉ thấy tên file.
Không xóa lịch sử có giá trị khi cập nhật báo cáo.

## 11. Giai đoạn J — Kết thúc phiên

Dùng verification-before-completion của Superpowers.

Trước khi kết thúc:

1. Kiểm tra diff cuối.
2. Kiểm tra file không liên quan bị thay đổi.
3. Chạy lại các kiểm tra cần thiết sau thay đổi cuối cùng.
4. Cập nhật tài liệu và báo cáo.
5. Xác nhận trạng thái Git.
6. Tóm tắt việc đã làm và bằng chứng.
7. Nêu blocker, rủi ro và bước tiếp theo.

## 12. Quy trình tiếp tục ở phiên sau

Phiên mới phải đọc PROJECT_MEMORY.md để định vị công việc.

Sau đó:
- Xác minh các file trọng tâm vẫn tồn tại.
- Kiểm tra git status và thay đổi kể từ lần scan trước.
- Đọc diff và test mới liên quan.
- Chỉ mở rộng scan khi phát hiện thay đổi, mâu thuẫn hoặc rủi ro.
- Cập nhật bộ nhớ nếu kiến thức cũ không còn đúng.

Mục tiêu là tránh đọc lại không cần thiết, không phải bỏ qua xác minh.
