import { clx } from "site/sdk/clx.ts";

const TIMEZONE_OFFSET = 3;

export default function PostDate({
  date,
  className,
}: {
  date: string;
  className?: string;
}) {
  try {
    const dateObject = new Date(date);
    dateObject.setHours(dateObject.getHours() + TIMEZONE_OFFSET);

    const formattedDate = dateObject.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return (
      <time
        dateTime={dateObject.toISOString()}
        class={clx(
          "font-quicksand font-light text-sm text-neutral-400 leading-none",
          className,
        )}
      >
        Publicado em {formattedDate}
      </time>
    );
  } catch (error) {
    console.error("Error formatting date:", error);
    return null;
  }
}
