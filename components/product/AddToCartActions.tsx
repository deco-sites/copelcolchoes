import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import { useState } from "preact/hooks";
import AddToCartButton from "$store/components/product/AddToCartButton.tsx";

type Props = {
  productID: string;
  seller: string;
  price?: number;
  listPrice?: number;
  productName: string;
  productGroupID: string;
  showQtSelector?: boolean;
};

export default function AddToCartActions(
  {
    productID,
    seller,
    price,
    listPrice,
    productName,
    productGroupID,
    showQtSelector = false,
  }: Props,
) {
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      {showQtSelector
        ? (
          <QuantitySelector
            quantity={quantity}
            onChange={(_quantity) => {
              setQuantity(_quantity);
            }}
          />
        )
        : null}
      <AddToCartButton
        skuId={productID}
        sellerId={seller}
        price={price ?? 0}
        discount={price && listPrice ? listPrice - price : 0}
        name={productName}
        productGroupId={productGroupID}
        quantity={quantity}
        label="Adicionar ao carrinho"
      />
    </>
  );
}
