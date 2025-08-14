export function useImageZoom() {
  const handleMouseMove = (e: MouseEvent) => {
    const container = e.currentTarget as HTMLElement;
    const zoomElement = container.querySelector(".zoom-target") as HTMLElement;
    if (!zoomElement) return;

    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const translateX = -x * 50;
    const translateY = -y * 50;

    zoomElement.style.transform =
      `scale(2) translate(${translateX}px, ${translateY}px)`;
    zoomElement.style.transformOrigin = `${x * 100}% ${y * 100}%`;
  };

  const handleMouseLeave = (e: MouseEvent) => {
    const container = e.currentTarget as HTMLElement;
    const zoomElement = container.querySelector(".zoom-target") as HTMLElement;
    if (zoomElement) {
      zoomElement.style.transform = "scale(1) translate(0, 0)";
      zoomElement.style.transformOrigin = "center";
    }
  };

  return { handleMouseMove, handleMouseLeave };
}
