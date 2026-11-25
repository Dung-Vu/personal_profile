import { writeFileSync } from "node:fs";
import { getCanonicalUrl, sitemapRoutes } from "../src/routes/siteRoutes.js";

const escXml = (s) =>
    String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
];

for (const route of sitemapRoutes) {
    const alternates = route.meta?.alternates;
    lines.push("  <url>");
    lines.push(`    <loc>${escXml(getCanonicalUrl(route.path))}</loc>`);
    if (alternates) {
        if (alternates.vi) {
            lines.push(`    <xhtml:link rel="alternate" hreflang="vi" href="${escXml(alternates.vi)}" />`);
        }
        if (alternates.en) {
            lines.push(`    <xhtml:link rel="alternate" hreflang="en" href="${escXml(alternates.en)}" />`);
        }
        if (alternates.xDefault) {
            lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${escXml(alternates.xDefault)}" />`);
        }
    }
    lines.push(`    <priority>${escXml(route.sitemapPriority ?? "0.7")}</priority>`);
    lines.push("  </url>");
}

lines.push("</urlset>");

writeFileSync(new URL("../public/sitemap.xml", import.meta.url), `${lines.join("\n")}\n`);
