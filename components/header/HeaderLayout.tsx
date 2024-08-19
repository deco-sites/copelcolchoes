import { ICartProps } from "$store/components/minicart/Cart.tsx";
import { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import Modals from "$store/islands/HeaderModals.tsx";
import SearchBarComponent from "$store/islands/HeaderSearchbar.tsx";
import { clx } from "$store/sdk/clx.ts";
import { useDevice } from "deco/hooks/useDevice.ts";

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

const WIDTH_LOGO = 159;

function HeaderLayout( {  minicart, searchbar }: Props ) {
  const device = useDevice();
  
  return (
    <header class="z-50 pb-6 lg:mt-9 mt-[15px]">
      <div class={clx(`flex md:grid 2xl:grid-cols-[minmax(auto,_159px)_minmax(_542px,_1fr)_auto] max-md:px-0 max-lg:px-[20px]
        md:grid-cols-[minmax(auto,_159px)_minmax(auto,_542px)_auto] items-center lg:max-w-[95%] mx-[auto] my-[0] header-container`)}>
        <div class="flex items-center justify-center gap-5">
          <Buttons variant="menu" />
          <a href="/" class="" aria-label="Store logo">
            <Icon id="Logo" class="max-lg:hidden" width={WIDTH_LOGO} height={79} />
          </a>
        </div>
        <div className="hidden md:flex md:ml-[32px] flex-1 w-full">
          <SearchBarComponent
            searchbar={{ variant: "desktop", ...searchbar, device }}
          />
        </div>
        <div class="lg:hidden logo-mobile">
          <a href="/" class="" aria-label="Store logo">
            <Icon id="Logo" width={105} height={52.16} />
          </a>
        </div>
        <div class="flex w-full md:w-auto justify-start md:justify-end 2xl:mr-[50px] 2xl:ml-0 ml-[8%] ">
          <div class="flex justify-end w-full md:w-auto md:gap-x-[20px] gap-x-[15px]">
            <div class="flex items-center text-primary">
              <div class="hidden lg:flex relative items-center justify-center">
                <a
                  class="relative font-medium text-primary text-[0.8125rem] leading-[1.125rem] w-full flex items-center justify-center appearance-none"
                  href="https://www.copelcolchoes.com.br/_secure/account"
                >
                  {device === 'desktop' 
                  ? (
                      <Icon
                        class="mr-[0.625rem]"
                        id="User"
                        size={36}
                        strokeWidth={1}
                      />
                    )
                  : (
                      <Icon
                        class=""
                        id="UserMobile"
                        size={28}
                        strokeWidth={1}
                      />                    
                    )
                  }
                  
                  <p class={`max-lg:hidden text-[14px] leading-[21px] text-[#656565] font-black`}>
                    Bem vindo! <br /> <span class={`text-primary underline`}>Entre</span>  ou <span class={`text-primary underline`}>cadastre-se</span>
                  </p>
                </a>
              </div>
            </div>
            <div class="m-0 flex lg:items-center lg:w-[107px]">
              <a
                class="flex items-center justify-center w-full md:w-auto"
                href="/nossas-lojas"
              >
                {device === 'desktop' 
                ? (
                  <Icon
                    class="mr-[0.625rem]"
                    id="Lojas"
                    width={36}
                    height={36}
                    strokeWidth={1}
                  />                  
                )
                : (
                  <Icon
                    class=""
                    id="LojasMobile"
                    width={28}
                    height={28}
                    strokeWidth={1}
                  />                  
                )
                }

                <span class={`max-md:ml-[5px] text-[12px] md:text-[14px] leading-[21px] text-[#656565] font-black`}>Lojas <br /> Copel</span>
              </a>
            </div>            
            <div class="[&>button]:w-full">
              <Buttons variant="cart" device={device} />
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

export const loader = (props: Props, _req: Request, ctx: FnContext) => {
  return {
    ...props,
    device: ctx.device,
  };
};

export default HeaderLayout;