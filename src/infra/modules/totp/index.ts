import { TotpAdapter } from "@domain/adapters/totp";
import { OtplibTotpIntegration } from "@infra/integrations/totp";
import { Module } from "@nestjs/common";

@Module({
  providers: [{ provide: TotpAdapter, useClass: OtplibTotpIntegration }],
  exports: [TotpAdapter]
})
export class TotpModule {}
