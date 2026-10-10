import { Suspense, lazy, useEffect } from "react";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { applyRouteMeta } from "./lib/meta.js";
import { scrollToHash, usePath } from "./lib/router.jsx";
import Home from "./pages/Home.jsx";

const Work = lazy(() => import("./pages/Work.jsx"));
const CaseDetail = lazy(() => import("./pages/CaseDetail.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

function resolve(path) {
    if (path === "/") return <Home />;
    if (path === "/work") return <Work />;
    const m = path.match(/^\/work\/([a-z0-9-]+)$/);
    if (m) return <CaseDetail slug={m[1]} />;
    if (path === "/about") return <About />;
    if (path === "/contact") return <Contact />;
    return <NotFound />;
}

export default function App() {
    const path = usePath();

    useEffect(() => {
        applyRouteMeta(path);
        document.documentElement.dataset.route = path === "/" ? "home" : path.split("/")[1] || "home";
    }, [path]);

    useEffect(() => {
        if (window.location.hash) scrollToHash(window.location.hash);
    }, []);

    return (
        <>
            <Header />
            <Suspense fallback={<div className="page-loading" aria-busy="true" />}>{resolve(path)}</Suspense>
            <Footer />
        </>
    );
}
