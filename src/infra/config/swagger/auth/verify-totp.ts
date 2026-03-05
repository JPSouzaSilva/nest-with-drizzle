import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

export const VerifyTotpResponse = applyDecorators(
  ApiOperation({ summary: "Verify TOTP code and get access token (PREMIUM)" }),
  ApiResponse({
    status: HttpStatus.OK,
    description: "TOTP verified successfully",
    schema: {
      properties: {
        accessToken: { type: "string" }
      }
    }
  }),
  ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Invalid or expired TOTP code"
  })
);
