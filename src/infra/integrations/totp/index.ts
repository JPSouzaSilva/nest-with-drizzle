import { TotpAdapter } from "@domain/adapters/totp";
import { Injectable } from "@nestjs/common";
import { generateSecret, generateURI, verifySync } from "otplib";

@Injectable()
export class OtplibTotpIntegration extends TotpAdapter {
  generateSecret(): string {
    return generateSecret();
  }

  generateUri(email: string, secret: string): string {
    return generateURI({ secret, label: email, issuer: "White Label" });
  }

  verify(token: string, secret: string): boolean {
    const result = verifySync({ token, secret });
    return result.valid;
  }
}
