import { capabilities } from "./capabilities";
import { projects } from "./projects";
import { workflow } from "./workflow";

export const profileBase = {
    name: "Vũ Đình Dũng",
    headline:
        "Web Developer xây giao diện rõ trạng thái cho sản phẩm vận hành.",
    email: "dinhdung521@gmail.com",
    github: "https://github.com/Dung-Vu",
    githubName: "Dung-Vu",
    heroImage: "/assets/signal-workstation-hero-v2.webp",
    intro: "Mình phát triển website, dashboard và công cụ nội bộ với trọng tâm là luồng thao tác gọn, dữ liệu dễ đọc và sản phẩm dùng được trong công việc thật.",
    birthday: "13/05/2001",
    location: "Việt Nam / Remote",
    focus: "Web apps, dashboards, API integration, AI workflow",
    about: "Mình thích biến những quy trình rời rạc thành hệ thống web gọn gàng: đọc đúng bài toán, thiết kế màn hình theo hành động người dùng, kết nối API, kiểm tra bằng dữ liệu thật và dùng AI/CLI để tăng tốc vòng lặp phát triển.",
    contactText:
        "Nếu bạn cần một website, dashboard hoặc công cụ nội bộ, hãy gửi mình bối cảnh hiện tại, dữ liệu đang có và kết quả muốn đạt được. Mình sẽ phản hồi bằng hướng triển khai cụ thể, ưu tiên bản chạy được sớm.",
    footer: "Portfolio - Vũ Đình Dũng.",
};

export const profile = {
    ...profileBase,
    stack: capabilities,
    projects,
    workflow,
};
