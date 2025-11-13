import type { CustomTextFlag, FlagPosition, FontSize, FontWeight } from "../../../app-tags/utils/types.ts";
import Image from "apps/website/components/Image.tsx";

interface Props {
  flag: CustomTextFlag;
}

const positionMap: Record<FlagPosition, string> = {
  "superior-esquerdo": "top-2 left-3 lg:left-4",
  "superior-centro": "top-2 left-1/2 transform -translate-x-1/2",
  "superior-direito": "top-2 right-3 lg:right-4",
  "inferior-esquerdo": "bottom-0 left-3 lg:left-4",
  "inferior-centro": "bottom-0 left-1/2 transform -translate-x-1/2",
  "inferior-direito": "bottom-0 right-3 lg:right-4",
  "centro": "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
};

const marginMap: Record<FlagPosition, string> = {
  "superior-esquerdo": "[&>*]:mr-auto",
  "superior-centro": "[&>*]:mx-auto",
  "superior-direito": "[&>*]:ml-auto",
  "inferior-esquerdo": "[&>*]:mr-auto",
  "inferior-centro": "[&>*]:mx-auto",
  "inferior-direito": "[&>*]:ml-auto",
  "centro": "[&>*]:mx-auto",
};

const fontSizeMap: Record<FontSize, string> = {
  "pequeno": "12px",
  "medio": "14px",
  "grande": "16px",
};

const fontWeightMap: Record<FontWeight, string> = {
  "leve": "300",
  "normal": "400",
  "medio": "500",
  "semi-negrito": "600",
  "negrito": "700",
};

function getPositionStyles(
  position: FlagPosition,
  offsetX: number,
  offsetY: number,
  baseSpacing: number
): Record<string, string> {
  const styles: Record<string, string> = {};
  
  switch (position) {
    case "superior-esquerdo":
      styles.top = `${baseSpacing + offsetY}px`;
      styles.left = `${baseSpacing + offsetX}px`;
      break;
    case "superior-centro":
      styles.top = `${baseSpacing + offsetY}px`;
      styles.left = "50%";
      styles.transform = "translateX(-50%)";
      break;
    case "superior-direito":
      styles.top = `${baseSpacing + offsetY}px`;
      styles.right = `${baseSpacing - offsetX}px`;
      break;
    case "inferior-esquerdo":
      styles.bottom = `${baseSpacing - offsetY}px`;
      styles.left = `${baseSpacing + offsetX}px`;
      break;
    case "inferior-centro":
      styles.bottom = `${baseSpacing - offsetY}px`;
      styles.left = "50%";
      styles.transform = "translateX(-50%)";
      break;
    case "inferior-direito":
      styles.bottom = `${baseSpacing - offsetY}px`;
      styles.right = `${baseSpacing - offsetX}px`;
      break;
    case "centro":
      styles.top = "50%";
      styles.left = "50%";
      styles.transform = "translate(-50%, -50%)";
      break;
    default:
      styles.top = `${baseSpacing + offsetY}px`;
      styles.left = `${baseSpacing + offsetX}px`;
  }
  
  return styles;
}

function buildResponsiveCSS(
  flagId: string,
  mobileStyles: Record<string, string>,
  desktopStyles: Record<string, string>
): string {
  const mobileCSS = Object.entries(mobileStyles)
    .map(([key, value]) => `${key}: ${value};`)
    .join(" ");
  
  const desktopCSS = Object.entries(desktopStyles)
    .map(([key, value]) => `${key}: ${value};`)
    .join(" ");
  
  return `
    [data-flag-id="${flagId}"] {
      ${mobileCSS}
    }
    @media (min-width: 1024px) {
      [data-flag-id="${flagId}"] {
        ${desktopCSS}
      }
    }
  `;
}

export default function FlagCustomText({ flag }: Props) {
  const {
    text,
    textColor = "#FFFFFF",
    backgroundColor = "#D81A4D",
    borderColor = "#D81A4D",
    position = "superior-esquerdo",
    icon,
    iconPosition = "esquerda",
    offset,
    paddingX = 8,
    paddingY = 4,
    borderWidth = 1,
    borderRadius = 16,
    iconSize = 16,
    fontSize = "medio",
    fontWeight = "medio",
  } = flag;

  const offsetXMobile = offset?.offsetXMobile ?? 0;
  const offsetXDesktop = offset?.offsetXDesktop ?? 0;
  const offsetYMobile = offset?.offsetYMobile ?? 0;
  const offsetYDesktop = offset?.offsetYDesktop ?? 0;

  const hasOffsets = offsetXDesktop !== 0 || offsetYDesktop !== 0 ||
    offsetXMobile !== 0 || offsetYMobile !== 0;

  const flagId = hasOffsets 
    ? `flag-${Math.random().toString(36).substr(2, 9)}`
    : undefined;

  const positionClasses = !hasOffsets 
    ? (positionMap[position] || positionMap["superior-esquerdo"]) 
    : "";

  const marginClasses = marginMap[position] || marginMap["superior-esquerdo"];

  const mobileStyles = hasOffsets 
    ? getPositionStyles(position, offsetXMobile, offsetYMobile, 12) 
    : {};
  const desktopStyles = hasOffsets 
    ? getPositionStyles(position, offsetXDesktop, offsetYDesktop, 16) 
    : {};

  const textStyle = {
    fontSize: fontSizeMap[fontSize],
    fontWeight: fontWeightMap[fontWeight],
  };

  return (
    <>
      {hasOffsets && flagId && (
        <style 
          type="text/css"
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ 
            __html: buildResponsiveCSS(flagId, mobileStyles, desktopStyles) 
          }}
        />
      )}
      <div
        class={`absolute z-20 w-full ${positionClasses} ${marginClasses}`}
        data-flag-id={flagId}
        style={hasOffsets ? {} : undefined}
      >
        <div
          class="flex items-center justify-center gap-1 w-fit max-w-[85%]"
          style={{
            backgroundColor,
            color: textColor,
            paddingLeft: `${paddingX}px`,
            paddingRight: `${paddingX}px`,
            paddingTop: `${paddingY}px`,
            paddingBottom: `${paddingY}px`,
            ...(borderColor && borderWidth > 0 && {
              borderColor,
              borderWidth: `${borderWidth}px`,
              borderStyle: "solid",
            }),
            borderRadius: `${borderRadius}px`,
          }}
        >
          {icon && iconPosition === "esquerda" && (
            <div class="flex items-center">
              <Image
                src={icon}
                width={iconSize}
                height={iconSize}
                alt="Flag icon"
                class="flex-shrink-0"
              />
            </div>
          )}
          <span style={textStyle} class="whitespace-nowrap truncate">{text}</span>
          {icon && iconPosition === "direita" && (
            <div class="flex items-center">
              <Image
                src={icon}
                width={iconSize}
                height={iconSize}
                alt="Flag icon"
                class="flex-shrink-0"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
