import type { BreadcrumbList } from "apps/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
  class?: string;
}

function Breadcrumb({ class: _class, itemListElement = [] }: Props) {
  const items = [{ name: "Home", item: "/" }, ...itemListElement];

  return (
    <div class={`${_class} my-5`}>
      <ul
        class={`flex flex-wrap font-quicksand text-sm font-medium capitalize text-primary`}
      >
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }, index) => {
            if (
              (index > 2 && index === items.length - 1) || items.length <= 1
            ) {
              return;
            }
            return (
              <li
                class={`flex before:mx-2 before:font-normal before:content-['>'] first:before:hidden last:font-black`}
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
