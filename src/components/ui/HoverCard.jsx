import React from "react";

/**
 * HoverCard — Hiển thị popup khi hover vào trigger element.
 * Props:
 *   trigger: ReactNode (phần tử kích hoạt)
 *   title?: string (tiêu đề popup)
 *   description?: string (mô tả popup)
 *   children?: ReactNode (nội dung popup tùy chỉnh — override title+desc)
 *   className?: string
 *   popupClassName?: string
 */
export function HoverCard({
    trigger,
    title,
    description,
    children,
    className = "",
    popupClassName = "",
}) {
    return (
        <span className={`hover-card-trigger ${className}`.trim()}>
            {trigger}
            <span className={`hover-card-popup ${popupClassName}`.trim()}>
                {children ? (
                    children
                ) : (
                    <>
                        {title && (
                            <div className="hover-card-popup-title">{title}</div>
                        )}
                        {description && (
                            <div className="hover-card-popup-desc">
                                {description}
                            </div>
                        )}
                    </>
                )}
            </span>
        </span>
    );
}
