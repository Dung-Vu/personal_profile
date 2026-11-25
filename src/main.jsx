import { StrictMode, startTransition } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import { setServerPath } from "./lib/router.jsx";
import { getRoute, normalizePath } from "./routes/siteRoutes.js";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/v3.css";
import "./styles/print.css";

const root = document.getElementById("root");
const app = (
    <StrictMode>
        <App />
    </StrictMode>
);
const path = normalizePath(window.location.pathname);
const resolvedPath = getRoute(path).path;
// 404.html được prerender ở ngôn ngữ mặc định (vi); với đường dẫn /en/* không tồn tại, render client để hiện 404 tiếng Anh sạch không lệch hydration.
const isEnNotFound = resolvedPath === "/404" && (path === "/en" || path.startsWith("/en/"));

// HTML đã prerender khớp route chuẩn hoá (21 route VI + EN + /404) → hydrate để giữ nguyên DOM, chia nhỏ trong transition để không chặn luồng chính.
if (root.dataset.ssr === resolvedPath && !isEnNotFound) {
    setServerPath(resolvedPath);
    startTransition(() => {
        hydrateRoot(root, app);
    });
} else {
    createRoot(root).render(app);
}
