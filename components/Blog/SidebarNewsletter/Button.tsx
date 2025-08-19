import { type Signal } from "@preact/signals";
import { clx } from "site/sdk/clx.ts";

export default function Button({
  submitButtonText,
  isLoading,
}: {
  submitButtonText: string;
  isLoading: Signal<boolean>;
}) {
  return (
    <button
      type="submit"
      disabled={isLoading.value}
      class={clx(
        "w-fit rounded-[100px] px-[20px] leading-[40px]",
        "bg-primary text-white duration-300 hover:bg-primary-focus",
        "font-quicksand text-sm font-medium",
        "flex items-center justify-center gap-2",
        isLoading.value && "cursor-not-allowed opacity-50",
      )}
    >
      {submitButtonText}
    </button>
  );
}
