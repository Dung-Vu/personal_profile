import { StrictMode, startTransition } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import { setServerPath } from "./lib/router.jsx";
import { getRoute, normalizePath } from "./routes/siteRoutes.js";
import "./styles/base.css";
import "./styles/layout.css";

const root = document.getElementById("root");
const app = (
    <StrictMode>
        <App />
    </StrictMode>
);
const path = normalizePath(window.location.pathname);
const resolvedPath = getRoute(path).path;

// HTML đã prerender khớp route chuẩn hoá (kể cả /404 cho URL lạ) → hydrate để giữ nguyên DOM, chia nhỏ trong transition để không chặn luồng chính.
if (root.dataset.ssr === resolvedPath) {
    setServerPath(resolvedPath);
    startTransition(() => {
        hydrateRoot(root, app);
    });
} else {
    createRoot(root).render(app);
}
