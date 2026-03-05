import { EmailAdapter } from "@domain/adapters/email";
import { ExceptionsAdapter } from "@domain/adapters/exceptions";
import { HashAdapter } from "@domain/adapters/hash";
import { CustomerRole } from "@domain/entities/customer-role";
import { CustomerRepository } from "@domain/repositories/customer";
import { TwoFactorCodeRepository } from "@domain/repositories/two-factor-code";
import {
  LoginUseCaseInput,
  LoginUseCaseOutput,
  LoginUseCaseType
} from "@domain/use-cases/auth/login";
import { twoFactorCodeTemplate } from "@infra/integrations/email/templates/two-factor-code";
import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";

const TWO_FA_CODE_LENGTH = 6;
const TWO_FA_EXPIRY_MINUTES = 5;

@Injectable()
export class LoginUseCase implements LoginUseCaseType {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly twoFactorCodeRepository: TwoFactorCodeRepository,
    private readonly hashAdapter: HashAdapter,
    private readonly emailAdapter: EmailAdapter,
    private readonly exceptionsAdapter: ExceptionsAdapter
  ) {}

  async execute({
    email,
    password
  }: LoginUseCaseInput): Promise<LoginUseCaseOutput> {
    const customer = await this.customerRepository.findByEmail(email);

    if (!customer) {
      return this.exceptionsAdapter.unauthorized("Invalid credentials");
    }

    const passwordMatch = await this.hashAdapter.compare(
      password,
      customer.password
    );

    if (!passwordMatch) {
      return this.exceptionsAdapter.unauthorized("Invalid credentials");
    }

    if (customer.role === CustomerRole.PREMIUM) {
      return { authMethod: "TOTP" };
    }

    const code = Array.from({ length: TWO_FA_CODE_LENGTH }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + TWO_FA_EXPIRY_MINUTES);

    await this.twoFactorCodeRepository.create({
      id: randomUUID(),
      customerId: customer.id,
      code,
      expiresAt,
      used: false
    });

    const html = twoFactorCodeTemplate({
      name: customer.name,
      code,
      expiresInMinutes: TWO_FA_EXPIRY_MINUTES
    });

    await this.emailAdapter.send(
      customer.email,
      "Your verification code",
      html
    );

    return { authMethod: "EMAIL_2FA" };
  }
}
