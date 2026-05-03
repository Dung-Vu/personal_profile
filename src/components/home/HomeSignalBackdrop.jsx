import { useLayoutEffect, useRef } from "react";

export function HomeSignalBackdrop() {
    const canvasRef = useRef(null);

    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return undefined;

        const context = canvas.getContext("2d", { alpha: true });
        const parent = canvas.parentElement;
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        );
        const finePointer = window.matchMedia(
            "(hover: hover) and (pointer: fine)",
        );
        const saveData = navigator.connection?.saveData === true;
        const animate =
            !reduceMotion.matches &&
            finePointer.matches &&
            !saveData &&
            window.innerWidth >= 900;
        const pointer = { x: -9999, y: -9999, active: false };
        let width = 0;
        let height = 0;
        let frame = 0;
        let lastPaint = 0;
        let nodes = [];
        let visible = document.visibilityState === "visible";
        const frameInterval = 1000 / 28;

        const hexToRgba = (hex, alpha) => {
            const value = hex.trim().replace("#", "");
            if (![3, 6].includes(value.length)) {
                return `rgba(94, 231, 255, ${alpha})`;
            }

            const normalized =
                value.length === 3
                    ? value
                          .split("")
                          .map((char) => `${char}${char}`)
                          .join("")
                    : value;
            const number = Number.parseInt(normalized, 16);
            const red = (number >> 16) & 255;
            const green = (number >> 8) & 255;
            const blue = number & 255;
            return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        };

        const getTheme = () => {
            const page = parent.closest(".home-page") ?? parent;
            const style = window.getComputedStyle(page);
            const accent =
                style.getPropertyValue("--home-motion-accent").trim() ||
                "#5ee7ff";
            const sceneIndex = Number(
                style.getPropertyValue("--home-scene-index").trim() || 0,
            );

            return {
                accent,
                sceneIndex: Number.isFinite(sceneIndex) ? sceneIndex : 0,
            };
        };

        const resize = () => {
            const bounds = parent.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
            width = Math.max(320, Math.floor(bounds.width));
            height = Math.max(540, Math.floor(bounds.height));
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            context.setTransform(dpr, 0, 0, dpr, 0, 0);

            const count = Math.min(
                72,
                Math.max(30, Math.floor((width * height) / 26000)),
            );
            nodes = Array.from({ length: count }, (_, index) => {
                const band = index % 4;
                return {
                    x:
                        (index / count) * width +
                        (Math.random() - 0.5) * width * 0.18,
                    y:
                        height * (0.18 + band * 0.18) +
                        (Math.random() - 0.5) * height * 0.18,
                    vx: (Math.random() - 0.5) * 0.18,
                    vy: (Math.random() - 0.5) * 0.14,
                    radius: 1 + Math.random() * 1.9,
                    phase: Math.random() * Math.PI * 2,
                    accent: index % 5 === 0 ? "#b8ff6a" : "#5ee7ff",
                };
            });
        };

        const drawGrid = (time, theme) => {
            context.save();
            context.globalAlpha = 0.12 + theme.sceneIndex * 0.012;
            context.strokeStyle = hexToRgba(theme.accent, 0.16);
            context.lineWidth = 1;
            const offset = animate ? (time * 0.006) % 64 : 0;

            for (let x = -64 + offset; x < width + 64; x += 64) {
                context.beginPath();
                context.moveTo(x, 0);
                context.lineTo(x, height);
                context.stroke();
            }

            for (let y = -64 + offset * 0.5; y < height + 64; y += 64) {
                context.beginPath();
                context.moveTo(0, y);
                context.lineTo(width, y);
                context.stroke();
            }
            context.restore();
        };

        const drawWave = (time, yAnchor, color, amplitude, speed, alpha) => {
            context.save();
            context.globalAlpha = alpha;
            context.strokeStyle = color;
            context.lineWidth = 1.4;
            context.shadowBlur = 18;
            context.shadowColor = color;
            context.beginPath();

            for (let x = 0; x <= width; x += 14) {
                const y =
                    yAnchor +
                    Math.sin(x * 0.012 + time * speed) * amplitude +
                    Math.sin(x * 0.035 - time * speed * 0.72) *
                        amplitude *
                        0.38;
                if (x === 0) {
                    context.moveTo(x, y);
                } else {
                    context.lineTo(x, y);
                }
            }

            context.stroke();
            context.restore();
        };

        const drawNodes = (time, theme) => {
            const influenceX = pointer.active ? pointer.x : width * 0.72;
            const influenceY = pointer.active ? pointer.y : height * 0.24;

            nodes.forEach((node, index) => {
                if (animate) {
                    const dx = node.x - influenceX;
                    const dy = node.y - influenceY;
                    const distance = Math.max(1, Math.hypot(dx, dy));
                    const repulse =
                        pointer.active && distance < 150
                            ? (150 - distance) / 150
                            : 0;
                    node.x +=
                        node.vx +
                        Math.sin(time * 0.00025 + node.phase) * 0.08 +
                        (dx / distance) * repulse * 1.4;
                    node.y +=
                        node.vy +
                        Math.cos(time * 0.00022 + node.phase) * 0.06 +
                        (dy / distance) * repulse * 1.4;

                    if (node.x < -30) node.x = width + 30;
                    if (node.x > width + 30) node.x = -30;
                    if (node.y < -30) node.y = height + 30;
                    if (node.y > height + 30) node.y = -30;
                }

                for (let j = index + 1; j < nodes.length; j += 1) {
                    const other = nodes[j];
                    const dx = node.x - other.x;
                    const dy = node.y - other.y;
                    const distanceSquared = dx * dx + dy * dy;
                    const maxDistance = width < 720 ? 82 : 118;
                    if (distanceSquared > maxDistance * maxDistance) continue;

                    const distance = Math.sqrt(distanceSquared);
                    context.globalAlpha = 0.18 * (1 - distance / maxDistance);
                    context.strokeStyle = hexToRgba(theme.accent, 0.52);
                    context.lineWidth = 1;
                    context.beginPath();
                    context.moveTo(node.x, node.y);
                    context.lineTo(other.x, other.y);
                    context.stroke();
                }

                const nodeColor =
                    node.accent === "#b8ff6a" && theme.sceneIndex !== 4
                        ? node.accent
                        : theme.accent;
                context.globalAlpha = node.accent === "#b8ff6a" ? 0.72 : 0.52;
                context.fillStyle = nodeColor;
                context.shadowBlur = 16;
                context.shadowColor = nodeColor;
                context.beginPath();
                context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                context.fill();
                context.shadowBlur = 0;
            });
            context.globalAlpha = 1;
        };

        const paint = (time = 0) => {
            const theme = getTheme();
            context.clearRect(0, 0, width, height);

            const glow = context.createRadialGradient(
                width * 0.72,
                height * 0.22,
                0,
                width * 0.72,
                height * 0.22,
                Math.max(width, height) * 0.72,
            );
            glow.addColorStop(0, hexToRgba(theme.accent, 0.14));
            glow.addColorStop(0.32, "rgba(0, 200, 150, 0.075)");
            glow.addColorStop(1, "rgba(7, 8, 11, 0)");
            context.fillStyle = glow;
            context.fillRect(0, 0, width, height);

            drawGrid(time, theme);
            drawWave(
                time,
                height * 0.24,
                hexToRgba(theme.accent, 0.64),
                22,
                0.0016,
                0.46,
            );
            drawWave(
                time,
                height * 0.42,
                "rgba(184, 255, 106, 0.58)",
                18,
                -0.0012,
                0.32,
            );
            drawWave(
                time,
                height * 0.72,
                "rgba(255, 202, 95, 0.36)",
                14,
                0.001,
                0.2,
            );
            drawNodes(time, theme);
        };

        const loop = (time) => {
            if (time - lastPaint >= frameInterval) {
                lastPaint = time;
                paint(time);
            }
            frame = requestAnimationFrame(loop);
        };

        const start = () => {
            if (!animate || frame || !visible) return;
            frame = requestAnimationFrame(loop);
        };

        const stop = () => {
            if (!frame) return;
            cancelAnimationFrame(frame);
            frame = 0;
        };

        const handlePointerMove = (event) => {
            const bounds = canvas.getBoundingClientRect();
            pointer.x = event.clientX - bounds.left;
            pointer.y = event.clientY - bounds.top;
            pointer.active = true;
        };

        const handlePointerLeave = () => {
            pointer.active = false;
        };

        const handleVisibility = () => {
            visible = document.visibilityState === "visible";
            if (visible) {
                start();
            } else {
                stop();
            }
        };

        const observer = new ResizeObserver(() => {
            resize();
            paint();
        });

        resize();
        paint();
        observer.observe(parent);
        start();

        if (animate) {
            parent.addEventListener("pointermove", handlePointerMove, {
                passive: true,
            });
            parent.addEventListener("pointerleave", handlePointerLeave);
            document.addEventListener("visibilitychange", handleVisibility);
        }

        return () => {
            stop();
            observer.disconnect();
            parent.removeEventListener("pointermove", handlePointerMove);
            parent.removeEventListener("pointerleave", handlePointerLeave);
            document.removeEventListener("visibilitychange", handleVisibility);
        };
    }, []);

    return (
        <div className="home-dynamic-backdrop" aria-hidden="true">
            <canvas ref={canvasRef} />
        </div>
    );
}
