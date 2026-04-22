import re
import glob
from pathlib import Path

# Старый блок из двух скриптов
OLD_PATTERN = re.compile(
    r'<script is:inline define:vars=\{\{ pageTitle: title, pageUrl: Astro\.url\.pathname \}\}>\s*'
    r'window\.__halyavkaPageData = \{ pageTitle, pageUrl \};\s*'
    r'</script>\s*'
    r'<script>\s*'
    r'import \{ trackView \} from \'~/scripts/recently-viewed\';.*?'
    r'</script>',
    re.DOTALL
)

# Новый блок
NEW_CODE = '<GdzTracker pageTitle={title} />'

# Старый импорт trackView (если есть)
OLD_IMPORT_PATTERN = re.compile(r"import \{ trackView \} from '~/scripts/recently-viewed';\s*\n")

# Импорт компонента — добавим если нет
GDZ_TRACKER_IMPORT = "import GdzTracker from '../../../components/GdzTracker.astro';\n"

files = glob.glob('src/pages/**/*.astro', recursive=True)
changed = 0

for filepath in files:
    path = Path(filepath)
    content = path.read_text(encoding='utf-8')
    original = content

    # Заменяем блок скриптов на <GdzTracker />
    new_content, n = OLD_PATTERN.subn(NEW_CODE, content)
    if n == 0:
        continue  # на этой странице не было трекера

    # Убираем старый импорт trackView если остался
    new_content = OLD_IMPORT_PATTERN.sub('', new_content)

    # Добавляем импорт GdzTracker, если его ещё нет
    if 'GdzTracker' not in new_content:
        # Ищем последний import в frontmatter и добавляем после него
        new_content = re.sub(
            r"(import [^;]+?from '[^']+?';\s*\n)(?!.*import)",
            r'\1' + GDZ_TRACKER_IMPORT,
            new_content,
            count=1,
            flags=re.DOTALL
        )

    if new_content != original:
        path.write_text(new_content, encoding='utf-8')
        print(f'✓ {filepath}')
        changed += 1

print(f'\nГотово: изменено {changed} файлов')