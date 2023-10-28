import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "deco-sites/std/commerce/types.ts";

interface Props {
  filters: ProductListingPage["filters"];
  category: string;
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem({ url, selected, label, quantity }: FilterToggleValue) {
  return (
    <a href={`${url}&page=1`} class="flex items-center gap-2">
      <div
        aria-checked={selected}
        class="checkbox aria-checked:bg-none rounded-none h-4 w-4"
      >
        {selected && (
          <div class="bg-primary w-full h-full border-white border-2" />
        )}
      </div>
      <span class="text-sm text-[#4A4B51]">
        {label}
        {quantity > 0 && (
          <span class="ml-1 text-sm text-[#4A4B51]">({quantity})</span>
        )}
      </span>
    </a>
  );
}

function FilterValues({ values }: FilterToggle) {
  return (
    <ul
      class={`flex gap-2 flex-col md:max-h-[135px] md:overflow-auto scrollbar-list`}
    >
      {values.map((item) => {
        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters, category }: Props) {
  console.log(category);

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

  return (
    <ul class="flex flex-col gap-2 text-primary">
      <li>
        <p class="font-normal tracking-[1px] mb-5 text-[19px]">Filtrar por:</p>
        {selectedFilters.length > 0 && (
          selectedFilters.map((filter) => (
            <div class="mb-2">
              <ValueItem {...filter} />
            </div>
          ))
        )}
      </li>
      {_filters.map((filter, index) => (
        <li class="flex flex-col gap-4">
          <details
            class="collapse collapse-plus"
            open={index < 3 ? true : false}
          >
            <summary class="collapse-title text-sm text-primary font-medium min-h-0 px-0 py-2.5 border-b mb-4 after:!right-[10px] after:text-[20px] after:!top-[10px] border-[#D7D7DA] after:!font-medium">
              {filter.label}
            </summary>
            <div class="collapse-content px-0 md:max-h-">
              <FilterValues {...filter} />
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}

export default Filters;
