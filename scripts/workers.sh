#!/usr/bin/env bash
# halyavka.net на Cloudflare Workers (переезд с Hetzner MC60; порядок — ЗАПУСК-WORKERS.md). По образцу launch.sh matematika.
#
#   bash scripts/workers.sh status            кто отвечает на halyavka.net — Apache на MC60 или воркеры (по заголовкам)
#   bash scripts/workers.sh site [--go]       pnpm build → wrangler deploy воркера сайта `halyavka` (БЕЗ маршрута)
#   bash scripts/workers.sh images [--go]     зеркало .images-root → wrangler deploy воркера `halyavka-images` (БЕЗ маршрута)
#   bash scripts/workers.sh www [--go]        wrangler deploy воркера `halyavka-www` (www → без www)
#   bash scripts/workers.sh route [--go]      ПЕРЕКЛЮЧЕНИЕ: images → www → сайт; workers.dev выключается
#   bash scripts/workers.sh rollback [--go]   обратно на Apache: маршруты уводятся на несуществующий parked.halyavka.net
#   bash scripts/workers.sh check [base]      сверка страниц и картинок (по умолчанию — workers.dev; после route — https://halyavka.net)
#
# Без --go — только показывает, что будет сделано (wrangler --dry-run). route/rollback с --go меняют живой сайт:
# только по «да» владельца на этот шаг и с HALYAVKA_PROD_DEPLOY=yes. Сервер MC60 не трогать до расторжения — это и есть откат.
set -euo pipefail
set -f # звёздочки маршрутов — не шаблоны файлов
cd "$(dirname "$0")/.."
CMD=${1:-status}
GO=0
[[ "${2:-}" == "--go" ]] && GO=1
HOST=halyavka.net
PARKED=parked.halyavka.net
SUB=ztrmnn.workers.dev
WRANGLER=./node_modules/.bin/wrangler
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36'
export WRANGLER_SEND_METRICS=false

die() { echo "СТОП: $*" >&2; exit 1; }
account() { grep -o '"account_id": *"[0-9a-f]*"' wrangler.jsonc | grep -o '[0-9a-f]\{32\}'; }
guard() {
  for c in wrangler.jsonc wrangler.images.jsonc wrangler.www.jsonc; do
    ! grep -v '^[[:space:]]*//' "$c" | grep -q '"routes"' || die "в $c появились routes — их там быть не должно"
  done
  if [[ $GO == 1 ]]; then
    "$WRANGLER" whoami 2>&1 | grep -q "$(account)" || die "wrangler не видит аккаунт $(account) (wrangler login)"
  fi
}
prod_guard() { [[ "${HALYAVKA_PROD_DEPLOY:-}" == yes ]] || die "для $CMD --go нужно HALYAVKA_PROD_DEPLOY=yes (и «да» владельца)"; }
deploy() { # конфиг
  if [[ $GO == 1 ]]; then "$WRANGLER" deploy -c "$1"; else "$WRANGLER" deploy -c "$1" --dry-run; fi
}
# Конфиг только для маршрутов: без assets и с workers_dev: false — wrangler не читает файлы, а workers.dev выключается
routes_cfg() {
  local name; name=$(grep -o '"name": *"[^"]*"' "$1" | head -1 | sed 's/.*: *"//; s/"$//')
  mkdir -p .wrangler/launch
  printf '{\n  "name": "%s",\n  "account_id": "%s",\n  "compatibility_date": "2026-10-01",\n  "workers_dev": false,\n  "preview_urls": false\n}\n' \
    "$name" "$(account)" > ".wrangler/launch/$name.jsonc"
  echo ".wrangler/launch/$name.jsonc"
}
# PUT заменяет весь список маршрутов этого воркера (у других воркеров не трогает)
set_routes() {
  local config=$1; shift
  local args=()
  for r in "$@"; do args+=(--route "$r"); done
  echo "  $config: $*"
  if [[ $GO == 1 ]]; then "$WRANGLER" triggers deploy -c "$config" "${args[@]}"; else "$WRANGLER" triggers deploy -c "$config" "${args[@]}" --dry-run >/dev/null; fi
}
mirror() {
  local RSYNC=/opt/homebrew/bin/rsync; [[ -x $RSYNC ]] || RSYNC=rsync
  [[ -d public/images ]] || die "нет public/images"
  mkdir -p .images-root/images
  # жёсткие ссылки: зеркало не занимает места и всегда совпадает с public/images
  "$RSYNC" -a --delete --link-dest="$PWD/public/images" \
    --exclude='.DS_Store' --exclude='._*' --exclude='*~' --exclude='.Spotlight-V100' --exclude='.fseventsd' \
    public/images/ .images-root/images/
  # старые картинки, которых нет в public/images, но их ещё запрашивают (скачаны с MC60 13.11.2026)
  [[ -d .images-legacy/images ]] && "$RSYNC" -a --ignore-existing .images-legacy/images/ .images-root/images/
  printf '/images/*\n  Cache-Control: public, max-age=31536000\n' > .images-root/_headers
  local n; n=$(find .images-root/images -type f | wc -l | tr -d ' ')
  echo "  зеркало: $n файлов"
  (( n < 100000 )) || die "картинок $n — больше лимита 100 000 на воркер: отрезать класс в ещё один воркер"
  local big; big=$(find .images-root/images -type f -size +25M | head -3)
  [[ -z $big ]] || die "файлы больше 25 МиБ: $big"
}
who_answers() {
  local page img
  page=$(curl -sI -A "$UA" "https://$HOST/5-klas/" | tr -d '\r' | grep -i '^cache-control:' | head -1)
  img=$(curl -sI -A "$UA" "https://$HOST/images/social-share-default.webp" | tr -d '\r' | grep -i -E '^(cache-control|last-modified):' | tr '\n' ' ')
  case "$page" in
    *must-revalidate*) echo "страницы: воркер halyavka ($page)" ;;
    *max-age=86400*) echo "страницы: Apache на MC60 ($page)" ;;
    *) echo "страницы: не понять ($page)" ;;
  esac
  case "$img" in
    *ast-modified*) echo "картинки: Apache на MC60 ($img)" ;;
    *public,\ max-age=31536000*) echo "картинки: воркер halyavka-images ($img)" ;;
    *) echo "картинки: не понять ($img)" ;;
  esac
}

case "$CMD" in
  status)
    who_answers
    ;;
  site)
    guard
    pnpm build
    [[ -f dist/index.html ]] || die "dist/index.html нет — сборка пустая"
    deploy wrangler.jsonc
    ;;
  images)
    guard
    mirror
    deploy wrangler.images.jsonc
    ;;
  www)
    guard
    deploy wrangler.www.jsonc
    ;;
  route)
    guard
    [[ $GO == 1 ]] && prod_guard
    echo "Переключение на воркеры$([[ $GO == 1 ]] || echo ' (пробно, без --go)'):"
    set_routes "$(routes_cfg wrangler.images.jsonc)" "$HOST/images/*"
    set_routes "$(routes_cfg wrangler.www.jsonc)" "www.$HOST/*"
    set_routes "$(routes_cfg wrangler.jsonc)" "$HOST/*"
    if [[ $GO == 1 ]]; then sleep 5; who_answers; fi
    ;;
  rollback)
    guard
    [[ $GO == 1 ]] && prod_guard
    echo "Откат на Apache (MC60)$([[ $GO == 1 ]] || echo ' (пробно, без --go)'):"
    set_routes "$(routes_cfg wrangler.jsonc)" "$PARKED/*"
    set_routes "$(routes_cfg wrangler.www.jsonc)" "$PARKED/www/*"
    set_routes "$(routes_cfg wrangler.images.jsonc)" "$PARKED/images/*"
    if [[ $GO == 1 ]]; then sleep 5; who_answers; echo "Дальше — Purge Everything в зоне halyavka.net (кеш мог запомнить ответы воркеров)."; fi
    ;;
  check)
    if [[ -n "${2:-}" ]]; then
      node scripts/check-workers.mjs pages "$2" && node scripts/check-workers.mjs images "$2"
    else
      node scripts/check-workers.mjs pages "https://halyavka.$SUB" && node scripts/check-workers.mjs images "https://halyavka-images.$SUB"
    fi
    ;;
  *) die "неизвестная команда $CMD" ;;
esac
