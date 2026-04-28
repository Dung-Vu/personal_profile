import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useWorkflowMotion(rootRef, canUseDesktopMotion) {
    useEffect(() => {
        const root = rootRef.current;
        if (!root || !canUseDesktopMotion) return undefined;

        const context = gsap.context(() => {
            gsap.utils.toArray(".workflow-node").forEach((node, index) => {
                gsap.fromTo(
                    node,
                    { opacity: 0.8, y: 28, scale: 0.98 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.62,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: node,
                            start: "top 82%",
                            once: true,
                        },
                        delay: index * 0.04,
                    },
                );
            });

            gsap.utils.toArray(".workflow-link").forEach((link, index) => {
                gsap.fromTo(
                    link,
                    { opacity: 0.2, scaleX: 0.3 },
                    {
                        opacity: 1,
                        scaleX: 1,
                        duration: 0.52,
                        ease: "power2.out",
                        delay: index * 0.06,
                        transformOrigin: "left center",
                        scrollTrigger: {
                            trigger: ".workflow-section",
                            start: "top 76%",
                            once: true,
                        },
                    },
                );
            });

            gsap.utils
                .toArray(".workflow-output-item")
                .forEach((item, index) => {
                    gsap.fromTo(
                        item,
                        { opacity: 0.76, y: 18 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.48,
                            ease: "power2.out",
                            delay: index * 0.05,
                            scrollTrigger: {
                                trigger: ".workflow-output-grid",
                                start: "top 82%",
                                once: true,
                            },
                        },
                    );
                });
        }, root);

        ScrollTrigger.refresh();
        return () => context.revert();
    }, [canUseDesktopMotion, rootRef]);
}
