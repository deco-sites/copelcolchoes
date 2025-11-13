import type { Product } from "apps/commerce/types.ts";
import { shouldShowFlag } from "../../app-tags/utils/matchers.ts";
import type { TagsConfig } from "../../app-tags/utils/types.ts";
import FlagCustomText from "./flags/FlagCustomText.tsx";

interface Props {
  product: Product;
  tags?: TagsConfig | null;
}

export default function ProductTags({ 
  product, 
  tags
}: Props) {
  if (!tags) return null;
  
  const { additionalProperty } = product;  

  return (
    <>
      {/* Custom text flags */}
      {tags.customFlags?.map((flag) => 
        shouldShowFlag({ name: flag.text, ...flag, enabled: flag.enabled ?? true }, additionalProperty) && (
          <FlagCustomText key={flag.text} flag={flag} />
        )
      )}
    </>
  );
}
