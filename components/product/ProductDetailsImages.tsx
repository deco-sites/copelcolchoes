import type { Product } from "apps/commerce/types.ts";
import type { ImageObject } from "apps/commerce/types.ts";
import { useId } from "preact/hooks";
import { clx } from "$store/sdk/clx.ts";
import { useCrossCarouselSync } from "$store/sdk/useCrossCarouselSync.ts";
import ShareButton from "$store/islands/ShareButton.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import CarouselNavigation from "$store/components/ui/CarouselNavigation.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { SafeImage } from "./images/SafeImage.tsx";
import { MediaItem, type MediaType } from "./images/MediaItem.tsx";
import { VerticalThumbnailCarousel } from "./images/VerticalThumbnailCarousel.tsx";
import { MobileThumbnailCarousel } from "./images/MobileThumbnailCarousel.tsx";
import { ZoomableImage } from "./images/ZoomableImage.tsx";

interface Props {
  images: ImageObject[];
  width: number;
  height: number;
  aspect: string;
  url: string;
  product: Product;
  isMobile: boolean;
}

function ProductDetailsImages({
  images,
  width,
  height,
  aspect,
  url,
  product,
  isMobile,
}: Props) {
  const mainId = `product-image-main:${useId()}`;
  const video = (product && product.video) || [];
  const media: MediaType[] = [...images, ...video];
  const { activeIndex, handleThumbnailClick } = useCrossCarouselSync(mainId);

  return (
    <>
      <div class="relative">
        <div
          class={`relative flex ${
            isMobile ? "flex-col" : "lg:flex-row lg:gap-10"
          }`}
          // No root id here to avoid colliding with other sliders
        >
          {/* Thumbnails - Left on desktop, bottom on mobile */}
          <div
            class={isMobile ? "order-2 py-4" : "lg:order-1 lg:flex-shrink-0"}
          >
            <div
              class={clx(
                isMobile
                  ? "w-full"
                  : media.length <= 5
                    ? "overflow-hidden"
                    : "",
                "relative mx-auto h-full",
              )}
            >
              {isMobile ? (
                media.length >= 5 ? (
                  <div class="flex w-full justify-center">
                    <MobileThumbnailCarousel
                      media={media}
                      aspect={aspect}
                      activeIndex={activeIndex.value}
                      onThumbnailClick={handleThumbnailClick}
                    />
                  </div>
                ) : (
                  <div class="z-1 relative box-content flex h-auto w-full justify-center gap-[18px] lg:w-[350px]">
                    {media.map((item, index) => (
                      <MediaItem
                        key={index}
                        media={item}
                        index={index}
                        aspect={aspect}
                        isMobile={isMobile}
                        isThumb
                        isMainSliderControl={false}
                        isActive={activeIndex.value === index}
                        onClick={() => handleThumbnailClick(index)}
                      />
                    ))}
                  </div>
                )
              ) : (
                <VerticalThumbnailCarousel
                  media={media}
                  aspect={aspect}
                  itemsPerPage={5}
                  activeIndex={activeIndex.value}
                  onThumbnailClick={handleThumbnailClick}
                />
              )}
            </div>
          </div>

          {/* Main image */}
          <div
            class={clx(
              isMobile ? "order-1" : "lg:order-2",
              "group/zoom-container relative flex w-full justify-center mix-blend-multiply",
            )}
            style={{ maxWidth: isMobile ? "calc(100vw - 2.5rem)" : "480px" }}
            id={mainId}
          >
            {!isMobile && (
              <div class="absolute bottom-2 right-2 z-20 flex items-center gap-1 rounded bg-white/80 px-2 py-1 backdrop-blur-sm transition-opacity duration-200 group-hover/zoom-container:opacity-0">
                <Icon id="MagnifyingGlassPlus" size={16} />
                <span class="text-xs font-medium text-gray-700">
                  Passe o mouse para ampliar
                </span>
              </div>
            )}
            <Slider class="carousel carousel-center w-full" data-slider>
              {media.map((img, index) => {
                return (
                  <Slider.Item
                    index={index}
                    class="carousel-item w-full flex-shrink-0"
                    data-slider-item={index}
                  >
                    <div
                      class="relative flex w-full items-center justify-center"
                      style={{
                        width: isMobile ? "calc(100vw - 2.5rem)" : `${width}px`,
                        height: isMobile
                          ? "calc(100vw - 2.5rem)"
                          : `${height}px`,
                        maxWidth: "100%",
                        minWidth: isMobile
                          ? "calc(100vw - 2.5rem)"
                          : `${width}px`,
                      }}
                    >
                      {img["@type"] === "ImageObject" &&
                        (isMobile ? (
                          <SafeImage
                            class="mx-auto h-full w-full object-cover"
                            sizes={`(max-width: 480px) calc(100vw - 2.5rem), calc(100vw - 2.5rem)`}
                            style={{ aspectRatio: aspect }}
                            src={img?.url!}
                            alt={img.alternateName || "Imagem do produto"}
                            width={700}
                            height={700}
                            containerWidth={0}
                            containerHeight={0}
                            preload={index === 0}
                            fetchPriority={index === 0 ? "high" : "auto"}
                            loading={index === 0 ? "eager" : "lazy"}
                          />
                        ) : (
                          <ZoomableImage
                            img={img}
                            index={index}
                            aspect={aspect}
                            width={width}
                            height={height}
                          />
                        ))}
                      {img["@type"] === "VideoObject" && (
                        <iframe
                          class="slide-dot-custom absolute inset-0 h-full w-full"
                          title={img?.name}
                          src={img.contentUrl!}
                          frameborder={0}
                          loading="lazy"
                        ></iframe>
                      )}
                    </div>
                  </Slider.Item>
                );
              })}
            </Slider>

            {/* Main image navigation arrows */}
            <CarouselNavigation
              zIndex="z-10"
              position="custom"
              leftButtonProps={{
                position: isMobile ? "left-0 -translate-x-1/2" : "left-4",
              }}
              rightButtonProps={{
                position: isMobile ? "right-0 translate-x-1/2" : "right-4",
              }}
            />
            <SliderJS rootId={mainId} infinite={false} />
          </div>
        </div>

        {/* Share button */}
        <div class="group absolute right-0 top-5 flex h-auto cursor-pointer flex-col items-center justify-center gap-2">
          <div class="flex h-10 w-10 items-center justify-center rounded-full border border-[#f6f6f6] bg-white shadow-[0_0.1875rem_0.375rem_rgba(0,0,0,0.16)] transition-all duration-300 ease-out group-hover:bg-primary">
            <Icon
              id="ShareCopel"
              size={20}
              class="text-primary group-hover:text-white"
            />
          </div>
          <div class="flex max-h-0 opacity-0 transition-all duration-300 group-hover:max-h-6 group-hover:opacity-100">
            <div class="flex h-auto">
              <ShareButton
                network="Facebook"
                link={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
              />
              <ShareButton
                network="Twitter"
                link={`https://twitter.com/share?url=${url}`}
              />
              <ShareButton
                network="Pinterest"
                link={`https://pinterest.com/pin/create/button/?media=${images[0]
                  .url!}`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailsImages;
