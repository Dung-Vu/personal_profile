export const aboutProfile = {
    eyebrow: "ABOUT / FIT & WORK STYLE",
    headline:
        "Mình hợp với sản phẩm web cần flow rõ, trạng thái rõ và có thể ship theo từng slice.",
    intro:
        "Mình làm tốt nhất với website, dashboard và internal tool có data/API thật; bắt đầu từ bối cảnh, dựng cấu trúc, rồi kiểm chứng bằng browser và build.",
    meta: [
        {
            label: "Focus",
            value: "Frontend systems, dashboards, AI-assisted delivery",
        },
        { label: "Projects", value: "3 flagship cases + internal tools" },
        {
            label: "Work style",
            value: "Small slices, visible progress, verified runtime",
        },
        { label: "Base", value: "Việt Nam / Remote" },
        { label: "Response", value: "Thường 24-48h nếu brief đủ context" },
    ],
    stats: [
        { value: "3+", label: "năm làm frontend / product UI" },
        { value: "4", label: "loại sản phẩm: website, dashboard, tool, AI" },
        { value: "Build-first", label: "Mọi output qua build + browser QA" },
    ],
};

export const aboutBeliefs = [
    {
        title: "Màn hình nào cũng phải có đủ 4 trạng thái",
        text: "Loading, empty, error, success + next action. Mình thiết kế đủ 4 trạng thái này cho các màn hình quan trọng để người dùng không phải đoán hệ thống đang làm gì.",
    },
    {
        title: "Motion chỉ dùng khi giúp đọc nhanh hơn",
        text: "Mình dùng GSAP/transition để dẫn mắt, chia nhịp và tạo context giữa các phần tử. Nếu animation không làm rõ flow hoặc trạng thái, mình cắt bỏ.",
    },
    {
        title: "AI là accelerator, không phải decision maker",
        text: "Dùng Codex/Claude/MCP để rút ngắn research và code. Nhưng mọi output đều qua diff review, build check và browser smoke trước khi merge.",
    },
    {
        title: "Frontend là một hệ thống, không phải tập hợp màn hình",
        text: "Component, route, state model, copy và data path phải khớp nhau. Khi khớp, sản phẩm nhẹ hơn, dễ maintain hơn và ít bug bất ngờ hơn.",
    },
];

export const aboutProcess = [
    {
        step: "01",
        title: "Đọc bối cảnh",
        text: "Xác định mục tiêu, người dùng, dữ liệu hiện có và giới hạn kỹ thuật trước khi thiết kế giao diện.",
    },
    {
        step: "02",
        title: "Dựng cấu trúc",
        text: "Xác định page structure, luồng dữ liệu và CTA để giao diện có nền tảng vững trước khi thêm chi tiết.",
    },
    {
        step: "03",
        title: "Thiết kế nhịp sử dụng",
        text: "Chọn hierarchy, spacing, motion và feedback state theo hành động thật của người dùng.",
    },
    {
        step: "04",
        title: "Kiểm chứng bằng runtime",
        text: "Build, kiểm tra trên browser, responsive và fallback để sản phẩm chạy tốt trong thực tế.",
    },
];

export const aboutNotes = [
    "Không chạy theo hiệu ứng nếu flow chưa rõ.",
    "Không xem AI output là source of truth nếu chưa verify.",
    "Không biến portfolio thành demo OS ở mọi route; Lab dành cho phần experimental.",
];

