import Filters from "$store/components/search/Filters.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Modal from "$store/components/ui/Modal.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";
import Sort from "$store/islands/Sort.tsx";

type Props =
  & Pick<
    ProductListingPage,
    "filters" | "breadcrumb" | "sortOptions"
  >
  & {
    displayFilter?: boolean;
  };

function SearchControls(
  { filters, sortOptions, displayFilter, breadcrumb }: Props,
) {
  const open = useSignal(false);
  const categoryName = breadcrumb.numberOfItems > 0
    ? breadcrumb.itemListElement[0].name
    : "";
  return (
    <>
      <button
        class={`bg-primary border border-primary w-[98px] text-white font-quicksand mr-[3.125rem] p-3 rounded-[5px] font-medium mb-11 flex ${
          displayFilter ? "" : "lg:hidden"
        }`}
        onClick={() => {
          open.value = true;
        }}
      >
        <span class="font-medium flex items-center">
          Filtrar
          <Icon
            id="ChevronDown"
            size={16}
            class="text-white ml-[0.625rem]"
          />
        </span>
      </button>
      {sortOptions.length > 0
        ? (
          <label class="flex gap-[20px] lg:w-auto items-center lg:hidden mb-11">
            <Sort sortOptions={sortOptions} />
          </label>
        )
        : null}

      <Modal
        showHeader
        class="lg:w-[20%]"
        loading="lazy"
        title="Filtrar"
        mode="sidebar-right"
        open={open.value}
        onClose={() => {
          open.value = false;
        }}
      >
        <div class="px-4">
          <Filters filters={filters} category={categoryName} />
        </div>
      </Modal>
    </>
  );
}

export default SearchControls;
