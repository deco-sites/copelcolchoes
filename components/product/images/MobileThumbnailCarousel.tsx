import { useEffect, useRef, useState } from "preact/hooks";
import { clx } from "$store/sdk/clx.ts";
import Icon from "$store/components/ui/Icon.tsx";
import {
  NAVIGATION_BUTTON_STYLES,
  NAVIGATION_ICON_STYLES,
} from "$store/sdk/imageConstants.ts";
import { MediaItem, type MediaType } from "./MediaItem.tsx";

export interface MobileThumbnailCarouselProps {
  media: MediaType[];
  aspect: string;
  activeIndex: number;
  onThumbnailClick: (index: number) => void;
}

export function MobileThumbnailCarousel({
  media,
  aspect,
  activeIndex,
  onThumbnailClick,
}: MobileThumbnailCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const itemsPerPage = 4;

  const updateScrollButtons = () => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    updateScrollButtons();
    container.addEventListener("scroll", updateScrollButtons);

    return () => container.removeEventListener("scroll", updateScrollButtons);
  }, [media.length]);

  const scrollToItem = (direction: "prev" | "next") => {
    const container = containerRef.current;
    if (!container) return;

    const itemWidth = 60 + 18; // 60px item + 18px gap
    const scrollAmount = itemWidth * itemsPerPage;

    if (direction === "prev") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div class="relative h-auto w-[294px]">
      <div
        ref={containerRef}
        class="scrollbar-hide flex gap-[18px] overflow-x-auto scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>
          {`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
        `}
        </style>
        {media.map((item, index) => (
          <div key={index} class="flex-shrink-0">
            <MediaItem
              media={item}
              index={index}
              aspect={aspect}
              isMobile
              isThumb
              isMainSliderControl={false}
              isActive={activeIndex === index}
              onClick={() => onThumbnailClick(index)}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollToItem("prev")}
        disabled={!canScrollLeft}
        class={clx(
          NAVIGATION_BUTTON_STYLES,
          "absolute left-0 top-1/2 z-10 -translate-x-full -translate-y-1/2",
        )}
      >
        <Icon
          size={20}
          id="ChevronLeft"
          strokeWidth={2}
          class={NAVIGATION_ICON_STYLES}
        />
      </button>
      <button
        type="button"
        onClick={() => scrollToItem("next")}
        disabled={!canScrollRight}
        class={clx(
          NAVIGATION_BUTTON_STYLES,
          "absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-full",
        )}
      >
        <Icon
          size={20}
          id="ChevronRight"
          strokeWidth={2}
          class={NAVIGATION_ICON_STYLES}
        />
      </button>
    </div>
  );
}
