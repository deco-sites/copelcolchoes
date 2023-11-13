import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Button from "$store/components/ui/Button.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import type { LoaderReturnType } from "$live/types.ts";
import AddToCartActions from "$store/islands/AddToCartActions.tsx";
import ProductDetailsImages from "$store/islands/ProductDetailsImages.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import type { Product } from "apps/commerce/types.ts";
import BuyTogether from "$store/islands/BuyTogether.tsx";

export type ShareableNetwork = "Facebook" | "Twitter" | "Email" | "WhatsApp";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
  // buyTogether: Section;
  buyTogetherLoader: LoaderReturnType<Product[] | null>;
}

const WIDTH = 576;
const HEIGHT = 576;
const ASPECT_RATIO = "1";

/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */
function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <span class="font-medium text-2xl">Página não encontrada</span>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function ProductInfo(
  { page }: {
    page: ProductDetailsPage;
  },
) {
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    description,
    productID,
    offers,
    name,
    isVariantOf,
    url,
  } = product;
  const { price, listPrice, seller, availability, installment } = useOffer(
    offers,
  );
  const inStock = availability === "https://schema.org/InStock";
  const discount = ((listPrice && price) && listPrice !== price)
    ? Math.round(((listPrice - price) / listPrice) * 100)
    : undefined;

  return (
    <>
      {/* Code and name */}
      <div class="font-quicksand mt-5 relative">
        <span class="text-[#828282] text-sm leading-[1.125rem] mb-6">
          Cód.: {isVariantOf?.model}
        </span>
        <h1 class="text-primary text-[1.75rem] leading-8 font-semibold pt-2 capitalize">
          {(isVariantOf?.name || name || "").toLowerCase()}
        </h1>
      </div>
      {/* YourViews Box */}
      <div class="text-primary font-quicksand text-[0.875rem] font-medium leading-8 py-4 underline">
        <button class="flex items-center gap-4" title="0 avaliações">
          <div class="yv-review-quickreview">
            <div
              type="exhibition"
              class="flex items-center justify-start pointer-events-none"
            >
              <div class="relative box-border flex">
                <div className="relative align-middle pr-[2px] cursor-pointer flex items-center justify-center">
                  <Icon id="Star" class="text-[#d8d8d8]" size={18} />
                </div>
                <div className="relative align-middle pr-[2px] cursor-pointer flex items-center justify-center">
                  <Icon id="Star" class="text-[#d8d8d8]" size={18} />
                </div>
                <div className="relative align-middle pr-[2px] cursor-pointer flex items-center justify-center">
                  <Icon id="Star" class="text-[#d8d8d8]" size={18} />
                </div>
                <div className="relative align-middle pr-[2px] cursor-pointer flex items-center justify-center">
                  <Icon id="Star" class="text-[#d8d8d8]" size={18} />
                </div>
                <div className="relative align-middle pr-[2px] cursor-pointer flex items-center justify-center">
                  <Icon id="Star" class="text-[#d8d8d8]" size={18} />
                </div>
              </div>
            </div>
          </div>
          <span class="underline">Seja o primeiro a avaliar</span>
        </button>
      </div>
      {/* Prices */}
      {inStock
        ? (
          <>
            {discount && (
              <div>
                <div class="bg-black rounded-[16px] py-1 px-4 pointer-events-none relative text-left top-[unset] w-fit z-1">
                  <div class="flex justify-center items-center flex-col text-white h-full">
                    <p class="text-sm font-normal leading-4 whitespace-nowrap font-quicksand">
                      - {discount}%
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div class="py-[1.375rem]">
              <div class="flex flex-col font-quicksand">
                {discount && (
                  <del class="text-[#828282] text-base leading-[1.125rem] line-through">
                    {formatPrice(listPrice, offers!.priceCurrency!)}
                  </del>
                )}
                <p class="text-primary text-[1.375rem] font-extrabold leading-[1.875rem]">
                  POR: {formatPrice(price, offers!.priceCurrency!)}
                </p>
              </div>
              <div class="flex text-primary text-sm font-medium leading-5 flex-col items-start font-quicksand">
                <p class="min-w-fit">
                  Ou
                  <span class="mx-1 font-extrabold">
                    {installment?.billingDuration}x de {formatPrice(
                      installment?.billingIncrement,
                      offers!.priceCurrency,
                    )}
                  </span>
                  sem juros
                </p>
              </div>
              <div>
                <p class="text-secondary text-base font-extrabold leading-[1.125rem] mt-[10px]">
                  {price &&
                    formatPrice(price - (price * 0.1), offers!.priceCurrency!)}
                  {" "}
                  à vista
                </p>
              </div>
              <div class="w-full">
                <details
                  class="collapse collapse-arrow"
                  open={false}
                >
                  <summary class="collapse-title mt-[10px] h-auto text-sm font-medium leading-[1.125rem] text-primary font-quicksand p-0 min-h-0 after:!right-[unset] after:!left-[125px] after:!shadow-[1px_1px] after:!h-[0.4rem] after:!w-[0.4rem]">
                    Ver parcelamento
                  </summary>
                  <div class="collapse-content p-0 transition-all duration-300">
                    <div class="font-quicksand bg-white border border-primary rounded-2xl text-black flex py-4 px-5 relative right-0 w-full z-1">
                      <div class="flex font-quicksand justify-center flex-col w-full h-full">
                        <p class="text-sm font-medium leading-snug my-2 mx-0">
                          Condições especiais de parcelamento
                        </p>
                        <p class="text-sm font-medium leading-snug my-2 mx-0">
                          Em 1x no cartão de crédito ou boleto = 10% de desconto
                        </p>
                        <p class="text-sm font-medium leading-snug my-2 mx-0">
                          De 2x a 3x = Você ganha 7% de desconto
                        </p>
                        <p class="text-sm font-medium leading-snug my-2 mx-0">
                          De 4x a 6x = Você ganha 3% de desconto
                        </p>
                        <p class="text-sm font-medium leading-snug my-2 mx-0">
                          De 7x a 10x = Finalize suas compras sem juros
                        </p>
                      </div>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </>
        )
        : null}
      {/* Add to Cart and Favorites button */}
      <div class="mb-[0.9375rem] border border-[#f2f3f8]"></div>
      <div class="flex items-center gap-8">
        {availability === "https://schema.org/InStock"
          ? (
            <>
              {seller && (
                <AddToCartActions
                  productID={productID}
                  seller={seller}
                  price={price}
                  listPrice={listPrice}
                  productName={name ?? ""}
                  productGroupID={product.isVariantOf?.productGroupID ?? ""}
                />
              )}
            </>
          )
          : <OutOfStock productID={productID} />}
      </div>
      {/* Shipping Simulation */}

      {availability === "https://schema.org/InStock"
        ? (
          <ShippingSimulation
            items={[{
              id: Number(product.sku),
              quantity: 1,
              seller: seller ?? "1",
            }]}
          />
        )
        : null}

      {/* Analytics Event */}
      <SendEventOnLoad
        event={{
          name: "view_item",
          params: {
            items: [
              mapProductToAnalyticsItem({
                product,
                breadcrumbList,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
    </>
  );
}
const useStableImages = (product: ProductDetailsPage["product"]) => {
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

function Details({
  page,
  buyTogether,
}: {
  page: ProductDetailsPage;
  buyTogether: Product[] | null;
}) {
  const { product, breadcrumbList } = page;
  const accessory = buyTogether ? buyTogether[0] : undefined;
  console.log(accessory);
  const filteredBreadcrumbList = breadcrumbList.itemListElement.filter((item) =>
    item.name!.length > 1
  );
  const images = useStableImages(product);

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb
        itemListElement={filteredBreadcrumbList}
        class="!mb-0"
      />
      <section class="lg:flex lg:gap-16">
        {/* Product Images */}
        <ProductDetailsImages
          images={images}
          width={WIDTH}
          height={HEIGHT}
          aspect={ASPECT_RATIO}
          url={product.url!}
        />

        {/* Product Info */}
        <div class="lg:w-1/2 lg:z-50 lg:sticky lg:h-fit lg:top-5 lg:mb-[2.125rem]">
          <ProductInfo
            page={page}
          />
        </div>
      </section>
      <div></div>
      {accessory &&
        <BuyTogether product={product} accessory={accessory} />}
    </>
  );
}

function ProductAccordions({ product }: {
  product: Product;
}) {
  return (
    <>
      {/* Description card */}
      {
        /* <details className="collapse collapse-plus mt-[30px]">
        <summary className="collapse-title border border-base-200 rounded-full py-3 px-[30px] !min-h-0 font-medium">
          Descrição
        </summary>
        <div className="readmore !flex-col text-xs px-0 pl-[30px] mt-3 leading-tight collapse-content text-base-300">
          <input type="checkbox" id="readmore" className="readmore-toggle" />
          <p
            className="readmore-content whitespace-break-spaces !line-clamp-none"
            dangerouslySetInnerHTML={{ __html: description ? description : "" }}
          >
          </p>
        </div>
      </details> */
      }
    </>
  );
}

function ProductDetails(
  { page, buyTogetherLoader }: Props,
) {
  return (
    <div class="py-0">
      {page
        ? (
          <>
            <Details
              page={page}
              buyTogether={buyTogetherLoader}
            />
            <ProductAccordions product={page.product} />
          </>
        )
        : <NotFound />}
    </div>
  );
}

export default ProductDetails;
