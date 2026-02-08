import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiNoContentResponse } from "@nestjs/swagger";

export const DeleteCustomerResponse = applyDecorators(
  ApiOperation({
    summary: "Delete a customer",
    description: "Delete a customer"
  }),
  ApiNoContentResponse({
    description: "Customer deleted successfully"
  })
);
