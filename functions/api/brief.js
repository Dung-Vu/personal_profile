// Cloudflare Pages Function: POST /api/brief
// Validates the 4-point project brief (+ optional 60s Ops Diagnostic summary) and delivers it via Telegram Bot API.
// Pure Web Fetch API ESM — zero Node or npm dependencies.

const MAX_BODY_BYTES = 8192;
const MIN_ELAPSED_MS = 1200;
const TELEGRAM_MAX_CHARS = 3950;
const REF_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const FIELD_LIMITS = {
    who: 160,
    contact: 160,
    y1: 1200,
    y2: 1200,
    y3: 1200,
    y4: 1200,
    diagnostic: 1200,
};

function isAllowedOrigin(origin) {
    if (!origin) return true; // Same-origin fetch without Origin header or server-side test
    let parsed;
    try {
        parsed = new URL(origin);
    } catch {
        return false;
    }
    const { protocol, hostname } = parsed;
    if (protocol === "https:" && hostname === "profile.bonstu.site") return true;
    if (protocol === "https:" && hostname.endsWith(".pages.dev") && hostname.length > ".pages.dev".length) {
        return true;
    }
    if (protocol === "http:" && (hostname === "localhost" || hostname === "127.0.0.1")) {
        return true;
    }
    return false;
}

function buildHeaders(origin, extra = {}) {
    const headers = {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
        ...extra,
    };
    if (origin && isAllowedOrigin(origin)) {
        headers["Access-Control-Allow-Origin"] = origin;
        headers["Vary"] = "Origin";
    }
    return headers;
}

function jsonResponse(body, status, origin) {
    return new Response(JSON.stringify(body), {
        status,
        headers: buildHeaders(origin, {
            "Content-Type": "application/json; charset=utf-8",
        }),
    });
}

function makeRefId() {
    const bytes = new Uint8Array(6);
    crypto.getRandomValues(bytes);
    let code = "";
    for (let i = 0; i < bytes.length; i++) {
        code += REF_ALPHABET[bytes[i] % REF_ALPHABET.length];
    }
    return `BRF-${code}`;
}

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function truncateText(text, max) {
    if (text.length <= max) return text;
    return `${text.slice(0, Math.max(0, max - 1)).trimEnd()}…`;
}

function buildTelegramMessage({ refId, locale, who, contact, diagnostic, y1, y2, y3, y4 }) {
    const format = (cap) => {
        const trimField = (val) => (cap ? truncateText(val, cap) : val);
        const lines = [
            `<b>📩 New Brief · ${escapeHtml(refId)}</b>`,
            `<b>Locale:</b> ${escapeHtml(locale.toUpperCase())}`,
        ];
        if (who) lines.push(`<b>From:</b> ${escapeHtml(who)}`);
        if (contact) lines.push(`<b>Contact:</b> ${escapeHtml(contact)}`);
        if (diagnostic) {
            lines.push("", `<b>60s Diagnostic:</b>`, escapeHtml(trimField(diagnostic)));
        }
        const points = [
            ["1. Current workflow", y1],
            ["2. Bottleneck", y2],
            ["3. Desired outcome", y3],
            ["4. Existing systems", y4],
        ];
        lines.push("");
        for (const [label, value] of points) {
            if (value) {
                lines.push(`<b>${label}:</b>`, escapeHtml(trimField(value)), "");
            }
        }
        return lines.join("\n").trim();
    };

    let msg = format(0);
    if (msg.length <= TELEGRAM_MAX_CHARS) return msg;

    for (const cap of [650, 500, 380, 260, 180]) {
        msg = format(cap);
        if (msg.length <= TELEGRAM_MAX_CHARS) return msg;
    }
    return format(140);
}

export function onRequestOptions(context) {
    const origin = context.request.headers.get("Origin");
    if (origin && !isAllowedOrigin(origin)) {
        return jsonResponse({ ok: false, error: "forbidden_origin" }, 403, null);
    }
    return new Response(null, {
        status: 204,
        headers: buildHeaders(origin, {
            Allow: "POST, OPTIONS",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "86400",
        }),
    });
}

export async function onRequestPost(context) {
    const { request, env } = context;
    const origin = request.headers.get("Origin");

    if (origin && !isAllowedOrigin(origin)) {
        return jsonResponse({ ok: false, error: "forbidden_origin" }, 403, null);
    }

    const contentType = request.headers.get("Content-Type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
        return jsonResponse({ ok: false, error: "unsupported_media_type" }, 415, origin);
    }

    const declaredLength = Number(request.headers.get("Content-Length"));
    if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
        return jsonResponse({ ok: false, error: "payload_too_large" }, 413, origin);
    }

    let rawBuffer;
    try {
        rawBuffer = await request.arrayBuffer();
    } catch {
        return jsonResponse({ ok: false, error: "invalid_body" }, 400, origin);
    }

    if (rawBuffer.byteLength > MAX_BODY_BYTES) {
        return jsonResponse({ ok: false, error: "payload_too_large" }, 413, origin);
    }

    let payload;
    try {
        const text = new TextDecoder("utf-8", { fatal: true }).decode(rawBuffer);
        payload = JSON.parse(text);
    } catch {
        return jsonResponse({ ok: false, error: "invalid_json" }, 400, origin);
    }

    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
        return jsonResponse({ ok: false, error: "invalid_payload" }, 400, origin);
    }

    const refId = makeRefId();

    // Anti-spam: honeypot field must stay empty.
    const website = typeof payload.website === "string" ? payload.website.trim() : "";
    if (website.length > 0) {
        return jsonResponse({ ok: true, refId }, 200, origin);
    }

    // Anti-spam: reject/absorb instant automated submissions quietly.
    if (typeof payload.elapsedMs === "number" && Number.isFinite(payload.elapsedMs) && payload.elapsedMs < MIN_ELAPSED_MS) {
        return jsonResponse({ ok: true, refId }, 200, origin);
    }

    // Validate locale.
    let locale = "vi";
    if (payload.locale !== undefined && payload.locale !== null && payload.locale !== "") {
        if (payload.locale !== "vi" && payload.locale !== "en") {
            return jsonResponse({ ok: false, error: "invalid_locale" }, 400, origin);
        }
        locale = payload.locale;
    }

    // Validate string fields & max lengths.
    const clean = {};
    for (const [key, maxLen] of Object.entries(FIELD_LIMITS)) {
        const raw = payload[key];
        if (raw === undefined || raw === null) {
            clean[key] = "";
            continue;
        }
        if (typeof raw !== "string") {
            return jsonResponse({ ok: false, error: "invalid_field_type", field: key }, 400, origin);
        }
        const trimmed = raw.trim();
        if (trimmed.length > maxLen) {
            return jsonResponse({ ok: false, error: "field_too_long", field: key, max: maxLen }, 400, origin);
        }
        clean[key] = trimmed;
    }

    if (!clean.y1 && !clean.y2 && !clean.y3 && !clean.y4) {
        return jsonResponse({ ok: false, error: "empty_brief" }, 400, origin);
    }

    const token = String(env?.TELEGRAM_BOT_TOKEN || "").trim();
    const chatId = String(env?.TELEGRAM_CHAT_ID || "").trim();
    if (!token || !chatId) {
        return jsonResponse({ ok: false, fallback: true, reason: "not_configured" }, 503, origin);
    }

    const message = buildTelegramMessage({ refId, locale, ...clean });
    const endpoint = `https://api.telegram.org/bot${token}/sendMessage`;

    try {
        const tgRes = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: "HTML",
                disable_web_page_preview: true,
            }),
            signal: typeof AbortSignal !== "undefined" && typeof AbortSignal.timeout === "function"
                ? AbortSignal.timeout(10000)
                : undefined,
        });

        if (!tgRes.ok) {
            return jsonResponse({ ok: false, fallback: true, reason: "delivery_failed" }, 502, origin);
        }

        let tgBody = null;
        try {
            tgBody = await tgRes.json();
        } catch {
            // Non-JSON 2xx treated conservatively as failure if Telegram API contract isn't satisfied
            return jsonResponse({ ok: false, fallback: true, reason: "delivery_failed" }, 502, origin);
        }

        if (!tgBody || tgBody.ok !== true) {
            return jsonResponse({ ok: false, fallback: true, reason: "delivery_failed" }, 502, origin);
        }

        return jsonResponse({ ok: true, delivered: "telegram", refId }, 200, origin);
    } catch {
        return jsonResponse({ ok: false, fallback: true, reason: "delivery_failed" }, 502, origin);
    }
}
