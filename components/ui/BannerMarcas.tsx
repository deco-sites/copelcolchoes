import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { useId } from "preact/hooks";

export interface ImageGalleryItem {
  /** @description Title */
  label: string;

  /** @description Imagem */
  image: LiveImage;

  /** @description Link */
  href?: string;

  preload?: boolean;
}

export interface Props {
  /** @description Banners */
  images: ImageGalleryItem[];
}

interface ButtonsProps {
  className: string;
}

function Buttons({ className }: ButtonsProps) {
  return (
    <>
      <div
        class={`flex items-center justify-center z-10 col-start-1 row-start-2 ${className}`}
      >
        <Slider.PrevButton class="btn btn-circle border-none shadow-md bg-primary hover:bg-primary min-h-0 h-[42px] max-lg:h-[30px] w-[42px] max-lg:w-[30px]">
          <Icon
            class="text-white"
            size={17}
            id="LeftArrowFigma"
          />
        </Slider.PrevButton>
      </div>
      <div
        class={`flex items-center justify-center z-10 col-start-3 row-start-2 ${className}`}
      >
        <Slider.NextButton class="btn btn-circle border-none shadow-md bg-primary hover:bg-primary min-h-0 h-[42px] max-lg:h-[30px] w-[42px] max-lg:w-[30px]">
          <Icon
            class="text-white"
            size={17}
            id="RightArrowFigma"
          />
        </Slider.NextButton>
      </div>
    </>
  );
}

interface DotsProps {
  images?: ImageGalleryItem[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  interval?: number;
  /**
   * @title Show pagination arrows?
   */
  className: string;
}

export default function BannerMarcas(props: Props) {
  const { images } = props;
  const id = useId();
  return (
    <>
      <h2 class="font-quicksand text-primary text-[28px] font-semibold text-center max-lg:text-[24px]">
        As melhores marcas do mercado estão aqui
      </h2>
      <section
        class={`w-full h-full gap-5`}
      >
        <div
          id={id}
          class="grid grid-cols-[42px_1fr_42px] max-lg:grid-cols-[30px_1fr_30px] px-0 grid-rows-[1fr_42px_1fr] max-lg:grid-rows-[1fr_30px_1fr]"
        >
          <Slider class="carousel carousel-center gap-6 col-span-full row-span-full py-2 lg:mx-8 my-5">
            {images.map((item, index) => (
              <Slider.Item
                index={index}
                class="carousel-item h-auto flex justify-center"
              >
                <a
                  href={item.href}
                  title={item.label}
                >
                  <img
                    src={item.image}
                    alt={item.label}
                    decoding="async"
                    class="w-full h-full"
                  />
                </a>
              </Slider.Item>
            ))}
          </Slider>
          <Buttons className="flex" />
          <SliderJS rootId={id} itemsPerPage={{ [1200]: 5, [0]: 1 }} />
        </div>
      </section>
    </>
  );
}
