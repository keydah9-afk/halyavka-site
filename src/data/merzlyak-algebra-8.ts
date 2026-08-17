// Дані книги «Алгебра, 8 клас» — А. Г. Мерзляк, В. Б. Полонський, М. С. Якір (НУШ, «Гімназія», Харків, 2025).
// Наскрізні вправи 1..908 (без дір), розкладені по пунктах якорями (перша вправа пункту).
// Структура (§ 1–3 = розділи, 1–23 = пункти) і назви — з друкованого ЗМІСТ (с. 270–271).
// Усі якорі звірені за самим підручником (OCR номерів вправ по сторінках): межа п.13/14 виправлена
// з 437 на 440, якорі п.21–23 і «Вправ для повторення» — 736 / 761 / 788 / 816. Завдання «Перевірте себе» мають власну
// нумерацію 1–12 і не оцифровані.
// Сверено з файлами public/images/8-klas/gdz-algebra-merzlyak: 0 missing / 0 extra / 0 dup.

export const meta = {
  author: 'А. Г. Мерзляк, В. Б. Полонський, М. С. Якір',
  publisher: 'Гімназія',
  city: 'Харків',
  year: 2025,
  program: 'НУШ',
  grif: 'Рекомендовано Міністерством освіти і науки України',
  updatedAt: '2026-08-15',
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
    rozdil: '§ 1. Раціональні вирази',
    paragraphs: [
      {
        title: '',
        topics: [
          { title: '1. Раціональні дроби', numbers: range(1, 25) },
          { title: '2. Основна властивість раціонального дробу', numbers: range(26, 62) },
          {
            title: '3. Додавання і віднімання раціональних дробів з однаковими знаменниками',
            numbers: range(63, 90),
          },
          {
            title: '4. Додавання і віднімання раціональних дробів з різними знаменниками',
            numbers: range(91, 134),
          },
          {
            title: '5. Множення і ділення раціональних дробів. Піднесення раціонального дробу до степеня',
            numbers: range(135, 164),
          },
          { title: '6. Тотожні перетворення раціональних виразів', numbers: range(165, 191) },
          { title: '7. Рівносильні рівняння. Раціональні рівняння', numbers: range(192, 219) },
          { title: '8. Степінь із цілим від’ємним показником', numbers: range(220, 264) },
          { title: '9. Властивості степеня із цілим показником', numbers: range(265, 304) },
          { title: '10. Функція y = k/x та її графік', numbers: range(305, 342) },
        ],
      },
    ],
  },
  {
    rozdil: '§ 2. Квадратні корені. Дійсні числа',
    paragraphs: [
      {
        title: '',
        topics: [
          { title: '11. Функція y = x² та її графік', numbers: range(343, 369) },
          { title: '12. Квадратні корені. Арифметичний квадратний корінь', numbers: range(370, 415) },
          { title: '13. Множина та її елементи. Підмножина', numbers: range(416, 439) },
          { title: '14. Числові множини', numbers: range(440, 468) },
          { title: '15. Властивості арифметичного квадратного кореня', numbers: range(469, 498) },
          {
            title: '16. Тотожні перетворення виразів, які містять квадратні корені',
            numbers: range(499, 556),
          },
          { title: '17. Функція y = √x та її графік', numbers: range(557, 595) },
        ],
      },
    ],
  },
  {
    rozdil: '§ 3. Квадратні рівняння',
    paragraphs: [
      {
        title: '',
        topics: [
          {
            title: '18. Квадратні рівняння. Розв’язування неповних квадратних рівнянь',
            numbers: range(596, 637),
          },
          { title: '19. Формула коренів квадратного рівняння', numbers: range(638, 688) },
          { title: '20. Теорема Вієта', numbers: range(689, 735) },
          { title: '21. Квадратний тричлен', numbers: range(736, 760) },
          {
            title: '22. Розв’язування рівнянь, які зводяться до квадратних рівнянь',
            numbers: range(761, 787),
          },
          {
            title: '23. Раціональні рівняння як математичні моделі реальних ситуацій',
            numbers: range(788, 815),
          },
        ],
      },
    ],
  },
  {
    rozdil: 'Вправи для повторення курсу алгебри 8 класу',
    paragraphs: [
      {
        title: '',
        topics: [{ title: 'Вправи 816–908', numbers: range(816, 908) }],
      },
    ],
  },
];

export const exercises: number[] = sections.flatMap((s) =>
  s.paragraphs.flatMap((p) => p.topics.flatMap((t) => t.numbers))
);

export const exercisesCount = exercises.length;
