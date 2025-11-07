import type { AppContext } from "$store/apps/site.ts";
import type { Props } from "$store/components/search/SearchResult.tsx";
import SearchResult from "$store/components/search/SearchResult.tsx";

export default function SearchResultSection(props: Awaited<ReturnType<typeof loader>>) {
  return <SearchResult {...props} />;
}

export async function loader(
  props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<Props> {
  const tags = await ctx.invoke["site/app-tags"].loaders.tags();
  return {
    ...props,
    tags,
  };
}
