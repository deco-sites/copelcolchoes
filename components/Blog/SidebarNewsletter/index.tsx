import type { Props as ActionProps } from "site/actions/blog/submitNewsletter.ts";
import { useSignal } from "@preact/signals";
import { clx } from "site/sdk/clx.ts";
import { useState } from "preact/hooks";
import { invoke } from "site/runtime.ts";
import SidebarTitle from "site/components/Blog/SidebarTitle.tsx";
import SidebarInput from "site/components/Blog/SidebarInput.tsx";
import SidebarContainer from "site/components/Blog/SidebarContainer.tsx";
import SuccessMessage from "site/components/Blog/SidebarNewsletter/SuccessMessage.tsx";
import ErrorMessage from "site/components/Blog/SidebarNewsletter/ErrorMessage.tsx";
import Button from "site/components/Blog/SidebarNewsletter/Button.tsx";
import LoadingSpinner from "site/components/ui/LoadingSpinner.tsx";

export interface Props {
  title?: string;
  namePlaceholder?: string;
  emailPlaceholder?: string;
  submitButtonText?: string;
}

export default function SidebarNewsletter({
  title = "Newsletter",
  namePlaceholder = "Nome",
  emailPlaceholder = "Email",
  submitButtonText = "Enviar",
}: Props) {
  const isLoading = useSignal(false);
  const showSuccess = useSignal(false);
  const showError = useSignal(false);
  const errorMessage = useSignal("");

  const [formData, setFormData] = useState<ActionProps>({
    name: "",
    email: "",
  });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    showError.value = false;
    errorMessage.value = "";

    try {
      isLoading.value = true;
      await invoke.site.actions.blog.submitNewsletter(formData);
      showSuccess.value = true;
      setFormData({ name: "", email: "" });
    } catch (error) {
      if (error && typeof error === "object" && "message" in error) {
        errorMessage.value = error.message as string;
      }
      showError.value = true;
    } finally {
      isLoading.value = false;
    }
  };

  if (showSuccess.value) return <SuccessMessage title={title} />;
  if (showError.value) {
    return (
      <ErrorMessage
        title={title}
        showError={showError}
        errorMessage={errorMessage.value}
      />
    );
  }

  return (
    <SidebarContainer>
      <SidebarTitle title={title} />
      <form
        onSubmit={handleSubmit}
        class="relative flex flex-col gap-y-[20px] h-[162px]"
      >
        <SidebarInput
          required
          minLength={3}
          placeholder={namePlaceholder}
          value={formData.name}
          disabled={isLoading.value}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.currentTarget.value }))}
          className={clx(isLoading.value && "opacity-50 cursor-not-allowed")}
        />
        <SidebarInput
          required
          placeholder={emailPlaceholder}
          type="email"
          value={formData.email}
          disabled={isLoading.value}
          className={clx(
            "mt-[-10px]",
            isLoading.value && "opacity-50 cursor-not-allowed",
          )}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.currentTarget.value }))}
        />
        <Button submitButtonText={submitButtonText} isLoading={isLoading} />
        <LoadingSpinner isLoading={isLoading.value} />
      </form>
    </SidebarContainer>
  );
}
