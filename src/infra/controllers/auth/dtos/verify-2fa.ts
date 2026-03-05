import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class Verify2FADto {
  @ApiProperty({
    description: "The email of the customer",
    example: "john.doe@example.com"
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "The 6-digit 2FA code sent to the customer email",
    example: "123456"
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  code: string;
}
