import { projects } from "../content/projects.js";

export const siteOrigin = "https://dinhdung.dev";

const siteName = "Vũ Đình Dũng Portfolio";
const authorName = "Vũ Đình Dũng";
const defaultImage = "/assets/signal-workstation-hero-v2.jpg";

function absoluteUrl(path) {
    if (!path) return `${siteOrigin}/`;
    if (path.startsWith("http")) return path;
    return `${siteOrigin}${path.startsWith("/") ? path : `/${path}`}`;
}

function webPageSchema(path, meta, type = "WebPage") {
    return {
        "@context": "https://schema.org",
        "@type": type,
        name: meta.title,
        description: meta.desc,
        url: getCanonicalUrl(path),
        image: absoluteUrl(meta.image),
        isPartOf: {
            "@type": "WebSite",
            name: siteName,
            url: `${siteOrigin}/`,
        },
        author: {
            "@type": "Person",
            name: authorName,
            url: `${siteOrigin}/about`,
        },
    };
}

function pageMeta({
    title,
    desc,
    image = defaultImage,
    imageAlt = "Portfolio preview",
    ogType = "website",
    keywords = [],
    robots = "index,follow",
    schema = null,
}) {
    return {
        title,
        desc,
        image: absoluteUrl(image),
        imageAlt,
        ogType,
        keywords,
        robots,
        schema,
    };
}

function projectSchema(project, path, meta) {
    return [
        webPageSchema(path, meta, "ItemPage"),
        {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            headline: `${project.title} case study`,
            description: project.summary,
            image: absoluteUrl(project.socialImage ?? project.assets.cover),
            url: getCanonicalUrl(path),
            creator: {
                "@type": "Person",
                name: authorName,
                url: `${siteOrigin}/about`,
            },
            about: project.systemRole,
            keywords: project.seoKeywords?.join(", "),
            workExample: project.artifactGallery?.map((artifact) => ({
                "@type": "ImageObject",
                name: artifact.label,
                caption: artifact.caption,
                contentUrl: absoluteUrl(artifact.image),
            })),
        },
    ];
}

const homeMeta = pageMeta({
    title: "Vũ Đình Dũng - Web apps, dashboards, internal tools",
    desc:
        "Portfolio của Vũ Đình Dũng: web app, dashboard, internal tool và AI workflow tập trung vào dữ liệu dễ đọc, thao tác rõ và bằng chứng triển khai.",
    image: defaultImage,
    imageAlt: "Portfolio hero preview",
    ogType: "profile",
    keywords: [
        "Vũ Đình Dũng",
        "frontend developer",
        "web apps",
        "dashboards",
        "internal tools",
        "AI workflow",
    ],
    schema: [
        {
            "@context": "https://schema.org",
            "@type": "Person",
            name: authorName,
            email: "dinhdung521@gmail.com",
            url: `${siteOrigin}/`,
            sameAs: ["https://github.com/Dung-Vu"],
            jobTitle: "Web Developer",
            knowsAbout: [
                "Frontend Development",
                "Dashboard UI",
                "API Integration",
                "Automation",
                "AI-assisted workflow",
            ],
        },
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteName,
            url: `${siteOrigin}/`,
            inLanguage: "vi",
        },
    ],
});

const workMeta = pageMeta({
    title: "Work - Vũ Đình Dũng",
    desc:
        "3 case study chính: TCA Crypto Analyzer, Bonario Product Hub và AI Operator Workflow. Mỗi case có context, quyết định, artifact và runtime proof.",
    image: "/assets/signal-case-ai-workflow.jpg",
    imageAlt: "Case study proof preview",
    keywords: ["case study", "runtime proof", "dashboard", "internal tool", "AI workflow"],
});
workMeta.schema = [
    webPageSchema("/work", workMeta, "CollectionPage"),
    {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Portfolio case studies",
        itemListElement: projects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: project.title,
            url: `${siteOrigin}/work/${project.slug}`,
            description: project.summary,
        })),
    },
];

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
        meta: homeMeta,
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
        meta: pageMeta({
            title: "About - Vũ Đình Dũng",
            desc:
                "Frontend developer cho website, dashboard và internal tool. Làm việc theo slice nhỏ, kiểm chứng bằng build và browser QA.",
            image: "/assets/signal-about-dossier.jpg",
            imageAlt: "About dossier preview",
            ogType: "profile",
            keywords: ["frontend developer", "product UI", "browser QA", "Vietnam"],
        }),
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
        meta: workMeta,
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
        meta: pageMeta({
            title: "Stack - Vũ Đình Dũng",
            desc:
                "React, Vite, Flask, Odoo, GSAP và automation tools dùng để ship website, dashboard và internal tool.",
            image: defaultImage,
            imageAlt: "Frontend stack preview",
            keywords: ["React", "Vite", "Flask", "Odoo", "GSAP", "automation"],
        }),
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
        meta: pageMeta({
            title: "Workflow - Vũ Đình Dũng",
            desc:
                "Quy trình 4 bước từ đọc bối cảnh đến verify runtime. Mỗi bước có deliverable cụ thể.",
            image: "/assets/signal-case-ai-workflow.jpg",
            imageAlt: "AI operator workflow preview",
            keywords: ["delivery workflow", "AI workflow", "browser QA", "handoff"],
        }),
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
        meta: pageMeta({
            title: "Contact - Vũ Đình Dũng",
            desc:
                "Gửi brief ngắn để chốt scope MVP cho website, dashboard hoặc internal tool.",
            image: defaultImage,
            imageAlt: "Project brief contact preview",
            keywords: ["project brief", "website brief", "dashboard brief", "internal tool"],
        }),
    },
    {
        path: "/lab",
        label: "Lab",
        title: "Archive Concept",
        priority: "archive",
        includeInNav: false,
        includeInSitemap: false,
        prerender: true,
        meta: pageMeta({
            title: "Lab Archive - Vũ Đình Dũng",
            desc:
                "Archive Signal OS cũ. Giữ lại như phòng thử nghiệm, không đại diện cho portfolio chính.",
            image: defaultImage,
            imageAlt: "Archived lab preview",
            robots: "noindex,follow",
            keywords: ["archive", "lab", "portfolio experiment"],
        }),
    },
    {
        path: "/404",
        label: "404",
        title: "Not found",
        priority: "system",
        includeInNav: false,
        includeInSitemap: false,
        prerender: true,
        meta: pageMeta({
            title: "404 - Vũ Đình Dũng",
            desc:
                "Route không tồn tại trong portfolio của Vũ Đình Dũng. Quay lại Home hoặc Work để tiếp tục.",
            image: defaultImage,
            imageAlt: "404 route preview",
            robots: "noindex,nofollow",
            keywords: ["404", "not found"],
        }),
    },
];

for (const route of baseRoutes) {
    route.meta.schema ??= webPageSchema(route.path, route.meta);
}

const workCaseRoutes = projects.map((project) => {
    const path = `/work/${project.slug}`;
    const meta = pageMeta({
        title: `${project.title} - Case Study`,
        desc: project.summary,
        image: project.socialImage ?? project.assets.cover,
        imageAlt: `${project.title} case study preview`,
        ogType: "article",
        keywords: project.seoKeywords ?? [],
    });

    meta.schema = projectSchema(project, path, meta);

    return {
        path,
        label: project.title,
        title: "Case detail",
        priority: "case",
        includeInNav: false,
        includeInSitemap: true,
        prerender: true,
        sitemapPriority: "0.7",
        meta,
    };
});

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

export function getRouteSchema(pathname) {
    return getRouteMeta(pathname).schema ?? null;
}

export function getCanonicalUrl(pathname) {
    if (!pathname || pathname === "/") return `${siteOrigin}/`;
    const normalized = pathname.endsWith("/")
        ? pathname.slice(0, -1)
        : pathname;
    return `${siteOrigin}${normalized.startsWith("/") ? normalized : `/${normalized}`}`;
}
