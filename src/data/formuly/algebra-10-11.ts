import type { Topic } from './types';

const r = String.raw;

export const algebra1011Topics: Topic[] = [
  {
    slug: 'tryhonometriia',
    title: 'Тригонометричні формули',
    short: 'Тригонометричні формули',
    description:
      'Усі тригонометричні формули: основна тотожність, таблиця значень, формули зведення, додавання, подвійного і половинного кута, перетворення суми в добуток і добутку в суму.',
    subject: 'Алгебра',
    grades: [9, 10],
    intro:
      'Майже всі тригонометричні формули виводяться з основної тотожності $\\sin^2\\alpha + \\cos^2\\alpha = 1$ і формул додавання. Тут вони зібрані в тому порядку, у якому вивчаються.',
    groups: [
      {
        title: 'Радіани і градуси',
        formulas: [
          {
            name: 'Перехід між градусами і радіанами',
            tex: [r`180^\circ = \pi \text{ рад}`, r`\alpha_{\text{рад}} = \frac{\pi \cdot \alpha^\circ}{180^\circ}, \qquad \alpha^\circ = \frac{180^\circ \cdot \alpha_{\text{рад}}}{\pi}`],
            note: '$30^\\circ = \\frac{\\pi}{6}$, $\\;45^\\circ = \\frac{\\pi}{4}$, $\\;60^\\circ = \\frac{\\pi}{3}$, $\\;90^\\circ = \\frac{\\pi}{2}$.',
          },
        ],
      },
      {
        title: 'Таблиця значень',
        formulas: [
          {
            name: 'Значення для основних кутів',
            tex: [
              r`\begin{array}{c|ccccc} \alpha & 0^\circ & 30^\circ & 45^\circ & 60^\circ & 90^\circ \\ \hline \sin\alpha & 0 & \frac{1}{2} & \frac{\sqrt{2}}{2} & \frac{\sqrt{3}}{2} & 1 \\[4pt] \cos\alpha & 1 & \frac{\sqrt{3}}{2} & \frac{\sqrt{2}}{2} & \frac{1}{2} & 0 \\[4pt] \operatorname{tg}\alpha & 0 & \frac{\sqrt{3}}{3} & 1 & \sqrt{3} & - \\[4pt] \operatorname{ctg}\alpha & - & \sqrt{3} & 1 & \frac{\sqrt{3}}{3} & 0 \end{array}`,
            ],
            note: 'Риска означає, що значення не існує. Значення для $30^\\circ$ і $60^\\circ$ міняються місцями.',
          },
          {
            name: 'Знаки за чвертями',
            tex: [r`\sin\alpha > 0 \text{ у I і II чвертях}`, r`\cos\alpha > 0 \text{ у I і IV чвертях}`, r`\operatorname{tg}\alpha > 0, \ \operatorname{ctg}\alpha > 0 \text{ у I і III чвертях}`],
          },
        ],
      },
      {
        title: 'Основні тотожності',
        formulas: [
          { name: 'Основна тригонометрична тотожність', tex: [r`\sin^2\alpha + \cos^2\alpha = 1`] },
          { name: 'Тангенс і котангенс', tex: [r`\operatorname{tg}\alpha = \frac{\sin\alpha}{\cos\alpha}, \qquad \operatorname{ctg}\alpha = \frac{\cos\alpha}{\sin\alpha}`, r`\operatorname{tg}\alpha \cdot \operatorname{ctg}\alpha = 1`] },
          { name: 'Зв’язок тангенса з косинусом', tex: [r`1 + \operatorname{tg}^2\alpha = \frac{1}{\cos^2\alpha}`] },
          { name: 'Зв’язок котангенса із синусом', tex: [r`1 + \operatorname{ctg}^2\alpha = \frac{1}{\sin^2\alpha}`] },
          {
            name: 'Парність',
            tex: [r`\cos(-\alpha) = \cos\alpha, \qquad \sin(-\alpha) = -\sin\alpha`, r`\operatorname{tg}(-\alpha) = -\operatorname{tg}\alpha, \qquad \operatorname{ctg}(-\alpha) = -\operatorname{ctg}\alpha`],
            note: 'Косинус — парна функція, решта — непарні.',
          },
          {
            name: 'Періодичність',
            tex: [r`\sin(\alpha + 2\pi) = \sin\alpha, \qquad \cos(\alpha + 2\pi) = \cos\alpha`, r`\operatorname{tg}(\alpha + \pi) = \operatorname{tg}\alpha, \qquad \operatorname{ctg}(\alpha + \pi) = \operatorname{ctg}\alpha`],
            note: 'Найменший додатний період функцій $\\sin kx$ і $\\cos kx$ дорівнює $\\frac{2\\pi}{|k|}$, функцій $\\operatorname{tg} kx$ і $\\operatorname{ctg} kx$ — $\\frac{\\pi}{|k|}$.',
          },
        ],
      },
      {
        title: 'Формули зведення',
        formulas: [
          {
            name: 'Кути π/2 ± α',
            tex: [r`\sin\left(\frac{\pi}{2} \pm \alpha\right) = \cos\alpha`, r`\cos\left(\frac{\pi}{2} - \alpha\right) = \sin\alpha, \qquad \cos\left(\frac{\pi}{2} + \alpha\right) = -\sin\alpha`],
          },
          {
            name: 'Кути π ± α',
            tex: [r`\sin(\pi - \alpha) = \sin\alpha, \qquad \sin(\pi + \alpha) = -\sin\alpha`, r`\cos(\pi \pm \alpha) = -\cos\alpha, \qquad \operatorname{tg}(\pi \pm \alpha) = \pm\operatorname{tg}\alpha`],
          },
          {
            name: 'Правило формул зведення',
            tex: [r`\frac{\pi}{2} \pm \alpha, \ \frac{3\pi}{2} \pm \alpha: \ \text{назва змінюється}`, r`\pi \pm \alpha, \ 2\pi \pm \alpha: \ \text{назва не змінюється}`],
            note: 'Знак результату — такий, який має початкова функція у відповідній чверті, якщо вважати кут $\\alpha$ гострим.',
          },
        ],
      },
      {
        title: 'Формули додавання',
        formulas: [
          { name: 'Синус суми і різниці', tex: [r`\sin(\alpha \pm \beta) = \sin\alpha\cos\beta \pm \cos\alpha\sin\beta`] },
          { name: 'Косинус суми і різниці', tex: [r`\cos(\alpha \pm \beta) = \cos\alpha\cos\beta \mp \sin\alpha\sin\beta`] },
          { name: 'Тангенс суми і різниці', tex: [r`\operatorname{tg}(\alpha \pm \beta) = \frac{\operatorname{tg}\alpha \pm \operatorname{tg}\beta}{1 \mp \operatorname{tg}\alpha\operatorname{tg}\beta}`] },
        ],
      },
      {
        title: 'Подвійний і половинний кут',
        formulas: [
          { name: 'Синус подвійного кута', tex: [r`\sin 2\alpha = 2\sin\alpha\cos\alpha`] },
          { name: 'Косинус подвійного кута', tex: [r`\cos 2\alpha = \cos^2\alpha - \sin^2\alpha`, r`\cos 2\alpha = 2\cos^2\alpha - 1 = 1 - 2\sin^2\alpha`] },
          { name: 'Тангенс подвійного кута', tex: [r`\operatorname{tg} 2\alpha = \frac{2\operatorname{tg}\alpha}{1 - \operatorname{tg}^2\alpha}`] },
          {
            name: 'Формули пониження степеня',
            tex: [r`\sin^2\alpha = \frac{1 - \cos 2\alpha}{2}, \qquad \cos^2\alpha = \frac{1 + \cos 2\alpha}{2}`],
          },
        ],
      },
      {
        title: 'Сума в добуток і добуток у суму',
        formulas: [
          { name: 'Сума синусів', tex: [r`\sin\alpha + \sin\beta = 2\sin\frac{\alpha + \beta}{2}\cos\frac{\alpha - \beta}{2}`] },
          { name: 'Різниця синусів', tex: [r`\sin\alpha - \sin\beta = 2\sin\frac{\alpha - \beta}{2}\cos\frac{\alpha + \beta}{2}`] },
          { name: 'Сума косинусів', tex: [r`\cos\alpha + \cos\beta = 2\cos\frac{\alpha + \beta}{2}\cos\frac{\alpha - \beta}{2}`] },
          { name: 'Різниця косинусів', tex: [r`\cos\alpha - \cos\beta = -2\sin\frac{\alpha + \beta}{2}\sin\frac{\alpha - \beta}{2}`] },
          {
            name: 'Добуток у суму',
            tex: [
              r`\sin\alpha\cos\beta = \tfrac{1}{2}\big(\sin(\alpha + \beta) + \sin(\alpha - \beta)\big)`,
              r`\cos\alpha\cos\beta = \tfrac{1}{2}\big(\cos(\alpha - \beta) + \cos(\alpha + \beta)\big)`,
              r`\sin\alpha\sin\beta = \tfrac{1}{2}\big(\cos(\alpha - \beta) - \cos(\alpha + \beta)\big)`,
            ],
          },
          {
            name: 'Допоміжний кут',
            tex: [r`a\sin x + b\cos x = \sqrt{a^2 + b^2}\,\sin(x + \varphi)`],
            note: 'Кут $\\varphi$ визначається з умов $\\cos\\varphi = \\frac{a}{\\sqrt{a^2 + b^2}}$, $\\;\\sin\\varphi = \\frac{b}{\\sqrt{a^2 + b^2}}$.',
          },
        ],
      },
    ],
    examples: [
      {
        task: 'Знайдіть $\\cos\\alpha$, якщо $\\sin\\alpha = 0{,}6$ і $\\frac{\\pi}{2} < \\alpha < \\pi$.',
        solution: [
          '$\\cos^2\\alpha = 1 - \\sin^2\\alpha = 1 - 0{,}36 = 0{,}64$.',
          'У II чверті косинус від’ємний, тому $\\cos\\alpha = -0{,}8$.',
        ],
      },
      {
        task: 'Спростіть: $\\sin(\\pi - \\alpha) \\cdot \\cos\\left(\\frac{\\pi}{2} - \\alpha\\right) + \\cos^2\\alpha$.',
        solution: ['$\\sin\\alpha \\cdot \\sin\\alpha + \\cos^2\\alpha = \\sin^2\\alpha + \\cos^2\\alpha = 1$.'],
      },
      {
        task: 'Обчисліть: $\\sin 15^\\circ \\cos 15^\\circ$.',
        solution: ['$\\sin 15^\\circ\\cos 15^\\circ = \\frac{1}{2}\\sin 30^\\circ = \\frac{1}{2} \\cdot \\frac{1}{2} = \\frac{1}{4}$.'],
      },
    ],
    mistakes: [
      '$\\sin 2\\alpha \\ne 2\\sin\\alpha$ і $\\sin(\\alpha + \\beta) \\ne \\sin\\alpha + \\sin\\beta$.',
      'Знаходячи синус за косинусом (або навпаки), обов’язково визначайте знак за чвертю.',
      'У косинусі суми знак протилежний: $\\cos(\\alpha + \\beta) = \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta$.',
    ],
    related: ['tryhonometrychni-rivniannia', 'priamokutnyi-trykutnyk', 'teorema-synusiv-i-kosynusiv', 'pokhidna'],
    keywords: 'синус косинус тангенс котангенс формули зведення подвійний кут тотожності радіани',
  },
  {
    slug: 'tryhonometrychni-rivniannia',
    title: 'Тригонометричні рівняння: формули розв’язків',
    short: 'Тригонометричні рівняння',
    description:
      'Формули коренів найпростіших тригонометричних рівнянь sin x = a, cos x = a, tg x = a, ctg x = a, частинні випадки, означення арксинуса, арккосинуса та арктангенса.',
    subject: 'Алгебра',
    grades: [10],
    intro:
      'Будь-яке тригонометричне рівняння зводять до одного з найпростіших: $\\sin x = a$, $\\cos x = a$, $\\operatorname{tg} x = a$ або $\\operatorname{ctg} x = a$. У всіх формулах $k \\in \\mathbb{Z}$.',
    groups: [
      {
        title: 'Обернені тригонометричні функції',
        formulas: [
          {
            name: 'Арксинус',
            tex: [r`\arcsin a = \alpha \;\Longleftrightarrow\; \sin\alpha = a, \quad -\frac{\pi}{2} \le \alpha \le \frac{\pi}{2}`],
            note: 'Існує при $|a| \\le 1$. $\\arcsin(-a) = -\\arcsin a$.',
          },
          {
            name: 'Арккосинус',
            tex: [r`\arccos a = \alpha \;\Longleftrightarrow\; \cos\alpha = a, \quad 0 \le \alpha \le \pi`],
            note: 'Існує при $|a| \\le 1$. $\\arccos(-a) = \\pi - \\arccos a$.',
          },
          {
            name: 'Арктангенс',
            tex: [r`\operatorname{arctg} a = \alpha \;\Longleftrightarrow\; \operatorname{tg}\alpha = a, \quad -\frac{\pi}{2} < \alpha < \frac{\pi}{2}`],
            note: 'Існує при будь-якому $a$. $\\operatorname{arctg}(-a) = -\\operatorname{arctg} a$.',
          },
          {
            name: 'Арккотангенс',
            tex: [r`\operatorname{arcctg} a = \alpha \;\Longleftrightarrow\; \operatorname{ctg}\alpha = a, \quad 0 < \alpha < \pi`],
            note: '$\\operatorname{arcctg}(-a) = \\pi - \\operatorname{arcctg} a$.',
          },
        ],
      },
      {
        title: 'Найпростіші рівняння',
        formulas: [
          {
            name: 'sin x = a',
            tex: [r`x = (-1)^k \arcsin a + \pi k, \qquad |a| \le 1`],
            note: 'При $|a| > 1$ коренів немає.',
          },
          {
            name: 'cos x = a',
            tex: [r`x = \pm\arccos a + 2\pi k, \qquad |a| \le 1`],
            note: 'При $|a| > 1$ коренів немає.',
          },
          { name: 'tg x = a', tex: [r`x = \operatorname{arctg} a + \pi k`] },
          { name: 'ctg x = a', tex: [r`x = \operatorname{arcctg} a + \pi k`] },
        ],
      },
      {
        title: 'Частинні випадки',
        formulas: [
          {
            name: 'Синус',
            tex: [r`\sin x = 0 \Rightarrow x = \pi k`, r`\sin x = 1 \Rightarrow x = \frac{\pi}{2} + 2\pi k`, r`\sin x = -1 \Rightarrow x = -\frac{\pi}{2} + 2\pi k`],
          },
          {
            name: 'Косинус',
            tex: [r`\cos x = 0 \Rightarrow x = \frac{\pi}{2} + \pi k`, r`\cos x = 1 \Rightarrow x = 2\pi k`, r`\cos x = -1 \Rightarrow x = \pi + 2\pi k`],
          },
          { name: 'Тангенс', tex: [r`\operatorname{tg} x = 0 \Rightarrow x = \pi k`] },
        ],
      },
      {
        title: 'Основні типи рівнянь',
        formulas: [
          {
            name: 'Зведення до квадратного',
            tex: [r`a\sin^2 x + b\sin x + c = 0, \qquad t = \sin x, \quad |t| \le 1`],
          },
          {
            name: 'Однорідне рівняння першого степеня',
            tex: [r`a\sin x + b\cos x = 0 \;\Rightarrow\; \operatorname{tg} x = -\frac{b}{a}`],
            note: 'Ділимо обидві частини на $\\cos x \\ne 0$.',
          },
          {
            name: 'Однорідне рівняння другого степеня',
            tex: [r`a\sin^2 x + b\sin x\cos x + c\cos^2 x = 0`, r`\Rightarrow\; a\operatorname{tg}^2 x + b\operatorname{tg} x + c = 0`],
            note: 'Ділимо на $\\cos^2 x \\ne 0$.',
          },
        ],
      },
    ],
    examples: [
      {
        task: 'Розв’яжіть рівняння: $\\cos x = \\dfrac{1}{2}$.',
        solution: ['$x = \\pm\\arccos\\dfrac{1}{2} + 2\\pi k = \\pm\\dfrac{\\pi}{3} + 2\\pi k$, $\\;k \\in \\mathbb{Z}$.'],
      },
      {
        task: 'Розв’яжіть рівняння: $2\\sin^2 x - \\sin x - 1 = 0$.',
        solution: [
          'Нехай $t = \\sin x$: $\\;2t^2 - t - 1 = 0$, звідки $t_1 = 1$, $t_2 = -\\dfrac{1}{2}$.',
          '$\\sin x = 1$: $\\;x = \\dfrac{\\pi}{2} + 2\\pi k$.',
          '$\\sin x = -\\dfrac{1}{2}$: $\\;x = (-1)^{k+1}\\dfrac{\\pi}{6} + \\pi k$, $\\;k \\in \\mathbb{Z}$.',
        ],
      },
    ],
    mistakes: [
      'У формулі для синуса період $\\pi k$, а для косинуса — $2\\pi k$. Не плутайте.',
      'Рівняння $\\sin x = 2$ і $\\cos x = -1{,}5$ коренів не мають.',
      'Не можна скорочувати рівняння на $\\sin x$ або $\\cos x$ — так губляться корені. Виносьте спільний множник за дужки.',
    ],
    related: ['tryhonometriia', 'kvadratni-rivniannia'],
    keywords: 'арксинус арккосинус арктангенс найпростіші тригонометричні рівняння однорідне',
  },
  {
    slug: 'pokhidna',
    title: 'Похідна: таблиця похідних і правила диференціювання',
    short: 'Похідна',
    description:
      'Таблиця похідних, правила диференціювання суми, добутку, частки і складеної функції, рівняння дотичної, фізичний зміст похідної, зростання, спадання та екстремуми функції.',
    subject: 'Алгебра',
    grades: [10, 11],
    intro:
      'Похідна показує швидкість зміни функції. Геометрично це кутовий коефіцієнт дотичної до графіка, фізично — миттєва швидкість.',
    groups: [
      {
        title: 'Означення і зміст',
        formulas: [
          { name: 'Означення похідної', tex: [r`f'(x_0) = \lim_{\Delta x \to 0} \frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x}`] },
          {
            name: 'Геометричний зміст',
            tex: [r`k = \operatorname{tg}\alpha = f'(x_0)`],
            note: '$k$ — кутовий коефіцієнт дотичної до графіка в точці з абсцисою $x_0$, $\\alpha$ — кут нахилу дотичної до осі $Ox$.',
          },
          { name: 'Рівняння дотичної', tex: [r`y = f(x_0) + f'(x_0)(x - x_0)`] },
          {
            name: 'Фізичний зміст',
            tex: [r`v(t) = s'(t), \qquad a(t) = v'(t) = s''(t)`],
            note: 'Швидкість — похідна від шляху, прискорення — похідна від швидкості.',
          },
        ],
      },
      {
        title: 'Таблиця похідних',
        formulas: [
          { name: 'Стала і змінна', tex: [r`(C)' = 0, \qquad (x)' = 1`] },
          { name: 'Степенева функція', tex: [r`(x^n)' = n x^{n-1}`] },
          { name: 'Корінь і обернена величина', tex: [r`(\sqrt{x})' = \frac{1}{2\sqrt{x}}, \qquad \left(\frac{1}{x}\right)' = -\frac{1}{x^2}`] },
          { name: 'Синус і косинус', tex: [r`(\sin x)' = \cos x, \qquad (\cos x)' = -\sin x`] },
          { name: 'Тангенс і котангенс', tex: [r`(\operatorname{tg} x)' = \frac{1}{\cos^2 x}, \qquad (\operatorname{ctg} x)' = -\frac{1}{\sin^2 x}`] },
          { name: 'Показникова функція (11 клас)', tex: [r`(e^x)' = e^x, \qquad (a^x)' = a^x \ln a`] },
          { name: 'Логарифмічна функція (11 клас)', tex: [r`(\ln x)' = \frac{1}{x}, \qquad (\log_a x)' = \frac{1}{x \ln a}`] },
        ],
      },
      {
        title: 'Правила диференціювання',
        formulas: [
          { name: 'Сталий множник', tex: [r`(C \cdot u)' = C \cdot u'`] },
          { name: 'Сума і різниця', tex: [r`(u \pm v)' = u' \pm v'`] },
          { name: 'Добуток', tex: [r`(u \cdot v)' = u'v + uv'`] },
          { name: 'Частка', tex: [r`\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}, \qquad v \ne 0`] },
          {
            name: 'Складена функція',
            tex: [r`\big(f(g(x))\big)' = f'(g(x)) \cdot g'(x)`],
            note: 'Зокрема $\\big(f(kx + b)\\big)\' = k \\cdot f\'(kx + b)$.',
          },
        ],
      },
      {
        title: 'Дослідження функції',
        formulas: [
          {
            name: 'Зростання і спадання',
            tex: [r`f'(x) > 0 \;\Rightarrow\; f \text{ зростає}`, r`f'(x) < 0 \;\Rightarrow\; f \text{ спадає}`],
          },
          {
            name: 'Критичні точки',
            tex: [r`f'(x_0) = 0 \ \text{ або } \ f'(x_0) \text{ не існує}`],
          },
          {
            name: 'Точки екстремуму',
            tex: [r`f' \text{ змінює знак з } + \text{ на } - \;\Rightarrow\; x_{\max}`, r`f' \text{ змінює знак з } - \text{ на } + \;\Rightarrow\; x_{\min}`],
          },
          {
            name: 'Найбільше і найменше значення на відрізку',
            tex: [r`\max_{[a;\,b]} f(x), \qquad \min_{[a;\,b]} f(x)`],
            note: 'Обчислюємо значення функції на кінцях відрізка $f(a)$, $f(b)$ і в критичних точках, що належать відрізку, та вибираємо найбільше й найменше.',
          },
        ],
      },
    ],
    examples: [
      {
        task: 'Знайдіть похідну функції $f(x) = 3x^4 - 5x^2 + 7x - 2$.',
        solution: ['$f\'(x) = 12x^3 - 10x + 7$.'],
      },
      {
        task: 'Складіть рівняння дотичної до графіка $f(x) = x^2$ у точці $x_0 = 3$.',
        solution: ['$f(3) = 9$, $\\;f\'(x) = 2x$, $\\;f\'(3) = 6$.', '$y = 9 + 6(x - 3) = 6x - 9$.'],
      },
      {
        task: 'Знайдіть точки екстремуму функції $f(x) = x^3 - 3x$.',
        solution: [
          '$f\'(x) = 3x^2 - 3 = 3(x - 1)(x + 1)$; критичні точки: $-1$ і $1$.',
          'Знаки похідної: $+$ при $x < -1$, $-$ на $(-1;\\, 1)$, $+$ при $x > 1$.',
          '$x_{\\max} = -1$, $\\;x_{\\min} = 1$.',
        ],
      },
    ],
    mistakes: [
      'Похідна добутку — не добуток похідних: $(uv)\' \\ne u\'v\'$.',
      'Для складеної функції не забувайте множник — похідну внутрішньої функції: $(\\sin 3x)\' = 3\\cos 3x$.',
      'Рівність $f\'(x_0) = 0$ ще не означає екстремум: у функції $y = x^3$ у точці 0 екстремуму немає.',
    ],
    related: ['intehral-pervisna', 'funktsii-ta-hrafiky', 'tryhonometriia', 'loharyfmy'],
    keywords: 'таблиця похідних дотична екстремум диференціювання швидкість',
  },
  {
    slug: 'loharyfmy',
    title: 'Логарифми: формули і властивості',
    short: 'Логарифми',
    description:
      'Означення логарифма, основна логарифмічна тотожність, логарифм добутку, частки і степеня, формула переходу до іншої основи, показникові та логарифмічні рівняння і нерівності.',
    subject: 'Алгебра',
    grades: [11],
    intro:
      'Логарифм $\\log_a b$ — це показник степеня, до якого треба піднести основу $a$, щоб отримати $b$. Усюди нижче $a > 0$, $a \\ne 1$, а числа під знаком логарифма додатні.',
    groups: [
      {
        title: 'Означення',
        formulas: [
          { name: 'Означення логарифма', tex: [r`\log_a b = c \;\Longleftrightarrow\; a^c = b, \qquad a > 0, \ a \ne 1, \ b > 0`] },
          { name: 'Основна логарифмічна тотожність', tex: [r`a^{\log_a b} = b`] },
          { name: 'Окремі значення', tex: [r`\log_a 1 = 0, \qquad \log_a a = 1, \qquad \log_a a^p = p`] },
          {
            name: 'Десятковий і натуральний логарифми',
            tex: [r`\lg b = \log_{10} b, \qquad \ln b = \log_e b, \quad e \approx 2{,}718`],
          },
        ],
      },
      {
        title: 'Властивості логарифмів',
        formulas: [
          { name: 'Логарифм добутку', tex: [r`\log_a (xy) = \log_a x + \log_a y`] },
          { name: 'Логарифм частки', tex: [r`\log_a \frac{x}{y} = \log_a x - \log_a y`] },
          { name: 'Логарифм степеня', tex: [r`\log_a b^p = p \log_a b`] },
          { name: 'Степінь в основі', tex: [r`\log_{a^k} b = \frac{1}{k}\log_a b, \qquad k \ne 0`] },
          { name: 'Перехід до іншої основи', tex: [r`\log_a b = \frac{\log_c b}{\log_c a}`] },
          { name: 'Обернені логарифми', tex: [r`\log_a b = \frac{1}{\log_b a}`] },
          { name: 'Перестановка в степені', tex: [r`a^{\log_c b} = b^{\log_c a}`] },
        ],
      },
      {
        title: 'Показникові рівняння і нерівності',
        formulas: [
          { name: 'Показникове рівняння', tex: [r`a^{f(x)} = a^{g(x)} \;\Longleftrightarrow\; f(x) = g(x)`] },
          { name: 'Рівняння aˣ = b', tex: [r`a^x = b \;\Longleftrightarrow\; x = \log_a b, \qquad b > 0`] },
          {
            name: 'Показникова нерівність',
            tex: [r`a > 1: \quad a^{f(x)} > a^{g(x)} \;\Longleftrightarrow\; f(x) > g(x)`, r`0 < a < 1: \quad a^{f(x)} > a^{g(x)} \;\Longleftrightarrow\; f(x) < g(x)`],
            note: 'Якщо основа менша за 1, знак нерівності змінюється на протилежний.',
          },
        ],
      },
      {
        title: 'Логарифмічні рівняння і нерівності',
        formulas: [
          {
            name: 'Логарифмічне рівняння',
            tex: [r`\log_a f(x) = \log_a g(x) \;\Longleftrightarrow\; \begin{cases} f(x) = g(x) \\ f(x) > 0 \end{cases}`],
          },
          { name: 'Рівняння log f(x) = c', tex: [r`\log_a f(x) = c \;\Longleftrightarrow\; f(x) = a^c`] },
          {
            name: 'Логарифмічна нерівність',
            tex: [r`\log_a f(x) > \log_a g(x)`, r`a > 1: \quad f(x) > g(x) > 0`, r`0 < a < 1: \quad 0 < f(x) < g(x)`],
          },
        ],
      },
    ],
    examples: [
      {
        task: 'Обчисліть: $\\log_2 48 - \\log_2 3$.',
        solution: ['$\\log_2 \\dfrac{48}{3} = \\log_2 16 = 4$.'],
      },
      {
        task: 'Розв’яжіть рівняння: $\\log_3 (2x - 1) = 2$.',
        solution: ['$2x - 1 = 3^2 = 9$.', '$x = 5$. Перевірка: $2 \\cdot 5 - 1 = 9 > 0$.'],
      },
      {
        task: 'Розв’яжіть нерівність: $\\left(\\dfrac{1}{2}\\right)^{x} > 8$.',
        solution: ['$\\left(\\dfrac{1}{2}\\right)^{x} > \\left(\\dfrac{1}{2}\\right)^{-3}$.', 'Основа менша за 1, знак змінюється: $x < -3$.'],
      },
    ],
    mistakes: [
      '$\\log_a (x + y) \\ne \\log_a x + \\log_a y$. Сума логарифмів — це логарифм добутку.',
      'У логарифмічних рівняннях завжди перевіряйте, що вирази під логарифмами додатні.',
      'При основі $0 < a < 1$ знак нерівності змінюється — і в показникових, і в логарифмічних нерівностях.',
    ],
    related: ['stepeni', 'pokhidna', 'intehral-pervisna'],
    keywords: 'логарифм показникова функція логарифмічні рівняння нерівності lg ln',
  },
  {
    slug: 'intehral-pervisna',
    title: 'Первісна та інтеграл: таблиця і формули',
    short: 'Первісна та інтеграл',
    description:
      'Таблиця первісних, правила знаходження первісних, формула Ньютона–Лейбніца, площа криволінійної трапеції, площа фігури між графіками, об’єм тіла обертання.',
    subject: 'Алгебра',
    grades: [11],
    intro:
      'Первісна — дія, обернена до диференціювання: $F(x)$ є первісною для $f(x)$, якщо $F\'(x) = f(x)$. Визначений інтеграл обчислює площу під графіком.',
    groups: [
      {
        title: 'Таблиця первісних',
        formulas: [
          { name: 'Означення', tex: [r`F'(x) = f(x), \qquad \int f(x)\,dx = F(x) + C`] },
          { name: 'Стала', tex: [r`\int k\,dx = kx + C`] },
          { name: 'Степенева функція', tex: [r`\int x^n\,dx = \frac{x^{n+1}}{n+1} + C, \qquad n \ne -1`] },
          { name: 'Обернена величина', tex: [r`\int \frac{dx}{x} = \ln|x| + C`] },
          { name: 'Корінь у знаменнику', tex: [r`\int \frac{dx}{\sqrt{x}} = 2\sqrt{x} + C`] },
          { name: 'Синус і косинус', tex: [r`\int \sin x\,dx = -\cos x + C`, r`\int \cos x\,dx = \sin x + C`] },
          { name: 'Тангенс і котангенс', tex: [r`\int \frac{dx}{\cos^2 x} = \operatorname{tg} x + C, \qquad \int \frac{dx}{\sin^2 x} = -\operatorname{ctg} x + C`] },
          { name: 'Показникова функція', tex: [r`\int e^x\,dx = e^x + C, \qquad \int a^x\,dx = \frac{a^x}{\ln a} + C`] },
        ],
      },
      {
        title: 'Правила знаходження первісних',
        formulas: [
          { name: 'Сума', tex: [r`\int \big(f(x) + g(x)\big)dx = \int f(x)\,dx + \int g(x)\,dx`] },
          { name: 'Сталий множник', tex: [r`\int k f(x)\,dx = k\int f(x)\,dx`] },
          {
            name: 'Лінійний аргумент',
            tex: [r`\int f(kx + b)\,dx = \frac{1}{k}F(kx + b) + C, \qquad k \ne 0`],
            note: 'Не забувайте множник $\\frac{1}{k}$: наприклад, $\\int \\cos 3x\\,dx = \\frac{1}{3}\\sin 3x + C$.',
          },
        ],
      },
      {
        title: 'Визначений інтеграл',
        formulas: [
          { name: 'Формула Ньютона–Лейбніца', tex: [r`\int_a^b f(x)\,dx = F(b) - F(a)`] },
          {
            name: 'Площа криволінійної трапеції',
            tex: [r`S = \int_a^b f(x)\,dx, \qquad f(x) \ge 0`],
          },
          {
            name: 'Площа фігури між графіками',
            tex: [r`S = \int_a^b \big(f(x) - g(x)\big)dx, \qquad f(x) \ge g(x)`],
            note: 'Від верхньої функції віднімаємо нижню. Межі $a$ і $b$ — абсциси точок перетину графіків.',
          },
          { name: 'Об’єм тіла обертання навколо осі Ox', tex: [r`V = \pi\int_a^b f^2(x)\,dx`] },
          {
            name: 'Шлях за швидкістю',
            tex: [r`s = \int_{t_1}^{t_2} v(t)\,dt`],
          },
        ],
      },
    ],
    examples: [
      {
        task: 'Обчисліть: $\\displaystyle\\int_1^3 (2x + 1)\\,dx$.',
        solution: ['Первісна: $F(x) = x^2 + x$.', '$F(3) - F(1) = (9 + 3) - (1 + 1) = 10$.'],
      },
      {
        task: 'Знайдіть площу фігури, обмеженої параболою $y = 4 - x^2$ і віссю $Ox$.',
        solution: [
          'Точки перетину з віссю: $x = -2$ і $x = 2$.',
          '$S = \\displaystyle\\int_{-2}^{2} (4 - x^2)\\,dx = \\left(4x - \\dfrac{x^3}{3}\\right)\\Big|_{-2}^{2} = \\left(8 - \\dfrac{8}{3}\\right) - \\left(-8 + \\dfrac{8}{3}\\right) = \\dfrac{32}{3}$.',
        ],
      },
    ],
    mistakes: [
      'У невизначеному інтегралі не забувайте сталу $C$.',
      'Первісна від $\\sin x$ — це $-\\cos x$, з мінусом (а похідна від $\\sin x$ — $\\cos x$, без мінуса).',
      'Якщо графік лежить нижче осі $Ox$, інтеграл від’ємний, а площа — його модуль.',
    ],
    related: ['pokhidna', 'loharyfmy', 'obiemy-til'],
    keywords: 'інтеграл первісна Ньютона Лейбніца криволінійна трапеція площа',
  },
  {
    slug: 'kombinatoryka-ymovirnist',
    title: 'Комбінаторика, ймовірність і статистика: формули',
    short: 'Комбінаторика і ймовірність',
    description:
      'Формули перестановок, розміщень і комбінацій, біном Ньютона, класична ймовірність, додавання і множення ймовірностей, мода, медіана, середнє значення і розмах вибірки.',
    subject: 'Алгебра',
    grades: [6, 9, 11],
    intro:
      'Комбінаторика відповідає на запитання «скількома способами?», теорія ймовірностей — «наскільки ймовірно?», а статистика описує набори даних кількома числами.',
    groups: [
      {
        title: 'Правила комбінаторики',
        formulas: [
          {
            name: 'Правило суми',
            tex: [r`m + n`],
            note: 'Якщо об’єкт $A$ можна вибрати $m$ способами, а об’єкт $B$ — $n$ іншими способами, то «$A$ або $B$» — $m + n$ способами.',
          },
          {
            name: 'Правило добутку',
            tex: [r`m \cdot n`],
            note: 'Якщо $A$ можна вибрати $m$ способами і після цього $B$ — $n$ способами, то пару «$A$ і $B$» — $m \\cdot n$ способами.',
          },
          { name: 'Факторіал', tex: [r`n! = 1 \cdot 2 \cdot 3 \cdot \ldots \cdot n, \qquad 0! = 1, \quad 1! = 1`] },
        ],
      },
      {
        title: 'Перестановки, розміщення, комбінації',
        formulas: [
          {
            name: 'Перестановки',
            tex: [r`P_n = n!`],
            note: 'Кількість способів розставити $n$ різних елементів у ряд.',
          },
          {
            name: 'Розміщення',
            tex: [r`A_n^k = \frac{n!}{(n - k)!}`],
            note: 'Вибираємо $k$ елементів з $n$, порядок важливий (наприклад, староста і заступник).',
          },
          {
            name: 'Комбінації',
            tex: [r`C_n^k = \frac{n!}{k!\,(n - k)!}`],
            note: 'Вибираємо $k$ елементів з $n$, порядок не важливий (команда, комісія, букет).',
          },
          { name: 'Властивості комбінацій', tex: [r`C_n^k = C_n^{n-k}, \qquad C_n^0 = C_n^n = 1, \qquad C_n^1 = n`] },
          {
            name: 'Біном Ньютона',
            tex: [r`(a + b)^n = C_n^0 a^n + C_n^1 a^{n-1}b +`, r`+ \, C_n^2 a^{n-2}b^2 + \ldots + C_n^n b^n`],
            note: 'Коефіцієнти розкладу утворюють рядок трикутника Паскаля. Сума всіх коефіцієнтів дорівнює $2^n$.',
          },
        ],
      },
      {
        title: 'Ймовірність',
        formulas: [
          {
            name: 'Класичне означення',
            tex: [r`P(A) = \frac{m}{n}, \qquad 0 \le P(A) \le 1`],
            note: '$m$ — кількість сприятливих результатів, $n$ — кількість усіх рівноможливих результатів.',
          },
          { name: 'Протилежна подія', tex: [r`P(\bar{A}) = 1 - P(A)`] },
          { name: 'Сума несумісних подій', tex: [r`P(A \cup B) = P(A) + P(B)`] },
          { name: 'Сума довільних подій', tex: [r`P(A \cup B) = P(A) + P(B) - P(A \cap B)`] },
          { name: 'Добуток незалежних подій', tex: [r`P(A \cap B) = P(A) \cdot P(B)`] },
        ],
      },
      {
        title: 'Статистика',
        formulas: [
          { name: 'Середнє значення вибірки', tex: [r`\bar{x} = \frac{x_1 + x_2 + \ldots + x_n}{n}`] },
          {
            name: 'Мода',
            tex: [r`Mo \ \text{— значення, яке трапляється найчастіше}`],
          },
          {
            name: 'Медіана',
            tex: [r`Me \ \text{— число посередині впорядкованої вибірки}`],
            note: 'Якщо кількість значень парна, медіана — середнє арифметичне двох середніх чисел.',
          },
          { name: 'Розмах', tex: [r`R = x_{\max} - x_{\min}`] },
          { name: 'Відносна частота', tex: [r`\text{частота} = \frac{\text{кількість появ значення}}{\text{обсяг вибірки}}`] },
        ],
      },
    ],
    examples: [
      {
        task: 'Скількома способами з 10 учнів можна вибрати команду з 3 осіб?',
        solution: ['Порядок не важливий: $C_{10}^3 = \\dfrac{10!}{3! \\cdot 7!} = \\dfrac{10 \\cdot 9 \\cdot 8}{6} = 120$.'],
      },
      {
        task: 'У коробці 4 червоні й 6 синіх кульок. Яка ймовірність навмання витягти червону?',
        solution: ['$P = \\dfrac{4}{10} = 0{,}4$.'],
      },
      {
        task: 'Для вибірки 3, 5, 5, 7, 10 знайдіть середнє значення, моду, медіану і розмах.',
        solution: ['Середнє: $(3 + 5 + 5 + 7 + 10) : 5 = 6$.', 'Мода: 5. Медіана: 5. Розмах: $10 - 3 = 7$.'],
      },
    ],
    mistakes: [
      'Перш ніж вибирати формулу, запитайте себе: чи важливий порядок? Так — розміщення, ні — комбінації.',
      'Ймовірності можна множити лише для незалежних подій, а додавати без поправки — лише для несумісних.',
    ],
    related: ['prohresii', 'desiatkovi-droby', 'vidsotky'],
    keywords: 'перестановки розміщення комбінації факторіал біном Ньютона ймовірність мода медіана статистика',
  },
];
