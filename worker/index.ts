// Worker сайта halyavka.net на Cloudflare Workers (переезд с Hetzner MC60, ~/Developer/semrush/ПЛАН-УХОДА-С-MC60.md).
//
// Страницы, стили и скрипты (dist/) отдаёт статика сама, код при этом не запускается. Код получает только адреса
// без слеша на конце (run_worker_first в wrangler.jsonc): /favicon.ico, /robots.txt, /5-klas и т. п. Здесь:
//   - /5-klas → 301 на /5-klas/ (как Apache с DirectorySlash; статика ответила бы 307), параметры сохраняются;
//   - нет такого файла → 404 со страницей «не знайдено» (public/404.html; её же статика отдаёт сама для /x/ без файла —
//     not_found_handling: "404-page" в wrangler.jsonc).
//   - остальное — файл как есть.
// Картинки /images/… отдаёт отдельный воркер halyavka-images (маршрут halyavka.net/images/* сильнее halyavka.net/*),
// www.halyavka.net → 301 на halyavka.net делает воркер halyavka-www (worker/www.ts).
// На *.workers.dev (проверка до запуска) у ответов кода — X-Robots-Tag: noindex.

interface Env {
  ASSETS: { fetch(input: Request | string, init?: RequestInit): Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    let res: Response;
    try {
      res = await route(request, env, url);
    } catch (e) {
      console.error('worker', url.pathname, String((e as Error)?.stack ?? e));
      res = new Response('Помилка сервера', { status: 500, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }
    if (url.hostname.endsWith('.workers.dev')) {
      res = new Response(res.body, res);
      res.headers.set('X-Robots-Tag', 'noindex');
    }
    return res;
  },
};

async function route(request: Request, env: Env, url: URL): Promise<Response> {
  const res = await env.ASSETS.fetch(request);
  // Статика переадресует /5-klas и /5-klas/index.html на /5-klas/ кодом 307 — отдаём постоянный 301.
  if (res.status === 307 || res.status === 308) {
    const loc = res.headers.get('Location');
    // Отдельный файл *.html (подтверждение GSC google…html) статика тоже уводит на адрес без .html —
    // а Apache отдавал его как есть, и проверке Google нужен 200: отдаём содержимое по исходному адресу.
    if (loc && url.pathname.endsWith('.html') && !url.pathname.endsWith('/index.html')) {
      const target = new URL(loc, url);
      return env.ASSETS.fetch(new Request(target.toString(), request));
    }
    if (loc) {
      const target = new URL(loc, url);
      target.search = url.search;
      return new Response(null, { status: 301, headers: { Location: target.toString() } });
    }
  }
  return res;
}
