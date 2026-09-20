# Kế hoạch củng cố theo phân tích Admin

## Phạm vi đối chiếu

Tài liệu `Phan-tich-chuc-nang-va-de-xuat-Admin.md` xác định đây là catalog B2B và lead-generation, không phải ecommerce. Bản hiện tại mới có sản phẩm seed, auth `user/admin`, quote cơ bản và admin xem quote. Các phần CMS, CRM, cấu hình và audit còn thiếu.

## Ưu tiên triển khai

### P0: cần có để vận hành

- Chuẩn hóa schema: categories, product metadata, gallery, specs, posts, pages, site settings.
- Lead CRM: trạng thái, ghi chú nội bộ, sản phẩm quan tâm, người phụ trách.
- Role: admin, editor, sales, user; middleware quyền theo tài nguyên.
- Admin dashboard có thống kê và CRUD tối thiểu cho sản phẩm, danh mục, bài viết, trang tĩnh, cấu hình.
- Nhật ký hoạt động admin.
- Chuyển giao diện từ “giỏ hàng” sang “yêu cầu báo giá” theo mô hình thực tế.

### P1: hoàn thiện nội dung và SEO

- Gallery nhiều ảnh, thông số key/value, video, file tài liệu, nhãn nổi bật/bán chạy/mới.
- SEO title/description/slug/alt ảnh.
- Banner và khối trang chủ quản lý được.
- Trang chính sách, điều khoản, hướng dẫn mua, đổi trả có nội dung thật.
- Blog Tin tức/Dự án với draft/published.

### P2: tích hợp ngoài

- Upload media thật và tối ưu ảnh.
- Email/Zalo/Telegram notification.
- reCAPTCHA chống spam.
- Google Analytics/GTM/Pixel, sitemap, redirect 301.
- Import/export CSV, backup/restore, đa ngôn ngữ.

## Nguyên tắc kiểm soát lỗi

- Mỗi nhóm thay đổi phải ghi vào `Phantich/NHAT-KY-TRIEN-KHAI.md`.
- API phải có smoke test cho đường đi thành công, xác thực và phân quyền.
- Không ghi nhận tính năng tích hợp ngoài là hoàn thành nếu chưa có credential và test thật.
- Seed chỉ là dữ liệu khởi đầu; admin phải có thể thay đổi mà không sửa code.

## Tiêu chí nghiệm thu vòng này

- Database khởi tạo được trên thư mục sạch.
- User không gọi được API admin; editor/sales bị giới hạn theo role.
- Admin CRUD được dữ liệu CMS cốt lõi.
- Quote lưu được sản phẩm, trạng thái, ghi chú và assignee.
- Dashboard trả số liệu thật từ database.
- Build và smoke test đạt; lỗi phát hiện phải có log.
