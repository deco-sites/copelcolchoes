import { type Section } from "@deco/deco/blocks";
import { clx } from "$store/sdk/clx.ts";

export type VerticalSpacing = "top" | "bottom" | "both" | "none";
export type ShadowSize = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "inner";

export interface Props {
  sections: {
    label: string;
    section: Section;
    withContainer?: boolean;
    /** @default none */
    shadow?: ShadowSize;
    /**
     * @description Section background
     */
    backgroundColor?: string;
    /** @default both */
    verticalSpacing?: VerticalSpacing;
    /**
     * @description Vertical margin between sections multiple of 4px
     * @default 0
     */
    spacing?: number;
  }[];
  /** @default false */
  isHeader?: boolean;
  isVisible?: boolean;
}

function Container({ sections, isHeader = false, isVisible = true }: Props) {
  if (!isVisible) return null;

  return (
    <>
      <div
        class={isHeader ? "header fixed top-0 z-[5000] w-full bg-white" : ""}
      >
        {sections?.map(
          ({
            section: { Component, props },
            withContainer = false,
            backgroundColor = "",
            verticalSpacing = "both",
            shadow = "none",
            spacing = 0,
          }) => (
            <div
              class={clx(
                `w-full ${VERTICAL_SPACING[verticalSpacing]} ${SPACING[spacing]} ${SHADOW_SIZE[shadow]}`,
              )}
              style={backgroundColor && { background: `${backgroundColor}` }}
            >
              {withContainer ? (
                <div class="container relative m-auto w-full max-[1220px]:!px-5 lg:px-0">
                  <Component {...props} />
                </div>
              ) : (
                <Component {...props} />
              )}
            </div>
          ),
        )}
      </div>
      {isHeader && <div class="h-[170px] md:h-[114px] lg:h-[160px]"></div>}
    </>
  );
}

const VERTICAL_SPACING: Record<VerticalSpacing, string> = {
  top: "!mb-0",
  bottom: "!mt-0",
  none: "!my-0",
  both: "",
};
const SHADOW_SIZE: Record<ShadowSize, string> = {
  none: "shadow-none",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  "2xl": "shadow-2xl",
  inner: "shadow-inner",
};

const SPACING = [
  "my-0",
  "my-1",
  "my-2",
  "my-3",
  "my-4",
  "my-5",
  "my-6",
  "my-7",
  "my-8",
  "my-9",
  "my-10",
];

export default Container;
