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
        "font-quicksand text-base text-base-content leading-6",
        "[&_*]:!leading-6 [&_>p:not(:last-child)]:mb-3 [&_>*]:text-wrap [&_a]:underline",
        clamp ? `line-clamp-${clamp}` : "",
        className,
      )}
    >
      <p
        // deno-lint-ignore react-no-danger
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
