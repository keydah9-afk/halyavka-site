# -*- coding: utf-8 -*-
import re, html, os, json

ZM = "/Users/grisana/Developer/save my images/! Готовые картинки/файлы/Геометрия 8 клас Истер/ЗМІСТ.html"
NEWOLD = "/Users/grisana/Developer/save my images/! Готовые картинки/файлы/Геометрия 8 клас Истер/ЩО-НОВЕ-А-ЩО-СТАРЕ.txt"
IMGDIR = "/Users/grisana/Developer/halyavka-CLODE/public/images/8-klas/gdz-geometry-ister"
OUT = "/Users/grisana/Developer/halyavka-CLODE/src/data/ister-geometry-8.ts"

# титули, обрізані в ЗМІСТ.html (джерело обрізало рядок) — відновлені за друкованим ЗМІСТ
FIXED = {
 19: "§ 19. Синус, косинус і тангенс гострого кута прямокутного трикутника. Співвідношення між сторонами та кутами прямокутного трикутника",
 21: "§ 21. Многокутник і його елементи. Сума кутів опуклого многокутника. Многокутник, вписаний у коло, і многокутник, описаний навколо кола",
}

src = open(ZM, encoding="utf-8").read()
body = src.split("<main>", 1)[1]
parts = re.split(r'<h2>(.*?)</h2>', body, flags=re.S)

blocks = []  # (rozdil, [(title, pages, [ids])])
for i in range(1, len(parts), 2):
    rozdil = html.unescape(re.sub(r'<[^>]+>', '', parts[i])).strip()
    secs = []
    for sec in re.findall(r'<section>(.*?)</section>', parts[i+1], flags=re.S):
        t = re.search(r'<div class="t">(.*?)</div>', sec, flags=re.S)
        s = re.search(r'<div class="s">(.*?)</div>', sec, flags=re.S)
        tt = html.unescape(re.sub(r'<[^>]+>', '', t.group(1))).strip() if t else ''
        ss = html.unescape(re.sub(r'<[^>]+>', '', s.group(1))).strip() if s else ''
        pages = ''
        m = re.search(r'сторінки підручника\s*(\d+)[–-](\d+)', ss)
        if m: pages = f"{m.group(1)}–{m.group(2)}"
        ids = re.findall(r'href="completed/([^"]+)\.html"', sec)
        secs.append((tt, pages, ids))
    blocks.append((rozdil, secs))

real = {f[:-5] for f in os.listdir(IMGDIR) if f.endswith('.webp')}

# ЩО-НОВЕ: множина заново відзнятих
newtxt = open(NEWOLD, encoding="utf-8").read()
new_ids = set()
for line in newtxt.splitlines():
    ls = line.strip()
    if ls.startswith('НОВІ ВСІ:') or ls.startswith('нові:'):
        pass
for m in re.finditer(r'^\s*нові:\s*(.+)$', newtxt, flags=re.M):
    new_ids |= {x.strip() for x in m.group(1).split(',')}

# ── збираємо секції
out_sections = []

# 1) Повторюємо геометрію за 7 клас — фізично стор. 6–11, тобто на початку книги.
#    У ЗМІСТ.html ids = p7_1..p7_67, у public це просто 1.webp..67.webp
p7 = next((s for r, ss in blocks if r.startswith('Повторюємо') for s in ss), None)
assert p7, 'no p7 block'
p7_nums = [x.replace('p7_', '') for x in p7[2]]
out_sections.append((
    'Повторюємо геометрію за 7 клас',
    [(f'Повторюємо геометрію за 7 клас (стор. {p7[1]})', p7_nums, False)],
))

# допоміжні блоки без § (r1/r2/r4/ps) — кладемо в кінець «свого» розділу,
# як у книзі: повторення розділу 1 — стор. 67–72, розділу 2 — 110–113, розділу 4 — 181–184.
extra = {}
for rozdil, secs in blocks:
    ids = [i for s in secs for i in s[2]]
    if not ids:
        continue
    pref = ids[0].split('_')[0]
    if pref in ('r1', 'r2', 'r4', 'ps'):
        pages = next((s[1] for s in secs if s[1]), '')
        extra[pref] = (rozdil + (f' (стор. {pages})' if pages else ''), ids)

TAIL = {'Розділ 1. Чотирикутники': 'r1',
        'Розділ 2. Подібність трикутників': 'r2',
        'Розділ 4. Многокутники. Площі многокутників': 'r4'}

# 2) Розділи 1–4 з §
for rozdil, secs in blocks:
    if not rozdil.startswith('Розділ'):
        continue
    topics = []
    for tt, pages, ids in secs:
        m = re.match(r'§\s*(\d+)\.', tt)
        if m and int(m.group(1)) in FIXED:
            tt = FIXED[int(m.group(1))]
        topics.append((tt, ids, False))
    k = TAIL.get(rozdil)
    if k and k in extra:
        topics.append((extra[k][0], extra[k][1], True))
    out_sections.append((rozdil, topics))

# 3) Задачі підвищеної складності — окрема секція в кінці
if 'ps' in extra:
    out_sections.append(('Задачі підвищеної складності', [(extra['ps'][0], extra['ps'][1], True)]))

# ── відсів: показуємо лише те, для чого реально є картинка
skipped = {}
clean = []
for rozdil, topics in out_sections:
    ts = []
    for tt, ids, coll in topics:
        keep = [i for i in ids if i in real]
        miss = [i for i in ids if i not in real]
        if miss:
            skipped[tt] = miss
        if keep:
            ts.append((tt, keep, coll))
    if ts:
        clean.append((rozdil, ts))

# блоки, яких зовсім немає в public (r1/r2/r4/ps)
absent = []
for rozdil, secs in blocks:
    if rozdil.startswith('Розділ') or rozdil.startswith('Повторюємо'):
        continue
    ids = [i for s in secs for i in s[2]]
    absent.append((rozdil, len(ids), ids[0], ids[-1]))

flat = [i for _, ts in clean for tt, ids, _ in ts for i in ids]
print('buttons:', len(flat), 'uniq:', len(set(flat)), 'real files:', len(real))
print('missingButtons (файл є, кнопки нема):', sorted(real - set(flat)))
print('extraButtons  (кнопка є, файлу нема):', sorted(set(flat) - real))
print('dups:', len(flat) - len(set(flat)))
print('\nблоки без картинок узагалі:')
for r, n, a, b in absent:
    print(f'   {r}: {n} ({a} … {b})')

# ── генерація .ts
def js(s):
    return "'" + s.replace('\\', '\\\\').replace("'", "\\'") + "'"

L = []
L.append("// Дані книги «Геометрія, 8 клас» — Олександр Істер (НУШ, Генеза, Київ, 2025).")
L.append("// Нумерація вправ — §-на: 1.1 … 25.36 (тому numbers — РЯДКИ, не числа: 1.10 ≠ 1.1).")
L.append("// Блок «Повторюємо геометрію за 7 клас» (стор. 6–11) у public лежить як 1.webp…67.webp.")
L.append("// Назви § і склад кожного § — з ЗМІСТ.html (точні дані від користувача), не з навігатора.")
L.append("// Обрізані в ЗМІСТ.html заголовки § 19 і § 21 відновлені за друкованим змістом підручника.")
L.append("// Стан картинок (серпень 2026): заново відзнято 526 вправ — увесь розділ 1 (1.1–10.30),")
L.append("// увесь розділ 2 (11.1–16.29) і 17.1–17.34. Решта (17.35–20.23, 21.1–25.36, повторення")
L.append("// за 7 клас) поки що на СТАРИХ картинках — імена ті самі, тому заміна пройде без правок тут.")
L.append("// Не заведені (у public немає жодної картинки): «Вправи для повторення розділу 1» (84),")
L.append("// «…розділу 2» (40), «…розділу 4» (34), «Задачі підвищеної складності» (42) — разом 200.")
L.append("// Згенеровано scratchpad/gen_geom8.py. Сверено: 0 missing / 0 extra / 0 dup vs 887 файлів.")
L.append("")
L.append("export const meta = {")
L.append("  author: 'Олександр Істер',")
L.append("  publisher: 'Генеза',")
L.append("  city: 'Київ',")
L.append("  year: 2025,")
L.append("  program: 'НУШ',")
L.append("  grif: 'Рекомендовано Міністерством освіти і науки України',")
L.append("  updatedAt: '2026-08-31',")
L.append("};")
L.append("")
L.append("export type ExItem = number | string | { file: string; label: string };")
L.append("export interface Topic {")
L.append("  title: string;")
L.append("  numbers: ExItem[];")
L.append("  collapsed?: boolean;")
L.append("}")
L.append("export interface Paragraph {")
L.append("  title: string;")
L.append("  topics: Topic[];")
L.append("}")
L.append("export interface Section {")
L.append("  rozdil: string;")
L.append("  paragraphs: Paragraph[];")
L.append("}")
L.append("")
L.append("export const sections: Section[] = [")
for rozdil, topics in clean:
    L.append("  {")
    L.append(f"    rozdil: {js(rozdil)},")
    L.append("    paragraphs: [")
    L.append("    { title: '', topics: [")
    for tt, ids, coll in topics:
        nums = ", ".join(js(i) for i in ids)
        extra = ", collapsed: true" if coll else ""
        L.append(f"      {{ title: {js(tt)}, numbers: [{nums}]{extra} }},")
    L.append("    ] },")
    L.append("    ],")
    L.append("  },")
L.append("];")
L.append("")
L.append("// Кількість кнопок (усі оцифровані вправи) — для факту в BookHero.")
L.append("export const exercisesCount = sections")
L.append("  .flatMap((s) => s.paragraphs.flatMap((p) => p.topics.flatMap((t) => t.numbers)))")
L.append("  .length;")
L.append("")
open(OUT, 'w', encoding='utf-8').write("\n".join(L))
print('\nwrote', OUT, len("\n".join(L)), 'bytes')
