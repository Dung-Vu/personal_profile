import { site } from "../content/site.js";

export function Footer() {
    return (
        <footer className="footer" data-theme="dark">
            <div className="wrap footer-row">
                <span>
                    © {site.year} {site.name}
                </span>
                <span>{site.focus.join(" · ")}</span>
            </div>
            <div className="footer-big" aria-hidden="true" data-text={site.name} />
        </footer>
    );
}
