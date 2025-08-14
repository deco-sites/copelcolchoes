import Image from "deco-sites/std/components/Image.tsx";
import { useEffect, useRef, useState } from "preact/hooks";
import { clx } from "$store/sdk/clx.ts";

export interface SafeImageProps {
  src: string;
  alt?: string;
  width: number;
  height: number;
  containerWidth?: number;
  containerHeight?: number;
  sizes?: string;
  class?: string;
  style?: Record<string, string | number>;
  preload?: boolean;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
}

export function SafeImage({
  src,
  alt,
  width,
  height,
  containerWidth,
  containerHeight,
  sizes,
  class: className,
  style,
  preload,
  loading,
  fetchPriority,
}: SafeImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading",
  );
  const wrapperW = containerWidth ?? width;
  const wrapperH = containerHeight ?? height;
  const handleLoad = () => {
    setStatus("loaded");
  };
  const handleError = () => {
    setStatus("error");
  };
  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    if (el.complete) {
      if (el.naturalWidth > 0 && el.naturalHeight > 0) {
        handleLoad();
      } else {
        handleError();
      }
    }
  }, [src]);

  return (
    <div
      class="relative"
      style={{
        width: `${wrapperW === 0 ? "auto" : wrapperW + "px"}`,
        height: `${wrapperH === 0 ? "auto" : wrapperH + "px"}`,
      }}
    >
      <div
        class={clx(
          "absolute inset-0 z-0 bg-neutral-200",
          status === "loading" && "animate-pulse",
          status === "loaded" && "opacity-0",
          className?.includes("rounded-") ? "" : "rounded-[10px]",
        )}
      >
        {status === "error" && (
          <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div class="h-[2px] w-[80%] max-w-[440px] rotate-45 rounded-full bg-gray-400" />
          </div>
        )}
      </div>
      <Image
        ref={imgRef as unknown as preact.Ref<HTMLImageElement>}
        class={clx(
          "relative z-10 h-full w-full object-cover transition-opacity duration-200",
          status === "loaded" ? "opacity-100" : "opacity-0",
          className,
        )}
        sizes={sizes}
        style={style}
        src={src}
        alt={alt}
        width={width}
        height={height}
        preload={preload}
        fetchPriority={fetchPriority}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}
