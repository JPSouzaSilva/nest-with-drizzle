import { HashAdapter } from "@domain/adapters/hash";
import { BcryptHashIntegration } from "@infra/integrations/hash";
import { Module } from "@nestjs/common";

@Module({
  providers: [{ provide: HashAdapter, useClass: BcryptHashIntegration }],
  exports: [HashAdapter]
})
export class HashModule {}
