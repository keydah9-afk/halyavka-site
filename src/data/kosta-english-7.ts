// Дані книги «Англійська мова (7-й рік навчання) — Prepare» —
// Джоанна Коста, Мелані Вільямс, Інна Скрипник (НУШ, Видавництво «Лінгвіст», Київ, 2024).
// Розв'язки оцифровані ПОСТОРІНКОВО: кнопка = номер сторінки підручника.
// Групування — за блоками ЗМІСТ (Units 1–4 … 17–20 + додатки); усередині — акордеон на
// кожен пункт ЗМІСТ (юніт / Culture / Life Skills / Review) зі стартовою сторінкою.
// Числа — реальні файли public/images/7-klas/gdz-english-kosta/<N>.webp (сверено: 0/0/0).

export const meta = {
  author: 'Дж. Коста, М. Вільямс, І. Скрипник',
  publisher: 'Лінгвіст',
  city: 'Київ',
  year: 2024,
  program: 'НУШ',
  grif: 'Рекомендовано Міністерством освіти і науки України',
  // Дата останньої зміни КОНТЕНТУ (додав/виправив картинки-розв'язки), не верстки.
  updatedAt: '2026-07-06',
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

export const sections: Section[] = [
  {
    rozdil: 'Units 1–4',
    paragraphs: [
      {
        title: '',
        topics: [
          { title: '1. It’s a challenge!', numbers: [10, 11, 12, 13] },
          { title: '2. Our changing planet', numbers: [14, 15, 16, 17] },
          { title: 'Culture: National parks in Ukraine', numbers: [18, 19] },
          { title: '3. On holiday', numbers: [20, 21, 22, 23] },
          { title: '4. My place', numbers: [24, 25, 26, 27] },
          { title: 'Life Skills: Critical thinking', numbers: [28, 29] },
          { title: 'Review 1', numbers: [30] },
        ],
      },
    ],
  },
  {
    rozdil: 'Units 5–8',
    paragraphs: [
      {
        title: '',
        topics: [
          { title: '5. School', numbers: [32, 33, 34, 35] },
          { title: '6. Favourite things', numbers: [36, 37, 38] },
          { title: 'Culture: Secondary school in the UK and Ukraine', numbers: [40, 41] },
          { title: '7. Adventure holidays', numbers: [42, 43, 44, 45] },
          { title: '8. Life in the future', numbers: [46, 47, 48] },
          { title: 'Life Skills: Communication', numbers: [50] },
          { title: 'Review 2', numbers: [52, 53] },
        ],
      },
    ],
  },
  {
    rozdil: 'Units 9–12',
    paragraphs: [
      {
        title: '',
        topics: [
          { title: '9. Sports, games and activities', numbers: [54, 55, 56, 57] },
          { title: '10. Useful websites', numbers: [59, 60, 61] },
          { title: 'Culture: Sport for everyone', numbers: [62, 63] },
          { title: '11. City living', numbers: [64, 65, 66, 67] },
          { title: '12. Films', numbers: [68, 69, 70, 71] },
          { title: 'Life Skills: Creativity and innovation', numbers: [72] },
          { title: 'Review 3', numbers: [74, 75] },
        ],
      },
    ],
  },
  {
    rozdil: 'Units 13–16',
    paragraphs: [
      {
        title: '',
        topics: [
          { title: '13. Life experiences', numbers: [76, 77, 78] },
          { title: '14. Spending money', numbers: [80, 81, 82, 83] },
          { title: 'Culture: Shopping and money', numbers: [84, 85] },
          { title: '15. Free time', numbers: [86, 87, 88, 89] },
          { title: '16. Languages of the world', numbers: [90, 91, 92, 93] },
          { title: 'Life Skills: Learning to learn', numbers: [94, 95] },
          { title: 'Review 4', numbers: [96, 97] },
        ],
      },
    ],
  },
  {
    rozdil: 'Units 17–20',
    paragraphs: [
      {
        title: '',
        topics: [
          { title: '17. Staying healthy', numbers: [98, 99, 100, 101] },
          { title: '18. From cover to cover', numbers: [102, 103, 104] },
          { title: 'Culture: Literary genres. Ukrainian classical writer', numbers: [106] },
          { title: '19. Different ingredients', numbers: [108, 109, 110, 111] },
          { title: '20. Life changes', numbers: [112, 113, 114, 115] },
          { title: 'Life Skills: Study skills', numbers: [116, 117] },
          { title: 'Review 5', numbers: [118, 119] },
        ],
      },
    ],
  },
  {
    rozdil: 'Мовні навички та додаткові матеріали',
    paragraphs: [
      {
        title: '',
        topics: [
          { title: 'Language skills', numbers: [122, 123, 124, 125, 133] },
          { title: 'Extra activities', numbers: [148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166] },
        ],
      },
    ],
  },
];

// Кількість оцифрованих сторінок (для факту в BookHero).
export const exercisesCount = sections
  .flatMap((s) => s.paragraphs.flatMap((p) => p.topics.flatMap((t) => t.numbers)))
  .length;
