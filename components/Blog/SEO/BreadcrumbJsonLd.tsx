import { Head } from "$fresh/runtime.ts";
import { type BreadcrumbItem } from "site/sections/Blog/BlogBreadcrumb.tsx";
import { FALLBACK_BASE_URL } from "site/sdk/constants.ts";

export default function BreadcrumbJsonLd({
  items,
  baseUrl,
}: {
  items: BreadcrumbItem[];
  baseUrl?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl ?? FALLBACK_BASE_URL,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${baseUrl ?? FALLBACK_BASE_URL}/blog`,
      },
      ...items.map((item, idx) => ({
        "@type": "ListItem",
        "position": idx + 3,
        "name": item.title,
        "item": item.link
          ? `${baseUrl ?? FALLBACK_BASE_URL}${item.link}`
          : undefined,
        "@id": item.link
          ? `${baseUrl ?? FALLBACK_BASE_URL}${item.link}`
          : undefined,
      })),
    ],
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
