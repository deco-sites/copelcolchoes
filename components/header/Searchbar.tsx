import { Suspense } from "preact/compat";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import SearchBar from "$store/components/search/Searchbar.tsx";
interface Props {
  searchbar: SearchbarProps;
}

function Searchbar({ searchbar }: Props) {
  return (
    <div className="flex flex-col items-end justify-end">
      <p class="font-quicksand text-sm font-bold mb-[0.8125rem] max-lg:hidden">
        Televendas: (11) 2109-9109
      </p>
      <Suspense fallback={<span class="loading loading-ring" />}>
        <SearchBar {...searchbar} variant="desktop" />
      </Suspense>
    </div>
  );
}

export default Searchbar;
