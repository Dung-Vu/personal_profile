import { ArrowRight, CornerDownLeft } from "lucide-react";
import { navigateTo } from "../hooks/useRoutePath";

/**
 * NotFoundPage — 404 page.
 * Dùng khi route không tồn tại.
 */
export function NotFoundPage() {
    return (
        <section className="not-found-page" aria-labelledby="not-found-title">
            <span className="not-found-code" aria-hidden="true">
                404
            </span>
            <h1 id="not-found-title" className="not-found-title">
                Trang này không tồn tại.
            </h1>
            <p className="not-found-desc">
                Địa chỉ bạn nhập không khớp với bất kỳ route nào. Quay lại trang
                chủ để tiếp tục.
            </p>
            <div className="not-found-actions">
                <a
                    className="empty-state-action"
                    href="/"
                    onClick={(e) => {
                        e.preventDefault();
                        navigateTo("/");
                    }}
                >
                    <CornerDownLeft size={14} aria-hidden="true" />
                    Về trang chủ
                </a>
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
            </div>
        </section>
    );
}
