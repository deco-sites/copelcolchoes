import { signal } from "@preact/signals";

export const gridColsSignal = signal({
  desktop: 3,
  mobile: 2,
});

interface Props {
  variant: string;
}

const insideSquareStyle =
  "border-2 border-primary bg-primary rounded-[2px] w-[9px] h-[8px] float-left block m-0 transition-all duration-500";
const activeSquare = `${insideSquareStyle} bg-white border-white`;
const buttonStyle =
  "relative flex items-center justify-center gap-[5px] float-right pb-[2px] border border-primary rounded-[4px] w-[38px] h-[36px] max-lg:first:mx-3 lg:mr-[0.625rem] lg:last:flex-col";
const activeButton = `${buttonStyle} bg-primary`;
const SearchResultsGridChoice = ({ variant }: Props) => {
  return (
    <>
      {variant === "mobile"
        ? (
          <div class="lg:hidden flex justify-between items-center">
            <div class="flex">
              <button
                class={gridColsSignal.value.mobile === 1
                  ? activeButton
                  : buttonStyle}
                title="Uma coluna"
                onClick={() =>
                  gridColsSignal.value = { ...gridColsSignal.value, mobile: 1 }}
              >
                <span
                  class={gridColsSignal.value.mobile === 1
                    ? activeSquare
                    : insideSquareStyle}
                />
              </button>
              <button
                class={gridColsSignal.value.mobile === 2
                  ? activeButton
                  : buttonStyle}
                title="Duas colunas"
                onClick={() =>
                  gridColsSignal.value = { ...gridColsSignal.value, mobile: 2 }}
              >
                <span
                  class={gridColsSignal.value.mobile === 2
                    ? activeSquare
                    : insideSquareStyle}
                />
                <span
                  class={gridColsSignal.value.mobile === 2
                    ? activeSquare
                    : insideSquareStyle}
                />
              </button>
            </div>
          </div>
        )
        : (
          <div class="flex items-center max-lg:hidden">
            <p class="text-primary w-max text-base leading-7 font-bold mr-3 font-quicksand">
              Visualização
            </p>
            <button
              class={gridColsSignal.value.desktop === 2
                ? activeButton
                : buttonStyle}
              title="Duas colunas"
              onClick={() =>
                gridColsSignal.value = { ...gridColsSignal.value, desktop: 2 }}
            >
              <span
                class={gridColsSignal.value.desktop === 2
                  ? activeSquare
                  : insideSquareStyle}
              />
              <span
                class={gridColsSignal.value.desktop === 2
                  ? activeSquare
                  : insideSquareStyle}
              />
            </button>
            <button
              class={gridColsSignal.value.desktop === 3
                ? activeButton
                : buttonStyle}
              title="Duas colunas"
              onClick={() =>
                gridColsSignal.value = { ...gridColsSignal.value, desktop: 3 }}
            >
              <span
                class={gridColsSignal.value.desktop === 3
                  ? activeSquare
                  : insideSquareStyle}
              />
              <div class="flex gap-[2px]">
                <span
                  class={gridColsSignal.value.desktop === 3
                    ? activeSquare
                    : insideSquareStyle}
                />
                <span
                  class={gridColsSignal.value.desktop === 3
                    ? activeSquare
                    : insideSquareStyle}
                />
              </div>
            </button>
          </div>
        )}
    </>
  );
};

export default SearchResultsGridChoice;
