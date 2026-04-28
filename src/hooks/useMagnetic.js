import { useEffect } from "react";

export function useMagnetic(enabled) {
  useEffect(() => {
    if (!enabled) return undefined;

    const nodes = Array.from(document.querySelectorAll("[data-magnetic]"));
    const cleanups = nodes.map((node) => {
      const strength = Number(node.getAttribute("data-magnetic-strength") ?? 0.22);

      const onMove = (event) => {
        const rect = node.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * strength;
        const y = (event.clientY - rect.top - rect.height / 2) * strength;
        node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      };

      const onLeave = () => {
        node.style.transform = "";
      };

      node.addEventListener("pointermove", onMove);
      node.addEventListener("pointerleave", onLeave);
      node.addEventListener("blur", onLeave);

      return () => {
        node.removeEventListener("pointermove", onMove);
        node.removeEventListener("pointerleave", onLeave);
        node.removeEventListener("blur", onLeave);
        node.style.transform = "";
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [enabled]);
}
