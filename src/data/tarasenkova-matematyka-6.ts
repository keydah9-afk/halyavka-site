// Математика, 6 клас — Н. Тарасенкова та ін. (Оріон, 2023). Наскрізна 1..1607 без пропусків; розділи/§ з навігатора (тестові блоки з локальною нумерацією потрапляють у попередній §).
export const meta = {
  author: "Н. Тарасенкова, І. Богатирьова, О. Коломієць, З. Сердюк, Ю. Рудніцька",
  publisher: "Оріон",
  city: "Київ",
  year: 2023,
  program: "НУШ",
  grif: "Рекомендовано Міністерством освіти і науки України",
  updatedAt: "2026-08-15",
};

export interface Topic { title: string; numbers: number[]; }
export interface Paragraph { title: string; topics: Topic[]; }
export interface Section { rozdil: string; paragraphs: Paragraph[]; }

const range = (from: number, to: number): number[] =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);

export const sections: Section[] = [
  {
    rozdil: "Розділ 1. Узагальнення та систематизація вивченого в 5 класі",
    paragraphs: [
      {
        title: '',
        topics: [
          { title: "Числа, дії з числами. Робота з даними", numbers: range(1, 13) },
          { title: "Математичні вирази, рівності, нерівності", numbers: range(14, 22) },
          { title: "Величини. Сюжетні задачі", numbers: range(23, 40) },
          { title: "Просторові відношення, геометричні фігури", numbers: range(41, 54) },
        ],
      },
    ],
  },
  {
    rozdil: "Розділ 2. Подільність натуральних чисел",
    paragraphs: [
      {
        title: '',
        topics: [
          { title: "§ 1. Дільники і кратні натурального числа. Прості числа", numbers: range(55, 97) },
          { title: "§ 2. Ознаки подільності на 2, 10 і 5", numbers: range(98, 145) },
          { title: "§ 3. Ознаки подільності на 9 і 3", numbers: range(146, 191) },
          { title: "§ 4. Розкладання чисел на множники. Найбільший спільний дільник", numbers: range(192, 239) },
          { title: "§ 5. Найменше спільне кратне", numbers: range(240, 277) },
        ],
      },
    ],
  },
  {
    rozdil: "Розділ 3. Звичайні дроби та дії з ними",
    paragraphs: [
      {
        title: '',
        topics: [
          { title: "§ 6. Основна властивість дробу. Скорочення дробу", numbers: range(278, 327) },
          { title: "§ 7. Зведення дробів до спільного знаменника. Порівняння дробів", numbers: range(328, 368) },
          { title: "§ 8. Додавання і віднімання дробів", numbers: range(369, 425) },
          { title: "§ 9. Множення дробів. Знаходження дробу від числа", numbers: range(426, 493) },
          { title: "§ 10. Ділення дробів. Знаходження числа за його дробом. Порядок дій", numbers: range(494, 546) },
          { title: "§ 11. Перетворення звичайного дробу в десятковий. Десяткові наближення", numbers: range(547, 594) },
        ],
      },
    ],
  },
  {
    rozdil: "Розділ 4. Відношення і пропорції",
    paragraphs: [
      {
        title: '',
        topics: [
          { title: "§ 12. Відношення та його властивості", numbers: range(595, 625) },
          { title: "§ 13. Пропорція та її властивості", numbers: range(626, 659) },
          { title: "§ 14. Пряма та обернена пропорційні залежності", numbers: range(660, 707) },
          { title: "§ 15. Поділ числа в даному відношенні. Масштаб", numbers: range(708, 747) },
          { title: "§ 16. Коло і круг. Круговий сектор", numbers: range(748, 789) },
          { title: "§ 17. Діаграми", numbers: range(790, 817) },
          { title: "§ 18. Відсоткові розрахунки", numbers: range(818, 923) },
        ],
      },
    ],
  },
  {
    rozdil: "Розділ 5. Раціональні числа та дії з ними",
    paragraphs: [
      {
        title: '',
        topics: [
          { title: "§ 19. Додатні та від’ємні числа. Число нуль", numbers: range(924, 945) },
          { title: "§ 20. Координатна пряма", numbers: range(946, 988) },
          { title: "§ 21. Модуль числа", numbers: range(989, 1055) },
          { title: "§ 22. Цілі числа. Раціональні числа", numbers: range(1056, 1081) },
          { title: "§ 23. Порівняння раціональних чисел", numbers: range(1082, 1125) },
          { title: "§ 24. Додавання раціональних чисел", numbers: range(1126, 1191) },
          { title: "§ 25. Віднімання раціональних чисел", numbers: range(1192, 1260) },
          { title: "§ 26. Множення раціональних чисел", numbers: range(1261, 1325) },
          { title: "§ 27. Ділення раціональних чисел", numbers: range(1326, 1395) },
        ],
      },
    ],
  },
  {
    rozdil: "Розділ 6. Вирази. Рівняння. Координатна площина",
    paragraphs: [
      {
        title: '',
        topics: [
          { title: "§ 28. Вирази та їх спрощення", numbers: range(1396, 1427) },
          { title: "§ 29. Рівняння. Основні властивості рівнянь", numbers: range(1428, 1451) },
          { title: "§ 30. Застосування рівнянь до розв’язування задач", numbers: range(1452, 1508) },
          { title: "§ 31. Перпендикулярні та паралельні прямі", numbers: range(1509, 1542) },
          { title: "§ 32. Координатна площина", numbers: range(1543, 1585) },
          { title: "§ 33. Графіки залежностей між величинами", numbers: range(1586, 1607) },
        ],
      },
    ],
  },
];

export const exercises: number[] = sections.flatMap((s) =>
  s.paragraphs.flatMap((p) => p.topics.flatMap((t) => t.numbers))
);

export const exercisesCount = exercises.length;
