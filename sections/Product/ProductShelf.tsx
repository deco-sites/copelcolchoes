import type { AppContext } from "$store/apps/site.ts";
import type { Props } from "$store/components/product/ProductShelf.tsx";
import ProductShelf from "$store/components/product/ProductShelf.tsx";

export default function ProductShelfSection(props: Awaited<ReturnType<typeof loader>>) {
  return <ProductShelf {...props} />;
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
