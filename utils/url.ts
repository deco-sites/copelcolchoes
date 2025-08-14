export const normalizeStringForUrl = (value: string | undefined): string => {
  if (!value) return "";

  return value
    .normalize("NFD")
    .replaceAll("/ ", "")
    .replace(/[\u0300-\u036f]/g, "")
    .replaceAll(" ", "_")
    .toLowerCase();
};

export const generateIconUrl = (value: string | undefined): string => {
  const normalizedValue = normalizeStringForUrl(value);
  return `/arquivos/icone_${normalizedValue}.svg`;
};
