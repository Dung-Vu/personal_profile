import { getNextProject, getProject } from "../content/projects.js";
import { ProofWindow } from "../components/ProofWindow.jsx";
import { ContactBlock } from "../components/ContactBlock.jsx";
import { Link } from "../lib/router.jsx";
import NotFound from "./NotFound.jsx";
import "../styles/case.css";

export default function CaseDetail({ slug }) {
    const p = getProject(slug);
    if (!p) return <NotFound />;
    const next = getNextProject(slug);
    const seed = slug.length * 7;
    return (
        <>
            <main id="main" className="page page-case">
                <div className="wrap">
                    <nav className="crumb" aria-label="Breadcrumb">
                        <Link href="/work">Dự án</Link>
                        <span aria-hidden="true">&nbsp; / &nbsp;</span>
                        <b aria-current="page">{p.name}</b>
                    </nav>
                    <div className="case-title">
                        <div>
                            <h1 id="case-title" className="display">
                                {p.name}
                                <small>{p.subtitle}</small>
                            </h1>
                            <div className="tags">
                                <span className={`pill t-${p.tone === "mint" ? "ocean" : p.tone}`}>{p.tag}</span>
                                <span className="pill t-ocean">Đang chạy</span>
                                <span className="pill t-apricot">2026</span>
                            </div>
                        </div>
                        <dl className="facts">
                            {p.facts.map((f) => (
                                <div key={f.k}>
                                    <dt>{f.k}</dt>
                                    <dd>{f.v}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                    <dl className="metrics">
                        {p.metrics.map((m) => (
                            <div key={m.label}>
                                <dt>{m.label}</dt>
                                <dd>{m.value}</dd>
                            </div>
                        ))}
                    </dl>
                    <figure className={`proof proof-${p.tone}`}>
                        <ProofWindow proof={p.proof} seed={seed} />
                        <figcaption className="redact">Ảnh minh hoạ · dữ liệu đã che</figcaption>
                    </figure>

                    <section className="story-row">
                        <h2>Bài toán</h2>
                        <p>{p.problem}</p>
                    </section>
                    <section className="story-row">
                        <h2>Cách làm</h2>
                        <div>
                            <p>{p.approach}</p>
                            <div className="case-mods">
                                {p.modulesDetail.map((m) => (
                                    <div key={m.title}>
                                        <b>{m.title}</b>
                                        <span>{m.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    <section className="story-row">
                        <h2>Kết quả</h2>
                        <p>{p.result}</p>
                    </section>

                    <Link className="next" href={`/work/${next.slug}`}>
                        <div>
                            <span className="label">Dự án tiếp theo</span>
                            <b>{next.cardTitle}</b>
                        </div>
                        <span className="arrow" aria-hidden="true">
                            →
                        </span>
                    </Link>
                </div>
            </main>
            <ContactBlock />
        </>
    );
}
