import { effect, signal } from "@preact/signals";

const isUserAgentMobile = (userAgent: string): boolean =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent,
  );

/**
 * Hook to detect if the user is on a mobile device
 * @example
 * const isMobile = useMobileDetect();
 * console.log(isMobile.value); // true if the user is on a mobile device
 */
export default function useMobileDetect() {
  const isAgentMobile = isUserAgentMobile(navigator.userAgent);
  const isMobile = signal(isAgentMobile);

  effect(() => {
    if (isAgentMobile) return;

    const checkMobile = () => {
      const isWindowSizeBelow1024 = globalThis.innerWidth < 1024;
      isMobile.value = isWindowSizeBelow1024;
    };

    let timeoutId: number | undefined = undefined;
    const debouncedCheckMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 250);
    };

    checkMobile();
    globalThis.addEventListener("resize", debouncedCheckMobile);

    return () => {
      globalThis.removeEventListener("resize", debouncedCheckMobile);
      clearTimeout(timeoutId);
    };
  });

  return isMobile;
}
