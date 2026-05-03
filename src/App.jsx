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
    routeLoaders
        .caseDetail()
        .then((module) => ({ default: module.CaseDetailPage })),
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
    routeLoaders
        .workflow()
        .then((module) => ({ default: module.WorkflowPage })),
);

function RouteFallback() {
    return (
        <div className="route-fallback skeleton-loader" aria-label="Loading route" role="status">
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
        title: "Vũ Đình Dũng - Web Developer & AI Workflow Builder",
        desc: "Portfolio của Vũ Đình Dũng: website, dashboard, internal tool và AI workflow cho sản phẩm vận hành thực tế.",
    },
    "/about": {
        title: "About - Vũ Đình Dũng",
        desc: "Frontend developer chuyên website, dashboard và internal tool. Làm việc theo slice nhỏ, kiểm chứng bằng build và browser QA.",
    },
    "/work": {
        title: "Case Studies - Vũ Đình Dũng",
        desc: "3 case study tiêu biểu: dashboard crypto, internal tool vận hành và workflow AI. Mỗi case có context, role, outcome và proof.",
    },
    "/work/tca-crypto-analyzer": {
        title: "TCA Crypto Analyzer — Case Study - Vũ Đình Dũng",
        desc: "Dashboard crypto market: một màn hình tập trung thay vì 5-6 tab, giúp trader đọc tín hiệu nhanh hơn.",
    },
    "/work/bonario-product-hub": {
        title: "Bonario Product Hub — Case Study - Vũ Đình Dũng",
        desc: "Internal tool kết nối Flask, React và Odoo: tìm kiếm, chỉnh sửa, đồng bộ sản phẩm trên một layout.",
    },
    "/work/ai-operator-workflow": {
        title: "AI Operator Workflow — Case Study - Vũ Đình Dũng",
        desc: "Workflow AI-assisted: vòng lặp plan → code → build → browser QA để giữ context và kiểm chứng runtime.",
    },
    "/stack": {
        title: "Stack - Vũ Đình Dũng",
        desc: "React, Vite, Flask, Odoo, GSAP và automation tool. Stack thực dụng để ship website, dashboard và internal tool.",
    },
    "/workflow": {
        title: "Workflow - Vũ Đình Dũng",
        desc: "Quy trình 4 bước: đọc bối cảnh, dựng cấu trúc, build slice, kiểm chứng runtime. Mỗi bước có deliverable cụ thể.",
    },
    "/contact": {
        title: "Contact - Vũ Đình Dũng",
        desc: "Nhận project website, dashboard, internal tool và AI workflow. Gửi brief ngắn, nhận scope MVP trong 24-48h.",
    },
    "/lab": {
        title: "Lab Archive - Vũ Đình Dũng",
        desc: "Archive concept cũ Signal OS. Không đại diện cho portfolio hiện tại. Giữ lại như phòng thí nghiệm.",
    },
};
function useRouteMeta(path) {
    useEffect(() => {
        const meta = routeMetaMap[path] || routeMetaMap["/"];
        document.title = meta.title;
        const desc = document.querySelector('meta[name="description"]');
        if (desc) desc.setAttribute("content", meta.desc);
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute("content", meta.title);
        const ogDesc = document.querySelector(
            'meta[property="og:description"]',
        );
        if (ogDesc) ogDesc.setAttribute("content", meta.desc);
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
