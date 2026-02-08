import { ExceptionsAdapter } from "@domain/adapters/exceptions";
import { CustomerRepository } from "@domain/repositories/customer";
import {
  UpdateCustomerUseCaseInput,
  UpdateCustomerUseCaseType,
} from "@domain/use-cases/customer/update";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UpdateCustomerUseCase implements UpdateCustomerUseCaseType {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly exceptionsAdapter: ExceptionsAdapter,
  ) {}

  async execute({ id, data }: UpdateCustomerUseCaseInput): Promise<void> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      return this.exceptionsAdapter.notFound("Customer not found");
    }

    if (data.email && data.email !== customer.email) {
      const existingCustomer = await this.customerRepository.findByEmail(
        data.email,
      );

      if (existingCustomer) {
        return this.exceptionsAdapter.badRequest("Email already in use");
      }
    }

    await this.customerRepository.update(id, {
      name: data.name,
      email: data.email,
      address: data.address,
      state: data.state,
      zipCode: data.zipCode,
      country: data.country,
      dateOfBirth: data.dateOfBirth,
    });
  }
}
