import { UseCase } from "..";

export interface VerifyTotpUseCaseInput {
  email: string;
  token: string;
}

export type VerifyTotpUseCaseOutput = { accessToken: string } | void;

export type VerifyTotpUseCaseType = UseCase<
  VerifyTotpUseCaseInput,
  VerifyTotpUseCaseOutput
>;
