import { useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import { useCart } from "deco-sites/std/packs/vtex/hooks/useCart.ts";
import { useUI } from "site/sdk/useUI.ts";
import { sendEvent } from "site/sdk/analytics.tsx";

export interface Options {
  skuId: string;
  sellerId?: string;
  price: number;
  discount: number;
  quantity: number;
  /**
   * sku name
   */
  name: string;
  productGroupId: string;
}

export const useAddToCart = (
  { items }: { items: Options[] },
) => {
  const isAddingToCart = useSignal(false);
  const { displayCart } = useUI();
  const { addItems } = useCart();

  const onClick = useCallback(async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      isAddingToCart.value = true;
      const orderItems = items.map(({ skuId, sellerId, quantity }) => ({
        id: skuId,
        seller: sellerId!,
        quantity,
      }));
      await addItems({ orderItems });

      items.forEach(
        ({ productGroupId, quantity, price, discount, name, skuId }) => {
          sendEvent({
            name: "add_to_cart",
            params: {
              items: [
                {
                  item_id: productGroupId,
                  quantity,
                  price,
                  discount,
                  item_name: name,
                  item_variant: skuId,
                },
              ],
            },
          });
        },
      );

      displayCart.value = true;
    } finally {
      isAddingToCart.value = false;
    }
  }, [items]);

  return { onClick, loading: isAddingToCart.value };
};
