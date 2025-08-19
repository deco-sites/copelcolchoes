export default function SidebarTitle({
  title,
  heading = "h3",
}: {
  title: string;
  heading?: "h2" | "h3";
}) {
  const HeadingTag = heading;
  return (
    <HeadingTag class="font-quicksand text-xl md:text-2xl font-semibold text-base-content">
      {title}
    </HeadingTag>
  );
}
