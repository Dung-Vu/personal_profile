import { brief, briefMailto, site } from "../content/site.js";

// Khối liên hệ tối: dùng làm trang /contact (h1) và làm phần kết ở các trang khác (h2).
export function ContactBlock({ as = "h2", id = "lien-he" }) {
    const Heading = as;
    const SubHeading = as === "h1" ? "h2" : "h3";
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
                        <a className="btn btn-mint" href={briefMailto}>
                            Gửi brief cho mình <span aria-hidden="true">→</span>
                        </a>
                        <a className="btn btn-line" href={`mailto:${site.email}`}>
                            {site.email}
                        </a>
                    </div>
                    <div className="contact-links">
                        <a href={site.github} target="_blank" rel="noreferrer">
                            GitHub <b>{site.githubName}</b>
                        </a>
                        <a href={`https://${site.domain}`}>
                            Web <b>{site.domain}</b>
                        </a>
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
