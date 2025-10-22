import { type AppContext } from "site/apps/site.ts";
import { type Section } from "@deco/deco/blocks";
import { type SectionProps } from "@deco/deco";
import { type BlogPost } from "apps/blog/types.ts";
import { type SocialMedia } from "site/components/Blog/PostShare.tsx";
import { type Category } from "site/components/Blog/SidebarCategories.tsx";
import { type Tag } from "site/components/Blog/SidebarTags.tsx";
import {
  fetchPosts,
  getMostReadPosts,
  getUniqueCategories,
  getUniqueTags,
} from "site/sdk/posts.ts";
import { populateSidebar } from "site/sdk/blogSidebar.tsx";
import PostDetails from "site/components/Blog/PostDetails.tsx";
import PostContainer from "site/components/Blog/PostContainer.tsx";
import MostReadPostsList from "site/components/Blog/MostReadPostsList.tsx";
import PostDetailsSEO from "site/components/Blog/SEO/PostDetailsSEO.tsx";
import { Head } from "$fresh/runtime.ts";

interface BlogPostDetail {
  /**
   * @ignore
   */
  post: BlogPost;
  /**
   * @ignore
   */
  categories: Category[];
  /**
   * @ignore
   */
  tags: Tag[];
  /**
   * @ignore
   */
  mostReadPosts?: BlogPost[];
  /**
   * @ignore
   */
  baseUrl?: string;
  /**
   * @ignore
   */
  isMobile?: boolean;
  /**
   * @title Título da mensagem de post não encontrado
   */
  postNotFoundTitle?: string;
  /**
   * @title Texto da mensagem de post não encontrado
   */
  postNotFoundText?: string;
  /**
   * @title Texto do botão de post não encontrado
   */
  postNotFoundLinkText?: string;
  /**
   * @title Link do botão de post não encontrado
   */
  postNotFoundLink?: string;
  /**
   * @title Rede social para compartilhar o post
   */
  socialMedia?: SocialMedia[];
  /**
   * @title Título das tags
   */
  tagsTitle?: string;
  /**
   * @title Sidebar
   */
  sidebar?: Section[];
  /**
   * @title Título da lista de posts mais acessados
   */
  mostReadPostsTitle?: string;
  /**
   * @title Quantidade de posts mais acessados
   * @description Padrão: 4
   */
  mostReadPostsLimit?: number;
  /**
   * @title Texto do botão dos posts mais acessados
   */
  mostReadPostsButtonText?: string;
}

export default function BlogPostDetail({
  post,
  categories,
  tags,
  postNotFoundTitle,
  postNotFoundText,
  postNotFoundLinkText,
  postNotFoundLink,
  socialMedia,
  tagsTitle,
  sidebar,
  mostReadPostsTitle,
  mostReadPosts,
  mostReadPostsButtonText,
  baseUrl,
  isMobile,
}: SectionProps<typeof loader>) {
  const Sidebar = populateSidebar(sidebar, categories, tags);

  return (
    <>
      <Head>
        <title>
          {post?.title ||
            "Blog | Copel Colchões"}
        </title>
        <meta
          name="description"
          content={post?.seo?.description}
        />
      </Head>

      <div class="flex flex-col mx-auto max-w-[1440px]">
        <PostContainer>
          <PostDetails
            post={post}
            socialMedia={socialMedia}
            tagsTitle={tagsTitle}
            postNotFoundTitle={postNotFoundTitle}
            postNotFoundText={postNotFoundText}
            postNotFoundLinkText={postNotFoundLinkText}
            postNotFoundLink={postNotFoundLink}
          />
          {!isMobile && Sidebar}
        </PostContainer>
        <PostContainer>
          <MostReadPostsList
            title={mostReadPostsTitle}
            posts={mostReadPosts}
            buttonText={mostReadPostsButtonText}
          />
        </PostContainer>
        {isMobile && Sidebar}
      </div>
      <PostDetailsSEO
        post={post}
        mostReadPosts={mostReadPosts}
        baseUrl={baseUrl}
      />
    </>
  );
}

export async function loader(
  props: BlogPostDetail,
  req: Request,
  ctx: AppContext,
) {
  const url = new URL(req.url);
  const slug = url.pathname.split("/blog/")[1] ?? "";

  const posts = await fetchPosts(ctx);
  const post = posts.find((post) =>
    post.slug.trim().toLowerCase() === slug.trim().toLowerCase()
  );

  const categories = getUniqueCategories(posts);
  const tags = getUniqueTags(posts);

  if (post) {
    await ctx.invoke("site/actions/blog/countView.ts", { postSlug: slug });
  }

  const { topViewedPosts } = await ctx.invoke.site.loaders.posts.views({
    top: 4,
  });

  const mostReadSlugs = topViewedPosts.map(
    ({ postSlug }) => postSlug,
  ) as string[];
  const mostReadPosts = getMostReadPosts(
    [...posts],
    mostReadSlugs,
    props.mostReadPostsLimit ?? 4,
  );

  return {
    ...props,
    post,
    categories,
    tags,
    mostReadPosts,
    baseUrl: url.origin,
    isMobile: ctx.device !== "desktop",
  };
}
