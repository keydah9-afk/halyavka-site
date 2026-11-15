// Розділ «Формули»: типи даних. Формули пишемо в TeX (рендерить KaTeX під час білда,
// у браузері жодного скрипту для цього немає). У текстових полях (note, intro, task,
// solution, mistakes) математика — між знаками долара: 'при $a \\ne 0$'.

export type Subject = 'Арифметика' | 'Алгебра' | 'Геометрія';

export interface Formula {
  /** Назва формули — те, що учень згадує в режимі «Перевір себе». */
  name: string;
  /** Рядки формули; кожен рядок — окремий виключний (display) вираз TeX. */
  tex: string[];
  /** Пояснення: що означають букви, коли формула працює. */
  note?: string;
}

export interface Group {
  title: string;
  formulas: Formula[];
}

export interface Example {
  task: string;
  solution: string[];
}

export interface Topic {
  slug: string;
  /** H1 і основа title: «Формули скороченого множення». */
  title: string;
  /** Короткий підпис для карток і посилань з ГДЗ. */
  short: string;
  description: string;
  subject: Subject;
  grades: number[];
  intro: string;
  /** Ключ рисунка з figures.ts (необов'язково). */
  figure?: string;
  groups: Group[];
  examples: Example[];
  mistakes?: string[];
  related: string[];
  /** Додаткові слова для пошуку на хабі (синоніми, скорочення). */
  keywords?: string;
}
