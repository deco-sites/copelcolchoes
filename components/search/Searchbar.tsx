/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import type { Layout as CardLayout } from "$store/components/product/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useAutocomplete } from "apps/vtex/hooks/useAutocomplete.ts";
import { useRef } from "preact/compat";
import ResultSearch from "deco-sites/copelcolchoes/components/search/ResultSearch.tsx";
import { useSignal } from "@preact/signals";

// Editable props
export interface EditableProps {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;
  /**
   * TODO: Receive querystring from parameter in the server-side
   */
  query?: string;
  cardLayout: CardLayout;
}

export type Props = EditableProps & {
  variant?: "desktop" | "mobile";
  hide?: {
    cleanButton?: boolean;
    results?: boolean;
  };
  noContainer?: boolean;
};

function Searchbar({
  placeholder = "What are you looking for?",
  action = "/busca",
  name = "q",
  query,
  variant = "mobile",
  cardLayout,
  hide = { cleanButton: false, results: false },
  noContainer = false,
}: Props) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setSearch, suggestions } = useAutocomplete();
  const valueSearchSignal = useSignal<string>("");
  const hasProducts = Boolean(suggestions.value?.products?.length);
  const hasTerms = Boolean(suggestions.value?.searches?.length);
  const notFound = !hasProducts && !hasTerms;
  const valueSearch = valueSearchSignal.value;

  const Searchbar = (
    <div>
      <form
        id="searchbar"
        action={action}
        class="flex-grow flex gap-3 placeholder-base-200 px-5 py-4 border border-base-200 h-[3.25rem] rounded-md"
      >
        <input
          ref={searchInputRef}
          id="search-input"
          class="flex w-full outline-none placeholder:text-neutral placeholder:font-normal pl-2 text-sm placeholder:text-sm text-[#8c9aad]"
          name={name}
          defaultValue={query}
          onInput={(e) => {
            const value = e.currentTarget.value;

            if (value) {
              sendEvent({
                name: "search",
                params: { search_term: value },
              });
            }
            valueSearchSignal.value = value;
            setSearch(value);
          }}
          placeholder={placeholder}
          role="combobox"
          aria-controls="search-suggestion"
          autocomplete="off"
        />
        <button
          class="btn-ghost"
          aria-label="Search"
          htmlFor="searchbar"
          tabIndex={-1}
          type="submit"
        >
          <Icon
            class="text-secondary"
            id="MagnifyingGlass"
            size={18}
          />
        </button>
      </form>
    </div>
  );

  if (noContainer) return Searchbar;

  return (
    <div class="relative lg:w-[487px] w-full h-[3.25rem] border rounded-md ml-[4.5rem] border-[#dbdbdb]">
      {Searchbar}
      {hide.results ? null : (
        <ResultSearch
          cardLayout={cardLayout}
          notFound={notFound}
          suggestions={suggestions}
          valueSearch={valueSearch}
          action={action}
          name={name}
          placeholder={placeholder}
          query={query}
        />
      )}
    </div>
  );
}

export default Searchbar;
