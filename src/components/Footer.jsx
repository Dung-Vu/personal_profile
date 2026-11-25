import { getSiteContent } from "../content/index.js";
import { localizePath, switchLocalePath, useLocale } from "../lib/i18n.js";
import { Link, usePath } from "../lib/router.jsx";

export function Footer() {
    const path = usePath();
    const locale = useLocale();
    const isEn = locale === "en";
    const otherLocale = isEn ? "vi" : "en";
    const { site, nav, ui = {} } = getSiteContent(locale);

    const workHref = localizePath("/work", locale);
    const aboutHref = localizePath("/about", locale);
    const contactHref = localizePath("/contact", locale);
    const switchHref = switchLocalePath(path, otherLocale);

    const findNavLabel = (targetHref, fallback) => nav.find((item) => item.href === targetHref)?.label || fallback;
    const workLabel = findNavLabel(workHref, isEn ? "Work" : "Dự án");
    const aboutLabel = findNavLabel(aboutHref, isEn ? "Approach" : "Cách làm");
    const contactLabel = findNavLabel(contactHref, isEn ? "Contact" : "Liên hệ");
    const langSwitchAria = ui.langSwitchAria || (isEn ? "Chuyển sang Tiếng Việt" : "Switch to English");
    const footerNavAria = ui.footer?.navAria || (isEn ? "Footer links" : "Liên kết cuối trang");

    return (
        <footer className="footer" data-theme="dark">
            <div className="wrap footer-row">
                <div className="footer-meta">
                    <span>
                        © {site.year} {site.name}
                    </span>
                    <span className="footer-sep" aria-hidden="true">
                        ·
                    </span>
                    <span>{site.focus.join(" · ")}</span>
                </div>
                <nav className="footer-nav" aria-label={footerNavAria}>
                    <Link href={workHref}>{workLabel}</Link>
                    <Link href={aboutHref}>{aboutLabel}</Link>
                    <Link href={contactHref}>{contactLabel}</Link>
                    <Link className="footer-lang" href={switchHref} hrefLang={otherLocale}>
                        <span className={locale === "vi" ? "on" : undefined}>VI</span>
                        {" / "}
                        <span className={locale === "en" ? "on" : undefined}>EN</span>
                        <span className="sr-only"> — {langSwitchAria}</span>
                    </Link>
                </nav>
            </div>
            <div className="footer-big" aria-hidden="true" data-text={site.name} />
        </footer>
    );
}
