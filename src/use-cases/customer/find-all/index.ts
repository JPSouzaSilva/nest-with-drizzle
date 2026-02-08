import { CustomerRepository } from "@domain/repositories/customer";
import {
  FindAllCustomersUseCaseInput,
  FindAllCustomersUseCaseOutput,
  FindAllCustomersUseCaseType
} from "@domain/use-cases/customer/find-all";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindAllCustomersUseCase implements FindAllCustomersUseCaseType {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute({
    page,
    limit
  }: FindAllCustomersUseCaseInput): Promise<FindAllCustomersUseCaseOutput> {
    return await this.customerRepository.findAll({ page, limit });
  }
}
