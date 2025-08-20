import type { HTML } from "deco-sites/std/components/types.ts";
import AccordionItem from "$store/islands/AccordionItem.tsx";
import { useEffect, useState } from "preact/hooks";

export interface AccordionContent {
  title?: string;
  text: HTML;
}

export interface Props {
  accordions: {
    label: string;
    id: string;
    content: AccordionContent[];
  }[];
}

function AccordionsContent({ accordions }: Props) {
  const getHash = () => globalThis.location?.hash?.replace("#", "") || "";

  const [activeItem, setActiveItem] = useState(() => getHash());

  useEffect(() => {
    const handleHashChange = () => setActiveItem(getHash());

    globalThis.addEventListener?.("hashchange", handleHashChange);
    return () =>
      globalThis.removeEventListener?.("hashchange", handleHashChange);
  }, []);

  return (
    <>
      {accordions.map((item) => (
        <AccordionItem
          title={item.label}
          content={item.content}
          id={item.id}
          key={item.id}
          activeItem={activeItem}
        />
      ))}
    </>
  );
}

export default AccordionsContent;
