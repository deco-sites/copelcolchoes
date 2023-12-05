import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import type { SectionProps } from "deco/mod.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import { useQuickReview } from "$store/sdk/useQuickReview.ts";
import { useState } from "preact/hooks";
import StarRatings from "$store/components/product/StarsRatings.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { formatData } from "$store/sdk/format.ts";
import Loading from "$store/components/ui/Loading.tsx";
import type { Product } from "apps/commerce/types.ts";

const ratings = [1, 2, 3, 4, 5];

function SuccessMessage({ variant }: { variant: string }) {
  return (
    <div class="max-lg:py-6 lg:my-8 text-center w-[calc(50%-10px)]">
      <div class="font-bold text-xl leading-6">
        {variant === "Avaliação" ? "Avaliação enviada com sucesso :)" : (
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
    if (e.target === null) return;
    const formData = new FormData(e.target as HTMLFormElement);
    const formProps = Object.fromEntries(formData);
    const { inProductGroupWithID, image, isVariantOf } = product;
    const {
      reviewRating,
      reviewComment,
      reviewUserEmail,
      reviewUserName,
    } = formProps;
    const { name, url } = isVariantOf!;
    const queryData = {
      "imageUrl": (image ? image[0].url || "" : "") || "",
      "productId": inProductGroupWithID || "",
      "productName": name || "",
      "productUrl": url || "",
      "review-comment": `${reviewComment}`,
      "review-rating": `${reviewRating}`,
      "social-email": `${reviewUserEmail}`,
      "storeKey": yvkey,
      "user-email": `${reviewUserEmail}`,
      "user-image": "",
      "user-logintype": "email",
      "user-name": "",
      "yv-exhibition-name": `${reviewUserName}`,
      "yv-photosupload": "",
      "yv__rpl": "?",
    };
    const queryParams = `?${new URLSearchParams(queryData).toString()}`;
    const fetchUrl =
      `https://service.yviews.com.br/reviewformsave/SaveReviewForm${queryParams}`;
    const options = {
      headers: {
        "x-yv-auth": yvauth!,
      },
      method: "GET",
    };
    try {
      loading.value = true;
      const data = await fetch(fetchUrl, options);
      console.log(data);
    } catch (err) {
      throw new Error("Failed to get Yourviews Data", err);
    } finally {
      loading.value = false;
      success.value = true;
      setTimeout(() => {
        success.value = false;
      }, 5000);
    }
  };
  return (
    <article id="formReview" class="font-quicksand block">
      {loading.value ? <Loading /> : (
        <>
          {success.value
            ? <SuccessMessage variant="Avaliação" />
            : (
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
                      <div
                        type="review"
                        class="flex items-center justify-start rating"
                      >
                        <div class="rating relative box-border !flex gap-1">
                          <input
                            type="radio"
                            required
                            name="reviewRating"
                            value={0}
                            class="rating-hidden !w-0 !h-0"
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
                          name="reviewRecommends"
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
                          name="reviewRecommends"
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
    if (e.target === null) return;
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
      console.log(data);
    } catch (err) {
      throw new Error("Failed to get Yourviews Data", err);
    } finally {
      loading.value = false;
      success.value = true;
      setTimeout(() => {
        success.value = false;
      }, 5000);
    }
  };
  return (
    <article id="questionForm" class="font-quicksand block">
      {loading.value ? <Loading /> : (
        <>
          {success.value
            ? <SuccessMessage variant="Pergunta" />
            : (
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
    `https://service.yourviews.com.br/api/v2/pub/review/${inProductGroupWithID}?page=1&count=3&orderBy=1`,
    options,
  ).then((r) => r.json());
  return { reviews, product, yourViews };
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
  const firstPage = page < 3 || lastPage < 5
    ? 1
    : page + 2 >= lastPage
    ? lastPage - 4
    : page - 2;
  for (let i = firstPage; i <= lastPage; i++) {
    if (pages.length === 5 || pages.length === lastPage) return pages;
    pages.push(i);
  }
  return pages;
};

function ProductReviews(
  { reviews, product, yourViews }: SectionProps<typeof loader>,
) {
  const { inProductGroupWithID } = product;
  const { reviews: rates, totalReview: totalRate } = useQuickReview();
  const { Element, Pagination } = reviews;
  rates.value = !Element ? 0 : Element.TotalRatings;
  totalRate.value = !Element ? 0 : Element.Rating;
  const [currentReviews, setCurrentReviews] = useState(
    Element ? Element.Reviews : [],
  );
  const [pagination, setPagination] = useState(
    Pagination ? Pagination : {},
  );
  const { IsFirstPage, IsLastPage, PageCount, PageNumber } = pagination;
  const [pages, setPages] = useState(getPages(PageNumber, PageCount));
  const loadingPageReview = useSignal(false);
  const handlePageChange = async (page: number) => {
    const options = {
      headers: {
        YVStoreKey: yourViews.key,
      },
    };
    const fetchUrl =
      `https://service.yourviews.com.br/api/v2/pub/review/${inProductGroupWithID}?page=${page}&count=3&orderBy=1`;
    let newReviews = reviews;
    try {
      loadingPageReview.value = true;
      const response = await fetch(
        fetchUrl,
        options,
      );
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

  const displayQuestionForm = useSignal(false);
  const displayReviewForm = useSignal(false);
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
      <h3 class="lg:text-[1.75rem] lg:leading-[2.1875rem] max-lg:text-[1.5rem] max-lg:leading-[1.875rem] text-primary font-semibold tracking-normal my-5 text-left">
        Avaliações
      </h3>
      <div
        class={`lg:bg-white lg:flex lg:flex-col lg:justify-start ${
          loadingPageReview.value ? "opacity-30 cursor-wait" : ""
        }`}
      >
        {hasRatings && (
          <>
            <div class="w-full font-quicksand">
              <div class="flex flex-col items-start gap-5 max-lg:gap-[0.625rem]">
                <p class="text-primary text-2xl leading-6 capitalize font-medium max-lg:text-base max-lg:font-semibold max-lg:leading-6">
                  Comentários
                </p>
                <StarRatings totalRate={totalRate.value} />
              </div>
              <div class="py-8 w-full">
                <ul class="flex flex-col gap-4">
                  {currentReviews.map((review: Review) => {
                    const qualidade = review.CustomFields.find((customField) =>
                      customField.Name === "Qualidade"
                    );
                    const qualidadeValue = qualidade
                      ? customFieldsValue[
                        qualidade.Values[0] as keyof typeof customFieldsValue
                      ]
                      : review.Rating;
                    const design = review.CustomFields.find((customField) =>
                      customField.Name === "Design"
                    );
                    const designValue = design
                      ? customFieldsValue[
                        design.Values[0] as keyof typeof customFieldsValue
                      ]
                      : review.Rating;
                    const recommend = review.CustomFields.find((customField) =>
                      customField.Name ===
                        "Você recomenda esse produto?"
                    );
                    const recommendValue = recommend
                      ? recommend.Values[0] === "Sim"
                      : review.Rating > 3;
                    return (
                      <li class="py-6 px-4 flex rounded-[0.3125rem] border border-[#dbdbdb] lg:flex-row max-lg:flex-col">
                        <div class="lg:w-[15%] max-lg:w-full">
                          <div class="flex justify-between items-center">
                            <div class="items-center flex gap-2 justify-start w-full">
                              <Icon id="ReviewUser" size={24} />
                              <h3 class="text-primary text-sm font-semibold leading-snug">
                                {review.User.ExhibitionName}
                              </h3>
                            </div>
                          </div>
                        </div>
                        <div class="flex flex-col items-start lg:w-[55%] lg:m-0 max-lg:w-full max-lg:my-5">
                          <div class="flex gap-6 mb-4 items-center">
                            <StarRatings totalRate={review.Rating} />
                            <div class="flex justify-between items-center">
                              <div class="text-[#828282] text-sm leading-snug font-medium">
                                {formatData(review.Date)}
                              </div>
                            </div>
                          </div>
                          <div class="flex justify-between w-full">
                            <div class="text-secondary text-sm font-semibold leading-5 overflow-hidden line-clamp-3 pr-6">
                              {review.Review}
                            </div>
                          </div>
                        </div>
                        <div class="lg:w-[40%] max-lg:w-full">
                          <div class="text-primary">
                            <div class="gap-2 mt-0 lg:font-base lg:leading-8 items-center text-primar flex font-semibold my-2 max-lg:text-sm leading-5">
                              {recommendValue
                                ? (
                                  <>
                                    <Icon id="ReviewCheck" size={30} />
                                    Sim, recomendaria este produto a um amigo
                                  </>
                                )
                                : "Não recomendaria este produto a um amigo"}
                            </div>
                            <div class="w-[12.5rem] justify-between lg:font-base lg:leading-8 items-center text-primar flex font-semibold my-2 max-lg:hidden">
                              Design
                              <StarRatings
                                totalRate={designValue}
                              />
                            </div>
                            <div class="w-[12.5rem] justify-between lg:font-base lg:leading-8 items-center text-primar flex font-semibold my-2 max-lg:hidden">
                              Qualidade
                              <StarRatings
                                totalRate={qualidadeValue}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            {pages.length > 1 &&
              (
                <div class="flex justify-center items-center">
                  <nav class="my-4">
                    <ul class="flex justify-center items-center p-0 m-0">
                      <li class="flex justify-center items-center border-none bg-transparent text-primary">
                        <button
                          class="text-lg font-semibold px-[0.3125rem] h-6 min-w-[1.5rem] flex overflow-visible m-0 border-0 bg-transparent justify-center items-center appearance-none disabled:opacity-30 disabled:cursor-not-allowed"
                          onClick={() => handlePageChange(PageNumber - 1)}
                          title={`Ir para a página anterior`}
                          type="button"
                          disabled={IsFirstPage || loadingPageReview.value}
                        >
                          <div class="rotate-90 relative inline-block h-[0.625rem] w-[0.625rem]">
                            <span class="left-0 rotate-45 top-[0.3125rem] absolute w-[0.384375rem] h-[0.05rem] bg-primary inline-block transition-all">
                            </span>
                            <span class="right-0 -rotate-45 top-[0.3125rem] absolute w-[0.384375rem] h-[0.05rem] bg-primary inline-block transition-all">
                            </span>
                          </div>
                        </button>
                      </li>
                      {pages.map((page) => (
                        <li
                          class={`flex justify-center items-center border-none bg-transparent ${
                            page === PageNumber
                              ? "text-secondary underline pointer-events-none"
                              : "text-primary"
                          }`}
                        >
                          <button
                            class="text-lg font-semibold px-[0.3125rem] h-6 min-w-[1.5rem] flex overflow-visible m-0 border-0 bg-transparent justify-center items-center appearance-none"
                            onClick={() => handlePageChange(page)}
                            title={`Ir para a página ${page}`}
                            type="button"
                            disabled={loadingPageReview.value}
                          >
                            {page}
                          </button>
                        </li>
                      ))}
                      <li class="flex justify-center items-center border-none bg-transparent text-primary">
                        <button
                          class="text-lg font-semibold px-[0.3125rem] h-6 min-w-[1.5rem] flex overflow-visible m-0 border-0 bg-transparent justify-center items-center appearance-none disabled:opacity-30 disabled:cursor-not-allowed"
                          onClick={() => handlePageChange(PageNumber + 1)}
                          title={`Ir para a próxima página`}
                          type="button"
                          disabled={IsLastPage || loadingPageReview.value}
                        >
                          <div class="-rotate-90 relative inline-block h-[0.625rem] w-[0.625rem]">
                            <span class="left-0 rotate-45 top-[0.3125rem] absolute w-[0.384375rem] h-[0.05rem] bg-primary inline-block transition-all">
                            </span>
                            <span class="right-0 -rotate-45 top-[0.3125rem] absolute w-[0.384375rem] h-[0.05rem] bg-primary inline-block transition-all">
                            </span>
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
      <p class="text-[#707070] text-xl font-medium leading-[1.5625rem] py-5">
        {`Possui esse produto? ${
          hasRatings ? "Avalie-o!" : "Seja o primeiro a avaliá-lo!"
        }`}
      </p>
      <div class="flex justify-start lg:flex-row flex-col lg:gap-6">
        <div id="formReviewButton" class="max-lg:py-4 max-lg:mx-auto">
          <button
            class="hover:bg-primary-focus bg-primary text-white rounded-[0.3125rem] text-base font-medium h-12 w-[17.5rem] transition-all duration-300 max-lg:mx-auto"
            onClick={openReviewForm}
          >
            Fazer avaliação
          </button>
        </div>
        <div id="questionFormButton" class="max-lg:py-4 max-lg:mx-auto">
          <button
            class="hover:bg-primary-focus bg-primary text-white rounded-[0.3125rem] text-base font-medium h-12 w-[17.5rem] transition-all duration-300 max-lg:mx-auto"
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
