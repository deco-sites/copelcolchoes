import { headerHeight } from "./constants.ts";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface INavItem {
  label: string;
  href?: string;
  highlighted?: boolean;
  children?: INavItem[];
  variant?: "CommonChild" | "AllCategories" | "WithBrands" | "Other";
  image?: Image;
}

export interface Image {
  src?: LiveImage;
  alt?: string;
  href?: string;
}

function splitNatItems(children: INavItem[], number = 6) {
  const slices = [];
  const totalSlices = Math.ceil(children.length / number);

  for (let i = 0; i < totalSlices; i++) {
    slices.push(children.slice(i * number, (i + 1) * number));
  }

  return slices;
}

function NavItemDropDown(
  { elements, variant, image, label }: {
    elements?: INavItem[];
    variant?: string;
    image?: Image;
    label: string;
  },
) {
  if (!elements || !elements?.length) {
    return <span />;
  }
  if (variant === "AllCategories") {
    const navStyle = {
      "Colchões": "!left-0 !translate-x-0 !pr-[12.5rem]",
      "Cama Box": "!left-0 !translate-x-0",
      "Cama Box Colchão": "!pr-[12.5rem]",
      "Acessórios": "!pr-[12.5rem]",
    }
    return (
      <div
        class={`left-[50%] translate-x-[-50%] shadow-md rounded-b-[20px] absolute pt-9 pb-[3.875rem] px-6 top-[100%] z-20 hidden hover:flex group-hover:flex flex-col items-center bg-white ${navStyle[label as keyof typeof navStyle] || ""}`}
      >
        <div class="container w-full pt-5 pb-5 m-auto px-5 flex items-start justify-start gap-16">
          {elements.map((element) => {
            return (
              <div class="mr-[83px]">
                {element.href
                  ? (
                    <a
                      href={element.href || ""}
                      class="hover:font-extrabold font-bold hover:underline transition-all duration-300"
                    >
                      <span>{element.label}</span>
                    </a>
                  )
                  : <span>{element.label}</span>}
                <ul
                  class={`mt-3 grid gap-x-[14px]`}
                >
                  {element.children &&
                    element.children.map((child) => (
                      <li class="mb-3">
                        <a
                          class="text-sm text-base-content hover:font-bold hover:underline transition-all duration-300"
                          href={child.href || ""}
                        >
                          <span>{child.label}</span>
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            );
          })}
          {image && (
            <a href={image.href || ""}>
              <img
                src={image.src}
                alt={image.alt || "Banner vertical do menu"}
                class="h-full w-auto justify-self-end"
              />
            </a>
          )}
        </div>
      </div>
    );
  }
  const navItemsCol = variant === "AllCategories"
    ? splitNatItems(elements, 6)
    : splitNatItems(elements, 8);
  return (
    <div
      class="absolute hidden hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center gap-6 w-full shadow-md"
      style={{ top: "0px", left: "0px", marginTop: headerHeight }}
    >
      <div class="container w-full pt-5 pb-5 m-auto px-5 flex items-start justify-start gap-16">
        {navItemsCol.map((column) => (
          <ul class="flex items-start justify-start flex-col">
            {column.map((node) => (
              <li class="mb-3">
                <a
                  class="text-sm text-base-content hover:font-bold hover:underline transition-all duration-300"
                  href={node.href || ""}
                >
                  <span>{node.label}</span>
                </a>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

function NavItem({ item }: { item: INavItem }) {
  const { href, label, children, highlighted, variant, image } = item;
  return (
    <li
      class={`group flex items-center justify-center relative`}
    >
      <a
        href={href}
        class={`py-3 text-center relative after:absolute after:transition-all after:duration-150 after:-bottom-1 after:left-0 after:z-30 group-hover:after:opacity-100 after:w-full after:opacity-0 after:h-1 after:bg-secondary`}
      >
        <span
          class={`relative transition-all font-bold duration-300  ${
            highlighted
              ? "text-secondary group-hover:text-primary"
              : "text-primary group-hover:text-primary-focus"
          }`}
        >
          {label}
        </span>
      </a>
      <NavItemDropDown variant={variant} elements={children} image={image} label={label} />
    </li>
  );
}

export default NavItem;
