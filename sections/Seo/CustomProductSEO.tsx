import type { ProductDetailsPage } from "apps/commerce/types.ts";
import type { SEOSection } from "apps/website/components/Seo.tsx";
import type { SectionProps } from "@deco/deco";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Head } from "$fresh/runtime.ts";
import {
  fetchReviewData,
  type YourViewsConfig,
} from "$store/utils/yourViewsService.ts";
import {
  buildAdditionalProperties,
  extractGTIN,
  extractProductCategories,
  extractProductSpecifications,
  extractProductWeight,
  getSpecificationValue,
  parseHeightValue,
  parseWidthValue,
} from "$store/utils/seo/productDataProcessor.ts";
import { generateProductKeywords } from "$store/utils/seo/keywordsExtractor.ts";
import {
  buildAggregateRating,
  buildBreadcrumbData,
  buildOffersObject,
  buildOrganizationData,
  buildProductData,
  buildStructuredData,
} from "$store/utils/seo/structuredDataBuilder.ts";
import {
  buildPageDescription,
  buildPageTitle,
} from "$store/utils/seo/metaTags.ts";
import { getOfferPrice } from "$store/utils/seo/offerPrice.ts";
import { MetaTags } from "$store/components/seo/MetaTags.tsx";
import { calculatePixPromotion } from "../../utils/seo/pixPromotion.ts";

interface Props {
  page: ProductDetailsPage | null;
  /** @title Configuração do YourViews */
  yourViews?: YourViewsConfig;
  /** @title Imagem do favicon */
  favicon: ImageWidget;
}

export async function loader(
  { page, yourViews, favicon }: Props,
  _req: Request,
) {
  if (!page?.product) {
    return { page, reviewData: null };
  }

  if (!yourViews?.key) {
    return { page, reviewData: null };
  }

  const { product } = page;
  const { inProductGroupWithID } = product;

  if (!inProductGroupWithID) {
    return { page, reviewData: null };
  }

  const reviewData = await fetchReviewData(inProductGroupWithID, yourViews);
  return { page, reviewData, favicon };
}

export default function CustomProductSEO(
  { page, reviewData, favicon }: SectionProps<typeof loader>,
): SEOSection {
  if (!page?.product) return <div />;
  const product = page.product;

  const fullProductName = product.isVariantOf?.name || product.name || "";
  const { category } = extractProductCategories(product);
  const specifications = extractProductSpecifications(product);
  const getSpecValue = (name: string) =>
    getSpecificationValue(specifications.specifications, name);

  const listPrice = getOfferPrice(
    product.offers?.offers?.[0],
    "ListPrice",
  );
  const basePrice = getOfferPrice(
    product.offers?.offers?.[0],
    "SRP",
  );
  const { promotionalPrice } = calculatePixPromotion(
    product.offers?.offers,
  );
  const priceCurrency = product.offers?.priceCurrency || "BRL";
  const availability = product.offers?.offers?.[0]?.availability ||
    "https://schema.org/InStock";
  const sellerName = product.offers?.offers?.[0]?.sellerName || "";
  const priceValidUntil = product.offers?.offers?.[0]?.priceValidUntil;
  const inventoryLevel = product.offers?.offers?.[0]?.inventoryLevel?.value;

  const heightStr = getSpecValue("altura");
  const heightValue = parseHeightValue(heightStr);
  const widthStr = getSpecValue("largura");
  const widthValue = parseWidthValue(widthStr);
  const weight = extractProductWeight(specifications.specifications);

  const GTIN = extractGTIN(specifications);
  const additionalProperties = buildAdditionalProperties(
    specifications.specifications,
  );
  const aggregateReview = buildAggregateRating(reviewData);

  const offers = buildOffersObject({
    product,
    basePrice,
    listPrice,
    promotionalPrice,
    priceCurrency,
    availability,
    sellerName,
    priceValidUntil,
    inventoryLevel,
  });

  const productData = buildProductData({
    product,
    fullProductName,
    category,
    specifications,
    GTIN,
    additionalProperties,
    weight,
    heightValue,
    widthValue,
    heightStr,
    widthStr,
    offers,
    aggregateRating: aggregateReview,
    getSpecValue,
  });

  const breadcrumbData = buildBreadcrumbData(page);
  const organizationData = buildOrganizationData();
  const structuredData = buildStructuredData(
    productData,
    breadcrumbData,
    organizationData,
  );

  const jsonLdScript = JSON.stringify(structuredData, null, 2);

  const pageTitle = buildPageTitle(fullProductName);
  const pageDescription = buildPageDescription(productData.description);
  const pageUrl = product.url || "";
  const canonicalUrl = pageUrl.split("?")?.[0] || pageUrl;
  const imageUrl = product.image?.[0]?.url || "";

  const keywords = generateProductKeywords({
    product,
    category,
    specifications,
    fullProductName,
    productDescription: productData.description,
    getSpecValue,
  });

  return (
    <Head>
      <MetaTags
        product={product}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        pageUrl={pageUrl}
        canonicalUrl={canonicalUrl}
        imageUrl={imageUrl}
        keywords={keywords}
        availability={availability}
        price={promotionalPrice}
        priceCurrency={priceCurrency}
        favicon={favicon}
      />

      <script
        type="application/ld+json"
        // deno-lint-ignore react-no-danger
        dangerouslySetInnerHTML={{ __html: jsonLdScript }}
      />
    </Head>
  );
}
