import { applyDecorators } from "@nestjs/common";
import {
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";

export const LoginResponse = applyDecorators(
  ApiOperation({
    summary: "Login with email and password",
    description:
      "NORMAL: sends 6-digit 2FA code by email. PREMIUM: respond with authMethod TOTP to proceed with /auth/verify-totp"
  }),
  ApiOkResponse({
    description: "Auth method indicated",
    schema: {
      properties: {
        authMethod: { type: "string", enum: ["EMAIL_2FA", "TOTP"] }
      }
    }
  }),
  ApiUnauthorizedResponse({
    description: "Invalid credentials"
  })
);
