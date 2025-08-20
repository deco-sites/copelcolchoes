import { AppContext } from "site/apps/site.ts";
import { validateEmail } from "site/sdk/validation.ts";

export interface Props {
  name: string;
  email: string;
}

/**
 * @title Newsletter Subscription
 * @description Handles newsletter form submissions
 */
const action = async (
  props: Props,
  _req: Request,
  { invoke }: AppContext,
): Promise<void> => {
  const { name, email } = props;

  if (typeof name !== "string" || name.trim().length < 3) {
    throw new Error("O nome deve ter pelo menos 3 caracteres");
  }

  if (typeof email !== "string" || !validateEmail(email.trim())) {
    throw new Error("Por favor, insira um endereço de e-mail válido");
  }

  try {
    await (invoke as (
      key: string,
      props?: unknown,
    ) => Promise<unknown>)(
      "deco-sites/std/actions/vtex/newsletter/subscribe.ts",
      { email, name },
    );
  } catch (error) {
    console.error("Error subscribing to newsletter", error);
    throw new Error("Ops! Algo deu errado. Por favor, tente novamente.");
  }
};

export default action;
