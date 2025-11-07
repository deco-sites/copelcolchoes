import { App, AppContext as AC } from "@deco/deco";
import type { InvocationProxy } from "deco/utils/invoke.types.ts";
import std, { Props } from "apps/compat/std/mod.ts";
import commerce from "apps/commerce/mod.ts";

import type { Manifest as AppTagsManifest } from "$store/app-tags/manifest.gen.ts";

import manifest, { Manifest } from "../manifest.gen.ts";

type StdApp = ReturnType<typeof std>;
export default function Site(
  state: Props,
): App<Manifest, Props, [
  StdApp,
  ReturnType<typeof commerce>,
]> {
  return {
    state,
    manifest,
    dependencies: [
      std(state),
      commerce(state),
    ],
  };
}

export type Storefront = ReturnType<typeof Site>;
type BaseAppContext = AC<Storefront>;
type AppTagsInvoke = InvocationProxy<AppTagsManifest>["site/app-tags"];
type ExtendedInvoke = BaseAppContext["invoke"] & {
  "site/app-tags": AppTagsInvoke;
};

export type AppContext = Omit<BaseAppContext, "invoke"> & {
  invoke: ExtendedInvoke;
};
export { onBeforeResolveProps } from "apps/website/mod.ts";
