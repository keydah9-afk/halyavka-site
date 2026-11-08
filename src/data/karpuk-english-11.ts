// Дані книги «Англійська мова (11-й рік навчання) — English (the 11th year of studies)» — О. Д. Карпюк (рівень стандарту, Астон, Тернопіль, 2019).
// Розв'язки ПОСТОРІНКОВІ: кнопка = номер сторінки підручника. Юніти — зміст.html.
// Згенеровано scripts/gdz/gen_karpuk_english.py 11. Сверено: 0 missing / 0 extra / 0 dup vs 194 файлів.

export const meta = {
  author: 'О. Карпюк',
  publisher: 'Астон',
  city: 'Тернопіль',
  year: 2019,
  program: 'Рівень стандарту',
  grif: 'Рекомендовано Міністерством освіти і науки України (наказ МОН від 12.04.2019 № 472)',
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
    rozdil: 'STARTER',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 6–16', numbers: [6, 7, 9, 11, ...range(13, 16)] }] }],
  },
  {
    rozdil: 'Unit 1. Being a Student',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 18–38', numbers: [18, ...range(21, 30), ...range(32, 34), ...range(36, 38)] }] }],
  },
  {
    rozdil: 'Unit 2. Make Up Your Mind',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 42–69', numbers: [42, ...range(45, 49), 51, 52, ...range(54, 60), ...range(62, 69)] }] }],
  },
  {
    rozdil: 'Unit 3. Family Relationship',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 72–93', numbers: [72, 73, ...range(75, 93)] }] }],
  },
  {
    rozdil: 'Unit 4. Eating Out',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 96–117', numbers: [96, ...range(98, 100), ...range(102, 109), ...range(111, 117)] }] }],
  },
  {
    rozdil: 'Unit 5. Inventions and Lifestyles',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 120–141', numbers: [...range(120, 122), 124, 125, ...range(127, 141)] }] }],
  },
  {
    rozdil: 'Unit 6. Nature and the Environment',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 146–169', numbers: [146, ...range(149, 151), ...range(153, 158), ...range(160, 169)] }] }],
  },
  {
    rozdil: 'Unit 7. Speaking about Art',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 172–201', numbers: [172, ...range(175, 187), ...range(189, 196), ...range(198, 201)] }] }],
  },
  {
    rozdil: 'Unit 8. Youth in Mind',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 204–225', numbers: [204, ...range(206, 225)] }] }],
  },
  {
    rozdil: 'Unit 9. People and Society',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 228–248', numbers: [...range(228, 244), 247, 248] }] }],
  },
];

// Кількість оцифрованих сторінок (для факту в BookHero).
export const exercisesCount = sections
  .flatMap((s) => s.paragraphs.flatMap((p) => p.topics.flatMap((t) => t.numbers)))
  .length;
