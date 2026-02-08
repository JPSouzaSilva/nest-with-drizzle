import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EnvConfig } from "../config/env";
import { ExceptionsModule } from "./exceptions";
import { CustomerModule } from "./customer";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => EnvConfig.validate(process.env)]
    }),
    ExceptionsModule,
    CustomerModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
