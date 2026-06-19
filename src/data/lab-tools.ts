// Реєстр інструментів Лабораторії (lab.halyavka.net).
// Копія реєстру з піддомену — основний сайт читає звідси на етапі білда,
// щоб показувати релевантні предмету тренажери/калькулятори.
// Тримати синхронізованим із піддоменом (або згенерувати спільний JSON).

export const LAB_BASE = 'https://lab.halyavka.net';

export type Category =
  | 'Математика'
  | 'Фізика'
  | 'Хімія'
  | 'Геометрія'
  | 'Українська мова'
  | 'Іноземні мови'
  | 'Універсальні'
  | 'Початкова школа';
export type ToolType = 'utility' | 'trainer';
export type ToolStatus = 'live' | 'soon';

export interface ToolMeta {
  slug: string;
  title: string;
  blurb: string;
  category: Category;
  type: ToolType;
  status: ToolStatus;
}

export const TOOLS: ToolMeta[] = [
  { slug: 'dodavannya-v-stovpchyk', title: 'Додавання в стовпчик', blurb: 'Тренажер додавання багатоцифрових чисел', category: 'Початкова школа', type: 'trainer', status: 'live' },
  { slug: 'vidnimannya-v-stovpchyk', title: 'Віднімання в стовпчик', blurb: 'Тренажер віднімання багатоцифрових чисел', category: 'Початкова школа', type: 'trainer', status: 'live' },
  { slug: 'mnozhennya-v-stovpchyk', title: 'Множення в стовпчик', blurb: 'Тренажер множення багатоцифрових чисел', category: 'Початкова школа', type: 'trainer', status: 'live' },
  { slug: 'dilennya-v-stovpchyk', title: 'Ділення в стовпчик', blurb: 'Тренажер ділення багатоцифрових чисел куточком', category: 'Початкова школа', type: 'trainer', status: 'live' },
  { slug: 'nsd-nsk', title: 'НСД і НСК', blurb: 'Найбільший спільний дільник і найменше спільне кратне', category: 'Математика', type: 'utility', status: 'live' },
  { slug: 'rozklad-na-mnozhnyky', title: 'Розкладання на множники', blurb: 'Розкладання чисел на прості множники (драбинкою)', category: 'Математика', type: 'utility', status: 'live' },
  { slug: 'stepeni', title: 'Степені', blurb: "Зведення числа у степінь (зокрема і від'ємний)", category: 'Математика', type: 'utility', status: 'live' },
  { slug: 'drobi', title: 'Дроби', blurb: 'Додавання, віднімання, множення та скорочення дробів', category: 'Математика', type: 'utility', status: 'live' },
  { slug: 'drobi-dodatkovo', title: 'Перетворення дробів', blurb: 'Скорочення дробів та перетворення мішаних і неправильних', category: 'Математика', type: 'utility', status: 'live' },
  { slug: 'proportsiyi', title: 'Пропорції', blurb: 'Знаходження невідомого члена пропорції (x) методом хрест-навхрест', category: 'Математика', type: 'utility', status: 'live' },
  { slug: 'vidsotky', title: 'Відсотки', blurb: 'Відсоток від числа, зміна у відсотках і навпаки', category: 'Математика', type: 'utility', status: 'live' },
  { slug: 'teorema-pifagora', title: 'Теорема Піфагора', blurb: 'Гіпотенуза та катети прямокутного трикутника', category: 'Математика', type: 'utility', status: 'live' },
  { slug: 'grafik-funkcii', title: 'Графік функції', blurb: 'Побудова графіків функцій онлайн', category: 'Математика', type: 'utility', status: 'live' },
  { slug: 'koordinatna-ploshchyna', title: 'Координатна площина', blurb: 'Тренажер: познач точку за заданими координатами', category: 'Математика', type: 'trainer', status: 'live' },
  { slug: 'rivnyannya-po-krokah', title: 'Рівняння по кроках', blurb: 'Тренажер розв’язування лінійних рівнянь', category: 'Математика', type: 'trainer', status: 'live' },
  { slug: 'zakon-oma', title: 'Закон Ома', blurb: 'Напруга, струм і опір', category: 'Фізика', type: 'utility', status: 'live' },
  { slug: 'konverter-odynyts', title: 'Конвертер одиниць', blurb: 'Переведення довжини, маси, об’єму та часу', category: 'Універсальні', type: 'utility', status: 'live' },
  { slug: 'molyarna-masa', title: 'Молярна маса', blurb: 'Обчислення молярної маси речовини за формулою', category: 'Хімія', type: 'utility', status: 'live' },
  { slug: 'masova-chastka-rozchynu', title: 'Масова частка розчину', blurb: 'Калькулятор масової частки з інтерактивною візуалізацією розчину', category: 'Хімія', type: 'utility', status: 'live' },
  { slug: 'naholosy', title: 'Наголоси', blurb: 'Тренажер наголосів: підготовка до НМТ/ЗНО', category: 'Українська мова', type: 'trainer', status: 'live' },
  { slug: 'synonimy', title: 'Синоніми', blurb: 'Тренажер синонімів: розширюй словниковий запас', category: 'Українська мова', type: 'trainer', status: 'live' },
  { slug: 'antonimy', title: 'Антоніми', blurb: 'Тренажер антонімів: шукай протилежні значення', category: 'Українська мова', type: 'trainer', status: 'live' },
  { slug: 'kalkulyator-progresiy', title: 'Калькулятор прогресій', blurb: 'Арифметична та геометрична прогресії', category: 'Математика', type: 'utility', status: 'live' },
  { slug: 'trenazher-drobi', title: 'Тренажер дробів', blurb: 'Практикуйся у розв’язанні прикладів із дробами', category: 'Математика', type: 'trainer', status: 'live' },
  { slug: 'kvadratni-rivnyannya', title: 'Квадратні рівняння', blurb: 'Розв’язання квадратних рівнянь через дискримінант', category: 'Математика', type: 'utility', status: 'live' },
  { slug: 'trenazher-nepravylni-diyeslova', title: 'Неправильні дієслова', blurb: 'Тренажер 2-ї та 3-ї форм англійських дієслів', category: 'Іноземні мови', type: 'trainer', status: 'live' },
  { slug: 'trenazher-khimichni-rivnyannya', title: 'Хімічні рівняння', blurb: 'Тренажер з розстановки коефіцієнтів у реакціях', category: 'Хімія', type: 'trainer', status: 'live' },
  { slug: 'trenazher-dodavannya-vidnimannya-drobiv', title: 'Додавання дробів (кроки)', blurb: 'Тренажер зведення до спільного знаменника та розрахунку', category: 'Математика', type: 'trainer', status: 'live' },
  { slug: 'trenazher-mnozhennya-dilennya-drobiv', title: 'Множення та ділення дробів', blurb: 'Покроковий тренажер множення і ділення звичайних дробів', category: 'Математика', type: 'trainer', status: 'live' },
  { slug: 'tablytsya-mendeleyeva', title: 'Таблиця Менделєєва', blurb: 'Інтерактивна таблиця хімічних елементів з ефектом лупи', category: 'Хімія', type: 'utility', status: 'live' },
  { slug: 'zakon-arkhimeda', title: 'Закон Архімеда', blurb: 'Калькулятор виштовхувальної сили з інтерактивною візуалізацією', category: 'Фізика', type: 'utility', status: 'live' },
  { slug: 'kalkulyator-ploshchi-figur', title: 'Калькулятор площі фігур', blurb: 'Площа квадрата, прямокутника, трикутника, кола та трапеції з візуалізацією', category: 'Геометрія', type: 'utility', status: 'live' },
  { slug: 'kalkulyator-trykutnyka', title: 'Калькулятор трикутника', blurb: 'Розрахунок властивостей трикутника за 3 сторонами', category: 'Геометрія', type: 'utility', status: 'live' },
  { slug: 'generator-vypadkovykh-chysel', title: 'Генератор випадкових чисел', blurb: 'Генерація чисел у заданому діапазоні та рандомайзер', category: 'Універсальні', type: 'utility', status: 'live' },
  { slug: 'analizator-tekstu', title: 'Текстовий аналізатор', blurb: 'Підрахунок слів, символів, речень та часу читання', category: 'Універсальні', type: 'utility', status: 'live' },
  { slug: 'rozbir-slova-za-budovoyu', title: 'Розбір слова за будовою', blurb: 'Тренажер морфемного розбору слова (корінь, префікс, суфікс)', category: 'Українська мова', type: 'trainer', status: 'live' },
  { slug: 'lichba-v-umi', title: 'Лічба в умі', blurb: 'Тренажер швидкісного рахунку: + − × ÷', category: 'Початкова школа', type: 'trainer', status: 'live' },
  { slug: 'trenazher-tablytsya-mnozhennya', title: 'Таблиця множення', blurb: 'Інтерактивний тренажер таблиці множення', category: 'Початкова школа', type: 'trainer', status: 'live' },
  { slug: 'kalkulyator-tsylindra', title: 'Калькулятор циліндра', blurb: "Об'єм, площа поверхні та параметри циліндра", category: 'Геометрія', type: 'utility', status: 'live' },
  { slug: 'okruglennya-chysel', title: 'Округлення чисел', blurb: 'Калькулятор округлення дробів та цілих чисел з поясненням', category: 'Математика', type: 'utility', status: 'live' },
  { slug: 'trenazher-okruglennya-chysel', title: 'Округлення чисел (тренажер)', blurb: 'Перевірка навичок округлення до заданого розряду', category: 'Математика', type: 'trainer', status: 'live' },
  { slug: 'chastota-i-period', title: 'Частота і період', blurb: 'Калькулятор частоти і періоду коливань з анімацією', category: 'Фізика', type: 'utility', status: 'live' },
  { slug: 'shvydkist-shlyah-chas', title: 'Швидкість, шлях, час', blurb: 'Розрахунок швидкості, шляху або часу з анімацією руху', category: 'Фізика', type: 'utility', status: 'live' },
];

// Який предмет книги → які категорії інструментів показувати.
const SUBJECT_CATEGORIES: Record<string, Category[]> = {
  Математика: ['Математика', 'Геометрія'],
  Алгебра: ['Математика'],
  Геометрія: ['Геометрія', 'Математика'],
  Фізика: ['Фізика', 'Універсальні'],
  Хімія: ['Хімія'],
  'Українська мова': ['Українська мова'],
  'Англійська мова': ['Іноземні мови'],
  'Іноземні мови': ['Іноземні мови'],
};

export function getToolsForSubject(subject: string): ToolMeta[] {
  const cats = SUBJECT_CATEGORIES[subject] ?? [];
  return TOOLS.filter((t) => t.status === 'live' && cats.includes(t.category));
}
