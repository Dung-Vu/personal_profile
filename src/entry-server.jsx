import { Writable } from "node:stream";
import { StrictMode } from "react";
import { prerenderToNodeStream } from "react-dom/static";
import App from "./App.jsx";
import { setServerPath } from "./lib/router.jsx";

// Render một route thành HTML lúc build (chờ cả trang lazy), dùng cho scripts/prerender.mjs.
export async function render(pathname) {
    setServerPath(pathname);
    const { prelude } = await prerenderToNodeStream(
        <StrictMode>
            <App />
        </StrictMode>,
    );
    let html = "";
    await new Promise((resolve, reject) => {
        prelude.pipe(
            new Writable({
                write(chunk, _enc, cb) {
                    html += chunk;
                    cb();
                },
                final(cb) {
                    resolve();
                    cb();
                },
            }),
        );
        prelude.on("error", reject);
    });
    return html;
}
