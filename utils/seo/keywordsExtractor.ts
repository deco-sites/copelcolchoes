import { Product } from "apps/commerce/types.ts";
import { ProductSpecifications } from "$store/utils/seo/productDataProcessor.ts";

export interface KeywordExtractionData {
  product: Product;
  category?: string[];
  specifications: ProductSpecifications;
  fullProductName?: string;
  productDescription?: string;
  getSpecValue: (name: string) => string | undefined;
}

interface KeywordPattern {
  priority: number;
  keywords: string[];
}

function extractMeasurements(text: string): string[] {
  const measurements = [];

  const dimensionMatches = text.match(/\d+x\d+/gi);
  if (dimensionMatches) {
    measurements.push(...dimensionMatches.map((m) => m.toLowerCase()));
  }

  const measurementMatches = text.match(/\d+\s?(cm|mm|m)\b/gi);
  if (measurementMatches) {
    measurements.push(
      ...measurementMatches.map((m) => m.replace(/\s+/g, "").toLowerCase()),
    );
  }

  return [...new Set(measurements)];
}

function extractProductAttributes(text: string): string[] {
  const attributes: string[] = [];
  const lowerText = text.toLowerCase();

  const attributePatterns = [
    /\b(gaveta|gavetas)\b/gi,
    /\b(bipartido|inteiriço)\b/gi,
    /\b(universal)\b/gi,
    /\b(queen|king|solteiro|casal)\s?(size|padrão)?\b/gi,
    /\b(madeira|mdf|eucalipto|metal|ferro)\b/gi,
    /\b(com\s+pés|sem\s+pés)\b/gi,
    /\b(cabeceira|painel|base|box)\b/gi,
  ];

  attributePatterns.forEach((pattern) => {
    const matches = lowerText.match(pattern);
    if (matches) {
      attributes.push(...matches.map((m) => m.trim()));
    }
  });

  return [...new Set(attributes)];
}

function buildCompositeKeywords(components: {
  productType?: string;
  size?: string;
  features?: string[];
  measurements?: string[];
  brand?: string;
}): string[] {
  const { productType, size, features = [], measurements = [], brand } =
    components;
  const keywords: KeywordPattern[] = [];

  if (productType && size && features.length > 0) {
    keywords.push({
      priority: 1,
      keywords: [
        `${productType} ${size} ${features[0]}${
          measurements[0] ? " " + measurements[0] : ""
        }`,
        features.length > 1
          ? `${productType} ${size} ${features.join(" ")}`
          : null,
      ].filter(Boolean) as string[],
    });
  }

  if (productType && measurements.length > 0) {
    keywords.push({
      priority: 2,
      keywords: measurements.map((m) => `${productType} ${m}`),
    });
  }

  if (productType && brand) {
    keywords.push({
      priority: 3,
      keywords: [`${productType} ${brand.toLowerCase()}`],
    });
  }

  if (features.length >= 2) {
    keywords.push({
      priority: 4,
      keywords: [
        `${features.slice(0, 2).join(" ")} ${productType || ""}`.trim(),
      ],
    });
  }

  return keywords
    .sort((a, b) => a.priority - b.priority)
    .flatMap((k) => k.keywords)
    .filter((k) => k && k.length > 10 && k.length < 60); // Reasonable keyword length
}

export function extractKeywordsFromDescription(description: string): string[] {
  const keywords: string[] = [];
  const cleanDesc = description.replace(/<[^>]*>/g, "").toLowerCase();

  keywords.push(...extractMeasurements(cleanDesc));

  keywords.push(...extractProductAttributes(cleanDesc));

  const sentences = cleanDesc.split(/[.!?]+/);
  sentences.forEach((sentence) => {
    const words = sentence.trim().split(/\s+/).filter((w) => w.length > 2);
    if (words.length >= 3 && words.length <= 5) {
      const phrase = words.join(" ");
      if (phrase.length > 10 && phrase.length < 40) {
        keywords.push(phrase);
      }
    }
  });

  return [...new Set(keywords)];
}

export function cleanupKeywords(
  rawKeywords: string[],
  data: KeywordExtractionData,
): string[] {
  const { product, getSpecValue, fullProductName } = data;

  const productName = (fullProductName || product.name || "").toLowerCase();
  const brand = product.brand?.name?.toLowerCase();

  const productTypes = [
    "cama box",
    "colchão",
    "base",
    "cabeceira",
    "painel",
    "móvel",
  ];
  const productType = productTypes.find((type) => productName.includes(type)) ||
    (product.category?.split(">").pop()?.trim().toLowerCase() || "");

  const sizePatterns = [
    "casal",
    "solteiro",
    "queen",
    "king",
    "queen size",
    "king size",
  ];
  const size = sizePatterns.find((s) => productName.includes(s)) || "";

  const features = extractProductAttributes(productName);

  const measurementSpecs = [
    "Medidas",
    "Altura",
    "Box",
    "Pés",
    "Largura",
    "Comprimento",
  ];
  const measurements: string[] = [];

  measurementSpecs.forEach((spec) => {
    const value = getSpecValue(spec);
    if (value) {
      measurements.push(...extractMeasurements(value));
    }
  });

  rawKeywords.forEach((keyword) => {
    if (typeof keyword === "string") {
      measurements.push(...extractMeasurements(keyword));
    }
  });

  const compositeKeywords = buildCompositeKeywords({
    productType,
    size,
    features: [...new Set(features)],
    measurements: [...new Set(measurements)],
    brand,
  });

  const specificKeywords: string[] = [];

  const altura = getSpecValue("Altura");
  if (altura && productType) {
    const heightMatch = altura.match(/(\d+)\s*cm/i);
    if (heightMatch) {
      specificKeywords.push(`${productType} ${heightMatch[1]}cm altura`);
      if (altura.toLowerCase().includes("pés")) {
        specificKeywords.push(`${productType} com pés ${heightMatch[1]}cm`);
      }
    }
  }

  if (features.includes("gavetas") || features.includes("gaveta")) {
    const gavetaCount = productName.match(/(\d+)\s*gaveta/i)?.[1];
    if (gavetaCount && size && measurements[0]) {
      specificKeywords.push(
        `${productType} ${size} ${gavetaCount} gavetas ${measurements[0]}`,
      );
    }
  }

  const allKeywords = [
    ...compositeKeywords,
    ...specificKeywords,
  ].filter((k) => k && k.trim().length > 10);

  return [...new Set(allKeywords)]
    .filter((k) => !k.includes("undefined") && !k.includes("null"))
    .slice(0, 8);
}

export function generateProductKeywords(data: KeywordExtractionData): string {
  const { product, category, productDescription, getSpecValue } = data;

  const rawKeywords: string[] = [];

  if (category && category.length > 0) {
    rawKeywords.push(...category.slice(-2));
  }

  if (product.brand?.name) {
    rawKeywords.push(product.brand.name);
  }

  const importantSpecs = [
    "Medidas",
    "Altura",
    "Largura",
    "Comprimento",
    "Para",
    "Tipo",
  ];
  importantSpecs.forEach((specName) => {
    const value = getSpecValue(specName);
    if (value && value.toLowerCase() !== "não possui" && value.trim() !== "") {
      rawKeywords.push(value);
    }
  });

  if (productDescription) {
    rawKeywords.push(...extractKeywordsFromDescription(productDescription));
  }

  if (product.name) {
    rawKeywords.push(...extractProductAttributes(product.name));
  }

  const cleanedKeywords = cleanupKeywords(rawKeywords, data);

  return cleanedKeywords.join(", ");
}
