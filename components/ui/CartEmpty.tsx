import MinicartHeader from "site/components/ui/MinicartHeader.tsx";
import MinicartBody from "site/components/ui/MinicartBody.tsx";

function CartEmpty(){
    return(
        <>
            <div class={`minicart-empty-container flex flex-col overflow-y-auto max-h-[90vh]`}>
                <MinicartHeader />
                <MinicartBody />
            </div>
        </>
    )
}

export default CartEmpty;