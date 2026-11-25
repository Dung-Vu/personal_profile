// Danh sách route + meta SEO. Dùng chung cho app, scripts/prerender.mjs và scripts/generate_sitemap.mjs.
import { projects } from "../content/projects.js";
import { site } from "../content/site.js";

export const siteOrigin = `https://${site.domain}`;

const siteName = `${site.name} — ${site.role}`;
const defaultImage = "/og/home.jpg";
const personId = `${siteOrigin}/#person`;

const absoluteUrl = (path) => (path.startsWith("http") ? path : `${siteOrigin}${path}`);

export function normalizePath(pathname = "/") {
    const clean = pathname.split(/[?#]/)[0].replace(/\/+$/, "");
    return clean || "/";
}

export function getCanonicalUrl(pathname) {
    const path = normalizePath(pathname);
    return path === "/" ? `${siteOrigin}/` : `${siteOrigin}${path}`;
}

const person = {
    "@type": "Person",
    "@id": personId,
    name: site.name,
    url: `${siteOrigin}/`,
    email: site.email,
    sameAs: [site.github],
    jobTitle: site.role,
    knowsAbout: ["Odoo", "ERP", "Internal tools", "Automation", "AI agents"],
};

const personRef = { "@id": personId };

function webPage(path, meta, type = "WebPage", extra = {}) {
    return {
        "@context": "https://schema.org",
        "@type": type,
        name: meta.title,
        description: meta.desc,
        url: getCanonicalUrl(path),
        inLanguage: "vi",
        isPartOf: { "@type": "WebSite", name: siteName, url: `${siteOrigin}/` },
        author: person,
        ...extra,
    };
}

function projectArticle(p, full) {
    const url = getCanonicalUrl(`/work/${p.slug}`);
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: `${p.name} — ${p.line}`,
        description: full.desc,
        url,
        image: full.image,
        inLanguage: "vi",
        author: person,
        publisher: person,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        about: p.modules,
    };
}

function projectBreadcrumb(p) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Trang chủ", item: `${siteOrigin}/` },
            { "@type": "ListItem", position: 2, name: "Dự án", item: `${siteOrigin}/work` },
            { "@type": "ListItem", position: 3, name: p.name, item: getCanonicalUrl(`/work/${p.slug}`) },
        ],
    };
}

function route(path, meta, extra = {}) {
    const full = { image: defaultImage, imageAlt: siteName, ogType: "website", robots: "index,follow", ...meta };
    full.image = absoluteUrl(full.image);
    full.schema = typeof full.schema === "function" ? full.schema(full) : (full.schema ?? [webPage(path, full)]);
    return { path, meta: full, includeInSitemap: true, sitemapPriority: "0.7", ...extra };
}

const homeDesc =
    "Vũ Đình Dũng — dựng hệ thống vận hành cho doanh nghiệp: Odoo, ERP theo ngành, phần mềm web thay Excel, bot nhắc việc và tự động hoá bằng AI.";

export const siteRoutes = [
    route(
        "/",
        {
            title: `${site.name} — Odoo, phần mềm nội bộ, tự động hoá bằng AI`,
            desc: homeDesc,
            ogType: "profile",
            schema: [
                { "@context": "https://schema.org", ...person },
                webPage("/", { title: siteName, desc: homeDesc }, "ProfilePage", {
                    mainEntity: personRef,
                    author: personRef,
                }),
            ],
        },
        { entry: "src/pages/Home.jsx", sitemapPriority: "1.0" },
    ),
    route(
        "/work",
        {
            title: `Dự án — ${site.name}`,
            desc: "Những hệ thống đang chạy thật mỗi ngày: Odoo, ERP cho chuỗi showroom xe điện, phần mềm ra tem, bot nhắc việc Zalo, hệ dữ liệu thời gian thực và đội trợ lý AI.",
        },
        { entry: "src/pages/Work.jsx", sitemapPriority: "0.9" },
    ),
    ...projects.map((p) =>
        route(
            `/work/${p.slug}`,
            {
                title: `${p.name} — ${p.line} · ${site.name}`,
                desc: `${p.subtitle} Bài toán, cách làm và kết quả đo được.`,
                ogType: "article",
                image: `/og/${p.slug}.jpg`,
                imageAlt: `${p.name} — ${p.line}`,
                schema: (full) => [projectArticle(p, full), projectBreadcrumb(p)],
            },
            { entry: "src/pages/CaseDetail.jsx", sitemapPriority: "0.8" },
        ),
    ),
    route(
        "/about",
        {
            title: `Cách làm — ${site.name}`,
            desc: "Đọc quy trình thật trước, rồi mới viết code. Nguyên tắc làm việc, chặng đường và bộ công cụ của Vũ Đình Dũng.",
        },
        { entry: "src/pages/About.jsx" },
    ),
    route(
        "/contact",
        {
            title: `Liên hệ — ${site.name}`,
            desc: "Có một quy trình đang làm bằng tay? Nhắn Zalo hoặc gửi yêu cầu 4 ý, trả lời trong 1 ngày làm việc, khảo sát 30–60 phút miễn phí. Cách hợp tác và cách giữ an toàn dữ liệu.",
        },
        { entry: "src/pages/Contact.jsx" },
    ),
    route(
        "/404",
        {
            title: `Không tìm thấy trang — ${site.name}`,
            desc: "Trang này không tồn tại. Quay về trang chủ hoặc xem các dự án.",
            robots: "noindex,follow",
        },
        { entry: "src/pages/NotFound.jsx", includeInSitemap: false },
    ),
];

const routeMap = Object.fromEntries(siteRoutes.map((r) => [r.path, r]));

export const ROUTE_MODULES = Object.fromEntries(siteRoutes.map((r) => [r.path, r.entry]));
export const sitemapRoutes = siteRoutes.filter((r) => r.includeInSitemap);
export const prerenderRoutes = siteRoutes.map((r) => r.path);

export function getRoute(pathname) {
    return routeMap[normalizePath(pathname)] ?? routeMap["/404"];
}
export const getRouteMeta = (pathname) => getRoute(pathname).meta;
export const getRouteSchema = (pathname) => getRoute(pathname).meta.schema;
