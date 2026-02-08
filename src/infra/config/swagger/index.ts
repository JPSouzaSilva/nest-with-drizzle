import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";

export class SwaggerConfig {
  static config(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle("White Label API")
      .setDescription("API description")
      .setVersion("1.0")
      .addSecurity("bearerAuth", {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      })
      .build();

    const document = SwaggerModule.createDocument(app, config);

    app.use(
      "/docs",
      apiReference({
        theme: "dark",
        darkMode: true,
        layout: "modern",
        spec: {
          content: document,
        },
      }),
    );
  }
}
