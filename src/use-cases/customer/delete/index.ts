import { ExceptionsAdapter } from "@domain/adapters/exceptions";
import { CustomerRepository } from "@domain/repositories/customer";
import {
  DeleteCustomerUseCaseInput,
  DeleteCustomerUseCaseType,
} from "@domain/use-cases/customer/delete";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DeleteCustomerUseCase implements DeleteCustomerUseCaseType {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly exceptionsAdapter: ExceptionsAdapter,
  ) {}

  async execute({ id }: DeleteCustomerUseCaseInput): Promise<void> {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      return this.exceptionsAdapter.notFound("Customer not found");
    }

    await this.customerRepository.delete(id);
  }
}
