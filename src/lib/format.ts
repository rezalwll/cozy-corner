export function toFa(value: number | string): string {
  return String(value).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

export function formatPrice(value: number): string {
  return toFa(value.toLocaleString("en-US"));
}

export function formatToman(value: number): string {
  return `${formatPrice(value)} تومان`;
}
