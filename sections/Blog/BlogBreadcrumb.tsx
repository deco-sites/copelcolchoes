import { AppContext } from "apps/blog/mod.ts";
import { fetchPostBySlug } from "site/sdk/posts.ts";
import { clx } from "site/sdk/clx.ts";
import BreadcrumbJsonLd from "site/components/Blog/SEO/BreadcrumbJsonLd.tsx";

export interface BreadcrumbItem {
  title: string;
  link?: string;
}

interface Props {
  /**
   * @title Título do Breadcrumb
   * @description O texto que será exibido após o "Home". Padrão: "Blog"
   */
  title?: string;
  /**
   * @title Link do Breadcrumb
   * @description O link que adicionado ao título. Padrão: "/blog"
   */
  link?: string;
  /**
   * @ignore
   */
  items?: BreadcrumbItem[];
  /**
   * @ignore
   */
  baseUrl?: string;
}

const BREADCRUMB_STYLES = {
  container:
    "max-w-[1440px] mx-auto px-[20px] lg:px-[120px] mt-5 mb-[40px] max-md:mb-[20px]",
  list: clx(
    "text-base-content h-[50px] px-[20px]",
    "flex items-center gap-x-4",
    "rounded-[100px] bg-neutral-100 border border-neutral-200",
    "font-quicksand font-medium text-sm",
  ),
} as const;

const BreadcrumbItem = ({
  title,
  link,
  isLast,
}: BreadcrumbItem & { isLast: boolean }) => {
  if (isLast) {
    return (
      <li class="relative flex items-center">
        <span class="!line-clamp-1 inline-block text-neutral">{title}</span>
      </li>
    );
  }

  return (
    <li class="relative flex items-center">
      <a
        href={link}
        class="inline-block hover:underline hover:text-primary transition-colors"
      >
        {title}
      </a>
      <span class="ml-4 text-neutral-400">
        <svg
          width="6"
          height="10"
          viewBox="0 0 6 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L5 5L1 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </li>
  );
};

export default function Breadcrumb({ items, baseUrl }: Props) {
  return (
    <>
      <div class={BREADCRUMB_STYLES.container}>
        <ul class={BREADCRUMB_STYLES.list}>
          <BreadcrumbItem title="Home" link="/" isLast={false} />
          {items?.map((item, idx) => (
            <BreadcrumbItem
              {...item}
              isLast={items.length === idx + 1}
              key={item.title}
            />
          ))}
        </ul>
      </div>
      <BreadcrumbJsonLd items={items ?? []} baseUrl={baseUrl} />
    </>
  );
}

export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const url = new URL(req.url);
  const items: BreadcrumbItem[] = [
    {
      title: props.title ?? "Blog",
      link: props.link ?? "/blog",
    },
  ];

  if (url.pathname.includes("/blog/") && url.pathname !== "/blog") {
    const slug = url.pathname.split("/blog/")[1];
    const post = await fetchPostBySlug(ctx, slug);

    if (post?.title) {
      items.push({ title: post.title, link: "" });
    }

    return { ...props, items, baseUrl: url.origin };
  }

  const searchParams = new URLSearchParams(url.search);
  const queryMapping = {
    tag: "Tag",
    category: "Categoria",
    search: "Busca",
  } as const;

  for (const [param, title] of Object.entries(queryMapping)) {
    if (searchParams.has(param)) {
      items.push({ title, link: "" });
      break;
    }
  }

  return { ...props, items, baseUrl: url.origin };
};
