import { clx } from "site/sdk/clx.ts";

export default function LoadingSpinner({ isLoading }: { isLoading: boolean }) {
  return (
    <div
      class={clx(
        "absolute inset-0 flex items-center justify-center",
        isLoading ? "flex" : "hidden",
      )}
    >
      <div class="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin">
      </div>
    </div>
  );
}
