CREATE TABLE `post_views` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`post_slug` text NOT NULL,
	`views` integer DEFAULT 1 NOT NULL,
	`last_viewed` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `post_views_post_slug_unique` ON `post_views` (`post_slug`);--> statement-breakpoint
CREATE INDEX `post_slug_idx` ON `post_views` (`post_slug`);