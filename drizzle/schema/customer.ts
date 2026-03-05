import { date, pgEnum, text, pgTable } from "drizzle-orm/pg-core";

export const customerRoleEnum = pgEnum("customer_role", ["NORMAL", "PREMIUM"]);

export const customers = pgTable("customers", {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  address: text().notNull(),
  state: text().notNull(),
  zipCode: text().notNull(),
  country: text().notNull(),
  dateOfBirth: date({ mode: "date" }).notNull(),
  role: customerRoleEnum().notNull().default("NORMAL"),
  totpSecret: text()
});
