// Дані книги «Математика, 4 клас» — Наталія Листопад (НУШ, УОВЦ «Оріон», Київ, 2026). Частина 1 (1..726).
// Вправи наскрізні без дір; структура за навігатором користувача (цього разу суцільним, стик у стик з файлами),
// розділи = друкований Зміст. Картинки — мобільна нарізка 1560px, конвертовані з PNG (cwebp -q 82).
// Згенеровано scratchpad/gen-lystopad-mat4-ch1.mjs. Сверено: 0 missing / 0 extra / 0 dup vs 726 файлів.

export const meta = {
  author: 'Наталія Листопад',
  publisher: 'УОВЦ «Оріон»',
  city: 'Київ',
  year: 2026,
  program: 'НУШ',
  grif: 'Рекомендовано Міністерством освіти і науки України (наказ МОН від 27.01.2026 № 111)',
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
    rozdil: 'Розділ 1. Повторення вивченого в 3 класі. Письмове множення і ділення',
    paragraphs: [
    { title: '', topics: [
      { title: 'Повторення: нумерація, додавання і віднімання в межах 1000', numbers: [...range(1, 25)] },
      { title: 'Склад числа. Округлення. Рівняння. Обернені задачі', numbers: [...range(26, 52)] },
      { title: 'Письмове множення на одноцифрове число', numbers: [...range(53, 86)] },
      { title: 'Множення чисел, що закінчуються нулем. Властивості множення', numbers: [...range(87, 121)] },
      { title: 'Письмове ділення на одноцифрове число', numbers: [...range(122, 151)] },
      { title: 'Ділення з нулем у частці. Перевірка ділення', numbers: [...range(152, 185)] },
      { title: 'Блок-схеми та діаграми в задачах', numbers: [...range(186, 203)] },
    ] },
    ],
  },
  {
    rozdil: 'Розділ 2. Нумерація чисел у межах мільйона. Величини',
    paragraphs: [
    { title: '', topics: [
      { title: 'Лічба тисячами. Чотирицифрові числа', numbers: [...range(204, 230)] },
      { title: 'П’ятицифрові числа. Розрядні доданки', numbers: [...range(231, 266)] },
      { title: 'Шестицифрові числа. Класи одиниць і тисяч', numbers: [...range(267, 314)] },
      { title: 'Порівняння багатоцифрових чисел', numbers: [...range(315, 350)] },
      { title: 'Множення і ділення на 10, 100, 1000', numbers: [...range(351, 393)] },
      { title: 'Одиниці довжини (км, м, дм, см, мм)', numbers: [...range(394, 411)] },
      { title: 'Одиниці маси (т, ц, кг, г)', numbers: [...range(412, 435)] },
      { title: 'Одиниці часу. Століття', numbers: [...range(436, 451)] },
      { title: 'Поняття площі та її одиниці (см², дм², м², мм², км²)', numbers: [...range(452, 471)] },
      { title: 'Формули площі прямокутника і квадрата', numbers: [...range(472, 494)] },
      { title: 'Ар і гектар. Визначення площі за допомогою палетки', numbers: [...range(495, 515)] },
      { title: 'Розв’язування вправ і задач на площу', numbers: [...range(516, 534)] },
    ] },
    ],
  },
  {
    rozdil: 'Розділ 3. Додавання і віднімання багатоцифрових чисел',
    paragraphs: [
    { title: '', topics: [
      { title: 'Закони та властивості додавання', numbers: [...range(535, 554)] },
      { title: 'Віднімання натуральних чисел. Взаємозв’язок дій', numbers: [...range(555, 582)] },
      { title: 'Письмове додавання і віднімання багатоцифрових чисел', numbers: [...range(583, 620)] },
      { title: 'Кути (прямий, гострий, тупий)', numbers: [...range(621, 636)] },
      { title: 'Властивості суми і різниці. Зміна результату дії', numbers: [...range(637, 663)] },
      { title: 'Додавання і віднімання іменованих чисел', numbers: [...range(664, 681)] },
      { title: 'Задачі на знаходження відстані та часу', numbers: [...range(682, 707)] },
      { title: 'Рівняння. Задачі за діаграмами', numbers: [...range(708, 726)] },
    ] },
    ],
  },
];

export const exercisesCount = 726;
