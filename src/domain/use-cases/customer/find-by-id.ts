import { Customer } from "@domain/entities/customer";
import { UseCase } from "..";

export interface FindCustomerByIdUseCaseInput {
  id: string;
}

export type FindCustomerByIdUseCaseOutput = Customer | void;

export type FindCustomerByIdUseCaseType = UseCase<
  FindCustomerByIdUseCaseInput,
  FindCustomerByIdUseCaseOutput
>;
