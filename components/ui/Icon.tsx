import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export type PaymentIcons =
  | "Visa"
  | "Elo"
  | "Mastercard"
  | "Visa"
  | "Pix"
  | "AmericanExpress"
  | "Boleto";

export type SocialIcons =
  | "Twitter"
  | "Linkedin"
  | "Pinterest"
  | "YouTube"
  | "Tiktok"
  | "WhatsApp"
  | "Instagram"
  | "Facebook"
  | "YouTubeOutline"
  | "WhatsAppOutline"
  | "InstagramOutline"
  | "FacebookOutline";
export type AvailableIcons =
  | "Refresh"
  | "Menu"
  | "ChevronLeft"
  | "ChevronRight"
  | "ChevronUp"
  | "ChevronDown"
  | "QuestionMarkCircle"
  | "User"
  | "UserMobile"
  | "ShoppingCart"
  | "ShoppingCartMobile"
  | "Bars3"
  | "Heart"
  | "MagnifyingGlass"
  | "searchResultsClose"
  | "IconMenuOutlet"
  | "MagnifyingGlassPlus"
  | "XMark"
  | "XMarkMobile"
  | "HighlightedMobile"
  | "Televendas"
  | "XMarkModal"
  | "Plus"
  | "Minus"
  | "MapPin"
  | "Phone"
  | "Logo"
  | "LogoFooter"
  | "LogoMobile"
  | "Truck"
  | "Discount"
  | "Return"
  | "Deco"
  | "Discord"
  | "Email"
  | "Trash"
  | "TrashCart"
  | "FilterList"
  | "ArrowsPointingOut"
  | "WhatsApp"
  | "ArrowsPointingOut"
  | "checkIcon"
  | "SearchBar"
  | "ArrowRight"
  | "ArrowLeft"
  | "LogoSeo"
  | "ReturnArrow"
  | "SadFace"
  | "LeftArrowFigma"
  | "RightArrowFigma"
  | "Chat"
  | "ChatCustom"
  | "Lojas"
  | "LojasMobile"
  | "WhatsappModal"
  | "AllCategories"
  | "DeleteFilter"
  | "CheckFilter"
  | "NextProductImage"
  | "PrevProductImage"
  | "BlackFriday"
  | "ShareCopel"
  | "Star"
  | "HalfStar"
  | `ShareProduct${string}`
  | "ReviewUser"
  | "ReviewCheck"
  | "BackToTop";

interface Props extends JSX.SVGAttributes<SVGSVGElement> {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   *
   * Example: <Icon id="Bell" />
   */
  id: AvailableIcons | SocialIcons | PaymentIcons;
  size?: number;
}

function Icon({
  id,
  strokeWidth = 16,
  size,
  width,
  height,
  ...otherProps
}: Props) {
  return (
    <svg
      {...otherProps}
      width={width ?? size}
      height={height ?? size}
      strokeWidth={strokeWidth}
    >
      <use href={asset(`/sprites.svg#${id}`)} />
    </svg>
  );
}

export default Icon;