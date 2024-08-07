import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { useId } from "preact/hooks";

export interface Svgs {
  /** @description Image url */
  image: LiveImage;

  /** @description Alt text */
  alt: string;
}
export interface ImageGalleryItem {
  /** @description Title */
  title?: string;

  /** @description SVGs */
  svgs: Svgs[];

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
        <Slider.PrevButton class="btn btn-circle border-none shadow-md bg-primary hover:bg-primary min-h-0 h-[23.88px] w-[23.88px]">
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
        <Slider.NextButton class="btn btn-circle border-none shadow-md bg-primary hover:bg-primary min-h-0 h-[23.88px] w-[23.88px]">
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

function Dots({ images, className, interval = 0 }: DotsProps) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          `,
        }}
      />
      <ul
        class={`carousel mt-3 w-full justify-center col-span-full gap-2 z-10 row-start-4 ${className}`}
      >
        {images?.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <div>
                <div
                  class="w-2 h-2 group-disabled:opacity-100 opacity-20 rounded-full bg-primary"
                  style={{ animationDuration: `${interval}s` }}
                />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function CategoriesCarroussel(props: Props) {
  const { images } = props;
  const id = useId();
  return (
    <>
      <h2 class="font-quicksand text-primary text-[28px] mb-10 font-semibold text-center max-lg:text-[26px] max-lg:mt-[54px]">
        Encontre nos Departamentos
      </h2>
      <section class="w-full h-full gap-5 my-12 max-lg:my-8">
        <div
          id={id}
          class="m-auto grid grid-cols-[10px_1fr_10px] sm:grid-cols-[23.88px_1fr_23.88px] grid-rows-[1fr_23.88px_1fr]"
        >
          <Slider class="carousel carousel-start scrollbar-none col-span-full m-auto max-w-[330px] md:max-w-[400px] lg:max-w-none gap-1 row-span-full w-full lg:flex justify-around">
            {images.map((item, index) => (
              <Slider.Item
                index={index}
                class="carousel-item flex justify-center lg:max-w-[160px] xl:max-w-[190px]"
              >
                <a
                  href={item.href}
                  class="text-center mx-auto"
                >
                  <div class="w-[150px] h-[150px] lg:h-[160px] lg:w-[160px] xl:h-[190px] xl:w-[190px] flex items-center justify-center rounded-3xl shadow-md hover:border hover:border-primary">
                    {item.svgs.map((svg) => (
                      <img
                        loading="lazy"
                        src={svg.image}
                        alt={`Imagem de ${svg.alt}`}
                        decoding="async"
                      />
                    ))}
                  </div>
                  <p class="text-primary text-base font-bold mt-4 max-w-[150px] lg:max-w-none">
                    {item.title}
                  </p>
                </a>
              </Slider.Item>
            ))}
          </Slider>
          <Dots
            images={images}
            interval={0}
            className="max-lg:flex lg:hidden"
          />
          <SliderJS rootId={id} itemsPerPage={{ [1200]: 5, [0]: 2 }} infinite />
        </div>
      </section>
    </>
  );
}