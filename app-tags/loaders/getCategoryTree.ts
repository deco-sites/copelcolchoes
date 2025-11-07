import { allowCorsFor } from "@deco/deco";
import { AppContext } from "../mod.ts";

interface Category {
  id: number;
  name: string;
  hasChildren: boolean;
  url: string;
  children: Category[];
}

interface OrganizedCategory {
  value: string;
  label: string;
}

interface PropsCategory {
  accountName: string;
}

/**
 * @title Árvore de Categorias
 * @description Buscar categorias da API da VTEX
 */
const loader = async (
  _props: PropsCategory,
  req: Request,
  ctx: AppContext,
): Promise<OrganizedCategory[] | null> => {
  Object.entries(allowCorsFor(req)).map(([name, value]) => {
    ctx.response.headers.set(name, value);
  });

  const { account, appKey, appToken } = ctx.config;

  try {
    const response = await fetch(
      `https://${account}.vtexcommercestable.com.br/api/catalog_system/pub/category/tree/1`,
      {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "X-VTEX-API-AppKey": typeof appKey === "string" ? appKey : appKey.get() ?? "",
          "X-VTEX-API-AppToken": typeof appToken === "string" ? appToken : appToken.get() ?? "",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const categories: Category[] = await response.json();
    const organizedCategories = organizeCategories(categories);

    return organizedCategories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
};

function organizeCategories(categories: Category[]): OrganizedCategory[] {
  const organized: OrganizedCategory[] = [];

  for (const category of categories) {
    organized.push({
      value: category.id.toString(),
      label: `${category.id} - ${category.name}`,
    });

    if (category.hasChildren && category.children) {
      const childCategories = organizeCategories(category.children);
      organized.push(...childCategories);
    }
  }

  return organized;
}

export default loader;
