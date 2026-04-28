import { useEffect, useRef } from "react";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function useCommandPanel(open, onClose, fallbackFocusRef) {
  const dialogRef = useRef(null);
  const firstCommandRef = useRef(null);
  const returnFocusRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFirst = window.setTimeout(() => {
      firstCommandRef.current?.focus();
    }, 0);

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const nodes = Array.from(dialogRef.current?.querySelectorAll(focusableSelector) ?? []).filter(
        (node) => node instanceof HTMLElement && !node.hasAttribute("disabled"),
      );
      if (!nodes.length) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusFirst);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      const fallback = fallbackFocusRef?.current;
      if (returnFocusRef.current && returnFocusRef.current !== document.body) {
        returnFocusRef.current.focus();
      } else {
        fallback?.focus();
      }
    };
  }, [fallbackFocusRef, onClose, open]);

  return { dialogRef, firstCommandRef };
}
