import Icon from "$store/components/ui/Icon.tsx";
import { clx } from "$store/sdk/clx.ts";
import { NAVIGATION_BUTTON_STYLES, NAVIGATION_ICON_STYLES } from "$store/sdk/imageConstants.ts";

export interface VerticalNavigationButtonsProps {
  onUpClick: () => void;
  onDownClick: () => void;
  showButtons: boolean;
  canScrollUp: boolean;
  canScrollDown: boolean;
}

export function VerticalNavigationButtons({
  onUpClick,
  onDownClick,
  showButtons,
  canScrollUp,
  canScrollDown,
}: VerticalNavigationButtonsProps) {
  if (!showButtons) return null;

  return (
    <>
      <button
        type="button"
        onClick={onUpClick}
        disabled={!canScrollUp}
        class={clx(
          NAVIGATION_BUTTON_STYLES,
          "absolute -top-10 left-1/2 -translate-x-1/2",
        )}
      >
        <Icon
          size={20}
          id="ChevronUp"
          strokeWidth={2}
          class={NAVIGATION_ICON_STYLES}
        />
      </button>
      <button
        type="button"
        onClick={onDownClick}
        disabled={!canScrollDown}
        class={clx(
          NAVIGATION_BUTTON_STYLES,
          "absolute -bottom-8 left-1/2 -translate-x-1/2",
        )}
      >
        <Icon
          size={20}
          id="ChevronDown"
          strokeWidth={2}
          class={NAVIGATION_ICON_STYLES}
        />
      </button>
    </>
  );
}