import { type BlogPost } from "apps/blog/types.ts";
import { type SocialMedia } from "site/components/Blog/PostShare.tsx";
import { clx } from "site/sdk/clx.ts";
import { getUniqueTags } from "site/sdk/posts.ts";
import PostShare from "site/islands/Blog/PostShare.tsx";
import PostImage from "site/components/Blog/PostImage.tsx";
import PostTitle from "site/components/Blog/PostTitle.tsx";
import PostDate from "site/components/Blog/PostDate.tsx";
import PostContent from "site/components/Blog/PostContent.tsx";
import SidebarTags from "site/components/Blog/SidebarTags.tsx";

interface Props {
  post?: BlogPost;
  socialMedia?: SocialMedia[];
  tagsTitle?: string;
  postNotFoundTitle?: string;
  postNotFoundText?: string;
  postNotFoundLinkText?: string;
  postNotFoundLink?: string;
}

export default function PostDetails({
  post,
  socialMedia,
  tagsTitle = "Tags",
  ...props
}: Props) {
  if (!post) return <PostNotFound {...props} />;

  const { title, image, alt, content, seo, date, authors } = post;

  const tags = getUniqueTags([post]);

  return (
    <main class="flex flex-col gap-y-[30px]">
      <article
        class={clx(
          "flex flex-col gap-y-5 rounded-[10px] px-[20px] py-[30px]",
          "bg-neutral-100 border border-neutral-200",
        )}
      >
        <PostTitle title={title} heading="h1" />
        <PostDate date={date} className="-mb-1" authors={authors} />
        <PostShare socialMedia={socialMedia} seoTitle={seo?.title} />
        <PostImage
          src={image}
          srcMobile={seo?.image}
          alt={alt}
          borderRadius={10}
          height={265}
          width={750}
          heightMobile={170}
          widthMobile={310}
          preload
        />
        <PostContent content={content} />
        <SidebarTags title={tagsTitle} heading="h2" tags={tags} />
      </article>
    </main>
  );
}

function PostNotFound({
  postNotFoundTitle = "Ops! Postagem não encontrada",
  postNotFoundText =
    "Não conseguimos encontrar a postagem que você está procurando. Que tal explorar outros conteúdos do nosso blog?",
  postNotFoundLinkText = "Voltar para o Blog",
  postNotFoundLink = "/blog",
}: Props) {
  return (
    <div class="flex flex-col items-center gap-6">
      <h2 class="font-quicksand text-center text-2xl md:text-3xl font-semibold text-base-content">
        {postNotFoundTitle}
      </h2>
      <p class="max-w-xl text-center font-quicksand text-lg text-neutral">
        {postNotFoundText}
      </p>
      <a
        href={postNotFoundLink}
        class={clx(
          "mx-auto rounded-[100px] px-[30px] pt-[2px] leading-[48px] max-md:leading-[38px]",
          "bg-accent duration-300 hover:bg-primary hover:text-white",
          "font-quicksand text-base font-medium text-primary max-md:text-sm",
        )}
      >
        {postNotFoundLinkText}
      </a>
    </div>
  );
}
