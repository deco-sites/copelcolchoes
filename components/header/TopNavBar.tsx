import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "preact/hooks";

export interface Props {
  alerts: Alert[];
  interval?: number;
}

export interface Alert {
  textAlert: string;
  /** @format color */
  textColor: string;
}

function TopNavBar({ alerts, interval =  2000 }: Props) {
  const id = useId();

  return (
    <div class="py-4 px-[1.875rem] lg:py-2 topnavbar bg-primary relative group">
      <div id={id} class="relative">
        <Slider
          class="carousel carousel-center w-full"
          data-slider
        >
          {alerts.map((alert, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-full"
              data-slider-item={index}
            >
              <div class="flex items-center justify-center w-full">
                <span
                  class="text-sm ml-3 text-center leading-[1.125rem]"
                  style={{ color: alert.textColor }}
                >
                  {alert.textAlert}
                </span>
              </div>
            </Slider.Item>
          ))}
        </Slider>

        
        <div class="absolute top-1/2 left-0 right-0 flex justify-between px-2 transform -translate-y-1/2">
          <button
            class="btn btn-circle btn-sm"
            data-slide="prev"
            aria-label="Previous"
          >
            ❮
          </button>
          <button
            class="btn btn-circle btn-sm"
            data-slide="next"
            aria-label="Next"
          >
            ❯
          </button>
        </div>

        <SliderJS
          rootId={id}
          itemsPerPage={{ 0: 1 }}
          interval={interval}
          infinite
          scroll="auto"
          data-slider-controller-js
        />
      </div>
    </div>
  );
}

export default TopNavBar;