import { useEffect, useRef, useState } from "react";
import { cta, nav, site } from "../content/site.js";
import { Link, usePath } from "../lib/router.jsx";

// Header dính trên cùng: trong suốt ở đầu trang, mờ nền khi cuộn, tự đổi sang bản tối khi đi qua vùng data-theme="dark".
export function Header() {
    const path = usePath();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [dark, setDark] = useState(false);
    const burgerRef = useRef(null);
    const panelRef = useRef(null);

    useEffect(() => {
        let raf = 0;
        const check = () => {
            raf = 0;
            setScrolled(window.scrollY > 8);
            const probe = 36;
            const hit = [...document.querySelectorAll('[data-theme="dark"]')].some((el) => {
                const r = el.getBoundingClientRect();
                return r.top <= probe && r.bottom > probe;
            });
            setDark(hit);
        };
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(check);
        };
        check();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        const mo = new MutationObserver(onScroll);
        mo.observe(document.getElementById("root"), { childList: true, subtree: true, attributes: true, attributeFilter: ["data-theme"] });
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            mo.disconnect();
            if (raf) cancelAnimationFrame(raf);
        };
    }, [path]);

    useEffect(() => setOpen(false), [path]);

    useEffect(() => {
        if (!open) return;
        document.documentElement.classList.add("menu-open");
        panelRef.current?.querySelector("a")?.focus();
        const onKey = (e) => {
            if (e.key === "Escape") {
                setOpen(false);
                burgerRef.current?.focus();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => {
            document.documentElement.classList.remove("menu-open");
            window.removeEventListener("keydown", onKey);
        };
    }, [open]);

    const isOn = (item) => (item.match === "/" ? path === "/" : path.startsWith(item.match));
    const cls = ["nav", scrolled && "is-scrolled", (dark || open) && "is-dark", open && "is-open"].filter(Boolean).join(" ");

    return (
        <header className={cls}>
            <a className="skip" href="#main">
                Bỏ qua, tới nội dung chính
            </a>
            <div className="wrap nav-row">
                <Link href="/" className="brand">
                    <span className="brand-mark" aria-hidden="true">
                        {site.initials}
                    </span>
                    {site.name}
                </Link>
                <nav className="menu" aria-label="Điều hướng chính">
                    {nav.map((item) => (
                        <Link key={item.href} href={item.href} className={isOn(item) ? "on" : undefined} aria-current={isOn(item) ? "page" : undefined}>
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <Link href="/contact" className="btn btn-ink nav-cta">
                    {cta.short} <span aria-hidden="true">→</span>
                </Link>
                <button
                    ref={burgerRef}
                    type="button"
                    className="burger"
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    aria-label={open ? "Đóng menu" : "Mở menu"}
                    onClick={() => setOpen((v) => !v)}
                >
                    <i />
                </button>
            </div>
            <div id="mobile-menu" ref={panelRef} className="sheet" hidden={!open}>
                <nav className="wrap" aria-label="Menu di động">
                    {nav.map((item, i) => (
                        <Link key={item.href} href={item.href} className={isOn(item) ? "on" : undefined} aria-current={isOn(item) ? "page" : undefined}>
                            <span className="sheet-no">0{i + 1}</span>
                            {item.label}
                        </Link>
                    ))}
                    <Link href="/contact" className="btn btn-mint sheet-cta">
                        {cta.long} <span aria-hidden="true">→</span>
                    </Link>
                    <a className="sheet-mail" href={site.zalo} target="_blank" rel="noreferrer">
                        Zalo · {site.phone}
                    </a>
                </nav>
            </div>
        </header>
    );
}
