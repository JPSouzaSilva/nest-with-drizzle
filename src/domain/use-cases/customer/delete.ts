import { UseCase } from "..";

export interface DeleteCustomerUseCaseInput {
  id: string;
}

export type DeleteCustomerUseCaseOutput = void;

export type DeleteCustomerUseCaseType = UseCase<
  DeleteCustomerUseCaseInput,
  DeleteCustomerUseCaseOutput
>;
