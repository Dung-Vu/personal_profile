#!/usr/bin/env python3
"""Split monolithic routes.css into per-route CSS files for Vite lazy-loading.

Strategy:
- Parse CSS into rule blocks (handling nested braces and @media)
- Classify each block by selector prefixes
- Move route-exclusive blocks to per-route files
- Keep shared blocks in routes.css
- Preserve cascade order
"""
import re
from pathlib import Path

ROOT = Path("/mnt/d/personal-website")
STYLES = ROOT / "src/styles"
ROUTES_CSS = STYLES / "routes.css"

# Route classification: prefix list -> output file
ROUTE_MAP = {
    "home": {
        "prefixes": ["home-", "story-progress", "scene-", "capability-strip",
                     "hero-actions", "proof-strip", "signal-panel", "signal-stack",
                     "motion-field", "home-hero", "home-signal", "home-story",
                     "home-scene", "home-proof", "home-motion"],
        "file": STYLES / "home.css",
        "import_in": "src/pages/HomePage.jsx",
    },
    "about": {
        "prefixes": ["about-", "dossier-", "belief-", "portrait-mark"],
        "file": STYLES / "about.css",
        "import_in": "src/pages/AboutPage.jsx",
    },
    "work": {
        "prefixes": ["work-case", "work-theater", "work-hero", "work-page",
                     "work-route", "case-route", "case-visual", "case-content",
                     "case-meta", "case-title", "case-summary", "case-proof",
                     "case-status", "case-signal", "case-number", "case-detail-link",
                     "case-proof-link", "tech-row", "theater-", "work-case-list"],
        "file": STYLES / "work.css",
        "import_in": "src/pages/WorkPage.jsx",
    },
    "case-detail": {
        "prefixes": ["case-detail-", "case-back-link", "case-detail-empty"],
        "file": STYLES / "case-detail.css",
        "import_in": "src/pages/CaseDetailPage.jsx",
    },
    "contact": {
        "prefixes": ["contact-", "brief-", "copy-status", "work-type-",
                     "channel-", "intake-", "console-", "response-strip",
                     "channel-grid", "work-type-grid", "brief-line"],
        "file": STYLES / "contact.css",
        "import_in": "src/pages/ContactPage.jsx",
    },
    "stack": {
        "prefixes": ["stack-", "capability-card", "capability-topline",
                     "tool-cloud", "evidence-list", "principle-", "stats-panel",
                     "quick-links", "stats-row", "section-heading"],
        "file": STYLES / "stack.css",
        "import_in": "src/pages/StackPage.jsx",
    },
    "workflow": {
        "prefixes": ["workflow-", "timeline", "toolchain-", "handoff-",
                     "step-card", "step-index", "check-list", "deliverable-",
                     "radar-card"],
        "file": STYLES / "workflow.css",
        "import_in": "src/pages/WorkflowPage.jsx",
    },
}


def parse_css_blocks(css_text):
    """Parse CSS into top-level blocks (rules, @media, @keyframes)."""
    blocks = []
    pos = 0
    depth = 0
    start = 0
    in_block = False

    for i, ch in enumerate(css_text):
        if ch == "{":
            if depth == 0:
                start = pos
                in_block = True
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0 and in_block:
                block = css_text[start:i + 1].strip()
                # Get the preamble (selector or @ rule before the brace)
                preamble = css_text[pos:start].strip()
                if block:
                    blocks.append({"preamble": preamble, "body": block})
                pos = i + 1
                in_block = False

    # Any trailing text
    trailing = css_text[pos:].strip()
    return blocks, trailing


def classify_block(block_text, route_prefixes_dict):
    """Check if a CSS block belongs exclusively to a route."""
    # Extract the first line (selectors)
    first_line = block_text.split("{")[0].strip()

    # Handle @media blocks: check their contents
    if first_line.startswith("@media"):
        # Check inner content for route-specific selectors
        inner = block_text[block_text.index("{") + 1:block_text.rindex("}")].strip()
        if not inner:
            return None

        # Parse inner rules crudely
        inner_selectors = set()
        for part in re.split(r"\{[^}]*\}", inner):
            for sel in part.split(","):
                sel = sel.strip()
                if sel and not sel.startswith("@"):
                    inner_selectors.add(sel)

        # Check if all inner selectors belong to one route
        for route, info in route_prefixes_dict.items():
            if all(_matches_route(s, info["prefixes"]) for s in inner_selectors if s):
                return route
        return None  # mixed media query

    # Regular rule: check all selectors
    selectors = [s.strip() for s in first_line.split(",")]
    for route, info in route_prefixes_dict.items():
        if all(_matches_route(s, info["prefixes"]) for s in selectors):
            return route
    return None  # shared


def _matches_route(selector, prefixes):
    """Check if a CSS selector matches any of the route prefixes."""
    if not selector:
        return True  # empty selector is neutral
    # Strip pseudo-classes/elements
    base = re.sub(r"[:\[].*", "", selector).strip()
    if not base:
        return True

    # Handle combined selectors like ".home-hero, .work-hero" - already split by comma
    # Check if it starts with any route prefix
    for p in prefixes:
        if base.startswith("." + p) or base.startswith(p):
            return True
    return False


def main():
    css_text = ROUTES_CSS.read_text(encoding="utf-8")
    blocks, trailing = parse_css_blocks(css_text)

    print(f"Parsed {len(blocks)} CSS blocks")

    route_blocks = {k: [] for k in ROUTE_MAP}
    shared_blocks = []

    for block in blocks:
        full_text = block["body"]
        route = classify_block(full_text, ROUTE_MAP)
        if route:
            route_blocks[route].append(full_text)
        else:
            shared_blocks.append(full_text)

    # Print stats
    for route, blks in route_blocks.items():
        print(f"  {route}: {len(blks)} blocks")
    print(f"  shared: {len(shared_blocks)} blocks")

    # Write route CSS files
    imports_to_add = {}
    for route, info in ROUTE_MAP.items():
        blks = route_blocks[route]
        if not blks:
            continue
        css_content = "\n\n".join(blks)
        info["file"].write_text(css_content, encoding="utf-8")
        imports_to_add[info["import_in"]] = f"../styles/{info['file'].name}"
        print(f"  Wrote {info['file'].name}: {len(blks)} blocks, {len(css_content)} chars")

    # Write new routes.css (shared blocks only)
    new_routes = "\n\n".join(shared_blocks)
    if trailing:
        new_routes += "\n" + trailing
    ROUTES_CSS.write_text(new_routes, encoding="utf-8")

    old_size = len(css_text)
    new_size = len(new_routes)
    print(f"\n  routes.css: {old_size} -> {new_size} bytes ({100*new_size//old_size}%)")

    # Print import instructions
    print("\n=== IMPORTS TO ADD ===")
    for file_path, css_import in imports_to_add.items():
        print(f"  In {file_path}: import '{css_import}';")


if __name__ == "__main__":
    main()
