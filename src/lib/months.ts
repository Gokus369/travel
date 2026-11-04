export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const monthShort = monthNames.map((m) => m.slice(0, 3));

/** Turns month numbers (1-12) into runs like "Oct–Mar" or "Mar–May, Oct–Dec". */
export function monthRange(months: number[]) {
  const inSeason = new Set(months);
  const starts = months
    .filter((m) => !inSeason.has(m === 1 ? 12 : m - 1))
    .sort((a, b) => a - b);

  return starts
    .map((start) => {
      let end = start;
      while (inSeason.has(end === 12 ? 1 : end + 1)) end = end === 12 ? 1 : end + 1;
      return start === end
        ? monthShort[start - 1]
        : `${monthShort[start - 1]}–${monthShort[end - 1]}`;
    })
    .join(", ");
}
