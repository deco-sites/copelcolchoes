import { useQuickReview } from "$store/sdk/useQuickReview.ts";
import StarRatings from "$store/components/product/StarsRatings.tsx";

const handleClick = () => {
  const element = document.getElementById("reviews-container");
  element?.scrollIntoView({ behavior: "smooth", block: "center" });
};

function QuickReview() {
  const { reviews, totalReview } = useQuickReview();
  const rates = reviews.value;
  const totalRate = totalReview.value;
  return (
    <button
      class="flex items-center gap-4"
      title={`${rates} avaliaç${rates != 1 ? "ões" : "ão"}`}
      onClick={handleClick}
    >
      <StarRatings totalRate={totalRate} />
      <span class="underline">
        {rates > 0
          ? `${rates} avaliaç${rates > 1 ? "ões" : "ão"}`
          : "Seja o primeiro a avaliar"}
      </span>
    </button>
  );
}

export default QuickReview;
