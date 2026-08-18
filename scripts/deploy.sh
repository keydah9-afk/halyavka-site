#!/usr/bin/env bash
#
# Собирает сайт и заливает его на сервер БЕЗ картинок.
# Запасной ручной путь: обычно это делает GitHub Actions при пуше в master.
#
#   ./scripts/deploy.sh        — пробный прогон
#   ./scripts/deploy.sh --go   — собрать и залить
#
# Папку images/ на сервере не трогает НИКОГДА: она в --exclude, а rsync
# не удаляет исключённое (для этого нужен отдельный флаг --delete-excluded).
#
source "$(dirname "${BASH_SOURCE[0]}")/lib-deploy.sh"

echo "──────────────────────────────────────────────"
echo " САЙТ  →  $SSH_TARGET:$WEBROOT/"
echo " Режим: $MODE"
echo "──────────────────────────────────────────────"

echo "→ Сборка (pnpm build)…"
pnpm build

echo "→ Заливка dist/ (без images/)…"
"$RSYNC" -rltvz $DRY \
  --chmod=D755,F644 \
  --delete \
  --human-readable \
  --stats \
  --exclude='/images/' \
  --filter='protect /.htaccess' \
  --filter='protect /.well-known/' \
  --filter='protect /cgi-bin/' \
  --filter='protect /logs/' \
  --filter='protect /stats/' \
  "${JUNK[@]}" \
  -e "ssh -p $SSH_PORT" \
  dist/ "$SSH_TARGET:$WEBROOT/"

echo
if [ -n "$DRY" ]; then
  echo "Пробный прогон. ВНИМАТЕЛЬНО прочитай строки deleting — это то, что"
  echo "будет стёрто в корне сайта. Если там мелькнёт что-то чужое (панель,"
  echo "старые папки) — скажи, добавим в protect. Дальше:  ./scripts/deploy.sh --go"
else
  echo "✓ Сайт залит. Картинки не тронуты."
fi
