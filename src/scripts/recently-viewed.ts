/**
 * Модуль отслеживания недавно просмотренных страниц и упражнений.
 * 
 * Хранит массив посещений в localStorage.
 * Уникальность записи = url + exercise (если есть).
 * Одна и та же книга может иметь несколько записей — по разным упражнениям.
 *
 * В историю пишем ТОЛЬКО страницы ГДЗ (вида /N-klas/gdz-.../).
 * Страницы классов, главная и служебные страницы не трогаем —
 * их запись в историю не даёт пользы и создаёт мусор.
 */

export type ViewedItem = {
  url: string;
  title: string;
  exercise?: string;
  viewedAt: number;
};

/**
 * Номер вправи з #hash сторінки.
 *
 * Раніше тут стояло `/^\d+$/` + parseInt, тому книги з номерами виду 1.15, vprava-1-1,
 * dsr/dsr1-1 писалися в історію БЕЗ номера: плашка «Нещодавно переглянуті» показувала
 * лише назву книги й вела на її початок замість потрібної вправи.
 *
 * Беремо hash як рядок, але лише якщо на сторінці справді є така кнопка галереї
 * (нова `.ex-btn[data-num]` або стара `[data-image-id]`) — інакше в історію потрапляли б
 * службові якорі (#comments тощо).
 */
export function exerciseFromHash(): string | undefined {
  if (typeof document === 'undefined' || typeof window === 'undefined') return undefined;
  let raw: string;
  try {
    raw = decodeURIComponent((window.location.hash || '').replace('#', '')).trim();
  } catch {
    return undefined;
  }
  if (!raw || raw.includes('"') || raw.includes('\\')) return undefined;
  const found = document.querySelector(
    `.ex-btn[data-num="${raw}"], [data-image-id="${raw}"]`
  );
  return found ? raw : undefined;
}

const STORAGE_KEY = 'halyavka_recently_viewed';
const MAX_ITEMS = 15;

/**
 * Проверяет, является ли url страницей ГДЗ (вида /N-klas/gdz-что-то/).
 * Примеры:
 *   '/2-klas/gdz-matematyka-lystopad/' → true
 *   '/6-klas/gdz-matematyka-bevz-ch1/' → true
 *   '/2-klas/'                         → false
 *   '/'                                → false
 *   '/pro-nas/'                        → false
 */
function isGdzPage(url: string): boolean {
  return /^\/\d+-klas\/gdz-[^/]+\/?$/.test(url);
}

export function getViewed(): ViewedItem[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Ключ уникальности — учитывает url + exercise. */
function keyOf(item: Pick<ViewedItem, 'url' | 'exercise'>): string {
  return item.exercise ? `${item.url}#${item.exercise}` : item.url;
}

/**
 * Добавляет или обновляет запись.
 * Если такая же запись (url + exercise) уже есть — поднимает её наверх.
 * Не-ГДЗ страницы (классы, главная и т.д.) игнорируются — в историю не попадают.
 */
export function trackView(item: Omit<ViewedItem, 'viewedAt'>): void {
  if (typeof localStorage === 'undefined') return;

  // В историю пишем только страницы ГДЗ.
  // Всё остальное (страницы классов, главная, pro-nas и т.д.) — игнорируем.
  if (!isGdzPage(item.url)) return;

  try {
    const list = getViewed();
    const k = keyOf(item);

    // Убираем дубликат (если есть такой же url+exercise)
    const filtered = list.filter((v) => keyOf(v) !== k);

    // Добавляем новую запись в начало
    filtered.unshift({ ...item, viewedAt: Date.now() });

    const trimmed = filtered.slice(0, MAX_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    // silent
  }
}

/** Возвращает историю, исключая точно текущий url + exercise. */
export function getViewedExcept(
  currentUrl: string,
  currentExercise?: string
): ViewedItem[] {
  const currentKey = keyOf({ url: currentUrl, exercise: currentExercise });
  return getViewed().filter((v) => keyOf(v) !== currentKey);
}