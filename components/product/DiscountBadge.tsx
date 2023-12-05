type Props = {
  price: number;
  listPrice: number;
  className?: string;
};

function DiscountBadge({ price, listPrice, className }: Props) {
  const discount = Math.round(((listPrice - price) / listPrice) * 100);

  return (
    <div
      class={`pointer-events-none absolute top-[1.375rem] bg-primary text-left font-bold z-[1] py-1 px-2 max-lg:py-[0.1875rem] max-lg:px-[0.3125rem] max-lg:top-[1.5624rem] ${className}`}
    >
      <div class="flex justify-center items-center h-full flex-col text-white">
        <p class="whitespace-nowrap font-black text-[0.6875rem]">
          - {discount}%
        </p>
      </div>
    </div>
  );
}

export default DiscountBadge;
