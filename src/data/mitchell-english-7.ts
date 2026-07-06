// Дані книги «Англійська мова (7-й рік навчання) — Full Blast Plus» —
// Г. К. Мітчелл, Марілені Малкогіанні (НУШ, Видавництво «Лінгвіст» / mm publications, Київ, 2024).
// Розв'язки оцифровані ПОСТОРІНКОВО: кнопка = номер сторінки підручника.
// Групування — за модулями зі ЗМІСТ (діапазони сторінок). Числа — реальні файли
// public/images/7-klas/gdz-english-mitchell/<N>.webp (сверено: 0 missing / 0 extra / 0 dup).

export const meta = {
  author: 'Г. Мітчелл, М. Малкогіанні',
  publisher: 'Лінгвіст',
  city: 'Київ',
  year: 2024,
  program: 'НУШ',
  grif: 'Рекомендовано Міністерством освіти і науки України',
  // Дата останньої зміни КОНТЕНТУ (додав/виправив картинки-розв'язки), не верстки.
  updatedAt: '2026-07-06',
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

export const sections: Section[] = [
  {
    rozdil: 'Module 1. About Me',
    paragraphs: [
      {
        title: '',
        topics: [{ title: 'Сторінки 6–16', numbers: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] }],
      },
    ],
  },
  {
    rozdil: 'Module 2. Communication and Technology',
    paragraphs: [
      {
        title: '',
        topics: [{ title: 'Сторінки 18–26', numbers: [18, 19, 20, 21, 22, 23, 24, 25, 26] }],
      },
    ],
  },
  {
    rozdil: 'Module 3. Family Holidays',
    paragraphs: [
      {
        title: '',
        topics: [{ title: 'Сторінки 30–40', numbers: [30, 31, 33, 34, 35, 36, 37, 38, 40] }],
      },
    ],
  },
  {
    rozdil: 'Module 4. Entertainment',
    paragraphs: [
      {
        title: '',
        topics: [{ title: 'Сторінки 42–52', numbers: [42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52] }],
      },
    ],
  },
  {
    rozdil: 'Module 5. Eating Habits',
    paragraphs: [
      {
        title: '',
        topics: [{ title: 'Сторінки 54–63', numbers: [54, 55, 56, 57, 58, 59, 60, 61, 62, 63] }],
      },
    ],
  },
  {
    rozdil: 'Module 6. Natural Disasters',
    paragraphs: [
      {
        title: '',
        topics: [{ title: 'Сторінки 66–76', numbers: [66, 67, 68, 69, 70, 71, 72, 74, 76] }],
      },
    ],
  },
  {
    rozdil: 'Module 7. Feeling Good',
    paragraphs: [
      {
        title: '',
        topics: [{ title: 'Сторінки 78–88', numbers: [78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88] }],
      },
    ],
  },
  {
    rozdil: 'Module 8. Sports',
    paragraphs: [
      {
        title: '',
        topics: [{ title: 'Сторінки 90–98', numbers: [90, 91, 92, 93, 94, 95, 96, 97, 98] }],
      },
    ],
  },
  {
    rozdil: 'Round Up та додаткові розділи',
    paragraphs: [
      {
        title: '',
        topics: [
          {
            title: 'Сторінки 101–125',
            numbers: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 119, 121, 122, 123, 124, 125],
          },
        ],
      },
    ],
  },
];

// Кількість оцифрованих сторінок (для факту в BookHero).
export const exercisesCount = sections
  .flatMap((s) => s.paragraphs.flatMap((p) => p.topics.flatMap((t) => t.numbers)))
  .length;
