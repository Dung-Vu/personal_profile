import React, { useEffect, useRef } from "react";

/**
 * TimelineItem — Một mục trong timeline dọc.
 * Props:
 *   date: string (khoảng thời gian, VD: "2024—nay")
 *   title: string (tiêu đề)
 *   subtitle?: string (phụ đề — tổ chức, role)
 *   description?: string (mô tả chi tiết)
 *   tags?: string[] (các tag nhỏ)
 *   status?: "current" | "past" | "milestone" (mặc định: "past")
 *   index?: number (thứ tự, dùng cho stagger animation)
 */
export function TimelineItem({
    date,
    title,
    subtitle,
    description,
    tags = [],
    status = "past",
    index = 0,
}) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        if (reduceMotion) {
            el.classList.add("revealed");
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const delay = Math.min(index * 120, 600);
                    setTimeout(() => {
                        el.classList.add("revealed");
                    }, delay);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [index]);

    return (
        <div className="timeline-item" ref={ref}>
            {/* Left column: date + status */}
            <div className="timeline-label">
                <span className="timeline-date">{date}</span>
                {status !== "past" && (
                    <span className={`timeline-status ${status}`}>
                        {status === "current" ? "hiện tại" : "cột mốc"}
                    </span>
                )}
            </div>

            {/* Dot indicator */}
            <span
                className={`timeline-dot ${status}`}
                aria-hidden="true"
            />

            {/* Right column: content card */}
            <div className="timeline-content">
                <h3 className="timeline-content-title">{title}</h3>
                {subtitle && (
                    <span className="timeline-content-subtitle">
                        {subtitle}
                    </span>
                )}
                {description && (
                    <p className="timeline-content-desc">{description}</p>
                )}
                {tags.length > 0 && (
                    <div className="timeline-content-tags">
                        {tags.map((tag) => (
                            <span key={tag} className="timeline-content-tag">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

/**
 * Timeline — Container cho danh sách TimelineItem.
 * Props:
 *   children: TimelineItem elements
 *   className?: string
 */
export function Timeline({ children, className = "" }) {
    return (
        <div className={`timeline ${className}`.trim()}>
            {children}
        </div>
    );
}
