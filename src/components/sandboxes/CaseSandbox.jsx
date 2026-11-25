import { AceLabelSandbox } from "./AceLabelSandbox.jsx";

const COPY = {
    vi: {
        eyebrow: "Thử công thức trực tiếp",
        note: "Tính trực tiếp trên trình duyệt · công thức minh hoạ",
        title: "Nhập số đo cửa, xem thông số cắt & tem xưởng",
        lead: "Đổi kích thước, kiểu may hoặc khổ vải để thấy hệ thống tự tính khổ cắt, số khoen và cảnh báo nối vải ngay lập tức.",
    },
    en: {
        eyebrow: "Live Formula Tool",
        note: "Runs locally in browser · illustrative formula",
        title: "Enter window specs, preview cut math & workshop label",
        lead: "Adjust dimensions, drape style, or bolt width to calculate fabric meters, hook count, and join warnings live.",
    },
};

export default function CaseSandbox({ slug, locale = "vi", tone = "apricot" }) {
    if (slug !== "ace-ra-tem") return null;

    const lang = locale === "en" ? "en" : "vi";
    const t = COPY[lang];
    const headingId = `sandbox-${slug}-title`;

    return (
        <section className={`sbx-section sbx-tone-${tone || "apricot"}`} aria-labelledby={headingId}>
            <div className="sbx-head">
                <div className="sbx-head-copy">
                    <span className="sbx-eyebrow">
                        <span className="dot" aria-hidden="true" />
                        {t.eyebrow}
                    </span>
                    <h2 id={headingId} className="sbx-title">
                        {t.title}
                    </h2>
                    <p className="sbx-lead">{t.lead}</p>
                </div>
                <span className="sbx-note">{t.note}</span>
            </div>
            <div className="sbx-body">
                <AceLabelSandbox locale={lang} />
            </div>
        </section>
    );
}
