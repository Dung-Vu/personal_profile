# Home Implementation Plan

## Mục tiêu

Triển khai lại Home thành một trải nghiệm kể chuyện bằng cảnh: đẹp, tinh giản, có linh hồn, và dẫn người xem đến đúng hành động tiếp theo.

Home không thay thế các trang `Work`, `Stack`, `Workflow`, `Contact` hay `Lab`. Vai trò của Home là tạo ấn tượng đầu tiên, nói rõ bạn làm gì, cho thấy cách bạn nghĩ, rồi điều hướng người xem sang route phù hợp.

## Ý chính đã chốt

Concept chính:

```txt
Messy signals -> usable systems
```

Người xem đi qua một chuỗi cảnh ngắn:

```txt
Noise -> Structure -> Build -> Verify -> Choose
```

Ngôn ngữ hình ảnh nên giống một signal workspace / command center: có layer dữ liệu, node, grid, dashboard fragment, QA signal, route choices. Không đi theo hướng landing page marketing, không nhồi quá nhiều card, không dùng hiệu ứng chỉ để trang trí.

## Tham chiếu thiết kế

Những thứ nên học:

- `devl.dev`: cảm giác workspace, explorer, metadata nhỏ, card gọn, nhiều thứ có thể khám phá nhưng không rối.
- Codrops scroll-driven portfolio: cảnh chuyển theo scroll và có visual motif riêng cho từng đoạn.
- Motion Primitives / Motion style: motion nhỏ, có mục đích, không lấn át nội dung.
- Modern portfolio galleries như Godly, Siteinspire, Lapa Ninja: layout editorial gọn, typography mạnh, ít màu nhưng có điểm nhấn.

Những thứ không nên copy:

- 3D/WebGL nặng nếu chưa có lý do rõ.
- Aurora blob / gradient blob chung chung.
- Fake AI chat popup.
- Cursor interaction quá nhiều.
- Bento grid chỉ để đẹp nhưng không kể chuyện.

## Trạng thái Home hiện tại

Các phần đã có:

- `src/pages/HomePage.jsx`: hero, signal panel, story grid, CTA.
- `src/content/homeStoryScenes.js`: dữ liệu 5 scene.
- `src/components/home/HomeSignalBackdrop.jsx`: canvas background động.
- `src/styles/home.css`: layout Home, panel, story card, motion layer.
- `gsap` và `ScrollTrigger` đã có trong dependency.

Vấn đề cần giải quyết:

- Home đang giống hero + nhiều scene card nối tiếp hơn là một câu chuyện liền mạch.
- Canvas background đẹp nhưng chưa phản ứng rõ theo từng scene.
- Story grid đang kể bằng card; cần chuyển thành một flow có cảm giác "đi qua cảnh".
- CTA nên xuất hiện như kết quả tự nhiên của câu chuyện, không chỉ là nút ở cuối.
- Cần giữ bản mobile nhẹ và đọc tốt, không cố ép cinematic desktop lên mobile.

## Story Arc

### Scene 01: Noise

Mục đích:

- Tạo ấn tượng đầu tiên.
- Định vị ngay bạn là ai và làm gì.

Copy đề xuất:

```txt
Vũ Đình Dũng
I build interfaces that turn messy signals into usable systems.
```

Visual:

- Nền tối sâu.
- Signal line / node field xuất hiện từ noise.
- Tên reveal gọn, không màu mè.

CTA chính:

- `Xem case study`
- `Gửi brief`

### Scene 02: Structure

Mục đích:

- Nói rõ tư duy frontend: biến state, data, action thành thứ đọc được.

Copy đề xuất:

```txt
Giao diện không chỉ là màn hình.
Nó là cách state, dữ liệu và hành động của người dùng trở nên rõ ràng.
```

Visual:

- Grid / blueprint.
- Node kết nối thành layout.
- Một vài UI fragment: filter, state, metric, action.

Route liên quan:

- `/stack`

### Scene 03: Build

Mục đích:

- Cho thấy loại sản phẩm bạn build: web app, dashboard, internal tool, AI workflow.

Copy đề xuất:

```txt
Từ dữ liệu rời rạc đến dashboard và tool dùng được thật.
Ít màn hình hơn, nhiều quyết định rõ hơn.
```

Visual:

- Dashboard fragment.
- Project cards nhỏ đại diện cho TCA, Bonario, AI workflow.
- Không cần screenshot thật nếu asset chưa đủ tốt; dùng abstract product board.

Route liên quan:

- `/work`

### Scene 04: Verify

Mục đích:

- Thể hiện tiêu chuẩn làm việc: build, browser check, layout QA, runtime verification.

Copy đề xuất:

```txt
AI giúp tăng tốc, nhưng runtime mới quyết định.
Mỗi thay đổi cần được kiểm tra bằng trình duyệt, build và dữ liệu thật.
```

Visual:

- QA checklist.
- Browser viewport frames.
- Build signal / pass state.

Route liên quan:

- `/workflow`

### Scene 05: Choose

Mục đích:

- Đưa người xem sang route đúng.

Copy đề xuất:

```txt
Bạn muốn bắt đầu từ đâu?
Xem bằng chứng, xem quy trình, hoặc gửi brief ngắn để bắt đầu.
```

CTA:

- `/work` - Xem case study.
- `/workflow` - Xem quy trình.
- `/contact` - Gửi brief.
- `/lab` - Nhánh phụ, không phải CTA chính.

## Kiến trúc triển khai

### File dữ liệu

Tạo hoặc chỉnh:

- `src/content/homeStoryScenes.js`

Yêu cầu:

- Mỗi scene có `id`, `step`, `kicker`, `headline`, `body`, `accent`, `visual`, `routes`.
- Copy ngắn, có nhịp, không giải thích quá dài.
- Không để Home chứa toàn bộ nội dung của các route khác.

### Component

Đề xuất tách nhỏ:

- `src/components/home/HomeSignalBackdrop.jsx`
- `src/components/home/HomeStorySequence.jsx`
- `src/components/home/HomeSceneVisual.jsx`
- `src/components/home/HomeRouteChoices.jsx`

Nguyên tắc:

- `HomePage.jsx` chỉ orchestration.
- Scene content nằm trong `homeStoryScenes.js`.
- Visual motif nằm trong component riêng để dễ thay cảnh.
- Motion desktop có thể dùng GSAP; mobile dùng flow tĩnh, nhẹ.

### CSS

Chỉnh:

- `src/styles/home.css`

Yêu cầu:

- Desktop có cinematic section hoặc sticky story surface.
- Mobile đọc như một editorial sequence, không pin dài.
- Không dùng card lồng card.
- Border radius giữ tiết chế, ưu tiên 8px đến 16px cho tool/card nhỏ; panel lớn chỉ dùng khi thật sự cần.
- Không để text overlap với visual/canvas.
- Không scale font bằng viewport width quá mạnh.

### Background động

Giữ canvas hiện tại nhưng nâng lên theo scene:

- Scene 01: sparse node / signal line.
- Scene 02: grid rõ hơn, node thành structure.
- Scene 03: thêm dashboard fragments.
- Scene 04: QA pulse / pass state.
- Scene 05: background sạch hơn để CTA rõ.

Cách làm an toàn:

- Dùng CSS variable trên `.home-page`: `--home-motion-accent`, `--home-scene-index`, `--home-story-progress`.
- Canvas đọc accent từ computed style hoặc nhận prop nếu chuyển sang state React.
- Giữ fallback static cho reduced motion, mobile nhỏ, save-data.

## Phase triển khai

### Phase 1: Chốt nội dung và structure

Việc cần làm:

- Làm sạch copy trong `homeStoryScenes.js`.
- Chốt 5 scene đúng arc `Noise -> Structure -> Build -> Verify -> Choose`.
- Chỉnh `HomePage.jsx` để render sequence rõ hơn.

Acceptance:

- Vào Home đọc từ đầu đến cuối hiểu ngay bạn làm gì.
- Không cần scroll quá sâu mới thấy CTA chính.
- Không có đoạn copy nào bị dài như bài blog.

### Phase 2: Xây story sequence

Việc cần làm:

- Tạo `HomeStorySequence.jsx`.
- Tạo visual layer cho từng scene.
- Desktop dùng sticky/pinned hoặc scene surface lớn.
- Mobile chuyển thành stacked sections.

Acceptance:

- Desktop có cảm giác chuyển cảnh.
- Mobile vẫn đọc mượt, không bị pin/scroll khó chịu.
- CTA cuối rõ, route đúng.

### Phase 3: Nâng motion và background

Việc cần làm:

- Đồng bộ canvas/background với active scene.
- Thêm progress indicator nhỏ, không chiếm spotlight.
- Dùng GSAP chỉ cho reveal/transition quan trọng.

Acceptance:

- Motion có mục đích: phục vụ chuyển cảnh và signal story.
- `prefers-reduced-motion` vẫn ổn.
- Không giật trên laptop thường.

### Phase 4: Hoàn thiện responsive và polish

Việc cần làm:

- Kiểm tra desktop, tablet, mobile.
- Rà màu để tránh một-note palette.
- Rà text overflow, overlap, button fit.
- Tinh chỉnh spacing, type scale, CTA hierarchy.

Acceptance:

- Không horizontal overflow.
- Không text overlap.
- H1 và CTA nhìn tốt ở mobile.
- Visual không che nội dung.

### Phase 5: Verify

Lệnh cần chạy:

```powershell
npm run build
npm run qa:layout
```

Browser QA cần check:

- `/` desktop 1440x900.
- `/` mobile 390x844.
- Canvas không blank trên desktop.
- Mobile không bị layout shift lớn.
- Link CTA đi đúng route.

Acceptance cuối:

- Build pass.
- Layout QA pass.
- Home có ảnh/nền/visual đúng ngữ cảnh.
- Home kể được một câu chuyện liền mạch, không chỉ là danh sách section.

## Nguyên tắc ra quyết định khi implement

- Nếu một animation không giúp người xem hiểu scene tốt hơn, bỏ.
- Nếu một block nội dung cần giải thích dài, chuyển sang route riêng.
- Nếu desktop effect làm mobile khó đọc, mobile được ưu tiên đọc rõ.
- Nếu visual đẹp nhưng không nói lên `messy signals -> usable systems`, bỏ hoặc chỉnh.
- Nếu phải chọn giữa "đẹp hơn" và "rõ ý hơn", chọn rõ ý hơn rồi polish sau.

## Rủi ro cần tránh

- Home trở thành one-page cũ, nhồi mọi thứ vào một trang.
- Hiệu ứng đẹp nhưng không có nội dung.
- Canvas quá nặng hoặc gây lag.
- CTA bị chôn quá sâu.
- Copy pha Việt/Anh lộn xộn. Chỉ giữ English cho positioning statement nếu thật sự cần.
- Devl.dev-inspired nhưng copy hình thức, mất bản sắc riêng của site.

## Thứ tự ưu tiên khi làm tiếp

1. Sửa `homeStoryScenes.js` cho thật sạch.
2. Tách `HomeStorySequence.jsx`.
3. Chỉnh layout desktop/mobile trong `home.css`.
4. Đồng bộ canvas với active scene.
5. Polish CTA và route choices.
6. Chạy build + QA layout.

