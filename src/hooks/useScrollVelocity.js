import { useEffect, useRef } from "react";

export function useScrollVelocity() {
  const velocityRef = useRef(0);

  useEffect(() => {
    let lastY = window.scrollY;
    let lastTime = performance.now();
    let raf = 0;

    const onScroll = () => {
      const now = performance.now();
      const currentY = window.scrollY;
      const dt = Math.max(16, now - lastTime);
      const rawVelocity = ((currentY - lastY) / dt) * 16.67;
      velocityRef.current = Math.max(-42, Math.min(42, rawVelocity));
      lastY = currentY;
      lastTime = now;
      document.documentElement.style.setProperty("--scroll", String(currentY));
      window.cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(() => {
        velocityRef.current *= 0.72;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return velocityRef;
}
