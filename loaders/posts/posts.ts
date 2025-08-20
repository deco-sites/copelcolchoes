import { type AppContext } from "site/apps/site.ts";
import { type BlogPost } from "apps/blog/types.ts";
import { fetchPosts, handlePosts, type SortBy } from "site/sdk/posts.ts";

export interface Props {
  page: number;
  postsPerPage: number;
  keyword: string;
  tag: string;
  category: string;
  sort: SortBy;
}

async function loader(
  { page, postsPerPage, keyword, tag, category, sort }: Props,
  _req: Request,
  ctx: AppContext,
): Promise<{ posts: BlogPost[]; hasMorePosts: boolean }> {
  const posts = await fetchPosts(ctx);

  return handlePosts(posts, sort as SortBy, {
    page: Number(page),
    postsPerPage,
    keyword,
    tag,
    category,
  });
}

export default loader;
