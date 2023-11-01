import Icon from "$store/components/ui/Icon.tsx";

export default function BackToTopButton() {
  return (
    <button
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      class="fixed bottom-[6px] right-[25px] z-40 w-[50px] block"
    >
      <Icon id="BackToTop" size={50} />
    </button>
  );
}
