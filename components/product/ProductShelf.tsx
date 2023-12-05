import type { LoaderReturnType } from "$live/types.ts";
import type { Layout as CardLayout } from "$store/components/product/ProductCard.tsx";
import ProductCard from "$store/components/product/ProductCard.tsx";
import {
  CONDITIONAL_RESPONSIVE_PARAMS,
  ResponsiveConditionals,
} from "$store/components/ui/BannerCarousel.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useId } from "preact/hooks";

export interface Props {
  products: LoaderReturnType<Product[] | null>;

  title?: string;
  seeMore?: {
    url?: string;
    label?: string;
  };
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large";
    color?: "primary" | "secondary";
  };
  showPaginationArrows?: ResponsiveConditionals;
  cardLayout?: CardLayout;
}

interface DotsProps {
  images?: Product[];
  interval?: number;
  className: string;
}

function Dots({ images, interval = 0 }: DotsProps) {
  return (
    <>
      <ul
        class={`carousel justify-center col-span-full gap-2 z-10 row-start-4`}
      >
        {images?.map((_, index) => (
          <li class="carousel-item block">
            <Slider.Dot
              index={index}
              classes={`${
                ((index === 0) || (index % 4 === 0)) ? "" : "lg:hidden lg:w-0"
              }`}
            >
              <div
                class={`${
                  ((index === 0) || (index % 4 === 0)) ? "" : "lg:hidden lg:w-0"
                }`}
              >
                <div
                  class="w-2 h-2 group-disabled:scale-100 group-disabled:opacity-100 opacity-50 scale-[0.33] rounded-full bg-primary"
                  style={{ animationDuration: `${interval}s` }}
                />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}

function ProductShelf({
  products,
  title,
  layout,
  cardLayout,
  seeMore,
  showPaginationArrows,
}: Props) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="w-full pb-8 flex flex-col lg:pb-10">
      <Header
        title={title || ""}
        description=""
        fontSize={layout?.headerfontSize || "Large"}
        alignment={layout?.headerAlignment || "center"}
        color={layout?.color || "primary"}
      />
      <div
        id={id}
        class="grid grid-cols-[42px_1fr_42px] max-lg:grid-cols-[30px_1fr_30px] px-0 grid-rows-[1fr_42px_1fr] max-lg:grid-rows-[1fr_30px_1fr]"
      >
        <Slider class="carousel carousel-center gap-6 col-span-full row-span-full py-2 lg:mx-8 my-5">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item h-auto w-[264px] justify-center"
            >
              <ProductCard
                product={product}
                itemListName={title}
                layout={cardLayout}
              />
            </Slider.Item>
          ))}
        </Slider>

        <>
          <div
            class={`flex items-center justify-center z-10 col-start-1 row-start-2  ${
              CONDITIONAL_RESPONSIVE_PARAMS[
                showPaginationArrows ? showPaginationArrows : "Always"
              ]
            }`}
          >
            <Slider.PrevButton
              style={{
                minHeight: "28px",
              }}
              class="btn btn-circle border-none bg-primary text-white hover:bg-primary w-[42px] h-[42px] max-lg:w-[30px] max-lg:h-[30px] max-lg:ml-[-30px]"
            >
              <Icon
                size={17}
                id="LeftArrowFigma"
              />
            </Slider.PrevButton>
          </div>
          <div
            class={`flex items-center justify-center z-10 col-start-3 row-start-2 ${
              CONDITIONAL_RESPONSIVE_PARAMS[
                showPaginationArrows ? showPaginationArrows : "Always"
              ]
            }`}
          >
            <Slider.NextButton
              style={{
                minHeight: "28px",
              }}
              class="btn btn-circle border-none bg-primary text-white hover:bg-primary w-[42px] h-[42px] max-lg:w-[30px] max-lg:h-[30px]  max-lg:mr-[-30px]"
            >
              <Icon
                size={17}
                id="RightArrowFigma"
              />
            </Slider.NextButton>
          </div>
        </>

        <SendEventOnLoad
          event={{
            name: "view_item_list",
            params: {
              item_list_name: title,
              items: products.map((product) =>
                mapProductToAnalyticsItem({
                  product,
                  ...(useOffer(product.offers)),
                })
              ),
            },
          }}
        />
        <Dots
          images={products}
          className={CONDITIONAL_RESPONSIVE_PARAMS["Always"]}
        />
        <SliderJS
          rootId={id}
          infinite
          itemsPerPage={{ [720]: 4, [0]: 1 }}
        />
      </div>
      {seeMore && seeMore.label
        ? (
          <span class="my-5 mx-auto p-[0.625rem] bg-white border border-primary text-primary text-[0.9375rem] rounded-[5px] font-bold text-center block w-[14.6875rem]">
            <a href={seeMore.url}>
              {seeMore.label}
            </a>
          </span>
        )
        : null}
    </div>
  );
}

export default ProductShelf;
