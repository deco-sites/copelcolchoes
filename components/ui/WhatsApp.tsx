import Icon from "$store/components/ui/Icon.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import BackToTop from "$store/islands/BackToTopButton.tsx";

export interface Props {
  phone?: number;
  whatsappImage: LiveImage;
}

function WhatsApp({ phone, whatsappImage }: Props) {
  if (!phone) {
    return null;
  }

  return (
    <>
      <a
        href={`https://api.whatsapp.com/send/?phone=${phone}&text=Olá!&type=phone_number&app_absent=0`}
        class="fixed w-[55px] h-[55px] bottom-[70px] right-[22px] rounded-full z-40 bg-[limegreen] flex items-center justify-center"
        aria-label="Chat on WhatsApp"
        target="_blank"
      >
        <img
          src={whatsappImage}
          alt="Whatsapp"
          class="w-[65%]"
          width={35}
          height={35}
        />
      </a>
      <BackToTop />
    </>
  );
}

export default WhatsApp;
