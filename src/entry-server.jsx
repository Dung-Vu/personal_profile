import { Writable } from "node:stream";
import { StrictMode } from "react";
import { prerenderToNodeStream } from "react-dom/static";
import App from "./App.jsx";
import { setServerPath } from "./lib/router.jsx";

// Render một route thành HTML lúc build (chờ cả trang lazy), dùng cho scripts/prerender.mjs.
export async function render(pathname) {
    setServerPath(pathname);
    const errors = [];
    const { prelude } = await prerenderToNodeStream(
        <StrictMode>
            <App />
        </StrictMode>,
        {
            onError(error) {
                errors.push(error);
            },
        },
    );
    if (errors.length) {
        throw errors[0];
    }
    const chunks = [];
    await new Promise((resolve, reject) => {
        const out = new Writable({
            write(chunk, _enc, cb) {
                chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
                cb();
            },
            final(cb) {
                resolve();
                cb();
            },
        });
        out.on("error", reject);
        prelude.on("error", reject);
        prelude.pipe(out);
    });
    return Buffer.concat(chunks)
        .toString("utf8")
        .replace(/<link\b(?=[^>]*\brel="preload")(?=[^>]*\bas="image")[^>]*\/?>/g, () => "");
}
