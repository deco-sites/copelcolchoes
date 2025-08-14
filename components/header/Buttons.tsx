import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useCart } from "deco-sites/std/packs/vtex/hooks/useCart.ts";
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
      class="btn-ghost no-animation relative flex items-center justify-center rounded-full border-2 border-solid lg:hidden"
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
  const totalItems = cart.value?.items.length || 0;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const total = cart.value?.totalizers.find((item) => item.id === "Items");
  const discounts = cart.value?.totalizers.find(
    (item) => item.id === "Discounts",
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
      class="btn-square btn-ghost relative flex items-center justify-center hover:bg-white"
      aria-label={totalItems > 9 ? "9+" : `${totalItems}`}
      name="open cart"
      data-deco={displayCart.value && "open-cart"}
      loading={loading.value}
      onClick={onClick}
    >
      <div class="relative flex">
        <span
          class={clx(
            `absolute -top-[2px] right-[3px] z-[9] flex h-[19px] w-[18px] items-center justify-center rounded-full bg-[#d81a4d] font-['Montserrat',_sans-serif] text-[12px] text-xs font-bold text-white md:-right-[8px] md:h-[20px] md:w-[20px]`,
          )}
        >
          {totalItems > 9 ? "9+" : totalItems}
        </span>
        {device === "desktop"
          ? <Icon id="ShoppingCart" size={36} strokeWidth={1} />
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
        class={`text-left text-sm font-black leading-[1.2] text-[#656565] max-lg:hidden md:ml-[12px]`}
      >
        Meu <br /> carrinho
      </span>
    </Button>
  );
}

function Buttons({
  variant,
  device,
}: {
  variant: "cart" | "search" | "menu" | "chat";
  device?: string;
}) {
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
