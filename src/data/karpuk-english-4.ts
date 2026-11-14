// Дані книги «Англійська мова» (з аудіосупроводом) для 4 класу — О. Д. Карпюк (НУШ, Астон, Тернопіль, 2026).
// Розв'язки ПОСТОРІНКОВІ: кнопка = номер сторінки підручника. Юніти — зміст.html.
// Згенеровано scripts/gdz/gen_karpuk_english.py 4. Сверено: 0 missing / 0 extra / 0 dup vs 130 файлів.

export const meta = {
  author: 'О. Карпюк',
  publisher: 'Астон',
  city: 'Тернопіль',
  year: 2026,
  program: 'НУШ',
  grif: 'Рекомендовано Міністерством освіти і науки України (наказ МОН від 20.08.2025 № 1164)',
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
    rozdil: 'Starter. Hello Again!',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 6–11', numbers: [...range(6, 11)] }] }],
  },
  {
    rozdil: 'Unit 1. It\'s My Life',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 12–31', numbers: [...range(12, 31)] }] }],
  },
  {
    rozdil: 'Unit 2. My Homeplace',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 32–51', numbers: [...range(32, 51)] }] }],
  },
  {
    rozdil: 'Unit 3. Let\'s Celebrate!',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 52–69', numbers: [...range(52, 69)] }] }],
  },
  {
    rozdil: 'Unit 4. Health and Body Care',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 70–87', numbers: [...range(70, 87)] }] }],
  },
  {
    rozdil: 'Unit 5. The World of Nature',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 88–105', numbers: [...range(88, 105)] }] }],
  },
  {
    rozdil: 'Unit 6. On the Move',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 106–123', numbers: [...range(106, 123)] }] }],
  },
  {
    rozdil: 'Self-Checks',
    paragraphs: [{ title: '', topics: [{ title: 'Сторінки 124–135', numbers: [...range(124, 135)] }] }],
  },
];

// Кількість оцифрованих сторінок (для факту в BookHero).
export const exercisesCount = sections
  .flatMap((s) => s.paragraphs.flatMap((p) => p.topics.flatMap((t) => t.numbers)))
  .length;
