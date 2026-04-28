import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useParallaxImages(rootRef, canUseDesktopMotion) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !canUseDesktopMotion) return undefined;

    const context = gsap.context(() => {
      gsap.utils.toArray(".parallax-image img").forEach((node) => {
        gsap.fromTo(
          node,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: node.closest(".parallax-image"),
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    }, root);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, [canUseDesktopMotion, rootRef]);
}
