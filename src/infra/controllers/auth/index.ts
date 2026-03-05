import { LoginUseCase } from "@use-cases/auth/login";
import { Verify2FAUseCase } from "@use-cases/auth/verify-2fa";
import { VerifyTotpUseCase } from "@use-cases/auth/verify-totp";
import { LoginResponse } from "@infra/config/swagger/auth/login";
import { Verify2FAResponse } from "@infra/config/swagger/auth/verify-2fa";
import { VerifyTotpResponse } from "@infra/config/swagger/auth/verify-totp";
import { LoginUseCaseOutput } from "@domain/use-cases/auth/login";
import { Verify2FAUseCaseOutput } from "@domain/use-cases/auth/verify-2fa";
import { VerifyTotpUseCaseOutput } from "@domain/use-cases/auth/verify-totp";
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dtos/login";
import { Verify2FADto } from "./dtos/verify-2fa";
import { VerifyTotpDto } from "./dtos/verify-totp";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly verify2FAUseCase: Verify2FAUseCase,
    private readonly verifyTotpUseCase: VerifyTotpUseCase
  ) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @LoginResponse
  async login(@Body() loginDto: LoginDto): Promise<LoginUseCaseOutput> {
    return await this.loginUseCase.execute({
      email: loginDto.email,
      password: loginDto.password
    });
  }

  @Post("verify-2fa")
  @HttpCode(HttpStatus.OK)
  @Verify2FAResponse
  async verify2FA(
    @Body() verify2FADto: Verify2FADto
  ): Promise<Verify2FAUseCaseOutput> {
    return await this.verify2FAUseCase.execute({
      email: verify2FADto.email,
      code: verify2FADto.code
    });
  }

  @Post("verify-totp")
  @HttpCode(HttpStatus.OK)
  @VerifyTotpResponse
  async verifyTotp(
    @Body() verifyTotpDto: VerifyTotpDto
  ): Promise<VerifyTotpUseCaseOutput> {
    return await this.verifyTotpUseCase.execute({
      email: verifyTotpDto.email,
      token: verifyTotpDto.token
    });
  }
}
