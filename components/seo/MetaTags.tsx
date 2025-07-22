import type { Product } from "apps/commerce/types.ts";

export interface MetaTagsProps {
  product: Product;
  pageTitle: string;
  pageDescription: string;
  pageUrl: string;
  canonicalUrl: string;
  imageUrl: string;
  keywords: string;
  availability: string;
  price: number;
  priceCurrency: string;
  favicon?: string;
}

export function MetaTags({
  product,
  pageTitle,
  pageDescription,
  pageUrl,
  canonicalUrl,
  imageUrl,
  keywords,
  availability,
  price,
  priceCurrency,
  favicon,
}: MetaTagsProps) {
  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} key="description" />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      {favicon && <link rel="icon" href={favicon} />}

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="product" />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta property="og:site_name" content="Copel Colchões" />

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

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}

      <meta name="robots" content="index, follow" />
      <meta name="author" content="Copel Colchões" />
      {product.brand?.name && (
        <meta
          name="brand"
          content={product.brand.name}
        />
      )}
    </>
  );
}
