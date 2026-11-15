// Рисунки до тем геометрії: прості SVG, колір ліній — currentColor (сам підлаштовується
// під світлу й темну тему), акцент — змінна --fx-accent зі стилів розділу.

const open = (label: string) =>
  `<svg viewBox="0 0 320 200" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" font-family="Georgia, 'Times New Roman', serif" font-size="17" font-style="italic">`;
const t = (x: number, y: number, s: string, accent = false) =>
  `<text x="${x}" y="${y}" stroke="none" fill="${accent ? 'var(--fx-accent)' : 'currentColor'}" text-anchor="middle">${s}</text>`;
const A = 'stroke="var(--fx-accent)"';
const D = 'stroke-dasharray="5 5" stroke-width="1.5"';

export const figures: Record<string, { svg: string; caption: string }> = {
  triangle: {
    caption: 'Сторони $a$, $b$, $c$ лежать проти кутів $\\alpha$, $\\beta$, $\\gamma$.',
    svg:
      open('Трикутник зі сторонами a, b, c і кутами α, β, γ') +
      `<path d="M30 170 L290 170 L110 30 Z"/>` +
      `<path d="M58 170 A28 28 0 0 0 44 146" ${A}/><path d="M264 170 A26 26 0 0 1 270 154" ${A}/><path d="M97 46 A22 22 0 0 0 127 44" ${A}/>` +
      t(72, 160, 'α', true) + t(248, 162, 'β', true) + t(112, 66, 'γ', true) +
      t(214, 92, 'a') + t(56, 96, 'b') + t(160, 192, 'c') +
      t(20, 186, 'A') + t(300, 186, 'B') + t(110, 20, 'C') +
      `</svg>`,
  },
  'right-triangle': {
    caption: '$a$, $b$ — катети, $c$ — гіпотенуза, $h$ — висота до гіпотенузи, $a_c$ і $b_c$ — проєкції катетів.',
    svg:
      open('Прямокутний трикутник: катети a, b, гіпотенуза c, висота h') +
      `<path d="M60 170 L280 170 L60 40 Z"/>` +
      `<path d="M60 154 L76 154 L76 170" stroke-width="1.5"/>` +
      `<path d="M60 170 L116.9 73.6" ${A} ${D}/>` +
      `<path d="M250 170 A30 30 0 0 0 254 155" ${A}/>` +
      t(232, 163, 'α', true) + t(44, 110, 'a') + t(170, 191, 'b') + t(96, 132, 'h', true) +
      t(98, 50, 'a') + `<text x="106" y="55" stroke="none" fill="currentColor" font-size="11">c</text>` +
      t(206, 112, 'b') + `<text x="214" y="117" stroke="none" fill="currentColor" font-size="11">c</text>` +
      t(48, 188, 'C') + t(292, 186, 'A') + t(48, 34, 'B') +
      `</svg>`,
  },
  trapezoid: {
    caption: '$a$, $b$ — основи трапеції, $h$ — висота, $m$ — середня лінія.',
    svg:
      open('Трапеція з основами a і b, висотою h і середньою лінією m') +
      `<path d="M30 170 L290 170 L220 50 L90 50 Z"/>` +
      `<path d="M90 50 L90 170" ${D}/><path d="M90 156 L104 156 L104 170" stroke-width="1.5"/>` +
      `<path d="M60 110 L255 110" ${A}/>` +
      t(160, 191, 'a') + t(155, 42, 'b') + t(104, 134, 'h') + t(175, 102, 'm', true) +
      `</svg>`,
  },
  circle: {
    caption: '$R$ — радіус, $\\alpha$ — центральний кут, $l$ — довжина дуги; зафарбовано сектор.',
    svg:
      open('Коло з радіусом R, центральним кутом α і дугою l') +
      `<path d="M160 100 L240 100 A80 80 0 0 0 200 30.7 Z" fill="var(--fx-accent)" fill-opacity="0.14" stroke="none"/>` +
      `<circle cx="160" cy="100" r="80"/>` +
      `<path d="M160 100 L240 100"/><path d="M160 100 L200 30.7"/>` +
      `<path d="M184 100 A24 24 0 0 0 172 79.2" ${A}/>` +
      `<circle cx="160" cy="100" r="2.5" fill="currentColor"/>` +
      t(148, 106, 'O') + t(204, 118, 'R') + t(192, 88, 'α', true) + t(240, 56, 'l', true) +
      `</svg>`,
  },
  pyramid: {
    caption: '$h$ — висота піраміди, $l$ — апофема, $r$ — радіус кола, вписаного в основу.',
    svg:
      open('Правильна чотирикутна піраміда: висота h, апофема l, радіус r') +
      `<path d="M60 170 L220 170 L270 130 L165 26 Z"/><path d="M165 26 L220 170"/>` +
      `<path d="M60 170 L110 130 L270 130" ${D}/><path d="M165 26 L110 130" ${D}/>` +
      `<path d="M165 26 L165 150" ${A} ${D}/><path d="M165 150 L140 170" ${A} ${D}/><path d="M165 26 L140 170" ${A}/>` +
      t(176, 104, 'h', true) + t(140, 104, 'l', true) + t(160, 172, 'r', true) +
      `</svg>`,
  },
  cone: {
    caption: '$R$ — радіус основи, $h$ — висота, $l$ — твірна: $l^2 = R^2 + h^2$.',
    svg:
      open('Конус: радіус R, висота h, твірна l') +
      `<path d="M70 160 L160 26 L250 160"/>` +
      `<path d="M70 160 A90 22 0 0 0 250 160"/><path d="M70 160 A90 22 0 0 1 250 160" ${D}/>` +
      `<path d="M160 26 L160 160" ${A} ${D}/><path d="M160 160 L250 160" ${A}/>` +
      `<path d="M160 148 L172 148 L172 160" stroke-width="1.5"/>` +
      t(148, 104, 'h', true) + t(206, 154, 'R', true) + t(220, 90, 'l') +
      `</svg>`,
  },
};
