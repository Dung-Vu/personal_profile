import { StrictMode, startTransition } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import { setServerPath } from "./lib/router.jsx";
import { normalizePath } from "./routes/siteRoutes.js";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/home.css";
import "./styles/story.css";

const root = document.getElementById("root");
const app = (
    <StrictMode>
        <App />
    </StrictMode>
);
const path = normalizePath(window.location.pathname);

// HTML đã prerender đúng route này → hydrate (giữ nguyên DOM, không vẽ lại), chia nhỏ trong transition để không chặn luồng chính.
// Trang khác (vd. 404.html cho URL lạ) → render mới.
if (root.dataset.ssr === path) {
    setServerPath(path);
    startTransition(() => {
        hydrateRoot(root, app);
    });
} else {
    createRoot(root).render(app);
}
