import "../styles/home.css";
import { Hero } from "../sections/Hero.jsx";
import { StorySection } from "../sections/StorySection.jsx";
import { CaseCard } from "../components/CaseCard.jsx";
import { Testimonials } from "../components/Testimonials.jsx";
import { ContactBlock } from "../components/ContactBlock.jsx";
import { getProjectsContent, getSiteContent } from "../content/index.js";
import { localizePath, useLocale } from "../lib/i18n.js";
import { Link } from "../lib/router.jsx";

export default function Home() {
    const locale = useLocale();
    const isEn = locale === "en";
    const { ui = {} } = getSiteContent(locale);
    const { projects } = getProjectsContent(locale);
    const featured = projects.slice(0, 3);
    const homeUi = ui.home || {};

    const resultsLabel = homeUi.featuredLabel || (isEn ? "Selected results" : "Kết quả");
    const resultsTitle = homeUi.featuredTitle || (isEn ? "Three production systems, told in numbers." : "Ba hệ thống tiêu biểu, kể bằng số.");
    const allWorkLabel = homeUi.featuredAllBtn || (isEn ? `View all ${projects.length} case studies` : `Xem cả ${projects.length} dự án`);

    return (
        <main id="main" tabIndex={-1}>
            <Hero />
            <StorySection />
            <section className="featured" aria-labelledby="featured-title">
                <div className="wrap">
                    <div className="sec-head">
                        <div>
                            <span className="label">
                                <span className="dot" />
                                {resultsLabel}
                            </span>
                            <h2 id="featured-title" className="h2">
                                {resultsTitle}
                            </h2>
                        </div>
                        <Link className="btn btn-ghost" href={localizePath("/work", locale)}>
                            {allWorkLabel} <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                    <div className="case-grid case-grid-home">
                        {featured.map((p, i) => (
                            <CaseCard key={p.slug} project={p} index={i} size={i === 0 ? "feature" : "wide"} showShot={i === 0} />
                        ))}
                    </div>
                </div>
            </section>
            <Testimonials locale={locale} />
            <ContactBlock />
        </main>
    );
}
