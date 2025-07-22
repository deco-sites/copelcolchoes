import { Offer } from "apps/commerce/types.ts";

export interface PixPromotionResult {
  promotionalPrice: number | null;
  discountPercentage: number;
}

export function calculatePixPromotion(offers: Offer[]): PixPromotionResult {
  const pixPromotion = offers?.[0]?.teasers?.find(
    (teaser) =>
      teaser.conditions?.parameters?.some(
        (param) => param.name === "PaymentMethodId" && param.value === "712",
      ),
  );

  let promotionalPrice = null;
  let discountPercentage = 0;

  if (pixPromotion) {
    const discountParam = pixPromotion.effects?.parameters?.find(
      (param) => param.name === "PercentualDiscount",
    );

    if (discountParam) {
      discountPercentage = parseFloat(discountParam.value);
      const originalPrice = offers?.[0]?.price || 0;
      promotionalPrice = originalPrice * (1 - discountPercentage / 100);
    }
  }

  return { promotionalPrice, discountPercentage };
}
