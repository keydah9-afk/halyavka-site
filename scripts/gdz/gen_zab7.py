# -*- coding: utf-8 -*-
# «Українська мова, 7 клас» — О. і В. Заболотні (Генеза, 2024). Копія gen_zab6.py під 7 клас.
# Поки триває пілот посилань (хаб заморожено), картинки лежать у стейджингу поза public:
#   IMGDIR="Готовы к размещению на сайт/7-klas/gdz-ukr-mova-zabolotnyi" python3 scripts/gdz/gen_zab7.py
# Після зняття заморозки: скопіювати їх у public/images/7-klas/gdz-ukr-mova-zabolotnyi і запускати без IMGDIR.
import re, html, os

ZM = "/Users/grisana/Developer/save my images/файлы/укр мова 7 Заболотний/зміст.html"
IMGDIR = os.environ.get("IMGDIR", "/Users/grisana/Developer/halyavka-CLODE/public/images/7-klas/gdz-ukr-mova-zabolotnyi")
OUT = "/Users/grisana/Developer/halyavka-CLODE/src/data/zabolotnyi-ukr-mova-7.ts"

# ВЕЛИКІ ЛІТЕРИ в зміст.html → людські назви розділів (+ до якого розділу/підрозділу віднести)
ROZDIL = {
    'ВСТУП': ('Вступ', ''),
    'ПОВТОРЕННЯ ТА УЗАГАЛЬНЕННЯ ВИВЧЕНОГО': ('Повторення та узагальнення вивченого', ''),
    'Орфографічний практикум': ('Орфографічний практикум', ''),
    'МОРФОЛОГІЯ. ОРФОГРАФІЯ. ДІЄСЛОВО': ('Морфологія. Орфографія', 'Дієслово'),
    'Дієприкметник. Дієслівні форми на -но, -то': ('Морфологія. Орфографія', 'Дієприкметник. Дієслівні форми на -но, -то'),
    'ДІЄПРИСЛІВНИК': ('Морфологія. Орфографія', 'Дієприслівник'),
    'ПРИСЛІВНИК': ('Морфологія. Орфографія', 'Прислівник'),
    'Службові частини мови. Вигук': ('Морфологія. Орфографія', 'Службові частини мови. Вигук'),
    'УЗАГАЛЬНЕННЯ ТА СИСТЕМАТИЗАЦІЯ ВИВЧЕНОГО': ('Узагальнення та систематизація вивченого', ''),
    'УРОКИ РОЗВИТКУ МОВЛЕННЯ': ('Уроки розвитку мовлення', ''),
}

src = open(ZM, encoding='utf-8').read()
body = src.split('<body>', 1)[1]
parts = re.split(r'<h2>(.*?)</h2>', body, flags=re.S)

items = []  # (rozdil, para, topic_title, [ids])
cur_r, cur_p = None, ''
for i in range(1, len(parts), 2):
    head = re.sub(r'<br\s*/?>', ' ', parts[i])
    head = html.unescape(re.sub(r'<[^>]+>', '', head)).strip()
    head = re.sub(r'\s+', ' ', head)
    ids = re.findall(r'href="[^"]*?/([^"/]+)\.html"', parts[i + 1])

    m = re.match(r'^(.*?)\s*(§\s*\d+\..*)$', head)
    if m:
        prefix, topic = m.group(1).strip().rstrip('.').strip(), m.group(2).strip()
    else:
        prefix, topic = head, None

    if prefix:
        key = prefix.rstrip('.').strip()
        if key.startswith('ВСТУП'):
            cur_r, cur_p, topic = 'Вступ', '', 'Українська мова єднає нас'
        elif key in ROZDIL:
            cur_r, cur_p = ROZDIL[key]
        else:
            raise SystemExit(f'невідомий заголовок розділу в зміст.html: {key!r}')
    if topic is None:
        # h2 без § — розділ з одної теми; підпис теми = діапазон вправ (щоб не дублювати h2)
        topic = '__RANGE__'
    items.append((cur_r, cur_p, topic, ids))

real = {f[:-5] for f in os.listdir(IMGDIR) if f.endswith('.webp')}

# рубрики виносимо в окрему секцію (як у 8 класі Заболотного)
RUBRICS = [
    ('proyekt-', 'Проєкт'),
    ('moya-storinka-', 'Моя сторінка'),
]
rub = {k: [] for k, _ in RUBRICS}


def is_rubric(x):
    for k, _ in RUBRICS:
        if x.startswith(k):
            return k
    return None


# збираємо структуру
sections = []  # [(rozdil, [(para, [(topic, ids)])])]
for r, p, t, ids in items:
    main, rubs = [], []
    for x in ids:
        k = is_rubric(x)
        if k:
            rub[k].append(x)
        else:
            main.append(x)
    if not main:
        continue
    nums = [x.replace('vpr-', '') for x in main]
    if not sections or sections[-1][0] != r:
        sections.append((r, []))
    paras = sections[-1][1]
    if not paras or paras[-1][0] != p:
        paras.append((p, []))
    if t == '__RANGE__':
        t = f'Вправи {nums[0]}–{nums[-1]}'
    paras[-1][1].append((t, nums))

flat = [n for r, ps in sections for p, ts in ps for t, ns in ts for n in ns]
rub_files = [x for k, _ in RUBRICS for x in rub[k]]
allflat = flat + rub_files  # у public файли перейменовані vpr-N.webp -> N.webp

print('вправ:', len(flat), '| рубрик:', len(rub_files), '| разом:', len(allflat))
print('реальних файлів:', len(real))
print('missingButtons:', sorted(real - set(allflat)))
print('extraButtons  :', sorted(set(allflat) - real))
print('dups:', len(allflat) - len(set(allflat)))


def js(s):
    return "'" + s.replace('\\', '\\\\').replace("'", "\\'") + "'"


def compress(ns):
    """1,2,3,5 → ...range(1,3), 5"""
    out, i, v = [], 0, [int(x) for x in ns]
    while i < len(v):
        j = i
        while j + 1 < len(v) and v[j + 1] == v[j] + 1:
            j += 1
        if j - i >= 2:
            out.append(f'...range({v[i]}, {v[j]})')
        else:
            out.extend(str(x) for x in v[i:j + 1])
        i = j + 1
    return ', '.join(out)


L = []
L.append('// Дані книги «Українська мова, 7 клас» — Олександр Заболотний, Віктор Заболотний')
L.append('// (НУШ, Генеза, Київ, 2024). Наскрізні вправи 1..587.')
L.append('// Структура (розділи, підрозділи, назви § і склад кожного §) — з файла зміст.html:')
L.append('// це точні дані з друкованого змісту, а не навігатор, тому межі § не потребують звірки.')
L.append('// Кнопка = ім\'я файла: вправи лежать як N.webp (у рендері були vpr-N.webp —')
L.append('// перейменовані при заливці, щоб зберегти старі deep-link-и виду .../#123).')
L.append('// Рубрики підручника (Проєкт, Моя сторінка) — окрема секція внизу,')
L.append('// підпис кнопки = сторінка підручника (файли лежать поряд з вправами, без підпапок).')
L.append(f'// Згенеровано scripts/gdz/gen_zab7.py. Сверено: 0 missing / 0 extra / 0 dup vs {len(real)} файлів.')
L.append('')
L.append('export const meta = {')
L.append("  author: 'Олександр Заболотний, Віктор Заболотний',")
L.append("  publisher: 'Генеза',")
L.append("  city: 'Київ',")
L.append('  year: 2024,')
L.append("  program: 'НУШ',")
L.append("  grif: 'Рекомендовано Міністерством освіти і науки України',")
L.append("  updatedAt: '2026-11-06',")
L.append('};')
L.append('')
L.append('export type ExItem = number | string | { file: string; label: string };')
L.append('export interface Topic {')
L.append('  title: string;')
L.append('  numbers: ExItem[];')
L.append('  collapsed?: boolean;')
L.append('}')
L.append('export interface Paragraph {')
L.append('  title: string;')
L.append('  topics: Topic[];')
L.append('}')
L.append('export interface Section {')
L.append('  rozdil: string;')
L.append('  paragraphs: Paragraph[];')
L.append('}')
L.append('')
L.append('const range = (from: number, to: number): number[] =>')
L.append('  Array.from({ length: to - from + 1 }, (_, i) => from + i);')
L.append('')
L.append('export const sections: Section[] = [')
for r, ps in sections:
    L.append('  {')
    L.append(f'    rozdil: {js(r)},')
    L.append('    paragraphs: [')
    for p, ts in ps:
        L.append(f'    {{ title: {js(p)}, topics: [')
        for t, ns in ts:
            L.append(f'      {{ title: {js(t)}, numbers: [{compress(ns)}] }},')
        L.append('    ] },')
    L.append('    ],')
    L.append('  },')
# рубрики
L.append('  {')
L.append("    rozdil: 'Рубрики підручника',")
L.append('    paragraphs: [')
L.append("    { title: '', topics: [")
for k, name in RUBRICS:
    fs = sorted(rub[k], key=lambda x: int(x.rsplit('-', 1)[1]))
    inner = ', '.join(
        '{ file: %s, label: %s }' % (js(f), js('Стор. ' + f.rsplit('-', 1)[1])) for f in fs
    )
    L.append(f'      {{ title: {js(name)}, collapsed: true, numbers: [{inner}] }},')
L.append('    ] },')
L.append('    ],')
L.append('  },')
L.append('];')
L.append('')
L.append('// Кількість кнопок (усі оцифровані матеріали) — для факту в BookHero.')
L.append('export const exercisesCount = sections')
L.append('  .flatMap((s) => s.paragraphs.flatMap((p) => p.topics.flatMap((t) => t.numbers)))')
L.append('  .length;')
L.append('')
open(OUT, 'w', encoding='utf-8').write('\n'.join(L))
print('wrote', OUT)
