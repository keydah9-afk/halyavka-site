// Дані «картинкової» сторінки книги «Хімія, 8 клас» — Григорович (НУШ, «Ранок», 2025).
// Картинки-розв'язання генеруються з текстових відповідей режиму «Списати»:
//   npx tsx scripts/gdz/render-answers.ts
// Сам цей файл теж генерується — руками не правити:
//   npx tsx scripts/gdz/gen-images-data.ts > src/data/grygorovych-himiya-8-images.ts
// Покроковий розбір кожного завдання живе на himiya.halyavka.net.

export const meta = {
  author: 'Олексій Григорович, Олександр Недоруб',
  publisher: 'Ранок',
  city: 'Харків',
  year: 2025,
  program: 'НУШ',
  grif: 'Рекомендовано Міністерством освіти і науки України',
  updatedAt: '2026-09-01'
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

export const sections: Section[] = [
  {
    rozdil: 'Розділ 1. Пізнаємо кількісні закони хімії',
    paragraphs: [
      { title: '§ 1. Елементи, речовини та явища (стор. 8–17)', topics: [
        { title: 'Поміркуйте (запитання в параграфі)', collapsed: true, numbers: [{ file: 'pom-11', label: 'с. 11' }] },
        { title: 'Робота з інформацією', numbers: ['1', '2'] },
        { title: 'Розуміння явищ природи (робота в групах)', numbers: ['3', '4', '5', '6'] },
      ] },
      { title: '§ 2. Формули та назви бінарних сполук (стор. 18–24)', topics: [
        { title: 'Поміркуйте (запитання в параграфі)', collapsed: true, numbers: [{ file: 'pom-18', label: 'с. 18' }] },
        { title: 'Робота з інформацією', numbers: ['7', '8', '9', '10', '11', '12', '13'] },
      ] },
      { title: '§ 3. Відносна атомна маса та відносна молекулярна маса (стор. 25–32)', topics: [
        { title: 'Поміркуйте (запитання в параграфі)', collapsed: true, numbers: [{ file: 'pom-25', label: 'с. 25' }, { file: 'pom-27', label: 'с. 27' }, { file: 'pom-29', label: 'с. 29' }] },
        { title: 'Робота з інформацією', numbers: ['14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'] },
        { title: 'Розуміння явищ природи (робота в групах)', numbers: ['25', '26'] },
      ] },
      { title: '§ 4. Масова частка хімічного елемента в речовині (стор. 33–37)', topics: [
        { title: 'Поміркуйте (запитання в параграфі)', collapsed: true, numbers: [{ file: 'pom-33', label: 'с. 33' }] },
        { title: 'Робота з інформацією', numbers: ['27', '28', '29', '30', '31', '32'] },
        { title: 'Розуміння явищ природи (робота в групах)', numbers: ['33', '34', '35'] },
      ] },
      { title: '§ 5. Установлення хімічних формул сполук (стор. 38–44)', topics: [
        { title: 'Поміркуйте (запитання в параграфі)', collapsed: true, numbers: [{ file: 'pom-38', label: 'с. 38' }] },
        { title: 'Робота з інформацією', numbers: ['36', '37', '38', '39', '40'] },
      ] },
      { title: '§ 6. Кількість речовини. Молярна маса речовин (стор. 45–53)', topics: [
        { title: 'Поміркуйте (запитання в параграфі)', collapsed: true, numbers: [{ file: 'pom-45', label: 'с. 45' }, { file: 'pom-47', label: 'с. 47' }, { file: 'pom-49', label: 'с. 49' }] },
        { title: 'Робота з інформацією', numbers: ['41', '42', '43', '44', '45', '46', '47', '48', '49', '50'] },
        { title: 'Розуміння явищ природи (робота в групах)', numbers: ['51', '52'] },
      ] },
      { title: '§ 7. Розрахунки за хімічними рівняннями (стор. 54–60)', topics: [
        { title: 'Робота з інформацією', numbers: ['53', '54', '55', '56', '57', '58', '59', '60', '61'] },
        { title: 'Розуміння явищ природи (робота в групах)', numbers: ['62', '63'] },
      ] },
    ],
  },
  {
    rozdil: 'Розділ 2. Досліджуємо гази довкілля',
    paragraphs: [
      { title: '§ 8. Повітря (стор. 63–68)', topics: [
        { title: 'Поміркуйте (запитання в параграфі)', collapsed: true, numbers: [{ file: 'pom-64-1', label: 'с. 64 (1)' }, { file: 'pom-64-2', label: 'с. 64 (2)' }] },
        { title: 'Робота з інформацією', numbers: ['64', '65', '66'] },
        { title: 'Розуміння явищ природи (робота в групах)', numbers: ['67', '68', '69', '70', '71', '72'] },
      ] },
      { title: '§ 9. Кисень: фізичні властивості й одержання (стор. 69–77)', topics: [
        { title: 'Робота з інформацією', numbers: ['73', '74', '75', '76', '77', '78', '79', '80'] },
        { title: 'Розуміння явищ природи (робота в групах)', numbers: ['81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94'] },
      ] },
      { title: 'Навчальне дослідження № 1. «Одержання кисню» (стор. 78–82)', topics: [
        { title: 'Підготовка до роботи', numbers: [{ file: 'nd1-meta', label: 'Мета' }, { file: 'nd1-ryzyky', label: 'Ризики' }, { file: 'nd1-pom-79', label: 'с. 79 (1)' }, { file: 'nd1-pom-79b', label: 'с. 79 (2)' }, { file: 'nd1-pom-80', label: 'с. 80 (1)' }] },
        { title: 'Хід роботи та спостереження', numbers: [{ file: 'nd1-dosl-1', label: 'Дослід I' }, { file: 'nd1-pom-81', label: 'с. 81' }, { file: 'nd1-dosl-2', label: 'Дослід II' }] },
        { title: 'Підбиття підсумків роботи', numbers: [{ file: 'nd1-p1', label: 'Підсумок 1' }, { file: 'nd1-p2', label: 'Підсумок 2' }, { file: 'nd1-p3', label: 'Підсумок 3' }, { file: 'nd1-p4', label: 'Підсумок 4' }, { file: 'nd1-p5', label: 'Підсумок 5' }] },
        { title: 'Рефлексуємо', collapsed: true, numbers: [{ file: 'nd1-refl', label: 'Рефлексія' }] },
      ] },
      { title: '§ 10. Кисень — єдиний газ повітря, що підтримує горіння (стор. 83–93)', topics: [
        { title: 'Поміркуйте (запитання в параграфі)', collapsed: true, numbers: [{ file: 'pom-83', label: 'с. 83' }, { file: 'pom-85-1', label: 'с. 85 (1)' }, { file: 'pom-85-2', label: 'с. 85 (2)' }, { file: 'pom-87', label: 'с. 87' }, { file: 'pom-88', label: 'с. 88' }] },
        { title: 'Робота з інформацією', numbers: ['95', '96', '97', '98', '99'] },
        { title: 'Розуміння явищ природи (робота в групах)', numbers: ['100', '101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116', '117'] },
      ] },
      { title: '§ 11. Колообіг Оксигену в природі (стор. 94–99)', topics: [
        { title: 'Поміркуйте (запитання в параграфі)', collapsed: true, numbers: [{ file: 'pom-95', label: 'с. 95' }, { file: 'pom-96', label: 'с. 96' }] },
        { title: 'Робота з інформацією', numbers: ['118', '119'] },
        { title: 'Розуміння явищ природи (робота в групах)', numbers: ['120', '121', '122', '123', '124'] },
      ] },
      { title: '§ 12. Озон (стор. 100–107)', topics: [
        { title: 'Поміркуйте (запитання в параграфі)', collapsed: true, numbers: [{ file: 'pom-101', label: 'с. 101' }, { file: 'pom-102', label: 'с. 102' }, { file: 'pom-103', label: 'с. 103' }, { file: 'pom-104', label: 'с. 104' }] },
        { title: 'Робота з інформацією', numbers: ['125', '126', '127', '128'] },
        { title: 'Розуміння явищ природи (робота в групах)', numbers: ['129', '130', '131', '132', '133', '134'] },
      ] },
      { title: '§ 13. Молярний об’єм газів (стор. 108–115)', topics: [
        { title: 'Поміркуйте (запитання в параграфі)', collapsed: true, numbers: [{ file: 'pom-110', label: 'с. 110' }] },
        { title: 'Робота з інформацією', numbers: ['135', '136', '137', '138', '139', '140', '141', '142', '143', '144'] },
        { title: 'Розуміння явищ природи (робота в групах)', numbers: ['145', '146'] },
      ] },
      { title: 'Навчальне дослідження № 2. «Визначення молярного об’єму газів» (стор. 116–119)', topics: [
        { title: 'Підготовка до роботи', numbers: [{ file: 'nd2-meta', label: 'Мета' }, { file: 'nd2-pom-116', label: 'с. 116 (1)' }, { file: 'nd2-ryzyky', label: 'Ризики' }, { file: 'nd2-pom-116b', label: 'с. 116 (2)' }] },
        { title: 'Хід роботи та спостереження', numbers: [{ file: 'nd2-dosl-1', label: 'Дослід I' }, { file: 'nd2-dosl-2', label: 'Дослід II' }, { file: 'nd2-rozrah', label: 'Розрахунок' }, { file: 'nd2-vysnovok', label: 'Висновок' }] },
        { title: 'Підбиття підсумків роботи', numbers: [{ file: 'nd2-p1', label: 'Питання 1' }, { file: 'nd2-p2', label: 'Питання 2' }, { file: 'nd2-p3', label: 'Питання 3' }, { file: 'nd2-p4', label: 'Питання 4' }, { file: 'nd2-p5', label: 'Питання 5' }, { file: 'nd2-p6', label: 'Питання 6' }, { file: 'nd2-p7', label: 'Питання 7' }] },
        { title: 'Рефлексуємо', collapsed: true, numbers: [{ file: 'nd2-refl', label: 'Рефлексія' }] },
      ] },
      { title: '§ 14. Взаємодія оксидів із водою. Поняття про кислоти й основи (стор. 120–128)', topics: [
        { title: 'Поміркуйте (запитання в параграфі)', collapsed: true, numbers: [{ file: 'pom-121', label: 'с. 121 (1)' }, { file: 'pom-121b', label: 'с. 121 (2)' }, { file: 'pom-123', label: 'с. 123' }] },
        { title: 'Робота з інформацією', numbers: ['147', '148', '149', '150', '151'] },
        { title: 'Розуміння явищ природи (робота в групах)', numbers: ['152', '153', '154', '155', '156', '157', '158', '159'] },
      ] },
      { title: 'Навчальне дослідження № 3. «Виявлення кислот і лугів у розчинах» (стор. 129–130)', topics: [
        { title: 'Підготовка до роботи', numbers: [{ file: 'nd3-meta', label: 'Мета' }, { file: 'nd3-ryzyky', label: 'Ризики' }] },
        { title: 'Хід роботи та спостереження', numbers: [{ file: 'nd3-dosl-1', label: 'Дослід 1' }, { file: 'nd3-dosl-2', label: 'Дослід 2' }] },
        { title: 'Підбиття підсумків роботи', numbers: [{ file: 'nd3-p1', label: 'Питання 1' }, { file: 'nd3-p2', label: 'Питання 2' }, { file: 'nd3-p3', label: 'Питання 3' }, { file: 'nd3-p4', label: 'Питання 4' }] },
        { title: 'Рефлексуємо', collapsed: true, numbers: [{ file: 'nd3-refl', label: 'Рефлексія' }] },
      ] },
      { title: 'Навчальне дослідження № 4. «Виявлення кислот і лугів у побутових хімікатах природними індикаторами» (стор. 131–132)', topics: [
        { title: 'Підготовка до роботи', numbers: [{ file: 'nd4-meta', label: 'Мета' }, { file: 'nd4-ryzyky', label: 'Ризики' }] },
        { title: 'Хід роботи та спостереження', numbers: [{ file: 'nd4-dosl-1', label: 'Дослід 1' }, { file: 'nd4-dosl-2', label: 'Дослід 2' }] },
        { title: 'Підбиття підсумків роботи', numbers: [{ file: 'nd4-p1', label: 'Питання 1' }, { file: 'nd4-p2', label: 'Питання 2' }] },
        { title: 'Рефлексуємо', collapsed: true, numbers: [{ file: 'nd4-refl', label: 'Рефлексія' }] },
      ] },
      { title: '§ 15. Гідроген. Водень (стор. 133–138)', topics: [
        { title: 'Поміркуйте (запитання в параграфі)', collapsed: true, numbers: [{ file: 'pom-134', label: 'с. 134' }] },
        { title: 'Робота з інформацією', numbers: ['160', '161', '162', '163', '164', '165', '166', '167'] },
        { title: 'Розуміння явищ природи (робота в групах)', numbers: ['168', '169', '170', '171', '172', '173', '174'] },
      ] },
      { title: '§ 16. Водень: хімічні властивості й одержання (стор. 139–145)', topics: [
        { title: 'Поміркуйте (запитання в параграфі)', collapsed: true, numbers: [{ file: 'pom-139', label: 'с. 139' }, { file: 'pom-140', label: 'с. 140' }, { file: 'pom-141', label: 'с. 141' }, { file: 'pom-142', label: 'с. 142 (1)' }, { file: 'pom-142b', label: 'с. 142 (2)' }] },
        { title: 'Робота з інформацією', numbers: ['175', '176', '177', '178', '179', '180', '181', '182', '183', '184', '185'] },
        { title: 'Розуміння явищ природи (робота в групах)', numbers: ['186', '187', '188', '189', '190', '191', '192', '193'] },
      ] },
      { title: 'Навчальне дослідження № 5. «Досліджуємо водень» (стор. 146–149)', topics: [
        { title: 'Підготовка до роботи', numbers: [{ file: 'nd5-meta', label: 'Мета' }, { file: 'nd5-ryzyky', label: 'Ризики' }, { file: 'nd5-pom-147', label: 'с. 147 (1)' }, { file: 'nd5-pom-147b', label: 'с. 147 (2)' }, { file: 'nd5-pom-148', label: 'с. 148' }] },
        { title: 'Хід роботи та спостереження', numbers: [{ file: 'nd5-dosl-1', label: 'Дослід І' }, { file: 'nd5-dosl-2', label: 'Дослід ІІ' }, { file: 'nd5-dosl-3', label: 'Дослід ІІІ' }, { file: 'nd5-dosl-4', label: 'Дослід IV' }] },
        { title: 'Підбиття підсумків роботи', numbers: [{ file: 'nd5-p1', label: 'Питання 1' }, { file: 'nd5-p2', label: 'Питання 2' }, { file: 'nd5-p3', label: 'Питання 3' }, { file: 'nd5-p4', label: 'Питання 4' }, { file: 'nd5-p5', label: 'Питання 5' }, { file: 'nd5-p6', label: 'Питання 6' }, { file: 'nd5-p7', label: 'Питання 7' }, { file: 'nd5-p8', label: 'Питання 8' }] },
        { title: 'Рефлексуємо', collapsed: true, numbers: [{ file: 'nd5-refl', label: 'Рефлексія' }] },
      ] },
      { title: '§ 17. Солі (стор. 150–155)', topics: [
        { title: 'Поміркуйте (запитання в параграфі)', collapsed: true, numbers: [{ file: 'pom-152', label: 'с. 152' }] },
        { title: 'Робота з інформацією', numbers: ['194', '195', '196', '197', '198', '199', '200', '201', '202', '203'] },
      ] },
      { title: 'Навчальне дослідження № 6. «Досліджуємо активність металів» (стор. 156–157)', topics: [
        { title: 'Підготовка до роботи', numbers: [{ file: 'nd6-meta', label: 'Мета' }, { file: 'nd6-ryzyky', label: 'Ризики' }, { file: 'nd6-pom-156', label: 'с. 156' }] },
        { title: 'Хід роботи та спостереження', numbers: [{ file: 'nd6-dosl-1', label: 'Дослід І' }, { file: 'nd6-dosl-2', label: 'Дослід ІІ' }, { file: 'nd6-ryad', label: 'Ряд' }, { file: 'nd6-vysnovok', label: 'Висновок' }] },
        { title: 'Підбиття підсумків роботи', numbers: [{ file: 'nd6-p1', label: 'Питання 1' }, { file: 'nd6-p2', label: 'Питання 2' }, { file: 'nd6-p3', label: 'Питання 3' }, { file: 'nd6-p4', label: 'Питання 4' }, { file: 'nd6-p5', label: 'Питання 5' }, { file: 'nd6-p6', label: 'Питання 6' }] },
        { title: 'Рефлексуємо', collapsed: true, numbers: [{ file: 'nd6-refl', label: 'Рефлексія' }] },
      ] },
      { title: '§ 18. Ряд активності металів (стор. 158–168)', topics: [
        { title: 'Поміркуйте (запитання в параграфі)', collapsed: true, numbers: [{ file: 'pom-159', label: 'с. 159' }, { file: 'pom-160', label: 'с. 160' }, { file: 'pom-162', label: 'с. 162' }] },
        { title: 'Робота з інформацією', numbers: ['204', '205', '206', '207', '208', '209', '210', '211', '212', '213', '214', '215', '216', '217', '218', '219', '220'] },
        { title: 'Розуміння явищ природи (робота в групах)', numbers: ['221', '222', '223', '224', '225', '226'] },
      ] },
      { title: '§ 19. Вуглекислий газ (стор. 169–180)', topics: [
        { title: 'Поміркуйте (запитання в параграфі)', collapsed: true, numbers: [{ file: 'pom-172', label: 'с. 172' }, { file: 'pom-173', label: 'с. 173' }] },
        { title: 'Робота з інформацією', numbers: ['227', '228', '229', '230', '231', '232', '233', '234', '235', '236', '237'] },
        { title: 'Розуміння явищ природи (робота в групах)', numbers: ['238', '239', '240', '241', '242', '243', '244', '245', '246', '247', '248', '249'] },
      ] },
      { title: 'Навчальне дослідження № 7. «Досліджуємо розпушувальну дію вуглекислого газу» (стор. 181–182)', topics: [
        { title: 'Підготовка до роботи', numbers: [{ file: 'nd7-meta', label: 'Мета' }, { file: 'nd7-ryzyky', label: 'Ризики' }, { file: 'nd7-pom-182', label: 'с. 182' }] },
        { title: 'Хід роботи та спостереження', numbers: [{ file: 'nd7-dosl-1', label: 'Дослід І' }, { file: 'nd7-dosl-2', label: 'Дослід ІІ' }, { file: 'nd7-himiya', label: 'Хімія' }] },
        { title: 'Підбиття підсумків роботи', numbers: [{ file: 'nd7-p1', label: 'Питання 1' }, { file: 'nd7-p2', label: 'Питання 2' }, { file: 'nd7-p3', label: 'Питання 3' }, { file: 'nd7-p4', label: 'Питання 4' }, { file: 'nd7-p5', label: 'Питання 5' }] },
        { title: 'Рефлексуємо', collapsed: true, numbers: [{ file: 'nd7-refl', label: 'Рефлексія' }] },
      ] },
      { title: 'Навчальне дослідження № 8. «Досліджуємо вуглекислий газ» (стор. 183–184)', topics: [
        { title: 'Підготовка до роботи', numbers: [{ file: 'nd8-meta', label: 'Мета' }, { file: 'nd8-ryzyky', label: 'Ризики' }, { file: 'nd8-pom-183', label: 'с. 183' }] },
        { title: 'Хід роботи та спостереження', numbers: [{ file: 'nd8-dosl-1', label: 'Пункт 1' }, { file: 'nd8-dosl-2', label: 'Пункт 2' }, { file: 'nd8-dosl-3', label: 'Пункт 3' }, { file: 'nd8-dosl-4', label: 'Пункт 4' }, { file: 'nd8-dosl-5', label: 'Пункт 5' }, { file: 'nd8-dosl-6', label: 'Пункт 6' }] },
        { title: 'Підбиття підсумків роботи', numbers: [{ file: 'nd8-vysnovok', label: 'Висновок' }] },
        { title: 'Рефлексуємо', collapsed: true, numbers: [{ file: 'nd8-refl', label: 'Рефлексія' }] },
      ] },
      { title: '§ 20. Чадний газ (стор. 185–192)', topics: [
        { title: 'Поміркуйте (запитання в параграфі)', collapsed: true, numbers: [{ file: 'pom-186', label: 'с. 186 (1)' }, { file: 'pom-186b', label: 'с. 186 (2)' }, { file: 'pom-186c', label: 'с. 186 (3)' }] },
        { title: 'Робота з інформацією', numbers: ['250', '251', '252', '253', '254', '255', '256', '257'] },
        { title: 'Розуміння явищ природи (робота в групах)', numbers: ['258', '259', '260'] },
      ] },
    ],
  },
];

export const exercisesCount = 403;

