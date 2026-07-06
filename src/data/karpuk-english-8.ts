// Дані книги «Англійська мова (8-й рік навчання) — English (Year 8)» —
// О. Д. Карпюк, К. Т. Карпюк (НУШ, Видавництво «Астон», Тернопіль, 2025).
// Розв'язки оцифровані ПОСТОРІНКОВО: кнопка = номер сторінки підручника.
// Групування — за юнітами зі ЗМІСТ (діапазони сторінок). Числа — реальні файли
// public/images/8-klas/gdz-english-karpuk/<N>.webp (сверено: 0 missing / 0 extra / 0 dup).

export const meta = {
  author: 'О. Карпюк, К. Карпюк',
  publisher: 'Астон',
  city: 'Тернопіль',
  year: 2025,
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
    rozdil: 'STARTER',
    paragraphs: [
      {
        title: '',
        topics: [{ title: 'Сторінки 6–8', numbers: [6, 7, 8] }],
      },
    ],
  },
  {
    rozdil: 'UNIT 1. Welcome to School',
    paragraphs: [
      {
        title: '',
        topics: [
          {
            title: 'Сторінки 10–29',
            numbers: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
          },
        ],
      },
    ],
  },
  {
    rozdil: 'UNIT 2. Friends Forever',
    paragraphs: [
      {
        title: '',
        topics: [{ title: 'Сторінки 32–47', numbers: [32, 34, 35, 36, 38, 39, 41, 42, 43, 44, 45, 46, 47] }],
      },
    ],
  },
  {
    rozdil: 'UNIT 3. Do We Need the Mass Media?',
    paragraphs: [
      {
        title: '',
        topics: [{ title: 'Сторінки 52–66', numbers: [52, 53, 54, 55, 57, 58, 60, 61, 63, 64, 66] }],
      },
    ],
  },
  {
    rozdil: 'UNIT 4. Music Is Everywhere!',
    paragraphs: [
      {
        title: '',
        topics: [{ title: 'Сторінки 70–85', numbers: [70, 71, 72, 73, 74, 76, 77, 78, 79, 80, 82, 83, 84, 85] }],
      },
    ],
  },
  {
    rozdil: 'UNIT 5. Do You Need a Book?',
    paragraphs: [
      {
        title: '',
        topics: [{ title: 'Сторінки 89–102', numbers: [89, 91, 92, 93, 94, 95, 96, 97, 99, 100, 101, 102] }],
      },
    ],
  },
  {
    rozdil: 'UNIT 6. Different Choices, Different Lives',
    paragraphs: [
      {
        title: '',
        topics: [{ title: 'Сторінки 108–122', numbers: [108, 109, 110, 111, 112, 113, 114, 115, 117, 119, 120, 121, 122] }],
      },
    ],
  },
  {
    rozdil: 'UNIT 7. Ukraine Profile',
    paragraphs: [
      {
        title: '',
        topics: [
          { title: 'Сторінки 126–142', numbers: [126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 140, 141, 142] },
        ],
      },
    ],
  },
  {
    rozdil: 'UNIT 8. Discover English-Speaking Countries!',
    paragraphs: [
      {
        title: '',
        topics: [
          { title: 'Сторінки 146–163', numbers: [146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 157, 159, 160, 161, 162, 163] },
        ],
      },
    ],
  },
];

// Кількість оцифрованих сторінок (для факту в BookHero).
export const exercisesCount = sections
  .flatMap((s) => s.paragraphs.flatMap((p) => p.topics.flatMap((t) => t.numbers)))
  .length;
