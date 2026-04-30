# Nghiên Cứu Home Scroll Storytelling

## 1. Ý tưởng người dùng muốn

Trang Home không chỉ là hero tĩnh. Trang Home nên giống các website cao cấp dùng scroll dọc để kể chuyện:

```txt
Người xem scroll xuống
-> background chuyển cảnh
-> text đổi theo từng beat
-> visual morph / fade / wipe / zoom
-> cảm giác như đang đi qua một đoạn phim ngắn
```

Mục tiêu là tạo cảm giác "đỉnh" ngay ở trang đầu, nhưng vẫn không quay lại lỗi one-page cũ.

## 2. Tên hướng thiết kế

Hướng này nên gọi là:

```txt
Cinematic Scroll Story Home
```

Hoặc theo ngôn ngữ site:

```txt
Signal Story Sequence
```

Để tránh drift giữa file chiến lược, phase plan và lúc code, nên chốt một cách gọi duy nhất trong toàn bộ spec:

```txt
Cinematic Scroll Story Home
```

`Signal Story Sequence` chỉ nên giữ như internal flavor label hoặc tên nhóm motion, không dùng thay cho tên pattern chính.

Nó khác với Home tối giản ở chỗ:

- Home tối giản: vào là hiểu nhanh, ít cảnh, ít chuyển động.
- Home scroll story: vào là bị cuốn vào một chuỗi cảnh ngắn, scroll để mở từng lớp câu chuyện.

Nhưng nó cũng khác one-page cũ ở chỗ:

- Không nhét toàn bộ project/stack/workflow/contact vào Home.
- Không có quá nhiều panel/mode/HUD cạnh tranh nhau.
- Chỉ kể một câu chuyện mở đầu, sau đó đẩy người xem sang Work/Stack/Contact.

## 2.1 Vai trò chính của Home trong multi-page system

Home trong hướng này phải làm đúng 3 việc:

- Tạo ấn tượng đầu tiên đủ mạnh để người xem nhớ bạn.
- Giải thích rất nhanh bạn làm gì và bạn mạnh ở đâu.
- Đẩy người xem sang route đúng: Work để xem bằng chứng, Contact để bắt đầu liên hệ, Lab chỉ là nhánh phụ.

Home không phải nơi thay Work, Stack hay Workflow. Nếu một ý nào cần nhiều hơn một scene ngắn để giải thích, ý đó nên đi sang route riêng.

## 3. Pattern từ các website scrollytelling cao cấp

Các website scrollytelling thường dùng những pattern chính sau.

### 3.1 Pinned scene

Một vùng Home được pin/sticky trong nhiều đoạn scroll. Người xem scroll nhưng khung cảnh chính vẫn giữ trong viewport.

Trong lúc đó:

- Background đổi màu, đổi ảnh, đổi gradient hoặc đổi scene.
- Text cũ fade out, text mới fade in.
- Visual chính morph, scale, rotate hoặc đổi layer.
- Progress đi qua từng chapter.

Pattern này hợp nhất với Home của portfolio vì tạo cảm giác cinematic mà không cần nhiều section dài.

### 3.2 Sticky text + moving background

Text hoặc headline giữ ở một vùng cố định, còn background phía sau chuyển động.

Ví dụ cảm giác:

```txt
Text đứng yên như lời kể
Background phía sau đổi từ noise -> grid -> interface -> project signal
```

Pattern này giúp text vẫn đọc được trong khi visual có thể rất mạnh.

### 3.3 Background crossfade / color scene transition

Mỗi đoạn scroll tương ứng một scene có màu nền riêng:

```txt
Scene 01: black/cyan - identity signal
Scene 02: deep blue - interface thinking
Scene 03: amber - product/dashboard system
Scene 04: green - AI workflow/delivery
Scene 05: clean dark - CTA
```

Khi scroll, các background layer crossfade hoặc wipe qua nhau. Đây là thứ tạo cảm giác "chuyển cảnh đỉnh" mà người dùng nhắc tới.

### 3.4 Mask / wipe reveal

Thay vì fade đơn giản, scene có thể chuyển bằng mask:

- Diagonal wipe.
- Grid wipe.
- Scanline wipe.
- Circular reveal.
- Split-screen reveal.

Với concept Signal Profile, nên dùng:

```txt
Signal scan wipe
Grid aperture reveal
Terminal cursor wipe
```

Không nên dùng quá nhiều kiểu wipe khác nhau, chỉ cần 1 signature transition thật đẹp.

### 3.5 Scroll-scrubbed timeline

Animation không tự chạy theo thời gian, mà bám vào vị trí scroll.

Người xem scroll nhanh thì cảnh chuyển nhanh. Scroll chậm thì cảnh chuyển chậm. Điều này tạo cảm giác có quyền điều khiển câu chuyện.

Với GSAP ScrollTrigger, pattern này thường là:

```txt
Một timeline lớn
ScrollTrigger pin Home
scrub: true
snap theo từng scene nếu cần
```

### 3.6 Chapter progress

Website cao cấp thường có một chỉ báo nhỏ cho người xem biết đang ở cảnh nào:

```txt
01 Identity
02 Interface
03 Systems
04 Workflow
05 Enter
```

Không nên làm progress rail phức tạp như site cũ. Chỉ cần một indicator rất gọn.

## 4. Home story arc đã chốt cho Vũ Đình Dũng

Home có đúng 5 cảnh. Mỗi cảnh có một ý chính và tuân theo quy tắc: 1 headline + 1 supporting copy ngắn + 1 visual motif + 1 transition state.

Copy trong phần này đã được khóa và sẵn sàng để code. Không cần "gợi ý" thêm — nếu cần điều chỉnh, sửa trực tiếp các giá trị ở đây.

---

### Scene 01 — Signal Appears

**Ý chính:** Tên xuất hiện như một tín hiệu trong noise. Ấn tượng đầu tiên phải đủ mạnh để nhớ.

**Copy đã chốt:**

```
headline:  Vũ Đình Dũng
body:      I build interfaces that turn messy signals into usable systems.
```

Ghi chú ngôn ngữ: `body` dùng English vì đây là positioning statement cho cả international audience. Đây là ngoại lệ duy nhất được phép trong toàn site, không áp dụng cho các scene còn lại.

**Visual:**

- Nền tối sâu, noise/grain rất nhẹ.
- Một signal line xuất hiện trước khi tên reveal.
- Tên scan-in từng ký tự, không fade đơn thuần.

**Accent:** `#000 / #00d4ff` (black/cyan)

**Transition out:** Signal line kéo ngang hoặc dọc để mở scene kế tiếp.

---

### Scene 02 — Interface Thinking

**Ý chính:** Frontend không phải chỉ là đẹp. Nó là cách state và data trở nên rõ ràng.

**Copy đã chốt:**

```
headline:  Giao diện không chỉ là màn hình
body:      Với mình, Frontend là cách state, data và hành động của người dùng
           trở nên rõ ràng và có thể điều khiển được.
```

**Visual:**

- Background chuyển sang grid/interface blueprint, deep blue.
- Các card và state node mờ dần xuất hiện.
- Một vài connection line nhẹ kết nối các node.

**Accent:** `#0a1628 / #2a4d8f` (deep blue)

**Transition out:** Grid mở rộng, layout board lộ ra như nền của scene tiếp theo.

---

### Scene 03 — Systems From Chaos

**Ý chính:** Từ dữ liệu rời rạc, mình xây hệ thống có thể vận hành thật.

**Copy đã chốt:**

```
headline:  Từ dữ liệu rời rạc đến hệ thống dùng được
body:      Mình xây dashboard, internal tool và workflow để biến dữ liệu thô
           thành công cụ vận hành thật sự.
```

**Visual:**

- Background steel/dark blue.
- Các module dashboard nổi lên: abstract chart, table, card — không cần full project screenshot.
- Cảm giác như đang nhìn vào một hệ thống đang chạy.

**Accent:** `#0f1c2e / #b8860b` (steel/amber)

**Transition out:** Các module compress lại thành một signal point duy nhất, dẫn vào scene 04.

---

### Scene 04 — AI Assisted Delivery

**Ý chính:** AI và CLI là phần tự nhiên trong workflow của mình — để đi nhanh hơn từ concept đến sản phẩm.

**Copy đã chốt:**

```
headline:  Nhanh hơn từ concept đến sản phẩm
body:      AI, CLI và runtime feedback là một phần tự nhiên trong cách mình làm việc —
           để rút ngắn khoảng cách từ ý tưởng đến bản chạy được.
```

**Visual:**

- Background green/cyan lab.
- Command line nhẹ, automation path, commit/build signal — thoáng qua.
- Không biến thành terminal dày đặc.

**Accent:** `#0a1f0a / #00c896` (dark green/cyan)

**Transition out:** Command cursor morph thành CTA arrow dẫn vào scene cuối.

---

### Scene 05 — Choose The Door

**Ý chính:** Kết câu chuyện. Đưa người xem sang route phù hợp với họ.

**Copy đã chốt:**

```
headline:  Bạn muốn bắt đầu từ đâu?
body:      Xem bằng chứng trong Work. Bắt đầu cuộc trò chuyện ở Contact.
```

**CTA đã chốt:**

```
cta_primary:    label="View Work"        route="/work"
cta_secondary:  label="Contact"          route="/contact"
cta_lab:        label="Explore Lab →"    route="/lab"
```

Ghi chú CTA: `View Work` và `Contact` dùng English vì ngắn và thống nhất với convention button. `Explore Lab →` dùng English vì tên route Lab cũng là English. Ba CTA này có weight khác nhau: primary rõ nhất, secondary nhỏ hơn, lab link nhỏ nhất.

**Visual:**

- Background tối clean hơn các scene trước — ít motif, nhiều không gian.
- 2 CTA nổi bật. Link Lab ở vị trí phụ.

**Accent:** `#080c10 / #e8e8e8` (clean dark)

**Transition out:** Không có. Đây là điểm thoát.

---

## 4.1 Scene Data Schema

Đây là cấu trúc dữ liệu chuẩn cho `homeStoryScenes.js`. Mỗi field phải được fill đủ trước khi code scene animation.

```js
// homeStoryScenes.js
export const homeStoryScenes = [
    {
        id: "signal-appears", // slug dùng cho CSS class và aria-label
        index: 0, // 0-based, dùng cho ScrollTrigger progress
        indicatorLabel: "01", // text hiển thị trong scene indicator
        headline: "", // text chính, render as <h1> hoặc <h2>
        body: "", // supporting copy, render as <p>
        accent: {
            bg: "", // CSS color token cho background
            line: "", // CSS color token cho signal line/motif
        },
        cta: null, // null cho scene 01-04; object cho scene 05
        // cta shape: { primary, secondary, lab }
        // primary/secondary/lab shape: { label, route }
    },
];
```

Copy từng scene đã khóa ở mục 4. Khi code `homeStoryScenes.js`, copy vào trực tiếp, không hard-code trong JSX.

## 5. Cấu trúc scroll hợp lý

Không nên làm Home dài quá. Đề xuất:

```txt
Home scroll story = 5 scene x khoảng 80-100vh scroll distance
Tổng cảm giác: 4-5 màn hình
Thời gian xem: 25-45 giây
```

Trên desktop:

- Dùng pinned stage.
- Text nằm bên trái hoặc center-left.
- Visual/background chiếm toàn màn hình.
- Scene indicator nhỏ bên phải hoặc bottom-left.

Trên mobile:

- Không nên pin quá nặng.
- Có thể chuyển thành vertical stacked story.
- Background vẫn đổi theo section, nhưng animation nhẹ hơn.
- Text luôn ưu tiên đọc được.

## 5.1 Quy tắc payload cho từng scene

Để Home giữ được cảm giác cinematic nhưng không quay lại lỗi one-page cũ, mỗi scene nên bị giới hạn rõ:

- 1 headline chính.
- 1 supporting copy ngắn, tối đa khoảng 2 câu.
- 1 visual motif chính.
- 1 trạng thái chuyển cảnh phục vụ scene kế tiếp.

Không nên nhét proof chi tiết, stack list dài hoặc case-study data vào từng scene. Các thứ đó thuộc về Work, Stack hoặc Workflow.

## 6. Kỹ thuật phù hợp với project hiện tại

Project hiện đã có GSAP/ScrollTrigger, nên không cần đổi stack lớn.

Hướng kỹ thuật đề xuất:

```txt
HomePage.jsx
-> HomeStory.jsx
-> homeStoryScenes data
-> useHomeStoryMotion hook
-> styles/pages/home.css
```

Animation engine:

- GSAP ScrollTrigger cho desktop.
- CSS transition + IntersectionObserver fallback cho mobile/reduced-motion nếu cần.
- Dùng timeline tổng, không tạo quá nhiều ScrollTrigger nhỏ.
- CTA ở scene cuối phải dùng route navigation thật, không dùng anchor scroll để giả multi-page.
- Scene data nên là một single source of truth để copy, visual state, indicator và motion phase đọc từ cùng một cấu trúc.

Pattern GSAP nên dùng:

```txt
ScrollTrigger.create({
  trigger: storyRoot,
  pin: storyStage,
  scrub: true,
  end: () => `+=${sceneCount * window.innerHeight}`,
})
```

Lưu ý kỹ thuật:

- Không animate chính element đang bị pin; animate layer bên trong.
- Cleanup kỹ trong React để tránh StrictMode tạo duplicate triggers.
- Dùng function-based `end` và `invalidateOnRefresh` để responsive ổn.
- Có reduced-motion fallback.
- Không dùng quá nhiều canvas/blur/filter nặng cùng lúc.

## 6.1 Guardrails bắt buộc

- Desktop chỉ nên có một pin sequence chính cho Home story; tránh chia thành nhiều pinned zone nối nhau.
- Mobile không cố giữ đủ mọi effect của desktop. Ưu tiên đọc, scroll mượt và tap target rõ.
- Scene indicator phải là tín hiệu phụ, không phải nguồn thông tin duy nhất về trạng thái hiện tại.
- Text contrast phải ổn định qua mọi scene; không hy sinh readability để giữ màu nền "đỉnh".
- Reduced-motion không chỉ là tắt animation, mà phải giữ nguyên thứ tự kể chuyện và CTA logic.

## 7. Visual signature nên chọn

Vì portfolio đang có concept Signal Profile OS, Home scroll story nên có một signature transition riêng:

```txt
Signal Scan Transition
```

Cảm giác:

- Một đường signal đi qua màn hình.
- Khi đường đó đi qua, background đổi scene.
- Text cũ bị scan out, text mới scan in.
- Các layer visual mới hiện lên theo sau đường scan.

Đây là signature đủ riêng, hợp concept, và có thể dùng lại nhẹ ở các trang khác.

## 8. Điều cần tránh

- Không dùng scrollytelling để khoe effect mà quên nội dung.
- Không để mỗi scene có quá nhiều chữ.
- Không dùng quá nhiều style transition khác nhau.
- Không pin dài quá khiến người xem bị mắc kẹt.
- Không làm mobile nặng hoặc khó scroll.
- Không để Home thay thế Work/About/Stack.

## 9. Kết luận và checklist trước khi code

Hướng đã được chốt: **Cinematic Scroll Story Home**.

Tóm tắt những gì đã khóa:

```txt
5 cảnh — Signal Appears / Interface Thinking / Systems From Chaos / AI Assisted Delivery / Choose The Door
Scroll dọc theo một timeline chính, pinned stage trên desktop
Fallback vertical story trên mobile và reduced-motion
Signal Scan Transition làm signature chuyển cảnh duy nhất
Copy đã chốt theo cấu trúc headline + body cho tất cả 5 cảnh
CTA Scene 05: View Work (primary) · Contact (secondary) · Explore Lab → (phụ)
Lab chỉ là link phụ, không chiếm trọng tâm
```

Checklist trước khi bắt đầu code Phase 6:

- [ ] `homeStoryScenes.js` được tạo với 5 scene entries đầy đủ theo schema ở mục 4.1.
- [ ] Accent colors từ từng scene đã được map vào design tokens (`styles/tokens.css`).
- [ ] Route `/work`, `/contact`, `/lab` đã hoạt động (Phase 5 done) trước khi Home CTA có ý nghĩa.
- [ ] Quyết định về `scrub` vs `snap` trong ScrollTrigger đã được xem xét (snap hợp hơn nếu muốn cảm giác chapter rõ, scrub hợp hơn nếu muốn người xem kiểm soát tốc độ).
- [ ] Reduced-motion fallback đã được design trước khi code animation — không phải thêm sau.

Hướng này cho thấy được:

- Gu visual có chủ đích.
- Khả năng motion có kiểm soát.
- Khả năng storytelling qua scroll.
- Khả năng kiểm soát state/scene/transition theo data.
- Trải nghiệm cao cấp mà vẫn đọc được nội dung rõ.
