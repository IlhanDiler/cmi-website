from __future__ import annotations

import html
import os
import re
import shutil
from datetime import datetime, timezone
from pathlib import Path

try:
    from markdown import markdown as render_markdown
except ImportError:
    def render_markdown(text: str, extensions: list[str] | None = None) -> str:
        return f"<pre>{html.escape(text)}</pre>"


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DOCS_ROOT = PROJECT_ROOT / "docs"
OUTPUT_ROOT = PROJECT_ROOT / "tmp" / "private-docs-preview"
PREVIEW_STYLESHEET = "_preview.css"
LINK_PATTERN = re.compile(r"(\[[^\]]+\]\()([^)]+)(\))")


def rewrite_markdown_links(markdown_text: str, source_path: Path) -> str:
    def replace(match: re.Match[str]) -> str:
        prefix, target, suffix = match.groups()
        if target.startswith(("http://", "https://", "mailto:", "#")):
            return match.group(0)

        clean_target, hash_fragment = (target.split("#", 1) + [""])[:2]
        candidate = (source_path.parent / clean_target).resolve()

        try:
            relative_candidate = candidate.relative_to(DOCS_ROOT)
        except ValueError:
            return match.group(0)

        if candidate.suffix.lower() != ".md":
            return match.group(0)

        source_relative = source_path.relative_to(DOCS_ROOT)
        html_target = Path(
            os.path.relpath(
                relative_candidate.with_suffix(".html"),
                start=source_relative.parent if str(source_relative.parent) != "." else Path("."),
            )
        ).as_posix()
        if hash_fragment:
            html_target = f"{html_target}#{hash_fragment}"
        return f"{prefix}{html_target}{suffix}"

    return LINK_PATTERN.sub(replace, markdown_text)


def build_navigation(items: list[tuple[Path, str]], current_path: Path) -> str:
    nav_items = []
    for relative_path, title in items:
        href = Path(
            os.path.relpath(
                relative_path.with_suffix(".html"),
                start=current_path.parent if str(current_path.parent) != "." else Path("."),
            )
        ).as_posix()
        nav_items.append(
            f'<li><a href="{html.escape(href)}">{html.escape(title)}</a></li>'
        )
    return "\n".join(nav_items)


def render_page(
    title: str,
    body_html: str,
    navigation_html: str,
    source_path: Path,
    stylesheet_href: str,
) -> str:
    source_label = source_path.relative_to(PROJECT_ROOT).as_posix()
    build_sha = os.getenv("GITHUB_SHA", "local")[:7]
    built_at = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    return f"""<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>{html.escape(title)} | Private Docs Preview</title>
    <link rel="stylesheet" href="{html.escape(stylesheet_href)}">
</head>
<body>
    <div class="preview-layout">
        <aside class="preview-sidebar">
            <p class="preview-kicker">Private Docs Preview</p>
            <h1>Interne Vorschau</h1>
            <p class="preview-note">Nur ueber GitHub Actions Artefakte mit Repo-Zugriff verfuegbar.</p>
            <nav>
                <ul>
                    {navigation_html}
                </ul>
            </nav>
        </aside>
        <main class="preview-main">
            <header class="preview-header">
                <p class="preview-meta">Quelle: {html.escape(source_label)}</p>
                <p class="preview-meta">Build: {html.escape(build_sha)} · {html.escape(built_at)}</p>
            </header>
            <article class="preview-content">
                {body_html}
            </article>
        </main>
    </div>
</body>
</html>
"""


def write_stylesheet() -> None:
    stylesheet = OUTPUT_ROOT / PREVIEW_STYLESHEET
    stylesheet.write_text(
        """
:root {
    color-scheme: light;
    --bg: #f3efe7;
    --panel: #fffdf8;
    --ink: #1f2a2b;
    --muted: #5e6b6d;
    --line: #d8d0c3;
    --accent: #0a756d;
    --accent-soft: rgba(10, 117, 109, 0.12);
    --code-bg: #f5f1e8;
    --shadow: 0 24px 60px rgba(31, 42, 43, 0.08);
}

* {
    box-sizing: border-box;
}

body {
    margin: 0;
    background: linear-gradient(180deg, #f7f2e9 0%, #eee6d9 100%);
    color: var(--ink);
    font-family: "Plus Jakarta Sans", "Segoe UI", sans-serif;
}

a {
    color: var(--accent);
}

.preview-layout {
    min-height: 100vh;
    display: grid;
    grid-template-columns: minmax(240px, 300px) minmax(0, 1fr);
}

.preview-sidebar {
    padding: 32px 24px;
    background: rgba(255, 253, 248, 0.92);
    border-right: 1px solid var(--line);
    position: sticky;
    top: 0;
    align-self: start;
    min-height: 100vh;
}

.preview-sidebar h1 {
    margin: 0 0 12px;
    font-family: "Sora", "Segoe UI", sans-serif;
    font-size: 1.7rem;
}

.preview-kicker,
.preview-meta,
.preview-note {
    color: var(--muted);
    font-size: 0.92rem;
}

.preview-sidebar ul {
    list-style: none;
    padding: 0;
    margin: 24px 0 0;
    display: grid;
    gap: 10px;
}

.preview-sidebar a {
    display: block;
    padding: 10px 12px;
    border-radius: 12px;
    background: transparent;
    text-decoration: none;
}

.preview-sidebar a:hover,
.preview-sidebar a:focus-visible {
    background: var(--accent-soft);
    outline: none;
}

.preview-main {
    padding: 40px clamp(20px, 4vw, 56px);
}

.preview-header {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 24px;
    margin-bottom: 24px;
}

.preview-content {
    max-width: 980px;
    padding: clamp(24px, 4vw, 40px);
    background: var(--panel);
    border: 1px solid rgba(216, 208, 195, 0.8);
    border-radius: 24px;
    box-shadow: var(--shadow);
}

.preview-content h1,
.preview-content h2,
.preview-content h3,
.preview-content h4 {
    font-family: "Sora", "Segoe UI", sans-serif;
    line-height: 1.2;
}

.preview-content h1 {
    font-size: clamp(2rem, 4vw, 2.8rem);
    margin-top: 0;
}

.preview-content h2 {
    margin-top: 2.2rem;
    padding-top: 0.4rem;
    border-top: 1px solid var(--line);
}

.preview-content p,
.preview-content li {
    line-height: 1.7;
}

.preview-content code {
    padding: 0.15em 0.4em;
    border-radius: 6px;
    background: var(--code-bg);
    font-family: "Cascadia Code", Consolas, monospace;
    font-size: 0.95em;
}

.preview-content pre {
    overflow-x: auto;
    padding: 14px 16px;
    border-radius: 14px;
    background: var(--code-bg);
}

.preview-content blockquote {
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;
    border-left: 4px solid var(--accent);
    background: rgba(10, 117, 109, 0.06);
}

@media (max-width: 960px) {
    .preview-layout {
        grid-template-columns: 1fr;
    }

    .preview-sidebar {
        position: static;
        min-height: auto;
        border-right: 0;
        border-bottom: 1px solid var(--line);
    }
}
""".strip(),
        encoding="utf-8",
    )


def main() -> None:
    if not DOCS_ROOT.exists():
        raise SystemExit(f"Docs directory not found: {DOCS_ROOT}")

    if OUTPUT_ROOT.exists():
        shutil.rmtree(OUTPUT_ROOT)
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)

    docs = sorted(DOCS_ROOT.rglob("*.md"))
    navigation_entries: list[tuple[Path, str]] = []
    rendered_pages: list[tuple[Path, str, str]] = []

    for doc_path in docs:
        relative_path = doc_path.relative_to(DOCS_ROOT)
        markdown_text = doc_path.read_text(encoding="utf-8")
        rewritten_text = rewrite_markdown_links(markdown_text, doc_path)
        title = next(
            (line.lstrip("# ").strip() for line in rewritten_text.splitlines() if line.startswith("#")),
            relative_path.stem,
        )
        navigation_entries.append((relative_path, title))
        rendered_body = render_markdown(
            rewritten_text,
            extensions=["extra", "fenced_code", "sane_lists", "tables", "toc"],
        )
        rendered_pages.append((relative_path, title, rendered_body))

    write_stylesheet()

    index_links = []
    for relative_path, title in navigation_entries:
        html_path = relative_path.with_suffix(".html")
        index_links.append(
            f'<li><a href="{html.escape(html_path.as_posix())}">{html.escape(title)}</a><span>{html.escape(relative_path.as_posix())}</span></li>'
        )

    index_html = f"""<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>Private Docs Preview</title>
    <link rel="stylesheet" href="{PREVIEW_STYLESHEET}">
    <style>
        .preview-main {{ max-width: 1100px; margin: 0 auto; }}
        .preview-content ul {{ list-style: none; padding: 0; }}
        .preview-content li {{ padding: 14px 0; border-top: 1px solid var(--line); }}
        .preview-content li:first-child {{ border-top: 0; }}
        .preview-content span {{ display: block; color: var(--muted); font-size: 0.9rem; margin-top: 4px; }}
    </style>
</head>
<body>
    <main class="preview-main">
        <article class="preview-content">
            <p class="preview-kicker">GitHub Actions Artifact</p>
            <h1>Private Docs Preview</h1>
            <p>Diese Vorschau ist nur ueber einen Actions-Artefakt-Link mit Repository-Zugriff erreichbar. Sie wird nicht auf Staging deployed.</p>
            <ul>
                {''.join(index_links)}
            </ul>
        </article>
    </main>
</body>
</html>
"""
    (OUTPUT_ROOT / "index.html").write_text(index_html, encoding="utf-8")

    for relative_path, title, rendered_body in rendered_pages:
        target_path = (OUTPUT_ROOT / relative_path).with_suffix(".html")
        target_path.parent.mkdir(parents=True, exist_ok=True)
        navigation_html = build_navigation(navigation_entries, relative_path)
        stylesheet_href = Path(
            os.path.relpath(
                OUTPUT_ROOT / PREVIEW_STYLESHEET,
                start=target_path.parent,
            )
        ).as_posix()
        target_path.write_text(
            render_page(
                title,
                rendered_body,
                navigation_html,
                DOCS_ROOT / relative_path,
                stylesheet_href,
            ),
            encoding="utf-8",
        )


if __name__ == "__main__":
    main()