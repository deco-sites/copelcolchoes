import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "preact/hooks";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Props {
  /**
   * @title Mensagens de Alerta
   * @description Lista de mensagens que serão exibidas no slider
   */
  alerts: Alert[];

  /**
   * @title Intervalo de Transição
   * @description Tempo em milissegundos entre os slides (0 para desativar rotação automática)
   * @default 2000
   */
  interval?: number;

  /**
   * @title Configuração do Ícone
   * @description Configurações padrão para os ícones ao lado das mensagens
   */
  iconConfig?: {
    /**
     * @title Tamanho Padrão
     * @description Dimensões padrão para todos os ícones
     */
    defaultSize?: {
      /**
       * @title Largura
       * @description Largura do ícone em pixels
       * @default 20
       */
      width: number;
      /**
       * @title Altura
       * @description Altura do ícone em pixels
       * @default 20
       */
      height: number;
    };
  };
}

export interface Alert {
  /**
   * @title Texto da Mensagem
   * @description Conteúdo textual do alerta
   */
  textAlert: string;

  /**
   * @title Cor do Texto
   * @description Cor hexadecimal do texto
   * @format color
   */
  textColor: string;

  /**
   * @title Ícone
   * @description Imagem/ícone que acompanha a mensagem
   */
  icon?: {
    /**
     * @title Imagem
     * @description URL da imagem do ícone
     */
    src: LiveImage;
    /**
     * @title Texto Alternativo
     * @description Descrição acessível da imagem
     */
    alt: string;
    /**
     * @title Tamanho Personalizado
     * @description Dimensões específicas para este ícone
     */
    size?: {
      /**
       * @title Largura
       * @description Largura personalizada em pixels
       */
      width: number;
      /**
       * @title Altura
       * @description Altura personalizada em pixels
       */
      height: number;
    };
  };
}

function TopNavBar({ alerts, interval = 2000, iconConfig }: Props) {
  const id = useId();

  return (
    <div class="px-[1.875rem] topnavbar bg-primary relative group">
      <div id={id} class="relative">
        <Slider class="carousel carousel-center w-full align-middle" data-slider>
          {alerts.map((alert, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-full transition-all duration-500 ease-in-out py-4 lg:py-1"
              data-slider-item={index}
            >
              <div class="flex items-center justify-center w-full">
                {alert.icon && (
                  <img
                    src={alert.icon.src}
                    alt={alert.icon.alt}
                    width={alert.icon.size?.width || iconConfig?.defaultSize?.width || 20}
                    height={alert.icon.size?.height || iconConfig?.defaultSize?.height || 20}
                    class=""
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <span
                  class="text-sm ml-3 text-center leading-[1.125rem]"
                  style={{ color: alert.textColor }}
                >
                  {alert.textAlert}
                </span>
              </div>
            </Slider.Item>
          ))}
        </Slider>

        <SliderJS
          rootId={id}
          itemsPerPage={{ 0: 1 }}
          interval={interval}
          infinite
          scroll="auto"
        />
      </div>
    </div>
  );
}

export default TopNavBar;