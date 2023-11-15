import Icon from "$store/components/ui/Icon.tsx";
const ratings = [1, 2, 3, 4, 5];

const handleClick = () => {
  const element = document.getElementById("reviews-container");
  element?.scrollIntoView({ behavior: "smooth", block: "center" });
};

function QuickReview(
  { totalRate, rates }: { totalRate: number; rates: number },
) {
  return (
    <button
      class="flex items-center gap-4"
      title={`${rates} avaliaç${rates != 1 ? "ões" : "ão"}`}
      onClick={handleClick}
    >
      <div class="yv-review-quickreview">
        <div
          type="exhibition"
          class="flex items-center justify-start pointer-events-none"
        >
          <div class="relative box-border flex">
            {ratings.map((rating, index) => (
              <div className="relative align-middle pr-[2px] cursor-pointer flex items-center justify-center">
                <Icon
                  id={rating > totalRate && totalRate - index > 0
                    ? "HalfStar"
                    : "Star"}
                  class={rating <= totalRate
                    ? "text-secondary"
                    : "text-[#d8d8d8]"}
                  size={18}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <span class="underline">
        {rates > 0 ? `${rates} avaliaç${rates > 1 ? "ões" : "ão"}` : "Seja o primeiro a avaliar"}
      </span>
    </button>
  );
}

export default QuickReview;
