/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks onthe the
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
import { clx } from "$store/sdk/clx.ts";
import { effect } from "@preact/signals";

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
  device?: string;
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
  device
}: Props) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setSearch, suggestions } = useAutocomplete();
  const valueSearchSignal = useSignal<string>("");
  const hasProducts = Boolean(suggestions.value?.products?.length);
  const hasTerms = Boolean(suggestions.value?.searches?.length);
  const notFound = !hasProducts && !hasTerms;
  const valueSearch = valueSearchSignal.value;

  effect(()=>{
    // Fechar o content serach result quando clicar fora dele
    globalThis.addEventListener('click', function( e ){
      const _body = this.document.querySelector('body') 
      const target =  e.target;

      if(!target) return;

      if( device === 'desktop' ){
        if( _body?.querySelector('header input') !== target && _body?.querySelector('header .search-result-content') ){          
          valueSearchSignal.value = ''
        } 
      } else {
         // Quando o resultado do search estiver aberto, clincando em qualquer lugar ele irá fehcar 
        _body?.querySelectorAll('header') && Array.from(_body?.querySelectorAll('.header *')).map(( el )=>{
            if(el === target && !el.classList.contains('input-searchbar')){
              valueSearchSignal.value = ''
            } else if( _body?.querySelector('.is-overlay-search-results__suggestions') === target ||
              _body?.querySelector('.topnavbar')  === target ||
              _body?.querySelector('.header-container') === target ||
              _body?.querySelector('.header') === target ||
              _body?.querySelector('header') === target ||
              _body?.querySelector('button[name="open cart"] > div') === target ||
              _body?.querySelector('button[name="open menu"] > div') === target  ){             
              valueSearchSignal.value = ''
            }             
        })        
      }
    })
  })

  const Searchbar = (
    <div>
      <form
        id="searchbar"
        action={action}
        class="flex-grow flex items-center max-lg:px-[20px] max-lg:py-[9px] md:py-0 gap-3 placeholder-base-200 px-5 md:h-[40px] rounded-md"
      >
        {valueSearchSignal.value !== '' && valueSearchSignal.value !== 'click' ? (
          <button
            class="btn-ghost"
            aria-label="Search"
            htmlFor="searchbar"
            tabIndex={-1}
            type="button"
            onClick={( e )=>{
              e.preventDefault();
              const target = e.target;
              if( !target ) return;

              if( target instanceof SVGElement ){
                const form = target.closest('form');
                const input = form && form.querySelector<HTMLInputElement>('input');

                if(input) {
                  input.value = '';
                  valueSearchSignal.value = '';
                }
              }
            }}
          >
          <Icon
            class="text-primary mb-[3px]"
            id="searchResultsClose"
            size={18}
          />
        </button> 
        ): (          
          <button
            class="btn-ghost"
            aria-label="Search"
            htmlFor="searchbar"
            tabIndex={-1}
            type="submit"
          >
            <Icon
              class="text-primary"
              id="MagnifyingGlass"
              size={18}
            />
          </button>          
        )}
        <input
          ref={searchInputRef}
          class={clx(`md:text-[14px] md:h-[20px] flex w-full outline-none placeholder:text-[#6B6B6B] 
            placeholder:font-normal text-sm placeholder:text-sm text-[#6B6B6B] input-searchbar`)}
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
          onClick={(e)=>{            
            const value = e.currentTarget.value;  

            if (value) {
              sendEvent({
                name: "search",
                params: { search_term: value },
              });
            }
            if(value == ""){
              valueSearchSignal.value = 'click';
            } else {
              valueSearchSignal.value =value;
            }

            setSearch(value);
          }}
          placeholder={placeholder}
          role="combobox"
          aria-controls="search-suggestion"
          autocomplete="off"
          aria-expanded={valueSearch.length > 0}
        />
      </form>
    </div>
  );

  if (noContainer) return Searchbar;

  return (
    <div class={clx(`lg:w-[510px] 2xl:w-[90%] w-full border rounded-md border-[#dbdbdb]`)}>
      {Searchbar}
      {hide.results ? null
       : (
        <ResultSearch
          cardLayout={cardLayout}
          notFound={notFound}
          suggestions={suggestions}
          valueSearch={valueSearch}
          action={action}
          name={name}
          placeholder={placeholder}
          query={query}
          device={device}
        />
      )}
    </div>
  );
}

export default Searchbar;
