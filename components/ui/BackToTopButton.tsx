import Icon from "$store/components/ui/Icon.tsx";

export default function BackToTopButton() {
  return (
    <button
      onClick={() => {
        globalThis.window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      class="fixed bottom-[6px] right-[25px] z-40 w-[50px] block"
      name="Voltar ao topo"
      aria-label="Voltar ao topo"
    >
      <Icon id="BackToTop" size={50} />
    </button>
  );
}
