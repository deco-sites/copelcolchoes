import { Head } from "$fresh/runtime.ts";
import { type Section } from "@deco/deco/blocks";

export interface Props {
  title: string;
  asideMenu: Section;
  content: Section;
}

function InstitutionalPage({
  asideMenu: { Component: AsideComponent, props: asideProps },
  content: { Component: ContentComponent, props: contentProps },
  title,
}: Props) {
  return (
    <>
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .markdown-body h2 {
              font-size: 20px;
              font-weight: 700;
              line-height: 1.4;
              margin: 20px 0;
            }
            .markdown-body h3 {
              font-size: 20px;
              color: rgb(0 43 98);
              padding: 18px 18px 18px 38px;
              font-weight: 700;
              font-family: 'Comfortaa';
            }
            .markdown-body p:empty {
              display: none;
            }
            .markdown-body p:last-child {
              margin-bottom: 20px;
            }
            .markdown-body p, .markdown-body li, .markdown-body h4 {
              color: #000000;
              font-size: 14px;
              font-weight: 400;
              line-height: 20px;
              list-style: circle inside !important;
            }
            .markdown-body p {
              padding: 10px 0;
            }
            .markdown-body a {
              text-decoration: underline;
            }
            .markdown-body td {
              border: 1px solid #000000;
            }
          `,
          }}
        />
      </Head>
      <div class="lg:w-[960px] mx-auto relative flex justify-between my-5">
        <div class="pt-[5px] w-[170px] max-lg:hidden font-quicksand">
          <h2 class="text-black">
            {title}
          </h2>
          <AsideComponent {...asideProps} />
        </div>
        <div class="max-w-[720px] w-full relative">
          <h2 class="lg:hidden text-black">{title}</h2>
          {/* @ts-ignore opting for a ignore here so we can use a union type for the content section prop, and display it nicely in the admin panel */}
          <ContentComponent {...contentProps} />
        </div>
      </div>
    </>
  );
}

export default InstitutionalPage;
