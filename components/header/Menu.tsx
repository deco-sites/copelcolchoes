import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import type { INavItem } from "./NavItem.tsx";
import { clx } from "$store/sdk/clx.ts";
export interface Props {
  items: INavItem[];
}

function MenuItem({ item }: { item: INavItem }) {
  const component = item?.children?.length
    ? (
      item.variant === "AllCategories"
        ? (
          <div class="collapse collapse-plus relative items-start border-[#C5C6CB] border-b rounded-none">
            <input
              type="checkbox"
              class="absolute left-0 w-full top-0"
            />
            <div class="collapse-title min-h-0 p-0 py-2.5 font-dm-sans font-bold text-sm px-0 flex items-center justify-between after:!text-[20px]">
              {item.label}
            </div>
            <div class="collapse-content px-0">
              <ul class="border-t border-base-content border-solid pt-0 px-0 pl-5">
                {item.children?.map((node) => {
                  const url_all = node.children &&  node.children[0].href ? node.children[0].href.split("/") : null;

                  return(
                    <li class="">
                    <div class="collapse collapse-plus relative items-start">
                      <input
                        type="checkbox"
                        class="absolute left-0 w-full top-0"
                      />
                      <div class="collapse-title min-h-0 p-0 py-2.5 font-dm-sans font-normal text-sm px-0 flex items-center justify-between after:!text-[20px]">
                        {node.label}
                      </div>
                      <div class="collapse-content px-0 border-b border-[#C5C6CB]">
                        <ul class="border-t border-border-[#C5C6CB] border-solid pt-0 px-0 pl-5">
                          {node.children?.map((nodeChild) => (
                            <li class="">
                              <a
                                href={nodeChild.href}
                                title={nodeChild.label}
                                class={`w-full block pt-5 font-dm-sans font-normal text-base-300 text-sm`}
                              >
                                {nodeChild.label}
                              </a>
                            </li>
                          ))}
                          <li class="">
                            {url_all && url_all[1] && (
                              <a
                                href={`/${url_all[1]}`}
                                title={node.label}
                                class={`w-full block pt-5 font-dm-sans font-normal text-base-300 text-sm`}
                              >
                                Mostrar tudo
                              </a>
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )
        : (
          <div class="collapse collapse-plus relative items-start border-[#C5C6CB] border-b rounded-none">
            <input
              type="checkbox"
              class="absolute left-0 w-full top-0"
            />
            <div class="collapse-title min-h-0 p-0 py-2.5 font-dm-sans font-normal text-sm px-0 flex items-center justify-between after:!text-[20px]">
              {item.label}
            </div>
            <div class="collapse-content px-0">
              <ul class="border-t border-[#C5C6CB] border-solid pt-0 px-0 pl-5">
                {item.children?.map((node) => (
                  <li class="">
                    <a
                      href={node.href}
                      title={node.label}
                      class={`w-full block pt-5 font-dm-sans font-normal text-base-300 text-sm`}
                    >
                      {node.label}
                    </a>
                  </li>
                ))}
                <li class="">
                  <a
                    href={item.href}
                    title={item.label}
                    class={`w-full block pt-5 font-dm-sans font-normal text-base-300 text-sm`}
                  >
                    Mostrar tudo
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )
    )
    : (
      <a
        href={item.href}
        title={item.label}
        class={`w-full block py-2.5 font-dm-sans text-sm ${
          item.highlighted ? "text-secondary flex items-center leading-[18.2px] font-bold" : "font-normal"
        }`}
      >
        {item.highlighted && (
          <Icon id="HighlightedMobile" width={28} height={28} strokeWidth={2} />
        )}
        {item.label}
      </a>
    );

  return component;
}

function Menu({ items }: Props) {
  const { displayMenu } = useUI();

  return (
    <div class="flex flex-col justify-center pb-3 h-full">
      <div class="w-full flex items-center justify-between py-4 pb-2 px-4">
        <a href="/account" class={clx(`flex items-center justify-start gap-1 uppercase text-base-content leading-[18.2px] text-[14px] font-bold tracking-[1px]`)}>
          <Icon id="XMarkMobile" width={28} height={28} strokeWidth={2} />
          <span>Entrar</span>
        </a>      
        <button
          class="btn-square btn-ghost relative flex justify-center items-center rounded-full"
          onClick={() => {
            displayMenu.value = false;
          }}
        >
          <Icon id="XMark" width={24} height={24} strokeWidth={2} />
        </button>         
      </div>
      <div class={clx(`px-4 gap-y-[10px] py-[0] flex flex-col justify-center items-center`)}>
        <a href="https://www.copelcolchoes.com.br/_secure/account#/profile" 
          class={clx(`text-[12px] leading-[15.6px] text-[#fff] py-[8px] px-[20px] rounded-[5px] bg-primary w-full font-bold text-center`)}>
          Meus dados
        </a>
        <a href="https://www.copelcolchoes.com.br/_secure/account#/orders" 
          class={clx(`text-[12px] leading-[15.6px] text-primary py-[8px] px-[20px] rounded-[5px] border border-primary font-bold w-full text-center`)}>
          Meus pedidos
        </a>
      </div>       
      <ul class="flex-grow flex flex-col px-4 mt-[10px]">
        {items.map((item) => <MenuItem item={item} />)}
      </ul>
      <a
        class="flex mx-[1rem] border border-primary px-[20px] py-[10px] text-center justify-center rounded-[5px] cursor-default"
        href="javascript:void(0);"
      >
        <Icon id="Televendas" width={21} height={20} class={`mr-[8px]`} />
        <span class="tracking-[1px] text-sm font-bold">Televendas:</span>
        <span class="tracking-[1px] text-sm font-normal">(11) 2109-9109</span>
      </a>
      <a
        class="flex mx-[1rem] mt-[10px] border border-primary px-[20px] py-[10px] text-center justify-center rounded-[5px]"
        href="/central-de-atendimento"
      >
        <Icon id="ChatCustom" width={20} height={20} class={`mr-[8px]`} />
        <span class="tracking-[1px] text-sm md:text-xs font-bold">fale conosco</span>
      </a>
    </div>
  );
}

export default Menu;
