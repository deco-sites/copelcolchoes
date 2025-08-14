export function buildPageTitle(productName?: string) {
  const pageTitle = productName
    ? (productName.length >= 48
      ? `${productName.substring(0, 45)}... | Copel Colchões`
      : `${productName} | Copel Colchões`)
    : "Copel Colchões | A Maior Loja de Colchões";
  return pageTitle;
}

export function buildPageDescription(productDescription?: string) {
  const pageDescription = productDescription
    ? productDescription.split(/\r/)[0]
    : "";
  return pageDescription;
}
