import React from "react";

/**
 * SurfaceCard — Card container chung, có border + glass + shadow.
 * Props:
 *   variant: "default" | "inset" | "accent" | "flat"
 *   as: HTML tag (mặc định: "div")
 *   className: thêm class tùy chỉnh
 *   children: nội dung bên trong
 *   ...rest: các props HTML khác (onClick, id, ...)
 */
export function SurfaceCard({
    variant = "default",
    as: Tag = "div",
    className = "",
    children,
    ...rest
}) {
    const variantClass = variant !== "default" ? ` variant-${variant}` : "";

    return (
        <Tag className={`card-surface${variantClass} ${className}`.trim()} {...rest}>
            {children}
        </Tag>
    );
}
