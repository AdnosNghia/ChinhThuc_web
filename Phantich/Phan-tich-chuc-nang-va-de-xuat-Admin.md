# PHÂN TÍCH CHỨC NĂNG WEBSITE & ĐỀ XUẤT TRANG ADMIN
**Website:** chinhthucmayktscnc.com — Công ty TNHH Chính Thực (máy cắt kỹ thuật số CNC, lưỡi dao, thảm nỉ, đầu dao)
**Nền tảng hiện tại:** WordPress + WooCommerce (dùng WooCommerce như catalog, **không** có thanh toán online — mô hình "Giá: Liên hệ")

---

## PHẦN 1 — KẾT QUẢ QUÉT: CÁC CHỨC NĂNG ĐÃ CÓ TRÊN WEBSITE

### 1.1 Cấu trúc menu / sitemap
```
Trang chủ
Giới thiệu (tầm nhìn, sứ mệnh, giá trị cốt lõi)
Sản phẩm (/shop/)
 ├─ Máy cắt KTS
 ├─ Lưỡi dao
 ├─ Thảm nỉ
 └─ Đầu dao máy cắt KTS
Sản xuất - Gia công tùy chỉnh (trang dịch vụ OEM)
Dự án (chuyên mục blog)
Tin tức (chuyên mục blog)
Liên hệ
```
Header phụ: hotline click-to-call (0916 412 896), icon giỏ hàng, ô tìm kiếm.

### 1.2 Trang chủ
- Banner/slider quảng cáo (carousel ảnh có link).
- Khối "Sản phẩm bán chạy" (sản phẩm nổi bật, tự chọn thủ công hoặc theo lượt bán).
- Khối danh mục nhanh: Máy cắt / Lưỡi dao / Thảm / Đầu dao (ảnh đại diện + link tới category).
- Khối "Kiến thức" — liệt kê bài viết tin tức mới nhất.
- Footer: thông tin công ty (địa chỉ, hotline, Zalo, 2 email, Facebook), menu chính sách (bảo mật, điều khoản), liên kết mạng xã hội.

### 1.3 Trang Sản phẩm (Shop – WooCommerce)
- Danh sách sản phẩm dạng lưới, phân trang.
- Sidebar: danh mục sản phẩm (widget product-categories).
- Sắp xếp sản phẩm (woocommerce-ordering: theo mới nhất, giá…).
- Ô tìm kiếm.
- **Không hiển thị giá thật** — tất cả sản phẩm ghi "Giá: Liên hệ".
- Mỗi sản phẩm có form liên hệ nhanh (Contact Form 7: họ tên, email, SĐT, lời nhắn) ngay trên trang danh sách/chi tiết.

### 1.4 Trang chi tiết sản phẩm
- Breadcrumb (Trang chủ > Danh mục > Sản phẩm).
- Gallery ảnh sản phẩm (hiện tại đa số chỉ có 1 ảnh).
- Tab "Mô tả sản phẩm" (nội dung dài: tính năng, bảng thông số kỹ thuật theo từng mã máy).
- Tab "Đánh giá" (review WooCommerce — yêu cầu đăng nhập & đã mua mới được đánh giá; hiện chưa có đánh giá nào → tính năng gần như không dùng được vì không có checkout).
- Danh mục & thẻ sản phẩm (product_meta).
- Icon chia sẻ mạng xã hội (Facebook, Zalo).
- Giỏ hàng WooCommerce tồn tại (icon giỏ hàng, "chưa có sản phẩm trong giỏ") nhưng **không có quy trình thanh toán thực tế** — chỉ dùng để trưng bày.

### 1.5 Trang Giới thiệu
Nội dung tĩnh: tổng quan công ty, tầm nhìn, sứ mệnh, giá trị cốt lõi (Chính trực, Trách nhiệm, Đoàn kết…), kinh nghiệm kỹ sư nước ngoài 12+ năm.

### 1.6 Trang "Sản xuất - Gia công tùy chỉnh"
Trang dịch vụ mô tả năng lực gia công/tùy chỉnh máy móc theo yêu cầu khách hàng.

### 1.7 Trang Dự án / Tin tức
Chuyên mục blog WordPress (archive theo category), liệt kê bài viết; hiện dữ liệu mẫu đang trống. Có widget danh mục sản phẩm ở sidebar.

### 1.8 Trang Liên hệ
- Thông tin công ty: địa chỉ, hotline, 2 email, Zalo, Facebook.
- 2 form Contact Form 7 (form liên hệ chung).
- Icon giỏ hàng, ô tìm kiếm (thừa hưởng từ theme).

### 1.9 Chức năng dùng chung toàn site
- Tìm kiếm WordPress (searchform) — xuất hiện lặp lại nhiều nơi.
- Click-to-call hotline.
- Liên kết Zalo/Facebook.
- Form liên hệ (Contact Form 7) lặp lại ở nhiều trang (trang sản phẩm, trang liên hệ).
- Giỏ hàng WooCommerce (chức năng "chết" — không có thanh toán).
- Chính sách bảo mật / điều khoản sử dụng (trang tĩnh, hiện là placeholder "#").

### 1.10 Nhận xét tổng thể
Đây là một **website catalog B2B** (giới thiệu sản phẩm công nghiệp máy cắt CNC, lưỡi dao, phụ kiện), khách hàng xem sản phẩm rồi **liên hệ trực tiếp** (điện thoại/Zalo/form) để được báo giá — không bán hàng trực tuyến. WooCommerce hiện chỉ được tận dụng để có sẵn cấu trúc danh mục/sản phẩm/gallery, phần giỏ hàng - thanh toán - đánh giá gần như bỏ trống hoặc không hoạt động đúng mục đích.

---

## PHẦN 2 — ĐỀ XUẤT CHỨC NĂNG TRANG ADMIN (QUẢN TRỊ) ĐỂ XÂY DỰNG WEBSITE HOÀN CHỈNH

Mục tiêu: admin có thể tự vận hành toàn bộ nội dung mà không cần sửa code, đúng với mô hình "catalog + lead generation" của công ty.

### 2.1 Quản lý Sản phẩm
- CRUD sản phẩm: tên, mô tả ngắn/dài (rich text), ảnh đại diện + **gallery nhiều ảnh**, video giới thiệu (YouTube embed).
- Quản lý **danh mục sản phẩm** (thêm/sửa/xóa: Máy cắt KTS, Lưỡi dao, Thảm nỉ, Đầu dao...), cho phép danh mục con.
- Bảng **thông số kỹ thuật** dạng cấu trúc (key–value hoặc bảng nhiều model/mã máy trong cùng 1 sản phẩm) thay vì nhét cứng trong mô tả.
- Trường **giá**: cho phép chọn hiển thị "Liên hệ" hoặc giá cụ thể (tùy sản phẩm).
- Gắn nhãn: "Sản phẩm bán chạy" / "Sản phẩm nổi bật" / "Mới" để hiển thị ở trang chủ.
- Quản lý **file tài liệu đính kèm** (catalogue PDF, brochure) cho từng sản phẩm.
- Quản lý **sản phẩm liên quan** (chọn thủ công hoặc tự động theo danh mục).
- SEO cho từng sản phẩm: meta title, meta description, URL slug, alt ảnh.
- Ẩn/hiện sản phẩm, sắp xếp thứ tự hiển thị (kéo-thả).
- Import/Export sản phẩm hàng loạt (Excel/CSV) — hữu ích khi có nhiều mã máy/model.

### 2.2 Quản lý Danh mục & Menu
- Quản lý cây danh mục sản phẩm.
- Trình quản lý menu điều hướng (kéo-thả, thêm/xóa mục, submenu).
- Quản lý banner/slider trang chủ (ảnh, link, thứ tự, lịch hiển thị bật/tắt theo thời gian).
- Quản lý các khối trang chủ (chọn sản phẩm hiển thị ở "Sản phẩm bán chạy", "Máy cắt", "Lưỡi dao"...).

### 2.3 Quản lý Tin tức / Dự án (Blog)
- CRUD bài viết: tiêu đề, ảnh đại diện, nội dung rich text, danh mục (Tin tức/Dự án), tag.
- Lên lịch đăng bài (draft/scheduled/published).
- SEO bài viết (meta, slug).
- Quản lý bình luận (nếu bật) — duyệt/xóa/spam.

### 2.4 Quản lý Trang tĩnh
- CRUD nội dung: Giới thiệu, Sản xuất - Gia công tùy chỉnh, Chính sách bảo mật, Điều khoản sử dụng, Hướng dẫn mua hàng, Chính sách đổi trả — hiện các link này đang là "#" (chưa có nội dung thật), cần trình soạn thảo để nhập nội dung.

### 2.5 Quản lý Liên hệ & Khách hàng tiềm năng (Lead / CRM cơ bản)
- **Hộp thư yêu cầu báo giá**: tổng hợp toàn bộ dữ liệu từ các form liên hệ (form trên trang sản phẩm + trang liên hệ) vào 1 bảng: tên, email, SĐT, sản phẩm quan tâm, nội dung, thời gian gửi.
- Trạng thái xử lý lead: Mới / Đang tư vấn / Đã báo giá / Đã chốt / Không tiềm năng.
- Ghi chú nội bộ, gán nhân viên phụ trách.
- Xuất danh sách lead ra Excel.
- Thông báo email/Zalo/Telegram tự động cho admin khi có lead mới.
- Chống spam (Google reCAPTCHA) cho form liên hệ.

### 2.6 Quản lý Thông tin công ty & Widget footer/header
- Sửa nhanh: địa chỉ, hotline, Zalo, email, link Facebook — không cần vào từng widget riêng lẻ (hiện đang tách rời, khó đồng bộ).
- Cấu hình icon chat nổi (Zalo/Messenger/Hotline nổi góc màn hình).
- Quản lý bản đồ Google Maps hiển thị ở trang liên hệ.

### 2.7 Quản lý Người dùng & Phân quyền
- Tài khoản quản trị viên, phân quyền theo vai trò: Admin toàn quyền / Biên tập viên nội dung / Nhân viên kinh doanh (chỉ xem & xử lý lead) / Nhân viên (chỉ đăng bài).
- Nhật ký hoạt động (ai sửa gì, khi nào).

### 2.8 SEO & Marketing
- Cấu hình SEO tổng (site title, meta mặc định, sitemap.xml, robots.txt).
- Tích hợp Google Analytics / Google Tag Manager / Facebook Pixel.
- Quản lý redirect 301 (khi đổi URL sản phẩm/bài viết tránh lỗi 404).

### 2.9 Thống kê & Báo cáo (Dashboard)
- Sản phẩm được xem nhiều nhất.
- Số lượng lead/yêu cầu liên hệ theo ngày/tháng, theo danh mục sản phẩm.
- Nguồn traffic cơ bản (nếu tích hợp GA).

### 2.10 Cấu hình hệ thống
- Sao lưu/khôi phục dữ liệu (backup).
- Quản lý media (thư viện ảnh dùng chung, tối ưu/nén ảnh tự động).
- Quản lý ngôn ngữ (nếu sau này mở rộng đa ngôn ngữ, ví dụ thêm tiếng Anh cho khách quốc tế — công ty có nói tới "kỹ sư nước ngoài").

---

## PHẦN 3 — GHI CHÚ KỸ THUẬT & KHUYẾN NGHỊ

1. **Bỏ giỏ hàng/thanh toán WooCommerce thật** nếu công ty xác nhận mô hình vẫn là "liên hệ báo giá" — thay bằng nút **"Yêu cầu báo giá"** rõ ràng trên từng sản phẩm, tránh gây nhầm lẫn cho khách khi thấy icon giỏ hàng nhưng không mua được.
2. Tắt hoặc ẩn tab **"Đánh giá"** vì hiện đang yêu cầu đăng nhập + đã mua hàng (điều kiện không bao giờ xảy ra với mô hình không bán online) → nếu muốn có đánh giá, nên cho phép khách để lại đánh giá không cần mua hàng, hoặc thay bằng khối "Khách hàng nói gì về chúng tôi" quản lý thủ công từ admin.
3. Trang **"Chính sách bảo mật", "Điều khoản sử dụng"** hiện là link rỗng (#) — cần tạo nội dung thật, vừa tăng uy tín vừa hỗ trợ SEO/pháp lý.
4. Nên gộp **2 form liên hệ trùng lặp** ở nhiều trang thành 1 module form dùng chung, quản lý tập trung trong admin (để không phải sửa nhiều nơi khi đổi số điện thoại/email).
5. Cân nhắc thêm chức năng **so sánh sản phẩm** (so sánh các mã máy CKUN/JWEI/AOKE) vì đây là sản phẩm công nghiệp có nhiều model — khách thường cần so thông số.
