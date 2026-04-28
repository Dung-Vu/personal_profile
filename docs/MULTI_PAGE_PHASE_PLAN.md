# Kế Hoạch Triển Khai Multi-Page Portfolio

## Mục Tiêu Của Phase Plan

File này triển khai chi tiết từ chiến lược tổng quan trong `docs/MULTI_PAGE_STRATEGY.md` thành các phase làm việc cụ thể.

Mục tiêu không chỉ là tách website thành nhiều trang, mà là xây lại portfolio theo hướng:

```txt
Mỗi trang có một vẻ đẹp riêng
Mỗi trang có một vai trò riêng
Toàn bộ website vẫn thống nhất như một sản phẩm Frontend được làm chủ kỹ lưỡng
```

Nguyên tắc xuyên suốt:

- Không code vội khi chưa chốt nội dung và visual direction.
- Không bê nguyên độ rối của one-page cũ sang multi-page mới.
- Không làm các trang khác nhau một cách ngẫu nhiên.
- Mỗi khác biệt visual phải có lý do.
- Mỗi effect phải phục vụ nội dung hoặc cảm xúc của trang.

---

# Phase 0 - Audit Hiện Trạng Và Chốt Hướng

## Mục tiêu

Hiểu rõ website hiện tại đang có gì, phần nào nên giữ, phần nào nên giảm, phần nào nên chuyển vào Lab.

## Việc cần làm

- Đọc lại toàn bộ cấu trúc hiện tại.
- Xác định component nào đang dùng cho nội dung chính.
- Xác định component nào chỉ phục vụ hiệu ứng hoặc concept OS.
- Chụp lại trạng thái desktop/mobile hiện tại để làm baseline.
- Ghi lại các vấn đề UX chính:
  - Rối mắt.
  - Nội dung bị dồn quá nhiều.
  - Motion cạnh tranh với nội dung.
  - Trang chủ chưa tối giản.
  - Các section thiếu bản sắc riêng.

## Output cần có

- Danh sách component giữ lại.
- Danh sách component cần refactor.
- Danh sách component chuyển sang Lab.
- Danh sách component có thể bỏ.
- Baseline screenshot desktop/mobile.

## Tiêu chí hoàn thành

Phase này hoàn thành khi đã biết rõ:

```txt
Cái gì là content core
Cái gì là visual signature
Cái gì là noise
Cái gì nên đi vào Lab
```

---

# Phase 1 - Information Architecture

## Mục tiêu

Chốt cấu trúc website mới trước khi thiết kế chi tiết hoặc code.

## Sitemap chính

```txt
/
/about
/work
/stack
/workflow
/contact
/lab
```

## Vai trò từng route

### `/` - Home

- Kể một câu chuyện mở đầu ngắn về bạn và cách bạn làm Frontend.
- Điều hướng người xem tới nơi phù hợp.
- Tạo ấn tượng đầu tiên có cảm xúc, đẹp, rõ, nhưng không rối.

### `/about` - About

- Kể câu chuyện cá nhân.
- Trình bày mindset làm Frontend.
- Cho thấy con người và gu làm việc.

### `/work` - Work

- Trình diễn project.
- Là sân khấu chính của portfolio.
- Thể hiện vẻ đẹp Frontend mạnh nhất.

### `/stack` - Stack

- Bản đồ năng lực kỹ thuật.
- Giúp người xem scan nhanh skill và evidence.

### `/workflow` - Workflow

- Trình bày quy trình làm việc.
- Chứng minh khả năng delivery và verification.

### `/contact` - Contact

- Giúp người xem liên hệ dễ dàng.
- Cung cấp brief template rõ ràng.

### `/lab` - Lab

- Giữ lại phần experimental OS.
- Chứa motion-heavy, command panel, presentation, canvas.

## Việc cần làm

- Chốt route nào làm ngay, route nào làm sau.
- Chốt `/lab` là route chính thức hay hidden route.
- Chốt có cần project detail route ngay không:

```txt
/work/tca-crypto-analyzer
/work/bonario-product-hub
/work/ai-operator-workflow
```

## Output cần có

- Sitemap cuối cùng.
- Vai trò từng trang.
- Priority route: must-have / nice-to-have.

## Tiêu chí hoàn thành

Phase này hoàn thành khi có thể trả lời:

```txt
Người xem vào website sẽ đi theo những tuyến nào?
Mỗi route tồn tại để làm gì?
Route nào thể hiện FE beauty mạnh nhất?
```

---

# Phase 2 - Content Architecture

## Mục tiêu

Tách nội dung hiện tại thành các nhóm rõ ràng cho từng trang, tránh việc trang nào cũng nói tất cả mọi thứ.

## Nội dung theo trang

### Home

Nội dung cần có:

- Tên.
- Một câu mở đầu có tính story.
- Một đoạn dẫn ngắn về cách bạn nhìn interface, state, data và delivery.
- 2 CTA chính.
- 3 tín hiệu năng lực.
- Một dòng current focus hoặc featured signal.

Không đưa vào Home:

- Danh sách project đầy đủ.
- Toàn bộ stack.
- Toàn bộ workflow.
- Command panel phức tạp.
- Mode switch toàn site.

### About

Nội dung cần có:

- Đoạn giới thiệu cá nhân.
- Mindset làm Frontend.
- Các nguyên tắc làm việc.
- Một timeline hoặc belief cards.
- Một đoạn nói về AI-assisted workflow nếu cần.

### Work

Nội dung cần có:

- Project overview.
- Case structure cho từng project:
  - Problem.
  - Context.
  - Role.
  - Decision.
  - Tech.
  - Outcome.
  - Status.

### Stack

Nội dung cần có:

- Capability groups.
- Tools.
- Evidence links tới project.
- Mức độ ứng dụng thực tế.

### Workflow

Nội dung cần có:

- Quy trình 5 bước.
- Toolchain.
- Cách verify.
- Cách handoff.

### Contact

Nội dung cần có:

- Email.
- GitHub.
- Brief template.
- Loại việc phù hợp.
- CTA gửi mail/copy email.

### Lab

Nội dung cần có:

- Giới thiệu Lab là experimental space.
- Signal OS demo.
- Command panel.
- Presentation reel hoặc mode system nếu giữ.

## Việc cần làm

- Viết lại headline Home.
- Rút gọn intro.
- Chuẩn hóa project content.
- Tách content thành file riêng theo page nếu cần.
- Xác định copy nào nên giữ tiếng Việt, copy nào có thể cần tiếng Anh.

## Output cần có

- Content outline từng trang.
- Draft headline Home.
- Case study template.
- Capability template.
- Contact brief template.

## Tiêu chí hoàn thành

Phase này hoàn thành khi mỗi trang có thể mô tả bằng:

```txt
Một mục tiêu
Một thông điệp chính
Một CTA chính
Một loại nội dung chính
```

---

# Phase 3 - Art Direction Cho Từng Trang

## Mục tiêu

Nghiên cứu và chốt vẻ đẹp riêng cho từng trang, nhưng vẫn giữ website thống nhất như một master system.

## Nguyên tắc chung

```txt
Khác nhau ở art direction
Giống nhau ở design system
```

Mỗi trang cần được định nghĩa bởi:

- Mood.
- Layout language.
- Color accent.
- Typography behavior.
- Motion behavior.
- Interaction signature.

## Art direction theo trang

### Home - Cinematic Scroll Story

Mood:

- Có nhịp kể chuyện mạnh.
- Cao cấp, cinematic, có cảm giác chuyển cảnh.
- Sắc.
- Bình tĩnh.
- Không biến thành one-page dài.

Visual language:

- Pinned stage trên desktop.
- Background đổi theo từng scene.
- Text đổi theo từng beat.
- Một signal path hoặc grid cực nhẹ dẫn mắt qua các đoạn story.
- CTA nổi bật ở scene cuối nhưng không ồn.
- Có khoảng 5 scene ngắn thay vì một block hero tĩnh.

Motion:

- Scroll-scrubbed timeline.
- Background crossfade/wipe theo scene.
- Signal scan transition làm signature.
- Stagger reveal cho từng story beat.
- Mobile fallback thành vertical stacked story.

Không dùng:

- Heavy canvas.
- Horizontal scroll.
- Nhiều panel.
- Boot bắt buộc.

### About - Editorial Identity Dossier

Mood:

- Có chiều sâu.
- Con người hơn.
- Ít máy móc hơn.

Visual language:

- Editorial layout.
- Text lớn.
- Split-screen hoặc article grid.
- Có thể dùng portrait/abstract visual.

Motion:

- Text reveal theo đoạn.
- Timeline reveal.
- Scroll nhẹ.

Không dùng:

- Quá nhiều terminal label.
- Quá nhiều glow.

### Work - Cinematic Case Theater

Mood:

- Mạnh.
- Có sân khấu.
- Showcase.
- Nhiều năng lượng nhất site.

Visual language:

- Card lớn.
- Image lớn.
- Project-specific color.
- Strong contrast.
- Có cảm giác gallery/case theater.

Motion:

- Scroll-driven transition.
- Parallax có kiểm soát.
- Project hover mở metadata.
- Case reveal theo problem -> decision -> outcome.

Không dùng:

- Motion chỉ để trang trí.
- Quá nhiều project nhỏ làm loãng focus.

### Stack - Technical Capability Matrix

Mood:

- Rõ.
- Chắc.
- Logic.
- Có tính hệ thống.

Visual language:

- Matrix grid.
- Capability cards.
- Connection line.
- Data clarity.

Motion:

- Hover evidence.
- Filter transition.
- Subtle line activation.

Không dùng:

- Cinematic quá mức.
- Text dài.
- Hiệu ứng làm chậm scan.

### Workflow - Operating Manual / Process Map

Mood:

- Có phương pháp.
- Có kiểm chứng.
- Có nhịp làm việc.

Visual language:

- Pipeline.
- Timeline.
- Process nodes.
- Checklist/state indicators.

Motion:

- Step activation.
- Line progress theo scroll.
- Node reveal.

Không dùng:

- Gallery style.
- Quá nhiều ảnh.

### Contact - Clean Intake Console

Mood:

- Rõ ràng.
- Gần gũi.
- Dễ bắt đầu.

Visual language:

- Console sạch.
- Form/draft composer gọn.
- CTA rõ.
- Ít nhiễu.

Motion:

- Copy feedback.
- Input focus state đẹp.
- Gentle reveal.

Không dùng:

- Quá nhiều terminal effect.
- Quá nhiều field khiến người xem ngại gửi.

### Lab - Experimental Signal OS

Mood:

- Cyber.
- Experimental.
- Motion-heavy.
- Có tính demo FE.

Visual language:

- Signal canvas.
- Command system.
- Panels.
- Presentation mode.
- Custom cursor.

Motion:

- Được phép mạnh nhất.
- Nhưng vẫn phải có reduced-motion fallback.

Không dùng:

- Nội dung quan trọng bắt buộc chỉ nằm trong Lab.

## Output cần có

- Art direction sheet cho từng trang.
- Token map: màu/accent/motion cho từng trang.
- Danh sách interaction signature cho từng trang.

## Tiêu chí hoàn thành

Phase này hoàn thành khi nhìn tên route là biết:

```txt
Trang đó đẹp theo kiểu gì
Trang đó khác trang khác ở đâu
Trang đó vẫn thuộc cùng hệ thống bằng cách nào
```

---

# Phase 4 - Design System Và Master Rules

## Mục tiêu

Tạo bộ luật chung để nhiều trang có vẻ đẹp khác nhau nhưng không bị vụn.

## Thành phần hệ thống

### Typography

Cần chốt:

- Font heading.
- Font body.
- Font mono.
- Scale cho hero/title/section/card/meta.
- Line-height theo loại nội dung.

### Color system

Cần chốt:

- Base background.
- Ink/text.
- Muted text.
- Line/border.
- Panel surface.
- Accent theo trang.

Accent gợi ý:

```txt
Home: cyan / pale signal
About: warm ivory / amber
Work: project-specific
Stack: cyan-blue technical
Workflow: violet/green process
Contact: clean green/cyan
Lab: full cyber palette
```

### Layout system

Cần chốt:

- Max width.
- Page padding.
- Grid columns.
- Section spacing.
- Card rhythm.
- Mobile breakpoints.

### Motion system

Cần chốt:

- Reveal duration.
- Page transition duration.
- Hover behavior.
- Scroll behavior.
- Reduced-motion fallback.

### Interaction system

Cần chốt:

- Button states.
- Link states.
- Focus states.
- Copy feedback.
- Card hover.
- Keyboard navigation.

## Việc cần làm

- Gom design tokens hiện tại.
- Loại bỏ token không cần.
- Thêm page-level accent tokens.
- Tạo rule dùng motion theo cấp độ:
  - calm.
  - standard.
  - showcase.
  - experimental.

## Output cần có

- Token strategy.
- Motion principle.
- Interaction rule.
- Responsive rule.

## Tiêu chí hoàn thành

Phase này hoàn thành khi có thể thiết kế nhiều trang khác nhau mà không phải viết style tùy hứng.

---

# Phase 5 - Code Architecture Và Routing

## Mục tiêu

Tách `App.jsx` hiện tại thành kiến trúc nhiều trang dễ bảo trì.

## Cấu trúc đề xuất

```txt
src/
  App.jsx
  main.jsx
  routes/
    routes.js
  pages/
    HomePage.jsx
    AboutPage.jsx
    WorkPage.jsx
    StackPage.jsx
    WorkflowPage.jsx
    ContactPage.jsx
    LabPage.jsx
  components/
    layout/
    sections/
    shared/
    ui/
  content/
    home.js
    about.js
    projects.js
    capabilities.js
    workflow.js
    contact.js
  styles/
    tokens.css
    themes.css
    base.css
    layout.css
    pages/
      home.css
      about.css
      work.css
      stack.css
      workflow.css
      contact.css
      lab.css
```

## Routing options

### Option A - React Router

Ưu điểm:

- Chuẩn cho multi-page SPA.
- Dễ mở rộng project detail pages.
- Dễ quản lý active nav.

Nhược điểm:

- Thêm dependency.

### Option B - Router tự viết bằng History API

Ưu điểm:

- Không thêm dependency.
- Đủ dùng nếu route đơn giản.

Nhược điểm:

- Tự xử lý nhiều edge case.
- Không tiện nếu có project detail pages.

Khuyến nghị:

```txt
Dùng React Router nếu muốn website phát triển lâu dài.
```

## Việc cần làm

- Tạo page components.
- Tách shell layout.
- Tách Header khỏi logic one-page scroll.
- Thay anchor scroll bằng route navigation.
- Giữ scroll-to-top khi đổi route.
- Xử lý active nav theo pathname.

## Output cần có

- Multi-page route hoạt động.
- Header navigation hoạt động.
- Home/About/Work/Stack/Workflow/Contact/Lab render độc lập.

## Tiêu chí hoàn thành

Phase này hoàn thành khi website có thể đi qua từng route mà chưa cần polish visual hoàn chỉnh.

---

# Phase 6 - Page Build: Home

## Mục tiêu

Xây Home mới theo kiểu cinematic scroll story: scroll dọc để chuyển background, đổi text theo từng scene, có cảm giác cao cấp nhưng vẫn rõ nội dung và không rối.

## Nội dung bắt buộc

- Tên.
- Headline định vị.
- Intro ngắn có tính story.
- Khoảng 5 scene dẫn người xem từ "tín hiệu xuất hiện" đến "xem Work hoặc Contact".
- Mỗi scene có background, text beat và transition riêng.
- CTA chính: Work.
- CTA phụ: Contact.
- 3 capability signals.
- Link nhẹ tới Lab nếu muốn.

## Visual requirement

- Nhiều khoảng thở.
- Một visual signature duy nhất, ưu tiên signal path/story path.
- Không quá nhiều chip.
- Không presentation reel.
- Không mode switch phức tạp.
- Không kéo dài thành một one-page mới.

## Interaction requirement

- CTA hover đẹp.
- Navigation rõ.
- Mobile đọc tốt.
- Motion nhẹ, hỗ trợ nhịp story, không làm chậm vào nội dung.

## Output cần có

- `HomePage.jsx`.
- `home.css`.
- Home responsive desktop/mobile.

## Tiêu chí hoàn thành

Home hoàn thành khi người xem hiểu trong 20-30 giây:

```txt
Bạn là ai
Bạn làm gì
Bạn có gu Frontend như thế nào
Nên xem gì tiếp
```

---

# Phase 7 - Page Build: About

## Mục tiêu

Xây About như một trang editorial identity có chiều sâu.

## Nội dung bắt buộc

- Intro cá nhân.
- Mindset Frontend.
- Belief cards.
- Timeline hoặc working principles.
- Link sang Work.

## Visual requirement

- Khác Home rõ ràng.
- Ít cyber hơn.
- Typography có vai trò lớn.
- Cảm giác có con người thật.

## Interaction requirement

- Text reveal nhẹ.
- Timeline/belief cards có hover/focus state.
- Mobile không bị dài lê thê.

## Output cần có

- `AboutPage.jsx`.
- `about.css`.
- Content about đã rút gọn và viết lại.

## Tiêu chí hoàn thành

About hoàn thành khi trang này tạo được cảm giác:

```txt
Đây là người có tư duy riêng, không chỉ là người biết dùng tool.
```

---

# Phase 8 - Page Build: Work

## Mục tiêu

Xây trang Work như sân khấu chính để trình diễn vẻ đẹp Frontend và case study.

## Nội dung bắt buộc

- Project overview.
- 3 project chính.
- Problem / Role / Decision / Outcome cho từng project.
- Tech stack.
- Status.

## Visual requirement

- Trang mạnh nhất về visual.
- Project cards lớn.
- Mỗi project có tone riêng.
- Có image, depth, motion có kiểm soát.

## Interaction requirement

- Hover mở metadata.
- Scroll reveal theo case.
- Mobile chuyển thành vertical case cards.
- Không để horizontal scroll phá UX mobile.

## Output cần có

- `WorkPage.jsx`.
- `work.css`.
- Project card system.
- Có thể chuẩn bị `ProjectDetailPage.jsx` nhưng chưa cần build full.

## Tiêu chí hoàn thành

Work hoàn thành khi nó là trang trả lời mạnh nhất câu hỏi:

```txt
Frontend của bạn đẹp và có năng lực thật ở đâu?
```

---

# Phase 9 - Page Build: Stack

## Mục tiêu

Xây Stack thành technical capability matrix rõ ràng, đáng tin.

## Nội dung bắt buộc

- Capability groups.
- Tools.
- Evidence/project liên quan.
- Level hoặc usage context.

## Visual requirement

- Matrix đẹp, gọn, dễ scan.
- Technical nhưng không khô.
- Có cấu trúc rõ hơn trang Work.

## Interaction requirement

- Filter/tabs nếu cần.
- Hover hiện evidence.
- Focus state đầy đủ.
- Mobile chuyển thành card stack dễ đọc.

## Output cần có

- `StackPage.jsx`.
- `stack.css`.
- Capability matrix mới hoặc refactor từ component cũ.

## Tiêu chí hoàn thành

Stack hoàn thành khi người xem kỹ thuật có thể scan nhanh:

```txt
Bạn biết gì
Dùng để làm gì
Có bằng chứng ở đâu
```

---

# Phase 10 - Page Build: Workflow

## Mục tiêu

Xây Workflow thành process map cho thấy cách bạn làm việc.

## Nội dung bắt buộc

- 5 bước workflow.
- Toolchain.
- Verification loop.
- Handoff principle.

## Visual requirement

- Pipeline/timeline rõ.
- Cảm giác operating manual.
- Có trạng thái, step, connection.

## Interaction requirement

- Scroll activation theo step.
- Motion dạng process, không phải decoration.
- Mobile timeline rõ, không rối line.

## Output cần có

- `WorkflowPage.jsx`.
- `workflow.css`.
- Process map component.

## Tiêu chí hoàn thành

Workflow hoàn thành khi người xem hiểu:

```txt
Bạn làm việc có phương pháp và biết kiểm chứng sản phẩm.
```

---

# Phase 11 - Page Build: Contact

## Mục tiêu

Xây Contact gọn, rõ, dễ bắt đầu liên hệ.

## Nội dung bắt buộc

- Email.
- GitHub.
- Loại việc phù hợp.
- Brief template.
- Copy email.
- Mailto.

## Visual requirement

- Clean intake console.
- Ít noise hơn hiện tại.
- CTA nổi bật.
- Form/draft composer dễ hiểu.

## Interaction requirement

- Copy feedback rõ.
- Mailto hoạt động.
- Input/focus state đẹp.
- Mobile dễ thao tác.

## Output cần có

- `ContactPage.jsx`.
- `contact.css`.
- Intake composer gọn.

## Tiêu chí hoàn thành

Contact hoàn thành khi người xem không phải nghĩ nhiều để biết:

```txt
Muốn làm việc với bạn thì cần gửi gì và gửi ở đâu.
```

---

# Phase 12 - Page Build: Lab

## Mục tiêu

Chuyển phần experimental OS hiện tại vào Lab, giữ cá tính mạnh mà không làm rối flow chính.

## Nội dung có thể giữ

- Signal canvas.
- Command panel.
- Presentation reel.
- Mode switch.
- Custom cursor.
- Progress rail nếu còn phù hợp.

## Visual requirement

- Đây là trang được phép cyber nhất.
- Được phép nhiều motion nhất.
- Phải nói rõ đây là experimental space.

## Interaction requirement

- Reduced-motion vẫn phải hoạt động.
- Không ảnh hưởng các route chính.
- Có nút quay về Home/Work rõ ràng.

## Output cần có

- `LabPage.jsx`.
- `lab.css`.
- Các module OS cũ được gom vào Lab.

## Tiêu chí hoàn thành

Lab hoàn thành khi giữ được chất hiện tại nhưng không còn làm Home bị rối.

---

# Phase 13 - Motion, Performance Và Accessibility QA

## Mục tiêu

Đảm bảo website đẹp nhưng không nặng, không khó dùng, không phá accessibility.

## Việc cần kiểm tra

### Motion

- Reduced motion.
- ScrollTrigger cleanup.
- Route change cleanup.
- Animation không làm content bị mờ khi deep link.
- Không có effect chạy vô ích ở tab hidden.

### Performance

- Bundle size.
- Image optimization.
- Canvas chỉ chạy nơi cần.
- Lab không làm nặng route khác.
- Lazy load nếu cần.

### Accessibility

- Keyboard navigation.
- Focus visible.
- Button/link semantics.
- Dialog focus trap nếu command panel còn dùng.
- Color contrast.
- Mobile tap target.

### Responsive

- 360px mobile.
- 768px tablet.
- 1440px desktop.
- Chiều cao thấp trên laptop.
- Không horizontal overflow ngoài nơi cố ý.

## Output cần có

- Build production pass.
- Desktop/mobile screenshot.
- Danh sách issue còn lại.
- Fix các lỗi nghiêm trọng.

## Tiêu chí hoàn thành

Phase này hoàn thành khi website không chỉ đẹp trong ảnh chụp mà còn dùng tốt trong runtime.

---

# Phase 14 - Final Polish Và Content Lock

## Mục tiêu

Chốt phiên bản đầu tiên của multi-page portfolio.

## Việc cần làm

- Rà lại copy toàn website.
- Kiểm tra tone tiếng Việt/Anh nếu có song ngữ.
- Đồng bộ title/meta/SEO cơ bản.
- Kiểm tra link email/GitHub.
- Kiểm tra các CTA chính.
- Làm final screenshot.
- Ghi lại changelog.

## Output cần có

- Website multi-page hoàn chỉnh.
- Build sạch.
- Screenshot final.
- Danh sách follow-up cho version sau.

## Tiêu chí hoàn thành

Phase này hoàn thành khi portfolio đạt được mục tiêu:

```txt
Dễ đọc hơn bản cũ
Đẹp hơn ở từng trang
Thể hiện được năng lực Frontend
Vẫn giữ được chất Signal Profile riêng
```

---

# Thứ Tự Ưu Tiên Đề Xuất

Nếu muốn làm theo thứ tự an toàn:

```txt
Phase 0 -> Phase 1 -> Phase 2 -> Phase 3 -> Phase 4
-> Phase 5 -> Phase 6 -> Phase 8 -> Phase 11
-> Phase 7 -> Phase 9 -> Phase 10 -> Phase 12
-> Phase 13 -> Phase 14
```

Lý do:

- Home cần làm trước để định lại cảm giác tổng thể.
- Work nên làm sớm vì đây là nơi trình diễn FE mạnh nhất.
- Contact nên làm sớm để website có flow hoàn chỉnh.
- About, Stack, Workflow có thể polish sau khi đã có trục chính Home -> Work -> Contact.
- Lab làm sau để tránh bị cuốn vào effect trước khi content chính rõ.

# MVP Đề Xuất

Nếu muốn có bản đầu tiên nhanh nhưng vẫn đúng hướng:

```txt
MVP = Home + Work + Contact + Navigation mới
```

Sau MVP mới thêm:

```txt
About + Stack + Workflow + Lab
```

MVP vẫn phải giữ nguyên mục tiêu:

```txt
Home tối giản
Work trình diễn vẻ đẹp Frontend
Contact rõ đường liên hệ
```
