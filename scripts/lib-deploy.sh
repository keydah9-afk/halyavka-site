# Общая часть для sync-images.sh и deploy.sh. Отдельно не запускается.
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."

CONF="scripts/deploy.local.env"
if [ ! -f "$CONF" ]; then
  echo "✗ Нет файла $CONF"
  echo "  Скопируй образец и впиши свои данные:"
  echo "    cp scripts/deploy.local.env.example scripts/deploy.local.env"
  exit 1
fi
# shellcheck source=/dev/null
source "$CONF"
: "${SSH_TARGET:?не задан SSH_TARGET в $CONF}"
: "${WEBROOT:?не задан WEBROOT в $CONF}"
SSH_PORT="${SSH_PORT:-22}"

# macOS с версии 15 подсовывает openrsync (протокол 29) — он слабее и не умеет
# часть нужных флагов. Берём GNU rsync из Homebrew, если он есть.
RSYNC=/opt/homebrew/bin/rsync
[ -x "$RSYNC" ] || RSYNC="$(command -v rsync)"
if ! "$RSYNC" --version 2>/dev/null | head -1 | grep -q "protocol version 3[0-9]"; then
  echo "✗ Нужен GNU rsync 3.x, а найден: $("$RSYNC" --version 2>/dev/null | head -1)"
  echo "  Поставь его:  brew install rsync"
  exit 1
fi

# По умолчанию — ПРОБНЫЙ прогон: rsync только показывает, что бы он сделал.
# Реальная работа только с флагом --go.
DRY="--dry-run"
MODE="ПРОБНЫЙ ПРОГОН (ничего не меняется)"
if [ "${1:-}" = "--go" ]; then
  DRY=""
  MODE="БОЕВОЙ ЗАПУСК"
fi

# Мусор macOS на сервер не тащим никогда.
JUNK=(--exclude='.DS_Store' --exclude='._*' --exclude='.Spotlight-V100' --exclude='.fseventsd')
