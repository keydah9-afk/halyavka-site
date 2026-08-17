// Дані книги «Алгебра, 7 клас» — А. Г. Мерзляк, М. С. Якір (НУШ, «Гімназія», Харків, 2024).
// Наскрізні вправи 1..1352 (без дір), розкладені по пунктах якорями (перша вправа пункту).
// Структура (§ 1–3 = розділи, 1–29 = пункти) і назви — з друкованого ЗМІСТ (с. 350–351).
// Завдання «Перевірте себе» в тестовій формі мають власну нумерацію 1–12 і не оцифровані.
// Сверено з файлами public/images/7-klas/gdz-algebra-merzlyak: 0 missing / 0 extra / 0 dup.

export const meta = {
  author: 'А. Г. Мерзляк, М. С. Якір',
  publisher: 'Гімназія',
  city: 'Харків',
  year: 2024,
  program: 'НУШ',
  grif: 'Рекомендовано Міністерством освіти і науки України (наказ МОН від 05.02.2024 № 124)',
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
    rozdil: '§ 1. Алгебраїчні вирази. Рівняння з однією змінною',
    paragraphs: [
      {
        title: '',
        topics: [
          { title: '1. Вступ до алгебри', numbers: range(1, 31) },
          { title: '2. Лінійне рівняння з однією змінною', numbers: range(32, 83) },
          { title: '3. Розв’язування текстових задач', numbers: range(84, 138) },
          { title: '4. Тотожно рівні вирази. Тотожності', numbers: range(139, 157) },
          { title: '5. Степінь з натуральним показником', numbers: range(158, 218) },
          { title: '6. Властивості степеня з натуральним показником', numbers: range(219, 276) },
          { title: '7. Одночлени', numbers: range(277, 312) },
          { title: '8. Многочлени', numbers: range(313, 335) },
          { title: '9. Додавання і віднімання многочленів', numbers: range(336, 390) },
          { title: '10. Множення одночлена на многочлен', numbers: range(391, 431) },
          { title: '11. Множення многочлена на многочлен', numbers: range(432, 474) },
          {
            title: '12. Розкладання многочлена на множники. Винесення спільного множника за дужки',
            numbers: range(475, 521),
          },
          { title: '13. Розкладання многочлена на множники. Метод групування', numbers: range(522, 550) },
          { title: '14. Добуток різниці та суми двох виразів', numbers: range(551, 588) },
          { title: '15. Різниця квадратів двох виразів', numbers: range(589, 625) },
          { title: '16. Квадрат суми та квадрат різниці двох виразів', numbers: range(626, 689) },
          {
            title: '17. Перетворення многочлена у квадрат суми або різниці двох виразів',
            numbers: range(690, 745),
          },
          { title: '18. Сума й різниця кубів двох виразів', numbers: range(746, 784) },
          {
            title: '19. Застосування різних способів розкладання многочлена на множники',
            numbers: range(785, 837),
          },
        ],
      },
    ],
  },
  {
    rozdil: '§ 2. Функції',
    paragraphs: [
      {
        title: '',
        topics: [
          { title: '20. Зв’язки між величинами. Функція', numbers: range(838, 875) },
          { title: '21. Способи задання функції', numbers: range(876, 914) },
          { title: '22. Графік функції', numbers: range(915, 950) },
          { title: '23. Лінійна функція, її графік і властивості', numbers: range(951, 1015) },
        ],
      },
    ],
  },
  {
    rozdil: '§ 3. Системи лінійних рівнянь із двома змінними',
    paragraphs: [
      {
        title: '',
        topics: [
          { title: '24. Рівняння з двома змінними', numbers: range(1016, 1055) },
          { title: '25. Лінійне рівняння з двома змінними та його графік', numbers: range(1056, 1116) },
          {
            title:
              '26. Системи рівнянь із двома змінними. Графічний метод розв’язування системи двох лінійних рівнянь із двома змінними',
            numbers: range(1117, 1146),
          },
          { title: '27. Розв’язування систем лінійних рівнянь методом підстановки', numbers: range(1147, 1161) },
          { title: '28. Розв’язування систем лінійних рівнянь методом додавання', numbers: range(1162, 1198) },
          { title: '29. Розв’язування задач за допомогою систем лінійних рівнянь', numbers: range(1199, 1254) },
        ],
      },
    ],
  },
  {
    rozdil: 'Вправи для повторення курсу алгебри 7 класу',
    paragraphs: [
      {
        title: '',
        topics: [{ title: 'Вправи 1255–1352', numbers: range(1255, 1352) }],
      },
    ],
  },
];

export const exercises: number[] = sections.flatMap((s) =>
  s.paragraphs.flatMap((p) => p.topics.flatMap((t) => t.numbers))
);

export const exercisesCount = exercises.length;
