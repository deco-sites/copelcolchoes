import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export function useCrossCarouselSync(mainId: string) {
  const activeIndex = useSignal(0);

  const handleThumbnailClick = (index: number) => {
    activeIndex.value = index;

    const root = document.getElementById(mainId);
    const mainSlider = root?.querySelector(
      "[data-slider]",
    ) as HTMLElement | null;
    const targetItem = root?.querySelector(
      `[data-slider-item="${index}"]`,
    ) as HTMLElement | null;

    if (mainSlider && targetItem) {
      mainSlider.scrollTo({
        top: 0,
        behavior: "smooth",
        left: (targetItem as HTMLElement).offsetLeft,
      });
    }
  };

  useEffect(() => {
    const handleSliderScroll = () => {
      const root = document.getElementById(mainId);
      const slider = root?.querySelector("[data-slider]") as HTMLElement | null;
      if (!slider) return;

      const items = slider.querySelectorAll("[data-slider-item]");
      const sliderRect = slider.getBoundingClientRect();
      const sliderCenter = sliderRect.left + sliderRect.width / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      items.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.left + itemRect.width / 2;
        const distance = Math.abs(itemCenter - sliderCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (activeIndex.value !== closestIndex) {
        activeIndex.value = closestIndex;
      }
    };

    const root = document.getElementById(mainId);
    const slider = root?.querySelector("[data-slider]") as HTMLElement | null;
    if (slider) {
      slider.addEventListener("scroll", handleSliderScroll);
      handleSliderScroll();

      return () => slider.removeEventListener("scroll", handleSliderScroll);
    }
  }, [mainId]);

  return { activeIndex, handleThumbnailClick };
}
