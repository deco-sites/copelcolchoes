import { ProductDetailsPage } from "apps/commerce/types.ts";
import { Head } from "$fresh/runtime.ts";
import {
  SEOSection,
} from "apps/website/components/Seo.tsx";

interface Props {
  page: ProductDetailsPage | null;
}

export default function CustomProductJSONLD({ page }: Props): SEOSection {
  if (!page?.product) return <div></div>;
  const product = page.product;

  // Pagaleve Pix à Vista - 10% de desconto em 1x
  const pixPromotion = product.offers?.offers?.[0]?.teasers?.find(
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
      const originalPrice = product.offers?.offers?.[0]?.price || 0;
      promotionalPrice = originalPrice * (1 - discountPercentage / 100);
    }
  }

  const fullProductName = product.isVariantOf?.name || product.name;

  const categoryProperty = product.additionalProperty?.find(
    (prop) => prop.name === "category" && prop.propertyID === "3",
  );
  const subcategoryProperty = product.additionalProperty?.find(
    (prop) => prop.name === "category" && prop.propertyID === "5",
  );

  const category: string[] = [];
  if (categoryProperty?.value) category.push(categoryProperty.value);
  if (subcategoryProperty?.value) category.push(subcategoryProperty.value);

  const gtin = product.gtin || "";
  const refIdProperty = product.additionalProperty?.find(
    (prop) => prop.name === "RefId" && prop.valueReference === "ReferenceID",
  );
  const mpn = refIdProperty?.value || "";

  const allProperties = [
    ...(product.additionalProperty || []),
    ...(product.isVariantOf?.additionalProperty || []),
  ];

  const specifications =
    allProperties.filter((prop) =>
      prop.valueReference === "SPECIFICATION" ||
      prop.valueReference === "PROPERTY"
    ) || [];

  const getSpecValue = (name: string): string => {
    return specifications.find((spec) => spec.name === name)?.value || "";
  };

  const buildAdditionalProperties = () => {
    const props: {
      "@type": string;
      name: string;
      value: string;
      valueReference?: string;
    }[] = [];

    const coreSpecs = [
      "Medidas",
      "Altura",
      "Largura (cm)",
      "Comprimento (cm)",
      "Garantia",
      "Estrutura",
      "Marca",
      "Revestimento",
    ];

    coreSpecs.forEach((specName) => {
      const value = getSpecValue(specName);
      if (value) {
        props.push({
          "@type": "PropertyValue",
          "name": specName,
          "value": value,
          "valueReference": "SPECIFICATION",
        });
      }
    });

    return props;
  };

  const originalPrice = product.offers?.offers?.[0]?.price || 0;
  const priceCurrency = product.offers?.priceCurrency || "BRL";
  const availability = product.offers?.offers?.[0]?.availability ||
    "https://schema.org/InStock";
  const sellerName = product.offers?.offers?.[0]?.sellerName || "";
  const priceValidUntil = product.offers?.offers?.[0]?.priceValidUntil;

  let price = originalPrice;
  const priceSpecs = [
    {
      "@type": "UnitPriceSpecification",
      "priceType": "https://schema.org/ListPrice",
      "price": originalPrice,
    },
    {
      "@type": "UnitPriceSpecification",
      "priceType": "https://schema.org/SalePrice",
      "price": originalPrice,
    },
  ];

  if (promotionalPrice) {
    price = promotionalPrice;
    priceSpecs[1].price = promotionalPrice;
  }

  const heightStr = getSpecValue("Altura");
  let heightValue: number | string = heightStr;
  const heightMatch = heightStr.match(/(\d+) cm/);
  if (heightMatch) {
    heightValue = parseFloat(heightMatch[1]);
  }

  const productData = {
    "@type": "Product",
    "name": fullProductName,
    "alternateName": product.alternateName || "",
    "description": product.description?.replace(/<[^>]*>/g, ""), // Remove HTML tags
    "category": category.length > 0 ? category : undefined,
    "brand": {
      "@type": "Brand",
      "name": product.brand?.name || "",
      ...(product.brand?.["@id"] && { "@id": product.brand["@id"] }),
    },
    "sku": product.sku,
    "productID": product.productID,
    ...(gtin && { "gtin": gtin }),
    ...(mpn && { "mpn": mpn }),
    "url": product.url || "",
    "image": product.image?.map((img) => ({
      "@type": "ImageObject",
      "url": img.url || "",
      "alternateName": img.alternateName ||
        `${fullProductName} - Imagem do produto`,
    })) || [],
    "offers": {
      "@type": "Offer",
      "priceCurrency": priceCurrency,
      "price": price,
      "priceValidUntil": priceValidUntil,
      "availability": availability,
      "seller": {
        "@type": "Organization",
        "name": sellerName,
      },
      "priceSpecification": priceSpecs,
    },
    "additionalProperty": buildAdditionalProperties(),
    ...(getSpecValue("Largura (cm)") && {
      "width": {
        "@type": "QuantitativeValue",
        "value": parseFloat(getSpecValue("Largura (cm)")) ||
          getSpecValue("Largura (cm)"),
        "unitCode": "CMT",
      },
    }),
    ...(getSpecValue("Comprimento (cm)") && {
      "depth": {
        "@type": "QuantitativeValue",
        "value": parseFloat(getSpecValue("Comprimento (cm)")) ||
          getSpecValue("Comprimento (cm)"),
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
    ...(product.inProductGroupWithID && {
      "inProductGroupWithID": product.inProductGroupWithID,
    }),
    ...(product.releaseDate && {
      "releaseDate": new Date(product.releaseDate).toISOString(),
    }),
  };

  const breadcrumbData = page.breadcrumbList
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

  const structuredData = breadcrumbData
    ? {
      "@context": "https://schema.org",
      "@graph": [
        productData,
        breadcrumbData,
      ],
    }
    : {
      "@context": "https://schema.org",
      ...productData,
    };

  const jsonLdScript = JSON.stringify(structuredData, null, 2);

  // SEO Meta Tags
  const pageTitle = fullProductName
    ? (fullProductName.length >= 48
      ? `${fullProductName.substring(0, 45)}... | Copel Colchões`
      : `${fullProductName} | Copel Colchões`)
    : "Copel Colchões | A Maior Loja de Colchões"; // 65 characters max
  const pageDescription = productData.description
    ? productData.description.split(/\r/)[0]
    : "";
  const pageUrl = product.url || "";
  const canonicalUrl = pageUrl.split("?")?.[0] || pageUrl;
  const imageUrl = product.image?.[0]?.url || "";

  const keywords = [
    ...(category || []),
    product.brand?.name,
    ...specifications.slice(0, 3).map((spec) => spec.value),
  ].filter(Boolean).join(", ");

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} key="description" />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="product" />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta property="og:site_name" content="Copel Colchões" />

      {/* Product-specific Open Graph */}
      <meta property="product:brand" content={product.brand?.name || ""} />
      <meta
        property="product:availability"
        content={availability === "https://schema.org/InStock"
          ? "in stock"
          : "out of stock"}
      />
      <meta property="product:condition" content="new" />
      <meta property="product:price:amount" content={price.toString()} />
      <meta property="product:price:currency" content={priceCurrency} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Copel Colchões" />
      {product.brand?.name && (
        <meta
          name="brand"
          content={product.brand.name}
        />
      )}

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        // deno-lint-ignore react-no-danger
        dangerouslySetInnerHTML={{ __html: jsonLdScript }}
      />
    </Head>
  );
}
