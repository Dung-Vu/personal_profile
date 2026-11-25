import { writeFileSync } from "node:fs";
import { getCanonicalUrl, sitemapRoutes } from "../src/routes/siteRoutes.js";

const escXml = (s) =>
    String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
];

for (const route of sitemapRoutes) {
    lines.push("  <url>");
    lines.push(`    <loc>${escXml(getCanonicalUrl(route.path))}</loc>`);
    lines.push(`    <priority>${escXml(route.sitemapPriority ?? "0.7")}</priority>`);
    lines.push("  </url>");
}

lines.push("</urlset>");

writeFileSync(new URL("../public/sitemap.xml", import.meta.url), `${lines.join("\n")}\n`);
