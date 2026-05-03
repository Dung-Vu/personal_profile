import { ArrowRight, Send, TerminalSquare } from "lucide-react";
import { navigateTo } from "../../hooks/useRoutePath";

function SceneLink({ children, href, variant = "secondary" }) {
    return (
        <a
            className={`route-cta ${variant === "primary" ? "primary" : ""}`}
            href={href}
            onClick={(event) => {
                event.preventDefault();
                navigateTo(href);
            }}
        >
            {children}
        </a>
    );
}

export function OpeningScene() {
    return (
        <section className="home-opening-scene" aria-labelledby="home-title">
            <div className="home-opening-copy">
                <p className="eyebrow">Web app / Dashboard / Internal tool / AI workflow</p>
                <h1 id="home-title">
                    <span className="headline-line">Messy signals</span>
                    <span className="headline-line">thành usable systems.</span>
                </h1>
                <p>
                    Mình xây website, dashboard và tool vận hành để biến quy trình rối,
                    dữ liệu khó đọc và brief chưa rõ thành giao diện có thể dùng, kiểm tra
                    và phát triển tiếp.
                </p>
                <div className="hero-actions">
                    <SceneLink href="/work" variant="primary">
                        Xem case study <ArrowRight aria-hidden="true" />
                    </SceneLink>
                    <SceneLink href="/contact">
                        Gửi brief <Send aria-hidden="true" />
                    </SceneLink>
                </div>
            </div>

            <div className="home-interface-sculpture" aria-hidden="true">
                <div className="sculpture-command">
                    <TerminalSquare />
                    <span>signal.compile()</span>
                </div>
                <div className="sculpture-strip strip-a">
                    <span>messy input</span>
                    <strong>brief / data / workflow</strong>
                </div>
                <div className="sculpture-strip strip-b">
                    <span>system surface</span>
                    <strong>state / route / action</strong>
                </div>
                <div className="sculpture-strip strip-c">
                    <span>runtime proof</span>
                    <strong>build / browser / mobile</strong>
                </div>
                <div className="sculpture-lines">
                    <span />
                    <span />
                    <span />
                    <span />
                </div>
            </div>
        </section>
    );
}
