import Button from "$store/components/ui/Button.tsx";
import {
  Options as UseAddToCartProps,
  useAddToCart,
} from "$store/sdk/useAddToCart.ts";

interface Props extends UseAddToCartProps {
  /**
   * @description Product id
   */
  sellerId: string;
  label?: string;
}

function AddToCartButton(
  {
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
    label,
    quantity,
  }: Props,
) {
  const items = [{
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
    quantity,
  }];
  const props = useAddToCart({ items });

  return (
    <div class="py-[0.3125rem] text-[#464646] max-w-[17.5rem] w-[70%]">
      <div>
        <Button
          title={label || "Adicionar ao carrinho"}
          class="bg-primary border-transparent !rounded-[0.3125rem] font-quicksand text-base font-semibold h-12 leading-5 min-w-[13.25rem] transition-all duration-300 hover:bg-[#00224d] w-full flex items-center justify-center relative px-8 text-white appearance-none"
          data-deco="add-to-cart"
          {...props}
        >
          {label || "Adicionar ao carrinho"}
        </Button>
      </div>
    </div>
  );
}

export default AddToCartButton;
