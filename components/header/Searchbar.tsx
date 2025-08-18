import { Suspense } from "preact/compat";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import SearchBar from "$store/components/search/Searchbar.tsx";
interface Props {
  searchbar: SearchbarProps;
}

function Searchbar({ searchbar }: Props) {
  return (
    <div className="flex items-end justify-end max-lg:mt-[10px] max-lg:px-[20px] max-md:px-0 md:flex-col">
      <Suspense fallback={<span class="loading loading-ring" />}>
        <SearchBar {...searchbar} variant="desktop" />
      </Suspense>
    </div>
  );
}

export default Searchbar;
