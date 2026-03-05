import { Customer } from "@domain/entities/customer";
import { UseCase } from "..";

export type CreateCustomerUseCaseInput = Omit<Customer, "id" | "totpSecret">;

export type CreateCustomerUseCaseOutput = { totpUri: string } | void;

export type CreateCustomerUseCaseType = UseCase<
  CreateCustomerUseCaseInput,
  CreateCustomerUseCaseOutput
>;
