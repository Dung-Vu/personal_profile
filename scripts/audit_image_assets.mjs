import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ASSET_DIR = path.join(ROOT, "public", "assets");

const thresholds = {
    ".webp": 120,
};

const formatKb = (bytes) => `${(bytes / 1024).toFixed(1)}KB`;

async function main() {
    const files = await fs.readdir(ASSET_DIR, { withFileTypes: true });
    const rows = [];

    for (const file of files) {
        if (!file.isFile()) continue;
        const ext = path.extname(file.name).toLowerCase();
        if (!Object.hasOwn(thresholds, ext)) continue;

        const stat = await fs.stat(path.join(ASSET_DIR, file.name));
        const sizeKb = stat.size / 1024;
        const limit = thresholds[ext];
        rows.push({
            name: file.name,
            ext,
            size: stat.size,
            limit,
            status: sizeKb > limit ? "REVIEW" : "OK",
        });
    }

    rows.sort((left, right) => right.size - left.size);

    console.log("WebP asset size audit: public/assets");
    console.log("status  size      limit    file");
    for (const row of rows) {
        console.log(
            `${row.status.padEnd(7)} ${formatKb(row.size).padEnd(9)} ${`${row.limit}KB`.padEnd(8)} ${row.name}`,
        );
    }

    const totalBytes = rows.reduce((sum, row) => sum + row.size, 0);
    const review = rows.filter((row) => row.status === "REVIEW");

    console.log("");
    console.log(`Total raster assets: ${formatKb(totalBytes)} across ${rows.length} files`);
    console.log(`Review candidates: ${review.length || "none"}`);

    if (process.argv.includes("--strict") && review.length) {
        process.exitCode = 1;
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
