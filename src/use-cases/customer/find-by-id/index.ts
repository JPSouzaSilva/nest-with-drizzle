import { ExceptionsAdapter } from "@domain/adapters/exceptions";
import { Customer } from "@domain/entities/customer";
import { CustomerRepository } from "@domain/repositories/customer";
import {
  FindCustomerByIdUseCaseInput,
  FindCustomerByIdUseCaseType,
} from "@domain/use-cases/customer/find-by-id";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindCustomerByIdUseCase implements FindCustomerByIdUseCaseType {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly exceptionsAdapter: ExceptionsAdapter,
  ) {}

  async execute({
    id,
  }: FindCustomerByIdUseCaseInput): Promise<Customer | void> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      return this.exceptionsAdapter.notFound("Customer not found");
    }

    return customer;
  }
}
