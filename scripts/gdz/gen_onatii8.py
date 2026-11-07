# -*- coding: utf-8 -*-
# «Українська мова, 8 клас» — А. Онатій, Т. Ткачук (Літера ЛТД, Київ, 2025). Книга по ВПРАВАХ,
# поділена на УРОКИ (як 9 клас Онатій, див. gen_onatii9.py). На відміну від 9 класу, зміст.html
# тут чистий: розділи (<h2>) і уроки (<h3>) підписані так само, як у друкованому ЗМІСТі PDF,
# тому вся структура береться прямо з нього.
# Тренувальні тести — окремі файли testy-N.webp, стоять на місці свого уроку, підпис «Тести N».
# Файли на сайті: vprava-N.webp → N.webp (так само, як у 9 класі), testy-N — під власними іменами.
import re, html, os

SRC = "/Users/grisana/Developer/save my images/файлы/укр мова 8 Онатій"
ZM = SRC + "/зміст.html"
IMGDIR = "/Users/grisana/Developer/halyavka-CLODE/public/images/8-klas/gdz-ukr-mova-onatii"
OUT = "/Users/grisana/Developer/halyavka-CLODE/src/data/onatii-ukr-mova-8.ts"


def text(s):
    return html.unescape(re.sub(r'<[^>]+>', '', s)).strip()


zm = open(ZM, encoding='utf-8').read().split('<body', 1)[1]
sections = []  # [(розділ, [(урок, [id…])])]
for m in re.finditer(r'<h2[^>]*>(.*?)</h2>|<h3[^>]*>(.*?)</h3>|<a [^>]*href="готово/([^"]+)\.html"', zm, re.S):
    if m.group(1) is not None:
        # «Словосполучення (Уроки 3–10)» → «Словосполучення»
        sections.append((re.sub(r'\s*\(Урок[иі]?\s[\d–-]+\)$', '', text(m.group(1))), []))
    elif m.group(2) is not None:
        sections[-1][1].append((text(m.group(2)).replace("'", '’'), []))
    else:
        sections[-1][1][-1][1].append(m.group(3))

ids = [x for _, ls in sections for _, xs in ls for x in xs]
vprs = [int(x[7:]) for x in ids if x.startswith('vprava-')]
assert vprs == list(range(1, len(vprs) + 1)), 'вправи не наскрізні або не по порядку'
assert all(re.fullmatch(r'vprava-\d+|testy-\d+', x) for x in ids), 'невідомий тип файла'


def file_of(x):
    return x[7:] if x.startswith('vprava-') else x


real = {f[:-5] for f in os.listdir(IMGDIR) if f.endswith('.webp')}
flat = [file_of(x) for x in ids]
print('кнопок:', len(flat), '| вправ:', len(vprs), '| тестів:', len(flat) - len(vprs), '| файлів:', len(real))
print('missingButtons:', sorted(real - set(flat)))
print('extraButtons  :', sorted(set(flat) - real))
print('dups:', len(flat) - len(set(flat)))
assert real == set(flat) and len(flat) == len(set(flat)), 'звірка не зійшлась'


def js(s):
    return "'" + s.replace('\\', '\\\\').replace("'", "\\'") + "'"


def compress(ns):
    out, i = [], 0
    while i < len(ns):
        j = i
        while j + 1 < len(ns) and ns[j + 1] == ns[j] + 1:
            j += 1
        if j - i >= 2:
            out.append(f'...range({ns[i]}, {ns[j]})')
        else:
            out.extend(str(v) for v in ns[i:j + 1])
        i = j + 1
    return ', '.join(out)


L = [
    '// Дані книги «Українська мова, 8 клас» — Анастасія Онатій, Тарас Ткачук (Літера ЛТД, Київ, 2025).',
    f'// Наскрізні вправи 1..{len(vprs)} + {len(flat) - len(vprs)} тренувальних тестів, за уроками.',
    '// Розділи й уроки — зміст.html (збігаються з друкованим ЗМІСТом PDF).',
    '// Кнопка = ім\'я файла: вправи лежать як N.webp, тести — testy-N.webp.',
    f'// Згенеровано scripts/gdz/gen_onatii8.py. Сверено: 0 missing / 0 extra / 0 dup vs {len(real)} файлів.',
    '',
    'export const meta = {',
    "  author: 'Анастасія Онатій, Тарас Ткачук',",
    "  publisher: 'Літера ЛТД',",
    "  city: 'Київ',",
    '  year: 2025,',
    "  program: 'НУШ',",
    "  grif: 'Рекомендовано Міністерством освіти і науки України (наказ МОН від 21.02.2025 № 347)',",
    "  updatedAt: '2026-11-07',",
    '};',
    '',
    'export type ExItem = number | string | { file: string; label: string };',
    'export interface Topic {',
    '  title: string;',
    '  numbers: ExItem[];',
    '  collapsed?: boolean;',
    '}',
    'export interface Paragraph {',
    '  title: string;',
    '  topics: Topic[];',
    '}',
    'export interface Section {',
    '  rozdil: string;',
    '  paragraphs: Paragraph[];',
    '}',
    '',
    'const range = (from: number, to: number): number[] =>',
    '  Array.from({ length: to - from + 1 }, (_, i) => from + i);',
    '',
    'export const sections: Section[] = [',
]
for rname, lessons in sections:
    L += ['  {', f'    rozdil: {js(rname)},', '    paragraphs: [', "    { title: '', topics: ["]
    for lname, xs in lessons:
        nums = [int(x[7:]) for x in xs if x.startswith('vprava-')]
        parts = [compress(nums)] if nums else []
        parts += ['{ file: %s, label: %s }' % (js(x), js('Тести ' + x[6:])) for x in xs if x.startswith('testy-')]
        L.append(f'      {{ title: {js(lname)}, numbers: [{", ".join(parts)}] }},')
    L += ['    ] },', '    ],', '  },']
L += [
    '];',
    '',
    '// Кількість кнопок — для факту в BookHero.',
    'export const exercisesCount = sections',
    '  .flatMap((s) => s.paragraphs.flatMap((p) => p.topics.flatMap((t) => t.numbers)))',
    '  .length;',
    '',
]
open(OUT, 'w', encoding='utf-8').write('\n'.join(L))
print('wrote', OUT)
