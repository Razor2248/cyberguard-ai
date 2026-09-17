Goal:
Dựng src/app/dashboard/page.jsx + src/data/mock_dashboard.json — trang Tổng quan mà Sidebar đã trỏ tới (/dashboard) nhưng chưa có trang thật: banner điểm bảo mật, 4 thẻ số liệu, khối "Gia đình" tóm tắt, bảng quét gần đây, biểu đồ phân loại đe dọa + hoạt động trong tuần.
Scope:
Trong phạm vi:
src/app/dashboard/page.jsx
src/data/mock_dashboard.json
Banner đầu trang: avatar + tên + điểm bảo mật (số lớn + nhãn mức rủi ro).
Ô "Quét nhanh" (input + dropdown loại + nút Quét) — điều hướng sang /scan/loading khi submit (dung lại cơ chế đã có ở trang chủ, không viết logic quét mới)
4 thẻ số liệu (Tổng lượt quét / Mối đe dọa đang hoạt động / Mối đe dọa đã chặn / Điểm rủi ro)
Khối "Gia đình" — chỉ phần tóm tắt hiện ở dashboard (ticker cảnh báo, 3 card thành viên, bảng "Lịch sử gần đây của gia đình", nút "+ Thêm người thân"). Đây là bản tóm tắt, dùng cùng mock_family.json mà issue /family tạo — xem FYI cho thứ tự phụ thuộc
Bảng "Quét gần đây" + link "Xem tất cả" (trỏ /history, route đã tồn tại)
Donut "Phân loại đe dọa" + biểu đồ cột "Hoạt động trong tuần"
Khối "Cảnh báo" (danh sách 4 mục mẫu)
Ngoài phạm vi:
Trang /family đầy đủ (member detail, popup "Xem phân tích", popup thêm người thân) — issue riêng. Dashboard chỉ đọc mock_family.json không định nghĩa nó
AddFamilyModal thật — nút "+ Thêm người thân" ở dashboard trỏ sang /family thay vì tự mở modal tại đây, tránh 2 nơi cùng sở hữu một hành động
Biểu đồ tương tác (hover tooltip động, zoom) — chỉ cần render đúng số liệu tĩnh theo ảnh, không cần thư viện chart phức tạp (xem Ràng buộc kỹ thuật)
FYI:
mock_dashboard.json là dữ liệu của riêng dashboard (thống kê tổng, biểu đồ) — không chứa dữ liệu gia đình; khối "Gia đình" đọc từ mock_family.json (issue /family tạo).
Thứ tự phụ thuộc mock_family.json: issue này đọc file đó, issue /family tạo nó. Nếu /family chưa merge khi task này chạy, tự tạo một bản mock_family.json tối thiểu đúng hình dạng cần (3 thành viên, tên "Bố/Mẹ/Em" theo ảnh) để dashboard build được độc lập
Biểu đồ dùng SVG/CSS tĩnh, không cần thư viện chart. Donut và bar chart trong ảnh là dữ liệu tĩnh, số lượng phần tử cố định (5 loại đe dọa, 7 ngày trong tuần) — vẽ bằng SVG <circle>/<path> tay hoặc CSS conic-gradient cho donut, <div> chiều cao theo % cho bar chart. Không cần recharts/chart.js cho một biểu đồ tĩnh — thêm dependency mới cho việc này là quá tay
Ràng buộc kỹ thuật:
Mọi màu/spacing đi qua token trong src/app/globals.css. Hiện src/ có 0 giá trị gõ thẳng — giữ nguyên con số 0
<Badge variant="safe|warning|danger"> cho mọi nhãn mức rủi ro (AN TOÀN/ĐÁNG NGHI/NGUY HIỂM) — không tự dựng span màu riêng
Icon lấy từ lucide-react. Không SVG inline (trừ hình vẽ biểu đồ — không phải icon)
page.jsx tự bọc AppLayout, đúng một lần
Không hardcode danh sách dữ liệu (số liệu, bảng, cảnh báo) trong JSX — đọc từ mock_dashboard.json
