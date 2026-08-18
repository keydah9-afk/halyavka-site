#!/usr/bin/env bash
#
# Заливает public/images на сервер. Шлёт ТОЛЬКО разницу: rsync сравнивает
# обе стороны и передаёт лишь новые и изменившиеся файлы.
#
#   ./scripts/sync-images.sh        — пробный прогон, показывает что поедет
#   ./scripts/sync-images.sh --go   — реальная заливка
#
# Обрыв связи не страшен: --partial сохраняет недокачанное, следующий запуск
# продолжит с места обрыва.
#
source "$(dirname "${BASH_SOURCE[0]}")/lib-deploy.sh"

echo "──────────────────────────────────────────────"
echo " КАРТИНКИ  →  $SSH_TARGET:$WEBROOT/images/"
echo " Режим: $MODE"
echo "──────────────────────────────────────────────"

# -z НЕ используем: webp/jpg уже сжаты, сжимать повторно — только жечь процессор.
# --chmod нормализует права на сервере, чтобы nginx/apache точно смог отдать файлы.
"$RSYNC" -rltv $DRY \
  --chmod=D755,F644 \
  $PRUNE \
  --partial \
  --human-readable \
  --stats \
  "${JUNK[@]}" \
  -e "$SSH_CMD" \
  public/images/ "$SSH_TARGET:$WEBROOT/images/"

echo
if [ -n "$DRY" ]; then
  echo "Это был пробный прогон."
  echo "Если всё верно, запускай:  ./scripts/sync-images.sh --go"
else
  echo "✓ Картинки на сервере синхронизированы с public/images"
fi
