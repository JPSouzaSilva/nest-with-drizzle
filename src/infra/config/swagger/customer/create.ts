import { applyDecorators } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation } from "@nestjs/swagger";

export const CreateCustomerResponse = applyDecorators(
  ApiOperation({
    summary: "Create a new customer",
    description: "Create a new customer"
  }),
  ApiCreatedResponse({
    description: "Customer created successfully"
  })
);
