import { useEffect } from "react";

export function useActiveSection(sections, setActive) {
  useEffect(() => {
    let frame = 0;

    const sync = () => {
      frame = 0;
      const anchor = window.innerHeight * 0.42;
      const candidates = sections
        .map(([id]) => {
          const node = document.getElementById(id);
          if (!node) return null;
          const rect = node.getBoundingClientRect();
          const containsAnchor = rect.top <= anchor && rect.bottom >= anchor;
          return {
            id,
            containsAnchor,
            distance: containsAnchor ? 0 : Math.min(Math.abs(rect.top - anchor), Math.abs(rect.bottom - anchor)),
          };
        })
        .filter(Boolean)
        .sort((a, b) => Number(b.containsAnchor) - Number(a.containsAnchor) || a.distance - b.distance);

      if (candidates[0]) setActive(candidates[0].id);
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sections, setActive]);
}
