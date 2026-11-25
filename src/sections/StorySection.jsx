import { Component, Suspense, lazy, startTransition, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { StaticStory } from "./Story.jsx";

const loadFilm = () => import("../film/FilmStory.jsx");
const FilmStory = lazy(loadFilm);
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Mặc định hiện bản tĩnh (cũng là bản prerender). Khi gần vùng câu chuyện hoặc người xem bắt đầu cuộn/tương tác,
// máy không bật giảm chuyển động và khung hình đủ cao thì tải phim rồi thay vào lúc không gây giật.
const MIN_H_DESKTOP = 820;
const MIN_H_TABLET = 1040;
const MIN_H_MOBILE = 620;

function canFilm() {
    if (typeof window === "undefined" || window.__PRERENDER__) return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (w < 340) return false;
    if (w > 1180) return h >= MIN_H_DESKTOP;
    if (w > 600) return h >= MIN_H_TABLET;
    return h >= MIN_H_MOBILE;
}

class FilmErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { failed: false };
    }
    static getDerivedStateFromError() {
        return { failed: true };
    }
    componentDidCatch(err) {
        console.warn("[phim] lỗi runtime, quay về bản tĩnh:", err);
        this.props.onError?.();
    }
    render() {
        if (this.state.failed) return this.props.fallback;
        return this.props.children;
    }
}

export function StorySection() {
    // static: chờ tải | film: đang phát phim | unfit: khung tạm không vừa (có thể bật lại khi mở rộng) | off: tắt hẳn (giảm chuyển động / lỗi)
    const [mode, setMode] = useState("static");
    const [attempt, setAttempt] = useState(0);
    const hostRef = useRef(null);
    const unfitSizeRef = useRef(null);
    const scrollRestoreRef = useRef(null);

    // Lưu vị trí tương đối trước khi đổi giữa FilmStory và StaticStory để không bị nhảy chương khi resize/xoay màn hình.
    const captureScroll = useCallback(() => {
        const el = hostRef.current?.firstElementChild;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top >= 0) {
            scrollRestoreRef.current = null;
            return;
        }
        if (rect.bottom <= window.innerHeight) {
            scrollRestoreRef.current = { kind: "below", offset: -rect.bottom };
            return;
        }
        const span = Math.max(1, rect.height - window.innerHeight);
        scrollRestoreRef.current = { kind: "inside", ratio: Math.min(1, Math.max(0, -rect.top / span)) };
    }, []);

    useIsoLayoutEffect(() => {
        const pending = scrollRestoreRef.current;
        if (!pending) return;
        scrollRestoreRef.current = null;
        const el = hostRef.current?.firstElementChild;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const topDoc = rect.top + window.scrollY;
        if (pending.kind === "below") {
            const target = topDoc + rect.height + pending.offset;
            window.scrollTo(0, Math.max(0, target));
        } else if (pending.kind === "inside") {
            const span = Math.max(0, rect.height - window.innerHeight);
            window.scrollTo(0, Math.max(0, topDoc + pending.ratio * span));
        }
    }, [mode]);

    const handleUnfit = useCallback(() => {
        unfitSizeRef.current = { w: window.innerWidth, h: window.innerHeight };
        captureScroll();
        setMode("unfit");
    }, [captureScroll]);

    const handleError = useCallback(() => {
        setMode("off");
    }, []);

    useEffect(() => {
        if (typeof window === "undefined" || window.__PRERENDER__) return;
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        let alive = true;
        let started = false;
        let loaded = false;
        let settleTimer = 0;
        let resizeTimer = 0;
        let io = null;

        const triggerEvents = ["scroll", "wheel", "touchmove", "keydown"];
        let watchingSwap = false;
        let scrolling = window.location.hash === "#cau-chuyen";

        const clearTimers = () => {
            if (settleTimer) {
                clearTimeout(settleTimer);
                settleTimer = 0;
            }
            if (resizeTimer) {
                clearTimeout(resizeTimer);
                resizeTimer = 0;
            }
        };

        const detachTriggers = () => {
            triggerEvents.forEach((e) => window.removeEventListener(e, kick));
            if (io) {
                io.disconnect();
                io = null;
            }
        };

        const detachSwap = () => {
            if (watchingSwap) {
                window.removeEventListener("scroll", onSwapScroll);
                watchingSwap = false;
            }
        };

        const cleanupAll = () => {
            detachTriggers();
            detachSwap();
            clearTimers();
        };

        const canSwapNow = () => {
            if (!alive || mq.matches || !canFilm() || scrolling) return false;
            const el = hostRef.current?.firstElementChild;
            if (!el) return false;
            const rect = el.getBoundingClientRect();
            // Chỉ thay khi đoạn câu chuyện chưa tràn vào giữa khung nhìn (tránh nhấp nháy trên mobile),
            // hoặc đã cuộn êm dừng hẳn đúng đỉnh #cau-chuyen (khung 0 của phim khớp bản tĩnh chương 1).
            const hashLanded = window.location.hash === "#cau-chuyen" && Math.abs(rect.top) <= 8;
            return rect.top >= window.innerHeight * 0.85 || hashLanded;
        };

        const tryShow = () => {
            if (!loaded || !alive || mq.matches) return;
            if (!canSwapNow()) return;
            detachSwap();
            clearTimers();
            startTransition(() => {
                if (alive && !mq.matches && canFilm()) {
                    setMode("film");
                }
            });
        };

        const scheduleSettle = (delay = 220) => {
            if (settleTimer) clearTimeout(settleTimer);
            scrolling = true;
            settleTimer = setTimeout(() => {
                settleTimer = 0;
                scrolling = false;
                tryShow();
            }, delay);
        };

        function onSwapScroll() {
            scheduleSettle(220);
        }

        const armSwap = () => {
            if (!alive || mq.matches) return;
            if (canSwapNow()) {
                tryShow();
                return;
            }
            if (!watchingSwap) {
                watchingSwap = true;
                window.addEventListener("scroll", onSwapScroll, { passive: true });
            }
            if (scrolling) {
                scheduleSettle(window.location.hash === "#cau-chuyen" ? 650 : 220);
            }
        };

        const startLoad = () => {
            if (started || !alive || mq.matches || !canFilm()) return;
            started = true;
            detachTriggers();
            loadFilm()
                .then(() => {
                    if (!alive || mq.matches) return;
                    loaded = true;
                    armSwap();
                })
                .catch(() => {
                    if (alive) setMode("off");
                });
        };

        function kick() {
            startLoad();
        }

        const onMotion = () => {
            if (mq.matches) {
                alive = false;
                cleanupAll();
                setMode("off");
            } else if (canFilm()) {
                unfitSizeRef.current = null;
                setMode("static");
                setAttempt((a) => a + 1);
            }
        };
        mq.addEventListener("change", onMotion);

        // Khi người xem mở rộng cửa sổ hoặc xoay máy lại vừa khung, cho phép bật lại phim.
        const onResize = () => {
            if (resizeTimer) clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                resizeTimer = 0;
                if (!alive || mq.matches) return;
                if (mode === "unfit" && canFilm()) {
                    const prev = unfitSizeRef.current;
                    const grew = !prev || window.innerWidth > prev.w + 20 || window.innerHeight > prev.h + 20;
                    if (grew) {
                        unfitSizeRef.current = null;
                        captureScroll();
                        startTransition(() => setMode("film"));
                    }
                } else if (mode === "static" && !started && canFilm()) {
                    startLoad();
                }
            }, 260);
        };
        window.addEventListener("resize", onResize, { passive: true });

        if (mode === "static" && canFilm()) {
            if (scrolling) {
                scheduleSettle(650);
            }
            triggerEvents.forEach((e) => window.addEventListener(e, kick, { passive: true }));
            const host = hostRef.current;
            if (host && typeof IntersectionObserver !== "undefined") {
                io = new IntersectionObserver(
                    ([e]) => {
                        if (e.isIntersecting) startLoad();
                    },
                    { rootMargin: "350px 0px" },
                );
                io.observe(host);
            }
        }

        return () => {
            alive = false;
            cleanupAll();
            window.removeEventListener("resize", onResize);
            mq.removeEventListener("change", onMotion);
        };
    }, [mode, attempt, captureScroll]);

    return (
        <div ref={hostRef} className="story-host">
            {mode === "film" ? (
                <FilmErrorBoundary fallback={<StaticStory />} onError={handleError}>
                    <Suspense fallback={<StaticStory />}>
                        <FilmStory onUnfit={handleUnfit} />
                    </Suspense>
                </FilmErrorBoundary>
            ) : (
                <StaticStory />
            )}
        </div>
    );
}
