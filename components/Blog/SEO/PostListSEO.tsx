import { Head } from "$fresh/runtime.ts";
import { type BlogPost } from "apps/blog/types.ts";
import { FALLBACK_BASE_URL } from "site/sdk/constants.ts";

type Props = {
  posts: BlogPost[];
  baseUrl?: string;
};

export default function PostListSEO({ posts, baseUrl }: Props) {
  const uniquePosts = Array.from(
    new Set(posts.map((post) => post.slug)),
  )
    .map((slug) => posts.find((post) => post.slug === slug))
    .filter((post): post is BlogPost => post !== undefined);
  const data = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Copel Colchões | Blog",
    description: "Artigos sobre e-commerce, marketing digital e tecnologia",
    url: `${baseUrl ?? FALLBACK_BASE_URL}/blog`,
    inLanguage: "pt-BR",
    publisher: {
      "@type": "Organization",
      name: "Copel Colchões",
      "@id": `${baseUrl ?? FALLBACK_BASE_URL}/nossas-lojas`,
    },
    blogPost: uniquePosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      image: post.image || post.seo?.image,
      articleSection: post.categories?.[0]?.name,
      keywords: post.extraProps?.find((p) => p.key === "keywords")?.value,
      author: {
        "@type": "Organization",
        name: post.authors?.[0]?.name,
      },
      url: `${baseUrl ?? FALLBACK_BASE_URL}/blog/${post.slug}`,
      timeRequired: `PT${post.readTime}M`,
    })),
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        // deno-lint-ignore react-no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    </Head>
  );
}
