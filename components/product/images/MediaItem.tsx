import type { ImageObject } from "apps/commerce/types.ts";
import { clx } from "$store/sdk/clx.ts";
import Slider from "$store/components/ui/Slider.tsx";
import { SafeImage } from "./SafeImage.tsx";

export type MediaType =
  | ImageObject
  | { "@type": "VideoObject"; contentUrl?: string; name?: string };

export interface MediaItemProps {
  media: MediaType;
  index: number;
  aspect: string;
  isMobile: boolean;
  isThumb?: boolean;
  isMainSliderControl?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

export function MediaItem({
  media,
  index,
  aspect,
  isMobile,
  isThumb = false,
  isMainSliderControl = true,
  isActive = false,
  onClick,
}: MediaItemProps) {
  const commonImageClasses = clx(
    "rounded-[10px] border group-disabled:border-secondary",
    isThumb && isActive ? "border-secondary border" : "border-neutral",
    isThumb && "cursor-pointer",
    isMobile && isThumb ? "w-[60px]" : "w-[70px]",
  );

  const commonVideoClasses = clx(
    "pointer-events-none rounded-[10px]",
    isThumb && isMobile ? "mr-[10px]" : "",
    isThumb && !isMobile ? "cursor-pointer" : "",
  );

  const isInitiallyVisible =
    isThumb && ((isMobile && index < 4) || (!isMobile && index < 5));

  const content = (
    <>
      {media["@type"] === "ImageObject" && (
        <SafeImage
          style={{ aspectRatio: aspect }}
          class={commonImageClasses}
          width={isMobile && isThumb ? 60 : 70}
          height={isMobile && isThumb ? 60 : 70}
          sizes={
            isMobile && isThumb
              ? "(max-width: 480px) 60px, 60px"
              : "(max-width: 480px) 70px, 70px"
          }
          src={media.url!}
          alt={media.alternateName}
          preload={isInitiallyVisible}
          loading={isInitiallyVisible ? "eager" : "lazy"}
          fetchPriority={isInitiallyVisible ? "high" : "auto"}
        />
      )}
      {media["@type"] === "VideoObject" && (
        <iframe
          class={commonVideoClasses}
          width={isMobile && isThumb ? 60 : 70}
          height={isMobile && isThumb ? 60 : 70}
          src={(media.contentUrl || "") + (isThumb ? "?controls=0" : "")}
          title={media.name}
          frameborder={0}
          allow="picture-in-picture"
          loading="lazy"
        ></iframe>
      )}
    </>
  );

  if (isMainSliderControl) {
    return <Slider.Dot index={index}>{content}</Slider.Dot>;
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} class="cursor-pointer">
        {content}
      </button>
    );
  }

  return <div>{content}</div>;
}