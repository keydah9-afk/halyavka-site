#!/usr/bin/env python3
"""
Миграция страниц ГДЗ halyavka.net: замена inline JSON-LD на <BookSchema />.

Для каждого файла src/pages/*-klas/gdz-*/index.astro делает:
  1) Удаляет const galleryImagesForSchema = images.map(...)  (если есть)
  2) Удаляет <script type="application/ld+json" set:html={JSON.stringify({ ... })} />
  3) Если нет импорта BookSchema — добавляет его рядом с импортом RecentlyViewed
     (копируя префикс пути)
  4) Вставляет <BookSchema ... /> сразу после открывающего <PageLayout ...>

Dry-run по умолчанию. Применение: --apply
Откат через .bak: --cleanup удаляет .bak после успешной проверки.
"""
from __future__ import annotations

import argparse
import re
import shutil
import sys
from pathlib import Path

PAGES_GLOB = 'src/pages/*-klas/gdz-*/index.astro'

# 1) Переменная galleryImagesForSchema (с любыми пробелами/переносами внутри)
GALLERY_VAR_RE = re.compile(
    r'(?://[^\n]*\n)?'  # опциональный однострочный комментарий-заголовок
    r'[ \t]*const\s+galleryImagesForSchema\s*=\s*images\.map\([\s\S]*?\)\s*\)\s*;\s*\n',
)

# 2) Блок <script type="application/ld+json" ... />
#    Ищем от <script type="application/ld+json" до />  (самозакрывающийся тег)
JSONLD_SCRIPT_RE = re.compile(
    r'[ \t]*\{?/?\*?[^<]*'  # позволяем перед ним комменты-мусор
    r'<script\s+type="application/ld\+json"\s+set:html=\{JSON\.stringify\([\s\S]*?\)\}\s*/>\s*\n',
)

# Более безопасный второй вариант — ищем строго от <script type=
JSONLD_SCRIPT_STRICT_RE = re.compile(
    r'[ \t]*<script\s+type="application/ld\+json"\s+set:html=\{JSON\.stringify\([\s\S]*?\)\}\s*/>\s*\n',
)

# Комментарий /* JSON-LD Schema.org ... */ непосредственно перед скриптом
JSONLD_COMMENT_RE = re.compile(
    r'[ \t]*\{/\*\s*JSON-LD[\s\S]*?\*/\}\s*\n',
)

# 3) Импорт RecentlyViewed — берём префикс пути
RECENTLY_IMPORT_RE = re.compile(
    r"(?P<full>import\s+RecentlyViewed\s+from\s+['\"](?P<prefix>[^'\"]+)RecentlyViewed\.astro['\"];\s*\n)"
)

# Открывающий тег <PageLayout ...> (может быть многострочный)
PAGELAYOUT_OPEN_RE = re.compile(r'<PageLayout\b[^>]*>\s*\n')

BOOKSCHEMA_USAGE = """
  <BookSchema
    title={title}
    author={author}
    year={year}
    description={description}
    coverImage={coverImage}
    pageTitle={pageSeoProps.title}
    pageDescription={pageSeoProps.description}
  />
"""


def process(text: str) -> tuple[str, list[str]]:
    ops: list[str] = []
    new = text

    already_has_component = '<BookSchema' in new
    already_has_import = re.search(r"import\s+BookSchema\s+from", new) is not None

    # 1) Удалить galleryImagesForSchema
    new, n = GALLERY_VAR_RE.subn('', new)
    if n:
        ops.append(f'removed galleryImagesForSchema x{n}')

    # 2a) Удалить комментарий {/* JSON-LD ... */} (если он рядом со скриптом)
    new, n = JSONLD_COMMENT_RE.subn('', new)
    if n:
        ops.append(f'removed JSON-LD comment x{n}')

    # 2b) Удалить сам <script type="application/ld+json" ...>
    new, n = JSONLD_SCRIPT_STRICT_RE.subn('', new)
    if n:
        ops.append(f'removed inline JSON-LD script x{n}')

    # 3) Импорт BookSchema
    if not already_has_import:
        m = RECENTLY_IMPORT_RE.search(new)
        if not m:
            ops.append('SKIP: no RecentlyViewed import found')
            return new, ops
        prefix = m.group('prefix')
        bookschema_import = f"import BookSchema from '{prefix}BookSchema.astro';\n"
        new = new[: m.end()] + bookschema_import + new[m.end():]
        ops.append(f'added import BookSchema')

    # 4) Вставить <BookSchema ... /> после <PageLayout ...>
    if not already_has_component:
        m = PAGELAYOUT_OPEN_RE.search(new)
        if not m:
            ops.append('SKIP-usage: no <PageLayout> opening tag found')
        else:
            new = new[: m.end()] + BOOKSCHEMA_USAGE + new[m.end():]
            ops.append('added <BookSchema .../> after <PageLayout>')

    return new, ops


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument('--apply', action='store_true')
    ap.add_argument('--cleanup', action='store_true')
    args = ap.parse_args()

    pages = sorted(Path('.').glob(PAGES_GLOB))
    if not pages:
        print(f'No pages found matching {PAGES_GLOB}', file=sys.stderr)
        return 1

    if args.cleanup:
        removed = 0
        for p in Path('.').glob(PAGES_GLOB + '.bak2'):
            p.unlink()
            removed += 1
        print(f'Removed {removed} .bak2 files')
        return 0

    print(f'Scanning {len(pages)} pages...\n')
    changed = 0
    skipped_already_ok = 0

    for page in pages:
        original = page.read_text(encoding='utf-8')
        updated, ops = process(original)

        if not ops:
            # Ничего не нашли — возможно, файл уже мигрирован
            if '<BookSchema' in original and 'galleryImagesForSchema' not in original:
                skipped_already_ok += 1
            continue

        if updated == original:
            print(f'— {page}: {", ".join(ops)}')
            continue

        changed += 1
        label = 'WOULD CHANGE' if not args.apply else 'CHANGED'
        print(f'{label}: {page}')
        for op in ops:
            print(f'    · {op}')

        if args.apply:
            shutil.copy2(page, str(page) + '.bak2')
            page.write_text(updated, encoding='utf-8')

    print(f'\nTotal: {changed} changed, {skipped_already_ok} already migrated, '
          f'{len(pages)} scanned.')
    if not args.apply:
        print('Dry-run. To apply: python3 migrate_bookschema.py --apply')
        print('After verifying: python3 migrate_bookschema.py --cleanup')
    return 0


if __name__ == '__main__':
    sys.exit(main())