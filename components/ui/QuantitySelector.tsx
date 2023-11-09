import Icon from "$store/components/ui/Icon.tsx";
import Button from "../ui/Button.tsx";

interface Props {
  quantity: number;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (quantity: number) => void;
  inputHeight?: number;
  inputWidth?: number;
}

const QUANTITY_MAX_VALUE = 100;

// Remove default browser behavior: https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp
// TODO: Figure out how to add it via tailwind config.
const innerStyle = `
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
`;

function QuantitySelector(
  { onChange, quantity, disabled, inputHeight, inputWidth }: Props,
) {
  const decrement = () => onChange?.(Math.max(0, quantity - 1));

  const increment = () =>
    onChange?.(Math.min(quantity + 1, QUANTITY_MAX_VALUE));

  return (
    <div class="font-bold w-fit flex items-center justify-center font-quicksand">
      <button
        class="pb-[0.9375rem] border border-[#e3e3e3] rounded-[0.25rem] shadow-[0_0.1875rem_0.375rem_rgba(0,0,0,0.16)] text-primary text-lg h-8 w-8 flex items-center justify-center disabled:pointer-events-none disabled:opacity-[0.35] disabled:cursor-not-allowed"
        title="Diminuir quantidade"
        onClick={decrement}
        disabled={disabled || quantity <= 1}
      >
        _
      </button>
      <input
        class={`border-none appearance-none pointer-events-none text-base leading-snug text-[#333333] font-extrabold mx-0 px-0 opacity-1 text-center max-lg:text-xs max-lg:leading-4`}
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        max={QUANTITY_MAX_VALUE}
        min={1}
        value={quantity >= 10 ? quantity : `0${quantity}`}
        disabled={true}
        onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
      />
      <button
        class="border border-[#e3e3e3] rounded-[0.25rem] shadow-[0_0.1875rem_0.375rem_rgba(0,0,0,0.16)] text-primary text-lg h-8 w-8"
        title="Aumentar quantidade"
        onClick={increment}
        disabled={disabled}
      >
        +
      </button>
    </div>
  );
}

export default QuantitySelector;
