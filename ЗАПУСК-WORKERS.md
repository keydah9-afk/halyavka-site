# halyavka.net: переезд с Hetzner MC60 на Cloudflare Workers

Зачем и когда: `~/Developer/semrush/ПЛАН-УХОДА-С-MC60.md` (сервер MC60 закрываем, контрольная точка 20.11.2026).
Всё делает `scripts/workers.sh`. `route`/`rollback` с `--go` меняют живой сайт — только по «да» владельца на этот шаг.

## Как устроено

| воркер | конфиг | что отдаёт | откуда выкладывается | маршрут после запуска |
|---|---|---|---|---|
| `halyavka` | `wrangler.jsonc` | `dist/` без картинок (~1,1 тыс. файлов) + код `worker/index.ts` | GitHub Actions (при `HOSTING=workers`) или `scripts/workers.sh site --go` | `halyavka.net/*` |
| `halyavka-images` | `wrangler.images.jsonc` | `/images/…` — 74,6 тыс. файлов, кода нет | только с Мака: `scripts/workers.sh images --go` | `halyavka.net/images/*` |
| `halyavka-www` | `wrangler.www.jsonc` | `www.halyavka.net/*` → 301 на `halyavka.net` | `scripts/workers.sh www --go` | `www.halyavka.net/*` |

- Маршрут с более длинным путём сильнее: `/images/*` уходит в воркер картинок, остальное — в воркер сайта.
- Код сайта запускается только для адресов без слеша на конце (`run_worker_first`): `/5-klas` → **301** на `/5-klas/`
  (как у Apache; статика сама ответила бы 307), нет файла → 404 со страницей. Страницы со слешем и `/_astro/*` отдаёт статика без кода.
- Картинки: зеркало `.images-root` — жёсткие ссылки на `public/images` (места не занимает) плюс `.images-legacy` —
  21 старая картинка `8-klas/gdz-ukr-mova-avramenko/`, которой нет в `public/images`, но её ещё запрашивают (179 раз за 6 недель).
  `Cache-Control` картинок — год, как было на Apache.
- Отличия от Apache: `/index.php` — 404 (было 403); `/5-klas/index.html` — 301 на `/5-klas/` (было 200);
  `www.halyavka.net` — 301 на `halyavka.net` (было копией сайта). HTML браузеры перепроверяют при каждом заходе
  (`max-age=0, must-revalidate` вместо суток) — после выкладки сброс кеша Cloudflare больше не нужен.
- Файл подтверждения GSC `google18d2123d165a41c7.html` жил только на сервере — теперь в `public/`.

## Сделано 13.11.2026

- Воркер `halyavka` залит без маршрута (версия `6a33ed63`), проверка `node scripts/check-workers.mjs pages https://halyavka.ztrmnn.workers.dev`:
  1 114 файлов байт в байт, 8 особых адресов (301 без слеша, 404) — **всё сходится**.
- Воркер `halyavka-images` — см. ниже.

## День запуска

1. Владелец: в Cloudflare создать API-токен «Edit Cloudflare Workers» на аккаунт Ztrmnn@… и положить его в секреты репозитория
   GitHub как `CLOUDFLARE_API_TOKEN` (Settings → Secrets and variables → Actions).
2. Выложить свежие картинки и сайт (если с прошлой выкладки что-то менялось):
   `bash scripts/workers.sh images --go`, `bash scripts/workers.sh site --go`, `bash scripts/workers.sh www --go`; `bash scripts/workers.sh check`.
3. **Переключение** (по «да» владельца): `HALYAVKA_PROD_DEPLOY=yes bash scripts/workers.sh route --go` — маршруты images → www → сайт,
   workers.dev выключается. Затем `bash scripts/workers.sh status` и `bash scripts/workers.sh check https://halyavka.net`.
4. В `wrangler.jsonc` и `wrangler.images.jsonc` поставить `"workers_dev": false`, закоммитить.
5. GitHub: переменная репозитория `HOSTING` = `workers` (не путать с секретом `DEPLOY_TARGET` — это адрес сервера для rsync) (Settings → Secrets and variables → Actions → Variables).
   С этого момента push в master выкладывает в воркер, а не на сервер. Новые картинки — `scripts/workers.sh images --go` вместо `sync-images.sh`.
6. Почта: до расторжения MC60 перевести `admin@halyavka.net` на Cloudflare Email Routing (план ухода, раздел 5) — с сайтом это не связано.

**Откат:** `HALYAVKA_PROD_DEPLOY=yes bash scripts/workers.sh rollback --go`, затем Purge Everything в зоне и переменную `HOSTING` удалить.
Работает, пока жив сервер MC60 (до его расторжения сайт там не трогаем).
