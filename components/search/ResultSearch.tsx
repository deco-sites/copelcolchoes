// import { Picture, Source } from "apps/website/components/Picture.tsx";
import Image from "apps/website/components/Image.tsx";
import { EditableProps } from "$store/components/search/Searchbar.tsx";
import type { Product, Suggestion } from "apps/commerce/types.ts";
import { clx } from "$store/sdk/clx.ts";
import { useOffer } from "../../utils/userOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { color } from "apps/vtex/mod.ts";
export type ResultSearch = EditableProps & {
  valueSearch: string;
  notFound: boolean;
  suggestions: { value: Suggestion | null };
  device?: string;
};

export type SuggestionsProps = {
  products: Product[];
  searchValue: string;
  device?: string;
};

const urlToLabel = (url: string, searchValue: string) => {
  const entryUrl = new URL(url);
  const label = entryUrl.pathname.split("/")[1].replaceAll("-", " ");
  return label.replace(
    searchValue,
    `<strong style="font-weight:900;">${searchValue}</strong>`,
  );
};

const Suggestions = ({ products, searchValue, device }: SuggestionsProps) => {
  if (!products) return <></>;

  return (
    <>
      <p
        class={`mb-[12px] text-[16px] font-black leading-[19.2px] text-primary max-md:mt-[20px] md:mb-[20px]`}
        style={{ color: device === "desktop" ? "#0D4F81" : "" }}
      >
        {device && device === "desktop"
          ? "Sugestões de Produtos"
          : "Produtos simulares"}
      </p>
      <div class={clx(`n1-teste max-md:overflow-y-scroll ${device}`)}>
        <ul class="flex flex-col gap-x-[30px] md:flex-row">
          {products.slice(0, 3).map((product: Product) => {
            if (!product.url) return;

            const { installment, price } = useOffer(product.offers);

            return (
              <li
                class={clx(
                  `overflow-hidden bg-[rgba(255,_255,_255,_0.00)] max-lg:w-full max-lg:after:mb-[10px] max-lg:after:block max-lg:after:border-b-[1px] max-lg:after:border-[#E5E5E5] max-lg:after:content-[""] md:rounded-[5px] md:border md:border-[#DBDBDB] md:[box-shadow:0px_3px_6px_0px_rgba(0,_0,_0,_0.05)]`,
                )}
              >
                <a
                  class="text-sm leading-[1.125rem] text-[#444444]"
                  href={product.url}
                  rel="nofollow"
                >
                  <div
                    class={clx(
                      `flex h-full w-full flex-col items-baseline justify-start bg-[#fff] max-sm:flex-row max-sm:items-center md:w-[155px] md:items-center lg:w-[200px] xl:w-[232px]`,
                    )}
                  >
                    {product && product?.image && product.image[0].url && (
                      <>
                        {device && device === "desktop" ? (
                          <Image
                            src={product.image[0].url}
                            alt={product.isVariantOf?.name}
                            width={232}
                            height={206}
                            class="inline-block align-middle xl:h-[206px] xl:w-[232px]"
                          />
                        ) : (
                          <Image
                            src={product.image[0].url}
                            alt={product.isVariantOf?.name}
                            width={100}
                            height={100}
                            class="w-[100px]"
                          />
                        )}
                      </>
                    )}

                    <div
                      class={`w-full px-[10px] pb-[10px] max-lg:ml-[10px] md:pb-[20px]`}
                    >
                      <p
                        class={`![&_strong]:font-thin result-search__paragraph text-[12px] font-medium capitalize leading-normal text-[#828282]`}
                        dangerouslySetInnerHTML={{
                          __html: urlToLabel(product.url, searchValue),
                        }}
                      ></p>

                      {product.additionalProperty?.map((item) => {
                        if (item.name === "Medidas") {
                          return (
                            <>
                              <span
                                class={clx(
                                  `my-[6px] inline-block rounded-[10px] bg-[#466FA3] px-[9px] py-[4px] text-[12px] leading-[16px] text-[#fff] md:my-[10px]`,
                                )}
                              >
                                {item.value}
                              </span>
                            </>
                          );
                        }
                      })}

                      {price && (
                        <p
                          class={clx(
                            `font-quicksand text-[12px] font-light leading-[18px] text-[#464646] line-through md:mb-[5px] md:text-[14px]`,
                          )}
                        >
                          De R$ {formatPrice(price)}
                        </p>
                      )}

                      {installment && (
                        <p
                          class={`text-[14px] font-black leading-[18px] text-[#D7194C] md:text-[18px] md:leading-[25px] lg:text-[20px]`}
                        >
                          {installment?.billingDuration}x{" "}
                          {formatPrice(installment?.billingIncrement)}
                        </p>
                      )}
                    </div>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

const ResultSearch = ({
  valueSearch,
  notFound,
  suggestions,
  device,
}: ResultSearch) => {
  if (valueSearch !== "" && suggestions?.value != null) {
    return (
      <>
        <div
          className={clx(
            `fixed left-0 top-[170px] z-10 w-full bg-[#fff] max-md:z-50 max-md:flex max-md:flex-col max-md:gap-y-[10px] md:top-[114px] lg:top-[118px] ${
              notFound ||
              !suggestions.value!.products?.length ||
              valueSearch === "click"
                ? ""
                : "max-md:h-[calc(100%_-_170px)] max-md:[border-radius:initial]"
            } search-result-content rounded-bl-[30px] rounded-br-[30px] border-t max-lg:bg-white max-lg:py-[20px] max-md:px-[20px] md:p-[30px] xl:p-[40px]`,
          )}
        >
          <div
            class={clx(
              `flex gap-x-[30px] py-[0] pl-[10px] max-md:flex-col ${
                notFound ||
                !suggestions.value!.products?.length ||
                valueSearch === "click"
                  ? ""
                  : "max-md:h-[calc(100%_-_42px)]"
              }`,
            )}
          >
            {suggestions.value!.searches?.length ? (
              <section
                class={clx(
                  `flex flex-col gap-[14px] ${
                    suggestions.value!.products?.length &&
                    valueSearch !== "click"
                      ? "md:w-[15.25rem]"
                      : "md:w-2/4"
                  }`,
                )}
              >
                <div class="flex items-center gap-2">
                  <span
                    class={clx(
                      `text-[16px] font-normal leading-[19.2px] text-primary max-lg:tracking-[1px] md:font-bold ${
                        suggestions.value!.products?.length &&
                        valueSearch !== "click"
                          ? "md:mb-[6px]"
                          : ""
                      }`,
                    )}
                    role="heading"
                    aria-level={3}
                    style={{
                      fontFamily:
                        valueSearch !== "click"
                          ? "'Comfortaa', sans-serif"
                          : "'Baloo 2', sans serif",
                      color: valueSearch !== "click" ? "#0D4F81" : "",
                    }}
                  >
                    {device === "desktop"
                      ? valueSearch !== "click"
                        ? "Sugestões"
                        : "Termos mais buscados"
                      : valueSearch !== "click"
                        ? "Sugestões de busca"
                        : "Termos mais buscados"}
                  </span>
                </div>
                <ul
                  id="search-suggestion"
                  class="flex flex-col gap-[8.5px] lg:h-full"
                >
                  {suggestions &&
                    suggestions.value &&
                    suggestions.value.searches &&
                    suggestions.value.searches.map(({ term }, index) => (
                      <li>
                        <a
                          href={`/busca?q=${term}`}
                          class="flex items-center gap-4"
                        >
                          {valueSearch !== "click" ? (
                            <span
                              class={clx(
                                `font-comfortaa text-[14px] font-normal leading-[22.4px] text-primary first-letter:capitalize md:text-[16px]`,
                              )}
                            >
                              {term}
                            </span>
                          ) : (
                            <div class={`flex items-center gap-x-[10px]`}>
                              {device === "desktop" && (
                                <span
                                  class={clx(
                                    `flex h-[28px] w-[28px] items-center justify-center rounded-[5px] bg-primary px-[5px] py-[5px] font-baloo_2 text-[14px] font-semibold leading-[19.6px] text-[#ffff]`,
                                  )}
                                >
                                  {index + 1}°
                                </span>
                              )}

                              <span
                                class={clx(
                                  `font-baloo_2 text-[14px] font-normal leading-[22.4px] text-primary first-letter:capitalize md:text-[16px]`,
                                )}
                              >
                                {term}
                              </span>
                            </div>
                          )}
                        </a>
                      </li>
                    ))}
                </ul>
                {device === "desktop" &&
                  valueSearch !== "click" &&
                  suggestions.value!.products?.length !== 0 &&
                  !notFound && (
                    <a
                      class={clx(
                        `max-w-[220px] rounded-[5px] border border-primary px-[20px] py-[10px] text-center font-baloo_2 text-sm font-bold text-primary`,
                      )}
                      href={`/busca?q=${valueSearch}`}
                    >
                      Confira todos os produtos
                    </a>
                  )}
              </section>
            ) : null}

            {/* <section> */}
            <div>
              {suggestions.value!.searches?.length === 0 ? (
                <h3 class="text-sm font-black leading-[1.125rem] text-[##444444]">
                  Nada encontrado
                </h3>
              ) : notFound ||
                !suggestions.value!.products?.length ||
                valueSearch === "click" ? null : (
                <Suggestions
                  products={suggestions.value.products}
                  searchValue={valueSearch}
                  device={device}
                />
              )}
            </div>
            {/* </section>             */}
          </div>
          {valueSearch !== "click" &&
            suggestions &&
            suggestions.value &&
            suggestions.value?.products &&
            Object.entries(suggestions.value!.products).length > 0 && (
              <a
                class={clx(
                  `justify-center rounded-[5px] bg-primary px-[20px] py-[10px] font-quicksand text-sm font-bold text-[#fff] max-md:flex md:hidden`,
                )}
                href={`/busca?q=${valueSearch}`}
              >
                Ver todos os produtos
              </a>
            )}
        </div>

        {notFound || suggestions.value!.searches?.length ? (
          <div class={`is-overlay-search-results__suggestions`}></div>
        ) : null}
      </>
    );
  }

  return null;
};

export default ResultSearch;
