import { Offer } from "apps/commerce/types.ts";
import { getOfferPrice } from "./offerPrice.ts";
import { getDiscountPercent } from "../calc.ts";

export interface PixPromotionResult {
  promotionalPrice: number;
  totalDiscount: number;
}

export function calculatePixPromotion(offers?: Offer[]): PixPromotionResult {
  if (!offers || offers.length === 0) {
    return { promotionalPrice: 0, totalDiscount: 0 };
  }

  const offer = offers[0];
  const listPrice = getOfferPrice(offer, "ListPrice");
  let promotionalPrice = getOfferPrice(offer, "SalePrice");
  let discount = getDiscountPercent(listPrice, promotionalPrice);

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
      const pixDiscount = parseFloat(discountParam.value);
      promotionalPrice = Number(
        (promotionalPrice * (1 - pixDiscount / 100)).toFixed(2),
      );
      discount = getDiscountPercent(listPrice, promotionalPrice);
    }
  }

  return {
    promotionalPrice: Number(promotionalPrice.toFixed(2)),
    totalDiscount: Number(discount.toFixed(2)),
  };
}
