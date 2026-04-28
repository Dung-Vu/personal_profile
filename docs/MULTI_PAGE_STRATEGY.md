# Chiến Lược Chuyển Portfolio Thành Multi-Page Website

## 1. Mục Đích Chính

Mục tiêu của lần thay đổi này không chỉ là tách website thành nhiều trang. Mục tiêu lớn hơn là biến portfolio thành một nơi **trình diễn vẻ đẹp của Frontend**.

Website mới cần đạt 3 điều:

- **Dễ đọc hơn**: Trang chủ không còn nhồi toàn bộ nội dung vào một page dài và rối.
- **Đẹp có chủ đích hơn**: Mỗi trang có một vẻ đẹp riêng, một ngôn ngữ thị giác riêng, không bị lặp lại nhàm chán.
- **Vẫn master và thống nhất**: Dù mỗi trang có cá tính khác nhau, toàn bộ website vẫn phải thuộc cùng một hệ thống thiết kế, cùng một chất riêng của Vũ Đình Dũng.

Định hướng tổng quát:

```txt
Trang chủ kể chuyện gọn, không nhồi nội dung
Cá tính ở từng trang con
Mạnh về FE visual
Rõ về nội dung
Thống nhất ở cấp hệ thống
```

## 2. Vấn Đề Hiện Tại

Website hiện tại có nhiều điểm mạnh về concept, motion và visual, nhưng đang bị quá tải vì tất cả được đặt trong một trang duy nhất.

Các vấn đề chính:

- Toàn bộ nội dung nằm trong một page dài: Hero, Identity, Stack, Projects, Workflow, Contact.
- Quá nhiều lớp giao diện cùng xuất hiện: boot screen, command panel, progress rail, presentation reel, canvas, custom cursor.
- Quá nhiều mode: story, systems, cases, recruiter khiến trải nghiệm bị phức tạp.
- Nội dung quan trọng bị che bởi hiệu ứng, label, chip và các lớp “system UI”.
- Trang chủ chưa còn là trang chủ đúng nghĩa, vì nó đang cố kể hết mọi thứ.
- Các section có cùng một chất cyber/signal nên dễ bị trùng cảm giác, thiếu nhịp nghỉ.

Kết luận:

```txt
Website hiện tại có cá tính, nhưng cá tính đang bị dồn quá nhiều vào một nơi.
Cần tách nó ra thành nhiều trang để mỗi phần được thở và được trình diễn tốt hơn.
```

## 3. Tư Duy Thiết Kế Mới

Website mới nên được nhìn như một bộ sưu tập các trải nghiệm Frontend, không chỉ là một landing page.

Mỗi trang cần có:

- Một vai trò nội dung rõ ràng.
- Một cảm xúc thị giác riêng.
- Một bố cục riêng.
- Một nhịp motion riêng.
- Một lý do tồn tại riêng.

Nhưng toàn bộ website vẫn cần thống nhất bởi:

- Typography system.
- Design tokens.
- Navigation chung.
- Chất “Signal Profile”.
- Cách dùng màu có kiểm soát.
- Cách xử lý motion có kỷ luật.
- Tư duy rõ state, rõ hierarchy, rõ interaction.

Nguyên tắc quan trọng:

```txt
Mỗi trang khác nhau về vẻ đẹp.
Nhưng không trang nào được lạc khỏi tổng thể.
```

## 4. Sitemap Tổng Quan

Sitemap đề xuất:

```txt
/
/about
/work
/stack
/workflow
/contact
/lab
```

Vai trò từng trang:

- `/` - Trang chủ theo kiểu story, mở đầu rõ ràng và có nhịp dẫn dắt.
- `/about` - Câu chuyện cá nhân, mindset và identity.
- `/work` - Trình diễn project, case study và năng lực thực chiến.
- `/stack` - Bản đồ kỹ năng và capability kỹ thuật.
- `/workflow` - Quy trình làm việc, cách biến bài toán thành sản phẩm chạy được.
- `/contact` - Liên hệ, gửi brief, bắt đầu hợp tác.
- `/lab` - Không gian thử nghiệm motion, cyber OS, interaction mạnh.

## 5. Phong Cách Chính Của Từng Trang

### Home - Cinematic Scroll Story

Vai trò:

Trang chủ là điểm vào đầu tiên. Hướng mới không phải là một landing page tối giản khô, mà là một **cinematic scroll story**: người xem scroll dọc để đi qua từng cảnh, background chuyển theo nhịp, text đổi theo từng beat, visual morph/fade/wipe để tạo cảm giác cao cấp.

Tham khảo nghiên cứu chi tiết: `docs/HOME_SCROLLYTELLING_RESEARCH.md`.

Home cần khiến người xem hiểu nhanh:

- Bạn là ai.
- Bạn làm gì.
- Bạn mạnh ở đâu.
- Nên đi tới trang nào tiếp theo.

Nội dung chính:

- Tên: Vũ Đình Dũng.
- Một câu mở đầu có tính story, không chỉ là slogan.
- 2 CTA chính: xem dự án, liên hệ.
- 3 năng lực nổi bật: Frontend, Dashboard/Internal Tool, AI Workflow.
- Một đoạn dẫn ngắn về cách bạn biến vấn đề thành giao diện rõ trạng thái.
- Một visual signature nhẹ để giữ chất riêng.

Phong cách visual:

- Story-driven nhưng vẫn sạch, nhiều khoảng thở.
- Dark nền nhưng không quá nặng.
- Một điểm nhấn duy nhất: signal path, cursor, grid mờ hoặc glow nhẹ.
- Motion ít nhưng tinh: từng đoạn story xuất hiện có nhịp, signal line dẫn mắt, hover response rõ.

Mục tiêu cảm giác:

```txt
Có nhịp kể chuyện, có cảm xúc mở đầu, nhưng vẫn sắc, gọn và không gây mệt.
```

Điểm cần tránh:

- Không nhồi project, stack, workflow quá nhiều.
- Không dùng boot screen bắt buộc.
- Không dùng mode switch phức tạp ở trang chủ.
- Không biến Home thành demo kỹ thuật.
- Không kể chuyện quá dài làm Home trở thành một one-page thứ hai.

### About - Editorial Identity Dossier

Vai trò:

About giúp người xem hiểu con người phía sau sản phẩm Frontend. Đây là nơi nói về tư duy, gu làm việc và cách bạn nhìn UI.

Nội dung chính:

- Bạn là ai.
- Vì sao bạn thích làm web interface.
- Bạn quan tâm tới state, flow, data và handoff như thế nào.
- Bạn muốn xây loại sản phẩm nào.
- Cách bạn kết hợp FE với AI/CLI/workflow hiện đại.

Phong cách visual:

- Editorial, giống một hồ sơ cá nhân được thiết kế kỹ.
- Có chất “dossier” hoặc “personal memo”.
- Ít cyber hơn, nhiều tính con người hơn.
- Typography lớn, nhịp đọc chậm, dễ cảm nhận.

Mục tiêu cảm giác:

```txt
Có chiều sâu, có cá tính, có con người thật, không quá máy móc.
```

Ý tưởng FE cần nghiên cứu:

- Layout dạng editorial split-screen.
- Scroll story nhẹ.
- Text reveal theo đoạn.
- Một timeline hoặc belief cards.
- Ảnh/visual cá nhân xử lý theo hướng art direction riêng.

### Work - Cinematic Case Theater

Vai trò:

Work là trang trình diễn năng lực mạnh nhất. Đây là nơi portfolio cần “đẹp” và có sức nặng nhất, vì project là bằng chứng thực tế.

Nội dung chính:

- TCA Crypto Analyzer.
- Bonario Product Hub.
- AI Operator Workflow.
- Mỗi project cần có:
  - Problem.
  - Context.
  - Role.
  - UI/system decision.
  - Tech stack.
  - Outcome.
  - Status.

Phong cách visual:

- Cinematic, mạnh, có cảm giác showcase.
- Card lớn, ảnh lớn, bố cục có lực.
- Mỗi project có tone riêng.
- Motion có thể mạnh hơn các trang khác, nhưng phải phục vụ cảm giác case study.

Mục tiêu cảm giác:

```txt
Đây là trang làm người xem thấy năng lực FE rõ nhất.
Mạnh, đẹp, có sân khấu, có bằng chứng.
```

Hướng vẻ đẹp cho từng project:

- TCA Crypto Analyzer: data terminal, cyan, market signal, chart energy.
- Bonario Product Hub: operation system, amber, admin control, business workflow.
- AI Operator Workflow: automation lab, green, CLI, AI-assisted development.

Ý tưởng FE cần nghiên cứu:

- Case cards có depth và parallax vừa đủ.
- Project transition khác nhau theo từng case.
- Hover mở metadata.
- Scroll-driven reveal cho problem -> role -> outcome.
- Có thể dùng horizontal storytelling nhưng chỉ trong Work, không áp toàn site.

### Stack - Technical Capability Matrix

Vai trò:

Stack giúp người xem hiểu năng lực kỹ thuật một cách có hệ thống. Trang này cần rõ ràng, chắc chắn, scan nhanh.

Nội dung chính:

- Frontend.
- Backend/API.
- Automation/AI Workflow.
- Delivery/Runtime.
- Với mỗi capability:
  - Tool/technology.
  - Dùng để làm gì.
  - Mức độ ứng dụng.
  - Project liên quan.

Phong cách visual:

- Technical matrix.
- Dashboard sạch.
- Grid rõ, module rõ.
- Ít cảm xúc hơn Work, nhưng vẫn phải đẹp ở cấp bố cục và tương tác.

Mục tiêu cảm giác:

```txt
Rõ, chắc, đáng tin, có hệ thống.
```

Ý tưởng FE cần nghiên cứu:

- Interactive skill matrix.
- Filter theo nhóm skill.
- Hover/click hiện evidence project.
- Các connection line nhẹ giữa capability và project.
- Micro-interaction chính xác, không phô trương.

### Workflow - Operating Manual / Process Map

Vai trò:

Workflow chứng minh bạn không chỉ làm giao diện đẹp, mà có quy trình biến bài toán thành sản phẩm chạy được.

Nội dung chính:

- Read context.
- Shape interface.
- Build runnable slice.
- Verify runtime.
- Handoff / iterate.
- Toolchain: Codex, browser audit, CLI, MCP, build/test.

Phong cách visual:

- Process map.
- Operating manual.
- Pipeline hoặc flowchart.
- Có cảm giác kỹ luật và có hệ thống.

Mục tiêu cảm giác:

```txt
Có phương pháp, có kiểm chứng, có khả năng delivery thật.
```

Ý tưởng FE cần nghiên cứu:

- Timeline ngang/dọc tùy desktop/mobile.
- Step cards có trạng thái.
- Scroll làm pipeline sáng dần.
- Flowchart có connection line.
- Motion dạng process activation, không phải motion trang trí.

### Contact - Clean Intake Console

Vai trò:

Contact giúp người xem biết cách bắt đầu liên hệ. Trang này cần rõ, nhanh, ít ma sát.

Nội dung chính:

- Email.
- GitHub.
- Loại việc phù hợp: Website, Dashboard, Internal Tool, AI Workflow.
- Brief template.
- Copy email / mailto.

Phong cách visual:

- Clean console.
- Gọn hơn intake console hiện tại.
- CTA rõ hơn.
- Ít noise, ít chip, ít label thừa.

Mục tiêu cảm giác:

```txt
Dễ bắt đầu, rõ cần gửi gì, chuyên nghiệp nhưng vẫn có chất riêng.
```

Ý tưởng FE cần nghiên cứu:

- Brief composer gọn.
- Copy feedback đẹp.
- Form-like layout nhưng không nhàm chán.
- Terminal aesthetic rất nhẹ, không chiếm hết trang.

### Lab - Experimental Signal OS

Vai trò:

Lab là nơi giữ phần cá tính cyber/motion hiện tại mà không làm rối flow chính. Đây là trang dành cho trải nghiệm, không phải trang bắt buộc để hiểu portfolio.

Nội dung có thể giữ:

- Signal canvas.
- Command panel.
- Presentation reel.
- Mode switch.
- Custom cursor.
- Motion-heavy effects.

Phong cách visual:

- Cyber OS.
- Terminal.
- Signal system.
- Mạnh, experimental, có tính demo.

Mục tiêu cảm giác:

```txt
Đây là sân chơi Frontend experimental, nơi thể hiện cá tính mạnh nhất.
```

Lý do nên có Lab:

- Không bỏ phí concept đã build.
- Không làm Home bị rối.
- Người thích interaction vẫn có nơi để khám phá.
- Phần experimental được đặt đúng chỗ.

## 6. Hệ Thống Thống Nhất Toàn Website

Dù mỗi trang có vẻ đẹp riêng, website vẫn cần một master system để không bị vụn.

Các yếu tố thống nhất:

- Header/navigation chung.
- Typography scale chung.
- Token màu chung.
- Spacing system chung.
- Border radius, line, shadow có quy luật.
- Motion principle chung.
- Cùng một tinh thần: rõ state, rõ hierarchy, rõ interaction.

Cách làm mỗi trang khác nhau nhưng vẫn cùng hệ:

- Home dùng story flow, ít màu, ít motion, tập trung dẫn mắt.
- About dùng typography và layout editorial.
- Work dùng image, scale, cinematic composition.
- Stack dùng grid, matrix, data clarity.
- Workflow dùng line, step, activation motion.
- Contact dùng console/form clarity.
- Lab dùng đầy đủ cyber/motion experimental.

Nguyên tắc kiểm soát:

```txt
Khác nhau ở art direction.
Giống nhau ở design system.
```

## 7. Những Gì Nên Giữ

- Identity Signal Profile.
- Dark technical atmosphere.
- Nội dung profile, projects, capabilities, workflow hiện có.
- Một phần canvas signal background, nhưng dùng tiết chế.
- Project theater, chuyển về Work.
- Intake composer, chuyển về Contact và làm gọn.
- Command panel, chuyển về Lab hoặc làm nhẹ đi.
- Reduced-motion support.
- Motion có chủ đích.

## 8. Những Gì Nên Giảm

- Mode switch toàn site.
- Presentation reel ở Home.
- Boot prelude bắt buộc.
- Quá nhiều system label, chip, HUD.
- Custom cursor trên mọi trang.
- Progress rail nếu đã chuyển sang multi-page.
- Horizontal scroll ngoài trang Work.
- Copy quá giống máy móc ở những nơi cần con người.

## 9. User Journey Tổng Quan

Người xem nhanh:

```txt
Home -> Work -> Contact
```

Recruiter:

```txt
Home -> Work -> Stack -> Contact
```

Client:

```txt
Home -> Workflow -> Work -> Contact
```

Người xem kỹ thuật:

```txt
Home -> Stack -> Workflow -> Lab
```

Người muốn hiểu con người:

```txt
Home -> About -> Work -> Contact
```

## 10. Các Quyết Định Cần Chốt Trước Khi Triển Khai Phase

Trước khi code, cần chốt các điểm sau:

1. Có giữ `/lab` không?
2. Trang chủ ưu tiên recruiter, client/freelance hay personal brand?
3. Work chỉ làm gallery trước hay làm luôn project detail page?
4. Website dùng tiếng Việt, tiếng Anh hay song ngữ?
5. Mức độ cá tính mong muốn là clean tech, cyber cinematic hay editorial developer?
6. Mỗi trang cần khác nhau tới mức nào để vẫn không mất sự thống nhất?
7. Những effect nào được xem là signature, những effect nào chỉ là noise?

## 11. Định Hướng Mặc Định Đề Xuất

Hướng nên chọn ở giai đoạn đầu:

```txt
Home story landing
About editorial
Work cinematic
Stack technical matrix
Workflow process map
Contact clean console
Lab experimental Signal OS
```

Lý do:

- Home có nhịp kể chuyện rõ hơn, tạo ấn tượng đầu tiên tốt hơn mà không bị rối.
- Work có đủ sân khấu để trình diễn vẻ đẹp Frontend.
- Stack và Workflow chứng minh năng lực thật, không chỉ visual.
- Contact rõ ràng hơn, tăng khả năng người xem liên hệ.
- Lab giữ lại cá tính OS/cyber hiện tại mà không làm rối flow chính.

## 12. Ghi Chú Quan Trọng

Kế hoạch này chưa phải phase triển khai chi tiết. Đây là bản tổng quan chiến lược để nhìn rõ hướng đi trước.

Sau khi chốt được các ý chính trong file này, bước tiếp theo mới nên tách thành các phase cụ thể:

- Phase nội dung.
- Phase thiết kế visual direction.
- Phase routing và cấu trúc code.
- Phase migrate component.
- Phase motion system.
- Phase responsive QA.
- Phase polish cuối.

Điểm không được quên:

```txt
Mục tiêu không chỉ là làm website dễ đọc hơn.
Mục tiêu là làm một portfolio thể hiện được gu, kỹ năng và vẻ đẹp của Frontend ở từng trang.
```
