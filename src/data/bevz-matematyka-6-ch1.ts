// Математика, 6 клас, ч.1 — Г. Бевз та ін. (Освіта, 2023). Наскрізна 1..1095 без пропусків; діапазони § з навігатора.
export const meta = {
  author: "Г. Бевз, В. Бевз, Д. Васильєва, Н. Владімірова",
  publisher: "Освіта",
  city: "Київ",
  year: 2023,
  program: "НУШ",
  grif: "Рекомендовано Міністерством освіти і науки України",
  updatedAt: "2026-08-15",
};

export type ExItem = number | string | { file: string; label: string };
export interface Topic { title: string; numbers: ExItem[]; collapsed?: boolean; }
export interface Paragraph { title: string; topics: Topic[]; }
export interface Section { rozdil: string; paragraphs: Paragraph[]; }

const range = (from: number, to: number): number[] =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);

export const sections: Section[] = [
  {
    rozdil: "Математика, 6 клас (частина 1)",
    paragraphs: [
      {
        title: '',
        topics: [
          { title: "§ 1. Цілі числа", numbers: range(1, 33) },
          { title: "§ 2. Координатна пряма", numbers: range(34, 68) },
          { title: "§ 3. Координатна площина", numbers: range(69, 102) },
          { title: "§ 4. Модуль числа", numbers: range(103, 138) },
          { title: "§ 5. Порівняння цілих чисел", numbers: range(139, 164) },
          { title: "§ 6. Додавання цілих чисел. Закони додавання", numbers: range(165, 226) },
          { title: "§ 7. Віднімання цілих чисел", numbers: range(227, 283) },
          { title: "§ 8. Множення цілих чисел. Властивості множення", numbers: range(284, 340) },
          { title: "§ 9. Ділення цілих чисел", numbers: range(341, 377) },
          { title: "§ 10. Перетворення простіших виразів", numbers: range(378, 426) },
          { title: "§ 11. Ознаки подільності. Розкладання чисел на прості множники", numbers: range(427, 469) },
          { title: "§ 12. Найбільший спільний дільник", numbers: range(470, 511) },
          { title: "§ 13. Найменше спільне кратне", numbers: range(512, 553) },
          { title: "§ 14. Звичайні дроби з рівними знаменниками. Мішані числа", numbers: range(554, 610) },
          { title: "§ 15. Основна властивість дробу", numbers: range(611, 645) },
          { title: "§ 16. Скорочення дробів", numbers: range(646, 689) },
          { title: "§ 17. Зведення дробів до спільного знаменника. Порівняння звичайних дробів", numbers: range(690, 729) },
          { title: "§ 18. Додавання і віднімання дробів та мішаних чисел", numbers: range(730, 781) },
          { title: "§ 19. Множення дробів та мішаних чисел", numbers: range(782, 842) },
          { title: "§ 20. Ділення дробів та мішаних чисел", numbers: range(843, 896) },
          { title: "§ 21. Знаходження дробу від числа і числа за його відомим дробом", numbers: range(897, 941) },
          { title: "§ 22. Перетворення звичайних дробів у десяткові", numbers: range(942, 978) },
          { title: "§ 23. Наближені значення та дії над ними", numbers: range(979, 1007) },
          { title: "Задачі для повторення", numbers: range(1008, 1095) },
        ],
      },
    ],
  },
  {
    rozdil: 'Готуємось до контролю',
    paragraphs: [
      {
        title: '',
        topics: [
          { title: 'Тематичний контроль (с. 178)', collapsed: true, numbers: [{ file: 'g-d-t-k-stor-178-1', label: '1' }, { file: 'g-d-t-k-stor-178-2', label: '2' }, { file: 'g-d-t-k-stor-178-3', label: '3' }, { file: 'g-d-t-k-stor-178-4', label: '4' }, { file: 'g-d-t-k-stor-178-5', label: '5' }, { file: 'g-d-t-k-stor-178-6', label: '6' }, { file: 'g-d-t-k-stor-178-7', label: '7' }, { file: 'g-d-t-k-stor-178-8', label: '8' }, { file: 'g-d-t-k-stor-178-9', label: '9' }] },
          { title: 'Тематичний контроль (с. 180)', collapsed: true, numbers: [{ file: 'g-d-t-k-stor-180-1', label: '1' }, { file: 'g-d-t-k-stor-180-2', label: '2' }, { file: 'g-d-t-k-stor-180-3', label: '3' }, { file: 'g-d-t-k-stor-180-4', label: '4' }, { file: 'g-d-t-k-stor-180-5', label: '5' }, { file: 'g-d-t-k-stor-180-6', label: '6' }, { file: 'g-d-t-k-stor-180-7', label: '7' }, { file: 'g-d-t-k-stor-180-8', label: '8' }, { file: 'g-d-t-k-stor-180-9', label: '9' }] },
          { title: 'Тематичний контроль (с. 182)', collapsed: true, numbers: [{ file: 'g-d-t-k-stor-182-1', label: '1' }, { file: 'g-d-t-k-stor-182-2', label: '2' }, { file: 'g-d-t-k-stor-182-3', label: '3' }, { file: 'g-d-t-k-stor-182-4', label: '4' }, { file: 'g-d-t-k-stor-182-5', label: '5' }, { file: 'g-d-t-k-stor-182-6', label: '6' }, { file: 'g-d-t-k-stor-182-7', label: '7' }, { file: 'g-d-t-k-stor-182-8', label: '8' }, { file: 'g-d-t-k-stor-182-9', label: '9' }, { file: 'g-d-t-k-stor-182-10', label: '10' }] },
          { title: 'Тематичний контроль (с. 184)', collapsed: true, numbers: [{ file: 'g-d-t-k-stor-184-1', label: '1' }, { file: 'g-d-t-k-stor-184-2', label: '2' }, { file: 'g-d-t-k-stor-184-3', label: '3' }, { file: 'g-d-t-k-stor-184-4', label: '4' }, { file: 'g-d-t-k-stor-184-5', label: '5' }, { file: 'g-d-t-k-stor-184-6', label: '6' }, { file: 'g-d-t-k-stor-184-7', label: '7' }, { file: 'g-d-t-k-stor-184-8', label: '8' }, { file: 'g-d-t-k-stor-184-9', label: '9' }, { file: 'g-d-t-k-stor-184-10', label: '10' }] },
          { title: 'Тематичний контроль (с. 186)', collapsed: true, numbers: [{ file: 'g-d-t-k-stor-186-1', label: '1' }, { file: 'g-d-t-k-stor-186-2', label: '2' }, { file: 'g-d-t-k-stor-186-3', label: '3' }, { file: 'g-d-t-k-stor-186-4', label: '4' }, { file: 'g-d-t-k-stor-186-5', label: '5' }, { file: 'g-d-t-k-stor-186-6', label: '6' }, { file: 'g-d-t-k-stor-186-7', label: '7' }, { file: 'g-d-t-k-stor-186-8', label: '8' }, { file: 'g-d-t-k-stor-186-9', label: '9' }] },
          { title: 'Підсумковий контроль (с. 187)', collapsed: true, numbers: [{ file: 'g-d-p-k-stor-187-1', label: '1' }, { file: 'g-d-p-k-stor-187-2', label: '2' }, { file: 'g-d-p-k-stor-187-3', label: '3' }, { file: 'g-d-p-k-stor-187-4', label: '4' }, { file: 'g-d-p-k-stor-187-5', label: '5' }, { file: 'g-d-p-k-stor-187-6', label: '6' }, { file: 'g-d-p-k-stor-187-7', label: '7' }, { file: 'g-d-p-k-stor-187-8', label: '8' }] },
        ],
      },
    ],
  },
];

export const exercises: ExItem[] = sections.flatMap((s) =>
  s.paragraphs.flatMap((p) => p.topics.flatMap((t) => t.numbers))
);

export const exercisesCount = exercises.length;
