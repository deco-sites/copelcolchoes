import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import { clx } from "$store/sdk/clx.ts";

function SearchButton() {
  const { displaySearchbar } = useUI();

  return (
    <Button
      class="btn-square btn-ghost flex items-center justify-center"
      aria-label="search icon button"
      onClick={() => {
        displaySearchbar.value = !displaySearchbar.peek();
      }}
    >
      <Icon
        class="text-base-content"
        id="MagnifyingGlass"
        width={24}
        height={25}
        strokeWidth={1}
      />
    </Button>
  );
}

function MenuButton() {
  const { displayMenu } = useUI();

  return (
    <Button
      class="rounded-full border-2 border-solid no-animation btn-ghost relative flex justify-center items-center lg:hidden"
      aria-label="open menu"
      name="open menu"
      onClick={() => {
        displayMenu.value = true;
      }}
    >
      <Icon class="text-base-content" id="Menu" width={25} height={25} />
    </Button>
  );
}

function ChatButton() {
  return (
    <Button
      class="btn-square btn-ghost flex items-center justify-center"
      aria-label="chat icon button"
      onClick={() => {
        console.log("Chat");
      }}
    >
      <Icon
        class="text-base-content"
        id="Chat"
        width={24}
        height={25}
        strokeWidth={1}
      />
    </Button>
  );
}

function CartButton({ device }: { device?: string }) {
  const { displayCart } = useUI();
  const { loading, cart, mapItemsToAnalyticsItems } = useCart();

  console.log("cart", cart);
  const totalItems = cart.value?.items.length || 0;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const total = cart.value?.totalizers.find((item) => item.id === "Items");
  const discounts = cart.value?.totalizers.find((item) =>
    item.id === "Discounts"
  );

  const onClick = () => {
    displayCart.value = true;
    sendEvent({
      name: "view_cart",
      params: {
        currency: cart.value ? currencyCode! : "",
        value: total?.value
          ? (total?.value - (discounts?.value ?? 0)) / 100
          : 0,

        items: cart.value ? mapItemsToAnalyticsItems(cart.value) : [],
      },
    });
  };

  return (
    <Button
      class="btn-square btn-ghost relative flex justify-center items-center hover:bg-white"
      aria-label={totalItems > 9 ? "9+" : `${totalItems}`}
      name="open cart"
      data-deco={displayCart.value && "open-cart"}
      loading={loading.value}
      onClick={onClick}
    >
      <div class="flex relative">
        <span
          class={clx(
            `flex justify-center items-center text-white bg-[#d81a4d] text-xs font-['Montserrat',_sans-serif] z-[9] rounded-full 
            font-bold w-[18px] h-[19px] md:w-[20px] md:h-[20px] absolute -top-[2px] md:-right-[8px] right-[3px] text-[12px]`,
          )}
        >
          {totalItems > 9 ? "9+" : totalItems}
        </span>
        {device === "desktop"
          ? (
            <Icon
              id="ShoppingCart"
              size={36}
              strokeWidth={1}
            />
          )
          : (
            <Icon
              class={`-translate-x-[10px]`}
              id="ShoppingCartMobile"
              size={28}
              strokeWidth={1}
            />
          )}
      </div>
      <span
        class={`max-lg:hidden text-[14px] leading-[21px] text-[#656565] font-black text-left md:ml-[12px]`}
      >
        Meu <br /> carrinho
      </span>
    </Button>
  );
}

function Buttons(
  { variant, device }: {
    variant: "cart" | "search" | "menu" | "chat";
    device?: string;
  },
) {
  if (variant === "cart") {
    return <CartButton device={device} />;
  }

  if (variant === "search") {
    return <SearchButton />;
  }

  if (variant === "menu") {
    return <MenuButton />;
  }

  if (variant === "chat") {
    return <ChatButton />;
  }

  return null;
}

export default Buttons;
