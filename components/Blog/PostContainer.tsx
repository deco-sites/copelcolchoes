import type { ComponentChildren } from "preact";

export default function PostContainer({
  children,
}: {
  children: ComponentChildren;
}) {
  return (
    <div class="mb-[40px] px-[20px] lg:px-[120px] grid grid-cols-[1fr] lg:grid-cols-[1fr_380px] gap-[30px]">
      {children}
    </div>
  );
}
