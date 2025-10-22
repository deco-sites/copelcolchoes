import { clx } from "site/sdk/clx.ts";

export default function PostContent({
  content,
  clamp = 0,
  className,
}: {
  content: string;
  clamp?: number;
  className?: string;
}) {
  return (
    <div
      class={clx(
        "font-quicksand text-base-content leading-6",
        "[&_*]:!leading-6 [&>:is(p,h2,h3,h4,ul,ol,hr)]:mb-3 [&>:is(h1,h2,h3,h4,h5,h6)]:font-bold [&_>*]:text-wrap [&_a]:underline",
        clamp ? `line-clamp-${clamp}` : "",
        className,
      )}
      // deno-lint-ignore react-no-danger
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
