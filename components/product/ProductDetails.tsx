import type { ProductDetailsPage } from "apps/commerce/types.ts";
import type { Product } from "apps/commerce/types.ts";
import type { FnContext, LoaderReturnType } from "@deco/deco";
import type { ComponentChildren } from "preact";
import type { Device } from "@deco/deco/utils";
import { useOffer } from "$store/utils/userOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { getDiscountPercent } from "$store/utils/calc.ts";
import { useDeviceType } from "$store/sdk/useDeviceType.ts";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Button from "$store/components/ui/Button.tsx";
import ProductInfoCarousel from "$store/components/product/ProductInfoCarousel.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import AddToCartActions from "$store/islands/AddToCartActions.tsx";
import ProductDetailsImages from "$store/islands/ProductDetailsImages.tsx";
import BuyTogether from "$store/islands/BuyTogether.tsx";
import QuickReview from "$store/islands/QuickReview.tsx";

export type ShareableNetwork = "Facebook" | "Twitter" | "Email" | "WhatsApp";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
  buyTogetherLoader: LoaderReturnType<Product[] | null>;
}

/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */
function NotFound() {
  return (
    <div class="flex w-full items-center justify-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <span class="text-2xl font-medium">Página não encontrada</span>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function ProductInfo({
  page,
  isMobile,
}: {
  page: ProductDetailsPage;
  isMobile: boolean;
}) {
  const { breadcrumbList, product } = page;
  const { productID, offers, name, isVariantOf } = product;
  const {
    price,
    listPrice,
    priceWithPixDiscount,
    seller,
    availability,
    installment,
    totalDiscount,
  } = useOffer(offers);
  const discount = getDiscountPercent(listPrice, price);

  return (
    <>
      {/* Code and name */}
      <div class="relative mt-3 font-quicksand lg:mt-0">
        <span class="mb-6 text-sm leading-[1.125rem] text-[#828282]">
          Cód.: {isVariantOf?.model}
        </span>
        <h1 class="pt-2 text-xl font-semibold capitalize leading-8 text-primary lg:text-[28px]">
          {(isVariantOf?.name || name || "").toLowerCase()}
        </h1>
      </div>
      {/* YourViews Box */}
      <div
        class="my-3 font-quicksand text-sm font-medium leading-8 text-primary underline"
        id="yv-quickreview"
      >
        <QuickReview />
      </div>
      {/* Prices */}
      {availability
        ? (
          <>
            <div class="pb-5 max-lg:pb-0">
              <div class="flex flex-col font-quicksand">
                {priceWithPixDiscount && (
                  <div class="flex items-center gap-2">
                    <p class="text-[26px] font-extrabold text-secondary">
                      {formatPrice(
                        priceWithPixDiscount,
                        offers!.priceCurrency!,
                      )}
                    </p>
                    {totalDiscount > 0 && (
                      <span class="w-fit rounded-2xl bg-primary px-4 py-1 text-sm font-normal text-white">
                        -{totalDiscount}%
                      </span>
                    )}
                  </div>
                )}
                {!!discount && (
                  <del class="-order-1 text-[14px] leading-[1.125rem] text-[#828282] line-through">
                    {formatPrice(listPrice, offers!.priceCurrency!)}
                  </del>
                )}
                <p class="my-2 flex-col items-start font-quicksand text-sm font-semibold leading-5 text-secondary">
                  à vista no Pix ou em 1x no cartão
                </p>
              </div>

              <div class="flex flex-col items-start font-quicksand text-sm font-medium leading-5 text-primary">
                <p class="min-w-fit">
                  Ou {formatPrice(price, offers!.priceCurrency!)} em
                  <span class="mx-1 font-extrabold">
                    {installment?.billingDuration}x de {formatPrice(
                      installment?.billingIncrement,
                      offers!.priceCurrency,
                    )}
                  </span>
                  sem juros
                </p>
              </div>

              <div class="w-full">
                <details class="collapse collapse-arrow" open={false}>
                  <summary class="collapse-title mt-[10px] !flex min-h-0 w-fit items-center py-2 pl-0 pr-8 text-sm font-medium text-primary after:!right-4">
                    Ver parcelamento
                  </summary>
                  <div class="collapse-content p-0 transition-all duration-300">
                    <div class="z-1 relative right-0 flex w-full rounded-2xl border border-primary bg-white px-5 py-4 font-quicksand text-black">
                      <div class="flex h-full w-full flex-col justify-center font-quicksand">
                        <p class="mx-0 my-2 text-sm font-medium leading-snug">
                          Condições especiais de parcelamento
                        </p>
                        <p class="mx-0 my-2 text-sm font-medium leading-snug">
                          Em 1x no cartão de crédito ou pix = 10% de desconto
                        </p>
                        <p class="mx-0 my-2 text-sm font-medium leading-snug">
                          De 2x a 3x = Você ganha 7% de desconto
                        </p>
                        <p class="mx-0 my-2 text-sm font-medium leading-snug">
                          De 4x a 6x = Você ganha 3% de desconto
                        </p>
                        <p class="mx-0 my-2 text-sm font-medium leading-snug">
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
      <div class="border border-[#DCE3EA]" />
      <div class="flex items-center gap-8">
        {availability
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

      {isMobile && (
        <div class="mt-5 lg:hidden">
          <ProductInfoCarousel product={product} isMobile={isMobile} />
        </div>
      )}

      {availability
        ? (
          <ShippingSimulation
            items={[
              {
                id: Number(product.sku),
                quantity: 1,
                seller: seller ?? "1",
              },
            ]}
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
  const allImages = product.isVariantOf?.hasVariant
    .flatMap((p) => p.image)
    .reduce(
      (acc, img) => {
        if (img?.url) {
          acc[imageNameFromURL(img.url)] = img.url;
        }
        return acc;
      },
      {} as Record<string, string>,
    ) ?? {};

  return images.map((img) => {
    const name = imageNameFromURL(img.url);

    return { ...img, url: allImages[name] ?? img.url };
  });
};

function ProductAccordion({
  title,
  children,
}: {
  title: string;
  children: ComponentChildren;
}) {
  return (
    <details class="collapse collapse-arrow overflow-visible border-b border-[#eaeaea] outline-none">
      <summary class="collapse-title relative flex h-auto w-full items-center justify-between rounded-[0.3125rem] border border-[#e0dddc] p-5 text-left text-lg font-medium text-primary shadow-[0_0.125rem_0.125rem_rgba(0,0,0,0.16)] after:!h-4 after:!w-4">
        {title}
      </summary>
      <div class="collapse-content flex h-auto items-center gap-12 rounded-[0.3125rem] border border-[#eaeaea] p-6 shadow-[0_0.125rem_0.125rem_rgba(0,0,0,0.16)]">
        {children}
      </div>
    </details>
  );
}

function ProductAccordions({ product }: { product: Product }) {
  const { description, isVariantOf } = product;
  const { additionalProperty } = isVariantOf as unknown as Product;
  const cuidados = additionalProperty
    ? additionalProperty.find(
      (prop) => prop.name === "Cuidados e manutenção do produto",
    )
    : undefined;
  const [image] = useStableImages(product);
  return (
    <section class="relative w-full bg-transparent font-quicksand max-lg:py-6 lg:py-10">
      <div class="flex flex-col justify-between gap-4">
        <ProductAccordion title="Descrição do produto">
          {description && (
            <>
              <div class="hidden w-1/2 max-w-[27.125rem] lg:block">
                <div class="mx-auto flex w-full items-center justify-center bg-transparent">
                  <Image
                    src={image!.url}
                    alt={image.alternateName}
                    width={400}
                    height={400}
                  />
                </div>
              </div>
              <div class="w-full lg:w-1/2">
                <div
                  class="font-quicksand text-base leading-6 text-[#828282]"
                  // deno-lint-ignore react-no-danger
                  dangerouslySetInnerHTML={{ __html: description }}
                >
                </div>
              </div>
            </>
          )}
        </ProductAccordion>
        <ProductAccordion title="Informações técnicas">
          {additionalProperty && (
            <div class="w-full bg-[#f6f7f9] px-8 py-6">
              {additionalProperty
                .filter(
                  (prop) =>
                    prop.name != "sellerId" &&
                    prop.name != "Medidas" &&
                    prop.name != "Video",
                )
                .map((prop) => (
                  <div class="flex items-center justify-between border-b border-b-[#dbdbdb] py-3 font-quicksand text-sm font-medium leading-6 last:border-b-0">
                    <div class="w-1/2 text-[#403c3c]">{prop.name}</div>
                    <div class="w-1/2 text-primary">{prop.value}</div>
                  </div>
                ))}
            </div>
          )}
        </ProductAccordion>
        <ProductAccordion title="Cuidados e manutenção do produto">
          {additionalProperty && cuidados && (
            <div>
              <div class="whitespace-pre-wrap font-quicksand text-base leading-6 text-[#828282]">
                {cuidados.value}
              </div>
            </div>
          )}
        </ProductAccordion>
      </div>
    </section>
  );
}

function Details({
  page,
  buyTogether,
  device,
}: {
  page: ProductDetailsPage;
  buyTogether: Product[] | null;
  device: Device;
}) {
  const { isDesktop } = useDeviceType(device);
  const isMobile = !isDesktop;
  const { product, breadcrumbList } = page;
  const filteredBreadcrumbList = breadcrumbList.itemListElement.filter(
    (item) => item.name!.length > 1,
  );
  const images = useStableImages(product);

  return (
    <>
      <Breadcrumb itemListElement={filteredBreadcrumbList} class="!mb-0" />
      <section class="mt-7 lg:mt-9 lg:flex lg:gap-16">
        <div class="relative lg:flex-shrink-0">
          <ProductDetailsImages
            images={images}
            width={480}
            height={480}
            aspect="1"
            url={product.url!}
            product={product}
            isMobile={isMobile}
          />
          {!isMobile && (
            <div class="hidden lg:block">
              <ProductInfoCarousel product={product} isMobile={isMobile} />
            </div>
          )}
        </div>
        <div class="lg:h-fit lg:flex-1">
          <ProductInfo page={page} isMobile={isMobile} />
        </div>
      </section>
      {buyTogether && (
        <BuyTogether product={product} buyTogether={buyTogether} />
      )}
      <ProductAccordions product={product} />
    </>
  );
}

function ProductDetails({
  page,
  buyTogetherLoader,
  device,
}: Awaited<ReturnType<typeof loader>>) {
  return (
    <div class="py-0">
      {page
        ? (
          <>
            <Details
              page={page}
              buyTogether={buyTogetherLoader}
              device={device}
            />
          </>
        )
        : <NotFound />}
    </div>
  );
}

export function loader(props: Props, _req: Request, ctx: FnContext) {
  return {
    ...props,
    device: ctx.device,
  };
}

export default ProductDetails;
