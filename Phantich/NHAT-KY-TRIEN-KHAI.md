# Nhật ký triển khai và giám sát

> Quy tắc: sau mỗi bước thay đổi code phải cập nhật file này, ghi rõ phạm vi, kiểm tra đã chạy, lỗi phát hiện và trạng thái còn lại.

## 2026-09-14 - Bắt đầu hoàn thiện Admin UI

- Đã ghi nhận checkpoint trước khi tiếp tục triển khai theo yêu cầu kiểm soát tiến độ.
- Backend P0 đã có API stats, quotes, users/roles, audit logs, categories, posts, pages và tạo sản phẩm mở rộng.
- Frontend còn thiếu dashboard vận hành; vòng này triển khai các tab Tổng quan, Leads, Người dùng, Nhật ký và Sản phẩm.
- Quy tắc vòng này: sau mỗi module phải chạy build hoặc API smoke tương ứng và cập nhật kết quả ngay bên dưới.

### Module Admin UI - checkpoint 1

- Đã thay màn hình admin quote tối thiểu bằng workspace có tab Tổng quan, Leads báo giá, Sản phẩm, Người dùng và Nhật ký.
- Tổng quan gọi API stats thật.
- Leads có đổi trạng thái, ghi chú nội bộ và refresh dữ liệu.
- Sản phẩm có form tạo sản phẩm với nhãn nổi bật/bán chạy.
- Người dùng có đổi role `user/sales/editor/admin`.
- Nhật ký đọc dữ liệu audit thật.
- `npm run build`: PASS.
- Còn thiếu: chỉnh sửa/xóa sản phẩm trên UI, CRUD categories/posts/pages/settings, upload media, import/export và phân quyền editor/sales ở giao diện.

### Module Admin UI - checkpoint 2

- Bổ sung API `GET /api/admin/products`.
- Admin UI hiển thị danh sách sản phẩm hiện có và cho phép ẩn sản phẩm qua API delete mềm.
- Form tạo sản phẩm sau khi lưu sẽ refresh lại số liệu/danh sách.
- `npm run build`: PASS.
- Còn thiếu theo P1/P2: chỉnh sửa sản phẩm, danh mục, bài viết, trang tĩnh, settings, media upload, CSV, backup, notification ngoài và SEO infrastructure.

### Module CMS API - checkpoint 3

- Bổ sung admin API tạo danh mục, bài viết Tin tức/Dự án, trang tĩnh và cập nhật site settings.
- Phân quyền bài viết/trang cho `admin/editor/sales` theo middleware staff; settings/danh mục yêu cầu admin.
- Ghi audit log cho thao tác tạo/cập nhật CMS.
- Smoke test backend: PASS toàn bộ.
- `npm run build`: PASS.
- Frontend tabs cho CMS editor chưa triển khai; API đã sẵn sàng để nối form quản trị ở vòng tiếp theo.

## 2026-09-14 - Bắt đầu CMS Admin UI

- Mục tiêu vòng này: nối các API CMS đã có vào giao diện admin.
- Tab triển khai: Danh mục, Bài viết, Trang tĩnh, Cấu hình công ty.
- Sẽ kiểm tra build và smoke test sau khi hoàn tất module.

## 2026-09-14 - Phiên kiểm thử admin

- API chạy tại `http://localhost:3001`.
- Frontend chạy tại `http://localhost:5173`.
- `GET /api/health`: PASS.
- Frontend HTTP response: `200`.
- Đăng nhập admin: PASS, role trả về `admin`.
- Tài khoản kiểm thử: `admin@chinhthuc.local` / `ChangeMe123!`.

## 2026-09-14 - Đối chiếu tài liệu Admin

- Đã đọc `Phan-tich-chuc-nang-va-de-xuat-Admin.md`.
- Khoảng trống chính: CMS nội dung, gallery/spec/SEO sản phẩm, danh mục, blog/trang tĩnh, CRM lead nâng cao, role editor/sales, audit log, settings và dashboard thống kê.
- Kế hoạch chi tiết: `Phantich/KE-HOACH-CUNG-CO-THEO-ADMIN.md`.
- Bắt đầu vòng củng cố P0; chưa đánh dấu hoàn thành các tích hợp P2 khi chưa có credential và kiểm thử thật.
- Smoke test vòng CMS phát hiện migration đổi bảng `users` làm `quote_requests` và `audit_logs` còn FK tới `users_legacy`; đã thêm migration rebuild hai bảng về FK `users`, cần chạy lại smoke test sạch.
- Lần sửa đầu còn gặp `quote_requests_fixed already exists` và `FOREIGN KEY constraint failed` do migration bị dừng giữa chừng; đã thêm dọn bảng tạm, tắt FK trong vùng rebuild, bật lại FK sau migration.
- Backend đã khởi động lại thành công; smoke test sạch đạt health, products, register, quote và role denial.
- `npm run build`: PASS sau thay đổi CMS.
- API admin stats: PASS (`products=8`, `leads=2`). API audit logs: PASS.
- Còn thiếu ở frontend: Admin UI chưa hiển thị stats, users, audit logs và CRUD CMS; hiện vẫn là màn hình quote tối thiểu. Đây là bước tiếp theo, không đánh dấu hoàn thiện toàn bộ website.

## 2026-09-14 - Baseline

- Đã phân tích snapshot HTML trong `Mau` và website mẫu.
- Đã tạo frontend React/Vite/Tailwind tại `src`.
- Đã tạo backend Express/SQLite/JWT tại `server`.
- Đã tạo các bảng `users`, `products`, `quote_requests`, `quote_items` và seed 8 sản phẩm.
- Đã thêm role `user` và `admin`.
- Đã kiểm tra `npm run build`: đạt.
- Đã kiểm tra `GET /api/health`: đạt.

## 2026-09-14 - Rà soát lần 1

### Lỗi/thiếu sót phát hiện

1. Form liên hệ chỉ hiển thị toast, chưa gọi `POST /api/quotes`.
2. Giỏ hàng chỉ nằm trong React state, refresh trang sẽ mất dữ liệu.
3. Frontend dùng dữ liệu seed riêng, chưa đồng bộ từ `GET /api/products`.
4. Header chưa có thao tác đăng xuất.
5. API cập nhật quote nhận status tùy ý, chưa giới hạn enum.
6. API tạo sản phẩm và quote chưa validate kiểu dữ liệu/ID sản phẩm.
7. Fallback `JWT_SECRET` dùng được trong production nếu quên cấu hình, không an toàn.
8. Production build chỉ tạo frontend static; cần reverse proxy hoặc process backend để `/api` hoạt động khi deploy.

### Lỗi phát hiện bằng smoke test

- `GET /api/health`: PASS.
- `GET /api/products`: FAIL lần đầu vì câu SQL dùng `""`; SQLite báo `no such column`.
- Đã sửa literal rỗng thành `''`. Bắt buộc chạy lại smoke test trước khi đánh dấu backend đạt.

### Đã sửa trong vòng này

- Bổ sung hồ sơ giám sát này.
- Bổ sung smoke test backend ở `scripts/smoke-test.ps1`.
- Siết validation và error handling trong backend.
- Production từ chối khởi động nếu `JWT_SECRET` chưa đủ an toàn.
- Giới hạn trạng thái quote và xử lý `404` khi cập nhật bản ghi không tồn tại.
- Kiểm tra dữ liệu bắt buộc và trùng ID/slug khi admin tạo sản phẩm.
- Nối form liên hệ vào API quote.
- Lưu giỏ hàng vào `localStorage`.
- Bổ sung đăng xuất và đồng bộ products từ API.

### Trạng thái kiểm tra

- `npm run build`: PASS.

## 2026-09-15 - Sửa Admin route có query tab

- Phát hiện parser route lấy `admin?tab=content` làm route thay vì tách `admin` và query.
- Hậu quả: `#/admin?tab=content`, `#/admin?tab=users`, `#/admin?tab=logs` không vào Admin shell và rơi về nhánh public.
- Cách sửa: tách query khỏi hash trước khi xác định route; giữ query để chọn tab Admin.
- Kiểm tra bắt buộc: các URL dashboard/content/users/logs phải render cùng Admin shell.

### Kết quả điều tra runtime Admin

- Xác định lỗi dashboard trắng: URL dùng `tab=dashboard` nhưng `AdminWorkspace` chỉ render tab nội bộ `overview`.
- Đã chuẩn hóa `dashboard -> overview` trong component.
- Đã thêm trạng thái `authChecked`; route Admin chờ xác thực session xong, tránh render nhầm public/denied khi user đang là `null`.
- `npm run build`: PASS.
- API hiện phản hồi bình thường; cần hard refresh trình duyệt để tải bundle mới.

### Kết quả sửa route query

- Đã sửa parser: `admin?tab=content` được nhận đúng là route `admin` và query `tab=content`.
- Các tab dùng cùng Admin shell:
  - `#/admin?tab=dashboard`
  - `#/admin?tab=content`
  - `#/admin?tab=users`
  - `#/admin?tab=logs`
  - `#/admin?tab=leads`
- `npm run build`: PASS.
- Vite source response: HTTP 200.

## 2026-09-15 - Quy trình kiểm tra sau mỗi thay đổi

- Phát hiện sau phiên nâng cấp Product Detail: cả frontend `5173` và backend `3001` đã dừng khi kiểm tra lại, dù build trước đó PASS.
- Nguyên nhân là process dev/background có vòng đời theo phiên, không tự duy trì sau khi phiên công cụ kết thúc.
- Từ checkpoint này, mỗi lần báo hoàn thành bắt buộc kiểm tra theo thứ tự:
  1. `npm run build`.
  2. Khởi động backend nếu chưa chạy, chờ `GET /api/health` trả `ok=true`.
  3. Khởi động frontend nếu chưa chạy, chờ HTTP `200` trên `5173`.
  4. Chạy `npm run smoke` và ghi PASS/FAIL.
  5. Chỉ báo hoàn thành sau khi cả frontend/backend đang phản hồi.
- Khi process bị dừng do hết phiên, phải báo rõ trạng thái và khởi động lại trước khi kết thúc lượt làm việc.

### Kết quả kiểm tra sau phiên nâng cấp Product Detail

- Backend persistent process: đang chạy tại `http://localhost:3001`.
- Frontend persistent process: đang chạy tại `http://localhost:5173`.
- Frontend HTTP: `200`.
- Backend `/api/health`: `ok=true`.
- Backend `/sitemap.xml`: HTTP `200`.
- `npm run build`: PASS.
- `npm run smoke`: PASS.

## 2026-09-15 - Điều tra Admin trắng/runtime

- Người dùng báo `#/admin?tab=dashboard` trắng và click sidebar rơi về public home.
- Không chấp nhận kết luận chỉ dựa trên build; cần kiểm tra runtime và hashchange thực tế.
- Giả thuyết kiểm tra: hashchange không cập nhật state, route Admin bị redirect do query, hoặc component Admin throw runtime khi gọi API.

## 2026-09-15 - Upload ảnh trực tiếp trong Product Admin

- Phát hiện form sản phẩm vẫn yêu cầu nhập URL ảnh dù backend đã có `POST /api/admin/media`.
- Mục tiêu: chọn ảnh từ máy cho ảnh đại diện và nhiều ảnh gallery; frontend upload rồi tự lưu URL media.
- Giữ URL thủ công như fallback cho ảnh từ CDN ngoài.
- Kiểm tra bắt buộc: upload file hợp lệ, nhận URL `/media/...`, build, smoke và xác nhận backend/frontend vẫn hoạt động.

### Kết quả upload ảnh trực tiếp

- Product Admin đã có input chọn file cho ảnh đại diện.
- Có input chọn nhiều file cho gallery.
- Frontend upload multipart tới `POST /api/admin/media`, tự điền URL `/media/...`; URL thủ công vẫn được giữ làm fallback.
- Test PNG thật có xác thực admin: HTTP `201`, nhận URL `/media/67fa79dfbce7c2718f49f118668670f5.png`.
- File test đã được xóa khỏi `public/media` sau kiểm tra.
- `npm run build`: PASS.
- `npm run smoke`: PASS.
- Lần test đầu lỗi cú pháp module Node, đã chạy lại đúng ESM và upload đạt; không phải lỗi ứng dụng.

## 2026-09-15 - Specs dạng bảng và import file

- Phát hiện Admin đang yêu cầu nhập `specs` bằng JSON thủ công, không phù hợp với bảng thông số nhiều model.
- Mục tiêu: trình dựng bảng theo model, thêm/xóa dòng thông số, nhập CSV/JSON từ file.
- Format lưu vẫn là `[{ model, values: { key: value } }]` để tương thích Product Detail.
- CSV dự kiến: cột đầu là `model`, các cột tiếp theo là tên thông số; mỗi dòng là một model.

### Kết quả Specs Editor

- Đã tạo `src/specs-editor.tsx` với bảng thông số theo model.
- Có thể thêm/xóa model.
- Có thể thêm/xóa dòng thông số và sửa tên/giá trị trực tiếp.
- Có thể nhập file `.csv` hoặc `.json`.
- CSV format: dòng đầu `model,Tốc độ,Vùng cắt`; các dòng sau là model và giá trị.
- JSON format tương thích: `[{"model":"QD2516","values":{"Tốc độ":"1200 mm/s"}}]`.
- Product Admin đã dùng Specs Editor mới, không cần nhập JSON thủ công trong textarea.
- `npm run build`: PASS.
- `npm run smoke`: PASS.
- Lần test HTTP đầu thiếu frontend process nên `5173` không kết nối; backend vẫn PASS. Đã ghi nhận để khởi động lại và kiểm tra frontend riêng.

### Kết quả nâng cấp Product Detail/Admin metadata

- Schema products đã thêm `sku`, `brand`, `documents`, `badges`; gallery/spec/video đã có từ migration trước.
- API tạo/cập nhật sản phẩm nhận metadata JSON và validate array.
- API related: `GET /api/products/:slug/related` đã kiểm tra HTTP 200 với sản phẩm published, trả `related_count=1`.
- Product Detail UI đã có gallery nhiều ảnh, thumbnail, lightbox, badge, SKU/brand, specs theo model, video iframe, tài liệu và CTA gọi/Zalo.
- Admin form tạo sản phẩm đã nhận SKU, brand, video URL, badges, gallery URL, documents JSON, specs JSON.
- `npm run build`: PASS.
- `npm run smoke`: PASS.
- Còn lại: form quote tại detail cần nối API với feedback inline, nút chia sẻ/compare, UI edit đầy đủ gallery/spec trong Admin và notification lead.

## 2026-09-15 - Xử lý Failed to fetch khi chạy local

- Nguyên nhân: hai process chạy local đã dừng, frontend `5173` và API `3001` đều không phản hồi.
- Đã khởi động lại `npm run server` và `npm run dev -- --host 0.0.0.0`.
- Frontend kiểm tra HTTP `200`.
- Backend `GET /api/health`: `ok=true`.
- Đây là lỗi vòng đời process dev, không phải lỗi fetch trong code; khi đóng phiên terminal/background process sẽ cần khởi động lại hai lệnh này.

## 2026-09-15 - Tiếp tục CMS Admin UI

- Đã bổ sung API admin đọc danh mục, bài viết và trang tĩnh.
- Lần smoke test trước báo không kết nối do chạy trước readiness của backend; log khởi động trực tiếp xác nhận API vẫn listen bình thường.
- Vòng này chuyển CMS thành component riêng và dùng readiness check trước smoke test, tránh sửa JSX nén dài trong `AdminWorkspace`.

### CMS Admin UI checkpoint 4

- Tạo component riêng `src/admin-cms.tsx` để giảm rủi ro từ JSX admin cũ.
- Thêm route `#/admin-cms` dành cho admin.
- CMS UI hiện có tab Danh mục, Bài viết, Trang tĩnh, Cấu hình.
- Danh mục gọi API tạo và đọc danh mục.
- Bài viết gọi API tạo Tin tức/Dự án, chọn draft/published.
- Trang tĩnh gọi API tạo nội dung và SEO fields.
- Cấu hình lưu tên công ty, hotline, email, địa chỉ, Facebook, Zalo vào `site_settings`.
- `npm run build`: PASS.
- Smoke test có readiness check: PASS toàn bộ.
- Chưa hoàn tất: edit/delete CMS records, upload media, CSV import/export, backup/restore, notification ngoài và SEO infrastructure.

### CRUD/media/SEO checkpoint 5

- Backend build: PASS sau khi thêm `multer` và media route.
- CRUD API đã bổ sung cho product, category, post và page; thao tác xóa là ẩn mềm.
- Media upload `POST /api/admin/media`: giới hạn JPG/PNG/WEBP/PDF, tối đa 5MB, lưu `public/media`.
- SEO endpoints `GET /sitemap.xml` và `GET /robots.txt`: HTTP 200.
- Smoke test: PASS.

## 2026-09-15 - Điều chỉnh vị trí nội dung giới thiệu

- Yêu cầu: chuyển đoạn giới thiệu công ty khỏi nội dung chính trang Giới thiệu xuống footer.
- Giữ thông tin trong footer dưới khu vực nhận diện thương hiệu, không lặp ở nội dung trang.

### Kết quả

- Đoạn giới thiệu đã được chuyển khỏi phần nội dung chính của route `#/gioi-thieu`.
- Nội dung hiện nằm trong khu vực footer giới thiệu của trang.
- `npm run build`: PASS.
- Frontend HTTP: `200`.
- Backend `/api/health`: `ok=true`.
- `npm run smoke`: PASS.

## 2026-09-15 - Sửa phạm vi thay nội dung footer

- Phát hiện vòng trước đã tạo footer riêng chỉ cho trang Giới thiệu và làm mất các cột footer chung.
- Yêu cầu đúng: giữ nguyên toàn bộ footer chung trên mọi trang, chỉ thay tagline “Giải pháp cắt kỹ thuật số cho sản xuất hiện đại.” bằng đoạn giới thiệu công ty.
- Đã ghi nhận để khôi phục cấu trúc footer chung trước khi nghiệm thu lại.

### Kết quả sửa đúng phạm vi

- Đã xóa footer riêng `about-footer` của route Giới thiệu.
- Footer chung tiếp tục hiển thị đầy đủ trên mọi route: Điều hướng, Liên hệ, Kết nối và bản quyền.
- Tagline cũ trong block `footer-brand` được thay bằng đoạn giới thiệu công ty theo yêu cầu.
- `npm run build`: PASS.
- Frontend HTTP: `200`.
- Backend `/api/health`: `ok=true`.
- `npm run smoke`: PASS.
- Admin CMS API verification: categories=4, posts=0, pages=0.
- Frontend build: PASS.
- Chưa đánh dấu hoàn tất UI CRUD vì component CMS đang dùng JSX nén; nút edit/delete/upload cần tách tiếp thành component nhỏ để cập nhật an toàn.

## 2026-09-15 - Tách CMS UI và hoàn thiện thao tác quản trị

- Mục tiêu: tách các khu vực CMS thành component nhỏ, hỗ trợ chỉnh sửa/ẩn nội dung và upload media từ admin.
- Không thay đổi dữ liệu cũ; các thao tác xóa tiếp tục là ẩn mềm.
- Sau vòng này phải kiểm tra build, smoke test, media endpoint và CRUD update/delete.

### CMS UI checkpoint 6

- Đã tách lại `src/admin-cms.tsx` thành component có state/form rõ ràng.
- Danh mục, bài viết, trang tĩnh có nút Sửa và Ẩn mềm.
- Có form edit inline cho các trường chính.
- Cấu hình có khu vực upload media local và hiển thị URL kết quả.
- Media API giới hạn file hợp lệ và 5MB; endpoint sitemap/robots đã kiểm tra HTTP 200.
- `npm run build`: PASS.
- Smoke test: PASS.
- Còn lại: edit đầy đủ mọi metadata sản phẩm/gallery/specs, CSV import/export, backup/restore, notification ngoài và CAPTCHA.

## 2026-09-15 - Menu danh mục sản phẩm trên giao diện người dùng

- Mục tiêu: hover/focus vào “Sản phẩm” hiển thị danh mục để chọn nhanh.
- Danh mục: Máy cắt KTS, Lưỡi dao, Thảm nỉ, Đầu dao máy cắt KTS.
- Có hỗ trợ focus keyboard và mở menu trên mobile bằng thao tác chạm.

### Kết quả menu danh mục

- Header public đã có dropdown “Sản phẩm”.
- Dropdown gồm Tất cả sản phẩm, Máy cắt KTS, Lưỡi dao, Thảm nỉ, Đầu dao máy cắt KTS.
- Hover, focus keyboard và click đều có thể mở menu.
- Link danh mục lọc sản phẩm theo slug tương ứng.
- CSS responsive giữ menu không làm vỡ header desktop; mobile menu vẫn giữ nguyên route.
- `npm run build`: PASS.

## 2026-09-15 - Tách khu vực quản trị khỏi website công khai

- Đã bỏ liên kết tên/tài khoản admin khỏi header public.
- Website public chỉ còn link `#/dang-nhap` cho tài khoản khách hàng.
- Tạo route riêng `#/admin-login` cho đăng nhập quản trị.
- Route admin yêu cầu user đã xác thực và role `admin`; tài khoản user không thể vào dashboard.
- Tài khoản admin không còn được hiển thị trực tiếp trên website thường.
- `npm run build`: PASS.
- Lưu ý: đây là bảo vệ ở tầng route/UI và API vẫn là lớp bảo vệ chính; production nên đặt admin dưới subdomain hoặc reverse proxy riêng.

## 2026-09-15 - Bỏ giỏ hàng khỏi website catalog

- Đã loại bỏ icon/nút giỏ hàng khỏi Header public và import icon không còn sử dụng.
- Không còn hiển thị bộ đếm giỏ hàng gây hiểu lầm website có checkout.
- Luồng yêu cầu báo giá vẫn giữ ở CTA trang chi tiết và form liên hệ.
- `npm run build`: PASS.

### Kết quả rà soát UX lần này

- Đã đổi aria-label/title icon giỏ sang “Danh sách yêu cầu báo giá”; tài khoản có tooltip nêu mục đích theo dõi yêu cầu.
- Đã thêm `SafeImage` cho card sản phẩm, ảnh lỗi không còn lộ alt text.
- Đã thêm số lượng sản phẩm cạnh từng danh mục trong catalog.
- Đã tăng tương phản “Giá liên hệ” từ tông cam nhạt sang `#a84716`.
- `npm run build`: PASS.
- Chưa hoàn tất trong vòng này: thay trust bar hotline bằng chỉ số mới, SafeImage cho ảnh detail/hero, và tách footer để bổ sung policy links; các mục này cần refactor route JSX nén trước khi patch tiếp.

## 2026-09-15 - Rà soát UX/UI theo feedback

- Đổi giỏ hàng thành “Yêu cầu báo giá” vì website không thanh toán online.
- Tài khoản giữ cho lịch sử yêu cầu trong giai đoạn sau, nhãn cần rõ mục đích.
- Thêm fallback ảnh để không hiển thị alt text khi ảnh lỗi.
- Thêm số lượng sản phẩm trong danh mục, thống nhất tên Tin tức và footer.
- Bổ sung Dự án, Liên hệ, Chính sách bảo mật, Điều khoản sử dụng vào footer.
- Thay số hotline lặp trong trust bar bằng chỉ số năng lực.
- Tăng tương phản màu “Giá liên hệ” và kiểm tra responsive bằng build.

## 2026-09-15 - Audit vận hành và source of truth

- Đã xác minh và ẩn `smoke-category-product`: `published=0`, không còn xuất hiện public.
- Đã thêm `scripts/smoke-test.mjs` và lệnh `npm run smoke` để chạy được trên Node/Windows/Linux, không phụ thuộc PowerShell.
- Đã thêm `scripts/backup-db.mjs` và lệnh `npm run backup`, tạo bản sao SQLite trong `backups/`.
- Đã thêm honeypot `website` và giới hạn độ dài cho `POST /api/quotes`; đây là lớp chống bot cơ bản, chưa thay thế reCAPTCHA.
- Đã redirect `#/admin-cms` về `#/admin?tab=content`; Admin CMS dùng cùng shell quản trị.
- Đã rà toàn bộ route `/api/admin/*`: đều đi qua `auth` và `admin` hoặc `staff` middleware.
- Dọn dòng log PNG không liên quan khỏi nhật ký.

### Kết quả kiểm tra audit vận hành

- `npm run build`: PASS.
- `npm run backup`: PASS, tạo file `backups/chinhthuc-2026-09-15T15-10-33-351Z.sqlite`.
- `npm run smoke`: PASS health, published products, registration, unauthenticated admin denied.
- `scripts/smoke-test.ps1`: PASS health, published products, registration, quote creation, user admin denied.
- Database smoke product: đã ẩn, `published=0`.
- Ưu tiên còn lại trước production: reCAPTCHA thật, adapter notification, backup scheduler, gallery/spec UI đầy đủ, CSV import/export và reverse proxy/subdomain.

## 2026-09-15 - Sửa route chi tiết sản phẩm

- Phát hiện route `#/san-pham/:slug` bị nhánh catalog bắt trước route chi tiết.
- Hậu quả: bấm “Xem chi tiết” đổi URL nhưng vẫn hiển thị catalog, tạo cảm giác trang không thay đổi.
- Cách sửa: ưu tiên kiểm tra `selected product` trước route `san-pham`/`danh-muc`.
- Kiểm tra bắt buộc: build và xác nhận URL chi tiết có nội dung tên/mô tả sản phẩm tương ứng.

### Kết quả sửa route chi tiết

- Đã tạo `ProductDetailPage` riêng.
- Route chi tiết được ưu tiên trước route catalog.
- URL dạng `#/san-pham/<slug>` hiển thị gallery/fallback ảnh, breadcrumb, danh mục, mô tả, thông số dịch vụ và nút yêu cầu báo giá.
- Route `#/san-pham` không còn bị nhầm là chi tiết.
- `npm run build`: PASS.
- `scripts/smoke-test.ps1`: PASS sau khi dừng process backend cũ và khởi động sạch.
- PASS: health endpoint, seed products, user registration, quote creation, user denied admin endpoint.
- Lưu ý vận hành: khi kiểm thử sau sửa backend phải dừng process cũ; nếu không, request có thể chạy vào mã server cũ.

## 2026-09-15 - Sửa Users/Permissions và Audit Log Admin

- Phát hiện sidebar Admin đang trỏ “Người dùng & quyền” và “Nhật ký hoạt động” về cùng `#/admin`, không chọn đúng tab.
- Phát hiện audit log chưa ghi đăng nhập, đăng xuất và một số thao tác session.
- Cách sửa: route Admin nhận query `?tab=users|logs|leads|dashboard`, sidebar truyền đúng tab; bổ sung audit cho login/logout/đổi quyền.

### Kết quả Users/Permissions và Audit Log

- Sidebar đã mở đúng `#/admin?tab=users`, `#/admin?tab=logs`, `#/admin?tab=leads`.
- `AdminWorkspace` nhận `initialTab` từ query và đồng bộ khi chuyển route.
- Login, logout và đổi role đều ghi audit log.
- Không cho admin tự hạ role của chính tài khoản hiện tại.
- API kiểm tra users/audit: PASS (`audit_logs` đã có bản ghi login).
- Smoke test phát hiện tiêu chí cũ yêu cầu đủ 8 sản phẩm, không phù hợp sau khi admin ẩn sản phẩm; đã sửa thành kiểm tra còn sản phẩm published > 0.
- Smoke test sau khi sửa: PASS health, published products, registration, quote creation và user denied admin.
- `npm run build`: PASS.

## 2026-09-15 - Gắn sản phẩm vào danh mục trong Admin

- Phát hiện form thêm sản phẩm mới chỉ bắt nhập text `category`, chưa cho chọn danh mục hiện có.
- Hậu quả: sản phẩm dễ sai tên danh mục và không xuất hiện đúng bộ lọc phía người dùng.
- Cách sửa: Admin tải danh mục từ API, cho chọn dropdown; backend lưu cả `category_id` và tên danh mục.
- Kiểm tra bắt buộc: tạo sản phẩm thử và xác nhận API danh mục trả đúng sản phẩm.

### Kết quả gắn sản phẩm vào danh mục

- Admin form đã dùng danh mục lấy từ database thay vì nhập text tự do.
- Khi lưu, backend nhận và lưu `category_id` cùng tên danh mục.
- Đã tạo sản phẩm kiểm thử `smoke-category-product` vào danh mục ID 2.
- API kiểm tra bằng `GET /api/products?categoryId=2`: `category_id_filter_match=True`.
- Smoke test chung: PASS.
- `npm run build`: PASS.
- Lưu ý: sản phẩm kiểm thử được tạo trong database hiện tại để xác nhận luồng, có thể ẩn từ Admin sau khi kiểm tra.

## 2026-09-15 - Rà soát khác biệt giữa trang chủ và catalog

- Phát hiện lỗi UX/routing: `#/san-pham` và `#/danh-muc/...` chưa có view riêng nên rơi vào nhánh trang chủ.
- Hậu quả: trang sản phẩm nhìn giống trang chủ, thiếu tiêu đề catalog, breadcrumb, bộ lọc và trạng thái danh mục rõ ràng.
- Kế hoạch sửa: tách `ProductCatalogPage`, dùng riêng cho shop và danh mục; giữ trang chủ chỉ hiển thị hero + nhóm sản phẩm nổi bật.

### Kết quả tách catalog

- Đã tạo `ProductCatalogPage` riêng cho `#/san-pham` và `#/danh-muc/:slug`.
- Trang catalog có hero tiêu đề riêng, breadcrumb, số lượng sản phẩm, ô tìm kiếm và sidebar danh mục.
- Trang danh mục hiển thị tiêu đề/mô tả theo nhóm, không còn rơi về layout trang chủ.
- Trang chủ giữ hero và CTA riêng.
- `npm run build`: PASS.

## 2026-09-15 - Tách giao diện Admin khỏi website public

- Tài khoản kiểm thử admin: `admin@chinhthuc.local` / `ChangeMe123!`.
- Yêu cầu: Admin không dùng Header/Footer public và phải có bố cục vận hành riêng.
- Triển khai shell Admin riêng: sidebar, topbar quản trị, trạng thái tài khoản, link về website và đăng xuất.
- Các route `#/admin` và `#/admin-cms` sẽ render trong Admin shell sau khi xác thực role admin.

### Kết quả tách Admin Console

- `#/admin` và `#/admin-cms` không còn render Header/Footer public.
- Đã thêm sidebar Admin Console với nhóm Workspace/System.
- Đã thêm topbar riêng: tiêu đề khu vực, user hiện tại, role và nút Đăng xuất.
- Có link “Xem website” quay lại public site.
- Admin không có quyền sẽ thấy màn hình từ chối riêng, không lẫn với trang người dùng.
- Layout responsive: sidebar thu gọn trên màn hình nhỏ.
- `npm run build`: PASS.

## 2026-09-15 - Vòng CRUD CMS, media và SEO nền tảng

- Mục tiêu: đóng các khoảng trống CRUD nội dung trước, sau đó thêm media local và endpoint SEO cơ bản.
- Phạm vi: sửa/xóa mềm sản phẩm, danh mục, bài viết, trang tĩnh; upload media giới hạn loại file; sitemap và robots.
- Kiểm soát: không giả lập notification ngoài hoặc backup đã hoàn thiện nếu chưa có adapter và kiểm thử thực tế.
## 2026-09-15 - Nâng cấp Product Detail và metadata Admin

- Đã ghi nhận yêu cầu bổ sung gallery nhiều ảnh, lightbox, SKU/brand, specs theo model, video, tài liệu PDF, nhãn sản phẩm, form báo giá tại chỗ, liên hệ nhanh, liên quan và so sánh.
- Vòng này ưu tiên triển khai các trường có thể lưu/hiển thị thật trong hệ thống hiện tại; không giả lập file/video khi chưa có URL hợp lệ.
- Metadata mới dự kiến: `sku`, `brand`, `gallery[]`, `specs[]`, `video_url`, `documents[]`, `badges[]`.
- Admin form phải nhập được metadata mới bằng JSON có hướng dẫn rõ, sau đó Product Detail đọc và hiển thị có fallback.

### Kết quả rà soát chức năng Sản phẩm

- API `GET/POST/PATCH/DELETE /api/admin/products` còn tồn tại.
- `AdminWorkspace` còn state `adminProducts`, `categories` và hàm `createProduct`.
- UI cũ chỉ render trong tab nội bộ `products`, nhưng Admin sidebar không có mục top-level `Sản phẩm`; `admin-cms` cũng không chứa sản phẩm.
- Danh sách cũ chưa có tìm kiếm, lọc, phân trang và màn hình quản lý độc lập.
- Bảng `categories` hiện là nguồn danh mục sản phẩm; CMS bài viết chưa có bảng category riêng. Vòng này tách rõ bằng nhãn/module, chưa phá dữ liệu cũ.

### Kết quả triển khai quản lý Sản phẩm top-level

- Đã tạo `src/admin-products.tsx` thành module quản lý sản phẩm độc lập.
- Sidebar Admin có mục cấp cao nhất “Sản phẩm” ngay dưới “Tổng quan”, route `#/admin?tab=products`.
- Danh sách có tìm kiếm theo tên/slug, lọc danh mục, trạng thái hiển thị/ẩn và phân trang.
- Mỗi sản phẩm có nút Sửa và Ẩn soft delete.
- Form có tên, slug, ID, SKU, brand, danh mục dropdown lấy từ API, ảnh đại diện, gallery nhiều URL, specs JSON theo model, badges, video, mô tả, nổi bật/bán chạy/xuất bản.
- Tab “Danh mục” trong CMS vẫn giữ cho nội dung website; module Sản phẩm hiển thị rõ “Danh mục sản phẩm” và dùng API categories làm nguồn chọn.
- `npm run build`: PASS.

### Kiểm tra nghiệm thu sản phẩm

- `npm run smoke`: PASS.

## 2026-09-16 - Điều tra log web và sửa session navigation

- Live probe: frontend `5173` HTTP 200; backend `3001/api/health` trả `ok=true`; public products trả 7; unauthenticated admin stats trả 401.
- Process đang nghe đúng cổng: backend 3001 và frontend 5173.
- Nguyên nhân UX: Header public luôn hiện link `Tài khoản` về `#/dang-nhap`, không đổi theo role admin; login admin đặt route chưa cụ thể.
- Đã sửa: admin đã đăng nhập thấy `Vào Admin` tới `#/admin?tab=dashboard`; user chưa đăng nhập vẫn thấy `Tài khoản`; admin login thành công tới dashboard cụ thể.

### Kết quả sửa lỗi runtime/session navigation

- Xác định Header được gọi với `user` nhưng signature component chưa nhận prop; đã sửa signature để role admin hiển thị đúng `Vào Admin`.
- Log Vite trước đó có cảnh báo Fast Refresh invalidate do module thay đổi; không có lỗi backend.
- Đã build bundle mới.
- Đã restart backend process mới tại `3001` và frontend process mới tại `5173`.
- Frontend HTTP: `200`.
- Backend `/api/health`: `ok=true`.
- `npm run smoke`: PASS.

## 2026-09-16 - Redirect sau đăng nhập Admin

- Phát hiện sau khi login admin, URL vẫn có thể ở route login nên người dùng phải nhập route dashboard thủ công.
- Đã thêm effect điều hướng tự động khi session xác nhận role `admin`:
  `#/admin-login` hoặc `#/dang-nhap` -> `#/admin?tab=dashboard`.
- Vẫn giữ API kiểm tra role; user thường không được redirect vào Admin.
- `npm run build`: PASS.
- Frontend HTTP: `200`.
- Backend `/api/health`: `ok=true`.
- `npm run smoke`: PASS.

## 2026-09-16 - Restart xác nhận sau sửa phiên Admin

- Đã stop process persistent cũ của backend/frontend.
- Đã start lại backend process mới tại `3001` và frontend process mới tại `5173`.
- Frontend HTTP: `200`.
- Backend `/api/health`: `ok=true`.
- `npm run smoke`: PASS.
- Tạo thủ công sản phẩm `manual-product-category-check` bằng Admin API vào danh mục `Máy cắt KTS` ID 1.
- Kiểm tra `GET /api/products?categoryId=1`: `catalog_visible=True`, `category_id=1`.
- Đã ẩn sản phẩm kiểm tra sau nghiệm thu: `manual_test_product=hidden`.
- Lần kiểm tra đầu lỗi cú pháp nối chuỗi PowerShell, đã chạy lại bằng URL biến rõ ràng và đạt; đây là lỗi lệnh test, không phải lỗi ứng dụng.
- Còn lại: edit gallery/spec bằng editor trực quan hơn, import/export CSV và tách category bài viết thành schema riêng nếu cần.

## 2026-09-16 - Redirect trực tiếp sau đăng nhập theo role

- Yêu cầu: không hiển thị nút admin để người dùng phải bấm lần nữa.
- Sau khi login thành công, kiểm tra `user.role` ngay:
  - `admin` -> `#/admin?tab=dashboard`.
  - `user/editor/sales` -> `#/` public website.
- Header chỉ là trạng thái phụ; không còn là bước điều hướng chính sau login.

### Kết quả

- Route login đã điều hướng theo session role: admin ở `admin-login` hoặc `dang-nhap` sẽ vào dashboard; user thường về public.
- Build: PASS.
- Frontend HTTP: `200`.
- Backend `/api/health`: `ok=true`.
- `npm run smoke`: PASS.

## 2026-09-16 - Sửa logout Admin về public

- Phát hiện logout gọi API nhưng giữ state `user=admin` trong React; effect redirect login có thể đưa lại Admin.
- Cách sửa: sau logout xóa state phiên ở component App và chuyển thẳng về `#/`.
- Kỳ vọng: logout kết thúc tại trang chủ public, không qua route login Admin.

### Kết quả sửa luồng phiên

- Bỏ logic sai tự `setUser(null)` khi đang ở `admin-login`, vì logic này chạy ngay sau login thành công và đẩy admin về public.
- Logout shell admin vẫn dùng `finally` để chuyển thẳng `/#/`, sau đó bấm “Tài khoản” sẽ vào `#/dang-nhap` và hiển thị form đăng nhập khi session đã hết.
- Không dùng route login admin làm điểm trung gian sau logout.

### Kết quả

- Admin shell mới xử lý logout bằng `finally`, luôn `window.location.assign('/#/')` kể cả khi API logout lỗi.
- Sau logout trình duyệt tải lại App ở trang chủ public, không giữ state admin trong bộ nhớ.
- `npm run build`: PASS.
- Frontend HTTP: `200`.
- Backend `/api/health`: `ok=true`.
- `npm run smoke`: PASS.

## 2026-09-17 09:01:39 +07:00 - Tách trang chủ khỏi Product Catalog

### Phát hiện

- Route fallback `#/` trước đây chứa trực tiếp JSX catalog (`Thiết bị cho mọi đường cắt`, bộ lọc, tìm kiếm và toàn bộ grid), nên trang chủ và `#/san-pham` không đúng phân vai.
- Footer fallback cũ chỉ có Sản phẩm/Về chúng tôi/Kiến thức ngành, thiếu Dự án, Liên hệ, Chính sách bảo mật và Điều khoản sử dụng; sai lệch với log trước.

### Đã sửa

- Tạo `HomePage` riêng cho `#/` gồm hero, trust bar (12+ năm/500+ dự án/100% chính hãng), 4 sản phẩm nổi bật, 4 thẻ danh mục nhanh và CTA tư vấn.
- Trang chủ không còn render tab lọc, ô tìm kiếm hoặc toàn bộ catalog.
- Tạo `SharedFooter` dùng nội dung đầy đủ: Sản phẩm, Giới thiệu, Tin tức, Dự án, Liên hệ, Chính sách bảo mật, Điều khoản sử dụng, thông tin liên hệ và kết nối.
- `ProductCatalogPage` tiếp tục chỉ được dùng cho `#/san-pham` và `#/danh-muc/:slug`.
- Sản phẩm nổi bật ưu tiên bản ghi `featured`; nếu dữ liệu hiện tại chưa đánh dấu, dùng 4 sản phẩm đầu làm fallback để trang không trống.

### Kiểm tra runtime

- Restart backend/frontend sau build: PASS.
- `#/` và `#/san-pham`: đều HTTP `200`; route được client xử lý bằng `HomePage` và `ProductCatalogPage` riêng.
- Backend `/api/health`: `ok=true`.
- `npm run smoke`: PASS.
- `npm run build`: PASS.
- Môi trường model hiện tại không hỗ trợ chụp/đọc ảnh màn hình trực tiếp; đã kiểm tra runtime qua HTTP, process readiness, source route và smoke test thay cho screenshot.

## 2026-09-18 09:24:36 +07:00 - Audit P0 bắt buộc theo yêu cầu mới

- Chặn triển khai P1/P2 cho tới khi xác nhận runtime Admin dashboard, lead flow, API authorization, JWT secret và backup restore.
- Phạm vi audit đầu tiên: đọc code thật trong `src/main.tsx`, `src/admin-products-v2.tsx`, `src/admin-cms.tsx`, `server/index.ts`, `server/db.ts`, scripts smoke/backup và database hiện tại.
- Phải ghi kết luận lỗi Admin bằng bằng chứng runtime/API, không chỉ dựa trên `npm run build`.

### Audit code P0 sơ bộ

- Admin route parser đã tách query và API admin có middleware `auth` + `admin/staff`.
- Chưa có Error Boundary cho Admin trước vòng này; đã bổ sung `AdminErrorBoundary` quanh Admin shell, hiển thị lỗi tại chỗ và ghi `console.error`.
- Runtime endpoint hiện phản hồi: frontend HTTP 200, backend health `ok=true`, login admin role `admin`, các endpoint stats/products/users/audit/categories/posts/pages PASS, unauthenticated admin stats trả 401.
- **FAIL P0 lead detail**: `ProductDetailPage` vẫn có quick quote submit gọi `window.alert` trực tiếp, chưa gọi `POST /api/quotes`; không được đánh dấu lead flow hoàn thành.
- **FAIL P0 secret production**: code có guard JWT tối thiểu 32 ký tự trong production nhưng còn fallback secret cho development; production phải đặt `JWT_SECRET` thật.
- **PARTIAL P0 backup**: `npm run backup` tạo SQLite backup; chưa có restore test tự động trong script.

### Runtime P0 verification - 2026-09-18 09:31:00 +07:00

- `npm run build`: PASS.
- Admin login API: PASS, role=`admin`.
- Authenticated Admin APIs stats/products/users/audit/categories/posts/pages: PASS.
- Unauthenticated `/api/admin/stats`: PASS DENIED `401`.
- Backend health: PASS.
- Portable smoke: PASS.
- Admin Error Boundary: đã thêm, nhưng chưa thể chụp console browser bằng công cụ hiện tại; lỗi render sẽ hiển thị màn hình đỏ riêng, không rơi public.
- **P0 chưa đạt**: quick quote Product Detail cần refactor trực tiếp thành form gọi API với `product.id`; hiện code legacy còn `window.alert`.
- **P0 chưa đạt**: backup restore chưa được kiểm thử tự động.
- Không triển khai P1/P2 trước khi hai mục P0 này PASS.

### P0 verification update - 2026-09-18 09:38:00 +07:00

- `AdminErrorBoundary` build: PASS; Admin API runtime checks remain PASS.
- Added `scripts/verify-backup.mjs` and `npm run backup:verify`; restore verification PASS (`tables=10`, `products=10`, `leads=10`).
- Initial `npm run smoke` failed only because backend process was not running (`Backend readiness timeout`); after starting backend persistent, smoke PASS.
- Frontend HTTP 200 and backend health `ok=true` after restart.
- Quick quote Product Detail now has a capture listener that calls `POST /api/quotes`, resolves current product by slug and submits product item; requires browser runtime form submission test before P0 can be marked PASS.
- P0 status: Admin runtime/API PASS; backup restore PASS; lead detail browser submission still pending; production JWT requires real `JWT_SECRET` configuration.

## 2026-09-18 15:30:27 +00:00 - PASS P0 lead flow và backup scheduler bằng runtime thật

- Browser test thật trên Edge headless isolated tab mở `http://localhost:5173/#/san-pham/may-cat-mau-1`, điền form quick quote và submit.
- Network evidence: `POST http://localhost:5173/api/quotes`, payload có `items:[{"productId":"ckun","quantity":1}]`, response HTTP `201`.
- UI evidence: `.quick-quote-status.success` hiển thị “Đã gửi yêu cầu. Chúng tôi sẽ liên hệ sớm.”; không còn `window.alert` trong `src/main.tsx`.
- Admin evidence: đăng nhập admin thật, `GET /api/admin/quotes` trả lead `id=13`, email `browser-p0@example.test`, `product_id=ckun`, `product_name=MÁY CẮT KỸ THUẬT SỐ CKUN`.
- Backup scheduler: mặc định chạy hằng ngày (`86400000ms`), gọi `backup-db.mjs` rồi `verify-backup.mjs`; một lần chạy tự động với `BACKUP_RUN_ONCE=true` lúc `2026-09-18T15:28:14.921Z` tạo backup và verify PASS (`tables=10`, `products=10`, `leads=12`).
- Restart sau thay đổi: backend listen `3001`, frontend listen `5173`; `npm run build`, `npm run smoke`, `npm run backup:verify` đều PASS.
- Kết luận: P0 lead flow và P0 backup scheduler đã PASS bằng runtime/test thật; có thể chuyển sang P1 (CAPTCHA thật, notification, nội dung trang chủ, accessibility).

## 2026-09-18 15:45:00 +00:00 - P1 accessibility quick quote

- Bổ sung label hiển thị rõ cho Họ tên, Số điện thoại, Email và Nội dung cần tư vấn trong quick quote Product Detail; không còn phụ thuộc placeholder để hiểu field.
- Bổ sung `autocomplete=name|tel|email`, `type=submit` và giữ trạng thái gửi inline có `role=status`.
- Restart backend tại `3001` và frontend tại `5173` sau thay đổi.
- `npm run build`: PASS; `npm run smoke`: PASS.
- Browser runtime kiểm tra route detail và DOM form: form có 4 label/field đặt tên đúng, submit button type `submit`; lần kiểm tra CDP inline bị lỗi quoting PowerShell, không phải lỗi ứng dụng và chưa dùng làm bằng chứng PASS cho phần browser accessibility.
- CAPTCHA/reCAPTCHA thật và notification ngoài vẫn BLOCKED do chưa có site key/secret hoặc credential adapter; không giả lập PASS.

## 2026-09-18 16:04:49 +00:00 - PASS Quick Import Product Metadata bằng browser runtime

- Migration SQLite không phá dữ liệu đã thêm `products.highlights` và `products.applications` dạng JSON, mặc định `[]`; startup migration chạy độc lập từng `ALTER TABLE` để tương thích database cũ.
- Parser rule-based thuần TypeScript tại `src/quick-product-parser.ts`: nhận description mở đầu, block “Đặc điểm nổi bật”, key-value vào `specs` model “Mặc định”, dòng “Ngành X: ...” vào applications và fuzzy category suggestion không tự gán.
- Admin > Sản phẩm có textarea “Nhập nhanh từ nội dung có sẵn” và nút “Trích xuất tự động”; chỉ điền form, không tự submit; Specs Editor hiện có được tái sử dụng và đã sửa đồng bộ khi `value` thay đổi.
- Browser runtime test thật bằng Edge: mẫu lưỡi dao rung vonfram được trích xuất thành description, 3 highlights, 3 specs (`Độ dài`, `Đường kính`, `Vật liệu`) và 2 applications; gợi ý danh mục `Lưỡi dao` hiển thị để admin tự chọn.
- Sản phẩm test `test-tungsten-blade` được tạo qua `POST /api/admin/products`; API xác nhận JSON đúng cấu trúc; Product Detail browser hiển thị đúng title, khối “Đặc điểm nổi bật”, “Ứng dụng theo ngành” và bảng specs; sau đó `PATCH /api/admin/products/test-tungsten-blade` published=0 trả HTTP 200.
- Restart backend `3001` và frontend `5173`; `npm run build`: PASS; `npm run smoke`: PASS.
- Kết luận: Quick Import Product Metadata PASS bằng browser runtime; sản phẩm test đã được ẩn, không còn hiển thị public.

## 2026-09-18 16:51:25 +00:00 - PASS P0 encoding cleanup và P1 Quick Import UI runtime

- P0 audit xác nhận Express/SQLite đang xử lý UTF-8; smoke Node gửi `content-type: application/json; charset=utf-8`, smoke PowerShell ép `Console.InputEncoding`/`OutputEncoding` UTF-8 và `Invoke-RestMethod` JSON charset UTF-8.
- Đã xóa hẳn các bản ghi test đã xác định: `test-tungsten-blade`, `manual-product-category-check`, `smoke-category-product`; kiểm tra SQLite sau dọn trả danh sách rỗng. Không xóa sản phẩm thật.
- Smoke API thật tạo/đọc/xóa sản phẩm `Lưỡi dao rung vonfram kiểm thử tiếng Việt`: tên trả về nguyên vẹn, không mojibake. PASS.
- Quick Import UI: nút accent có icon wand, disabled khi textarea rỗng; highlights/applications có editor thêm/xóa dòng và trạng thái trống thân thiện, không hiển thị JSON `[]`; ID hệ thống tự sinh khi thêm mới và chỉ hiển thị khi sửa; upload avatar/gallery vẫn có input file multipart `/api/admin/media`.
- Browser runtime thật: dán mẫu lưỡi dao rung vonfram, bấm `Trích xuất tự động`; banner xác nhận `mô tả, 3 đặc điểm nổi bật, 3 thông số, 2 ứng dụng ngành`; không còn `[]` thô; tên tiếng Việt được lưu nguyên vẹn qua API; specs/highlights/applications đúng cấu trúc; file upload control hiện diện; ID ẩn khi thêm mới; sản phẩm test đã xóa hẳn qua DELETE HTTP 204.
- Restart backend `3001` và frontend `5173`; `npm run build`: PASS; `npm run smoke`: PASS.
- Kết luận: P0 encoding/data cleanup PASS; P1 Quick Import UX PASS bằng browser runtime. Không đánh dấu CAPTCHA/notification vì ngoài phạm vi và thiếu credential.

## 2026-09-19 01:40:35 +00:00 - PASS Product Detail gallery/parser cleanup bằng browser runtime

- Route thật đã kiểm tra: `#/san-pham/luoi-dao-rung`.
- Gallery: ảnh chính dùng `object-fit: contain`, chiều cao linh hoạt/max-height, nền sáng `#f0f4f7`; không còn letterbox đen. Thumbnail đồng kích thước `72x62`, `object-fit: cover`, active border brand navy.
- Lightbox: click ảnh chính mở ảnh full-size; có nút Ảnh trước/Ảnh tiếp theo/Đóng và hỗ trợ phím mũi tên/Escape. Browser runtime đã xác nhận mở lightbox, có đủ nút và nút next chuyển URL ảnh.
- Parser: specs chỉ nhận key-value trong ngữ cảnh “Thông số kỹ thuật” hoặc dòng bullet dash rõ ràng; bullet trong “Đặc điểm nổi bật” không đẩy sang specs; loại dòng “Giới thiệu”; chống trùng Vật liệu/Chất liệu cùng giá trị.
- Dữ liệu `luoi-dao-rung` đã sửa trực tiếp: specs còn một dòng Vật liệu `Thép vonfram`, không còn Giới thiệu/Chất liệu trùng; applications chuẩn hóa viết hoa đầu tên ngành.
- Browser runtime xác nhận bảng specs sạch, không có “Giới thiệu”, không trùng Vật liệu/Chất liệu; ứng dụng hiển thị 5 card riêng biệt với tên ngành viết hoa.
- Restart backend `3001`, frontend `5173`; `npm run build`: PASS; `npm run smoke`: PASS.
- Kết luận: Product Detail gallery, lightbox, parser và dữ liệu target PASS bằng browser runtime thật.

## 2026-09-19 01:53:47 +00:00 - PASS public footer, SafeImage và catalog refresh bằng browser runtime

- Audit route xác nhận trước sửa: `#/san-pham`, `#/danh-muc/:slug` và `#/san-pham/:slug` thiếu `SharedFooter`; `#/`, các route nội dung `gioi-thieu`, `tin-tuc`, `du-an`, `lien-he` và fallback static pages đã có footer trong catch-all.
- Đã thêm cùng một `SharedFooter` dùng chung cho HomePage, ProductCatalogPage/category và ProductDetailPage; không tạo bản sao JSX footer. Admin shell/login/loading/denied vẫn không dùng public footer.
- SafeImage khôi phục fallback ngay cả khi `src` rỗng, giữ icon `CT` và nhãn `Hình ảnh sản phẩm`; áp dụng nhất quán card/catalog/detail/lightbox.
- Browser runtime thật: `#/san-pham` và `#/san-pham/luoi-dao-rung` đều có footer, cột Điều hướng/Liên hệ/Kết nối và copyright đúng ở cuối trang.
- Admin refresh: sau POST/PATCH/DELETE trong ProductAdminV2 phát event `products-changed`; App refetch `/api/products` không cần reload. App cũng refresh khi hash route/focus, hỗ trợ catalog mở cùng SPA session.
- Browser runtime Admin xác nhận nút Quick Import hiện đúng, file input avatar/gallery tồn tại (`2` input multipart), và flow không cần reset web sau thay đổi.
- `npm run build`: PASS; `npm run smoke`: PASS; backend `3001`, frontend `5173` đã restart.
- Lưu ý kiểm tra placeholder với dữ liệu hiện tại không tạo lỗi ảnh tự nhiên nên không có card fallback xuất hiện trong screenshot; logic `src` rỗng/onError và DOM fallback đã được khôi phục trong `SafeImage`. Không giả nhận diện ảnh hỏng là PASS trực quan nếu chưa có ảnh lỗi trong dataset.
- Kết luận: footer và catalog refresh PASS bằng browser runtime; SafeImage logic PASS code/runtime, visual fallback dataset chưa có ảnh lỗi để xác nhận trực quan.

## 2026-09-19 02:16:10 +00:00 - PASS Product Detail CTA/gallery responsive bằng browser runtime

- Product Detail cột phải đã thành action card có nền/viền nhẹ, tiêu đề 42px đậm, giá 22px đậm, CTA đồng chiều cao và hover rõ; form tư vấn có padding/gap lớn hơn. Desktop dùng `position: sticky; top: 104px`; mobile override `position: static` để không che nội dung.
- Gallery ảnh chính bỏ crop cứng, dùng chiều cao tự nhiên với `max-height: 70vh` và `overflow:auto`; nền sáng, `object-fit: contain`.
- Thumbnail đổi sang kích thước cố định `80x80px` desktop/`72x72px` mobile, `flex-wrap` nhiều hàng và không tràn sang cột phải.
- Browser runtime sản phẩm thật 10 ảnh: thumbnail width cố định, 2 hàng; layout vẫn giới hạn trong cột trái. Test tạm gallery 17 ảnh: thumbnail width cố định, 3 hàng; sau test đã khôi phục gallery gốc 10 ảnh.
- Browser viewport desktop `1440x900`: layout 2 cột `531px 531px`, CTA `sticky`. Viewport mobile `375x812`: layout 1 cột `327px`, CTA `static`, thumbnail `72px`, 3 hàng; không vỡ layout.
- `npm run build`: PASS; `npm run smoke`: PASS; backend `3001` và frontend `5173` đã restart.
- Kết luận: CTA panel, gallery tự nhiên, thumbnail wrap và responsive mobile PASS bằng browser runtime thật.

## 2026-09-19 02:22:16 +00:00 - PASS SPA route scroll restoration bằng browser runtime

- Đặt logic trung tâm trong `App`: `useEffect` phụ thuộc `hash`, gọi `window.scrollTo({top:0,left:0,behavior:'auto'})` cho mọi route/hash mới.
- Bổ sung effect trong `ProductDetailPage` phụ thuộc `product.slug` để xử lý chuyển A → B khi component không unmount/remount.
- Thumbnail chỉ đổi state ảnh, không đổi hash/slug nên không kích hoạt scroll.
- Browser runtime luồng (a) catalog cuộn `700px` → click sản phẩm: route `#/san-pham/luoi-dao-rung`, `scrollY=0`, title đúng. PASS.
- Luồng (b) detail A cuộn `900px` → chuyển detail B: route `#/san-pham/may-cat-mau-1`, `scrollY=0`, title CKUN đúng. PASS.
- Luồng (c) home cuộn `900px` → click Giới thiệu: route `#/gioi-thieu`, `scrollY=0`. PASS. Cơ chế áp dụng tương tự Liên hệ/Tin tức/Dự án/Admin.
- Luồng (d) detail cuộn `500px` → click thumbnail ảnh 2: `scrollY` vẫn `500`, thumbnail active đổi đúng; không reset scroll. PASS.
- Restart backend `3001`, frontend `5173`; `npm run build`: PASS; `npm run smoke`: PASS.
- Kết luận: route scroll-to-top và ngoại lệ thao tác nội bộ thumbnail PASS bằng browser runtime thật.

## 2026-09-19 02:41:16 +00:00 - CMS foundation checkpoint A/B/D partial

- Đã cài `mammoth` và thêm `POST /api/admin/pages/:slug/import-docx`, `POST /api/admin/posts/:slug/import-docx`: multipart `.docx`, giới hạn 10MB, trả HTML convert để frontend rà soát trước khi lưu.
- Đã thêm public `GET /api/posts/:slug` và public `GET /api/settings` whitelist các trường company_name/hotline/email/address/facebook/zalo.
- Đã seed dữ liệu CMS không phá nội dung hard-code cũ: page `gioi-thieu`, hai bài Tin tức cũ vào bảng `posts`, site settings mặc định. API runtime xác nhận dữ liệu tiếng Việt nguyên vẹn.
- Public `#/gioi-thieu` đọc page API; `#/tin-tuc` đọc `GET /api/posts?type=news`; `#/tin-tuc/:slug` đọc post detail API; SharedFooter dùng settings public cho hotline/email/address.
- `npm run build`: PASS; `npm run smoke`: PASS; backend `3001` và frontend `5173` đã restart.
- Chưa đánh dấu hoàn thành toàn bộ yêu cầu CMS: Admin chưa có WYSIWYG/editor DOCX đổ vào editor, Dự án chưa có schema/API/UI case-study, Contact body/topbar chưa hoàn tất 100% settings-driven và chưa chạy đủ browser test A-D. Các mục này giữ trạng thái PENDING, không giả PASS.

## 2026-09-19 03:00:03 +00:00 - CMS continuation: Projects CRUD/Public và Contact settings

- Dự án: thêm bảng `projects` với title/slug/industry/cover_image/gallery/summary/challenge/solution/result/related_product_ids/published; thêm public `GET /api/projects`, `GET /api/projects/:slug`; admin `GET/POST/PATCH/DELETE /api/admin/projects`.
- Public `#/du-an` đọc danh sách dự án thật; `#/du-an/:slug` hiển thị cover, summary, Thách thức, Giải pháp, Kết quả; Admin CMS thêm tab Dự án với form case-study và xóa hẳn dữ liệu.
- Liên hệ: thêm `ContactPage` đọc hotline/email/address từ `/api/settings` và submit thật tới `POST /api/quotes`; không còn dùng nội dung contact hard-code ở route ưu tiên.
- Browser/API runtime: `/api/projects` trả danh sách hợp lệ (hiện rỗng vì chưa có dữ liệu production), `/api/settings` trả đủ 6 trường; build và smoke tiếp tục PASS.
- Backend/frontend đã restart sau thay đổi; `npm run build`: PASS; `npm run smoke`: PASS.
- Chưa đánh dấu CMS A-D hoàn tất: Admin About/News chưa có WYSIWYG thực sự và nút import DOCX đổ vào editor; chưa có browser test đầy đủ tạo/sửa/xóa bài và dự án; Contact settings chưa được kiểm thử đổi giá trị qua Admin trên browser. Các mục giữ PENDING.

## 2026-09-19 03:06:25 +00:00 - CMS editor/public runtime checkpoint

- Admin CMS đã có `RichHtmlEditor` dùng chung cho Trang tĩnh và Bài viết: contentEditable, bold/italic/heading/list, nhập `.docx` gọi endpoint Mammoth và đổ HTML về editor trước khi lưu.
- Browser runtime Admin xác nhận tab Bài viết và Trang tĩnh đều hiển thị editor, toolbar và input Nhập Word; tab Dự án hiển thị form case-study.
- Browser runtime public xác nhận:
  - `#/gioi-thieu` đọc page database, footer hiển thị.
  - `#/tin-tuc` đọc 2 bài database, footer hiển thị.
  - `#/tin-tuc/san-xuat-va-gia-cong-tuy-chinh` hiển thị chi tiết từ API, footer hiển thị.
  - `#/du-an` đọc API projects và hiển thị empty state có kiểm soát khi chưa có dự án production, footer hiển thị.
  - `#/lien-he` đọc hotline/email/address từ settings và form hiển thị.
- `npm run build`: PASS; `npm run smoke`: PASS; backend/frontend đã restart.
- Chưa thể ghi PASS đầy đủ cho upload DOCX vì chưa có file `.docx` mẫu trong workspace; chưa tạo/sửa/xóa project test end-to-end và chưa đổi settings qua browser rồi xác minh propagation. Các tiêu chí này vẫn PENDING, không giả PASS.

## 2026-09-19 03:19:40 +00:00 - PASS DOCX About import bằng browser runtime

- Dùng đúng file `public/assets/Ho_so_gioi_thieu_Cong_ty_TNHH_Chinh_Thuc.docx`.
- Browser Admin mở `#/admin?tab=content`, chọn tab Trang tĩnh, input `Nhập Word` nhận file `.docx`.
- Lần test đầu FAIL do helper API áp `Content-Type: application/json` lên multipart, Express nhận body lỗi JSON; đã sửa editor dùng `fetch` multipart trực tiếp, không ép JSON header.
- Test lại PASS: Mammoth convert trả HTML dài `4034` ký tự, editor hiển thị nội dung tiếng Việt thật: “CÔNG TY TNHH CHÍNH THỰC”, “Giải pháp máy cắt kỹ thuật số…”, “1. Tổng quan doanh nghiệp”; không có lỗi editor.
- HTML đã đổ vào `contentEditable` và hidden `content` input của form, sẵn sàng để admin rà soát rồi lưu thủ công; không tự publish file gốc.
- Backend `3001`, frontend `5173` restart; `npm run build`: PASS; `npm run smoke`: PASS.
- Kết luận: DOCX import/convert/render trong editor PASS bằng browser runtime thật. Việc bấm lưu nội dung hồ sơ vào page production chưa thực hiện để tránh ghi đè nội dung thật ngoài yêu cầu kiểm thử.

## 2026-09-19 03:33:18 +00:00 - PASS CMS edit/import/delete UX fix

- Đã sửa lỗi form sửa Trang tĩnh/Bài viết trước đây dùng textarea khác, không có nút Word: form sửa hiện dùng cùng `RichHtmlEditor`, có toolbar, input `Nhập Word`, hidden content field và import theo đúng slug đang sửa.
- Đã đổi endpoint DELETE pages/posts từ soft-hide sang DELETE vật lý; Admin xác nhận rõ “Xóa vĩnh viễn nội dung này? Không thể hoàn tác.”, phù hợp trường hợp không còn cần trang cũ.
- Browser runtime Admin tab Trang tĩnh: trước sửa có 1 page row; bấm Sửa xác nhận `.inline-edit .rich-editor=true`, input DOCX=true, hidden content=true.
- `npm run build`: PASS; `npm run smoke`: PASS; backend/frontend đã restart.
- Lưu ý: chưa thực hiện xóa page production thật trong test để tránh mất nội dung Giới thiệu; đã xác minh cơ chế DELETE và UI confirmation. Không giả PASS cho dữ liệu production.

## 2026-09-19 03:50:49 +00:00 - PASS DOCX table preservation/CSS runtime checkpoint

- Điều tra HTML thô Mammoth bằng file DOCX thật: output dài 3989 ký tự, có 3 `<table>`, nhiều `<tr>/<td>`; nguyên nhân không phải Mammoth làm mất bảng. Output ban đầu có 0 heading HTML vì file dùng style tùy biến `CT Heading 1` và style map cũ quote sai.
- Đã sửa Mammoth styleMap dùng cú pháp quote hợp lệ cho Heading 1/2/3 và CT Heading 1/2/3; thêm fallback chuyển các dòng đánh số `1. ...`, `2. ...` thành heading h3 để nội dung hồ sơ có phân cấp rõ.
- Không có DOMPurify/sanitizer loại bảng trong pipeline; backend trả HTML trực tiếp. Đã bổ sung CSS dùng chung cho `.rich-editor-surface` và `.cms-public-content`: border-collapse, border/padding ô, hàng đầu nền nhẹ, heading h2/h3/h4 rõ, overflow-x auto và min-width bảng để không vỡ mobile.
- Browser Admin upload lại DOCX xác nhận editor không lỗi, HTML dài 4044 ký tự và form giữ hidden content. CSS table/heading áp dụng cho editor và public rich text.
- `npm run build`: PASS; `npm run smoke`: PASS; backend/frontend restart.
- Lưu ý: file DOCX hiện có bảng nhưng không có Heading style chuẩn (Mammoth cảnh báo custom style); đã xử lý fallback heading đánh số. Chưa bấm lưu đè page Giới thiệu production và chưa có ảnh chụp màn hình gốc để đối chiếu pixel; log không giả nhận diện phần đó là PASS tuyệt đối.

## 2026-09-19 04:45:55 +00:00 - PASS CMS image file upload controls

- Admin CMS tab Bài viết đã có input file `Ảnh đại diện từ máy`; upload multipart tới `/api/admin/media`, tự điền URL `/media/...` vào field `coverImage`, vẫn giữ khả năng nhập URL CDN thủ công.
- Admin CMS tab Dự án đã có input file `Ảnh bìa từ máy` với cùng cơ chế upload/tự điền URL.
- Browser runtime xác nhận: tab Bài viết có 1 file input ảnh và label đúng; tab Dự án có 1 file input ảnh và label đúng.
- Backend `3001`, frontend `5173` restart; `npm run build`: PASS; `npm run smoke`: PASS.
- Kết luận: chức năng ảnh đại diện/bìa có thể chọn file trực tiếp từ máy tính; chưa upload file ảnh production thật trong test để tránh tạo media rác.

## 2026-09-19 05:48:46 +00:00 - PASS Product Admin delete action

- Đã bổ sung nút `Xóa` màu cảnh báo bên cạnh `Sửa` trong từng dòng sản phẩm của Admin > Sản phẩm.
- Nút gọi `DELETE /api/admin/products/:id`, có xác nhận rõ “Xóa vĩnh viễn sản phẩm? Không thể hoàn tác.”
- Sau khi xóa: refresh danh sách Admin, reset form nếu đang sửa sản phẩm đó và phát event cập nhật catalog public.
- Browser runtime xác nhận Admin có 26 dòng sản phẩm, 26 nút Sửa và 26 nút Xóa.
- `npm run build`: PASS; `npm run smoke`: PASS; backend/frontend restart.
- Không xóa sản phẩm production thật trong test để tránh mất dữ liệu; endpoint và UI confirmation đã xác nhận.

## 2026-09-19 07:17:58 +00:00 - PASS Product Admin action alignment

- Sửa layout danh sách sản phẩm: vùng `.product-admin-actions` cố định bên phải, flex không co, nút Sửa/Xóa có cùng kích thước `59px`, row có min-height và copy tách riêng.
- Browser runtime đo 27 dòng: action width đồng nhất `136px`, nút Sửa `59px`, nút Xóa `59px`, action cùng vị trí ngang `left=560px`; không còn so le theo tên sản phẩm dài/ngắn.
- Backend/frontend restart; `npm run build`: PASS; `npm run smoke`: PASS.

## 2026-09-19 08:19:40 +00:00 - PASS automatic editable slugs

- Product Admin: nhập tên tiếng Việt tự sinh slug không dấu; placeholder đổi thành `Slug (tự tạo, có thể sửa)`.
- CMS forms Bài viết, Trang tĩnh, Dự án và Danh mục cũng tự điền slug từ tiêu đề/tên.
- Khi admin sửa slug thủ công (`slug-tu-chinh`), thay đổi tiêu đề sau đó không ghi đè slug đã chỉnh.
- Browser runtime xác nhận: `Lưỡi dao thép vonfram` → `luoi-dao-thep-vonfram`; sau sửa tay giữ nguyên `slug-tu-chinh` dù đổi tên.
- `npm run build`: PASS; `npm run smoke`: PASS; backend/frontend restart.

## 2026-09-19 11:51:11 +00:00 - PASS homepage slider CMS foundation/layout

- Thêm bảng `sliders` và API public/admin CRUD:
  - `GET /api/sliders`
  - `GET/POST/PATCH/DELETE /api/admin/sliders`
- Admin > Nội dung website có tab `Slider trang chủ`: thêm tiêu đề, link, thứ tự, upload ảnh trực tiếp từ thiết bị qua `/api/admin/media`, xóa slider.
- Seed một slider mặc định từ banner hiện có để trang chủ không trống.
- HomePage đọc slider từ API và render trong `.hero-slider` nằm sau section `.hero`, không còn đặt ảnh ở góc phải trong hero content.
- Browser runtime xác nhận tab Slider có file input và form thêm; API `/api/sliders` trả slider mặc định.
- `npm run build`: PASS; `npm run smoke`: PASS; backend/frontend restart.
- Lưu ý: browser test cuối trước khi seed thấy homepage không có slider vì database chưa có bản ghi; đã seed và xác nhận API sau restart. Cần reload browser để xác nhận visual slider sau seed.

## 2026-09-20 04:43:21 +00:00 - Runtime content verification checkpoint

- Audit phát hiện package.json bị thiếu dấu phẩy sau script `vercel`, làm backend/frontend không khởi động; đã sửa và `npm run build`/runtime restart PASS.
- Mục 1 Giới thiệu: browser import đúng DOCX thật, editor nhận 3 bảng và nội dung hồ sơ; lưu page `gioi-thieu`; public `#/gioi-thieu` xác nhận 3 bảng, nội dung tổng quan/pháp lý, footer; mobile 375px content width 327, table scrollWidth 560 nên overflow ngang không vỡ layout. Heading đánh số trong file không nhận style chuẩn, fallback hiện text; đây là giới hạn dữ liệu style DOCX, không mất bảng.
- Mục 2 Dự án: tạo qua API authenticated 2 mẫu `[MẪU - cần thay nội dung thật]`, public `#/du-an` có 2 cards, detail có đúng thứ tự Thách thức → Giải pháp → Kết quả, filter `industry=Bao bì` trả 1; xóa hẳn cả 2, DELETE trả 204. Related product IDs đã lưu API nhưng public detail chưa render card sản phẩm liên quan: phần này FAIL/PENDING.
- Mục 3 Slider: hard refresh public xác nhận `.hero-slider` tồn tại, nằm sau `.hero`, có 1 slide seed và link `#/san-pham`; Admin tab upload/add/delete controls đã có. Chưa upload file ảnh test từ thiết bị trong vòng này, nên CRUD upload mới giữ PENDING.
- Mục 4 Settings: phát hiện topbar còn hotline hard-code, đã sửa Header đọc `settings.hotline`; Admin settings phát event `settings-changed`, App refresh settings khi event/focus. Runtime propagation test trước patch cho thấy Contact/topbar/footer chưa đồng bộ khi đổi settings; cần chạy lại sau patch để ghi PASS, hiện giữ PENDING.
- `npm run build`: PASS; `npm run smoke`: PASS; backend `3001`, frontend `5173` đã restart.
- Kết luận: không đánh dấu website hoàn thiện/production-ready; còn PENDING/FAIL rõ ràng ở related-product render, slider upload runtime và settings propagation sau patch. Vercel vẫn BLOCKED bởi SQLite local và media filesystem, cần Postgres/Blob trước deploy thật.

## 2026-09-20 08:30:43 +00:00 - PASS hero background slider refactor

- Slider đã chuyển khỏi block nội dung độc lập: ảnh được render absolute trong chính `.hero` với `.hero-backgrounds`, z-index thấp hơn lớp chữ; `.hero-slider` cũ bị ẩn hoàn toàn.
- Thêm overlay navy/đen gradient để đảm bảo tiêu đề/mô tả/CTA đọc rõ; bỏ caption bar xám bên dưới.
- Nhiều slide tự chuyển mỗi 5 giây, fade opacity và dots điều hướng thủ công ở đáy hero.
- Ảnh lỗi không có alt text hiển thị: `alt=""`, hero giữ nền navy qua `.hero-slide-failed`; ảnh nền không tạo khung trắng riêng.
- Responsive mobile dùng cùng nền hero, không tạo block ảnh cao bất thường.
- `npm run build`: PASS; `npm run smoke`: PASS.
- Lưu ý: browser CDP session trong lượt này không ổn định nên chưa ghi nhận số đo visual desktop/mobile và chuyển slide bằng thao tác thật; cần chạy lại browser runtime sau khi session Edge hoạt động để đánh dấu PASS tuyệt đối các mục a-d.

## 2026-09-20 09:26:43 +00:00 - PASS restore default homepage slider

- Phát hiện bảng `sliders` rỗng sau thao tác xóa nhầm.
- Đã khôi phục slide mặc định từ banner hiện có:
  - Tiêu đề: `Giải pháp cắt chính xác`
  - Ảnh: `banner-1-1400x609.png`
  - Link: `#/san-pham`
  - `published=1`, `sort_order=0`
- API `GET /api/sliders` trả lại 1 slider.
- `npm run build`: PASS; `npm run smoke`: PASS.

## 2026-09-20 09:32:28 +00:00 - PASS fix upload currentTarget null

- Nguyên nhân `Cannot read properties of null (reading 'closest')`: React SyntheticEvent `currentTarget` bị null sau `await uploadImageUrl(...)`.
- Đã capture form trước await trong upload slider, bài viết và dự án; product upload giữ `FileList` trước khi await.
- Không còn dùng `e.currentTarget.closest(...)` sau await ở các handler upload CMS.
- `npm run build`: PASS; `npm run smoke`: PASS.

## 2026-09-20 09:43:51 +00:00 - PASS slider null/currentTarget fix

- Rà toàn bộ `.closest(`: chỉ còn upload handlers Slider/Bài viết/Dự án; tất cả đã capture `form` trước `await`. Nguyên nhân gốc luồng thêm slider là submit handler dùng `event.currentTarget.reset()` sau `await api(...)`, khi SyntheticEvent đã kết thúc khiến currentTarget null; upload handler cũng có cùng rủi ro.
- Đã sửa submit Slider: capture `const form = event.currentTarget` trước await, dùng `new FormData(form)` và `form.reset()` sau await.
- AdminErrorBoundary vẫn `console.error('Admin runtime error', error, info.componentStack)` đầy đủ, nhưng UI đổi sang thông báo thân thiện, không lộ message kỹ thuật.
- Browser runtime đã đăng nhập Admin, mở Slider, điền title/image/link/sort và submit; không có admin error. Tuy nhiên browser session đã giữ dữ liệu cũ/duplicate seed nên form test không tạo bản ghi mới đúng như script kỳ vọng; đã dọn duplicate slider id=2, giữ lại một seed id=1. Cần lặp lại bằng session sạch để xác nhận POST/notice chính xác.
- `npm run build`: PASS; `npm run smoke`: PASS; backend restart.
- Kết luận: nguyên nhân code đã sửa và không còn currentTarget sau await; runtime không còn ErrorBoundary crash, nhưng tiêu chí slider test tạo bản ghi mới cần chạy lại session sạch trước khi đánh dấu PASS tuyệt đối.

## 2026-09-20 12:16:33 +00:00 - PASS hero background/featured runtime diagnostics

- Browser runtime thật bằng Edge sạch (không extension) đã hard refresh `#/` và đọc DOM/computed style/network.
- `/api/sliders` trả 2 slide: URL ngoài và `/media/fc4c095d8e6a9d07a228d00b1e5185c7.jpg`.
- Nguyên nhân ảnh hero cũ không thấy: `.hero-backgrounds` dùng `z-index:-2` và overlay `z-index:-1` trong stacking context `.hero`; ảnh upload nội bộ tải đúng (natural 1280x595) nhưng ảnh ngoài không tải trong browser (natural 0), trong khi lớp stack âm gây phụ thuộc nền/che khuất. Đã đổi background z-index=0, overlay z-index=1, content z-index=2, pointer-events none; tắt `.hero-image` cũ.
- Runtime sau sửa: `.hero` width `739px`, height `590px`; `.hero-backgrounds` width `739px`, height `590px`, z-index `0`; ảnh `/media/...` natural `1280x595`, opacity `0` lúc slide 1 active; ảnh ngoài là slide active nhưng natural `0` do host ngoài không phản hồi trong môi trường browser. Dots count `2`, không còn block/caption `.hero-slider`.
- Section Sản phẩm nổi bật trước đây trống vì tất cả DB products đều `featured=0`; đã thêm fallback `featured || bestseller`, nếu không có thì lấy 4 sản phẩm đầu. Runtime clean browser xác nhận `4` product cards có tên/giá.
- `npm run build`: PASS; `npm run smoke`: PASS.
- Kết luận: layering hero và featured fallback PASS; ảnh nội bộ PASS tải đúng. Ảnh URL ngoài còn phụ thuộc host ngoài không phản hồi (naturalWidth=0), không phải lỗi path nội bộ; cần dùng ảnh nội bộ/CDN ổn định nếu muốn slide ngoài luôn hiển thị.

## 2026-09-20 13:22:09 +00:00 - PASS remove duplicate homepage footer

- Nguyên nhân: `HomePage` tự render `<SharedFooter settings={settings}/>` ở cuối component, đồng thời App route `!route` render thêm một `SharedFooter` bên ngoài.
- Đã xóa footer bên trong HomePage; App giữ đúng một SharedFooter dùng chung.
- Các route khác tiếp tục render một footer ở cấp route.
- `npm run build`: PASS; `npm run smoke`: PASS.

## 2026-09-20 14:23:39 +00:00 - PASS dynamic website logo foundation

- Public/admin settings whitelist thêm `logo_url` và `favicon_url`, seed mặc định rỗng.
- Tạo `BrandLogo` dùng chung: nếu logo_url hợp lệ hiển thị ảnh `object-fit: contain`; nếu rỗng hoặc ảnh lỗi fallback icon CT + text CHÍNH THỰC.
- Header public, Admin sidebar dùng BrandLogo; Footer brand đã dùng BrandLogo.
- Admin Cấu hình thêm khu vực preview logo, file input PNG/SVG/WEBP giới hạn 2MB, URL thủ công và nút Khôi phục logo mặc định.
- `npm run build`: PASS; `npm run smoke`: PASS.
- Chưa đánh dấu browser runtime PASS cho upload/save/restore/logo lỗi trong checkpoint này; cần chạy Edge sạch sau khi backend/frontend restart để xác nhận trực quan và dọn media test.

## Checklist nghiệm thu liên tục

- [x] `npm run build` không lỗi (đã PASS nhiều vòng, kiểm tra lại ở checkpoint cuối).
- [x] `npm run smoke` trả về toàn bộ PASS (Node portable smoke test).
- [x] Đăng ký user không cho role tự truyền từ request.
- [x] User không truy cập được API admin (đã kiểm tra unauthenticated và user role).
- [x] Admin xem và cập nhật quote.
- [x] Quote contact được lưu database.
- [x] Refresh không làm mất giỏ hàng qua `localStorage`.
- [x] Ảnh card/detail có fallback khi host ảnh ngoài không phản hồi.
- [ ] CAPTCHA/reCAPTCHA thật cho form public (chưa có site key/secret).
- [ ] Notification email/Zalo/Telegram lead (chưa có credential/adapter).
- [x] Backup SQLite thủ công qua `npm run backup`.
- [x] Backup tự động theo lịch production: `npm run backup:scheduler` chạy mặc định hằng ngày (`86400000ms`), hỗ trợ `BACKUP_RUN_ONCE=true`; lần chạy xác nhận `2026-09-18T15:28:14.921Z` tạo backup và restore verification PASS.
- [x] Production cấu hình bắt buộc `JWT_SECRET` đủ dài; cần đặt giá trị riêng trong `.env`.
- [ ] Deploy subdomain/reverse proxy riêng cho Admin.

## Cập nhật sau vòng sửa lỗi

- Sửa lỗi SQL literal rỗng trong `/api/products` từ `""` thành `''`.
- Frontend đã gọi `GET /api/products` để đồng bộ dữ liệu và fallback seed nếu API chưa sẵn sàng.
- Frontend đã lưu `ct_cart` trong `localStorage` để refresh không mất giỏ.
- Backend smoke test hiện đạt toàn bộ bước đã định nghĩa.
- Quick quote Product Detail đã chuyển sang POST `/api/quotes`, có trạng thái inline success/error và gửi item `product_id` theo sản phẩm nguồn; đã xác nhận bằng browser runtime test thật ngày 2026-09-18 lúc 15:30:27 UTC: Network POST trả 201, không gọi alert, Admin API trả lead `id=13`, `product_id=ckun`, tên `MÁY CẮT KỸ THUẬT SỐ CKUN`; P0 lead flow PASS bằng browser test.
