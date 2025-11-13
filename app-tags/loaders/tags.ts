import { AppContext } from "../mod.ts";

export default function loader(_props: unknown, _req: Request, ctx: AppContext) {
  return {
    customFlags: ctx.tags?.customFlags ?? [],
  };
}

export const cache = "stale-while-revalidate";
