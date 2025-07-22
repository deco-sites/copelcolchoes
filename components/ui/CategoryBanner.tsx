import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import { type SectionProps } from "@deco/deco";
import type { ImageWidget } from "apps/admin/widgets.ts";
import ImageComponent from "deco-sites/std/components/Image.tsx";

interface Image {
  /**
   * @title Imagem para Desktop
   * @description (Tamanho recomendado: 1440x260)
   */
  desktop: ImageWidget;
  /**
   * @title Imagem para Mobile
   * @description (Tamanho recomendado: 346x260)
   */
  mobile: ImageWidget;
  /** @title Texto alternativo */
  alt?: string;
}

/**
 * @titleBy matcher
 */
export interface Banner {
  /**
   * @title RegEx para habilitar este banner na categoria desejada
   * @description Use /feminino/* para exibir este banner na categoria feminino
   */
  matcher: string;
  /**
   * @title Imagens para o Banner
   * @description Imagens que serão exibidas no banner. A imagem para desktop será exibida em telas maiores que 767px, enquanto a imagem para mobile será exibida em telas menores que 767px.
   */
  image: Image;
}

function Banner({ banner }: SectionProps<ReturnType<typeof loader>>) {
  if (!banner) return null;

  const { image } = banner;

  return (
    <div class="container lg:px-[4rem] px-[1.375rem] grid grid-cols-1 mb-5 grid-rows-1 relative">
      <Picture preload class="col-start-1 col-span-1 row-start-1 row-span-1">
        <Source
          src={image.mobile}
          width={346}
          height={260}
          media="(max-width: 767px)"
        />

        <ImageComponent
          class="w-full h-full object-cover"
          fetchPriority="high"
          preload
          src={image.desktop}
          alt={image.alt ?? "Banner Image"}
          width={1440}
          height={260}
        />
      </Picture>
    </div>
  );
}

/**
 * @titleBy Baners de categoria
 * @description Exibe banners de categoria com base na URL atual. Use o campo matcher para definir a URL onde o banner será exibido.
 */
export interface Props {
  /** @description Lista de banners que serão exibidos com base na URL atual. */
  banners?: Banner[];
}

export const loader = ({ banners = [] }: Props, req: Request) => {
  const banner = banners.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  return { banner };
};

export default Banner;
