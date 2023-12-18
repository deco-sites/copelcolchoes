import type { Product } from "apps/commerce/types.ts";
import { useCountBuyTogether } from "$store/sdk/useCountBuyTogether.ts";

export interface Props{
    buyTogether: Product[] | null;
}

function ButtonUpdateBuyTogether( { buyTogether, type }: { buyTogether: Product[], type: boolean }  ){   
    function handleClick( { target }: Event ){  
        const { count } = useCountBuyTogether();
        const cardAccessory = document.querySelector<HTMLElement>('.card-accessory');
        const buyTogetherLength = buyTogether ? ( buyTogether.length > 2 ? buyTogether.length -1 : (buyTogether.length == 0 ? buyTogether.length -1 : buyTogether.length) ) : 0; 
        const lengthMin = 0;    
    
        setTimeout(()=>{
          count.value = buyTogetherLength ?  Math.floor( Math.random() * ( buyTogetherLength - lengthMin + 1) + lengthMin) : 0;
        }, 300)
    
        if( target instanceof Element ){
          target.classList.add('is-active');  
          setTimeout(()=>{
            target.classList.remove('is-active');
          }, 500)    
        }
    
        if( cardAccessory ){
          cardAccessory.classList.add('is-active')
    
          setTimeout(()=>{
            cardAccessory.classList.remove('is-active');
          }, 500) 
        }
    }   

    return(
        <a onClick={handleClick} class="btn-update-buytogether absolute z-10 right-1 top-1 bg-[#002b62] p-1.5 rounded-full cursor-pointer">
            <div class="btn-update-buytogether bg-arrow_update w-2.5 h-2.5 bg-no-repeat"></div>
        </a>
    )
}

export default ButtonUpdateBuyTogether;