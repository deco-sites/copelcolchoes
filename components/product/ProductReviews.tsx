import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import { type LoaderReturnType } from "@deco/deco";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import { useQuickReview } from "$store/sdk/useQuickReview.ts";
import { useState } from "preact/hooks";
import StarRatings from "$store/components/product/StarsRatings.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { formatData } from "$store/sdk/format.ts";
import Loading from "$store/components/ui/Loading.tsx";
import type { Product } from "apps/commerce/types.ts";
import { type SectionProps } from "@deco/deco";
const ratings = [1, 2, 3, 4, 5];
function SuccessMessage({ variant }: { variant: string }) {
  return (
    <div class="w-[calc(50%-10px)] text-center max-lg:py-6 lg:my-8">
      <div class="text-xl font-bold leading-6">
        {variant === "Avaliação" ? (
          "Avaliação enviada com sucesso :)"
        ) : (
          <>
            Dúvida enviada com sucesso :) <br />
            Responderemos em breve.
          </>
        )}
      </div>
    </div>
  );
}
interface FormProps {
  yvkey: string;
  yvauth?: string;
  product: Product;
}
function ReviewForm({ yvkey, yvauth, product }: FormProps) {
  const loading = useSignal(false);
  const success = useSignal(false);
  const handleReview: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (e.target === null) {
      return;
    }
    const formData = new FormData(e.target as HTMLFormElement);
    const formProps = Object.fromEntries(formData);
    const { inProductGroupWithID, image, isVariantOf } = product;
    const { reviewRating, reviewComment, reviewUserEmail, reviewUserName } =
      formProps;
    const { name, url } = isVariantOf!;
    const queryData = {
      imageUrl: (image ? image[0].url || "" : "") || "",
      productId: inProductGroupWithID || "",
      productName: name || "",
      productUrl: url || "",
      "review-comment": `${reviewComment}`,
      "review-rating": `${reviewRating}`,
      "social-email": `${reviewUserEmail}`,
      storeKey: yvkey,
      "user-email": `${reviewUserEmail}`,
      "user-image": "",
      "user-logintype": "email",
      "user-name": "",
      "yv-exhibition-name": `${reviewUserName}`,
      "yv-photosupload": "",
      yv__rpl: "?",
    };
    const queryParams = `?${new URLSearchParams(queryData).toString()}`;
    const fetchUrl = `https://service.yviews.com.br/reviewformsave/SaveReviewForm${queryParams}`;
    const options = {
      headers: {
        "x-yv-auth": yvauth!,
      },
      method: "GET",
    };
    try {
      loading.value = true;
      const data = await fetch(fetchUrl, options);
    } catch (err) {
      throw new Error("Failed to get Yourviews Data", { cause: err });
    } finally {
      loading.value = false;
      success.value = true;
      setTimeout(() => {
        success.value = false;
      }, 5000);
    }
  };
  return (
    <article id="formReview" class="block font-quicksand">
      {loading.value ? (
        <Loading />
      ) : (
        <>
          {success.value ? (
            <SuccessMessage variant="Avaliação" />
          ) : (
            <form onSubmit={handleReview}>
              <section class="py-6">
                <h3 class="mb-6 text-2xl font-medium leading-6 text-primary">
                  Avaliação do produto
                </h3>
                <div class="mb-5 flex items-end justify-between">
                  <div>
                    <p class="pb-5 text-base font-bold leading-3 text-[#111111]">
                      Dê uma nota
                    </p>
                    <div
                      type="review"
                      class="rating flex items-center justify-start"
                    >
                      <div class="rating relative box-border !flex gap-1">
                        <input
                          type="radio"
                          required
                          name="reviewRating"
                          value={0}
                          class="rating-hidden !h-0 !w-0"
                          disabled
                          checked
                        />
                        {ratings.map((rating) => (
                          <input
                            type="radio"
                            required
                            id="reviewRating"
                            name="reviewRating"
                            value={rating}
                            class="mask mask-star h-5 w-5 bg-secondary"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mb-5 flex items-end justify-between">
                  <div class="relative mb-3 w-full border-0 p-0 text-xs text-[#111111]">
                    <label
                      for="reviewComment"
                      class="block pb-3 text-base font-bold leading-3"
                    >
                      Avaliação
                    </label>
                    <textarea
                      id="reviewComment"
                      required
                      name="reviewComment"
                      rows={4}
                      placeholder="Compartilhe o que achou do produto"
                      class="w-full resize-y overflow-auto border border-[#707070] p-4 text-sm"
                    />
                  </div>
                </div>
                <div class="flex items-end justify-between">
                  <div class="flex max-w-[18.75rem] flex-wrap gap-x-5 text-[#111111]">
                    <label class="block pb-5 text-base font-bold leading-3">
                      Você recomenda esse produto?
                    </label>
                    <div class="">
                      <input
                        type="radio"
                        required
                        class="peer absolute -z-10 -m-[1px] h-[13px] w-[13px] cursor-pointer overflow-hidden border-0 p-0 opacity-0"
                        name="reviewRecommends"
                        id="Sim"
                        value="Sim"
                      />
                      <label
                        for="Sim"
                        class="relative mb-[0.625rem] block cursor-pointer select-none text-base font-bold leading-3 before:relative before:mr-3 before:inline-block before:h-5 before:w-5 before:rounded-[2px] before:border before:border-secondary before:align-middle before:transition-all before:content-[''] after:absolute after:left-0 after:top-0 after:block after:h-5 after:w-5 after:scale-0 after:bg-secondary after:transition-all after:content-[''] peer-checked:before:border-[#707070] peer-checked:after:scale-100"
                      >
                        Sim
                      </label>
                    </div>
                    <div class="">
                      <input
                        type="radio"
                        required
                        class="peer absolute -z-10 -m-[1px] h-[13px] w-[13px] cursor-pointer overflow-hidden border-0 p-0 opacity-0"
                        name="reviewRecommends"
                        id="Não"
                        value="Não"
                      />
                      <label
                        for="Não"
                        class="relative mb-[0.625rem] block cursor-pointer select-none text-base font-bold leading-3 before:relative before:mr-3 before:inline-block before:h-5 before:w-5 before:rounded-[2px] before:border before:border-secondary before:align-middle before:transition-all before:content-[''] after:absolute after:left-0 after:top-0 after:block after:h-5 after:w-5 after:scale-0 after:bg-secondary after:transition-all after:content-[''] peer-checked:before:border-[#707070] peer-checked:after:scale-100"
                      >
                        Não
                      </label>
                    </div>
                  </div>
                </div>
              </section>
              <section class="border-t border-[#cecece] py-6">
                <h3 class="mb-6 text-2xl font-medium leading-6 text-primary">
                  Seus Dados
                </h3>
                <div class="mb-5 flex items-end justify-between">
                  <div class="relative border-0 p-0 text-sm">
                    <label
                      class="block pb-5 text-base font-bold leading-3 text-[#111111]"
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
                      class="h-8 w-full border border-[#707070] p-4 text-sm"
                    />
                  </div>
                </div>
                <div class="flex items-end justify-between">
                  <div class="relative border-0 p-0 text-sm">
                    <label
                      class="block pb-5 text-base font-bold leading-3 text-[#111111]"
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
                      class="h-8 w-full border border-[#707070] p-4 text-sm"
                    />
                  </div>
                </div>
              </section>
              <button
                type="submit"
                class="relative my-4 flex h-12 w-[16.25rem] appearance-none items-center justify-center rounded-[0.3125rem] border border-transparent bg-primary px-8 text-base font-semibold text-white transition-all duration-300 hover:bg-primary-focus max-lg:mx-auto"
              >
                Enviar avaliação
              </button>
            </form>
          )}
        </>
      )}
    </article>
  );
}
function QuestionForm({ yvkey, product }: FormProps) {
  const loading = useSignal(false);
  const success = useSignal(false);
  const handleReview: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (e.target === null) {
      return;
    }
    const formData = new FormData(e.target as HTMLFormElement);
    const formProps = Object.fromEntries(formData);
    const { reviewUserEmail, reviewUserName, userQuestion } = formProps;
    const { inProductGroupWithID, image, isVariantOf } = product;
    const { name, url } = isVariantOf!;
    const date = new Date().toISOString();
    const data = {
      Date: date,
      Product: {
        productId: inProductGroupWithID,
        Image: image ? image[0].url : null,
        Name: name || null,
        Url: url || null,
      },
      Question: userQuestion,
      QuestionId: 0,
      User: {
        Email: reviewUserEmail,
        ExhibitionName: reviewUserName,
        Name: reviewUserName,
      },
    };
    const fetchUrl = "https://service.yourviews.com.br/api/v2/pub/qna";
    const options = {
      headers: {
        YVStoreKey: yvkey,
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "POST",
      body: JSON.stringify(data),
    };
    try {
      loading.value = true;
      const data = await fetch(fetchUrl, options);
    } catch (err) {
      throw new Error("Failed to get Yourviews Data", { cause: err });
    } finally {
      loading.value = false;
      success.value = true;
      setTimeout(() => {
        success.value = false;
      }, 5000);
    }
  };
  return (
    <article id="questionForm" class="block font-quicksand">
      {loading.value ? (
        <Loading />
      ) : (
        <>
          {success.value ? (
            <SuccessMessage variant="Pergunta" />
          ) : (
            <form onSubmit={handleReview}>
              <section class="py-6">
                <h3 class="mb-6 text-2xl font-medium leading-6 text-primary">
                  Sua dúvida
                </h3>
                <div class="mb-5 flex items-end justify-between">
                  <div class="relative mb-3 w-full border-0 p-0 text-xs text-[#111111]">
                    <label
                      for="userQuestion"
                      class="block pb-5 text-base font-bold leading-3"
                    >
                      O que você quer saber sobre este produto?
                    </label>
                    <textarea
                      id="userQuestion"
                      required
                      name="userQuestion"
                      rows={4}
                      placeholder="Pergunte sobre as características do produto, como utilizá-lo ou peça alguma dica"
                      class="w-full resize-y overflow-auto border border-[#707070] p-4 text-sm"
                    />
                  </div>
                </div>
                <h3 class="mb-6 text-2xl font-medium leading-6 text-primary">
                  Seus Dados
                </h3>
                <div class="mb-5 flex items-end justify-between">
                  <div class="relative border-0 p-0 text-sm">
                    <label
                      class="block pb-5 text-base font-bold leading-3 text-[#111111]"
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
                      class="h-8 w-full border border-[#707070] p-4 text-sm"
                    />
                  </div>
                </div>
                <div class="flex items-end justify-between">
                  <div class="relative border-0 p-0 text-sm">
                    <label
                      class="block pb-5 text-base font-bold leading-3 text-[#111111]"
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
                      class="h-8 w-full border border-[#707070] p-4 text-sm"
                    />
                  </div>
                </div>
              </section>
              <button
                type="submit"
                class="relative my-4 flex h-12 w-[16.25rem] appearance-none items-center justify-center rounded-[0.3125rem] border border-transparent bg-primary px-8 text-base font-semibold text-white transition-all duration-300 hover:bg-primary-focus max-lg:mx-auto"
              >
                Enviar pergunta
              </button>
            </form>
          )}
        </>
      )}
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
const customFieldsValue = {
  Ruim: 1,
  Regular: 2,
  Médio: 3,
  Bom: 4,
  Excelente: 5,
};
export async function loader({ yourViews, page }: Props, _req: Request) {
  const options = {
    headers: {
      YVStoreKey: yourViews.key,
    },
  };
  if (!page) {
    return {
      reviews: { Element: null, Pagination: null },
      product: null,
      yourViews,
    };
  }
  const { product } = page;
  const { inProductGroupWithID } = product;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(
      `https://service.yourviews.com.br/api/v2/pub/review/${inProductGroupWithID}?page=1&count=3&orderBy=1`,
      { ...options, signal: controller.signal },
    );
    const reviews = await res.json();
    return { reviews, product, yourViews };
  } catch (_err) {
    return { reviews: { Element: null, Pagination: null }, product, yourViews };
  } finally {
    clearTimeout(timeoutId);
  }
}
interface CustomFields {
  Name: string;
  Values: string[];
}
interface Review {
  ReviewId: number;
  Rating: number;
  Review: string;
  Date: string;
  Likes: number;
  Dislikes: number;
  CustomFields: CustomFields[];
  User: {
    YourviewsUserId: number;
    Name: string;
    Email: string;
    CPF: string;
    City: string;
    State: string;
    ZipCode: string;
    IPAddress: string;
    UserId: string;
    ExhibitionName: string;
    Avatar: string;
    Phone: string;
  };
}
const getPages = (page: number, lastPage: number) => {
  const pages = [];
  const firstPage =
    page < 3 || lastPage < 5
      ? 1
      : page + 2 >= lastPage
        ? lastPage - 4
        : page - 2;
  for (let i = firstPage; i <= lastPage; i++) {
    if (pages.length === 5 || pages.length === lastPage) {
      return pages;
    }
    pages.push(i);
  }
  return pages;
};
function ProductReviews({
  reviews,
  product,
  yourViews,
}: SectionProps<typeof loader>) {
  const { reviews: rates, totalReview: totalRate } = useQuickReview();
  const loadingPageReview = useSignal(false);
  const displayQuestionForm = useSignal(false);
  const displayReviewForm = useSignal(false);

  if (!product) {
    return null;
  }
  const { inProductGroupWithID } = product;
  const { Element, Pagination } = reviews;
  rates.value = !Element ? 0 : Element.TotalRatings;
  totalRate.value = !Element ? 0 : Element.Rating;
  const [currentReviews, setCurrentReviews] = useState(
    Element ? Element.Reviews : [],
  );
  const [pagination, setPagination] = useState(Pagination ? Pagination : {});
  const { IsFirstPage, IsLastPage, PageCount, PageNumber } = pagination;
  const [pages, setPages] = useState(getPages(PageNumber, PageCount));
  const handlePageChange = async (page: number) => {
    const options = {
      headers: {
        YVStoreKey: yourViews.key,
      },
    };
    const fetchUrl = `https://service.yourviews.com.br/api/v2/pub/review/${inProductGroupWithID}?page=${page}&count=3&orderBy=1`;
    let newReviews = reviews;
    try {
      loadingPageReview.value = true;
      const response = await fetch(fetchUrl, options);
      newReviews = await response.json();
    } catch (error) {
      newReviews = reviews;
    } finally {
      const { Element, Pagination } = newReviews;
      setCurrentReviews(Element ? Element.Reviews : []);
      setPagination(Pagination ? Pagination : {});
      setPages(getPages(Pagination.PageNumber, Pagination.PageCount));
      loadingPageReview.value = false;
    }
  };
  const hasRatings = rates.value > 0;
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
      <h3 class="my-5 text-left font-semibold tracking-normal text-primary max-lg:text-[1.5rem] max-lg:leading-[1.875rem] lg:text-[1.75rem] lg:leading-[2.1875rem]">
        Avaliações
      </h3>
      <div
        class={`lg:flex lg:flex-col lg:justify-start lg:bg-white ${
          loadingPageReview.value ? "cursor-wait opacity-30" : ""
        }`}
      >
        {hasRatings && (
          <>
            <div class="w-full font-quicksand">
              <div class="flex flex-col items-start gap-5 max-lg:gap-[0.625rem]">
                <p class="text-2xl font-medium capitalize leading-6 text-primary max-lg:text-base max-lg:font-semibold max-lg:leading-6">
                  Comentários
                </p>
                <StarRatings totalRate={totalRate.value} />
              </div>
              <div class="w-full py-8">
                <ul class="flex flex-col gap-4">
                  {currentReviews.map((review: Review) => {
                    const qualidade = review.CustomFields.find(
                      (customField) => customField.Name === "Qualidade",
                    );
                    const qualidadeValue = qualidade
                      ? customFieldsValue[
                          qualidade.Values[0] as keyof typeof customFieldsValue
                        ]
                      : review.Rating;
                    const design = review.CustomFields.find(
                      (customField) => customField.Name === "Design",
                    );
                    const designValue = design
                      ? customFieldsValue[
                          design.Values[0] as keyof typeof customFieldsValue
                        ]
                      : review.Rating;
                    const recommend = review.CustomFields.find(
                      (customField) =>
                        customField.Name === "Você recomenda esse produto?",
                    );
                    const recommendValue = recommend
                      ? recommend.Values[0] === "Sim"
                      : review.Rating > 3;
                    return (
                      <li class="flex rounded-[0.3125rem] border border-[#dbdbdb] px-4 py-6 max-lg:flex-col lg:flex-row">
                        <div class="max-lg:w-full lg:w-[15%]">
                          <div class="flex items-center justify-between">
                            <div class="flex w-full items-center justify-start gap-2">
                              <Icon id="ReviewUser" size={24} />
                              <h3 class="text-sm font-semibold leading-snug text-primary">
                                {review.User.ExhibitionName}
                              </h3>
                            </div>
                          </div>
                        </div>
                        <div class="flex flex-col items-start max-lg:my-5 max-lg:w-full lg:m-0 lg:w-[55%]">
                          <div class="mb-4 flex items-center gap-6">
                            <StarRatings totalRate={review.Rating} />
                            <div class="flex items-center justify-between">
                              <div class="text-sm font-medium leading-snug text-[#828282]">
                                {formatData(review.Date)}
                              </div>
                            </div>
                          </div>
                          <div class="flex w-full justify-between">
                            <div class="line-clamp-3 overflow-hidden pr-6 text-sm font-semibold leading-5 text-secondary">
                              {review.Review}
                            </div>
                          </div>
                        </div>
                        <div class="max-lg:w-full lg:w-[40%]">
                          <div class="text-primary">
                            <div class="lg:font-base text-primar my-2 mt-0 flex items-center gap-2 font-semibold leading-5 max-lg:text-sm lg:leading-8">
                              {recommendValue ? (
                                <>
                                  <Icon id="ReviewCheck" size={30} />
                                  Sim, recomendaria este produto a um amigo
                                </>
                              ) : (
                                "Não recomendaria este produto a um amigo"
                              )}
                            </div>
                            <div class="lg:font-base text-primar my-2 flex w-[12.5rem] items-center justify-between font-semibold max-lg:hidden lg:leading-8">
                              Design
                              <StarRatings totalRate={designValue} />
                            </div>
                            <div class="lg:font-base text-primar my-2 flex w-[12.5rem] items-center justify-between font-semibold max-lg:hidden lg:leading-8">
                              Qualidade
                              <StarRatings totalRate={qualidadeValue} />
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            {pages.length > 1 && (
              <div class="flex items-center justify-center">
                <nav class="my-4">
                  <ul class="m-0 flex items-center justify-center p-0">
                    <li class="flex items-center justify-center border-none bg-transparent text-primary">
                      <button
                        class="m-0 flex h-6 min-w-[1.5rem] appearance-none items-center justify-center overflow-visible border-0 bg-transparent px-[0.3125rem] text-lg font-semibold disabled:cursor-not-allowed disabled:opacity-30"
                        onClick={() => handlePageChange(PageNumber - 1)}
                        title={`Ir para a página anterior`}
                        type="button"
                        disabled={IsFirstPage || loadingPageReview.value}
                      >
                        <div class="relative inline-block h-[0.625rem] w-[0.625rem] rotate-90">
                          <span class="absolute left-0 top-[0.3125rem] inline-block h-[0.05rem] w-[0.384375rem] rotate-45 bg-primary transition-all"></span>
                          <span class="absolute right-0 top-[0.3125rem] inline-block h-[0.05rem] w-[0.384375rem] -rotate-45 bg-primary transition-all"></span>
                        </div>
                      </button>
                    </li>
                    {pages.map((page) => (
                      <li
                        class={`flex items-center justify-center border-none bg-transparent ${
                          page === PageNumber
                            ? "pointer-events-none text-secondary underline"
                            : "text-primary"
                        }`}
                      >
                        <button
                          class="m-0 flex h-6 min-w-[1.5rem] appearance-none items-center justify-center overflow-visible border-0 bg-transparent px-[0.3125rem] text-lg font-semibold"
                          onClick={() => handlePageChange(page)}
                          title={`Ir para a página ${page}`}
                          type="button"
                          disabled={loadingPageReview.value}
                        >
                          {page}
                        </button>
                      </li>
                    ))}
                    <li class="flex items-center justify-center border-none bg-transparent text-primary">
                      <button
                        class="m-0 flex h-6 min-w-[1.5rem] appearance-none items-center justify-center overflow-visible border-0 bg-transparent px-[0.3125rem] text-lg font-semibold disabled:cursor-not-allowed disabled:opacity-30"
                        onClick={() => handlePageChange(PageNumber + 1)}
                        title={`Ir para a próxima página`}
                        type="button"
                        disabled={IsLastPage || loadingPageReview.value}
                      >
                        <div class="relative inline-block h-[0.625rem] w-[0.625rem] -rotate-90">
                          <span class="absolute left-0 top-[0.3125rem] inline-block h-[0.05rem] w-[0.384375rem] rotate-45 bg-primary transition-all"></span>
                          <span class="absolute right-0 top-[0.3125rem] inline-block h-[0.05rem] w-[0.384375rem] -rotate-45 bg-primary transition-all"></span>
                        </div>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
      <p class="py-5 text-xl font-medium leading-[1.5625rem] text-[#707070]">
        {`Possui esse produto? ${
          hasRatings ? "Avalie-o!" : "Seja o primeiro a avaliá-lo!"
        }`}
      </p>
      <div class="flex flex-col justify-start lg:flex-row lg:gap-6">
        <div id="formReviewButton" class="max-lg:mx-auto max-lg:py-4">
          <button
            class="h-12 w-[17.5rem] rounded-[0.3125rem] bg-primary text-base font-medium text-white transition-all duration-300 hover:bg-primary-focus max-lg:mx-auto"
            onClick={openReviewForm}
          >
            Fazer avaliação
          </button>
        </div>
        <div id="questionFormButton" class="max-lg:mx-auto max-lg:py-4">
          <button
            class="h-12 w-[17.5rem] rounded-[0.3125rem] bg-primary text-base font-medium text-white transition-all duration-300 hover:bg-primary-focus max-lg:mx-auto"
            onClick={openQuestionForm}
          >
            Escrever dúvida
          </button>
        </div>
      </div>
      {displayReviewForm.value && (
        <ReviewForm
          yvkey={yourViews.key}
          yvauth={yourViews.auth}
          product={product}
        />
      )}
      {displayQuestionForm.value && (
        <QuestionForm yvkey={yourViews.key} product={product} />
      )}
    </div>
  );
}
export default ProductReviews;
