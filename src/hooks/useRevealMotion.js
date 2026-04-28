import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectModulePreset, revealPreset } from "../motionPresets";
import { isNearViewport } from "./motionUtils";

export function useRevealMotion(rootRef, canAnimate) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !canAnimate) return undefined;

    const context = gsap.context(() => {
      gsap.set(".hero .reveal", { opacity: 1, y: 0 });

      gsap.utils.toArray(".reveal").forEach((node) => {
        if (node.closest(".hero") || node.classList.contains("project-module")) return;
        if (isNearViewport(node)) {
          gsap.set(node, { opacity: 1, y: 0 });
          return;
        }

        gsap.fromTo(node, revealPreset.from, {
          ...revealPreset.to,
          scrollTrigger: {
            ...revealPreset.to.scrollTrigger,
            trigger: node,
          },
        });
      });

      gsap.utils.toArray(".project-module").forEach((node) => {
        const sectionIsNear = node.closest("#projects") && isNearViewport(node.closest("#projects"));
        if (sectionIsNear || isNearViewport(node)) {
          gsap.set(node, { opacity: 1, y: 0, scale: 1 });
          return;
        }

        gsap.fromTo(node, projectModulePreset.from, {
          ...projectModulePreset.to,
          scrollTrigger: {
            ...projectModulePreset.to.scrollTrigger,
            trigger: node,
          },
        });
      });
    }, root);

    ScrollTrigger.refresh();
    return () => context.revert();
  }, [canAnimate, rootRef]);
}
