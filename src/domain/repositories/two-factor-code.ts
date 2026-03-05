import { TwoFactorCode } from "@domain/entities/two-factor-code";

export abstract class TwoFactorCodeRepository {
  abstract create(code: TwoFactorCode): Promise<void>;
  abstract findValidCode(
    customerId: string,
    code: string
  ): Promise<TwoFactorCode | null>;
  abstract markAsUsed(id: string): Promise<void>;
  abstract deleteExpired(): Promise<void>;
}
