import BackToTop from "$store/islands/BackToTopButton.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  phone?: number;
  whatsappImage: ImageWidget;
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
        <Image
          fetchPriority="high"
          loading="eager"
          src={whatsappImage}
          alt="Whatsapp"
          width={35}
          height={35}
        />
      </a>
      <BackToTop />
    </>
  );
}

export default WhatsApp;
