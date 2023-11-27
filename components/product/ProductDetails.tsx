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
import type { Product } from "apps/commerce/types.ts";
import BuyTogether from "$store/islands/BuyTogether.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import type { ComponentChildren } from "preact";
// import ProductReviews, { loader } from "$store/islands/ProductReviews.tsx";
import QuickReview from "$store/islands/QuickReview.tsx";

export type ShareableNetwork = "Facebook" | "Twitter" | "Email" | "WhatsApp";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
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
    productID,
    offers,
    name,
    isVariantOf,
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
        <h1 class="text-primary text-[1.75rem] max-lg:text-[1.5rem] leading-8 font-semibold pt-2 capitalize">
          {(isVariantOf?.name || name || "").toLowerCase()}
        </h1>
      </div>
      {/* YourViews Box */}
      <div
        class="text-primary font-quicksand text-[0.875rem] font-medium leading-8 py-4 underline"
        id="yv-quickreview"
      >
        <QuickReview />
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
            <div class="py-[1.375rem] max-lg:pb-0">
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
                <p class="text-secondary text-base font-quicksand font-extrabold leading-[1.125rem] mt-[10px]">
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

function ProductAccordion(
  { title, children }: { title: string; children: ComponentChildren },
) {
  return (
    <details class="collapse collapse-arrow border-b border-[#eaeaea] outline-none overflow-visible">
      <summary class="collapse-title border border-[#e0dddc] rounded-[0.3125rem] shadow-[0_0.125rem_0.125rem_rgba(0,0,0,0.16)] h-auto p-5 text-left flex justify-between items-center w-full relative after:!h-4 after:!w-4 text-lg font-medium text-primary">
        {title}
      </summary>
      <div class="collapse-content flex items-center border border-[#eaeaea] rounded-[0.3125rem] shadow-[0_0.125rem_0.125rem_rgba(0,0,0,0.16)] gap-12 h-auto p-6">
        {children}
      </div>
    </details>
  );
}

function ProductAccordions({ product }: {
  product: Product;
}) {
  const { description, isVariantOf } = product;
  const { additionalProperty } = isVariantOf as unknown as Product;
  const cuidados = additionalProperty
    ? additionalProperty.find((prop) =>
      prop.name === "Cuidados e manutenção do produto"
    )
    : undefined;
  const [image] = useStableImages(product);
  return (
    <section class="lg:py-10 bg-transparent relative w-full font-quicksand max-lg:py-6">
      <div class="flex flex-col gap-4 justify-between">
        <ProductAccordion title="Descrição do produto">
          {description
            ? (
              <>
                <div class="w-1/2 max-w-[27.125rem]">
                  <div class="flex items-center justify-center mx-auto w-full bg-transparent">
                    <Image
                      src={image!.url}
                      alt={image.alternateName}
                      width={400}
                    />
                  </div>
                </div>
                <div class="w-1/2">
                  <div
                    class="font-quicksand text-base leading-6 text-[#828282]"
                    dangerouslySetInnerHTML={{ __html: description }}
                  >
                  </div>
                </div>
              </>
            )
            : <></>}
        </ProductAccordion>
        <ProductAccordion title="Informações técnicas">
          {additionalProperty && (
            <div class="bg-[#f6f7f9] py-6 px-8 w-full">
              {additionalProperty.filter((prop) =>
                prop.name != "sellerId" && prop.name != "Medidas" &&
                prop.name != "Video"
              ).map((prop) => (
                <div class="border-b border-b-[#dbdbdb] last:border-b-0 items-center flex font-quicksand text-sm font-medium leading-6 justify-between py-3">
                  <div class="w-1/2 text-[#403c3c]">{prop.name}</div>
                  <div class="w-1/2 text-primary">{prop.value}</div>
                </div>
              ))}
            </div>
          )}
        </ProductAccordion>
        <ProductAccordion title="Cuidados e manutenção do produto">
          {(additionalProperty && cuidados) && (
            <div>
              <div class="text-base leading-6 font-quicksand whitespace-pre-wrap text-[#828282]">
                {cuidados.value}
              </div>
            </div>
          )}
        </ProductAccordion>
      </div>
    </section>
  );
}

function Selos({ product }: { product: Product }) {
  const { isVariantOf, category: fullCategory } = product;
  const { additionalProperty } = isVariantOf as unknown as Product;
  const category = fullCategory ? fullCategory.split(">")[0] : "";
  const activeSelos = {
    "Colchões": 3,
    "Cama Box": 3,
    "Cama Box mais Colchão": 7,
    "Travesseiros": 6,
    "Acessórios": 0,
    "Móveis": 0,
  };
  console.log(category, additionalProperty);
  return (
    <div class="w-fit bg-transparent">
      {activeSelos[category as keyof typeof activeSelos] > 0 && (
        <>
          <div class="text-primary text-lg leading-8 font-semibold my-6">
            <p>Informações do seu produto:</p>
          </div>
          <div class="flex items-center flex-row gap-8 justify-between">
            {additionalProperty && additionalProperty.map((prop, index) => {
              const { value } = prop;
              const url = value
                ? value.normalize("NFD").replaceAll("/ ", "").replace(
                  /[\u0300-\u036f]/g,
                  "",
                )
                  .replaceAll(" ", "_").toLowerCase()
                : "";
              if (
                index >= activeSelos[category as keyof typeof activeSelos]
              ) return;
              return (
                <div class="flex items-center flex-col font-quicksand text-sm font-medium leading-6 justify-between py-3">
                  <div class="max-w-[3.125rem]">
                    <img
                      class="w-full h-auto inline-block align-middle"
                      src={`/arquivos/icone_${url}.svg`}
                      alt={value}
                    />
                  </div>
                  <div class="text-primary text-sm leading-8">{value}</div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function Details({
  page,
  buyTogether,
}: {
  page: ProductDetailsPage;
  buyTogether: Product[] | null;
}) {
  const { product, breadcrumbList } = page;
  const accessory = buyTogether ? buyTogether[0] : undefined;
  const filteredBreadcrumbList = breadcrumbList.itemListElement.filter((item) =>
    item.name!.length > 1
  );
  const images = useStableImages(product);
  // console.log(product);

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
      <Selos product={product} />
      {accessory &&
        <BuyTogether product={product} accessory={accessory} />}
      <ProductAccordions product={product} />
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
          </>
        )
        : <NotFound />}
    </div>
  );
}

export default ProductDetails;
