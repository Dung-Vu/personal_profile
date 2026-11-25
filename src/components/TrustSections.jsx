import { useCallback, useRef, useState } from "react";
import { getSiteContent, getTrustContent } from "../content/index.js";
import { useLocale } from "../lib/i18n.js";
import { BriefForm } from "./BriefForm.jsx";
import { OpsDiagnostic } from "./OpsDiagnostic.jsx";
import { Testimonials } from "./Testimonials.jsx";

// Phần sáng dưới khối liên hệ ở /contact: khảo sát 60s, soạn yêu cầu, cách hợp tác, an toàn dữ liệu, nhận xét, hỏi đáp.
export function TrustSections() {
    const locale = useLocale();
    const isEn = locale === "en";
    const { ui = {} } = getSiteContent(locale);
    const { collab, faq, safety } = getTrustContent(locale);

    const [prefill, setPrefill] = useState(null);
    const nonceRef = useRef(0);

    const handlePrefill = useCallback((data) => {
        nonceRef.current += 1;
        setPrefill({ ...data, nonce: nonceRef.current });
        const target = document.getElementById("gui-yeu-cau");
        if (target) {
            const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
        }
    }, []);

    const cUi = ui.contact || {};
    const formLabel = cUi.formLabel || (isEn ? "Project Brief" : "Soạn yêu cầu");
    const formTitle = cUi.formTitle || (isEn ? "Fill 4 points — send directly or via Zalo / email." : "Điền 4 ý, gửi trực tiếp hoặc qua Zalo / email.");
    const formLead =
        cUi.formLead ||
        (isEn
            ? "Bullet points are enough. Leave anything blank if unsure — we will clarify it on the discovery call."
            : "Gạch đầu dòng là đủ. Chưa rõ ý nào thì bỏ trống, buổi khảo sát sẽ hỏi tiếp.");
    const costPrefix = cUi.costPrefix || (isEn ? "Your time:" : "Anh/chị bỏ ra:");
    const priceLabel = cUi.priceLabel || (isEn ? "Pricing." : "Chi phí.");
    const faqTitle = cUi.faqTitle || faq.title || (isEn ? "Questions clients ask upfront." : "Mấy câu khách hay hỏi.");

    return (
        <div className="trust wrap">
            <div className="trust-sec trust-diag">
                <OpsDiagnostic locale={locale} onPrefill={handlePrefill} />
            </div>

            <section id="gui-yeu-cau" className="trust-sec trust-form" aria-labelledby="gui-yeu-cau-title">
                <div className="trust-head">
                    <span className="label">
                        <span className="dot" />
                        {formLabel}
                    </span>
                    <h2 id="gui-yeu-cau-title" className="h2">
                        {formTitle}
                    </h2>
                    <p className="lead">{formLead}</p>
                </div>
                <BriefForm prefill={prefill} />
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
                            {s.cost && s.cost !== "—" && (
                                <small>
                                    {costPrefix} {s.cost}
                                </small>
                            )}
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
                    <b>{priceLabel}</b> {collab.price}
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

            <Testimonials locale={locale} />

            <section className="trust-sec" aria-labelledby="hoi-thang-title">
                <div className="trust-head">
                    <span className="label">
                        <span className="dot" />
                        {faq.label}
                    </span>
                    <h2 id="hoi-thang-title" className="h2">
                        {faqTitle}
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
