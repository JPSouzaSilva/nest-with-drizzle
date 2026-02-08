import {
  PaginatedResponse,
  PaginationParams
} from "@domain/constants/pagination";
import { Customer } from "@domain/entities/customer";

export type UpdateCustomerData = Partial<Omit<Customer, "id">>;

export abstract class CustomerRepository {
  abstract create(customer: Customer): Promise<void>;
  abstract findAll(
    paginationParams: PaginationParams
  ): Promise<PaginatedResponse<Customer>>;
  abstract findById(id: string): Promise<Customer | null>;
  abstract findByEmail(email: string): Promise<Customer | null>;
  abstract update(id: string, customer: UpdateCustomerData): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
