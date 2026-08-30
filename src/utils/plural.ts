/**
 * Українські числівники: 1 завдання, 2 завдання, 5 завдань, 73 завдання, 98 завдань.
 * Порядок форм: [1, 2–4, 5–20]. Числа 11–14 завжди беруть третю форму.
 */
export const plural = (n: number, one: string, few: string, many: string): string => {
  const abs = Math.abs(n) % 100;
  if (abs >= 11 && abs <= 14) return many;
  const last = abs % 10;
  if (last === 1) return one;
  if (last >= 2 && last <= 4) return few;
  return many;
};
