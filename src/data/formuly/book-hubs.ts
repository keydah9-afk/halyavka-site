// Посилання з розділу «Формули» на хаби ГДЗ — зворотний бік FormulaHint.
//
// Таблиця «§ → тема» одна (book-links.ts). Тут — тільки адреса хаба кожної книги та її дані,
// щоб знайти першу вправу § і вести учня одразу до неї (#номер; Google хеш відкидає,
// тож вага йде самому хабу). Порядок книг — за попитом хаба (semrush/plan/HUBY-celi-ssylok.tsv).
//
// Додати книгу: рядок у book-links.ts + рядок тут. Книга без рядка тут — помилка білда.

import { bookFormulas, type BookKey } from "./book-links";
import { sections as ister5 } from "~/data/ister-5";
import { sections as ister6 } from "~/data/ister-matematyka-6";
import { sections as isterA7 } from "~/data/ister-algebra-7";
import { sections as isterG7 } from "~/data/ister-geometry-7";
import { sections as isterA8 } from "~/data/ister-algebra-8";
import { sections as isterG8 } from "~/data/ister-geometry-8";
import { sections as isterA9 } from "~/data/ister-algebra-9";
import { sections as isterG9 } from "~/data/ister-geometry-9";

// Типи даних у книг трохи різні (ExItem), тут потрібні лише заголовки блоків і перший номер.
interface Section {
  paragraphs: { topics: { title: string; numbers: readonly unknown[] }[] }[];
}

interface BookHub {
  url: string;
  /** Підпис посилання: «Алгебра 7 клас, Істер». */
  label: string;
  grade: number;
  sections: Section[];
}

// У порядку попиту: перша книга — найбільший хаб.
const hubs: Record<BookKey, BookHub> = {
  "ister-matematyka-5": {
    url: "/5-klas/gdz-matematyka-ister/",
    label: "Математика 5 клас, Істер",
    grade: 5,
    sections: ister5,
  },
  "ister-algebra-7": {
    url: "/7-klas/gdz-algebra-ister/",
    label: "Алгебра 7 клас, Істер",
    grade: 7,
    sections: isterA7,
  },
  "ister-matematyka-6": {
    url: "/6-klas/gdz-matematyka-ister/",
    label: "Математика 6 клас, Істер",
    grade: 6,
    sections: ister6,
  },
  "ister-geometry-7": {
    url: "/7-klas/gdz-geometry-ister/",
    label: "Геометрія 7 клас, Істер",
    grade: 7,
    sections: isterG7,
  },
  "ister-algebra-8": {
    url: "/8-klas/gdz-algebra-ister/",
    label: "Алгебра 8 клас, Істер",
    grade: 8,
    sections: isterA8,
  },
  "ister-geometry-8": {
    url: "/8-klas/gdz-geometry-ister/",
    label: "Геометрія 8 клас, Істер",
    grade: 8,
    sections: isterG8,
  },
  "ister-geometry-9": {
    url: "/9-klas/gdz-geometry-ister/",
    label: "Геометрія 9 клас, Істер",
    grade: 9,
    sections: isterG9,
  },
  "ister-algebra-9": {
    url: "/9-klas/gdz-algebra-ister/",
    label: "Алгебра 9 клас, Істер",
    grade: 9,
    sections: isterA9,
  },
};

const fileOf = (v: unknown): string =>
  v !== null && typeof v === "object"
    ? String((v as { file: unknown }).file)
    : String(v);

/** id першої вправи § n — з блоку, заголовок якого починається з «§ n». */
function firstExercise(sections: Section[], n: number): string | undefined {
  for (const s of sections)
    for (const p of s.paragraphs)
      for (const t of p.topics) {
        const m = t.title.match(/^\s*§\s*(\d+)\b/);
        if (m && Number(m[1]) === n && t.numbers.length > 0)
          return fileOf(t.numbers[0]);
      }
  return undefined;
}

export interface HubLink {
  url: string;
  label: string;
  grade: number;
  /** «§ 16–21» або «§ 1–3, 25–30». */
  paragraphs: string;
}

const books = Object.keys(hubs) as BookKey[];
for (const b of Object.keys(bookFormulas) as BookKey[]) {
  if (!hubs[b])
    throw new Error(
      `book-hubs: книги «${b}» з book-links.ts немає в book-hubs.ts`,
    );
}

/** Хаби, у яких є § до цієї теми, — у порядку попиту. */
export function hubsForTopic(slug: string): HubLink[] {
  const out: HubLink[] = [];
  for (const b of books) {
    const ranges = bookFormulas[b].filter((r) => r.slug === slug);
    if (ranges.length === 0) continue;
    const hub = hubs[b];
    const first = firstExercise(hub.sections, ranges[0].from);
    if (!first)
      throw new Error(`book-hubs: у «${b}» немає блоку «§ ${ranges[0].from}»`);
    const list = ranges
      .map((r) => (r.from === r.to ? `${r.from}` : `${r.from}–${r.to}`))
      .join(", ");
    out.push({
      url: `${hub.url}#${encodeURIComponent(first)}`,
      label: hub.label,
      grade: hub.grade,
      paragraphs: `§ ${list}`,
    });
  }
  return out;
}

/** Хаби класу, до яких є формули, — у порядку попиту. */
export function hubsForGrade(grade: number): { url: string; label: string }[] {
  return books
    .filter((b) => hubs[b].grade === grade)
    .map((b) => ({ url: hubs[b].url, label: hubs[b].label }));
}
