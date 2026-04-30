export const homeStoryScenes = [
    {
        id: "signal-appears",
        index: 0,
        indicatorLabel: "01",
        headline:
            "Vũ Đình Dũng — Web Developer. Mình build web app, dashboard và internal tool dùng được thật.",
        body: "Mình xây interface cho web app, dashboard và workflow AI-assisted: ít trang hơn, nhiều quyết định rõ hơn, và mỗi CTA đều dẫn đến bước tiếp theo thật.",
        motif: "Giới thiệu / định vị bản thân",
        accent: {
            bg: "#000000",
            line: "#00d4ff",
        },
        cta: null,
    },
    {
        id: "interface-thinking",
        index: 1,
        indicatorLabel: "02",
        headline:
            "Giao diện không chỉ là màn hình, mà là cách hệ thống nói chuyện.",
        body: "Frontend tốt làm state, data, lỗi và hành động người dùng trở nên đọc được. Người xem biết đang ở đâu; người vận hành biết cần làm gì.",
        motif: "Thiết kế giao diện / cấu trúc thông tin",
        accent: {
            bg: "#0a1628",
            line: "#2a4d8f",
        },
        cta: null,
    },
    {
        id: "systems-from-chaos",
        index: 2,
        indicatorLabel: "03",
        headline: "Từ dữ liệu rời rạc đến dashboard và tool dùng được thật.",
        body: "Mình gom tín hiệu thô thành module, bảng trạng thái, filter, flow kiểm tra và hành động rõ. Mục tiêu không phải nhiều effect, mà là giảm mơ hồ trong runtime.",
        motif: "Từ dữ liệu thô đến công cụ vận hành",
        accent: {
            bg: "#0f1c2e",
            line: "#b8860b",
        },
        cta: null,
    },
    {
        id: "ai-assisted-delivery",
        index: 3,
        indicatorLabel: "04",
        headline: "AI và CLI rút ngắn vòng lặp, nhưng runtime vẫn quyết định.",
        body: "Mình dùng AI để tăng tốc phân tích, scaffold và refactor; dùng browser, build và dữ liệu thật để kiểm chứng. Tốc độ chỉ có giá trị khi bản chạy được không vỡ.",
        motif: "Tự động hóa / tăng tốc phát triển",
        accent: {
            bg: "#0a1f0a",
            line: "#00c896",
        },
        cta: {
            primary: { label: "Xem quy trình", route: "/workflow" },
            secondary: { label: "Xem case study", route: "/work" },
            lab: { label: "Khám phá Lab →", route: "/lab" },
        },
    },
    {
        id: "choose-the-door",
        index: 4,
        indicatorLabel: "05",
        headline: "Bạn muốn bắt đầu từ đâu?",
        body: "Xem bằng chứng trong Work, gửi brief ở Contact, hoặc mở Lab nếu muốn xem phần OS/cyber experimental cũ.",
        motif: "Điều hướng / bước tiếp theo",
        accent: {
            bg: "#080c10",
            line: "#e8e8e8",
        },
        cta: {
            primary: { label: "View Work", route: "/work" },
            secondary: { label: "Contact", route: "/contact" },
            lab: { label: "Explore Lab ->", route: "/lab" },
        },
    },
];
