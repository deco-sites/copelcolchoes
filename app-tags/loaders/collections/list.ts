import { allowCorsFor } from "@deco/deco";
import { AppContext } from "../../mod.ts";

interface Collection {
  id: number;
  name: string;
  searchable: boolean;
  highlight: boolean;
  dateFrom: string;
  dateTo: string;
  totalSku: number;
  totalProducts: number;
  type: "Manual" | "Automatic" | "Hybrid";
  lastModifiedBy?: string;
}

interface CollectionList {
  paging: {
    page: number;
    perPage: number;
    total: number;
    pages: number;
    limit: number;
  };
  items?: Collection[];
}

/**
 * @title Lista de Coleções
 * @description Buscar coleções da API da VTEX
 */
const loader = async (
  _props: unknown,
  req: Request,
  ctx: AppContext,
): Promise<{ value: string; label: string }[] | null> => {
  Object.entries(allowCorsFor(req)).map(([name, value]) => {
    ctx.response.headers.set(name, value);
  });

  const { account, appKey, appToken } = ctx.config;

  const authHeaders = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "X-VTEX-API-AppKey": typeof appKey === "string" ? appKey : appKey.get() ?? "",
    "X-VTEX-API-AppToken": typeof appToken === "string" ? appToken : appToken.get() ?? "",
  };

  try {
    // Fetch first page to get total pages count
    const firstQuery = new URLSearchParams({
      page: "1",
      perPage: "20",
      orderByAsc: "false",
    }).toString();

    const firstResponse = await fetch(
      `https://${account}.vtexcommercestable.com.br/api/catalog_system/pvt/collection/search?${firstQuery}`,
      { headers: authHeaders }
    );

    if (!firstResponse.ok) {
      console.log("First response error:", firstResponse.status, await firstResponse.text());
      throw new Error("Network response was not ok");
    }

    const firstPageData: CollectionList = await firstResponse.json();

    if (!firstPageData.items || firstPageData.items.length === 0) {
      return null;
    }

    const allCollections = [...firstPageData.items];

    // If more than one page, fetch remaining pages in parallel
    if (firstPageData.paging.pages > 1) {
      const pageRequests = [];
      
      for (let page = 2; page <= firstPageData.paging.pages; page++) {
        const query = new URLSearchParams({
          page: page.toString(),
          perPage: "20",
          orderByAsc: "false",
        }).toString();

        pageRequests.push(
          fetch(
            `https://${account}.vtexcommercestable.com.br/api/catalog_system/pvt/collection/search?${query}`,
            { headers: authHeaders }
          ).then(async (res) => {
            if (!res.ok) {
              console.log(`Page ${page} error:`, res.status, await res.text());
              throw new Error(`Network response was not ok for page ${page}`);
            }
            return res.json() as Promise<CollectionList>;
          })
        );
      }

      // Fetch all remaining pages in parallel
      const remainingPages = await Promise.all(pageRequests);
      
      // Merge all results
      for (const pageData of remainingPages) {
        if (pageData.items) {
          allCollections.push(...pageData.items);
        }
      }
    }

    return allCollections.map((collection) => ({
      value: collection.id.toString(),
      label: `${collection.id} - ${collection.name}`,
    }));
  } catch (error) {
    console.error("Error fetching collections:", error);
    return null;
  }
};

export default loader;
