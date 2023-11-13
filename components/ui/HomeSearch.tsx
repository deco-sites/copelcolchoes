import type { JSX } from "preact";
import { useSignal } from "@preact/signals";
import Spinner from "$store/components/ui/Spinner.tsx";
import { Product } from "deco-sites/std/packs/vtex/types.ts";
import ProductCard from "$store/components/product/SearchHomeProductCard.tsx";

interface SearchResponse {
  products: Product[];
  recordsFiltered: number;
}
function Form() {
  const products = useSignal(undefined);
  const loading = useSignal(false);
  const slider = useSignal("50");
  const comfortToString = (comfort: string) => {
    const numberComfort = Number(comfort);
    const stringComfort = {
      "extra-macio": [0, 20],
      "macio": [21, 40],
      "intermediario": [41, 60],
      "firme": [61, 80],
      "extra-firme": [81, 100],
    };
    return Object.keys(stringComfort).find((nivel) =>
      numberComfort >= stringComfort[nivel as keyof typeof stringComfort][0] &&
      numberComfort <= stringComfort[nivel as keyof typeof stringComfort][1]
    );
  };
  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (e.target === null) return;
    const formData = new FormData(e.target as HTMLFormElement);
    const formProps = Object.fromEntries(formData);
    const { size, type, comfort } = formProps;
    slider.value = comfort as string;
    const stringComfort = comfortToString(comfort as string);
    const facets =
      `/category-1/colchoes/para/${size}/tipo-colchao/${type}/firmeza/${stringComfort}`;
    try {
      loading.value = true;
      const response = await fetch(
        `/api/io/_v/api/intelligent-search/product_search${facets}`,
      );
      const json = await response.json();
      products.value = json;
    } finally {
      loading.value = false;
    }
  };
  return (
    <div class="max-w-[1170px] my-[82px] mx-auto bg-black text-white rounded-[12px] py-[29px] px-[42px] w-full max-lg:w-[90%]">
      <div class="flex justify-center items-center max-lg:flex-col">
        <h2 class="w-[192px] text-[28px] font-semibold mr-[30px] font-quicksand max-lg:m-0 max-lg:text-center">
          Encontre o colchão ideal
        </h2>
        <form onSubmit={handleSubmit}>
          <div class="flex justify-center items-center max-lg:flex-col">
            <span class="w-min mr-[48px] max-lg:mt-[32px] max-lg:mx-auto">
              <label class="font-semibold inline-block max-lg:block max-lg:text-center">
                Escolha o tamanho
              </label>
              <select
                id="size"
                name="size"
                required
                class="w-[191px] h-[30px] bg-white border border-[#dcdcdc] rounded-[5px] mt-[18px] text-sm text-primary pl-[15px]"
              >
                <option value="" disabled selected hidden>Selecione</option>
                <option value="infantil">Infantil</option>
                <option value="solteiro">Solteiro</option>
                <option value="casal">Casal</option>
                <option value="queen-size">Queen-Size</option>
                <option value="king-size">King-Size</option>
              </select>
            </span>
            <span class="text-center font-semibold mr-[64px] max-lg:mt-[36px] max-lg:mx-auto">
              Escolha o tipo
              <span class="mt-[18px] flex justify-between font-normal text-sm">
                <label>
                  <input
                    type="radio"
                    name="type"
                    required
                    value="espuma"
                    class="flex justify-center mx-auto"
                  >
                  </input>
                  Espuma
                </label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    required
                    value="mola"
                    class="flex justify-center mx-auto"
                  >
                  </input>
                  Mola
                </label>
              </span>
            </span>
            <span class="mb-[14px] font-semibold max-lg:mt-[36px] max-lg:mx-0 max-lg:mb-[47px]">
              Escolha o nível de conforto
              <span class="flex relative mt-[18px]">
                <p class="absolute text-xs font-normal bottom-[-19px] left-0">
                  Extra macio
                </p>
                <input
                  name="comfort"
                  class="w-[88%] mx-auto appearance-none bg-[#e2e2e2] cursor-pointer h-[10px] outline-none rounded-[10px]"
                  type="range"
                  id="comfort"
                  min="0"
                  max="100"
                  value={slider}
                />
                <p class="right-0 absolute text-xs font-normal bottom-[-19px]">
                  Extra firme
                </p>
              </span>
            </span>
            <button
              type="submit"
              class="btn btn-secondary disabled:bg-secondary disabled:text-white disabled:bg-opacity-70 ml-[42px] h-10 w-[150px] rounded-[5px] max-lg:my-0 max-lg:mx-auto"
              disabled={loading.value}
            >
              {!loading.value ? "Buscar" : <Spinner />}
            </button>
          </div>
        </form>
      </div>
      {products.value &&
        (((products.value as SearchResponse).recordsFiltered) === 0
          ? (
            <p class="text-center text-[32px] leading-normal mb-5 mt-[56px] font-quicksand max-lg:text-center font-bold">
              Não encontramos esse tipo de colchão.
            </p>
          )
          : (
            <>
              <h4 class="text-[32px] leading-normal mb-5 mt-[56px] font-quicksand max-lg:text-center font-bold">
                Confira o que separamos para você
              </h4>
              <div class={`flex justify-center gap-5`}>
                {products.value &&
                  (products.value as SearchResponse).products.map((
                    product,
                    index,
                  ) => (
                    <>
                      {index < 4 && (
                        <div class={index > 0 ? "max-lg:hidden" : ""}>
                          <ProductCard product={product} />
                        </div>
                      )}
                    </>
                  ))}
              </div>
              <a
                href="/colchoes"
                class="block underline mt-[32px] font-medium text-center text-white font-quicksand"
              >
                Ver mais produtos
              </a>
            </>
          ))}
    </div>
  );
}

export default Form;
