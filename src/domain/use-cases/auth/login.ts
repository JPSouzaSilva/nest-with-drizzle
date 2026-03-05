import { UseCase } from "..";

export interface LoginUseCaseInput {
  email: string;
  password: string;
}

export type LoginUseCaseOutput = { authMethod: "EMAIL_2FA" | "TOTP" } | void;

export type LoginUseCaseType = UseCase<LoginUseCaseInput, LoginUseCaseOutput>;
