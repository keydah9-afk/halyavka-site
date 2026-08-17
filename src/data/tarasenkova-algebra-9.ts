// Дані книги «Алгебра, 9 клас» — Н. А. Тарасенкова, І. А. Акуленко, О. А. Данько, О. М. Коломієць,
// І. М. Богатирьова, З. О. Сердюк (НУШ, УОВЦ «Оріон», Київ, 2026).
// Наскрізні вправи 1..862 (без дір), розкладені по § якорями (перша вправа §).
// Структура і назви — з друкованого ЗМІСТ (с. 335). Межа § 3 звірена за підручником:
// вправи 136–140 у книзі Є (с. 44–45), тож § 3 = 136–174 (навігатор помилково казав 141).
// Блоки «Перевірте, як засвоїли матеріал розділу» (контрольні запитання, тести) і
// «Задачі і вправи для повторення» мають власну нумерацію і не оцифровані.
// Сверено з файлами public/images/9-klas/gdz-algebra-tarasenkova: 0 missing / 0 extra / 0 dup.

export const meta = {
  author: 'Н. Тарасенкова, І. Акуленко, О. Данько, О. Коломієць, І. Богатирьова, З. Сердюк',
  publisher: 'Оріон',
  city: 'Київ',
  year: 2026,
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
    rozdil: 'Розділ 1. Повторення за 8 клас',
    paragraphs: [
      {
        title: '',
        topics: [
          { title: 'Раціональні вирази', numbers: range(1, 14) },
          { title: 'Степені', numbers: range(15, 25) },
          { title: 'Квадратні корені. Дійсні числа', numbers: range(26, 38) },
          { title: 'Квадратні рівняння', numbers: range(39, 57) },
          { title: 'Елементи стохастики', numbers: range(58, 71) },
        ],
      },
    ],
  },
  {
    rozdil: 'Розділ 2. Нерівності',
    paragraphs: [
      {
        title: '',
        topics: [
          { title: '§ 1. Числові нерівності та їх властивості', numbers: range(72, 106) },
          { title: '§ 2. Нерівності зі змінною. Рівносильні нерівності', numbers: range(107, 135) },
          { title: '§ 3. Числові проміжки', numbers: range(136, 174) },
          { title: '§ 4. Лінійні нерівності з однією змінною', numbers: range(175, 210) },
          { title: '§ 5. Системи лінійних нерівностей з однією змінною', numbers: range(211, 244) },
          { title: '§ 6. Сукупності лінійних нерівностей з однією змінною', numbers: range(245, 281) },
        ],
      },
    ],
  },
  {
    rozdil: 'Розділ 3. Квадратична функція',
    paragraphs: [
      {
        title: '',
        topics: [
          { title: '§ 7. Функція та її властивості', numbers: range(282, 338) },
          { title: '§ 8. Перетворення графіків функцій', numbers: range(339, 393) },
          { title: '§ 9. Квадратична функція', numbers: range(394, 456) },
          { title: '§ 10. Квадратна нерівність', numbers: range(457, 504) },
          { title: '§ 11. Система двох рівнянь із двома змінними', numbers: range(505, 526) },
          { title: '§ 12. Прикладні задачі', numbers: range(527, 573) },
        ],
      },
    ],
  },
  {
    rozdil: 'Розділ 4. Числові послідовності',
    paragraphs: [
      {
        title: '',
        topics: [
          { title: '§ 13. Що таке числова послідовність', numbers: range(574, 592) },
          { title: '§ 14. Арифметична прогресія', numbers: range(593, 646) },
          { title: '§ 15. Геометрична прогресія', numbers: range(647, 720) },
        ],
      },
    ],
  },
  {
    rozdil: 'Розділ 5. Елементи стохастики',
    paragraphs: [
      {
        title: '',
        topics: [
          { title: '§ 16. Відсоткові розрахунки', numbers: range(721, 752) },
          { title: '§ 17. Основні правила комбінаторики', numbers: range(753, 795) },
          { title: '§ 18. Частота та ймовірність випадкової події', numbers: range(796, 830) },
          {
            title: '§ 19. Початкові відомості про статистику. Способи подання даних та їх обробки',
            numbers: range(831, 862),
          },
        ],
      },
    ],
  },
];

export const exercises: number[] = sections.flatMap((s) =>
  s.paragraphs.flatMap((p) => p.topics.flatMap((t) => t.numbers))
);

export const exercisesCount = exercises.length;
