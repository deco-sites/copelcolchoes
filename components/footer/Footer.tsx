import Icon from "$store/components/ui/Icon.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { FooterSectionItem } from "./Payments.tsx";
import SocialNetWorks, { SocialItem } from "./SocialNetWorks.tsx";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  children: Item[];
};

function SectionItem({ item }: { item: Item }) {
  return (
    <a
      href={item.href}
      class="text-sm leading-4 text-[#8c9aad] font-medium"
    >
      {item.label}
    </a>
  );
}

export interface SecuritiesItem {
  image: LiveImage;
}

export interface FooterImage {
  label: string;
  images: FooterLink[];
}
export interface FooterLink {
  image: LiveImage;
  alt: string;
  link: string;
}

export interface Props {
  sections?: Section[];
  /**
   * @title Social Network
   */
  socialNetWorks?: SocialItem[];
  /**
   * @title Phone number
   */
  phone: string;
  /**
   * @title Payments
   */
  payments?: FooterSectionItem[];
  /**
   * @title Securities
   */
  securities?: FooterSectionItem[];
  /**
   * @title Poweredby
   */
  poweredby?: FooterImage[];
}

function Footer(
  {
    sections = [],
    socialNetWorks,
    phone,
    payments,
    securities,
    poweredby,
  }: Props,
) {
  return (
    <div class="bg-[#e8ebef] font-quicksand">
      <div class="flex bg-white justify-center text-base p-0 leading-9 relative max-w-7xl my-0 mx-auto max-lg:flex-col max-lg:py-[3.125rem] max-lg:px-[1.1875rem]">
      </div>
      <footer class="lg:relative">
        <div class="flex text-primary lg:justify-between lg:py-16 container lg:max-w-[80rem] w-full m-auto lg:px-[4rem] px-[1.375rem] max-lg:flex-col max-lg:pb-[1.875rem]">
          <div class="flex flex-col w-1/4 max-lg:w-full">
            <div class="flex flex-col mb-[2.0625rem] w-[9.9375rem] max-lg:text-center max-lg:my-6 max-lg:mx-auto">
              <Icon id="Logo" class={"max-lg:m-auto"} height={79} width={159} />
            </div>
            <div class="flex flex-col max-lg:mx-auto">
              <div>
                <div class="flex flex-col mx-auto my-0 max-lg:text-center">
                  <span class="text-base uppercase font-bold mb-3">
                    Televendas
                  </span>
                  <div class="lg:mb-4 text-xl font-black">{phone}</div>
                  <p class="lg:mb-4 text-sm leading-6 text-[##8c9aad]">
                    Segunda à sexta das{" "}
                    <strong class="text-primary">8h às 18h</strong>
                    <br />
                    Sábado de <strong class="text-primary">10h às 15h</strong>
                    <br />
                    Domingo <strong class="text-primary">fechado</strong>
                    <br></br>
                  </p>
                </div>
                {socialNetWorks?.length && (
                  <SocialNetWorks socialItems={socialNetWorks} />
                )}
              </div>
            </div>
          </div>
          <div>
            <ul class="max-lg:hidden flex justify-between lg:gap-[3.375rem]">
              {sections.map((section) => (
                <li>
                  <span class="font-bold text-base uppercase mb-4 block">
                    {section.label}
                  </span>
                  <ul class="flex flex-col">
                    {section.children.map((item) => (
                      <li class="mb-4">
                        <SectionItem item={item} />
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <div
              class="max-lg:flex hidden flex-col items-center justify-center relative mt-5 px-5"
              id="accordion-container--footer"
            >
              {sections.map((section) => (
                <div class="collapse collapse-arrow w-full rounded-none">
                  <label for="my-accordion-mobile--footer" class="hidden">
                    Abrir opções
                  </label>
                  <input
                    type="checkbox"
                    name="my-accordion-mobile--footer"
                    class="absolute left-0 w-full top-0"
                  />
                  <div class="collapse-title border-b border-[#dbdbdb] py-2.5 text-primary font-bold pl-0 flex items-center justify-between pr-0 uppercase">
                    {section.label}
                  </div>
                  <div class="collapse-content pl-0">
                    <ul>
                      {section.children.map((item) => (
                        <li class="leading-normal py-1">
                          <SectionItem item={item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div class="bg-white">
          <div class="lg:flex lg:w-full lg:justify-between lg:py-8 container lg:max-w-[80rem] w-full m-auto lg:px-[4rem] px-[1.375rem] max-lg:py-5">
            <div class="max-lg:my-[2.8125rem]">
              <div class="text-base font-medium text-primary mb-4">
                Pagamento
              </div>
              <ul class="mb-[3.125rem] w-[359px] flex max-lg:w-full max-lg:grid max-lg:grid-cols-7 max-lg:my-0 max-lg:mx-auto max-lg:gap-y-[0.3125rem] max-lg:gap-x-[0.9375rem]">
                {payments &&
                  payments.map((item) => (
                    <li class="lg:w-[3.125rem] mr-[0.3125rem] mb-4">
                      <span>
                        <img
                          loading="lazy"
                          src={item.image}
                          width={34}
                          height={25}
                          alt={item.alt || "footer image"}
                          class="h-auto w-full inline-block align-middle mix-blend-multiply"
                        />
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
            <ul class="max-lg:my-6">
              <div class="text-base font-medium text-primary mb-4">
                Certificados e Segurança
              </div>
              <div class="flex gap-5 max-lg:mx-auto">
                <li class="w-[3.8125rem]"></li>
                {securities &&
                  securities.map((item) => (
                    <li class="w-[3.8125rem] flex items-center">
                      <span>
                        <a href={item.href || "#"} class="block">
                          <img
                            loading="lazy"
                            src={item.image}
                            width={61}
                            alt={item.alt || "footer image"}
                            class="h-auto w-full inline-block align-middle mix-blend-multiply"
                          />
                        </a>
                      </span>
                    </li>
                  ))}
              </div>
            </ul>
            <div class="max-lg:mt-[1.4375rem]">
              <div class="flex flex-col max-lg:my-8">
                <span class="block text-base mb-4 font-medium text-primary">
                  Desenvolvimento
                </span>
                <div class="flex items-center gap-5">
                  {poweredby?.map((item) => (
                    item.images.map((image) => (
                      <a href={image.link}>
                        <img
                          src={image.image}
                          alt={image.alt}
                          width={89}
                          height={20}
                          target="_blank"
                          class="w-auto h-auto"
                        />
                      </a>
                    ))
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white">
          <div class="lg:w-full px-8 lg:px-52 lg:pb-[3.4375rem] max-w-7xl mx-auto max-lg:pb-[1.25rem]">
            <p class="text-xs leading-[0.9375rem] text-center w-full font-medium text-[#8c9aad]">
              <span>
                Copyright © Copel Colchões 2010 - Todos os direitos reservados.
                CONFORTO REDE COMERCIAL DE COLCHÕES LTDA - CNPJ:
                61.522.850/0112-60 Rodovia Vice Prefeito Hermenegildo Tonolli,
                3049 - São Roque da Chave - Itupeva - SP 13295-000 - Tel.: (11)
                3995-3950 - atendimento@copelcolchoes.com.br
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
