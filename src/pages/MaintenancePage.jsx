import React from "react";
import { ArrowRight, Wrench } from "lucide-react";
import { navigateTo } from "../hooks/useRoutePath";

/**
 * MaintenancePage — Trang bảo trì.
 * Có thể bật khi site đang được nâng cấp.
 */
export function MaintenancePage() {
    return (
        <section
            className="maintenance-page"
            aria-labelledby="maintenance-title"
        >
            <div className="empty-state-icon" aria-hidden="true">
                <Wrench size={28} />
            </div>
            <div className="maintenance-indicator" aria-live="polite">
                <span className="maintenance-dot" aria-hidden="true" />
                Đang bảo trì
            </div>
            <h1 id="maintenance-title" className="maintenance-title">
                Mình đang nâng cấp một vài thứ.
            </h1>
            <p className="maintenance-desc">
                Site sẽ quay lại trong thời gian ngắn. Trong lúc chờ, bạn có
                thể xem qua các case study hoặc liên hệ trực tiếp.
            </p>
            <span className="maintenance-eta">
                Dự kiến hoàn thành trong vài giờ
            </span>
            <div className="not-found-actions">
                <a
                    className="empty-state-action"
                    href="/work"
                    onClick={(e) => {
                        e.preventDefault();
                        navigateTo("/work");
                    }}
                >
                    Xem case study
                    <ArrowRight size={14} aria-hidden="true" />
                </a>
                <a
                    className="empty-state-action"
                    href="/contact"
                    onClick={(e) => {
                        e.preventDefault();
                        navigateTo("/contact");
                    }}
                >
                    Liên hệ
                    <ArrowRight size={14} aria-hidden="true" />
                </a>
            </div>
        </section>
    );
}
