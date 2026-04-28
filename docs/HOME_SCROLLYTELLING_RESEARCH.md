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

Nó khác với Home tối giản ở chỗ:

- Home tối giản: vào là hiểu nhanh, ít cảnh, ít chuyển động.
- Home scroll story: vào là bị cuốn vào một chuỗi cảnh ngắn, scroll để mở từng lớp câu chuyện.

Nhưng nó cũng khác one-page cũ ở chỗ:

- Không nhét toàn bộ project/stack/workflow/contact vào Home.
- Không có quá nhiều panel/mode/HUD cạnh tranh nhau.
- Chỉ kể một câu chuyện mở đầu, sau đó đẩy người xem sang Work/Stack/Contact.

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

## 4. Home story arc đề xuất cho Vũ Đình Dũng

Home nên có 5 cảnh. Mỗi cảnh chỉ cần một ý chính.

### Scene 01 - Signal Appears

Mục tiêu:

- Giới thiệu tên.
- Tạo cảm giác tín hiệu xuất hiện trong noise.

Text gợi ý:

```txt
Vũ Đình Dũng
I build interfaces that turn messy signals into usable systems.
```

Visual:

- Nền tối sâu.
- Noise/grain rất nhẹ.
- Một signal line xuất hiện.
- Tên reveal như được scan.

Transition:

- Signal line kéo ngang/dọc mở scene tiếp theo.

### Scene 02 - Interface Thinking

Mục tiêu:

- Nói về cách bạn nhìn Frontend: không chỉ đẹp, mà rõ state/flow/data.

Text gợi ý:

```txt
Frontend với mình không chỉ là màn hình đẹp.
Nó là cách state, data và hành động của người dùng trở nên rõ ràng.
```

Visual:

- Background chuyển sang grid/interface blueprint.
- Các card/state node mờ xuất hiện.
- Một vài line kết nối state.

Transition:

- Grid mở rộng thành layout/system board.

### Scene 03 - Systems From Chaos

Mục tiêu:

- Nói về dashboard/internal tool/product system.

Text gợi ý:

```txt
Từ dữ liệu rời rạc, mình dựng thành dashboard, workflow và công cụ có thể dùng thật.
```

Visual:

- Background đổi sang deep blue/steel.
- Module dashboard nổi lên.
- Chart/table/card chỉ là abstract, không cần full project.

Transition:

- Modules compress lại thành một project signal.

### Scene 04 - AI Assisted Delivery

Mục tiêu:

- Nói về AI workflow, CLI, automation, delivery.

Text gợi ý:

```txt
Mình dùng AI, CLI và runtime feedback để đi từ ý tưởng đến bản chạy được nhanh hơn.
```

Visual:

- Background chuyển sang xanh lục/cyan lab.
- Command line nhẹ, automation path, commit/build signal.
- Không biến thành terminal dày đặc.

Transition:

- Command cursor biến thành CTA arrow.

### Scene 05 - Choose The Door

Mục tiêu:

- Kết câu chuyện và đưa người xem sang trang tiếp theo.

Text gợi ý:

```txt
Nếu bạn muốn xem bằng chứng, bắt đầu từ Work.
Nếu muốn bắt đầu một sản phẩm, đi tới Contact.
```

Visual:

- Background sạch hơn.
- 2 CTA lớn: View Work / Start Contact.
- Link nhỏ tới Lab: Explore Signal OS.

Transition:

- Không cần chuyển nữa. Đây là điểm thoát.

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

## 6. Kỹ thuật phù hợp với project hiện tại

Project hiện đã có GSAP/ScrollTrigger, nên không cần đổi stack lớn.

Hướng kỹ thuật đề xuất:

```txt
HomePage.jsx
-> HomeStory.jsx
-> homeStoryScenes data
-> useHomeStoryMotion hook
-> home-story.css
```

Animation engine:

- GSAP ScrollTrigger cho desktop.
- CSS transition + IntersectionObserver fallback cho mobile/reduced-motion nếu cần.
- Dùng timeline tổng, không tạo quá nhiều ScrollTrigger nhỏ.

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

## 9. Kết luận đề xuất

Nên đổi định hướng Home từ:

```txt
Story Signal Landing
```

thành:

```txt
Cinematic Scroll Story Home
```

Cụ thể:

```txt
Một Home 5 cảnh
Scroll dọc để chuyển background và text
Pinned stage trên desktop
Fallback vertical story trên mobile
Signal Scan Transition làm signature
CTA rõ ở cảnh cuối
```

Đây là hướng rất hợp với mục tiêu trình diễn vẻ đẹp Frontend, vì nó cho thấy:

- Gu visual.
- Khả năng motion.
- Khả năng storytelling.
- Khả năng kiểm soát state/scene/transition.
- Khả năng làm trải nghiệm cao cấp mà vẫn có nội dung rõ.
