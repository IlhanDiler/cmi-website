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


def normalize_translated_value(value: object) -> str:
    if isinstance(value, str):
        return value
    if isinstance(value, list):
        return "\n".join(str(part) for part in value)
    raise TypeError(f"Unsupported translated value type: {type(value)!r}")


def render_translated_children_tag(
    parent_tag: str,
    child_tag: str,
    translations: dict[str, object],
    indent: str,
    *,
    parent_class_name: str | None = None,
    allow_html: bool = False,
) -> list[str]:
    parent_attributes = [f'class="{parent_class_name}"'] if parent_class_name else []
    lines = [f"{indent}<{parent_tag}{(' ' + ' '.join(parent_attributes)) if parent_attributes else ''}>"]
    child_indent = indent + "  "

    for language in LANGUAGE_ORDER:
        if language not in translations:
            raise KeyError(f"Missing translation for language '{language}'")
        raw_text = normalize_translated_value(translations[language])
        text = raw_text if allow_html else html.escape(raw_text, quote=False)
        child_attributes = build_attributes(language)

        if allow_html and "\n" in text:
            lines.append(f"{child_indent}<{child_tag} {child_attributes}>")
            for inner_line in text.splitlines():
                lines.append(f"{child_indent}  {inner_line}")
            lines.append(f"{child_indent}</{child_tag}>")
            continue

        lines.append(f"{child_indent}<{child_tag} {child_attributes}>{text}</{child_tag}>")

    lines.append(f"{indent}</{parent_tag}>")
    return lines


def render_news_feed_cards(block: dict[str, object], indent: str) -> list[str]:
    wrapper_class_name = str(block.get("className", "news-feed-grid"))
    lines = [f'{indent}<div class="{wrapper_class_name}">']
    card_indent = indent + "  "

    for item in block["items"]:
        href = html.escape(str(item["href"]), quote=True)
        image = item["image"]
        image_src = html.escape(str(image["src"]), quote=True)
        image_alt = html.escape(str(image.get("alt", "")), quote=True)
        image_mode = str(image.get("mode", "plain"))
        loading = html.escape(str(image.get("loading", "lazy")), quote=True)
        decoding = html.escape(str(image.get("decoding", "async")), quote=True)

        lines.append(f'{card_indent}<article class="news-feed-card">')
        lines.append(f'{card_indent}  <a class="news-feed-card-link" href="{href}">')
        lines.append(f'{card_indent}    <div class="news-feed-card-media">')

        if image_mode == "contained":
            lines.append(
                f'{card_indent}      <img class="news-feed-card-image news-feed-card-image--backdrop" src="{image_src}" alt="" aria-hidden="true" loading="{loading}" decoding="{decoding}">'
            )
            lines.append(
                f'{card_indent}      <img class="news-feed-card-image news-feed-card-image--contain" src="{image_src}" alt="{image_alt}" loading="{loading}" decoding="{decoding}">'
            )
        elif image_mode == "plain":
            lines.append(
                f'{card_indent}      <img class="news-feed-card-image" src="{image_src}" alt="{image_alt}" loading="{loading}" decoding="{decoding}">'
            )
        else:
            raise ValueError(f"Unsupported news feed image mode: {image_mode}")

        lines.append(f'{card_indent}    </div>')
        lines.append(f'{card_indent}    <div class="news-feed-card-body">')
        lines.append(f'{card_indent}      <div class="news-feed-card-meta">')
        lines.extend(
            render_translated_children_tag(
                "span",
                "span",
                item["badge"],
                card_indent + "        ",
                parent_class_name="news-feed-card-badge",
            )
        )
        lines.extend(
            render_translated_children_tag(
                "span",
                "span",
                item["date"],
                card_indent + "        ",
                parent_class_name="news-feed-card-date",
            )
        )
        lines.append(f'{card_indent}      </div>')
        lines.extend(
            render_translated_children_tag(
                "h3",
                "span",
                item["title"],
                card_indent + "      ",
                parent_class_name="news-feed-card-title",
            )
        )
        lines.extend(
            render_translated_children_tag(
                "p",
                "span",
                item["copy"],
                card_indent + "      ",
                parent_class_name="news-feed-card-copy",
            )
        )
        lines.extend(
            render_translated_children_tag(
                "span",
                "span",
                item["cta"],
                card_indent + "      ",
                parent_class_name="news-feed-card-cta",
            )
        )
        lines.append(f'{card_indent}    </div>')
        lines.append(f'{card_indent}  </a>')
        lines.append(f'{card_indent}</article>')

    lines.append(f'{indent}</div>')
    return lines


def render_translated_tag(
    tag: str,
    translations: dict[str, object],
    indent: str,
    *,
    class_name: str | None = None,
    icon: str | None = None,
    allow_html: bool = False,
    lang_attribute: bool = False,
) -> list[str]:
    lines: list[str] = []
    for language in LANGUAGE_ORDER:
        if language not in translations:
            raise KeyError(f"Missing translation for language '{language}'")
        tag_attributes = []
        if class_name:
            tag_attributes.append(f'class="{class_name}"')
        tag_attributes.append(build_attributes(language))
        if lang_attribute:
            tag_attributes.append(f'lang="{language}"')
        icon_markup = f'<span class="md-icon" aria-hidden="true">{icon}</span>' if icon else ""
        raw_text = normalize_translated_value(translations[language])
        text = raw_text if allow_html else html.escape(raw_text, quote=False)

        if allow_html and "\n" in text:
            lines.append(f"{indent}<{tag} {' '.join(tag_attributes)}>")
            if icon_markup:
                lines.append(f"{indent}  {icon_markup}")
            for inner_line in text.splitlines():
                lines.append(f"{indent}  {inner_line}")
            lines.append(f"{indent}</{tag}>")
            continue

        lines.append(f"{indent}<{tag} {' '.join(tag_attributes)}>{icon_markup}{text}</{tag}>")
    return lines


def render_translated_list(
    items_by_language: dict[str, list[object]],
    indent: str,
    class_name: str | None = None,
    *,
    allow_html: bool = False,
) -> list[str]:
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
            raw_item = normalize_translated_value(item)
            item_text = raw_item if allow_html else html.escape(raw_item, quote=False)
            if allow_html and "\n" in item_text:
                lines.append(f"{indent}  <li>")
                for inner_line in item_text.splitlines():
                    lines.append(f"{indent}    {inner_line}")
                lines.append(f"{indent}  </li>")
                continue
            lines.append(f"{indent}  <li>{item_text}</li>")
        lines.append(f"{indent}</ul>")
    return lines


def render_rich_block(block: dict[str, object], indent: str) -> list[str]:
    block_type = block["type"]

    if block_type == "heading":
        tag_name = f"h{int(block['level'])}"
        return render_translated_tag(
            tag_name,
            block["text"],
            indent,
            class_name=block.get("className"),
            icon=block.get("icon"),
            allow_html=bool(block.get("allowHtml", False)),
            lang_attribute=bool(block.get("langAttribute", False)),
        )

    if block_type == "paragraph":
        tag_name = str(block.get("tagName", "p"))
        return render_translated_tag(
            tag_name,
            block["text"],
            indent,
            class_name=block.get("className"),
            allow_html=bool(block.get("allowHtml", False)),
            lang_attribute=bool(block.get("langAttribute", False)),
        )

    if block_type == "list":
        return render_translated_list(
            block["items"],
            indent,
            block.get("className"),
            allow_html=bool(block.get("allowHtml", False)),
        )

    if block_type == "newsFeedCards":
        return render_news_feed_cards(block, indent)

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
