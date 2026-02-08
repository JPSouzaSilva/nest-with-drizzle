import { ExceptionsAdapter } from "@domain/adapters/exceptions";
import { CustomerRepository } from "@domain/repositories/customer";
import {
  CreateCustomerUseCaseInput,
  CreateCustomerUseCaseType
} from "@domain/use-cases/customer/create";
import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";

@Injectable()
export class CreateCustomerUseCase implements CreateCustomerUseCaseType {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly exceptionsAdapter: ExceptionsAdapter
  ) {}

  async execute({
    email,
    name,
    address,
    state,
    zipCode,
    country,
    dateOfBirth
  }: CreateCustomerUseCaseInput): Promise<void> {
    const customer = await this.customerRepository.findByEmail(email);

    if (customer) {
      return this.exceptionsAdapter.badRequest("Customer already exists");
    }

    await this.customerRepository.create({
      id: randomUUID(),
      email,
      name,
      address,
      state,
      zipCode,
      country,
      dateOfBirth
    });
  }
}
