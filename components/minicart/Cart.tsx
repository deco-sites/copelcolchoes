import Icon from "$store/components/ui/Icon.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import CartItem from "./CartItem.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import CartEmpty from "site/components/ui/CartEmpty.tsx";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "outline";

export interface ICartProps {
  /**
   * @title Hide clear all items button?
   * @default false
   */
  showClearButton?: boolean;
  desktop: {
    /**
     * @title finish order button variant
     */
    buttonMode?: ButtonVariant;
  };
  mobile: {
    /**
     * @title finish order button variant
     */
    buttonMode?: ButtonVariant;
  };
  /**
   * @title finish button label
   * @default Finalzar Compra
   */
  goToCartLabel?: string;
}

interface TotalizerProps {
  label?: string;
  value?: number;
  highlighted?: boolean;
  currencyCode: string;
  locale: string;
}

export const BUTTON_VARIANTS: Record<string, string> = {
  "primary": "primary hover:text-base-100",
  "secondary": "secondary hover:text-base-100",
  "accent": "accent text-base-content hover:text-base-100",
  "outline": "outline border border-base-content hover:bg-base-content",
};

function Totalizer(
  { value, label, currencyCode, locale }: TotalizerProps,
) {
  if (!value) return null;

  return (
    <div class="flex font-quicksand justify-between items-center mb-2 w-full text-[#333] text-base font-medium leading-snug capitalize">
      <p>{label}</p>
      <p>
        {formatPrice(value / 100, currencyCode!, locale)}
      </p>
    </div>
  );
}

function Cart(props: ICartProps) {
  const { displayCart } = useUI();
  const {
    goToCartLabel = "Finalizar compra",
  } = props;
  const { loading, mapItemsToAnalyticsItems, cart } = useCart();
  const isCartEmpty = cart.value?.items.length === 0;

  const locale = cart.value?.clientPreferencesData.locale;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const total =
    cart.value?.totalizers?.find((item) => item.id === "Items")?.value || 0;
  const discounts =
    cart.value?.totalizers?.find((item) => item.id === "Discounts")?.value || 0;

  if (cart.value === null) {
    return null;
  }

  const subTotal = cart.value.items.reduce(
    (acc, current) => current.price + acc,
    0,
  );

  const shippingData = cart.value?.shippingData;
  const logisticsInfo = shippingData && shippingData.logisticsInfo[0];
  const deliveryPrice = logisticsInfo && logisticsInfo.slas.length > 0
    ? logisticsInfo.slas[0].price
    : undefined;

  return (
    <>
      <div class="py-3 lg:py-[0.78125rem] lg:px-0 bg-primary font-quicksand relative">
        <div class="lg:my-0 lg:mx-auto flex items-center justify-center gap-[0.375rem]">
          <h3 class="lg:text-lg lg:!leading-[1.4375rem] text-white text-center font-extrabold capitalize">
            Seu Carrinho
          </h3>
          <p class="lg:text-lg lg:!leading-[1.4375rem] text-white text-center font-extrabold capitalize">
            ({cart.value?.items.length >= 10
              ? cart.value?.items.length
              : `0${cart.value?.items.length}`} Itens)
          </p>
          <button
            class="absolute right-6"
            onClick={() => {
              displayCart.value = false;
            }}
          >
            <Icon
              id="XMarkModal"
              class="text-white"
              size={15}
              strokeWidth={1}
            />
          </button>
        </div>
      </div>
      <div class="h-full max-h-[calc(100%-17.5625rem] border-t border-[#f2f3f8] pr-[0.625rem] pl-5">
        <div
          class={`h-full overflow-y-auto ${
            !isCartEmpty ? "pr-[0.625rem]" : ""
          } `}
        >
          {!isCartEmpty
            ? (
              <ul role="list">
                {cart.value.items.map((_, index) => (
                  <li
                    class={`py-6 relative border-b border-[#e6e6e6] flex gap-4 ${
                      loading.value ? "opacity-50" : ""
                    } transition-opacity duration-150 ease-in-out`}
                    key={index}
                  >
                    <CartItem index={index} currency={currencyCode!} />
                  </li>
                ))}
              </ul>
            )
            : <CartEmpty />}
        </div>
      </div>

      {!isCartEmpty && (
        <div class="shadow-[0_-0.1875rem_1.25rem_rgba(0,0,0,0.16)]">
          <div class="pt-5 pb-3 px-7 !lg:py-5 lg:px-6 font-quicksand">
            <Totalizer
              currencyCode={currencyCode as string}
              label="Subtotal"
              locale={locale as string}
              value={subTotal}
            />
            {deliveryPrice
              ? (
                <Totalizer
                  currencyCode={currencyCode as string}
                  label="Entrega"
                  locale={locale as string}
                  value={deliveryPrice}
                />
              )
              : null}
            <div class="flex justify-between items-center border-t border-[rbg(266,266,266)] py-3 px-0">
              <p class="text-secondary text-base font-extrabold leading-snug capitalize">
                Total
              </p>
              <p class="text-secondary text-base font-extrabold leading-snug capitalize">
                {total
                  ? `${formatPrice(total / 100, currencyCode!, locale)}`
                  : "R$ 0,00"}
              </p>
            </div>
            <a
              class="bg-primary rounded-[0.3125rem] text-white font-quicksand text-base font-semibold h-12 tracking-normal leading-5 mb-4 flex items-center justify-center relative px-8 appearance-none"
              title={goToCartLabel || "Finalizar compra"}
              href="/checkout"
              data-deco="buy-button"
              onClick={() => {
                sendEvent({
                  name: "begin_checkout",
                  params: {
                    currency: cart.value ? currencyCode! : "",
                    value: total ? (total - (discounts ?? 0)) / 100 : 0,
                    coupon: cart.value?.marketingData?.coupon ?? undefined,

                    items: cart.value
                      ? mapItemsToAnalyticsItems(cart.value)
                      : [],
                  },
                });
              }}
            >
              {goToCartLabel || "Finalizar compra"}
            </a>
            <button
              title="Continuar comprando"
              class="font-quicksand text-secondary underline flex font-semibold leading-snug relative capitalize m-auto tracking-normal"
              onClick={() => {
                displayCart.value = false;
              }}
            >
              Continue comprando
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
