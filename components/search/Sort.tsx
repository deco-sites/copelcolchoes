import { useMemo } from "preact/hooks";
import { ProductListingPage } from "apps/commerce/types.ts";
import Icon from "$store/components/ui/Icon.tsx";

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (searchParam: string) => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  urlSearchParams.set(SORT_QUERY_PARAM, searchParam);
  window.location.search = urlSearchParams.toString();
};

const labels = {
  "release:desc": "Lançamento",
  "name:asc": "A - Z",
  "name:desc": "Z - A",
  "price:asc": "Menor preço",
  "price:desc": "Maior preço",
  "orders:desc": "Mais vendidos",
  "discount:desc": "Melhor desconto",
  "relevance:desc": "Relevância",
};

type LabelKey = keyof typeof labels;

export type Props = Pick<ProductListingPage, "sortOptions">;

function Sort({ sortOptions }: Props) {
  const sort = useSort();
  const _sortOptions = sortOptions.filter((option) => option.value !== "").sort(
    (a, b) => {
      const labelKeys = Object.keys(labels);
      return labelKeys.indexOf(a.value) - labelKeys.indexOf(b.value);
    },
  );

  return (
    <div
      id="sort"
      name="sort"
      class="dropdown dropdown-end w-full lg:auto max-lg:border max-lg:border-primary max-lg:p-3 max-lg:rounded-[5px] max-lg:font-medium max-lg:h-11 max-lg:flex"
    >
      <label
        tabIndex={0}
        class="flex items-center justify-between w-full font-normal text-primary font-quicksand"
      >
        {sort
          ? (
            <span class="text-primary font-semibold mr-2">
              {labels[sort as LabelKey]}
            </span>
          )
          : (
            <>
              <span class="text-primary lg:hidden font-semibold mr-2">
                Ordenar
              </span>
              <span class="max-lg:hidden font-semibold mr-2">
                Mais vendidos
              </span>
            </>
          )}
        <Icon
          id="ChevronDown"
          height={12}
          width={12}
          strokeWidth={1}
          class="text-primary"
        />
      </label>
      <ul
        tabIndex={0}
        class="dropdown-content border border-[#dbdbdb] z-[100] p-0 menu shadow-md bg-white rounded-b-[5px] w-[10.875rem] max-h-[12.5rem] min-h-[15.875rem] -mt-[0.0625rem] flex-nowrap overflow-auto max-lg:top-full"
      >
        {_sortOptions.map(({ value, label }) => (
          <li
            class={`py-2 px-[0.625rem] block cursor-pointer font-quicksand box-border mx-[7px] border-b border-[#dadada] font-medium text-center text-sm ${
              sort && labels[sort as LabelKey] === labels[label as LabelKey]
                ? "bg-[#f2f9fc] text-[#111111]"
                : ""
            }`}
            onClick={() => applySort(value)}
          >
            {labels[label as LabelKey]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sort;
