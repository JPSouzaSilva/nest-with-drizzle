import { ExceptionsAdapter } from "@domain/adapters/exceptions";
import { HashAdapter } from "@domain/adapters/hash";
import { TotpAdapter } from "@domain/adapters/totp";
import { CustomerRole } from "@domain/entities/customer-role";
import { CustomerRepository } from "@domain/repositories/customer";
import {
  CreateCustomerUseCaseInput,
  CreateCustomerUseCaseOutput,
  CreateCustomerUseCaseType
} from "@domain/use-cases/customer/create";
import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";

@Injectable()
export class CreateCustomerUseCase implements CreateCustomerUseCaseType {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly hashAdapter: HashAdapter,
    private readonly totpAdapter: TotpAdapter,
    private readonly exceptionsAdapter: ExceptionsAdapter
  ) {}

  async execute({
    email,
    password,
    name,
    address,
    state,
    zipCode,
    country,
    dateOfBirth,
    role
  }: CreateCustomerUseCaseInput): Promise<CreateCustomerUseCaseOutput> {
    const existing = await this.customerRepository.findByEmail(email);

    if (existing) {
      return this.exceptionsAdapter.badRequest("Customer already exists");
    }

    const hashedPassword = await this.hashAdapter.hash(password);

    const totpSecret =
      role === CustomerRole.PREMIUM ? this.totpAdapter.generateSecret() : null;

    await this.customerRepository.create({
      id: randomUUID(),
      email,
      password: hashedPassword,
      name,
      address,
      state,
      zipCode,
      country,
      dateOfBirth,
      role,
      totpSecret
    });

    if (role === CustomerRole.PREMIUM && totpSecret) {
      return { totpUri: this.totpAdapter.generateUri(email, totpSecret) };
    }
  }
}
