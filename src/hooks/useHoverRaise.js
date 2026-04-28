import { useEffect } from "react";
import { gsap } from "gsap";
import { cardHoverPreset } from "../motionPresets";

const hoverTargets = ".stack-card, .workflow-node, .project-module";

export function useHoverRaise(rootRef, canAnimate) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !canAnimate) return undefined;

    const cleanups = gsap.utils.toArray(hoverTargets).map((node) => {
      const raise = () => gsap.to(node, cardHoverPreset);
      const settle = () =>
        gsap.to(node, {
          y: 0,
          duration: cardHoverPreset.duration,
          ease: cardHoverPreset.ease,
        });

      node.addEventListener("pointerenter", raise);
      node.addEventListener("pointerleave", settle);
      node.addEventListener("focusin", raise);
      node.addEventListener("focusout", settle);

      return () => {
        node.removeEventListener("pointerenter", raise);
        node.removeEventListener("pointerleave", settle);
        node.removeEventListener("focusin", raise);
        node.removeEventListener("focusout", settle);
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [canAnimate, rootRef]);
}
