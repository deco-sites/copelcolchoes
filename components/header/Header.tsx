import { type LoaderReturnType } from "@deco/deco";
import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Modals from "$store/islands/HeaderModals.tsx";
import type { Product, Suggestion } from "apps/commerce/types.ts";
import type { Image } from "deco-sites/std/components/types.ts";

export interface NavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
  image?: {
    src?: Image;
    alt?: string;
  };
}

export interface Props {
  /** @title Search Bar */
  searchbar?: SearchbarProps;
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItem[];

  /**
   * @title Product suggestions
   * @description Product suggestions displayed on search
   */
  products?: LoaderReturnType<Product[] | null>;

  /**
   * @title Enable Top Search terms
   */
  suggestions?: LoaderReturnType<Suggestion | null>;
}

function Header({ navItems = [] }: Props) {
  return (
    <>
      <header class="h-[170px] md:h-[114px] lg:h-[160px]">
        <div class="fixed z-50 w-full bg-base-100"></div>

        <Modals menu={{ items: navItems }} />
      </header>
    </>
  );
}

export default Header;
