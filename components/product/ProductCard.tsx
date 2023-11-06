import { ButtonVariant } from "$store/components/minicart/Cart.tsx";
import { sendEventOnClick } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { Product, PropertyValue } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "deco-sites/std/components/Image.tsx";
import DiscountBadge from "./DiscountBadge.tsx";

export interface Layout {
  basics?: {
    contentAlignment?: "Left" | "Center";
    oldPriceSize?: "Small" | "Normal";
    ctaText?: string;
    mobileCtaText?: string;
    ctaVariation?: ButtonVariant;
    ctaMode?: "Go to Product Page" | "Add to Cart";
  };
  discount: {
    label: string;
    variant:
      | "primary"
      | "secondary"
      | "neutral"
      | "accent"
      | "emphasis"
      | "success"
      | "info"
      | "error"
      | "warning";
  };
  elementsPositions?: {
    skuSelector?: "Top" | "Bottom";
    favoriteIcon?: "Top right" | "Top left";
  };
  hide: {
    productName?: boolean;
    productDescription?: boolean;
    allPrices?: boolean;
    installments?: boolean;
    skuSelector?: boolean;
    cta?: boolean;
  };
  onMouseOver?: {
    image?: "Change image" | "Zoom image";
    showFavoriteIcon?: boolean;
    showSkuSelector?: boolean;
    showCardShadow?: boolean;
    showCta?: boolean;
  };
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;
  layout?: Layout;
  class?: string;
}

export const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

const getMedidas = (prop: PropertyValue[]) => {
  const larguraArray = prop.find((objeto) => objeto.name === "Largura (cm)");
  const comprimentoArray = prop.find((objeto) =>
    objeto.name === "Comprimento (cm)"
  );
  const larguraString = larguraArray ? larguraArray.value : undefined;
  const comprimentoString = comprimentoArray
    ? comprimentoArray.value
    : undefined;
  if (!larguraString || !comprimentoString) return "";
  return `${larguraString} x ${comprimentoString}`;
};

const getPara = (prop: PropertyValue[]) => {
  const paraArray = prop.find((objeto) => objeto.name === "Para");
  const paraString = paraArray ? paraArray.value : "";
  return paraString || "";
};

const WIDTH = 200;
const HEIGHT = 200;

function ProductCard(
  { product, itemListName, class: _class }: Props,
) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
    isVariantOf,
  } = product;
  // deno-lint-ignore no-explicit-any
  const { additionalProperty } = isVariantOf as any;
  const medidas = getMedidas(additionalProperty);
  const para = getPara(additionalProperty);
  const [front] = images ?? [];
  const { listPrice, price, installment, availability } = useOffer(
    offers,
  );
  const clickEvent = {
    name: "select_item" as const,
    params: {
      item_list_name: itemListName,
      items: [
        mapProductToAnalyticsItem({
          product,
          price,
          listPrice,
        }),
      ],
    },
  };

  const price2: number = price as number;
  const listPrice2: number = listPrice as number;

  return (
    <article
      class="h-full font-quicksand shadow-md rounded-[5px] border border-[#dbdbdb] flex flex-col justify-between hover:border-primary"
      data-deco="view-product"
      id={`product-card-${productID}`}
      {...sendEventOnClick(clickEvent)}
    >
      <div class="relative overflow-hidden px-7 pt-[1.375rem] max-lg:py-7 max-lg:px-6">
        <div class="relative">
          <a
            href={url && relative(url)}
            aria-label="view product"
            class="block"
          >
            <Image
              src={front.url!}
              alt={front.alternateName}
              width={WIDTH}
              height={HEIGHT}
              class="aspect-square object-cover block w-full h-auto"
            />
          </a>
        </div>
        {listPrice2 !== price2 && (
          <DiscountBadge
            price={price2}
            listPrice={listPrice2}
          />
        )}
      </div>

      {/* Prices & Name */}
      <div class="lg:py-6 lg:px-5 relative overflow-hidden max-lg:pt-0 max-lg:px-5 max-lg:pb-7">
        <a
          href={url && relative(url)}
          aria-label="view product"
          class="block"
        >
          <h2 class="lg:text-base lg:leading-[1.375rem] text-[#828282] font-medium mb-[1.125rem]">
            {isVariantOf?.name || name}
          </h2>
        </a>
        <div>
          {(medidas.length > 0 || para.length > 0) &&
            (
              <div class="flex mb-4 flex-wrap gap-y-2">
                {medidas.length > 0 && (
                  <div class="mr-2">
                    <p class="flex w-fit text-center text-white bg-[#466fa3] text-xs leading-4 py-1 px-[0.625rem] rounded-[10px]">
                      {medidas}
                    </p>
                  </div>
                )}
                {para.length > 0 && (
                  <div>
                    <p class="flex w-fit text-center text-white bg-[#466fa3] text-xs leading-4 py-1 px-[0.625rem] rounded-[10px]">
                      {para}
                    </p>
                  </div>
                )}
              </div>
            )}
        </div>
        <div class="flex flex-col">
          <div class="flex flex-col max-lg:contents">
            {availability === "https://schema.org/InStock"
              ? (
                <>
                  {(listPrice && price) && listPrice > price && (
                    <del class="mb-[0.3125rem] text-[#464646] font-light text-[0.875rem] leading-[1.125rem] font-quicksand">
                      De {formatPrice(listPrice, offers!.priceCurrency!)}
                    </del>
                  )}
                  <ins class="font-bold no-underline text-secondary text-xl leading-[1.5625rem] mb-[0.3125rem] font-quicksand">
                    POR: {installment?.billingDuration}x de ${formatPrice(
                      installment?.billingIncrement,
                      offers!.priceCurrency!,
                    )}
                  </ins>
                  <span class="text-[#828282] text-[0.8125rem] font-medium font-quicksand">
                    À vista: {formatPrice(price, offers!.priceCurrency!)}
                  </span>
                  <span class="text-[#828282] text-[0.8125rem] font-medium font-quicksand">
                    10% de desconto no Pix ou Boleto
                  </span>
                </>
              )
              : null}
          </div>
        </div>
        {availability === "https://schema.org/InStock"
          ? (
            <a
              href={url && relative(url)}
              aria-label="view product"
              class="block"
            >
              <div>
                <button
                  title="Saiba mais"
                  type="button"
                  class="bg-black w-full text-white tracking-normal capitalize mt-[1.875rem] leading-5 rounded-[0.3125rem] p-0 flex justify-center items-center border border-transparent font-bold relative h-[2.625rem]"
                >
                  Saiba mais
                </button>
              </div>
            </a>
          )
          : null}
      </div>
    </article>
  );
}

export default ProductCard;
