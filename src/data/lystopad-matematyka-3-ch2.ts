// Дані книги «Математика, 3 клас» — Наталія Листопад (НУШ, УОВЦ «Оріон», Київ, 2025 — нове видання). Частина 2 (1..675).
// ЗМІСТ у підручнику відсутній — структура за навігатором користувача, номери розкладені якорями;
// сумнівні межі звірені за картинками (див. scratchpad/gen-lystopad-mat3.mjs). Спецблоки collapsed.
// Сверено: 0 missing / 0 extra / 0 dup vs 692 файлів.

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
    rozdil: 'Розділ 4. Додавання і віднімання в межах 1000',
    paragraphs: [
    { title: '', topics: [
      { title: 'Усне додавання і віднімання (круглі числа, обернені задачі)', numbers: [...range(1, 143)] },
      { title: 'Письмове додавання і віднімання (додавання трьох доданків)', numbers: [...range(144, 250)] },
    ] },
    ],
  },
  {
    rozdil: 'Розділ 5. Множення і ділення в межах 1000',
    paragraphs: [
    { title: '', topics: [
      { title: 'Множення і ділення на 10, 100. Ділення числа на добуток', numbers: [...range(251, 335)] },
      { title: 'Прямі та обернені задачі, робота з таблицями цін', numbers: [...range(336, 423)] },
      { title: 'Ділення суми на число, робота з календарем', numbers: [...range(424, 441)] },
      { title: 'Ділення виду 70 : 2, 96 : 4. Задачі на вартість', numbers: [...range(442, 517)] },
      { title: 'Ділення з остачею (перевірка остачі)', numbers: [...range(518, 533)] },
    ] },
    ],
  },
  {
    rozdil: 'Розділ 6. Повторення за рік. Письмове множення і ділення',
    paragraphs: [
    { title: '', topics: [
      { title: 'Повторення нумерації та дій з числами', numbers: [...range(534, 564)] },
      { title: 'Алгоритм письмового множення на одноцифрове число', numbers: [...range(565, 592)] },
      { title: 'Нерівності, ділення з остачею (повторення), час', numbers: [...range(593, 618)] },
      { title: 'Письмове ділення трицифрового числа на одноцифрове', numbers: [...range(619, 652)] },
      { title: 'Підсумкове повторення. Дії з іменованими числами', numbers: [...range(653, 675)] },
    ] },
    ],
  },
  {
    rozdil: 'Підсумкові матеріали',
    paragraphs: [
    { title: '', topics: [
      { title: 'Завдання з логічним навантаженням', collapsed: true, numbers: [{ file: 'zzln-1', label: '1' }, { file: 'zzln-2', label: '2' }, { file: 'zzln-3', label: '3' }, { file: 'zzln-4', label: '4' }, { file: 'zzln-5', label: '5' }, { file: 'zzln-6', label: '6' }, { file: 'zzln-7', label: '7' }, { file: 'zzln-8', label: '8' }, { file: 'zzln-9', label: '9' }, { file: 'zzln-10', label: '10' }, { file: 'zzln-11', label: '11' }, { file: 'zzln-12', label: '12' }, { file: 'zzln-13', label: '13' }, { file: 'zzln-14', label: '14' }, { file: 'zzln-15', label: '15' }, { file: 'zzln-16', label: '16' }, { file: 'zzln-17', label: '17' }] },
    ] },
    ],
  },
];

export const exercisesCount = 692;
