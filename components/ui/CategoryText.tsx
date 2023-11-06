import type { SectionProps } from "$live/types.ts";

import type { LoaderReturnType } from "$live/types.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";

export interface Category {
  /** @description RegExp to enable this text category on the current URL. Use /feminino/* to display this text category on feminino category  */
  matcher: string;
  page: LoaderReturnType<ProductListingPage | null>;

  /**
   * @title Description
   * @format html
   */
  html?: string;
}

function CategoryText(
  { category }: SectionProps<ReturnType<typeof loader>>,
) {
  if (!category) {
    return null;
  }

  const categoryText = category?.page?.breadcrumb
    ?.itemListElement[category?.page?.breadcrumb?.itemListElement.length - 1]
    ?.name;

  const { html } = category;

  return (
    <div class={`container lg:max-w-[80rem] w-full m-auto lg:px-[4rem] px-[1.375rem] font-quicksand mt-[1.875rem] mb-[3.125rem] max-lg:mb-8`}>
      <h1 class="text-primary text-[1.75rem] mb-6 font-bold">
        {categoryText}
      </h1>
      {html
        ? (
          <div
            dangerouslySetInnerHTML={{ __html: html }}
            class="text-[#828282] text-[1rem] leading-7 font-medium"
          />
        )
        : null}
    </div>
  );
}

export interface Props {
  categories?: Category[];
}

export const loader = ({ categories = [] }: Props, req: Request) => {
  const category = categories.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  return { category };
};

export default CategoryText;
