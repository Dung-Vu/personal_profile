import { Component, Suspense, lazy, useEffect, useRef, useState } from "react";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { PrintSummary } from "./components/PrintSummary.jsx";
import { getProjectsContent, getSiteContent } from "./content/index.js";
import { localizePath, stripLocale, useLocale } from "./lib/i18n.js";
import { applyRouteMeta } from "./lib/meta.js";
import { Link, scrollToHash, usePath } from "./lib/router.jsx";
import { getRoute } from "./routes/siteRoutes.js";

const Home = lazy(() => import("./pages/Home.jsx"));
const Work = lazy(() => import("./pages/Work.jsx"));
const CaseDetail = lazy(() => import("./pages/CaseDetail.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

const FALLBACK_ERROR_UI = {
    vi: {
        label: "Đã xảy ra lỗi",
        title: "Không tải được trang này.",
        lead: "Có thể kết nối vừa bị gián đoạn hoặc bản mới vừa được cập nhật. Thử tải lại trang hoặc quay về trang chủ.",
        reloadBtn: "Tải lại trang",
        homeBtn: "Về trang chủ",
    },
    en: {
        label: "Something went wrong",
        title: "Could not load this page.",
        lead: "Your connection may have dropped or a new version was just deployed. Try reloading or return home.",
        reloadBtn: "Reload page",
        homeBtn: "Back to home",
    },
};

class ErrorBoundary extends Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidUpdate(prevProps) {
        if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
            this.setState({ hasError: false });
        }
    }

    componentDidCatch(error) {
        console.error("Page render error:", error);
    }

    render() {
        if (!this.state.hasError) return this.props.children;
        const locale = this.props.locale === "en" ? "en" : "vi";
        const eb = getSiteContent(locale)?.ui?.errorBoundary ?? FALLBACK_ERROR_UI[locale];
        return (
            <main id="main" tabIndex={-1} className="page page-404">
                <div className="wrap">
                    <span className="label">
                        <span className="dot" />
                        {eb.label}
                    </span>
                    <h1 className="display nf-title">{eb.title}</h1>
                    <p className="lead">{eb.lead}</p>
                    <div className="ctas">
                        <button type="button" className="btn btn-ink" onClick={() => window.location.reload()}>
                            {eb.reloadBtn}
                        </button>
                        <Link
                            className="btn btn-ghost"
                            href={localizePath("/", locale)}
                            onClick={() => this.setState({ hasError: false })}
                        >
                            {eb.homeBtn} <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </main>
        );
    }
}

function resolve(path, locale) {
    const base = stripLocale(path);
    if (base === "/") return <Home />;
    if (base === "/work") return <Work />;
    const m = base.match(/^\/work\/([a-z0-9-]+)$/);
    if (m && getProjectsContent(locale).getProject(m[1])) {
        return <CaseDetail key={m[1]} slug={m[1]} />;
    }
    if (base === "/about") return <About />;
    if (base === "/contact") return <Contact />;
    return <NotFound />;
}

export default function App() {
    const path = usePath();
    const locale = useLocale();
    const prevPathRef = useRef(path);
    const [announcement, setAnnouncement] = useState("");

    useEffect(() => {
        const route = getRoute(path);
        applyRouteMeta(path);
        const baseRoute = stripLocale(route.path);
        document.documentElement.dataset.route =
            baseRoute === "/" ? "home" : baseRoute === "/404" ? "404" : baseRoute.split("/")[1] || "home";

        if (prevPathRef.current === path) return;
        prevPathRef.current = path;
        setAnnouncement(route.meta.title);

        let raf = 0;
        let tries = 30;
        const focusMain = () => {
            const main = document.getElementById("main");
            if (main) {
                main.focus({ preventScroll: true });
                return;
            }
            if (tries-- > 0) raf = requestAnimationFrame(focusMain);
        };
        raf = requestAnimationFrame(focusMain);
        return () => cancelAnimationFrame(raf);
    }, [path]);

    useEffect(() => {
        if (window.location.hash) scrollToHash(window.location.hash);
    }, []);

    return (
        <>
            <Header />
            <div className="sr-only" aria-live="polite" aria-atomic="true">
                {announcement}
            </div>
            <ErrorBoundary resetKey={path} locale={locale}>
                <Suspense fallback={<div className="page-loading" aria-busy="true" />}>{resolve(path, locale)}</Suspense>
            </ErrorBoundary>
            <Footer />
            <PrintSummary locale={locale} />
        </>
    );
}
