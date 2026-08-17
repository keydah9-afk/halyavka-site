// Математика, 6 клас — А. Г. Мерзляк та ін. (Гімназія, 2023). Наскрізна 1..1360 без пропусків; діапазони § з навігатора (ч.1 §1–22, ч.2 §23–44).
export const meta = {
  author: "А. Г. Мерзляк, В. Б. Полонський, М. С. Якір",
  publisher: "Гімназія",
  city: "Харків",
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
    rozdil: "Частина 1 (§ 1–22)",
    paragraphs: [
      {
        title: '',
        topics: [
          { title: "§ 1. Дільники і кратні", numbers: range(1, 39) },
          { title: "§ 2. Ознаки подільності на 10, на 5 і на 2", numbers: range(40, 71) },
          { title: "§ 3. Ознаки подільності на 9 і на 3", numbers: range(72, 105) },
          { title: "§ 4. Прості та складені числа", numbers: range(106, 139) },
          { title: "§ 5. Найбільший спільний дільник", numbers: range(140, 165) },
          { title: "§ 6. Найменше спільне кратне", numbers: range(166, 187) },
          { title: "§ 7. Основна властивість дробу", numbers: range(188, 205) },
          { title: "§ 8. Скорочення дробів", numbers: range(206, 231) },
          { title: "§ 9. Зведення дробів до спільного знаменника. Порівняння дробів", numbers: range(232, 263) },
          { title: "§ 10. Додавання і віднімання дробів", numbers: range(264, 317) },
          { title: "§ 11. Множення дробів", numbers: range(318, 368) },
          { title: "§ 12. Знаходження дробу від числа", numbers: range(369, 403) },
          { title: "§ 13. Взаємно обернені числа. Ділення дробів", numbers: range(404, 458) },
          { title: "§ 14. Знаходження числа за заданим значенням його дробу", numbers: range(459, 495) },
          { title: "§ 15. Перетворення звичайних дробів у десяткові", numbers: range(496, 504) },
          { title: "§ 16. Нескінченні періодичні десяткові дроби", numbers: range(505, 515) },
          { title: "§ 17. Десяткове наближення звичайного дробу", numbers: range(516, 532) },
          { title: "§ 18. Відношення", numbers: range(533, 571) },
          { title: "§ 19. Пропорції", numbers: range(572, 608) },
          { title: "§ 20. Відсоткове відношення двох чисел", numbers: range(609, 639) },
          { title: "§ 21. Пряма та обернена пропорційні залежності", numbers: range(640, 665) },
          { title: "§ 22. Поділ числа в заданому відношенні", numbers: range(666, 689) },
        ],
      },
    ],
  },
  {
    rozdil: "Частина 2 (§ 23–44)",
    paragraphs: [
      {
        title: '',
        topics: [
          { title: "§ 23. Коло і круг", numbers: range(690, 724) },
          { title: "§ 24. Довжина кола. Площа круга", numbers: range(725, 756) },
          { title: "§ 25. Циліндр. Конус. Куля", numbers: range(757, 771) },
          { title: "§ 26. Діаграми", numbers: range(772, 789) },
          { title: "§ 27. Додатні і від’ємні числа", numbers: range(790, 807) },
          { title: "§ 28. Координатна пряма", numbers: range(808, 836) },
          { title: "§ 29. Цілі числа. Раціональні числа", numbers: range(837, 859) },
          { title: "§ 30. Модуль числа", numbers: range(860, 889) },
          { title: "§ 31. Порівняння чисел", numbers: range(890, 930) },
          { title: "§ 32. Додавання раціональних чисел", numbers: range(931, 952) },
          { title: "§ 33. Властивості додавання раціональних чисел", numbers: range(953, 971) },
          { title: "§ 34. Віднімання раціональних чисел", numbers: range(972, 1002) },
          { title: "§ 35. Множення раціональних чисел", numbers: range(1003, 1033) },
          { title: "§ 36. Переставна та сполучна властивості множення раціональних чисел. Коефіцієнт", numbers: range(1034, 1053) },
          { title: "§ 37. Розподільна властивість множення", numbers: range(1054, 1095) },
          { title: "§ 38. Ділення раціональних чисел", numbers: range(1096, 1125) },
          { title: "§ 39. Розв’язування рівнянь", numbers: range(1126, 1152) },
          { title: "§ 40. Розв’язування задач за допомогою рівнянь", numbers: range(1153, 1182) },
          { title: "§ 41. Перпендикулярні прямі", numbers: range(1183, 1207) },
          { title: "§ 42. Паралельні прямі", numbers: range(1208, 1222) },
          { title: "§ 43. Координатна площина", numbers: range(1223, 1254) },
          { title: "§ 44. Графіки", numbers: range(1255, 1267) },
          { title: "Вправи для повторення за курс 6 класу", numbers: range(1268, 1360) },
        ],
      },
    ],
  },
];

export const exercises: number[] = sections.flatMap((s) =>
  s.paragraphs.flatMap((p) => p.topics.flatMap((t) => t.numbers))
);

export const exercisesCount = exercises.length;
