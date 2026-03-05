import { ExceptionsAdapter } from "@domain/adapters/exceptions";
import { TokenAdapter } from "@domain/adapters/token";
import { CustomerRepository } from "@domain/repositories/customer";
import { TwoFactorCodeRepository } from "@domain/repositories/two-factor-code";
import {
  Verify2FAUseCaseInput,
  Verify2FAUseCaseOutput,
  Verify2FAUseCaseType
} from "@domain/use-cases/auth/verify-2fa";
import { Injectable } from "@nestjs/common";

@Injectable()
export class Verify2FAUseCase implements Verify2FAUseCaseType {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly twoFactorCodeRepository: TwoFactorCodeRepository,
    private readonly tokenAdapter: TokenAdapter,
    private readonly exceptionsAdapter: ExceptionsAdapter
  ) {}

  async execute({
    email,
    code
  }: Verify2FAUseCaseInput): Promise<Verify2FAUseCaseOutput> {
    const customer = await this.customerRepository.findByEmail(email);

    if (!customer) {
      return this.exceptionsAdapter.unauthorized("Invalid credentials");
    }

    const twoFactorCode = await this.twoFactorCodeRepository.findValidCode(
      customer.id,
      code
    );

    if (!twoFactorCode) {
      return this.exceptionsAdapter.unauthorized("Invalid or expired 2FA code");
    }

    await this.twoFactorCodeRepository.markAsUsed(twoFactorCode.id);

    const accessToken = this.tokenAdapter.sign({
      sub: customer.id,
      role: customer.role
    });

    return { accessToken };
  }
}
