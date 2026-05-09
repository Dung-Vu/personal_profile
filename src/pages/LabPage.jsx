import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "../styles/lab.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SignalCanvas } from "../components/canvas/SignalCanvas";
import { CommandPanel } from "../components/layout/CommandPanel";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { PresentationHud } from "../components/layout/PresentationHud";
import { ProgressRail } from "../components/layout/ProgressRail";
import { TransitionGate } from "../components/layout/TransitionGate";
import { CustomCursor } from "../components/ui/CustomCursor";
import { LabRenderedSections } from "../components/lab/LabRenderedSections";
import { getShellModeCopy } from "../content/shellModeCopy";
import { useActiveSection } from "../hooks/useActiveSection";
import { useAppShellState } from "../hooks/useAppShellState";
import { useGsapMotion } from "../hooks/useGsapMotion";
import { useMagnetic } from "../hooks/useMagnetic";
import { useMotionPreference } from "../hooks/useMotionPreference";
import { useScrollVelocity } from "../hooks/useScrollVelocity";
import { getSectionRecords, getSections } from "../lib/sections";
import { sectionGateTiming, sceneColors } from "../motionPresets";
import { profile } from "../profileData";

gsap.registerPlugin(ScrollTrigger);

export function LabPage() {
    const [active, setActive] = useState("home");
    const [menuOpen, setMenuOpen] = useState(false);
    const [toast, setToast] = useState("");
    const [reelElapsed, setReelElapsed] = useState(0);
    const rootRef = useRef(null);
    const gateRef = useRef(null);
    const gateLabelRef = useRef(null);
    const commandButtonRef = useRef(null);
    const toastTimerRef = useRef(0);

    const {
        cycleDensity,
        cycleMode,
        cycleMotionProfile,
        commandOpen,
        setCommandOpen,
        density,
        mode,
        motionEnabled,
        motionProfile,
        presentationMode,
        setPresentationMode,
        setMode,
        setDensity,
        setMotionEnabled,
        setMotionProfile,
        setTheme,
        theme,
        togglePresentationMode,
    } = useAppShellState();
    const { canAnimate, canUseDesktopMotion } =
        useMotionPreference(motionEnabled);
    const scrollVelocityRef = useScrollVelocity();
    const sectionRecords = useMemo(() => getSectionRecords(mode), [mode]);
    const modeSections = useMemo(() => getSections(mode), [mode]);
    const shellCopy = useMemo(() => getShellModeCopy(mode), [mode]);
    const reelDurationMs = shellCopy.reelDurationMs ?? 4400;
    const activeSectionIndex = useMemo(
        () => sectionRecords.findIndex(({ id }) => id === active),
        [active, sectionRecords],
    );
    const activeRecord = useMemo(
        () =>
            sectionRecords[Math.max(activeSectionIndex, 0)] ??
            sectionRecords[0] ??
            null,
        [activeSectionIndex, sectionRecords],
    );
    const nextRecord = useMemo(() => {
        if (!sectionRecords.length) return null;
        const nextIndex =
            activeSectionIndex < 0
                ? 0
                : (activeSectionIndex + 1) % sectionRecords.length;
        return sectionRecords[nextIndex] ?? null;
    }, [activeSectionIndex, sectionRecords]);

    useActiveSection(modeSections, setActive);
    useGsapMotion(rootRef, { canAnimate, canUseDesktopMotion });
    useMagnetic(canUseDesktopMotion);

    useEffect(() => {
        document.body.classList.toggle("menu-open", menuOpen);
        return () => document.body.classList.remove("menu-open");
    }, [menuOpen]);

    useEffect(() => {
        document.documentElement.dataset.mode = mode;
        document.documentElement.dataset.density = density;
        document.documentElement.dataset.motionProfile = motionProfile;
        document.documentElement.dataset.presentation = presentationMode
            ? "reel"
            : "manual";

        return () => {
            delete document.documentElement.dataset.mode;
            delete document.documentElement.dataset.density;
            delete document.documentElement.dataset.motionProfile;
            delete document.documentElement.dataset.presentation;
        };
    }, [density, mode, motionProfile, presentationMode]);

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth > 780) setMenuOpen(false);
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    useEffect(() => {
        document.body.classList.add("ready");
        return () => document.body.classList.remove("ready");
    }, []);

    useEffect(() => {
        if (!presentationMode) return undefined;

        const interrupt = () => setPresentationMode(false);
        window.addEventListener("wheel", interrupt, { passive: true });
        window.addEventListener("pointerdown", interrupt, { passive: true });
        window.addEventListener("keydown", interrupt);

        return () => {
            window.removeEventListener("wheel", interrupt);
            window.removeEventListener("pointerdown", interrupt);
            window.removeEventListener("keydown", interrupt);
        };
    }, [presentationMode, setPresentationMode]);

    useEffect(() => {
        if (!presentationMode || commandOpen || !canAnimate) {
            setReelElapsed(0);
            return undefined;
        }

        setReelElapsed(0);
        let frame = 0;
        const startedAt = performance.now();

        const tick = (now) => {
            const elapsed = Math.min(now - startedAt, reelDurationMs);
            setReelElapsed(elapsed);
            if (elapsed < reelDurationMs) {
                frame = window.requestAnimationFrame(tick);
            }
        };

        frame = window.requestAnimationFrame(tick);

        return () => {
            window.cancelAnimationFrame(frame);
        };
    }, [active, canAnimate, commandOpen, presentationMode, reelDurationMs]);

    useEffect(() => {
        const onKey = (event) => {
            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {
                event.preventDefault();
                setCommandOpen(true);
            }
            if (event.key === "Escape") {
                setMenuOpen(false);
                setCommandOpen(false);
            }
        };

        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [setCommandOpen]);

    useEffect(() => () => window.clearTimeout(toastTimerRef.current), []);

    const showToast = useCallback((message) => {
        setToast(message);
        window.clearTimeout(toastTimerRef.current);
        toastTimerRef.current = window.setTimeout(() => setToast(""), 1800);
    }, []);

    const jumpTo = useCallback(
        (targetId, withTransition = true) => {
            const target = document.querySelector(targetId);
            if (!target) return;
            const scene = target.dataset.scene ?? "boot";
            setMenuOpen(false);
            setCommandOpen(false);

            if (
                gateRef.current &&
                gateLabelRef.current &&
                withTransition &&
                canAnimate
            ) {
                gateRef.current.style.background =
                    sceneColors[scene] ?? sceneColors.boot;
                gateLabelRef.current.textContent = `open ${scene}`;
                gateRef.current.classList.remove("active");
                void gateRef.current.offsetWidth;
                gateRef.current.classList.add("active");
            }

            const runScroll = () => {
                target.scrollIntoView({
                    behavior: canAnimate ? "smooth" : "auto",
                    block: "start",
                });
                history.replaceState(null, "", targetId);
            };

            if (document.startViewTransition && withTransition && canAnimate) {
                document.startViewTransition(runScroll);
            } else {
                window.setTimeout(
                    runScroll,
                    withTransition && canAnimate
                        ? sectionGateTiming.scrollDelay
                        : 0,
                );
            }
        },
        [canAnimate],
    );

    useEffect(() => {
        if (!presentationMode || commandOpen || !canAnimate) return undefined;

        const currentIndex = sectionRecords.findIndex(
            ({ id }) => id === active,
        );
        const nextIndex =
            currentIndex < 0 ? 0 : (currentIndex + 1) % sectionRecords.length;
        const timer = window.setTimeout(() => {
            const nextSection = sectionRecords[nextIndex];
            if (nextSection) {
                jumpTo(`#${nextSection.id}`);
            }
        }, reelDurationMs);

        return () => window.clearTimeout(timer);
    }, [
        active,
        canAnimate,
        commandOpen,
        jumpTo,
        presentationMode,
        reelDurationMs,
        sectionRecords,
    ]);

    const reelProgress = useMemo(
        () => Math.max(0, Math.min(1, reelElapsed / reelDurationMs)),
        [reelDurationMs, reelElapsed],
    );
    const reelSecondsLeft = useMemo(
        () => Math.max(0, Math.ceil((reelDurationMs - reelElapsed) / 1000)),
        [reelDurationMs, reelElapsed],
    );

    const copyToClipboard = useCallback(
        async (value, successMessage, fallbackHref) => {
            try {
                await navigator.clipboard.writeText(value);
                showToast(successMessage);
            } catch {
                if (fallbackHref) {
                    window.location.href = fallbackHref;
                }
            }
        },
        [showToast],
    );

    const copyEmail = useCallback(async () => {
        await copyToClipboard(
            profile.email,
            "Đã copy email",
            `mailto:${profile.email}`,
        );
    }, [copyToClipboard]);

    const appContext = useMemo(
        () => ({
            copyEmail,
            canAnimate,
            density,
            jumpTo,
            labSectionCount: sectionRecords.length,
            mode,
            motionProfile,
            presentationMode,
            profile,
            scrambleEnabled: canUseDesktopMotion,
            setMode,
            setPresentationMode,
            theme,
        }),
        [
            canAnimate,
            canUseDesktopMotion,
            copyEmail,
            density,
            jumpTo,
            sectionRecords.length,
            mode,
            motionProfile,
            presentationMode,
            setMode,
            setPresentationMode,
            theme,
        ],
    );

    const renderedSections = useMemo(
        () => (
            <LabRenderedSections
                appContext={appContext}
                sectionRecords={sectionRecords}
            />
        ),
        [appContext, sectionRecords],
    );

    return (
        <div ref={rootRef}>
            <a href="#lab-main" className="skip-link">
                Bỏ qua điều hướng
            </a>
            <SignalCanvas
                activeSection={active}
                mode={mode}
                motionEnabled={canUseDesktopMotion}
                presentationMode={presentationMode}
                scrollVelocityRef={scrollVelocityRef}
            />
            <CustomCursor
                activeSection={active}
                enabled={canUseDesktopMotion}
                mode={mode}
                presentationMode={presentationMode}
            />
            <div className="noise" aria-hidden="true" />
            <TransitionGate gateRef={gateRef} gateLabelRef={gateLabelRef} />
            <aside className="lab-archive-notice" aria-label="Ghi chú archive">
                <strong>Archive thử nghiệm</strong>
                <span>
                    Signal OS là bản thử nghiệm cũ. Home, Work và Contact là
                    portfolio chính hiện tại.
                </span>
            </aside>

            <Header
                active={active}
                cycleDensity={cycleDensity}
                cycleMode={cycleMode}
                cycleMotionProfile={cycleMotionProfile}
                commandButtonRef={commandButtonRef}
                commandOpen={commandOpen}
                density={density}
                jumpTo={jumpTo}
                menuOpen={menuOpen}
                mode={mode}
                motionProfile={motionProfile}
                presentationMode={presentationMode}
                profile={profile}
                setCommandOpen={setCommandOpen}
                setMenuOpen={setMenuOpen}
                theme={theme}
                togglePresentationMode={togglePresentationMode}
            />
            <ProgressRail
                active={active}
                jumpTo={jumpTo}
                mode={mode}
                reelProgress={reelProgress}
            />
            {!commandOpen && activeRecord ? (
                <PresentationHud
                    activeRecord={activeRecord}
                    jumpTo={jumpTo}
                    mode={mode}
                    nextRecord={nextRecord}
                    presentationMode={presentationMode}
                    reelDurationMs={reelDurationMs}
                    reelProgress={reelProgress}
                    reelSecondsLeft={reelSecondsLeft}
                    routeRecords={sectionRecords}
                    sectionCount={sectionRecords.length}
                    setPresentationMode={setPresentationMode}
                />
            ) : null}

            <main id="lab-main" tabIndex={-1}>
                {renderedSections}
            </main>

            {commandOpen && (
                <CommandPanel
                    commandButtonRef={commandButtonRef}
                    copyEmail={copyEmail}
                    density={density}
                    jumpTo={jumpTo}
                    mode={mode}
                    motionEnabled={motionEnabled}
                    motionProfile={motionProfile}
                    onClose={() => setCommandOpen(false)}
                    presentationMode={presentationMode}
                    profile={profile}
                    scrambleEnabled={canUseDesktopMotion}
                    setDensity={setDensity}
                    setMode={setMode}
                    setMotionEnabled={setMotionEnabled}
                    setMotionProfile={setMotionProfile}
                    setPresentationMode={setPresentationMode}
                    setTheme={setTheme}
                    showToast={showToast}
                    theme={theme}
                />
            )}

            <div
                className={`toast ${toast ? "visible" : ""}`}
                role="status"
                aria-live="polite"
            >
                {toast}
            </div>
            <Footer
                activeRecord={activeRecord}
                copyToClipboard={copyToClipboard}
                copyEmail={copyEmail}
                jumpTo={jumpTo}
                mode={mode}
                nextRecord={nextRecord}
                presentationMode={presentationMode}
                profile={profile}
                setPresentationMode={setPresentationMode}
            />
        </div>
    );
}
