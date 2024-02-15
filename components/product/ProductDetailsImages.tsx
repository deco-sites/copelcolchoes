import Slider from "$store/components/ui/Slider.tsx";
import type { ImageObject } from "apps/commerce/types.ts";
import Icon from "$store/components/ui/Icon.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "preact/hooks";
import ShareButton from "$store/islands/ShareButton.tsx";
import { Product } from "apps/commerce/types.ts";

interface Props {
  images: ImageObject[];
  width: number;
  height: number;
  aspect: string;
  url: string;
  product: Product;
}

function ProductDetailsImages(
  { images, width, height, aspect, url, product }: Props) {
  const id = `product-image-gallery:${useId()}`; 
  const video = product && product.video ? product.video[0] : '';  
  const midia = [...images, {...video}];

  return (
    <>
      <div class="lg:w-1/2 relative">
        <div class="flex flex-col relative" id={id}>
          <div class="mix-blend-multiply w-full">
            <Slider class="carousel carousel-start box-border lg:box-content w-full">
              {midia.map((img, index) => {
                return(
                  <Slider.Item
                    index={index}
                    class="carousel-item w-full last:mr-6"
                  >
                    <div class="relative block h-0 w-full pb-[100%] ">
                      { img.encodingFormat === 'image' && 
                        (
                          <Image
                            class="absolute top-0 left-0 w-full block object-cover font-['blur-up:_auto','object-fit:_cover'] h-auto align-middle"
                            sizes="(max-width: 480px) 576px, 576px"
                            style={{ aspectRatio: aspect }}
                            src={img.url!}
                            alt={img.alternateName}
                            width={width}
                            height={height}
                            // Preload LCP image for better web vitals
                            preload={index === 0}
                            loading={index === 0 ? "eager" : "lazy"}
                          />
                        ) 
                      }

                      { img.encodingFormat === 'video' && 
                        (
                          <>
                          <input type="text" value={img.contentUrl!} />
                          <iframe 
                            class='slide-dot-custom'
                            width={width} 
                            height={height}
                            title={img?.name}
                            src={img.contentUrl!}
                            frameborder={0}                           
                          ></iframe> 
                          </>
                        )
                      }
                    </div>
                  </Slider.Item>
                )
              })}
            </Slider>
          </div>
          <div class="py-4 flex- basis-[5.8125rem] h-[7.5rem] mix-blend-multiply">
            <div class="w-full h-full mx-auto relative overflow-hidden">
              <div class="w-auto h-auto relative z-1 flex box-content justify-center">
                {midia.map((img, index) => {
                  return(
                    <Slider.Dot index={index}>
                      { img.encodingFormat === 'image' && 
                        (
                          <Image
                            style={{ aspectRatio: aspect }}
                            class="border-neutral group-disabled:border-secondary border w-[4.375rem] mr-[10px] rounded-[10px]"
                            width={70}
                            height={70}
                            sizes="(max-width: 480px) 70px, 70px"
                            src={img.url!}
                            alt={img.alternateName}
                          />
                        )
                      }
                      { img.encodingFormat === 'video' && 
                        (
                          <iframe class={'pointer-events-none rounded-[10px]'}
                            width={70} 
                            height={70} 
                            src={img.contentUrl + '?controls=0'} 
                            title={img?.name}
                            frameborder={0}
                            allow="picture-in-picture"                                              
                          ></iframe>                            
                        )
                      }
                    </Slider.Dot>
                  )
                })}
              </div>
              <Slider.PrevButton class="btn btn-circle btn-primary bg-white hover:bg-white border-none absolute left-4 min-w-[2.625rem] max-w-[2.625rem] min-h-[2.625rem] max-h-[2.625rem] top-1/2 -translate-y-1/2 active:focus:-translate-y-1/2 active:hover:-translate-y-1/2 no-animation">
                <Icon size={42} id="PrevProductImage" strokeWidth={1} />
              </Slider.PrevButton>
              <Slider.NextButton class="btn btn-circle btn-primary bg-white hover:bg-white absolute border-none right-4 min-w-[2.625rem] max-w-[2.625rem] min-h-[2.625rem] max-h-[2.625rem] top-1/2 -translate-y-1/2 active:focus:-translate-y-1/2 active:hover:-translate-y-1/2 no-animation">
                <Icon size={42} id="NextProductImage" strokeWidth={1} />
              </Slider.NextButton>
            </div>
          </div>
        </div>
        <div class="group items-center cursor-pointer flex flex-col gap-2 h-auto justify-center absolute right-0 top-5">
          <div class="group-hover:bg-primary bg-white flex items-center rounded-full border border-[#f6f6f6] shadow-[0_0.1875rem_0.375rem_rgba(0,0,0,0.16)] h-10 justify-center transition-all duration-300 ease-out w-10">
            <Icon
              id="ShareCopel"
              size={20}
              class="group-hover:text-white text-primary"
            />
          </div>
          <div class="group-hover:max-h-6 group-hover:opacity-100 flex max-h-0 opacity-0 transition-all duration-300">
            <div class="flex h-auto">
              <ShareButton
                network={"Facebook"}
                link={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
              />
              <ShareButton
                network={"Twitter"}
                link={`https://twitter.com/share?url=${url}`}
              />
              <ShareButton
                network={"Pinterest"}
                link={`https://pinterest.com/pin/create/button/?media=${images[
                  0
                ].url!}`}
              />
            </div>
          </div>
        </div>
        <SliderJS rootId={id}></SliderJS>
      </div>
    </>
  );
}

export default ProductDetailsImages;