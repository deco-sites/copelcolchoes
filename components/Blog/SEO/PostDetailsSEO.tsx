import { type BlogPost } from "apps/blog/types.ts";
import { Head } from "$fresh/runtime.ts";
import { FALLBACK_BASE_URL } from "site/sdk/constants.ts";

interface Props {
  post?: BlogPost;
  baseUrl?: string;
  mostReadPosts?: BlogPost[];
}

function createSEOMetadata(post: BlogPost, baseUrl = "") {
  const seoTitle = post.seo?.title || post.title || "";
  return {
    title: `Copel Colchões | ${
      seoTitle.length > 48 ? `${seoTitle.slice(0, 45)}...` : seoTitle
    }`,
    description: (post.seo?.description?.length ?? 0) > 320
      ? `${post.seo?.description?.slice(0, 317)}...`
      : post.seo?.description ?? post.content,
    image: post.image || post.seo?.image,
    canonical: post.seo?.canonical ||
      `${baseUrl ?? FALLBACK_BASE_URL}/blog/${post.slug}`,
  };
}

function createSchemaOrgData(
  { post, mostReadPosts }: { post: BlogPost; mostReadPosts: BlogPost[] },
  baseUrl = "",
) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo?.description || post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    image: [post.image || post.seo?.image],
    articleBody: post.content.replace(/<[^>]*>/g, ""),
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${post.readTime}M`,
    keywords: post.extraProps?.find((p) => p.key === "keywords")?.value || "",
    author: {
      "@type": "Organization",
      name: post.authors?.[0]?.name ?? "Copel Colchões",
      email: post.authors?.[0]?.email,
      "@id": `${baseUrl ?? FALLBACK_BASE_URL}/quem-somos`,
    },
    publisher: {
      "@type": "Organization",
      name: "Copel Colchões",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl ?? FALLBACK_BASE_URL}/logo.png`,
        "@id": `${baseUrl ?? FALLBACK_BASE_URL}/#logo`,
      },
      "@id": `${baseUrl ?? FALLBACK_BASE_URL}/quem-somos`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl || FALLBACK_BASE_URL}/blog/${post.slug}`,
    },
    isPartOf: {
      "@type": "Blog",
      "@id": `${baseUrl ?? FALLBACK_BASE_URL}/blog`,
      "name": "Copel Colchões | Blog",
    },
    "hasPart": mostReadPosts?.map((relatedPost) => ({
      "@type": "BlogPosting",
      "headline": relatedPost.title,
      "url": `${baseUrl ?? FALLBACK_BASE_URL}/blog/${relatedPost.slug}`,
      "datePublished": relatedPost.date,
      "image": relatedPost.image || relatedPost.seo?.image,
      "author": {
        "@type": "Organization",
        "name": relatedPost.authors?.[0]?.name ?? "Copel Colchões",
      },
    })) ?? [],
  };
}

export default function PostDetailsSEO(
  { post, baseUrl = "", mostReadPosts = [] }: Props,
) {
  if (!post) return null;

  const seo = createSEOMetadata(post, baseUrl);
  const schemaOrg = createSchemaOrgData({ post, mostReadPosts }, baseUrl);

  return (
    <Head>
      {/* Open Graph */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      {seo.image && <meta property="og:image" content={seo.image} />}
      <meta property="og:site_name" content="Blog | Copel Colchões" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={post.alt} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      {seo.image && <meta name="twitter:image" content={seo.image} />}
      <meta name="twitter:site" content="@copelcolchoes" />
      <meta name="twitter:creator" content="@copelcolchoes" />
      <meta name="twitter:label1" content="Tempo de leitura" />
      <meta name="twitter:data1" content={`${post.readTime} minutos`} />
      <meta name="twitter:label2" content="Categoria" />
      <meta name="twitter:data2" content={post.categories?.[0]?.name} />

      {/* Article metadata */}
      <meta property="article:published_time" content={post.date} />
      <meta property="article:author" content={post.authors?.[0]?.name} />
      <meta property="article:section" content={post.categories?.[0]?.name} />
      <meta
        property="article:tag"
        content={post.extraProps?.find((p) => p.key === "tags")?.value}
      />
      <meta property="article:read_time" content={`${post.readTime} minutes`} />

      <script
        type="application/ld+json"
        // deno-lint-ignore react-no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
    </Head>
  );
}
