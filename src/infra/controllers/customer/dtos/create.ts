import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsEmail, IsDate } from "class-validator";

export class CreateCustomerDto {
  @ApiProperty({
    description: "The name of the customer",
    example: "John Doe",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "The email of the customer",
    example: "john.doe@example.com",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "The address of the customer",
    example: "123 Main St, Anytown, USA",
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: "The state of the customer",
    example: "CA",
  })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({
    description: "The zip code of the customer",
    example: "12345",
  })
  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @ApiProperty({
    description: "The country of the customer",
    example: "USA",
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    description: "The date of birth of the customer",
    example: "1990-01-01",
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  dateOfBirth: Date;
}
