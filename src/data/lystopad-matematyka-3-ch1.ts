// Дані книги «Математика, 3 клас» — Наталія Листопад (НУШ, УОВЦ «Оріон», Київ, 2025 — нове видання). Частина 1 (1..674).
// ЗМІСТ у підручнику відсутній — структура за навігатором користувача, номери розкладені якорями;
// сумнівні межі звірені за картинками (див. scratchpad/gen-lystopad-mat3.mjs). Спецблоки collapsed.
// Сверено: 0 missing / 0 extra / 0 dup vs 704 файлів.

export const meta = {
  author: 'Наталія Листопад',
  publisher: 'УОВЦ «Оріон»',
  city: 'Київ',
  year: 2025,
  program: 'НУШ',
  grif: 'Рекомендовано Міністерством освіти і науки України (наказ МОН від 07.01.2025 № 22)',
  updatedAt: '2026-07-23',
};

export type ExItem = number | string | { file: string; label: string };
export interface Topic {
  title: string;
  numbers: ExItem[];
  collapsed?: boolean;
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
    rozdil: 'Розділ 1. Повторення вивченого в 2 класі',
    paragraphs: [
    { title: '', topics: [
      { title: 'Нумерація, додавання і віднімання в межах 100', numbers: [...range(1, 42)] },
      { title: 'Периметр, латинський алфавіт, буквені вирази', numbers: [...range(43, 57)] },
      { title: 'Дужки, порядок дій, множення та ділення', numbers: [...range(58, 83)] },
    ] },
    ],
  },
  {
    rozdil: 'Розділ 2. Табличне множення і ділення',
    paragraphs: [
    { title: '', topics: [
      { title: 'Множення і ділення на 3, 4, 5. Задачі на зведення до одиниці', numbers: [...range(84, 263)] },
      { title: 'Рівняння, множення і ділення на 6, 7. Діаграми', numbers: [...range(264, 353)] },
      { title: 'Множення і ділення на 8, 9. Коло і круг', numbers: [...range(354, 369)] },
      { title: 'Дроби (чисельник і знаменник). Знаходження числа за його частиною', numbers: [...range(370, 476)] },
    ] },
    ],
  },
  {
    rozdil: 'Розділ 3. Нумерація трицифрових чисел',
    paragraphs: [
    { title: '', topics: [
      { title: 'Утворення трицифрових чисел, розряди (сотні, десятки, одиниці)', numbers: [...range(477, 514)] },
      { title: 'Порівняння чисел, розрядні доданки, одиниці довжини і маси (км, г, т)', numbers: [...range(515, 581)] },
      { title: 'Дії з круглими числами, час (секунди), округлення', numbers: [...range(582, 674)] },
    ] },
    ],
  },
  {
    rozdil: 'Підсумкові матеріали',
    paragraphs: [
    { title: '', topics: [
      { title: 'Додаткові завдання', collapsed: true, numbers: [{ file: 'dodatkove-zavdannya-1', label: '1' }, { file: 'dodatkove-zavdannya-2', label: '2' }, { file: 'dodatkove-zavdannya-3', label: '3' }, { file: 'dodatkove-zavdannya-4', label: '4' }, { file: 'dodatkove-zavdannya-5', label: '5' }, { file: 'dodatkove-zavdannya-6', label: '6' }, { file: 'dodatkove-zavdannya-7', label: '7' }, { file: 'dodatkove-zavdannya-8', label: '8' }, { file: 'dodatkove-zavdannya-9', label: '9' }, { file: 'dodatkove-zavdannya-10', label: '10' }, { file: 'dodatkove-zavdannya-11', label: '11' }, { file: 'dodatkove-zavdannya-12', label: '12' }, { file: 'dodatkove-zavdannya-13', label: '13' }, { file: 'dodatkove-zavdannya-14', label: '14' }, { file: 'dodatkove-zavdannya-15', label: '15' }, { file: 'dodatkove-zavdannya-16', label: '16' }, { file: 'dodatkove-zavdannya-17', label: '17' }, { file: 'dodatkove-zavdannya-18', label: '18' }, { file: 'dodatkove-zavdannya-19', label: '19' }] },
      { title: 'Міцні горішки під ялинку (логічні задачі)', collapsed: true, numbers: [{ file: 'zavdannya-z-logichnym-navantazhennyam-1', label: '1' }, { file: 'zavdannya-z-logichnym-navantazhennyam-2', label: '2' }, { file: 'zavdannya-z-logichnym-navantazhennyam-3', label: '3' }, { file: 'zavdannya-z-logichnym-navantazhennyam-4', label: '4' }, { file: 'zavdannya-z-logichnym-navantazhennyam-5', label: '5' }, { file: 'zavdannya-z-logichnym-navantazhennyam-6', label: '6' }, { file: 'zavdannya-z-logichnym-navantazhennyam-7', label: '7' }, { file: 'zavdannya-z-logichnym-navantazhennyam-8', label: '8' }, { file: 'zavdannya-z-logichnym-navantazhennyam-9', label: '9' }, { file: 'zavdannya-z-logichnym-navantazhennyam-10', label: '10' }, { file: 'zavdannya-z-logichnym-navantazhennyam-11', label: '11' }] },
    ] },
    ],
  },
];

export const exercisesCount = 704;
