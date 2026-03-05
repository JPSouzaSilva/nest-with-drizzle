import { UseCase } from "..";

export interface Verify2FAUseCaseInput {
  email: string;
  code: string;
}

export type Verify2FAUseCaseOutput = {
  accessToken: string;
} | void;

export type Verify2FAUseCaseType = UseCase<
  Verify2FAUseCaseInput,
  Verify2FAUseCaseOutput
>;
