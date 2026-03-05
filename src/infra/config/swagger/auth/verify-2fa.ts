import { applyDecorators } from "@nestjs/common";
import {
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";

export const Verify2FAResponse = applyDecorators(
  ApiOperation({
    summary: "Verify 2FA code",
    description: "Validates the 2FA code and returns a JWT access token"
  }),
  ApiOkResponse({
    description: "Authentication successful",
    schema: {
      type: "object",
      properties: {
        accessToken: {
          type: "string",
          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
      }
    }
  }),
  ApiUnauthorizedResponse({
    description: "Invalid or expired 2FA code"
  })
);
