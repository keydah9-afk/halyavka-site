# -*- coding: utf-8 -*-
# «Англійська мова» Карпюк — ПОСТОРІНКОВІ книги (кнопка = сторінка підручника), як 8 клас
# (src/data/karpuk-english-8.ts). Структура — зміст.html у папці книги: <h2>Unit N. Назва (с. A–B)</h2>
# і посилання на сторінки (page-N.webp або готово/page-N.html). Файли на сайті: page-N.webp → N.webp.
# Запуск: python3 scripts/gdz/gen_karpuk_english.py 9   (або 11)
import re, html, os, sys

ROOT = "/Users/grisana/Developer/halyavka-CLODE"
SRC = "/Users/grisana/Developer/save my images/файлы"

BOOKS = {
    '9': dict(
        zm=f"{SRC}/англ мова 9 Карпюк/зміст.html",
        out='karpuk-english-9.ts',
        title='«Англійська мова (9-й рік навчання) — English (Year 9)» — К. Т. Карпюк, О. Д. Карпюк (НУШ, Астон, Тернопіль, 2026)',
        meta=dict(author='К. Карпюк, О. Карпюк', year=2026, program='НУШ',
                  grif='Рекомендовано Міністерством освіти і науки України (наказ МОН від 27.01.2026 № 110)'),
    ),
    '11': dict(
        zm=f"{SRC}/англ мова 11 Карпюк/зміст.html",
        out='karpuk-english-11.ts',
        title='«Англійська мова (11-й рік навчання) — English (the 11th year of studies)» — О. Д. Карпюк (рівень стандарту, Астон, Тернопіль, 2019)',
        meta=dict(author='О. Карпюк', year=2019, program='Рівень стандарту',
                  grif='Рекомендовано Міністерством освіти і науки України (наказ МОН від 12.04.2019 № 472)'),
    ),
}

klas = sys.argv[1]
B = BOOKS[klas]
IMGDIR = f"{ROOT}/public/images/{klas}-klas/gdz-english-karpuk"
OUT = f"{ROOT}/src/data/{B['out']}"


def text(s):
    return html.unescape(re.sub(r'<[^>]+>', '', s)).strip()


zm = open(B['zm'], encoding='utf-8').read().split('<body', 1)[1]
units = []  # [(назва, [сторінки])]
for m in re.finditer(r'<h2[^>]*>(.*?)</h2>|<a [^>]*href="[^"]*page-(\d+)\.(?:webp|html)"', zm, re.S):
    if m.group(1) is not None:
        name = re.sub(r'\s*\(с\.\s*[\d–-]+\)$', '', text(m.group(1)))
        units.append((name, []))
    else:
        units[-1][1].append(int(m.group(2)))

flat = [p for _, ps in units for p in ps]
assert flat == sorted(flat), 'сторінки не по порядку'
real = {int(f[:-5]) for f in os.listdir(IMGDIR) if re.fullmatch(r'\d+\.webp', f)}
other = [f for f in os.listdir(IMGDIR) if not re.fullmatch(r'\d+\.webp', f)]
print(f'{klas} клас | кнопок: {len(flat)} | файлів: {len(real)} | сторонніх файлів: {other}')
print('missingButtons:', sorted(real - set(flat)))
print('extraButtons  :', sorted(set(flat) - real))
print('dups:', len(flat) - len(set(flat)))
assert real == set(flat) and len(flat) == len(set(flat)) and not other, 'звірка не зійшлась'


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


M = B['meta']
L = [
    f"// Дані книги {B['title']}.",
    "// Розв'язки ПОСТОРІНКОВІ: кнопка = номер сторінки підручника. Юніти — зміст.html.",
    f'// Згенеровано scripts/gdz/gen_karpuk_english.py {klas}. Сверено: 0 missing / 0 extra / 0 dup vs {len(real)} файлів.',
    '',
    'export const meta = {',
    f"  author: {js(M['author'])},",
    "  publisher: 'Астон',",
    "  city: 'Тернопіль',",
    f"  year: {M['year']},",
    f"  program: {js(M['program'])},",
    f"  grif: {js(M['grif'])},",
    "  updatedAt: '2026-11-08',",
    '};',
    '',
    'export interface Topic {',
    '  title: string;',
    '  numbers: number[];',
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
for name, ps in units:
    t = f'Сторінки {ps[0]}–{ps[-1]}' if len(ps) > 1 else f'Сторінка {ps[0]}'
    L += ['  {', f'    rozdil: {js(name.upper() if name.lower() == "starter" else name)},',
          f"    paragraphs: [{{ title: '', topics: [{{ title: {js(t)}, numbers: [{compress(ps)}] }}] }}],", '  },']
L += [
    '];',
    '',
    '// Кількість оцифрованих сторінок (для факту в BookHero).',
    'export const exercisesCount = sections',
    '  .flatMap((s) => s.paragraphs.flatMap((p) => p.topics.flatMap((t) => t.numbers)))',
    '  .length;',
    '',
]
open(OUT, 'w', encoding='utf-8').write('\n'.join(L))
print('wrote', OUT)
