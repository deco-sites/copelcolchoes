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
      <Button
        class={`btn justify-between w-1/2 lg:w-48 btn-sm font-normal max-lg:font-bold max-lg:tracking-[1px] max-lg:text-primary text-base-200 h-[34px] border-2 border-base-200 bg-white hover:bg-white ${
          displayFilter ? "" : "lg:hidden"
        }`}
        onClick={() => {
          open.value = true;
        }}
      >
        Filtrar
        <Icon
          id="Plus"
          size={20}
          strokeWidth={2}
          class="text-primary"
        />
      </Button>
      {sortOptions.length > 0
        ? (
          <label class="flex gap-[20px] w-1/2 lg:w-auto items-center lg:hidden">
            <span class="text-[#4A4B51] text-sm max-lg:hidden whitespace-nowrap lg:inline">
              Ordenar
            </span>
            <Sort sortOptions={sortOptions} />
          </label>
        )
        : null}

      <Modal
        showHeader
        class="lg:w-[20%]"
        loading="lazy"
        title="Filtrar"
        mode="sidebar-left"
        open={open.value}
        onClose={() => {
          open.value = false;
        }}
      >
        <div class="p-8 py-2">
          <Filters filters={filters} category={categoryName} />
        </div>
      </Modal>
    </>
  );
}

export default SearchControls;
