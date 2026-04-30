import { capabilities } from "./capabilities";
import { projects } from "./projects";

const projectMap = new Map(projects.map((project) => [project.slug, project]));

const stackTools = {
    frontend: ["React", "Vite", "GSAP", "CSS architecture", "Responsive UI"],
    "product-ui": [
        "Dashboard UX",
        "State design",
        "Data hierarchy",
        "Filtering",
        "Admin flows",
    ],
    "backend-flow": [
        "Flask",
        "Odoo API",
        "REST integration",
        "Data normalization",
        "Error states",
    ],
    automation: [
        "Codex",
        "Claude",
        "MCP",
        "Browser audit",
        "Build verification",
    ],
};

export const stackHero = {
    eyebrow: "STACK / WEB DELIVERY",
    headline:
        "Stack thực dụng cho website, dashboard, internal tool và API workflow.",
    intro: "React/Vite cho UI, Flask/Odoo/API khi cần kết nối dữ liệu, GSAP khi cần chuyển động có chủ đích, và kiểm tra bằng build + trình duyệt trước khi bàn giao.",
};

export const stackMatrix = capabilities.map((capability) => ({
    ...capability,
    tools: stackTools[capability.id] ?? [],
    evidence: capability.relatedProjects
        .map((slug) => projectMap.get(slug))
        .filter(Boolean)
        .map((project) => ({
            slug: project.slug,
            title: project.title,
            type: project.type,
        })),
}));

export const stackPrinciples = [
    {
        label: "01",
        title: "Chọn theo flow, không chọn theo trend",
        text: "Nếu bài toán là đọc dữ liệu nhanh, hierarchy và state model quan trọng hơn việc thêm thư viện mới.",
    },
    {
        label: "02",
        title: "Mỗi tool phải có bằng chứng sử dụng",
        text: "Capability nào xuất hiện trên Stack đều cần nối được về case, workflow hoặc runtime verification.",
    },
    {
        label: "03",
        title: "Motion là một lớp thông tin",
        text: "GSAP, transition và hover chỉ được dùng khi làm rõ nhịp đọc, trạng thái hoặc quan hệ giữa các phần tử.",
    },
];

export const stackStats = [
    { value: "04", label: "capability groups" },
    { value: "03", label: "evidence projects" },
    { value: "3+", label: "năm ship sản phẩm với stack này" },
];
