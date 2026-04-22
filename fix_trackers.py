#!/usr/bin/env python3
"""
Миграция трекеров на страницах ГДЗ halyavka.net.

Для каждого файла src/pages/*-klas/gdz-*/index.astro делает:
  1) Удаляет старый <script is:inline define:vars={{ pageTitle, pageUrl }}>
     с window.__halyavkaPageData.
  2) Удаляет старый <script>…setupTracker…</script> (модульный блок с trackView).
  3) Если нет импорта GdzTracker — добавляет его рядом с импортом RecentlyViewed,
     копируя его префикс пути (тот же уровень ../).
  4) Если в разметке нет <GdzTracker ... /> — добавляет
     <GdzTracker pageTitle={title} /> сразу после <RecentlyViewed />.

Dry-run по умолчанию. Для применения: --apply
Создаёт .bak рядом с каждым изменённым файлом. Снять бэкапы: --cleanup
"""
from __future__ import annotations

import argparse
import re
import shutil
import sys
from pathlib import Path

# --- Поиск страниц -----------------------------------------------------------

PAGES_GLOB = 'src/pages/*-klas/gdz-*/index.astro'

# --- Регулярки старых скриптов -----------------------------------------------
# Оба скрипта мы ищем консервативно:
#   - Начинаем от <script ...>
#   - Ищем якорный текст (__halyavkaPageData / setupTracker)
#   - Заканчиваем первым </script>
# re.DOTALL чтобы . захватывал переносы строк.
# Специально не требуем конкретное форматирование pageTitle/pageUrl/define:vars —
# допускаем любые пробелы и порядок ключей.

INLINE_DATA_RE = re.compile(
    r'[ \t]*<script\b[^>]*\bis:inline\b[^>]*>\s*'
    r'window\.__halyavkaPageData\b.*?</script>\s*',
    re.DOTALL,
)

MODULE_TRACKER_RE = re.compile(
    r'[ \t]*<script>\s*'
    r'import\s+\{\s*trackView\s*\}\s+from\s+[\'"]~/scripts/recently-viewed[\'"];\s*'
    r'function\s+setupTracker\b.*?</script>\s*',
    re.DOTALL,
)

# Импорт RecentlyViewed — ловим его префикс пути, чтобы повторить в импорте GdzTracker.
RECENTLY_IMPORT_RE = re.compile(
    r"(?P<full>import\s+RecentlyViewed\s+from\s+['\"](?P<prefix>[^'\"]+)RecentlyViewed\.astro['\"];\s*\n)"
)

# Использование <RecentlyViewed /> в разметке
RECENTLY_USAGE_RE = re.compile(r'<RecentlyViewed\s*/>')


def process(text: str) -> tuple[str, list[str]]:
    """Возвращает (новый_текст, список_операций)."""
    ops: list[str] = []
    new = text

    # 1) Удалить is:inline блок
    new, n = INLINE_DATA_RE.subn('', new)
    if n:
        ops.append(f'removed inline __halyavkaPageData block x{n}')

    # 2) Удалить module блок setupTracker
    new, n = MODULE_TRACKER_RE.subn('', new)
    if n:
        ops.append(f'removed module setupTracker block x{n}')

    # 3) Добавить импорт GdzTracker
    if 'GdzTracker' not in new:
        m = RECENTLY_IMPORT_RE.search(new)
        if not m:
            # Без импорта RecentlyViewed мы не знаем правильный префикс пути
            # и вообще это подозрительная страница. Пропускаем.
            ops.append('SKIP: no RecentlyViewed import found')
            return new, ops
        prefix = m.group('prefix')
        tracker_import = f"import GdzTracker from '{prefix}GdzTracker.astro';\n"
        new = new[: m.end()] + tracker_import + new[m.end():]
        ops.append(f'added import GdzTracker (prefix={prefix!r})')

    # 4) Добавить использование <GdzTracker pageTitle={title} />
    if '<GdzTracker' not in new:
        m = RECENTLY_USAGE_RE.search(new)
        if not m:
            ops.append('SKIP-usage: no <RecentlyViewed /> in markup')
        else:
            insertion = m.group(0) + '\n  <GdzTracker pageTitle={title} />'
            new = new[: m.start()] + insertion + new[m.end():]
            ops.append('added <GdzTracker pageTitle={title} />')

    return new, ops


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument('--apply', action='store_true', help='apply changes')
    ap.add_argument('--cleanup', action='store_true', help='delete all .bak files')
    args = ap.parse_args()

    pages = sorted(Path('.').glob(PAGES_GLOB))
    if not pages:
        print(f'No pages found matching {PAGES_GLOB}', file=sys.stderr)
        return 1

    if args.cleanup:
        removed = 0
        for p in Path('.').glob(PAGES_GLOB + '.bak'):
            p.unlink()
            removed += 1
        print(f'Removed {removed} .bak files')
        return 0

    print(f'Scanning {len(pages)} pages...\n')
    changed = 0
    skipped = 0

    for page in pages:
        original = page.read_text(encoding='utf-8')
        updated, ops = process(original)
        if not ops:
            continue
        if any(op.startswith('SKIP') for op in ops) and updated == original:
            skipped += 1
            print(f'— {page}: {", ".join(ops)}')
            continue

        changed += 1
        prefix = 'WOULD CHANGE' if not args.apply else 'CHANGED'
        print(f'{prefix}: {page}')
        for op in ops:
            print(f'    · {op}')

        if args.apply:
            shutil.copy2(page, str(page) + '.bak')
            page.write_text(updated, encoding='utf-8')

    print(f'\nTotal: {changed} files {"changed" if args.apply else "would change"}, '
          f'{skipped} skipped, {len(pages)} scanned.')
    if not args.apply:
        print('This was a dry-run. To apply: python fix_trackers.py --apply')
        print('After verifying the diff: python fix_trackers.py --cleanup (removes .bak files)')
    return 0


if __name__ == '__main__':
    sys.exit(main())