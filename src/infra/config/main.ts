import { NestFactory } from "@nestjs/core";
import { AppModule } from "../modules";
import { HttpStatus, ValidationPipe } from "@nestjs/common";
import { SwaggerConfig } from "@infra/config/swagger";
import "@infra/config/tracing";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  SwaggerConfig.config(app);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
    })
  );

  app.enableCors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  });

  await app.listen(Number(process.env.PORT));
}

bootstrap();
