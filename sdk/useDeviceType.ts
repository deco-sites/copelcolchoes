import type { Device } from "@deco/deco/utils";
import { useSyncExternalStore } from "preact/compat";

type Snapshot = {
  type: Device;
  reason: string;
};

interface NavigatorUAData {
  mobile?: boolean;
  platform?: string;
}

const PHONE_MAX = 599;
const TABLET_MAX = 1023;

let cachedUA: string | null = null;
let cachedPlatform: string | null = null;
let cachedMaxTouch = 0;
let cachedUAD: NavigatorUAData | null = null;

function primeEnv() {
  if (typeof window === "undefined" || typeof navigator === "undefined") return;
  if (cachedUA !== null) return;
  cachedUA = (navigator.userAgent || "").toLowerCase();
  cachedPlatform = (navigator as Navigator & { platform?: string }).platform ??
    null;
  cachedMaxTouch =
    (navigator as Navigator & { maxTouchPoints?: number }).maxTouchPoints ?? 0;
  cachedUAD = (navigator as Navigator & { userAgentData?: NavigatorUAData })
    .userAgentData ?? null;
}

function classify(width: number) {
  if (width <= PHONE_MAX) return "mobile";
  if (width <= TABLET_MAX) return "tablet";
  return "desktop";
}

function detectSnapshot(): Snapshot {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return { type: "desktop", reason: "SSR default" };
  }

  primeEnv();

  const ua = cachedUA ?? "";
  const platform = cachedPlatform ?? "";
  const maxTouch = cachedMaxTouch;
  const uad = cachedUAD;

  const looksLikeMac = /macintosh|macintel/i.test(platform) ||
    ua.includes("macintosh");
  const isIPadOSDesktopMode = looksLikeMac && maxTouch > 1;
  if (isIPadOSDesktopMode) {
    return { type: "tablet", reason: "Mac-like UA + touch (iPadOS)" };
  }

  const chMobile = uad?.mobile;
  const chPlatform = (uad?.platform ?? "").toLowerCase();
  if (typeof chMobile === "boolean") {
    if (chMobile) return { type: "mobile", reason: "UA-CH mobile=true" };
    const w = globalThis.innerWidth || 0;
    if (chPlatform.includes("android")) {
      const t: Device = w >= 600 && w < 1280 ? "tablet" : classify(w);
      return { type: t, reason: `UA-CH Android + mobile=false + w=${w}` };
    }
    return { type: classify(w), reason: `UA-CH mobile=false + w=${w}` };
  }

  const isAndroid = ua.includes("android");
  const isAndroidTablet = isAndroid && !ua.includes("mobile");
  const isIPadUA = /ipad/.test(ua);
  const isIPhoneUA = /iphone|ipod/.test(ua);
  if (isIPadUA || isAndroidTablet) {
    return {
      type: "tablet",
      reason: isIPadUA ? "UA iPad" : "UA Android tablet",
    };
  }
  if (isIPhoneUA || /mobi|windows phone|blackberry|bb10/.test(ua)) {
    return { type: "mobile", reason: "UA mobile indicators" };
  }

  const w = globalThis.innerWidth || 0;
  return { type: classify(w), reason: `Viewport w=${w}` };
}

let snapshot: Snapshot = { type: "desktop", reason: "init" };
const subscribers = new Set<() => void>();
let initialized = false;

let mqPhone: MediaQueryList | null = null;
let mqTablet: MediaQueryList | null = null;

function ensureInitialized() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  primeEnv();

  mqPhone = globalThis.matchMedia(`(max-width: ${PHONE_MAX}px)`);
  mqTablet = globalThis.matchMedia(
    `(min-width: ${PHONE_MAX + 1}px) and (max-width: ${TABLET_MAX}px)`,
  );

  const recompute = (): void => {
    const next = detectSnapshot();
    if (next.type !== snapshot.type || next.reason !== snapshot.reason) {
      snapshot = next;
      subscribers.forEach((cb) => cb());
    }
  };

  snapshot = detectSnapshot();

  const onChange = (): void => recompute();

  if (typeof mqPhone.addEventListener === "function") {
    mqPhone.addEventListener("change", onChange);
    mqTablet?.addEventListener("change", onChange);
  } else {
    // Safari <14
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    mqPhone.addListener(onChange);
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    mqTablet?.addListener(onChange);
  }

  globalThis.addEventListener("orientationchange", onChange);
  setTimeout(onChange, 0);
}

function subscribe(cb: () => void) {
  ensureInitialized();
  subscribers.add(cb);
  return () => {
    subscribers.delete(cb);
  };
}

function getSnapshot() {
  if (!initialized && typeof window !== "undefined") ensureInitialized();
  return snapshot;
}

export function useDeviceType(device?: Device) {
  const snap = useSyncExternalStore(subscribe, getSnapshot);
  const { type, reason } = snap;

  if (typeof window === "undefined" && device) {
    return {
      type: device,
      isPhone: device === "mobile",
      isTablet: device === "tablet",
      isDesktop: device === "desktop",
      reason: "SSR default",
    };
  }

  return {
    type,
    isPhone: type === "mobile",
    isTablet: type === "tablet",
    isDesktop: type === "desktop",
    reason,
    asHeader: (): Record<string, string> => ({ "X-Device-Type": type }),
  };
}
