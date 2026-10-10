import { Hero } from "../sections/Hero.jsx";
import { StorySection } from "../sections/StorySection.jsx";
import { CaseCard } from "../components/CaseCard.jsx";
import { ContactBlock } from "../components/ContactBlock.jsx";
import { projects } from "../content/projects.js";
import { Link } from "../lib/router.jsx";

const featured = projects.slice(0, 3);

export default function Home() {
    return (
        <>
            <main id="main">
            <Hero />
            <StorySection />
            <section className="featured" aria-labelledby="featured-title">
                <div className="wrap">
                    <div className="sec-head">
                        <div>
                            <span className="label">
                                <span className="dot" />
                                Kết quả
                            </span>
                            <h2 id="featured-title" className="h2">
                                Ba hệ thống tiêu biểu, kể bằng số.
                            </h2>
                        </div>
                        <Link className="btn btn-ghost" href="/work">
                            Xem cả 6 dự án <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                    <div className="case-grid case-grid-home">
                        {featured.map((p, i) => (
                            <CaseCard key={p.slug} project={p} index={i} size={i === 0 ? "feature" : "wide"} showShot={i === 0} />
                        ))}
                    </div>
                </div>
            </section>
            </main>
            <ContactBlock />
        </>
    );
}
