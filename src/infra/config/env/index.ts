import { plainToInstance } from "class-transformer";
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  validateSync
} from "class-validator";

export enum Environment {
  LOCAL = "LOCAL",
  DEVELOPMENT = "DEVELOPMENT",
  PRODUCTION = "PRODUCTION"
}

class EnvironmentVariables {
  // Database
  @IsString()
  DATABASE_URL: string;

  // Server Configuration
  @IsInt()
  @IsPositive()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  @IsEnum(Environment)
  NODE_ENV: Environment;

  // Tracing
  @IsString()
  @IsNotEmpty()
  OTEL_SERVICE_NAME: string;

  @IsString()
  @IsNotEmpty()
  OTEL_EXPORTER_OTLP_ENDPOINT: string;

  // Auth
  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_EXPIRES_IN: string;

  // Email (SMTP)
  @IsString()
  @IsNotEmpty()
  SMTP_HOST: string;

  @IsInt()
  @IsPositive()
  SMTP_PORT: number;

  @IsString()
  SMTP_SECURE: string;

  @IsString()
  @IsNotEmpty()
  SMTP_USER: string;

  @IsString()
  @IsNotEmpty()
  SMTP_PASS: string;

  @IsString()
  @IsNotEmpty()
  SMTP_FROM: string;
}

export class EnvConfig {
  static validate(config: Record<string, unknown>): EnvironmentVariables {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, {
      enableImplicitConversion: true
    });

    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false
    });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    return validatedConfig;
  }
}
