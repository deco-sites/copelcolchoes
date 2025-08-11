import { useState, useEffect } from "preact/hooks";
import { clx } from "$store/sdk/clx.ts";
import { useVerticalScroll } from "$store/sdk/useVerticalScroll.ts";
import { MediaItem, type MediaType } from "./MediaItem.tsx";
import { ScrollGradient } from "./ScrollGradient.tsx";
import { VerticalNavigationButtons } from "./VerticalNavigationButtons.tsx";

export interface VerticalThumbnailCarouselProps {
  media: MediaType[];
  aspect: string;
  itemsPerPage?: number;
  activeIndex: number;
  onThumbnailClick: (index: number) => void;
}

export function VerticalThumbnailCarousel({
  media,
  aspect,
  itemsPerPage = 5,
  activeIndex,
  onThumbnailClick,
}: VerticalThumbnailCarouselProps) {
  const { containerRef, scrollByStep } = useVerticalScroll();
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);

  const needsCarousel = media.length > itemsPerPage;

  const updateScrollButtons = () => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    setCanScrollUp(scrollTop > 0);
    setCanScrollDown(scrollTop < scrollHeight - clientHeight - 1);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    updateScrollButtons();
    container.addEventListener("scroll", updateScrollButtons);

    return () => container.removeEventListener("scroll", updateScrollButtons);
  }, [media.length]);

  return (
    <div class={clx("relative h-[414px] w-fit", needsCarousel && "mt-7")}>
      <div class="relative h-full overflow-hidden">
        <div
          ref={containerRef}
          class={clx(
            "flex h-full flex-col gap-4 scroll-smooth",
            needsCarousel && "overflow-y-auto",
          )}
          style="scrollbar-width: none; -ms-overflow-style: none;"
        >
          <style>{`
            [data-thumb-scroll]::-webkit-scrollbar { display: none; }
          `}</style>
          {media.map((item, index) => (
            <div key={index} class="size-[70px] flex-shrink-0">
              <MediaItem
                media={item}
                index={index}
                aspect={aspect}
                isMobile={false}
                isThumb
                isMainSliderControl={false}
                isActive={activeIndex === index}
                onClick={() => onThumbnailClick(index)}
              />
            </div>
          ))}
        </div>
        <ScrollGradient position="top" show={needsCarousel && canScrollUp} />
        <ScrollGradient
          position="bottom"
          show={needsCarousel && canScrollDown}
        />
      </div>

      <VerticalNavigationButtons
        onUpClick={() => scrollByStep("up")}
        onDownClick={() => scrollByStep("down")}
        showButtons={needsCarousel}
        canScrollUp={canScrollUp}
        canScrollDown={canScrollDown}
      />
    </div>
  );
}