import { PaginatedResponse } from "@domain/constants/pagination";
import { Customer } from "@domain/entities/customer";
import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiOkResponse } from "@nestjs/swagger";
import { mockCustomerBuilder } from "@test/builders/customer";

const EXAMPLE: PaginatedResponse<Customer> = {
  data: [mockCustomerBuilder(), mockCustomerBuilder()],
  page: 1,
  limit: 10,
  total: 2,
};

export const FindAllCustomersResponse = applyDecorators(
  ApiOperation({
    summary: "Find all customers",
    description: "Find all customers",
  }),
  ApiOkResponse({
    description: "Customers found successfully",
    example: EXAMPLE,
  }),
);
