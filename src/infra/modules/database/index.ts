import { CustomerRepository } from "@domain/repositories/customer";
import { DrizzleCustomerRepository } from "@infra/repositories/drizzle/customer-repository";
import { Module } from "@nestjs/common";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { DRIZZLE } from "./tokens";

@Module({
  providers: [
    {
      provide: DRIZZLE,
      useFactory(): NodePgDatabase {
        return drizzle(process.env.DATABASE_URL!, {
          casing: "snake_case"
        });
      }
    },
    {
      provide: CustomerRepository,
      useClass: DrizzleCustomerRepository
    }
  ],
  exports: [CustomerRepository]
})
export class DatabaseModule {}
