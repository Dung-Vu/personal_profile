import { useEffect, useRef, useState } from "react";
import { getSiteContent } from "../content/index.js";
import { localizePath, stripLocale, switchLocalePath, useLocale } from "../lib/i18n.js";
import { Link, usePath } from "../lib/router.jsx";

// Header dính trên cùng: trong suốt ở đầu trang, mờ nền khi cuộn, tự đổi sang bản tối khi đi qua vùng data-theme="dark".
export function Header() {
    const path = usePath();
    const locale = useLocale();
    const isEn = locale === "en";
    const otherLocale = isEn ? "vi" : "en";
    const { site, cta, nav, ui = {} } = getSiteContent(locale);

    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [dark, setDark] = useState(() => stripLocale(path) === "/contact");
    const headerRef = useRef(null);
    const burgerRef = useRef(null);
    const panelRef = useRef(null);

    useEffect(() => {
        let raf = 0;
        const check = () => {
            raf = 0;
            setScrolled(window.scrollY > 8);
            if (stripLocale(path) === "/contact" && window.scrollY <= 8 && document.querySelector(".page-loading")) {
                setDark(true);
                return;
            }
            const probe = 36;
            const headerEl = headerRef.current;
            const hit = [...document.querySelectorAll('[data-theme="dark"]')].some((el) => {
                if (el === headerEl || headerEl?.contains(el)) return false;
                const r = el.getBoundingClientRect();
                return r.top <= probe && r.bottom > probe;
            });
            setDark(hit);
        };
        const schedule = () => {
            if (!raf) raf = requestAnimationFrame(check);
        };
        check();
        const mountRaf = requestAnimationFrame(check);
        const mountTimer = window.setTimeout(check, 150);
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule, { passive: true });
        window.addEventListener("story:theme", schedule);
        return () => {
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
            window.removeEventListener("story:theme", schedule);
            cancelAnimationFrame(mountRaf);
            window.clearTimeout(mountTimer);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [path]);

    useEffect(() => setOpen(false), [path]);

    useEffect(() => {
        const mq = window.matchMedia("(min-width: 861px)");
        const onWide = (e) => {
            if (e.matches) setOpen(false);
        };
        if (mq.matches) setOpen(false);
        mq.addEventListener("change", onWide);
        return () => mq.removeEventListener("change", onWide);
    }, []);

    useEffect(() => {
        if (!open) return;
        document.documentElement.classList.add("menu-open");
        const behind = [...document.querySelectorAll("main, footer")];
        const prevInert = behind.map((el) => el.inert);
        behind.forEach((el) => {
            el.inert = true;
        });
        panelRef.current?.querySelector("a, button")?.focus();
        const getFocusables = () => {
            const root = headerRef.current;
            if (!root) return [];
            return [...root.querySelectorAll("a[href]:not(.skip), button:not([disabled])")].filter(
                (el) => !el.closest("[hidden]") && el.getClientRects().length > 0,
            );
        };
        const onKey = (e) => {
            if (e.key === "Escape") {
                setOpen(false);
                burgerRef.current?.focus();
                return;
            }
            if (e.key === "Tab") {
                const list = getFocusables();
                if (!list.length) return;
                const first = list[0];
                const last = list[list.length - 1];
                const active = document.activeElement;
                if (e.shiftKey) {
                    if (active === first || !headerRef.current?.contains(active)) {
                        e.preventDefault();
                        last.focus();
                    }
                } else if (active === last || !headerRef.current?.contains(active)) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        window.addEventListener("keydown", onKey);
        return () => {
            document.documentElement.classList.remove("menu-open");
            behind.forEach((el, i) => {
                el.inert = prevInert[i];
            });
            window.removeEventListener("keydown", onKey);
        };
    }, [open]);

    const close = () => setOpen(false);
    const homePath = localizePath("/", locale);
    const contactPath = localizePath("/contact", locale);
    const switchHref = switchLocalePath(path, otherLocale);

    const isOn = (item) =>
        item.match === homePath || item.match === "/"
            ? path === item.match
            : path === item.match || path.startsWith(`${item.match}/`);

    const skipLink = ui.skipLink || (isEn ? "Skip to main content" : "Bỏ qua, tới nội dung chính");
    const navAria = ui.navAria || (isEn ? "Primary navigation" : "Điều hướng chính");
    const mobileMenuAria = ui.mobileMenuAria || (isEn ? "Mobile menu" : "Menu di động");
    const openMenu = ui.openMenu || (isEn ? "Open menu" : "Mở menu");
    const closeMenu = ui.closeMenu || (isEn ? "Close menu" : "Đóng menu");
    const newTabSr = ui.newTabSr || (isEn ? " (opens in a new tab)" : " (mở tab mới)");
    const langSwitchAria = ui.langSwitchAria || (isEn ? "Chuyển sang Tiếng Việt" : "Switch to English");

    const cls = ["nav", scrolled && "is-scrolled", (dark || open) && "is-dark", open && "is-open"].filter(Boolean).join(" ");

    return (
        <header ref={headerRef} className={cls} data-theme={dark || open ? "dark" : undefined}>
            <a className="skip" href="#main" tabIndex={open ? -1 : undefined} aria-hidden={open || undefined}>
                {skipLink}
            </a>
            <div className="wrap nav-row">
                <Link href={homePath} className="brand" onClick={close}>
                    <span className="brand-mark" aria-hidden="true">
                        {site.initials}
                    </span>
                    <span className="brand-name">{site.name}</span>
                </Link>
                <nav className="menu" aria-label={navAria}>
                    {nav.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={isOn(item) ? "on" : undefined}
                            aria-current={path === item.match ? "page" : undefined}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="nav-actions">
                    <Link className="nav-lang" href={switchHref} hrefLang={otherLocale} onClick={close}>
                        {otherLocale.toUpperCase()}
                        <span className="sr-only"> — {langSwitchAria}</span>
                    </Link>
                    <Link href={contactPath} className="btn btn-ink nav-cta">
                        {cta.short} <span aria-hidden="true">→</span>
                    </Link>
                    <button
                        ref={burgerRef}
                        type="button"
                        className="burger"
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        aria-label={open ? closeMenu : openMenu}
                        onClick={() => setOpen((v) => !v)}
                    >
                        <i />
                    </button>
                </div>
            </div>
            <div id="mobile-menu" ref={panelRef} className="sheet" hidden={!open}>
                <nav className="wrap" aria-label={mobileMenuAria}>
                    {nav.map((item, i) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={isOn(item) ? "on" : undefined}
                            aria-current={path === item.match ? "page" : undefined}
                            onClick={close}
                        >
                            <span className="sheet-no">0{i + 1}</span>
                            {item.label}
                        </Link>
                    ))}
                    <Link className="sheet-lang" href={switchHref} hrefLang={otherLocale} onClick={close}>
                        <span>{isEn ? "Tiếng Việt" : "English"}</span>{" "}
                        <kbd>{otherLocale.toUpperCase()}</kbd>
                        <span className="sr-only"> — {langSwitchAria}</span>
                    </Link>
                    <Link href={contactPath} className="btn btn-mint sheet-cta" onClick={close}>
                        {cta.long} <span aria-hidden="true">→</span>
                    </Link>
                    <a className="sheet-mail" href={site.zalo} target="_blank" rel="noopener noreferrer" onClick={close}>
                        Zalo · {site.phone}
                        <span className="sr-only">{newTabSr}</span>
                    </a>
                </nav>
            </div>
        </header>
    );
}
