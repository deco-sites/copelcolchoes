import Icon from "$store/components/ui/Icon.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import Image from "deco-sites/std/components/Image.tsx";
import { useCart } from "apps/vtex/hooks/useCart.ts";

interface Props {
  index: number;
  currency: string;
}

function CartItem({ index, currency }: Props) {
  const {
    cart,
    updateItems,
    mapItemsToAnalyticsItems,
    loading,
  } = useCart();
  const item = cart.value!.items[index];
  const locale = cart.value?.clientPreferencesData.locale;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const {
    imageUrl,
    skuName,
    sellingPrice,
    listPrice,
    name,
    quantity,
    detailUrl,
  } = item;

  return (
    <>
      <div class="w-20 flex-shrink-0">
        <a href={detailUrl} title={name} class="block cursor-pointer">
          <Image
            src={imageUrl.replace("60-40", "100-100")}
            alt={skuName}
            width={80}
            height={80}
            class="w-full h-auto inline-block align-middle"
          />
        </a>
      </div>
      <div class="flex flex-col gap-3 w-full">
        <div class="flex flex-row justify-between gap-2 max-lg:mb-5">
          <a
            href={detailUrl}
            title={name}
            class="block cursor-pointer text-[#333333] font-quicksand text-sm leading-snug max-h-[2.625rem] overflow-y-hidden"
          >
            {name}
          </a>
          <div class="flex justify-center items-end flex-col min-w-fit">
            <ins class="text-base max-lg:text-sm leading-snug max-lg:leading-4 font-black font-quicksand text-secondary no-underline">
              {formatPrice(sellingPrice / 100, currencyCode!, locale)}
            </ins>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <QuantitySelector
            disabled={loading.value}
            quantity={quantity}
            inputWidth={42}
            inputHeight={35}
            onChange={async (quantity) => {
              await updateItems({ orderItems: [{ index, quantity }] });
              const quantityDiff = quantity - item.quantity;

              if (!cart.value) {
                return;
              }

              sendEvent({
                name: quantityDiff < 0 ? "remove_from_cart" : "add_to_cart",
                params: {
                  items: mapItemsToAnalyticsItems({
                    items: [
                      {
                        ...item,
                        quantity: Math.abs(quantityDiff),
                      },
                    ],
                    marketingData: cart.value.marketingData,
                  }),
                },
              });
            }}
          />
          <button
            onClick={() => {
              updateItems({ orderItems: [{ index, quantity: 0 }] });
              if (!cart.value) {
                return;
              }
              sendEvent({
                name: "remove_from_cart",
                params: {
                  items: mapItemsToAnalyticsItems({
                    items: [item],
                    marketingData: cart.value.marketingData,
                  }),
                },
              });
            }}
            disabled={loading.value}
          >
            <Icon id="TrashCart" size={18} />
          </button>
        </div>
      </div>
    </>
  );
}

export default CartItem;
