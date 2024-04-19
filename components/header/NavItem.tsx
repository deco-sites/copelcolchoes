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

function NavItemDropDown(
  { elements, image, label, href }: {
    elements?: INavItem[];
    image?: Image;
    label: string;
    href: string;
  },
) {
  if (!elements || !elements?.length) {
    return <span />;
  }
  const navStyle = {
    "Colchões": "!left-0 !translate-x-0 !pr-[12.5rem]",
    "Cama Box": "!left-0 !translate-x-0",
    "Cama Box Colchão": "!pr-[12.5rem]",
    "Acessórios": "!pr-[12.5rem]",
  };
  const imgStyle = {
    "Colchões": "!right-[-299px] !max-w-[232px]",
    "Cama Box": "!right-[-150px] !max-w-[232px]",
    "Cama Box Colchão": "!right-[-300px] !max-w-[232px]",
    "Travesseiros": "!right-[-180px] !max-w-[232px] !bottom-[-29px]",
    "Acessórios": "!right-[-330px]",
    "Móveis": "!right-[-156px] !top-[-33px]",
  };
  return (
    <div
      class={`left-[50%] translate-x-[-50%] shadow-md rounded-b-[20px] absolute pt-9 pb-[3.875rem] px-6 top-[100%] z-20 hidden hover:flex group-hover:flex flex-col items-center bg-white ${
        navStyle[label as keyof typeof navStyle] || ""
      }`}
    >
      <div class="flex justify-center">
        <ul class="flex gap-[64px] items-start relative w-full">
          {elements.map((element) => {
            return (
              <li class="relative">
                <span class="text-primary inline-block w-full font-quicksand font-bold leading-5 mb-4">
                  {element.label}
                </span>
                <ul class="relative w-full max-h-[15.6875rem] mt-[0.9375rem] flex flex-col flex-wrap">
                  {element.children &&
                    element.children.map((child) => (
                      <li class="w-[12.5rem]">
                        <a
                          class="font-quicksand text-[#828282] leading-5 inline-block w-full mb-4 whitespace-break-spaces font-light"
                          href={child.href || ""}
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                </ul>
              </li>
            );
          })}
          {image && (
            <div class="w-full">
              <img
                loading="lazy"
                src={image.src}
                alt={image.alt || "Banner vertical do menu"}
                class={`right-[-200px] absolute max-w-[200px] w-full h-auto inline-block align-middle ${
                  imgStyle[label as keyof typeof imgStyle]
                }`}
              />
            </div>
          )}
        </ul>
      </div>
      <div class="flex items-end pb-[1.375rem] min-w-[12.5rem]">
        <a
          href={href}
          class="leading-5 font-bold absolute bottom-[-20px] bg-primary py-[10px] px-[18px] text-white rounded-md left-[50%] translate-x-[-50%] w-auto text-center whitespace-break-spaces"
        >
          Ver tudo de {label}
        </a>
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
          class={`relative transition-all font-bold duration-300 leading-[0.03125rem] ${
            highlighted
              ? "text-secondary group-hover:text-primary"
              : "text-primary group-hover:text-primary-focus"
          }`}
        >
          {label}
        </span>
      </a>
      <NavItemDropDown
        elements={children}
        image={image}
        label={label}
        href={href || ""}
      />
    </li>
  );
}

export default NavItem;
