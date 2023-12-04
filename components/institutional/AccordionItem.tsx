import Markdown from "deco-sites/std/components/Markdown.tsx";
import type { HTML } from "deco-sites/std/components/types.ts";
export interface AccordionContent {
  title?: string;
  text: HTML;
}
export interface Props {
  title: string;
  id: string;
  /**
   * @description Content will be rendered as markdown.
   */
  content: AccordionContent[];
  activeItem: string;
}

function Accordion({ item }: { item: AccordionContent }) {
  return (
    <div tabIndex={0} class="collapse">
      <input type="checkbox" class="hidden" />
      <div class="collapse-title p-0 before:inline-block before:align-middle before:mr-[10px] before:w-0 before:h-0 before:border-t-[4px] before:border-t-transparent before:border-b-[4px] before:border-b-transparent before:border-l-[4px] before:border-l-primary text-primary pt-[5px] cursor-pointer font-bold text-sm min-h-fit">
        {item.title}
      </div>
      <div class="collapse-content !p-0 !pb-0">
        <Markdown
          text={item.text.replace(/<p>|<\/p>/g, "\n")}
        />
      </div>
    </div>
  );
}

export default function AccordionItem(
  { title, content, id, activeItem }: Props,
) {
  return (
    <details
      tabIndex={0}
      class="collapse focus-visible:outline-none my-5 bg-[#e8ebf2] border border-[#bed4f0] rounded-[25px]"
      id={id}
      open={activeItem === id}
      onClick={() => window.location.hash = id}
    >
      <summary class="collapse-title lg:text-[20px] text-primary pl-[38px] py-[18px] pb-[18px] relative">
        {title}
      </summary>
      <div class="collapse-content font-quicksand p-[0_10px_25px_20px]">
        {content.map((item) => {
          if (item.title) return <Accordion item={item} />;
          return (
            <Markdown
              text={item.text.replace(/<p>|<\/p>/g, "\n")}
            />
          );
        })}
      </div>
    </details>
  );
}
