import { PaginatedResponse } from "@domain/constants/pagination";
import { Customer } from "@domain/entities/customer";
import { CustomerRepository } from "@domain/repositories/customer";

export class CustomerRepositoryStub extends CustomerRepository {
  create(): Promise<void> {
    return Promise.resolve();
  }
  findAll(): Promise<PaginatedResponse<Customer>> {
    return Promise.resolve({
      data: [],
      total: 0,
      page: 1,
      limit: 10
    });
  }
  findById(): Promise<Customer | null> {
    return Promise.resolve(null);
  }
  findByEmail(): Promise<Customer | null> {
    return Promise.resolve(null);
  }
  update(): Promise<void> {
    return Promise.resolve();
  }
  delete(): Promise<void> {
    return Promise.resolve();
  }
}
