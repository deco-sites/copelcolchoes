import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { clx } from "$store/sdk/clx.ts";

const imageHeader = {
    desktop:{
        src: "/image/minicart/smileysad.png",
        width: 80,
        height: 80
    },
    mobile:{
        src: "/image/minicart/smileysad-mobile.png",
        width: 70,
        height: 70
    }
}
const imagesBody = {
    desktop:{
        src:[
            "/image/minicart/travesseiros.png",
            "/image/minicart/colchoes.png",
            "/image/minicart/moveis.png"
        ],
        width: 334,
        height: 120
    },
    mobile:{
        src:[
            "/image/minicart/img-1-mobile.png",
            "/image/minicart/img-2-mobile.png",
            "/image/minicart/img-3-mobile.png"
        ],
        width: 333,
        height: 130.588
    }
}

function CartEmpty(){
    const { displayCart } = useUI();

    console.log('---> ',imageHeader.mobile.src)
    console.log('---> ',imageHeader.desktop.src)

    return(
        <>
            <div class={`minicart-empty-container flex flex-col overflow-y-auto max-h-[90vh]`}>
                <div class={`flex flex-col items-center gap-y-[10px] mt-[38px] mb-[20px]`}>
                    <Picture>                      
                        <Source
                            media="(max-width: 767px)"
                            src={imageHeader.mobile.src}
                            width={imageHeader.mobile.width}
                            height={imageHeader.mobile.height}
                        />

                        <Source
                            media="(min-width: 768px)"
                            src={imageHeader.desktop.src}
                            width={imageHeader.desktop.width}
                            height={imageHeader.desktop.height}
                        />
                        <div>
                            <img
                                src={imageHeader.desktop.src}
                                width={imageHeader.desktop.width}
                                height={imageHeader.desktop.height}
                                alt={'image header!'}
                                class=""
                                loading="lazy"
                            />
                        </div>
                        
                    </Picture>
                    <p 
                        class={clx(`text-primary text-[24px] leading-[31px] md:text-[28px] md:leading-[1.2] 
                            font-bold font-quicksand md:max-w-[271px] text-center`)}>
                        Poxa, seu carrinho está vazio!
                    </p>
                </div>

                <div>
                    <p 
                        class={clx(`text-primary text-[16px] leading-[42px] md:text-[18px] 
                            md:leading-[42px] font-bold font-quicksand text-center`)}>
                        Explore algumas categorias abaixo
                    </p>

                    <Picture class={`flex flex-col items-center`}> 
                        {imagesBody.desktop.src.map((img)=>(
                            <Source
                                media="(max-width: 767px)"
                                src={img}
                                width={334}
                                height={120}
                            />
                        ))}
                        {imagesBody.mobile.src.map((img)=>(
                            <Source
                                media="(max-width: 767px)"
                                src={img}
                                width={imagesBody.mobile.width}
                                height={imagesBody.mobile.height}
                            />
                        ))}

                        {imagesBody.desktop.src.map((img)=>{
                            const url = img;
                            const categoryArray = url?.split('/');
                            const categoryFormat = categoryArray.map(( category )=> category.replace('.png', '') )
                            const category =  categoryFormat[categoryFormat.length -1 ];
                           
                            return(
                                <a 
                                    href={`/${category}`}
                                    class={clx(`w-[333px] h-[130.588px] md:w-[334px] md:h-[120px] overflow-hidden rounded-[21.765px] 
                                        [&:not(last-child)]:mt-[10px] flex items-center justify-center relative`)}>
                                    <img
                                        src={img}
                                        width={imagesBody.desktop.width}
                                        height={imagesBody.desktop.height}
                                        loading={"lazy"}
                                        class={`hover:scale-[1.2] duration-700`}
                                    />
                                    <span 
                                        class={clx(`absolute uppercase text-[#ffffff] text-[24px] 
                                            md:text-[26px] leading-[45.706px] font-black font-quicksand`)}>{category}
                                    </span>
                                </a>
                            )
                        })}

                    </Picture> 
                </div>
                <p class={`text-primary text-[18px] leading-[42px] font-bold font-quicksand text-center`}>
                    Ou
                </p>                
                <div>
                    <a
                        class={clx(`bg-primary rounded-[5px] text-white font-quicksand text-base font-black h-12 tracking-normal cursor-pointer
                            leading-[20px] text-[20px] mb-4 flex items-center justify-center relative px-8 appearance-none max-w-[85%] md:max-w-[334px] mx-[auto] my-[0]`)}
                        title={"Continue Comprando"}
                        onClick={() => displayCart.value = false}
                    >
                        {"Continue Comprando"}
                    </a>                
                </div>
            </div>
        </>
    )
}

export default CartEmpty;