import { useState } from "react";
import { brief, site } from "../content/site.js";

// Soạn yêu cầu 4 ý ngay trên trang, rồi gửi bằng Zalo (chép sẵn nội dung) hoặc email.
// Site tĩnh: không có máy chủ nhận form, nội dung chỉ nằm trên máy người gửi.
const fields = brief.checklist.map((item, i) => ({ ...item, name: `y${i + 1}` }));

function compose(values) {
    const lines = ["Chào Dũng,", ""];
    if (values.who) lines.push(`Mình là: ${values.who}`, "");
    fields.forEach((f, i) => {
        lines.push(`${i + 1}. ${f.title}:`, values[f.name]?.trim() || "", "");
    });
    return lines.join("\n");
}

export function BriefForm({ headingId }) {
    const [values, setValues] = useState({});
    const [status, setStatus] = useState("");
    const set = (name) => (e) => setValues((v) => ({ ...v, [name]: e.target.value }));
    const empty = fields.every((f) => !values[f.name]?.trim());

    const toZalo = async () => {
        const text = compose(values);
        let copied = false;
        try {
            await navigator.clipboard.writeText(text);
            copied = true;
        } catch {
            copied = false;
        }
        setStatus(copied ? "Đã chép nội dung. Mở Zalo rồi dán vào khung chat là xong." : "Trình duyệt chặn sao chép. Anh/chị chép tay nội dung ở trên giúp mình nhé.");
        window.open(site.zalo, "_blank", "noopener");
    };

    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`Yêu cầu: ${values.who || ""}`.trim())}&body=${encodeURIComponent(compose(values))}`;

    return (
        <form className="bform" aria-labelledby={headingId} onSubmit={(e) => e.preventDefault()}>
            <label className="bform-field bform-who">
                <span>Anh/chị là ai <small>(không bắt buộc)</small></span>
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
                <a className="btn btn-ghost" href={mailto} aria-disabled={empty || undefined} onClick={(e) => empty && e.preventDefault()}>
                    Gửi qua email
                </a>
            </div>
            <p className="bform-status" role="status">
                {status || (empty ? "Điền ít nhất một ý để gửi. Nội dung chỉ nằm trên máy anh/chị cho tới khi gửi." : "Nội dung chỉ nằm trên máy anh/chị cho tới khi gửi.")}
            </p>
        </form>
    );
}
