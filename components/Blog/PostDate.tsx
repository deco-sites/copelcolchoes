import { clx } from "site/sdk/clx.ts";

const TIMEZONE_OFFSET = 3;

interface Author {
  name: string;
  email?: string;
  jobTitle?: string;
}

export default function PostDate({
  date,
  className,
  authors,
}: {
  date: string;
  className?: string;
  authors?: Author[];
}) {
  try {
    const dateObject = new Date(date);
    dateObject.setHours(dateObject.getHours() + TIMEZONE_OFFSET);

    const formattedDate = dateObject.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const authorName = authors?.[0]?.name || null;

    return (
      <time
        dateTime={dateObject.toISOString()}
        class={clx(
          "font-quicksand font-light text-sm text-neutral-400 leading-none",
          className,
        )}
      >
        Publicado em {formattedDate}
        {authorName && (
          <span> por {authorName}</span>
        )}
      </time>
    );
  } catch (error) {
    console.error("Error formatting date:", error);
    return null;
  }
}
