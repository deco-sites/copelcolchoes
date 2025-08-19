import { clx } from "site/sdk/clx.ts";
import SidebarContainer from "site/components/Blog/SidebarContainer.tsx";
import SidebarTitle from "site/components/Blog/SidebarTitle.tsx";

export interface Tag {
  name: string;
  slug: string;
}

interface SidebarTagsProps {
  title?: string;
  tags?: Tag[];
  heading?: "h2" | "h3";
}

export default function SidebarTags({
  title = "Tags",
  tags,
  heading = "h3",
}: SidebarTagsProps) {
  if (!tags?.length) return null;
  return (
    <SidebarContainer>
      <SidebarTitle title={title} heading={heading} />
      <ul class="flex flex-wrap gap-[10px]">
        {tags?.map((tag) => <TagItem {...tag} key={tag.name} />)}
      </ul>
    </SidebarContainer>
  );
}

function TagItem({ name, slug }: Tag) {
  return (
    <li class="inline-flex">
      <a
        href={`/blog?tag=${slug}`}
        class={clx(
          "flex px-[14px] rounded-[30px] border border-base-content",
          "text-sm text-base-content text-center font-quicksand duration-300",
          "hover:bg-base-content hover:text-base-100 leading-[38px]",
        )}
      >
        {name}
      </a>
    </li>
  );
}
