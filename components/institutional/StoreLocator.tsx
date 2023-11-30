import { useEffect, useState } from "preact/compat";
import {
  clearOptions,
  closestStore,
  getCitiesOptions,
  GoogleMaps,
  handleSelectCity,
  mountMap,
} from "./StoreLocatorFunctions.tsx";
export interface Lojas {
  id: string;
  bairro: string;
  cidade: string;
  complemento: string;
  estado: string;
  latitude: string;
  longitude: string;
  nome: string;
  numero: string;
  rua: string;
  telefone: string;
  antedimento: string;
}

export default function InstitucionalStoreLocator() {
  const [lojas, setLojas] = useState([]);
  const [map, setMap] = useState();
  const [loading, setLoading] = useState(true);
  const [isSelectedOptions, setIsSelectedOptions] = useState(false);
  const [selectValue, setSelectValue] = useState("Selecione");
  const [cep, setCep] = useState("");
  const handleBusca = () => {
    if (!isValidCep(cep)) {
      alert("O CEP precisa ser preenchido corretamente.");
      return false;
    }
    clearOptions(map as unknown as GoogleMaps, lojas);
    closestStore(map as unknown as GoogleMaps, cep, lojas, true);
    setIsSelectedOptions(true);
  };

  const handleCep = (event: Event) => {
    const { target } = event;
    if (target) {
      const value = (target as HTMLButtonElement).value;
      setSelectValue("Selecione");
      setIsSelectedOptions(false);
      const isOnlyNumbers = new RegExp("^[0-9]*$");
      if (value.length >= 5 && isOnlyNumbers.test(value)) {
        setCep(`${value.slice(0, 5)}-${value.slice(5)}`);
      } else {
        setCep(value);
      }
    }
  };

  const handleStoreClick = (lat: number, lng: number, storeId: string) => {
    clearOptions(map as unknown as GoogleMaps, lojas);
    (map as unknown as GoogleMaps).setZoom(15);
    (map as unknown as GoogleMaps).setCenter(lat, lng);
    // @ts-expect-error google is added by 3p script
    google.maps.event.trigger(
      (map as unknown as GoogleMaps).markers.find((marker) =>
        marker.data.id === storeId
      ),
      "click",
    );
  };

  const handleCity = (event: Event) => {
    const { target } = event;
    if (target) {
      const value = (target as HTMLButtonElement).value;
      setCep("");
      setSelectValue(value);
      clearOptions(map as unknown as GoogleMaps, lojas);
      handleSelectCity(value, lojas, map as unknown as GoogleMaps);
      setIsSelectedOptions(true);
    }
  };

  const isValidCep = (cep: string) => {
    const regex = new RegExp("^[0-9]{5}(?:-[0-9]{3})?$");
    return regex.test(cep) && cep.length === 9;
  };
  const orderStores = (lojas: Lojas[]) => {
    return lojas.sort((a, b) => (
      a.cidade.localeCompare(b.cidade) || a.bairro.localeCompare(b.bairro)
    ));
  };
  useEffect(() => {
    fetch("/api/storeLocator")
      .then((r) =>
        r.json()
          .then((stores) => {
            setLojas(orderStores(stores) as typeof stores);
          })
          .then(() => {
            setLoading(false);
          })
      );
  }, []);

  useEffect(() => {
    setMap(mountMap(lojas));
  }, [lojas]);

  const regex = /([a-záéíóúâêîôûãõàèìòùäëïöüç])([A-ZÁÉÍÓÚÂÊÎÔÛÃÕÀÈÌÒÙÄËÏÖÜÇ])/g;

  return (
    <div class="w-full flex flex-wrap container lg:max-w-[80rem] w-full m-auto lg:px-[4rem] px-[1.375rem]">
      <div class="md:flex md:py-[42px] md:px-0 py-0 px-[15px] w-full">
        <div class="w-full">
          <h2 class="text-primary font-quicksand font-bold text-[15px] lg:!text-[25px] mb-[30px]">
            Procure aqui a loja mais perto de você
          </h2>
          <form class="mb-[20px]" onSubmit={(ev) => ev.preventDefault()}>
            <div class="w-full flex flex-wrap justify-between">
              <div class="pl-0 w-full flex-[100%] mb-[15px] md:flex-[33%] md:max-w-[33%] md:float-left md:pr-[15px] md:mb-0 relative">
                <label
                  for="cep"
                  class="block w-full text-primary font-quicksand text-[17px] font-light cursor-pointer"
                >
                  Cep
                </label>
                <input
                  id="cep"
                  name="cep"
                  type="text"
                  maxLength={9}
                  placeholder="00000-000"
                  class="bg-gray-f5 p-[10px] mt-[10px] w-full text-[15px] border border-[#C5C7CC] font-quicksand outline-none focus:outline-none"
                  value={cep}
                  onChange={(ev) => handleCep(ev)}
                >
                </input>
              </div>
              <div class="pl-0 w-full flex-[100%] mb-[15px] md:max-w-[50%] md:float-left md:px-[15px] md:mb-0 relative">
                <label
                  for="city"
                  class="block w-full text-primary font-quicksand text-[17px] font-light cursor-pointer"
                >
                  Cidade
                </label>

                <select
                  name="city"
                  id="city"
                  class="bg-gray-f5 p-[10px] mt-[10px] block w-full text-[15px] border border-[#C5C7CC] font-quicksand focus:outline-none outline-none appearance-menulist-button"
                  onChange={(ev) => handleCity(ev)}
                  value={selectValue}
                >
                  <option value="Selecione" disabled selected hidden>
                    Selecione
                  </option>
                  {getCitiesOptions(lojas).map((city) => (
                    <option value={city}>{city.replace(regex, "$1 $2")}</option>
                  ))}
                </select>
              </div>
              <div class="pr-0 w-full flex-[100%] md:max-w-[16%] md:float-left md:flex md:pl-[15px] relative">
                {isSelectedOptions
                  ? (
                    <input
                      type="button"
                      value="Limpar"
                      class="bg-primary text-white rounded-[50px] text-gray-f5 mt-[25px] md:mt-auto px-[10px] py-[13px] cursor-pointer w-full text-[15px] outline-none focus:outline-none"
                      onClick={() => {
                        setCep("");
                        setSelectValue("Selecione");
                        clearOptions(map as unknown as GoogleMaps, lojas);
                        setIsSelectedOptions(false);
                      }}
                    >
                    </input>
                  )
                  : (
                    <input
                      type="button"
                      value="Buscar"
                      class="bg-primary text-white rounded-[50px] text-gray-f5 mt-[25px] md:mt-auto px-[10px] py-[13px] cursor-pointer w-full text-[15px] outline-none focus:outline-none"
                      onClick={() => handleBusca()}
                    >
                    </input>
                  )}
              </div>
              <p
                class="block hidden w-full mt-[20px] font-quicksand text-[14px]"
                data-id="cepAddress"
              >
              </p>
            </div>
          </form>
          <div>
            <div id="map" class="w-full h-[500px!important]"></div>
          </div>
          {!loading && (
            <div class="mx-0 my-[25px] border border-[#e8e8e8] p-[30px] md:px-[30px] md:py-[50px] grid grid-cols-3 relative gap-5 max-lg:grid-cols-1">
              <span class="hidden md:block absolute text-primary w-full text-[20px] -top-4 left-[30px]">
                Lojas
              </span>
              {lojas.map((loja: Lojas) => (
                <div
                  class="mb-[15px] pb-[15px] border-b-1 border-[#e8e8e8] cursor-pointer"
                  data-list-store="store"
                  data-store-id={loja.id}
                  data-store-city={loja.cidade}
                  onClick={() =>
                    handleStoreClick(
                      Number(loja.latitude),
                      Number(loja.longitude),
                      loja.id,
                    )}
                >
                  <div class="font-quicksand text-[18px] font-semibold pb-[15px] text-black">
                    {loja.bairro.replace(regex, "$1 $2")} - {loja.nome}
                  </div>

                  <div class="font-quicksand text-[14px] pb-[5px]">
                    <p>
                      {`${loja.rua}, ${loja.numero}${
                        loja.complemento ? ` - ${loja.complemento}` : ""
                      }`}
                    </p>
                    <p>
                      {loja.cidade.replace(regex, "$1 $2")} - {loja.estado},
                    </p>
                  </div>
                  <div class="font-quicksand text-[14px] pb-[5px]">
                    <p class="whitespace-break-spaces" dangerouslySetInnerHTML={{__html: loja.antedimento.replaceAll(";", "\n")}}></p>
                    <br />
                    <p>Tel.: {loja.telefone}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <script
          type="text/javascript"
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCxyXK9bCdQVg0KnDEtaLpuKFN6ondnurY"
        >
        </script>
        <script
          type="text/javascript"
          src="https://cdnjs.cloudflare.com/ajax/libs/gmaps.js/0.4.25/gmaps.min.js"
        >
        </script>
      </div>
    </div>
  );
}
