import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiOkResponse } from "@nestjs/swagger";
import { mockCustomerBuilder } from "@test/builders/customer";

const EXAMPLE = mockCustomerBuilder();

export const FindCustomerByIdResponse = applyDecorators(
  ApiOperation({
    summary: "Find a customer by id",
    description: "Find a customer by id",
  }),
  ApiOkResponse({
    description: "Customer found successfully",
    example: EXAMPLE,
  }),
);
