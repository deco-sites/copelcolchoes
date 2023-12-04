import type { HTML } from "deco-sites/std/components/types.ts";
import AccordionItem from "$store/islands/AccordionItem.tsx";
import { useMemo, useState } from "preact/hooks";

export interface AccordionContent {
  title?: string;
  text: HTML;
}

export interface Props {
  accordions: {
    label: string;
    id: string;
    /**
     * @description Content will be rendered as markdown.
     */
    content: AccordionContent[];
  }[];
}

const useHash = () =>
  useMemo(() => {
    const hash = window.location.hash;
    return hash;
  }, []);

function AccordionsContent({ accordions }: Props) {
  const hash = useHash();
  const [activeItem, setActiveItem] = useState(hash && hash.replace("#", ""));
  // deno-lint-ignore no-window-prefix
  window.addEventListener("hashchange", () => {
    setActiveItem(window.location.hash.replace("#", ""));
  });
  return (
    <>
      {accordions.map(
        (item, index) => (
          <AccordionItem
            title={item.label}
            content={item.content}
            id={item.id}
            key={index}
            activeItem={activeItem}
          />
        ),
      )}
    </>
  );
}

export default AccordionsContent;
