import { Customer } from "@domain/entities/customer";
import { UseCase } from "..";

export interface UpdateCustomerUseCaseInput {
  id: string;
  data: Partial<Omit<Customer, "id">>;
}

export type UpdateCustomerUseCaseOutput = void;

export type UpdateCustomerUseCaseType = UseCase<
  UpdateCustomerUseCaseInput,
  UpdateCustomerUseCaseOutput
>;
