# -*- coding: utf-8 -*-
# «Фізика» 11 клас, рівень стандарту — Бар'яхтар, Довгий, Божинова, Кірюхіна (Ранок, Харків, 2019).
# Структура — зміст.html у папці книги: <h2> розділ, <h3> частина (лише в розділі I), <h4> § / «Експериментальні
# роботи» / «Завдання для самоперевірки…», посилання на готово/<id>.html.
# Файли й кнопки:
#   vN-M  → N.M.webp, кнопка «N.M» (вправа № N, задача M) — пошук «3.1» і deep-link #3.1 працюють;
#   kz-N  → kz-N.webp, кнопка «Пит.» (контрольні запитання до § N);
#   ez-N  → ez-N.webp, кнопка «Експ.» (експериментальне завдання § N);
#   er-N  → er-N.webp, кнопка «№ N» (експериментальна робота);
#   spK-M → spK-M.webp, кнопка «№ M» (самоперевірка K-го блоку).
# Підписи короткі навмисно: кнопка ~46 px, довше слово вилазить за рамку, а загальний CSS галереї
# чіпати не можна (заморожені хаби). Картинки самі підписані («§ 3. Контрольні запитання»).
# Запуск: python3 scripts/gdz/gen_baryahtar_fiz11.py
import re, html, os

ROOT = "/Users/grisana/Developer/halyavka-CLODE"
ZM = "/Users/grisana/Developer/save my images/файлы/фізика 11 клас Бар'яхтар/зміст.html"
IMGDIR = f"{ROOT}/public/images/11-klas/gdz-fizyka-baryahtar"
OUT = f"{ROOT}/src/data/baryahtar-fizyka-11.ts"


def text(s):
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', s))).strip()


zm = open(ZM, encoding='utf-8').read().split('<body', 1)[1]
sections = []  # [{rozdil, paragraphs:[{title, topics:[{title, items:[(file,label)]}]}]}]
for m in re.finditer(r'<(h[234])[^>]*>(.*?)</\1>|<a [^>]*href="[^"]*?([a-z]+\d*-\d+)\.(?:html|webp)"[^>]*>(.*?)</a>', zm, re.S):
    if m.group(1):
        lvl, t = m.group(1), text(m.group(2))
        if lvl == 'h2':
            sections.append(dict(rozdil=t, paragraphs=[dict(title='', topics=[])]))
        elif lvl == 'h3':
            ps = sections[-1]['paragraphs']
            if not ps[-1]['topics'] and not ps[-1]['title']:
                ps.pop()
            ps.append(dict(title=t, topics=[]))
        else:
            sections[-1]['paragraphs'][-1]['topics'].append(dict(title=t, items=[]))
        continue
    fid, lbl = m.group(3), text(m.group(4))
    topic = sections[-1]['paragraphs'][-1]['topics'][-1]
    if (v := re.fullmatch(r'v(\d+)-(\d+)', fid)):
        assert lbl == v.group(2) and topic['title'].startswith(f'§ {v.group(1)}.'), (fid, lbl, topic['title'])
        topic['items'].append((f'{v.group(1)}.{v.group(2)}', None))
    elif (k := re.fullmatch(r'(kz|ez)-(\d+)', fid)):
        assert topic['title'].startswith(f'§ {k.group(2)}.'), (fid, topic['title'])
        topic['items'].append((fid, 'Пит.' if k.group(1) == 'kz' else 'Експ.'))
    elif (e := re.fullmatch(r'er-(\d+)', fid)):
        assert lbl == f'Робота № {e.group(1)}' and topic['title'] == 'Експериментальні роботи', (fid, lbl)
        topic['items'].append((fid, f'№ {e.group(1)}'))
    elif (s := re.fullmatch(r'sp(\d+)-(\d+)', fid)):
        assert lbl == s.group(2) and topic['title'].startswith('Завдання для самоперевірки'), (fid, lbl)
        topic['items'].append((fid, f'№ {s.group(2)}'))
    else:
        raise SystemExit(f'невідомий id {fid}')

flat = [f for s in sections for p in s['paragraphs'] for t in p['topics'] for f, _ in t['items']]
empty = [t['title'] for s in sections for p in s['paragraphs'] for t in p['topics'] if not t['items']]
assert not empty, f'теми без кнопок: {empty}'
real = {f[:-5] for f in os.listdir(IMGDIR) if f.endswith('.webp')}
print(f'кнопок: {len(flat)} | файлів: {len(real)}')
print('missingButtons:', sorted(real - set(flat)))
print('extraButtons  :', sorted(set(flat) - real))
print('dups:', len(flat) - len(set(flat)))
assert real == set(flat) and len(flat) == len(set(flat)), 'звірка не зійшлась'


def js(s):
    return "'" + s.replace('\\', '\\\\').replace("'", "\\'") + "'"


def item(f, lbl):
    return js(f) if lbl is None else f'{{ file: {js(f)}, label: {js(lbl)} }}'


L = [
    "// Дані книги «Фізика» 11 клас, рівень стандарту — В. Г. Бар'яхтар, С. О. Довгий, Ф. Я. Божинова,",
    "// О. О. Кірюхіна (Ранок, Харків, 2019). Вправа № N, задача M → кнопка й файл «N.M»;",
    "// контрольні запитання, експериментальні завдання/роботи й самоперевірка — { file, label }.",
    f"// Згенеровано scripts/gdz/gen_baryahtar_fiz11.py. Сверено: 0 missing / 0 extra / 0 dup vs {len(real)} файлів.",
    '',
    'export const meta = {',
    "  author: 'В. Бар’яхтар, С. Довгий, Ф. Божинова, О. Кірюхіна',",
    "  publisher: 'Ранок',",
    "  city: 'Харків',",
    '  year: 2019,',
    "  program: 'Рівень стандарту',",
    "  grif: 'Рекомендовано Міністерством освіти і науки України (наказ МОН від 12.04.2019 № 472)',",
    "  updatedAt: '2026-11-14',",
    '};',
    '',
    'export type ExItem = string | { file: string; label: string };',
    'export interface Topic {',
    '  title: string;',
    '  numbers: ExItem[];',
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
for s in sections:
    L += ['  {', f"    rozdil: {js(s['rozdil'])},", '    paragraphs: [']
    for p in s['paragraphs']:
        L.append(f"      {{ title: {js(p['title'])}, topics: [")
        for t in p['topics']:
            L.append(f"        {{ title: {js(t['title'])}, numbers: [{', '.join(item(*i) for i in t['items'])}] }},")
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
