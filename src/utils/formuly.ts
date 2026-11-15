// Рендер формул розділу /formuly/: TeX → HTML під час білда (KaTeX), без скриптів у браузері.
import katex from 'katex';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Окремий рядок формули (display). Помилка в TeX валить білд — так і треба. */
export function texBlock(src: string): string {
  return katex.renderToString(src, { displayMode: true, throwOnError: true, strict: 'ignore', output: 'htmlAndMathml' });
}

/** Формула всередині тексту. */
export function texInline(src: string): string {
  return katex.renderToString(src, { displayMode: false, throwOnError: true, strict: 'ignore', output: 'htmlAndMathml' });
}

/** Текст із математикою між знаками долара: 'при $a \\ne 0$' → HTML. */
export function rich(text: string): string {
  const parts = text.split('$');
  if (parts.length % 2 === 0) throw new Error(`formuly: непарна кількість $ у тексті: ${text}`);
  return parts.map((p, i) => (i % 2 === 1 ? texInline(p) : esc(p))).join('');
}

/** Той самий текст без розмітки — для meta і пошуку. */
export function plain(text: string): string {
  return text
    .replace(/\$[^$]*\$/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
