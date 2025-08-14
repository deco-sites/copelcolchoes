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

function NavItemDropDown({
  elements,
  image,
  textBanner,
  activeMenu,
  label,
}: {
  elements?: INavItem[];
  image?: ImageGeneric;
  textBanner?: TextBanner;
  activeMenu?: boolean;
  label: string;
}) {
  if (!elements || !elements?.length) {
    return <span />;
  }

  const navStyle = {
    Colchões: "!left-0 !translate-x-0",
    "Cama Box": "!left-0 !translate-x-0",
  };

  return (
    <div
      class={clx(
        `fixed left-[0] top-[153px] z-20 w-full rounded-b-[20px] px-6 pb-[50px] pt-[30px] shadow-[inset_0_7px_0_0_rgb(0,42,97)] ${
          activeMenu ? "flex" : "hidden"
        } flex-col items-center bg-white hover:flex group-hover:flex ${
          navStyle[label as keyof typeof navStyle] || ""
        }`,
      )}
    >
      <div class="container mx-[auto] flex items-center justify-start">
        <div class="container-menu flex w-full justify-between">
          <ul class="relative flex w-full items-start gap-[40px] max-[1220px]:gap-5">
            {elements.map((element) => {
              return (
                <li class="relative">
                  <span class="mb-[14px] inline-block w-full font-comfortaa text-[16px] font-bold leading-[20.8px] tracking-[1px] text-primary">
                    {element.label}
                  </span>
                  <ul class="relative flex max-h-[15.6875rem] w-full flex-col flex-wrap gap-x-10 gap-y-[14px]">
                    {element.children &&
                      element.children.map((child) => (
                        <li>
                          <a
                            class="inline-block w-full whitespace-break-spaces font-comfortaa font-normal leading-[19.6px] text-primary lg:text-[12px] xl:text-[14px]"
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
            <div class="flex w-full justify-end">
              <a
                class="relative"
                href={`${image.href ? image.href : "javascript:void(0)"}`}
                style={{
                  pointerEvents: `${image.href ? "all" : "none"}`,
                }}
              >
                <div
                  class={clx(
                    `absolute flex h-full w-full flex-col items-center`,
                  )}
                >
                  {textBanner && (
                    <div class={clx(`mt-[36px] flex flex-col gap-y-[8px]`)}>
                      {textBanner.title && (
                        <span
                          class={clx(
                            `text-center font-poppins text-[1.25rem] font-normal leading-[1.125rem] text-[#fff]`,
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
                          class={clx(`rounded-[20px] px-5 pb-[5px] pt-[7px]`)}
                          style={{
                            backgroundColor: textBanner.bgButton
                              ? textBanner.bgButton
                              : "initial",
                          }}
                        >
                          <span
                            class="font-poppins text-[1.25rem] font-bold leading-[1.125rem]"
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
                    `container-menu__image overflow-hidden rounded-[10px]`,
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
                    alt="Banner vertical do menu"
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
        "group relative flex items-center justify-center rounded-[30px] duration-150",
        highlighted ? "rounded-[30px] bg-[#fff]" : "hover:bg-primary-focus",
      )}
    >
      <a
        href={href}
        class="relative text-center md:px-5 min-[1220px]:px-[30px]"
      >
        <div class={`flex items-center`}>
          {highlighted && (
            <Icon
              class="-mt-[2px] text-primary"
              id="IconMenuOutlet"
              size={18}
            />
          )}

          <span
            class={clx(
              `relative -mb-[2px] font-comfortaa text-[14px] font-bold leading-[28px] transition-all duration-300 ${
                highlighted
                  ? "ml-[8px] leading-[20px] text-primary"
                  : "text-[#fff]"
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
            `fixed bottom-0 left-0 hidden h-[calc(100%-225px)] w-full bg-[rgba(13,79,129,.6)] hover:!hidden group-hover:flex`,
          )}
        >
        </div>
      )}
    </li>
  );
}

export default NavItem;
