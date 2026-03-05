import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { customers } from "./customer";

export const twoFactorCodes = pgTable("two_factor_codes", {
  id: text().primaryKey(),
  customerId: text()
    .notNull()
    .references(() => customers.id, { onDelete: "cascade" }),
  code: text().notNull(),
  expiresAt: timestamp({ mode: "date" }).notNull(),
  used: boolean().default(false).notNull()
});
