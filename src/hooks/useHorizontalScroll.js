import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useHorizontalScroll(rootRef, canUseDesktopMotion) {
    useEffect(() => {
        const root = rootRef.current;
        if (!root || !canUseDesktopMotion) return undefined;

        const context = gsap.context(() => {
            const projectStage = document.querySelector(
                ".project-stage-scroll",
            );
            if (!projectStage || projectStage.scrollWidth <= window.innerWidth)
                return;

            const projectCount =
                projectStage.querySelectorAll(".project-module").length;
            gsap.to(projectStage, {
                x: () =>
                    -Math.max(0, projectStage.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: "#projects",
                    start: "top top",
                    end: () =>
                        `+=${Math.max(window.innerWidth, projectStage.scrollWidth - window.innerWidth)}`,
                    pin: true,
                    scrub: 0.85,
                    snap:
                        projectCount > 1
                            ? {
                                  snapTo: 1 / (projectCount - 1),
                                  duration: { min: 0.16, max: 0.34 },
                                  delay: 0.05,
                                  ease: "power1.inOut",
                              }
                            : false,
                    invalidateOnRefresh: true,
                },
            });
        }, root);

        ScrollTrigger.refresh();
        return () => context.revert();
    }, [canUseDesktopMotion, rootRef]);
}
