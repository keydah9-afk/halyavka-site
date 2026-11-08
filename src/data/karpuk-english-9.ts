// Дані книги «Англійська мова (9-й рік навчання) — English (Year 9)» — К. Т. Карпюк, О. Д. Карпюк (НУШ, Астон, Тернопіль, 2026).
// Розв'язки ПОСТОРІНКОВІ: кнопка = номер сторінки підручника. Юніти — зміст.html.
// Згенеровано scripts/gdz/gen_karpuk_english.py 9. Сверено: 0 missing / 0 extra / 0 dup vs 162 файлів.

export const meta = {
  author: 'К. Карпюк, О. Карпюк',
  publisher: 'Астон',
  city: 'Тернопіль',
  year: 2026,
  program: 'НУШ',
  grif: 'Рекомендовано Міністерством освіти і науки України (наказ МОН від 27.01.2026 № 110)',
  updatedAt: '2026-11-08',
};

export interface Topic {
  title: string;
  numbers: number[];
}
export interface Paragraph {
  title: string;
  topics: Topic[];
}
export interface Section {
  rozdil: string;
  paragraphs: Paragraph[];
}

const range = (from: number, to: number): number[] =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);

export const sections: Section[] = [
  {
    rozdil: 'Unit 1. All About Me',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 8–26', numbers: [8, ...range(10, 26)] }] }],
  },
  {
    rozdil: 'Unit 2. Fashion All the Way',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 28–44', numbers: [...range(28, 44)] }] }],
  },
  {
    rozdil: 'Unit 3. We Are Young and Cool!',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 46–66', numbers: [...range(46, 66)] }] }],
  },
  {
    rozdil: 'Unit 4. Media in Our Lives',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 68–88', numbers: [...range(68, 88)] }] }],
  },
  {
    rozdil: 'Unit 5. Jobs Around Us',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 90–110', numbers: [...range(90, 110)] }] }],
  },
  {
    rozdil: 'Unit 6. Science Meets Technology',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 112–132', numbers: [...range(112, 132)] }] }],
  },
  {
    rozdil: 'Unit 7. Think Green, Live Green',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 134–154', numbers: [...range(134, 154)] }] }],
  },
  {
    rozdil: 'Unit 8. From Ukraine to the UK and Beyond',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 156–178', numbers: [...range(156, 176), 178] }] }],
  },
];

// Кількість оцифрованих сторінок (для факту в BookHero).
export const exercisesCount = sections
  .flatMap((s) => s.paragraphs.flatMap((p) => p.topics.flatMap((t) => t.numbers)))
  .length;
