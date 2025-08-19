import { clx } from "site/sdk/clx.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

interface Props {
  src?: string;
  srcMobile?: string;
  alt?: string;
  link?: string;
  borderRadius?: number;
  height: number;
  width: number;
  heightMobile: number;
  widthMobile: number;
  preload?: boolean;
  className?: string;
}

export default function PostImage(
  {
    src,
    srcMobile,
    link,
    borderRadius,
    height,
    width,
    heightMobile,
    widthMobile,
    alt,
    preload,
    className,
  }: Props,
) {
  if (!src && !srcMobile) return null;

  const classNames = clx(
    "w-full h-auto min-h-[170px] object-cover",
    className,
  );

  const ImageComponent = (
    <Picture preload={preload}>
      <Source
        media="(max-width: 768px)"
        fetchPriority={preload ? "high" : "auto"}
        src={srcMobile || src || ""}
        width={widthMobile || width || 0}
        height={heightMobile || height || 0}
      />
      <Source
        media="(min-width: 768px)"
        fetchPriority={preload ? "high" : "auto"}
        src={src || srcMobile || ""}
        width={width}
        height={height}
      />
      <img
        src={src || srcMobile || ""}
        alt={alt}
        class={classNames}
        style={borderRadius ? { borderRadius: `${borderRadius}px` } : undefined}
        loading={preload ? "eager" : "lazy"}
      />
    </Picture>
  );

  return link ? <a href={link}>{ImageComponent}</a> : ImageComponent;
}
