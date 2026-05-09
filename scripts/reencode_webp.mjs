import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CHROME_CANDIDATES = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];

function findChrome() {
    for (const candidate of CHROME_CANDIDATES) {
        try {
            return candidate;
        } catch {
            // noop
        }
    }

    return CHROME_CANDIDATES[0];
}

const inputPath = process.argv[2];
const quality = Number(process.argv[3] ?? 0.8);

if (!inputPath) {
    console.error("Usage: node scripts/reencode_webp.mjs <relative-path> [quality]");
    process.exit(1);
}

const absInput = path.resolve(ROOT, inputPath);

async function main() {
    const browser = await puppeteer.launch({
        executablePath: findChrome(),
        headless: "new",
        args: ["--no-sandbox", "--disable-gpu"],
    });

    try {
        const page = await browser.newPage();
        const bytes = await fs.readFile(absInput);
        const mime = "image/webp";
        const dataUrl = `data:${mime};base64,${bytes.toString("base64")}`;

        const payload = await page.evaluate(
            async ({ dataUrl, quality }) => {
                const img = new Image();
                img.decoding = "async";
                img.src = dataUrl;
                await img.decode();

                const canvas = document.createElement("canvas");
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);

                const blob = await new Promise((resolve) =>
                    canvas.toBlob(resolve, "image/webp", quality),
                );
                const arrayBuffer = await blob.arrayBuffer();
                const bytes = Array.from(new Uint8Array(arrayBuffer));
                return {
                    width: canvas.width,
                    height: canvas.height,
                    bytes,
                };
            },
            { dataUrl, quality },
        );

        const nextBytes = Buffer.from(payload.bytes);
        await fs.writeFile(absInput, nextBytes);

        console.log(
            `${path.relative(ROOT, absInput)} -> ${Math.round(bytes.length / 1024)}KB -> ${Math.round(nextBytes.length / 1024)}KB`,
        );
        console.log(`dimensions: ${payload.width}x${payload.height}, quality=${quality}`);
    } finally {
        await browser.close();
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
