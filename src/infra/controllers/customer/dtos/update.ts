import { PartialType } from "@nestjs/swagger";
import { CreateCustomerDto } from "./create";

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
