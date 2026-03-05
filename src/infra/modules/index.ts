import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EnvConfig } from "../config/env";
import { ExceptionsModule } from "./exceptions";
import { CustomerModule } from "./customer";
import { AuthModule } from "./auth";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => EnvConfig.validate(process.env)]
    }),
    ExceptionsModule,
    CustomerModule,
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
