import { Color, ImageWidget } from "apps/admin/widgets.ts";

export type FlagPosition = 
  | "superior-esquerdo" | "superior-centro" | "superior-direito"
  | "inferior-esquerdo" | "inferior-centro" | "inferior-direito"
  | "centro";

export type FontSize = "pequeno" | "medio" | "grande";
export type FontWeight = "leve" | "normal" | "medio" | "semi-negrito" | "negrito";

interface TargetOptions {
  /**
   * @title ID da Categoria
   * @description ID numérico da categoria do produto obtido de additionalProperty. Deixe vazio para aplicar a todas as categorias.
   * @pattern \d*
   * @format dynamic-options
   * @options site/app-tags/loaders/getCategoryTree.ts
   */
  categoryId?: string;
  
  /**
   * @title ID da Coleção
   * @description ID numérico da coleção do produto obtido de additionalProperty. Deixe vazio para aplicar a todas as coleções.
   * @pattern \d*
   * @format dynamic-options
   * @options site/app-tags/loaders/collections/list.ts
   */
  collectionId?: string;
}

interface BaseFlag { 
  /**
   * @title Produtos Alvo
   * @description Configure os critérios de segmentação para definir em quais produtos esta tag será exibida
   */
  target: TargetOptions;
  
  /**
   * @title Data de Início
   * @description Data e hora em que a tag começará a ser exibida. Deixe vazio para exibir imediatamente.
   * @format date
   */
  startDate?: string;
  
  /**
   * @title Data de Fim
   * @description Data e hora em que a tag deixará de ser exibida. Deixe vazio para exibir indefinidamente.
   * @format date
   */
  endDate?: string;
  
  /**
   * @title Ativar Tag
   * @description Habilita ou desabilita a exibição desta tag nos produtos
   */
  enabled?: boolean;
}

interface OffsetPosition {
  /**
   * @title Offset X (Mobile)
   * @description Deslocamento horizontal em pixels no mobile. Valores positivos movem para a direita, negativos para a esquerda.
   */
  offsetXMobile?: number;
  
  /**
   * @title Offset X (Desktop)
   * @description Deslocamento horizontal em pixels no desktop. Valores positivos movem para a direita, negativos para a esquerda.
   */
  offsetXDesktop?: number;
  
  /**
   * @title Offset Y (Mobile)
   * @description Deslocamento vertical em pixels no mobile. Valores positivos movem para baixo, negativos para cima.
   */
  offsetYMobile?: number;
  
  /**
   * @title Offset Y (Desktop)
   * @description Deslocamento vertical em pixels no desktop. Valores positivos movem para baixo, negativos para cima.
   */
  offsetYDesktop?: number;
}

/**
 * @titleBy text
 * @description Tag de texto personalizada para exibição em produtos
 */
export interface CustomTextFlag extends BaseFlag {
  /**
   * @title Texto da Tag
   * @description Texto que será exibido na tag
   */
  text: string;
  
  /**
   * @title Ícone
   * @description Imagem opcional para exibir junto ao texto da tag. Tamanho recomendado: 32x32 pixels
   */
  icon?: ImageWidget;
  
  /**
   * @title Posição do Ícone
   * @description Define se o ícone será exibido à esquerda ou à direita do texto
   */
  iconPosition?: "esquerda" | "direita";
  
  /**
   * @title Tamanho do Ícone
   * @description Tamanho do ícone em pixels (largura e altura, quadrado). Tamanho padrão: 16
   */
  iconSize?: number;
  
  /**
   * @title Tamanho da Fonte
   * @description Tamanho do texto da tag
   */
  fontSize?: FontSize;
  
  /**
   * @title Peso da Fonte
   * @description Espessura do texto
   */
  fontWeight?: FontWeight;
  
  /**
   * @title Cor do Texto
   * @description Cor do texto exibido na tag
   */
  textColor: Color;
  
  /**
   * @title Cor de Fundo
   * @description Cor de fundo da tag
   */
  backgroundColor: Color;
  
  /**
   * @title Cor da Borda
   * @description Cor da borda da tag. Deixe vazio para não exibir borda
   */
  borderColor?: Color;
  
  /**
   * @title Largura da Borda
   * @description Espessura da borda em pixels. Use 0 para remover a borda
   */
  borderWidth?: number;
  
  /**
   * @title Raio da Borda
   * @description Arredondamento das bordas da tag em pixels. Use 0 para bordas retas
   */
  borderRadius?: number;
  
  /**
   * @title Padding Horizontal
   * @description Espaçamento interno horizontal (esquerda e direita) em pixels
   */
  paddingX?: number;
  
  /**
   * @title Padding Vertical
   * @description Espaçamento interno vertical (topo e inferior) em pixels
   */
  paddingY?: number;
  
  /**
   * @title Posição
   * @description Posição da tag em relação ao produto
   */
  position: FlagPosition;
  
  /**
   * @title Posicionamento Personalizado
   * @description Ajuste fino da posição da tag usando offsets em pixels. Permite ajustar a posição base para posicionamento preciso
   */
  offset?: OffsetPosition;
}

export interface TagsConfig {
  /**
   * @title Tags de Texto Personalizadas
   * @description Configure tags de texto personalizadas para exibir em produtos específicos
   */
  customFlags?: CustomTextFlag[];
}
