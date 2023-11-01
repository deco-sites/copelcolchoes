import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Post {
  /** @description Banners do post */
  banner: LiveImage;
  /** @description Texto alternativo */
  alt?: string;
  /** @description Link do post */
  href: string;
}
export interface Props {
  /** @description Title */
  title: string;
  /** @description Post */
  blogPost: Post[];
}

export default function BlogPosts({
  title,
  blogPost,
}: Props) {
  return (
    <section class="py-10 mx-auto max-lg:py-[25px]">
      <h2 class="text-primary text-[28px] mb-10 font-semibold text-center max-lg:w-[90%] max-lg:text-[24px] font-quicksand">
        {title}
      </h2>
      <div class="flex items-center justify-center h-auto max-lg:flex-col max-lg:gap-[32px]">
        {blogPost.map((post) => (
          <article class="mx-[5px] max-lg:mx-auto">
            <div>
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                class="h-full w-full block"
              >
                <div class="h-full w-full">
                  <img
                    loading="lazy"
                    src={post.banner}
                    alt={post.alt || "Banner da postagem do blog"}
                    class="object-cover h-full w-full inline-block"
                  />
                </div>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
