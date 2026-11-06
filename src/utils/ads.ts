/*
  Реклама PubPower (кабинет: apps.pubpower.io → Setup → Supply, сайт halyavka.net, id 22860).

  Что где стоит:
  - Layout.astro — скрипты PubPower в <head>, расширенный CSP и липкий баннер (hv-sticky);
  - ExerciseGallery / ImageGallery — блок над кнопками вправ (hv-top) и под просмотрщиком (hv-answer).
  Всё рисуется только там, где adsAllowed(path) === true. На остальных страницах HTML
  остаётся байт в байт прежним: никаких новых классов Tailwind, <style> и бандл-скриптов —
  CSS рекламы инлайном в Layout и только на рекламных страницах.

  Выключить рекламу на всём сайте разом — ADS_ENABLED = false.
*/

export const ADS_ENABLED = true;

/** Ключ сайта в PubPower (тот же, что в ads.txt-менеджере и в скриптах из вкладки INTEGRATION). */
export const PUBPOWER_SITE = '3281dd10-9d37-4342-904b-5d852e222538';

/** Теги из вкладки AD TAG. */
export const AD_SLOTS = {
  /** Display, адаптивный горизонтальный — над кнопками вправ. */
  top: 'pw_51021',
  /** Display, 336x280 + 300x250 — под просмотрщиком ответа. */
  answer: 'pw_51020',
  /** Sticky banner: ПК — низ по центру 728x90/970x90, телефон — низ 320x50/300x50. */
  sticky: 'pw_51022',
} as const;

/*
  Страницы БЕЗ рекламы — идут SEO-замеры, любая правка вёрстки смазывает результат
  (см. CLAUDE.md). Снимать отсюда только после решения по соответствующему эксперименту.
*/
export const ADS_EXCLUDED: readonly string[] = [
  // Пилот купленных ссылок (решение ~конец ноября 2026). Со ссылками:
  '/5-klas/gdz-matematyka-ister/',
  '/7-klas/gdz-algebra-ister/',
  '/7-klas/gdz-ukr-mova-zabolotnyi/',
  // …контрольные:
  '/6-klas/gdz-matematyka-ister/',
  '/7-klas/gdz-geometry-ister/',

  // Тест crawlLinks (замер 09–12.11.2026). Тестовые:
  '/6-klas/gdz-matematyka-merzlyak/',
  '/7-klas/gdz-algebra-merzlyak/',
  '/6-klas/gdz-matematyka-tarasenkova/',
  '/6-klas/gdz-ukr-mova-zabolotnyi/',
  // …контрольные:
  '/5-klas/gdz-matematyka-merzlyak/',
  '/7-klas/gdz-geometry-merzlyak/',
  '/5-klas/gdz-matematyka-bevz/',
  '/9-klas/gdz-ukr-mova-zabolotnyi/',
];

const norm = (p: string) => {
  let s = (p || '/').split(/[?#]/)[0];
  if (!s.startsWith('/')) s = '/' + s;
  if (!s.endsWith('/')) s += '/';
  return s;
};

/** Можно ли показывать рекламу на странице с этим путём (Astro.url.pathname). */
export function adsAllowed(pathname: string): boolean {
  return ADS_ENABLED && !ADS_EXCLUDED.includes(norm(pathname));
}
