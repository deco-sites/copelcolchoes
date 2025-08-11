import { clx } from "$store/sdk/clx.ts";

export const NAVIGATION_BUTTON_STYLES = clx(
  "border-none p-[5px] rounded-full",
  "bg-transparent hover:bg-primary group",
  "disabled:bg-transparent disabled:cursor-not-allowed",
);

export const NAVIGATION_ICON_STYLES = clx(
  "transition-colors duration-200",
  "group-hover:text-white",
  "group-disabled:text-gray-400",
);