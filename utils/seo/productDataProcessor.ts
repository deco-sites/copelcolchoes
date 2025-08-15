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

type GTINMap = Partial<
  Record<"gtin8" | "gtin12" | "gtin13" | "gtin14" | "upce", string>
>;

const NAME_TO_TYPE: Array<[RegExp, keyof GTINMap]> = [
  [/\b(gtin[-\s]?14|ean[-\s]?14)\b/i, "gtin14"],
  [/\b(gtin[-\s]?13|ean[-\s]?13|\bean\b)/i, "gtin13"],
  [/\b(gtin[-\s]?12|upc(?:[-\s]?a)?|\bupc\b)/i, "gtin12"],
  [/\b(gtin[-\s]?8|ean[-\s]?8)\b/i, "gtin8"],
  [/\bupc[-\s]?e\b/i, "upce"],
];

function digitsOnly(x: unknown): string {
  return String(x ?? "").replace(/\D/g, "");
}

function detectTypeByLength(len: number): keyof GTINMap | undefined {
  if (len === 8) return "gtin8";
  if (len === 12) return "gtin12";
  if (len === 13) return "gtin13";
  if (len === 14) return "gtin14";
  return undefined;
}

function isValidGTIN(code: string): boolean {
  const len = code.length;
  if (![8, 12, 13, 14].includes(len)) return false;
  const body = code.slice(0, -1);
  const check = Number(code.slice(-1));
  let sum = 0;
  for (let i = body.length - 1, pos = 1; i >= 0; i--, pos++) {
    const n = body.charCodeAt(i) - 48;
    sum += (pos % 2 === 1 ? 3 : 1) * n;
  }
  const calc = (10 - (sum % 10)) % 10;
  return calc === check;
}

export function extractGTIN(
  productSpecifications: ProductSpecifications,
): GTINMap {
  const out: GTINMap = {};
  for (const spec of productSpecifications.specifications ?? []) {
    const name = spec.name ?? "";
    const valueDigits = digitsOnly(spec.value);
    if (!valueDigits) continue;
    let typeFromName: keyof GTINMap | undefined;
    for (const [re, t] of NAME_TO_TYPE) {
      if (re.test(name)) {
        typeFromName = t;
        break;
      }
    }
    const typeFromLen = detectTypeByLength(valueDigits.length);
    let finalType = typeFromLen ?? typeFromName;
    if (!finalType && /upc[-\s]?e/i.test(name)) finalType = "upce";
    const isGTIN = finalType !== "upce";
    if (isGTIN && !isValidGTIN(valueDigits)) continue;
    if (finalType && !out[finalType]) out[finalType] = valueDigits;
  }
  if (!Object.keys(out).length) {
    const top = digitsOnly(productSpecifications.gtin);
    if (top) {
      const t = detectTypeByLength(top.length);
      if (t && isValidGTIN(top) && !out[t]) out[t] = top;
    }
  }
  return out;
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
