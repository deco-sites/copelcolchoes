import type { Product } from "apps/commerce/types.ts";
import { useId } from "preact/hooks";
import { generateIconUrl } from "$store/utils/url.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import CarouselNavigation from "$store/components/ui/CarouselNavigation.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { BASE_VTEX_IMAGE_URL } from "$store/utils/constants.ts";

const PLACEHOLDER_BASE = "size-[50px] rounded-full bg-neutral-200";

interface ImageComponentProps {
  imageName: string;
  value: string | undefined;
  preload?: boolean;
}

function ImageComponent({
  imageName,
  value,
  preload = false,
}: ImageComponentProps) {
  const handleLoad = (e: Event) => {
    const img = e.currentTarget as HTMLImageElement;
    const container = img.parentElement!;
    img.style.opacity = "1";
    container.querySelector("[data-placeholder]")?.classList.add("opacity-0");
    container
      .querySelector("[data-error-placeholder]")
      ?.classList.add("hidden");
  };

  const handleError = (e: Event) => {
    const img = e.currentTarget as HTMLImageElement;
    const container = img.parentElement!;
    const placeholder = container.querySelector("[data-placeholder]");
    const errorPlaceholder = container.querySelector(
      "[data-error-placeholder]",
    );

    img.style.opacity = "0";
    placeholder?.classList.remove("animate-pulse", "opacity-0");
    errorPlaceholder?.classList.remove("hidden");
  };

  return (
    <div class="flex w-[75.5px] flex-col items-center gap-2 font-quicksand text-sm font-medium lg:w-20">
      <div class="relative size-[50px]">
        <div class={`${PLACEHOLDER_BASE} animate-pulse`} data-placeholder />
        <img
          class="absolute inset-0 hidden h-full w-full rounded-full object-cover"
          src="/image-placeholder.svg"
          alt="Placeholder"
          width={50}
          height={50}
          data-error-placeholder
        />
        <Image
          class="absolute inset-0 h-full w-full rounded-full object-cover opacity-0 transition-opacity duration-200"
          src={`${BASE_VTEX_IMAGE_URL}${imageName}`}
          alt={value}
          loading={preload ? "eager" : "lazy"}
          preload={preload}
          fetchPriority={preload ? "high" : "auto"}
          width={50}
          height={50}
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>
      <div class="text-center text-sm text-primary">{value}</div>
    </div>
  );
}

interface Props {
  product: Product;
  isMobile: boolean;
}

const MOBILE_CONTAINER_CLASSES = "flex items-start flex-wrap flex-row gap-4";
const DESKTOP_STATIC_CLASSES =
  "flex items-start flex-wrap flex-row gap-4 sm:gap-5 justify-center lg:justify-start";
const CAROUSEL_CONTAINER_CLASSES = "w-full bg-transparent";

export default function ProductInfoCarousel({ product, isMobile }: Props) {
  const { isVariantOf } = product;
  const { additionalProperty } = isVariantOf as unknown as Product;
  const id = `product-info-carousel:${useId()}`;

  const filteredProperties = additionalProperty?.filter(
    (property) => property.propertyID === "Modelo",
  );

  const validProperties =
    filteredProperties?.filter((prop) => prop.value) || [];

  if (!validProperties.length) return null;

  const renderImageComponents = (
    properties: typeof validProperties,
    preloadCount = 0,
  ) =>
    properties.map((prop, index) => (
      <ImageComponent
        imageName={generateIconUrl(prop.value)}
        value={prop.value}
        preload={index < preloadCount}
      />
    ));

  if (isMobile) {
    return (
      <div class={CAROUSEL_CONTAINER_CLASSES}>
        <h3 class="mb-5 text-lg font-medium text-primary">
          Informações do seu produto:
        </h3>
        <div class={MOBILE_CONTAINER_CLASSES}>
          {renderImageComponents(validProperties)}
        </div>
      </div>
    );
  }

  const desktopPageSize = 6;
  const needsCarousel = validProperties.length > desktopPageSize;

  return (
    <div class={CAROUSEL_CONTAINER_CLASSES}>
      {needsCarousel ? (
        <div id={id} class="relative ml-auto mt-3 w-fit">
          <Slider class="carousel-start carousel box-border w-[560px] gap-4">
            {validProperties.map((prop, index) => (
              <Slider.Item
                index={index}
                class="carousel-item w-20 flex-shrink-0"
              >
                <ImageComponent
                  imageName={generateIconUrl(prop.value)}
                  value={prop.value}
                  preload={index < desktopPageSize}
                />
              </Slider.Item>
            ))}
          </Slider>
          {validProperties.length > desktopPageSize && (
            <CarouselNavigation
              position="custom"
              leftButtonProps={{ position: "-left-10" }}
              rightButtonProps={{ position: "-right-10" }}
            />
          )}
          <SliderJS
            rootId={id}
            itemsPerPage={{ 0: 2, 768: 4, 1024: desktopPageSize }}
            infinite={false}
          />
        </div>
      ) : (
        <div class={DESKTOP_STATIC_CLASSES}>
          {renderImageComponents(validProperties, validProperties.length)}
        </div>
      )}
    </div>
  );
}
