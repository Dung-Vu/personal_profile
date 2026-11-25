import { useEffect, useRef, useState } from "react";
import { getSiteContent } from "../content/index.js";
import { useLocale } from "../lib/i18n.js";

// Soạn yêu cầu 4 ý ngay trên trang: gửi trực tiếp qua /api/brief (Telegram), hoặc chép mở Zalo / gửi email.
const MAX_MAILTO_LEN = 1800;

function compose(values, fields, diagnostic, bf, isEn) {
    const greeting = bf.composeGreeting || (isEn ? "Hi Dung," : "Chào Dũng,");
    const whoPrefix = bf.composeWhoPrefix || (isEn ? "From:" : "Mình là:");
    const contactPrefix = bf.composeContactPrefix || (isEn ? "Contact:" : "Liên hệ:");
    const diagPrefix = bf.composeDiagPrefix || (isEn ? "60s Diagnostic:" : "Khảo sát 60s:");

    const lines = [greeting, ""];
    if (values.who?.trim()) lines.push(`${whoPrefix} ${values.who.trim()}`);
    if (values.contact?.trim()) lines.push(`${contactPrefix} ${values.contact.trim()}`);
    if (values.who?.trim() || values.contact?.trim()) lines.push("");
    if (diagnostic?.trim()) {
        lines.push(`${diagPrefix} ${diagnostic.trim()}`, "");
    }
    fields.forEach((f, i) => {
        lines.push(`${i + 1}. ${f.title}:`, values[f.name]?.trim() || "", "");
    });
    return lines.join("\n");
}

function buildMailto(values, fields, diagnostic, site, bf, isEn, truncNote) {
    const who = (values.who || "").trim().slice(0, 120);
    const subjectPrefix = bf.mailtoSubjectPrefix || (isEn ? "Brief:" : "Yêu cầu:");
    const subject = encodeURIComponent(`${subjectPrefix} ${who}`.trim());
    const prefix = `mailto:${site.email}?subject=${subject}&body=`;
    const fullBody = compose(values, fields, diagnostic, bf, isEn);
    const fullHref = prefix + encodeURIComponent(fullBody);
    if (fullHref.length <= MAX_MAILTO_LEN) {
        return { href: fullHref, truncated: false };
    }
    const noteEncoded = encodeURIComponent(truncNote);
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
        href: prefix + encodeURIComponent(trimmed + truncNote),
        truncated: true,
    };
}

export function BriefForm({ prefill }) {
    const locale = useLocale();
    const isEn = locale === "en";
    const { brief, site, ui = {} } = getSiteContent(locale);
    const bf = ui.briefForm || {};
    const newTabSr = ui.newTabSr || (isEn ? " (opens in a new tab)" : " (mở tab mới)");

    const fields = brief.checklist.map((item, i) => ({ ...item, name: `y${i + 1}` }));

    const [values, setValues] = useState({});
    const [diagnostic, setDiagnostic] = useState("");
    const [website, setWebsite] = useState("");
    const [sending, setSending] = useState(false);
    const [sentRefId, setSentRefId] = useState("");
    const [status, setStatus] = useState("");
    const [fallbackText, setFallbackText] = useState("");
    const [copiedFallback, setCopiedFallback] = useState(false);
    const [zaloOpened, setZaloOpened] = useState(false);

    const mountedAtRef = useRef(0);
    const lastNonceRef = useRef(null);
    const fallbackRef = useRef(null);

    useEffect(() => {
        mountedAtRef.current = Date.now();
    }, []);

    useEffect(() => {
        if (!prefill || prefill.nonce == null || prefill.nonce === lastNonceRef.current) return;
        lastNonceRef.current = prefill.nonce;
        setValues((prev) => ({
            ...prev,
            ...(prefill.who !== undefined ? { who: prefill.who } : {}),
            ...(prefill.contact !== undefined ? { contact: prefill.contact } : {}),
            ...(prefill.y1 !== undefined ? { y1: prefill.y1 } : {}),
            ...(prefill.y2 !== undefined ? { y2: prefill.y2 } : {}),
            ...(prefill.y3 !== undefined ? { y3: prefill.y3 } : {}),
            ...(prefill.y4 !== undefined ? { y4: prefill.y4 } : {}),
        }));
        if (prefill.diagnosticSummary !== undefined) {
            setDiagnostic(prefill.diagnosticSummary || "");
        }
        setSentRefId("");
        setFallbackText("");
        setCopiedFallback(false);
        setZaloOpened(false);
        setStatus(
            isEn
                ? "Prefilled from the 60-second diagnostic — adjust anything you like, then send."
                : "Đã điền sẵn từ khảo sát 60 giây — anh/chị có thể chỉnh lại rồi gửi.",
        );
    }, [prefill, isEn]);

    const set = (name) => (e) => {
        setValues((v) => ({ ...v, [name]: e.target.value }));
        if (sentRefId) setSentRefId("");
        if (status) setStatus("");
        if (fallbackText) setFallbackText("");
        if (copiedFallback) setCopiedFallback(false);
        if (zaloOpened) setZaloOpened(false);
    };

    const empty = fields.every((f) => !values[f.name]?.trim());
    const truncNote =
        bf.truncNote ||
        (isEn
            ? "\n\n[Shortened for mailto length limit — use Copy & open Zalo to send the full brief.]"
            : "\n\n[Nội dung dài nên đã rút gọn cho email — anh/chị nên dùng Chép & mở Zalo để gửi đầy đủ.]");
    const mailto = empty ? { href: undefined, truncated: false } : buildMailto(values, fields, diagnostic, site, bf, isEn, truncNote);

    const submitDirect = async (e) => {
        e.preventDefault();
        if (empty || sending) return;
        setSending(true);
        setSentRefId("");
        setZaloOpened(false);
        setCopiedFallback(false);
        setFallbackText("");
        setStatus(bf.sending || (isEn ? "Sending…" : "Đang gửi…"));

        const elapsedMs = mountedAtRef.current ? Date.now() - mountedAtRef.current : 0;
        const payload = {
            who: (values.who || "").trim(),
            contact: (values.contact || "").trim(),
            y1: (values.y1 || "").trim(),
            y2: (values.y2 || "").trim(),
            y3: (values.y3 || "").trim(),
            y4: (values.y4 || "").trim(),
            diagnostic: diagnostic.trim(),
            locale,
            website,
            elapsedMs,
        };

        try {
            const res = await fetch("/api/brief", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            let data = null;
            try {
                data = await res.json();
            } catch {
                data = null;
            }
            if (res.ok && data?.ok && data?.refId) {
                setSentRefId(data.refId);
                setStatus("");
            } else {
                const composed = compose(values, fields, diagnostic, bf, isEn);
                setFallbackText(composed);
                setStatus(
                    bf.fallback ||
                        (isEn
                            ? "Direct delivery is unavailable here — your composed brief is ready below to copy to Zalo or send via email without losing anything."
                            : "Kênh gửi trực tiếp chưa bật ở môi trường này — nội dung đã được soạn sẵn bên dưới để anh/chị chép sang Zalo hoặc gửi email, không bị mất chữ."),
                );
            }
        } catch {
            const composed = compose(values, fields, diagnostic, bf, isEn);
            setFallbackText(composed);
            setStatus(
                bf.fallback ||
                    (isEn
                        ? "Direct delivery is unavailable here — your composed brief is ready below to copy to Zalo or send via email without losing anything."
                        : "Kênh gửi trực tiếp chưa bật ở môi trường này — nội dung đã được soạn sẵn bên dưới để anh/chị chép sang Zalo hoặc gửi email, không bị mất chữ."),
            );
        } finally {
            setSending(false);
        }
    };

    const toZalo = () => {
        const text = compose(values, fields, diagnostic, bf, isEn);
        setCopiedFallback(false);
        setSentRefId("");
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
                setStatus(
                    bf.zaloCopied ||
                        (isEn ? "Copied to clipboard. Paste it into Zalo chat and hit send." : "Đã chép nội dung. Dán vào khung chat Zalo là xong."),
                );
            })
            .catch(() => {
                setZaloOpened(false);
                setFallbackText(text);
                setStatus(
                    bf.zaloManual ||
                        (isEn
                            ? "Clipboard access was blocked. Copy the text below and paste it into Zalo."
                            : "Trình duyệt không cho tự động chép. Anh/chị chép nội dung bên dưới rồi mở Zalo để dán nhé."),
                );
            });
    };

    const copyFallback = () => {
        const ta = fallbackRef.current;
        const done = () => {
            setCopiedFallback(true);
            setStatus(
                bf.fallbackCopied ||
                    (isEn ? "Copied. Click Open Zalo and paste it into the chat." : "Đã chép nội dung. Bấm Mở Zalo rồi dán vào khung chat là xong."),
            );
        };
        const manualMsg =
            bf.fallbackSelect ||
            (isEn
                ? "Press Ctrl+C (or Cmd+C) to copy the selected text, then open Zalo."
                : "Anh/chị bấm Ctrl+C (hoặc Cmd+C) để chép phần chữ đã chọn rồi mở Zalo nhé.");
        if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
            navigator.clipboard
                .writeText(fallbackText)
                .then(done)
                .catch(() => {
                    ta?.focus();
                    ta?.select();
                    setStatus(manualMsg);
                });
        } else {
            ta?.focus();
            ta?.select();
            setStatus(manualMsg);
        }
    };

    const defaultHint = empty
        ? bf.hintEmpty ||
          (isEn
              ? "Fill at least one point to send. Your draft stays on your device until you submit."
              : "Điền ít nhất một ý để gửi. Nội dung chỉ nằm trên máy anh/chị cho tới khi gửi.")
        : mailto.truncated
          ? bf.hintTruncated ||
            (isEn
                ? "Your draft is long, so email will only include the first part — use Send directly or Copy & open Zalo to send everything."
                : "Nội dung khá dài nên email chỉ kèm phần đầu — anh/chị nên dùng Gửi trực tiếp hoặc Chép & mở Zalo để gửi đủ.")
          : bf.hintReady ||
            (isEn
                ? "Your draft stays on your device until you click send."
                : "Nội dung chỉ nằm trên máy anh/chị cho tới khi bấm gửi.");

    const sentText = bf.sentRef
        ? bf.sentRef.replace("{refId}", sentRefId)
        : isEn
          ? `Brief received · Ref ${sentRefId}. I will reply within 1 business day.`
          : `Đã nhận yêu cầu · Mã ${sentRefId}. Mình sẽ phản hồi trong 1 ngày làm việc.`;

    return (
        <form className="bform" aria-label={bf.formAria || (isEn ? "Project brief form" : "Biểu mẫu mô tả yêu cầu")} onSubmit={submitDirect}>
            <div className="bform-hp" aria-hidden="true">
                <label>
                    <span>Website</span>
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                </label>
            </div>

            {diagnostic && (
                <div className="bform-diag-badge">
                    <div>
                        <span className="label">{bf.diagBadge || (isEn ? "60s Ops Diagnostic attached" : "Đã đính kèm kết quả khảo sát 60s")}</span>
                        <p>{diagnostic}</p>
                    </div>
                    <button
                        type="button"
                        className="bform-diag-remove"
                        aria-label={bf.diagRemove || (isEn ? "Remove" : "Gỡ đính kèm")}
                        onClick={() => setDiagnostic("")}
                    >
                        ×
                    </button>
                </div>
            )}

            <label className="bform-field bform-who">
                <span>
                    {bf.whoLabel || (isEn ? "Who you are" : "Anh/chị là ai")}{" "}
                    <small>{bf.whoOptional || (isEn ? "(optional)" : "(không bắt buộc)")}</small>
                </span>
                <input
                    type="text"
                    name="who"
                    autoComplete="organization"
                    placeholder={bf.whoPlaceholder || (isEn ? "Name, company, or industry" : "Tên, công ty hoặc ngành")}
                    value={values.who || ""}
                    onChange={set("who")}
                />
            </label>

            <label className="bform-field bform-contact">
                <span>
                    {bf.contactLabel || (isEn ? "Reply channel" : "Kênh liên hệ lại")}{" "}
                    <small>{bf.contactOptional || (isEn ? "(email, Zalo, or phone)" : "(email, Zalo hoặc SĐT)")}</small>
                </span>
                <input
                    type="text"
                    name="contact"
                    autoComplete="email"
                    placeholder={bf.contactPlaceholder || (isEn ? "Email, Zalo number, or phone" : "Email, số Zalo hoặc số điện thoại")}
                    value={values.contact || ""}
                    onChange={set("contact")}
                />
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
                <button type="submit" className="btn btn-ink" disabled={empty || sending}>
                    {sending
                        ? bf.sending || (isEn ? "Sending…" : "Đang gửi…")
                        : bf.directSend || (isEn ? "Send directly" : "Gửi trực tiếp")}{" "}
                    <span aria-hidden="true">→</span>
                </button>
                <button type="button" className="btn btn-ghost" onClick={toZalo} disabled={empty || sending}>
                    {bf.zaloBtn || (isEn ? "Copy & open Zalo" : "Chép & mở Zalo")}
                </button>
                <a
                    className="btn btn-ghost"
                    href={empty ? undefined : mailto.href}
                    aria-disabled={empty || undefined}
                    onClick={(e) => empty && e.preventDefault()}
                >
                    {bf.emailBtn || (isEn ? "Send via email" : "Gửi qua email")}
                </a>
            </div>

            {sentRefId && (
                <div className="bform-success" role="status">
                    <div>
                        <strong>{sentText}</strong>
                        <p>
                            {bf.sentZaloHint || (isEn ? "Need a faster reply?" : "Cần trao đổi gấp?")}{" "}
                            <a className="bform-inline-link" href={site.zalo} target="_blank" rel="noopener noreferrer">
                                {ui.contact?.zaloCta ? `${ui.contact.zaloCta} ${site.phone}` : isEn ? `Message on Zalo ${site.phone}` : `Nhắn Zalo ${site.phone}`}
                                <span className="sr-only">{newTabSr}</span>
                            </a>
                        </p>
                    </div>
                </div>
            )}

            {!sentRefId && (
                <p className="bform-status" role="status">
                    {status || defaultHint}
                    {zaloOpened && !fallbackText && (
                        <>
                            {" "}
                            <a className="bform-inline-link" href={site.zalo} target="_blank" rel="noopener noreferrer">
                                {bf.openZaloDirect || (isEn ? "Open Zalo directly" : "Mở Zalo trực tiếp")}
                                <span className="sr-only">{newTabSr}</span>
                            </a>
                        </>
                    )}
                </p>
            )}

            {fallbackText && (
                <div className="bform-fallback">
                    <label className="bform-field">
                        <span>{bf.fallbackLabel || (isEn ? "Composed brief" : "Nội dung đã soạn sẵn")}</span>
                        <textarea ref={fallbackRef} readOnly rows={7} value={fallbackText} onFocus={(e) => e.target.select()} />
                    </label>
                    <div className="bform-fallback-actions">
                        <button type="button" className="btn btn-ghost" onClick={copyFallback}>
                            {copiedFallback
                                ? bf.copiedBtn || (isEn ? "Copied" : "Đã chép nội dung")
                                : bf.copyBtn || (isEn ? "Copy text" : "Chép nội dung")}
                        </button>
                        <a className="btn btn-ink" href={site.zalo} target="_blank" rel="noopener noreferrer">
                            {bf.openZaloBtn || (isEn ? "Open Zalo" : "Mở Zalo")} <span aria-hidden="true">→</span>
                            <span className="sr-only">{newTabSr}</span>
                        </a>
                        {mailto.href && (
                            <a className="btn btn-ghost" href={mailto.href}>
                                {bf.emailBtn || (isEn ? "Send via email" : "Gửi qua email")}
                            </a>
                        )}
                    </div>
                </div>
            )}
        </form>
    );
}
