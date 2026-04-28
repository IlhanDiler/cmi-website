from __future__ import annotations

import argparse
import importlib.util
import json
import re
import shutil
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
SHARE_DIR = PROJECT_ROOT / "share"
TMP_DIR = PROJECT_ROOT / "tmp"
DEFAULT_OUTPUT_ROOT = TMP_DIR / "share-flow-pilot"
DEFAULT_FILENAMES = [
    "querbeet-roundup-2025.html",
    "internationales-galakonzert-ochsenfurt-2026.html",
    "benefiz-trommelworkshop-2026.html",
]
GENERATOR_PATH = SHARE_DIR / "generate-share-pages.py"
EXPORT_TEMPLATE_PATH = SHARE_DIR / "instagram-export.html"
EXPORT_SCRIPT_PATH = SHARE_DIR / "instagram-export.js"
EXPORT_STYLES_PATH = SHARE_DIR / "instagram-export.css"
PREVIEW_STYLES_PATH = SHARE_DIR / "share-preview.css"
PREVIEW_SCRIPT_PATH = SHARE_DIR / "share-preview.js"
QR_IMAGE_PATH = SHARE_DIR / "cmi-website-qr.png"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Build an isolated share-flow pilot bundle without touching production share outputs."
    )
    parser.add_argument(
        "filenames",
        nargs="*",
        help="Optional share HTML filenames to include in the pilot bundle.",
    )
    parser.add_argument(
        "--out",
        default=str(DEFAULT_OUTPUT_ROOT),
        help="Output root directory for the pilot bundle.",
    )
    return parser.parse_args()


def load_generator_module():
    spec = importlib.util.spec_from_file_location("share_generate_pages", GENERATOR_PATH)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Could not load generator module from {GENERATOR_PATH}")

    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def write_text(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def copy_file(source: Path, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, destination)


def create_clean_directory(path: Path) -> None:
    if path.exists():
        shutil.rmtree(path)
    path.mkdir(parents=True, exist_ok=True)


def build_fallback_array(filenames: list[str]) -> str:
    lines = ["const FALLBACK_SHARE_PAGES = ["]
    lines.extend(f'    "{filename}",' for filename in filenames)
    lines.append("];")
    return "\n".join(lines)


def patch_export_script(source: str, filenames: list[str]) -> str:
    patched_source, replacement_count = re.subn(
        r"const FALLBACK_SHARE_PAGES = \[(.*?)\];",
        build_fallback_array(filenames),
        source,
        count=1,
        flags=re.S,
    )

    if replacement_count != 1:
        raise RuntimeError("Could not patch FALLBACK_SHARE_PAGES for pilot export bundle")

    return patched_source


def select_pages(all_pages: list[dict], filenames: list[str]) -> list[dict]:
    pages_by_filename = {
        page.get("filename"): page
        for page in all_pages
        if isinstance(page, dict) and isinstance(page.get("filename"), str)
    }
    selected_pages = []
    missing_filenames = []

    for filename in filenames:
        page = pages_by_filename.get(filename)
        if page is None:
            missing_filenames.append(filename)
            continue
        selected_pages.append(page)

    if missing_filenames:
        missing = ", ".join(missing_filenames)
        raise SystemExit(f"Missing share page definitions in share/share-pages-data.json: {missing}")

    return selected_pages


def main() -> None:
    args = parse_args()
    output_root = Path(args.out).resolve()
    output_share_dir = output_root / "share"
    filenames = args.filenames or DEFAULT_FILENAMES

    generator = load_generator_module()
    all_pages = generator.load_share_data()
    selected_pages = select_pages(all_pages, filenames)

    create_clean_directory(output_root)
    output_share_dir.mkdir(parents=True, exist_ok=True)

    for page in selected_pages:
        output_path = output_share_dir / page["filename"]
        write_text(output_path, generator.render_page(page))

    manifest_payload = json.dumps(
        {"pages": [page["filename"] for page in selected_pages]},
        indent=2,
        ensure_ascii=False,
    ) + "\n"
    write_text(output_share_dir / "share-pages.json", manifest_payload)

    pilot_export_script = patch_export_script(read_text(EXPORT_SCRIPT_PATH), [page["filename"] for page in selected_pages])
    write_text(output_share_dir / "instagram-export.js", pilot_export_script)

    copy_file(EXPORT_TEMPLATE_PATH, output_share_dir / "instagram-export.html")
    copy_file(EXPORT_STYLES_PATH, output_share_dir / "instagram-export.css")
    copy_file(PREVIEW_STYLES_PATH, output_share_dir / "share-preview.css")
    copy_file(PREVIEW_SCRIPT_PATH, output_share_dir / "share-preview.js")
    copy_file(QR_IMAGE_PATH, output_share_dir / "cmi-website-qr.png")

    metadata_payload = {
        "source": "share/share-pages-data.json",
        "generator": "share/generate-share-pages.py",
        "bundleRoot": str(output_root.relative_to(PROJECT_ROOT)).replace("\\", "/"),
        "shareDir": str(output_share_dir.relative_to(PROJECT_ROOT)).replace("\\", "/"),
        "filenames": [page["filename"] for page in selected_pages],
        "copiedArtifacts": [
            "instagram-export.html",
            "instagram-export.css",
            "instagram-export.js",
            "share-preview.css",
            "share-preview.js",
            "cmi-website-qr.png",
            "share-pages.json",
        ],
    }
    write_text(output_root / "bundle.json", json.dumps(metadata_payload, indent=2, ensure_ascii=False) + "\n")

    print(json.dumps(metadata_payload, ensure_ascii=False))


if __name__ == "__main__":
    main()