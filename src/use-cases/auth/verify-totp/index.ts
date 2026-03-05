import { ExceptionsAdapter } from "@domain/adapters/exceptions";
import { TokenAdapter } from "@domain/adapters/token";
import { TotpAdapter } from "@domain/adapters/totp";
import { CustomerRole } from "@domain/entities/customer-role";
import { CustomerRepository } from "@domain/repositories/customer";
import {
  VerifyTotpUseCaseInput,
  VerifyTotpUseCaseOutput,
  VerifyTotpUseCaseType
} from "@domain/use-cases/auth/verify-totp";
import { Injectable } from "@nestjs/common";

@Injectable()
export class VerifyTotpUseCase implements VerifyTotpUseCaseType {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly tokenAdapter: TokenAdapter,
    private readonly totpAdapter: TotpAdapter,
    private readonly exceptionsAdapter: ExceptionsAdapter
  ) {}

  async execute({
    email,
    token
  }: VerifyTotpUseCaseInput): Promise<VerifyTotpUseCaseOutput> {
    const customer = await this.customerRepository.findByEmail(email);

    if (!customer || customer.role !== CustomerRole.PREMIUM) {
      return this.exceptionsAdapter.unauthorized("Invalid credentials");
    }

    if (!customer.totpSecret) {
      return this.exceptionsAdapter.unauthorized("TOTP not configured");
    }

    const isValid = this.totpAdapter.verify(token, customer.totpSecret);

    if (!isValid) {
      return this.exceptionsAdapter.unauthorized(
        "Invalid or expired TOTP code"
      );
    }

    const accessToken = this.tokenAdapter.sign({
      sub: customer.id,
      role: customer.role
    });

    return { accessToken };
  }
}
