import type { Product } from "apps/commerce/types.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import Button from "$store/components/ui/Button.tsx";
import { useAddToCart } from "$store/sdk/useAddToCart.ts";
import Image from "deco-sites/std/components/Image.tsx";
import { formatPrice } from "$store/sdk/format.ts";

export interface Props {
  product: Product;
  accessory: Product;
}

const useStableImages = (product: Product) => {
  const imageNameFromURL = (url = "") => {
    const segments = new URL(url).pathname.split("/");
    return segments[segments.length - 1];
  };

  const images = product.image ?? [];
  const allImages = product.isVariantOf?.hasVariant.flatMap((p) => p.image)
    .reduce((acc, img) => {
      if (img?.url) {
        acc[imageNameFromURL(img.url)] = img.url;
      }
      return acc;
    }, {} as Record<string, string>) ?? {};

  return images.map((img) => {
    const name = imageNameFromURL(img.url);

    return { ...img, url: allImages[name] ?? img.url };
  });
};
function ProductBuyTogetherCard(product: Product) {
  const {
    offers,
    name,
    isVariantOf,
  } = product;
  const { price, listPrice } = useOffer(
    offers,
  );
  const discount = ((listPrice && price) && listPrice !== price)
    ? Math.round(((listPrice - price) / listPrice) * 100)
    : undefined;
  const [image] = useStableImages(product);
  return (
    <div class="lg:p-3 lg:w-[23rem] font-quicksand flex gap-3 rounded-[0.625rem] border border-[#e5e5e5] shadow-[0_0.125rem_0.125rem_rgba(0,0,0,0.16)] items-center max-lg:flex-col max-lg:p-4 max-lg:min-w-[15.25rem]">
      <div class="lg:w-[35%] max-lg:w-full">
        <div class="relative block h-0 w-full pb-[100%]">
          <Image
            class="absolute top-0 left-0 w-full block object-cover font-['blur-up:_auto','object-fit:_cover'] h-auto align-middle"
            sizes="(max-width: 480px) 116px, 116px"
            src={image.url!}
            alt={image.alternateName}
            width={116}
            height={116}
            // Preload LCP image for better web vitals
            preload={false}
            loading={"lazy"}
          />
        </div>
      </div>
      <div class="lg:w-[65%] max-lg:w-full">
        <h2 class="lg:text-sm lg:leading-6 text-[#828282] font-medium mb-4">
          {isVariantOf?.name || name}
        </h2>
        <div class="items-center flex justify-between">
          {discount && (
            <del class="text-[#828282] font-medium leading-[1.125rem] line-through">
              {`De: ${
                formatPrice(listPrice, offers!.priceCurrency!)!.replace(
                  "\xa0",
                  " ",
                )
              }`}
            </del>
          )}
          <ins class="font-bold no-underline text-primary text-base leading-5">
            {`Por: ${formatPrice(price)!.replace("\xa0", " ")}`}
          </ins>
        </div>
      </div>
    </div>
  );
}

function BuyTogether({
  product,
  accessory,
}: Props) {
  const {
    productID,
    offers,
    name,
  } = product;
  const { price, listPrice, seller } = useOffer(
    offers,
  );
  const {
    productID: productID2,
    offers: offers2,
    name: name2,
  } = accessory;
  const { price: price2, listPrice: listPrice2, seller: seller2 } = useOffer(
    offers2,
  );

  if (!seller || !seller2) return <></>;
  const addProduct = {
    skuId: productID,
    sellerId: seller,
    discount: price && listPrice ? listPrice - price : 0,
    price: price ?? 0,
    productGroupId: product.isVariantOf?.productGroupID ?? "",
    name: name ?? "",
    quantity: 1,
  };
  const addAccessory = {
    skuId: productID2,
    sellerId: seller2,
    discount: price2 && listPrice2 ? listPrice2 - price2 : 0,
    price: price2 ?? 0,
    productGroupId: accessory.isVariantOf?.productGroupID ?? "",
    name: name2 ?? "",
    quantity: 1,
  };
  const items = [addAccessory, addProduct];
  const props = useAddToCart({ items });
  const totalListPrice = (listPrice && listPrice2) ? listPrice + listPrice2 : 0;
  const totalPrice = (price && price2) ? price + price2 : 0;
  return (
    <section class="py-6">
      <div>
        <h3 class="lg:text-[1.75rem] leading-[2.1875rem] text-primary font-semibold tracking-normal my-5 text-left max-lg:text-2xl max-lg:leading-[1.875rem]">
          Compre junto
        </h3>
        {
          /* <div class="flex relative bg-white items-center max-lg:hidden">
          <ProductBuyTogetherCard {...product} />
          <div class="px-8 bg-white flex relative">
            <span class="bg-primary h-[0.125rem] w-[1.125rem]"></span>
            <span class="bg-primary h-[0.125rem] w-[1.125rem] absolute rotate-90">
            </span>
          </div>
          <ProductBuyTogetherCard {...accessory} />
          <div class="bg-white flex flex-col gap-1 px-8 relative">
            <span class="bg-primary h-[0.125rem] w-[1.125rem]"></span>
            <span class="bg-primary h-[0.125rem] w-[1.125rem]"></span>
          </div>
          <div class="bg-white flex flex-col gap-2 py-2 relative">
            <div class="bg-white flex flex-col py-2 relative">
              {totalListPrice !== price && (
                <del class="text-[#828282] text-sm font-medium leading-[1.125rem] py-1 line-through font-quicksand">
                  DE: {formatPrice(totalListPrice, offers!.priceCurrency!)}
                </del>
              )}
              <ins class="text-secondary text-[1.5rem] font-extrabold leading-[1.875rem] py-1 no-underline font-quicksand">
                POR: {formatPrice(totalPrice, offers!.priceCurrency!)}
              </ins>
            </div>
            <div class="w-full">
              <Button
                title={"Comprar juntos"}
                class="bg-black border-transparent !rounded-[0.3125rem] font-quicksand text-base font-semibold h-12 leading-5 min-w-[15.5rem] max-w-[17.5rem] transition-all duration-300 w-[90%] hover:bg-[#00224d] flex items-center justify-center relative px-8 text-white appearance-none"
                data-deco="add-to-cart"
                {...props}
              >
                {"Comprar juntos"}
              </Button>
            </div>
          </div>
        </div> */
        }
        <div class="flex relative bg-white items-center">
          <div class="flex flex-col max-lg:overflow-x-hidden">
            <div class="flex items-center max-lg:overflow-x-scroll">
              <ProductBuyTogetherCard {...product} />
              <div class="px-8 bg-white flex relative">
                <span class="bg-primary h-[0.125rem] w-[1.125rem]"></span>
                <span class="bg-primary h-[0.125rem] w-[1.125rem] absolute rotate-90">
                </span>
              </div>
              <ProductBuyTogetherCard {...accessory} />
              <div class="bg-white flex flex-col gap-1 px-8 relative max-lg:hidden">
                <span class="bg-primary h-[0.125rem] w-[1.125rem]"></span>
                <span class="bg-primary h-[0.125rem] w-[1.125rem]"></span>
              </div>
              <div class="bg-white flex flex-col gap-2 py-2 relative max-lg:hidden">
                <div class="bg-white flex flex-col py-2 relative">
                  {totalListPrice !== price && (
                    <del class="text-[#828282] text-sm font-medium leading-[1.125rem] py-1 line-through font-quicksand">
                      DE: {formatPrice(totalListPrice, offers!.priceCurrency!)}
                    </del>
                  )}
                  <ins class="text-secondary text-[1.5rem] font-extrabold leading-[1.875rem] py-1 no-underline font-quicksand">
                    POR: {formatPrice(totalPrice, offers!.priceCurrency!)}
                  </ins>
                </div>
                <div class="w-full">
                  <Button
                    title={"Comprar juntos"}
                    class="bg-primary border-transparent !rounded-[0.3125rem] font-quicksand text-base font-semibold h-12 leading-5 min-w-[15.5rem] max-w-[17.5rem] transition-all duration-300 w-[90%] hover:bg-[#00224d] flex items-center justify-center relative px-8 text-white appearance-none"
                    data-deco="add-to-cart"
                    {...props}
                  >
                    {"Comprar juntos"}
                  </Button>
                </div>
              </div>
            </div>
            <div class="lg:hidden">
              <div class="bg-white flex flex-col gap-2 py-2 relative">
                <div class="bg-white flex flex-col py-2 relative">
                  {totalListPrice !== price && (
                    <del class="text-[#828282] text-sm font-medium leading-[1.125rem] py-1 line-through font-quicksand">
                      DE: {formatPrice(totalListPrice, offers!.priceCurrency!)}
                    </del>
                  )}
                  <ins class="text-secondary text-[1.5rem] font-extrabold leading-[1.875rem] py-1 no-underline font-quicksand">
                    POR: {formatPrice(totalPrice, offers!.priceCurrency!)}
                  </ins>
                </div>
                <div class="w-full">
                  <Button
                    title={"Comprar juntos"}
                    class="bg-primary border-transparent !rounded-[0.3125rem] font-quicksand text-base font-semibold h-12 leading-5 min-w-[15.5rem] max-w-[17.5rem] transition-all duration-300 w-[90%] hover:bg-[#00224d] flex items-center justify-center relative px-8 text-white appearance-none max-lg:my-0 max-lg:mx-auto"
                    data-deco="add-to-cart"
                    {...props}
                  >
                    {"Comprar juntos"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BuyTogether;
