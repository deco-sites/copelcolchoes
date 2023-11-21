import Icon from "$store/components/ui/Icon.tsx";

const ratings = [1, 2, 3, 4, 5];

export default function StarsRatings({ totalRate }: { totalRate: number }) {
  return (
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
  );
}
