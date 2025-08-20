import type { ComponentChildren, Ref } from "preact";

export default function SidebarContainer({
  children,
  ref,
}: {
  children: ComponentChildren;
  ref?: Ref<HTMLDivElement>;
}) {
  return <div class="flex flex-col gap-y-[20px]" ref={ref}>{children}</div>;
}
