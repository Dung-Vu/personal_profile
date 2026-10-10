import { brief, briefMailto, site } from "../content/site.js";
import { promise } from "../content/trust.js";
import { Link } from "../lib/router.jsx";

// Khối liên hệ tối: dùng làm trang /contact (h1) và làm phần kết ở các trang khác (h2).
export function ContactBlock({ as = "h2", id = "lien-he" }) {
    const Heading = as;
    const SubHeading = as === "h1" ? "h2" : "h3";
    const isPage = as === "h1";
    return (
        <section className="contact" data-theme="dark" aria-labelledby={`${id}-title`}>
            <div className="wrap contact-grid">
                <div>
                    <span className="label">
                        <span className="dot dot-mint" />
                        Liên hệ
                    </span>
                    <Heading id={`${id}-title`} className="display contact-title">
                        {brief.title} <em>{brief.accent}</em>
                    </Heading>
                    <p className="lead">{brief.lead}</p>
                    <div className="ctas">
                        <a className="btn btn-mint" href={site.zalo} target="_blank" rel="noreferrer">
                            Nhắn Zalo {site.phone} <span aria-hidden="true">→</span>
                        </a>
                        {isPage ? (
                            <a className="btn btn-line" href="#gui-yeu-cau">
                                Soạn yêu cầu 4 ý
                            </a>
                        ) : (
                            <a className="btn btn-line" href={briefMailto}>
                                Gửi yêu cầu qua email
                            </a>
                        )}
                    </div>
                    <ul className="promise">
                        {promise.map((p) => (
                            <li key={p}>{p}</li>
                        ))}
                    </ul>
                    <div className="contact-links">
                        <a href={`tel:${site.tel}`}>
                            Gọi <b>{site.phone}</b>
                        </a>
                        <a href={`mailto:${site.email}`}>
                            Email <b>{site.email}</b>
                        </a>
                        {isPage ? (
                            <a href={site.github} target="_blank" rel="noreferrer">
                                GitHub <b>{site.githubName}</b>
                            </a>
                        ) : (
                            <Link href="/contact#cach-hop-tac">
                                <b>Cách hợp tác & chi phí</b> →
                            </Link>
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
