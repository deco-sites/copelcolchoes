import Image from "apps/website/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { clx } from "$store/sdk/clx.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";

interface ImageGeneric {
  /**@title Imagem */
  src?: ImageWidget;
  /**
   * @title Largura da imagem
   * @description (ex: 200)
   */
  width?: number;
  /**
   * @title Altura da imagem
   * @description (ex: 400)
   */
  height?: number;
  /**
   * @title Link da imagem
   * @description (ex: /colchoes)
   */
  href?: string;
}

/**@titleBy title */
interface TextBanner {
  /** @title Título */
  title?: string;
  /** @title Texto do botão */
  textButton?: string;
  /**
   * @title Cor do texto do Título
   * @format color
   */
  colorTitle?: string;
  /**
   * @title Cor do texto do botão
   * @format color
   */
  colorTextButton?: string;
  /**
   * @title Cor de fundo do botão
   * @format color
   */
  bgButton?: string;
}

export interface INavItem {
  label: string;
  href?: string;
  highlighted?: boolean;
  children?: INavItem[];
  variant?: "CommonChild" | "AllCategories" | "WithBrands" | "Other";
  /**@title Banner menu */
  image?: ImageGeneric;
  /**@title Texto para Banner do menu */
  textBanner?: TextBanner;
  /**@title ATIVAR SOMENTE PARA VISUALIZAR EDIÇÕES FEITA NO ADMIN */
  activeMenu?: boolean;
}

function NavItemDropDown(
  { elements, image, textBanner, activeMenu, label }: {
    elements?: INavItem[];
    image?: ImageGeneric;
    textBanner?: TextBanner;
    activeMenu?: boolean;
    label: string;
  },
) {
  if (!elements || !elements?.length) {
    return <span />;
  }

  const navStyle = {
    "Colchões": "!left-0 !translate-x-0",
    "Cama Box": "!left-0 !translate-x-0",
  };

  return (
    <div
      class={clx(
        `shadow-md rounded-b-[20px] w-full left-[0] fixed top-[218px] pt-[30px] pb-[50px] px-6 z-20 ${
          activeMenu ? "flex" : "hidden"
        } hover:flex 
        group-hover:flex flex-col items-center bg-white border-t-[4px] border-primary ${
          navStyle[label as keyof typeof navStyle] || ""
        }`,
      )}
    >
      <div
        class={clx(
          `md:w-[1440px] mx-[auto] my-[0] lg:pl-[80px] md:pl-[100px] 2xl:pl-[50px] flex items-center justify-start menu-container`,
        )}
      >
        <div class="flex justify-between xl:w-[85%] xl:pr-[70px] 2xl:w-[95%] container-menu">
          <ul class="flex gap-[40px] items-start relative w-full">
            {elements.map((element) => {
              return (
                <li class="relative">
                  <span class="text-primary inline-block w-full font-comfortaa text-[16px] tracking-[1px] font-bold leading-[20.8px] mb-[14px]">
                    {element.label}
                  </span>
                  <ul class="relative w-full max-h-[15.6875rem] flex flex-col flex-wrap gap-y-[14px]">
                    {element.children &&
                      element.children.map((child) => (
                        <li class="lg:w-[5.5rem] xl:w-[12.5rem]">
                          <a
                            class="font-comfortaa text-primary lg:text-[12px] xl:text-[14px] leading-[19.6px] inline-block w-full whitespace-break-spaces font-normal"
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
          </ul>
          {image?.src && image?.width && image.height && (
            <div class="w-full flex justify-end">
              <a
                class="relative"
                href={`${image.href ? image.href : "javascript:void(0)"}`}
                style={{
                  pointerEvents: `${image.href ? "all" : "none"}`,
                }}
              >
                <div
                  class={clx(
                    `absolute w-full h-full flex flex-col items-center`,
                  )}
                >
                  {textBanner && (
                    <div class={clx(`mt-[36px] flex flex-col gap-y-[8px]`)}>
                      {textBanner.title && (
                        <span
                          class={clx(
                            `text-[#fff] text-center  font-poppins text-[1.25rem] font-normal leading-[1.125rem]`,
                          )}
                          style={{
                            color: textBanner.colorTitle
                              ? textBanner.colorTitle
                              : "initial",
                          }}
                        >
                          {textBanner.title}
                        </span>
                      )}
                      {textBanner.textButton && (
                        <button
                          class={clx(`pt-[7px] pb-[5px] px-5 rounded-[20px]`)}
                          style={{
                            backgroundColor: textBanner.bgButton
                              ? textBanner.bgButton
                              : "initial",
                          }}
                        >
                          <span
                            class="font-bold font-poppins text-[1.25rem] leading-[1.125rem]"
                            style={{
                              color: textBanner?.colorTextButton
                                ? textBanner.colorTextButton
                                : "initial",
                            }}
                          >
                            {textBanner.textButton}
                          </span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <div
                  class={clx(
                    `rounded-[10px] overflow-hidden container-menu__image`,
                  )}
                  style={{
                    width: image.width ? image.width + "px" : "",
                    height: image.height ? image.height + "px" : "",
                  }}
                >
                  <Image
                    loading="lazy"
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    alt={"Banner vertical do menu"}
                  />
                </div>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NavItem({ item }: { item: INavItem }) {
  const { href, label, children, highlighted, image, textBanner, activeMenu } =
    item;

  return (
    <li
      class={clx(
        `group flex items-center md:px-[30px] md:py-[1px] rounded-[30px] justify-center relative 
        duration-150 ${
          highlighted ? "rounded-[30px] bg-[#fff]" : "hover:bg-primary-focus"
        }`,
      )}
    >
      <a
        href={href}
        class={`py-[9px] text-center relative`}
      >
        <div class={`flex items-center`}>
          {highlighted && (
            <Icon
              class="text-primary"
              id="IconMenuOutlet"
              size={18}
            />
          )}

          <span
            class={clx(
              `relative transition-all font-bold duration-300 leading-[18.2px] text-[14px] font-comfortaa
              ${
                highlighted ? "text-primary mt-[3px] ml-[8px]" : "text-[#fff]"
              } `,
            )}
          >
            {label}
          </span>
        </div>
      </a>
      <NavItemDropDown
        elements={children}
        image={image}
        label={label}
        textBanner={textBanner}
        activeMenu={activeMenu}
      />

      {children && Object.entries(children).length > 0 && (
        <div
          class={clx(
            `fixed w-full h-[calc(100%-225px)] left-0 bottom-0 bg-[rgba(13,79,129,.6)] hidden hover:!hidden group-hover:flex`,
          )}
        >
        </div>
      )}
    </li>
  );
}

export default NavItem;
