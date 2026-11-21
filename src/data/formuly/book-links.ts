// Які теми розділу «Формули» відповідають параграфам підручника.
// Використовує компонент FormulaHint на сторінці книги ГДЗ: під переглядачем
// з'являється посилання на формули саме до того §, з якого відкрита вправа.
//
// Додати книгу: дописати сюди діапазони § → slug теми і поставити на сторінці книги
// <FormulaHint book="…" gallery="…" /> одразу після <ExerciseGallery>.
// Пошук § — за заголовком блоку «§ N» у ExerciseGallery: книги без «§» у заголовках не підійдуть.
// Ця ж таблиця, прочитана навпаки, дає посилання з тем формул на хаби (book-hubs.ts):
// нову книгу треба дописати і туди — адресу хаба та її дані.

export interface ParagraphRange {
  /** Перший і останній номер § (включно). */
  from: number;
  to: number;
  /** slug теми з src/data/formuly. */
  slug: string;
}

export const bookFormulas = {
  // Математика 5, Істер (2022) — src/data/ister-5.ts
  'ister-matematyka-5': [
    { from: 1, to: 10, slug: 'diyi-z-naturalnymy-chyslamy' },
    { from: 13, to: 13, slug: 'zadachi-na-rukh' },
    { from: 20, to: 21, slug: 'kuty-i-paralelni-priami' },
    { from: 25, to: 25, slug: 'ploshchi-fihur' },
    { from: 26, to: 32, slug: 'podilnist-nsd-nsk' },
    { from: 33, to: 39, slug: 'zvychaini-droby' },
    { from: 40, to: 47, slug: 'desiatkovi-droby' },
  ],
  // Математика 6, Істер — src/data/ister-matematyka-6.ts
  'ister-matematyka-6': [
    { from: 1, to: 2, slug: 'vidsotky' },
    { from: 3, to: 14, slug: 'zvychaini-droby' },
    { from: 15, to: 20, slug: 'proportsii' },
    { from: 21, to: 22, slug: 'vidsotky' },
    { from: 23, to: 24, slug: 'kolo-i-kruh' },
    { from: 26, to: 40, slug: 'ratsionalni-chysla-modul' },
    { from: 44, to: 45, slug: 'kuty-i-paralelni-priami' },
  ],
  // Алгебра 7, Істер — src/data/ister-algebra-7.ts
  'ister-algebra-7': [
    { from: 1, to: 3, slug: 'liniini-rivniannia-i-systemy' },
    { from: 6, to: 9, slug: 'stepeni' },
    { from: 16, to: 21, slug: 'formuly-skorochenoho-mnozhennia' },
    { from: 22, to: 24, slug: 'funktsii-ta-hrafiky' },
    { from: 25, to: 30, slug: 'liniini-rivniannia-i-systemy' },
  ],
  // Геометрія 7, Істер — src/data/ister-geometry-7.ts
  'ister-geometry-7': [
    { from: 3, to: 10, slug: 'kuty-i-paralelni-priami' },
    { from: 11, to: 18, slug: 'trykutnyky' },
    { from: 19, to: 19, slug: 'priamokutnyi-trykutnyk' },
    { from: 20, to: 20, slug: 'trykutnyky' },
    { from: 21, to: 27, slug: 'kolo-i-kruh' },
  ],
  // Алгебра 8, Істер (2025): §§ за змістом підручника — src/data/ister-algebra-8.ts
  'ister-algebra-8': [
    { from: 1, to: 8, slug: 'ratsionalni-droby' },
    { from: 9, to: 11, slug: 'stepeni' },
    { from: 12, to: 13, slug: 'funktsii-ta-hrafiky' },
    { from: 14, to: 18, slug: 'kvadratni-koreni' },
    { from: 19, to: 19, slug: 'funktsii-ta-hrafiky' },
    { from: 20, to: 26, slug: 'kvadratni-rivniannia' },
  ],
  // Геометрія 8, Істер (2025) — src/data/ister-geometry-8.ts
  'ister-geometry-8': [
    { from: 1, to: 7, slug: 'chotyrykutnyky' },
    { from: 8, to: 9, slug: 'trykutnyky' },
    { from: 10, to: 10, slug: 'chotyrykutnyky' },
    { from: 11, to: 13, slug: 'trykutnyky' },
    { from: 14, to: 14, slug: 'priamokutnyi-trykutnyk' },
    { from: 15, to: 16, slug: 'trykutnyky' },
    { from: 17, to: 20, slug: 'priamokutnyi-trykutnyk' },
    { from: 21, to: 21, slug: 'chotyrykutnyky' },
    { from: 22, to: 25, slug: 'ploshchi-fihur' },
  ],
  // Алгебра 9, Істер — src/data/ister-algebra-9.ts (§ 13–14, системи рівнянь другого степеня, — без теми)
  'ister-algebra-9': [
    { from: 1, to: 7, slug: 'nerivnosti' },
    { from: 8, to: 10, slug: 'funktsii-ta-hrafiky' },
    { from: 11, to: 12, slug: 'kvadratychna-funktsiia' },
    { from: 15, to: 18, slug: 'prohresii' },
    { from: 19, to: 19, slug: 'vidsotky' },
    { from: 20, to: 21, slug: 'prohresii' },
    { from: 22, to: 26, slug: 'kombinatoryka-ymovirnist' },
  ],
  // Геометрія 9, Істер — src/data/ister-geometry-9.ts (§ 18–23, геометричні перетворення, — без теми)
  'ister-geometry-9': [
    { from: 1, to: 1, slug: 'koordynaty-i-vektory' },
    { from: 2, to: 2, slug: 'teorema-synusiv-i-kosynusiv' },
    { from: 3, to: 10, slug: 'koordynaty-i-vektory' },
    { from: 11, to: 13, slug: 'teorema-synusiv-i-kosynusiv' },
    { from: 14, to: 14, slug: 'ploshchi-fihur' },
    { from: 15, to: 15, slug: 'pravylni-mnohokutnyky' },
    { from: 16, to: 17, slug: 'kolo-i-kruh' },
  ],
} satisfies Record<string, ParagraphRange[]>;

export type BookKey = keyof typeof bookFormulas;
