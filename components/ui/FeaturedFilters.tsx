import { type SectionProps } from "@deco/deco";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { Color } from "apps/admin/widgets.ts";
import { useDevice } from "@deco/deco/hooks";
import { useId } from "preact/hooks";

/**
 * @titleBy matcher
 */
export interface FilterCategory {
  /** @description RegEx para habilitar este filtro na URL atual. Use /feminino/* para exibir estes filtros na categoria feminino */
  matcher: string;

  /**
   * @title Cor do item
   * @description Cor em hexadecimal (ex: #FF0000)
   * @format color
   */
  color: Color;

  /**
   * @titleBy name
   */
  /** @description Lista de categorias em destaque */
  categories: {
    /** @description Nome da categoria */
    name: string;
    /** @description Link da categoria */
    link: string;
  }[];
}

function FeaturedFilters(
  { filterCategory }: SectionProps<ReturnType<typeof loader>>,
) {
  if (!filterCategory) return null;

  const { categories } = filterCategory;
  const Ifilters = useId();
  const device = useDevice();

  if (device === "mobile") {
    return (
      <div class="container lg:px-[4rem] px-[1.375rem] pt-3 pb-8 mx-auto">
        <Slider class="carousel carousel-start gap-[10px]">
          {categories.map((category, index) => (
            <Slider.Item
              index={index}
              class="carousel-item"
            >
              <a
                href={category.link}
                class="px-[20px] py-[10px] rounded-lg text-white font-medium text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: filterCategory.color }}
              >
                {category.name}
              </a>
            </Slider.Item>
          ))}
        </Slider>
        <SliderJS
          rootId={Ifilters}
          itemsPerPage={{ [720]: 4, [0]: 3 }}
        />
      </div>
    );
  }

  return (
    <div class="container lg:px-[4rem] px-[1.375rem] pt-3 pb-8 mx-auto">
      <div class="flex flex-wrap gap-5">
        {categories.map((category) => (
          <a
            href={category.link}
            class="px-[30px] py-[14px] rounded-lg text-white font-medium text-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: filterCategory.color }}
          >
            {category.name}
          </a>
        ))}
      </div>
    </div>
  );
}

/**
 * @titleBy Filtros em Destaque
 * @description Exibe categorias em destaque com base na URL atual. Use o campo matcher para definir a URL onde os filtros serão exibidos.
 */
export interface Props {
  /** @description Lista de categorias em destaque que serão exibidas com base na URL atual. */
  filters?: FilterCategory[];
}

export const loader = ({ filters = [] }: Props, req: Request) => {
  const filterCategory = filters.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  return { filterCategory };
};

export default FeaturedFilters;
