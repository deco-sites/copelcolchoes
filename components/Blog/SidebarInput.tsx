import { clx } from "site/sdk/clx.ts";

interface Props extends preact.JSX.HTMLAttributes<HTMLInputElement> {
  className?: string;
  value?: string;
}

export default function SidebarInput(
  { placeholder, className, value = "", ...props }: Props,
) {
  return (
    <input
      {...props}
      value={value}
      placeholder={placeholder}
      class={clx(
        "rounded-[100px] py-[14px] pr-[20px] max-h-[48px] pl-4",
        "w-full bg-base-100 border border-neutral-200 font-normal text-primary text-sm",
        "leading-[18.2px] font-quicksand outline-none focus:border-primary focus:ring-1 focus:ring-primary",
        className,
      )}
    />
  );
}
