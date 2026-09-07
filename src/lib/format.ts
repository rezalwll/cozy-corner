export function toFa(value: number | string): string {
  const digits = "۰۱۲۳۴۵۶۷۸۹".split("");
  return String(value).replace(/\d/g, (d) => digits[Number(d)] ?? d);
}

export function formatPrice(value: number): string {
  return toFa(value.toLocaleString("en-US"));
}

export function formatToman(value: number): string {
  return `${formatPrice(value)} تومان`;
}
