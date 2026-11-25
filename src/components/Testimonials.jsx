import { getSiteContent, getTrustContent } from "../content/index.js";

export function Testimonials({ locale = "vi" }) {
    const lang = locale === "en" ? "en" : "vi";
    const { testimonials } = getTrustContent(lang);
    if (!testimonials || testimonials.length === 0) return null;

    const { ui = {} } = getSiteContent(lang);
    const eyebrow = ui.testimonials?.label || (lang === "en" ? "Client Notes" : "Người dùng nói");
    const heading =
        ui.testimonials?.title ||
        (lang === "en" ? "From people running these systems daily." : "Từ những người đang dùng hằng ngày.");

    return (
        <section className="testi-sec" aria-labelledby="testi-heading">
            <div className="testi-inner">
                <div className="trust-head">
                    <span className="label">
                        <span className="dot" />
                        {eyebrow}
                    </span>
                    <h2 id="testi-heading" className="h2">
                        {heading}
                    </h2>
                </div>
                <div className="testi-grid">
                    {testimonials.map((item, idx) => (
                        <figure key={item.id || `${item.who}-${idx}`} className="testi-card">
                            {item.metric && <span className="pill pill-sm t-ocean testi-metric">{item.metric}</span>}
                            <blockquote>“{item.quote}”</blockquote>
                            <figcaption>
                                <strong>{item.who}</strong>
                                {item.org && <span> · {item.org}</span>}
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
