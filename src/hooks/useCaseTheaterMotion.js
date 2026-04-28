import { useEffect } from "react";
import { gsap } from "gsap";

export function useCaseTheaterMotion(activeProject, canAnimate) {
    useEffect(() => {
        if (!canAnimate) return undefined;

        const root = document.getElementById("projects");
        if (!root) return undefined;

        const mode = document.documentElement.dataset.mode ?? "story";
        const settings = {
            story: {
                cardY: 22,
                cardScale: 0.992,
                blur: 8,
                cardDuration: 0.56,
                badgeY: 8,
                badgeDuration: 0.22,
                detailY: 12,
                detailDuration: 0.32,
            },
            systems: {
                cardY: 18,
                cardScale: 0.996,
                blur: 6,
                cardDuration: 0.48,
                badgeY: 6,
                badgeDuration: 0.18,
                detailY: 10,
                detailDuration: 0.26,
            },
            cases: {
                cardY: 34,
                cardScale: 0.984,
                blur: 14,
                cardDuration: 0.72,
                badgeY: 12,
                badgeDuration: 0.3,
                detailY: 18,
                detailDuration: 0.42,
            },
        }[mode] ?? {
            cardY: 22,
            cardScale: 0.992,
            blur: 8,
            cardDuration: 0.56,
            badgeY: 8,
            badgeDuration: 0.22,
            detailY: 12,
            detailDuration: 0.32,
        };

        const context = gsap.context(() => {
            const timeline = gsap.timeline({
                defaults: { ease: "power3.out" },
            });

            if (mode === "cases") {
                timeline.fromTo(
                    ".case-theater-rail",
                    { opacity: 0.56, x: -18 },
                    { opacity: 1, x: 0, duration: 0.34 },
                );
            }

            timeline.fromTo(
                ".project-theater-card",
                {
                    opacity: 0.62,
                    y: settings.cardY,
                    scale: settings.cardScale,
                    filter: `blur(${settings.blur}px)`,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: settings.cardDuration,
                    clearProps: "filter",
                },
            );

            timeline.fromTo(
                ".project-theater-badges span",
                { opacity: 0, y: settings.badgeY },
                {
                    opacity: 1,
                    y: 0,
                    duration: settings.badgeDuration,
                    stagger: 0.05,
                },
                0.08,
            );

            timeline.fromTo(
                ".project-theater-headline > *, .project-fingerprint article, .case-study-grid-expanded .case-study-row, .project-evidence-grid > div",
                { opacity: 0, y: settings.detailY },
                {
                    opacity: 1,
                    y: 0,
                    duration: settings.detailDuration,
                    stagger: 0.045,
                },
                0.14,
            );
        }, root);

        return () => context.revert();
    }, [activeProject, canAnimate]);
}
