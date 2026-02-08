import {
  PaginatedResponse,
  PaginationParams
} from "@domain/constants/pagination";
import { Customer } from "@domain/entities/customer";
import { UseCase } from "..";

export type FindAllCustomersUseCaseInput = PaginationParams;

export type FindAllCustomersUseCaseOutput = PaginatedResponse<Customer>;

export type FindAllCustomersUseCaseType = UseCase<
  FindAllCustomersUseCaseInput,
  FindAllCustomersUseCaseOutput
>;
