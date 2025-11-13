import type { PropertyValue } from "apps/commerce/types.ts";

interface FlagWithTarget {
  name: string;
  enabled: boolean;
  startDate?: string;
  endDate?: string;
  target: {
    categoryId?: string;
    collectionId?: string;
  };
}

export const shouldShowFlag = (
  flag: FlagWithTarget,
  additionalProperty?: PropertyValue[]
): boolean => {
  if (flag.enabled === false) return false;
  
  if (!flag.target) return false;
  
  if (flag.startDate && flag.endDate) {
    const now = new Date();
    const start = new Date(flag.startDate);
    const end = new Date(flag.endDate);
    if (now < start || now > end) return false;
  }
  
  const { categoryId, collectionId } = flag.target;
  const hasCategoryId = categoryId && String(categoryId).trim() !== "";
  const hasCollectionId = collectionId && String(collectionId).trim() !== "";
  
  if (!hasCategoryId && !hasCollectionId) return false;
  
  if (!additionalProperty || additionalProperty.length === 0) return false;
  
  const matches = additionalProperty.some((prop) => {
    const propId = prop.propertyID ? String(prop.propertyID) : "";

    if (hasCategoryId && propId === String(categoryId)) {
      return true;
    }
    if (hasCollectionId && propId === String(collectionId)) {
      return true;
    }

    if (prop.value) {
      const valueStr = String(prop.value).trim();
      const categoryIdStr = hasCategoryId ? String(categoryId).trim() : "";
      const collectionIdStr = hasCollectionId ? String(collectionId).trim() : "";
      
      if ((categoryIdStr && valueStr === categoryIdStr) || 
          (collectionIdStr && valueStr === collectionIdStr)) {
        return true;
      }
      
      if (valueStr.includes(",")) {
        const values = valueStr.split(",").map(v => v.trim());
        if ((categoryIdStr && values.includes(categoryIdStr)) || 
            (collectionIdStr && values.includes(collectionIdStr))) {
          return true;
        }
      }
    }
    
    return false;
  });
  
  return matches;
};
