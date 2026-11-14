# -*- coding: utf-8 -*-
# «Математика: алгебра і початки аналізу та геометрія» 10 клас, рівень стандарту — Мерзляк та ін.
# (Гімназія, 2018). Нумерація пункт.номер (1.1 … 43.N), 43 пункти.
# Пункти й номери вправ — зміст.html у папці книги (<h2>N. Назва (§ K)</h2> + посилання vpr-N-M).
# Розділи й назви § — друкований ЗМІСТ (с. 254–255): у зміст.html їх немає.
# Файли: vpr-N-M.webp → N.M.webp (тоді пошук «1.10» і deep-link #1.10 працюють як у Істера).
# Запуск: python3 scripts/gdz/gen_merzlyak_mat10.py
import re, html, os

ROOT = "/Users/grisana/Developer/halyavka-CLODE"
ZM = "/Users/grisana/Developer/save my images/файлы/математика 10 Мерзляк/зміст.html"
IMGDIR = f"{ROOT}/public/images/10-klas/gdz-matematyka-merzlyak"
OUT = f"{ROOT}/src/data/merzlyak-matematyka-10.ts"

ROZDILY = [
    ('Розділ 1. Алгебра і початки аналізу', [1, 2, 3]),
    ('Розділ 2. Стереометрія', [4, 5, 6]),
]
PAR = {
    1: '§ 1. Функції, їхні властивості та графіки',
    2: '§ 2. Тригонометричні функції',
    3: '§ 3. Похідна та її застосування',
    4: '§ 4. Паралельність у просторі',
    5: '§ 5. Перпендикулярність у просторі',
    6: '§ 6. Координати та вектори в просторі',
}
# Пункти «Вправи для повторення» не належать жодному § — стоять у кінці свого розділу.
POVT = {26: 1, 43: 2}  # пункт → номер розділу


def text(s):
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', s))).strip()


zm = open(ZM, encoding='utf-8').read().split('<body', 1)[1]
punkty = []  # [(n, назва, par|None, [id])]
for m in re.finditer(r'<h2[^>]*>(.*?)</h2>|<a [^>]*href="[^"]*vpr-(\d+)-(\d+)\.(?:html|webp)"[^>]*>([^<]*)<', zm, re.S):
    if m.group(1) is not None:
        t = text(m.group(1))
        h = re.fullmatch(r'(\d+)\. (.*?)(?: \(§ (\d+)\))?', t)
        assert h, t
        punkty.append((int(h.group(1)), h.group(2), int(h.group(3)) if h.group(3) else None, []))
    else:
        p, n, lbl = int(m.group(2)), int(m.group(3)), m.group(4).strip()
        assert punkty[-1][0] == p and lbl == f'{p}.{n}', (p, n, lbl)
        punkty[-1][3].append(f'{p}.{n}')

assert [p[0] for p in punkty] == list(range(1, 44)), 'пункти не 1..43'
for n, _, par, _ in punkty:
    assert (par is None) == (n in POVT), n

flat = [i for p in punkty for i in p[3]]
real = {f[:-5] for f in os.listdir(IMGDIR) if f.endswith('.webp')}
print(f'кнопок: {len(flat)} | файлів: {len(real)}')
print('missingButtons:', sorted(real - set(flat)))
print('extraButtons  :', sorted(set(flat) - real))
print('dups:', len(flat) - len(set(flat)))
assert real == set(flat) and len(flat) == len(set(flat)), 'звірка не зійшлась'


def js(s):
    return "'" + s.replace('\\', '\\\\').replace("'", "\\'") + "'"


def nums(ids):
    return ', '.join(js(i) for i in ids)


L = [
    "// Дані книги «Математика: алгебра і початки аналізу та геометрія» 10 клас, рівень стандарту —",
    "// А. Г. Мерзляк, Д. А. Номіровський, В. Б. Полонський, М. С. Якір (Гімназія, Харків, 2018).",
    "// Нумерація пункт.номер; файл = номер (1.10.webp). Пункти — зміст.html, § і розділи — друкований ЗМІСТ.",
    f"// Згенеровано scripts/gdz/gen_merzlyak_mat10.py. Сверено: 0 missing / 0 extra / 0 dup vs {len(real)} файлів.",
    '',
    'export const meta = {',
    "  author: 'А. Г. Мерзляк, Д. А. Номіровський, В. Б. Полонський, М. С. Якір',",
    "  publisher: 'Гімназія',",
    "  city: 'Харків',",
    '  year: 2018,',
    "  program: 'Рівень стандарту',",
    "  grif: 'Рекомендовано Міністерством освіти і науки України (наказ МОН від 31.05.2018 № 551)',",
    "  updatedAt: '2026-11-14',",
    '};',
    '',
    'export interface Topic {',
    '  title: string;',
    '  numbers: string[];',
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
    'export const sections: Section[] = [',
]
for ri, (rozdil, pars) in enumerate(ROZDILY, 1):
    L += ['  {', f'    rozdil: {js(rozdil)},', '    paragraphs: [']
    groups = [(PAR[k], [p for p in punkty if p[2] == k]) for k in pars]
    groups += [('Повторення', [p for p in punkty if POVT.get(p[0]) == ri])]
    for title, ps in groups:
        L.append(f'      {{ title: {js(title)}, topics: [')
        for n, name, _, ids in ps:
            L.append(f'        {{ title: {js(f"{n}. {name}")}, numbers: [{nums(ids)}] }},')
        L.append('      ] },')
    L += ['    ],', '  },']
L += [
    '];',
    '',
    'export const exercisesCount = sections',
    '  .flatMap((s) => s.paragraphs.flatMap((p) => p.topics.flatMap((t) => t.numbers)))',
    '  .length;',
    '',
]
open(OUT, 'w', encoding='utf-8').write('\n'.join(L))
print('wrote', OUT)
