import { ICartProps } from "$store/components/minicart/Cart.tsx";
import { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import Modals from "$store/islands/HeaderModals.tsx";
import SearchBarComponent from "$store/islands/HeaderSearchbar.tsx";
import WhatsApp from "$store/components/ui/WhatsApp.tsx";

export interface Props {
  /**
   * @title Minicart settings
   */
  minicart: ICartProps;
  /**
   * @title Search bar settings
   */
  searchbar: SearchbarProps;
}

function HeaderLayout(
  {
    minicart,
    searchbar,
  }: Props,
) {
  return (
    <header class="z-50 pb-6 lg:mt-9 border-b border-[rgba(219,219,219,0.36)]">
      <div class="flex justify-between items-center lg:p-0 max-md:h-[4.875rem]">
        <div class="flex items-center gap-5">
          <Buttons variant="menu" />
          <a href="/" class="" aria-label="Store logo">
            <Icon id="Logo" class="max-sm:hidden" width={159} height={79} />
          </a>
        </div>
        <div className="hidden md:flex flex-1 w-full">
          <SearchBarComponent
            searchbar={{ variant: "desktop", ...searchbar }}
          />
        </div>
        <div class="md:hidden">
          <a href="/" class="" aria-label="Store logo">
            <Icon id="Logo" width={105} height={52.16} />
          </a>
        </div>
        <div class="flex justify-end">
          <div class="flex justify-end">
            <div class="max-lg:hidden ml-10 lg:flex lg:items-center">
              <a
                class="lg:flex lg:items-center lg:justify-center"
                href="/nossas-lojas"
              >
                <Icon
                  class="mr-[0.625rem]"
                  id="Lojas"
                  width={21.253}
                  height={28.661}
                  strokeWidth={1}
                />
                <span class="font-medium text-primary">Lojas</span>
              </a>
            </div>
            <div class="max-lg:hidden ml-10 flex items-center text-primary">
              <div class="relative flex items-center justify-center">
                <a
                  class="relative font-medium text-primary text-[0.8125rem] leading-[1.125rem] w-full flex items-center justify-center appearance-none"
                  href="/account"
                >
                  <Icon
                    class="mr-[0.625rem]"
                    id="User"
                    size={28.661}
                    strokeWidth={1}
                  />
                  <p>Minha Conta</p>
                </a>
              </div>
            </div>
            <div class="lg:ml-10">
              <Buttons variant="cart" />
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <SearchBarComponent searchbar={{ variant: "mobile", ...searchbar }} />
      </div>
      <Modals
        minicart={minicart}
      />
    </header>
  );
}

export default HeaderLayout;
