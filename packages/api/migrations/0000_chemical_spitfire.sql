CREATE TABLE `Essentials` (
	`email` text PRIMARY KEY NOT NULL,
	`entertainment` integer NOT NULL,
	`food` integer NOT NULL,
	`health` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `User` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL
);
