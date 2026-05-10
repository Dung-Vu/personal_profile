import {
    Suspense,
    lazy,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import { SiteShell } from "./components/layout/SiteShell";
import { useRoutePath } from "./hooks/useRoutePath";
import { NotFoundPage } from "./pages/NotFoundPage";
import { getCanonicalUrl, getRouteMeta, getRouteSchema } from "./routes/siteRoutes";

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

function RouteContent({ path, onReady }) {
    useEffect(() => {
        onReady();
    }, [onReady, path]);

    return <CurrentRoute path={path} />;
}

function setMetaContent(selector, value) {
    const node = document.querySelector(selector);
    if (node) node.setAttribute("content", value);
}

function setLinkHref(selector, value) {
    const node = document.querySelector(selector);
    if (node) node.setAttribute("href", value);
}

function setScriptJson(id, value) {
    const existing = document.getElementById(id);
    if (!value) {
        if (existing) existing.remove();
        return;
    }

    const nextValue = Array.isArray(value) ? value : [value];
    const script = existing ?? document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(nextValue.length === 1 ? nextValue[0] : nextValue);

    if (!existing) {
        document.head.appendChild(script);
    }
}

function useRouteMeta(path) {
    useEffect(() => {
        const meta = getRouteMeta(path);
        const schema = getRouteSchema(path);
        const canonicalUrl = getCanonicalUrl(path);

        document.title = meta.title;
        setMetaContent('meta[name="description"]', meta.desc);
        setMetaContent('meta[name="keywords"]', meta.keywords.join(", "));
        setMetaContent('meta[name="robots"]', meta.robots ?? "index,follow");
        setMetaContent('meta[name="author"]', "Vũ Đình Dũng");
        setMetaContent('meta[property="og:type"]', meta.ogType ?? "website");
        setMetaContent('meta[property="og:site_name"]', "Vũ Đình Dũng Portfolio");
        setMetaContent('meta[property="og:locale"]', "vi_VN");
        setMetaContent('meta[property="og:title"]', meta.title);
        setMetaContent('meta[property="og:description"]', meta.desc);
        setMetaContent('meta[property="og:image"]', meta.image);
        setMetaContent('meta[property="og:image:alt"]', meta.imageAlt);
        setMetaContent('meta[name="twitter:card"]', "summary_large_image");
        setMetaContent('meta[name="twitter:title"]', meta.title);
        setMetaContent('meta[name="twitter:description"]', meta.desc);
        setMetaContent('meta[name="twitter:image"]', meta.image);
        setMetaContent('meta[name="twitter:image:alt"]', meta.imageAlt);
        setMetaContent('meta[property="og:url"]', canonicalUrl);
        setLinkHref('link[rel="canonical"]', canonicalUrl);
        setScriptJson("route-structured-data", schema);
    }, [path]);
}

export function App() {
    const currentPath = useRoutePath();
    const previousPathRef = useRef(currentPath);
    const [pageReady, setPageReady] = useState(false);
    useRouteMeta(currentPath);

    useLayoutEffect(() => {
        setPageReady(false);
    }, [currentPath]);

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
            const main = document.getElementById("main-content");
            if (main) {
                main.focus({ preventScroll: true });
                return true;
            }
            return false;
        };

        if (previousPathRef.current === currentPath) {
            return undefined;
        }

        previousPathRef.current = currentPath;

        if (!attemptFocus()) {
            const timer = window.setTimeout(attemptFocus, 150);
            return () => window.clearTimeout(timer);
        }

        return undefined;
    }, [currentPath]);

    if (currentPath === "/lab") {
        return (
            <Suspense fallback={<RouteFallback />}>
                <LabPage />
            </Suspense>
        );
    }

    return (
        <SiteShell currentPath={currentPath} pageReady={pageReady}>
            <Suspense fallback={<RouteFallback />}>
                <RouteContent path={currentPath} onReady={() => setPageReady(true)} />
            </Suspense>
        </SiteShell>
    );
}
