import { type Signal } from "@preact/signals";
import SidebarContainer from "site/components/Blog/SidebarContainer.tsx";
import SidebarTitle from "site/components/Blog/SidebarTitle.tsx";
import ErrorIcon from "site/components/ui/ErrorIcon.tsx";

export default function ErrorMessage({
  title,
  showError,
  errorMessage,
}: {
  title: string;
  showError: Signal<boolean>;
  errorMessage: string;
}) {
  const isValidationError = errorMessage.includes("nome") ||
    errorMessage.includes("e-mail");

  return (
    <SidebarContainer>
      <SidebarTitle title={title} />
      <div class="flex h-[162px] flex-col items-center justify-around self-stretch rounded-[10px] bg-primary px-8 py-4">
        <ErrorIcon />
        <p class="text-center font-quicksand text-sm font-normal text-primary-content">
          {isValidationError ? errorMessage : "Ocorreu um erro inesperado"}
        </p>
        <button
          onClick={() => (showError.value = false)}
          class="font-quicksand text-sm font-medium text-primary-content hover:text-accent"
          type="button"
        >
          Tentar novamente
        </button>
      </div>
    </SidebarContainer>
  );
}
