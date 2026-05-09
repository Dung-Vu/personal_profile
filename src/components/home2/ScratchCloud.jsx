import { useEffect, useRef } from "react";

const PARTICLE_SEED = 24681357;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const createRandom = (seed = PARTICLE_SEED) => {
    let state = seed >>> 0;
    return () => {
        state = (state * 1664525 + 1013904223) >>> 0;
        return state / 4294967296;
    };
};

const drawParticleMask = (ctx, width, height, random) => {
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const cx = width * 0.5;
    const cy = height * 0.52; // slightly lower
    const isMobile = width < 768;

    if (isMobile) {
        // --- MOBILE DESIGN: ORB / CORE ---
        const r = Math.min(width, height) * 0.22;
        
        // 1. Data Beam (Shooting down from above)
        const beamGrad = ctx.createLinearGradient(0, 0, 0, cy - r);
        beamGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
        beamGrad.addColorStop(1, "rgba(255, 255, 255, 0.8)");
        ctx.fillStyle = beamGrad;
        ctx.fillRect(cx - width * 0.015, 0, width * 0.03, cy - r);

        // 2. Core Sphere
        ctx.filter = 'blur(1.5px)';
        const orbGrad = ctx.createRadialGradient(cx - r*0.3, cy - r*0.3, 0, cx, cy, r);
        orbGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
        orbGrad.addColorStop(0.4, "rgba(180, 180, 180, 0.8)");
        orbGrad.addColorStop(0.8, "rgba(80, 80, 80, 0.5)");
        orbGrad.addColorStop(1, "rgba(20, 20, 20, 0.1)");
        ctx.fillStyle = orbGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();

        // 3. Holographic Rings (Equator)
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(Math.PI / 8);
        ctx.lineWidth = width * 0.006;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
        ctx.filter = 'blur(2px)';
        ctx.beginPath();
        ctx.ellipse(0, 0, r * 1.6, r * 0.35, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.rotate(-Math.PI / 4);
        ctx.lineWidth = width * 0.003;
        ctx.strokeStyle = "rgba(200, 200, 200, 0.6)";
        ctx.filter = 'blur(1.5px)';
        ctx.beginPath();
        ctx.ellipse(0, 0, r * 1.4, r * 0.25, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // 4. Inner sharp rings / Wireframe
        ctx.strokeStyle = "rgba(255, 255, 255, 1)";
        ctx.lineWidth = width * 0.003;
        ctx.filter = 'blur(0.5px)';
        ctx.beginPath();
        ctx.arc(cx, cy, r * 0.6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx, cy, r * 0.8, 0, Math.PI * 2);
        ctx.stroke();

        // 5. Energy Field (Ambient Particles)
        ctx.filter = 'none';
        ctx.fillStyle = "rgba(100, 100, 100, 0.5)";
        const ambientCount = 2500;
        for (let index = 0; index < ambientCount; index += 1) {
            const py = cy + (random() - 0.5) * height * 0.8;
            const spreadX = r * 1.5 + Math.pow(Math.abs(py - cy) / (height * 0.4), 1.5) * width * 0.2;
            const px = cx + (random() - 0.5) * spreadX * 2;
            const radius = 0.5 + random() * 1.5;
            ctx.fillRect(px, py, radius, radius);
        }

    } else {
        // --- DESKTOP DESIGN: MONOLITH PRISM ---
        const w = width * 0.12;
        const h = height * 0.25;

        // 1. Data Beam (Shooting down from above)
        const beamGrad = ctx.createLinearGradient(0, 0, 0, cy - h);
        beamGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
        beamGrad.addColorStop(1, "rgba(255, 255, 255, 0.8)");
        ctx.fillStyle = beamGrad;
        ctx.fillRect(cx - width * 0.015, 0, width * 0.03, cy - h);

        // 2. The Monolith Prism
        // Center vertex is slightly offset to give isometric 3D perspective
        const midY = cy + h * 0.1;
        
        // Tiny blur so particles blend smoothly across the facets
        ctx.filter = `blur(${Math.max(2, width * 0.003)}px)`;

        // Top-left facet (Bright highlight)
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.beginPath();
        ctx.moveTo(cx, cy - h); ctx.lineTo(cx - w, cy); ctx.lineTo(cx, midY); ctx.fill();

        // Top-right facet (Shadow)
        ctx.fillStyle = "rgba(80, 80, 80, 0.4)";
        ctx.beginPath();
        ctx.moveTo(cx, cy - h); ctx.lineTo(cx + w, cy); ctx.lineTo(cx, midY); ctx.fill();

        // Bottom-left facet (Midtone)
        ctx.fillStyle = "rgba(180, 180, 180, 0.7)";
        ctx.beginPath();
        ctx.moveTo(cx - w, cy); ctx.lineTo(cx, cy + h); ctx.lineTo(cx, midY); ctx.fill();

        // Bottom-right facet (Dark)
        ctx.fillStyle = "rgba(40, 40, 40, 0.2)";
        ctx.beginPath();
        ctx.moveTo(cx + w, cy); ctx.lineTo(cx, cy + h); ctx.lineTo(cx, midY); ctx.fill();

        // 3. Holographic Wireframe Edges (Super Bright)
        ctx.strokeStyle = "rgba(255, 255, 255, 1)";
        ctx.lineWidth = width * 0.002;
        ctx.filter = `blur(1px)`;
        ctx.beginPath();
        // Outer shell
        ctx.moveTo(cx, cy - h); ctx.lineTo(cx - w, cy); ctx.lineTo(cx, cy + h); ctx.lineTo(cx + w, cy); ctx.closePath();
        ctx.stroke();
        // Inner connecting lines
        ctx.beginPath();
        ctx.moveTo(cx, cy - h); ctx.lineTo(cx, midY);
        ctx.moveTo(cx - w, cy); ctx.lineTo(cx, midY);
        ctx.moveTo(cx + w, cy); ctx.lineTo(cx, midY);
        ctx.moveTo(cx, cy + h); ctx.lineTo(cx, midY);
        ctx.stroke();

        // 4. Data Rings (Circling the crystal)
        ctx.save();
        ctx.translate(cx, cy + h * 0.3); // Ring 1 near bottom
        ctx.rotate(Math.PI / 16);
        ctx.lineWidth = width * 0.005;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        ctx.filter = `blur(${Math.max(3, width * 0.005)}px)`;
        ctx.beginPath();
        ctx.ellipse(0, 0, w * 1.6, w * 0.4, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.translate(cx, cy - h * 0.2); // Ring 2 near top
        ctx.rotate(-Math.PI / 12);
        ctx.lineWidth = width * 0.003;
        ctx.strokeStyle = "rgba(200, 200, 200, 0.6)";
        ctx.filter = `blur(${Math.max(2, width * 0.003)}px)`;
        ctx.beginPath();
        ctx.ellipse(0, 0, w * 1.2, w * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // 5. Energy Field (Ambient Particles)
        ctx.filter = 'none';
        ctx.fillStyle = "rgba(100, 100, 100, 0.5)";
        const ambientCount = 3000;
        for (let index = 0; index < ambientCount; index += 1) {
            // Create an hourglass-like distribution around the crystal
            const py = cy + (random() - 0.5) * height * 0.8;
            // The further from center Y, the wider the spread
            const spreadX = w * 1.2 + Math.pow(Math.abs(py - cy) / (height * 0.4), 1.5) * width * 0.2;
            const px = cx + (random() - 0.5) * spreadX * 2;
            const radius = 0.5 + random() * 1.5;
            ctx.fillRect(px, py, radius, radius);
        }
    }
    
    ctx.restore();
};

export function ScratchCloud({ motionEnabled }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return undefined;

        const ctx = canvas.getContext("2d");
        if (!ctx) return undefined;

        const pointer = { x: 0, y: 0, active: false };
        let width = 0;
        let height = 0;
        let points = [];
        let frame = 0;
        let isVisible = true;

        // Check accessibility preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const shouldAnimate = motionEnabled !== false && !prefersReducedMotion;

        const buildPoints = () => {
            const random = createRandom();
            const mask = document.createElement("canvas");
            const isMobile = window.innerWidth < 768;
            const maskScale = isMobile ? 1.0 : 1.25;
            const maskWidth = Math.max(220, Math.floor(width * maskScale));
            const maskHeight = Math.max(300, Math.floor(height * maskScale));
            mask.width = maskWidth;
            mask.height = maskHeight;

            const maskCtx = mask.getContext("2d", { willReadFrequently: true });
            if (!maskCtx) return;

            drawParticleMask(maskCtx, maskWidth, maskHeight, random);

            const image = maskCtx.getImageData(0, 0, maskWidth, maskHeight);
            const data = image.data;
            // Reduce the step on mobile to increase the number of points (lower step = more points)
            const step = isMobile ? 2.6 : 2.8;
            const scaledStep = Math.max(2, Math.floor(step * maskScale));
            const nextPoints = [];

            for (let y = 0; y < maskHeight; y += scaledStep) {
                for (let x = 0; x < maskWidth; x += scaledStep) {
                    const index = (y * maskWidth + x) * 4;
                    const luminance = data[index];
                    if (luminance < 34) continue;

                    const strength = luminance / 255;
                    const keep =
                        strength > 0.82
                            ? 0.96
                            : strength > 0.55
                              ? 0.76
                              : 0.42;
                    if (random() > keep) continue;

                    const px = x / maskScale + (random() - 0.5) * step * 1.4;
                    const py = y / maskScale + (random() - 0.5) * step * 1.4;
                    const size = 0.8 + strength * 1.2 + random() * 0.5;

                    nextPoints.push({
                        baseX: px,
                        baseY: py,
                        x: px + (random() - 0.5) * 22,
                        y: py + (random() - 0.5) * 22,
                        vx: 0,
                        vy: 0,
                        size,
                        alpha: 0.3 + strength * 0.7,
                        phase: random() * Math.PI * 2,
                        spring: 0.026 + random() * 0.015,
                    });
                }
            }

            points = nextPoints;
        };

        const resize = () => {
            const rect =
                canvas.parentElement?.getBoundingClientRect() ??
                canvas.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);

            width = Math.max(1, rect.width);
            height = Math.max(1, rect.height);
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            buildPoints();
        };

        const paint = (time = 0) => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "rgba(10, 11, 14, 1)"; // True dark particles matching devl.dev

            points.forEach((point) => {
                const dxHome = point.baseX - point.x;
                const dyHome = point.baseY - point.y;
                point.vx += dxHome * point.spring;
                point.vy += dyHome * point.spring;

                if (shouldAnimate && pointer.active) {
                    const dx = point.x - pointer.x;
                    const dy = point.y - pointer.y;
                    const distance = Math.max(1, Math.hypot(dx, dy));
                    const radius = 105;
                    if (distance < radius) {
                        const force = (1 - distance / radius) * 2.1;
                        point.vx += (dx / distance) * force;
                        point.vy += (dy / distance) * force;
                    }
                }

                // If no animation, particles stay at baseX/baseY without moving
                if (shouldAnimate) {
                    point.vx += Math.sin(time * 0.001 + point.phase) * 0.002;
                    point.vy += Math.cos(time * 0.0011 + point.phase) * 0.002;
                }
                point.vx *= 0.86;
                point.vy *= 0.86;
                point.x += point.vx;
                point.y += point.vy;

                const shimmer = shouldAnimate ? (0.86 + Math.sin(time * 0.0015 + point.phase) * 0.14) : 1;
                ctx.globalAlpha = point.alpha * shimmer;
                ctx.fillRect(
                    point.x - point.size * 0.5,
                    point.y - point.size * 0.5,
                    point.size,
                    point.size,
                );
            });

            ctx.globalAlpha = 1;
            
            if (shouldAnimate && isVisible) {
                frame = window.requestAnimationFrame(paint);
            }
        };

        const handlePointerMove = (event) => {
            const rect = canvas.getBoundingClientRect();
            const clientX = event.touches
                ? event.touches[0].clientX
                : event.clientX;
            const clientY = event.touches
                ? event.touches[0].clientY
                : event.clientY;

            pointer.x = clientX - rect.left;
            pointer.y = clientY - rect.top;
            pointer.active = true;
        };

        const handlePointerLeave = () => {
            pointer.active = false;
        };

        const resizeObserver = new ResizeObserver(() => {
            resize();
            paint(0);
        });
        
        const intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
                if (isVisible && shouldAnimate && !frame) {
                    frame = window.requestAnimationFrame(paint);
                } else if (!isVisible && frame) {
                    window.cancelAnimationFrame(frame);
                    frame = 0;
                }
            });
        }, { rootMargin: "100px" });

        resize();
        paint(0);
        resizeObserver.observe(canvas.parentElement ?? canvas);
        intersectionObserver.observe(canvas);

        if (shouldAnimate) {
            frame = window.requestAnimationFrame(paint);
            canvas.addEventListener("pointermove", handlePointerMove, {
                passive: true,
            });
            canvas.addEventListener("pointerleave", handlePointerLeave);
            canvas.addEventListener("touchmove", handlePointerMove, {
                passive: true,
            });
            canvas.addEventListener("touchstart", handlePointerMove, {
                passive: true,
            });
            canvas.addEventListener("touchend", handlePointerLeave);
            canvas.addEventListener("touchcancel", handlePointerLeave);
        }

        window.addEventListener("resize", resize);

        return () => {
            if (frame) {
                window.cancelAnimationFrame(frame);
            }
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("pointermove", handlePointerMove);
            canvas.removeEventListener("pointerleave", handlePointerLeave);
            canvas.removeEventListener("touchmove", handlePointerMove);
            canvas.removeEventListener("touchstart", handlePointerMove);
            canvas.removeEventListener("touchend", handlePointerLeave);
            canvas.removeEventListener("touchcancel", handlePointerLeave);
        };
    }, [motionEnabled]);

    return (
        <canvas
            ref={canvasRef}
            className="h2-scratch-canvas"
            aria-hidden="true"
        />
    );
}
