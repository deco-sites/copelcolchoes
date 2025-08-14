import { useEffect, useRef } from "preact/hooks";

export function useVerticalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<number>(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    stepRef.current = el.clientHeight || 0;
  }, []);

  const scrollByStep = (direction: "up" | "down") => {
    const el = containerRef.current;
    if (!el) return;
    const delta = direction === "up" ? -stepRef.current : stepRef.current;
    el.scrollBy({ top: delta, behavior: "smooth" });
  };

  return { containerRef, scrollByStep };
}
