import { Suspense } from "preact/compat";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import SearchBar from "$store/components/search/Searchbar.tsx";
interface Props {
  searchbar: SearchbarProps;
}

function Searchbar({ searchbar }: Props) {
  return (
    <div className="flex md:flex-col items-end justify-end 2xl:w-[90%] max-lg:px-[20px] max-lg:mt-[10px]  max-md:px-0">
      <Suspense fallback={<span class="loading loading-ring" />}>
        <SearchBar {...searchbar} variant="desktop" />
      </Suspense>
    </div>
  );
}

export default Searchbar;