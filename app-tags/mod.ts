import type { App, FnContext } from "@deco/deco";
import { fetchSafe } from "apps/utils/fetch.ts";
import { createHttpClient } from "apps/utils/http.ts";
import { PreviewContainer } from "apps/utils/preview.tsx";
import { Secret } from "apps/website/loaders/secret.ts";
import manifest, { Manifest } from "./manifest.gen.ts";
import type { TagsConfig } from "./utils/types.ts";

export type AppContext = FnContext<State, Manifest>;

/** @title Tags de Produtos */
export interface Props {
  /**
   * @title Tags de Produtos
   */
  tags?: TagsConfig;

  /**
   * @title Configuração da API
   */
  config: {
    /**
     * @title Account Name
     * @description ex.: minhacontavtex
     */
    account: string;

    /**
     * @title X-VTEX-API-AppKey
     * @description Unique identifier of the application key.
     * @format secret
     */
    appKey: Secret;

    /**
     * @title X-VTEX-API-AppToken
     * @description Secret token of the application key.
     * @format secret
     */
    appToken: Secret;
  };
}

export interface State extends Props {
  api: ReturnType<typeof createHttpClient>;
}

/**
 * @title Tags de Produtos
 * @description Sistema flexível de tags para produtos
 * @category Produto
 * @logo https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4346/7d1c8269-a925-467e-9e83-244a3b04ed99
 */
export default function TagsApp(props: Props): App<Manifest, State> {
  const { account, appKey, appToken } = props.config;

  const getSecretValue = (secret?: Secret) => {
    if (!secret) return "";
    return typeof secret === "string" ? secret : secret.get() ?? "";
  };

  const api = createHttpClient({
    base: `https://${account}.vtexcommercestable.com.br`,
    fetcher: fetchSafe,
    headers: new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-VTEX-API-AppKey": getSecretValue(appKey),
      "X-VTEX-API-AppToken": getSecretValue(appToken),
    }),
  });

  return {
    manifest,
    state: {
      ...props,
      api,
    },
  };
}

// It is important to use the same name as the default export of the app
export const preview = () => {
  return {
    Component: PreviewContainer,
    props: {
      name: "Tags de Produtos",
      owner: "Agência N1",
      description: "Sistema flexível de tags para produtos",
      logo:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4346/7d1c8269-a925-467e-9e83-244a3b04ed99",
      images: [],
      tabs: [],
    },
  };
};
