#!/usr/bin/env node
/*
  Витягує список роликів з YouTube-плейлиста і генерує мапу «номер вправи → id відео»
  у форматі src/data/videos/<slug>.ts.

  Використання:
    node scripts/fetch-yt-playlist.mjs <playlistId> <out.ts> [--title "Назва книги"]

  Приклад:
    node scripts/fetch-yt-playlist.mjs PLWDwhHvTecMc src/data/videos/ister-geometry-7.ts

  Номери вправ беруться з назви ролика — усе після «Вправа/Вправи» й до тире:
    «Вправа 350»                  → 350
    «Вправа 13.52»                → 13.52
    «Вправи 14.4, 14.5»           → 14.4, 14.5   (один ролик на кілька вправ)
    «Повторення. Вправи 1, 2, 3»  → 1, 2, 3
  Ключ — рядок рівно в тому вигляді, як він у списку вправ книги (він же #hash).
  Ролики без номера в назві пропускаються (виводяться у попередженні).
*/
import { writeFileSync } from 'node:fs';

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

const [, , playlistId, outPath] = process.argv;
if (!playlistId || !outPath) {
  console.error('Usage: node scripts/fetch-yt-playlist.mjs <playlistId> <out.ts>');
  process.exit(1);
}

/** Рекурсивно збирає всі значення за ключем у довільно вкладеному JSON. */
function walk(node, key, out = []) {
  if (Array.isArray(node)) {
    for (const v of node) walk(v, key, out);
  } else if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) {
      if (k === key) out.push(v);
      else walk(v, key, out);
    }
  }
  return out;
}

/** З відповіді innertube дістає {items, continuationToken}. */
function extract(data) {
  const items = walk(data, 'lockupViewModel').map((lv) => ({
    id: lv.contentId,
    title: lv?.metadata?.lockupMetadataViewModel?.title?.content ?? '',
  }));
  for (const civ of walk(data, 'continuationItemViewModel')) {
    const token =
      civ?.continuationCommand?.innertubeCommand?.continuationCommand?.token ??
      civ?.continuationCommand?.token ??
      civ?.continuationEndpoint?.continuationCommand?.token;
    if (token) return { items, token };
  }
  return { items, token: null };
}

const html = await fetch(`https://www.youtube.com/playlist?list=${playlistId}`, {
  headers: { 'User-Agent': UA, 'Accept-Language': 'uk,en;q=0.8' },
}).then((r) => r.text());

const apiKey = html.match(/"INNERTUBE_API_KEY":"([^"]+)"/)?.[1];
const clientVersion = html.match(/"INNERTUBE_CLIENT_VERSION":"([^"]+)"/)?.[1];
const initial = html.match(/var ytInitialData = (\{.*?\});<\/script>/s)?.[1];
if (!apiKey || !clientVersion || !initial) {
  console.error('Не вдалось розібрати сторінку плейлиста (YouTube змінив розмітку?).');
  process.exit(1);
}

let { items: all, token } = extract(JSON.parse(initial));
const seen = new Set(all.map((i) => i.id));
console.error(`сторінка 1: ${all.length}`);

for (let page = 2; token && page <= 40; page++) {
  const res = await fetch(`https://www.youtube.com/youtubei/v1/browse?key=${apiKey}&prettyPrint=false`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': UA,
      'X-Youtube-Client-Name': '1',
      'X-Youtube-Client-Version': clientVersion,
    },
    body: JSON.stringify({
      context: { client: { clientName: 'WEB', clientVersion, hl: 'uk', gl: 'UA' } },
      continuation: token,
    }),
  }).then((r) => r.json());

  const out = extract(res);
  token = out.token;
  const fresh = out.items.filter((i) => !seen.has(i.id));
  fresh.forEach((i) => seen.add(i.id));
  all = all.concat(fresh);
  console.error(`сторінка ${page}: +${fresh.length} (разом ${all.length})`);
  if (!fresh.length) break;
}

// «Вправа 13.52 — Геометрія 8 клас …» → беремо шматок між «Вправа/Вправи» і тире.
const HEAD = /Вправ[аи]\s+([^—–]+)/;
const TOKEN = /\d+(?:\.\d+)?/g;

const map = new Map();
const skipped = [];
for (const it of all) {
  const head = HEAD.exec(it.title);
  const nums = head ? head[1].match(TOKEN) : null;
  if (!nums || !nums.length) {
    skipped.push(it);
    continue;
  }
  // Один ролик може покривати кілька вправ — тоді всі вони ведуть на нього.
  for (const n of nums) if (!map.has(n)) map.set(n, it.id);
}
if (skipped.length) {
  console.error(`⚠️  без номера в назві: ${skipped.length}`);
  skipped.slice(0, 10).forEach((s) => console.error(`   ${s.id} | ${s.title}`));
}

const cmp = (a, b) => {
  const [a1, a2 = -1] = a.split('.').map(Number);
  const [b1, b2 = -1] = b.split('.').map(Number);
  return a1 - b1 || a2 - b2;
};
const keys = [...map.keys()].sort(cmp);
const body = [
  `// Відеорозв'язання — згенеровано scripts/fetch-yt-playlist.mjs.`,
  `// Ключ — номер вправи (той самий, що в #hash переглядача), значення — id ролика на YouTube.`,
  `// Плейлист: https://www.youtube.com/playlist?list=${playlistId}`,
  `// ${all.length - skipped.length} роликів → ${keys.length} вправ (один ролик може покривати кілька).`,
  ``,
  `export const playlistId = '${playlistId}';`,
  ``,
  `export const videos: Record<string, string> = {`,
  ...keys.map((k) => `  '${k}': '${map.get(k)}',`),
  `};`,
  ``,
  `export const videosCount = Object.keys(videos).length;`,
  ``,
].join('\n');

writeFileSync(outPath, body, 'utf8');
console.error(`✅ ${outPath}: ${all.length - skipped.length} роликів → ${keys.length} вправ`);
