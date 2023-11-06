import type { BreadcrumbList } from "apps/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
  class?: string;
}

function Breadcrumb({ class: _class, itemListElement = [] }: Props) {
  const items = [{ name: "Home", item: "/" }, ...itemListElement];

  return (
    <div
      class={`${_class} mb-[3.125rem] max-lg:mb-8 ${
        items.length <= 1 ? "h-0 p-0" : "pt-5"
      }`}
    >
      <ul
        class={`flex flex-wrap text-primary font-quicksand text-sm font-medium capitalize`}
      >
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }, index) => {
            if (
              (index > 1 && index != items.length - 1) || items.length <= 1
            ) return;
            return (
              <li
                class={`flex last:font-black before:mx-2 before:content-['>'] before:font-normal first:before:hidden`}
              >
                <a class="!block" href={item}>
                  {name}
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Breadcrumb;
