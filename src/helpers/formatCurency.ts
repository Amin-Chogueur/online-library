export function formatCurency(price: number) {
  const formattedPrice = new Intl.NumberFormat("fr-DZ", {
    style: "currency",
    currency: "DZD",
  }).format(price);
  return formattedPrice;
}
