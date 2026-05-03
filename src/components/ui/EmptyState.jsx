import React from "react";

/**
 * EmptyState — Component hiển thị khi không có nội dung.
 * Props:
 *   icon: ReactNode (Lucide icon hoặc SVG)
 *   kicker?: string (label nhỏ phía trên title, VD: "404 / KHÔNG TÌM THẤY")
 *   title: string
 *   description?: string
 *   action?: ReactNode (nút hoặc link CTA)
 *   className?: string
 */
export function EmptyState({
    icon,
    kicker,
    title,
    description,
    action,
    className = "",
}) {
    return (
        <div className={`empty-state ${className}`.trim()}>
            {icon && (
                <div className="empty-state-icon" aria-hidden="true">
                    {icon}
                </div>
            )}
            {kicker && <span className="empty-state-kicker">{kicker}</span>}
            <h2 className="empty-state-title">{title}</h2>
            {description && (
                <p className="empty-state-desc">{description}</p>
            )}
            {action && <div className="empty-state-action-wrap">{action}</div>}
        </div>
    );
}
