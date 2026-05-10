import { projects } from "../content/projects.js";

export const siteOrigin = "https://dinhdung.dev";

const baseRoutes = [
    {
        path: "/",
        label: "Home",
        title: "Web apps",
        priority: "core",
        includeInNav: true,
        includeInSitemap: true,
        prerender: true,
        sitemapPriority: "1.0",
        meta: {
            title: "Vũ Đình Dũng - Web apps, dashboards, internal tools",
            desc: "Portfolio của Vũ Đình Dũng: web app, dashboard, internal tool và AI workflow tập trung vào dữ liệu dễ đọc, thao tác rõ và bằng chứng triển khai.",
        },
    },
    {
        path: "/about",
        label: "About",
        title: "Work style",
        priority: "core",
        includeInNav: true,
        includeInSitemap: true,
        prerender: true,
        sitemapPriority: "0.8",
        meta: {
            title: "About - Vũ Đình Dũng",
            desc: "Frontend developer cho website, dashboard và internal tool. Làm việc theo slice nhỏ, kiểm chứng bằng build và browser QA.",
        },
    },
    {
        path: "/work",
        label: "Work",
        title: "Case study",
        priority: "core",
        includeInNav: true,
        includeInSitemap: true,
        prerender: true,
        sitemapPriority: "0.9",
        meta: {
            title: "Work - Vũ Đình Dũng",
            desc: "3 case study chính: TCA Crypto Analyzer, Bonario Product Hub và AI Operator Workflow. Mỗi case có context, quyết định và proof.",
        },
    },
    {
        path: "/stack",
        label: "Stack",
        title: "Capabilities",
        priority: "secondary",
        includeInNav: true,
        includeInSitemap: true,
        prerender: true,
        sitemapPriority: "0.7",
        meta: {
            title: "Stack - Vũ Đình Dũng",
            desc: "React, Vite, Flask, Odoo, GSAP và automation tools dùng để ship website, dashboard và internal tool.",
        },
    },
    {
        path: "/workflow",
        label: "Workflow",
        title: "Delivery loop",
        priority: "secondary",
        includeInNav: true,
        includeInSitemap: true,
        prerender: true,
        sitemapPriority: "0.7",
        meta: {
            title: "Workflow - Vũ Đình Dũng",
            desc: "Quy trình 4 bước từ đọc bối cảnh đến verify runtime. Mỗi bước có deliverable cụ thể.",
        },
    },
    {
        path: "/contact",
        label: "Contact",
        title: "Project brief",
        priority: "core",
        includeInNav: true,
        includeInSitemap: true,
        prerender: true,
        sitemapPriority: "0.8",
        meta: {
            title: "Contact - Vũ Đình Dũng",
            desc: "Gửi brief ngắn để chốt scope MVP cho website, dashboard, internal tool hoặc AI workflow.",
        },
    },
    {
        path: "/lab",
        label: "Lab",
        title: "Archive Concept",
        priority: "archive",
        includeInNav: false,
        includeInSitemap: false,
        prerender: true,
        meta: {
            title: "Lab Archive - Vũ Đình Dũng",
            desc: "Archive Signal OS cũ. Giữ lại như phòng thử nghiệm, không đại diện cho portfolio chính.",
        },
    },
    {
        path: "/404",
        label: "404",
        title: "Not found",
        priority: "system",
        includeInNav: false,
        includeInSitemap: false,
        prerender: true,
        meta: {
            title: "404 - Vũ Đình Dũng",
            desc: "Route không tồn tại trong portfolio của Vũ Đình Dũng. Quay lại Home hoặc Work để tiếp tục.",
        },
    },
];

const workCaseRoutes = projects.map((project) => ({
    path: `/work/${project.slug}`,
    label: project.title,
    title: "Case detail",
    priority: "case",
    includeInNav: false,
    includeInSitemap: true,
    prerender: true,
    sitemapPriority: "0.7",
    meta: {
        title: `${project.title} - Case Study`,
        desc: project.summary,
    },
}));

export const siteRoutes = [
    ...baseRoutes.slice(0, 3),
    ...workCaseRoutes,
    ...baseRoutes.slice(3),
];

export const routes = baseRoutes.filter((route) => route.includeInNav);

export const routePaths = siteRoutes.map((route) => route.path);

export const routeMetaMap = Object.fromEntries(
    siteRoutes.map((route) => [route.path, route.meta]),
);

export const sitemapRoutes = siteRoutes.filter((route) => route.includeInSitemap);

export const prerenderRoutes = siteRoutes
    .filter((route) => route.prerender)
    .map((route) => route.path);

export function normalizePath(pathname) {
    if (!pathname || pathname === "/") return "/";
    const normalized = pathname.endsWith("/")
        ? pathname.slice(0, -1)
        : pathname;

    return routePaths.includes(normalized) ? normalized : "/404";
}

export function getRouteMeta(pathname) {
    const path = normalizePath(pathname);
    return routeMetaMap[path] ?? routeMetaMap["/"];
}

export function getCanonicalUrl(pathname) {
    const path = normalizePath(pathname);
    return `${siteOrigin}${path === "/" ? "/" : path}`;
}
