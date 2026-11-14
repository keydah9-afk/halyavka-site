// Дані книги «Англійська мова (10-й рік навчання) — English (the 10th year of studies)» — О. Д. Карпюк (рівень стандарту, Астон, Тернопіль, 2018).
// Розв'язки ПОСТОРІНКОВІ: кнопка = номер сторінки підручника. Юніти — зміст.html.
// Згенеровано scripts/gdz/gen_karpuk_english.py 10. Сверено: 0 missing / 0 extra / 0 dup vs 217 файлів.

export const meta = {
  author: 'О. Карпюк',
  publisher: 'Астон',
  city: 'Тернопіль',
  year: 2018,
  program: 'Рівень стандарту',
  grif: 'Рекомендовано Міністерством освіти і науки України (наказ МОН від 31.05.2018 № 551)',
  updatedAt: '2026-11-14',
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
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 7–15', numbers: [...range(7, 10), ...range(12, 15)] }] }],
  },
  {
    rozdil: 'Unit 1. People and Relationships',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 17–37', numbers: [...range(17, 37)] }] }],
  },
  {
    rozdil: 'Unit 2. Choose the Career!',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 39–61', numbers: [39, 40, ...range(42, 52), ...range(54, 61)] }] }],
  },
  {
    rozdil: 'Unit 3. Why Go to School?',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 63–85', numbers: [...range(63, 78), ...range(80, 85)] }] }],
  },
  {
    rozdil: 'Unit 4. National Cuisine',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 87–110', numbers: [...range(87, 106), ...range(108, 110)] }] }],
  },
  {
    rozdil: 'Unit 5. Communication Technologies',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 111–137', numbers: [111, 112, ...range(115, 137)] }] }],
  },
  {
    rozdil: 'Unit 6. Is the Earth in Danger?',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 139–163', numbers: [139, 140, ...range(142, 144), ...range(146, 158), ...range(160, 163)] }] }],
  },
  {
    rozdil: 'Unit 7. The World of Painting',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 165–195', numbers: [165, 166, ...range(169, 176), ...range(178, 180), ...range(182, 185), 187, 188, 190, 191, ...range(193, 195)] }] }],
  },
  {
    rozdil: 'Unit 8. Do You Like Sports?',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 197–221', numbers: [197, 198, ...range(200, 221)] }] }],
  },
  {
    rozdil: 'Unit 9. Across State Systems',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 223–253', numbers: [223, 224, ...range(227, 229), ...range(231, 249), ...range(251, 253)] }] }],
  },
];

// Кількість оцифрованих сторінок (для факту в BookHero).
export const exercisesCount = sections
  .flatMap((s) => s.paragraphs.flatMap((p) => p.topics.flatMap((t) => t.numbers)))
  .length;
