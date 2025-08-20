import type { BlogPost, Category } from "apps/blog/types.ts";
import { type AppContext } from "site/apps/deco/blog.ts";
import { type Category as CategoryType } from "site/components/Blog/SidebarCategories.tsx";
import { type Tag as TagType } from "site/components/Blog/SidebarTags.tsx";
import { slugify } from "https://deno.land/x/slugify@0.3.0/mod.ts";
import { getRecordsByPath } from "apps/blog/utils/records.ts";
import { removeDiacritics } from "site/sdk/utils.ts";

export const VALID_SORT_ORDERS = ["asc", "desc"];

export type SortBy = "date_desc" | "date_asc" | "title_asc" | "title_desc";

/**
 * Fetches all blog posts from the database
 */
export const fetchPosts = async (ctx: AppContext) => {
  return await getRecordsByPath<BlogPost>(
    ctx,
    "collections/blog/posts",
    "post",
  );
};

/**
 * Returns a post by slug from the database
 */
export const fetchPostBySlug = async (
  ctx: AppContext,
  slug: string,
): Promise<BlogPost> => {
  return await ctx.invoke.blog.loaders.BlogPostItem({ slug });
};

/**
 * Returns an sorted BlogPost list
 *
 * @param posts Posts to be sorted
 * @param sortBy Sort option (must be: "date_desc" | "date_asc" | "title_asc" | "title_desc" )
 */
export const sortPosts = (blogPosts: BlogPost[], sortBy: SortBy) => {
  try {
    const splittedSort = sortBy.split("_");
    const sortMethod = splittedSort[0] in blogPosts[0]
      ? (splittedSort[0] as keyof BlogPost)
      : "date";
    const sortOrder = VALID_SORT_ORDERS.includes(splittedSort[1])
      ? splittedSort[1]
      : "desc";

    return blogPosts.toSorted((a, b) => {
      if (!a[sortMethod] && !b[sortMethod]) {
        return 0; // If both posts don't have the sort method, consider them equal
      }
      if (!a[sortMethod]) {
        return 1; // If post a doesn't have sort method, put it after post b
      }
      if (!b[sortMethod]) {
        return -1; // If post b doesn't have sort method, put it after post a
      }
      const comparison = sortMethod === "date"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : (a[sortMethod]
          ?.toString()
          .localeCompare(b[sortMethod]?.toString() ?? "") ?? 0);
      return sortOrder === "desc" ? comparison : -comparison; // Invert sort depending of desc or asc
    });
  } catch {
    return blogPosts;
  }
};

/**
 * Returns an filtered BlogPost list
 *
 * @param posts Posts to be handled
 * @param slug Category Slug to be filter
 */
export const filterPostsByCategory = (posts: BlogPost[], category?: string) =>
  category
    ? posts.filter(({ categories }) =>
      categories?.some((c) => c.slug === category)
    )
    : posts;

/**
 * Returns an filtered BlogPost list
 *
 * @param posts Posts to be handled
 * @param tag Tag to be filter
 */
export const filterPostsByTag = (posts: BlogPost[], tag?: string) =>
  tag
    ? posts.filter((post) => {
      const tagString = post.extraProps?.find(
        (prop) => prop.key === "tags",
      )?.value;
      if (!tagString) return false;
      const tags = tagString
        .split(",")
        .map((t) => slugify(t.trim(), { lower: true }));
      return tags.includes(tag);
    })
    : posts;

/**
 * Returns an filtered BlogPost list
 *
 * @param posts Posts to be handled
 * @param keyword Keyword to be filter
 */
export const filterPostsByKeyword = (posts: BlogPost[], keyword?: string) => {
  if (!keyword) return posts;

  const decodedKeyword = decodeURIComponent(keyword);
  const searchTerms = removeDiacritics(decodedKeyword)
    .toLowerCase()
    .split(" ")
    .filter((term) => term.length > 0);

  return posts.filter((post) => {
    const searchableContent = [
      post.title || "",
      post.excerpt || "",
      post.content || "",
      post.extraProps?.find((prop) => prop.key === "keywords")?.value || "",
      post.extraProps?.find((prop) => prop.key === "tags")?.value || "",
      post.categories?.map((c) => c.name).join(" ") || "",
    ].map((text) => removeDiacritics(text).toLowerCase());

    return searchTerms.every((term) =>
      searchableContent.some((content) => content.includes(term))
    );
  });
};

/**
 * Returns an filtered and sorted BlogPost list
 *
 * @param posts Posts to be handled
 * @param pageNumber Actual page number
 * @param postsPerPage Number of posts per page
 */
export const slicePosts = (
  posts: BlogPost[],
  pageNumber: number,
  postsPerPage: number,
) => {
  const startIndex = (pageNumber - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  return posts.slice(startIndex, endIndex);
};

/**
 * Returns an filtered and sorted BlogPost list. It dont slice
 *
 * @param posts Posts to be handled
 * @param sortBy Sort option (must be: "date_desc" | "date_asc" | "title_asc" | "title_desc" )
 * @param slug Category slug to be filter
 */
export function handlePosts(
  posts: BlogPost[],
  sortBy: SortBy,
  {
    keyword = "",
    category = "",
    tag = "",
    page = 1,
    postsPerPage = 5,
  }: {
    keyword?: string;
    category?: string;
    tag?: string;
    page?: number;
    postsPerPage?: number;
  } = {},
) {
  let filteredPosts = posts.filter((post) => post.title);

  if (keyword && keyword !== "") {
    filteredPosts = filterPostsByKeyword(filteredPosts, keyword);
  }

  if (category && category !== "") {
    filteredPosts = filterPostsByCategory(filteredPosts, category);
  }

  if (tag && tag !== "") {
    filteredPosts = filterPostsByTag(filteredPosts, tag);
  }

  const sortedPosts = sortPosts(filteredPosts, sortBy);
  const paginatedPosts = slicePosts(sortedPosts, page, postsPerPage);
  const hasMorePosts = sortedPosts.length > page * postsPerPage;

  return {
    posts: paginatedPosts,
    hasMorePosts,
    total: sortedPosts.length,
  };
}

/**
 * Return an array of unique categories with count from a BlogPost list
 *
 * @param posts Posts to be handled
 */
export const getUniqueCategories = (posts: BlogPost[]): CategoryType[] => {
  return Array.from(
    posts
      .filter((post) => post.categories?.length)
      .flatMap((post) => post.categories!)
      .reduce(
        (acc, category) =>
          acc.set(category.name, {
            ...category,
            count: (acc.get(category.name)?.count ?? 0) + 1,
          }),
        new Map<string, Category & { count: number }>(),
      )
      .values(),
  );
};

/**
 * Return an array of unique tags from a BlogPost list
 *
 * @param posts Posts to be handled
 */
export const getUniqueTags = (posts: BlogPost[]): TagType[] => {
  return Array.from(
    posts
      .flatMap(
        (post) =>
          post.extraProps
            ?.find((prop) => prop.key === "tags")
            ?.value?.split(",")
            .map((tag) => tag.trim()) ?? [],
      )
      .filter(Boolean)
      .reduce(
        (unique, tag) => (unique.has(tag) ? unique : unique.add(tag)),
        new Set<string>(),
      )
      .values(),
  ).map((tag) => ({
    name: tag,
    slug: slugify(tag, { lower: true }),
  }));
};

/**
 * Returns a list of the most read posts, limited by the specified number.
 *
 * @param posts All available posts
 * @param mostReadSlugs Slugs of the most read posts
 * @param limit Number of posts to return
 */
export const getMostReadPosts = (
  posts: BlogPost[],
  mostReadSlugs: string[],
  limit: number,
): BlogPost[] => {
  const filteredPosts = posts.filter((post) => post.title);

  const mostReadPosts = mostReadSlugs
    .map((slug) => filteredPosts.find((post) => post.slug === slug))
    .filter(Boolean) as BlogPost[];

  if (mostReadPosts.length < limit) {
    const additionalPosts = filteredPosts
      .filter((post) => !mostReadSlugs.includes(post.slug))
      .slice(0, limit - mostReadPosts.length);
    mostReadPosts.push(...additionalPosts);
  }

  return mostReadPosts.slice(0, limit);
};
