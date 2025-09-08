import { type Category } from "site/components/Blog/SidebarCategories.tsx";
import { type Tag } from "site/components/Blog/SidebarTags.tsx";
import SidebarSearch from "site/islands/Blog/BlogSearch.tsx";
import SidebarNewsletter from "site/islands/Blog/BlogNewsletter.tsx";
import SidebarCategories from "site/components/Blog/SidebarCategories.tsx";
import SidebarTags from "site/components/Blog/SidebarTags.tsx";

interface Search {
  /**
   * @title Título
   */
  title?: string;
  /**
   * @title Placeholder
   */
  placeholder?: string;
}

interface Newsletter {
  /**
   * @title Título
   */
  title?: string;
  /**
   * @title Placeholder do campo nome
   */
  namePlaceholder?: string;
  /**
   * @title Placeholder do campo e-mail
   */
  emailPlaceholder?: string;
  /**
   * @title Texto do botão de submit
   */
  submitButtonText?: string;
}

interface Categories {
  /**
   * @title Título
   */
  title?: string;
  /**
   * @ignore
   */
  categories: Category[];
}

interface Tags {
  /**
   * @title Título
   */
  title?: string;
  /**
   * @ignore
   */
  tags: Tag[];
}

interface Sidebar {
  /**
   * @title Busca
   */
  search?: Search;
  /**
   * @title Newsletter
   */
  newsletter?: Newsletter;
  /**
   * @title Categorias
   */
  categories?: Categories;
  /**
   * @title Tags
   */
  tags?: Tags;
}

export default function Sidebar({
  search,
  newsletter,
  categories,
  tags,
}: Sidebar) {
  if (!search && !newsletter && !categories && !tags) return null;
  return (
    // 96px = 86px (altura do header) + 10px (padding)
    <aside class="lg:sticky lg:top-[96px] flex flex-col gap-y-[30px] px-[20px] mb-[40px] lg:px-0 lg:mb-0">
      <h2 class="sr-only">Sidebar</h2>
      <SidebarSearch {...search} />
      <SidebarNewsletter {...newsletter} />
      <SidebarCategories {...categories ?? {}} />
      <SidebarTags {...tags ?? {}} />
    </aside>
  );
}
