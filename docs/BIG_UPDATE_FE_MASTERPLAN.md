# BIG UPDATE FE MASTERPLAN

## Signal Profile OS 2.0 -> Adaptive Command Center

Mục tiêu của bản nghiên cứu này không phải là thêm vài hiệu ứng đẹp mắt. Mục tiêu là nâng project hiện tại từ một portfolio đã polished thành một flagship front-end product, nơi người xem thấy rõ 5 thứ cùng lúc: gu thẩm mỹ, product thinking, motion craft, code architecture và quality bar thực chiến.

---

## 1. Kết luận nhanh

- Project hiện tại đã có nền FE tốt: React 19 + Vite, shell rõ ràng, motion có kiểm soát, command panel có search/filter, accessibility và reduced-motion không bị bỏ quên.
- Điểm chưa đủ wow không nằm ở chỗ thiếu effect. Điểm chưa đủ wow là các effect hiện tại chưa hội tụ thành một hệ trải nghiệm flagship xuyên suốt toàn site.
- Hero đang gánh phần lớn cảm giác ấn tượng. Từ section 2 trở đi, trải nghiệm quay về mô hình card/grid khá an toàn nên độ thăng của narrative bị giảm.
- Big update nên đi theo hướng `Adaptive Command Center`: lai giữa portfolio OS, data narrative và spatial storytelling. Đây là hướng vừa có độ wow cao, vừa hợp persona “web developer xây giao diện rõ trạng thái cho sản phẩm vận hành”.
- Không nên đập đi làm lại theo kiểu generic SaaS landing page. Cũng không nên lao ngay vào full 3D nếu chưa cần. Cái cần là một FE system có bản sắc, có lớp lang, có semantic motion và có chiều sâu tương tác.

---

## 2. Chẩn đoán hiện trạng thật sự

Hiện tại site không hề yếu. Ngược lại, nó đang ở mức “tay FE cứng, code sạch, biết tiết chế”. Vấn đề là nếu mục tiêu là khiến người khác nhìn vào và thấy “thằng này FE đỉnh”, thì project mới đang chứng minh được sự vững vàng hơn là sự vượt trội.

### 2.1. Những gì đang rất ổn

- App shell rõ ràng: `Header`, `ProgressRail`, `CommandPanel`, `TransitionGate`, `Footer`.
- Motion architecture đã được tách lớp tử tế: `useGsapMotion` chỉ còn là orchestration hook, phía dưới đã chia ra `useHorizontalScroll`, `useRevealMotion`, `useHoverRaise`, `useParallaxImages`, `useWorkflowMotion`.
- Motion gating làm đúng bài: `wow-motion`, `motion-muted`, `prefers-reduced-motion`, pointer-fine, desktop-width.
- Command Panel không chỉ là gimmick. Nó đã có search/filter, focus trap, Escape close, focus return. Đây là tín hiệu FE rất tốt.
- Visual language thống nhất: dark signal aesthetic, neon accent, mono labels, Space Grotesk heading, panel surfaces, canvas background, cursor/case-study vibe.
- Responsive strategy ổn: desktop được phép “wow”, mobile fallback vẫn đọc được và không bị phá layout.

### 2.2. Những gì đang giới hạn cảm giác flagship

| Layer      | Hiện tại                                                            | Vì sao chưa đủ wow                                                                               |
| ---------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Hero       | Mạnh nhất site, có title glitch, signal background, profile card    | Quá nhiều trọng lượng dồn vào first fold; các section sau không nâng tiếp được đỉnh cảm xúc      |
| Identity   | Ảnh + story panel + 3 metrics                                       | Cấu trúc sạch nhưng còn an toàn; chưa biến “identity” thành một module có bản sắc FE mạnh        |
| Stack      | 4 card đẹp, icon động, level badge                                  | Đang là danh sách kỹ năng đẹp mắt, chưa phải capability system hay graph có chiều sâu            |
| Projects   | Có pinned horizontal desktop, progress bar, arrows, case-study rows | Đã tốt hơn portfolio thường, nhưng vẫn là card slideshow; chưa tạo cảm giác “case study theater” |
| Workflow   | Grid 4 bước ổn định, readable                                       | Chưa tận dụng được motion để diễn giải luồng phụ thuộc, trạng thái, checkpoint                   |
| Contact    | Rõ ràng, terminal lines, CTA hợp lý                                 | Chốt trải nghiệm còn hiền; chưa tạo cảm giác intake console hay dispatch station                 |
| Theme      | Có accent cycle `signal / amber / violet`                           | Mới đổi màu nhấn, chưa đủ để gọi là mode/theme system                                            |
| Navigation | Header + rail + command panel                                       | Mạnh về utility, chưa đủ mạnh về dramaturgy và “system feeling”                                  |

### 2.3. Kết luận chẩn đoán

Site đang giống một portfolio rất tốt của một FE engineer giỏi. Bản big update phải khiến nó giống một sản phẩm front-end flagship được làm bởi một người vừa hiểu thiết kế, vừa hiểu state, vừa hiểu runtime behavior.

---

## 3. Những gì bắt buộc phải giữ lại

Big update không nên phá DNA hiện tại. Những thứ dưới đây phải được giữ và nâng cấp tiếp:

- Command panel và keyboard-first interaction.
- Signal/cyber/operating-system mood.
- Custom cursor, nhưng cần nâng thành cursor có ngữ nghĩa chứ không chỉ “đẹp”.
- Canvas background, nhưng cần scene-aware hơn.
- TransitionGate và section scenes, vì đây là mầm rất tốt cho cinematic navigation.
- Reduced-motion, responsive fallback, focus management.
- Tone nội dung hiện tại: không khoa trương rỗng, nói chuyện theo hướng làm ra sản phẩm dùng được thật.

---

## 4. Ba hướng big update khả thi

### 4.1. Hướng A: Data Narrative Dashboard

Biến toàn bộ site thành một portfolio kiểu data/product system. Mỗi section là một module trực quan hóa khác nhau: timeline, capability map, case-study metric band, workflow pipeline, state summary.

**Ưu điểm**

- Rất hợp persona hiện tại.
- Chứng minh mạnh năng lực information design.
- Dễ kể chuyện theo hướng product và operations.
- Khả thi trong 1 big update thực chiến.

**Nhược điểm**

- Nếu làm khô tay sẽ dễ giống dashboard demo.
- Độ wow thị giác có thể thấp hơn một hướng cinematic hơn.

### 4.2. Hướng B: Spatial Command Center

Đẩy site lên thành một “command center” có scene-state rõ ràng. Không cần full 3D, nhưng layout, depth, motion, navigation và module behavior đều phải tạo cảm giác đang đi trong một hệ thống sống.

**Ưu điểm**

- Wow cao hơn hẳn.
- Khớp mạnh với concept `Signal Profile OS`.
- Tạo cơ hội để showcase shell design, transition logic, scene-based UI, context-aware interactions.

**Nhược điểm**

- Nếu không giữ kỷ luật sẽ thành màu mè.
- Cần choreography rất chắc để không bị mệt.

### 4.3. Hướng C: Brutalist Terminal Machine

Đẩy tất cả về thẩm mỹ terminal, logs, code fragments, diff blocks, command output, ASCII and diagnostics.

**Ưu điểm**

- Rất cá tính.
- Developer audience sẽ nhớ.
- Build được nhiều detail thú vị mà không cần 3D/WebGL nặng.

**Nhược điểm**

- Dễ quá niche.
- Nếu lạm dụng mono/code block sẽ giảm readability.
- Có thể làm persona bị bó hẹp vào “coder aesthetic” thay vì “product FE”.

### 4.4. Hướng khuyến nghị

**Chọn hybrid giữa A và B, tên nội bộ là `Adaptive Command Center`.**

Lý do:

- Hướng này giữ được chất `Signal Profile OS`.
- Nó cho phép thêm data narrative để chứng minh tư duy sản phẩm, thay vì chỉ làm visual showpiece.
- Nó đủ wow để nổi bật, nhưng vẫn grounded và build được bằng stack hiện tại.
- Nó không cần đổi core stack, không bắt project đi vào hố đen 3D quá sớm.

---

## 5. Vision của bản 2.0

### 5.1. Câu định vị mới

Signal Profile OS 2.0 không còn là một portfolio nhiều section. Nó phải là một command center cá nhân, nơi mỗi scene đều chứng minh một khía cạnh năng lực FE:

- Hero chứng minh visual dramaturgy và shell control.
- Identity chứng minh khả năng biến narrative cá nhân thành interface system.
- Stack chứng minh information design và interaction mapping.
- Projects chứng minh case-study storytelling ở level sản phẩm.
- Workflow chứng minh logic, statefulness và execution clarity.
- Contact chứng minh khả năng đóng deal bằng UI có chủ đích.

### 5.2. Người xem phải cảm thấy gì theo timeline 30 giây đầu

- 0-5 giây: đây không phải portfolio template.
- 5-12 giây: người làm cái này hiểu shell, motion, tone và visual hierarchy.
- 12-20 giây: người này không chỉ làm đẹp mà còn biết tổ chức dữ liệu và kể case study.
- 20-30 giây: đây là một FE làm sản phẩm, không phải chỉ dựng landing page.

---

## 6. Trải nghiệm mới theo từng lớp

## 6.1. Entry Experience: Boot Prelude có mục đích

Hiện tại page vào khá nhanh và trực tiếp. Bản 2.0 nên có một `Boot Prelude` ngắn, có thể skip, thời lượng khoảng 1200ms tới 2200ms.

Nó không phải loading screen kiểu rẻ tiền. Nó phải làm 3 việc:

- Khóa nhịp mở màn và dựng mood.
- Thiết lập theme/mode/scene đầu tiên.
- Giới thiệu rằng đây là một system đang active.

### Đề xuất implementation

- Dòng log ngắn: `checking modules`, `loading cases`, `syncing signal map`, `ready`.
- Hiện quick mode selector ngay từ đầu: `Story`, `Systems`, `Cases`.
- Cho phép skip tức thì bằng click, Enter hoặc Escape.
- Nếu reduced motion đang bật, skip toàn bộ cinematic layer và đi thẳng vào page state tĩnh.

### FE signal thể hiện

- State machine rõ ràng cho entry flow.
- Timing control tốt.
- Khả năng tạo opening sequence mà không hi sinh accessibility.

---

## 6.2. Shell Navigation: từ utility sang experience engine

Hiện tại `Header + ProgressRail + CommandPanel` đã mạnh về chức năng. Bản 2.0 cần nâng nó thành một hệ điều hướng có tính “system-level”.

### Nâng cấp chính

- Header không chỉ có nav links. Nó có `view mode`, `theme pack`, `density`, `motion level`.
- ProgressRail không chỉ là số chapter. Nó trở thành scene map có trạng thái đang active, locked, explored, highlighted.
- CommandPanel từ quick jump nâng thành `Command Center`.

### Command Center v2 nên có

- Search commands như hiện tại.
- Mode switch: `Story / Systems / Cases / Recruiter`.
- Theme pack switch: không chỉ accent, mà đổi cả panel temperature, glow strength, scanline density.
- Motion profile: `full / balanced / calm`.
- Copy actions: `copy email`, `copy profile summary`, `copy stack summary`, `copy project brief template`.
- Deep links: nhảy vào từng case study hoặc từng capability cluster.
- Optional power feature: `presentation mode` để site tự chạy narrative như demo reel.

### FE signal thể hiện

- Keyboard-first UX có chiều sâu.
- App state đồng bộ với shell.
- Command surface thật sự là control layer, không phải gimmick.

---

## 6.3. Hero: từ landing scene thành control surface

Hero hiện tại đã đẹp. Nhưng bản 2.0 phải làm hero trở thành scene điều phối toàn site, chứ không chỉ là một màn mở đầu có ảnh nền.

### Hero mới nên có các lớp sau

- Một `system status strip` nhỏ hiển thị các trạng thái như `frontend`, `dashboard`, `automation`, `remote`, `available`.
- Một `live metrics ribbon` thể hiện những trục năng lực thay vì chỉ copy text.
- Một `mode switch` nhỏ cho phép người xem chọn cách khám phá site.
- Background image vẫn giữ, nhưng overlay phải thông minh hơn: grid, diagnostics, scene-colored light bands, signal sweeps.

### Không nên làm

- Không biến hero thành chỗ nhồi 10 hiệu ứng cùng lúc.
- Không thay copy hiện tại bằng những câu flex vô nghĩa.

### FE signal thể hiện

- Visual hierarchy nhiều tầng nhưng vẫn rõ.
- Layout có chiều sâu và có dynamic state.
- Motion phục vụ meaning thay vì chỉ “bay lên”.

---

## 6.4. Identity Section: từ story panel thành Signal Map

Identity hiện tại đang là ảnh + story + 3 metric cards. Clean nhưng hiền.

### Bản 2.0 nên nâng thành `Signal Map`

- Giữ phần narrative cá nhân, nhưng đặt cạnh một `capability radar` hoặc `operating principles matrix`.
- Cho thấy mình làm việc theo trục nào: clarity, execution, runtime verification, system thinking, AI-assisted loops.
- Có thể thêm một timeline rất ngắn kiểu `2001 -> first builds -> internal tools -> AI workflows -> current focus`.

### Gợi ý UI

- Trái: portrait/art panel.
- Phải: stacked modules gồm `about`, `principles`, `capability pulse`, `current focus`.
- Hover vào từng principle sẽ highlight các stack/project liên quan ở section sau.

### FE signal thể hiện

- Biến identity thành interface chứ không phải chỉ là content block.
- Thể hiện khả năng gắn narrative với interaction model.

---

## 6.5. Stack Section: từ card list thành Capability Graph

Stack hiện tại đang mạnh về clarity nhưng chưa đủ mạnh về structure. Nó vẫn là một nhóm card độc lập.

### Bản 2.0 nên có `Capability Graph`

- Các capability không đứng riêng lẻ, mà liên kết với nhau.
- Ví dụ `Frontend` nối sang `Product UI`, `Backend flow`, `Automation` bằng các edge có intensity khác nhau.
- Hover vào một node sẽ highlight project và workflow steps liên quan.

### Có thể chọn 1 trong 2 cách trình bày

#### Cách 1: Capability Matrix

- Trục ngang là domain: `UI`, `Data`, `Systems`, `Delivery`.
- Trục dọc là skill depth: `Core`, `Strong`, `Applied`, `Active`.
- Các card trở thành cell có trạng thái.

#### Cách 2: Orbital Graph

- Một core node ở giữa, các capability orbit xung quanh.
- Hover vào từng node làm sáng các connection line.
- Mỗi node có mini description và project references.

### Khuyến nghị

Chọn `Capability Matrix` cho phase 1 vì dễ maintain, readable hơn trên mobile, và vẫn rất mạnh về FE signal nếu animation tốt.

### FE signal thể hiện

- Information design vượt khỏi kiểu “4 cards với icon”.
- Chứng minh được khả năng trực quan hóa cấu trúc năng lực.

---

## 6.6. Projects Section: phải trở thành Case Study Theater

Đây là nơi cần đầu tư nặng nhất sau hero. Hiện tại section này đã hơn nhiều portfolio khác nhờ pinned horizontal, progress, arrows và case rows. Nhưng nếu muốn nhìn phát thấy FE đỉnh, nó chưa đủ.

### Vấn đề hiện tại

- Project cards vẫn cùng một ngôn ngữ trình bày.
- Chưa có hierarchy đủ mạnh giữa project quan trọng và project phụ.
- Chưa có cảm giác “đang đi qua một case study system”.

### Bản 2.0 nên đổi sang `Case Study Theater`

- Layout desktop: sticky summary rail bên trái, stage media bên phải.
- Mỗi project có nhiều layer thông tin: overview, challenge, constraints, solution shape, UI decisions, outcome.
- Có `metric band` hoặc `project fingerprint` cho từng case.
- Có visual identity riêng cho từng project nhưng vẫn nằm trong chung system.

### Module nên có trong mỗi case

- `Context`.
- `Problem`.
- `Why this UI mattered`.
- `System constraints`.
- `Implementation focus`.
- `Outcome`.
- `Tech strip`.
- `Evidence` như screenshots, flow snippets, state cards.

### Interaction nên có

- Scroll hoặc arrow vẫn dùng được, nhưng phải có cảm giác dẫn scene mượt hơn.
- Hover/focus trên media panel sẽ mở detail overlay nhẹ.
- Trên mobile, thay pinned horizontal bằng `snap carousel` hoặc `vertical story cards` có drawer chi tiết.

### FE signal thể hiện

- Khả năng làm content-dense layout mà vẫn dễ đọc.
- Khả năng kết hợp sticky layout, media, data, transitions và responsive adaptation.
- Đây là section có thể làm recruiter đứng lại lâu nhất.

---

## 6.7. Workflow Section: từ 4 card thành Execution Pipeline

Workflow hiện tại đang rõ nhưng còn phẳng. Bản 2.0 nên khiến section này giống một pipeline đang chạy.

### Đề xuất nâng cấp

- Thay grid tĩnh bằng `pipeline diagram` có connection lines.
- Mỗi bước có status nhỏ: `input`, `decision`, `output`, `verify`.
- Khi scroll đến, line được draw theo thứ tự, node sáng dần, checkpoint hiện ra.
- Hover node nào thì hiện detail panel nhỏ mô tả tools, mindset và output của bước đó.

### FE signal thể hiện

- Thể hiện stateful interaction thay vì card reveal thuần.
- Cho thấy bạn hiểu flow-based UI và progress communication.

---

## 6.8. Contact Section: từ CTA block thành Intake Console

Contact hiện tại rất ổn về clarity. Nhưng để đóng site bằng một cú FE đẹp, bản 2.0 nên biến nó thành `Intake Console`.

### Nên có

- Availability status.
- Kiểu project nhận làm: website, dashboard, internal tool, AI workflow.
- Input templates: `gửi brief`, `đặt lịch`, `xem GitHub`, `copy spec request`.
- Một `response expectation` kiểu `reply within 24h` hoặc `scope-first response`.

### Gợi ý UI

- Bên trái vẫn là copy.
- Bên phải không chỉ là 2 terminal lines; nó là một console block với tabs hoặc stacked actions.
- Có thể thêm `brief generator` rất nhẹ: click một preset và tự fill mailto template.

### FE signal thể hiện

- Thể hiện sự sắc bén ở final conversion UX.
- Kết thúc site bằng một action surface đúng chất sản phẩm.

---

## 7. Thiết kế lại visual system

## 7.1. Typography

Phần heading hiện tại có cá tính. Phần body vẫn hơi an toàn vì dùng Inter/system stack.

### Khuyến nghị

- Giữ `Space Grotesk` cho display/headline.
- Giữ `JetBrains Mono` hoặc đổi sang `IBM Plex Mono` cho diagnostic/system labels.
- Thay body font Inter bằng `Manrope` hoặc `Plus Jakarta Sans` để mặt chữ có chủ đích hơn nhưng vẫn sạch.

### Mục tiêu typography mới

- Headline có cá tính.
- Body copy dễ đọc, không generic.
- System labels đủ kỹ thuật nhưng không quá hacker cosplay.

## 7.2. Color Strategy

Hiện tại theme cycle mới đang ở mức accent swap. Bản 2.0 nên tách ra thành 3 lớp màu:

- `core surfaces`: nền, panel, ink, muted.
- `scene accents`: identity, stack, projects, workflow, contact.
- `system states`: active, success, warning, muted, diagnostic.

### Gợi ý theme packs

- `Signal`: cyan / acid green / warm ivory.
- `Amber Ops`: amber / orange / bone white / black glass.
- `Violet Pulse`: violet / cool cyan / pink alert.
- Stretch: `Slate Neutral` cho recruiter mode bớt aggressive.

## 7.3. Surface Language

Phải đẩy sự khác nhau giữa các loại module rõ hơn. Hiện tại nhiều panel đang khá “cùng họ” nên site hơi phẳng khi scroll sâu.

### Nên có ít nhất 4 loại surface

- `Glass panel` cho shell.
- `Diagnostic panel` cho system info.
- `Case surface` cho project narratives.
- `Data surface` cho graph, metric, matrix.

## 7.4. Density System

Big update nên có khái niệm `density`. Vì một portfolio mạnh không chỉ ở màu và motion, mà còn ở khả năng điều tiết lượng thông tin.

- `Comfort`: thoáng, nhiều space, phù hợp đọc lần đầu.
- `Compact`: hiển thị dày hơn, hợp recruiter hoặc người dùng muốn skim nhanh.

Density này có thể điều khiển từ Command Center.

---

## 8. Motion system: semantic, không phải rải hiệu ứng

Hiện tại motion chủ yếu xoay quanh reveal, hover raise, parallax, horizontal scroll, cursor, gate. Bản 2.0 không cần nhiều effect hơn. Nó cần motion có vai trò rõ hơn.

### 8.1. Chia motion thành 4 họ

#### 1. Transport Motion

Motion dùng để di chuyển giữa scene, mode, section.

- Gate transition.
- View transitions.
- ProgressRail state shift.

#### 2. Data Motion

Motion dùng để giải thích dữ liệu hoặc relationship.

- Line drawing.
- Metric band filling.
- Matrix cell highlight.
- Case-study indicator progression.

#### 3. Focus Motion

Motion dùng để dẫn mắt tới element quan trọng.

- Inspector ring quanh node/case/media.
- Cursor transform theo ngữ cảnh.
- Hover states có chiều sâu hơn.

#### 4. Ambient Motion

Motion nền tạo atmosphere nhưng không chen vào usability.

- Signal canvas.
- Scanlines rất nhẹ.
- Gradient drift cực chậm.

### 8.2. Rule quan trọng

- Section nào không được lợi về comprehension thì không pin.
- Hover nào không tăng clarity thì bỏ.
- Animation nào không có fallback text/static state thì chưa đủ chuẩn.

### 8.3. Cursor 2.0

Cursor hiện tại đã đẹp. Bản 2.0 nên cho nó 4 mode:

- `idle`.
- `inspect`.
- `drag`.
- `active`.

Khi hover capability graph, project media hoặc command controls, cursor phải đổi nghĩa chứ không chỉ nở to.

### 8.4. Canvas 2.0

Canvas hiện tại đã có pointer repulsion và scroll velocity. Bản 2.0 nên thêm scene-awareness:

- Đổi color bias theo scene.
- Đổi intensity theo mode.
- Ở recruiter mode thì giảm nhiễu, giảm glow.

---

## 9. Mobile strategy: không chỉ fallback, mà là touch-native

Hiện tại mobile đã ổn ở mức không vỡ. Nhưng “không vỡ” chưa phải flagship.

### Mobile 2.0 nên có

- Bottom sheet version của Command Center.
- Project carousel dạng touch-snap, swipe ổn và dễ đọc bằng ngón tay.
- Progress rail thay bằng mini dock hoặc sticky section chips.
- Một số module desktop phức tạp phải có bản mobile riêng, không cố nhét nguyên desktop xuống.

### Quy tắc

- Mobile không được cảm giác như “desktop bị cắt bớt”.
- Mobile phải là một bản experience ngắn gọn, touch-first, vẫn đẹp và vẫn có bản sắc.

---

## 10. Content model phải nâng cấp cùng UI

`profileData.js` hiện tại đang phù hợp cho một site content-driven đơn giản. Với big update FE toàn diện, data model cũng phải lên level.

### Nên tách data thành các khối riêng

- `profile`.
- `capabilities`.
- `projects`.
- `workflow`.
- `sceneConfig`.
- `commandActions`.
- `themePacks`.

### Project data nên có thêm

- `slug`.
- `category`.
- `importance`.
- `constraints`.
- `uiFocus`.
- `systemRole`.
- `signals`.
- `metrics`.
- `assets`.
- `links`.

### Capability data nên có thêm

- `cluster`.
- `depth`.
- `relatedProjects`.
- `relatedWorkflowSteps`.
- `status`.

### Lợi ích

- UI trở nên data-driven thật sự.
- Command Center có cái để điều khiển.
- Các graph/matrix/case-study modules không phải hard-code linh tinh.

---

## 11. Code architecture cho bản big update

Điểm mạnh lớn là project hiện tại không cần đổi stack nền. Nền tảng đang đủ tốt để build tiếp.

### 11.1. Nên giữ

- React + Vite.
- GSAP cho motion orchestration.
- CSS thuần với variables, không cần chuyển Tailwind.
- Pattern component/hook hiện tại.

### 11.2. Nên bổ sung

- Một thư mục `content/` để tách data model khỏi UI.
- Một thư mục `features/` cho các module lớn như `command-center`, `capability-graph`, `case-theater`, `signal-map`.
- Một lớp style rõ hơn cho tokens/themes/scenes/modules.

### 11.3. Cấu trúc đề xuất

```text
src/
  content/
    profile.js
    capabilities.js
    projects.js
    workflow.js
    scenes.js
    commands.js
  features/
    command-center/
    hero-control-surface/
    capability-matrix/
    case-theater/
    workflow-pipeline/
  components/
    layout/
    ui/
    shared/
  hooks/
  styles/
    tokens.css
    themes.css
    layout.css
    scenes.css
    modules.css
    motion.css
    responsive.css
```

### 11.4. Các bề mặt code sẽ bị tác động mạnh nhất

- `App.jsx`: thêm app mode, scene orchestration, shell state.
- `CommandPanel.jsx`: nâng thành Command Center.
- `profileData.js`: tách content model.
- `ProjectsSection.jsx`: thay bằng case theater architecture.
- `StackSection.jsx`: thay bằng capability matrix/graph.
- `styles/*`: tách design tokens và surface families rõ hơn.

### 11.5. Không nên làm ở phase đầu

- Không cần kéo thêm cả một UI framework.
- Không cần full WebGL nếu chưa có lý do rõ ràng.
- Không cần chạy theo router phức tạp nếu scene/state trong một page đã đủ.

---

## 12. Accessibility và performance là chuẩn bắt buộc

Big update càng wow thì càng dễ phạm lỗi. Nên phải chốt nguyên tắc trước.

### Accessibility non-negotiables

- Tất cả graph/matrix phải có text equivalent hoặc summary.
- Keyboard path đầy đủ cho Command Center, project navigation, theme/mode switching.
- Reduced motion là first-class mode, không phải checkbox làm cho có.
- Contrast ratio không hi sinh chỉ vì glow và gradient.
- Không được để thông tin quan trọng chỉ hiện khi hover.

### Performance non-negotiables

- Hero image phải tối ưu đúng bài để không phá LCP.
- Ambient effects phải pause hoặc reduce hợp lý.
- Module nặng có thể lazy mount theo scene.
- Mobile không được nhận cùng khối motion như desktop rồi chỉ chờ CSS tắt hộ.

### Một nguyên tắc rất đáng giữ

Project hiện tại đã có tinh thần progressive enhancement khá ổn. Bản 2.0 phải nâng tinh thần đó lên, không được phá nó.

---

## 13. Roadmap triển khai đề xuất

## Phase 0: Audit + Token Foundation

**Mục tiêu**

- Chốt visual thesis.
- Tách token layer.
- Chốt app modes và scene map.

**Deliverables**

- Design tokens mới.
- Theme packs.
- Scene config.
- Content schema draft.

## Phase 1: Shell V2

**Mục tiêu**

- Boot Prelude.
- Header/rail mới.
- Command Center v2.

**Deliverables**

- Entry flow skippable.
- Mode switch.
- Density + motion controls.
- Scene-aware shell states.

## Phase 2: Hero + Identity + Stack Flagship Modules

**Mục tiêu**

- Hero thành control surface.
- Identity thành Signal Map.
- Stack thành Capability Matrix.

**Deliverables**

- Live metrics ribbon.
- Principles/capability modules.
- Highlight relationships giữa capability và project.

## Phase 3: Project Theater + Workflow Pipeline

**Mục tiêu**

- Biến Projects thành section áp đảo nhất site về chiều sâu.
- Workflow có flow logic thật.

**Deliverables**

- Sticky case-study theater.
- Metric bands.
- Project fingerprints.
- Pipeline lines và detail panels.

## Phase 4: Contact Console + Polish + Perf

**Mục tiêu**

- Chốt conversion UX.
- Tối ưu runtime, a11y, mobile.

**Deliverables**

- Intake console.
- Mobile-specific interaction patterns.
- Perf pass.
- a11y pass.

### 13.1. Nguyên tắc triển khai để không biến big update thành đống refactor vỡ mặt

- Mỗi phase phải kết thúc bằng một bản chạy được, không làm kiểu gom 20 thay đổi lớn rồi mới test.
- Tách `content model`, `shell state`, `visual system` và `section rewrite` thành các nhịp riêng để rollback dễ.
- Mỗi module mới đều phải có 3 trạng thái trước khi coi là xong: desktop, mobile, reduced motion.
- `npm run build` phải pass ở cuối từng phase.
- Chỉ thay đổi public surface khi đã có lý do rõ ràng. Nếu chưa cần, giữ path/component cũ và thay implementation bên trong.

### 13.2. Bản đồ thay đổi theo file hiện tại

| Khu vực           | File hiện tại                                 | Hành động                  | Ghi chú backlog                                                                       |
| ----------------- | --------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------- |
| App shell         | `src/App.jsx`                                 | Mở rộng mạnh               | Thêm app mode, density, motion profile, boot state, command-center orchestration      |
| Entry             | Chưa có                                       | Tạo mới                    | Thêm `src/components/layout/BootPrelude.jsx`                                          |
| Header            | `src/components/layout/Header.jsx`            | Nâng cấp                   | Thêm view controls, shell utilities, recruiter/story/system mode toggle               |
| Progress rail     | `src/components/layout/ProgressRail.jsx`      | Nâng cấp                   | Chuyển từ chapter rail sang scene map                                                 |
| Command surface   | `src/components/layout/CommandPanel.jsx`      | Nâng cấp lớn hoặc tách mới | Có thể giữ tên cũ để tránh refactor rộng, nhưng behavior phải thành Command Center v2 |
| Hero              | `src/components/sections/HeroSection.jsx`     | Viết lại từng phần         | Thêm status strip, metrics ribbon, mode switch, richer overlays                       |
| Identity          | `src/components/sections/IdentitySection.jsx` | Viết lại cấu trúc          | Chuyển thành Signal Map                                                               |
| Stack             | `src/components/sections/StackSection.jsx`    | Viết lại module            | Chuyển thành Capability Matrix                                                        |
| Projects          | `src/components/sections/ProjectsSection.jsx` | Viết lại mạnh nhất         | Chuyển thành Case Study Theater                                                       |
| Workflow          | `src/components/sections/WorkflowSection.jsx` | Nâng cấp kiến trúc         | Chuyển thành Execution Pipeline                                                       |
| Contact           | `src/components/sections/ContactSection.jsx`  | Nâng cấp                   | Chuyển thành Intake Console                                                           |
| Cursor            | `src/components/ui/CustomCursor.jsx`          | Nâng cấp state model       | Hỗ trợ cursor modes: idle, inspect, drag, active                                      |
| Canvas            | `src/components/canvas/SignalCanvas.jsx`      | Nâng cấp                   | Scene-aware color bias, intensity, recruiter mode fallback                            |
| Theme             | `src/hooks/useAccentTheme.js`                 | Tái cấu trúc               | Từ accent cycle sang theme pack system                                                |
| Motion pref       | `src/hooks/useMotionPreference.js`            | Mở rộng                    | Thêm motion profile: full, balanced, calm                                             |
| Shell control     | Chưa có                                       | Tạo mới                    | Nên thêm `src/hooks/useAppShellState.js` hoặc `useShellPreferences.js`                |
| Content           | `src/profileData.js`                          | Tách nhỏ                   | Đưa sang `src/content/*`                                                              |
| Sections config   | `src/lib/sections.js`                         | Mở rộng                    | Thêm scene metadata, mode availability, labels                                        |
| Motion presets    | `src/motionPresets.js`                        | Mở rộng hoặc tách nhỏ      | Tách transport/data/focus/ambient presets                                             |
| CSS tokens        | `src/styles/base.css`                         | Tách bớt                   | Move token/theme parts ra file riêng                                                  |
| Layout styles     | `src/styles/layout.css`                       | Mở rộng                    | Shell V2, scene map, top controls                                                     |
| Section styles    | `src/styles/sections.css`                     | Viết lại một phần          | Hero, Signal Map, Capability Matrix, Case Theater, Pipeline                           |
| Overlay styles    | `src/styles/overlays.css`                     | Mở rộng                    | Boot Prelude, Command Center V2, inspector overlays                                   |
| Responsive styles | `src/styles/responsive.css`                   | Mở rộng                    | Bottom sheet, mobile dock, touch-snap modules                                         |

### 13.3. File mới nên tạo trước khi đụng vào UI lớn

```text
src/
  content/
    profile.js
    capabilities.js
    projects.js
    workflow.js
    sceneConfig.js
    commandActions.js
  components/
    layout/
      BootPrelude.jsx
    shared/
      MetricBand.jsx
      SectionModeTabs.jsx
      SceneBadge.jsx
  features/
    capability-matrix/
      CapabilityMatrix.jsx
      CapabilityLegend.jsx
    case-theater/
      CaseStudyRail.jsx
      CaseStudyStage.jsx
      ProjectFingerprint.jsx
    workflow-pipeline/
      WorkflowPipeline.jsx
      WorkflowDetailPanel.jsx
    signal-map/
      SignalMap.jsx
      PrinciplesPanel.jsx
  hooks/
    useAppShellState.js
    useBootPrelude.js
    useCommandCenterActions.js
    useCapabilityHighlight.js
    useProjectStage.js
    useSceneTheme.js
  styles/
    tokens.css
    themes.css
    scenes.css
    modules.css
    motion.css
```

### 13.4. Backlog cực cụ thể theo phase build

## Phase 0: Foundation và data model

Mục tiêu của phase này là dựng nền để các phase sau không phải sửa ngược lung tung.

| ID    | Việc cần làm                                | Chạm vào file hiện tại                                                           | Tạo mới                                                                                                       | Definition of done                                                                    | Validate         |
| ----- | ------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------- |
| P0-01 | Tách `profileData.js` thành content modules | `src/profileData.js`, `src/App.jsx`, các section imports                         | `src/content/profile.js`, `src/content/capabilities.js`, `src/content/projects.js`, `src/content/workflow.js` | UI vẫn render đúng dữ liệu cũ, nhưng source data đã chia domain rõ ràng               | `npm run build`  |
| P0-02 | Tạo shell preferences model                 | `src/App.jsx`, `src/hooks/useAccentTheme.js`, `src/hooks/useMotionPreference.js` | `src/hooks/useAppShellState.js`                                                                               | Có state tập trung cho `mode`, `themePack`, `density`, `motionProfile`, `commandOpen` | `npm run build`  |
| P0-03 | Tách token và theme khỏi `base.css`         | `src/main.jsx`, `src/styles/base.css`                                            | `src/styles/tokens.css`, `src/styles/themes.css`                                                              | `base.css` chỉ giữ reset/global/base surface; token/theme có file riêng               | `npm run build`  |
| P0-04 | Chuẩn hóa scene config                      | `src/lib/sections.js`, `src/motionPresets.js`                                    | `src/content/sceneConfig.js`                                                                                  | Mỗi scene có label, accent, rail state, mode visibility, transition color             | `npm run build`  |
| P0-05 | Chốt naming cho component/features mới      | Không bắt buộc sửa code runtime                                                  | Có thể thêm placeholder feature folders                                                                       | Team nhìn vào folder là hiểu nơi nào chứa shell, nơi nào chứa module lớn              | Review file tree |

### Ghi chú phase 0

- Không đổi UI lớn ở phase này.
- Nếu phase 0 làm đúng, phase 1 trở đi chỉ là thay module, không phải sửa kiến trúc liên tục.

## Phase 1: Shell V2 và entry flow

Đây là phase làm người xem cảm nhận project đã lên level chỉ trong 10 giây đầu.

| ID    | Việc cần làm                                                 | Chạm vào file hiện tại                                                                              | Tạo mới                                                                | Definition of done                                                                      | Validate                               |
| ----- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------- |
| P1-01 | Thêm `BootPrelude` có skip và mode entry                     | `src/App.jsx`, `src/components/layout/TransitionGate.jsx`, `src/styles/overlays.css`                | `src/components/layout/BootPrelude.jsx`, `src/hooks/useBootPrelude.js` | Vào trang có prelude ngắn, skip được bằng click/Enter/Escape, reduced motion skip thẳng | `npm run build` + test keyboard        |
| P1-02 | Nâng `Header` thành shell bar có mode/theme/density controls | `src/components/layout/Header.jsx`, `src/styles/layout.css`                                         | Có thể thêm `src/components/shared/SectionModeTabs.jsx`                | Header vừa giữ nav vừa có quick controls rõ ràng                                        | `npm run build` + desktop/mobile check |
| P1-03 | Nâng `ProgressRail` thành scene map                          | `src/components/layout/ProgressRail.jsx`, `src/styles/layout.css`, `src/styles/responsive.css`      | Có thể thêm `SceneBadge.jsx`                                           | Rail thể hiện active, explored, available scenes; mobile có fallback khác               | `npm run build` + manual nav check     |
| P1-04 | Nâng `CommandPanel` thành Command Center v2                  | `src/components/layout/CommandPanel.jsx`, `src/hooks/useCommandPanel.js`, `src/styles/overlays.css` | `src/hooks/useCommandCenterActions.js`                                 | Có action groups cho mode/theme/density/motion/copy/deep links, vẫn giữ focus trap      | `npm run build` + keyboard path check  |
| P1-05 | Đồng bộ shell state vào `App.jsx`                            | `src/App.jsx`                                                                                       | Không bắt buộc                                                         | `App.jsx` trở thành nơi điều phối app mode thay vì chỉ render shell cũ                  | `npm run build`                        |

### Acceptance của phase 1

- Mở page lần đầu thấy rõ một hệ thống đang khởi động.
- Có thể chuyển mode và theme mà không reload page.
- Command Center đủ mạnh để nhìn ra đây là control layer thật.
- Mobile có bottom sheet hoặc fallback shell hợp lý, không chỉ ẩn bớt control.

## Phase 2: Hero, Identity, Stack thành cụm flagship đầu site

Phase này phải giải quyết triệt để vấn đề “hero mạnh nhưng các section sau tụt mood”.

| ID    | Việc cần làm                                        | Chạm vào file hiện tại                                                                             | Tạo mới                                                                                                              | Definition of done                                                                       | Validate                                    |
| ----- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------- |
| P2-01 | Rewrite `HeroSection` thành control surface         | `src/components/sections/HeroSection.jsx`, `src/styles/sections.css`                               | `src/components/shared/MetricBand.jsx`                                                                               | Hero có status strip, metrics ribbon, mode actions, overlay layers rõ ràng               | `npm run build` + screenshot desktop/mobile |
| P2-02 | Rewrite `IdentitySection` thành Signal Map          | `src/components/sections/IdentitySection.jsx`, `src/styles/sections.css`                           | `src/features/signal-map/SignalMap.jsx`, `PrinciplesPanel.jsx`                                                       | Identity không còn là story panel đơn thuần; có principles/capability pulse              | `npm run build`                             |
| P2-03 | Rewrite `StackSection` thành Capability Matrix      | `src/components/sections/StackSection.jsx`, `src/styles/sections.css`, `src/styles/responsive.css` | `src/features/capability-matrix/CapabilityMatrix.jsx`, `CapabilityLegend.jsx`, `src/hooks/useCapabilityHighlight.js` | Hover hoặc focus capability phải highlight project/workflow relation                     | `npm run build` + keyboard traversal        |
| P2-04 | Gắn scene-aware theme behavior cho cụm đầu          | `src/App.jsx`, `src/components/canvas/SignalCanvas.jsx`, `src/components/ui/CustomCursor.jsx`      | `src/hooks/useSceneTheme.js`                                                                                         | Hero, Identity, Stack đổi tone accent tinh tế theo scene và mode                         | `npm run build` + runtime visual check      |
| P2-05 | Tạo mobile-specific version cho Signal Map / Matrix | `src/styles/responsive.css`                                                                        | Không bắt buộc                                                                                                       | Mobile không còn là desktop squeeze; layout chuyển thành stack/tabs/card clusters hợp lý | `npm run build` + mobile screenshot         |

### Acceptance của phase 2

- Scroll qua 3 section đầu không bị hụt mood.
- Có ít nhất 1 module thể hiện rõ năng lực information design, không chỉ card hover.
- Hover/focus state bắt đầu mang ngữ nghĩa, không chỉ làm đẹp.

## Phase 3: Projects và Workflow thành showcase lõi

Đây là phase quan trọng nhất nếu mục tiêu là khiến người xem dừng lại lâu và đánh giá FE ở level sản phẩm.

| ID    | Việc cần làm                                       | Chạm vào file hiện tại                                                                                     | Tạo mới                                                                                                                       | Definition of done                                                                      | Validate                                     |
| ----- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------- |
| P3-01 | Thiết kế lại data model cho projects               | `src/content/projects.js` hoặc phần thay thế `profileData.js`                                              | Không bắt buộc                                                                                                                | Mỗi project có `constraints`, `uiFocus`, `signals`, `metrics`, `evidence`               | `npm run build`                              |
| P3-02 | Rewrite `ProjectsSection` thành Case Study Theater | `src/components/sections/ProjectsSection.jsx`, `src/styles/sections.css`, `src/styles/responsive.css`      | `src/features/case-theater/CaseStudyRail.jsx`, `CaseStudyStage.jsx`, `ProjectFingerprint.jsx`, `src/hooks/useProjectStage.js` | Desktop có sticky rail + stage; mobile có touch-native story cards hoặc snap carousel   | `npm run build` + desktop/mobile walkthrough |
| P3-03 | Quyết định số phận `useHorizontalScroll.js`        | `src/hooks/useHorizontalScroll.js`, `src/hooks/useGsapMotion.js`                                           | Không bắt buộc                                                                                                                | Hoặc retire hẳn, hoặc thu hẹp vai trò cho theater navigation thay vì pin toàn section   | `npm run build`                              |
| P3-04 | Thêm project evidence surfaces                     | `src/styles/modules.css`, `src/styles/sections.css`                                                        | Có thể thêm shared media/evidence components                                                                                  | Mỗi case có ít nhất 1 evidence panel: screenshot, system strip, state cards, flow notes | `npm run build`                              |
| P3-05 | Rewrite `WorkflowSection` thành Execution Pipeline | `src/components/sections/WorkflowSection.jsx`, `src/hooks/useWorkflowMotion.js`, `src/styles/sections.css` | `src/features/workflow-pipeline/WorkflowPipeline.jsx`, `WorkflowDetailPanel.jsx`                                              | Line drawing, checkpoint states, detail panel theo node                                 | `npm run build` + reduced-motion check       |

### Acceptance của phase 3

- Projects trở thành section mạnh nhất site sau hero.
- Workflow nhìn vào là thấy logic vận hành, không còn là 4 card xếp hàng.
- Case study có chiều sâu đủ để người tuyển dụng hoặc khách hàng đọc chứ không lướt qua.

## Phase 4: Contact, mobile command layer, polish, perf, a11y

Phase này là nơi chốt conversion và dọn sạch các góc cạnh runtime.

| ID    | Việc cần làm                                  | Chạm vào file hiện tại                                                                                    | Tạo mới                          | Definition of done                                                                  | Validate                              |
| ----- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------- |
| P4-01 | Rewrite `ContactSection` thành Intake Console | `src/components/sections/ContactSection.jsx`, `src/styles/sections.css`                                   | Có thể thêm action subcomponents | Có availability, project type presets, copy actions, clearer CTA paths              | `npm run build`                       |
| P4-02 | Mobile command layer riêng                    | `src/components/layout/CommandPanel.jsx`, `src/styles/overlays.css`, `src/styles/responsive.css`          | Không bắt buộc                   | Trên mobile, command layer thành bottom sheet hoặc stacked console phù hợp touch    | `npm run build` + mobile manual test  |
| P4-03 | Cursor 2.0 và Canvas 2.0                      | `src/components/ui/CustomCursor.jsx`, `src/components/canvas/SignalCanvas.jsx`, `src/styles/overlays.css` | Không bắt buộc                   | Cursor có mode semantics; canvas phản ứng theo scene/mode nhưng không nặng          | `npm run build` + perf spot check     |
| P4-04 | A11y pass                                     | `src/hooks/useCommandPanel.js`, các section mới, styles                                                   | Không bắt buộc                   | Keyboard flow hoàn chỉnh, hover-only info được thay bằng accessible trigger/content | `npm run build` + keyboard smoke test |
| P4-05 | Performance pass                              | `src/App.jsx`, assets, motion hooks, styles                                                               | Không bắt buộc                   | LCP không bị phá, mobile runtime mượt, ambient motion không ngốn CPU vô lý          | `npm run build` + runtime spot check  |

### Acceptance của phase 4

- Contact convert tốt hơn bản hiện tại.
- Mobile có trải nghiệm riêng tử tế.
- Không có cảm giác “wow nhưng nặng” hoặc “đẹp nhưng khó dùng”.

### 13.5. Backlog theo component, hook, style file để giao việc dễ hơn

## Components

| File                                          | Mức ưu tiên | Việc phải làm                                                 |
| --------------------------------------------- | ----------- | ------------------------------------------------------------- |
| `src/App.jsx`                                 | P0-P1       | Gom shell state, boot state, mode/theme/density orchestration |
| `src/components/layout/Header.jsx`            | P1          | Thêm shell controls và mode actions                           |
| `src/components/layout/ProgressRail.jsx`      | P1          | Đổi từ chapter rail sang scene map                            |
| `src/components/layout/CommandPanel.jsx`      | P1          | Nâng thành Command Center v2                                  |
| `src/components/layout/TransitionGate.jsx`    | P1          | Đồng bộ với scene transitions và entry flow                   |
| `src/components/sections/HeroSection.jsx`     | P2          | Rewrite thành hero control surface                            |
| `src/components/sections/IdentitySection.jsx` | P2          | Rewrite thành Signal Map shell                                |
| `src/components/sections/StackSection.jsx`    | P2          | Rewrite để mount Capability Matrix                            |
| `src/components/sections/ProjectsSection.jsx` | P3          | Rewrite lớn nhất, thành Case Study Theater                    |
| `src/components/sections/WorkflowSection.jsx` | P3          | Rewrite thành pipeline                                        |
| `src/components/sections/ContactSection.jsx`  | P4          | Rewrite thành Intake Console                                  |
| `src/components/ui/CustomCursor.jsx`          | P2-P4       | Thêm cursor modes và context reactions                        |
| `src/components/canvas/SignalCanvas.jsx`      | P2-P4       | Scene-aware motion, mode-aware intensity                      |

## Hooks

| File                                  | Mức ưu tiên | Việc phải làm                                                     |
| ------------------------------------- | ----------- | ----------------------------------------------------------------- |
| `src/hooks/useAccentTheme.js`         | P0          | Refactor thành theme pack manager hoặc wrapper cho theme packs    |
| `src/hooks/useMotionPreference.js`    | P0-P1       | Hỗ trợ `full / balanced / calm` bên cạnh reduced motion           |
| `src/hooks/useCommandPanel.js`        | P1          | Giữ focus trap, mở rộng cho grouped actions và mobile sheet       |
| `src/hooks/useGsapMotion.js`          | P2-P3       | Điều phối module mới, tránh nhồi logic trở lại một chỗ            |
| `src/hooks/useHorizontalScroll.js`    | P3          | Giảm vai trò hoặc bỏ nếu theater không cần pin scroll cũ          |
| `src/hooks/useWorkflowMotion.js`      | P3          | Chuyển sang pipeline line animation                               |
| `src/hooks/useActiveSection.js`       | P1-P3       | Đồng bộ với scene map và section modes                            |
| `src/hooks/useAppShellState.js`       | P0          | Tạo mới để giữ mode/theme/density/motion state tập trung          |
| `src/hooks/useBootPrelude.js`         | P1          | Tạo mới cho intro lifecycle                                       |
| `src/hooks/useCapabilityHighlight.js` | P2          | Tạo mới cho highlight relation giữa capability, project, workflow |
| `src/hooks/useProjectStage.js`        | P3          | Tạo mới cho case study theater state                              |
| `src/hooks/useSceneTheme.js`          | P2          | Tạo mới cho scene-aware canvas/cursor/theme sync                  |

## Styles

| File                        | Mức ưu tiên | Việc phải làm                                                              |
| --------------------------- | ----------- | -------------------------------------------------------------------------- |
| `src/styles/base.css`       | P0          | Giữ reset/global, bỏ token/theme nặng sang file riêng                      |
| `src/styles/layout.css`     | P1          | Shell bar, scene map, top controls, dock states                            |
| `src/styles/sections.css`   | P2-P4       | Hero/Signal Map/Capability Matrix/Case Theater/Pipeline/Intake Console     |
| `src/styles/overlays.css`   | P1-P4       | Boot Prelude, Command Center V2, inspector overlays, toast/system overlays |
| `src/styles/responsive.css` | P1-P4       | Bottom sheet, touch snap, mobile section variants                          |
| `src/styles/tokens.css`     | P0          | Tạo mới cho spacing, radii, typography, shadows, z-index                   |
| `src/styles/themes.css`     | P0-P1       | Tạo mới cho theme packs và state colors                                    |
| `src/styles/scenes.css`     | P1-P2       | Tạo mới cho scene-specific accents/background logic                        |
| `src/styles/modules.css`    | P2-P4       | Tạo mới cho matrix, metric band, theater, evidence, pipeline modules       |
| `src/styles/motion.css`     | P1-P4       | Tạo mới cho semantic motion classes và reduced-motion overrides            |

### 13.6. Thứ tự commit hợp lý nếu muốn triển khai an toàn

1. Commit content split và token/theme foundation.
2. Commit shell state và command center state model.
3. Commit BootPrelude + Header + ProgressRail + Command Center UI.
4. Commit Hero rewrite.
5. Commit Identity + Stack rewrite.
6. Commit Projects theater foundation.
7. Commit Workflow pipeline.
8. Commit Contact console.
9. Commit cursor/canvas scene-awareness.
10. Commit mobile polish + perf + a11y pass.

### 13.7. Định nghĩa xong việc cho từng phase

Một phase chỉ được coi là hoàn tất khi đủ 4 điều:

- Build pass bằng `npm run build`.
- Desktop runtime không vỡ layout ở viewport lớn.
- Mobile runtime không bị cảm giác desktop co lại.
- Keyboard path và reduced-motion fallback vẫn hoạt động.

---

## 14. Top 8 hạng mục bắt buộc phải có nếu muốn “wow thật”

Nếu phải chọn ra những thứ tạo chênh lệch rõ ràng nhất, đây là shortlist:

1. Boot Prelude ngắn, có skip, có mode entry.
2. Command Center v2 điều khiển mode, theme, density, motion.
3. Hero control surface với live metrics ribbon.
4. Capability Matrix hoặc Signal Map cho phần stack/identity.
5. Case Study Theater cho projects.
6. Workflow Pipeline có line/state/checkpoint.
7. Scene-aware canvas/cursor/theme behavior.
8. Mobile touch-native command sheet và project browsing.

---

## 15. Những thứ không nên làm

- Không biến site thành một bản sao của 100 portfolio “dark glass + hover effects”.
- Không nhồi effect ở mọi section chỉ để nhìn bận rộn.
- Không biến tất cả thành terminal cosplay nếu mục tiêu là chứng minh FE sản phẩm.
- Không làm full 3D chỉ vì muốn trông mạnh, trong khi content clarity tụt.
- Không hy sinh readability và accessibility để lấy vài shot screenshot đẹp.

---

## 16. Success bar của bản big update

Big update này chỉ được coi là thành công nếu đạt đủ 6 điều sau:

- Nhìn 5 giây đầu đã thấy đây là một portfolio có concept riêng.
- Scroll qua 3 section đầu vẫn thấy narrative đang tăng chứ không xẹp.
- Projects khiến người xem dừng lại đọc chứ không lướt cho xong.
- Command surface, motion và scene behavior chứng minh FE maturity thật.
- Mobile vẫn có bản sắc riêng thay vì bản desktop rút gọn.
- Codebase sau khi nâng cấp vẫn maintainable, không trở thành một đống showpiece khó sửa.

---

## 17. Kết luận cuối

Hiện tại project đã có nền móng rất tốt. Cái nó thiếu không phải là thêm kỹ thuật cho đủ món. Cái nó thiếu là một tầng chỉ đạo cao hơn, nơi visual system, content model, motion language, navigation shell và case-study storytelling cùng nói chung một tiếng nói.

Tiếng nói đó, theo hướng hợp nhất giữa concept hiện tại và mục tiêu showcase FE mạnh nhất, nên là:

**Signal Profile OS 2.0 = Adaptive Command Center.**

Đây là hướng vừa đủ ngầu để gây ấn tượng mạnh, vừa đủ thật để chứng minh năng lực xây FE product-grade, vừa đủ bền để phát triển tiếp chứ không chết sau vài screenshot đẹp.
