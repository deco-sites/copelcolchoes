import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import type { SectionProps } from "deco/mod.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import { useQuickReview } from "$store/sdk/useQuickReview.ts";

const ratings = [1, 2, 3, 4, 5];

function ReviewForm() {
  const handleReview: JSX.GenericEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (e.target === null) return;
    const formData = new FormData(e.target as HTMLFormElement);
    const formProps = Object.fromEntries(formData);
    console.log(formProps);
  };
  return (
    <article id="formReview" class="font-quicksand block">
      <form onSubmit={handleReview}>
        <section class="py-6">
          <h3 class="text-primary text-2xl leading-6 font-medium mb-6">
            Avaliação do produto
          </h3>
          <div class="flex justify-between items-end mb-5">
            <div>
              <p class="font-bold text-base leading-3 pb-5 text-[#111111]">
                Dê uma nota
              </p>
              <div type="review" class="flex items-center justify-start rating">
                <div class="rating relative box-border !flex gap-1">
                  <input
                    type="radio"
                    required
                    name="product-rating"
                    value={0}
                    class="rating-hidden !w-0 !h-0"
                    disabled
                    checked
                  />
                  {ratings.map((rating) => (
                    <input
                      type="radio"
                      required
                      id="product-rating"
                      name="product-rating"
                      value={rating}
                      class="mask mask-star bg-secondary w-5 h-5"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-between items-end mb-5">
            <div class="border-0 p-0 text-xs relative w-full mb-3 text-[#111111]">
              <label
                for="reviewComment"
                class="pb-3 block text-base leading-3 font-bold "
              >
                Avaliação
              </label>
              <textarea
                id="reviewComment"
                required
                name="reviewComment"
                rows={4}
                placeholder="Compartilhe o que achou do produto"
                class="border border-[#707070] p-4 overflow-auto resize-y w-full text-sm"
              />
            </div>
          </div>
          <div class="flex justify-between items-end">
            <div class="flex flex-wrap gap-x-5 max-w-[18.75rem] text-[#111111]">
              <label class="block text-base font-bold leading-3 pb-5">
                Você recomenda esse produto?
              </label>
              <div class="">
                <input
                  type="radio"
                  required
                  class="opacity-0 w-[13px] h-[13px] cursor-pointer absolute -z-10 overflow-hidden -m-[1px] p-0 border-0 peer"
                  name="Você recomenda esse produto?"
                  id="Sim"
                  value="Sim"
                />
                <label
                  for="Sim"
                  class="block text-base font-bold leading-3 relative mb-[0.625rem] select-none cursor-pointer before:relative before:inline-block before:content-[''] before:align-middle before:rounded-[2px] before:border before:border-secondary before:w-5 before:h-5 before:mr-3 before:transition-all peer-checked:before:border-[#707070] after:content-[''] after:bg-secondary after:top-0 after:left-0 after:w-5 after:h-5 after:absolute after:block after:transition-all after:scale-0 peer-checked:after:scale-100"
                >
                  Sim
                </label>
              </div>
              <div class="">
                <input
                  type="radio"
                  required
                  class="opacity-0 w-[13px] h-[13px] cursor-pointer absolute -z-10 overflow-hidden -m-[1px] p-0 border-0 peer"
                  name="Você recomenda esse produto?"
                  id="Não"
                  value="Não"
                />
                <label
                  for="Não"
                  class="block text-base font-bold leading-3 relative mb-[0.625rem] select-none cursor-pointer before:relative before:inline-block before:content-[''] before:align-middle before:rounded-[2px] before:border before:border-secondary before:w-5 before:h-5 before:mr-3 before:transition-all peer-checked:before:border-[#707070] after:content-[''] after:bg-secondary after:top-0 after:left-0 after:w-5 after:h-5 after:absolute after:block after:transition-all after:scale-0 peer-checked:after:scale-100"
                >
                  Não
                </label>
              </div>
            </div>
          </div>
        </section>
        <section class="py-6 border-t border-[#cecece]">
          <h3 class="text-primary text-2xl leading-6 font-medium mb-6">
            Seus Dados
          </h3>
          <div class="mb-5 flex justify-between items-end">
            <div class="border-0 p-0 text-sm relative">
              <label
                class="pb-5 block text-base font-bold leading-3 text-[#111111]"
                for="reviewUserName"
              >
                Seu nome (como será exibido no site)
              </label>
              <input
                required
                id="reviewUserName"
                type="text"
                name="reviewUserName"
                placeholder="Seu nome"
                class="border border-[#707070] text-sm p-4 h-8 w-full"
              />
            </div>
          </div>
          <div class="flex justify-between items-end">
            <div class="border-0 p-0 text-sm relative">
              <label
                class="pb-5 block text-base font-bold leading-3 text-[#111111]"
                for="reviewUserEmail"
              >
                Seu email
              </label>
              <input
                required
                id="reviewUserEmail"
                type="email"
                name="reviewUserEmail"
                placeholder="Seu e-mail"
                class="border border-[#707070] text-sm p-4 h-8 w-full"
              />
            </div>
          </div>
        </section>
        <button
          type="submit"
          class="rounded-[0.3125rem] text-base font-semibold h-12 my-4 w-[16.25rem] transition-all duration-300 flex justify-center items-center border border-transparent relative px-8 bg-primary hover:bg-primary-focus text-white appearance-none max-lg:mx-auto"
        >
          Enviar avaliação
        </button>
      </form>
    </article>
  );
}

function QuestionForm() {
  const handleReview: JSX.GenericEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (e.target === null) return;
    const formData = new FormData(e.target as HTMLFormElement);
    const formProps = Object.fromEntries(formData);
    console.log(formProps);
  };
  return (
    <article id="questionForm" class="font-quicksand block">
      <form onSubmit={handleReview}>
        <section class="py-6">
          <h3 class="text-primary text-2xl leading-6 font-medium mb-6">
            Sua dúvida
          </h3>
          <div class="flex justify-between items-end mb-5">
            <div class="border-0 p-0 text-xs relative w-full mb-3 text-[#111111]">
              <label
                for="userQuestion"
                class="pb-5 block text-base leading-3 font-bold "
              >
                O que você quer saber sobre este produto?
              </label>
              <textarea
                id="userQuestion"
                required
                name="userQuestion"
                rows={4}
                placeholder="Pergunte sobre as características do produto, como utilizá-lo ou peça alguma dica"
                class="border border-[#707070] p-4 overflow-auto resize-y w-full text-sm"
              />
            </div>
          </div>
          <h3 class="text-primary text-2xl leading-6 font-medium mb-6">
            Seus Dados
          </h3>
          <div class="mb-5 flex justify-between items-end">
            <div class="border-0 p-0 text-sm relative">
              <label
                class="pb-5 block text-base font-bold leading-3 text-[#111111]"
                for="reviewUserName"
              >
                Seu nome (como será exibido no site)
              </label>
              <input
                required
                id="reviewUserName"
                type="text"
                name="reviewUserName"
                placeholder="Seu nome"
                class="border border-[#707070] text-sm p-4 h-8 w-full"
              />
            </div>
          </div>
          <div class="flex justify-between items-end">
            <div class="border-0 p-0 text-sm relative">
              <label
                class="pb-5 block text-base font-bold leading-3 text-[#111111]"
                for="reviewUserEmail"
              >
                Seu email
              </label>
              <input
                required
                id="reviewUserEmail"
                type="email"
                name="reviewUserEmail"
                placeholder="Seu e-mail"
                class="border border-[#707070] text-sm p-4 h-8 w-full"
              />
            </div>
          </div>
        </section>
        <button
          type="submit"
          class="rounded-[0.3125rem] text-base font-semibold h-12 my-4 w-[16.25rem] transition-all duration-300 flex justify-center items-center border border-transparent relative px-8 bg-primary hover:bg-primary-focus text-white appearance-none max-lg:mx-auto"
        >
          Enviar pergunta
        </button>
      </form>
    </article>
  );
}

interface Props {
  yourViews: {
    /**
     * @title YOURVIEWS_KEY
     */
    key: string;
    /**
     * @title YOURVIEWS_AUTH
     */
    auth: string;
  };
  page: LoaderReturnType<ProductDetailsPage | null>;
}

export async function loader(
  { yourViews, page }: Props,
  _req: Request,
) {
  const options = {
    headers: {
      YVStoreKey: yourViews.key,
    },
  };
  const { product } = page!;
  const { inProductGroupWithID } = product;
  const reviews = await fetch(
    `https://service.yourviews.com.br/api/v2/pub/review/${inProductGroupWithID}?page=1&count=10`,
    options,
  ).then((r) => r.json());
  return { reviews };
}

function ProductReviews({ reviews }: SectionProps<typeof loader>) {
  const { reviews: rates, totalReview: totalRate } = useQuickReview();
  const { Element } = reviews;
  rates.value = !Element ? 0 : Element.Rating;
  totalRate.value = !Element ? 0 : Element.TotalRatings;
  console.log(reviews);
  const displayQuestionForm = useSignal(false);
  const displayReviewForm = useSignal(false);

  const openQuestionForm = () => {
    displayQuestionForm.value = true;
    displayReviewForm.value = false;
  };

  const openReviewForm = () => {
    displayQuestionForm.value = false;
    displayReviewForm.value = true;
  };
  return (
    <div id="reviews-container" class="font-quicksand">
      <h3 class="lg:text-[1.75rem] lg:leading-[2.1875rem] max-lg:text-[1.5rem] max-lg:leading-[1.875rem] text-primary font-semibold tracking-normal my-5 text-left">
        Avaliações
      </h3>
      <div class="lg:bg-white lg:flex lg:flex-col lg:justify-start"></div>
      <p class="text-[#707070] text-xl font-medium leading-[1.5625rem] py-5">
        Possui esse produto? Seja o primeiro a avaliá-lo!
      </p>
      <div class="flex justify-start lg:flex-row flex-col lg:gap-6">
        <div id="formReviewButton" class="max-lg:py-4 max-lg:mx-auto">
          <button
            class="hover:bg-primary-focus bg-black text-white rounded-[0.3125rem] text-base font-medium h-12 w-[17.5rem] transition-all duration-300 max-lg:mx-auto"
            onClick={openReviewForm}
          >
            Fazer avaliação
          </button>
        </div>
        <div id="questionFormButton" class="max-lg:py-4 max-lg:mx-auto">
          <button
            class="hover:bg-primary-focus bg-black text-white rounded-[0.3125rem] text-base font-medium h-12 w-[17.5rem] transition-all duration-300 max-lg:mx-auto"
            onClick={openQuestionForm}
          >
            Escrever dúvida
          </button>
        </div>
      </div>
      {displayReviewForm.value && <ReviewForm />}
      {displayQuestionForm.value && <QuestionForm />}
    </div>
  );
}

export default ProductReviews;
