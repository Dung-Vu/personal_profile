import { Link } from "../lib/router.jsx";

export default function NotFound() {
    return (
        <main id="main" className="page page-404">
            <div className="wrap">
                <span className="label">
                    <span className="dot" />
                    Lỗi 404
                </span>
                <h1 id="not-found-title" className="display nf-title">
                    Trang này không có trong hệ thống.
                </h1>
                <p className="lead">Có thể đường dẫn đã đổi. Quay về trang chủ hoặc xem các dự án đang chạy.</p>
                <div className="ctas">
                    <Link className="btn btn-ink" href="/">
                        Về trang chủ
                    </Link>
                    <Link className="btn btn-ghost" href="/work">
                        Xem dự án <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </main>
    );
}
