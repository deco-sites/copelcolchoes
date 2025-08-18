import { type SectionProps } from "@deco/deco";
import Image from "deco-sites/std/components/Image.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";

export interface layout {
  headerAlignment?: "center" | "left";
  /** @description Default is 12 */
  numberOfPosts?: number;
  /** @description Up to 6. Default is 4 */
  postsPerLine?: number;
}

export interface Data {
  id: string;
  permalink: string;
  media_type: string;
  media_url: string;
}

export interface Props {
  title?: string;
  description?: string;
  /**
   * @description Get it in Facebook app. Expires every 90 days.
   * @format textarea
   */
  facebookToken: string;
  layout?: layout;
}

export async function loader(
  { title, description, facebookToken, layout }: Props,
  _req: Request,
) {
  if (!facebookToken) {
    return { data: [], title, description, layout };
  }

  const fields = ["media_url", "media_type", "permalink"];
  const joinFields = fields.join(",");
  const url = `https://graph.instagram.com/me/media?access_token=${facebookToken}&fields=${joinFields}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(url, { signal: controller.signal });
    const { data } = (await res.json()) as { data: Data[] };
    return {
      data: data.slice(0, layout?.numberOfPosts ?? 12),
      title,
      description,
      layout,
    };
  } catch (_err) {
    return { data: [], title, description, layout };
  } finally {
    clearTimeout(timeoutId);
  }
}

export default function InstagramPosts({
  title,
  description,
  layout,
  data = [
    {
      id: "placeholderInsta",
      permalink: "#",
      media_type: "IMAGE",
      media_url: "",
    },
  ],
}: SectionProps<typeof loader>) {
  return (
    <div class="container flex w-full flex-col gap-14 px-4 py-8 lg:gap-20 lg:px-0 lg:py-10">
      <Header
        title={title}
        description={description}
        alignment={layout?.headerAlignment || "center"}
      />
      <div class="hidden lg:grid-cols-1 lg:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 lg:grid-cols-6"></div>
      <div
        class={`grid grid-cols-2 lg:grid-cols-${
          layout?.postsPerLine || 4
        } place-items-center items-center justify-center gap-4`}
      >
        {data.map((item) => (
          <a
            key={item.id}
            href={item.permalink}
            target="_blank"
            title="Visite nosso instagram"
            class="group w-full max-w-[350px] overflow-hidden rounded-lg sm:max-w-[350px]"
          >
            {item.media_type === "IMAGE" ? (
              <Image
                class="duration-400 max-h-full w-full max-w-full object-cover transition group-hover:scale-110 group-hover:brightness-90"
                src={item.media_url ?? ""}
                alt="Imagem do instagram"
                width={350}
                height={350}
                loading="lazy"
              />
            ) : (
              <video controls class="max-h-full max-w-full object-cover">
                <source src={item.media_url}></source>
              </video>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
