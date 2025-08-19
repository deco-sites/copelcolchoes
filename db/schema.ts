import {
  index,
  integer,
  sqliteTable,
  text,
} from "npm:drizzle-orm@0.30.10/sqlite-core";

export const postViews = sqliteTable("post_views", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  postSlug: text("post_slug").notNull().unique(),
  views: integer("views").notNull().default(1),
  lastViewed: text("last_viewed").notNull(),
}, (table) => ({
  postSlugIdx: index("post_slug_idx").on(table.postSlug),
}));
