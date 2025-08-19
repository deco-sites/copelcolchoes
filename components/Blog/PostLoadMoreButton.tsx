import { type BlogPost } from "apps/blog/types.ts";
import { type SortBy } from "site/sdk/posts.ts";
import { type SocialMedia } from "site/components/Blog/PostShare.tsx";
import { useEffect, useRef } from "preact/hooks";
import { render } from "preact";
import { useSignal } from "@preact/signals";
import { clx } from "site/sdk/clx.ts";
import { invoke } from "site/runtime.ts";
import { PostItem } from "site/components/Blog/PostList.tsx";

interface Props {
  buttonText?: string;
  postsPerPage: number;
  socialMedia?: SocialMedia[];
}

export default function PostLoadMoreButton({
  buttonText = "Ver mais",
  postsPerPage,
  socialMedia,
}: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isLoading = useSignal(false);
  const postContainerRefs = useRef<HTMLElement[]>([]);

  const renderPosts = (posts: BlogPost[], postList: HTMLElement) => {
    const fragment = document.createDocumentFragment();
    postContainerRefs.current = [];

    posts.forEach((post: BlogPost) => {
      const postElement = document.createElement("div");
      render(<PostItem {...post} socialMedia={socialMedia} />, postElement);
      postElement.style.cssText =
        "opacity: 0; transform: translateY(20px); transition: all 0.3s ease";
      fragment.appendChild(postElement);
      postContainerRefs.current.push(postElement);
    });

    postList.appendChild(fragment);

    requestAnimationFrame(() => {
      postContainerRefs.current.forEach((element, index) => {
        setTimeout(() => {
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
        }, index * 100);
      });
    });
  };

  const updateURL = (nextPage: number) => {
    const newUrl = new URL(globalThis.location.href);
    newUrl.searchParams.set("page", nextPage.toString());
    globalThis.history.pushState({}, "", newUrl.toString());
  };

  useEffect(() => {
    return () => {
      postContainerRefs.current = [];
      buttonRef.current = null;
    };
  }, []);

  async function handleClick() {
    if (isLoading.value) return;
    isLoading.value = true;

    const postList = document.getElementById("post-list");
    if (!postList) return;

    const urlParams = new URLSearchParams(globalThis.location.search);
    const nextPage = Number(urlParams.get("page") ?? 1) + 1;

    try {
      const { posts, hasMorePosts } = await invoke.site.loaders.posts.posts({
        page: nextPage,
        postsPerPage,
        keyword: urlParams.get("keyword") ?? "",
        tag: urlParams.get("tag") ?? "",
        category: urlParams.get("category") ?? "",
        sort: (urlParams.get("sort") as SortBy) ?? "date_desc",
      });

      renderPosts(posts, postList);
      updateURL(nextPage);

      if (postContainerRefs.current[0]) {
        setTimeout(() => {
          postContainerRefs.current[0]?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 100);
      }

      if (!hasMorePosts && buttonRef.current) {
        const parentElement = buttonRef.current.parentElement;
        if (parentElement) {
          render(null, parentElement);
          parentElement.remove();
        }
      }
    } catch (error) {
      console.error("Failed to load more posts:", error);
    } finally {
      isLoading.value = false;
    }
  }

  return (
    <button
      ref={buttonRef}
      disabled={isLoading.value}
      class={clx(
        "m-auto rounded-[100px] bg-primary px-[30px] pt-[2px] leading-[48px] max-md:leading-[38px]",
        "font-quicksand text-base font-medium text-white max-md:text-sm",
        "duration-300 hover:bg-primary-focus",
        "disabled:cursor-wait disabled:opacity-70",
      )}
      onClick={handleClick}
      type="button"
    >
      {isLoading.value ? "Carregando..." : buttonText}
    </button>
  );
}
