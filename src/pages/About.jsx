import { getAboutContent, getSiteContent } from "../content/index.js";
import { useLocale } from "../lib/i18n.js";
import { ContactBlock } from "../components/ContactBlock.jsx";
import "../styles/about.css";

export default function About() {
    const locale = useLocale();
    const isEn = locale === "en";
    const { site, ui = {} } = getSiteContent(locale);
    const { about } = getAboutContent(locale);
    const aboutUi = ui.about || {};

    const principlesLabel = aboutUi.principles || (isEn ? "Principles" : "Nguyên tắc");
    const timelineLabel = aboutUi.timeline || (isEn ? "Timeline" : "Chặng đường");
    const toolboxLabel = aboutUi.toolbox || (isEn ? "Toolbox" : "Bộ công cụ");
    const printPdfBtn = aboutUi.printPdfBtn || (isEn ? "Download 1-Page PDF" : "Tải hồ sơ tóm tắt (PDF)");
    const avatarAlt = ui.avatarAlt || (isEn ? `Portrait of ${site.name}` : `Ảnh chân dung ${site.name}`);

    return (
        <main id="main" tabIndex={-1} className="page-about">
            <div className="page">
                <div className="wrap">
                    <div className="about-head">
                        <div>
                            <span className="label">
                                <span className="dot" />
                                {about.label}
                            </span>
                            <h1 id="about-title" className="h2 page-title">
                                {about.title}
                            </h1>
                            <p className="lead">{about.lead}</p>
                            <div className="about-actions">
                                <button type="button" className="btn btn-ink about-pdf-btn" onClick={() => window.print()}>
                                    <span aria-hidden="true">↓</span> {printPdfBtn}
                                </button>
                            </div>
                        </div>
                        <div className="about-ava">
                            <img src={site.avatar} alt={avatarAlt} width="720" height="926" fetchPriority="high" />
                        </div>
                    </div>

                    <section className="about-sec" aria-labelledby="principles-title">
                        <h2 id="principles-title" className="label">
                            {principlesLabel}
                        </h2>
                        <div className="principles">
                            {about.principles.map((p) => (
                                <div key={p.no} className="principle">
                                    <span className="no">{p.no}</span>
                                    <h3>{p.title}</h3>
                                    <p>{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="about-sec" aria-labelledby="timeline-title">
                        <h2 id="timeline-title" className="label">
                            {timelineLabel}
                        </h2>
                        <ol className="timeline">
                            {about.timeline.map((t, i) => (
                                <li key={t.time} className={i === about.timeline.length - 1 ? "now" : undefined}>
                                    <span className="time">{t.time}</span>
                                    <div>
                                        <h3>{t.title}</h3>
                                        <p>{t.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </section>

                    <section className="about-sec" aria-labelledby="toolbox-title">
                        <h2 id="toolbox-title" className="label">
                            {toolboxLabel}
                        </h2>
                        <div className="toolbox">
                            {about.toolbox.map((g) => (
                                <div key={g.group}>
                                    <h3>{g.group}</h3>
                                    <ul>
                                        {g.items.map((it) => (
                                            <li key={it}>{it}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
            <ContactBlock />
        </main>
    );
}
