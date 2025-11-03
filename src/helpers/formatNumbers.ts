export function formatNumbers(
  value: number | string | null | undefined
): string {
  if (value === null || value === undefined || value === "") return "-";

  const num = Number(value);
  if (isNaN(num)) return "-";

  const rounded = Math.round(num * 100) / 100;

  let str = rounded.toString();

  // If it ends with .0 or .00, strip it
  if (str.includes(".")) {
    str = str.replace(/\.0+$/, ""); // remove .0 or .00
  }

  return str;
}
