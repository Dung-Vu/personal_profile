import { collab, faq, safety, testimonials } from "../content/trust.js";
import { BriefForm } from "./BriefForm.jsx";

// Phần sáng dưới khối liên hệ ở /contact: soạn yêu cầu, cách hợp tác, an toàn dữ liệu, hỏi đáp.
export function TrustSections() {
    return (
        <div className="trust wrap">
            <section id="gui-yeu-cau" className="trust-sec trust-form" aria-labelledby="gui-yeu-cau-title">
                <div className="trust-head">
                    <span className="label">
                        <span className="dot" />
                        Soạn yêu cầu
                    </span>
                    <h2 id="gui-yeu-cau-title" className="h2">
                        Điền 4 ý, gửi bằng Zalo hoặc email.
                    </h2>
                    <p className="lead">Gạch đầu dòng là đủ. Chưa rõ ý nào thì bỏ trống, buổi khảo sát sẽ hỏi tiếp.</p>
                </div>
                <BriefForm headingId="gui-yeu-cau-title" />
            </section>

            <section id="cach-hop-tac" className="trust-sec" aria-labelledby="cach-hop-tac-title">
                <div className="trust-head">
                    <span className="label">
                        <span className="dot" />
                        {collab.label}
                    </span>
                    <h2 id="cach-hop-tac-title" className="h2">
                        {collab.title}
                    </h2>
                </div>
                <ol className="steps5">
                    {collab.steps.map((s, i) => (
                        <li key={s.title}>
                            <span className="no">{String(i + 1).padStart(2, "0")}</span>
                            <h3>{s.title}</h3>
                            <p>{s.desc}</p>
                            {s.cost !== "—" && <small>Anh/chị bỏ ra: {s.cost}</small>}
                        </li>
                    ))}
                </ol>
                <div className="forms3">
                    {collab.forms.map((f) => (
                        <div key={f.title}>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
                <p className="price-note">
                    <b>Chi phí.</b> {collab.price}
                </p>
            </section>

            <section id={safety.id} className="trust-sec" aria-labelledby={`${safety.id}-title`}>
                <div className="trust-head">
                    <span className="label">
                        <span className="dot" />
                        {safety.label}
                    </span>
                    <h2 id={`${safety.id}-title`} className="h2">
                        {safety.title}
                    </h2>
                    <p className="lead">{safety.lead}</p>
                </div>
                <ul className="safety">
                    {safety.items.map((it) => (
                        <li key={it.title}>
                            <h3>{it.title}</h3>
                            <p>{it.desc}</p>
                        </li>
                    ))}
                </ul>
            </section>

            {testimonials.length > 0 && (
                <section className="trust-sec" aria-labelledby="nhan-xet-title">
                    <div className="trust-head">
                        <span className="label">
                            <span className="dot" />
                            Người dùng nói
                        </span>
                        <h2 id="nhan-xet-title" className="h2">
                            Từ những người đang dùng hằng ngày.
                        </h2>
                    </div>
                    <div className="quotes">
                        {testimonials.map((t) => (
                            <figure key={t.quote}>
                                <blockquote>“{t.quote}”</blockquote>
                                <figcaption>
                                    <b>{t.who}</b> · {t.org}
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </section>
            )}

            <section className="trust-sec" aria-labelledby="hoi-thang-title">
                <div className="trust-head">
                    <span className="label">
                        <span className="dot" />
                        {faq.label}
                    </span>
                    <h2 id="hoi-thang-title" className="h2">
                        Mấy câu khách hay hỏi.
                    </h2>
                </div>
                <div className="faq">
                    {faq.items.map((f) => (
                        <details key={f.q}>
                            <summary>{f.q}</summary>
                            <p>{f.a}</p>
                        </details>
                    ))}
                </div>
            </section>
        </div>
    );
}
