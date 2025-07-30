import type { Offer } from "apps/commerce/types.ts";

export const getOfferPrice = (
  offer: Offer | undefined,
  priceType: "ListPrice" | "SalePrice" | "SRP",
) => {
  if (!offer) return 0;
  return offer?.priceSpecification?.find(
    ({ priceType: priceTypeSchema }) =>
      priceTypeSchema === `https://schema.org/${priceType}`,
  )?.price || 0;
};
