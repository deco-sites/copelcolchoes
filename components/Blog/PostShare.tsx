import { useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";
import Icon, { type AvailableIcons } from "site/components/ui/Icon.tsx";
import Toast from "site/components/ui/Toast.tsx";

/**
 * @titleBy name
 */
export interface SocialMedia {
  /**
   * @title Nome da rede social
   */
  name: "Facebook" | "X" | "Instagram" | "LinkedIn" | "WhatsApp";
  /**
   * @title Desabilitar rede social
   */
  disabledSocial?: boolean;
}

interface Props {
  socialMedia?: SocialMedia[];
  seoTitle?: string;
}

interface ShareProps {
  url: string;
  title?: string;
}

const SHARE_PLATFORMS = {
  Instagram: (url: string, title?: string) =>
    `instagram://share?text=${encodeURIComponent(`${title ?? ""} ${url}`)}`,
  Facebook: (url: string) =>
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  X: (url: string, title?: string) =>
    `https://x.com/intent/tweet?text=${encodeURIComponent(title ?? "")}&url=${
      encodeURIComponent(url)
    }`,
  LinkedIn: (url: string) =>
    `https://www.linkedin.com/sharing/share-offsite/?url=${
      encodeURIComponent(url)
    }`,
  WhatsApp: (url: string, title?: string) =>
    `https://api.whatsapp.com/send?text=${
      encodeURIComponent(`${title ?? ""} ${url}`)
    }`,
} as const;

export default function PostShare({ socialMedia, seoTitle }: Props) {
  const socialMediaList = socialMedia?.filter((item) => !item.disabledSocial);
  const showToast = useSignal(false);
  const toastTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
        toastTimer.current = null;
      }
    };
  }, []);

  if (!socialMediaList?.length) return null;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
        toastTimer.current = null;
      }
      showToast.value = true;
      toastTimer.current = globalThis.setTimeout(() => {
        showToast.value = false;
        toastTimer.current = null;
      }, 2500);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const nativeShare = async (shareData: ShareProps) => {
    if (typeof globalThis?.navigator?.share !== "function") return false;

    try {
      await globalThis.navigator.share({
        title: seoTitle ?? document.title,
        url: shareData.url,
      });
      return true;
    } catch (error) {
      console.error("Native share failed:", error);
      return false;
    }
  };

  const handleShare = async (platform: string) => {
    const shareData = {
      url: globalThis.location.href,
      title: seoTitle ?? document.title,
    };

    try {
      // Try native sharing first
      if (platform.toLowerCase() === "native") {
        const shared = await nativeShare(shareData);
        if (shared) return;
      }

      // Handle Instagram separately
      if (platform === "Instagram") {
        await copyToClipboard(shareData.url);
        return;
      }

      // Handle other platforms
      const platformKey = platform as keyof typeof SHARE_PLATFORMS;
      const getShareUrl = SHARE_PLATFORMS[platformKey];

      if (getShareUrl) {
        const shareUrl = getShareUrl(shareData.url, shareData.title);
        globalThis.open(shareUrl, "_blank", "noopener,noreferrer");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <>
      <div class="flex items-center gap-x-2.5">
        <span class="font-quicksand text-sm text-base-content">
          Compartilhar
        </span>
        <ul class="flex items-center gap-x-3">
          {socialMediaList.map((item) => (
            <li
              key={item.name}
              title={item.name}
              class="inline-flex items-center"
            >
              <button
                id={`share-${item.name.toLowerCase()}`}
                class="cursor-pointer"
                onClick={() => handleShare(item.name)}
                aria-label={`Compartilhar no ${item.name}`}
                type="button"
              >
                <Icon
                  size={20}
                  id={`${item.name}2` as AvailableIcons}
                  class="text-primary hover:text-primary-focus"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
      {showToast.value && (
        <Toast
          message="Link copiado! Agora é só colar no Instagram para compartilhar."
          type="success"
        />
      )}
    </>
  );
}
