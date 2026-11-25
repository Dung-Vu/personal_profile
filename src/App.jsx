import { Component, Suspense, lazy, useEffect, useRef, useState } from "react";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { getProject } from "./content/projects.js";
import { applyRouteMeta } from "./lib/meta.js";
import { Link, scrollToHash, usePath } from "./lib/router.jsx";
import { getRoute } from "./routes/siteRoutes.js";

const Home = lazy(() => import("./pages/Home.jsx"));
const Work = lazy(() => import("./pages/Work.jsx"));
const CaseDetail = lazy(() => import("./pages/CaseDetail.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

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
        console.error("Lỗi hiển thị trang:", error);
    }

    render() {
        if (!this.state.hasError) return this.props.children;
        return (
            <main id="main" tabIndex={-1} className="page page-404">
                <div className="wrap">
                    <span className="label">
                        <span className="dot" />
                        Đã xảy ra lỗi
                    </span>
                    <h1 className="display nf-title">Không tải được trang này.</h1>
                    <p className="lead">
                        Có thể kết nối vừa bị gián đoạn hoặc bản mới vừa được cập nhật. Thử tải lại trang hoặc quay về trang chủ.
                    </p>
                    <div className="ctas">
                        <button type="button" className="btn btn-ink" onClick={() => window.location.reload()}>
                            Tải lại trang
                        </button>
                        <Link
                            className="btn btn-ghost"
                            href="/"
                            onClick={() => this.setState({ hasError: false })}
                        >
                            Về trang chủ <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </main>
        );
    }
}

function resolve(path) {
    if (path === "/") return <Home />;
    if (path === "/work") return <Work />;
    const m = path.match(/^\/work\/([a-z0-9-]+)$/);
    if (m && getProject(m[1])) return <CaseDetail key={m[1]} slug={m[1]} />;
    if (path === "/about") return <About />;
    if (path === "/contact") return <Contact />;
    return <NotFound />;
}

export default function App() {
    const path = usePath();
    const prevPathRef = useRef(path);
    const [announcement, setAnnouncement] = useState("");

    useEffect(() => {
        const route = getRoute(path);
        applyRouteMeta(path);
        document.documentElement.dataset.route =
            route.path === "/" ? "home" : route.path === "/404" ? "404" : route.path.split("/")[1] || "home";

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
            <ErrorBoundary resetKey={path}>
                <Suspense fallback={<div className="page-loading" aria-busy="true" />}>{resolve(path)}</Suspense>
            </ErrorBoundary>
            <Footer />
        </>
    );
}
