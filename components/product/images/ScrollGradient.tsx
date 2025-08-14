export interface ScrollGradientProps {
  position: "top" | "bottom";
  show: boolean;
}

export function ScrollGradient({ position, show }: ScrollGradientProps) {
  if (!show) return null;

  const isTop = position === "top";
  const gradientDirection = isTop ? "0deg" : "180deg";
  const positionClass = isTop ? "top-0" : "bottom-0";

  return (
    <div
      class={`pointer-events-none absolute ${positionClass} left-0 z-10 h-12 w-full`}
      style={{
        background:
          `linear-gradient(${gradientDirection}, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 70%, #FFFFFF 100%)`,
      }}
    >
    </div>
  );
}
