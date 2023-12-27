import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import Icon from "$store/components/ui/Icon.tsx";

interface Props {
  filters: ProductListingPage["filters"];
  category?: string;
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem({ url, selected, label, quantity }: FilterToggleValue) {
  return (
    <li class="mb-2 cursor-pointer">
      <a href={`${url}&page=1`} class="flex items-center mb-[0.625rem]">
        <div
          aria-checked={selected}
          rel="nofollow"
          class="checkbox border-secondary aria-checked:border-[#707070] h-5 w-5 shadow-md mr-3 aria-checked:bg-none aria-checked:bg-secondary rounded-[2px] flex justify-center items-center"
        >
          {selected && (
            <Icon
              id="CheckFilter"
              width={12.176}
              height={11.52}
              class="m-auto"
            />
          )}
        </div>
        <span
          class={`text-primary text-base leading-[1.1875rem] ${
            selected ? "font-bold" : "font-normal"
          }`}
        >
          {label}
          {quantity > 0 && <span class="ml-1">({quantity})</span>}
        </span>
      </a>
    </li>
  );
}

function FilterValues({ values }: FilterToggle) {
  return (
    <ul
      class={`flex flex-col`}
    >
      {values.map((item) => {
        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters, category = "" }: Props) {
  const _filters = filters.filter(isToggle).filter((filter) =>
    !(filter.key.includes("category-") || filter.key === ("price") ||
      filter.label === "Marca")
  );
  const orderFilter = {
    "Colchões": [
      "Firmeza",
      "Medidas",
      "Para",
      "Molas",
      "Tipo colchão",
      "Composição",
      "Densidade",
      "Faixa de Altura do Colchão",
    ],
    "Cama Box": [
      "Medidas",
      "Para",
      "Tipo",
      "Cor Lateral",
      "Pezinho",
      "Revestimento",
      "Tratamento",
    ],
    "Cama Box mais Colchão": [
      "Medidas",
      "Para",
      "Tipo colchão",
      "Modelo Box",
      "Firmeza",
      "Mola",
      "Composição",
      "Densidade",
      "Faixa de Altura do Colchão",
      "Altura Box",
      "Marca da Cama Box",
      "Marca do Colchão",
      "Pezinho Cama",
      "Pillow Top",
      "Revestimento Box",
      "Suporte Total de Peso do Colchão",
    ],
    "Móveis": [
      "Medidas",
      "Móveis",
      "Tipo",
      "Cor",
    ],
    "Acessórios": [
      "Acessórios",
      "Material",
      "Medidas",
    ],
    "Travesseiros": [
      "Material",
      "Medidas",
      "Tipo",
      "Perfil",
      "Faixa de Altura",
      "Revestimento travesseiro",
    ],
  };

  if (orderFilter[category as keyof typeof orderFilter]) {
    _filters.sort((a, b) =>
      orderFilter[category as keyof typeof orderFilter].indexOf(a.label) -
      orderFilter[category as keyof typeof orderFilter].indexOf(b.label)
    );
  }

  const selectedFilters = _filters.reduce<FilterToggleValue[]>(
    (initial, filter) => {
      const selected = filter.values.find((value) => value.selected);
      if (!selected) return initial;

      return [...initial, selected];
    },
    [],
  );

  const cleanFilters = (filterUrl: string) => {
    const splitParams = filterUrl.split("&");
    const category1 = splitParams[1].split("=")[1];
    const category2 = splitParams[2]
      ? (splitParams[2].includes("category")
        ? splitParams[2].split("=")[1]
        : undefined)
      : undefined;
    return category2 ? category2 : category1;
  };
  return (
    <div class="w-full lg:w-[18.25rem] text-primary font-quicksand">
      <div class="flex text-center border-b-2 border-[#dbdbdb] max-lg:hidden">
        <p class="text-xl font-semibold mb-5">Filtrar</p>
      </div>
      <div class="py-9">
        {selectedFilters.length > 0 && (
          <>
            <div class="flex justify-between">
              <p class="lg:text-lg font-medium lg:font-bold">
                Filtros selecionados
              </p>
              <a
                href={cleanFilters(selectedFilters[0].url)}
                rel="nofollow"
                class="hover:opacity-80 underline text-normal max-lg:text-sm font-medium transition-opacity duration-200"
                aria-label="limpar filtros"
                title="limpar-filtros"
              >
                limpar filtros
              </a>
            </div>
            <div class="my-6 max-lg:border-b max-lg:border-[#dbdbdb]">
              <div class="flex flex-wrap">
                {selectedFilters.map((filter) => (
                  <a
                    href={filter.url}
                    rel="nofollow"
                    class="block text-sm bg-primary max-lg:bg-secondary text-white py-2 px-3 rounded-[5px] mr-[0.375rem] mb-6 cursor-pointer appearance-none"
                  >
                    {filter.label}
                    <Icon
                      class="ml-2 w-2 h-[10px] inline"
                      id="DeleteFilter"
                      size={10}
                    />
                  </a>
                ))}
              </div>
            </div>
          </>
        )}
        {_filters.map((filter, index) => {
          const filtroFiltrado = filter.values.some((objeto) => objeto.selected)
            ? {
              ...filter,
              values: filter.values.filter((item) => item.selected),
            }
            : filter;
          return (
            <>
              {index < 3
                ? (
                  <div class="my-6 border-b-2 border-[#dbdbdb]">
                    <h3 class="text-lg mb-5 font-black">{filter.label}</h3>
                    <FilterValues {...filtroFiltrado} />
                  </div>
                )
                : (
                  <div class="flex flex-col gap-4">
                    <details
                      class="collapse collapse-arrow"
                      open={false}
                    >
                      <summary class="collapse-title text-lg text-primary font-black min-h-0 px-0 py-2.5 border-b mb-4 border-[#D7D7DA] after:!h-[0.4rem] after:!w-[0.4rem] after:!shadow-[1px_1px]">
                        {filter.label}
                      </summary>
                      <div class="collapse-content px-0 md:max-h-">
                        <FilterValues {...filtroFiltrado} />
                      </div>
                    </details>
                  </div>
                )}
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Filters;
