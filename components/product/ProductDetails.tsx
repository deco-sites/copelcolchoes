import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Button from "$store/components/ui/Button.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import type { LoaderReturnType } from "$live/types.ts";
import AddToCartActions from "$store/islands/AddToCartActions.tsx";
import ProductDetailsImages from "$store/islands/ProductDetailsImages.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { getShareLink } from "$store/sdk/shareLinks.tsx";

import ProductSelector from "./ProductVariantSelector.tsx";

export type Variant = "front-back" | "slider" | "auto";

export type ShareableNetwork = "Facebook" | "Twitter" | "Email" | "WhatsApp";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
  /**
   * @title Product view
   * @description Ask for the developer to remove this option since this is here to help development only and should not be used in production
   */
  variant?: Variant;
  shareableNetworks?: ShareableNetwork[];
}

const WIDTH = 576;
const HEIGHT = 576;
const ASPECT_RATIO = "1";

/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */
function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <span class="font-medium text-2xl">Página não encontrada</span>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function ProductInfo(
  { page }: {
    page: ProductDetailsPage;
  },
) {
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    description,
    productID,
    offers,
    name,
    isVariantOf,
    url,
  } = product;
  const { price, listPrice, seller, availability, installment } = useOffer(
    offers,
  );
  console.log(product);
  const inStock = availability === "https://schema.org/InStock";

  return (
    <>
      {/* Code and name */}
      <div class="font-quicksand mt-5 relative">
        <span class="text-[#828282] text-sm leading-[1.125rem] mb-6">Cód.: {isVariantOf?.model}</span>
        <h1 class="text-primary text-[1.75rem] leading-8 font-semibold pt-2 capitalize">{isVariantOf?.name}</h1>
      </div>
      {/* YourViews Box */}
      <div class="text-primary font-quicksand text-[0.875rem] font-medium leading-8 py-4 underline">
        <button class="flex items-center gap-4" title="0 avaliações">
          <div class="yv-review-quickreview "></div>
          <span class="underline">Seja o primeiro a avaliar</span>
        </button>

      </div>
      {/* Prices */}
      {inStock
        ? (
          <div class="mt-5">
            <div class="flex flex-row gap-2 items-center">
              {listPrice !== price && (
                <span class="line-through text-base-300 text-xs">
                  {formatPrice(listPrice, offers!.priceCurrency!)}
                </span>
              )}
              <span class="font-medium text-[19px] text-primary">
                {formatPrice(price, offers!.priceCurrency!)}
              </span>
            </div>
            <div class="flex flex-col">
              <span>
                ou {installment?.billingDuration}x de {formatPrice(
                  installment?.billingIncrement,
                  offers!.priceCurrency,
                )}
              </span>
            </div>
          </div>
        )
        : null}
      {/* Sku Selector */}
      {availability === "https://schema.org/InStock"
        ? (
          <div class="mt-4 sm:mt-5">
            <ProductSelector product={product} />
          </div>
        )
        : null}
      {/* Add to Cart and Favorites button */}
      <div class="mt-4 lg:mt-10 flex gap-[30px]">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              {seller && (
                <AddToCartActions
                  productID={productID}
                  seller={seller}
                  price={price}
                  listPrice={listPrice}
                  productName={name ?? ""}
                  productGroupID={product.isVariantOf?.productGroupID ?? ""}
                />
              )}
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>
      {/* Shipping Simulation */}

      {availability === "https://schema.org/InStock"
        ? (
          <ShippingSimulation
            items={[{
              id: Number(product.sku),
              quantity: 1,
              seller: seller ?? "1",
            }]}
          />
        )
        : null}
      {/* Description card */}
      <details className="collapse collapse-plus mt-[30px]">
        <summary className="collapse-title border border-base-200 rounded-full py-3 px-[30px] !min-h-0 font-medium">
          Descrição
        </summary>
        <div className="readmore !flex-col text-xs px-0 pl-[30px] mt-3 leading-tight collapse-content text-base-300">
          <input type="checkbox" id="readmore" className="readmore-toggle" />
          <p
            className="readmore-content whitespace-break-spaces !line-clamp-none"
            dangerouslySetInnerHTML={{ __html: description ? description : "" }}
          >
          </p>
        </div>
      </details>
      {/* Share Product on Social Networks */}

      {/* Analytics Event */}
      <SendEventOnLoad
        event={{
          name: "view_item",
          params: {
            items: [
              mapProductToAnalyticsItem({
                product,
                breadcrumbList,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
    </>
  );
}
const useStableImages = (product: ProductDetailsPage["product"]) => {
  const imageNameFromURL = (url = "") => {
    const segments = new URL(url).pathname.split("/");
    return segments[segments.length - 1];
  };

  const images = product.image ?? [];
  const allImages = product.isVariantOf?.hasVariant.flatMap((p) => p.image)
    .reduce((acc, img) => {
      if (img?.url) {
        acc[imageNameFromURL(img.url)] = img.url;
      }
      return acc;
    }, {} as Record<string, string>) ?? {};

  return images.map((img) => {
    const name = imageNameFromURL(img.url);

    return { ...img, url: allImages[name] ?? img.url };
  });
};

function Details({
  page,
  variant,
  shareableNetworks,
}: {
  page: ProductDetailsPage;
  variant: Variant;
  shareableNetworks?: Props["shareableNetworks"];
}) {
  const { product, breadcrumbList } = page;
  const filteredBreadcrumbList = breadcrumbList.itemListElement.filter((item) =>
    item.name!.length > 1
  );
  const images = useStableImages(product);
  /**
   * Product slider variant
   */
  if (variant === "slider") {
    return (
      <>
        {/* Breadcrumb */}
        <Breadcrumb
          itemListElement={filteredBreadcrumbList}
        />
        <section class="lg:flex lg:gap-10">
          {/* Product Images */}
          <ProductDetailsImages
            images={images}
            width={WIDTH}
            height={HEIGHT}
            aspect={ASPECT_RATIO}
            url={product.url!}
          />

          {/* Product Info */}
          <div class="lg:w-1/2 lg:z-50 lg:sticky lg:h-fit lg:top-5 lg:mb-[2.125rem]">
            <ProductInfo
              page={page}
            />
          </div>
        </section>
      </>
    );
  }

  /**
   * Product front-back variant.
   *
   * Renders two images side by side both on mobile and on desktop. On mobile, the overflow is
   * reached causing a scrollbar to be rendered.
   */
  return (
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-[50vw_25vw] lg:grid-rows-1 lg:justify-center">
      {/* Image slider */}
      <ul class="carousel carousel-center gap-6">
        {[images[0], images[1] ?? images[0]].map((img, index) => (
          <li class="carousel-item min-w-[100vw] lg:min-w-[24vw]">
            <Image
              sizes="(max-width: 640px) 100vw, 24vw"
              style={{ aspectRatio: ASPECT_RATIO }}
              src={img.url!}
              alt={img.alternateName}
              width={WIDTH}
              height={HEIGHT}
              // Preload LCP image for better web vitals
              preload={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </li>
        ))}
      </ul>

      {/* Product Info */}
      <div class="px-4 lg:pr-0 lg:pl-6">
        <ProductInfo page={page} />
      </div>
    </div>
  );
}

function ProductDetails(
  { page, variant: maybeVar = "auto", shareableNetworks }: Props,
) {
  /**
   * Showcase the different product views we have on this template. In case there are less
   * than two images, render a front-back, otherwhise render a slider
   * Remove one of them and go with the best suited for your use case.
   */
  const variant = maybeVar === "auto"
    ? page?.product.image?.length && page?.product.image?.length < 2
      ? "front-back"
      : "slider"
    : maybeVar;

  return (
    <div class="py-0">
      {page
        ? (
          <Details
            page={page}
            variant={variant}
            shareableNetworks={shareableNetworks}
          />
        )
        : <NotFound />}
    </div>
  );
}

export default ProductDetails;
