import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { clx } from "$store/sdk/clx.ts";

interface CarouselNavigationProps {
  position?: "default" | "custom";
  leftButtonProps?: {
    position?: string;
    disabled?: boolean;
  };
  rightButtonProps?: {
    position?: string;
    disabled?: boolean;
  };
  iconSize?: number;
  zIndex?: string;
}

export default function CarouselNavigation({
  position = "default",
  leftButtonProps = {},
  rightButtonProps = {},
  iconSize = 20,
  zIndex,
}: CarouselNavigationProps) {
  const baseButtonClasses = clx(
    "border-none absolute top-1/2 -translate-y-1/2 no-animation",
    "p-[5px] rounded-full",
    "bg-transparent hover:bg-primary",
    "group disabled:bg-transparent disabled:cursor-not-allowed",
    "active:hover:-translate-y-1/2"
  );

  const baseIconClasses = clx(
    "transition-colors duration-200",
    "group-hover:text-white",
    "group-disabled:text-gray-400"
  );

  const defaultLeftPosition = position === "default" ? "left-4" : "left-0";
  const defaultRightPosition = position === "default" ? "right-4" : "right-0";

  const leftPosition = leftButtonProps.position || defaultLeftPosition;
  const rightPosition = rightButtonProps.position || defaultRightPosition;

  return (
    <>
      <Slider.PrevButton
        class={clx(baseButtonClasses, leftPosition, zIndex)}
        disabled={leftButtonProps.disabled}
      >
        <Icon
          size={iconSize}
          id="ChevronLeft"
          strokeWidth={2}
          class={baseIconClasses}
        />
      </Slider.PrevButton>
      <Slider.NextButton
        class={clx(baseButtonClasses, rightPosition, zIndex)}
        disabled={rightButtonProps.disabled}
      >
        <Icon
          size={iconSize}
          id="ChevronRight"
          strokeWidth={2}
          class={baseIconClasses}
        />
      </Slider.NextButton>
    </>
  );
}
