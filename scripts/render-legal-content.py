from __future__ import annotations

import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONTENT_PATH = ROOT / "scripts" / "legal-content.json"
DEFAULT_LANGUAGE = "de"
LANGUAGE_ORDER = ["de", "en", "fr", "ln", "it", "tr", "uk"]


def build_attributes(language: str) -> str:
    attributes = [f'data-lang="{language}"']
    if language != DEFAULT_LANGUAGE:
        attributes.append("hidden")
        attributes.append('aria-hidden="true"')
    return " ".join(attributes)


def render_translated_tag(tag: str, translations: dict[str, str], indent: str) -> list[str]:
    lines: list[str] = []
    for language in LANGUAGE_ORDER:
        if language not in translations:
            raise KeyError(f"Missing translation for language '{language}'")
        escaped_text = html.escape(translations[language], quote=False)
        lines.append(f"{indent}<{tag} {build_attributes(language)}>{escaped_text}</{tag}>")
    return lines


def render_target_block(target: dict[str, object]) -> str:
    lines: list[str] = []
    lines.extend(render_translated_tag("h2", target["title"], "        "))

    for section in target["sections"]:
        lines.extend(render_translated_tag("h3", section["heading"], "        "))
        lines.extend(render_translated_tag("p", section["body"], "        "))

    return "\n".join(lines)


def replace_marker_block(file_path: Path, block_id: str, rendered_block: str) -> None:
    start_marker = f"<!-- LEGAL-I18N:{block_id}:start -->"
    end_marker = f"<!-- LEGAL-I18N:{block_id}:end -->"
    source = file_path.read_text(encoding="utf-8")

    start_index = source.index(start_marker)
    end_index = source.index(end_marker, start_index) + len(end_marker)
    replacement = f"{start_marker}\n{rendered_block}\n        {end_marker}"
    updated_source = source[:start_index] + replacement + source[end_index:]
    file_path.write_text(updated_source, encoding="utf-8")


def main() -> None:
    content = json.loads(CONTENT_PATH.read_text(encoding="utf-8"))
    targets: dict[str, dict[str, object]] = content["targets"]

    for block_id, target in targets.items():
        file_path = ROOT / target["file"]
        replace_marker_block(file_path, block_id, render_target_block(target))


if __name__ == "__main__":
    main()
