import React from "react";
import { ArrowRight } from "lucide-react";
import { SurfaceCard } from "./SurfaceCard";
import { navigateTo } from "../../hooks/useRoutePath";

/**
 * ProjectCard — Card hiển thị project với ảnh, title, tags, CTA.
 * Props:
 *   title: string
 *   description: string
 *   tags?: string[]
 *   coverImage?: string (URL ảnh)
 *   kicker?: string (label nhỏ phía trên title)
 *   ctaLabel?: string (mặc định: "Xem case study")
 *   ctaRoute?: string (route để navigate)
 *   variant: SurfaceCard variant
 *   className: thêm class
 */
export function ProjectCard({
    title,
    description,
    tags = [],
    coverImage,
    kicker,
    ctaLabel = "Xem case study",
    ctaRoute,
    variant = "default",
    className = "",
}) {
    const handleClick = () => {
        if (ctaRoute) navigateTo(ctaRoute);
    };

    return (
        <SurfaceCard
            variant={variant}
            className={`project-card ${className}`.trim()}
            onClick={ctaRoute ? handleClick : undefined}
            style={ctaRoute ? { cursor: "pointer" } : undefined}
        >
            {/* Cover image area */}
            <div className="project-card-cover">
                {coverImage ? (
                    <img src={coverImage} alt={title} loading="lazy" />
                ) : (
                    <div className="project-card-cover-placeholder">
                        {title.slice(0, 3).toUpperCase()}
                    </div>
                )}
            </div>

            {/* Body */}
            <div className="project-card-body">
                {kicker && (
                    <span className="project-card-kicker">{kicker}</span>
                )}
                <h3 className="project-card-title">{title}</h3>
                <p className="project-card-desc">{description}</p>

                {tags.length > 0 && (
                    <div className="project-card-tags">
                        {tags.map((tag) => (
                            <span key={tag} className="project-card-tag">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer CTA */}
            {ctaRoute && (
                <div className="project-card-footer">
                    <span>{ctaLabel}</span>
                    <ArrowRight size={14} aria-hidden="true" />
                </div>
            )}
        </SurfaceCard>
    );
}

/**
 * ProjectCardGrid — Grid chứa nhiều ProjectCard.
 */
export function ProjectCardGrid({ children, className = "" }) {
    return (
        <div className={`project-card-grid ${className}`.trim()}>
            {children}
        </div>
    );
}
