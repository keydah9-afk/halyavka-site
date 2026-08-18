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

# Команда входа. Если задан SSH_KEY — ходим по ключу, без пароля.
SSH_CMD="ssh -p $SSH_PORT"
if [ -n "${SSH_KEY:-}" ]; then
  if [ ! -f "$SSH_KEY" ]; then
    echo "✗ Не найден ключ $SSH_KEY (проверь SSH_KEY в $CONF)"; exit 1
  fi
  SSH_CMD="$SSH_CMD -i $SSH_KEY -o IdentitiesOnly=yes"
fi

# macOS с версии 15 подсовывает openrsync (протокол 29) — он слабее и не умеет
# часть нужных флагов. Берём GNU rsync из Homebrew, если он есть.
RSYNC=/opt/homebrew/bin/rsync
[ -x "$RSYNC" ] || RSYNC="$(command -v rsync)"
# Читаем версию БЕЗ конвейера: с `set -o pipefail` связка `... | head -1`
# роняет rsync по SIGPIPE, и проверка ложно срабатывает.
RSYNC_VER="$("$RSYNC" --version 2>/dev/null || true)"
RSYNC_VER="${RSYNC_VER%%$'\n'*}"
case "$RSYNC_VER" in
  *"protocol version 3"*) ;;
  *)
    echo "✗ Нужен GNU rsync 3.x, а найден: ${RSYNC_VER:-ничего}"
    echo "  Поставь его:  brew install rsync"
    exit 1
    ;;
esac

# По умолчанию — ПРОБНЫЙ прогон: rsync только показывает, что бы он сделал.
# Реальная работа только с флагом --go.
# Разбор флагов:
#   без флагов — пробный прогон, ничего не меняется
#   --go       — боевой запуск
#   --prune    — РАЗРЕШИТЬ удаление на сервере того, чего нет локально.
#                По умолчанию выключено: заливка только добавляет и обновляет,
#                поэтому живой сайт не может сломаться на полпути.
DRY="--dry-run"
MODE="ПРОБНЫЙ ПРОГОН (ничего не меняется)"
PRUNE=""
for _arg in "$@"; do
  case "$_arg" in
    --go)    DRY=""; MODE="БОЕВОЙ ЗАПУСК" ;;
    --prune) PRUNE="--delete" ;;
    *) echo "✗ Неизвестный флаг: $_arg (можно --go и --prune)"; exit 1 ;;
  esac
done
# При --prune ничего не стираем насовсем: rsync складывает вычищенные файлы
# в датированную папку в домашней директории, вне вебрута. Вернуть — обычным
# cp -a из этой папки обратно.
if [ -n "$PRUNE" ]; then
  QUARANTINE="/usr/home/halyam/pruned-$(date +%Y%m%d-%H%M)"
  PRUNE="$PRUNE --backup --backup-dir=$QUARANTINE"
  MODE="$MODE + вычистка лишнего в $QUARANTINE"
fi

# Мусор macOS на сервер не тащим никогда.
JUNK=(--exclude='.DS_Store' --exclude='._*' --exclude='.Spotlight-V100' --exclude='.fseventsd')
