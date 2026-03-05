import { EmailAdapter } from "@domain/adapters/email";
import { NodemailerEmailIntegration } from "@infra/integrations/email";
import { Module } from "@nestjs/common";

@Module({
  providers: [{ provide: EmailAdapter, useClass: NodemailerEmailIntegration }],
  exports: [EmailAdapter]
})
export class EmailModule {}
