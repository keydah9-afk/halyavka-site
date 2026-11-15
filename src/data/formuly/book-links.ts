// Які теми розділу «Формули» відповідають параграфам підручника.
// Використовує компонент FormulaHint на сторінці книги ГДЗ: під переглядачем
// з'являється посилання на формули саме до того §, з якого відкрита вправа.
//
// Додати книгу: дописати сюди діапазони § → slug теми і поставити на сторінці книги
// <FormulaHint book="…" gallery="…" /> одразу після <ExerciseGallery>.
// НЕ ставити на заморожені хаби пілоту посилань і тесту crawlLinks (список — ADS_EXCLUDED
// у src/utils/ads.ts), доки експерименти не закриті.

export interface ParagraphRange {
  /** Перший і останній номер § (включно). */
  from: number;
  to: number;
  /** slug теми з src/data/formuly. */
  slug: string;
}

export const bookFormulas = {
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
} satisfies Record<string, ParagraphRange[]>;

export type BookKey = keyof typeof bookFormulas;
