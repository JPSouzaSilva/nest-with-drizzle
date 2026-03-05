import { TokenAdapter } from "@domain/adapters/token";
import { JwtTokenIntegration } from "@infra/integrations/token";
import { JwtGuard } from "@infra/guards/jwt";
import { RolesGuard } from "@infra/guards/roles";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET!,
        signOptions: { expiresIn: Number(process.env.JWT_EXPIRES_IN ?? "1d") }
      })
    })
  ],
  providers: [
    { provide: TokenAdapter, useClass: JwtTokenIntegration },
    JwtGuard,
    RolesGuard
  ],
  exports: [TokenAdapter, JwtGuard, RolesGuard]
})
export class TokenModule {}
