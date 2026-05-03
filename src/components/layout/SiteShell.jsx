import { ArrowRight, ArrowUpRight, Mail, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { routes } from "../../routes/routes";
import { navigateTo } from "../../hooks/useRoutePath";
import { profile } from "../../profileData";

function NavLink({ route, currentPath, onNavigate }) {
    const isActive =
        currentPath === route.path ||
        (route.path === "/work" && currentPath.startsWith("/work/"));

    return (
        <a
            className={isActive ? "site-nav-link active" : "site-nav-link"}
            href={route.path}
            aria-current={isActive ? "page" : undefined}
            data-priority={route.priority}
            onClick={(event) => {
                event.preventDefault();
                onNavigate(route.path);
            }}
        >
            <span>{route.label}</span>
            <small>{route.title}</small>
        </a>
    );
}

export function SiteShell({ children, currentPath }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const isLightPage = currentPath === "/";

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const goTo = (path) => {
        setMenuOpen(false);
        navigateTo(path);
    };

    useEffect(() => {
        document.body.classList.toggle("route-menu-open", menuOpen);
        return () => document.body.classList.remove("route-menu-open");
    }, [menuOpen]);

    return (
        <div
            className="site-shell"
            data-route={currentPath.replace("/", "") || "home"}
            data-theme="light"
        >
            <a href="#main-content" className="skip-link">
                Bỏ qua điều hướng
            </a>
            {!isLightPage && (
                <div className="site-atmosphere" aria-hidden="true" />
            )}
            <header className={`site-topbar ${scrolled ? "scrolled" : ""}`}>
                <a
                    className="site-brand"
                    href="/"
                    onClick={(event) => {
                        event.preventDefault();
                        goTo("/");
                    }}
                >
                    <span className="site-brand-mark">VD</span>
                    <span>
                        <strong>{profile.name}</strong>
                        <small>Portfolio</small>
                    </span>
                </a>

                <nav
                    className={menuOpen ? "site-nav open" : "site-nav"}
                    aria-label="Primary navigation"
                >
                    {routes
                        .filter((route) => route.priority !== "archive")
                        .map((route) => (
                            <NavLink
                                key={route.path}
                                route={route}
                                currentPath={currentPath}
                                onNavigate={goTo}
                            />
                        ))}
                </nav>

                <button
                    className="site-menu-toggle"
                    type="button"
                    aria-label={
                        menuOpen ? "Close navigation" : "Open navigation"
                    }
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    {menuOpen ? (
                        <X aria-hidden="true" />
                    ) : (
                        <Menu aria-hidden="true" />
                    )}
                </button>
            </header>

            <main className="route-main" id="main-content">
                {children}
            </main>

            <footer className="route-footer">
                <div className="route-footer-copy">
                    <span>Available for focused builds</span>
                    <strong>{profile.focus}</strong>
                    <p>
                        Website, dashboard, internal tool và workflow AI cần
                        scope rõ, build nhanh, kiểm chứng được.
                    </p>
                </div>
                <div className="route-footer-links">
                    <a
                        className="footer-primary-link"
                        href={`mailto:${profile.email}`}
                    >
                        <Mail aria-hidden="true" /> Email me{" "}
                        <ArrowRight aria-hidden="true" />
                    </a>
                    <a
                        href={profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub <ArrowUpRight aria-hidden="true" />
                    </a>
                    <a
                        href="/lab"
                        onClick={(event) => {
                            event.preventDefault();
                            goTo("/lab");
                        }}
                    >
                        Lab archive
                    </a>
                </div>
            </footer>
        </div>
    );
}
