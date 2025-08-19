import { type Section } from "@deco/deco/blocks";
import { type Category } from "site/components/Blog/SidebarCategories.tsx";
import { type Tag } from "site/components/Blog/SidebarTags.tsx";

export function populateSidebar(
  sidebar?: Section[],
  categories?: Category[],
  tags?: Tag[],
) {
  const [SidebarSection] = sidebar ?? [];
  if (!SidebarSection) return null;

  checkComponent(SidebarSection);

  const { Component } = SidebarSection;
  const props = buildSidebarProps(SidebarSection, categories, tags);

  return <Component {...props} />;
}

function buildSidebarProps(
  SidebarSection: Section,
  categories?: Category[],
  tags?: Tag[],
) {
  const isLazy = "section" in SidebarSection.props;

  if (isLazy) {
    return {
      ...SidebarSection.props,
      section: {
        ...SidebarSection.props.section,
        props: {
          ...SidebarSection.props.section.props,
          categories: {
            ...SidebarSection.props.section.props.categories,
            categories,
          },
          tags: {
            ...SidebarSection.props.section.props.tags,
            tags,
          },
        },
      },
    };
  }

  return {
    ...SidebarSection.props,
    categories: {
      ...SidebarSection.props.categories,
      categories,
    },
    tags: {
      ...SidebarSection.props.tags,
      tags,
    },
  };
}

function checkComponent(section: Section) {
  const expectedPath = "site/sections/Blog/BlogSidebar.tsx";
  const normalPath = section.metadata?.component;
  const lazyPath = section.props?.section?.metadata?.component;

  if (normalPath !== expectedPath && lazyPath !== expectedPath) {
    throw new Error(
      `Expected component to be ${expectedPath} but got ${
        lazyPath ?? normalPath
      }`,
    );
  }
}
