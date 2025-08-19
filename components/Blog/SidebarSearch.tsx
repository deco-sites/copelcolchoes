import { useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import { clx } from "site/sdk/clx.ts";
import Icon from "site/components/ui/Icon.tsx";
import SidebarInput from "site/components/Blog/SidebarInput.tsx";
import SidebarTitle from "site/components/Blog/SidebarTitle.tsx";
import SidebarContainer from "site/components/Blog/SidebarContainer.tsx";

interface Props {
  title?: string;
  placeholder?: string;
}

export default function SidebarSearch({
  title = "Buscar",
  placeholder,
}: Props) {
  const loading = useSignal(false);
  const searchValue = useSignal("");

  const updateURL = useCallback((searchTerm: string) => {
    const url = new URL(globalThis.window.location.href);
    const pathSegments = url.pathname.split("/").filter(Boolean);
    const basePath = pathSegments.length > 0 ? `/${pathSegments[0]}` : "/";

    url.pathname = basePath;

    if (searchTerm) {
      url.searchParams.set("search", searchTerm.trim());
    } else {
      url.searchParams.delete("search");
    }

    url.searchParams.delete("tag");
    url.searchParams.delete("category");
    url.searchParams.set("page", "1");

    return url;
  }, []);

  const handleSearch = useCallback(() => {
    if (loading.value) return;
    loading.value = true;

    try {
      const url = updateURL(searchValue.value);
      globalThis.window.location.href = url.toString();
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      loading.value = false;
    }
  }, [searchValue.value]);

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  }, [handleSearch]);

  return (
    <SidebarContainer>
      <SidebarTitle title={title} />
      <div class="relative">
        <button
          onClick={handleSearch}
          class="top-1/2 left-1 absolute p-3 text-primary hover:text-primary/80 transform -translate-y-1/2"
          aria-label="Buscar"
          type="button"
          disabled={loading.value}
        >
          <Icon
            id="MagnifyingGlass"
            size={20}
            class={loading.value ? "animate-pulse" : ""}
          />
        </button>
        <SidebarInput
          placeholder={placeholder}
          className={clx(
            "pl-[52px]",
            loading.value && "opacity-50",
          )}
          disabled={loading.value}
          value={searchValue.value}
          onKeyDown={handleKeyPress}
          onChange={(e) =>
            searchValue.value = (e.target as HTMLInputElement).value}
          type="search"
        />
      </div>
    </SidebarContainer>
  );
}
