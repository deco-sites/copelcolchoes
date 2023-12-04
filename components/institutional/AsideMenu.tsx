export interface Props {
  menuItems: {
    label: string;
    href: string;
  }[];
}

function AsideMenu(
  { menuItems }: Props,
) {
  return (
    <ul class="pt-[10px]">
      {menuItems.map((item) => (
        <li class="leading-[1.35em]">
          <h3 class="font-bold pt-5 pb-[5px] text-black text-sm border-b border-[#bed4f0]">
            <a href={item.href} class="text-black text-sm" title={item.label}>
              {item.label}
            </a>
          </h3>
        </li>
      ))}
    </ul>
  );
}

export default AsideMenu;
