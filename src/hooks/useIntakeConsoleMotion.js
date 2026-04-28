import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useIntakeConsoleMotion(rootRef, canAnimate) {
    useEffect(() => {
        const root = rootRef.current;
        if (!root || !canAnimate) return undefined;

        const context = gsap.context(() => {
            const consoleNode = root.querySelector(".intake-console");

            if (consoleNode) {
                gsap.fromTo(
                    consoleNode,
                    { opacity: 0.78, y: 28, scale: 0.99 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.72,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: consoleNode,
                            start: "top 82%",
                            once: true,
                        },
                    },
                );
            }

            gsap.utils
                .toArray(
                    ".contact-proof-grid article, .contact-signal-card, .intake-prompt-card, .intake-template .terminal-line, .intake-actions-panel .terminal-line",
                )
                .forEach((node, index) => {
                    gsap.fromTo(
                        node,
                        { opacity: 0, y: 18 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.46,
                            delay: index * 0.035,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: ".contact-section",
                                start: "top 76%",
                                once: true,
                            },
                        },
                    );
                });
        }, root);

        ScrollTrigger.refresh();
        return () => context.revert();
    }, [canAnimate, rootRef]);
}
