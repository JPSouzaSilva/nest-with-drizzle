CREATE TYPE "public"."customer_role" AS ENUM('NORMAL', 'PREMIUM');--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "role" "customer_role" DEFAULT 'NORMAL' NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "totp_secret" text;
