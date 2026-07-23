// Дані книги «Українська мова, 8 клас» — Олександр Заболотний, Віктор Заболотний (НУШ, Генеза, Київ, 2025).
// Наскрізні вправи 1..583 (без дір), розкладені по темах якорями (перша вправа теми).
// Назви тем = друкований ЗМІСТ; межі тем 10/13/14 звірені за картинками (113, 114, 143, 147, 148, 153, 156).
// Рубрики підручника (Проєкт, Культура мовлення, Моя сторінка, І таке буває) — окрема секція, collapsed.
// Згенеровано scratchpad/gen-zabolotnyi-ukr8.mjs. Сверено: 0 missing / 0 extra / 0 dup vs 601 файлів.

export const meta = {
  author: 'Олександр Заболотний, Віктор Заболотний',
  publisher: 'Генеза',
  city: 'Київ',
  year: 2025,
  program: 'НУШ',
  grif: 'Рекомендовано Міністерством освіти і науки України',
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
    rozdil: 'Вступ',
    paragraphs: [
    { title: '', topics: [
      { title: 'Мова як засіб пізнання, впливу та головна ознака національної ідентичності', numbers: [...range(1, 8)] },
    ] },
    ],
  },
  {
    rozdil: 'Повторення та узагальнення вивченого',
    paragraphs: [
    { title: '', topics: [
      { title: '1. Самостійні частини мови', numbers: [...range(9, 17)] },
      { title: '2. Дієслово та його форми', numbers: [...range(18, 26)] },
      { title: '3. Розряди прислівників за значенням', numbers: [...range(27, 36)] },
      { title: '4. Правопис прислівників', numbers: [...range(37, 47)] },
      { title: '5. Службові частини мови', numbers: [...range(48, 55)] },
      { title: '6. Правопис службових частин мови', numbers: [...range(56, 65)] },
      { title: '7. Граматичні помилки', numbers: [...range(66, 96)] },
    ] },
    ],
  },
  {
    rozdil: 'Синтаксис. Пунктуація',
    paragraphs: [
    { title: 'Словосполучення і речення', topics: [
      { title: '8. Словосполучення', numbers: [...range(97, 107)] },
      { title: '9. Граматична помилка в словосполученні', numbers: [...range(108, 113)] },
      { title: '10. Речення', numbers: [...range(114, 127)] },
      { title: '11. Підмет', numbers: [...range(128, 132)] },
      { title: '12. Присудок. Простий і складений дієслівний присудок', numbers: [...range(133, 143)] },
      { title: '13. Складений іменний присудок', numbers: [...range(144, 153)] },
      { title: '14. Узгодження головних членів речення', numbers: [...range(154, 160)] },
      { title: '15. Тире між підметом і присудком', numbers: [...range(161, 168)] },
      { title: '16. Узагальнення вивченого з теми «Словосполучення і речення»', numbers: [...range(169, 176)] },
    ] },
    { title: 'Другорядні члени речення', topics: [
      { title: '17. Означення', numbers: [...range(177, 190)] },
      { title: '18. Прикладка як різновид означення', numbers: [...range(191, 197)] },
      { title: '19. Написання прикладок', numbers: [...range(198, 205)] },
      { title: '20. Додаток', numbers: [...range(206, 214)] },
      { title: '21. Обставина', numbers: [...range(215, 230)] },
      { title: '22. Порівняльний зворот', numbers: [...range(231, 242)] },
      { title: '23. Порядок слів у реченні. Логічний наголос', numbers: [...range(243, 249)] },
      { title: '24. Узагальнення вивченого з теми «Другорядні члени речення»', numbers: [...range(250, 260)] },
    ] },
    { title: 'Односкладне речення. Повне і неповне речення', topics: [
      { title: '25. Односкладні речення', numbers: [...range(261, 266)] },
      { title: '26. Означено-особові та неозначено-особові речення', numbers: [...range(267, 280)] },
      { title: '27. Узагальнено-особові речення', numbers: [...range(281, 292)] },
      { title: '28. Безособові речення', numbers: [...range(293, 311)] },
      { title: '29. Називні речення', numbers: [...range(312, 316)] },
      { title: '30. Повні і неповні речення', numbers: [...range(317, 331)] },
      { title: '31. Узагальнення вивченого з теми «Односкладне речення. Повне і неповне речення»', numbers: [...range(332, 342)] },
    ] },
    { title: 'Речення з однорідними членами', topics: [
      { title: '32. Однорідні члени речення', numbers: [...range(343, 349)] },
      { title: '33. Кома між однорідними членами речення', numbers: [...range(350, 364)] },
      { title: '34. Однорідні й неоднорідні означення', numbers: [...range(365, 372)] },
      { title: '35. Узагальнювальні слова в реченнях з однорідними членами', numbers: [...range(373, 387)] },
      { title: '36. Типові помилки під час побудови речень з однорідними членами', numbers: [...range(388, 396)] },
    ] },
    { title: 'Речення із звертаннями, вставними словами (сполученнями слів, реченнями)', topics: [
      { title: '37. Звертання', numbers: [...range(397, 409)] },
      { title: '38. Вставні слова (сполучення слів, речення)', numbers: [...range(410, 428)] },
      { title: '39. Узагальнення вивченого з тем «Речення з однорідними членами» та «Речення із звертаннями, вставними словами (сполученнями слів, реченнями)»', numbers: [...range(429, 440)] },
    ] },
    { title: 'Речення з відокремленими членами', topics: [
      { title: '40. Відокремлені означення', numbers: [...range(441, 448)] },
      { title: '41. Відокремлені прикладки', numbers: [...range(449, 464)] },
      { title: '42. Відокремлені обставини', numbers: [...range(465, 480)] },
      { title: '43. Відокремлені додатки', numbers: [...range(481, 492)] },
      { title: '44. Відокремлені уточнювальні члени речення', numbers: [...range(493, 500)] },
      { title: '45. Узагальнення вивченого з теми «Речення з відокремленими членами»', numbers: [...range(501, 507)] },
    ] },
    ],
  },
  {
    rozdil: 'Узагальнення та систематизація вивченого',
    paragraphs: [
    { title: '', topics: [
      { title: '46. Словосполучення і речення. Члени речення. Типи речень', numbers: [...range(508, 515)] },
      { title: '47. Розділові знаки в простому ускладненому реченні', numbers: [...range(516, 524)] },
    ] },
    ],
  },
  {
    rozdil: 'Уроки розвитку мовлення',
    paragraphs: [
    { title: '', topics: [
      { title: 'Теми 1–21. Уроки розвитку мовлення', numbers: [...range(525, 583)] },
    ] },
    ],
  },
  {
    rozdil: 'Рубрики підручника',
    paragraphs: [
    { title: '', topics: [
      { title: 'Проєкт', collapsed: true, numbers: [{ file: 'proekt/proekt-stor-7', label: 'Стор. 7' }, { file: 'proekt/proekt-stor-35', label: 'Стор. 35' }, { file: 'proekt/proekt-stor-139', label: 'Стор. 139' }] },
      { title: 'Культура мовлення', collapsed: true, numbers: [{ file: 'kultura-movlennya/kultura-movlennya-stor-36', label: 'Стор. 36' }, { file: 'kultura-movlennya/kultura-movlennya-stor-72', label: 'Стор. 72' }, { file: 'kultura-movlennya/kultura-movlennya-stor-111', label: 'Стор. 111' }, { file: 'kultura-movlennya/kultura-movlennya-stor-143', label: 'Стор. 143' }, { file: 'kultura-movlennya/kultura-movlennya-stor-170', label: 'Стор. 170' }] },
      { title: 'Моя сторінка', collapsed: true, numbers: [{ file: 'moya-storinka/moya-storinka-stor-8', label: 'Стор. 8' }, { file: 'moya-storinka/moya-storinka-stor-37', label: 'Стор. 37' }, { file: 'moya-storinka/moya-storinka-stor-73', label: 'Стор. 73' }, { file: 'moya-storinka/moya-storinka-stor-112', label: 'Стор. 112' }, { file: 'moya-storinka/moya-storinka-stor-144', label: 'Стор. 144' }, { file: 'moya-storinka/moya-storinka-stor-171', label: 'Стор. 171' }, { file: 'moya-storinka/moya-storinka-stor-189', label: 'Стор. 189' }, { file: 'moya-storinka/moya-storinka-stor-223', label: 'Стор. 223' }] },
      { title: 'І таке буває', collapsed: true, numbers: [{ file: 'i-take-buvaye/i-take-buvaye-stor-102', label: 'Стор. 102' }, { file: 'i-take-buvaye/i-take-buvaye-stor-130', label: 'Стор. 130' }] },
    ] },
    ],
  },
];

export const exercisesCount = 601;
