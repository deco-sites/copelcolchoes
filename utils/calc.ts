export function getDiscountPercent(listPrice: number, salePrice: number) {
  if (listPrice <= 0) return 0;
  return Math.round(((listPrice - salePrice) / listPrice) * 100);
}
