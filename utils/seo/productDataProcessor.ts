import { Product } from "apps/commerce/types.ts";

export interface ProductCategories {
  category: string[];
}

export interface ProductSpecifications {
  gtin: string;
  mpn: string;
  specifications: Array<{
    name?: string;
    value?: string;
    valueReference?: string;
  }>;
}

export interface ProductWeight {
  value: number;
  unitCode: string;
}

export function extractProductCategories(product: Product): ProductCategories {
  const categoryProperty = product.additionalProperty?.find(
    (prop) => prop.name === "category" && prop.propertyID === "3",
  );
  const subcategoryProperty = product.additionalProperty?.find(
    (prop) => prop.name === "category" && prop.propertyID === "5",
  );

  const category: string[] = [];
  if (categoryProperty?.value) category.push(categoryProperty.value);
  if (subcategoryProperty?.value) category.push(subcategoryProperty.value);

  return { category };
}

export function extractProductSpecifications(
  product: Product,
): ProductSpecifications {
  const gtin = product.gtin || "";
  const refIdProperty = product.additionalProperty?.find(
    (prop) => prop.name === "RefId" && prop.valueReference === "ReferenceID",
  );
  const mpn = refIdProperty?.value || "";

  const allProperties = [
    ...(product.additionalProperty || []),
    ...(product.isVariantOf?.additionalProperty || []),
  ];

  const specifications =
    allProperties.filter((prop) =>
      prop.valueReference === "SPECIFICATION" ||
      prop.valueReference === "PROPERTY"
    ) || [];

  return { gtin, mpn, specifications };
}

export function getSpecificationValue(
  specifications: ProductSpecifications["specifications"],
  name: string,
): string {
  return specifications.find((spec) =>
    spec.name?.toLowerCase().includes(name.toLowerCase())
  )?.value || "";
}

export function extractProductWeight(
  specifications: ProductSpecifications["specifications"],
): ProductWeight | null {
  const weightSpec = specifications.find((spec) =>
    spec.name?.toLowerCase().includes("peso") ||
    spec.name?.toLowerCase().includes("weight")
  );

  if (weightSpec?.value) {
    const weightMatch = weightSpec.value.match(/(\d+(?:\.\d+)?)\s*(kg|g|lb)/i);
    if (weightMatch) {
      return {
        value: parseFloat(weightMatch[1]),
        unitCode: weightMatch[2].toUpperCase() === "KG"
          ? "KGM"
          : weightMatch[2].toUpperCase() === "G"
          ? "GRM"
          : "LBR",
      };
    }
  }
  return null;
}

export function extractAdditionalGTINs(
  specifications: ProductSpecifications["specifications"],
): { [key: string]: string } {
  const gtins: { [key: string]: string } = {};

  specifications.forEach((spec) => {
    if (
      spec.name?.toLowerCase().includes("gtin") ||
      spec.name?.toLowerCase().includes("ean") ||
      spec.name?.toLowerCase().includes("upc")
    ) {
      const gtinType = spec.name.toLowerCase().includes("gtin-13")
        ? "gtin13"
        : spec.name.toLowerCase().includes("gtin-14")
        ? "gtin14"
        : spec.name.toLowerCase().includes("ean")
        ? "gtin13"
        : spec.name.toLowerCase().includes("upc")
        ? "gtin12"
        : "gtin";
      gtins[gtinType] = spec.value || "";
    }
  });

  return gtins;
}

export function buildAdditionalProperties(
  specifications: ProductSpecifications["specifications"],
) {
  const props: {
    "@type": string;
    name: string;
    value: string;
    valueReference?: string;
  }[] = [];

  const coreSpecs = [
    "Medidas",
    "Altura",
    "Altura (cm)",
    "Largura",
    "Largura (cm)",
    "Comprimento",
    "Comprimento (cm)",
    "Garantia",
    "Estrutura",
    "Marca",
    "Revestimento",
  ];

  coreSpecs.forEach((specName) => {
    const value = getSpecificationValue(specifications, specName);
    if (value) {
      props.push({
        "@type": "PropertyValue",
        "name": specName,
        "value": value,
        "valueReference": "SPECIFICATION",
      });
    }
  });

  return props;
}

export function parseHeightValue(heightStr: string): number | string {
  let heightValue: number | string = heightStr;
  const heightMatches = heightStr.match(/(\d+(?:[.,]\d+)?)\s*(?:cm)?/g);
  console.log(heightStr, heightMatches);
  if (heightMatches && heightMatches.length > 0) {
    const lastMatch = heightMatches[heightMatches.length - 1];
    const numberMatch = lastMatch.match(/(\d+(?:[.,]\d+)?)/);
    if (numberMatch) {
      heightValue = parseFloat(numberMatch[1].replace(",", "."));
    }
  }
  return heightValue;
}

export function parseWidthValue(widthStr: string): number | string {
  return parseFloat(widthStr.replace(",", "."));
}
