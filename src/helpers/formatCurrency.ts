export function formatCurrency(
  value: number | string,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  if (value === null || value === undefined || value === "") return "-";

  const number = typeof value === "string" ? parseFloat(value) : value;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2, // always show cents
    maximumFractionDigits: 2, // don’t show more than 2 decimals
  }).format(number);
}
