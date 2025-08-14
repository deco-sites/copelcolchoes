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

function AddToCartButton({
  skuId,
  sellerId,
  discount,
  price,
  productGroupId,
  name,
  label,
  quantity,
}: Props) {
  const items = [
    {
      skuId,
      sellerId,
      discount,
      price,
      productGroupId,
      name,
      quantity,
    },
  ];
  const props = useAddToCart({ items });

  return (
    <div class="mt-8 w-full lg:max-w-[380px]">
      <div>
        <Button
          title={label || "Adicionar ao carrinho"}
          class="relative flex h-12 w-full min-w-[13.25rem] appearance-none items-center justify-center !rounded-[0.3125rem] border-transparent bg-primary px-8 font-quicksand text-base font-medium uppercase leading-5 text-white transition-all duration-300 hover:bg-[#00224d]"
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
