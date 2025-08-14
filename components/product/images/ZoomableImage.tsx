import type { ImageObject } from "apps/commerce/types.ts";
import { useImageZoom } from "$store/sdk/useImageZoom.ts";
import { SafeImage } from "./SafeImage.tsx";

export interface ZoomableImageProps {
  img: ImageObject;
  index: number;
  aspect: string;
  width: number;
  height: number;
}

export function ZoomableImage({
  img,
  index,
  aspect,
  width,
  height,
}: ZoomableImageProps) {
  const { handleMouseMove, handleMouseLeave } = useImageZoom();

  const image = (
    <SafeImage
      class="h-full w-full object-cover"
      sizes={`(max-width: 480px) ${width}px, ${width}px`}
      style={{ aspectRatio: aspect }}
      src={img?.url!}
      alt={img.alternateName || "Imagem do produto"}
      width={width * 2}
      height={height * 2}
      containerWidth={width}
      containerHeight={height}
      preload={index === 0}
      fetchPriority={index === 0 ? "high" : "auto"}
      loading={index === 0 ? "eager" : "lazy"}
    />
  );

  return (
    <div
      class="group/zoomer relative cursor-zoom-in overflow-hidden"
      style={{ width: `${width}px`, height: `${height}px` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        class="zoom-target h-full w-full transition-transform duration-200 ease-out will-change-transform"
        style={{ transformOrigin: "center" }}
      >
        {image}
      </div>
    </div>
  );
}
