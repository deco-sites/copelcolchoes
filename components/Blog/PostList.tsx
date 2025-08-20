import { type BlogPost } from "apps/blog/types.ts";
import { type SocialMedia } from "./PostShare.tsx";
import { clx } from "site/sdk/clx.ts";
import PostShare from "site/islands/Blog/PostShare.tsx";
import PostImage from "site/components/Blog/PostImage.tsx";
import PostTitle from "site/components/Blog/PostTitle.tsx";
import PostContent from "site/components/Blog/PostContent.tsx";
import PostButton from "site/components/Blog/PostButton.tsx";
import PostDate from "site/components/Blog/PostDate.tsx";

interface Props {
  posts: BlogPost[];
  socialMedia?: SocialMedia[];
  searchQuery?: string;
  postButtonText?: string;
}

export default function PostList({
  posts,
  socialMedia,
  searchQuery,
  postButtonText,
}: Props) {
  if (posts.length === 0) {
    return <NoPostsFound searchQuery={searchQuery} />;
  }
  return (
    <main class="flex flex-col gap-y-[30px]" id="post-list">
      {posts.map((post, index) => (
        <PostItem
          key={post.slug}
          {...post}
          socialMedia={socialMedia}
          postButtonText={postButtonText}
          isFirst={index === 0}
        />
      ))}
    </main>
  );
}

export function PostItem({
  title,
  image,
  alt,
  slug,
  excerpt,
  socialMedia,
  seo,
  date,
  isFirst = false,
  postButtonText = "Continue lendo",
}: BlogPost & {
  socialMedia?: SocialMedia[];
  isFirst?: boolean;
  postButtonText?: string;
}) {
  const link = `/blog/${slug}`;
  return (
    <article
      class={clx(
        "flex flex-col gap-y-5 rounded-[10px] px-[20px] py-[30px]",
        "bg-neutral-100 border border-neutral-200",
      )}
    >
      <PostTitle link={link} title={title} />
      <PostDate date={date} className="-mb-1" />
      <PostShare socialMedia={socialMedia} seoTitle={seo?.title} />
      <PostImage
        link={link}
        src={image}
        srcMobile={seo?.image}
        alt={alt}
        borderRadius={10}
        height={265}
        width={750}
        heightMobile={170}
        widthMobile={310}
        preload={isFirst}
      />
      <PostContent content={excerpt} clamp={2} />
      <PostButton link={link} text={postButtonText} />
    </article>
  );
}

function NoPostsFound({ searchQuery }: { searchQuery?: string }) {
  return (
    <div class="flex flex-col items-center gap-6">
      <h2 class="font-quicksand text-center text-2xl md:text-3xl font-semibold text-base-content">
        {searchQuery
          ? "Nenhum resultado encontrado"
          : "Nenhuma postagem encontrada"}
      </h2>
      {searchQuery
        ? (
          <p class="max-w-xl text-center font-quicksand text-lg text-neutral">
            Não encontramos resultados para "
            <span class="text-neutral-600">{searchQuery}</span>". Tente usar
            termos diferentes ou explore outros conteúdos do nosso blog.
          </p>
        )
        : (
          <p class="max-w-xl text-center font-quicksand text-lg text-neutral">
            Não há postagens disponíveis no momento. Volte em breve para novos
            conteúdos.
          </p>
        )}
      {searchQuery && (
        <a
          href="/blog"
          class={clx(
            "mx-auto rounded-[100px] px-[30px] pt-[2px] leading-[48px] max-md:leading-[38px]",
            "bg-primary text-white duration-300 hover:bg-primary-focus",
            "font-quicksand text-base font-medium text-primary max-md:text-sm",
          )}
        >
          Ver todas as postagens
        </a>
      )}
    </div>
  );
}
