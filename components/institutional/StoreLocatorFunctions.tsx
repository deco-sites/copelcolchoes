import type { Lojas } from "./StoreLocator.tsx";

export interface GoogleMaps {
  addMarker: ({}) => void;
  fitZoom: () => void;
  setCenter: (lat: number, lon: number) => void;
  removeMarkers: () => void;
  setZoom: (zoom: number) => void;
  markers: [{
    data: {
      id: string;
    };
    infoWindow: Record<string | number | symbol, never>;
  }];
}
export interface GeocoderResults {
  "formatted_address": string;
}
export interface distLoja {
  "idLoja": string;
  "distancia": number;
  "lat": number;
  "lon": number;
}

export interface MarkerEvent {
  "data": Lojas;
}

export const storeLocatorConstants = {
  ICON_DEFAULT: "//copelcolchoes.vteximg.com.br/arquivos/place_marked-map.png",
  ICON_USER: "//copelcolchoes.vteximg.com.br/arquivos/place_marked-map.png",
  OFFSET_X: 0,
  OFFSET_Y: 0,
};

export const mountMap = (lojas: Array<Lojas>) => {
  // @ts-expect-error GMaps is added by 3p script
  const map = GMaps({
    disableDefaultUI: true,
    div: "#map",
    lat: -22.9838579,
    lng: -43.2113339,
  });
  addMarkers(map, lojas);
  return map;
};

const refreshStoreList = () => {
  const storeListElements = document.querySelectorAll(
    '[data-list-store="store"]',
  );
  const addressParagraph = document.querySelectorAll('[data-id="cepAddress"]');
  addressParagraph[0].innerHTML = "";
  addressParagraph[0].classList.add("hidden");
  storeListElements.forEach((element) => {
    element.classList.remove("hidden");
  });
};

const addMarkers = (map: GoogleMaps, lojas: Array<Lojas>) => {
  const regex = /([a-záéíóúâêîôûãõàèìòùäëïöüç])([A-ZÁÉÍÓÚÂÊÎÔÛÃÕÀÈÌÒÙÄËÏÖÜÇ])/g;
  lojas.forEach((loja: Lojas, index: number) => {
    map.addMarker({
      lat: loja.latitude,
      lng: loja.longitude,
      data: loja,
      title: `${loja.nome}`,
      details: {
        imagePath: storeLocatorConstants.ICON_DEFAULT,
        title: loja.nome,
      },
      icon: {
        url: storeLocatorConstants.ICON_DEFAULT,
      },
      infoWindow: {
        content: `
            <div>
              <div data-marker-index="${index}" data-store-id="${loja.id}">
                  <div class="font-nunito-sans text-[18px] font-semibold pb-[15px] text-black">${loja.bairro.replace(regex, "$1 $2")} - ${loja.nome}</div>
                  <div class="font-nunito-sans text-[14px] pb-[5px]">
                      <p>${loja.rua}, ${loja.numero}${
                        loja.complemento ? ` - ${loja.complemento}` : ""
                      }</p>
                      <p>${loja.cidade.replace(regex, "$1 $2")} - ${loja.estado},</p>
                  </div>
                  <div class="font-nunito-sans text-[14px] pb-[5px]">
                      <p class="whitespace-break-spaces">${loja.antedimento.replaceAll(";", "\n")}</p>
                      <br />
                      <p>Tel.: ${loja.telefone}</p>
                  </div>
              </div>
            </div>
        `,
      },
      click: function (e: MarkerEvent) {
        handleMarkerClick(e, map);
      },
    });
  });
  map.fitZoom();
  map.markers.forEach((marker) => {
    // @ts-expect-error google is added by 3p script
    google.maps.event.addListener(marker.infoWindow, "closeclick", () => {
      map.fitZoom();
      refreshStoreList();
    });
  });
};

const handleMarkerClick = (event: MarkerEvent, map: GoogleMaps) => {
  const { data } = event;
  const storeListElements = document.querySelectorAll(
    '[data-list-store="store"]',
  );
  storeListElements.forEach((element) => {
    const elementId = element.getAttribute("data-store-id");
    elementId === data.id
      ? matchStoreId(
        element,
        map,
        Number(data.latitude),
        Number(data.longitude),
      )
      : element.classList.add("hidden");
  });
};

const matchStoreId = (
  element: Element,
  map: GoogleMaps,
  lat: number,
  lng: number,
) => {
  element.classList.remove("hidden");
  map.setCenter(lat, lng);
};

export const getCitiesOptions = (lojas: Array<Lojas>) => {
  const cities = [] as Array<string>;
  lojas.filter((loja) => {
    const isDuplicate = cities.includes(loja.cidade);
    if (!isDuplicate) {
      cities.push(loja.cidade);
      return true;
    }
    return false;
  });
  return cities;
};

export const handleSelectCity = (
  selectedCity: string,
  lojas: Array<Lojas>,
  map: GoogleMaps,
) => {
  if (selectedCity === "Selecione") return;
  const lojasInCity = lojas.filter((loja) => {
    return loja.cidade === selectedCity;
  });
  map.removeMarkers();
  addMarkers(map, lojasInCity);

  const storeListElements = document.querySelectorAll(
    '[data-list-store="store"]',
  );
  storeListElements.forEach((element) => {
    const elementCity = element.getAttribute("data-store-city");
    elementCity === selectedCity
      ? element.classList.remove("hidden")
      : element.classList.add("hidden");
  });
};

export const clearOptions = (map: GoogleMaps, lojas: Array<Lojas>) => {
  refreshStoreList();
  map.removeMarkers();
  addMarkers(map, lojas);
};

const distance = (
  lat1: string,
  lon1: string,
  lat2: number,
  lon2: number,
  unit: string,
) => {
  const radlat1 = Math.PI * Number(lat1) / 180;
  const radlat2 = Math.PI * Number(lat2) / 180;
  const theta = Number(lon1) - Number(lon2);
  const radtheta = Math.PI * theta / 180;
  let dist = Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit == "K") dist = dist * 1.609344;
  if (unit == "N") dist = dist * 0.8684;
  return dist;
};

export const closestStore = (
  map: GoogleMaps,
  cep: string,
  lojas: Array<Lojas>,
  showCep?: boolean,
) => {
  // @ts-expect-error google is added by 3p script
  const geocoder = new google.maps.Geocoder();
  const address = cep;
  const addressParagraph = document.querySelector('[data-id="cepAddress"]');
  geocoder.geocode(
    { "address": address },
    function (results: Array<GeocoderResults>, status: string) {
      // @ts-expect-error google is added by 3p script
      if (status == google.maps.GeocoderStatus.OK) {
        let distLoja: Array<distLoja> = [];
        let latEnd = "";
        let lonEnd = "";
        const mapAddress = results[0].formatted_address;
        const dataUrl =
          "https://maps.google.com/maps/api/geocode/json?address=" +
          mapAddress +
          "&key=AIzaSyCxyXK9bCdQVg0KnDEtaLpuKFN6ondnurY&sensor=false";
        fetch(dataUrl).then((result) =>
          result.json().then((data) => {
            latEnd = data.results[0].geometry.location.lat;
            lonEnd = data.results[0].geometry.location.lng;
            lojas.forEach((loja) => {
              const idLoja = loja.id;
              const distancia = distance(
                latEnd,
                lonEnd,
                Number(loja.latitude),
                Number(loja.longitude),
                "K",
              );
              distLoja = distLoja.concat([{
                "idLoja": idLoja,
                "distancia": distancia,
                "lat": Number(loja.latitude),
                "lon": Number(loja.longitude),
              }]);
            });
            const res = Math.min.apply(
              Math,
              distLoja.map(function (o) {
                return o.distancia;
              }),
            );

            distLoja.forEach((dist) => {
              if (dist.distancia === res) {
                if (showCep) {
                  // @ts-expect-error google is added by 3p script
                  google.maps.event.trigger(
                    (map as unknown as GoogleMaps).markers.find((marker) =>
                      marker.data.id === dist.idLoja
                    ),
                    "click",
                  );
                }
                const lat = dist.lat;
                const lng = dist.lon;
                map.setZoom(15);
                map.setCenter(lat, lng);
              }
            });
          })
        );
        if (addressParagraph && showCep) {
          addressParagraph.innerHTML =
            `Loja mais próximas do endereço: ${mapAddress}`;
          addressParagraph.classList.remove("hidden");
        }
      }
      // @ts-expect-error google is added by 3p script
      if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
        alert(
          "A busca não retornou resultados. Confira o CEP e tente novamente!",
        );
      }
    },
  );
};
