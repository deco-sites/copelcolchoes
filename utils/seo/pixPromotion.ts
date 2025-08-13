import { Offer } from "apps/commerce/types.ts";
import { getOfferPrice } from "./offerPrice.ts";

export interface PixPromotionResult {
  promotionalPrice: number;
}

export function calculatePixPromotion(offers?: Offer[]): PixPromotionResult {
  if (!offers || offers.length === 0) {
    return { promotionalPrice: 0 };
  }

  const offer = offers[0];
  let promotionalPrice = getOfferPrice(offer, "SalePrice");

  const pixPromotion = offer?.teasers?.find(
    (teaser) =>
      teaser.conditions?.parameters?.some(
        (param) => param.name === "PaymentMethodId" && param.value === "712",
      ),
  );

  if (pixPromotion) {
    const discountParam = pixPromotion.effects?.parameters?.find(
      (param) => param.name === "PercentualDiscount",
    );

    if (discountParam) {
      const discount = parseFloat(discountParam.value);
      promotionalPrice = Number(
        (promotionalPrice * (1 - discount / 100)).toFixed(2),
      );
    }
  }

  return {
    promotionalPrice: Number(promotionalPrice.toFixed(2)),
  };
}
