CREATE TYPE "public"."customer_role" AS ENUM('NORMAL', 'PREMIUM');--> statement-breakpoint
CREATE TABLE "two_factor_codes" (
	"id" text PRIMARY KEY NOT NULL,
	"customer_id" text NOT NULL,
	"code" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"used" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "password" text NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "role" "customer_role" DEFAULT 'NORMAL' NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "totp_secret" text;--> statement-breakpoint
ALTER TABLE "two_factor_codes" ADD CONSTRAINT "two_factor_codes_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE no action;