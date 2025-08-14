import Icon from "$store/components/ui/Icon.tsx";
import type { ImageWidget, RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
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
    <a href={item.href} class="text-sm font-medium leading-4 text-[#8c9aad]">
      {item.label}
    </a>
  );
}

export interface SecuritiesItem {
  image?: ImageWidget;
  alt: string;
  href?: string;
  width?: number;
  height?: number;
}

export interface FooterImage {
  label: string;
  images: FooterLink[];
}
export interface FooterLink {
  image: ImageWidget;
  alt: string;
  link: string;
  width?: number;
  height?: number;
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
  securities?: SecuritiesItem[];
  /**
   * @title Poweredby
   */
  poweredby?: FooterImage[];
  /**
   * @title companyFooterInfo
   */
  companyFooterInfo: string;
  /**
   * @title Horários de atendimento
   */
  openingHours: RichText;
}

function Footer({
  sections = [],
  socialNetWorks,
  phone,
  payments,
  securities,
  poweredby,
  companyFooterInfo,
  openingHours,
}: Props) {
  return (
    <div class="bg-[#e8ebef] font-quicksand">
      <div class="relative mx-auto my-0 flex max-w-7xl justify-center bg-white p-0 text-base leading-9 max-lg:flex-col max-lg:px-[1.1875rem] max-lg:py-[3.125rem]">
      </div>
      <footer class="lg:relative">
        <div class="container m-auto flex w-full px-[1.375rem] text-primary max-lg:flex-col max-lg:pb-[1.875rem] lg:max-w-[80rem] lg:justify-between lg:px-[4rem] lg:py-16">
          <div class="flex w-1/4 flex-col max-lg:w-full">
            <div class="mb-[2.0625rem] flex w-[9.9375rem] flex-col max-lg:mx-auto max-lg:my-6 max-lg:text-center">
              <Icon id="Logo" class={"max-lg:m-auto"} height={79} width={159} />
            </div>
            <div class="flex flex-col max-lg:mx-auto">
              <div>
                <div class="mx-auto my-0 flex flex-col max-lg:text-center">
                  <span class="mb-3 text-base font-bold uppercase">
                    Televendas
                  </span>
                  <div class="text-xl font-black lg:mb-4">{phone}</div>
                  <div class="text-sm leading-6 text-[##8c9aad] lg:mb-4">
                    <div dangerouslySetInnerHTML={{ __html: openingHours }} />
                  </div>
                </div>
                {socialNetWorks?.length && (
                  <SocialNetWorks socialItems={socialNetWorks} />
                )}
              </div>
            </div>
          </div>
          <div>
            <ul class="flex justify-between max-lg:hidden lg:gap-[3.375rem]">
              {sections.map((section) => (
                <li>
                  <span class="mb-4 block text-base font-bold uppercase">
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
              class="relative mt-5 hidden flex-col items-center justify-center px-5 max-lg:flex"
              id="accordion-container--footer"
            >
              {sections.map((section) => (
                <div class="collapse collapse-arrow w-full rounded-none">
                  <label
                    for={`my-accordion-mobile--footer-${section.label}`}
                    class="h-0 w-0 opacity-0"
                  >
                    Abrir opções
                  </label>
                  <input
                    type="checkbox"
                    name="my-accordion-mobile--footer"
                    id={`my-accordion-mobile--footer-${section.label}`}
                    class="absolute left-0 top-0 w-full"
                  />
                  <div class="collapse-title flex items-center justify-between border-b border-[#dbdbdb] py-2.5 pl-0 pr-0 font-bold uppercase text-primary">
                    {section.label}
                  </div>
                  <div class="collapse-content pl-0">
                    <ul>
                      {section.children.map((item) => (
                        <li class="py-1 leading-normal">
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
          <div class="container m-auto w-full px-[1.375rem] max-lg:py-5 lg:flex lg:w-full lg:max-w-[80rem] lg:justify-between lg:px-[4rem] lg:py-8">
            <div class="max-lg:my-[2.8125rem]">
              <div class="mb-4 text-base font-medium text-primary">
                Pagamento
              </div>
              <ul class="mb-[3.125rem] flex w-[359px] max-lg:mx-auto max-lg:my-0 max-lg:grid max-lg:w-full max-lg:grid-cols-7 max-lg:gap-x-[0.9375rem] max-lg:gap-y-[0.3125rem]">
                {payments &&
                  payments.map((item) => (
                    <li class="mb-4 mr-[0.3125rem] lg:w-[3.125rem]">
                      <span>
                        <Image
                          src={item.image || ""}
                          width={35}
                          height={21}
                          alt={item.alt || "footer image"}
                          class="inline-block h-auto w-full align-middle mix-blend-multiply"
                        />
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
            <div class="max-lg:my-6">
              <div class="mb-4 text-base font-medium text-primary">
                Certificados e Segurança
              </div>
              <ul class="flex gap-5 max-lg:mx-auto">
                {securities &&
                  securities.map((item) => (
                    <li class="flex w-[3.8125rem] items-center">
                      <span>
                        <a href={item.href || "#"} class="block">
                          <Image
                            src={item.image || ""}
                            width={item.width ?? 73}
                            height={item.height}
                            alt={item.alt || "footer image"}
                            // class="h-auto w-full inline-block align-middle mix-blend-multiply"
                          />
                        </a>
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
            <div class="max-lg:mt-[1.4375rem]">
              <div class="flex flex-col max-lg:my-8">
                <span class="mb-4 block text-base font-medium text-primary">
                  Desenvolvimento
                </span>
                <div class="flex items-center gap-5">
                  {poweredby?.map((item) =>
                    item.images.map((image) => (
                      <a href={image.link}>
                        <Image
                          src={image.image}
                          alt={image.alt}
                          width={image.width ?? 73}
                          height={image.height}
                          target="_blank"
                          // class="w-auto h-auto"
                        />
                      </a>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white">
          <div class="mx-auto max-w-7xl px-8 max-lg:pb-[1.25rem] lg:w-full lg:px-52 lg:pb-[3.4375rem]">
            <p class="w-full text-center text-xs font-medium leading-[0.9375rem] text-[#8c9aad]">
              <span>{companyFooterInfo}</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
