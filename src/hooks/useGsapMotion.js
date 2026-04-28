import { useHorizontalScroll } from "./useHorizontalScroll";
import { useHoverRaise } from "./useHoverRaise";
import { useIntakeConsoleMotion } from "./useIntakeConsoleMotion";
import { useParallaxImages } from "./useParallaxImages";
import { useRevealMotion } from "./useRevealMotion";
import { useWorkflowMotion } from "./useWorkflowMotion";

export function useGsapMotion(rootRef, { canAnimate, canUseDesktopMotion }) {
    useRevealMotion(rootRef, canAnimate);
    useHoverRaise(rootRef, canAnimate);
    useIntakeConsoleMotion(rootRef, canAnimate);
    useParallaxImages(rootRef, canUseDesktopMotion);
    useHorizontalScroll(rootRef, canUseDesktopMotion);
    useWorkflowMotion(rootRef, canUseDesktopMotion);
}
