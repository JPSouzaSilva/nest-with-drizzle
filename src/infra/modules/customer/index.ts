import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database";
import { ExceptionsModule } from "../exceptions";
import { CreateCustomerUseCase } from "src/use-cases/customer/create";
import { FindAllCustomersUseCase } from "src/use-cases/customer/find-all";
import { FindCustomerByIdUseCase } from "src/use-cases/customer/find-by-id";
import { UpdateCustomerUseCase } from "src/use-cases/customer/update";
import { DeleteCustomerUseCase } from "src/use-cases/customer/delete";
import { CustomerController } from "@infra/controllers/customer";

@Module({
  imports: [DatabaseModule, ExceptionsModule],
  providers: [
    CreateCustomerUseCase,
    FindCustomerByIdUseCase,
    FindAllCustomersUseCase,
    UpdateCustomerUseCase,
    DeleteCustomerUseCase,
  ],
  controllers: [CustomerController],
})
export class CustomerModule {}
