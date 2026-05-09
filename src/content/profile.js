import { capabilities } from "./capabilities";
import { projects } from "./projects";
import { workflow } from "./workflow";

export const profileBase = {
    name: "Vũ Đình Dũng",
    headline:
        "Mình thiết kế và build web app, dashboard, internal tool để người dùng đọc dữ liệu nhanh và thao tác chắc hơn.",
    email: "dinhdung521@gmail.com",
    github: "https://github.com/Dung-Vu",
    githubName: "Dung-Vu",
    heroImage: "/assets/signal-workstation-hero-v2.webp",
    intro: "Mình bắt đầu từ bài toán, dữ liệu và hành động chính; sau đó mới dùng UI, copy và motion để làm trải nghiệm rõ hơn.",
    birthday: "13/05/2001",
    location: "Việt Nam / Remote",
    focus: "Web apps, dashboards, API integration, AI workflow",
    about: "Mình thích biến quy trình rời rạc thành hệ web gọn gàng: đọc đúng bài toán, dựng layout theo hành động người dùng, nối API, kiểm tra bằng dữ liệu thật và dùng AI/CLI để tăng tốc vòng lặp phát triển.",
    contactText:
        "Nếu bạn cần website, dashboard hoặc internal tool, gửi mình bối cảnh hiện tại, dữ liệu đang có và kết quả muốn đạt được. Mình sẽ phản hồi bằng hướng triển khai cụ thể, ưu tiên bản chạy được sớm.",
    footer: "Portfolio - Vũ Đình Dũng.",
};

export const profile = {
    ...profileBase,
    stack: capabilities,
    projects,
    workflow,
};
