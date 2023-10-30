import { EditableProps } from "deco-sites/copelcolchoes/components/search/Searchbar.tsx";
import type { Product, Suggestion } from "apps/commerce/types.ts";

export type ResultSearch = EditableProps & {
  valueSearch: string;
  notFound: boolean;
  suggestions: { value: Suggestion | null };
};

export type SuggestionsProps = {
  products: Product[];
  searchValue: string;
};

const urlToLabel = (url: string, searchValue: string) => {
  const entryUrl = new URL(url);
  const label = entryUrl.pathname.split("/")[1].replaceAll("-", " ");
  return label.replace(
    searchValue,
    `<strong style="font-weight:900;">${searchValue}</strong>`,
  );
};

const Suggestions = ({ products, searchValue }: SuggestionsProps) => {
  // console.log(products);

  if (!products) return <></>;
  return (
    <ul class="flex flex-col lg:gap-3">
      {products.map((product: Product) => {
        if (!product.url) return;
        return (
          <li>
            <a
              class="text-sm leading-[1.125rem] font-[#444444] "
              href={product.url}
            >
              <p
                dangerouslySetInnerHTML={{
                  __html: urlToLabel(product.url, searchValue),
                }}
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
};

const ResultSearch = (
  { valueSearch, notFound, suggestions }: ResultSearch,
) => {
  if (valueSearch !== "" && suggestions?.value != null) {
    return (
      <div className="absolute w-full top-[3.375rem] left-0 bg-[#fcf9f7] z-50 border-t border-[#fcf9f7] lg:p-5 max-lg:py-6 max-lg:px-4 max-lg:top-12 max-lg:bg-white ">
        <section>
          <h2 class="text-[#848484] font-normal text-xs lg:leading-[1.125rem] lg:mb-7 max-lg:mb-4 max-lg:leading-4">
            Digite por coleção, receita
          </h2>
          {notFound || !(suggestions.value!.products?.length)
            ? (
              <h3 class="font-black text-[##444444] text-sm leading-[1.125rem]">
                Nada encontrado
              </h3>
            )
            : (
              <Suggestions
                products={suggestions.value.products}
                searchValue={valueSearch}
              />
            )}
        </section>
      </div>
    );
  }

  return null;
};

export default ResultSearch;
