import SidebarContainer from "site/components/Blog/SidebarContainer.tsx";
import SidebarTitle from "site/components/Blog/SidebarTitle.tsx";
import { clx } from "site/sdk/clx.ts";

export interface Category {
  name: string;
  count: number;
  slug: string;
}

interface Props {
  title?: string;
  categories?: Category[];
}

export default function SidebarCategories({
  title = "Categorias",
  categories,
}: Props) {
  if (!categories?.length) return null;
  return (
    <SidebarContainer>
      <SidebarTitle title={title} />
      <ul class="flex flex-col gap-y-[10px]">
        {categories?.map((category) => (
          <CategoryItem {...category} key={category.name} />
        ))}
      </ul>
    </SidebarContainer>
  );
}

function CategoryItem({ name, slug, count }: Category) {
  const link = `/blog?category=${slug}`;
  return (
    <li
      class={clx(
        "h-[50px] flex justify-between items-center",
        "rounded-[30px] bg-neutral-100 border border-neutral-200",
        "font-quicksand text-sm duration-300",
        "hover:bg-neutral-200",
      )}
    >
      <a href={link} class="flex items-center justify-between w-full">
        <span class="ml-5 text-base-content leading-none">{name}</span>
        <span
          class={clx(
            "flex justify-center items-center size-[36px] mr-2 rounded-[30px]",
            "bg-neutral-200 text-primary font-quicksand duration-300",
          )}
        >
          {count}
        </span>
      </a>
    </li>
  );
}
