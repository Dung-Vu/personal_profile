import { about } from "../content/about.js";
import { site } from "../content/site.js";
import { ContactBlock } from "../components/ContactBlock.jsx";
import "../styles/about.css";

export default function About() {
    return (
        <>
            <main id="main" className="page page-about">
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
                        </div>
                        <div className="about-ava">
                            <img src={site.avatar} alt={`Ảnh chân dung ${site.name}`} width="720" height="926" loading="lazy" />
                        </div>
                    </div>

                    <section className="about-sec" aria-labelledby="principles-title">
                        <h2 id="principles-title" className="label">
                            Nguyên tắc
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
                            Chặng đường
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
                            Bộ công cụ
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
            </main>
            <ContactBlock />
        </>
    );
}
