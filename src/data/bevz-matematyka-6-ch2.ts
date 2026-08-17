// Математика, 6 клас, ч.2 — Г. Бевз та ін. (Освіта, 2023). Наскрізна 1..1034 без пропусків; діапазони § з навігатора.
export const meta = {
  author: "Г. Бевз, В. Бевз, Д. Васильєва, Н. Владімірова",
  publisher: "Освіта",
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
    rozdil: "Математика, 6 клас (частина 2)",
    paragraphs: [
      {
        title: '',
        topics: [
          { title: "§ 1. Відношення", numbers: range(1, 36) },
          { title: "§ 2. Ймовірність випадкової події", numbers: range(37, 76) },
          { title: "§ 3. Пропорції", numbers: range(77, 116) },
          { title: "§ 4. Масштаб", numbers: range(117, 150) },
          { title: "§ 5. Відсоткове відношення", numbers: range(151, 201) },
          { title: "§ 6. Прямо пропорційні та обернено пропорційні величини", numbers: range(202, 244) },
          { title: "§ 7. Задачі на пропорційний поділ", numbers: range(245, 281) },
          { title: "§ 8. Коло і круг", numbers: range(282, 336) },
          { title: "§ 9. Діаграми", numbers: range(337, 370) },
          { title: "§ 10. Тіла обертання. Циліндр, конус, куля", numbers: range(371, 405) },
          { title: "§ 11. Раціональні числа", numbers: range(406, 469) },
          { title: "§ 12. Порівняння раціональних чисел", numbers: range(470, 505) },
          { title: "§ 13. Додавання раціональних чисел", numbers: range(506, 541) },
          { title: "§ 14. Віднімання раціональних чисел", numbers: range(542, 572) },
          { title: "§ 15. Множення раціональних чисел", numbers: range(573, 611) },
          { title: "§ 16. Закони множення", numbers: range(612, 666) },
          { title: "§ 17. Ділення раціональних чисел", numbers: range(667, 706) },
          { title: "§ 18. Перетворення простіших виразів", numbers: range(707, 748) },
          { title: "§ 19. Стандартний вигляд числа", numbers: range(749, 783) },
          { title: "§ 20. Розв’язування рівнянь", numbers: range(784, 846) },
          { title: "§ 21. Координатна площина", numbers: range(847, 884) },
          { title: "§ 22. Графіки", numbers: range(885, 905) },
          { title: "Вправи для повторення за рік", numbers: range(906, 1007) },
          { title: "Цікаві та складні задачі", numbers: range(1008, 1034) },
        ],
      },
    ],
  },
];

export const exercises: number[] = sections.flatMap((s) =>
  s.paragraphs.flatMap((p) => p.topics.flatMap((t) => t.numbers))
);

export const exercisesCount = exercises.length;
