import { Suspense, lazy, useEffect } from "react";
import { SiteShell } from "./components/layout/SiteShell";
import { useRoutePath } from "./hooks/useRoutePath";
import { NotFoundPage } from "./pages/NotFoundPage";

const routeLoaders = {
    home: () => import("./pages/HomePage"),
    about: () => import("./pages/AboutPage"),
    caseDetail: () => import("./pages/CaseDetailPage"),
    contact: () => import("./pages/ContactPage"),
    lab: () => import("./pages/LabPage"),
    stack: () => import("./pages/StackPage"),
    work: () => import("./pages/WorkPage"),
    workflow: () => import("./pages/WorkflowPage"),
};

const HomePage = lazy(() =>
    routeLoaders.home().then((module) => ({ default: module.HomePage })),
);
const AboutPage = lazy(() =>
    routeLoaders.about().then((module) => ({ default: module.AboutPage })),
);
const CaseDetailPage = lazy(() =>
    routeLoaders.caseDetail().then((module) => ({ default: module.CaseDetailPage })),
);
const ContactPage = lazy(() =>
    routeLoaders.contact().then((module) => ({ default: module.ContactPage })),
);
const LabPage = lazy(() =>
    routeLoaders.lab().then((module) => ({ default: module.LabPage })),
);
const StackPage = lazy(() =>
    routeLoaders.stack().then((module) => ({ default: module.StackPage })),
);
const WorkPage = lazy(() =>
    routeLoaders.work().then((module) => ({ default: module.WorkPage })),
);
const WorkflowPage = lazy(() =>
    routeLoaders.workflow().then((module) => ({ default: module.WorkflowPage })),
);

function RouteFallback() {
    return (
        <div
            className="route-fallback skeleton-loader"
            aria-label="Loading route"
            role="status"
        >
            <div className="skeleton-hero">
                <div className="skeleton-kicker" />
                <div className="skeleton-title" />
                <div className="skeleton-title short" />
                <div className="skeleton-body" />
                <div className="skeleton-body short" />
            </div>
        </div>
    );
}

function warmLikelyRoutes(path) {
    if (path === "/") {
        routeLoaders.about();
        routeLoaders.work();
        routeLoaders.contact();
        return;
    }

    if (path === "/work") {
        routeLoaders.caseDetail();
    }
}

function CurrentRoute({ path }) {
    if (path.startsWith("/work/")) {
        return <CaseDetailPage slug={path.replace("/work/", "")} />;
    }

    switch (path) {
        case "/about":
            return <AboutPage />;
        case "/work":
            return <WorkPage />;
        case "/stack":
            return <StackPage />;
        case "/workflow":
            return <WorkflowPage />;
        case "/contact":
            return <ContactPage />;
        case "/lab":
            return <LabPage />;
        case "/404":
            return <NotFoundPage />;
        case "/":
        default:
            return <HomePage />;
    }
}

const routeMetaMap = {
    "/": {
        title: "Vũ Đình Dũng - Web apps, dashboards, internal tools",
        desc: "Portfolio của Vũ Đình Dũng: web app, dashboard, internal tool và AI workflow có flow rõ, state rõ và runtime có thể kiểm chứng.",
    },
    "/about": {
        title: "About - Vũ Đình Dũng",
        desc: "Frontend developer cho website, dashboard và internal tool. Làm việc theo slice nhỏ, kiểm chứng bằng build và browser QA.",
    },
    "/work": {
        title: "Work - Vũ Đình Dũng",
        desc: "3 case study chính: TCA Crypto Analyzer, Bonario Product Hub và AI Operator Workflow. Mỗi case có context, quyết định và proof.",
    },
    "/work/tca-crypto-analyzer": {
        title: "TCA Crypto Analyzer - Case Study",
        desc: "Dashboard crypto market tập trung vào đọc nhanh tín hiệu, chart context và hierarchy rõ để trader ra quyết định nhanh hơn.",
    },
    "/work/bonario-product-hub": {
        title: "Bonario Product Hub - Case Study",
        desc: "Internal tool nối React, Flask và Odoo để tìm kiếm, chỉnh sửa và đồng bộ sản phẩm trên một layout duy nhất.",
    },
    "/work/ai-operator-workflow": {
        title: "AI Operator Workflow - Case Study",
        desc: "Workflow AI-assisted với vòng lặp plan, code, build và browser QA để giữ context và kiểm chứng runtime.",
    },
    "/stack": {
        title: "Stack - Vũ Đình Dũng",
        desc: "React, Vite, Flask, Odoo, GSAP và automation tools dùng để ship website, dashboard và internal tool.",
    },
    "/workflow": {
        title: "Workflow - Vũ Đình Dũng",
        desc: "Quy trình 4 bước từ đọc bối cảnh đến verify runtime. Mỗi bước có deliverable cụ thể.",
    },
    "/contact": {
        title: "Contact - Vũ Đình Dũng",
        desc: "Gửi brief ngắn để chốt scope MVP cho website, dashboard, internal tool hoặc AI workflow.",
    },
    "/lab": {
        title: "Lab Archive - Vũ Đình Dũng",
        desc: "Archive Signal OS cũ. Giữ lại như phòng thử nghiệm, không đại diện cho portfolio chính.",
    },
};

const siteOrigin = "https://dinhdung.dev";

function setMetaContent(selector, value) {
    const node = document.querySelector(selector);
    if (node) node.setAttribute("content", value);
}

function setLinkHref(selector, value) {
    const node = document.querySelector(selector);
    if (node) node.setAttribute("href", value);
}

function useRouteMeta(path) {
    useEffect(() => {
        const meta = routeMetaMap[path] || routeMetaMap["/"];
        const canonicalPath = path === "/" ? "/" : path;
        const canonicalUrl = `${siteOrigin}${canonicalPath}`;

        document.title = meta.title;
        setMetaContent('meta[name="description"]', meta.desc);
        setMetaContent('meta[property="og:title"]', meta.title);
        setMetaContent('meta[property="og:description"]', meta.desc);
        setMetaContent('meta[property="og:url"]', canonicalUrl);
        setMetaContent('meta[name="twitter:title"]', meta.title);
        setMetaContent('meta[name="twitter:description"]', meta.desc);
        setLinkHref('link[rel="canonical"]', canonicalUrl);
    }, [path]);
}

export function App() {
    const currentPath = useRoutePath();
    useRouteMeta(currentPath);

    useEffect(() => {
        const idleId = window.requestIdleCallback
            ? window.requestIdleCallback(() => warmLikelyRoutes(currentPath), {
                  timeout: 1400,
              })
            : window.setTimeout(() => warmLikelyRoutes(currentPath), 500);

        return () => {
            if (window.requestIdleCallback) {
                window.cancelIdleCallback(idleId);
            } else {
                window.clearTimeout(idleId);
            }
        };
    }, [currentPath]);

    useEffect(() => {
        const attemptFocus = () => {
            const heading = document.querySelector("h1[id]");
            if (heading) {
                heading.setAttribute("tabindex", "-1");
                heading.focus({ preventScroll: true });
                return true;
            }
            return false;
        };
        if (!attemptFocus()) {
            const timer = window.setTimeout(attemptFocus, 150);
            return () => window.clearTimeout(timer);
        }
    }, [currentPath]);

    if (currentPath === "/lab") {
        return (
            <Suspense fallback={<RouteFallback />}>
                <LabPage />
            </Suspense>
        );
    }

    return (
        <SiteShell currentPath={currentPath}>
            <Suspense fallback={<RouteFallback />}>
                <CurrentRoute path={currentPath} />
            </Suspense>
        </SiteShell>
    );
}
