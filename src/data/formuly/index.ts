// Розділ «Формули» (/formuly/): усі теми, порядок на хабі, сторінки класів.
// Додати тему — дописати об'єкт у файл свого розділу; сторінка, картка на хабі,
// сторінки класів і sitemap з'являться самі. Білд падає, якщо related вказує на
// неіснуючий slug або slug-и повторюються.

import type { Topic, Subject } from './types';
import { arithmeticTopics } from './arithmetic';
import { algebra79Topics } from './algebra-7-9';
import { algebra1011Topics } from './algebra-10-11';
import { planimetryTopics } from './planimetry';
import { stereometryTopics } from './stereometry';

export type { Topic, Subject, Formula, Group, Example } from './types';

export const topics: Topic[] = [
  ...arithmeticTopics,
  ...algebra79Topics,
  ...algebra1011Topics,
  ...planimetryTopics,
  ...stereometryTopics,
];

export const SUBJECTS: Subject[] = ['Арифметика', 'Алгебра', 'Геометрія'];
export const GRADES = [5, 6, 7, 8, 9, 10, 11] as const;

const bySlug = new Map<string, Topic>();
for (const t of topics) {
  if (bySlug.has(t.slug)) throw new Error(`formuly: slug «${t.slug}» повторюється`);
  bySlug.set(t.slug, t);
}
for (const t of topics) {
  for (const rel of t.related) {
    if (!bySlug.has(rel)) throw new Error(`formuly: у темі «${t.slug}» related → «${rel}» не існує`);
  }
}

export const getTopic = (slug: string): Topic | undefined => bySlug.get(slug);
export const topicUrl = (slug: string): string => `/formuly/${slug}/`;
export const gradeUrl = (grade: number): string => `/formuly/${grade}-klas/`;
export const topicsOfGrade = (grade: number): Topic[] => topics.filter((t) => t.grades.includes(grade));
export const formulasCount = (t: Topic): number => t.groups.reduce((n, g) => n + g.formulas.length, 0);
export const totalFormulas: number = topics.reduce((n, t) => n + formulasCount(t), 0);

/** Що вивчають у класі — для заголовків сторінок класів. */
export const gradeSubjects = (grade: number): string => (grade <= 6 ? 'математика' : 'алгебра і геометрія');
