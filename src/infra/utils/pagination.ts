import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, Min } from "class-validator";

export class PaginationDto {
  @ApiProperty({
    description: "The page number",
    example: 1,
  })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  @Type(() => Number)
  page: number;

  @ApiProperty({
    description: "The page size",
    example: 10,
  })
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  @Type(() => Number)
  limit: number;
}
