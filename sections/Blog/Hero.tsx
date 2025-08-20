import { type SectionProps } from "@deco/deco";
import { type ImageWidget } from "apps/admin/widgets.ts";
import { type AppContext } from "site/apps/site.ts";
import { clx } from "site/sdk/clx.ts";
import Image from "apps/website/components/Image.tsx";

interface HeroProps {
  /**
   * @title Título
   * @description A altura será limitada a 330px
   */
  title: string;
  /**
   * @title Descrição
   */
  description: string;
  /**
   * @title Imagem
   * @description A imagem será exibida apenas no Desktop
   */
  image: ImageWidget;
  /**
   * @title Largura da imagem
   * @description A largura será limitada a 500px
   */
  imageWidth: number;
  /**
   * @title Altura da imagem
   * @description A altura será limitada a 280px
   */
  imageHeight: number;
  /**
   * @title Alt da imagem
   */
  imageAlt: string;
  /**
   * @ignore
   */
  isBlogListPage: boolean;
  /**
   * @ignore
   */
  isMobile: boolean;
}

export default function BlogHero({
  title,
  description,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  isBlogListPage,
  isMobile,
}: SectionProps<typeof loader>) {
  if (!title || !description) return null;

  const HeadingTag = isBlogListPage ? "h1" : "span";

  return (
    <div
      class={clx(
        "h-fit max-md:my-5",
        "relative flex",
      )}
    >
      <div
        class={clx(
          "max-w-[1440px] mx-auto px-[20px] lg:px-[120px]",
          "flex items-center justify-center gap-8",
          "relative w-full",
        )}
      >
        {/* Left Content */}
        <div
          class={clx(
            "flex-col items-center max-lg:flex",
            "flex-shrink-0",
            "py-[30px]",
            "w-[440px] max-md:w-full max-lg:w-full",
            "text-primary",
          )}
        >
          <div
            class={clx(
              "inline-flex w-full items-center",
              "max-lg:justify-center",
              "font-quicksand font-bold",
              "text-4xl md:text-5xl max-md:text-3xl",
            )}
          >
            <HeadingTag>{title}</HeadingTag>
          </div>
          {description && (
            <p class="mt-2 max-w-md font-quicksand text-lg leading-7 max-md:text-base">
              {description}
            </p>
          )}
        </div>

        {/* Right Content - Illustration */}
        {!isMobile && (
          <div class="hidden max-w-[500px] flex-shrink-0 justify-center lg:flex">
            {image && (
              <Image
                src={image}
                class="w-full object-contain"
                width={imageWidth > 500 ? imageWidth : 500}
                height={imageHeight > 330 ? imageHeight : 330}
                preload
                loading="eager"
                fetchPriority="high"
                alt={imageAlt || "Hero image"}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function loader(props: HeroProps, req: Request, ctx: AppContext) {
  const url = new URL(req.url);
  const pathname = url.pathname;
  const isBlogListPage = pathname === "/blog" || pathname === "/blog/";
  const isMobile = ctx.device !== "desktop";

  return { ...props, isBlogListPage, isMobile };
}
