import { LoginUseCase } from "src/use-cases/auth/login";
import { Verify2FAUseCase } from "src/use-cases/auth/verify-2fa";
import { VerifyTotpUseCase } from "src/use-cases/auth/verify-totp";
import { AuthController } from "@infra/controllers/auth";
import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database";
import { EmailModule } from "../email";
import { ExceptionsModule } from "../exceptions";
import { HashModule } from "../hash";
import { TokenModule } from "../token";
import { TotpModule } from "../totp";

@Module({
  imports: [
    DatabaseModule,
    ExceptionsModule,
    HashModule,
    EmailModule,
    TokenModule,
    TotpModule
  ],
  providers: [LoginUseCase, Verify2FAUseCase, VerifyTotpUseCase],
  controllers: [AuthController]
})
export class AuthModule {}
