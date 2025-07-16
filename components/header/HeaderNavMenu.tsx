import Modals from "$store/islands/HeaderModals.tsx";
import NavItem, { INavItem } from "./NavItem.tsx";
import { megaMenuDefaultItems } from "./constants.ts";
import { clx } from "$store/sdk/clx.ts";
import { useScroll } from "$store/sdk/useScroll.ts";
import { headerHeight } from "$store/components/header/constants.ts";

export interface Props {
  /**
   * @title Items do menu
   * @description Items do menu desktop e mobile
   */
  navItems?: INavItem[];
}
const scroll = useScroll();

function HeaderNavMenu(
  {
    navItems = megaMenuDefaultItems as INavItem[],
  }: Props,
) {
  return (
    <div
      class={`z-50 menu-custom ${
        scroll.value > Number(headerHeight.replaceAll(/\D/g, ""))
          ? "hidden"
          : ""
      }`}
    >
      <div class="flex justify-between items-center lg:p-0 bg-primary">
        <div class="max-lg:hidden flex justify-between flex-1 whitespace-nowrap sm:p-0 lg:px-16 header-nav-menu">
          <ul
            class={clx(
              `container items-center justify-between mx-0 lg:mx-[auto] my-[0] lg:px-[30px] py-[0] 
            flex h-[3.25rem] border-b border-[rgba(219,219,219,0.36)] w-full`,
            )}
          >
            {navItems && navItems?.length
              ? navItems?.map((item) => (
                <NavItem
                  key={item.label}
                  item={item}
                />
              ))
              : null}
          </ul>
        </div>
      </div>

      <Modals
        menu={{ items: navItems }}
      />
    </div>
  );
}

export default HeaderNavMenu;
