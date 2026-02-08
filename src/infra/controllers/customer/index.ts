import { CreateCustomerDto } from "@infra/controllers/customer/dtos/create";
import { CreateCustomerUseCase } from "@use-cases/customer/create";
import { DeleteCustomerUseCase } from "@use-cases/customer/delete";
import { FindAllCustomersUseCase } from "@use-cases/customer/find-all";
import { FindCustomerByIdUseCase } from "@use-cases/customer/find-by-id";
import { UpdateCustomerUseCase } from "@use-cases/customer/update";
import { PaginatedResponse } from "@domain/constants/pagination";
import { Customer } from "@domain/entities/customer";
import { CreateCustomerResponse } from "@infra/config/swagger/customer/create";
import { DeleteCustomerResponse } from "@infra/config/swagger/customer/delete";
import { FindAllCustomersResponse } from "@infra/config/swagger/customer/find-all";
import { FindCustomerByIdResponse } from "@infra/config/swagger/customer/find-by-id";
import { UpdateCustomerResponse } from "@infra/config/swagger/customer/update";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PaginationDto } from "@infra/utils/pagination";
import { UpdateCustomerDto } from "./dtos/update";

@ApiTags("Customer")
@Controller("customers")
export class CustomerController {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly deleteCustomerUseCase: DeleteCustomerUseCase,
    private readonly findCustomerByIdUseCase: FindCustomerByIdUseCase,
    private readonly findAllCustomersUseCase: FindAllCustomersUseCase,
    private readonly updateCustomerUseCase: UpdateCustomerUseCase
  ) {}

  @Post()
  @CreateCustomerResponse
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<void> {
    return await this.createCustomerUseCase.execute({
      name: createCustomerDto.name,
      email: createCustomerDto.email,
      address: createCustomerDto.address,
      state: createCustomerDto.state,
      zipCode: createCustomerDto.zipCode,
      country: createCustomerDto.country,
      dateOfBirth: createCustomerDto.dateOfBirth
    });
  }

  @Get(":id")
  @FindCustomerByIdResponse
  async findById(@Param("id") id: string): Promise<Customer | void> {
    return await this.findCustomerByIdUseCase.execute({ id });
  }

  @Get()
  @FindAllCustomersResponse
  async findAll(
    @Query() query: PaginationDto
  ): Promise<PaginatedResponse<Customer>> {
    return await this.findAllCustomersUseCase.execute({
      limit: query.limit,
      page: query.page
    });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(":id")
  @UpdateCustomerResponse
  async update(
    @Param("id") id: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ): Promise<void> {
    return await this.updateCustomerUseCase.execute({
      id,
      data: {
        name: updateCustomerDto.name,
        email: updateCustomerDto.email,
        address: updateCustomerDto.address,
        state: updateCustomerDto.state,
        zipCode: updateCustomerDto.zipCode,
        country: updateCustomerDto.country,
        dateOfBirth: updateCustomerDto.dateOfBirth
      }
    });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":id")
  @DeleteCustomerResponse
  async delete(@Param("id") id: string): Promise<void> {
    return await this.deleteCustomerUseCase.execute({ id });
  }
}
