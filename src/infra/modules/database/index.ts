import { CustomerRepository } from "@domain/repositories/customer";
import { TwoFactorCodeRepository } from "@domain/repositories/two-factor-code";
import { DrizzleCustomerRepository } from "@infra/repositories/drizzle/customer-repository";
import { DrizzleTwoFactorCodeRepository } from "@infra/repositories/drizzle/two-factor-code-repository";
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
    },
    {
      provide: TwoFactorCodeRepository,
      useClass: DrizzleTwoFactorCodeRepository
    }
  ],
  exports: [CustomerRepository, TwoFactorCodeRepository]
})
export class DatabaseModule {}
