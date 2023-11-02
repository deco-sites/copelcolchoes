import { formatPrice } from "$store/sdk/format.ts";
import Image from "deco-sites/std/components/Image.tsx";
import DiscountBadge from "./DiscountBadge.tsx";
import { Product } from "deco-sites/std/packs/vtex/types.ts";

interface Props {
  product: Product;
}

const WIDTH = 200;
const HEIGHT = 200;

function ProductCard(
  { product }: Props,
) {
  const { items, productId, link: url } = product;
  const { images, name, nameComplete, sellers } = items[0];
  const { commertialOffer: { Price: price, ListPrice: listPrice } } =
    sellers[0];
  const [front] = images ?? [];
  console.log(name);

  const price2: number = price as number;
  const listPrice2: number = listPrice as number;

  return (
    <article
      class="h-full w-[255px] shadow-md rounded-[5px] border border-[#dbdbdb] flex flex-col justify-between hover:border-primary bg-white flex-1"
      data-deco="view-product"
      id={`product-card-${productId}`}
    >
      <div class="relative overflow-hidden px-7 pt-[1.375rem] max-lg:py-7 max-lg:px-6">
        <div class="relative">
          <a
            href={url}
            aria-label="view product"
            class="block"
          >
            <Image
              src={front.imageUrl!}
              alt={nameComplete}
              width={WIDTH}
              height={HEIGHT}
              class="aspect-square object-cover block w-full h-auto"
            />
          </a>
        </div>
        {listPrice2 !== price2 && (
          <DiscountBadge
            price={price2}
            listPrice={listPrice2}
            className="bg-primary"
          />
        )}
      </div>

      {/* Prices & Name */}
      <div class="lg:py-6 lg:px-5 relative overflow-hidden max-lg:pt-0 max-lg:px-5 max-lg:pb-7">
        <a
          href={url}
          aria-label="view product"
          class="block"
        >
          <h2 class="lg:text-base lg:leading-[1.375rem] text-[#828282] font-medium mb-[1.125rem]">
            {nameComplete}
          </h2>
        </a>
        <div class="flex mb-4">
          <span class="flex w-fit text-center text-white bg-[#466fa3] text-xs leading-4 py-1 px-[0.625rem] rounded-[10px]">
            {name}
          </span>
        </div>
        <div class="flex flex-col">
          <div class="flex flex-col max-lg:contents">
            {(listPrice && price) && listPrice > price && (
              <del class="mb-[0.3125rem] text-[#464646] font-light text-[0.875rem] leading-[1.125rem]">
                De {formatPrice(listPrice)}
              </del>
            )}
            <ins class="font-bold no-underline text-emphasis text-xl leading-[1.5625rem] mb-[0.3125rem]">
              POR: {formatPrice(price)}
            </ins>
          </div>
        </div>
        <a
          href={url}
          aria-label="view product"
          class="block"
        >
          <div>
            <button
              title="Comprar"
              type="button"
              class="bg-primary w-full text-white tracking-normal capitalize mt-[1.875rem] leading-5 rounded-[0.3125rem] p-0 flex justify-center items-center border border-transparent font-bold relative h-[2.625rem]"
            >
              Comprar
            </button>
          </div>
        </a>
      </div>
    </article>
  );
}

export default ProductCard;
