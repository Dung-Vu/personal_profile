import { useLayoutEffect, useRef } from "react";
import "../styles/home.css";
import { ArrowRight, CheckCircle2, CircleDot, Sparkles } from "lucide-react";
import { homeStoryScenes } from "../content/homeStoryScenes";
import { capabilities } from "../content/capabilities";
import { navigateTo } from "../hooks/useRoutePath";

const sceneSignals = ["Vai trò", "Dự án", "Kết quả", "Quy trình", "Liên hệ"];

const heroProofs = [
    { label: "Dịch vụ", value: "Website, dashboard, internal tool" },
    { label: "Kinh nghiệm", value: "3 case study có scope & kết quả" },
    { label: "Quy trình", value: "Thiết kế → Build → Kiểm tra thực tế" },
];

function SceneCard({ scene }) {
    return (
        <article
            className="home-scene-card"
            style={{
                "--scene-bg": scene.accent.bg,
                "--scene-line": scene.accent.line,
            }}
        >
            <span className="scene-index">{scene.indicatorLabel}</span>
            <div className="scene-copy">
                <p className="scene-motif">{scene.motif}</p>
                <h2>{scene.headline}</h2>
                <p>{scene.body}</p>
            </div>
            <div className="scene-orbit" aria-hidden="true">
                <span />
                <span />
                <span />
            </div>
            {scene.cta ? (
                <div className="scene-actions">
                    <a
                        className="route-cta primary"
                        href={scene.cta.primary.route}
                        onClick={(e) => { e.preventDefault(); navigateTo(scene.cta.primary.route); }}
                    >
                        {scene.cta.primary.label}{" "}
                        <ArrowRight aria-hidden="true" />
                    </a>
                    <a
                        className="route-cta"
                        href={scene.cta.secondary.route}
                        onClick={(e) => { e.preventDefault(); navigateTo(scene.cta.secondary.route); }}
                    >
                        {scene.cta.secondary.label}
                    </a>
                    <a
                        className="route-link"
                        href={scene.cta.lab.route}
                        onClick={(e) => { e.preventDefault(); navigateTo(scene.cta.lab.route); }}
                    >
                        {scene.cta.lab.label}
                    </a>
                </div>
            ) : null}
        </article>
    );
}

function useHomeCinematic() {
    const rootRef = useRef(null);

    useLayoutEffect(() => {
        const root = rootRef.current;
        if (!root) return undefined;

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        );
        const finePointer = window.matchMedia(
            "(hover: hover) and (pointer: fine)",
        );
        const desktopMotion = window.matchMedia("(min-width: 1120px)");
        const saveData = navigator.connection?.saveData === true;
        const deviceMemory = navigator.deviceMemory ?? 8;
        const hardwareConcurrency = navigator.hardwareConcurrency ?? 8;

        if (
            reduceMotion.matches ||
            !finePointer.matches ||
            !desktopMotion.matches ||
            saveData ||
            deviceMemory < 4 ||
            hardwareConcurrency < 6
        ) {
            root.dataset.motion = "static";
            return undefined;
        }

        root.dataset.motion = "cinematic";

        let context;
        let refresh;
        let cancelled = false;

        const startMotion = async () => {
            const [{ gsap }, { ScrollTrigger }] = await Promise.all([
                import("gsap"),
                import("gsap/ScrollTrigger"),
            ]);

            if (cancelled || !root.isConnected) return;

            gsap.registerPlugin(ScrollTrigger);
            context = gsap.context(() => {
                const hero = root.querySelector(".home-hero");
                const panel = root.querySelector(".home-signal-panel");
                const sceneCards = gsap.utils.toArray(".home-scene-card");
                const scenePins = gsap.utils.toArray(".story-progress-dot");

                gsap.set([hero, panel], { autoAlpha: 0, y: 28 });
                gsap.set(sceneCards, { autoAlpha: 0, y: 64, scale: 0.96 });
                gsap.set(scenePins, { autoAlpha: 0.45 });

                const intro = gsap.timeline({
                    defaults: { ease: "power3.out" },
                });
                intro
                    .to(hero, { autoAlpha: 1, y: 0, duration: 0.9 })
                    .to(panel, { autoAlpha: 1, y: 0, duration: 0.75 }, "-=0.42")
                    .to(
                        scenePins,
                        { autoAlpha: 1, stagger: 0.08, duration: 0.35 },
                        "-=0.2",
                    );

                sceneCards.forEach((card, index) => {
                    const accent =
                        homeStoryScenes[index]?.accent.line ?? "#00d4ff";
                    const dot = scenePins[index];
                    const orbit = card.querySelector(".scene-orbit");

                    const reveal = gsap
                        .timeline({
                            scrollTrigger: {
                                trigger: card,
                                start: "top 84%",
                                once: true,
                                onEnter: () => {
                                    root.style.setProperty(
                                        "--home-motion-accent",
                                        accent,
                                    );
                                },
                            },
                        })
                        .to(card, {
                            autoAlpha: 1,
                            y: 0,
                            scale: 1,
                            duration: 0.62,
                            ease: "power2.out",
                        });

                    if (orbit) {
                        reveal.to(
                            orbit,
                            {
                                rotate: 24,
                                scale: 1.03,
                                duration: 0.62,
                                ease: "power1.out",
                            },
                            0,
                        );
                    }

                    if (dot) {
                        reveal.to(
                            dot,
                            {
                                backgroundColor: accent,
                                borderColor: accent,
                                autoAlpha: 1,
                                scale: 1.08,
                                duration: 0.28,
                            },
                            0,
                        );
                    }
                });
            }, root);

            refresh = () => ScrollTrigger.refresh();
            window.addEventListener("load", refresh, { once: true });
        };

        const idleId = window.requestIdleCallback
            ? window.requestIdleCallback(startMotion, { timeout: 1800 })
            : window.setTimeout(startMotion, 900);

        return () => {
            cancelled = true;
            if (window.requestIdleCallback) {
                window.cancelIdleCallback(idleId);
            } else {
                window.clearTimeout(idleId);
            }
            if (refresh) window.removeEventListener("load", refresh);
            context?.revert();
            delete root.dataset.motion;
            root.style.removeProperty("--home-story-progress");
            root.style.removeProperty("--home-motion-accent");
        };
    }, []);

    return rootRef;
}

export function HomePage() {
    const rootRef = useHomeCinematic();

    return (
        <section
            ref={rootRef}
            className="page home-page"
            aria-labelledby="home-title"
        >
            <div className="home-motion-field" aria-hidden="true">
                <span />
                <span />
                <span />
            </div>

            <div className="story-progress" aria-hidden="true">
                {homeStoryScenes.map((scene) => (
                    <span
                        key={scene.id}
                        className="story-progress-dot"
                        style={{ "--dot-accent": scene.accent.line }}
                    />
                ))}
            </div>

            <div className="home-hero-shell">
                <div className="home-hero">
                    <p className="eyebrow">
                        Web Developer / Dashboard / Internal Tool / AI Workflow
                    </p>
                    <h1 id="home-title">
                        <span className="headline-line">Mình xây web app,</span>
                        <span className="headline-line">dashboard và tool</span>
                        <span className="headline-line">dễ vận hành.</span>
                    </h1>
                    <p>
                        Mình giúp biến quy trình rối và dữ liệu khó đọc thành
                        giao diện web trực quan, dễ dùng và có thể kiểm chứng
                        ngay trên trình duyệt.
                    </p>
                    <div
                        className="home-proof-strip"
                        aria-label="Quick proof summary"
                    >
                        {heroProofs.map((proof) => (
                            <div key={proof.label}>
                                <CheckCircle2 aria-hidden="true" />
                                <span>{proof.label}</span>
                                <strong>{proof.value}</strong>
                            </div>
                        ))}
                    </div>
                    <div className="hero-actions">
                    <a
                        className="route-cta primary"
                        href="/work"
                        onClick={(e) => { e.preventDefault(); navigateTo("/work"); }}
                    >
                        Xem case study <ArrowRight aria-hidden="true" />
                    </a>
                    <a
                        className="route-cta"
                        href="/contact"
                        onClick={(e) => { e.preventDefault(); navigateTo("/contact"); }}
                    >
                        Gửi yêu cầu
                    </a>
                    </div>
                </div>

                <aside
                    className="home-signal-panel"
                    aria-label="Home story route status"
                >
                    <img
                        className="home-panel-image"
                        src="/assets/signal-workstation-hero-v2.webp"
                        alt="Dark developer workstation with code and dashboard monitors."
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                    />
                    <div className="signal-panel-topline">
                        <Sparkles aria-hidden="true" />
                        <span>Cách mình làm việc</span>
                    </div>
                    <strong>
                        Website, dashboard, internal tool và AI workflow.
                    </strong>
                    <p>
                        Vào Work để xem bối cảnh, vai trò, kết quả và
                        trạng thái thực tế của từng dự án.
                    </p>
                    <div
                        className="signal-stack"
                        aria-label="Home story scenes"
                    >
                        {sceneSignals.map((signal, index) => (
                            <span key={signal}>
                                <CircleDot aria-hidden="true" />
                                {String(index + 1).padStart(2, "0")} / {signal}
                            </span>
                        ))}
                    </div>
                </aside>
            </div>

            <div
                className="home-story-grid"
                aria-label="Locked home story scenes"
            >
                {homeStoryScenes.map((scene) => (
                    <SceneCard key={scene.id} scene={scene} />
                ))}
            </div>

            <div className="capability-strip" aria-label="Capability signals">
                {capabilities.slice(0, 3).map((capability) => (
                    <article key={capability.id}>
                        <span>{capability.level}</span>
                        <strong>{capability.label}</strong>
                        <p>{capability.detail}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
