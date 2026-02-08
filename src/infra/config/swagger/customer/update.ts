import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiNoContentResponse } from "@nestjs/swagger";

export const UpdateCustomerResponse = applyDecorators(
  ApiOperation({
    summary: "Update a customer",
    description: "Update a customer"
  }),
  ApiNoContentResponse({
    description: "Customer updated successfully"
  })
);
