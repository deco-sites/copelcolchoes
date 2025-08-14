import { Signal, useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import Button from "$store/components/ui/Button.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useCart } from "deco-sites/std/packs/vtex/hooks/useCart.ts";
import type {
  SimulationOrderForm,
  SKU,
  Sla,
} from "deco-sites/std/packs/vtex/types.ts";

export interface Props {
  items: Array<SKU>;
}

const formatShippingEstimate = (estimate: string) => {
  const [, time, type] = estimate.split(/(\d+)/);

  if (type === "bd") return `${time} dias úteis`;
  if (type === "d") return `${time} dias`;
  if (type === "h") return `${time} horas`;
};

function ShippingContent({
  simulation,
}: {
  simulation: Signal<SimulationOrderForm | null>;
}) {
  const { cart } = useCart();

  const methods = simulation.value?.logisticsInfo?.reduce(
    (initial, { slas }) => [...initial, ...slas],
    [] as Sla[],
  ) ?? [];

  const locale = cart.value?.clientPreferencesData.locale || "pt-BR";
  const currencyCode = cart.value?.storePreferencesData.currencyCode || "BRL";

  if (simulation.value == null) {
    return null;
  }

  if (methods.length === 0) {
    return (
      <div class="p-2">
        <span>CEP inválido</span>
      </div>
    );
  }

  return (
    <div class="py-4">
      <table class="w-full border-collapse">
        <thead size={12} class="text-xs uppercase">
          <tr>
            <th class="border-t-none py-2 text-center">Entrega</th>
            <th class="border-t-none py-2 text-center">Frete</th>
            <th class="border-t-none py-2 text-center">Prazo</th>
          </tr>
        </thead>
        <tbody size={12} class="text-xs uppercase">
          {methods.map((method) => (
            <tr class="bg-white transition-all duration-150 hover:bg-[rgba(0,0,0,0.075)]">
              <td class="py-2 text-center">{method.name}</td>
              <td class="py-2 text-center">
                {method.price === 0
                  ? "Grátis"
                  : formatPrice(method.price / 100, currencyCode, locale)}
              </td>
              <td class="py-2 text-center">
                Até {formatShippingEstimate(method.shippingEstimate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    // <ul class="flex flex-col text-sm rounded-[10px]">
    //   {methods.map((method) => (
    //     <li class="flex text-[#4A4B51] px-[10px] sm:px-[20px] py-[10px] odd:bg-[#F3F3F4] justify-between items-center rounded-[10px]">
    //       <span class="text-left font-medium break-words w-[35%] max-lg:w-[25%]">
    //         {method.name.includes("Retire")
    //           ? method.name.split("(")[0]
    //           : method.name}
    //       </span>
    //       <span class="text-button w-[35%] max-lg:w-[45%]">
    //         Em até {formatShippingEstimate(method.shippingEstimate)}
    //       </span>
    //       <span class="font-medium text-right w-[20%]">
    //         {method.price === 0 ? "Grátis" : (
    //           formatPrice(method.price / 100, currencyCode, locale)
    //         )}
    //       </span>
    //     </li>
    //   ))}
    // </ul>
  );
}

function ShippingSimulation({ items }: Props) {
  const postalCode = useSignal("");
  const loading = useSignal(false);
  const simulateResult = useSignal<SimulationOrderForm | null>(null);
  const { simulate, cart } = useCart();

  const handleSimulation = useCallback(async () => {
    if (postalCode.value.length !== 8) {
      return;
    }

    try {
      loading.value = true;
      simulateResult.value = await simulate({
        items: items,
        postalCode: postalCode.value,
        country: cart.value?.storePreferencesData.countryCode || "BRA",
      });
    } finally {
      loading.value = false;
    }
  }, []);

  return (
    <div class="py-5 font-quicksand">
      <h4 class="text-lg font-semibold leading-8 text-primary">
        Calcule as opções de entrega
      </h4>
      {!simulateResult.value
        ? (
          <div class="py-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSimulation();
              }}
            >
              <div class="flex max-lg:flex-col max-lg:gap-4">
                <div class="relative mr-3 w-full text-[0.8125rem] lg:w-auto">
                  <label for="shippingPostalCode"></label>
                  <input
                    as="input"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    class="input h-[2.625rem] w-[16.25rem] !rounded-none border border-[#dcdcdc] px-4 text-xs outline-none focus:outline-none max-lg:w-full"
                    placeholder="Insira seu cep"
                    value={postalCode.value}
                    maxLength={8}
                    onChange={(e: { currentTarget: { value: string } }) => {
                      postalCode.value = e.currentTarget.value;
                    }}
                  />
                  <a
                    href="https://buscacepinter.correios.com.br/app/endereco/index.php"
                    target="_blank"
                    title="Não sei meu cep"
                    rel="noopener noreferer"
                    class="block w-fit cursor-pointer text-[0.875rem] font-normal leading-8 text-primary underline"
                  >
                    Não sei o meu cep
                  </a>
                </div>
                <Button
                  type="submit"
                  loading={loading.value}
                  class="relative flex h-[2.625rem] w-[9.5rem] appearance-none items-center justify-center !rounded-[0.3125rem] !border border-primary bg-white px-8 text-[0.9375rem] font-bold transition-all duration-300 hover:bg-primary hover:text-white"
                >
                  Calcular
                </Button>
              </div>
            </form>
          </div>
        )
        : <ShippingContent simulation={simulateResult} />}
    </div>
  );
}

export default ShippingSimulation;
