import { useEffect, useMemo, useRef, useState } from "react";
import {
    ArrowRight,
    CheckCircle2,
    LayoutDashboard,
    Radio,
    Route as RouteIcon,
} from "lucide-react";
import { navigateTo } from "../../hooks/useRoutePath";

const sceneIcons = {
    signal: Radio,
    system: LayoutDashboard,
    runtime: CheckCircle2,
};

function SceneRoute({ scene }) {
    return (
        <a
            className="home-scene-route"
            href={scene.route.path}
            onClick={(event) => {
                event.preventDefault();
                navigateTo(scene.route.path);
            }}
        >
            {scene.route.label}
            <ArrowRight aria-hidden="true" />
        </a>
    );
}

function StoryVisual({ scene }) {
    const Icon = sceneIcons[scene.visual] ?? RouteIcon;

    return (
        <div className={`home-story-visual ${scene.visual}`} aria-hidden="true">
            <div className="story-visual-top">
                <Icon />
                <span>{scene.label}</span>
            </div>
            <div className="story-visual-grid">
                <span className="story-scanline" />
                <span className="story-node node-a" />
                <span className="story-node node-b" />
                <span className="story-node node-c" />
                <div className="story-proof-artifact">
                    <small>{scene.proof.label}</small>
                    <strong>{scene.proof.value}</strong>
                </div>
                <div className="story-command-stack">
                    {scene.strips.map((strip) => (
                        <span key={strip}>{strip}</span>
                    ))}
                </div>
            </div>
            <div className="story-visual-status">
                <span />
                <span />
                <span />
            </div>
        </div>
    );
}

export function TransformationStory({ scenes }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef(null);
    const sceneRefs = useRef([]);
    const activeScene = scenes[activeIndex] ?? scenes[0];
    const activeStyle = useMemo(
        () => ({
            "--story-accent": activeScene.accent.line,
            "--story-bg": activeScene.accent.bg,
            "--story-soft": activeScene.accent.soft,
        }),
        [activeScene],
    );

    useEffect(() => {
        const page = sectionRef.current?.closest(".home-page");
        if (!page) return undefined;

        page.style.setProperty("--home-motion-accent", activeScene.accent.line);
        page.style.setProperty("--home-scene-index", String(activeIndex));
        page.style.setProperty(
            "--home-story-progress",
            String(activeIndex / Math.max(1, scenes.length - 1)),
        );

        return undefined;
    }, [activeIndex, activeScene, scenes.length]);

    useEffect(() => {
        const nodes = sceneRefs.current.filter(Boolean);
        if (!nodes.length) return undefined;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                const nextIndex = visible[0]?.target?.dataset?.sceneIndex;
                if (nextIndex !== undefined) {
                    setActiveIndex(Number(nextIndex));
                }
            },
            {
                root: null,
                rootMargin: "-28% 0px -36% 0px",
                threshold: [0.2, 0.45, 0.7],
            },
        );

        nodes.forEach((node) => observer.observe(node));

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="home-transformation-story"
            style={activeStyle}
            aria-label="Transformation story"
        >
            <div className="home-story-pin" aria-hidden="true">
                <StoryVisual scene={activeScene} />
            </div>

            <div className="home-story-scenes">
                {scenes.map((scene, index) => (
                    <article
                        key={scene.id}
                        ref={(node) => {
                            sceneRefs.current[index] = node;
                        }}
                        className={
                            index === activeIndex
                                ? "home-story-scene active"
                                : "home-story-scene"
                        }
                        data-scene-index={index}
                        style={{
                            "--scene-bg": scene.accent.bg,
                            "--scene-line": scene.accent.line,
                            "--scene-soft": scene.accent.soft,
                        }}
                    >
                        <span className="home-scene-step">{scene.step}</span>
                        <p className="scene-motif">{scene.kicker}</p>
                        <h2>{scene.headline}</h2>
                        <p className="home-scene-body">{scene.body}</p>
                        <div className="home-proof-artifact">
                            <small>{scene.proof.label}</small>
                            <strong>{scene.proof.value}</strong>
                        </div>
                        <SceneRoute scene={scene} />
                    </article>
                ))}
            </div>
        </section>
    );
}
