import { type BlogPost } from "apps/blog/types.ts";
import { clx } from "site/sdk/clx.ts";
import PostImage from "site/components/Blog/PostImage.tsx";
import PostTitle from "site/components/Blog/PostTitle.tsx";
import PostContent from "site/components/Blog/PostContent.tsx";
import PostButton from "site/components/Blog/PostButton.tsx";

export interface Props {
  title?: string;
  posts?: BlogPost[];
  buttonText?: string;
}

export default function MostReadPostsList({
  title = "Posts mais acessados",
  posts,
  buttonText = "Saiba mais",
}: Props) {
  if (!posts?.length) {
    return null;
  }

  return (
    <div class="flex flex-col gap-y-[30px]">
      <h2 class="font-quicksand text-xl md:text-2xl font-semibold text-base-content">
        {title}
      </h2>
      <div class="grid grid-cols-[1fr] gap-[30px] md:grid-cols-[repeat(2,380px)]">
        {posts.map((post) => (
          <PostItem key={post.slug} {...post} postButtonText={buttonText} />
        ))}
      </div>
    </div>
  );
}

function PostItem({
  title,
  image,
  excerpt,
  slug,
  alt,
  postButtonText = "Saiba mais",
  seo,
}: BlogPost & { postButtonText?: string }) {
  const link = `/blog/${slug}`;
  return (
    <article
      class={clx(
        "flex flex-col gap-y-5 rounded-[10px] px-[20px] py-[30px]",
        "bg-neutral-100 border border-neutral-200",
      )}
    >
      <PostImage
        link={link}
        srcMobile={seo?.image || image}
        alt={alt}
        borderRadius={10}
        height={180}
        width={340}
        heightMobile={170}
        widthMobile={310}
      />
      <PostTitle
        link={link}
        title={title}
        heading="h3"
        clamp={2}
        fontSizeDesktop={24}
        fontSizeMobile={20}
        className="leading-6 lg:leading-7"
      />
      <PostContent content={excerpt} />
      <PostButton link={link} text={postButtonText} />
    </article>
  );
}
