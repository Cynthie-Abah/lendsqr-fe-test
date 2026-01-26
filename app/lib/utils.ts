export const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export function getPageNumbers(
  current: number,
  total: number,
): (number | string)[] {
  const range: (number | string)[] = [];

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 4) {
    range.push(1, 2, 3, 4, 5, '...', total);
  } else if (current >= total - 3) {
    range.push(1, '...', total - 4, total - 3, total - 2, total - 1, total);
  } else {
    range.push(1, '...', current - 1, current, current + 1, '...', total);
  }

  return range;
}