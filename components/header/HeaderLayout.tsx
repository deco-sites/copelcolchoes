import type { AppContext } from "apps/vtex/mod.ts";
import type { ICartProps } from "$store/components/minicart/Cart.tsx";
import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import Modals from "$store/islands/HeaderModals.tsx";
import SearchBarComponent from "$store/islands/HeaderSearchbar.tsx";
import ModalLoginCustom from "$store/islands/ModalLoginCustom.tsx";

export interface Props {
  minicart: ICartProps;
  searchbar: SearchbarProps;
}

function HeaderLayout({
  minicart,
  searchbar,
  origin,
  device,
}: Awaited<ReturnType<typeof loader>>) {
  const isMobile = device !== "desktop";

  return (
    <header class="z-50 mx-auto max-w-[1180px] px-[1.375rem] py-3 2xl:max-w-[1408px] 2xl:px-0">
      <div class="flex items-center justify-between gap-20 max-[1200px]:gap-5">
        <div class="flex items-center justify-center gap-5">
          <Buttons variant="menu" />
          {!isMobile && (
            <a href="/" aria-label="Logo Copel Colchões">
              <Image
                src={`${origin}/logo-desktop.png`}
                alt="Logo Copel Colchões"
                width={136}
                height={58}
                loading="eager"
                fetchPriority="high"
                preload
              />
            </a>
          )}
        </div>
        {isMobile && (
          <a
            href="/"
            aria-label="Logo Copel Colchões"
            class="block h-[42px] w-[98px] shrink-0"
          >
            <Image
              src={`${origin}/logo-mobile.png`}
              alt="Logo Copel Colchões"
              width={98}
              height={42}
              loading="eager"
              fetchPriority="high"
              preload
            />
          </a>
        )}
        <div class="hidden w-full flex-1 md:flex">
          <SearchBarComponent
            searchbar={{ variant: "desktop", ...searchbar, device }}
          />
        </div>
        <div class="flex w-full justify-start md:w-auto md:justify-end">
          <div class="flex w-full justify-end gap-x-5 md:w-auto">
            <div class="flex items-center text-primary">
              <div class="relative hidden items-center justify-center lg:flex">
                <div class="hidden gap-5 lg:flex">
                  <ModalLoginCustom />
                </div>
              </div>
            </div>
            <div class="m-0 flex lg:w-[107px] lg:items-center">
              <a
                class="flex w-full items-center justify-center md:w-auto"
                href="/nossas-lojas"
              >
                {device === "desktop" ? (
                  <Icon
                    class="mr-[0.625rem]"
                    id="Lojas"
                    width={36}
                    height={36}
                    strokeWidth={1}
                  />
                ) : (
                  <Icon
                    id="LojasMobile"
                    width={28}
                    height={28}
                    strokeWidth={1}
                  />
                )}
                <span class="text-xs font-black leading-[1.2] text-[#656565] max-md:ml-[5px] md:text-[14px]">
                  Lojas <br /> Copel
                </span>
              </a>
            </div>
            <div class="[&>button]:w-full">
              <Buttons variant="cart" device={device} />
            </div>
          </div>
        </div>
      </div>
      <div class="md:hidden">
        <SearchBarComponent searchbar={{ variant: "mobile", ...searchbar }} />
      </div>
      <Modals minicart={minicart} />
    </header>
  );
}

export const loader = (props: Props, req: Request, ctx: AppContext) => {
  return {
    ...props,
    device: ctx.device,
    origin: new URL(req.url).origin,
  };
};

export default HeaderLayout;
