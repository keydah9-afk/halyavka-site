# -*- coding: utf-8 -*-
# «Українська мова, 8 клас» — О. Авраменко (Грамота, 2025). Книга ПОСТОРІНКОВА, як 7 клас:
# кнопка = номер сторінки підручника, файл = N.webp (с. 4–173, 166 сторінок; 31, 43, 53, 83 —
# без завдань, їх немає ні в зміст.html, ні в картинках).
# Звідки що: розподіл сторінок по § і розділах — зміст.html (точні дані від користувача);
# повні назви § — шапки «gdz9-page-topic» самих сторінок (у зміст.html вони обрізані «...»,
# а PDF підручника без текстового шару). РМ-параграфи підписано «Розвиток мовлення.», як у 7 класі.
import re, html, os

ZM = "/Users/grisana/Developer/save my images/файлы/укр мова 8 Авраменко/зміст.html"
PAGES = "/Users/grisana/Developer/save my images/файлы/укр мова 8 Авраменко/готово"
IMGDIR = "/Users/grisana/Developer/halyavka-CLODE/public/images/8-klas/gdz-ukr-mova-avramenko"
OUT = "/Users/grisana/Developer/halyavka-CLODE/src/data/avramenko-ukr-mova-8.ts"

zm_all = open(ZM, encoding='utf-8').read()
short = {}  # § → назва з зміст.html (обрізана, але з префіксом «РМ.»)
for ti, s in re.findall(r'title="([^"]*)"><span class="p">[^<]*</span><span class="s">§([^<]+)</span>', zm_all):
    short.setdefault(s.strip().replace('-', '–'), html.unescape(ti))
TITLES = {}
for n, s in re.findall(r'href="готово/st-(\d+)\.html"[^>]*>.*?<span class="s">§([^<]+)</span>', zm_all, re.S):
    s = s.strip().replace('-', '–')
    if s in TITLES:
        continue
    t = open(f'{PAGES}/st-{n}.html', encoding='utf-8').read()
    for x in re.findall(r'class="gdz9-page-topic"[^>]*>(.*?)</div>', t, re.S):
        x = re.sub(r'<span class="gdz9-page-topic__exercises">.*?</span>', '', x, flags=re.S)
        x = re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', x))).strip()
        m = re.match(r'§\s*([\d–-]+)\.?\s+(.+)', x)
        if m and m.group(1).replace('-', '–') == s:
            name = m.group(2).strip()
            if short[s].startswith('РМ.') and not name.startswith('Розвиток мовлення'):
                name = 'Розвиток мовлення. ' + name
            TITLES[s] = name
            break

src = zm_all.split('<body>', 1)[1]

# розділ → [(§, [сторінки])] у порядку зміста
blocks = []
for m in re.finditer(r'<h2>(.*?)</h2>|<a href="готово/st-(\d+)\.html"[^>]*>.*?<span class="s">§([^<]+)</span>', src, re.S):
    if m.group(1):
        name = html.unescape(re.sub(r'<[^>]+>', '', m.group(1)))
        name = re.sub(r'\s*\(с\.\s*[\d–-]+\)\s*$', '', name).strip()
        blocks.append((name, []))
        continue
    page, par = int(m.group(2)), m.group(3).strip().replace('-', '–')
    secs = blocks[-1][1]
    if not secs or secs[-1][0] != par:
        secs.append((par, []))
    secs[-1][1].append(page)

real = {int(f[:-5]) for f in os.listdir(IMGDIR) if re.fullmatch(r'\d+\.webp', f)}
junk = [f for f in os.listdir(IMGDIR) if not re.fullmatch(r'\d+\.webp', f)]

# кожен § зміста має повну назву зі сторінки
seen = [p for _, secs in blocks for p, _ in secs]
assert seen == list(TITLES), f'§ без назви: {[p for p in seen if p not in TITLES]}'

flat = [n for _, secs in blocks for _, pages in secs for n in pages if n in real]
print('buttons:', len(flat), 'uniq:', len(set(flat)), 'real files:', len(real))
print('missingButtons (файл є, кнопки нема):', sorted(real - set(flat)))
print('extraButtons  (кнопка є, файлу нема):', sorted({n for _, s in blocks for _, p in s for n in p} - real))
print('dups:', len(flat) - len(set(flat)))
print('інші файли в теці:', junk)

def js(s):
    return '"' + s.replace('\\', '\\\\').replace('"', '\\"') + '"'

L = [
 "// Дані книги «Українська мова, 8 клас» — Олександр Авраменко (НУШ, «Грамота», Київ, 2025).",
 "// Розв'язки оцифровані ПОСТОРІНКОВО: кнопка = номер сторінки підручника (с. 4–173; 31, 43, 53, 83 — без завдань).",
 "// Розподіл сторінок по § — зміст.html від користувача; повні назви § — шапки самих сторінок.",
 f"// Згенеровано scripts/gdz/gen_avram8.py. Сверено з public: 0 missing / 0 extra / 0 dup ({len(flat)} файлів).",
 "",
 "export const meta = {",
 '  author: "О. Авраменко, З. Тищенко",',
 '  publisher: "Грамота",',
 '  city: "Київ",',
 "  year: 2025,",
 '  program: "НУШ",',
 '  grif: "Рекомендовано Міністерством освіти і науки України (наказ МОН від 21.02.2025 № 347)",',
 '  updatedAt: "2026-11-06",',
 "};",
 "",
 "export interface Topic {",
 "  title: string;",
 "  numbers: number[];",
 "}",
 "export interface Paragraph {",
 "  title: string;",
 "  topics: Topic[];",
 "}",
 "export interface Section {",
 "  rozdil: string;",
 "  paragraphs: Paragraph[];",
 "}",
 "",
 "export const sections: Section[] = [",
]
for name, secs in blocks:
    L += ["  {", f"    rozdil: {js(name)},", "    paragraphs: [", "      {", "        title: '',", "        topics: ["]
    for par, pages in secs:
        nums = [n for n in pages if n in real]
        if not nums:
            continue
        label = '§ ' + par
        L.append(f"          {{ title: {js(label + '. ' + TITLES[par])}, numbers: [{', '.join(map(str, nums))}] }},")
    L += ["        ],", "      },", "    ],", "  },"]
L += [
 "];",
 "",
 "export const pages: number[] = sections.flatMap((s) =>",
 "  s.paragraphs.flatMap((p) => p.topics.flatMap((t) => t.numbers))",
 ");",
 "",
 "export const pagesCount = pages.length;",
 "",
]
open(OUT, 'w', encoding='utf-8').write('\n'.join(L))
print('wrote', OUT)
