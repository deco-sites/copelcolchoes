import { Product } from "apps/commerce/types.ts";
import { computed } from "@preact/signals";
import { gridColsSignal } from "$store/components/search/SearchResultsGridChoice.tsx";
import type { TagsConfig } from "../../app-tags/utils/types.ts";

import ProductCard from "./ProductCard.tsx";

export interface Props {
  products: Product[] | null;
  tags?: TagsConfig | null;
}

function ProductGallery({ products, tags }: Props) {
  const gridCols = computed(() => gridColsSignal.value);
  return (
    <div
      class={`product-gallery grid grid-cols-${gridCols.value.mobile} gap-2 items-center lg:grid-cols-${gridCols.value.desktop} lg:gap-[30px]`}
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
          tags={tags}
        />
      ))}
    </div>
  );
}

export default ProductGallery;
