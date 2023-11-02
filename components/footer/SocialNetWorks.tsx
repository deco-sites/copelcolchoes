import Icon, { SocialIcons } from "$store/components/ui/Icon.tsx";

export interface SocialItem {
  icon: SocialIcons;
  label: string;
  href: string;
}

export interface ISocialNetworkProps {
  socialItems: SocialItem[];
}

export default function SocialNetWorks(
  { socialItems }: ISocialNetworkProps,
) {
  return (
    <ul class="flex justify-start items-center gap-3 max-lg:mt-4 max-lg:justify-center">
      {socialItems.map((social) => (
        <li
          key={social.icon}
          class="bg-[#8c9aad] w-[1.9375rem] h-[1.9375rem] rounded-full"
        >
          <a
            href={social.href}
            class="flex items-center justify-center w-full h-full text-white"
            target="_blank"
            aria-label={social.label}
          >
            <Icon id={social.icon} size={17} strokeWidth={1} />
          </a>
        </li>
      ))}
    </ul>
  );
}
