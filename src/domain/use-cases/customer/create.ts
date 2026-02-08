import { Customer } from "@domain/entities/customer";
import { UseCase } from "..";

export type CreateCustomerUseCaseInput = Omit<Customer, "id">;

export type CreateCustomerUseCaseOutput = void;

export type CreateCustomerUseCaseType = UseCase<
  CreateCustomerUseCaseInput,
  CreateCustomerUseCaseOutput
>;
