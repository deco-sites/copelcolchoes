import { clx } from "site/sdk/clx.ts";

export default function PostTitle({
  title,
  link,
  clamp = 0,
  fontSizeDesktop = 32,
  fontSizeMobile = 20,
  leadingDesktop = 38,
  leadingMobile = 24,
  heading = "h2",
  className,
}: {
  title: string;
  link?: string;
  clamp?: number;
  fontSizeDesktop?: number;
  fontSizeMobile?: number;
  leadingDesktop?: number;
  leadingMobile?: number;
  heading?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const classNames = clx(
    `mb-[-10px] font-semibold font-quicksand text-base-content`,
    `max-md:[font-size:var(--font-size-mobile)!important] max-md:[line-height:var(--line-height-mobile)!important]`,
    clamp === 1
      ? "line-clamp-1"
      : clamp === 2
      ? "line-clamp-2"
      : clamp === 3
      ? "line-clamp-3"
      : clamp === 4
      ? "line-clamp-4"
      : clamp === 5
      ? "line-clamp-5"
      : clamp === 6
      ? "line-clamp-6"
      : "",
    className,
  );

  const dynamicStyles = {
    "--font-size-desktop": `${fontSizeDesktop}px`,
    "--font-size-mobile": `${fontSizeMobile}px`,
    "--line-height-desktop": `${leadingDesktop}px`,
    "--line-height-mobile": `${leadingMobile}px`,
    fontSize: `var(--font-size-desktop)`,
    lineHeight: `var(--line-height-desktop)`,
  } as React.CSSProperties;

  const HeadingTag = heading;

  return link
    ? (
      <a
        href={link}
      >
        <HeadingTag class={classNames} style={dynamicStyles}>
          {title}
        </HeadingTag>
      </a>
    )
    : <HeadingTag class={classNames} style={dynamicStyles}>{title}</HeadingTag>;
}
