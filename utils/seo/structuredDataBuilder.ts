import { Product, ProductDetailsPage } from "apps/commerce/types.ts";
import { ReviewData } from "$store/utils/yourViewsService.ts";
import {
  ProductSpecifications,
  ProductWeight,
} from "$store/utils/seo/productDataProcessor.ts";

export interface OfferBuilderParams {
  product: Product;
  originalPrice: number;
  promotionalPrice: number | null;
  priceCurrency: string;
  availability: string;
  sellerName: string;
  priceValidUntil?: string;
  inventoryLevel?: number;
}

export function buildPriceSpecifications(
  offerPrice: number,
  originalPrice: number,
  priceCurrency: string,
) {
  return [
    {
      "@type": "UnitPriceSpecification",
      "priceType": "https://schema.org/ListPrice",
      "price": originalPrice,
      "priceCurrency": priceCurrency,
    },
    {
      "@type": "UnitPriceSpecification",
      "priceType": "https://schema.org/SalePrice",
      "price": offerPrice,
      "priceCurrency": priceCurrency,
    },
  ];
}

export function buildOffersObject(params: OfferBuilderParams) {
  const {
    product,
    originalPrice,
    promotionalPrice,
    priceCurrency,
    availability,
    sellerName,
    priceValidUntil,
    inventoryLevel,
  } = params;

  const hasMultipleOffers = product.offers?.offers &&
    product.offers.offers.length > 1;
  const basePrice = product.offers?.offers?.[0]?.price || 0;
  const price = promotionalPrice || originalPrice;

  if (hasMultipleOffers) {
    const prices = product.offers?.offers?.map((offer) => offer.price || 0) ||
      [basePrice];
    const lowPrice = Math.min(...prices);
    const highPrice = Math.max(...prices);

    return {
      "@type": "AggregateOffer",
      "priceCurrency": priceCurrency,
      "lowPrice": promotionalPrice
        ? Math.min(promotionalPrice, lowPrice)
        : lowPrice,
      "highPrice": promotionalPrice
        ? Math.max(promotionalPrice, highPrice)
        : highPrice,
      "offerCount": product.offers?.offers?.length || 1,
      "availability": availability,
      "seller": {
        "@type": "Organization",
        "name": sellerName,
      },
      "offers": product.offers?.offers?.map((offer) => ({
        "@type": "Offer",
        "price": offer.price,
        "priceCurrency": priceCurrency,
        "availability": offer.availability || availability,
        "seller": {
          "@type": "Organization",
          "name": offer.sellerName || sellerName,
        },
        ...(offer.priceValidUntil &&
          { "priceValidUntil": offer.priceValidUntil }),
        ...(offer.inventoryLevel?.value && {
          "inventoryLevel": {
            "@type": "QuantitativeValue",
            "value": offer.inventoryLevel.value,
          },
        }),
        "priceSpecification": buildPriceSpecifications(
          offer.price || 0,
          originalPrice,
          priceCurrency,
        ),
      })) || [],
    };
  } else {
    return {
      "@type": "Offer",
      "priceCurrency": priceCurrency,
      "price": price,
      "priceValidUntil": priceValidUntil,
      "availability": availability,
      "seller": {
        "@type": "Organization",
        "name": sellerName,
      },
      "priceSpecification": buildPriceSpecifications(
        price,
        originalPrice,
        priceCurrency,
      ),
      ...(inventoryLevel && {
        "inventoryLevel": {
          "@type": "QuantitativeValue",
          "value": inventoryLevel,
        },
      }),
      "itemCondition": "https://schema.org/NewCondition",
      ...(product.releaseDate && {
        "validFrom": new Date(product.releaseDate).toISOString(),
      }),
    };
  }
}

export function buildAggregateRating(reviewData: ReviewData | null) {
  if (!reviewData || reviewData.ratingCount === 0) {
    return null;
  }

  return {
    "@type": "AggregateRating",
    "ratingValue": reviewData.averageRating,
    "bestRating": 5,
    "worstRating": 1,
    "ratingCount": reviewData.ratingCount,
    "reviewCount": reviewData.reviewCount,
  };
}

export interface ProductDataBuilderParams {
  product: Product;
  fullProductName: string;
  category: string[];
  specifications: ProductSpecifications;
  additionalGTINs: { [key: string]: string };
  additionalProperties: Record<string, unknown>[];
  weight: ProductWeight | null;
  heightValue: number | string;
  heightStr: string;
  widthValue: number | string;
  widthStr: string;
  offers: Record<string, unknown>;
  aggregateRating: Record<string, unknown> | null;
  getSpecValue: (name: string) => string;
}

export function buildProductData(params: ProductDataBuilderParams) {
  const {
    product,
    fullProductName,
    category,
    specifications,
    additionalGTINs,
    additionalProperties,
    weight,
    heightValue,
    heightStr,
    widthValue,
    widthStr,
    offers,
    aggregateRating,
    getSpecValue,
  } = params;

  return {
    "@type": "Product",
    "name": fullProductName,
    "alternateName": product.alternateName || "",
    "description": product.description?.replace(/<[^>]*>/g, ""),
    "category": category.length > 0 ? category : undefined,
    "brand": {
      "@type": "Brand",
      "@id": `https://www.copelcolchoes.com.br/${
        product.brand?.name?.toLowerCase().replace(/\s+/g, "-") || ""
      }`,
      "name": product.brand?.name || "",
    },
    "sku": product.sku,
    "productID": product.productID,
    ...(specifications.gtin && { "gtin": specifications.gtin }),
    ...additionalGTINs,
    ...(specifications.mpn && { "mpn": specifications.mpn }),
    "url": product.url || "",
    "image": product.image?.map((img) => ({
      "@type": "ImageObject",
      "url": img.url || "",
      "alternateName": img.alternateName ||
        `${fullProductName} - Imagem do produto`,
    })) || [],
    "offers": offers,
    "additionalProperty": additionalProperties,
    ...(getSpecValue("comprimento") && {
      "depth": {
        "@type": "QuantitativeValue",
        "value": parseFloat(getSpecValue("comprimento").replace(",", ".")) ||
          getSpecValue("comprimento"),
        "unitCode": "CMT",
      },
    }),
    ...(widthStr && {
      "width": {
        "@type": "QuantitativeValue",
        "value": widthValue,
        "unitCode": "CMT",
      },
    }),
    ...(heightStr && {
      "height": {
        "@type": "QuantitativeValue",
        "value": typeof heightValue === "number" ? heightValue : heightValue,
        "unitCode": "CMT",
      },
    }),
    ...(weight && {
      "weight": {
        "@type": "QuantitativeValue",
        "value": weight.value,
        "unitCode": weight.unitCode,
      },
    }),
    ...(product.inProductGroupWithID && {
      "inProductGroupWithID": product.inProductGroupWithID,
    }),
    ...(product.releaseDate && {
      "releaseDate": new Date(product.releaseDate).toISOString(),
    }),
    ...(getSpecValue("estrutura") && {
      "material": getSpecValue("estrutura"),
    }),
    ...(getSpecValue("cor lateral") && {
      "color": getSpecValue("cor lateral"),
    }),
    ...(getSpecValue("fornecedor") &&
      getSpecValue("fornecedor") !== product.brand?.name && {
      "manufacturer": {
        "@type": "Organization",
        "name": getSpecValue("fornecedor"),
      },
    }),
    ...(getSpecValue("para") && {
      "audience": {
        "@type": "PeopleAudience",
        "audienceType": getSpecValue("para"),
      },
    }),
    ...(aggregateRating ? { "aggregateRating": aggregateRating } : {}),
  };
}

export function buildBreadcrumbData(page: ProductDetailsPage) {
  return page.breadcrumbList
    ? {
      "@type": "BreadcrumbList",
      "itemListElement": page.breadcrumbList.itemListElement?.map((item) => ({
        "@type": item["@type"] || "ListItem",
        "name": item.name || "",
        "item": item.item || "",
        "position": item.position || 0,
      })) || [],
      "numberOfItems": page.breadcrumbList.numberOfItems ||
        page.breadcrumbList.itemListElement?.length || 0,
    }
    : null;
}

export function buildOrganizationData() {
  return {
    "@type": "Organization",
    "name": "Copel Colchões",
    "url": "https://www.copelcolchoes.com.br/",
  };
}

export function buildStructuredData(
  productData: Record<string, unknown>,
  breadcrumbData: Record<string, unknown> | null,
  organizationData: Record<string, unknown>,
) {
  return breadcrumbData
    ? {
      "@context": "https://schema.org",
      "@graph": [
        productData,
        breadcrumbData,
        organizationData,
      ],
    }
    : {
      "@context": "https://schema.org",
      "@graph": [
        productData,
        organizationData,
      ],
    };
}
