export function formatToTwoDecimals(value: string | number) {
  const num = Number(value);
  if (isNaN(num)) return value;

  const str = num.toString();
  const decimals = (str.split(".")[1] || "").length;

  return decimals > 2 ? num.toFixed(2) : str;
}
