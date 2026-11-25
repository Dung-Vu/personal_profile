const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const STANDARD_PATHS = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    "/mnt/c/Program Files/Google/Chrome/Application/chrome.exe",
    "/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "/mnt/c/Program Files/Microsoft/Edge/Application/msedge.exe",
];

function isExecutableFile(filePath) {
    try {
        const stat = fs.statSync(filePath);
        return stat.isFile();
    } catch {
        return false;
    }
}

function scanDirForBinaries(dir, targetNames, maxDepth, found = []) {
    if (maxDepth < 0 || !fs.existsSync(dir)) return found;
    let entries;
    try {
        entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
        return found;
    }
    // Sort descending with numeric collation so newer cached versions come first.
    entries.sort((a, b) => b.name.localeCompare(a.name, undefined, { numeric: true }));
    for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isFile() && targetNames.has(entry.name)) {
            found.push(full);
        } else if (entry.isDirectory() && maxDepth > 0) {
            scanDirForBinaries(full, targetNames, maxDepth - 1, found);
        }
    }
    return found;
}

function findPuppeteerCachedChrome() {
    const cacheRoot = process.env.PUPPETEER_CACHE_DIR || path.join(os.homedir(), ".cache", "puppeteer");
    const headlessShell = scanDirForBinaries(
        path.join(cacheRoot, "chrome-headless-shell"),
        new Set(["chrome-headless-shell", "chrome-headless-shell.exe"]),
        4,
    );
    const fullChrome = scanDirForBinaries(
        path.join(cacheRoot, "chrome"),
        new Set(["Google Chrome for Testing", "chrome", "chrome.exe"]),
        5,
    );
    return { headlessShell, fullChrome };
}

function findChrome({ preferFullChrome = false } = {}) {
    if (process.env.CHROME_PATH) {
        if (isExecutableFile(process.env.CHROME_PATH)) return process.env.CHROME_PATH;
        throw new Error(`CHROME_PATH does not point to an existing file: ${process.env.CHROME_PATH}`);
    }

    const { headlessShell, fullChrome } = findPuppeteerCachedChrome();
    const candidates = preferFullChrome
        ? [...STANDARD_PATHS, ...fullChrome, ...headlessShell]
        : [...headlessShell, ...fullChrome, ...STANDARD_PATHS];

    const match = candidates.find((candidate) => candidate && isExecutableFile(candidate));
    if (!match) {
        throw new Error(
            "Chrome/Chromium executable not found. Set CHROME_PATH or install Google Chrome / Puppeteer browser cache.",
        );
    }
    return match;
}

module.exports = { findChrome };
