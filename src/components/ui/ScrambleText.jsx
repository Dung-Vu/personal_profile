import { useEffect, useRef, useState } from "react";

const glyphs = "!<>-_\\/[]{}#$%&*+=?";

export function ScrambleText({ as: Element = "span", children, enabled, className, ...props }) {
  const text = String(children ?? "");
  const [value, setValue] = useState(text);
  const nodeRef = useRef(null);

  useEffect(() => {
    setValue(text);
  }, [text]);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || !enabled || !text.trim() || text.length > 34) return undefined;

    let frame = 0;
    let raf = 0;
    let running = false;
    const maxFrames = Math.min(34, Math.max(16, text.length * 2));

    const run = () => {
      running = true;
      frame += 1;
      const progress = frame / maxFrames;
      const resolved = Math.floor(text.length * progress);
      const nextValue = text
        .split("")
        .map((char, index) => {
          if (char === " " || index < resolved) return char;
          return glyphs[(index + frame) % glyphs.length];
        })
        .join("");

      setValue(nextValue);

      if (frame < maxFrames) {
        raf = window.requestAnimationFrame(run);
      } else {
        setValue(text);
        running = false;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          frame = 0;
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.55 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(raf);
      setValue(text);
    };
  }, [enabled, text]);

  return (
    <Element ref={nodeRef} className={className} {...props}>
      {value}
    </Element>
  );
}
