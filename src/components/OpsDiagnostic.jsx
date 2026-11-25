import { useState } from "react";
import { getProjectsContent } from "../content/index.js";
import { localizePath } from "../lib/i18n.js";
import { Link } from "../lib/router.jsx";

const MODELS = [
    {
        id: "showroom",
        vi: { title: "Showroom / Bán lẻ", desc: "Bán tại quầy, tồn kho theo mã/số khung, trả góp hoặc nhiều chi nhánh" },
        en: { title: "Showroom / Retail", desc: "Counter sales, serialized inventory, installments, or multiple branches" },
    },
    {
        id: "workshop",
        vi: { title: "Xưởng sản xuất / Gia công", desc: "Nhận số đo khách, tính định mức nguyên liệu, in tem & theo dõi đơn" },
        en: { title: "Workshop / Manufacturing", desc: "Custom measurements, cutting/BOM formulas, workshop labels & job tracking" },
    },
    {
        id: "odoo",
        vi: { title: "Đang chạy Odoo", desc: "Đã có Odoo cho bán hàng / kho / kế toán nhưng còn nhiều bước thủ công" },
        en: { title: "Already running Odoo", desc: "Odoo is live for sales/warehouse/helpdesk but manual friction remains" },
    },
    {
        id: "services",
        vi: { title: "Vận hành / Dịch vụ nhiều nhóm", desc: "Nhiều phòng ban phối hợp qua Zalo, bảng tính, đối soát và báo cáo" },
        en: { title: "Operations / Multi-team Services", desc: "Multiple teams coordinating over chat, spreadsheets, and recurring reports" },
    },
];

const BOTTLENECKS = [
    {
        id: "chat",
        vi: { title: "Việc giao bị trôi trong Zalo / chat", desc: "Không rõ ai đang cầm việc, tới hạn mới phát hiện trễ" },
        en: { title: "Tasks lost in Zalo / chat threads", desc: "Unclear ownership and missed deadlines buried in group messages" },
    },
    {
        id: "excel",
        vi: { title: "File Excel chậm, dễ sai công thức", desc: "Nhiều phiên bản rời rạc, nhập tay lặp lại hoặc lỗi macro" },
        en: { title: "Slow, error-prone Excel files", desc: "Conflicting versions, manual re-entry, or fragile spreadsheet macros" },
    },
    {
        id: "odoo-manual",
        vi: { title: "Odoo còn nhiều thao tác lặp bằng tay", desc: "Nhập serial, in tem, báo đơn, kiểm kho tốn nhiều công sức" },
        en: { title: "Manual bottlenecks inside Odoo", desc: "Serial entry, label printing, order alerts, or stocktake reconciliation" },
    },
    {
        id: "reporting",
        vi: { title: "Báo cáo & đối soát trễ, lệch số", desc: "Cuối ngày/tuần mới gom được số, khó đối chiếu nguồn dữ liệu" },
        en: { title: "Delayed reporting & reconciliation", desc: "Manual end-of-day rollups with frequent discrepancies across sources" },
    },
];

const TEAM_SIZES = [
    { id: "2-5", label: "2–5", mid: 3.5 },
    { id: "6-15", label: "6–15", mid: 10 },
    { id: "15-40", label: "15–40", mid: 25 },
    { id: "40+", label: "40+", mid: 50 },
];

const HOURS_OPTIONS = [
    { value: 2, vi: "2 giờ / tuần", en: "2 hrs / wk" },
    { value: 5, vi: "5 giờ / tuần", en: "5 hrs / wk" },
    { value: 8, vi: "8 giờ / tuần", en: "8 hrs / wk" },
    { value: 12, vi: "12 giờ / tuần", en: "12 hrs / wk" },
];

const TOOLS = [
    { id: "Zalo", vi: "Zalo", en: "Zalo" },
    { id: "Excel / Sheets", vi: "Excel / Sheets", en: "Excel / Sheets" },
    { id: "Odoo", vi: "Odoo", en: "Odoo" },
    { id: "POS / ERP", vi: "POS / ERP", en: "POS / ERP" },
    { id: "Paper", vi: "Giấy / Sổ sách", en: "Paper / Ledgers" },
];

function computeRecommendation({ model, bottleneck, tools, lang }) {
    const hasOdoo = model === "odoo" || bottleneck === "odoo-manual" || tools.includes("Odoo");

    if (hasOdoo && (model === "odoo" || bottleneck === "odoo-manual")) {
        return {
            track:
                lang === "en"
                    ? "Optimize Odoo + Lightweight Satellite Tools"
                    : "Tối ưu Odoo + công cụ vệ tinh gọn nhẹ",
            summary:
                lang === "en"
                    ? "Keep Odoo as the core source of truth. Automate the repetitive edges (RFID serial sync, label printing, helpdesk SLA, inventory diff bot) instead of rebuilding from scratch."
                    : "Giữ nguyên Odoo làm trục chính, chỉ tự động hoá đúng các điểm tắc lặp lại (đồng bộ serial, in nhãn, phiếu helpdesk có hạn, bot đối soát kho) thay vì đập đi làm lại.",
            slugs: ["odoo-bonario", bottleneck === "chat" ? "reminder-hub" : "ace-ra-tem"],
            goal:
                lang === "en"
                    ? "Eliminate repetitive manual steps around Odoo, track SLA per ticket, and keep a clean audit trail."
                    : "Giảm thao tác tay lặp lại quanh Odoo, theo dõi hạn xử lý theo phiếu và có nhật ký đối soát rõ ràng.",
        };
    }

    if (model === "workshop" || bottleneck === "excel") {
        return {
            track:
                lang === "en"
                    ? "Focused Web Tool Replacing Fragile Excel"
                    : "Phần mềm web gọn thay file Excel lỗi",
            summary:
                lang === "en"
                    ? "Move calculation rules out of copy-pasted spreadsheets into one verified web tool with unit-tested formulas, clean data entry, and instant PDF/label output."
                    : "Chuyển bộ công thức từ file Excel rời rạc sang 1 công cụ web thống nhất: có kiểm thử tự động từng công thức, nhập liệu 1 lần và xuất phiếu/tem chuẩn.",
            slugs: ["ace-ra-tem", model === "showroom" ? "evone" : "odoo-bonario"],
            goal:
                lang === "en"
                    ? "Zero formula drift across machines, faster quoting/labeling, and one source of truth."
                    : "Không còn sai công thức giữa các máy, rút ngắn thời gian tính & ra phiếu, dùng chung một phiên bản chuẩn.",
        };
    }

    if (model === "showroom") {
        return {
            track:
                lang === "en"
                    ? "Focused Vertical ERP (Sales · Inventory · Receivables)"
                    : "ERP gọn theo ngành (Bán hàng · Kho · Công nợ)",
            summary:
                lang === "en"
                    ? "Build a focused industry system matching how your counter and warehouse actually work — serialized stock, payment tracking, and offline resilience."
                    : "Dựng hệ thống vừa vặn đúng thứ tự việc từ quầy bán tới kho — quản lý tồn kho theo từng mã/số khung, lịch thu công nợ và chạy ổn định kể cả lúc mất mạng.",
            slugs: ["evone", bottleneck === "chat" ? "reminder-hub" : "odoo-bonario"],
            goal:
                lang === "en"
                    ? "Real-time inventory visibility across branches, clean receivables tracking, and zero end-of-day re-entry."
                    : "Thấy rõ tồn kho & công nợ tức thời giữa các chi nhánh, không còn gõ lại sổ sách cuối ngày.",
        };
    }

    if (bottleneck === "chat") {
        return {
            track:
                lang === "en"
                    ? "Chat Reminder Bot + AI Operations Workflow"
                    : "Bot nhắc việc nhóm chat + quy trình AI",
            summary:
                lang === "en"
                    ? "Keep teams inside the chat app they already use while a bot extracts owners, tasks, and deadlines automatically and sends quiet business-hour reminders."
                    : "Giữ nguyên thói quen trao đổi trên nhóm chat, để bot + AI tự bắt người nhận và hạn chót, nhắc đúng giờ hành chính và gom việc mở lên bảng theo dõi.",
            slugs: ["reminder-hub", "ai-operator"],
            goal:
                lang === "en"
                    ? "Stop tasks from slipping through chat threads with clear ownership and zero spam."
                    : "Không còn bỏ sót việc giao trong nhóm chat, rõ người chịu trách nhiệm và không làm phiền ngoài giờ.",
        };
    }

    return {
        track:
            lang === "en"
                ? "Automated Data Aggregation & Alert Pipeline"
                : "Luồng gom dữ liệu, cảnh báo & tự đối soát",
        summary:
            lang === "en"
                ? "Consolidate scattered data streams into one live dashboard with automated discrepancy checks, clean alerts, and verifiable history."
                : "Gom dữ liệu từ nhiều nguồn về một bảng theo dõi chuẩn, tự động phát hiện lệch số và ghi nhận lịch sử đối chiếu để không phải tổng hợp tay.",
        slugs: ["tca", hasOdoo ? "odoo-bonario" : "ai-operator"],
        goal:
            lang === "en"
                ? "Cut manual reporting time and catch operational anomalies early with verifiable numbers."
                : "Giảm thời gian gom báo cáo thủ công, phát hiện sai lệch sớm và có số liệu đối chiếu minh bạch.",
    };
}

const COPY = {
    vi: {
        eyebrow: "Khảo sát nhanh 60 giây",
        title: "Ước lượng giờ làm tay & hướng xử lý phù hợp.",
        lead: "Trả lời 4 câu ngắn để xem ước tính minh bạch, 2 dự án gần nhất với bài toán của anh/chị và điền sẵn vào biểu mẫu gửi yêu cầu.",
        stepLabel: (cur) => `Bước ${String(cur).padStart(2, "0")} / 04`,
        steps: ["Mô hình", "Chỗ tắc chính", "Quy mô & giờ tay", "Công cụ hiện có"],
        q1: "1. Mô hình vận hành hiện tại của anh/chị gần nhất với nhóm nào?",
        q2: "2. Nút thắt nào đang tốn nhiều công sức hoặc hay sai nhất?",
        q3Team: "3a. Quy mô nhóm trực tiếp tham gia quy trình này?",
        q3TeamUnit: "người",
        q3Hours: "3b. Ước lượng mỗi người tốn bao nhiêu giờ làm tay lặp lại mỗi tuần?",
        q4: "4. Đội đang dùng những công cụ nào? (chọn nhiều mục được)",
        back: "← Quay lại",
        next: "Tiếp theo →",
        seeResult: "Xem đề xuất →",
        reset: "Làm lại từ đầu",
        editAnswers: "Chỉnh lại câu trả lời",
        resultEyebrow: "Kết quả khảo sát sơ bộ",
        hoursTitle: "Ước lượng thời gian thao tác tay mỗi tháng",
        hoursUnit: "giờ / tháng",
        formulaCaption: (mid, hrs, total) =>
            `Công thức minh bạch: ${mid} người (trung bình nhóm) × ${hrs} giờ/tuần × 4,3 tuần = ~${total} giờ/tháng`,
        recTitle: "Hướng kiến trúc gợi ý",
        caveat:
            "Lưu ý thẳng thắn: Nếu bài toán chỉ cần dọn lại file Excel hoặc chỉnh cấu hình công cụ sẵn có là chạy ổn, mình sẽ nói thẳng — không vẽ thêm hệ thống không cần thiết.",
        casesTitle: "2 hệ thống đã chạy gần nhất với bài toán của anh/chị",
        prefillBtn: "Điền sẵn vào biểu mẫu gửi yêu cầu",
        prefilledDone: "Đã điền sẵn vào biểu mẫu bên dưới — anh/chị kiểm tra hoặc chỉnh thêm rồi gửi nhé.",
        progressAria: "Tiến độ khảo sát 4 bước",
        peopleWord: "người",
    },
    en: {
        eyebrow: "60-Second Ops Diagnostic",
        title: "Estimate manual hours & see the leanest technical fit.",
        lead: "Answer 4 quick questions for a transparent manual-time estimate, the 2 closest live systems, and an instant brief prefill.",
        stepLabel: (cur) => `Step ${String(cur).padStart(2, "0")} / 04`,
        steps: ["Business model", "Main bottleneck", "Team & hours", "Current tools"],
        q1: "1. Which operating model best matches your team?",
        q2: "2. Where is the biggest operational bottleneck today?",
        q3Team: "3a. How many people touch this workflow directly?",
        q3TeamUnit: "people",
        q3Hours: "3b. Roughly how many hours of repetitive manual work per person each week?",
        q4: "4. Which tools does your team use today? (select all that apply)",
        back: "← Back",
        next: "Next →",
        seeResult: "See recommendation →",
        reset: "Start over",
        editAnswers: "Edit answers",
        resultEyebrow: "Diagnostic Snapshot",
        hoursTitle: "Estimated repetitive manual workload",
        hoursUnit: "hrs / month",
        formulaCaption: (mid, hrs, total) =>
            `Transparent formula: ${mid} people (band midpoint) × ${hrs} hrs/wk × 4.3 weeks = ~${total} hrs/month`,
        recTitle: "Recommended architecture track",
        caveat:
            "Honest caveat: If a simple Excel cleanup or existing config fix solves it cleanly, I will tell you straight instead of pitching new software.",
        casesTitle: "2 closest live systems in my portfolio",
        prefillBtn: "Prefill Request Form",
        prefilledDone: "Prefilled into the brief form below — tweak anything you like and send.",
        progressAria: "4-step diagnostic progress",
        peopleWord: "people",
    },
};

export function OpsDiagnostic({ locale = "vi", onPrefill }) {
    const lang = locale === "en" ? "en" : "vi";
    const t = COPY[lang];
    const { getProject } = getProjectsContent(lang);

    const [step, setStep] = useState(1); // 1..4 | 5 (result)
    const [model, setModel] = useState("showroom");
    const [bottleneck, setBottleneck] = useState("excel");
    const [teamId, setTeamId] = useState("6-15");
    const [hoursPerWeek, setHoursPerWeek] = useState(5);
    const [tools, setTools] = useState(["Zalo", "Excel / Sheets"]);
    const [prefilledNote, setPrefilledNote] = useState("");

    const teamBand = TEAM_SIZES.find((b) => b.id === teamId) || TEAM_SIZES[1];
    const monthlyHours = Math.round(teamBand.mid * hoursPerWeek * 4.3);

    const toggleTool = (id) => {
        setTools((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
    };

    const reset = () => {
        setStep(1);
        setModel("showroom");
        setBottleneck("excel");
        setTeamId("6-15");
        setHoursPerWeek(5);
        setTools(["Zalo", "Excel / Sheets"]);
        setPrefilledNote("");
    };

    const rec = computeRecommendation({ model, bottleneck, tools, lang });
    const matchedCases = rec.slugs.map((slug) => getProject(slug)).filter(Boolean);

    const handlePrefill = () => {
        const modelObj = MODELS.find((m) => m.id === model)?.[lang];
        const bottleObj = BOTTLENECKS.find((b) => b.id === bottleneck)?.[lang];
        const selectedTools =
            tools.length > 0
                ? tools.map((id) => TOOLS.find((x) => x.id === id)?.[lang] || id).join(", ")
                : lang === "en"
                  ? "Not specified"
                  : "Chưa chọn";

        const y1 =
            lang === "en"
                ? `${modelObj.title} (${teamBand.label} people), spending ~${hoursPerWeek} hrs/person/week on repetitive steps.`
                : `Mô hình ${modelObj.title} (nhóm ${teamBand.label} người), tốn khoảng ${hoursPerWeek} giờ/người/tuần cho thao tác lặp.`;
        const y2 = `${bottleObj.title} — ${bottleObj.desc}.`;
        const y3 = rec.goal;
        const y4 = selectedTools;
        const diagnosticSummary =
            lang === "en"
                ? `${modelObj.title} · ${teamBand.label} people × ${hoursPerWeek}h/wk ≈ ${monthlyHours}h/mo · Suggested: ${rec.track}`
                : `${modelObj.title} · ${teamBand.label} người × ${hoursPerWeek}h/tuần ≈ ${monthlyHours} giờ/tháng · Gợi ý: ${rec.track}`;

        onPrefill?.({ y1, y2, y3, y4, diagnosticSummary });
        setPrefilledNote(t.prefilledDone);

        if (typeof document !== "undefined") {
            const target = document.getElementById("gui-yeu-cau");
            if (target) {
                const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
            }
        }
    };

    const progressVal = step > 4 ? 4 : step;

    return (
        <section id="khao-sat-60s" className="diag-sec" aria-labelledby="khao-sat-60s-title">
            <div className="trust-head">
                <span className="label">
                    <span className="dot" />
                    {t.eyebrow}
                </span>
                <h2 id="khao-sat-60s-title" className="h2">
                    {t.title}
                </h2>
                <p className="lead">{t.lead}</p>
            </div>

            <div className="diag-card">
                <div className="diag-top">
                    <ol className="diag-stepper" aria-label={t.progressAria}>
                        {t.steps.map((label, idx) => {
                            const num = idx + 1;
                            const isActive = step === num;
                            const isDone = step > num;
                            return (
                                <li key={label} className={isActive ? "is-active" : isDone ? "is-done" : ""}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setStep(num);
                                            setPrefilledNote("");
                                        }}
                                        aria-current={isActive ? "step" : undefined}
                                    >
                                        <span className="diag-step-no">{String(num).padStart(2, "0")}</span>
                                        <span className="diag-step-label">{label}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ol>
                    <div className="diag-counter">
                        {step <= 4 ? t.stepLabel(step) : t.resultEyebrow}
                    </div>
                </div>

                <div
                    className="sbx-progress diag-progress"
                    role="progressbar"
                    aria-label={t.progressAria}
                    aria-valuemin={1}
                    aria-valuemax={4}
                    aria-valuenow={progressVal}
                >
                    <span style={{ width: `${Math.round((progressVal / 4) * 100)}%` }} />
                </div>

                {step === 1 && (
                    <fieldset className="diag-step-body">
                        <legend className="diag-q">{t.q1}</legend>
                        <div className="diag-choice-grid">
                            {MODELS.map((opt) => (
                                <button
                                    key={opt.id}
                                    type="button"
                                    className={`diag-choice${model === opt.id ? " is-selected" : ""}`}
                                    aria-pressed={model === opt.id}
                                    onClick={() => setModel(opt.id)}
                                >
                                    <strong>{opt[lang].title}</strong>
                                    <span>{opt[lang].desc}</span>
                                </button>
                            ))}
                        </div>
                    </fieldset>
                )}

                {step === 2 && (
                    <fieldset className="diag-step-body">
                        <legend className="diag-q">{t.q2}</legend>
                        <div className="diag-choice-grid">
                            {BOTTLENECKS.map((opt) => (
                                <button
                                    key={opt.id}
                                    type="button"
                                    className={`diag-choice${bottleneck === opt.id ? " is-selected" : ""}`}
                                    aria-pressed={bottleneck === opt.id}
                                    onClick={() => setBottleneck(opt.id)}
                                >
                                    <strong>{opt[lang].title}</strong>
                                    <span>{opt[lang].desc}</span>
                                </button>
                            ))}
                        </div>
                    </fieldset>
                )}

                {step === 3 && (
                    <div className="diag-step-body diag-step-3">
                        <fieldset className="sbx-fieldset">
                            <legend className="diag-q">{t.q3Team}</legend>
                            <div className="diag-pill-grid">
                                {TEAM_SIZES.map((band) => (
                                    <button
                                        key={band.id}
                                        type="button"
                                        className={`diag-pill${teamId === band.id ? " is-selected" : ""}`}
                                        aria-pressed={teamId === band.id}
                                        onClick={() => setTeamId(band.id)}
                                    >
                                        <strong>{band.label}</strong>
                                        <span>{t.q3TeamUnit}</span>
                                    </button>
                                ))}
                            </div>
                        </fieldset>

                        <fieldset className="sbx-fieldset">
                            <legend className="diag-q">{t.q3Hours}</legend>
                            <div className="diag-pill-grid">
                                {HOURS_OPTIONS.map((hr) => (
                                    <button
                                        key={hr.value}
                                        type="button"
                                        className={`diag-pill${hoursPerWeek === hr.value ? " is-selected" : ""}`}
                                        aria-pressed={hoursPerWeek === hr.value}
                                        onClick={() => setHoursPerWeek(hr.value)}
                                    >
                                        <strong>{hr.value}h</strong>
                                        <span>{hr[lang]}</span>
                                    </button>
                                ))}
                            </div>
                        </fieldset>

                        <p className="diag-live-preview">
                            {t.formulaCaption(teamBand.mid, hoursPerWeek, monthlyHours)}
                        </p>
                    </div>
                )}

                {step === 4 && (
                    <fieldset className="diag-step-body">
                        <legend className="diag-q">{t.q4}</legend>
                        <div className="diag-tool-pills">
                            {TOOLS.map((tool) => {
                                const selected = tools.includes(tool.id);
                                return (
                                    <button
                                        key={tool.id}
                                        type="button"
                                        className={`diag-tool-btn${selected ? " is-selected" : ""}`}
                                        aria-pressed={selected}
                                        onClick={() => toggleTool(tool.id)}
                                    >
                                        <span className="diag-check" aria-hidden="true">
                                            {selected ? "✓" : "+"}
                                        </span>
                                        {tool[lang]}
                                    </button>
                                );
                            })}
                        </div>
                    </fieldset>
                )}

                {step === 5 && (
                    <div className="diag-result" role="region" aria-label={t.resultEyebrow}>
                        <div className="diag-result-top">
                            <div className="diag-metric-box">
                                <span className="diag-box-label">{t.hoursTitle}</span>
                                <strong className="diag-big-num">
                                    ~{monthlyHours} <span>{t.hoursUnit}</span>
                                </strong>
                                <p className="diag-formula-note">
                                    {t.formulaCaption(teamBand.mid, hoursPerWeek, monthlyHours)}
                                </p>
                            </div>

                            <div className="diag-rec-box">
                                <span className="diag-box-label">{t.recTitle}</span>
                                <h3>{rec.track}</h3>
                                <p>{rec.summary}</p>
                                <p className="diag-caveat">{t.caveat}</p>
                            </div>
                        </div>

                        {matchedCases.length > 0 && (
                            <div className="diag-cases">
                                <span className="diag-box-label">{t.casesTitle}</span>
                                <div className="diag-case-list">
                                    {matchedCases.map((p) => (
                                        <Link
                                            key={p.slug}
                                            className="diag-case-card"
                                            href={localizePath(`/work/${p.slug}`, lang)}
                                        >
                                            <div className="diag-case-head">
                                                <span className={`pill pill-sm t-${p.tone === "mint" ? "ocean" : p.tone}`}>
                                                    {p.tag}
                                                </span>
                                                <span className="diag-case-arrow" aria-hidden="true">
                                                    →
                                                </span>
                                            </div>
                                            <strong>{p.cardTitle}</strong>
                                            {p.metric && (
                                                <span className="diag-case-metric">
                                                    <b>{p.metric.value}</b> {p.metric.label}
                                                </span>
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="diag-result-actions">
                            <button type="button" className="btn btn-ink" onClick={handlePrefill}>
                                {t.prefillBtn} <span aria-hidden="true">→</span>
                            </button>
                            <button
                                type="button"
                                className="btn btn-ghost"
                                onClick={() => {
                                    setStep(1);
                                    setPrefilledNote("");
                                }}
                            >
                                {t.editAnswers}
                            </button>
                            <button type="button" className="diag-reset-link" onClick={reset}>
                                {t.reset}
                            </button>
                        </div>

                        {prefilledNote && (
                            <p className="diag-prefill-status" role="status" aria-live="polite">
                                {prefilledNote}
                            </p>
                        )}
                    </div>
                )}

                {step <= 4 && (
                    <div className="diag-nav">
                        <div className="diag-nav-left">
                            {step > 1 && (
                                <button type="button" className="btn btn-ghost sbx-btn-sm" onClick={() => setStep((s) => s - 1)}>
                                    {t.back}
                                </button>
                            )}
                            <button type="button" className="diag-reset-link" onClick={reset}>
                                {t.reset}
                            </button>
                        </div>
                        <button
                            type="button"
                            className="btn btn-ink sbx-btn-sm"
                            onClick={() => setStep((s) => (s < 4 ? s + 1 : 5))}
                        >
                            {step < 4 ? t.next : t.seeResult}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default OpsDiagnostic;
