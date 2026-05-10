import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/tokens.css";
import "./styles/themes.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/responsive.css";
import "./styles/routes.css";
import "./styles/cards.css";
import "./styles/timeline.css";
import "./styles/empty-states.css";
import { App } from "./App";

const rootElement = document.getElementById("root");
const app = (
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

if (rootElement) {
    createRoot(rootElement).render(app);
}
