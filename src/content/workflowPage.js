import { workflow } from "./workflow";

export const workflowHero = {
    eyebrow: "WORKFLOW / PROCESS SUMMARY",
    headline:
        "Quy trình 4 bước: từ brief đến giao diện web chạy thật trên trình duyệt.",
    intro: "Đầu ra mỗi vòng phải rõ: phạm vi, màn hình hoặc quy trình đã dựng, trạng thái còn thiếu, và bằng chứng đã chạy qua build & kiểm tra trình duyệt.",
};

export const workflowDeliverables = [
    "Brief doc: context, data, goal, timeline",
    "Structure map: route, state model, CTA flow",
    "Running slice: UI + data path + error states",
    "Verification: build log, browser screenshots, check-in update",
];

export const workflowSteps = workflow.map((step, index) => ({
    ...step,
    signal: ["input", "structure", "slice", "verified"][index] ?? step.status,
    deliverable: workflowDeliverables[index],
    checks:
        index === 0
            ? [
                  "Repo / dữ liệu / log",
                  "Mục tiêu người dùng",
                  "Ràng buộc kỹ thuật",
              ]
            : index === 1
              ? ["Route / state", "Hierarchy", "CTA và fallback"]
              : index === 2
                ? ["Component slice", "API/data path", "Error/empty state"]
                : ["Build", "Browser smoke", "Responsive/reduced motion"],
}));

export const workflowToolchain = [
    {
        title: "Code loop",
        tools: ["React", "Vite", "CSS modules by route", "GSAP when useful"],
        text: "Ưu tiên cấu trúc route/page/content rõ trước, sau đó mới thêm motion và polish.",
    },
    {
        title: "AI loop",
        tools: ["Codex", "Claude", "MCP", "Context docs"],
        text: "AI dùng để tăng tốc nghiên cứu, refactor và audit; quyết định cuối vẫn dựa trên diff và runtime.",
    },
    {
        title: "Verification loop",
        tools: [
            "npm run build",
            "Browser smoke",
            "Overflow checks",
            "Plan update",
        ],
        text: "Mỗi slice phải có bằng chứng chạy được, không chỉ hoàn thành về mặt code.",
    },
];

export const workflowHandoff = [
    "Việc đã làm phải được ghi vào plan/check-in.",
    "Next slice phải rõ file nào sẽ đụng và verify bằng gì.",
    "Nếu tooling bị giới hạn, ghi rõ blocker và harden bằng audit thay vì im lặng bỏ qua.",
];
