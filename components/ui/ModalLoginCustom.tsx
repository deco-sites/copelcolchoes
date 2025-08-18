import { useUser } from "apps/vtex/hooks/useUser.ts";
import Icon from "$store/components/ui/Icon.tsx";
import { clx } from "$store/sdk/clx.ts";
import { useState } from "preact/hooks";
import { useUI } from "$store/sdk/useUI.ts";

function ModalLoginCustom() {
  const { user } = useUser();
  const [sessionFirst, setSessionFirst] = useState(false);

  const storeScope = "copelcolchoes";
  const { vtexIdScriptsLoaded } = useUI();

  const isLogged = user?.value?.email;
  const userEmail = user?.value?.email;

  const logoutUrl =
    `/api/vtexid/pub/logout?scope=${storeScope}&returnUrl=https://www.${storeScope}.com.br`;

  return (
    <>
      <button
        class={`group peer cursor-pointer duration-150`}
        onClick={async () => {
          const currentPathname = window.location.pathname;

          if (user.value?.email) {
            if (currentPathname !== "/my-account") {
              window.location.pathname = "/my-account";
            } else {
              window.location.href =
                `/api/vtexid/pub/logout?scope=${storeScope}&returnUrl=https://www.${storeScope}.com.br`;
            }
          } else {
            const execute = () => {
              vtexIdScriptsLoaded.value = true;
              // deno-lint-ignore ban-ts-comment
              // @ts-expect-error
              window.vtexid.start({
                userEmail: "",
                locale: "pt-BR",
                forceReload: true,
              });
            };

            if (!vtexIdScriptsLoaded.value) {
              const { loadVtexIdScripts } = await import(
                "$store/sdk/loadVtexIdScripts.ts"
              );
              loadVtexIdScripts(execute);
            } else {
              execute();
            }
          }
        }}
      >
        {
          /* <Icon
          class="mr-[0.625rem]"
          id="User"
          size={36}
          strokeWidth={1}
        /> */
        }

        <div class="relative flex w-full appearance-none items-center justify-center text-[0.8125rem] font-medium leading-[1.125rem] text-primary">
          <Icon class="mr-[0.625rem]" id="User" size={36} strokeWidth={1} />

          <p
            class={`text-start text-sm font-black leading-[1.2] text-[#656565] max-lg:hidden`}
          >
            {isLogged
              ? (
                <>
                  Bem-vindo! <br />
                  <span class="font-bold text-primary">{userEmail}</span>
                  {" "}
                </>
              )
              : (
                <>
                  Bem-vindo! <br />
                  <span class="text-primary underline">Entre</span> ou{" "}
                  <span class="text-primary underline">cadastre-se</span>
                </>
              )}
          </p>
        </div>

        {user.value?.email && (
          <div
            class={clx(
              `modal-login-custom absolute -right-5 top-[3px] z-[100] hidden w-auto bg-transparent p-6 shadow-[0_0_50px_0_rgba(0_0_0_0.08)] duration-150 hover:block group-hover:block`,
            )}
          >
            <div
              onMouseEnter={() => {
                sessionStorage.setItem("@copelcolchoes-session", "true");
                setSessionFirst(true);
              }}
              class={clx(
                `modal-login-custom__body absolute -right-[110px] top-[78%] z-50 flex w-[300px] flex-col items-start gap-[6px] whitespace-nowrap rounded-xl border-s-black bg-white p-[24px] text-black shadow-lg ${
                  !sessionFirst ? "flex" : "hidden group-hover:flex"
                }`,
              )}
            >
              <span class={`text-sm font-bold text-black`}>
                Olá {user.value?.givenName} !
              </span>

              <a
                href="/my-account"
                class={clx(`text-xs text-black duration-150 hover:font-bold`)}
              >
                Meu perfil
              </a>

              <a
                href="/my-account"
                class={clx(`text-xs text-black duration-150 hover:font-bold`)}
              >
                Meus pedidos
              </a>

              <div class={clx(`my-[5px] h-[1px] w-[160px] duration-150`)} />

              <a
                class={clx(`text-xs text-black duration-150 hover:font-bold`)}
                href={`/api/vtexid/pub/logout?scope=${storeScope}&returnUrl=https://www.${storeScope}.com.br`}
              >
                Sair
              </a>
            </div>
          </div>
        )}
      </button>
    </>
  );
}

export default ModalLoginCustom;
