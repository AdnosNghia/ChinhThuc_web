# Kế hoạch tái xây dựng CHÍNH THỰC

## 1. Phạm vi đã quan sát

Nguồn `Mau` là snapshot HTML của WordPress + Flatsome + WooCommerce. Website hiện có các luồng: trang chủ, catalog sản phẩm, lọc theo danh mục, chi tiết sản phẩm, sản phẩm tương tự, tìm kiếm, giỏ hàng, giới thiệu, tin tức, bài viết, dự án, liên hệ và liên hệ nhanh qua Facebook/Zalo/điện thoại.

Trang chủ gồm banner slider, nhóm Sản phẩm bán chạy, Máy cắt, Lưỡi dao, Thảm, Đầu dao và Kiến thức. Danh mục quan sát được: Máy cắt KTS, Lưỡi dao, Thảm nỉ, Đầu dao máy cắt KTS. Tất cả sản phẩm trong snapshot đang hiển thị `Giá: Liên hệ`.

## 2. Kiến trúc thông tin

- `/`: thương hiệu, hero, nhóm sản phẩm, năng lực, bài viết mới, CTA liên hệ.
- `/san-pham`: catalog, tìm kiếm, lọc danh mục, sắp xếp, phân trang.
- `/san-pham/:slug`: gallery, thông tin, thông số, CTA yêu cầu báo giá, đánh giá, sản phẩm tương tự.
- `/danh-muc/:slug`: catalog đã lọc theo danh mục.
- `/gioi-thieu`: lịch sử, năng lực kỹ sư, cam kết dịch vụ.
- `/tin-tuc` và `/tin-tuc/:slug`: danh sách và nội dung bài viết.
- `/du-an`: danh sách dự án/case study, trạng thái empty khi chưa có dữ liệu.
- `/lien-he`: thông tin công ty, form liên hệ, mạng xã hội và bản đồ.
- `/gio-hang`: các sản phẩm đã chọn, cập nhật số lượng, xóa, tổng quan yêu cầu báo giá.

## 3. Mô hình dữ liệu đề xuất

```text
Category(id, slug, name, description, image, sortOrder, status)
Product(id, slug, name, categoryId, summary, description, specs, images[], priceMode, price, stockStatus, featured, publishedAt)
Post(id, slug, title, excerpt, content, coverImage, category, publishedAt, status)
Project(id, slug, title, summary, content, images[], client, completedAt, status)
ContactRequest(id, name, email, phone, message, productIds[], status, createdAt)
CartItem(productId, quantity)
SiteSetting(key, value)
```

`priceMode` hỗ trợ `contact` hiện tại và `fixed` cho giai đoạn có bảng giá. `specs` nên là danh sách key/value để hiển thị máy móc khác nhau mà không đổi schema.

## 4. UX/UI

- Giữ nhận diện xanh kỹ thuật `#00347c`, vàng nhấn `#ffb300`, nền trắng; thay bố cục Flatsome nặng bằng hệ thống card thoáng, tương phản cao.
- Header desktop có logo, menu, tìm kiếm, hotline và giỏ; mobile dùng menu sheet.
- Product card có ảnh tỉ lệ ổn định, tên giới hạn dòng, trạng thái liên hệ và hành động xem chi tiết.
- Chi tiết sản phẩm ưu tiên ảnh lớn, thông số, yêu cầu báo giá; không giả lập thanh toán khi mọi sản phẩm đang báo giá.
- Form liên hệ có label thực, validation client-side, trạng thái gửi thành công/lỗi.
- Floating actions cho gọi điện, Zalo, Facebook; luôn có tooltip/aria-label.
- Responsive breakpoints: 2 cột mobile, 3 tablet, 4 desktop; focus ring rõ; hỗ trợ `prefers-reduced-motion`.

## 5. Lộ trình triển khai

1. Khởi tạo React + Vite + TypeScript + Tailwind, token CSS và primitives theo shadcn/ui.
2. Tạo data seed từ snapshot, reusable layout, header/footer, catalog và product detail.
3. Bổ sung routing hash, search, category filter, sorting, cart localStorage, contact form và dialogs.
4. Bổ sung trang nội dung, SEO metadata, empty/error/loading states.
5. Kết nối backend thật sau khi chốt API; thay seed data bằng repository/API adapter.

## 6. Tiêu chí nghiệm thu

- Tất cả luồng điều hướng chính hoạt động trên desktop/mobile.
- Không có lỗi console do ảnh hoặc link; ảnh có alt và fallback.
- Catalog lọc/tìm kiếm/sắp xếp đúng; giỏ cập nhật đúng và lưu phiên.
- Form có validation và phản hồi rõ ràng.
- Build production thành công.

## 7. Giới hạn dữ liệu

Website live và REST API không phản hồi trong môi trường phân tích, nên seed dùng các trang HTML trong `Mau`. Các ảnh dùng URL public của website mẫu; khi vận hành thật nên tải về CDN/storage riêng và bổ sung backend quản trị.
