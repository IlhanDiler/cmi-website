from __future__ import annotations

import argparse
import json
import re
from html import escape, unescape
from pathlib import Path


SHARE_DIR = Path(__file__).resolve().parent
DATA_PATH = SHARE_DIR / 'share-pages-data.json'
MANIFEST_PATH = SHARE_DIR / 'share-pages.json'
INSTAGRAM_EXPORT_PATH = SHARE_DIR / 'instagram-export.js'
AUTO_GENERATED_COMMENT = '<!-- AUTO-GENERATED from share/share-pages-data.json via share/generate-share-pages.py. Do not edit directly. -->'
ICON_LIGHT = '/files/logo_cmi1%20-%20schwarz.svg'
ICON_DARK = '/files/logo_cmi1%20-%20wei%C3%9F.svg'
ICON_DEFAULT = '/files/logo_cmi1%20-%20schwarz.svg'
SHARE_STYLESHEET = 'share-preview.css'
SHARE_SCRIPT = 'share-preview.js'
DEFAULT_REDIRECT_DELAY_SECONDS = 8

COPY_LINK_UI = {
    'de': {
        'button': 'Link kopieren',
        'copied': 'Link kopiert',
        'failed': 'Kopieren fehlgeschlagen. Bitte Link manuell kopieren.',
    },
    'en': {
        'button': 'Copy link',
        'copied': 'Link copied',
        'failed': 'Copying failed. Please copy the link manually.',
    },
    'fr': {
        'button': 'Copier le lien',
        'copied': 'Lien copie',
        'failed': 'La copie a echoue. Merci de copier le lien manuellement.',
    },
    'ln': {
        'button': 'Copier lien',
        'copied': 'Lien ecopyami',
        'failed': 'Copier elongi te. Svp copier lien na maboko.',
    },
    'it': {
        'button': 'Copia link',
        'copied': 'Link copiato',
        'failed': 'Copia non riuscita. Copia il link manualmente.',
    },
    'tr': {
        'button': 'Baglantiyi kopyala',
        'copied': 'Baglanti kopyalandi',
        'failed': 'Kopyalama basarisiz. Lutfen baglantiyi elle kopyalayin.',
    },
    'uk': {
        'button': 'Скопіювати посилання',
        'copied': 'Посилання скопійовано',
        'failed': 'Не вдалося скопіювати. Скопіюйте посилання вручну.',
    },
}

REDIRECT_UI = {
    'de': {
        'countdown': 'Automatische Weiterleitung in {seconds} Sekunden. Tippen oder Link kopieren hält diese Seite offen.',
        'paused': 'Weiterleitung pausiert. Mit dem Hauptbutton kommst du direkt zum Abschnitt.',
    },
    'en': {
        'countdown': 'Automatic redirect in {seconds} seconds. Tap or copy the link to keep this page open.',
        'paused': 'Redirect paused. Use the main button to jump to the section directly.',
    },
    'fr': {
        'countdown': 'Redirection automatique dans {seconds} secondes. Touchez la page ou copiez le lien pour rester ici.',
        'paused': 'Redirection en pause. Utilisez le bouton principal pour ouvrir la section directement.',
    },
    'ln': {
        'countdown': 'Kokende na yango moko na kati ya ba seconde {seconds}. Simba lokasa to copier lien mpo otikala awa.',
        'paused': 'Kokende etelemisi. Salela bouton ya monene mpo okende mbala moko na eteni yango.',
    },
    'it': {
        'countdown': 'Reindirizzamento automatico tra {seconds} secondi. Tocca la pagina o copia il link per restare qui.',
        'paused': 'Reindirizzamento in pausa. Usa il pulsante principale per aprire subito la sezione.',
    },
    'tr': {
        'countdown': '{seconds} saniye içinde otomatik yönlendirme. Sayfaya dokunmak veya bağlantıyı kopyalamak bu görünümü açık tutar.',
        'paused': 'Yönlendirme duraklatıldı. Bölüme doğrudan gitmek için ana düğmeyi kullanın.',
    },
    'uk': {
        'countdown': 'Автоматичний перехід через {seconds} секунд. Торкніться сторінки або скопіюйте посилання, щоб залишитися тут.',
        'paused': 'Перехід призупинено. Скористайтеся основною кнопкою, щоб одразу відкрити потрібний розділ.',
    },
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description='Generate share preview pages and derived manifests.')
    parser.add_argument(
        '--bootstrap',
        action='store_true',
        help='Create share-pages-data.json from the existing share HTML files before generating outputs.',
    )
    return parser.parse_args()


def read_text(path: Path) -> str:
    return path.read_text(encoding='utf-8')


def write_text_if_changed(path: Path, content: str) -> bool:
    if path.exists() and read_text(path) == content:
        return False

    path.write_text(content, encoding='utf-8')
    return True


def find_first(text: str, pattern: str) -> str:
    match = re.search(pattern, text, re.S)
    return match.group(1).strip() if match else ''


def find_meta_content(text: str, key: str, attr: str = 'property') -> str:
    pattern = rf'<meta\s+{attr}="{re.escape(key)}"\s+content="([^"]*)"'
    return unescape(find_first(text, pattern))


def load_manifest_order() -> list[str]:
    if not MANIFEST_PATH.exists():
        return []

    manifest = json.loads(read_text(MANIFEST_PATH))
    return [entry for entry in manifest.get('pages', []) if isinstance(entry, str)]


def iter_share_html_files_in_order() -> list[Path]:
    available_files = {
        path.name: path
        for path in SHARE_DIR.glob('*.html')
        if path.name != 'instagram-export.html'
    }
    ordered_paths = []
    seen_names = set()

    for filename in load_manifest_order():
        path = available_files.get(filename)
        if path is not None:
            ordered_paths.append(path)
            seen_names.add(filename)

    for filename in sorted(available_files):
        if filename in seen_names:
            continue
        ordered_paths.append(available_files[filename])

    return ordered_paths


def parse_standard_page(path: Path, source: str) -> dict:
    return {
        'filename': path.name,
        'variant': 'standard',
        'lang': unescape(find_first(source, r'<html lang="([^"]+)"')),
        'locale': find_meta_content(source, 'og:locale'),
        'page_title': unescape(find_first(source, r'<title>(.*?)</title>')),
        'description': find_meta_content(source, 'description', 'name'),
        'og_image': find_meta_content(source, 'og:image'),
        'og_image_alt': find_meta_content(source, 'og:image:alt'),
        'og_url': find_meta_content(source, 'og:url'),
        'canonical_url': unescape(find_first(source, r'<link rel="canonical" href="([^"]+)"')),
        'redirect_url': unescape(find_first(source, r'<meta http-equiv="refresh" content="[^"]*url=([^"]+)"')),
        'hero_src': unescape(find_first(source, r'<img class="share-card__hero" src="([^"]+)"')),
        'hero_alt': unescape(find_first(source, r'<img class="share-card__hero" src="[^"]+" alt="([^"]+)"')),
        'eyebrow': unescape(find_first(source, r'<p class="share-card__eyebrow">(.*?)</p>')),
        'title': unescape(find_first(source, r'<h1 class="share-card__title">(.*?)</h1>')),
        'meta': unescape(find_first(source, r'<p class="share-card__meta">(.*?)</p>')),
        'text_html': find_first(source, r'<p class="share-card__text">(.*?)</p>'),
        'button_href': unescape(find_first(source, r'<a class="share-card__button" href="([^"]+)"')),
        'button_label': unescape(find_first(source, r'<a class="share-card__button" href="[^"]+">(.*?)</a>')),
        'hint': unescape(find_first(source, r'<p class="share-card__hint">(.*?)</p>')),
    }


def parse_poster_page(path: Path, source: str) -> dict:
    panels = []
    for panel_html in re.findall(r'(<figure class="share-card__poster-panel(?: share-card__poster-panel--wide)?">.*?</figure>)', source, re.S):
        panels.append(
            {
                'panel_class': find_first(panel_html, r'<figure class="([^"]+)"'),
                'media_class': find_first(panel_html, r'<div class="([^"]*share-card__poster-media[^"]*)"'),
                'image_src': unescape(find_first(panel_html, r'<img class="share-card__poster-image" src="([^"]+)"')),
                'image_alt': unescape(find_first(panel_html, r'<img class="share-card__poster-image" src="[^"]+" alt="([^"]+)"')),
                'caption_title': unescape(find_first(panel_html, r'<figcaption class="share-card__poster-caption"><strong>(.*?)</strong>')),
                'caption_text': unescape(find_first(panel_html, r'</strong><span>(.*?)</span>')),
            }
        )

    return {
        'filename': path.name,
        'variant': 'poster',
        'lang': unescape(find_first(source, r'<html lang="([^"]+)"')),
        'locale': find_meta_content(source, 'og:locale'),
        'page_title': unescape(find_first(source, r'<title>(.*?)</title>')),
        'description': find_meta_content(source, 'description', 'name'),
        'og_image': find_meta_content(source, 'og:image'),
        'og_image_alt': find_meta_content(source, 'og:image:alt'),
        'og_url': find_meta_content(source, 'og:url'),
        'canonical_url': unescape(find_first(source, r'<link rel="canonical" href="([^"]+)"')),
        'logo_alt': unescape(find_first(source, r'<img class="share-card__logo" src="[^"]+" alt="([^"]*)"')),
        'eyebrow': unescape(find_first(source, r'<p class="share-card__eyebrow">(.*?)</p>')),
        'poster_kicker': unescape(find_first(source, r'<p class="share-card__poster-kicker">(.*?)</p>')),
        'meta': unescape(find_first(source, r'<p class="share-card__meta">(.*?)</p>')),
        'title_main': unescape(find_first(source, r'<span class="share-card__title-main">(.*?)</span>')),
        'title_year': unescape(find_first(source, r'<span class="share-card__title-year">(.*?)</span>')),
        'lead': unescape(find_first(source, r'<p class="share-card__lead">(.*?)</p>')),
        'qr_src': unescape(find_first(source, r'<img class="share-card__poster-qr-image" src="([^"]+)"')),
        'qr_alt': unescape(find_first(source, r'<img class="share-card__poster-qr-image" src="[^"]+" alt="([^"]+)"')),
        'qr_caption': unescape(find_first(source, r'<figcaption class="share-card__poster-qr-caption">(.*?)</figcaption>')),
        'collage_aria_label': unescape(find_first(source, r'<section class="share-card__poster-collage" aria-label="([^"]+)"')),
        'footer_note': unescape(find_first(source, r'<p class="share-card__poster-note">(.*?)</p>')),
        'panels': panels,
    }


def bootstrap_share_data() -> list[dict]:
    pages = []

    for path in iter_share_html_files_in_order():
        source = read_text(path)
        if 'share-card--poster' in source:
            pages.append(parse_poster_page(path, source))
        else:
            pages.append(parse_standard_page(path, source))

    return pages


def escape_text(value: str) -> str:
    return escape(value, quote=False)


def escape_attr(value: str) -> str:
    return escape(value, quote=False).replace('"', '&quot;')


def get_copy_link_ui(page: dict) -> dict:
    language = str(page.get('lang', 'de')).split('-', 1)[0].lower()
    return COPY_LINK_UI.get(language, COPY_LINK_UI['de'])


def get_redirect_ui(page: dict) -> dict:
    language = str(page.get('lang', 'de')).split('-', 1)[0].lower()
    return REDIRECT_UI.get(language, REDIRECT_UI['de'])


def render_copy_button(page: dict, indent: str) -> list[str]:
    copy_ui = get_copy_link_ui(page)
    return [
        f'{indent}<button class="share-card__button share-card__button--secondary share-card__copy-button" type="button" data-share-copy-url="{escape_attr(page["canonical_url"])}" data-copy-default-label="{escape_attr(copy_ui["button"])}" data-copy-success-label="{escape_attr(copy_ui["copied"])}" data-copy-failed-message="{escape_attr(copy_ui["failed"])}" aria-label="{escape_attr(copy_ui["button"])}" title="{escape_attr(copy_ui["button"])}">{escape_text(copy_ui["button"])}\u003c/button>',
        f'{indent}<p class="share-card__status" aria-live="polite" data-share-copy-status></p>',
    ]


def render_head(page: dict) -> list[str]:
    return [
        '<head>',
        '    <meta charset="UTF-8">',
        '    <meta name="viewport" content="width=device-width, initial-scale=1.0">',
        f'    <title>{escape_text(page["page_title"])}</title>',
        '    <meta name="robots" content="noindex, follow">',
        f'    <meta name="description" content="{escape_attr(page["description"])}">',
        '    <meta property="og:site_name" content="Collegium Musicum Iuvenale Ochsenfurt">',
        f'    <meta property="og:locale" content="{escape_attr(page["locale"])}">',
        f'    <meta property="og:title" content="{escape_attr(page["page_title"])}">',
        f'    <meta property="og:description" content="{escape_attr(page["description"])}">',
        f'    <meta property="og:image" content="{escape_attr(page["og_image"])}">',
        f'    <meta property="og:image:secure_url" content="{escape_attr(page["og_image"])}">',
        f'    <meta property="og:image:alt" content="{escape_attr(page["og_image_alt"])}">',
        f'    <meta property="og:url" content="{escape_attr(page["og_url"])}">',
        f'    <link rel="canonical" href="{escape_attr(page["canonical_url"])}">',
        '    <meta property="og:type" content="article">',
        '    <meta name="twitter:card" content="summary_large_image">',
        f'    <meta name="twitter:title" content="{escape_attr(page["page_title"])}">',
        f'    <meta name="twitter:description" content="{escape_attr(page["description"])}">',
        f'    <meta name="twitter:image" content="{escape_attr(page["og_image"])}">',
        f'    <meta name="twitter:image:alt" content="{escape_attr(page["og_image_alt"])}">',
    ]


def render_standard_page(page: dict) -> str:
    redirect_ui = get_redirect_ui(page)
    lines = [
        '<!DOCTYPE html>',
        AUTO_GENERATED_COMMENT,
        f'<html lang="{escape_attr(page["lang"])}">',
        *render_head(page),
        f'    <link rel="icon" href="{ICON_LIGHT}" type="image/svg+xml" media="(prefers-color-scheme: light)">',
        f'    <link rel="icon" href="{ICON_DARK}" type="image/svg+xml" media="(prefers-color-scheme: dark)">',
        f'    <link rel="icon" href="{ICON_DEFAULT}" type="image/svg+xml">',
        f'    <link rel="stylesheet" href="{SHARE_STYLESHEET}">',
        f'    <script src="{SHARE_SCRIPT}" defer></script>',
        '</head>',
        '<body>',
        (
            f'    <main class="share-card" data-share-redirect-url="{escape_attr(page["redirect_url"])}" '
            f'data-share-redirect-delay="{DEFAULT_REDIRECT_DELAY_SECONDS}" '
            f'data-share-redirect-template="{escape_attr(redirect_ui["countdown"])}" '
            f'data-share-redirect-paused="{escape_attr(redirect_ui["paused"])}">'
        ),
        f'        <img class="share-card__hero" src="{escape_attr(page["hero_src"])}" alt="{escape_attr(page["hero_alt"])}">',
        '        <div class="share-card__body">',
        '            <div class="share-card__brand">',
        f'                <img class="share-card__logo" src="{ICON_DEFAULT}" alt="" aria-hidden="true">',
        f'                <p class="share-card__eyebrow">{escape_text(page["eyebrow"])}</p>',
        '            </div>',
        f'            <h1 class="share-card__title">{escape_text(page["title"])}</h1>',
        f'            <p class="share-card__meta">{escape_text(page["meta"])}</p>',
        f'            <p class="share-card__text">{page["text_html"]}</p>',
        '            <div class="share-card__actions">',
        f'                <a class="share-card__button" href="{escape_attr(page["button_href"])}">{escape_text(page["button_label"])}</a>',
        *render_copy_button(page, '                '),
        f'                <p class="share-card__hint" data-share-redirect-hint>{escape_text(redirect_ui["countdown"].replace("{seconds}", str(DEFAULT_REDIRECT_DELAY_SECONDS)))}</p>',
        '            </div>',
        '        </div>',
        '    </main>',
        '</body>',
        '</html>',
        '',
    ]
    return '\n'.join(lines)


def render_poster_panel(panel: dict) -> list[str]:
    return [
        f'                    <figure class="{escape_attr(panel["panel_class"])}">',
        f'                        <div class="{escape_attr(panel["media_class"])}">',
        f'                            <img class="share-card__poster-image" src="{escape_attr(panel["image_src"])}" alt="{escape_attr(panel["image_alt"])}">',
        '                        </div>',
        f'                        <figcaption class="share-card__poster-caption"><strong>{escape_text(panel["caption_title"])}</strong><span>{escape_text(panel["caption_text"])}</span></figcaption>',
        '                    </figure>',
    ]


def render_poster_page(page: dict) -> str:
    lines = [
        '<!DOCTYPE html>',
        AUTO_GENERATED_COMMENT,
        f'<html lang="{escape_attr(page["lang"])}">',
        *render_head(page),
        f'    <link rel="icon" href="{ICON_LIGHT}" type="image/svg+xml" media="(prefers-color-scheme: light)">',
        f'    <link rel="icon" href="{ICON_DARK}" type="image/svg+xml" media="(prefers-color-scheme: dark)">',
        f'    <link rel="icon" href="{ICON_DEFAULT}" type="image/svg+xml">',
        f'    <link rel="stylesheet" href="{SHARE_STYLESHEET}">',
        f'    <script src="{SHARE_SCRIPT}" defer></script>',
        '</head>',
        '<body>',
        '    <main class="share-card share-card--poster">',
        '        <div class="share-card__body">',
        '            <section class="share-card__poster-head">',
        '                <div class="share-card__poster-head-inner">',
        '                    <div class="share-card__poster-head-copy">',
        '                        <div class="share-card__brand">',
        f'                            <img class="share-card__logo" src="{ICON_DEFAULT}" alt="{escape_attr(page["logo_alt"])}">',
        f'                            <p class="share-card__eyebrow">{escape_text(page["eyebrow"])}</p>',
        '                        </div>',
        f'                        <p class="share-card__poster-kicker">{escape_text(page["poster_kicker"])}</p>',
        f'                        <p class="share-card__meta">{escape_text(page["meta"])}</p>',
        '                        <h1 class="share-card__title share-card__title--poster">',
        f'                            <span class="share-card__title-main">{escape_text(page["title_main"])}</span>',
        f'                            <span class="share-card__title-year">{escape_text(page["title_year"])}</span>',
        '                        </h1>',
        f'                        <p class="share-card__lead">{escape_text(page["lead"])}</p>',
        '                    </div>',
        '                    <figure class="share-card__poster-qr share-card__poster-qr--hero">',
        f'                        <img class="share-card__poster-qr-image" src="{escape_attr(page["qr_src"])}" alt="{escape_attr(page["qr_alt"])}">',
        f'                        <figcaption class="share-card__poster-qr-caption">{escape_text(page["qr_caption"])}</figcaption>',
        '                    </figure>',
        '                </div>',
        '            </section>',
        '',
        f'            <section class="share-card__poster-collage" aria-label="{escape_attr(page["collage_aria_label"])}">',
        '                <div class="share-card__poster-grid share-card__poster-grid--events">',
    ]

    for panel in page['panels']:
        lines.extend(render_poster_panel(panel))

    lines.extend(
        [
            '                </div>',
            '            </section>',
            '',
            '            <section class="share-card__poster-footer">',
            f'                <p class="share-card__poster-note">{escape_text(page["footer_note"])}</p>',
            '                <div class="share-card__actions share-card__actions--poster">',
            *render_copy_button(page, '                    '),
            '                </div>',
            '            </section>',
            '        </div>',
            '    </main>',
            '</body>',
            '</html>',
            '',
        ]
    )
    return '\n'.join(lines)


def render_page(page: dict) -> str:
    if page['variant'] == 'poster':
        return render_poster_page(page)

    return render_standard_page(page)


def update_manifest(pages: list[dict]) -> bool:
    manifest_content = json.dumps({'pages': [page['filename'] for page in pages]}, indent=2, ensure_ascii=False) + '\n'
    return write_text_if_changed(MANIFEST_PATH, manifest_content)


def sync_instagram_export_fallback(pages: list[dict]) -> bool:
    source = read_text(INSTAGRAM_EXPORT_PATH)
    fallback_array = 'const FALLBACK_SHARE_PAGES = [\n' + ''.join(
        f'    "{page["filename"]}",\n' for page in pages
    ) + '];'
    updated_source, replacement_count = re.subn(
        r'const FALLBACK_SHARE_PAGES = \[(.*?)\];',
        fallback_array,
        source,
        count=1,
        flags=re.S,
    )

    if replacement_count != 1:
        raise RuntimeError('Could not update FALLBACK_SHARE_PAGES in share/instagram-export.js')

    return write_text_if_changed(INSTAGRAM_EXPORT_PATH, updated_source)


def load_share_data() -> list[dict]:
    payload = json.loads(read_text(DATA_PATH))
    pages = payload.get('pages', [])
    if not isinstance(pages, list):
        raise RuntimeError('share-pages-data.json must contain a top-level "pages" array')
    return pages


def write_share_pages_data(pages: list[dict]) -> bool:
    payload = json.dumps({'pages': pages}, indent=2, ensure_ascii=False) + '\n'
    return write_text_if_changed(DATA_PATH, payload)


def generate_outputs(pages: list[dict]) -> list[str]:
    changed_outputs = []

    for page in pages:
        output_path = SHARE_DIR / page['filename']
        if write_text_if_changed(output_path, render_page(page)):
            changed_outputs.append(page['filename'])

    if update_manifest(pages):
        changed_outputs.append(MANIFEST_PATH.name)

    if sync_instagram_export_fallback(pages):
        changed_outputs.append(INSTAGRAM_EXPORT_PATH.name)

    return changed_outputs


def main() -> None:
    args = parse_args()

    if args.bootstrap:
        pages = bootstrap_share_data()
        write_share_pages_data(pages)
    else:
        pages = load_share_data()

    changed_outputs = generate_outputs(pages)
    print(json.dumps({'pageCount': len(pages), 'changedOutputs': changed_outputs}, ensure_ascii=False))


if __name__ == '__main__':
    main()