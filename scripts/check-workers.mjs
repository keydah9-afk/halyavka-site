#!/usr/bin/env node
// Сверка воркеров halyavka.net с локальными файлами (ЗАПУСК-WORKERS.md).
//
//   node scripts/check-workers.mjs pages  <base>   каждый файл dist/ (кроме картинок): 200 и байт в байт как локальный;
//                                                  плюс особые адреса: без слеша → 301, нет файла → 404
//   node scripts/check-workers.mjs images <base>   каждый файл .images-root/images: 200 (HEAD), у каждого 20-го — тот же размер (GET)
//
// base — https://halyavka.ztrmnn.workers.dev, https://halyavka-images.ztrmnn.workers.dev или https://halyavka.net (после запуска).
// Расхождения — в .wrangler/check-<вид>.tsv (адрес, что ждали, что пришло).
import { createHash } from 'node:crypto';
import { readFile, readdir, stat, mkdir, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const [kind, base] = process.argv.slice(2);
if (!['pages', 'images'].includes(kind) || !base) {
  console.error('использование: check-workers.mjs pages|images <base>');
  process.exit(2);
}
const ROOT = new URL('..', import.meta.url).pathname;
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36';
const SKIP = new Set(['.DS_Store', '_headers', '.assetsignore']);

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (e.isFile() && !SKIP.has(e.name) && !e.name.startsWith('._') && !e.name.endsWith('~')) yield p;
  }
}

async function req(path, method = 'GET') {
  for (let i = 0; ; i++) {
    try {
      return await fetch(base + path, { method, redirect: 'manual', headers: { 'User-Agent': UA } });
    } catch (e) {
      if (i >= 3) throw e;
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
    }
  }
}

const bad = [];
let done = 0;
async function pool(items, n, fn) {
  let i = 0;
  await Promise.all(
    Array.from({ length: n }, async () => {
      while (i < items.length) {
        const it = items[i++];
        try {
          await fn(it);
        } catch (e) {
          bad.push([it.url ?? it, 'ошибка', String(e)]);
        }
        if (++done % 5000 === 0) console.log(`  ${done} / ${items.length}`);
      }
    }),
  );
}

const enc = (p) => p.split('/').map(encodeURIComponent).join('/');

if (kind === 'pages') {
  const dist = join(ROOT, 'dist');
  const items = [];
  for await (const f of walk(dist)) {
    const rel = relative(dist, f).split(sep).join('/');
    if (rel.startsWith('images/')) continue;
    const url = '/' + enc(rel.endsWith('index.html') ? rel.slice(0, -'index.html'.length) : rel);
    items.push({ url, file: f });
  }
  console.log(`файлов: ${items.length}`);
  await pool(items, 24, async ({ url, file }) => {
    const res = await req(url);
    if (res.status !== 200) return bad.push([url, 200, res.status + ' ' + (res.headers.get('location') ?? '')]);
    const got = createHash('sha256').update(Buffer.from(await res.arrayBuffer())).digest('hex');
    const want = createHash('sha256').update(await readFile(file)).digest('hex');
    if (got !== want) bad.push([url, 'байты как в dist', 'другие']);
  });
  // особые адреса: что раньше делал Apache
  const special = [
    ['/5-klas', 301, '/5-klas/'],
    ['/5-klas?utm=x', 301, '/5-klas/?utm=x'],
    ['/5-klas/index.html', 301, '/5-klas/'],
    ['/nema-takoi-storinky/', 404],
    ['/nema-takoi-storinky', 404],
    ['/index.php', 404],
    ['/robots.txt', 200],
    ['/favicon.ico', 200],
    ['/google18d2123d165a41c7.html', 200],
  ];
  for (const [url, code, loc] of special) {
    const res = await req(url);
    const got = res.headers.get('location');
    const locOk = !loc || (got && new URL(got, base).pathname + new URL(got, base).search === loc);
    if (res.status !== code || !locOk) bad.push([url, `${code} ${loc ?? ''}`, `${res.status} ${got ?? ''}`]);
  }
  console.log(`особых адресов: ${special.length}`);
} else {
  const rootDir = join(ROOT, '.images-root');
  const items = [];
  for await (const f of walk(join(rootDir, 'images'))) {
    items.push({ url: '/' + enc(relative(rootDir, f).split(sep).join('/')), size: (await stat(f)).size });
  }
  console.log(`картинок: ${items.length}`);
  // у всех — код (HEAD); размер — у каждой 20-й (GET: на HEAD Cloudflare не присылает Content-Length)
  await pool(items.map((it, i) => ({ ...it, full: i % 20 === 0 })), 48, async ({ url, size, full }) => {
    const res = await req(url, full ? 'GET' : 'HEAD');
    if (res.status !== 200) return bad.push([url, 200, res.status]);
    if (full) {
      const len = (await res.arrayBuffer()).byteLength;
      if (len !== size) bad.push([url, `размер ${size}`, `размер ${len}`]);
    }
  });
  const res = await req('/images/nema-takoi-kartinky.webp', 'HEAD');
  if (res.status !== 404) bad.push(['/images/nema-takoi-kartinky.webp', 404, res.status]);
}

await mkdir(join(ROOT, '.wrangler'), { recursive: true });
const out = join(ROOT, '.wrangler', `check-${kind}.tsv`);
await writeFile(out, bad.map((r) => r.join('\t')).join('\n') + (bad.length ? '\n' : ''));
console.log(bad.length ? `РАСХОЖДЕНИЙ: ${bad.length} — ${out}` : 'ИТОГ: всё сходится');
process.exit(bad.length ? 1 : 0);
