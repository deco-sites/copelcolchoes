import { clx } from "site/sdk/clx.ts";

export default function PostButton({
  link,
  text,
  newTab = false,
}: {
  link: string;
  text: string;
  newTab?: boolean;
}) {
  return (
    <a
      href={link}
      target={newTab ? "_blank" : "_self"}
      rel={newTab ? "noopener noreferrer" : undefined}
      class={clx(
        "font-quicksand font-medium leading-[40px]",
        "w-fit rounded-[100px] border border-base-content px-[20px]",
        "text-sm font-semibold text-base-content duration-300",
        "hover:bg-base-content hover:text-base-100",
        "mt-auto",
      )}
    >
      {text}
    </a>
  );
}
