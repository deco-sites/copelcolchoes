import Slider from "$store/components/ui/Slider.tsx";
import type { ImageObject } from "apps/commerce/types.ts";
import Icon from "$store/components/ui/Icon.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "preact/hooks";

interface Props {
  images: ImageObject[];
  width: number;
  height: number;
  aspect: string;
}

function ProductDetailsImages(
  { images, width, height, aspect }: Props,
) {
  const id = `product-image-gallery:${useId()}`;
  return (
    <>
      <div class="lg:w-1/2 relative">
        <div class="flex flex-col relative">
          <div class="mx-8 mix-blend-multiply w-full" id={id}>
            <Slider class="carousel carousel-center gap-6 box-border lg:box-content w-full">
              {images.map((img, index) => (
                <Slider.Item
                  index={index}
                  class="carousel-item w-full"
                >
                  <div class="relative block h-0 w-full pb-[100%] ">
                    <Image
                      class="absolute top-0 left-0 w-full block object-cover font-['blur-up:_auto','object-fit:_cover'] h-auto align-middle"
                      sizes="(max-width: 480px) 576px, 576px"
                      style={{ aspectRatio: aspect }}
                      src={img.url!}
                      alt={img.alternateName}
                      width={width}
                      height={height}
                      // Preload LCP image for better web vitals
                      preload={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>
                </Slider.Item>
              ))}
            </Slider>
          </div>
          <div class="py-4 flex- basis-[5.8125rem] h-[7.5rem] mix-blend-multiply">
            <div class="w-full h-full mx-auto relative overflow-hidden">
              {images.map((img, index) => (
                <Slider.Dot index={index}>
                  <Image
                    style={{ aspectRatio: aspect }}
                    class="border-neutral hover:border-secondary-focus group-disabled:border-secondary-focus border-2 rounded-[10px]"
                    width={width / 5}
                    height={height / 5}
                    src={img.url!}
                    alt={img.alternateName}
                  />
                </Slider.Dot>
              ))}
              <Slider.PrevButton class="btn btn-circle btn-primary bg-white hover:bg-white border-none absolute left-4">
                <Icon size={42} id="PrevProductImage" strokeWidth={1} />
              </Slider.PrevButton>
              <Slider.NextButton class="btn btn-circle btn-primary bg-white hover:bg-white absolute border-none right-4">
                <Icon size={42} id="NextProductImage" strokeWidth={1} />
              </Slider.NextButton>
            </div>
          </div>
          <SliderJS rootId={id}></SliderJS>
        </div>
        <div class="flex group items-center justify-center absolute gap-2 h-auto r-0 top-5">
          <div class="group-hover:bg-primary flex items-center rounded-full border border-[#f6f6f6] shadow-[0_0.1875rem_0.375rem_rgba(0,0,0,0.16)] h-10 justify-center transition-all duration-300 ease-out w-10">
            <Icon id="ShareCopel" size={20} />
          </div>
          <div></div>
        </div>
      </div>

      <div class="flex flex-col xl:flex-row-reverse relative lg:items-start gap-4">
        {/* Image Slider */}
        <div class="relative xl:pl-32">
          {
            /* Discount tag
          {price && listPrice && price !== listPrice
            ? (
              <DiscountBadge
                price={price}
                listPrice={listPrice}
              />
            )
            : null} */
          }
        </div>

        {/* Dots */}
        <div class="lg:max-w-[500px] lg:self-start xl:self-start xl:left-0 xl:absolute xl:max-h-full xl:overflow-y-scroll xl:scrollbar-none max-lg:hidden">
          <ul
            class={`flex gap-4 overflow-auto lg:max-h-min lg:flex-1 lg:justify-start xl:flex-col`}
          >
            {images.map((img, index) => (
              <li class="min-w-[75px] lg:h-fit lg:min-w-[130px]">
                <Slider.Dot index={index}>
                  <Image
                    style={{ aspectRatio: aspect }}
                    class="border-neutral hover:border-secondary-focus group-disabled:border-secondary-focus border-2 rounded-[10px]"
                    width={width / 5}
                    height={height / 5}
                    src={img.url!}
                    alt={img.alternateName}
                  />
                </Slider.Dot>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ProductDetailsImages;
