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
