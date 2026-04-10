from __future__ import annotations

import argparse
import json
import re
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
SHARE_DIR = PROJECT_ROOT / "share"
DATA_PATH = SHARE_DIR / "share-pages-data.json"
MANIFEST_PATH = SHARE_DIR / "share-pages.json"
EXPORT_SCRIPT_PATH = SHARE_DIR / "instagram-export.js"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Inspect the current share-flow baseline for a representative share page."
    )
    parser.add_argument(
        "filename",
        nargs="?",
        default="querbeet-roundup-2025.html",
        help="Share HTML filename to inspect.",
    )
    parser.add_argument(
        "--out",
        help="Optional path to write the JSON report to.",
    )
    return parser.parse_args()


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def find_first(text: str, pattern: str) -> str:
    match = re.search(pattern, text, re.S)
    return match.group(1).strip() if match else ""


def load_source_entry(filename: str) -> dict | None:
    payload = json.loads(read_text(DATA_PATH))
    pages = payload.get("pages")

    if not isinstance(pages, list):
        raise SystemExit("share/share-pages-data.json must expose a 'pages' list")

    for page in pages:
        if isinstance(page, dict) and page.get("filename") == filename:
            return page

    return None


def load_manifest_pages() -> list[str]:
    payload = json.loads(read_text(MANIFEST_PATH))
    pages = payload.get("pages")
    if not isinstance(pages, list):
        raise SystemExit("share/share-pages.json must expose a 'pages' list")
    return [page for page in pages if isinstance(page, str)]


def load_fallback_pages() -> list[str]:
    source = read_text(EXPORT_SCRIPT_PATH)
    match = re.search(r"const FALLBACK_SHARE_PAGES = \[(.*?)\];", source, re.S)

    if match is None:
        raise SystemExit("Could not parse FALLBACK_SHARE_PAGES from share/instagram-export.js")

    return re.findall(r'"([^"\\]+\.html)"', match.group(1))


def load_generated_metadata(filename: str) -> dict:
    path = SHARE_DIR / filename
    if not path.exists():
        return {
            "exists": False,
            "path": f"share/{filename}",
            "variant": "",
            "lang": "",
            "title": "",
            "canonicalUrl": "",
            "ogUrl": "",
        }

    source = read_text(path)
    return {
        "exists": True,
        "path": f"share/{filename}",
        "variant": "poster" if "share-card--poster" in source else "standard",
        "lang": find_first(source, r'<html lang="([^"]+)"'),
        "title": find_first(source, r"<title>(.*?)</title>"),
        "canonicalUrl": find_first(source, r'<link rel="canonical" href="([^"]+)"'),
        "ogUrl": find_first(source, r'<meta property="og:url" content="([^"]+)"'),
    }


def build_report(filename: str) -> dict:
    source_entry = load_source_entry(filename)
    manifest_pages = load_manifest_pages()
    fallback_pages = load_fallback_pages()
    generated = load_generated_metadata(filename)

    artifacts = [
        "share/share-pages-data.json",
        f"share/{filename}",
        "share/share-pages.json",
        "share/instagram-export.js",
        "share/instagram-export.html",
    ]

    sync_checks = {
        "sourceEntryFound": source_entry is not None,
        "generatedFileExists": generated["exists"],
        "presentInManifest": filename in manifest_pages,
        "presentInFallbackList": filename in fallback_pages,
        "titleMatchesSource": bool(source_entry) and source_entry.get("page_title", "") == generated["title"],
        "canonicalMatchesSource": bool(source_entry) and source_entry.get("canonical_url", "") == generated["canonicalUrl"],
        "ogUrlMatchesSource": bool(source_entry) and source_entry.get("og_url", "") == generated["ogUrl"],
        "variantMatchesSource": bool(source_entry) and source_entry.get("variant", "") == generated["variant"],
        "languageMatchesSource": bool(source_entry) and source_entry.get("lang", "") == generated["lang"],
    }

    warnings = []
    for label, passed in sync_checks.items():
        if not passed:
            warnings.append(label)

    return {
        "filename": filename,
        "source": {
            "entryFound": source_entry is not None,
            "variant": source_entry.get("variant", "") if source_entry else "",
            "lang": source_entry.get("lang", "") if source_entry else "",
            "locale": source_entry.get("locale", "") if source_entry else "",
            "pageTitle": source_entry.get("page_title", "") if source_entry else "",
            "canonicalUrl": source_entry.get("canonical_url", "") if source_entry else "",
            "ogUrl": source_entry.get("og_url", "") if source_entry else "",
            "redirectUrl": source_entry.get("redirect_url", "") if source_entry else "",
        },
        "generated": generated,
        "artifacts": artifacts,
        "currentWorkflow": {
            "manualSourceFiles": ["share/share-pages-data.json"],
            "generatorCommand": "python share/generate-share-pages.py",
            "derivedArtifacts": [
                f"share/{filename}",
                "share/share-pages.json",
                "share/instagram-export.js",
            ],
            "verificationSurfaces": [
                f"share/{filename}",
                "share/instagram-export.html",
            ],
            "optionalGate": "python tmp/visual-qa/release_qa_smoke.py",
        },
        "baselineCounts": {
            "manualSourceFiles": 1,
            "generatorDerivedArtifacts": 3,
            "directVerificationSurfaces": 2,
            "optionalGateRuns": 1,
        },
        "syncChecks": sync_checks,
        "warnings": warnings,
    }


def main() -> None:
    args = parse_args()
    report = build_report(args.filename)
    output = json.dumps(report, indent=2, ensure_ascii=False) + "\n"

    if args.out:
        Path(args.out).write_text(output, encoding="utf-8")

    print(output, end="")


if __name__ == "__main__":
    main()