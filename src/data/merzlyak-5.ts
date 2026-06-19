// Дані книги «Математика, 5 клас» — Мерзляк (НУШ, 2022).
// Нумерація вправ суцільна (1…1280); групування по §/пунктах задане діапазонами.

export const meta = {
  author: 'А. Г. Мерзляк, В. Б. Полонський, М. С. Якір',
  publisher: 'Гімназія',
  city: 'Харків',
  year: 2022,
  program: 'НУШ',
  grif: 'Рекомендовано Міністерством освіти і науки України',
  // Дата останньої зміни КОНТЕНТУ (додав/виправив картинки-розв’язки чи розділ),
  // а не правок верстки. Тягнеться у JSON-LD dateModified.
  updatedAt: '2026-06-19',
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
    rozdil: 'Розділ I. Натуральні числа і дії з ними',
    paragraphs: [
      {
        title: '§ 1. Натуральні числа',
        topics: [
          { title: '1. Ряд натуральних чисел', numbers: range(1, 20) },
          { title: '2. Цифри. Десятковий запис натуральних чисел', numbers: range(21, 46) },
          { title: '3. Відрізок. Довжина відрізка', numbers: range(47, 91) },
          { title: '4. Площина. Пряма. Промінь', numbers: range(92, 116) },
          { title: '5. Шкала. Координатний промінь', numbers: range(117, 151) },
          { title: '6. Порівняння натуральних чисел', numbers: range(152, 179) },
        ],
      },
      {
        title: '§ 2. Додавання і віднімання натуральних чисел',
        topics: [
          { title: '7. Додавання натуральних чисел. Властивості додавання', numbers: range(180, 211) },
          { title: '8. Віднімання натуральних чисел', numbers: range(212, 260) },
          { title: '9. Числові і буквені вирази. Формули', numbers: range(261, 290) },
          { title: '10. Рівняння', numbers: range(291, 303) },
          { title: '11. Кут. Позначення кутів', numbers: range(304, 316) },
          { title: '12. Види кутів. Вимірювання кутів', numbers: range(317, 348) },
          { title: '13. Многокутники. Рівні фігури', numbers: range(349, 363) },
          { title: '14. Трикутник і його види', numbers: range(364, 386) },
          { title: '15. Прямокутник', numbers: range(387, 414) },
        ],
      },
      {
        title: '§ 3. Множення і ділення натуральних чисел',
        topics: [
          { title: '16. Множення. Переставна властивість множення', numbers: range(415, 451) },
          { title: '17. Сполучна та розподільна властивості множення', numbers: range(452, 478) },
          { title: '18. Ділення', numbers: range(479, 542) },
          { title: '19. Ділення з остачею', numbers: range(543, 573) },
          { title: '20. Степінь числа', numbers: range(574, 594) },
          { title: '21. Площа. Площа прямокутника', numbers: range(595, 632) },
          { title: '22. Прямокутний паралелепіпед. Піраміда', numbers: range(633, 659) },
          { title: "23. Об'єм прямокутного паралелепіпеда", numbers: range(660, 696) },
          { title: '24. Комбінаторні задачі', numbers: range(697, 725) },
        ],
      },
    ],
  },
  {
    rozdil: 'Розділ II. Дробові числа і дії з ними',
    paragraphs: [
      {
        title: '§ 4. Звичайні дроби',
        topics: [
          { title: '25. Уявлення про звичайні дроби', numbers: range(726, 770) },
          { title: '26. Правильні і неправильні дроби. Порівняння дробів', numbers: range(771, 799) },
          { title: '27. Додавання і віднімання дробів з однаковими знаменниками', numbers: range(800, 816) },
          { title: '28. Дроби і ділення натуральних чисел', numbers: range(817, 835) },
          { title: '29. Мішані числа', numbers: range(836, 866) },
        ],
      },
      {
        title: '§ 5. Десяткові дроби',
        topics: [
          { title: '30. Уявлення про десяткові дроби', numbers: range(867, 892) },
          { title: '31. Порівняння десяткових дробів', numbers: range(893, 917) },
          { title: '32. Округлення чисел', numbers: range(918, 936) },
          { title: '33. Додавання і віднімання десяткових дробів', numbers: range(937, 979) },
          { title: '34. Множення десяткових дробів', numbers: range(980, 1030) },
          { title: '35. Ділення десяткових дробів', numbers: range(1031, 1101) },
          { title: '36. Середнє арифметичне. Середнє значення величини', numbers: range(1102, 1133) },
          { title: '37. Відсотки. Знаходження відсотків від числа', numbers: range(1134, 1175) },
          { title: '38. Знаходження числа за його відсотками', numbers: range(1176, 1205) },
        ],
      },
    ],
  },
];

export const povtorennya: Topic = {
  title: 'Вправи для повторення за курс 5 класу',
  numbers: range(1206, 1280),
};

// Плоский упорядкований список усіх номерів — для пошуку та навігації «← →».
export const exercises: number[] = [
  ...sections.flatMap((s) => s.paragraphs.flatMap((p) => p.topics.flatMap((t) => t.numbers))),
  ...povtorennya.numbers,
];

export const exercisesCount = exercises.length;
