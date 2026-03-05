import { TokenAdapter } from "@domain/adapters/token";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtTokenIntegration extends TokenAdapter {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  sign(payload: Record<string, unknown>): string {
    return this.jwtService.sign(payload);
  }

  verify(token: string): Record<string, unknown> {
    return this.jwtService.verify(token);
  }
}
