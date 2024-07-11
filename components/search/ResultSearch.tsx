// import { Picture, Source } from "apps/website/components/Picture.tsx";
import Image from "apps/website/components/Image.tsx";
import { EditableProps } from "deco-sites/copelcolchoes/components/search/Searchbar.tsx";
import type { Product, Suggestion } from "apps/commerce/types.ts";
import { clx } from "$store/sdk/clx.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
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

const Suggestions = ({ products, searchValue, device }: SuggestionsProps ) => {
  if (!products) return <></>;
 
  return (
    <>
      <p class={`text-primary text-[16px] leading-[19.2px] font-black mb-[12px] max-lg:mt-[20px] md:mb-[20px]`}>
        {device && device === 'desktop'
          ? 'Sugestão de Produtos'
          : 'Produtos simulares'
        }        
      </p>
      <div class={clx(`max-lg:overflow-y-scroll max-lg:max-h-[52%]`)}>
        <ul class="flex flex-col md:flex-row gap-x-[30px]">
          {products.slice(0, 3).map((product: Product) => {
            if (!product.url) return;

            const {installment, price } = useOffer(product.offers);   

            return (
              <li 
                class={clx(`md:rounded-[5px] md:border md:border-[#DBDBDB] overflow-hidden bg-[rgba(255,_255,_255,_0.00)] 
                md:[box-shadow:0px_3px_6px_0px_rgba(0,_0,_0,_0.05)] w-[252px] max-lg:w-full 
                max-lg:after:content-[""] max-lg:after:block max-lg:after:border-b-[1px] 
                max-lg:after:border-[#E5E5E5] max-lg:after:mb-[10px]`)}>
                <a
                  class="text-sm leading-[1.125rem] text-[#444444] "
                  href={product.url}
                  rel="nofollow"
                >
                  <div class={clx(`md:w-[232px] flex flex-col justify-start md:justify-between items-baseline h-full bg-[#fff]
                    max-sm:flex-row max-sm:items-center w-full `)}>
                      {product && product?.image && product.image[0].url && (
                        <>
                          {device && device === 'desktop'
                            ? (
                              <Image
                                src={product.image[0].url}
                                alt={product.isVariantOf?.name}
                                width={232}
                                height={206}
                                class="w-full h-auto inline-block align-middle mt-[2px]"
                              />
                              )
                            : (
                                <Image
                                  src={product.image[0].url}
                                  alt={product.isVariantOf?.name}
                                  width={100}
                                  height={100}
                                  class="w-[100px]"
                                />
                            )
                          }

                        </>
                      )}

                      <div class={`px-[10px] pb-[10px] max-lg:ml-[10px] md:pb-[20px]`}>
                        <p
                          class={`![&_strong]:font-thin capitalize text-[12px] text-[#828282] result-search__paragraph`}
                          dangerouslySetInnerHTML={{
                            __html: urlToLabel(product.url, searchValue),
                          }}
                        >
                        </p>                     

                        {product.additionalProperty?.map(( item )=> {
                          if(item.name === 'Medidas'){
                            return(
                              <>
                                <span 
                                  class={clx(`inline-block bg-[#466FA3] text-[#fff] text-[12px] leading-[16px] 
                                  rounded-[10px] px-[9px] py-[4px] my-[6px] md:my-[10px]`)}> 
                                  {item.value}
                                </span>                          
                              </>
                            )
                          }
                        } )}

                        {price && (
                          <p class={clx(`text-[#464646] text-[12px] md:text-[14px] leading-[18px] font-light line-through md:mb-[5px]`)}>
                            De R$ {formatPrice(price)}
                          </p>
                        )}                    

                        {installment && (
                          <p class={`text-[#D7194C] text-[14px] md:text-[20px] leading-[18px] md:leading-[25px] font-black`}>
                            {installment?.billingDuration}x {formatPrice(installment?.billingIncrement)}
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

const ResultSearch = (
  { valueSearch, notFound, suggestions, device }: ResultSearch,
) => {
  if (valueSearch !== "" && suggestions?.value != null) {  
    console.log('device --> ', device)
    return (
      <>
        <div 
          className={clx(`fixed w-full max-lg:top-[190px] md:top-[177px] left-0 bg-[#fff] z-50 
          ${notFound || !(suggestions.value!.products?.length) || valueSearch === 'click' ? '' : 'max-lg:h-[calc(100%_-_190px)] [border-radius:initial]' } 
          border-t rounded-br-[30px] max-lg:px-[20px] rounded-bl-[30px] lg:p-[40px] max-lg:py-[20px] max-lg:bg-white search-result-content`)}>

          <div 
            class={`flex max-lg:flex-col pl-[10px] md:px-[130px] py-[0] gap-x-[30px]
            ${notFound || !(suggestions.value!.products?.length) || valueSearch === 'click' ? '' : 'max-lg:h-[calc(100%_-_42px)]' }`}>

            {
              suggestions.value!.searches?.length 
              ? 
                (
                  <section class={clx(`flex flex-col gap-[14px] 
                    ${suggestions.value!.products?.length && valueSearch !== 'click' ? 'md:w-[15.25rem]' : 'md:w-2/4' }`)}>
                    <div class="flex gap-2 items-center">
                      <span
                        class={clx(`text-primary text-[16px] leading-[19.2px] md:font-bold max-lg:tracking-[1px]
                          ${suggestions.value!.products?.length && valueSearch !== 'click' ? 'mb-[6px]' : "" }`)}
                        role="heading"
                        aria-level={3}
                      >
                        { device === 'desktop'
                          ? valueSearch !== 'click' ? 'Sugestões' : 'Termos mais buscados' 
                          : valueSearch !== 'click' ? 'Sugestões de busca' : 'Termos mais buscados' 
                        }
                      </span>
                    </div>
                    <ul id="search-suggestion" class="flex flex-col gap-[8.5px] lg:h-full">
                      {suggestions && 
                        suggestions.value && 
                        suggestions.value.searches && 
                        suggestions.value.searches.map(({ term }, index) => (
                        <li>
                          <a
                            href={`/busca?q=${term}`}
                            class="flex gap-4 items-center"
                          >
                            { valueSearch !== 'click' 
                            ? <span class={clx(`text-[14px] md:text-[16px] leading-[22.4px] font-normal text-primary`)}>{term}</span>
                            : (
                              <div class={`flex gap-x-[10px]`}>
                                {device === 'desktop' && (
                                  <span class={clx(`px-[5px] py-[5px] bg-primary text-[#ffff] text-[14px] 
                                    leading-[19.6px] font-semibold rounded-[5px] w-[28px] h-[28px]`)}>
                                    {index + 1 }°
                                  </span>                                  
                                ) }

                                <span class={clx(`text-[14px] md:text-[16px] leading-[22.4px] font-normal text-primary`)}>{term}</span>
                              </div>
                              )                                
                            }
                          </a>
                        </li>
                      ))}
                    </ul>
                    {device === 'desktop' && valueSearch !== 'click' && suggestions.value!.products?.length !== 0 && !notFound && (
                      <a 
                        class={clx(`px-[20px] py-[10px] border border-primary rounded-[5px] text-sm text-primary font-bold`)} 
                        href={`/busca?q=${valueSearch}`}>
                          Confira todos os produtos
                      </a>
                    )}
                  </section>  
                )              
              : null
            }            

            <section>
              { suggestions.value!.searches?.length === 0   
                ? 
                (
                  <h3 class="font-black text-[##444444] text-sm leading-[1.125rem]">
                    Nada encontrado
                  </h3>
                )                 
                : notFound || !(suggestions.value!.products?.length) || valueSearch === 'click'
                ? null
                : (
                  <Suggestions
                    products={suggestions.value.products}
                    searchValue={valueSearch}
                    device={device}
                  />
                )}
            </section>            
          </div>
          {valueSearch !== 'click' && 
            suggestions && suggestions.value && 
            suggestions.value?.products && 
            Object.entries(suggestions.value!.products).length > 0 &&  (
              <a 
                class={clx(`lg:hidden max-lg:flex justify-center px-[20px] py-[10px] bg-primary rounded-[5px] text-sm text-[#fff] font-bold`)} 
                href={`/busca?q=${valueSearch}`}>
                  Ver todos os produtos
              </a>
          )}     
        </div>
        
        {notFound || suggestions.value!.searches?.length ? <div class={`is-overlay-search-results__suggestions`}></div> : null}
      </>
    );
  }

  return null;
};

export default ResultSearch;
