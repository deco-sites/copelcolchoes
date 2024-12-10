import Filters from "$store/components/search/Filters.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "../../utils/userOffer.ts";
import ProductGallery from "$store/components/product/ProductGallery.tsx";
import { type LoaderReturnType } from "@deco/deco";
import type { ProductListingPage } from "apps/commerce/types.ts";
import Sort from "$store/islands/Sort.tsx";
import SearchPagination from "$store/components/search/SearchPagination.tsx";
import { type Section } from "@deco/deco/blocks";
import SearchResultsGridChoice from "$store/islands/SearchResultsGridChoice.tsx";

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Not found section, displayed when no products are found
   */
  notFoundSection: Section;
}

function Result({
  page,
  variant,
}: Omit<Omit<Props, "page">, "notFoundSection"> & {
  page: ProductListingPage;
}) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const categoryName = breadcrumb.numberOfItems > 0
    ? breadcrumb.itemListElement[0].name
    : "";

  const productsFound = (
    <h6 class="text-primary font-medium flex text-base font-quicksand items-center">
      Exibindo 12 resultados
    </h6>
  );
  return (
    <>
      <div>
        <div class="flex flex-row">
          {variant === "aside" && filters.length > 0 && (
            <aside class="hidden lg:block mt-1 mr-12">
              <Filters filters={filters} category={categoryName} />
            </aside>
          )}
          <div class="flex flex-col lg:gap-5 w-full">
            <div class="flex justify-between items-center gap-2.5">
              <div class="hidden lg:block">
                {productsFound}
              </div>
              <SearchControls
                sortOptions={sortOptions}
                filters={filters}
                breadcrumb={breadcrumb}
                displayFilter={variant === "drawer"}
              />
              {sortOptions.length > 0
                ? (
                  <label class="flex lg:w-auto items-center max-lg:hidden">
                    <span class="text-primary font-quicksand font-bold mr-[0.1875rem] max-lg:hidden whitespace-nowrap lg:inline">
                      Ordenar por
                    </span>
                    <Sort sortOptions={sortOptions} />
                  </label>
                )
                : null}
              <SearchResultsGridChoice variant="desktop" />
            </div>
            <div class="lg:hidden flex justify-between text-sm">
              {productsFound}
              <SearchResultsGridChoice variant="mobile" />
            </div>
            <div class="flex-grow max-lg:mt-6">
              <ProductGallery products={products} />
              <SearchPagination pageInfo={pageInfo} />
            </div>
          </div>
        </div>
      </div>
      <SendEventOnLoad
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: "",
            item_list_id: "",
            items: page.products?.map((product) =>
              mapProductToAnalyticsItem({
                ...useOffer(product.offers),
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult(
  {
    page,
    notFoundSection: { Component: NotFoundSection, props: notFoundProps },
    ...props
  }: Props,
) {
  if (!page || !page.products || page.products.length === 0) {
    return <NotFoundSection {...notFoundProps} />;
  }

  return <Result {...props} page={page} />;
}

export default SearchResult;
