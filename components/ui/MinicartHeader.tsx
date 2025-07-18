import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import { clx } from "$store/sdk/clx.ts";

const imageHeader = {
  desktop: {
    src: "/image/minicart/smileysad.png",
    width: 80,
    height: 80,
  },
  mobile: {
    src: "/image/minicart/smileysad-mobile.png",
    width: 70,
    height: 70,
  },
};

function MinicartHeader() {
  return (
    <>
      <div
        class={`flex flex-col items-center gap-y-[10px] mt-[38px] mb-[20px]`}
      >
        <Picture>
          <Source
            media="(max-width: 767px)"
            src={imageHeader.mobile.src}
            width={imageHeader.mobile.width}
            height={imageHeader.mobile.height}
          />

          <Source
            media="(min-width: 768px)"
            src={imageHeader.desktop.src}
            width={imageHeader.desktop.width}
            height={imageHeader.desktop.height}
          />
          <div>
            <img
              src={imageHeader.desktop.src}
              width={imageHeader.desktop.width}
              height={imageHeader.desktop.height}
              alt={"image header!"}
              class=""
              loading="lazy"
            />
          </div>
        </Picture>
        <p
          class={clx(
            `text-primary text-[24px] leading-[31px] md:text-[28px] md:leading-[1.2] 
                        font-bold font-quicksand md:max-w-[271px] text-center`,
          )}
        >
          Poxa, seu carrinho está vazio!
        </p>
      </div>
    </>
  );
}

export default MinicartHeader;
