import type { FnContext } from "@deco/deco";
import Modals from "$store/islands/HeaderModals.tsx";
import NavItem, { INavItem } from "./NavItem.tsx";
import { megaMenuDefaultItems } from "./constants.ts";
import { useScroll } from "$store/sdk/useScroll.ts";

export interface Props {
  /**
   * @title Items do menu
   * @description Items do menu desktop e mobile
   */
  navItems?: INavItem[];
}
const scroll = useScroll();

function HeaderNavMenu({
  navItems = megaMenuDefaultItems as INavItem[],
  isMobile,
}: Awaited<ReturnType<typeof loader>>) {
  return (
    <>
      {!isMobile && (
        <div class={`menu-custom z-50 ${scroll.value > 60 ? "hidden" : ""}`}>
          <div class="flex items-center justify-between bg-primary">
            <div class="flex flex-1 justify-between whitespace-nowrap max-lg:hidden">
              <ul class="container flex w-full items-center justify-between py-2 max-[1220px]:px-[1.375rem]">
                {navItems && navItems?.length
                  ? navItems?.map((item) => (
                      <NavItem key={item.label} item={item} />
                    ))
                  : null}
              </ul>
            </div>
          </div>
        </div>
      )}
      <Modals menu={{ items: navItems }} />
    </>
  );
}

export const loader = (props: Props, _req: Request, ctx: FnContext) => {
  return {
    ...props,
    isMobile: ctx.device !== "desktop",
  };
};

export default HeaderNavMenu;
