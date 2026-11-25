import { useEffect } from "react";
import { getSiteContent, getTrustContent } from "../content/index.js";
import { localizePath, useLocale } from "../lib/i18n.js";
import { Link } from "../lib/router.jsx";

// Khối liên hệ tối: dùng làm trang /contact (h1) và làm phần kết ở các trang khác (h2).
export function ContactBlock({ as = "h2", id = "lien-he" }) {
    const locale = useLocale();
    const isEn = locale === "en";
    const { brief, site, ui = {} } = getSiteContent(locale);
    const { promise } = getTrustContent(locale);
    const cUi = ui.contact || {};

    const Heading = as;
    const SubHeading = as === "h1" ? "h2" : "h3";
    const isPage = as === "h1";
    const newTabSr = ui.newTabSr || (isEn ? " (opens in a new tab)" : " (mở tab mới)");

    useEffect(() => {
        window.dispatchEvent(new Event("story:theme"));
    }, []);

    const contactPath = localizePath("/contact", locale);
    const diagnosticPath = localizePath("/contact#khao-sat-60s", locale);
    const safetyPath = localizePath("/contact#an-toan", locale);

    return (
        <section className="contact" data-theme="dark" aria-labelledby={`${id}-title`}>
            <div className="wrap contact-grid">
                <div>
                    <span className="label">
                        <span className="dot dot-mint" />
                        {cUi.label || (isEn ? "Contact" : "Liên hệ")}
                    </span>
                    <Heading id={`${id}-title`} className="display contact-title">
                        {brief.title} <em>{brief.accent}</em>
                    </Heading>
                    <p className="lead">{brief.lead}</p>
                    <div className="ctas">
                        <a className="btn btn-mint" href={site.zalo} target="_blank" rel="noopener noreferrer">
                            {cUi.zaloCta || (isEn ? "Message on Zalo" : "Nhắn Zalo")} {site.phone} <span aria-hidden="true">→</span>
                            <span className="sr-only">{newTabSr}</span>
                        </a>
                        {isPage ? (
                            <a className="btn btn-line" href="#gui-yeu-cau">
                                {cUi.composeBtn || (isEn ? "Write 4-point brief" : "Soạn yêu cầu 4 ý")}
                            </a>
                        ) : (
                            <Link className="btn btn-line" href={diagnosticPath}>
                                {cUi.diagnosticCta || (isEn ? "60s Ops Diagnostic" : "Khảo sát nhanh 60 giây")}
                            </Link>
                        )}
                    </div>
                    <ul className="promise">
                        {promise.map((p) => (
                            <li key={p}>{p}</li>
                        ))}
                    </ul>
                    <div className="contact-links">
                        <a href={`tel:${site.tel}`}>
                            {cUi.callLabel || (isEn ? "Call" : "Gọi")} <b>{site.phone}</b>
                        </a>
                        <a href={`mailto:${site.email}`}>
                            {cUi.emailLabel || "Email"} <b>{site.email}</b>
                        </a>
                        {isPage ? (
                            <>
                                <a href={site.github} target="_blank" rel="noopener noreferrer">
                                    {cUi.githubLabel || "GitHub"} <b>{site.githubName}</b>
                                    <span className="sr-only">{newTabSr}</span>
                                </a>
                                <a href="#khao-sat-60s">
                                    <b>{cUi.diagnosticCta || (isEn ? "60s Ops Diagnostic" : "Khảo sát nhanh 60 giây")}</b> <span aria-hidden="true">↓</span>
                                </a>
                            </>
                        ) : (
                            <>
                                <Link href={contactPath}>
                                    <b>{cUi.collabLink || (isEn ? "How we work & pricing" : "Cách hợp tác & chi phí")}</b> <span aria-hidden="true">→</span>
                                </Link>
                                <Link href={safetyPath}>
                                    <b>{cUi.safetyLink || (isEn ? "Data safety" : "An toàn dữ liệu")}</b> <span aria-hidden="true">→</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                <aside className="brief" aria-label={brief.checklistLabel}>
                    <span className="label">{brief.checklistLabel}</span>
                    <SubHeading>{brief.checklistTitle}</SubHeading>
                    <ol>
                        {brief.checklist.map((item) => (
                            <li key={item.title}>
                                <div>
                                    <b>{item.title}</b>
                                    <span>{item.desc}</span>
                                </div>
                            </li>
                        ))}
                    </ol>
                    <p className="note">{brief.note}</p>
                </aside>
            </div>
        </section>
    );
}
