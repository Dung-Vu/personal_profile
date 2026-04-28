import { useEffect, useRef } from "react";

const modeProfiles = {
    story: {
        primary: "rgba(255, 202, 95, 0.54)",
        secondary: "rgba(94, 231, 255, 0.42)",
        glow: "rgba(255, 202, 95, 0.16)",
        density: 1,
        drift: 0.34,
        connectDistance: 102,
    },
    systems: {
        primary: "rgba(94, 231, 255, 0.56)",
        secondary: "rgba(179, 239, 255, 0.42)",
        glow: "rgba(94, 231, 255, 0.18)",
        density: 1.08,
        drift: 0.28,
        connectDistance: 122,
    },
    cases: {
        primary: "rgba(255, 108, 131, 0.52)",
        secondary: "rgba(255, 202, 95, 0.4)",
        glow: "rgba(255, 108, 131, 0.16)",
        density: 1.02,
        drift: 0.36,
        connectDistance: 98,
    },
    recruiter: {
        primary: "rgba(184, 255, 106, 0.42)",
        secondary: "rgba(247, 244, 234, 0.28)",
        glow: "rgba(184, 255, 106, 0.1)",
        density: 0.82,
        drift: 0.18,
        connectDistance: 84,
    },
};

const focusMap = {
    home: [0.52, 0.28],
    identity: [0.28, 0.38],
    stack: [0.68, 0.32],
    projects: [0.72, 0.48],
    workflow: [0.58, 0.64],
    contact: [0.34, 0.74],
};

export function SignalCanvas({
    activeSection,
    mode,
    motionEnabled,
    presentationMode,
    scrollVelocityRef,
}) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !motionEnabled) return undefined;

        const ctx = canvas.getContext("2d");
        const profile = modeProfiles[mode] ?? modeProfiles.story;
        const focusAnchor = focusMap[activeSection] ?? focusMap.home;
        const pointer = { x: -9999, y: -9999, active: false };
        let width = 0;
        let height = 0;
        let frame = 0;
        let particles = [];
        let visible = document.visibilityState === "visible";

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const count = Math.min(
                82,
                Math.max(
                    22,
                    Math.floor(
                        (width / 26) *
                            profile.density *
                            (presentationMode ? 1.08 : 1),
                    ),
                ),
            );
            particles = Array.from({ length: count }, (_, index) => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * profile.drift,
                vy: (Math.random() - 0.5) * profile.drift,
                size: 1 + Math.random() * 2,
                phase: index * 0.37,
            }));
        };

        const wrap = (particle) => {
            if (particle.x < -24) particle.x = width + 24;
            if (particle.x > width + 24) particle.x = -24;
            if (particle.y < -24) particle.y = height + 24;
            if (particle.y > height + 24) particle.y = -24;
        };

        const draw = (time) => {
            ctx.clearRect(0, 0, width, height);
            const reelFocusX =
                width * focusAnchor[0] +
                Math.sin(time * 0.00022) * width * 0.08;
            const reelFocusY =
                height * focusAnchor[1] +
                Math.cos(time * 0.00018) * height * 0.06;
            const focusX = pointer.active
                ? pointer.x
                : presentationMode
                  ? reelFocusX
                  : width * focusAnchor[0];
            const focusY = pointer.active
                ? pointer.y
                : presentationMode
                  ? reelFocusY
                  : height * focusAnchor[1];
            const gradient = ctx.createRadialGradient(
                focusX,
                focusY,
                0,
                focusX,
                focusY,
                Math.max(width, height) * 0.72,
            );
            gradient.addColorStop(0, profile.glow);
            gradient.addColorStop(
                0.38,
                profile.secondary.replace(/0\.[0-9]+\)$/, "0.08)"),
            );
            gradient.addColorStop(1, "rgba(7, 8, 11, 0)");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            const scrollVelocity = scrollVelocityRef?.current ?? 0;

            particles.forEach((particle, index) => {
                const dx = particle.x - pointer.x;
                const dy = particle.y - pointer.y;
                const dist = Math.max(1, Math.hypot(dx, dy));
                const repulse =
                    pointer.active && dist < 145 ? (145 - dist) / 145 : 0;

                particle.x +=
                    particle.vx +
                    Math.sin(time * 0.00035 + particle.phase) *
                        (presentationMode ? 0.08 : 0.045) +
                    (dx / dist) * repulse * 1.85;
                particle.y +=
                    particle.vy +
                    Math.cos(time * 0.00028 + particle.phase) *
                        (presentationMode ? 0.08 : 0.045) +
                    scrollVelocity * 0.025 +
                    (dy / dist) * repulse * 1.85;
                wrap(particle);

                ctx.beginPath();
                ctx.fillStyle =
                    index % 5 === 0 ? profile.primary : profile.secondary;
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();

                for (let j = index + 1; j < particles.length; j += 1) {
                    const other = particles[j];
                    const dx2 = particle.x - other.x;
                    const dy2 = particle.y - other.y;
                    if (
                        dx2 * dx2 + dy2 * dy2 >
                        profile.connectDistance * profile.connectDistance
                    )
                        continue;
                    const distance = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                    ctx.strokeStyle = `${profile.primary.slice(0, -1)}, ${0.18 * (1 - distance / profile.connectDistance)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.stroke();
                }
            });

            frame = requestAnimationFrame(draw);
        };

        const movePointer = (event) => {
            pointer.x = event.clientX;
            pointer.y = event.clientY;
            pointer.active = true;
        };

        const leavePointer = () => {
            pointer.active = false;
        };

        const start = () => {
            if (!frame && visible) frame = requestAnimationFrame(draw);
        };

        const stop = () => {
            if (!frame) return;
            cancelAnimationFrame(frame);
            frame = 0;
        };

        const visibility = () => {
            visible = document.visibilityState === "visible";
            if (visible) {
                start();
            } else {
                stop();
            }
        };

        resize();
        start();
        window.addEventListener("resize", resize);
        window.addEventListener("pointermove", movePointer, { passive: true });
        window.addEventListener("pointerleave", leavePointer);
        document.addEventListener("visibilitychange", visibility);

        return () => {
            stop();
            window.removeEventListener("resize", resize);
            window.removeEventListener("pointermove", movePointer);
            window.removeEventListener("pointerleave", leavePointer);
            document.removeEventListener("visibilitychange", visibility);
        };
    }, [
        activeSection,
        mode,
        motionEnabled,
        presentationMode,
        scrollVelocityRef,
    ]);

    return (
        <canvas className="signal-canvas" ref={canvasRef} aria-hidden="true" />
    );
}
