import { getSiteContent } from "../content/index.js";
import { localizePath, useLocale } from "../lib/i18n.js";
import { Link } from "../lib/router.jsx";

export default function NotFound() {
    const locale = useLocale();
    const isEn = locale === "en";
    const { ui = {} } = getSiteContent(locale);
    const nf = ui.notFound || {};

    const label = nf.label || (isEn ? "Error 404" : "Lỗi 404");
    const title = nf.title || (isEn ? "This page isn't in the system." : "Trang này không có trong hệ thống.");
    const lead =
        nf.lead ||
        (isEn
            ? "The link may have moved. Head back home or browse the systems currently in production."
            : "Có thể đường dẫn đã đổi. Quay về trang chủ hoặc xem các dự án đang chạy.");
    const homeBtn = nf.homeBtn || (isEn ? "Back to home" : "Về trang chủ");
    const workBtn = nf.workBtn || (isEn ? "Browse work" : "Xem dự án");

    return (
        <main id="main" tabIndex={-1} className="page page-404">
            <div className="wrap">
                <span className="label">
                    <span className="dot" />
                    {label}
                </span>
                <h1 id="not-found-title" className="display nf-title">
                    {title}
                </h1>
                <p className="lead">{lead}</p>
                <div className="ctas">
                    <Link className="btn btn-ink" href={localizePath("/", locale)}>
                        {homeBtn}
                    </Link>
                    <Link className="btn btn-ghost" href={localizePath("/work", locale)}>
                        {workBtn} <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </main>
    );
}
