import { useRef, useState } from "react";
import { brief, site } from "../content/site.js";

// Soạn yêu cầu 4 ý ngay trên trang, rồi gửi bằng Zalo (chép sẵn nội dung) hoặc email.
// Site tĩnh: không có máy chủ nhận form, nội dung chỉ nằm trên máy người gửi.
const fields = brief.checklist.map((item, i) => ({ ...item, name: `y${i + 1}` }));
const MAX_MAILTO_LEN = 1800;
const TRUNC_NOTE = "\n\n[Nội dung dài nên đã rút gọn cho email — anh/chị nên dùng Chép & mở Zalo để gửi đầy đủ.]";

function compose(values) {
    const lines = ["Chào Dũng,", ""];
    if (values.who) lines.push(`Mình là: ${values.who}`, "");
    fields.forEach((f, i) => {
        lines.push(`${i + 1}. ${f.title}:`, values[f.name]?.trim() || "", "");
    });
    return lines.join("\n");
}

function buildMailto(values) {
    const who = (values.who || "").trim().slice(0, 120);
    const subject = encodeURIComponent(`Yêu cầu: ${who}`.trim());
    const prefix = `mailto:${site.email}?subject=${subject}&body=`;
    const fullBody = compose(values);
    const fullHref = prefix + encodeURIComponent(fullBody);
    if (fullHref.length <= MAX_MAILTO_LEN) {
        return { href: fullHref, truncated: false };
    }
    const noteEncoded = encodeURIComponent(TRUNC_NOTE);
    const budget = Math.max(0, MAX_MAILTO_LEN - prefix.length - noteEncoded.length);
    let lo = 0;
    let hi = fullBody.length;
    while (lo < hi) {
        const mid = Math.ceil((lo + hi) / 2);
        if (encodeURIComponent(fullBody.slice(0, mid)).length <= budget) lo = mid;
        else hi = mid - 1;
    }
    if (lo > 0 && fullBody.charCodeAt(lo - 1) >= 0xd800 && fullBody.charCodeAt(lo - 1) <= 0xdbff) {
        lo -= 1;
    }
    const trimmed = fullBody.slice(0, lo).trimEnd();
    return {
        href: prefix + encodeURIComponent(trimmed + TRUNC_NOTE),
        truncated: true,
    };
}

export function BriefForm() {
    const [values, setValues] = useState({});
    const [status, setStatus] = useState("");
    const [fallbackText, setFallbackText] = useState("");
    const [copiedFallback, setCopiedFallback] = useState(false);
    const [zaloOpened, setZaloOpened] = useState(false);
    const fallbackRef = useRef(null);

    const set = (name) => (e) => {
        setValues((v) => ({ ...v, [name]: e.target.value }));
        if (status) setStatus("");
        if (fallbackText) setFallbackText("");
        if (copiedFallback) setCopiedFallback(false);
        if (zaloOpened) setZaloOpened(false);
    };

    const empty = fields.every((f) => !values[f.name]?.trim());

    const toZalo = () => {
        const text = compose(values);
        setCopiedFallback(false);
        // Gọi cả clipboard và window.open đồng bộ trong cùng lượt bấm để Safari/iOS không chặn popup.
        const copyPromise =
            typeof navigator !== "undefined" && navigator.clipboard?.writeText
                ? navigator.clipboard.writeText(text)
                : Promise.reject(new Error("Clipboard unavailable"));
        window.open(site.zalo, "_blank", "noopener,noreferrer");
        copyPromise
            .then(() => {
                setFallbackText("");
                setZaloOpened(true);
                setStatus("Đã chép nội dung. Dán vào khung chat Zalo là xong.");
            })
            .catch(() => {
                setZaloOpened(false);
                setFallbackText(text);
                setStatus("Trình duyệt không cho tự động chép. Anh/chị chép nội dung bên dưới rồi mở Zalo để dán nhé.");
            });
    };

    const copyFallback = () => {
        const ta = fallbackRef.current;
        const done = () => {
            setCopiedFallback(true);
            setStatus("Đã chép nội dung. Bấm Mở Zalo rồi dán vào khung chat là xong.");
        };
        if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
            navigator.clipboard
                .writeText(fallbackText)
                .then(done)
                .catch(() => {
                    ta?.focus();
                    ta?.select();
                    setStatus("Anh/chị bấm Ctrl+C (hoặc Cmd+C) để chép phần chữ đã chọn rồi mở Zalo nhé.");
                });
        } else {
            ta?.focus();
            ta?.select();
            setStatus("Anh/chị bấm Ctrl+C (hoặc Cmd+C) để chép phần chữ đã chọn rồi mở Zalo nhé.");
        }
    };

    const mailto = empty ? { href: undefined, truncated: false } : buildMailto(values);
    const defaultHint = empty
        ? "Điền ít nhất một ý để gửi. Nội dung chỉ nằm trên máy anh/chị cho tới khi gửi."
        : mailto.truncated
          ? "Nội dung khá dài nên email chỉ kèm phần đầu — anh/chị nên dùng Chép & mở Zalo để gửi đủ."
          : "Nội dung chỉ nằm trên máy anh/chị cho tới khi gửi.";

    return (
        <form className="bform" aria-label="Biểu mẫu mô tả yêu cầu" onSubmit={(e) => e.preventDefault()}>
            <label className="bform-field bform-who">
                <span>
                    Anh/chị là ai <small>(không bắt buộc)</small>
                </span>
                <input type="text" name="who" autoComplete="organization" placeholder="Tên, công ty hoặc ngành" value={values.who || ""} onChange={set("who")} />
            </label>
            {fields.map((f, i) => (
                <label key={f.name} className="bform-field">
                    <span>
                        <i>{String(i + 1).padStart(2, "0")}</i> {f.title}
                    </span>
                    <textarea name={f.name} rows={3} placeholder={f.desc} value={values[f.name] || ""} onChange={set(f.name)} />
                </label>
            ))}
            <div className="bform-actions">
                <button type="button" className="btn btn-ink" onClick={toZalo} disabled={empty}>
                    Chép & mở Zalo <span aria-hidden="true">→</span>
                </button>
                <a className="btn btn-ghost" href={empty ? undefined : mailto.href} aria-disabled={empty || undefined} onClick={(e) => empty && e.preventDefault()}>
                    Gửi qua email
                </a>
            </div>
            <p className="bform-status" role="status">
                {status || defaultHint}
                {zaloOpened && !fallbackText && (
                    <>
                        {" "}
                        <a className="bform-inline-link" href={site.zalo} target="_blank" rel="noopener noreferrer">
                            Mở Zalo trực tiếp
                            <span className="sr-only"> (mở tab mới)</span>
                        </a>
                    </>
                )}
            </p>
            {fallbackText && (
                <div className="bform-fallback">
                    <label className="bform-field">
                        <span>Nội dung đã soạn sẵn</span>
                        <textarea ref={fallbackRef} readOnly rows={7} value={fallbackText} onFocus={(e) => e.target.select()} />
                    </label>
                    <div className="bform-fallback-actions">
                        <button type="button" className="btn btn-ghost" onClick={copyFallback}>
                            {copiedFallback ? "Đã chép nội dung" : "Chép nội dung"}
                        </button>
                        <a className="btn btn-ink" href={site.zalo} target="_blank" rel="noopener noreferrer">
                            Mở Zalo <span aria-hidden="true">→</span>
                            <span className="sr-only"> (mở tab mới)</span>
                        </a>
                    </div>
                </div>
            )}
        </form>
    );
}
