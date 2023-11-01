import {
  BUTTON_VARIANTS,
  ButtonVariant,
} from "$store/components/minicart/Cart.tsx";
import { Runtime } from "$store/runtime.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

const subscribe = Runtime.create(
  "deco-sites/std/actions/vtex/newsletter/subscribe.ts",
);

export interface INewsletterInputProps {
  /**
   * @title Hide input?
   */
  show?: boolean;
  /**
   * @title placeholder
   */
  placeholder?: string;
}

export interface INewsletterFormProps {
  email: INewsletterInputProps;
  name: INewsletterInputProps;
  button: {
    /**
     * @title button variant
     * @default primary
     */
    variant?: ButtonVariant;
    /**
     * @title button label?
     * @default cadastrar
     */
    label?: string;
  };
}

export interface Props {
  /**
   * @title Newsletter Form
   */
  form: INewsletterFormProps;
  /**
   * @title newsletter message text?
   * @format html
   */
  text: string;
}

interface InputNewletterProps {
  name: string;
  placeholder: string;
  type: string;
  required: boolean;
}

function Form(props: Props) {
  const { form } = props;
  const loading = useSignal(false);
  const success = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      const name = 
        (e.currentTarget.elements.namedItem("name") as RadioNodeList)?.value;

      await subscribe({ email, name });
    } finally {
      loading.value = false;
      success.value = true;

      setTimeout(() => {
        success.value = false;
      }, 5000);
    }
  };

  return (
    <section class="bg-black font-quicksand rounded-[12px] flex w-full lg:h-[8.5625rem] lg:justify-between lg:items-center lg:mb-[2.625rem] lg:px-[2.625rem]">
      <div
        class="relative lg:mr-[3.75rem]"
      >
        <div class="text-white">
          <h2 class="font-medium lg:text-[1.75rem] lg:leading-[2.1875rem]">Newsletter</h2>
          <p class="text-[0.875rem] leading-[1.125rem] mt-3 font-medium">
            Cadastre seu e-mail para ficar por dentro de
            <br />nossas promoções e receber descontos
            <br />exclusivos!
          </p>
        </div>
      </div>
      <div>
        {success.value
          ? (
            <div class="text-base lg:text-xl text-left text-base-100">
              E-mail cadastrado com sucesso!
            </div>
          )
          : (
            <form
              onSubmit={handleSubmit}
            >
              <div class="flex justify-between items-end flex-1">
                <div class="flex-1 relative flex flex-col">
                  <label for="name" class="font-medium text-white text-base inline-block">Nome *</label>
                  <input id="name" name="name" type="text" class="lg:w-[11.9375rem] lg:mr-[1.875rem] border-none text-sm leading-9 font-normal px-6 h-10 bg-white rounded-[5px]" />
                </div>
                <div class="flex-1 relative flex flex-col">
                <label for="email" class="font-medium text-white text-base inline-block">Email *</label>
                  <input id="email" name="email" type="text" class="lg:w-[18rem] lg:mr-[1.875rem] border-none text-sm leading-9 font-normal px-6 h-10 bg-white rounded-[5px]" />
                </div>
                <button
                  type="submit"
                  class="w-[8.1875rem] h-[2.8125rem] bg-secondary border-secondary rounded-[5px] font-semibold text-white"
                  disabled={loading}
                  title="Enviar Newsletter"
                >
                  {form?.button?.label || "Entrar"}
                </button>
              </div>
            </form>
          )}
      </div>
    </section>
  );
}

export default Form;
