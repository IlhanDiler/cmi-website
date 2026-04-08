from __future__ import annotations

import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONTENT_PATH = ROOT / "scripts" / "legal-content.json"
ADDITIONAL_CONTENT_DIR = ROOT / "scripts" / "legal-content"
DEFAULT_LANGUAGE = "de"
LANGUAGE_ORDER = ["de", "en", "fr", "ln", "it", "tr", "uk"]


def build_attributes(language: str) -> str:
    attributes = [f'data-lang="{language}"']
    if language != DEFAULT_LANGUAGE:
        attributes.append("hidden")
        attributes.append('aria-hidden="true"')
    return " ".join(attributes)


def get_indent(target: dict[str, object]) -> str:
    return " " * int(target.get("indentSpaces", 8))


def render_translated_tag(
    tag: str,
    translations: dict[str, str],
    indent: str,
    *,
    class_name: str | None = None,
    icon: str | None = None,
) -> list[str]:
    lines: list[str] = []
    for language in LANGUAGE_ORDER:
        if language not in translations:
            raise KeyError(f"Missing translation for language '{language}'")
        tag_attributes = []
        if class_name:
            tag_attributes.append(f'class="{class_name}"')
        tag_attributes.append(build_attributes(language))
        icon_markup = f'<span class="md-icon" aria-hidden="true">{icon}</span>' if icon else ""
        escaped_text = html.escape(translations[language], quote=False)
        lines.append(f"{indent}<{tag} {' '.join(tag_attributes)}>{icon_markup}{escaped_text}</{tag}>")
    return lines


def render_translated_list(items_by_language: dict[str, list[str]], indent: str, class_name: str | None = None) -> list[str]:
    lines: list[str] = []
    for language in LANGUAGE_ORDER:
        if language not in items_by_language:
            raise KeyError(f"Missing list items for language '{language}'")

        tag_attributes = []
        if class_name:
            tag_attributes.append(f'class="{class_name}"')
        tag_attributes.append(build_attributes(language))
        lines.append(f"{indent}<ul {' '.join(tag_attributes)}>")
        for item in items_by_language[language]:
            lines.append(f"{indent}  <li>{html.escape(item, quote=False)}</li>")
        lines.append(f"{indent}</ul>")
    return lines


def render_rich_block(block: dict[str, object], indent: str) -> list[str]:
    block_type = block["type"]

    if block_type == "heading":
        tag_name = f"h{int(block['level'])}"
        return render_translated_tag(tag_name, block["text"], indent, icon=block.get("icon"))

    if block_type == "paragraph":
        return render_translated_tag("p", block["text"], indent)

    if block_type == "list":
        return render_translated_list(block["items"], indent, block.get("className"))

    if block_type == "group":
        lines = [f"{indent}<div class=\"{block['className']}\">"]
        child_indent = indent + "  "
        for child in block["children"]:
            lines.extend(render_rich_block(child, child_indent))
        lines.append(f"{indent}</div>")
        return lines

    raise ValueError(f"Unsupported block type: {block_type}")


def render_target_block(target: dict[str, object]) -> str:
    lines: list[str] = []
    indent = get_indent(target)

    if "blocks" in target:
        for block in target["blocks"]:
            lines.extend(render_rich_block(block, indent))
        return "\n".join(lines)

    lines.extend(render_translated_tag("h2", target["title"], indent))

    for section in target["sections"]:
        lines.extend(render_translated_tag("h3", section["heading"], indent))
        lines.extend(render_translated_tag("p", section["body"], indent))

    return "\n".join(lines)


def replace_marker_block(file_path: Path, block_id: str, rendered_block: str, marker_indent: str) -> None:
    start_marker = f"<!-- LEGAL-I18N:{block_id}:start -->"
    end_marker = f"<!-- LEGAL-I18N:{block_id}:end -->"
    source = file_path.read_text(encoding="utf-8")

    start_index = source.index(start_marker)
    end_index = source.index(end_marker, start_index) + len(end_marker)
    replacement = f"{start_marker}\n{rendered_block}\n{marker_indent}{end_marker}"
    updated_source = source[:start_index] + replacement + source[end_index:]
    file_path.write_text(updated_source, encoding="utf-8")


def load_targets() -> dict[str, dict[str, object]]:
    source_paths = [CONTENT_PATH]
    if ADDITIONAL_CONTENT_DIR.exists():
        source_paths.extend(sorted(ADDITIONAL_CONTENT_DIR.glob("*.json")))

    targets: dict[str, dict[str, object]] = {}
    for source_path in source_paths:
        content = json.loads(source_path.read_text(encoding="utf-8"))
        for block_id, target in content["targets"].items():
            if block_id in targets:
                raise ValueError(f"Duplicate legal content target: {block_id}")
            targets[block_id] = target

    return targets


def main() -> None:
    targets = load_targets()

    for block_id, target in targets.items():
        file_path = ROOT / target["file"]
        replace_marker_block(file_path, block_id, render_target_block(target), get_indent(target))


if __name__ == "__main__":
    main()
