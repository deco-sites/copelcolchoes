import { Product } from "apps/commerce/types.ts";
import { computed } from "@preact/signals";
import { gridColsSignal } from "$store/components/search/SearchResultsGridChoice.tsx";

import ProductCard from "./ProductCard.tsx";

export interface Props {
  products: Product[] | null;
}

function ProductGallery({ products }: Props) {
  const gridCols = computed(() => gridColsSignal.value);
  return (
    <div
      class={`grid grid-cols-${gridCols.value.mobile} gap-2 items-center lg:grid-cols-${gridCols.value.desktop} lg:gap-[30px]`}
    >
      {products?.map((product, index) => (
        <ProductCard
          product={product}
          preload={index === 0}
          layout={{
            discount: { label: "OFF", variant: "secondary" },
            hide: { skuSelector: true, productDescription: true },
            basics: { contentAlignment: "Center" },
            onMouseOver: {
              image: "Zoom image",
              showCardShadow: true,
              showCta: true,
            },
          }}
        />
      ))}
    </div>
  );
}

export default ProductGallery;
