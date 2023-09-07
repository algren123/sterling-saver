CREATE TABLE `Bills` (
	`email` text PRIMARY KEY NOT NULL,
	`councilTax` integer NOT NULL,
	`electricity` integer NOT NULL,
	`gas` integer NOT NULL,
	`internet` integer NOT NULL,
	`phone` integer NOT NULL,
	`water` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Income` (
	`email` text PRIMARY KEY NOT NULL,
	`salary` integer NOT NULL,
	`other` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Savings` (
	`email` text PRIMARY KEY NOT NULL,
	`amount` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Subscriptions` (
	`email` text PRIMARY KEY NOT NULL,
	`amazon` integer NOT NULL,
	`apple` integer NOT NULL,
	`disneyPlus` integer NOT NULL,
	`netflix` integer NOT NULL,
	`gym` integer NOT NULL,
	`spotify` integer NOT NULL
);
