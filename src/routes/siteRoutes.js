// Danh sách 21 route song ngữ (10 VI + 10 EN + /404) + meta SEO + hreflang + JSON-LD.
// Dùng chung cho app, scripts/prerender.mjs và scripts/generate_sitemap.mjs.
import { getProjectsContent, getSiteContent } from "../content/index.js";

const viSite = getSiteContent("vi").site;
const enSite = getSiteContent("en").site;
const viProjects = getProjectsContent("vi").projects;
const enProjects = getProjectsContent("en").projects;

export const siteOrigin = `https://${viSite.domain}`;

const viSiteName = `${viSite.name} — ${viSite.role}`;
const enSiteName = `${enSite.name} — ${enSite.role}`;
const defaultImage = "/og/home.jpg";
const personId = `${siteOrigin}/#person`;

const absoluteUrl = (path) => (path.startsWith("http") ? path : `${siteOrigin}${path}`);

export function normalizePath(pathname = "/") {
    const clean = String(pathname || "/").split(/[?#]/)[0].replace(/\/+$/, "");
    return clean || "/";
}

export function getCanonicalUrl(pathname) {
    const path = normalizePath(pathname);
    return path === "/" ? `${siteOrigin}/` : `${siteOrigin}${path}`;
}

function alternatesFor(viPath) {
    const clean = normalizePath(viPath);
    const enPath = clean === "/" ? "/en" : `/en${clean}`;
    return {
        vi: getCanonicalUrl(clean),
        en: getCanonicalUrl(enPath),
        xDefault: getCanonicalUrl(clean),
    };
}

function buildPerson(locale = "vi") {
    const s = locale === "en" ? enSite : viSite;
    return {
        "@type": "Person",
        "@id": personId,
        name: s.name,
        url: `${siteOrigin}/`,
        email: s.email,
        sameAs: [s.github],
        jobTitle: s.role,
        knowsAbout: ["Odoo", "ERP", "Internal tools", "Automation", "AI agents"],
    };
}

const personRef = { "@id": personId };

function webPage(path, meta, locale = "vi", type = "WebPage", extra = {}) {
    const siteName = locale === "en" ? enSiteName : viSiteName;
    return {
        "@context": "https://schema.org",
        "@type": type,
        name: meta.title,
        description: meta.desc,
        url: getCanonicalUrl(path),
        inLanguage: locale,
        isPartOf: { "@type": "WebSite", name: siteName, url: `${siteOrigin}/` },
        author: buildPerson(locale),
        ...extra,
    };
}

function projectArticle(p, full, locale, routePath) {
    const url = getCanonicalUrl(routePath);
    const author = buildPerson(locale);
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: `${p.name} — ${p.line}`,
        description: full.desc,
        url,
        image: full.image,
        inLanguage: locale,
        author,
        publisher: author,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        about: p.modules,
    };
}

function projectBreadcrumb(p, locale, routePath) {
    const isEn = locale === "en";
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: isEn ? "Home" : "Trang chủ",
                item: getCanonicalUrl(isEn ? "/en" : "/"),
            },
            {
                "@type": "ListItem",
                position: 2,
                name: isEn ? "Work" : "Dự án",
                item: getCanonicalUrl(isEn ? "/en/work" : "/work"),
            },
            {
                "@type": "ListItem",
                position: 3,
                name: p.name,
                item: getCanonicalUrl(routePath),
            },
        ],
    };
}

function route(path, meta, extra = {}) {
    const lang = meta.lang || "vi";
    const ogLocale = meta.ogLocale || (lang === "en" ? "en_US" : "vi_VN");
    const defaultSiteName = lang === "en" ? enSiteName : viSiteName;
    const full = {
        image: defaultImage,
        imageAlt: defaultSiteName,
        siteName: defaultSiteName,
        ogType: "website",
        robots: "index,follow",
        lang,
        ogLocale,
        alternates: null,
        ...meta,
    };
    full.image = absoluteUrl(full.image);
    full.schema = typeof full.schema === "function" ? full.schema(full) : (full.schema ?? [webPage(path, full, lang)]);
    return { path, meta: full, includeInSitemap: true, sitemapPriority: "0.7", ...extra };
}

const viHomeDesc =
    `${viSite.name} — dựng hệ thống vận hành cho doanh nghiệp: Odoo, ERP theo ngành, phần mềm web thay Excel, bot nhắc việc và tự động hoá bằng AI.`;
const enHomeDesc =
    `${enSite.name} — operations systems builder: Odoo, vertical ERP, web apps replacing Excel, chat reminder bots, and AI workflow automation.`;

const viRoutes = [
    route(
        "/",
        {
            lang: "vi",
            ogLocale: "vi_VN",
            title: `${viSite.name} — Odoo, phần mềm nội bộ, tự động hoá bằng AI`,
            desc: viHomeDesc,
            ogType: "profile",
            alternates: alternatesFor("/"),
            schema: [
                { "@context": "https://schema.org", ...buildPerson("vi") },
                webPage("/", { title: viSiteName, desc: viHomeDesc }, "vi", "ProfilePage", {
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
            lang: "vi",
            ogLocale: "vi_VN",
            title: `Dự án — ${viSite.name}`,
            desc: "Những hệ thống đang chạy thật mỗi ngày: Odoo, ERP cho chuỗi showroom xe điện, phần mềm ra tem, bot nhắc việc Zalo, hệ dữ liệu thời gian thực và đội trợ lý AI.",
            alternates: alternatesFor("/work"),
        },
        { entry: "src/pages/Work.jsx", sitemapPriority: "0.9" },
    ),
    ...viProjects.map((p) => {
        const routePath = `/work/${p.slug}`;
        return route(
            routePath,
            {
                lang: "vi",
                ogLocale: "vi_VN",
                title: `${p.name} — ${p.line} · ${viSite.name}`,
                desc: `${p.subtitle} Bài toán, cách làm và kết quả đo được.`,
                ogType: "article",
                image: `/og/${p.slug}.jpg`,
                imageAlt: `${p.name} — ${p.line}`,
                alternates: alternatesFor(routePath),
                schema: (full) => [projectArticle(p, full, "vi", routePath), projectBreadcrumb(p, "vi", routePath)],
            },
            { entry: "src/pages/CaseDetail.jsx", sitemapPriority: "0.8" },
        );
    }),
    route(
        "/about",
        {
            lang: "vi",
            ogLocale: "vi_VN",
            title: `Cách làm — ${viSite.name}`,
            desc: "Đọc quy trình thật trước, rồi mới viết code. Nguyên tắc làm việc, chặng đường và bộ công cụ của Vũ Đình Dũng.",
            alternates: alternatesFor("/about"),
        },
        { entry: "src/pages/About.jsx" },
    ),
    route(
        "/contact",
        {
            lang: "vi",
            ogLocale: "vi_VN",
            title: `Liên hệ — ${viSite.name}`,
            desc: "Có một quy trình đang làm bằng tay? Khảo sát 60 giây hoặc gửi yêu cầu 4 ý trực tiếp, trả lời trong 1 ngày làm việc, khảo sát 30–60 phút miễn phí.",
            alternates: alternatesFor("/contact"),
        },
        { entry: "src/pages/Contact.jsx" },
    ),
];

const enRoutes = [
    route(
        "/en",
        {
            lang: "en",
            ogLocale: "en_US",
            title: `${enSite.name} — Odoo, Internal Tools & AI Automation`,
            desc: enHomeDesc,
            ogType: "profile",
            alternates: alternatesFor("/"),
            schema: [
                { "@context": "https://schema.org", ...buildPerson("en") },
                webPage("/en", { title: enSiteName, desc: enHomeDesc }, "en", "ProfilePage", {
                    mainEntity: personRef,
                    author: personRef,
                }),
            ],
        },
        { entry: "src/pages/Home.jsx", sitemapPriority: "1.0" },
    ),
    route(
        "/en/work",
        {
            lang: "en",
            ogLocale: "en_US",
            title: `Work — ${enSite.name}`,
            desc: "Production systems running daily: Odoo, EV showroom ERP, curtain cutting & label web app, Zalo reminder bot, real-time data pipeline, and multi-agent AI ops.",
            alternates: alternatesFor("/work"),
        },
        { entry: "src/pages/Work.jsx", sitemapPriority: "0.9" },
    ),
    ...enProjects.map((p) => {
        const viPath = `/work/${p.slug}`;
        const routePath = `/en/work/${p.slug}`;
        return route(
            routePath,
            {
                lang: "en",
                ogLocale: "en_US",
                title: `${p.name} — ${p.line} · ${enSite.name}`,
                desc: `${p.subtitle} Problem, approach, and measurable results.`,
                ogType: "article",
                image: `/og/${p.slug}.jpg`,
                imageAlt: `${p.name} — ${p.line}`,
                alternates: alternatesFor(viPath),
                schema: (full) => [projectArticle(p, full, "en", routePath), projectBreadcrumb(p, "en", routePath)],
            },
            { entry: "src/pages/CaseDetail.jsx", sitemapPriority: "0.8" },
        );
    }),
    route(
        "/en/about",
        {
            lang: "en",
            ogLocale: "en_US",
            title: `How I Work — ${enSite.name}`,
            desc: `Read the real workflow first, then write code. Working principles, background, and toolbox of ${enSite.name}.`,
            alternates: alternatesFor("/about"),
        },
        { entry: "src/pages/About.jsx" },
    ),
    route(
        "/en/contact",
        {
            lang: "en",
            ogLocale: "en_US",
            title: `Contact — ${enSite.name}`,
            desc: "Have a manual workflow slowing the team down? Run the 60-second ops diagnostic or send a 4-point brief — reply within 1 business day, free 30–60 min workflow walkthrough.",
            alternates: alternatesFor("/contact"),
        },
        { entry: "src/pages/Contact.jsx" },
    ),
];

const notFoundRoute = route(
    "/404",
    {
        lang: "vi",
        ogLocale: "vi_VN",
        title: `Không tìm thấy trang — ${viSite.name}`,
        desc: "Trang này không tồn tại. Quay về trang chủ hoặc xem các dự án.",
        robots: "noindex,follow",
        alternates: null,
    },
    { entry: "src/pages/NotFound.jsx", includeInSitemap: false },
);

export const siteRoutes = [...viRoutes, ...enRoutes, notFoundRoute];

const routeMap = Object.fromEntries(siteRoutes.map((r) => [r.path, r]));

export const ROUTE_MODULES = Object.fromEntries(siteRoutes.map((r) => [r.path, r.entry]));
export const sitemapRoutes = siteRoutes.filter((r) => r.includeInSitemap);
export const prerenderRoutes = siteRoutes.map((r) => r.path);

export function getRoute(pathname) {
    return routeMap[normalizePath(pathname)] ?? routeMap["/404"];
}
export const getRouteMeta = (pathname) => getRoute(pathname).meta;
export const getRouteSchema = (pathname) => getRoute(pathname).meta.schema;
